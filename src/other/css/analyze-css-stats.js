// Description: The Analyze CSS Stats bookmarklet opens cssstats.com analysis for the current page's CSS. Detects if the URL is localhost/private (127.0.0.1, file://, etc.), for local URLs extracts CSS from all stylesheets and inline styles then POSTs to the CSS Stats API, for public URLs sends the URL to the CSS Stats ingest API, shows a loading indicator during extraction/analysis, and opens a new tab with comprehensive CSS statistics (rule count, selector complexity, colors, fonts, etc.). Useful for CSS optimization and understanding stylesheet complexity.
// Note: Localhost URLs will have CSS extracted and sent directly (ephemeral, not saved)
(function () {
	'use strict';
	try {
		var currentUrl = window.location.href;

		// Check if URL is not publicly accessible (localhost, private IP, file://)
		var isLocal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|::1|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|file:)/i.test(currentUrl);

		// Show loading indicator
		var loadingDiv = document.createElement('div');
		loadingDiv.style.cssText = 'position:fixed;top:20px;right:20px;background:#333;color:#fff;padding:12px 20px;border-radius:8px;font-family:sans-serif;font-size:0.875rem;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.3)';
		loadingDiv.textContent = isLocal ? 'Extracting CSS...' : 'Analyzing CSS...';
		document.body.appendChild(loadingDiv);

		if (isLocal) {
			// For local URLs, extract CSS and use analyze-css endpoint
			var css = '';
			var sheets = document.styleSheets;
			var loadedCount = 0;
			var totalCount = 0;

			// Function to try reading a stylesheet
			function tryReadSheet(sheet) {
				try {
					if (sheet.cssRules) {
						for (var i = 0; i < sheet.cssRules.length; i++) {
							css += sheet.cssRules[i].cssText + '\n';
						}
						return true;
					}
				} catch (e) {
					// CORS error - stylesheet not accessible
					return false;
				}
				return false;
			}

			// Collect all CSS from style sheets
			for (var i = 0; i < sheets.length; i++) {
				totalCount++;
				if (!tryReadSheet(sheets[i])) {
					// Try to fetch from href if direct access failed
					if (sheets[i].href) {
						(function(href) {
							fetch(href)
								.then(function(r) { return r.text(); })
								.then(function(text) {
									css += text + '\n';
									loadedCount++;
									if (loadedCount === totalCount) finish();
								})
								.catch(function() {
									loadedCount++;
									if (loadedCount === totalCount) finish();
								});
						})(sheets[i].href);
					} else {
						loadedCount++;
					}
				} else {
					loadedCount++;
				}
			}

			// Also get inline styles
			var inlineStyles = document.querySelectorAll('style:not([media]), style[media="all"], style[media="screen"]');
			for (var j = 0; j < inlineStyles.length; j++) {
				css += inlineStyles[j].textContent + '\n';
			}

			function finish() {
				if (css.trim().length > 0) {
					// Use analyze-css API endpoint for direct CSS analysis
					fetch('https://api.cssstats.com/v1/analyze-css', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ css: css.trim() })
					})
					.then(function (res) { return res.json(); })
					.then(function (data) {
						loadingDiv.remove();
						if (data.snapshotId) {
							window.open('https://cssstats.com/stats/' + data.snapshotId, '_blank');
						} else {
							alert('CSS Stats: Could not analyze CSS. Error: ' + (data.message || 'Unknown error'));
						}
					})
					.catch(function (err) {
						loadingDiv.remove();
						alert('CSS Stats Error: ' + err.message);
					});
				} else {
					loadingDiv.remove();
					alert('CSS Stats: Could not extract CSS from this page. The page may use CORS-protected stylesheets.');
				}
			}

			// Finish if all sheets were processed synchronously
			if (loadedCount === totalCount) {
				finish();
			}
		} else {
			// For public URLs, use the normal ingest API
			fetch('https://api.cssstats.com/v1/ingest', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: currentUrl })
			})
			.then(function (res) { return res.json(); })
			.then(function (data) {
				loadingDiv.remove();
				if (data.snapshotId) {
					window.open('https://cssstats.com/stats/' + data.snapshotId, '_blank');
				} else if (data.error) {
					alert('CSS Stats: ' + data.error + (data.details ? '\n' + data.details : ''));
				} else {
					alert('CSS Stats: Could not analyze page. Error: ' + (data.message || 'Unknown error'));
				}
			})
			.catch(function (err) {
				loadingDiv.remove();
				alert('CSS Stats Error: ' + err.message);
			});
		}
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

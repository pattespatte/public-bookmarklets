// Source: https://discourse.devontechnologies.com/t/bookmarklet-to-convert-html-selection-to-markdown/62170
// Description: The Copy Selection to Markdown with Turndown bookmarklet converts selected HTML content to Markdown using the Turndown library and copies it to the clipboard. Loads the TurndownService from unpkg.com if not already available, configures it with ATX headings, fenced code blocks, and dash list markers, converts the selected HTML to Markdown format, and displays a green notification on success or an error message on failure. Supports the full range of HTML-to-Markdown conversion provided by Turndown.
javascript: (function () {
	/* Check if text is selected */
	var selection = window.getSelection();
	if (!selection.toString()) {
		alert('Please select some text first!');
		return;
	}

	/* Get the selected HTML */
	var range = selection.getRangeAt(0);
	var container = document.createElement('div');
	container.appendChild(range.cloneContents());
	var html = container.innerHTML;

	/* Load Turndown if not already loaded */
	if (typeof TurndownService === 'undefined') {
		var script = document.createElement('script');
		script.src = 'https://unpkg.com/turndown/dist/turndown.js';
		script.onload = function () {
			convertToMarkdown(html);
		};
		document.head.appendChild(script);
	} else {
		convertToMarkdown(html);
	}

	function convertToMarkdown(html) {
		/* Initialize Turndown with options */
		var turndownService = new TurndownService({
			headingStyle: 'atx',
			codeBlockStyle: 'fenced',
			bulletListMarker: '-',
		});

		/* Convert HTML to Markdown */
		var markdown = turndownService.turndown(html);

		/* Copy to clipboard */
		navigator.clipboard
			.writeText(markdown)
			.then(function () {
				/* Visual feedback */
				var notification = document.createElement('div');
				notification.textContent = 'Markdown copied to clipboard!';
				notification.style.cssText =
					'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:10px 20px;border-radius:5px;z-index:10000;font-family:sans-serif;';
				document.body.appendChild(notification);
				setTimeout(function () {
					notification.remove();
				}, 2000);
			})
			.catch(function (err) {
				alert('Failed to copy to clipboard: ' + err);
			});
	}
})();

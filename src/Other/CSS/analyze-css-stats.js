// Description: Opens CSS stats analysis for the page
(function () {
	// Get the current page URL
	var currentUrl = encodeURIComponent(window.location.href);

	// Construct the URL for cssstats.com with the current page URL as a parameter
	var cssStatsUrl = 'https://cssstats.com/stats/?url=' + currentUrl;

	// Open the cssstats.com page in a new tab
	window.open(cssStatsUrl, '_blank');
})();

console.log(`
Source: https://github.com/cssstats/cssstats
Bookmarklet name: Analyze CSS Stats
`);

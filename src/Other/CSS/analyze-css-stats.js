(function () {
	// Get the current page URL
	var currentUrl = encodeURIComponent(window.location.href);

	// Construct the URL for cssstats.com with the current page URL as a parameter
	var cssStatsUrl = 'https://cssstats.com/stats/?url=' + currentUrl;

	// Open the cssstats.com page in a new tab
	window.open(cssStatsUrl, '_blank');
})();

console.log(`
Source: inspired by https://raw.githubusercontent.com/DevBubba/Bookmarklets/main/Tools/CSSstats.js
Bookmarklet name: Analyze CSS Stats
`);

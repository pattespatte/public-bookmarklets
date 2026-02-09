// Description: Open Google PageSpeed Insights analysis for the current page in a new tab. Tests the current URL with Google's performance testing tools to measure Core Web Vitals (LCP, FID, CLS), performance score, and provides optimization suggestions.
(function () {
	'use strict';
	try {
		// Open PageSpeed Insights for current URL in new tab
		void (
			window.open(
				'https://developers.google.com/speed/pagespeed/insights/?url=' +
					encodeURIComponent(location.href),
				'_blank'
			)
		);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Google Page Speed Test (in new tab)
`);

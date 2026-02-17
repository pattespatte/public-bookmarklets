// Description: WAVE (Web Accessibility Evaluation Tool) is a web-based accessibility evaluation tool. This bookmarklet opens the current page in WAVE for comprehensive accessibility analysis. WAVE identifies accessibility errors, features, and alerts by adding visual indicators directly to the page. Requires internet connection and opens in a new tab. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== WAVE WEBAIM =====
		// Source: https://wave.webaim.org/
		// License: Proprietary service - bookmarklet links to public web interface
		// WAVE bookmarklet - opens external accessibility evaluation tool

		window.open(
			'https://wave.webaim.org/report?url=' + escape(window.location)
		);
		// ===== END WAVE WEBAIM =====
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://wave.webaim.org/
Bookmarklet name: WAVE WebAIM Evaluation Tool
License: Proprietary - WebAIM service
Note: This bookmarklet opens an external web service
`);

// Description: tota11y is a "accessibility visualization toolkit" that helps visualize how your site performs with assistive technology. It adds visual indicators to potential accessibility issues, highlighting elements lacking accessible names, showing tabindex order, indicating low contrast text, and revealing hidden ARIA labels. A great educational tool for understanding accessibility. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== TOTAL11Y =====
		// Source: https://github.com/Khan/tota11y
		// License: MIT License
		// tota11y bookmarklet - loads from Khan Academy CDN

		(function () {
			var tota11y = document.createElement('SCRIPT');
			tota11y.type = 'text/javascript';
			tota11y.src = 'https://khan.github.io/tota11y/dist/tota11y.min.js';
			document.getElementsByTagName('head')[0].appendChild(tota11y);
		})();
		// ===== END TOTAL11Y =====
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/Khan/tota11y
Bookmarklet name: tota11y
License: MIT License
Copyright: Khan Academy
`);

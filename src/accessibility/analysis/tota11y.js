// Description: tota11y is a "accessibility visualization toolkit" that helps visualize how your site performs with assistive technology. It adds visual indicators to potential accessibility issues, highlighting elements lacking accessible names, showing tabindex order, indicating low contrast text, and revealing hidden ARIA labels. A great educational tool for understanding accessibility. Note: This project is deprecated but still functional. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== TOTAL11Y =====
		// Source: https://github.com/jdan/tota11y
		// License: MIT License
		// Copyright: Jordan Scales
		// tota11y bookmarklet - loads from jsDelivr CDN
		// Note: Project is deprecated but available on npm/jsDelivr

		(function () {
			var tota11y = document.createElement('SCRIPT');
			tota11y.type = 'text/javascript';
			tota11y.src = 'https://cdn.jsdelivr.net/npm/@khanacademy/tota11y@0.2.0/dist/tota11y.js';
			document.getElementsByTagName('head')[0].appendChild(tota11y);
		})();
		// ===== END TOTAL11Y =====
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/jdan/tota11y
Bookmarklet name: tota11y
License: MIT License
Copyright: Jordan Scales
Note: Project deprecated - use axe DevTools or browser accessibility tools instead
`);

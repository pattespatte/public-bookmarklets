// Description: tota11y is an "accessibility visualization toolkit" that helps visualize how your site performs with assistive technology. It adds visual indicators to potential accessibility issues, highlighting elements lacking accessible names, showing tabindex order, indicating low contrast text, and revealing hidden ARIA labels. A great educational tool for understanding accessibility. Note: This project is deprecated but still functional. WCAG SC 1.1.1: Non-text Content, 1.3.1: Info and Relationships, 1.4.1: Use of Color, 1.4.3: Contrast (Minimum), 2.1.1: Keyboard, 2.4.1: Bypass Blocks, 2.4.6: Headings and Labels, 3.3.2: Labels or Instructions, 4.1.1: Parsing, 4.1.2: Name, Role, Value.
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

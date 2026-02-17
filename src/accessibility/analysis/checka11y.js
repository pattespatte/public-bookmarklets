// Description: Checka11y is a CSS-based accessibility visualization tool that highlights potential accessibility issues by adding visual overlays. It identifies elements with missing alt text, indicates focus states, shows heading hierarchy, reveals links that may be confusing, and highlights potential color contrast issues. Uses CSS injection for visual feedback. Run again to remove. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== CHECKA11Y =====
		// Source: https://github.com/jackdomleo7/Checka11y.css
		// License: MIT License
		// Copyright: (c) 2020-present Jack Domleo
		// Checka11y bookmarklet - loads CSS from jsDelivr CDN
		// Note: The CSS file includes required attribution header

		(function () {
			(function () {
				javascript: (function () {
					var link = document.createElement('link');
					link.rel = 'stylesheet';
					link.href =
						'https://cdn.jsdelivr.net/npm/checka11y.css@2.5.0/checka11y.min.css';
					document.head.appendChild(link);
				})();
			})();
		})();
		// ===== END CHECKA11Y =====
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/jackdomleo7/Checka11y.css
Bookmarklet name: Checka11y
License: MIT License
Copyright: (c) 2020-present Jack Domleo
`);

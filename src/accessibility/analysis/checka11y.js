// Description: Checka11y is a CSS-based accessibility visualization tool that highlights potential accessibility issues by adding visual overlays. It identifies elements with missing alt text, indicates focus states, shows heading hierarchy, reveals links that may be confusing, and highlights potential color contrast issues. Uses CSS injection for visual feedback. WCAG SC 1.1.1: Non-text Content, 1.4.3: Contrast (Minimum), 2.1.1: Keyboard, 2.4.1: Bypass Blocks, 2.4.2: Page Titled, 2.4.6: Headings and Labels.
(function () {
	'use strict';
	try {
		// ===== CHECKA11Y =====
		// Source: https://github.com/jackdomleo7/Checka11y.css
		// License: MIT License
		// Copyright: (c) 2020-present Jack Domleo
		// Checka11y bookmarklet - toggles CSS from jsDelivr CDN
		// Note: The CSS file includes required attribution header

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://cdn.jsdelivr.net/npm/checka11y-css@2.3.3/checka11y.min.css';
		document.head.appendChild(link);
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

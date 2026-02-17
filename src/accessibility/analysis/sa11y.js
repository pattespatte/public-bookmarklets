// Description: Sa11y is an accessibility quality assurance tool that visually highlights common accessibility and usability issues. Dynamically identifies headings, landmarks, links, images (with alt text), tables, lists, form inputs, buttons, and highlight text contrast issues. Provides a panel showing identified issues with links to relevant WCAG success criteria. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== SA11Y =====
		// Source: https://github.com/ryersondmp/sa11y
		// License: GPL v2
		// Copyright: Toronto Metropolitan University (formerly Ryerson University)
		// Sa11y bookmarklet - loads from official jsDelivr CDN
		// Uses the official bookmarklet script that handles translations and CSP

		(function () {
			const sa11yDialog = document.getElementById('sa11y-csp');
			const sa11yScripts = document.querySelectorAll("script[src*='sa11y']");

			if (sa11yDialog) {
				sa11yDialog.remove();
			}

			if (sa11yScripts.length > 0) {
				// Sa11y is already running, toggle it off
				if (window.Sa11y && window.Sa11y.Remove) {
					window.Sa11y.Remove();
				}
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@latest/bookmarklet/v2.js';
			document.head.appendChild(script);
		})();
		// ===== END SA11Y =====
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/ryersondmp/sa11y
Bookmarklet name: Sa11y
License: GPL v2
Copyright: Toronto Metropolitan University (formerly Ryerson University)
`);

// Description: Sa11y is an accessibility quality assurance tool that visually highlights common accessibility and usability issues. Dynamically identifies headings, landmarks, links, images (with alt text), tables, lists, form inputs, buttons, and highlight text contrast issues. Provides a panel showing identified issues with links to relevant WCAG success criteria. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== SA11Y =====
		// Source: https://github.com/ryersondmp/sa11y
		// License: MIT License
		// Sa11y bookmarklet - loads from official CDN

		(function () {
			const sa11yDialog = document.getElementById('sa11y-csp');
			const sa11yScripts = document.querySelectorAll("script[src*='sa11y']");

			const createAlert = (message) => {
				const sa11yDialog = document.createElement('div');
				sa11yDialog.id = 'sa11y-csp';
				sa11yDialog.role = 'dialog';
				sa11yDialog.setAttribute('aria-labelledby', 'sa11y-heading');
				sa11yDialog.style =
					'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:999999;display:flex;justify-content:center;align-items:center;';
				sa11yDialog.innerHTML =
					'<div style="background:white;padding:2rem;border-radius:8px;max-width:400px;box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 id="sa11y-heading">Sa11y</h2><p>' +
					message +
					'</p><button style="margin-top:1rem;padding:0.5rem 1rem;background:#007bff;color:white;border:none;border-radius:4px;cursor:pointer;" onclick="document.getElementById(\'sa11y-csp\').remove()">Close</button></div>';
				document.body.appendChild(sa11yDialog);
			};

			if (sa11yDialog) {
				sa11yDialog.remove();
			}

			if (sa11yScripts.length > 0) {
				createAlert('Sa11y is already running on this page.');
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://sa11y.netlify.app/sa11y.js';
			script.onload = () => {
				createAlert('Sa11y loaded successfully!');
			};
			script.onerror = () => {
				createAlert('Failed to load Sa11y. Please check your internet connection.');
			};
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
License: MIT License
Copyright: Toronto Metropolitan University (formerly Ryerson University)
`);

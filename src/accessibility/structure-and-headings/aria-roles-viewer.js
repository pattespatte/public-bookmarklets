(function () {
	'use strict';
	// Description: The ARIA Roles Viewer bookmarklet displays badges showing the ARIA role attribute of all elements with roles defined. Finds all elements with a `role` attribute, extracts the role value and any associated aria-label or aria-labelledby references, and positions a badge at each element's location showing "role (label)". Useful for verifying that custom components have appropriate ARIA roles and labels. Run again to remove. WCAG SC 1.3.1: Info and Relationships.
	try {
		const ID = 'a11y-roles-view';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:fixed;inset:0;pointer-events:none;z-index:999999';
		const els = [...document.querySelectorAll('[role]')];
		els.forEach((el) => {
			const r = el.getAttribute('role');
			const l =
				el.getAttribute('aria-label') ||
				el.getAttribute('aria-labelledby') ||
				'';
			const b = document.createElement('div');
			const rect = el.getBoundingClientRect();
			b.textContent = r + (l ? ` (${l})` : '');
			b.style = `position:absolute;left:${rect.left + scrollX}px;top:${rect.top + scrollY}px;background:#eef;border:1px solid #99f;border-radius:4px;padding:2px 4px;font:11px monospace;pointer-events:none`;
			wrap.appendChild(b);
		});
		document.body.appendChild(wrap);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: ARIA roles viewer
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The Role Constraint Solver bookmarklet checks ARIA widget roles for proper required child ownership relationships. Validates listbox/option, tablist/tab, and menu/menuitem relationships, identifies parent elements missing required child roles, and proposes fixes (e.g., "Add role='option' to first child"). Displays an alert listing all ownership gaps found with suggested remedies. Useful for verifying ARIA widget patterns are correctly implemented. WCAG SC 1.3.1: Info and Relationships, WCAG SC 4.1.2: Name, Role, Value.
	try {
		const rules = {
			listbox: { owns: ['option'] },
			tablist: { owns: ['tab'] },
			menu: { owns: ['menuitem', 'menuitemcheckbox', 'menuitemradio'] },
		};
		const findings = [];
		for (const role of Object.keys(rules)) {
			const parents = [...document.querySelectorAll(`[role="${role}"]`)];
			for (const el of parents) {
				const owns = rules[role].owns;
				const has = owns.some((r) =>
					el.querySelector('[role="' + r + '"]')
				);
				if (!has) {
					const child = el.firstElementChild;
					findings.push({
						el,
						role,
						fix: child
							? `Add role="${owns[0]}" to first child`
							: 'Add a child with the required role',
					});
				}
			}
		}
		let msg = findings.length
			? findings.map((f) => `[${f.role}] ${f.fix}`).join('\n')
			: 'No ownership gaps found';
		alert(msg);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Role constraint solver
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

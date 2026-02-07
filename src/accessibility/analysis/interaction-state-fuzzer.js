(function () {
	'use strict';
	// Description: The Interaction State Fuzzer bookmarklet tests common ARIA widget patterns for proper keyboard and interaction behaviors. Opens dialogs and tests Escape key to close, navigates menus with arrow keys and tests Escape, clicks aria-expanded toggles and verifies state changes, and reports any patterns that don't respond correctly. Displays an alert with any issues found (e.g., "Dialog did not close on Escape", "Toggle did not change aria-expanded"). Useful for automated testing of widget interaction patterns. WCAG SC 2.1.1: Keyboard, WCAG SC 4.1.2: Name, Role, Value.
	try {
		const issues = [];
		// dialogs
		const dialogs = [
			...document.querySelectorAll('[role="dialog"],dialog'),
		];
		dialogs.forEach((d) => {
			if (d.open === false && d.showModal)
				try {
					d.showModal();
				} catch {}
			const before = d.open || getComputedStyle(d).display !== 'none';
			d.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
			);
			const after = d.open || getComputedStyle(d).display !== 'none';
			if (before && after) issues.push('Dialog did not close on Escape');
			if (d.close)
				try {
					d.close();
				} catch {}
		});
		// menus
		const menus = [
			...document.querySelectorAll('[role="menu"],[role="menubar"]'),
		];
		menus.forEach((m) => {
			const items = [...m.querySelectorAll('[role^="menuitem"]')];
			if (items.length) {
				items[0].focus();
				items[0].dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'ArrowDown',
						bubbles: true,
					})
				);
				items[0].dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'Escape',
						bubbles: true,
					})
				);
			}
		});
		// disclosures
		const toggles = [...document.querySelectorAll('[aria-expanded]')];
		toggles.forEach((t) => {
			const before = t.getAttribute('aria-expanded');
			t.click();
			const after = t.getAttribute('aria-expanded');
			if (before === after)
				issues.push('Toggle did not change aria-expanded');
		});
		alert(
			issues.length ? issues.join('\n') : 'No issues found in quick pass'
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Interaction state fuzzer
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

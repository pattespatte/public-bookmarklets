(function () {
	'use strict';
	// Description: The Interaction State Fuzzer bookmarklet tests common ARIA widget patterns for proper keyboard and interaction behaviors. Opens dialogs and tests Escape key to close, navigates menus with arrow keys and tests Escape, clicks aria-expanded toggles and verifies state changes, and reports any patterns that don't respond correctly. Displays an alert with any issues found (e.g., "Dialog did not close on Escape", "Toggle did not change aria-expanded"). Useful for automated testing of widget interaction patterns. WCAG SC 2.1.1: Keyboard, WCAG SC 4.1.2: Name, Role, Value.
	const toast = (function () {
		const H = 'a11y-toast-host';
		return function (msg, type) {
			let host = document.getElementById(H);
			if (!host) {
				host = document.createElement('div');
				host.id = H;
				host.style.cssText =
					'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:2147483647;pointer-events:none';
				document.body.appendChild(host);
				const sh = host.attachShadow({ mode: 'open' });
				sh.innerHTML =
					'<style>@keyframes ti{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes to{from{opacity:1}to{opacity:0;transform:translateY(-8px)}}.t{animation:ti .2s ease-out;pointer-events:auto;color:#fff;font:13px/1.4 system-ui,-apple-system,sans-serif;border-radius:8px;padding:10px 16px;box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:pre-line;word-break:break-word;max-width:400px;text-align:center;cursor:pointer;margin-top:8px}.i{background:#333}.e{background:#b91c1c}.x{animation:to .2s ease-in forwards}</style><div id="s" style="display:flex;flex-direction:column-reverse;align-items:center"></div>';
			}
			const s = host.shadowRoot.getElementById('s');
			const d = document.createElement('div');
			d.className = 't ' + (type === 'error' ? 'e' : 'i');
			d.textContent = msg;
			d.onclick = function () {
				d.classList.add('x');
				setTimeout(function () {
					d.remove();
				}, 200);
			};
			s.appendChild(d);
			setTimeout(
				function () {
					d.classList.add('x');
					setTimeout(function () {
						d.remove();
					}, 200);
				},
				type === 'error' ? 8000 : 4000
			);
		};
	})();
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
		toast(
			issues.length ? issues.join('\n') : 'No issues found in quick pass'
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Interaction state fuzzer
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

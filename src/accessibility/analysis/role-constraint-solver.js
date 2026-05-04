(function () {
	'use strict';
	// Description: The Role Constraint Solver bookmarklet checks ARIA widget roles for proper required child ownership relationships. Validates listbox/option, tablist/tab, and menu/menuitem relationships, identifies parent elements missing required child roles, and proposes fixes (e.g., "Add role='option' to first child"). Displays an alert listing all ownership gaps found with suggested remedies. Useful for verifying ARIA widget patterns are correctly implemented. WCAG SC 1.3.1: Info and Relationships, WCAG SC 4.1.2: Name, Role, Value.
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
		toast(msg);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Role constraint solver
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The ARIA Roles Viewer bookmarklet displays badges showing the ARIA role attribute of all elements with roles defined. Finds all elements with a `role` attribute, extracts the role value and any associated aria-label or aria-labelledby references, and positions a badge at each element's location showing "role (label)". Useful for verifying that custom components have appropriate ARIA roles and labels. Run again to remove. WCAG SC 1.3.1: Info and Relationships.
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
		const ID = 'a11y-roles-view';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:999999';
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
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The Voice Command Readiness bookmarklet checks controls for unique and concise names suitable for voice control. Finds links, buttons, and inputs, extracts their accessible names (aria-label, aria-labelledby, visible text), normalizes names (lowercase, collapse whitespace, truncate to 60), identifies duplicate names used by multiple controls which would prevent voice targeting, and counts excessively long names (>6 words) which are harder to speak. Displays an alert with counts of duplicates and long names. Useful for testing voice control compatibility. WCAG SC 2.4.4: Link Purpose (In Context), 2.5.3: Label in Name, 4.1.2: Name, Role, Value.
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
		function nameOf(el) {
			const byId = (id) =>
				id && document.getElementById(id)?.innerText.trim();
			if (el.getAttribute('aria-label'))
				return el.getAttribute('aria-label').trim();
			const lb = el.getAttribute('aria-labelledby');
			if (lb) {
				return lb
					.split(/\s+/)
					.map(byId)
					.filter(Boolean)
					.join(' ')
					.trim();
			}
			const t = (el.innerText || '').trim();
			return t || el.getAttribute('title') || '';
		}
		const ctrls = [
			...document.querySelectorAll(
				'a[href],button,[role="button"],input,select,textarea'
			),
		].filter((e) => e.offsetParent);
		const names = ctrls
			.map((el) => nameOf(el).toLowerCase().replace(/\s+/g, ' ').trim())
			.map((s) => s.slice(0, 60));
		const map = new Map();
		names.forEach((n, i) => {
			if (!n) return;
			const arr = map.get(n) || [];
			arr.push(ctrls[i]);
			map.set(n, arr);
		});
		const dups = [...map.entries()].filter(
			([n, els]) => els.length > 1 && n.length > 0
		);
		const longNames = names.filter(
			(n) => n && n.split(' ').length > 6
		).length;
		toast(`Duplicate names: ${dups.length}  Long names: ${longNames}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Voice command readiness
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

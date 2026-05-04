(function () {
	'use strict';
	// Description: The Accessible Name Badges bookmarklet displays badges showing the computed accessible name of all interactive elements on the page. Finds links, buttons, inputs, selects, textareas, elements with roles, and elements with tabindex, calculates each element's accessible name using the accessibility tree computation order (aria-label, aria-labelledby, alt, placeholder, then innerText), and positions a badge at each element's location showing "tagname: accessible name". Elements without names are marked "(no name)". Useful for verifying that interactive elements have proper accessible names for assistive technologies. Run again to remove. WCAG SC 2.4.4: Link Purpose (In Context), WCAG SC 2.5.3: Label in Name.
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
		const ID = 'a11y-name-badges';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:2147483647';
		const q =
			'a[href],button,input,select,textarea,[role],[tabindex]:not([tabindex="-1"])';
		function nameOf(el) {
			const byId = (id) =>
				id && document.getElementById(id)?.innerText.trim();
			if (el.hasAttribute('aria-label'))
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
			if (el.alt) return el.alt.trim();
			if (el.placeholder) return el.placeholder.trim();
			const own = (el.innerText || '').trim();
			return own.slice(0, 80);
		}
		for (const el of document.querySelectorAll(q)) {
			if (!el.offsetParent) continue;
			const r = el.getBoundingClientRect();
			const nm = nameOf(el) || '(no name)';
			const tag = el.tagName.toLowerCase();
			const b = document.createElement('div');
			b.textContent = `${tag}: ${nm}`;
			b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;background:#eef;border:1px solid #99f;border-radius:4px;padding:2px 4px;font:11px monospace;pointer-events:none`;
			wrap.appendChild(b);
		}
		document.body.appendChild(wrap);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Accessible name badges
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The Visual Only Icon Detector bookmarklet identifies icon-only controls that may have insufficient accessible names. Finds small buttons/links (≤40x40px) with no visible text but containing SVG or background images, checks for aria-label, title, or aria-labelledby, flags controls with very short names (<3 characters) as potential issues, outlines problematic icons in red, and displays an alert with the count of at-risk controls. Hover over outlined elements to see their status. Useful for finding icon buttons that need better labels. Run again to remove. WCAG SC 2.5.3: Label in Name.
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
		const ID = 'a11y-icon-only';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:2147483647';
		function nameOf(el) {
			return (
				el.getAttribute('aria-label') ||
				el.getAttribute('title') ||
				el.getAttribute('aria-labelledby') ||
				''
			);
		}
		const q = 'button,a,[role="button"]';
		const els = [...document.querySelectorAll(q)].filter(
			(e) => e.offsetParent
		);
		let risk = 0;
		els.forEach((el) => {
			const r = el.getBoundingClientRect();
			const hasText = (el.innerText || '').trim().length > 0;
			const hasSvg = el.querySelector('svg');
			const hasBg = /url\(/.test(
				getComputedStyle(el).backgroundImage || ''
			);
			const small = r.width <= 40 && r.height <= 40;
			const nm = (nameOf(el) || '').trim();
			const bad = small && !hasText && (hasSvg || hasBg) && nm.length < 3;
			if (bad) {
				risk++;
				const b = document.createElement('div');
				b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;border:3px solid #e00`;
				b.title = 'Suspect icon only control';
				wrap.appendChild(b);
			}
		});
		document.body.appendChild(wrap);
		toast(`Icon only risk count: ${risk}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Visual only icon detector
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

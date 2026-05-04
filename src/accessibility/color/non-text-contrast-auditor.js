(function () {
	'use strict';
	// Description: The Non-Text Contrast Auditor bookmarklet checks focus indicator thickness and contrast on interactive controls. Finds all focusable elements (links, buttons, inputs, etc.), temporarily focuses each element to trigger its focus styles, measures the outline width and calculates contrast between outline color and background color, flags elements with outline width < 2px or contrast ratio < 3:1 (WCAG AA minimum for non-text contrast), outlines problematic controls in red, and displays an alert with counts of low-contrast and thin rings. Run again to remove. WCAG SC 1.4.11: Non-text Contrast.
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
		function parseColor(c) {
			const ctx = document.createElement('canvas').getContext('2d');
			ctx.fillStyle = c;
			return ctx.fillStyle;
		}
		function rgbToArray(c) {
			const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
		}
		function relLum([r, g, b]) {
			[r, g, b] = [r, g, b].map((v) => {
				v /= 255;
				return v <= 0.03928
					? v / 12.92
					: Math.pow((v + 0.055) / 1.055, 2.4);
			});
			return 0.2126 * r + 0.7152 * g + 0.0722 * b;
		}
		function contrast(c1, c2) {
			const L1 = relLum(rgbToArray(parseColor(c1))),
				L2 = relLum(rgbToArray(parseColor(c2)));
			const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1];
			return (a + 0.05) / (b + 0.05);
		}
		const ID = 'a11y-nontext-contrast';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:2147483647';
		const els = [
			...document.querySelectorAll(
				'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
			),
		].filter((e) => e.offsetParent);
		let low = 0,
			thin = 0;
		for (const el of els) {
			const prev = document.activeElement;
			el.focus();
			const cs = getComputedStyle(el);
			const ow = parseFloat(cs.outlineWidth) || 0;
			const oc = cs.outlineColor;
			let bg = cs.backgroundColor,
				p = el;
			while (
				(bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') &&
				(p = p.parentElement)
			)
				bg = getComputedStyle(p).backgroundColor;
			const ratio = contrast(oc, bg);
			if (ow < 2) thin++;
			if (ratio < 3) low++;
			const r = el.getBoundingClientRect();
			const b = document.createElement('div');
			b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;border:2px solid ${ratio < 3 ? '#e00' : '#0a0'}`;
			b.title = `ring ${ow}px, contrast ${ratio.toFixed(2)}:1`;
			wrap.appendChild(b);
			if (prev && prev.focus) prev.focus();
		}
		document.body.appendChild(wrap);
		toast(`Low contrast rings: ${low}  Thin rings: ${thin}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Non text contrast auditor
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

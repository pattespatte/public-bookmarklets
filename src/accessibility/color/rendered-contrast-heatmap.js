(function () {
	'use strict';
	// Description: The Rendered Contrast Heatmap bookmarklet creates a visual overlay showing contrast pass/fail status for all visible text. Samples foreground and background colors from text elements, traverses the DOM for non-transparent backgrounds, calculates contrast ratios, determines text size and boldness to apply appropriate thresholds (3:1 for large text, 4.5:1 for normal text), overlays text elements with colored backgrounds: green (pass), yellow (borderline within 1 of threshold), or red (fail), and displays an alert with pass/borderline/fail counts. Hover over text to see the contrast ratio. Run again to remove. WCAG SC 1.4.3: Contrast (Minimum).
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
		const ID = 'a11y-contrast-heat';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:2147483647';
		const texts = [...document.querySelectorAll('body *')].filter(
			(e) => e.offsetParent && (e.innerText || '').trim()
		);
		let pass = 0,
			borderline = 0,
			fail = 0;
		for (const el of texts) {
			const cs = getComputedStyle(el);
			const fg = cs.color;
			let bg = cs.backgroundColor,
				p = el;
			while (
				(bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') &&
				(p = p.parentElement)
			)
				bg = getComputedStyle(p).backgroundColor;
			const r = el.getBoundingClientRect();
			if (!r.width || !r.height) continue;
			const ratio = contrast(fg, bg);
			let color = 'rgba(0,255,0,.22)'; // pass
			const size = parseFloat(cs.fontSize);
			const bold = parseInt(cs.fontWeight, 10) >= 700;
			const large = size >= 18 || (size >= 14 && bold);
			const need = large ? 3 : 4.5;
			if (ratio < need) {
				color = 'rgba(255,0,0,.25)';
				fail++;
			} else if (ratio < need + 1) {
				color = 'rgba(255,200,0,.22)';
				borderline++;
			} else pass++;
			const box = document.createElement('div');
			box.title = `${ratio.toFixed(2)}:1`;
			box.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;background:${color}`;
			wrap.appendChild(box);
		}
		document.body.appendChild(wrap);
		toast(`Pass ${pass}  Borderline ${borderline}  Fail ${fail}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Rendered contrast heatmap
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

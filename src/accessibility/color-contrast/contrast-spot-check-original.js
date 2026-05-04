(function () {
	'use strict';
	// Description: Click any text element to compute the contrast ratio between foreground and background colors, with pass/fail results for WCAG AA and AAA conformance levels. Displays the ratio, colors, and text size. Press Esc to stop. WCAG SC 1.4.3: Contrast (Minimum).
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
		function parseColor(color) {
			const canvas = document.createElement('canvas');
			canvas.width = 1;
			canvas.height = 1;
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, 1, 1);
			ctx.fillStyle = '#000';
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, 1, 1);
			return ctx.getImageData(0, 0, 1, 1).data;
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
			const L1 = relLum(rgbToArray(c1)),
				L2 = relLum(rgbToArray(c2));
			const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1];
			return (a + 0.05) / (b + 0.05);
		}
		const onClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			const el = e.target;
			const cs = getComputedStyle(el);
			const fg = cs.color;
			let bg = cs.backgroundColor;
			let p = el;
			while (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
				p = p.parentElement;
				if (!p) {
					bg = 'rgb(255,255,255)';
					break;
				}
				bg = getComputedStyle(p).backgroundColor;
			}
			const r = contrast(fg, bg).toFixed(2);
			const size = parseFloat(cs.fontSize);
			const bold = parseInt(cs.fontWeight, 10) >= 700;
			const large = size >= 18 || (size >= 14 && bold);
			const passAA = large ? r >= 3 : r >= 4.5;
			const passAAA = large ? r >= 4.5 : r >= 7;
			toast(
				'Contrast: ' +
					r +
					':1\n' +
					'Foreground: ' +
					fg +
					'\n' +
					'Background: ' +
					bg +
					'\n' +
					'Text size: ' +
					size +
					'px' +
					(bold ? ' (bold)' : '') +
					'\n' +
					(large ? 'Large text' : 'Normal text') +
					'\n\n' +
					'WCAG AA: ' +
					(passAA ? 'PASS' : 'FAIL') +
					'\n' +
					'WCAG AAA: ' +
					(passAAA ? 'PASS' : 'FAIL') +
					'\n\n' +
					'Esc to stop'
			);
			end();
		};
		function end() {
			document.removeEventListener('click', onClick, true);
			document.removeEventListener('keydown', onKey, true);
		}
		function onKey(e) {
			if (e.key === 'Escape') {
				end();
			}
		}
		document.addEventListener('click', onClick, true);
		document.addEventListener('keydown', onKey, true);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Contrast spot-check
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

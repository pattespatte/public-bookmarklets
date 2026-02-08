(function () {
	'use strict';
	// Description: Click any text element to compute the contrast ratio between foreground and background colors, with pass/fail results for WCAG AA and AAA conformance levels. Displays the ratio, colors, and text size. Press Esc to stop. WCAG SC 1.4.3: Contrast (Minimum).
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
			alert(
				'Contrast: ' + r + ':1\n' +
				'Foreground: ' + fg + '\n' +
				'Background: ' + bg + '\n' +
				'Text size: ' + size + 'px' + (bold ? ' (bold)' : '') + '\n' +
				(large ? 'Large text' : 'Normal text') + '\n\n' +
				'WCAG AA: ' + (passAA ? 'PASS' : 'FAIL') + '\n' +
				'WCAG AAA: ' + (passAAA ? 'PASS' : 'FAIL') + '\n\n' +
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
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

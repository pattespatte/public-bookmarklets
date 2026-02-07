(function () {
	'use strict';
	// Description: The Palette Contrast Extractor bookmarklet identifies common color pairs used on the page and sorts them by contrast ratio. Samples foreground/background color pairs from visible text elements, traverses up the DOM tree to find non-transparent backgrounds, uses the WCAG 2 relative luminance formula to calculate contrast ratios, counts frequency of each color pair, and displays an alert listing the top 20 pairs sorted from lowest to highest contrast with occurrence counts. Useful for identifying which color combinations on the page may have contrast issues. WCAG SC 1.4.3: Contrast (Minimum).
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
		const els = [...document.querySelectorAll('body *')].filter(
			(e) => e.offsetParent
		);
		const pairs = new Map();
		for (const el of els) {
			const cs = getComputedStyle(el);
			const fg = cs.color;
			let bg = cs.backgroundColor;
			let p = el;
			while (
				(bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') &&
				(p = p.parentElement)
			) {
				bg = getComputedStyle(p).backgroundColor;
			}
			const key = fg + ' on ' + bg;
			const text = (el.innerText || '').trim();
			if (text) {
				pairs.set(key, (pairs.get(key) || 0) + 1);
			}
		}
		const out = [...pairs.entries()]
			.map(([k, c]) => {
				const [fg, _, bg] = k.split(' ');
				return { k, c, r: contrast(fg, bg) };
			})
			.sort((a, b) => a.r - b.r)
			.slice(0, 20)
			.map((x) => `${x.r.toFixed(2)}:1  ${x.k}  (${x.c})`)
			.join('\n');
		alert(out || 'No pairs found');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Palette contrast extractor
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

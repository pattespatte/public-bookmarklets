(function () {
	'use strict';
	// Description: The Non-Text Contrast Auditor bookmarklet checks focus indicator thickness and contrast on interactive controls. Finds all focusable elements (links, buttons, inputs, etc.), temporarily focuses each element to trigger its focus styles, measures the outline width and calculates contrast between outline color and background color, flags elements with outline width < 2px or contrast ratio < 3:1 (WCAG AA minimum for non-text contrast), outlines problematic controls in red, and displays an alert with counts of low-contrast and thin rings. Run again to remove. WCAG SC 1.4.11: Non-text Contrast.
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
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
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
		alert(`Low contrast rings: ${low}  Thin rings: ${thin}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Non text contrast auditor
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

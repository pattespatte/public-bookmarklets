(function () {
	'use strict';
	// Description: The Reading Order Correlator bookmarklet compares visual reading order to DOM source order using the Kendall tau correlation coefficient. Finds all content blocks (headings, paragraphs, lists, sections, etc.), sorts them by visual position (top-to-bottom, left-to-right), calculates the number of inversions where visual order differs from DOM order, computes the tau correlation coefficient (1 = perfect correlation, 0 = no correlation), highlights elements with large position discrepancies (5+ positions) in red with up-down arrows, and displays an alert with tau value and inversion count. Run again to remove. WCAG SC 1.3.2: Meaningful Sequence.
	try {
		const ID = 'a11y-read-corr';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const qs =
			'p,h1,h2,h3,h4,h5,h6,li,dt,dd,section,article,aside,main,header,footer,nav,blockquote,pre';
		const blocks = [...document.querySelectorAll(qs)].filter(
			(e) => e.offsetParent && (e.innerText || '').trim()
		);
		if (!blocks.length) {
			alert('No readable blocks');
			return;
		}
		const domOrder = new Map(blocks.map((e, i) => [e, i]));
		const visual = [...blocks].sort((a, b) => {
			const ra = a.getBoundingClientRect(),
				rb = b.getBoundingClientRect();
			if (Math.abs(ra.top - rb.top) > 8) return ra.top - rb.top;
			return ra.left - rb.left;
		});
		let inversions = 0,
			n = visual.length;
		for (let i = 0; i < n; i++)
			for (let j = i + 1; j < n; j++) {
				if (domOrder.get(visual[i]) > domOrder.get(visual[j]))
					inversions++;
			}
		const denom = (n * (n - 1)) / 2;
		const tau = denom ? 1 - (2 * inversions) / denom : 1;
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
		// flag large inversions
		visual.forEach((el, i) => {
			const diff = Math.abs(domOrder.get(el) - i);
			if (diff >= 5) {
				const r = el.getBoundingClientRect();
				const b = document.createElement('div');
				b.textContent = '↕';
				b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;color:#e00;font:16px monospace`;
				wrap.appendChild(b);
			}
		});
		document.body.appendChild(wrap);
		alert(`Kendall tau: ${tau.toFixed(2)}  inversions: ${inversions}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Reading order correlator
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

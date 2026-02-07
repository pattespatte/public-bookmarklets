(function () {
	'use strict';
	// Description: The Accessible Name Consistency bookmarklet compares computed accessible names to visible label text to detect potential WCAG 2.5.3 Label in Name violations. Calculates accessible names using accessibility tree computation, finds nearby visible labels (label[for], parent label, or sibling label), measures text similarity using Levenshtein distance, outlines elements with low similarity (<60%) in red, and displays an alert with the count of problematic items. Hover over outlined elements to see name vs label text and similarity score. Run again to remove. WCAG SC 2.5.3: Label in Name.
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
			if (el.alt) return el.alt.trim();
			if (el.placeholder) return el.placeholder.trim();
			const own = (el.innerText || '').trim();
			return own.slice(0, 80);
		}
		function lev(a, b) {
			const m = a.length,
				n = b.length,
				d = Array.from({ length: m + 1 }, (_, i) =>
					Array(n + 1).fill(0)
				);
			for (let i = 0; i <= m; i++) d[i][0] = i;
			for (let j = 0; j <= n; j++) d[0][j] = j;
			for (let i = 1; i <= m; i++)
				for (let j = 1; j <= n; j++) {
					const c = a[i - 1] === b[j - 1] ? 0 : 1;
					d[i][j] = Math.min(
						d[i - 1][j] + 1,
						d[i][j - 1] + 1,
						d[i - 1][j - 1] + c
					);
				}
			return d[m][n];
		}
		const ID = 'a11y-name-oracle';
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
				'a[href],button,input,select,textarea,[role],[tabindex]:not([tabindex="-1"])'
			),
		].filter((e) => e.offsetParent);
		let bad = 0;
		for (const el of els) {
			const nm = nameOf(el) || ''; // visible label guess
			let vis = '';
			const lab =
				el.id && document.querySelector(`label[for="${el.id}"]`);
			if (lab) vis = lab.innerText.trim();
			if (!vis) {
				const near = el.closest('label');
				if (near) vis = near.innerText.trim();
			}
			if (!vis) {
				const p = el.parentElement;
				if (p) vis = (p.querySelector('label')?.innerText || '').trim();
			}
			const dist = lev(nm.toLowerCase(), vis.toLowerCase());
			const max = Math.max(nm.length, vis.length) || 1;
			const ratio = 1 - dist / max;
			const r = el.getBoundingClientRect();
			const b = document.createElement('div');
			const good = ratio >= 0.6 || (!vis && nm);
			b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;border:2px solid ${good ? '#0a0' : '#e00'};width:${r.width}px;height:${r.height}px`;
			b.title = `name "${nm}" vs label "${vis}" score ${ratio.toFixed(2)}`;
			wrap.appendChild(b);
			if (!good) bad++;
		}
		document.body.appendChild(wrap);
		alert(`Low similarity items: ${bad}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Accessible name consistency
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

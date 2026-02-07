(function () {
	'use strict';
	// Description: The Focus Graph Analyzer bookmarklet models keyboard tab order as a directed graph to identify potential focus issues. Builds the tab order sequence from focusable elements (considering tabindex values), draws badges showing each element's position and its forward target, calculates trap candidates (elements where forward and backward targets equal themselves), counts positive tabindex items that override natural order, identifies unreachable interactive elements, and displays an alert with statistics. Visualizes the focus flow to detect keyboard traps and ordering problems. Run again to remove. WCAG SC 2.1.1: Keyboard, WCAG SC 2.4.3: Focus Order.
	try {
		const ID = 'a11y-focus-graph';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
		const focusables = [
			...document.querySelectorAll(
				'a[href],button,input,select,textarea,[tabindex]'
			),
		].filter((e) => !e.disabled && e.tabIndex !== -1 && e.offsetParent);
		const withTab = focusables.map((el, dom) => ({
			el,
			dom,
			ti: el.tabIndex || 0,
		}));
		const pos = withTab
			.filter((x) => x.ti > 0)
			.sort((a, b) => a.ti - b.ti || a.dom - b.dom);
		const zero = withTab
			.filter((x) => x.ti === 0)
			.sort((a, b) => a.dom - b.dom);
		const seq = [...pos, ...zero].map((x) => x.el);
		const idx = new Map(seq.map((el, i) => [el, i]));
		const edgesF = new Map(
			seq.map((el, i) => [el, seq[(i + 1) % seq.length] || null])
		);
		const edgesB = new Map(
			seq.map((el, i) => [
				el,
				seq[(i - 1 + seq.length) % seq.length] || null,
			])
		);
		let traps = 0,
			unreachable = 0,
			riskyPos = pos.length;
		if (!seq.length) {
			alert('No focusable elements');
			return;
		}
		const seen = new Set(seq);
		const root = seq[0];
		const rects = [];
		for (const el of seq) {
			const r = el.getBoundingClientRect();
			const badge = document.createElement('div');
			const f = edgesF.get(el),
				b = edgesB.get(el);
			badge.textContent =
				idx.get(el) + 1 + '→' + (f ? idx.get(f) + 1 : '×');
			badge.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;background:#ffe08a;border:1px solid #333;border-radius:10px;padding:2px 6px;font:12px monospace`;
			wrap.appendChild(badge);
			rects.push(r);
		}
		// crude trap heuristic: element whose forward and backward targets equal itself
		for (const el of seq) {
			const f = edgesF.get(el),
				b = edgesB.get(el);
			if (f === el && b === el) traps++;
		}
		// unreachable heuristic: focusables not in seq (tabindex -1 or hidden) but still interactive
		const allInteractive = [
			...document.querySelectorAll(
				'a,button,input,select,textarea,[tabindex]'
			),
		].filter((e) => e.offsetParent);
		unreachable = allInteractive.filter(
			(e) => !idx.has(e) && e.tabIndex !== -1
		).length;
		document.body.appendChild(wrap);
		alert(
			`Focus nodes: ${seq.length}\nPositive tabindex: ${riskyPos}\nTrap candidates: ${traps}\nUnreachable candidates: ${unreachable}`
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Focus graph analyzer
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

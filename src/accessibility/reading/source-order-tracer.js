(function () {
	'use strict';
	// Description: The Source Order Tracer bookmarklet numbers visible content blocks to visualize the DOM reading order. Finds all semantic content elements (p, headings, li, sections, articles, etc.), filters out hidden elements and elements without text content, and positions numbered badges at each block's location showing the sequence number and element tag. Useful for comparing visual layout order with DOM source order to identify discrepancies that affect assistive technology users. Run again to remove. WCAG SC 1.3.2: Meaningful Sequence.
	try {
		const ID = 'a11y-order';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
		const blocks =
			'p,h1,h2,h3,h4,h5,h6,li,dt,dd,section,article,aside,main,header,footer,nav,blockquote,pre';
		let n = 1;
		for (const el of document.querySelectorAll(blocks)) {
			if (!el.offsetParent) continue;
			const text = (el.innerText || '').trim();
			if (!text) continue;
			const r = el.getBoundingClientRect();
			const tag = el.tagName.toLowerCase();
			const badge = document.createElement('div');
			badge.textContent = n++ + ' ' + tag;
			badge.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;background:#ffe08a;border:1px solid #333;border-radius:12px;padding:2px 6px;font:12px monospace;pointer-events:none`;
			wrap.appendChild(badge);
		}
		document.body.appendChild(wrap);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Source order tracer
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

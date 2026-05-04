(function () {
	'use strict';
	// Description: The Source Order Tracer bookmarklet numbers visible content blocks to visualize the DOM reading order. Finds all semantic content elements (p, headings, li, sections, articles, etc.), filters out hidden elements and elements without text content, and positions numbered badges at each block's location showing the sequence number and element tag. Useful for comparing visual layout order with DOM source order to identify discrepancies that affect assistive technology users. Run again to remove. WCAG SC 1.3.2: Meaningful Sequence.
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
		const ID = 'a11y-order';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:2147483647';
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
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The 400% Zoom Stress Test bookmarklet simulates a 320px viewport at 400% zoom to test WCAG reflow requirements. Wraps all page content in a container with `transform: scale(4)` and `width: 320px`, enables scrolling on the document element, and after a brief delay, checks for horizontal scrolling and overlapping content blocks (using bounding box intersection). Displays an alert with horizontal scroll status and overlap count. Run again to remove. WCAG SC 1.4.4: Resize text, WCAG SC 1.4.10: Reflow.
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
		const ID = 'a11y-zoom-wrap';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			document.documentElement.style.overflow = '';
			toast('Zoom test off');
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		while (document.body.firstChild) {
			wrap.appendChild(document.body.firstChild);
		}
		document.body.appendChild(wrap);
		wrap.style.transformOrigin = 'top left';
		wrap.style.transform = 'scale(4)';
		wrap.style.width = '320px';
		document.documentElement.style.overflow = 'auto';
		setTimeout(() => {
			const doc = document.documentElement;
			const hasX = doc.scrollWidth > doc.clientWidth + 1;
			// overlap heuristic
			const blocks = [
				...document.querySelectorAll(
					'p,li,div,section,article,main,header,footer,nav'
				),
			].filter((e) => e.offsetParent && (e.innerText || '').trim());
			let overlaps = 0;
			for (let i = 0; i < Math.min(200, blocks.length); i++) {
				const a = blocks[i].getBoundingClientRect();
				for (let j = i + 1; j < Math.min(200, blocks.length); j++) {
					const b = blocks[j].getBoundingClientRect();
					if (
						a.top < b.bottom &&
						b.top < a.bottom &&
						a.left < b.right &&
						b.left < a.right
					) {
						overlaps++;
						break;
					}
				}
			}
			toast(
				`Horizontal scroll: ${hasX ? 'yes' : 'no'}  Overlap pairs (sample): ${overlaps}`
			);
		}, 300);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: 400% zoom stress test
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

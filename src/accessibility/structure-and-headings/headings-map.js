(function () {
	'use strict';
	// Description: The Headings Map bookmarklet displays a fixed panel listing all headings (h1-h6) in their document order with quick jump links. Creates a compact navigation panel showing each heading's level and text content (truncated to 80 characters), allows clicking any heading to scroll it into view and focus it, and provides a quick way to review heading structure and navigate through content. Run again to remove the panel. WCAG SC 1.3.1: Info and Relationships, WCAG SC 2.4.1: Bypass Blocks.
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
		const ID = 'a11y-headings';
		let p = document.getElementById(ID);
		if (p) {
			p.remove();
			return;
		}
		const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
		p = document.createElement('div');
		p.id = ID;
		p.setAttribute(
			'style',
			'position:fixed;z-index:2147483647;top:8px;right:8px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;padding:8px;border-radius:8px;font:12px monospace;'
		);
		const ul = document.createElement('ul');
		ul.style = 'list-style:none;padding:0;margin:0;';
		hs.forEach((h, i) => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = '#';
			a.textContent = h.tagName + ' ' + h.textContent.trim().slice(0, 80);
			a.style =
				'display:block;padding:4px 6px;border-radius:4px;text-decoration:none;color:#00c;';
			a.addEventListener('click', (e) => {
				e.preventDefault();
				h.scrollIntoView({ block: 'center' });
				h.focus({ preventScroll: true });
			});
			li.appendChild(a);
			ul.appendChild(li);
		});
		if (!hs.length) {
			ul.innerHTML = '<li>No headings</li>';
		}
		const close = document.createElement('button');
		close.textContent = '×';
		close.title = 'Close';
		close.style =
			'position:absolute;top:0;right:0;border:0;background:#eee;border-radius:0 8px 0 8px;padding:4px 6px;cursor:pointer';
		close.onclick = () => p.remove();
		p.append(close, ul);
		document.body.appendChild(p);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Headings map
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

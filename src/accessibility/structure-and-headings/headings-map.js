(function () {
	'use strict';
	// Description: The Headings Map bookmarklet displays a fixed panel listing all headings (h1-h6) in their document order with quick jump links. Creates a compact navigation panel showing each heading's level and text content (truncated to 80 characters), allows clicking any heading to scroll it into view and focus it, and provides a quick way to review heading structure and navigate through content. Run again to remove the panel. WCAG SC 1.3.1: Info and Relationships, WCAG SC 2.4.1: Bypass Blocks.
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
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

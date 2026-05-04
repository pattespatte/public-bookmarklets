(function () {
	'use strict';
	// Description: The Show Title Tooltips bookmarklet reveals elements that rely on the `title` attribute for supplemental information. Finds all elements with a `title` attribute, outlines them with a dotted purple line, and inserts the title text content visibly next to each element. This helps identify uses of the title attribute, which has poor accessibility support (not reliably exposed to assistive technologies). Displays an alert with the count of highlighted elements. Reload the page to remove highlights. WCAG SC 2.4.4: Link Purpose (In Context)—note that title attributes alone are not sufficient for accessibility.
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
		const els = [...document.querySelectorAll('[title]')];
		els.forEach((el) => {
			el.style.outline = '2px dotted #c0c';
			el.insertAdjacentHTML(
				'afterend',
				`<small style="background:#ffe;border:1px solid #cc9;border-radius:4px;padding:2px 4px;margin-left:4px">${el.getAttribute('title')}</small>`
			);
		});
		toast(els.length + ' elements with title attribute highlighted');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Show title tooltips
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

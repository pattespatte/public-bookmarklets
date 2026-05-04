(function () {
	'use strict';
	// Description: The Language Check bookmarklet reports the page's primary language and identifies elements with different language attributes. Extracts the `lang` attribute from the document element, finds all elements with their own `lang` attribute that are direct descendants (not nested inside other lang elements), and displays an alert showing the page language and a list of any element-level language declarations. Useful for verifying proper language markup when content changes languages. WCAG SC 3.1.1: Language of Page, WCAG SC 3.1.2: Language of Parts.
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
		const pageLang =
			document.documentElement.getAttribute('lang') || '(none)';
		const diffs = [...document.querySelectorAll('[lang]')]
			.filter((el) => el.closest('[lang]') === el)
			.map(
				(el) =>
					`${el.tagName.toLowerCase()} lang="${el.getAttribute('lang')}"`
			);
		toast(
			'Page lang: ' +
				pageLang +
				'\nTop-level elements with lang: \n' +
				(diffs[0] ? diffs.join('\n') : '(none)')
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Language check
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

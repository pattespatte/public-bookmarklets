(function () {
	'use strict';
	// Description: The Forced Colors Preview bookmarklet approximates the Windows high contrast mode / forced colors appearance. Applies CSS that overrides backgrounds to transparent/black, sets text to white, makes links cyan with underlines, gives form controls white borders on black backgrounds, and applies grayscale + contrast filters to images and videos. Useful for testing whether pages remain usable when users' color preferences override the site's design. Run again to remove. WCAG SC 1.4.11: Non-text Contrast.
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
		const ID = 'a11y-forced-colors';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const s = document.createElement('style');
		s.id = ID;
		s.textContent = `*{background:transparent !important; box-shadow:none !important}
		body{background:#000 !important; color:#fff !important}
		a{color:#0ff !important; text-decoration:underline !important}
		button,input,select,textarea{background:#000 !important; color:#fff !important; border:2px solid #fff !important}
		img,video,svg{filter:grayscale(100%) contrast(120%) !important}`;
		document.head.appendChild(s);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Forced colors preview
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

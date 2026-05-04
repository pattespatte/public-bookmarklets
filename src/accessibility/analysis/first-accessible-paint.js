(function () {
	'use strict';
	// Description: The First Accessible Paint bookmarklet estimates when the page becomes keyboard-usable for assistive technology users. Measures time from start until both landmark regions (main, nav, region, header, footer) and focusable elements exist, uses MutationObserver to detect when these elements appear in the DOM, attempts to focus the first focusable element to confirm, and displays an alert with the elapsed time in milliseconds. If page is already usable, reports current elapsed time. Useful for measuring performance impacts on keyboard/screen reader users. WCAG SC 2.4.1: Bypass Blocks.
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
		const t0 = performance.now();
		function hasLandmark() {
			return document.querySelector(
				'main,[role="main"],nav,[role="navigation"],[role="region"],header,footer'
			);
		}
		function hasFocusable() {
			return document.querySelector(
				'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
			);
		}
		if (hasLandmark() && hasFocusable()) {
			toast(
				'Already usable. Elapsed ' +
					((performance.now() - t0) | 0) +
					'ms'
			);
			return;
		}
		const mo = new MutationObserver(() => {
			if (hasLandmark() && hasFocusable()) {
				mo.disconnect();
				// try to focus the first item to confirm
				const f = document.querySelector(
					'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
				);
				try {
					f.focus();
				} catch {}
				toast('Usable after ' + ((performance.now() - t0) | 0) + 'ms');
			}
		});
		mo.observe(document.body, { subtree: true, childList: true });
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: First accessible paint
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

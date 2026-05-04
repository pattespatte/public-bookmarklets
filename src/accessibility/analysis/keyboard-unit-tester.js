(function () {
	'use strict';
	// Description: The Keyboard Behavior Unit Tester bookmarklet automatically tests whether interactive controls respond to keyboard activation. Finds links, buttons, and inputs, programmatically dispatches Enter and Space keyboard events, measures if click handlers were triggered, and reports elements that failed to respond to keyboard activation. Helps identify interactive elements that only work with mouse/touch input, which is a WCAG violation. Displays an alert with the count of silent (non-responsive) elements. WCAG SC 2.1.1: Keyboard.
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
		const ID = 'a11y-keytest';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const q =
			'a[href],button,[role="button"],input[type="checkbox"],input[type="radio"]';
		const els = [...document.querySelectorAll(q)].filter(
			(e) => e.offsetParent
		);
		const silent = [];
		for (const el of els) {
			let activated = false;
			const onClick = () => (activated = true);
			el.addEventListener('click', onClick, { once: true });
			el.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
			);
			el.dispatchEvent(
				new KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
			);
			el.dispatchEvent(
				new KeyboardEvent('keydown', { key: ' ', bubbles: true })
			);
			el.dispatchEvent(
				new KeyboardEvent('keyup', { key: ' ', bubbles: true })
			);
			setTimeout(() => {
				if (!activated) silent.push(el);
			}, 30);
		}
		setTimeout(() => {
			toast(
				silent.length
					? `Silent on Enter and Space: ${silent.length}`
					: 'All tested controls responded'
			);
		}, 220);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Keyboard behavior unit tester
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

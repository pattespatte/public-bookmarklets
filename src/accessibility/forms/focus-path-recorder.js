(function () {
	'use strict';
	// Description: The Focus Path Recorder bookmarklet records Tab key navigation through the page and generates a downloadable report. Records each Tab press, capturing the timestamp, element tag name, and accessible name (aria-label, ID, name, alt, or text content), and when Esc is pressed, downloads a text file named "focus-path.txt" with the complete navigation history. Useful for documenting focus order issues and verifying logical tab flow. WCAG SC 2.4.3: Focus Order.
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
		const events = [];
		function labelOf(el) {
			return (
				el.getAttribute('aria-label') ||
				el.id ||
				el.name ||
				el.alt ||
				el.innerText?.slice(0, 40) ||
				el.tagName
			);
		}
		function onKey(e) {
			if (e.key === 'Tab') {
				const el = document.activeElement;
				events.push({
					time: new Date().toISOString(),
					el: el.tagName.toLowerCase(),
					label: labelOf(el),
				});
			} else if (e.key === 'Escape') {
				document.removeEventListener('keydown', onKey, true);
				const text = events
					.map((x) => `${x.time}  ${x.el}  ${x.label}`)
					.join('\n');
				const blob = new Blob([text || 'No events recorded'], {
					type: 'text/plain',
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'focus-path.txt';
				a.click();
				setTimeout(() => URL.revokeObjectURL(url), 1000);
				toast('Saved focus-path.txt');
			}
		}
		toast('Recording Tab navigation. Press Esc to save.');
		document.addEventListener('keydown', onKey, true);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Focus path recorder
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

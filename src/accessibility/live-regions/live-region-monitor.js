(function () {
	'use strict';
	// Description: The Live Region Monitor bookmarklet watches for updates to aria-live and role="alert" regions. Finds all live regions on the page, uses MutationObserver to monitor DOM changes, logs new text content with timestamps as it appears, deduplicates identical messages, and displays a scrolling panel in the top-right corner showing all live region announcements. Useful for debugging dynamic content announcements and verifying that live regions work correctly. Run again to close. WCAG SC 4.1.3: Status Messages.
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
		const ID = 'a11y-live-mon';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const panel = document.createElement('div');
		panel.id = ID;
		panel.style =
			'position:fixed;right:8px;top:8px;width:360px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;padding:8px;z-index:2147483647;font:12px monospace';
		panel.innerHTML = '<b>Live region monitor</b><hr><div id="log"></div>';
		document.body.appendChild(panel);
		const log = panel.querySelector('#log');
		const t0 = performance.now();
		const seen = new Set();
		const lives = [
			...document.querySelectorAll('[aria-live], [role="alert"]'),
		];
		function add(t) {
			const row = document.createElement('div');
			row.textContent = ((performance.now() - t0) | 0) + 'ms: ' + t;
			log.appendChild(row);
		}
		add(`Watching ${lives.length} regions`);
		const mo = new MutationObserver((ms) => {
			ms.forEach((m) => {
				const target = lives.find((l) => l.contains(m.target));
				if (target) {
					const text = (target.innerText || target.textContent || '')
						.trim()
						.slice(0, 160);
					if (text && !seen.has(text)) {
						seen.add(text);
						add(text);
					}
				}
			});
		});
		mo.observe(document.body, {
			subtree: true,
			childList: true,
			characterData: true,
		});
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Live region monitor
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

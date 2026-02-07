(function () {
	'use strict';
	// Description: The Live Region Monitor bookmarklet watches for updates to aria-live and role="alert" regions. Finds all live regions on the page, uses MutationObserver to monitor DOM changes, logs new text content with timestamps as it appears, deduplicates identical messages, and displays a scrolling panel in the top-right corner showing all live region announcements. Useful for debugging dynamic content announcements and verifying that live regions work correctly. Run again to close. WCAG SC 4.1.3: Status Messages.
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
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

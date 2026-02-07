(function () {
	'use strict';
	// Description: The First Accessible Paint bookmarklet estimates when the page becomes keyboard-usable for assistive technology users. Measures time from start until both landmark regions (main, nav, region, header, footer) and focusable elements exist, uses MutationObserver to detect when these elements appear in the DOM, attempts to focus the first focusable element to confirm, and displays an alert with the elapsed time in milliseconds. If page is already usable, reports current elapsed time. Useful for measuring performance impacts on keyboard/screen reader users. WCAG SC 2.4.1: Bypass Blocks.
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
			alert(
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
				alert('Usable after ' + ((performance.now() - t0) | 0) + 'ms');
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
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

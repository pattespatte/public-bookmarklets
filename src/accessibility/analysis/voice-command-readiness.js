(function () {
	'use strict';
	// Description: The Voice Command Readiness bookmarklet checks controls for unique and concise names suitable for voice control. Finds links, buttons, and inputs, extracts their accessible names (aria-label, aria-labelledby, visible text), normalizes names (lowercase, collapse whitespace, truncate to 60), identifies duplicate names used by multiple controls which would prevent voice targeting, and counts excessively long names (>6 words) which are harder to speak. Displays an alert with counts of duplicates and long names. Useful for testing voice control compatibility.
	try {
		function nameOf(el) {
			const byId = (id) =>
				id && document.getElementById(id)?.innerText.trim();
			if (el.getAttribute('aria-label'))
				return el.getAttribute('aria-label').trim();
			const lb = el.getAttribute('aria-labelledby');
			if (lb) {
				return lb
					.split(/\s+/)
					.map(byId)
					.filter(Boolean)
					.join(' ')
					.trim();
			}
			const t = (el.innerText || '').trim();
			return t || el.getAttribute('title') || '';
		}
		const ctrls = [
			...document.querySelectorAll(
				'a[href],button,[role="button"],input,select,textarea'
			),
		].filter((e) => e.offsetParent);
		const names = ctrls
			.map((el) => nameOf(el).toLowerCase().replace(/\s+/g, ' ').trim())
			.map((s) => s.slice(0, 60));
		const map = new Map();
		names.forEach((n, i) => {
			if (!n) return;
			const arr = map.get(n) || [];
			arr.push(ctrls[i]);
			map.set(n, arr);
		});
		const dups = [...map.entries()].filter(
			([n, els]) => els.length > 1 && n.length > 0
		);
		const longNames = names.filter(
			(n) => n && n.split(' ').length > 6
		).length;
		alert(`Duplicate names: ${dups.length}  Long names: ${longNames}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Voice command readiness
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

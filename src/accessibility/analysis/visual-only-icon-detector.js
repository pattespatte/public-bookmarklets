(function () {
	'use strict';
	// Description: The Visual Only Icon Detector bookmarklet identifies icon-only controls that may have insufficient accessible names. Finds small buttons/links (≤40x40px) with no visible text but containing SVG or background images, checks for aria-label, title, or aria-labelledby, flags controls with very short names (<3 characters) as potential issues, outlines problematic icons in red, and displays an alert with the count of at-risk controls. Hover over outlined elements to see their status. Useful for finding icon buttons that need better labels. Run again to remove. WCAG SC 2.5.3: Label in Name.
	try {
		const ID = 'a11y-icon-only';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
		function nameOf(el) {
			return (
				el.getAttribute('aria-label') ||
				el.getAttribute('title') ||
				el.getAttribute('aria-labelledby') ||
				''
			);
		}
		const q = 'button,a,[role="button"]';
		const els = [...document.querySelectorAll(q)].filter(
			(e) => e.offsetParent
		);
		let risk = 0;
		els.forEach((el) => {
			const r = el.getBoundingClientRect();
			const hasText = (el.innerText || '').trim().length > 0;
			const hasSvg = el.querySelector('svg');
			const hasBg = /url\(/.test(
				getComputedStyle(el).backgroundImage || ''
			);
			const small = r.width <= 40 && r.height <= 40;
			const nm = (nameOf(el) || '').trim();
			const bad = small && !hasText && (hasSvg || hasBg) && nm.length < 3;
			if (bad) {
				risk++;
				const b = document.createElement('div');
				b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;border:3px solid #e00`;
				b.title = 'Suspect icon only control';
				wrap.appendChild(b);
			}
		});
		document.body.appendChild(wrap);
		alert(`Icon only risk count: ${risk}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Visual only icon detector
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

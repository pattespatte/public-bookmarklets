(function () {
	'use strict';
	// Description: The Multilingual and BIDI Audit bookmarklet checks language and direction attributes against actual text content. Detects RTL script characters (Hebrew, Arabic ranges), identifies elements containing RTL text without `dir="rtl"`, checks for missing `lang` attributes, highlights language issues in orange dashed borders, highlights direction issues in red solid borders, and displays an alert with the total count of issues. Run again to remove. WCAG SC 3.1.1: Language of Page, WCAG SC 3.1.2: Language of Parts.
	try {
		const rtl = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/; // Hebrew, Arabic ranges
		const ID = 'a11y-bidi';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
		const nodes = [
			...document.querySelectorAll(
				'p,span,div,li,th,td,h1,h2,h3,h4,h5,h6'
			),
		].filter((e) => e.offsetParent && (e.innerText || '').trim());
		let issues = 0;
		for (const el of nodes) {
			const text = el.innerText.trim();
			const hasRTL = rtl.test(text);
			const dirAttr = (
				el.dir ||
				document.documentElement.dir ||
				'ltr'
			).toLowerCase();
			const lang =
				el.closest('[lang]')?.getAttribute('lang') ||
				document.documentElement.getAttribute('lang') ||
				'';
			if (hasRTL && dirAttr !== 'rtl') {
				const r = el.getBoundingClientRect();
				const b = document.createElement('div');
				b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;border:3px solid #e00`;
				b.title = 'RTL text without dir=rtl';
				wrap.appendChild(b);
				issues++;
			}
			if (!lang) {
				const r = el.getBoundingClientRect();
				const b = document.createElement('div');
				b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;border:2px dashed #f80`;
				b.title = 'Missing lang';
				wrap.appendChild(b);
				issues++;
			}
		}
		document.body.appendChild(wrap);
		alert(`Language or dir issues: ${issues}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Multilingual and bidi audit
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

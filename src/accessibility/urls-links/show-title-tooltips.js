(function () {
	'use strict';
	// Description: The Show Title Tooltips bookmarklet reveals elements that rely on the `title` attribute for supplemental information. Finds all elements with a `title` attribute, outlines them with a dotted purple line, and inserts the title text content visibly next to each element. This helps identify uses of the title attribute, which has poor accessibility support (not reliably exposed to assistive technologies). Displays an alert with the count of highlighted elements. Reload the page to remove highlights. WCAG SC 2.4.4: Link Purpose (In Context)—note that title attributes alone are not sufficient for accessibility.
	try {
		const els = [...document.querySelectorAll('[title]')];
		els.forEach((el) => {
			el.style.outline = '2px dotted #c0c';
			el.insertAdjacentHTML(
				'afterend',
				`<small style="background:#ffe;border:1px solid #cc9;border-radius:4px;padding:2px 4px;margin-left:4px">${el.getAttribute('title')}</small>`
			);
		});
		alert(els.length + ' elements with title attribute highlighted');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Show title tooltips
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

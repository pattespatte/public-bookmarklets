(function () {
	'use strict';
	// Description: The Language Check bookmarklet reports the page's primary language and identifies elements with different language attributes. Extracts the `lang` attribute from the document element, finds all elements with their own `lang` attribute that are direct descendants (not nested inside other lang elements), and displays an alert showing the page language and a list of any element-level language declarations. Useful for verifying proper language markup when content changes languages. WCAG SC 3.1.1: Language of Page, WCAG SC 3.1.2: Language of Parts.
	try {
		const pageLang =
			document.documentElement.getAttribute('lang') || '(none)';
		const diffs = [...document.querySelectorAll('[lang]')]
			.filter((el) => el.closest('[lang]') === el)
			.map(
				(el) =>
					`${el.tagName.toLowerCase()} lang="${el.getAttribute('lang')}"`
			);
		alert(
			'Page lang: ' +
				pageLang +
				'\nTop-level elements with lang: \n' +
				(diffs[0] ? diffs.join('\n') : '(none)')
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Language check
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

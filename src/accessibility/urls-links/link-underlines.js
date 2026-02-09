// Description: Force underlines on all links. Injects a CSS rule that applies text-decoration: underline to all anchor elements, making all links visibly underlined. Useful for verifying link visibility and meeting accessibility requirements for linked text identification. Reload the page to remove the underlines. WCAG SC 1.4.1: Use of Color.
(function () {
	'use strict';
	try {
		var style = document.createElement('style');
		document.head.appendChild(style);
		var sheet = style.sheet;
		sheet.insertRule('a[href]{text-decoration:underline !important}', 0);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Link Underlines
`);

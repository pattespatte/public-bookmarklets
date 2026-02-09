// Description: Copy the page title to clipboard via prompt. Displays the document.title in a prompt dialog for easy copying (Cmd+C on Mac, Ctrl+C elsewhere). Useful for quickly grabbing page titles for documentation, citations, or sharing.
(function () {
	'use strict';
	try {
		prompt('Copy Page Title (Press Cmd+C or Ctrl+C)', document.title);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Page Title
`);

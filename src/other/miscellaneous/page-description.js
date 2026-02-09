// Description: Show and copy the meta description content. Finds the meta description tag in the document head and displays its content attribute in a prompt dialog for easy copying. If no meta description tag exists, alerts the user. Useful for SEO review and content documentation.
(function () {
	'use strict';
	try {
		var descriptionTag = document.querySelector('meta[name="description"]');
		if (descriptionTag) {
			prompt(
				'Copy Page Description (Press Cmd+C or Ctrl+C)',
				descriptionTag.getAttribute('content')
			);
		} else {
			alert('No meta description tag found on this page.');
		}
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Page Description
`);

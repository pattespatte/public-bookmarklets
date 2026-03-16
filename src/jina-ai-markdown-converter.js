// Description: Opens the current page through Jina AI Reader, a free service that converts web pages to clean Markdown format. Perfect for reading content distraction-free or saving articles as Markdown. Works around CORS and some access restrictions.
(function () {
	'use strict';
	try {
		const currentUrl = location.href;
		// Remove protocol for jina.ai (it handles both http and https)
		const urlWithoutProtocol = currentUrl.replace(/^https?:\/\//, '');
		const proxyUrl = 'https://r.jina.ai/' + urlWithoutProtocol;
		location.href = proxyUrl;

		console.log(`
Source: https://github.com/pattespatte/public-bookmarklets
Bookmarklet name: Jina AI Markdown Converter
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

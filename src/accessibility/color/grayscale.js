// Description: Toggle grayscale filter on the page. Applies a grayscale(1) CSS filter to the document body, rendering the entire page in shades of gray. Running again removes the filter and restores full color. Useful for testing color-independent design and simulating grayscale displays. WCAG SC 1.4.1: Use of Color.
(function () {
	'use strict';
	try {
		function setFilter(filter) {
			document.body.style.filter = filter;
			document.body.style.webkitFilter = filter;
		}

		if (window.isGrayscale) {
			setFilter('none');
			window.isGrayscale = false;
		} else {
			setFilter('grayscale(1)');
			window.isGrayscale = true;
		}
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Grayscale
`);

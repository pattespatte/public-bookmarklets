// Description: The Show Performance bookmarklet loads the performance-bookmarklet library to display detailed page performance metrics. Injects the external script from micmro.github.io which analyzes and displays performance data including navigation timing, resource timing, and various performance metrics. Includes error handling for CSP blocking with a fallback suggestion to manually run the script. Useful for diagnosing performance issues.
(function () {
	var el = document.createElement('script');
	el.type = 'text/javascript';
	el.src =
		'https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js';
	el.onerror = function () {
		alert(
			'Looks like the Content Security Policy directive is blocking the use of bookmarklets\n\nYou can copy and paste the content of:\n\n"https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js"\n\ninto your console instead\n\n(link is in console already)'
		);
		console.log(
			'https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js'
		);
	};
	document.getElementsByTagName('body')[0].appendChild(el);
})();

console.log(`
Source: https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#show-performance
Bookmarklet name: performanceBookmarklet
`);

// Description: The Landmarks (accessibility-bookmarklets.org) bookmarklet loads a comprehensive landmark region and accessibility checker from the external accessibility-bookmarklets.org service. Fetches the landmarks.js script and associated styles, displays an interactive panel showing all ARIA landmarks and HTML5 semantic regions, provides navigation between landmarks, and identifies accessibility issues. Requires internet connection to load the external library. Run again to toggle. WCAG SC 1.3.1: Info and Relationships.
if (window.a11yLandmarks) window.a11yLandmarks.run();
else {
	(function () {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'https://accessibility-bookmarklets.org/build/styles.css';
		document.getElementsByTagName('head')[0].appendChild(link);
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src =
			'https://accessibility-bookmarklets.org/build/landmarks.js';
		document.getElementsByTagName('head')[0].appendChild(script);
	})();

	console.log(`
Source: https://accessibility-bookmarklets.org
Bookmarklet name: Landmarks accessibility-bookmarklets (WCAG SC 1.3.1)
`);
}

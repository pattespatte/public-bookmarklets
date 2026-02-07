(function () {
	'use strict';
	// Description: The Toggle Prefers Reduced Motion bookmarklet injects CSS to simulate the `prefers-reduced-motion: reduce` media query, disabling all animations and transitions on the page. Uses a media query rule to set `animation: none !important` and `transition: none !important` for all elements when the reduced motion preference is active. Run again to remove. Useful for testing whether pages properly respect users' motion preferences. WCAG SC 2.3.3: Animation from Interactions.
	try {
		const ID = 'a11y-prm';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const s = document.createElement('style');
		s.id = ID;
		s.textContent =
			'@media (prefers-reduced-motion: reduce){*{animation:none !important;transition:none !important}}';
		document.head.appendChild(s);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Toggle prefers-reduced-motion
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

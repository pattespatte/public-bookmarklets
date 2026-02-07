// Description: The A11Y Tabbings bookmarklet loads a comprehensive tabbable/focusable element reviewer from the external accessibility-bookmarklet library. Fetches and initializes the tabbable-reviewer-ui.js library, which displays an interactive panel showing all tabbable elements in their tab order, allows stepping through focus elements, and identifies potential keyboard navigation issues. Requires internet connection to load the external library. WCAG SC 2.1.1: Keyboard, WCAG SC 2.4.3: Focus Order.
(function () {
	/* From https://github.com/metageeky/accessibility-bookmarklet by metageeky. Mozilla Public License Version 2.0 */ function a() {
		loadingNotice(
			'A11Y Tabbable Reviewer is loading...<br>Refresh page to cancel'
		);
		runA11YTool(b);
	}
	function b() {
		createTabbingReviewer();
		removeLoadingNotice();
	}
	if (typeof document.A11Y_REQUIREMENTS === 'undefined') {
		document.A11Y_REQUIREMENTS = [];
	}
	document.A11Y_REQUIREMENTS.push('tabbable-reviewer-ui.js');
	var c = document.createElement('script');
	c.onload = a;
	c.src =
		'https://metageeky.github.io/accessibility-bookmarklet/libraries/a11y-core-functions.js';
	document.body.appendChild(c);
})();

console.log(`
Source: https://metageeky.github.io/accessibility-bookmarklet/
Bookmarklet name: A11Y Tabbings
`);

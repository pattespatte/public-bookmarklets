// Description: The A11Y Graphics bookmarklet loads an image reviewer tool from the external accessibility-bookmarklet library. Fetches the image-reviewer-ui.js module which provides a panel for reviewing all images on the page, checking for alt text, analyzing decorative vs informative images, and flagging accessibility issues. Requires internet connection to load the external library. WCAG SC 1.1.1: Non-text Content.
(function () {
	/* From https://github.com/metageeky/accessibility-bookmarklet by metageeky. Mozilla Public License Version 2.0 */ function b() {
		loadingNotice(
			'A11Y Image Reviewer is loading...<br>Refresh page to cancel'
		);
		runA11YTool(a);
	}
	function a() {
		createImageReviewer();
		removeLoadingNotice();
	}
	if (typeof document.A11Y_REQUIREMENTS === 'undefined') {
		document.A11Y_REQUIREMENTS = [];
	}
	document.A11Y_REQUIREMENTS.push('image-reviewer-ui.js');
	var c = document.createElement('script');
	c.onload = b;
	c.src =
		'https://metageeky.github.io/accessibility-bookmarklet/libraries/a11y-core-functions.js';
	document.body.appendChild(c);
})();

console.log(`
Source: https://metageeky.github.io/accessibility-bookmarklet/
Bookmarklet name: A11Y Graphics
`);

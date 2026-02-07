// Description: The A11Y LibGuide bookmarklet generates a comprehensive accessibility report formatted for library/content guide audits using the axe-core library. Loads the external accessibility-bookmarklet library with axe-core integration, runs automated accessibility tests, formats results specifically for library/educational content guidelines, and displays the report with issues organized by severity. Requires internet connection to load the external library. Uses axe-core for WCAG compliance testing.
(function () {
	/* From https://github.com/metageeky/accessibility-bookmarklet by metageeky. Mozilla Public License Version 2.0 */ function a11yStartup() {
		loadingNotice('A11Y Reporter is loading...<br>Refresh page to cancel');
		runA11YTool(generateReport);
	}
	function generateReport() {
		axe.run().then((results) => {
			writeLibGuideReport(results);
		});
		removeLoadingNotice();
	}
	/* RUNNING CODE */ if (typeof document.A11Y_REQUIREMENTS === 'undefined')
		document.A11Y_REQUIREMENTS = [];
	document.A11Y_REQUIREMENTS.push('general-report-tests.js');
	document.A11Y_REQUIREMENTS.push('libguide-report-tests.js');
	document.A11Y_REQUIREMENTS.push('report-ui.js');
	document.A11Y_REQUIREMENTS.push('image-reviewer-ui.js');
	document.A11Y_REQUIREMENTS.push('tabbable-reviewer-ui.js');
	var e = document.createElement('script');
	e.onload = a11yStartup;
	e.src =
		'https://metageeky.github.io/accessibility-bookmarklet/libraries/a11y-core-functions.js';
	document.body.appendChild(e);
})();

console.log(`
Source: https://metageeky.github.io/accessibility-bookmarklet/
Bookmarklet name: A11Y LibGuide
`);

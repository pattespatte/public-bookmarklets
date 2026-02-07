// Description: The A11Y Reporter bookmarklet generates a comprehensive automated accessibility report using the axe-core testing engine. Loads the external accessibility-bookmarklet library with axe-core integration, runs a full page accessibility audit testing against WCAG rules, displays violations, passes, and incomplete results in an interactive panel, and includes image reviewer and tabbable element analysis. Requires internet connection to load the external library. Uses axe-core for WCAG compliance testing across all success criteria.
(function () {
	/* From https://github.com/metageeky/accessibility-bookmarklet by metageeky. Mozilla Public License Version 2.0 */ function a11yStartup() {
		loadingNotice('A11Y Reporter is loading...<br>Refresh page to cancel');
		runA11YTool(generateReport);
	}
	function generateReport() {
		axe.run().then((results) => {
			writeGeneralReport(results);
		});
		removeLoadingNotice();
	}
	/* RUNNING CODE */ if (typeof document.A11Y_REQUIREMENTS === 'undefined')
		document.A11Y_REQUIREMENTS = [];
	document.A11Y_REQUIREMENTS.push('general-report-tests.js');
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
Bookmarklet name: A11Y Reporter
`);

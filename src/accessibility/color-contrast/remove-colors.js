// Description: Remove Colors bookmarklet that overrides page colors to black text on white background. Useful for testing that information is not conveyed by color alone. Helps verify compliance with color-only information requirements. WCAG SC 1.4.1: Use of Color.
(function () {
	var newSS,
		styles =
			'* { background: white !important; color: black !important } :link, :link * { color: #00e !important } :visited, :visited * { color: #551a8b !important }';
	if (document.createStyleSheet) {
		document.createStyleSheet("javascript:'" + styles + "'");
	} else {
		newSS = document.createElement('link');
		newSS.rel = 'stylesheet';
		newSS.href = 'data:text/css,' + escape(styles);
		document.getElementsByTagName('head')[0].appendChild(newSS);
	}
})();

console.log(`
Source: https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#remove-colors
Bookmarklet name: Remove Colors
`);

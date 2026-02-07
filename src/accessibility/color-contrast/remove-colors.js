// Description: Remove Colors bookmarklet
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

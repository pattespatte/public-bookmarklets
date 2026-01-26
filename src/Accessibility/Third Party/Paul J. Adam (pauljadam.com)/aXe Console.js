(function () {
	document.body.appendChild(document.createElement('script')).src = 'https://cdn.staticaly.com/gh/pauljadam/bookmarklets/master/axe.js';
	var iframes = document.getElementsByTagName('iframe');
	for (i = 0; i < iframes.length; i++) {
		iframes[i].contentDocument.body.appendChild(document.createElement('script')).src = 'https://cdn.staticaly.com/gh/pauljadam/bookmarklets/master/axe.js';
	}
})();

console.log(`
Source: https://pauljadam.com/bookmarklets/axe.html
Bookmarklet name: aXe Console.log
`);

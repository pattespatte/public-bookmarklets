// Description: The Check Language bookmarklet displays the page's declared language using W3C methodology. Extracts the lang or xml:lang attribute from the html element, uses Intl.DisplayNames to convert the language code to a human-readable language name (e.g., "en" → "English"), displays a centered modal panel showing the detected language, or warns if no language is specified, and includes a link to W3C's "Checking Page Language" guidance. Close with X or dismiss link. WCAG SC 3.1.1: Language of Page.
void (function () {
	document.querySelectorAll('#wai-styles,#wai-info-box').forEach((a) => {
		a.remove();
	});
	document
		.querySelector('body')
		.insertAdjacentHTML(
			'afterbegin',
			"<style id='wai-styles'>#wai-info-box{position:fixed;width:40%;top:40%;left:50%;transform:translate(-50%,-50%);z-index:1000;color:black;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif}#wai-info-box{border:solid 1px #ddd;background-color:#fff;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);}#wai-info-box header{font-weight:700;background-color:#f2f2f2;color:#005a6a;padding:8px 16px;}#wai-info-box header a{float:right;text-decoration:none}#wai-info-box div{padding:8px 16px;}#wai-info-box div span{font-weight:700;}</style>"
		);

	let a = navigator.language || navigator.userLanguage,
		b = new Intl.DisplayNames([a], { type: 'language' });
	var c = '';
	let d =
		document.documentElement.lang ||
		document.getElementsByTagName('html')[0].getAttribute('xml:lang');

	c += d
		? '<span>' + d + ' (' + b.of(d) + ')</span>'
		: 'Page language is not specified';

	document
		.querySelector('body')
		.insertAdjacentHTML(
			'beforeend',
			"<aside id='wai-info-box' tabindex='-1'><header>Page Language<a href=javascript:document.querySelectorAll('#wai-styles,#wai-info-box').forEach(function(el){el.remove()}); aria-label=dismiss>X</a></header><div>" +
				c +
				"<p>Find out more about <a href='https://www.w3.org/wai/test-evaluate/easy-checks/language/'>Checking Page Language</a></div></aside>"
		);

	document.getElementById('wai-info-box').focus();
})();

console.log(`
Source: https://www.w3.org/WAI/test-evaluate/easy-checks/language/
Bookmarklet name: Check language on this page
`);

// Description: The Check Required Fields bookmarklet identifies and highlights all required form fields on the page using W3C methodology. Finds labels for required fields (via required attribute, asterisk in label text, or repeated required text patterns), adds yellow "Required field" badges above each required field label, outlines labels with dashed yellow lines, and displays an informational panel in the bottom-right corner with a link to W3C's "Checking Required Fields" guidance. Run again to remove badges and panel. WCAG SC 3.3.2: Labels or Instructions.
void (function () {
	(document
		.querySelectorAll('#wai-styles,#wai-info-box,.required-span')
		.forEach(function (a) {
			a.remove();
		}),
		document
			.querySelector('body')
			.insertAdjacentHTML(
				'afterbegin',
				"<style id='wai-styles'>#wai-info-box{z-index:1000;color:black;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif;border:solid 1px #ddd;background-color:#fff;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);}#wai-info-box header{font-weight:700;background-color:#f2f2f2;color:#005a6a;padding:8px 16px;}#wai-info-box header a{float:right;text-decoration:none}#wai-info-box div{padding:8px 16px;}.wai-more-info{position:fixed;bottom:5em;right:5em}.wai-error{position:fixed;width:40%;top:40%;left:50%;transform:translate(-50%,-50%)}.required-span{display:block;width:fit-content;color:black;font-weight:bold;font-size:small;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif;background-color:#eed009;padding:4px;speak:literal-punctuation}.required-label{outline:#eed009 2px dashed}</style>"
			));

	const a = Array.prototype.slice.call(document.querySelectorAll('label')),
		b = [],
		c = [];

	if (a) {
		for (let d, e = 0; e < a.length; e++) {
			((d = ''),
				(d = a[e].querySelector('input,select,textarea'))
					? (d.required || a[e].innerText.search(/\*/)) &&
						b.push({
							labelText: a[e].innerText,
							label: a[e],
							field: d,
						})
					: a[e].getAttribute('for') &&
						((d = document.getElementById(
							a[e].getAttribute('for')
						)),
						(d.required || 0 < a[e].innerText.search(/\*/)) &&
							b.push({
								labelText: a[e].innerText,
								label: a[e],
								field: d,
							})));
			let f = [...a[e].innerText.matchAll(/\w{2,}/g)];
			f.forEach((a) => {
				c[a[0]] ? c[a[0]]++ : (c[a[0]] = 1);
			});
		}

		for (let d in c)
			if (2 < c[d]) {
				let c = a.filter(function (a) {
					return 0 <= a.textContent.search(d);
				});
				if (0 < c.length)
					for (let a = 0; a < c.length; a++)
						b[c[a].innerText] ||
							b.push({
								labelText: c[a].innerText,
								label: c[a],
								requiredText: d,
							});
			}

		for (let a, c = 0; c < b.length; c++) {
			((a = b[c]),
				a.requiredText
					? (a.label.classList.add('required-label'),
						a.label.insertAdjacentHTML(
							'afterbegin',
							"<span class='required-span'>Correctly marked with '" +
								a.requiredText +
								"'?</span>"
						))
					: (a.label.classList.add('required-label'),
						a.label.insertAdjacentHTML(
							'afterbegin',
							"<span class='required-span'>Required field</span>"
						)));
		}

		document
			.querySelector('body')
			.insertAdjacentHTML(
				'beforeend',
				"<aside id='wai-info-box' class='wai-more-info'><header>Find out more<a href=javascript:document.querySelectorAll('#wai-styles,#wai-info-box,.required-span').forEach(function(el){el.remove()}); aria-label=dismiss>X</a></header><div><a href='https://w3.org/wai/test-evaluate/easy-checks/required-fields/'>Checking Required Fields</a></div></aside>"
			);
	}
})();

console.log(`
Source: https://www.w3.org/WAI/test-evaluate/easy-checks/required-fields/
Bookmarklet name: Check required fields on this page
`);

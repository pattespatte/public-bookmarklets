// Description: The GA Tracking Code bookmarklet finds and displays all Google Analytics and Google Tag Manager tracking codes on the page. Searches script src attributes and inline script content for tracking IDs matching patterns: UA-XXXXXXXXX-X (Universal Analytics), G-XXXXXXXXXX (Google Analytics 4), and GTM-XXXXXX (Google Tag Manager). Displays found tracking codes in a floating panel with a textarea for easy copying and a copy button. Alerts if no tracking codes are found. Useful for SEO and analytics verification.
!(function () {
	let e = (function e() {
		let t = document.getElementsByTagName('script'),
			n = [];
		for (let l of t) {
			if (l.src) {
				let a = l.src.match(
					/(UA-\d{4,9}-\d{1,4}|G-[A-Za-z0-9]+|GTM-[A-Za-z0-9]+)/
				);
				a && n.push(a[0]);
			}
			if (l.innerHTML) {
				let i = l.innerHTML.match(/UA-\d{4,9}-\d{1,4}/),
					o = l.innerHTML.match(/G-[A-Za-z0-9]+/),
					s = l.innerHTML.match(/GTM-[A-Za-z0-9]+/);
				(i && n.push(i[0]), o && n.push(o[0]), s && n.push(s[0]));
			}
		}
		return n;
	})();
	if (e.length > 0) {
		var t;
		let n, l, a, i, o;
		((t = e),
			((n = document.createElement('div')).style.position = 'fixed'),
			(n.style.top = '10%'),
			(n.style.left = '50%'),
			(n.style.transform = 'translateX(-50%)'),
			(n.style.padding = '20px'),
			(n.style.backgroundColor = 'white'),
			(n.style.border = '1px solid #ccc'),
			(n.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'),
			(n.style.zIndex = '10000'),
			(n.style.maxWidth = '600px'),
			(n.style.wordBreak = 'break-word'),
			((l = document.createElement('h2')).innerText =
				'Google Analytics & GTM Tags'),
			(l.style.margin = '0 0 10px 0'),
			(l.style.fontSize = '1.125rem'),
			(l.style.fontFamily = 'Arial, sans-serif'),
			n.appendChild(l),
			((a = document.createElement('textarea')).style.width = '100%'),
			(a.style.height = '400px'),
			(a.style.marginBottom = '10px'),
			(a.value = t.join('\n')),
			n.appendChild(a),
			((i = document.createElement('button')).innerText = 'Copy'),
			(i.style.marginRight = '10px'),
			(i.onclick = function () {
				(a.select(), document.execCommand('copy'));
			}),
			n.appendChild(i),
			((o = document.createElement('button')).innerText = 'Close'),
			(o.onclick = function () {
				document.body.removeChild(n);
			}),
			n.appendChild(o),
			document.body.appendChild(n));
	} else alert('No Google Analytics or GTM tags found.');
})();

console.log(`
Source: https://www.kyleplace.com/post/seo-bookmarklets#viewer-72rwm47669
Bookmarklet name: Show GA Tracking Codes
`);

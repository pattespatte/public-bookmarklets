// Description: The Reading Order bookmarklet visualizes the reading order of content elements based on their display layout. Prompts for a CSS selector (default searches common elements) and display type ("flex" or "grid"), then numbers visible child elements in sequence to show the order they would be encountered. Elements matching the display type are outlined in red, their visible children are outlined in blue, and numbered badges show the reading sequence. Useful for identifying CSS layout issues that affect logical reading order. WCAG SC 1.3.2: Meaningful Sequence.
javascript: (function () {
	try {
		var e,
			t = prompt('Selector? (blank searches most)', ''),
			r = prompt('Flex or grid?', 'grid'),
			n = document.createElement('style');

		document.head.appendChild(n);
		(e = n.sheet).insertRule(
			"#ReadingOrderContainer span{position:absolute;border:.1rem solid #00f;border-radius:50%;background:#fff;color:#000;padding:.25rem .5rem;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;text-align:center;min-width:1rem;line-height:1;box-shadow:.2rem .2rem .2rem rgba(0,0,0,.5);margin-left:-.5rem;margin-top:-.75rem}",
			0
		);
		e.insertRule(
			'#ReadingOrderContainer span:focus,#ReadingOrderContainer span:hover{background-color:#00f;color:#fff;z-index:500;outline:0}',
			0
		);

		if ('' == t) {
			var o = document.querySelectorAll(
				'address, article, aside, blockquote, caption, details, dialog, dd, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, li, main, nav, ol, p, pre, section, table, td, th, ul, img, video, button, input, select, textarea'
			);
		} else {
			o = document.querySelectorAll(t);
		}

		for (var d = [], a = [], i = 0, l = 0, s = 0; s < o.length; s++) {
			if (
				window.getComputedStyle(o[s]).getPropertyValue('display') === r
			) {
				d[i] = o[s];
				i += 1;
				o[s].style.outline = '.4rem dotted rgba(255,0,0,.5)';

				for (var c = 0; c < o[s].children.length; c++) {
					if (
						'none' !==
						window
							.getComputedStyle(o[s].children[c])
							.getPropertyValue('display')
					) {
						a[l] = o[s].children[c];
						l += 1;
						o[s].children[c].style.outline =
							'.1rem solid rgba(0,0,255,.25)';
					}
				}
			}
		}

		var m = document.getElementById('ReadingOrderContainer');
		m && m.parentNode && m.parentNode.removeChild(m);

		var u = document.querySelector('body'),
			g = document.createElement('aside');

		g.id = 'ReadingOrderContainer';
		u.appendChild(g);

		var p = document.getElementById('ReadingOrderContainer'),
			h = 1;

		for (c = 0; c < a.length; c++) {
			var f = a[c].getBoundingClientRect(),
				y = document.createElement('span');

			y.setAttribute('class', 'poscount');
			y.setAttribute('tabindex', '0');
			y.innerText = h;
			y.style.left = f.left + 'px';
			y.style.top = f.top + 'px';
			p.appendChild(y);
			h += 1;
		}
	} catch (e) {
		console.log('getNodes(): ' + e);
	}
})();

console.log(`
Source: https://adrianroselli.com/2019/04/reading-order-bookmarklet.html
Bookmarklet name: Reading Order
`);

// Description: HTML_CodeSniffer is a client-side JavaScript code that checks HTML against WCAG 2.0, 2.1, and 2.2, and Section 508 accessibility rules. Loads from Squiz Labs CDN and provides a comprehensive accessibility audit interface. WCAG SC: Multiple.
(function () {
	'use strict';
	try {
		// ===== HTML_CODESNIFFER =====
		// Source: https://github.com/squizlabs/HTML_CodeSniffer
		// License: BSD 3-Clause License
		// HTML_CodeSniffer bookmarklet - loads from Squiz Labs CDN

		(function () {
			var _p = '//squizlabs.github.io/HTML_CodeSniffer/build/';
			var _i = function (s, cb) {
				var sc = document.createElement('script');
				sc.onload = function () {
					sc.onload = null;
					sc.onreadystatechange = null;
					cb.call(this);
				};
				sc.onreadystatechange = function () {
					if (/^(complete|loaded)$/.test(this.readyState) === true) {
						sc.onreadystatechange = null;
						sc.onload();
					}
				};
				sc.src = s;
				if (document.head) {
					document.head.appendChild(sc);
				} else {
					document.getElementsByTagName('head')[0].appendChild(sc);
				}
			};
			var _run = function () {
				if (typeof HTMLCS !== 'undefined') {
					HTMLCS.process(window.document, HTMLCS_Section508_WCAG2AAA, null);
				}
			};
			_i(_p + 'HTMLCS.js', function () {
				_i(_p + 'Auditor_Namespace.js', function () {
					_i(_p + 'Standards/WCAG2AAA.js', function () {
						_i(_p + 'Standards/Section508.js', function () {
							_run();
						});
					});
				});
			});
		})();
		// ===== END HTML_CODESNIFFER =====
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/squizlabs/HTML_CodeSniffer
Bookmarklet name: HTML_CodeSniffer
License: BSD 3-Clause License
Copyright: Squiz Pty Ltd
`);

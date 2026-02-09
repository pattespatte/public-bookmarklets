// Description: The Screen Reader Simulation bookmarklet approximates how screen reader users perceive a page by removing visual presentation and revealing accessibility markup. Prompts to include element role labels and optionally strip all CSS, removes decorative images (alt="", SVGs without roles), replaces images with their alt text, swaps aria-label and aria-labelledby content into visible text, reveals visually-hidden content in purple dashed outlines, removes aria-hidden elements, and displays accessible names in green boxes with image/SVG icons. Useful for understanding the screen reader experience without using assistive technology. WCAG SC 1.1.1: Non-text Content.
(function () {
	'use strict';
	try {
		(function () {
			let showElementRole = !1,
				removeAllExistingStyling = !1;

			function insertAfter(e, t) {
				t.parentNode.insertBefore(e, t.nextSibling);
			}

			function voidStylesheets(e) {
				var i, el;
				for (
					i = 0;
					i < e.styleSheets.length;
					i++
				)
					e.styleSheets.item(i).disabled = !0;
				for (
					i = 0, el = e.getElementsByTagName('*');
					i < el.length;
					i++
				)
					el[i].style.cssText = '';
			}

			function restrictImageHeights(e) {
				var t,
					l = e.createElement('style');
				e.head.appendChild(l),
					(t = l.sheet).insertRule(
						'img,figure {max-height:200px!important;width:auto!important;}',
						0
					),
					t.insertRule(
						'svg {max-height:40px!important;width:auto!important;}',
						0
					),
					t.insertRule(
						'video {max-width:500px!important;height:auto!important;}',
						0
					);
			}

			function addAppStyles() {
				var e,
					t = document.createElement('style');
				document.head.appendChild(t),
					(e = t.sheet).insertRule(
						'* {font-size:1.25rem}',
						0
					),
					e.insertRule(
						'.visually-hidden-revealed {outline:3px dashed purple;}',
						0
					),
					e.insertRule(
						'.img-warning {outline:3px dashed red;}',
						0
					),
					e.insertRule(
						'.swapped-text {outline:3px dashed green;background:#dbefdb;padding:3px;line-height:1.5;}',
						0
					),
					e.insertRule(
						'.img-type-indicator {display:inline-block;margin-left:5px}',
						0
					),
					e.insertRule(
						'table,th,td {outline:1px dotted black;}',
						0
					),
					e.insertRule('th,td {padding:3px;}', 0),
					e.insertRule(
						'button,[role=button] {padding:3px 20px;background:#dedede;border:3px solid black;display:inline-block;text-align:center;border-radius:5px;}',
						0
					),
					e.insertRule(
						'a,[role=link] {text-decoration:underline;color:blue;font-weight:normal;}',
						0
					),
					e.insertRule(
						'.append-element-role a:after,.append-element-role [role=link]:after {display:inline-block;margin-left:5px;content: "LINK"}',
						0
					),
					e.insertRule(
						'.append-element-role button:after,.append-element-role [role=button]:after {display:inline-block;margin-left:5px;content: "BUTTON"}',
						0
					);
			}

			function identifyAllVisualllyHiddenElements() {
				Array.from(
					document.querySelectorAll('.visually-hidden')
				).forEach((e) => {
					let t = document.createElement('span');
					(t.textContent = e.textContent),
						t.classList.add('visually-hidden-revealed'),
						insertAfter(t, e),
						e.remove();
				});
			}

			function findAllVisuallyHiddenText() {
				var e, t, cs;
				Array.from(document.querySelectorAll('*')).forEach((l) => {
					cs = getComputedStyle(l);
					for (
						var n = !1,
							a = !1,
							r = !1,
							o = !1,
							s = !1,
							d = !1,
							c = !1,
							p = !1,
							u = 0;
						u < cs.length;
						u++
					)
						(e = cs.item(u)),
							(t = cs.getPropertyValue(e)),
							'clip' === e &&
								'rect(1px, 1px, 1px, 1px)' === t &&
								(n = !0),
							'clip-path' === e &&
								'inset(100%)' === t &&
								(a = !0),
							'height' === e && '1px' === t && (r = !0),
							'overflow-x' === e &&
								'hidden' === t &&
								(o = !0),
							'overflow-y' === e &&
								'hidden' === t &&
								(s = !0),
							'position' === e &&
								'absolute' === t &&
								(d = !0),
							'white-space' === e &&
								'nowrap' === t &&
								(c = !0),
							'width' === e && '1px' === t && (p = !0);
					!0 === n &&
						!0 === a &&
						!0 === r &&
						!0 === o &&
						!0 === s &&
						!0 === d &&
						!0 === c &&
						!0 === p &&
						l.classList.add('visually-hidden');
				});
			}

			function voidStylesheetsInIframes() {
				Array.from(document.querySelectorAll('iframe')).forEach(
					(e) => {
						voidStylesheets(e.contentWindow.document),
							restrictImageHeights(e.contentWindow.document);
					}
				);
			}

			function removeDecorativeIMGs() {
				Array.from(
					document.querySelectorAll(
						'img[alt=""]:not(img[aria-label])'
					)
				).forEach((e) => {
					e.remove();
				});
			}

			function removeDecorativeSVGs() {
				Array.from(
					document.querySelectorAll(
						'svg:not([role=img][aria-label],[role=img][aria-labelledby])'
					)
				).forEach((e) => {
					e.remove();
				});
			}

			function identifyIMGsWithoutAlts() {
				Array.from(
					document.querySelectorAll('img:not(img[alt])')
				).forEach((e) => {
					let t = document.createElement('span');
					(t.textContent = e.getAttribute('src')),
						t.classList.add('img-warning'),
						insertAfter(t, e),
						e.remove();
				});
			}

			function replaceIMGsWithAltsWithText() {
				Array.from(document.querySelectorAll('img[alt]')).forEach(
					(e) => {
						let t = document.createElement('span');
						(t.textContent = e.getAttribute('alt')),
							t.classList.add('swapped-text'),
							t.classList.add('img'),
							insertAfter(t, e),
							e.remove();
					}
				);
			}

			function replaceAriaLabelsWithText() {
				Array.from(
					document.querySelectorAll(
						'a[aria-label],[role=link][aria-label],b[aria-label],[role=button][aria-label]'
					)
				).forEach((e) => {
					(e.textContent = e.getAttribute('aria-label')),
						e.classList.add('swapped-text'),
						e.classList.add('svg');
				});
			}

			function addImageIconsToSwappedImageText() {
				Array.from(
					document.querySelectorAll('.swapped-text.img')
				).forEach((e) => {
					let t = document.createElement('span');
					(t.textContent = '\uD83C\uDFDE️'),
						t.setAttribute('aria-hidden', 'true'),
						t.classList.add('img-type-indicator'),
						t.setAttribute(
							'title',
							'Alternative text from IMG element'
						),
						e.appendChild(t);
				}),
					Array.from(
						document.querySelectorAll('.swapped-text.svg')
					).forEach((e) => {
						let t = document.createElement('span');
						(t.textContent = '✳️'),
							t.setAttribute('aria-hidden', 'true'),
							t.classList.add('img-type-indicator'),
							t.setAttribute(
								'title',
								'Alternative text from SVG element'
							),
							e.appendChild(t);
					});
			}

			function replaceAriaLabelledByElsWithText() {
				var e = document.querySelectorAll('[aria-labelledby]');
				let t = document.querySelectorAll(
					'a[href],button,select,input:not([type="hidden"]),textarea,summary,area,[tabindex]:not(#WTFocusPanel):not([tabindex^="-1"]),[contenteditable]:not([contenteditable="false"])'
				);
				Array.from(e).forEach((e) => {
					let l = !1;
					if (
						(Array.from(t).forEach((t) => {
							e === t && (l = !0);
						}),
						l)
					) {
						let n = '',
							a = e.getAttribute('aria-labelledby'),
							r = a.split(' ');
						Array.from(r).forEach((e) => {
							if (document.querySelector('#' + e)) {
								let t =
									document.querySelector('#' + e)
										.textContent;
								t && (n += t + ' ');
							}
						}),
							(n = n.trim()),
							(e.textContent = n),
							e.classList.add('swapped-text'),
							e.removeAttribute('aria-labelledby');
					}
				});
			}

			function removeAllContentHiddenToAT() {
				Array.from(document.querySelectorAll('[aria-hidden]')).forEach(
					(e) => {
						e.remove();
					}
				);
			}

			confirm(
				'Do you want to include roles for interactive elements?\n[Only links and buttons included at present]\n\nOK - Include roles\nCancel - Leave them out'
			) && (showElementRole = !0),
				confirm(
					'Do you want to strip all existing styles?\n[This may reveal content/sections that are currently NOT visible to screen reader users and would be dynamically show/hidden]\n\nOK - Strip styles\nCancel - Leave as-is'
				) && (removeAllExistingStyling = !0),
				showElementRole &&
					document
						.querySelector('body')
						.classList.add('append-element-role'),
				removeAllContentHiddenToAT(),
				replaceAriaLabelledByElsWithText(),
				replaceAriaLabelsWithText(),
				removeDecorativeIMGs(),
				removeDecorativeSVGs(),
				identifyIMGsWithoutAlts(),
				replaceIMGsWithAltsWithText(),
				identifyAllVisualllyHiddenElements(),
				findAllVisuallyHiddenText(),
				removeAllExistingStyling &&
					voidStylesheets(document),
				restrictImageHeights(document),
				addAppStyles(),
				voidStylesheetsInIframes(),
				addImageIconsToSwappedImageText();
		})();

		console.log(`
Source: https://a11y-tools.com/bookmarklets/
Bookmarklet name: Screen Reader Simulation
Author: lloydi (Ian Lloyd)
License: Refer to https://a11y-tools.com for licensing information
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

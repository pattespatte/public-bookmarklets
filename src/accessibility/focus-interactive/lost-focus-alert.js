// Description: The Lost Focus Alert bookmarklet tracks focus changes on interactive elements and displays a large alert notification when focus is lost to the document body. This typically indicates a focus management bug where JavaScript intercepts a click/focus event but fails to properly set focus to a new element, leaving keyboard users stranded. The offending element is highlighted with a red outline and a warning icon. Alerts appear at the bottom of the screen with details logged to the console. Reload the page to stop tracking. WCAG SC 2.4.3: Focus Order.
(function () {
	console.log('Tracking focus loss now ------------------------------------');
	const focusableThings = document.querySelectorAll(
		'a[href],button,select,input:not([type="hidden"]),textarea,summary,area,[tabindex],[contenteditable]:not([contenteditable="false"])'
	);
	let activeEl, prevActiveEl, delayTimeout, statusTimeout;
	const statusNotif = document.createElement('div');

	function clearStatus() {
		clearTimeout(statusTimeout);
		statusTimeout = setTimeout(function () {
			statusNotif.innerHTML = '';
		}, 300);
	}

	statusNotif.setAttribute('role', 'alert');
	statusNotif.setAttribute('aria-atomic', 'false');
	statusNotif.setAttribute('id', 'focLostNotif');
	document.body.appendChild(statusNotif);

	let a = document.createElement('style'),
		b;
	document.head.appendChild(a);
	(b = a.sheet).insertRule('#focLostNotif:empty {visibility:hidden;}', 0);
	b.insertRule(
		'#focLostNotif {background:black;color:white;padding:1em;font-size:2em;border-radius:10px;outline:4px solid white;position:fixed;bottom:2em;left:50%;transform:translateX(-50%)}',
		0
	);
	b.insertRule('.elCausedLossOfFocus {outline:4px solid red}', 0);
	b.insertRule('.elCausedLossOfFocus:before {content:"\uD83D\uDEA8 "}', 0);

	Array.from(focusableThings).forEach((t) => {
		t.addEventListener('focus', (e) => {
			console.log('Focus: ', t);
			prevActiveEl = document.activeElement;
		});
		t.addEventListener('click', (t) => {
			clearTimeout(delayTimeout);
			delayTimeout = setTimeout(function () {
				activeEl = document.activeElement;
				statusNotif.innerHTML = '';
				if ('BODY' === activeEl.tagName) {
					console.log('\uD83D\uDEA8 FOCUS WAS LOST! \uD83D\uDEA8');
					console.log('* Active element before was = ', prevActiveEl);
					console.log('* Focus after = ', activeEl);
					prevActiveEl.classList.add('elCausedLossOfFocus');
					statusNotif.innerHTML =
						'FOCUS WAS LOST!<br>Check Console for details';
					clearStatus();
				}
			}, 100);
		});
	});
})();

console.log(`
Source: https://a11y-tools.com/bookmarklets/#lostfocus
Bookmarklet name: Lost focus alert
`);

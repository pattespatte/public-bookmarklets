(function () {
	'use strict';
	// Description: The Keyboard Behavior Unit Tester bookmarklet automatically tests whether interactive controls respond to keyboard activation. Finds links, buttons, and inputs, programmatically dispatches Enter and Space keyboard events, measures if click handlers were triggered, and reports elements that failed to respond to keyboard activation. Helps identify interactive elements that only work with mouse/touch input, which is a WCAG violation. Displays an alert with the count of silent (non-responsive) elements. WCAG SC 2.1.1: Keyboard.
	try {
		const ID = 'a11y-keytest';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
		}
		const q =
			'a[href],button,[role="button"],input[type="checkbox"],input[type="radio"]';
		const els = [...document.querySelectorAll(q)].filter(
			(e) => e.offsetParent
		);
		const silent = [];
		for (const el of els) {
			let activated = false;
			const onClick = () => (activated = true);
			el.addEventListener('click', onClick, { once: true });
			el.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
			);
			el.dispatchEvent(
				new KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
			);
			el.dispatchEvent(
				new KeyboardEvent('keydown', { key: ' ', bubbles: true })
			);
			el.dispatchEvent(
				new KeyboardEvent('keyup', { key: ' ', bubbles: true })
			);
			setTimeout(() => {
				if (!activated) silent.push(el);
			}, 30);
		}
		setTimeout(() => {
			alert(
				silent.length
					? `Silent on Enter and Space: ${silent.length}`
					: 'All tested controls responded'
			);
		}, 220);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Keyboard behavior unit tester
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

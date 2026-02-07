(function () {
	'use strict';
	// Description: The Focus Path Recorder bookmarklet records Tab key navigation through the page and generates a downloadable report. Records each Tab press, capturing the timestamp, element tag name, and accessible name (aria-label, ID, name, alt, or text content), and when Esc is pressed, downloads a text file named "focus-path.txt" with the complete navigation history. Useful for documenting focus order issues and verifying logical tab flow. WCAG SC 2.4.3: Focus Order.
	try {
		const events = [];
		function labelOf(el) {
			return (
				el.getAttribute('aria-label') ||
				el.id ||
				el.name ||
				el.alt ||
				el.innerText?.slice(0, 40) ||
				el.tagName
			);
		}
		function onKey(e) {
			if (e.key === 'Tab') {
				const el = document.activeElement;
				events.push({
					time: new Date().toISOString(),
					el: el.tagName.toLowerCase(),
					label: labelOf(el),
				});
			} else if (e.key === 'Escape') {
				document.removeEventListener('keydown', onKey, true);
				const text = events
					.map((x) => `${x.time}  ${x.el}  ${x.label}`)
					.join('\n');
				const blob = new Blob([text || 'No events recorded'], {
					type: 'text/plain',
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'focus-path.txt';
				a.click();
				setTimeout(() => URL.revokeObjectURL(url), 1000);
				alert('Saved focus-path.txt');
			}
		}
		alert('Recording Tab navigation. Press Esc to save.');
		document.addEventListener('keydown', onKey, true);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Focus path recorder
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

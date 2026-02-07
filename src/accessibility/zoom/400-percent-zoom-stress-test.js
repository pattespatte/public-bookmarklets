(function () {
	'use strict';
	// Description: The 400% Zoom Stress Test bookmarklet simulates a 320px viewport at 400% zoom to test WCAG reflow requirements. Wraps all page content in a container with `transform: scale(4)` and `width: 320px`, enables scrolling on the document element, and after a brief delay, checks for horizontal scrolling and overlapping content blocks (using bounding box intersection). Displays an alert with horizontal scroll status and overlap count. Run again to remove. WCAG SC 1.4.4: Resize text, WCAG SC 1.4.10: Reflow.
	try {
		const ID = 'a11y-zoom-wrap';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			document.documentElement.style.overflow = '';
			alert('Zoom test off');
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		while (document.body.firstChild) {
			wrap.appendChild(document.body.firstChild);
		}
		document.body.appendChild(wrap);
		wrap.style.transformOrigin = 'top left';
		wrap.style.transform = 'scale(4)';
		wrap.style.width = '320px';
		document.documentElement.style.overflow = 'auto';
		setTimeout(() => {
			const doc = document.documentElement;
			const hasX = doc.scrollWidth > doc.clientWidth + 1;
			// overlap heuristic
			const blocks = [
				...document.querySelectorAll(
					'p,li,div,section,article,main,header,footer,nav'
				),
			].filter((e) => e.offsetParent && (e.innerText || '').trim());
			let overlaps = 0;
			for (let i = 0; i < Math.min(200, blocks.length); i++) {
				const a = blocks[i].getBoundingClientRect();
				for (let j = i + 1; j < Math.min(200, blocks.length); j++) {
					const b = blocks[j].getBoundingClientRect();
					if (
						a.top < b.bottom &&
						b.top < a.bottom &&
						a.left < b.right &&
						b.left < a.right
					) {
						overlaps++;
						break;
					}
				}
			}
			alert(
				`Horizontal scroll: ${hasX ? 'yes' : 'no'}  Overlap pairs (sample): ${overlaps}`
			);
		}, 300);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: 400% zoom stress test
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

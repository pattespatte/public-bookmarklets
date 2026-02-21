(function () {
	'use strict';
	// Description: The Forced Colors Preview bookmarklet approximates the Windows high contrast mode / forced colors appearance. Applies CSS that overrides backgrounds to transparent/black, sets text to white, makes links cyan with underlines, gives form controls white borders on black backgrounds, and applies grayscale + contrast filters to images and videos. Useful for testing whether pages remain usable when users' color preferences override the site's design. Run again to remove. WCAG SC 1.4.11: Non-text Contrast.
	try {
		const ID = 'a11y-forced-colors';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const s = document.createElement('style');
		s.id = ID;
		s.textContent = `*{background:transparent !important; box-shadow:none !important}
		body{background:#000 !important; color:#fff !important}
		a{color:#0ff !important; text-decoration:underline !important}
		button,input,select,textarea{background:#000 !important; color:#fff !important; border:2px solid #fff !important}
		img,video,svg{filter:grayscale(100%) contrast(120%) !important}`;
		document.head.appendChild(s);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Forced colors preview
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

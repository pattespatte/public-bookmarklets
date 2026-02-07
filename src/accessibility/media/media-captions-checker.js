(function () {
	'use strict';
	// Description: The Media Captions Checker bookmarklet reports caption status, autoplay, and controls for video and audio elements. Finds all video and audio elements, checks for caption/subtitle tracks in textTracks, reports autoplay attribute status, reports controls attribute status, and displays an alert with each media element's status in the format: "TAG captions:yes/no autoplay:yes/no controls:yes/no". Useful for verifying media accessibility. No media found shows "No media found" alert. WCAG SC 1.2.2: Captions (Prerecorded), WCAG SC 1.2.4: Captions (Live), WCAG SC 1.4.2: Audio Control.
	try {
		const vids = [...document.querySelectorAll('video')];
		const auds = [...document.querySelectorAll('audio')];
		let msg = [];
		function check(el) {
			const tracks = [...(el.textTracks || [])];
			const hasCaptions = tracks.some(
				(t) =>
					/captions|subtitles/i.test(t.kind || '') ||
					/captions|subs/i.test(t.label || '')
			);
			const auto = el.autoplay;
			const controls = el.controls;
			msg.push(
				`${el.tagName} captions:${hasCaptions ? 'yes' : 'no'} autoplay:${auto ? 'yes' : 'no'} controls:${controls ? 'yes' : 'no'}`
			);
		}
		vids.forEach(check);
		auds.forEach(check);
		alert(msg.length ? msg.join('\n') : 'No media found');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Media captions checker
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

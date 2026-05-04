(function () {
	'use strict';
	// Description: The Media Captions Checker bookmarklet reports caption status, autoplay, and controls for video and audio elements. Finds all video and audio elements, checks for caption/subtitle tracks in textTracks, reports autoplay attribute status, reports controls attribute status, and displays an alert with each media element's status in the format: "TAG captions:yes/no autoplay:yes/no controls:yes/no". Useful for verifying media accessibility. No media found shows "No media found" alert. WCAG SC 1.2.2: Captions (Prerecorded), WCAG SC 1.2.4: Captions (Live), WCAG SC 1.4.2: Audio Control.
	const toast = (function () {
		const H = 'a11y-toast-host';
		return function (msg, type) {
			let host = document.getElementById(H);
			if (!host) {
				host = document.createElement('div');
				host.id = H;
				host.style.cssText =
					'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:2147483647;pointer-events:none';
				document.body.appendChild(host);
				const sh = host.attachShadow({ mode: 'open' });
				sh.innerHTML =
					'<style>@keyframes ti{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes to{from{opacity:1}to{opacity:0;transform:translateY(-8px)}}.t{animation:ti .2s ease-out;pointer-events:auto;color:#fff;font:13px/1.4 system-ui,-apple-system,sans-serif;border-radius:8px;padding:10px 16px;box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:pre-line;word-break:break-word;max-width:400px;text-align:center;cursor:pointer;margin-top:8px}.i{background:#333}.e{background:#b91c1c}.x{animation:to .2s ease-in forwards}</style><div id="s" style="display:flex;flex-direction:column-reverse;align-items:center"></div>';
			}
			const s = host.shadowRoot.getElementById('s');
			const d = document.createElement('div');
			d.className = 't ' + (type === 'error' ? 'e' : 'i');
			d.textContent = msg;
			d.onclick = function () {
				d.classList.add('x');
				setTimeout(function () {
					d.remove();
				}, 200);
			};
			s.appendChild(d);
			setTimeout(
				function () {
					d.classList.add('x');
					setTimeout(function () {
						d.remove();
					}, 200);
				},
				type === 'error' ? 8000 : 4000
			);
		};
	})();
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
		toast(msg.length ? msg.join('\n') : 'No media found');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Media captions checker
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

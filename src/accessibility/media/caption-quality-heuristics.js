(function () {
	'use strict';
	// Description: The Caption Quality Heuristics bookmarklet analyzes caption track quality for videos. Finds all video elements, filters to caption/subtitle tracks, analyzes cues for reading speed (words per minute), gaps between captions (dead air where no captions appear), overlapping captions, and displays an alert with statistics for each track: track label, WPM rate, total gap time in seconds, and overlap count. High WPM (>180) may be too fast to read comfortably; gaps indicate missing content; overlaps indicate poor caption timing. WCAG SC 1.2.2: Captions (Prerecorded).
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
		if (!vids.length) {
			toast('No videos');
			return;
		}
		let reports = [];
		vids.forEach((v) => {
			const tracks = [...(v.textTracks || [])].filter((t) =>
				/captions|subtitles/i.test(t.kind || '')
			);
			tracks.forEach((t) => {
				const cues = [...(t.cues || [])];
				let words = 0,
					gaps = 0,
					overlap = 0,
					totalDur = 0;
				for (let i = 0; i < cues.length; i++) {
					const c = cues[i];
					const next = cues[i + 1];
					words += (c.text || '')
						.trim()
						.split(/\s+/)
						.filter(Boolean).length;
					totalDur += c.endTime - c.startTime;
					if (next) {
						const gap = next.startTime - c.endTime;
						if (gap > 0) gaps += gap;
						if (gap < 0) overlap++;
					}
				}
				const dur =
					v.duration && isFinite(v.duration) ? v.duration : totalDur;
				const wpm = dur ? (words / dur) * 60 : 0;
				reports.push({
					track: t.label || 'captions',
					wpm: wpm.toFixed(0),
					gaps: gaps.toFixed(1),
					overlap,
				});
			});
		});
		toast(
			reports.length
				? reports
						.map(
							(r) =>
								`${r.track}: ${r.wpm} wpm, gaps ${r.gaps}s, overlaps ${r.overlap}`
						)
						.join('\n')
				: 'No caption tracks'
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Caption quality heuristics
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The Caption Quality Heuristics bookmarklet analyzes caption track quality for videos. Finds all video elements, filters to caption/subtitle tracks, analyzes cues for reading speed (words per minute), gaps between captions (dead air where no captions appear), overlapping captions, and displays an alert with statistics for each track: track label, WPM rate, total gap time in seconds, and overlap count. High WPM (>180) may be too fast to read comfortably; gaps indicate missing content; overlaps indicate poor caption timing. WCAG SC 1.2.2: Captions (Prerecorded).
	try {
		const vids = [...document.querySelectorAll('video')];
		if (!vids.length) {
			alert('No videos');
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
		alert(
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
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

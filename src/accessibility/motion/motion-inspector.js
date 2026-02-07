(function () {
	'use strict';
	// Description: The Motion Inspector bookmarklet lists all CSS animations and Web Animations API animations on the page with controls to pause, play, or slow them. Uses `document.getAnimations()` to find all active animations, displays a panel showing each animation's play state, duration, iterations, and playback rate, and provides buttons to pause all animations, play all animations, set half-speed playback, or restore normal speed. Useful for testing animation controls and verifying that animations can be paused. Run again to remove. WCAG SC 2.3.3: Animation from Interactions.
	try {
		const ID = 'a11y-motion-inspector';
		if (document.getElementById(ID)) {
			document.getElementById(ID).remove();
			return;
		}
		const panel = document.createElement('div');
		panel.id = ID;
		panel.style =
			'position:fixed;z-index:2147483647;right:8px;bottom:8px;width:360px;max-height:60vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px ui-monospace,monospace;padding:10px';
		const list = document.createElement('div');
		list.style = 'display:grid;gap:6px';
		const controls = document.createElement('div');
		controls.style = 'display:flex;gap:6px;margin-bottom:8px';
		const btn = (t, fn) => {
			const b = document.createElement('button');
			b.textContent = t;
			b.style =
				'padding:6px 8px;border:1px solid #ccc;border-radius:8px;background:#fafafa;cursor:pointer';
			b.onclick = fn;
			return b;
		};
		const anims = document.getAnimations ? document.getAnimations() : [];
		const refresh = () => {
			list.innerHTML = '';
			anims.forEach((a, i) => {
				const d = document.createElement('div');
				const dur = a.effect?.getTiming?.().duration || 'auto';
				const it = a.effect?.getTiming?.().iterations || 1;
				d.textContent = `#${i + 1} ${a.playState} duration:${dur} iters:${it} rate:${a.playbackRate}`;
				list.appendChild(d);
			});
			if (!anims.length) {
				list.textContent = 'No animations found';
			}
		};
		controls.append(
			btn(
				'Pause all',
				() => anims.forEach((a) => a.pause()) || refresh()
			),
			btn('Play all', () => anims.forEach((a) => a.play()) || refresh()),
			btn(
				'Half speed',
				() => anims.forEach((a) => (a.playbackRate = 0.5)) || refresh()
			),
			btn(
				'Normal speed',
				() => anims.forEach((a) => (a.playbackRate = 1)) || refresh()
			)
		);
		panel.append(controls, list);
		document.body.appendChild(panel);
		refresh();
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Motion inspector
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The Motion Inspector bookmarklet lists all CSS animations and Web Animations API animations on the page with controls to pause, play, or slow them. Uses `document.getAnimations()` to find all active animations, displays a panel showing each animation's play state, duration, iterations, and playback rate, and provides buttons to pause all animations, play all animations, set half-speed playback, or restore normal speed. Useful for testing animation controls and verifying that animations can be paused. Run again to remove. WCAG SC 2.3.3: Animation from Interactions.
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
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

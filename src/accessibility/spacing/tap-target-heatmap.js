(function () {
	'use strict';
	// Description: The Tap Target Heatmap bookmarklet visualizes touch target sizes and spacing. Red outlines indicate targets smaller than 44x44px (WCAG 2.5.5 minimum), while orange glow indicates targets too close to neighbors (less than 8px apart). Run again to remove the visualization. WCAG SC 2.5.5: Target Size.
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
		const ID = 'a11y-tap-heat';
		const old = document.getElementById(ID);
		if (old) {
			old.remove();
			return;
		}
		const wrap = document.createElement('div');
		wrap.id = ID;
		wrap.style =
			'position:absolute;top:0;left:0;pointer-events:none;z-index:2147483647';
		const isInteractive = (el) =>
			el.matches(
				'a[href],button,input:not([type=hidden]),select,textarea,[role="button"],[tabindex]:not([tabindex="-1"])'
			);
		const els = [
			...document.querySelectorAll(
				'a,button,input,select,textarea,[role="button"],[tabindex]'
			),
		]
			.filter(isInteractive)
			.filter((e) => e.offsetParent);
		const min = 44,
			pad = 8;
		for (const el of els) {
			const r = el.getBoundingClientRect();
			const small = r.width < min || r.height < min;
			let close = false;
			for (const other of els) {
				if (other === el) continue;
				const o = other.getBoundingClientRect();
				const dx = Math.max(
					0,
					Math.max(o.left - r.right, r.left - o.right)
				);
				const dy = Math.max(
					0,
					Math.max(o.top - r.bottom, r.top - o.bottom)
				);
				const dist = Math.hypot(dx, dy);
				if (dist < pad) {
					close = true;
					break;
				}
			}
			const b = document.createElement('div');
			b.style = `position:absolute;left:${r.left + scrollX}px;top:${r.top + scrollY}px;width:${r.width}px;height:${r.height}px;border:${small ? '3px solid #e00' : '2px solid #0a0'};box-shadow:${close ? '0 0 0 4px rgba(255,165,0,.6)' : 'none'};pointer-events:none`;
			b.title = `${small ? 'Small target' : ''}${close ? (small ? ' and ' : '') + (close ? 'Too close to neighbor' : '') : ''}`;
			wrap.appendChild(b);
		}
		document.body.appendChild(wrap);
		toast('Red = small target, orange glow = too close');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Tap target heatmap
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

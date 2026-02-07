(function () {
	'use strict';
	// Description: The Tap Target Heatmap bookmarklet visualizes touch target sizes and spacing. Red outlines indicate targets smaller than 44x44px (WCAG 2.5.5 minimum), while orange glow indicates targets too close to neighbors (less than 8px apart). Run again to remove the visualization. WCAG SC 2.5.5: Target Size.
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
			'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
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
		alert('Red = small target, orange glow = too close');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Tap target heatmap
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

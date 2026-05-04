(function () {
	'use strict';
	// Description: The Color Vision Filters bookmarklet applies SVG color matrix filters to simulate different types of color blindness (color vision deficiencies). Cycles through four modes: protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind), and normal vision. Each run advances to the next mode. Uses SVG feColorMatrix elements to transform colors according to scientific color perception data, helping designers test content accessibility for users with color vision deficiencies. Run four times to return to normal. WCAG SC 1.4.1: Use of Color.
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
		const ID = 'a11y-cvd';
		const old = document.getElementById(ID);
		if (old) {
			const mode = old.getAttribute('data-mode') || 'none';
			const order = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];
			const next = order[(order.indexOf(mode) + 1) % order.length];
			old.setAttribute('data-mode', next);
			document.documentElement.style.filter =
				next === 'none' ? '' : `url(#${next})`;
			toast('Mode: ' + next);
			return;
		}
		const svgNS = 'http://www.w3.org/2000/svg';
		const svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('id', ID);
		svg.style.cssText = 'position:fixed;width:0;height:0;';

		// Helper to create filter with proper namespace
		const createFilter = (id, values) => {
			const filter = document.createElementNS(svgNS, 'filter');
			filter.setAttribute('id', id);
			const matrix = document.createElementNS(svgNS, 'feColorMatrix');
			matrix.setAttribute('type', 'matrix');
			matrix.setAttribute('values', values);
			filter.appendChild(matrix);
			return filter;
		};

		svg.appendChild(
			createFilter(
				'protanopia',
				'0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0'
			)
		);
		svg.appendChild(
			createFilter(
				'deuteranopia',
				'0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0'
			)
		);
		svg.appendChild(
			createFilter(
				'tritanopia',
				'0.95 0.05 0 0 0  0 0.433 0.567 0 0  0.475 0.525 0 0 0  0 0 0 1 0'
			)
		);
		document.body.appendChild(svg);
		svg.setAttribute('data-mode', 'protanopia');
		document.documentElement.style.filter = 'url(#protanopia)';
		toast('Mode: protanopia');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Color vision filters
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

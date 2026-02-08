(function () {
	'use strict';
	// Description: The Color Vision Filters bookmarklet applies SVG color matrix filters to simulate different types of color blindness (color vision deficiencies). Cycles through four modes: protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind), and normal vision. Each run advances to the next mode. Uses SVG feColorMatrix elements to transform colors according to scientific color perception data, helping designers test content accessibility for users with color vision deficiencies. Run four times to return to normal. WCAG SC 1.4.1: Use of Color.
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
			alert('Mode: ' + next);
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

		svg.appendChild(createFilter('protanopia', '0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0'));
		svg.appendChild(createFilter('deuteranopia', '0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0'));
		svg.appendChild(createFilter('tritanopia', '0.95 0.05 0 0 0  0 0.433 0.567 0 0  0.475 0.525 0 0 0  0 0 0 1 0'));
		document.body.appendChild(svg);
		svg.setAttribute('data-mode', 'protanopia');
		document.documentElement.style.filter = 'url(#protanopia)';
		alert('Mode: protanopia');
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Color vision filters
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

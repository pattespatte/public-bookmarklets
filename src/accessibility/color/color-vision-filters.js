(function () {
	'use strict';
	// Description: The Color Vision Filters bookmarklet applies SVG color matrix filters to simulate different types of color blindness (color vision deficiencies). Modal interface with buttons to switch between protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind), and normal vision. Uses SVG feColorMatrix elements to transform colors according to scientific color perception data, helping designers test content accessibility for users with color vision deficiencies. WCAG SC 1.4.1: Use of Color.
	try {
		const ID = 'a11y-cvd';
		const SVG_ID = 'a11y-cvd-filters';
		let currentMode = 'none';

		// Helper to create filter with proper namespace
		const createFilter = (id, values) => {
			const svgNS = 'http://www.w3.org/2000/svg';
			const filter = document.createElementNS(svgNS, 'filter');
			filter.setAttribute('id', id);
			const matrix = document.createElementNS(svgNS, 'feColorMatrix');
			matrix.setAttribute('type', 'matrix');
			matrix.setAttribute('values', values);
			filter.appendChild(matrix);
			return filter;
		};

		// Create SVG filters
		const svgNS = 'http://www.w3.org/2000/svg';
		const svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('id', SVG_ID);
		svg.style.cssText = 'position:fixed;width:0;height:0;';
		svg.appendChild(createFilter('protanopia', '0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0'));
		svg.appendChild(createFilter('deuteranopia', '0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0'));
		svg.appendChild(createFilter('tritanopia', '0.95 0.05 0 0 0  0 0.433 0.567 0 0  0.475 0.525 0 0 0  0 0 0 1 0'));
		document.body.appendChild(svg);

		// Create modal with Shadow DOM
		const host = document.createElement('div');
		host.id = ID;
		host.style.cssText = 'position:fixed;top:10px;right:10px;z-index:999999;';
		document.body.appendChild(host);
		const shadow = host.attachShadow({ mode: 'open' });
		shadow.innerHTML = `
			<style>
				:host { display: block; }
				.modal {
					font-family: system-ui, -apple-system, sans-serif;
					font-size: 0.8125rem;
					background: #fff;
					border: 1px solid #ccc;
					border-radius: 6px;
					box-shadow: 0 4px 12px rgba(0,0,0,0.15);
					width: 180px;
					overflow: hidden;
				}
				.header {
					background: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
					border-bottom: 1px solid #bbb;
					padding: 6px 10px;
					cursor: move;
					user-select: none;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.header-title { font-weight: 600; color: #333; }
				.close-btn { cursor: pointer; color: #666; font-size: 0.875rem; padding: 2px 6px; border-radius: 3px; }
				.close-btn:hover { background: #ddd; color: #333; }
				.mode-display {
					padding: 8px 10px;
					text-align: center;
					font-weight: 600;
					color: #333;
					border-bottom: 1px solid #eee;
				}
				.buttons { padding: 10px; display: flex; flex-direction: column; gap: 6px; }
				.mode-btn {
					padding: 6px 10px;
					border: 1px solid #bbb;
					border-radius: 4px;
					background: #f8f8f8;
					cursor: pointer;
					font-family: inherit;
					font-size: 0.75rem;
					text-align: left;
					transition: all 0.15s;
				}
				.mode-btn:hover { background: #e8e8e8; border-color: #999; }
				.mode-btn.active {
					background: #0078d4;
					color: #fff;
					border-color: #005a9e;
				}
				.credits {
					font-size: 0.625rem;
					color: #888;
					text-align: center;
					padding: 6px 10px;
					border-top: 1px solid #eee;
				}
			</style>
			<div class="modal">
				<div class="header" id="header">
					<span class="header-title">Color Vision</span>
					<span class="close-btn" id="close-btn">close ✖</span>
				</div>
				<div class="mode-display" id="mode-display">Normal Vision</div>
				<div class="buttons">
					<button class="mode-btn" data-mode="protanopia">Protanopia (Red-blind)</button>
					<button class="mode-btn" data-mode="deuteranopia">Deuteranopia (Green-blind)</button>
					<button class="mode-btn" data-mode="tritanopia">Tritanopia (Blue-blind)</button>
					<button class="mode-btn active" data-mode="none">Normal Vision</button>
				</div>
				<div class="credits">By alejandrogiga98</div>
			</div>
		`;

		// Dragging
		let isDragging = false, dragOffset = { x: 0, y: 0 };
		const header = shadow.getElementById('header');
		header.addEventListener('mousedown', (e) => {
			isDragging = true;
			dragOffset.x = e.clientX - host.offsetLeft;
			dragOffset.y = e.clientY - host.offsetTop;
		});
		document.addEventListener('mousemove', (e) => {
			if (!isDragging) return;
			host.style.left = (e.clientX - dragOffset.x) + 'px';
			host.style.top = (e.clientY - dragOffset.y) + 'px';
			host.style.right = 'auto';
		});
		document.addEventListener('mouseup', () => { isDragging = false; });

		const modeDisplay = shadow.getElementById('mode-display');
		const buttons = shadow.querySelectorAll('.mode-btn');
		const closeBtn = shadow.getElementById('close-btn');

		const modeNames = {
			none: 'Normal Vision',
			protanopia: 'Protanopia (Red-blind)',
			deuteranopia: 'Deuteranopia (Green-blind)',
			tritanopia: 'Tritanopia (Blue-blind)'
		};

		function setMode(mode) {
			currentMode = mode;
			document.documentElement.style.filter = mode === 'none' ? '' : `url(#${mode})`;
			modeDisplay.textContent = modeNames[mode];
			buttons.forEach(btn => {
				btn.classList.toggle('active', btn.dataset.mode === mode);
			});
		}

		buttons.forEach(btn => {
			btn.addEventListener('click', () => setMode(btn.dataset.mode));
		});

		closeBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			end();
		});

		function end() {
			document.documentElement.style.filter = '';
			host.remove();
			svg.remove();
		}

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				end();
			}
		});

		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Color vision filters
Original author: alejandrogiga98 (MIT License)
Enhanced by: pattespatte
- Replaced alert dialogs with persistent Shadow DOM modal
- Added instant mode switching via buttons
- Added draggable UI with current mode display
- Original: https://github.com/alejandrogiga98/A11y-Bookmarklets
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

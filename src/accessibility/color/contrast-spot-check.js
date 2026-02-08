(function () {
	'use strict';
	// Description: Click any text element to compute the contrast ratio between foreground and background colors, with pass/fail results for WCAG AA and AAA conformance levels. Displays the ratio, colors, and text size. Press Esc to stop. WCAG SC 1.4.3: Contrast (Minimum).
	try {
		const ID = 'a11y-contrast-check';
		function parseColor(c) {
			const ctx = document.createElement('canvas').getContext('2d');
			ctx.fillStyle = c;
			return ctx.fillStyle;
		}
		function rgbToArray(c) {
			const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
		}
		function relLum([r, g, b]) {
			[r, g, b] = [r, g, b].map((v) => {
				v /= 255;
				return v <= 0.03928
					? v / 12.92
					: Math.pow((v + 0.055) / 1.055, 2.4);
			});
			return 0.2126 * r + 0.7152 * g + 0.0722 * b;
		}
		function contrast(c1, c2) {
			const L1 = relLum(rgbToArray(parseColor(c1))),
				L2 = relLum(rgbToArray(parseColor(c2)));
			const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1];
			return (a + 0.05) / (b + 0.05);
		}
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
					font-size: 13px;
					background: #fff;
					border: 1px solid #ccc;
					border-radius: 6px;
					box-shadow: 0 4px 12px rgba(0,0,0,0.15);
					width: 240px;
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
				.hint { font-size: 11px; color: #666; margin: 6px 10px; }
				.result { padding: 8px 10px; border-top: 1px solid #eee; }
				.result-label { font-size: 10px; color: #666; text-transform: uppercase; margin-bottom: 2px; }
				.text-preview { font-size: 11px; color: #333; margin-bottom: 6px; word-break: break-word; max-height: 40px; overflow: hidden; text-overflow: ellipsis; }
				.colors { display: flex; gap: 8px; margin: 6px 0; }
				.color-swatch { display: flex; align-items: center; gap: 4px; font-size: 11px; font-family: monospace; }
				.swatch-box { width: 20px; height: 20px; border: 1px solid #999; border-radius: 3px; }
				.ratio { font-size: 24px; font-weight: 700; text-align: center; margin: 8px 0; }
				.ratio.pass { color: #28a745; }
				.ratio.fail { color: #dc3545; }
				.level-badge {
					display: inline-block;
					padding: 2px 6px;
					border-radius: 3px;
					font-size: 10px;
					font-weight: 700;
					margin-right: 4px;
				}
				.level-badge.pass { background: #28a745; color: #fff; }
				.level-badge.fail { background: #dc3545; color: #fff; }
				.info { font-size: 10px; color: #666; text-align: center; margin-top: 4px; }
			</style>
			<div class="modal">
				<div class="header" id="header">
					<span class="header-title">Contrast Check</span>
					<span style="font-size:11px;color:#666;">Esc to close</span>
				</div>
				<div class="hint">Click any text to check contrast</div>
				<div class="result" id="result" style="display:none;">
					<div class="result-label">Text</div>
					<div class="text-preview" id="text-preview"></div>
					<div class="result-label">Colors</div>
					<div class="colors">
						<div class="color-swatch">
							<div class="swatch-box" id="fg-swatch"></div>
							<span id="fg-color"></span>
						</div>
						<div class="color-swatch">
							<div class="swatch-box" id="bg-swatch"></div>
							<span id="bg-color"></span>
						</div>
					</div>
					<div class="result-label">Contrast Ratio</div>
					<div class="ratio" id="ratio"></div>
					<div class="info">
						<span class="level-badge" id="aa-badge"></span>
						<span class="level-badge" id="aaa-badge"></span>
					</div>
					<div class="info" id="size-info"></div>
				</div>
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
		const result = shadow.getElementById('result');
		const textPreview = shadow.getElementById('text-preview');
		const fgSwatch = shadow.getElementById('fg-swatch');
		const bgSwatch = shadow.getElementById('bg-swatch');
		const fgColor = shadow.getElementById('fg-color');
		const bgColor = shadow.getElementById('bg-color');
		const ratioEl = shadow.getElementById('ratio');
		const aaBadge = shadow.getElementById('aa-badge');
		const aaaBadge = shadow.getElementById('aaa-badge');
		const sizeInfo = shadow.getElementById('size-info');
		const onClick = (e) => {
			// Ignore clicks inside the modal
			if (host.contains(e.target)) return;
			e.preventDefault();
			e.stopPropagation();
			const el = e.target;
			const cs = getComputedStyle(el);
			const fg = cs.color;
			let bg = cs.backgroundColor;
			let p = el;
			while (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
				p = p.parentElement;
				if (!p) {
					bg = 'rgb(255,255,255)';
					break;
				}
				bg = getComputedStyle(p).backgroundColor;
			}
			const r = contrast(fg, bg).toFixed(2);
			const size = parseFloat(cs.fontSize);
			const bold = parseInt(cs.fontWeight, 10) >= 700;
			const large = size >= 18 || (size >= 14 && bold);
			const passAA = large ? r >= 3 : r >= 4.5;
			const passAAA = large ? r >= 4.5 : r >= 7;
			// Update modal
			result.style.display = 'block';
			textPreview.textContent = el.textContent.trim().slice(0, 80) || el.tagName;
			fgSwatch.style.background = fg;
			bgSwatch.style.background = bg;
			fgColor.textContent = fg;
			bgColor.textContent = bg;
			ratioEl.textContent = r + ':1';
			ratioEl.className = 'ratio ' + (passAA ? 'pass' : 'fail');
			aaBadge.textContent = 'AA ' + (passAA ? 'PASS' : 'FAIL');
			aaBadge.className = 'level-badge ' + (passAA ? 'pass' : 'fail');
			aaaBadge.textContent = 'AAA ' + (passAAA ? 'PASS' : 'FAIL');
			aaaBadge.className = 'level-badge ' + (passAAA ? 'pass' : 'fail');
			sizeInfo.textContent = large ? 'Large text (≥18pt or ≥14pt bold)' : 'Normal text';
		};
		function end() {
			document.removeEventListener('click', onClick, true);
			document.removeEventListener('keydown', onKey, true);
			host.remove();
		}
		function onKey(e) {
			if (e.key === 'Escape') {
				end();
			}
		}
		document.addEventListener('click', onClick, true);
		document.addEventListener('keydown', onKey, true);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Contrast spot-check
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

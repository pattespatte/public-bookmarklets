// Description: The Alt Checker bookmarklet highlights images with missing or empty alt attributes, helping identify non-text content that lacks accessible alternatives. Images without alt text are outlined in red, while decorative images (alt="") are outlined in blue. Run again to remove the overlays. WCAG SC 1.1.1: Non-text Content.
(function () {
	'use strict';

	function addCssRule(rule, id) {
		var head = document.querySelector('head');
		if (!head) return;

		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = id;
		style.innerHTML = rule;
		head.appendChild(style);
	}

	function addOverlay(img, message, color) {
		var overlay = document.createElement('div');
		overlay.classList.add('alt-text-overlay');
		overlay.style.position = 'absolute';
		overlay.style.backgroundColor = color; // Use passed color
		overlay.style.color = 'white';
		overlay.style.padding = '5px';
		overlay.style.fontWeight = 'bold';
		overlay.style.zIndex = '9999';
		overlay.textContent = message; // Use passed message

		var rect = img.getBoundingClientRect();
		overlay.style.top = rect.top + 'px';
		overlay.style.left = rect.left + 'px';
		overlay.style.width = rect.width + 'px';
		overlay.style.height = rect.height + 'px';

		document.body.appendChild(overlay);
	}

	function addAltTextOverlays() {
		// Decorative images (alt="")
		var decorativeImages = document.querySelectorAll("img[alt='']");
		decorativeImages.forEach(function (img) {
			addOverlay(img, 'decorative img', 'rgba(0, 0, 255, 0.8)'); // Blue overlay for decorative images
		});

		// Images with missing alt attribute
		var missingAltImages = document.querySelectorAll('img:not([alt])');
		missingAltImages.forEach(function (img) {
			addOverlay(img, 'alt-text missing!', 'rgba(255, 0, 0, 0.8)'); // Red overlay for missing alt text
		});
	}

	function removeOverlays() {
		var overlays = document.querySelectorAll('.alt-text-overlay');
		overlays.forEach(function (overlay) {
			overlay.remove();
		});
	}

	function toggleAccessibilityOverlay() {
		var style = document.getElementById('alt-text-style');
		var overlays = document.querySelectorAll('.alt-text-overlay');

		if (style && overlays.length > 0) {
			style.remove();
			removeOverlays();
		} else {
			// Adding CSS rules for both types of images
			addCssRule(
				"img[alt=''] { filter: blur(10px) !important; outline: 10px solid blue !important; }" +
					'img:not([alt]) { filter: blur(10px) !important; outline: 10px solid red !important; }',
				'alt-text-style'
			);
			addAltTextOverlays();
		}
	}

	toggleAccessibilityOverlay();
})();

console.log(`
Source: https://blog.ohheybrian.com/2021/11/check-for-alt-tags-with-a-bookmarklet/
Bookmarklet name: altChecker
`);

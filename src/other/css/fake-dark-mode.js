// Source: https://github.com/pattespatte/public-bookmarklets
// Description: Simulates dark mode using brute-force CSS color inversion (invert + hue-rotate). NOTE: This does NOT use or respect native dark mode (prefers-color-scheme). It applies a filter overlay regardless of the page's own dark mode support. Creates a floating toggle button in top-right corner. Images and videos are re-inverted to appear normal. Best for pages without native dark mode support.
javascript: (function () {
	'use strict';
	const id = 'dark-mode-bookmarklet';
	const styleId = 'dark-mode-style';

	// Check if already exists - remove if so
	let existingContainer = document.getElementById(id);
	if (existingContainer) {
		let existingStyle = document.getElementById(styleId);
		if (existingStyle) existingStyle.remove();
		existingContainer.remove();
		return;
	}

	// Create container for toggle button
	const container = document.createElement('div');
	container.id = id;
	container.style.cssText = `
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 999999;
		display: flex;
		gap: 8px;
	`;

	// Toggle button
	const toggleButton = document.createElement('button');
	toggleButton.textContent = '🌙';
	toggleButton.title = 'Toggle Dark Mode';
	toggleButton.style.cssText = `
		padding: 10px 14px;
		background: #1a1a1a;
		color: #fff;
		border: 2px solid #444;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.125rem;
		transition: all 0.2s ease;
	`;
	toggleButton.onmouseenter = function () {
		this.style.background = '#333';
		this.style.transform = 'scale(1.05)';
	};
	toggleButton.onmouseleave = function () {
		this.style.background = isDarkMode ? '#1a1a1a' : '#fff';
		this.style.color = isDarkMode ? '#fff' : '#1a1a1a';
		this.style.transform = 'scale(1)';
	};

	// Close button
	const closeButton = document.createElement('button');
	closeButton.textContent = '×';
	closeButton.title = 'Remove Dark Mode';
	closeButton.style.cssText = `
		padding: 10px 14px;
		background: #dc3545;
		color: #fff;
		border: 2px solid #dc3545;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.125rem;
		font-weight: bold;
		transition: all 0.2s ease;
	`;
	closeButton.onmouseenter = function () {
		this.style.background = '#c82333';
	};
	closeButton.onmouseleave = function () {
		this.style.background = '#dc3545';
	};

	container.appendChild(toggleButton);
	container.appendChild(closeButton);
	document.body.appendChild(container);

	// Create style element for dark mode CSS
	const style = document.createElement('style');
	style.id = styleId;
	document.head.appendChild(style);

	let isDarkMode = false;

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;

		if (isDarkMode) {
			// Dark mode: invert colors with hue rotation to preserve color relationships
			// Exclude images, videos, and iframes from inversion
			style.textContent = `
				html {
					filter: invert(1) hue-rotate(180deg);
				}
				img, video, iframe, canvas, svg, [style*="background-image"] {
					filter: invert(1) hue-rotate(180deg);
				}
				#${id} {
					filter: invert(1) hue-rotate(180deg) !important;
				}
			`;
			toggleButton.textContent = '☀️';
			toggleButton.style.background = '#fff';
			toggleButton.style.color = '#1a1a1a';
		} else {
			// Light mode: remove filters
			style.textContent = '';
			toggleButton.textContent = '🌙';
			toggleButton.style.background = '#1a1a1a';
			toggleButton.style.color = '#fff';
		}
	}

	toggleButton.addEventListener('click', toggleDarkMode);
	closeButton.addEventListener('click', function () {
		style.remove();
		container.remove();
	});

	// Enable dark mode by default
	toggleDarkMode();
})();

// Description: Detects if the current page has native dark mode support using prefers-color-scheme or class-based dark mode (e.g., Tailwind). Scans stylesheets for @media (prefers-color-scheme: dark) rules and .dark class selectors. When supported, displays a toggle button to switch between light and dark modes by modifying CSS rules or toggling the .dark class. Shows current mode on button. When not supported, shows a dismissible status message. Run again to remove.
(function () {
	'use strict';
	try {
		const ID = 'dark-mode-detector';
		const SCRIPT_ID = 'dark-mode-detector-script';
		const existing = document.getElementById(ID);
		if (existing) {
			// Cleanup: remove injected script and restore original CSS
			const script = document.getElementById(SCRIPT_ID);
			if (script) {
				script.remove();
			}
			existing.remove();
			return;
		}

		// Detect dark mode support type
		let darkModeType = null; // 'media-query' | 'class-based' | null
		const sheets = document.styleSheets;

		// Check for @media (prefers-color-scheme: dark) rules
		for (let i = 0; i < sheets.length; i++) {
			try {
				const rules = sheets[i].cssRules || sheets[i].rules;
				for (let j = 0; j < rules.length; j++) {
					const rule = rules[j];
					if (
						rule.conditionText &&
						rule.conditionText.includes('prefers-color-scheme: dark')
					) {
						darkModeType = 'media-query';
						break;
					}
				}
			} catch (e) {
				// CORS restrictions on some stylesheets
			}
			if (darkModeType) break;
		}

		// Check inline styles for media queries
		if (!darkModeType) {
			const inlineStyles = document.querySelectorAll('style');
			for (const style of inlineStyles) {
				if (style.textContent.includes('prefers-color-scheme: dark')) {
					darkModeType = 'media-query';
					break;
				}
			}
		}

		// Check for class-based dark mode (e.g., Tailwind's .dark class)
		if (!darkModeType) {
			// Look for .dark descendant selectors in stylesheets
			for (let i = 0; i < sheets.length; i++) {
				try {
					const rules = sheets[i].cssRules || sheets[i].rules;
					for (let j = 0; j < rules.length; j++) {
						const rule = rules[j];
						if (rule.selectorText && rule.selectorText.includes('.dark ')) {
							darkModeType = 'class-based';
							break;
						}
					}
				} catch (e) {
					// CORS restrictions
				}
				if (darkModeType === 'class-based') break;
			}
		}

		// Check inline styles for class-based dark mode
		if (!darkModeType) {
			const inlineStyles = document.querySelectorAll('style');
			for (const style of inlineStyles) {
				// Match .dark followed by space (descendant selector) or .dark: (pseudo-class)
				if (/\.(dark\s|dark:)/.test(style.textContent)) {
					darkModeType = 'class-based';
					break;
				}
			}
		}

		// Detect current system preference
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		let isCurrentlyDark = systemPrefersDark;

		// Create UI container
		const container = document.createElement('div');
		container.id = ID;
		container.style.cssText = `
			position: fixed;
			top: 10px;
			right: 10px;
			z-index: 999999;
			display: flex;
			gap: 8px;
			align-items: center;
		`;

		if (darkModeType) {
			// Dark mode supported - create toggle button
			const toggleBtn = document.createElement('button');
			toggleBtn.id = ID + '-toggle';

			// For media-query, toggle only works when system is in light mode
			// (we swap dark→light to force dark styles). On dark systems, show read-only.
			const isToggleable =
				darkModeType === 'class-based' || !systemPrefersDark;

			function updateButtonText() {
				const modeText = isCurrentlyDark ? 'Dark' : 'Light';
				const typeText =
					darkModeType === 'class-based' ? ' (Class-based)' : ' (Media Query)';
				const suffix = isToggleable ? ' - Click to Toggle' : ' (Read-only)';
				toggleBtn.textContent = `${modeText} Mode${typeText}${suffix}`;
			}

			updateButtonText();

			toggleBtn.style.cssText = `
				padding: 10px 16px;
				background: ${isCurrentlyDark ? '#1a1a1a' : '#22c55e'};
				color: #fff;
				border: none;
				border-radius: 8px;
				cursor: ${isToggleable ? 'pointer' : 'default'};
				font-family: system-ui, -apple-system, sans-serif;
				font-size: 14px;
				font-weight: 500;
				box-shadow: 0 4px 12px rgba(0,0,0,0.15);
				transition: background 0.2s ease;
				opacity: ${isToggleable ? '1' : '0.7'};
			`;

			const closeBtn = document.createElement('button');
			closeBtn.textContent = '×';
			closeBtn.style.cssText = `
				padding: 10px 14px;
				background: #ef4444;
				color: #fff;
				border: none;
				border-radius: 8px;
				cursor: pointer;
				font-size: 18px;
				font-weight: bold;
			`;

			container.appendChild(toggleBtn);
			container.appendChild(closeBtn);
			document.body.appendChild(container);

			// Inject script to handle CSS rule manipulation for media-query type
			if (darkModeType === 'media-query') {
				const scriptContent = `
					(function() {
						// Find all CSS media rules with prefers-color-scheme: dark
						const darkRules = [];
						const sheets = document.styleSheets;

						for (let i = 0; i < sheets.length; i++) {
							try {
								const rules = sheets[i].cssRules || sheets[i].rules;
								for (let j = 0; j < rules.length; j++) {
									const rule = rules[j];
									if (rule.type === CSSRule.MEDIA_RULE &&
										rule.conditionText.includes('prefers-color-scheme: dark')) {
										darkRules.push({ sheet: sheets[i], rule: rule, index: j });
									}
								}
							} catch (e) {}
						}

						// Store original conditions
						const originalConditions = darkRules.map(({ rule }) => rule.conditionText);

						// Toggle function exposed globally
						window.__darkModeDetectorToggle = function(enableDark) {
							for (let i = 0; i < darkRules.length; i++) {
								const { rule, sheet, index } = darkRules[i];
								const original = originalConditions[i];

								if (enableDark) {
									// Enable dark mode: swap 'dark' to 'light' (always active on light systems)
									rule.conditionText = original.replace('dark', 'light');
								} else {
									// Disable dark mode: restore original
									rule.conditionText = original;
								}
							}
						};

						// Auto-enable dark mode on first run if system is in light mode
						const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
						if (!systemPrefersDark) {
							window.__darkModeDetectorToggle(true);
						}
					})();
				`;

				const script = document.createElement('script');
				script.id = SCRIPT_ID;
				script.textContent = scriptContent;
				document.head.appendChild(script);
			}

			// Toggle function
			function toggleMode() {
				if (darkModeType === 'class-based') {
					// Toggle .dark class on html element
					const html = document.documentElement;
					html.classList.toggle('dark');
					isCurrentlyDark = html.classList.contains('dark');
				} else {
					// Use injected script to toggle media queries
					if (window.__darkModeDetectorToggle) {
						isCurrentlyDark = !isCurrentlyDark;
						window.__darkModeDetectorToggle(isCurrentlyDark);
					}
				}

				// Update button appearance
				toggleBtn.style.background = isCurrentlyDark ? '#1a1a1a' : '#22c55e';
				updateButtonText();
			}

			// For class-based, auto-enable if not already dark
			if (darkModeType === 'class-based') {
				isCurrentlyDark = document.documentElement.classList.contains('dark');
				if (!isCurrentlyDark) {
					document.documentElement.classList.add('dark');
					isCurrentlyDark = true;
				}
				updateButtonText();
				toggleBtn.style.background = '#1a1a1a';
			}

			// Only add click handler if toggleable
			if (isToggleable) {
				toggleBtn.addEventListener('click', toggleMode);
			}
			closeBtn.addEventListener('click', function () {
				// Restore original state before closing
				if (darkModeType === 'class-based') {
					// Remove .dark class if we added it (optional - keep user's choice?)
				}
				const script = document.getElementById(SCRIPT_ID);
				if (script) {
					script.remove();
				}
				container.remove();
			});
		} else {
			// No dark mode support - show dismissible status message
			container.style.cssText = `
				position: fixed;
				top: 10px;
				right: 10px;
				z-index: 999999;
				background: #ef4444;
				color: #fff;
				padding: 12px 16px;
				border-radius: 8px;
				font-family: system-ui, -apple-system, sans-serif;
				font-size: 14px;
				font-weight: 500;
				box-shadow: 0 4px 12px rgba(0,0,0,0.15);
				max-width: 300px;
				cursor: pointer;
				user-select: none;
			`;
			container.textContent = '✗ This site does not support dark mode (click to dismiss)';

			container.addEventListener('click', function () {
				container.remove();
			});

			document.body.appendChild(container);
		}

		console.log(`
Source: https://github.com/pattespatte/public-bookmarklets
Bookmarklet name: Dark Mode Detector
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

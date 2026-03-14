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
			// Clean up global function
			delete window.__darkModeDetectorToggle;
			existing.remove();
			return;
		}

		// Detect dark mode support type in a single pass through stylesheets
		let darkModeType = null; // 'media-query' | 'class-based' | null
		const darkRules = []; // Store media-query rules for later use
		const sheets = document.styleSheets;
		const darkClassRegex = /\.(dark\s|dark:)/;

		// Single pass: scan for both media-query and class-based dark mode
		for (let i = 0; i < sheets.length; i++) {
			try {
				const rules = sheets[i].cssRules || sheets[i].rules;
				for (let j = 0; j < rules.length; j++) {
					const rule = rules[j];

					// Check for media-query dark mode
					if (
						rule.conditionText &&
						rule.conditionText.includes('prefers-color-scheme: dark')
					) {
						if (!darkModeType) darkModeType = 'media-query';
						darkRules.push({ sheet: sheets[i], rule, index: j });
					}

					// Check for class-based dark mode
					if (rule.selectorText && rule.selectorText.includes('.dark ')) {
						if (!darkModeType) darkModeType = 'class-based';
					}

					if (darkModeType && darkModeType !== 'media-query') break;
				}
			} catch (e) {
				// CORS restrictions on some stylesheets
			}
			if (darkModeType && darkModeType !== 'media-query') break;
		}

		// Single pass: check inline styles for both types
		if (!darkModeType) {
			const inlineStyles = document.querySelectorAll('style');
			for (const style of inlineStyles) {
				const text = style.textContent;
				if (text.includes('prefers-color-scheme: dark')) {
					darkModeType = 'media-query';
					break;
				}
				if (darkClassRegex.test(text)) {
					darkModeType = 'class-based';
					break;
				}
			}
		}

		// Detect current system preference
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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

			// Store original state for proper cleanup
			const originalClassBasedState =
				darkModeType === 'class-based' &&
				document.documentElement.classList.contains('dark');

			function updateButtonText() {
				const isCurrentlyDark =
					darkModeType === 'class-based'
						? document.documentElement.classList.contains('dark')
						: toggleBtn.dataset.darkMode === 'true';
				const modeText = isCurrentlyDark ? 'Dark' : 'Light';
				const typeText =
					darkModeType === 'class-based' ? ' (Class-based)' : ' (Media Query)';
				const suffix = isToggleable ? ' - Click to Toggle' : ' (Read-only)';
				toggleBtn.textContent = `${modeText} Mode${typeText}${suffix}`;
			}

			updateButtonText();

			// Initialize tracking state for media-query mode
			if (darkModeType === 'media-query' && isToggleable) {
				toggleBtn.dataset.darkMode = 'true'; // Start in dark mode
			}

			toggleBtn.style.cssText = `
				padding: 10px 16px;
				background: ${toggleBtn.dataset.darkMode === 'true' ? '#1a1a1a' : '#22c55e'};
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

			// Inject script to handle CSS rule manipulation for media-query type (only if toggleable)
			if (darkModeType === 'media-query' && isToggleable && darkRules.length > 0) {
				const scriptContent = `
					(function(systemPrefersDark) {
						// Store original conditions and rules (already collected by parent)
						const darkRules = ${JSON.stringify(darkRules.map(({ rule, index }) => ({ conditionText: rule.conditionText, index })))};
						const originalConditions = darkRules.map(r => r.conditionText);

						// Re-acquire rule references from sheet
						const sheets = document.styleSheets;
						const ruleRefs = [];
						for (let i = 0; i < sheets.length; i++) {
							try {
								const rules = sheets[i].cssRules || sheets[i].rules;
								for (let j = 0; j < rules.length; j++) {
									const rule = rules[j];
									if (rule.type === CSSRule.MEDIA_RULE &&
										rule.conditionText.includes('prefers-color-scheme: dark')) {
										ruleRefs.push(rule);
									}
								}
							} catch (e) {}
						}

						// Toggle function exposed globally
						window.__darkModeDetectorToggle = function(enableDark) {
							for (let i = 0; i < ruleRefs.length; i++) {
								const rule = ruleRefs[i];
								const original = originalConditions[i];

								if (enableDark) {
									// Enable dark mode: swap 'dark' to 'light'
									rule.conditionText = original.replace('dark', 'light');
								} else {
									// Disable dark mode: restore original
									rule.conditionText = original;
								}
							}
						};

						// Auto-enable dark mode on first run if system is in light mode
						if (!systemPrefersDark) {
							window.__darkModeDetectorToggle(true);
						}
					})(${systemPrefersDark});
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
				} else {
					// Use injected script to toggle media queries
					if (window.__darkModeDetectorToggle) {
						const currentState = toggleBtn.dataset.darkMode === 'true';
						toggleBtn.dataset.darkMode = (!currentState).toString();
						window.__darkModeDetectorToggle(!currentState);
					}
				}

				// Update button appearance
				const isCurrentlyDark =
					darkModeType === 'class-based'
						? document.documentElement.classList.contains('dark')
						: toggleBtn.dataset.darkMode === 'true';
				toggleBtn.style.background = isCurrentlyDark ? '#1a1a1a' : '#22c55e';
				updateButtonText();
			}

			// For class-based, auto-enable if not already dark
			if (darkModeType === 'class-based') {
				const isCurrentlyDark = document.documentElement.classList.contains('dark');
				if (!isCurrentlyDark) {
					document.documentElement.classList.add('dark');
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
				if (darkModeType === 'class-based' && !originalClassBasedState) {
					document.documentElement.classList.remove('dark');
				}

				// Clean up global function
				delete window.__darkModeDetectorToggle;

				// Remove injected script
				const script = document.getElementById(SCRIPT_ID);
				if (script) {
					script.remove();
				}

				// Remove container (also removes event listeners)
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

// Description: The Landmarks bookmarklet identifies and highlights all ARIA landmark regions and HTML5 semantic elements on the page. Detects banner, navigation, main, complementary, contentinfo, search, form, and region landmarks using both native HTML5 elements (header, nav, main, aside, footer) and ARIA roles. Each landmark is highlighted with a colored outline and semi-transparent background, with a label showing the element type. Useful for verifying that pages have proper landmark structure for screen reader navigation. Reload the page to remove highlights. WCAG SC 1.3.1: Info and Relationships.
javascript: (function () {
	const selectors = [
		'header',
		'nav',
		'main',
		'aside',
		'footer',
		'section',
		'aside:not([role])',
		'[role~="complementary"]',
		'[role~="COMPLEMENTARY"]',
		'footer',
		'[role~="contentinfo"]',
		'[role~="CONTENTINFO"]',
		'[role~="application"]',
		'[role~="APPLICATION"]',
		'nav',
		'[role~="navigation"]',
		'[role~="NAVIGATION"]',
		'[role~="region"][aria-labelledby]',
		'[role~="REGION"][aria-labelledby]',
		'[role~="region"][aria-label]',
		'[role~="REGION"][aria-label]',
		'section[aria-labelledby]',
		'section[aria-label]',
		'header',
		'[role~="banner"]',
		'[role~="BANNER"]',
		'[role~="search"]',
		'[role~="SEARCH"]',
		'main',
		'[role~="main"]',
		'[role~="MAIN"]',
	];

	const landmarks = document.querySelectorAll(selectors.join(', '));
	const colors = [
		'#ffcfd6',
		'#ffa639',
		'#f7dc6f',
		'#007531',
		'#3498db',
		'#d30000',
		'#1a45bc',
	];
	const textColors = ['#000', '#000', '#000', '#fff', '#fff', '#fff', '#fff']; // Complementary text colors

	landmarks.forEach((el, index) => {
		const backgroundColor = colors[index % colors.length];
		const textColor = textColors[index % textColors.length];
		el.style.outline = `3px solid ${backgroundColor}`;
		el.style.backgroundColor = `${backgroundColor}20`; // 20% opacity
		el.style.position = 'relative';

		const label = document.createElement('div');
		label.textContent = el.tagName.toLowerCase();
		label.style.position = 'absolute';
		label.style.top = '0';
		label.style.left = '0';
		label.style.backgroundColor = backgroundColor;
		label.style.color = textColor;
		label.style.padding = '2px 5px';
		label.style.fontSize = '12px';
		label.style.fontFamily = 'Arial, sans-serif';
		label.style.zIndex = '9999';

		el.appendChild(label);
	});
})();

console.log(`
Source: https://codepen.io/patte/pen/WNVxVbK
Bookmarklet name: Landmarks (WCAG SC 1.3.1)
`);

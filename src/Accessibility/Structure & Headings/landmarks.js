javascript: (function () {
	const selectors = [
		'header', 'nav', 'main', 'aside', 'footer', 'section',
		'aside:not([role])', '[role~="complementary"]', '[role~="COMPLEMENTARY"]',
		'footer', '[role~="contentinfo"]', '[role~="CONTENTINFO"]',
		'[role~="application"]', '[role~="APPLICATION"]',
		'nav', '[role~="navigation"]', '[role~="NAVIGATION"]',
		'[role~="region"][aria-labelledby]', '[role~="REGION"][aria-labelledby]',
		'[role~="region"][aria-label]', '[role~="REGION"][aria-label]',
		'section[aria-labelledby]', 'section[aria-label]',
		'header', '[role~="banner"]', '[role~="BANNER"]',
		'[role~="search"]', '[role~="SEARCH"]',
		'main', '[role~="main"]', '[role~="MAIN"]'
	];

	const landmarks = document.querySelectorAll(selectors.join(', '));
	const colors = ['#ffcfd6', '#ffa639', '#f7dc6f', '#007531', '#3498db', '#d30000', '#1a45bc'];
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

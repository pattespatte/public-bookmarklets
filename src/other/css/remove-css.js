// Description: The Remove CSS bookmarklet disables all stylesheets and clears inline styles to view the page with CSS removed. Immediately disables all external and internal stylesheets, removes inline style attributes from all elements, displays a toggle button to restore CSS, and provides a way to toggle CSS on/off to test semantic HTML structure. Useful for verifying content order and accessibility without visual styling.
javascript: (function () {
	let cssDisabled = true; // Set the initial state to true (CSS disabled)
	const button = document.createElement('button');
	button.innerText = 'CSS removed (click to toggle)'; // Set the initial button text
	button.style.position = 'fixed';
	button.style.cursor = 'pointer';
	document.body.appendChild(button);

	// Disable CSS immediately after the button is created
	for (let i = 0; i < document.styleSheets.length; i++) {
		document.styleSheets[i].disabled = true;
	}
	const elements = document.getElementsByTagName('*');
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.cssText = ''; // Clear inline styles
	}

	function toggleCSS() {
		cssDisabled = !cssDisabled;
		for (let i = 0; i < document.styleSheets.length; i++) {
			document.styleSheets[i].disabled = cssDisabled;
		}
		const elements = document.getElementsByTagName('*');
		for (let i = 0; i < elements.length; i++) {
			elements[i].style.cssText = cssDisabled
				? ''
				: elements[i].style.cssText;
		}
		button.innerText = cssDisabled
			? 'CSS removed (click to toggle)'
			: 'CSS restored (click to toggle)';
	}

	button.onclick = toggleCSS;
})();

console.log(`
Source: https://dorward.uk/software/disablecss/
Bookmarklet name: Remove CSS
`);

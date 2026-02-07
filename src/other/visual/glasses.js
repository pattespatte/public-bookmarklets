// Description: The Glasses bookmarklet blurs the page to simulate viewing without corrective lenses, helping test readability for users with vision impairments. Creates a floating panel with "Toggle Blur" and "X" close buttons, applies a 2px CSS blur filter to all page content except the control panel, allows toggling the blur effect on/off, and visually indicates blur state with button color change (green=normal, red=blurred). Useful for understanding the experience of users with uncorrected vision problems. Run again or click X to remove.
javascript: (function () {
	const id = 'blur-toggle-snippet';
	let existingElement = document.getElementById(id);

	if (existingElement) {
		existingElement.parentNode.removeChild(existingElement);
		return;
	}

	const container = document.createElement('div');
	container.id = id;
	container.style.cssText = `
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 9999;
		display: flex;
		gap: 10px;
	`;

	const toggleButton = document.createElement('button');
	toggleButton.textContent = 'Toggle Blur';
	toggleButton.style.cssText = `
		padding: 5px 10px;
		background-color: #4CAF50;
		color: white;
		border: none;
		cursor: pointer;
	`;

	const closeButton = document.createElement('button');
	closeButton.textContent = 'X';
	closeButton.style.cssText = `
		padding: 5px 10px;
		background-color: #f44336;
		color: white;
		border: none;
		cursor: pointer;
	`;

	container.appendChild(toggleButton);
	container.appendChild(closeButton);
	document.body.appendChild(container);

	const style = document.createElement('style');
	style.id = 'blur-style';
	document.head.appendChild(style);

	let isBlurred = false;

	function toggleBlur() {
		isBlurred = !isBlurred;
		style.textContent = isBlurred
			? `body > *:not(#${id}) { filter: blur(2px); }
			 #${id} { filter: none !important; }`
			: '';
		toggleButton.style.backgroundColor = isBlurred ? '#f44336' : '#4CAF50';
	}

	toggleButton.addEventListener('click', toggleBlur);
	closeButton.addEventListener('click', function () {
		container.parentNode.removeChild(container);
		style.parentNode.removeChild(style);
	});

	toggleBlur(); // Apply blur initially
})();

console.log(`
Source: https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#glasses
Bookmarklet name: Glasses (blur a page)
`);

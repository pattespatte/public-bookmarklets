// Description: The Font Size 200% bookmarklet adds a toggle button to scale page content to 200% text size, testing for WCAG 1.4.4 Reflow requirements. Click "Enable 200% Text Zoom" to apply scaling - content should remain readable without horizontal scrolling in a 320px wide container. Click "Disable" to restore normal view. WCAG SC 1.4.4: Resize text.
(function () {
	// Check if the script has already been injected
	if (document.getElementById('text-zoom-toggle')) return;

	// Create a wrapper div to hold all the content except the button
	var contentWrapper = document.createElement('div');
	while (document.body.firstChild) {
		contentWrapper.appendChild(document.body.firstChild);
	}
	document.body.appendChild(contentWrapper);

	// Create a style element for our custom CSS
	var style = document.createElement('style');
	style.textContent =
		'#text-zoom-toggle{position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px;background-color:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;font-size:16px;animation:attention-grab 0.5s ease-in-out;}@keyframes attention-grab{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}.text-zoom-200{transform:scale(2);transform-origin:0 0;}';
	document.head.appendChild(style);

	// Create the toggle button
	var button = document.createElement('button');
	button.id = 'text-zoom-toggle';
	button.textContent = 'Enable 200% Text Zoom';
	document.body.appendChild(button);

	// Function to apply text zoom
	var applyTextZoom = function () {
		contentWrapper.classList.add('text-zoom-200');
		button.textContent = 'Disable 200% Text Zoom';
		contentWrapper.style.width = '50%'; // Adjust width to prevent overflow issues
	};

	// Function to remove text zoom
	var removeTextZoom = function () {
		contentWrapper.classList.remove('text-zoom-200');
		button.textContent = 'Enable 200% Text Zoom';
		contentWrapper.style.width = '';
	};

	// Toggle text zoom on button click
	button.addEventListener('click', function () {
		if (contentWrapper.classList.contains('text-zoom-200')) {
			removeTextZoom();
		} else {
			applyTextZoom();
		}
		// Reapply the attention-grabbing animation
		button.style.animation = 'none';
		button.offsetHeight; // Trigger reflow
		button.style.animation = 'attention-grab 0.5s ease-in-out';
	});

	// Initialize button text
	removeTextZoom();
})();

console.log(`
Source: https://codepen.io/patte/pen/zYmrozy
Bookmarklet name: Toggle Text Zoom 200% (WCAG SC 1.4.4)
`);

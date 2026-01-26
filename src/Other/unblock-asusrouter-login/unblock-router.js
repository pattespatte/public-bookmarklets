// Remove blocking elements from ASUS router login page
(function () {
	'use strict';

	// List of element IDs to remove
	const elementsToRemove = [
		'hidden_frame',
		'dmRedirection',
		'https_redirect_component'
	];

	// Function to safely remove an element by ID
	function removeElement(id) {
		const element = document.getElementById(id);
		if (element) {
			element.remove();
			console.log(`Removed element: #${id}`);
		} else {
			console.log(`Element not found: #${id}`);
		}
	}

	// Remove each element from the list
	elementsToRemove.forEach(removeElement);

	console.log('ASUS router login unblock script executed');
})();
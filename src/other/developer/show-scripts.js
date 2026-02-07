// Description: The Show Scripts bookmarklet displays all JavaScript loaded on the page. Finds all script elements, collects external script URLs and inline script content, displays a yellow "Show Scripts" button in the top-left corner, and shows a modal with a textarea containing all script sources separated by dividers when clicked. Useful for security auditing, debugging script loading issues, and reviewing third-party scripts.
(function () {
	var s = document.getElementsByTagName('SCRIPT');
	var tx = '';
	var sr = [];
	for (var i = 0; i < s.length; i++) {
		var t = s[i].text;
		if (t) {
			tx += t;
		} else {
			sr.push(s[i].src);
		}
	}

	// Create a modal element
	var modal = document.createElement('div');
	modal.id = 'script-modal';
	modal.style.display = 'none'; // Hide by default
	modal.style.position = 'fixed';
	modal.style.top = '50%';
	modal.style.left = '50%';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.width = '80%';
	modal.style.height = '80%';
	modal.style.background = 'white';
	modal.style.border = '1px solid #0055ff';
	modal.style.padding = '20px';
	document.body.appendChild(modal);

	// Create a textarea element within the modal
	var textarea = document.createElement('textarea');
	textarea.id = 't';
	textarea.style.width = '100%';
	textarea.style.height = '90%';
	textarea.style.border = 'none';
	textarea.style.padding = '10px';
	modal.appendChild(textarea);

	// Populate the textarea with script content
	textarea.value = sr.join('\n\n-----\n\n') + '\n\n' + tx;

	// Add a button to show the modal
	var button = document.createElement('button');
	button.textContent = 'Show Scripts';
	button.style.position = 'fixed';
	button.style.top = '10px';
	button.style.left = '10px';
	button.style.background = '#ccff00'; // button background color
	button.onclick = function () {
		modal.style.display = 'block'; // Show the modal
	};
	document.body.appendChild(button);

	// Add a button to close the modal
	var closeButton = document.createElement('button');
	closeButton.textContent = 'Close';
	closeButton.style.background = '#ff0000'; // button background color

	closeButton.onclick = function () {
		modal.style.display = 'none'; // Hide the modal
	};
	modal.appendChild(closeButton);
})();

console.log(`
Source: https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#show-scripts
Bookmarklet name: Show Scripts
`);

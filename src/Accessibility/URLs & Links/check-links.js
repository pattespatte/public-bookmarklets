/* jshint esversion: 6 */
javascript: (function () {
	// Create modal styles
	const styleSheet = document.createElement('style');
	styleSheet.textContent = `
		.link-checker-modal {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: white;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 2px 10px rgba(0,0,0,0.1);
			max-width: 80%;
			max-height: 80vh;
			z-index: 10000;
		}
		.link-checker-content {
			max-height: calc(80vh - 40px); /* Account for padding */
			overflow-y: auto;
		}
		.link-checker-overlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.5);
			z-index: 9999;
			cursor: pointer;
		}
		.link-checker-close {
			position: absolute;
			top: 10px;
			right: 10px;
			cursor: pointer;
			font-size: 20px;
			color: #666;
		}
		.link-checker-close:hover {
			color: #000;
		}
		.progress-container {
			position: fixed;
			top: 20px;
			right: 20px;
			background: white;
			padding: 15px;
			border-radius: 5px;
			box-shadow: 0 2px 10px rgba(0,0,0,0.1);
			z-index: 10000;
			min-width: 200px;
		}
		.progress-bar {
			width: 100%;
			height: 20px;
			background-color: #f0f0f0;
			border-radius: 10px;
			overflow: hidden;
		}
		.progress-fill {
			height: 100%;
			background-color: #4CAF50;
			width: 0%;
			transition: width 0.3s ease;
		}
		.progress-text {
			text-align: center;
			margin-top: 5px;
			font-family: Arial, sans-serif;
		}
	`;
	document.head.appendChild(styleSheet);

	const links = Array.from(document.querySelectorAll('a')).filter(link =>
		!link.href.startsWith('mailto:') && !link.href.startsWith('javascript:')
	);
	const results = [];
	let completedRequests = 0;

	if (links.length === 0) {
		alert('No valid links found on this page.');
		return;
	}

	// Create and show progress bar
	function createProgressBar() {
		const container = document.createElement('div');
		container.className = 'progress-container';

		const progressBar = document.createElement('div');
		progressBar.className = 'progress-bar';

		const progressFill = document.createElement('div');
		progressFill.className = 'progress-fill';

		const progressText = document.createElement('div');
		progressText.className = 'progress-text';
		progressText.textContent = 'Checking links: 0%';

		progressBar.appendChild(progressFill);
		container.appendChild(progressBar);
		container.appendChild(progressText);
		document.body.appendChild(container);

		return {
			update: (progress) => {
				progressFill.style.width = `${progress}%`;
				progressText.textContent = `Checking links: ${Math.round(progress)}%`;
			},
			remove: () => {
				document.body.removeChild(container);
			}
		};
	}

	function closeModal(overlay) {
		document.body.removeChild(overlay);
	}

	function showModal(content) {
		// Create overlay
		const overlay = document.createElement('div');
		overlay.className = 'link-checker-overlay';
		overlay.onclick = (e) => {
			if (e.target === overlay) {
				closeModal(overlay);
			}
		};

		// Create modal
		const modal = document.createElement('div');
		modal.className = 'link-checker-modal';

		// Create close button
		const closeButton = document.createElement('span');
		closeButton.className = 'link-checker-close';
		closeButton.innerHTML = '×';
		closeButton.onclick = () => closeModal(overlay);

		// Create content container
		const contentContainer = document.createElement('div');
		contentContainer.className = 'link-checker-content';

		// Add content
		const contentDiv = document.createElement('pre');
		contentDiv.textContent = content;
		contentContainer.appendChild(contentDiv);

		// Assemble modal
		modal.appendChild(closeButton);
		modal.appendChild(contentContainer);
		overlay.appendChild(modal);
		document.body.appendChild(overlay);
	}

	const progressBar = createProgressBar();

	function checkLink(url, link, retries = 2) {
		// Indicate that the link is being checked
		link.style.color = 'gray';

		fetch(url, { method: 'HEAD', redirect: 'manual' })
			.then(response => {
				if (response.ok) {
					results.push(`${url} is OK (${response.status})`);
					link.style.color = 'green';
				} else if (response.status === 404) {
					results.push(`${url} is broken (404)`);
					link.style.color = 'red';
				} else if (response.status >= 300 && response.status < 400) {
					results.push(`${url} is a redirect (${response.status})`);
					link.style.color = 'orange';
				} else {
					results.push(`${url} returned status ${response.status}`);
					link.style.color = 'orange';
				}
				completedRequests++;
				updateProgress();
			})
			.catch(error => {
				if (retries > 0) {
					setTimeout(() => checkLink(url, link, retries - 1), 1000);
				} else {
					results.push(`${url} could not be reached after multiple attempts`);
					link.style.color = 'red';
					completedRequests++;
					updateProgress();
				}
			});
	}

	function updateProgress() {
		const progress = (completedRequests / links.length) * 100;
		progressBar.update(progress);

		if (completedRequests === links.length) {
			// Remove progress bar and show summary
			setTimeout(() => {
				progressBar.remove();
				showModal(results.join('\n'));
			}, 100);
		}
	}

	links.forEach((link, index) => {
		const url = link.href;
		setTimeout(() => checkLink(url, link), index * 500); // Add delay between requests
	});
})();

console.log(`
Source: homemade
Bookmarklet name: Check Links
`);
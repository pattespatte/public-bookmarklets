// Description: Copies selected text as Markdown using Turndown
javascript: (function () {
	/* Check if text is selected */
	var selection = window.getSelection();
	if (!selection.toString()) {
		alert('Please select some text first!');
		return;
	}

	/* Get the selected HTML */
	var range = selection.getRangeAt(0);
	var container = document.createElement('div');
	container.appendChild(range.cloneContents());
	var html = container.innerHTML;

	/* Load Turndown if not already loaded */
	if (typeof TurndownService === 'undefined') {
		var script = document.createElement('script');
		script.src = 'https://unpkg.com/turndown/dist/turndown.js';
		script.onload = function () {
			convertToMarkdown(html);
		};
		document.head.appendChild(script);
	} else {
		convertToMarkdown(html);
	}

	function convertToMarkdown(html) {
		/* Initialize Turndown with options */
		var turndownService = new TurndownService({
			headingStyle: 'atx',
			codeBlockStyle: 'fenced',
			bulletListMarker: '-'
		});

		/* Convert HTML to Markdown */
		var markdown = turndownService.turndown(html);

		/* Copy to clipboard */
		navigator.clipboard.writeText(markdown).then(function () {
			/* Visual feedback */
			var notification = document.createElement('div');
			notification.textContent = 'Markdown copied to clipboard!';
			notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:10px 20px;border-radius:5px;z-index:10000;font-family:sans-serif;';
			document.body.appendChild(notification);
			setTimeout(function () {
				notification.remove();
			}, 2000);
		}).catch(function (err) {
			alert('Failed to copy to clipboard: ' + err);
		});
	}
})();
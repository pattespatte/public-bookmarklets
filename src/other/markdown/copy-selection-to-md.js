// Source: https://github.com/pattespatte/public-bookmarklets
// Description: The Copy Selection to Markdown bookmarklet converts the current text selection to Markdown format and copies it to the clipboard. Supports common HTML elements: headings (h1-h6), paragraphs, line breaks, bold/strong, italic/em, code, pre, links with href, images with alt/src, unordered/ordered lists, blockquotes, horizontal rules, and tables. Displays a green notification when copied successfully, or alerts on failure. Useful for quickly copying web content into Markdown editors.
javascript: (function () {
	var selection = window.getSelection();
	if (!selection.toString()) {
		alert('Please select some text first!');
		return;
	}

	var range = selection.getRangeAt(0);
	var container = document.createElement('div');
	container.appendChild(range.cloneContents());

	/* Mini Turndown implementation */
	function convertToMarkdown(node) {
		if (node.nodeType === 3) return node.textContent;
		if (node.nodeType !== 1) return '';

		var result = '';
		var tagName = node.tagName.toLowerCase();

		/* Process children first */
		var childContent = '';
		for (var i = 0; i < node.childNodes.length; i++) {
			childContent += convertToMarkdown(node.childNodes[i]);
		}

		/* Handle different tags */
		switch (tagName) {
			case 'p':
				result = childContent + '\n\n';
				break;
			case 'br':
				result = '\n';
				break;
			case 'h1':
				result = '# ' + childContent + '\n\n';
				break;
			case 'h2':
				result = '## ' + childContent + '\n\n';
				break;
			case 'h3':
				result = '### ' + childContent + '\n\n';
				break;
			case 'h4':
				result = '#### ' + childContent + '\n\n';
				break;
			case 'h5':
				result = '##### ' + childContent + '\n\n';
				break;
			case 'h6':
				result = '###### ' + childContent + '\n\n';
				break;
			case 'strong':
			case 'b':
				result = '**' + childContent + '**';
				break;
			case 'em':
			case 'i':
				result = '*' + childContent + '*';
				break;
			case 'code':
				result = '`' + childContent + '`';
				break;
			case 'pre':
				result = '```\n' + childContent + '\n```\n\n';
				break;
			case 'a':
				var href = node.getAttribute('href');
				result = '[' + childContent + '](' + (href || '') + ')';
				break;
			case 'img':
				var src = node.getAttribute('src');
				var alt = node.getAttribute('alt') || '';
				result = '![' + alt + '](' + (src || '') + ')';
				break;
			case 'ul':
				result = childContent + '\n';
				break;
			case 'ol':
				result = childContent + '\n';
				break;
			case 'li':
				var parent = node.parentNode;
				var isOrdered = parent && parent.tagName.toLowerCase() === 'ol';
				if (isOrdered) {
					var index = Array.from(parent.children).indexOf(node) + 1;
					result = index + '. ' + childContent + '\n';
				} else {
					result = '- ' + childContent + '\n';
				}
				break;
			case 'blockquote':
				result =
					childContent
						.split('\n')
						.map((line) => '> ' + line)
						.join('\n') + '\n\n';
				break;
			case 'hr':
				result = '---\n\n';
				break;
			case 'table':
				result = childContent + '\n';
				break;
			case 'thead':
			case 'tbody':
				result = childContent;
				break;
			case 'tr':
				result = '|' + childContent + '\n';
				if (node.parentNode.tagName.toLowerCase() === 'thead') {
					var cellCount = node.querySelectorAll('th, td').length;
					result +=
						'|' + Array(cellCount).fill('---').join('|') + '|\n';
				}
				break;
			case 'th':
			case 'td':
				result = ' ' + childContent.trim() + ' |';
				break;
			default:
				result = childContent;
		}

		return result;
	}

	var markdown = convertToMarkdown(container).trim();

	/* Copy to clipboard */
	navigator.clipboard
		.writeText(markdown)
		.then(function () {
			var notification = document.createElement('div');
			notification.textContent = 'Markdown copied to clipboard!';
			notification.style.cssText =
				'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:10px 20px;border-radius:5px;z-index:10000;font-family:sans-serif;';
			document.body.appendChild(notification);
			setTimeout(function () {
				notification.remove();
			}, 2000);
		})
		.catch(function (err) {
			alert('Failed to copy to clipboard: ' + err);
		});
})();

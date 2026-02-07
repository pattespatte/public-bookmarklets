// Description: The Text Spacing bookmarklet toggles enhanced text spacing to test WCAG 1.4.12 Text Spacing requirements. Sets line-height to 1.5, letter-spacing to 0.12em, word-spacing to 0.16em, and paragraph margin-bottom to 2em. Applies to main document, shadow DOMs, and iframes. Run again to remove. WCAG SC 1.4.12: Text Spacing.
javascript: (function () {
	var d = document;
	var id = 'phltsbkmklt'; // Unique ID for the style tag
	var el = d.getElementById(id); // Check if the style is already applied
	var iframes = d.querySelectorAll('iframe');
	var i = 0,
		l = iframes.length;

	// Function to remove styles from shadow DOMs recursively
	function removeFromShadows(root) {
		for (var el of root.querySelectorAll('*')) {
			if (el.shadowRoot) {
				var shadowStyle = el.shadowRoot.getElementById(id);
				if (shadowStyle) shadowStyle.remove();
				// Recursively remove from nested shadow DOMs
				removeFromShadows(el.shadowRoot);
			}
		}
	}

	// Function to apply styles to shadow DOMs recursively
	function applyToShadows(root, styleNode) {
		for (var el of root.querySelectorAll('*')) {
			if (el.shadowRoot) {
				el.shadowRoot.appendChild(styleNode.cloneNode(true));
				// Recursively apply to nested shadow DOMs
				applyToShadows(el.shadowRoot, styleNode);
			}
		}
	}

	// If the style is already applied, remove it (toggle off)
	if (el) {
		el.remove();
		// Remove styles from shadow DOMs in the main document
		removeFromShadows(d);
		// Remove styles from iframes and their shadow DOMs
		if (l) {
			for (i = 0; i < l; i++) {
				try {
					var iframeDoc = iframes[i].contentWindow.document;
					var iframeStyle = iframeDoc.getElementById(id);
					if (iframeStyle) iframeStyle.remove();
					removeFromShadows(iframeDoc);
				} catch (e) {
					console.log('Error removing styles from iframe:', e);
				}
			}
		}
	}
	// Otherwise, apply the styles (toggle on)
	else {
		// Create the style block with custom text styles
		var s = d.createElement('style');
		s.id = id;
		s.appendChild(
			d.createTextNode(`
			* {
				line-height: 1.5 !important;
				letter-spacing: 0.12em !important;
				word-spacing: 0.16em !important;
			}
			p {
				margin-bottom: 2em !important;
			}
		`)
		);

		// Append the style to the main document head
		d.head.appendChild(s);

		// Apply styles to shadow DOMs in the main document
		applyToShadows(d, s);

		// Apply styles to iframes and their shadow DOMs
		if (l) {
			for (i = 0; i < l; i++) {
				try {
					var iframeDoc = iframes[i].contentWindow.document;
					iframeDoc.head.appendChild(s.cloneNode(true));
					applyToShadows(iframeDoc, s);
				} catch (e) {
					console.log('Error applying styles to iframe:', e);
				}
			}
		}
	}
})();

console.log(`
Source: https://codepen.io/stevef/full/YLMqbo
Bookmarklet name: Text Spacing (WCAG SC 1.4.12)
`);

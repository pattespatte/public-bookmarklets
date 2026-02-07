(function () {
	'use strict';
	// Description: The Text Readability Grade bookmarklet estimates the Flesch-Kincaid grade level of selected text or main page content. Counts syllables in words using pattern matching, calculates the grade level based on sentence length and word complexity, and displays an alert with the estimated grade level (lower numbers indicate easier-to-read text). If text is selected, analyzes only the selection; otherwise, analyzes the main element or body text (up to 3000 characters). Useful for assessing content readability. WCAG SC 3.1.5: Reading Level.
	try {
		function syllables(w) {
			w = w.toLowerCase().replace(/[^a-z]/g, '');
			if (!w) return 0;
			if (w.length <= 3) return 1;
			w = w
				.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
				.replace(/^y/, '');
			const m = w.match(/[aeiouy]{1,2}/g);
			return m ? m.length : 1;
		}
		function grade(text) {
			const sents = Math.max(
				1,
				(text.match(/[.!?]+\s/g) || []).length + 1
			);
			const words = text.trim().split(/\s+/).filter(Boolean);
			const syll = words.reduce((a, w) => a + syllables(w), 0);
			const W = words.length,
				S = sents;
			return 0.39 * (W / S) + 11.8 * (syll / W) - 15.59;
		}
		let text = window.getSelection().toString().trim();
		if (!text) {
			const main = document.querySelector('main') || document.body;
			text = main.innerText.replace(/\s+/g, ' ').trim().slice(0, 3000);
		}
		const g = grade(text);
		alert('Estimated grade level: ' + g.toFixed(1));
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Text readability grade
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

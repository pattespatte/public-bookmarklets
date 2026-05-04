(function () {
	'use strict';
	// Description: The Text Readability Grade bookmarklet estimates the Flesch-Kincaid grade level of selected text or main page content. Counts syllables in words using pattern matching, calculates the grade level based on sentence length and word complexity, and displays an alert with the estimated grade level (lower numbers indicate easier-to-read text). If text is selected, analyzes only the selection; otherwise, analyzes the main element or body text (up to 3000 characters). Useful for assessing content readability. WCAG SC 3.1.5: Reading Level.
	const toast = (function () {
		const H = 'a11y-toast-host';
		return function (msg, type) {
			let host = document.getElementById(H);
			if (!host) {
				host = document.createElement('div');
				host.id = H;
				host.style.cssText =
					'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:2147483647;pointer-events:none';
				document.body.appendChild(host);
				const sh = host.attachShadow({ mode: 'open' });
				sh.innerHTML =
					'<style>@keyframes ti{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes to{from{opacity:1}to{opacity:0;transform:translateY(-8px)}}.t{animation:ti .2s ease-out;pointer-events:auto;color:#fff;font:13px/1.4 system-ui,-apple-system,sans-serif;border-radius:8px;padding:10px 16px;box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:pre-line;word-break:break-word;max-width:400px;text-align:center;cursor:pointer;margin-top:8px}.i{background:#333}.e{background:#b91c1c}.x{animation:to .2s ease-in forwards}</style><div id="s" style="display:flex;flex-direction:column-reverse;align-items:center"></div>';
			}
			const s = host.shadowRoot.getElementById('s');
			const d = document.createElement('div');
			d.className = 't ' + (type === 'error' ? 'e' : 'i');
			d.textContent = msg;
			d.onclick = function () {
				d.classList.add('x');
				setTimeout(function () {
					d.remove();
				}, 200);
			};
			s.appendChild(d);
			setTimeout(
				function () {
					d.classList.add('x');
					setTimeout(function () {
						d.remove();
					}, 200);
				},
				type === 'error' ? 8000 : 4000
			);
		};
	})();
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
		toast('Estimated grade level: ' + g.toFixed(1));
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Text readability grade
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

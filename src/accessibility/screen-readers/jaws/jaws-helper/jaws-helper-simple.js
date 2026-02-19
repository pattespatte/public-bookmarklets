/*
 * Source: https://github.com/pattespatte/public-bookmarklets
 * Author: Patrik (pattespatte)
 * License: MIT
 */
javascript: (function () {
	'use strict';
	// Description: The JAWS Helper (short version) bookmarklet displays a simplified quick reference guide for testing with the JAWS screen reader. Shows a modal panel with essential keyboard shortcuts for reading, navigation, landmarks, and element lists. Includes a compact table with core commands like stop reading, continuous reading, tab navigation, landmark/region navigation, and elements list. References Deque University for more comprehensive shortcuts. Useful for testers needing a quick reference during audits. Close with X, clicking outside, or pressing Escape. WCAG SC 2.1.1: Keyboard, WCAG SC 2.4.1: Bypass Blocks.

	function addJAWSGuide() {
		var modal = document.createElement('div');
		modal.id = 'jaws-helper-modal';
		modal.style.cssText =
			"position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:10000;background:#fff;color:#111;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:8px;width:90%;max-width:600px;max-height:80%;overflow-y:auto;padding:1em;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;";

		var closeButton = document.createElement('button');
		closeButton.innerHTML = '&times;';
		closeButton.style.cssText =
			'position:absolute;top:0.5em;right:0.5em;background:none;border:none;font-size:1.5em;cursor:pointer;color:#666;';
		closeButton.onclick = () => closeModal();

		modal.appendChild(closeButton);

		var guideContent = `
			<style>
				#jaws-helper-modal>table {border-collapse:collapse;width:100%;}
				#jaws-helper-modal td {padding:8px;border:1px solid #ddd;}
				#jaws-helper-modal a {text-decoration:underline;}
			</style>
			<h1>JAWS Guide</h1>
			<p>The default JAWS key is <strong>Insert</strong>.</p>
			<table>
			<tr><td>Stop reading</td><td>Control</td></tr>
			<tr><td>Start reading continuously from this point on</td><td>Insert + down arrow</td></tr>
			<tr><td>Read next item</td><td>down arrow</td></tr>
			<tr><td>Read next focusable item (e.g. link, button)</td><td>Tab</td></tr>
			<tr><td>Go to next landmark/region</td><td>R</td></tr>
			<tr><td>Go to the main content region</td><td>Q</td></tr>
			<tr><td>List all buttons, frames, graphics, lists, links, etc.</td><td>Insert + F3</td></tr>
			</table>
			<p>For more shortcuts, visit <a href="https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts">Deque University</a>.</p>
		`;

		modal.insertAdjacentHTML('beforeend', guideContent);
		document.body.appendChild(modal);

		var overlay = document.createElement('div');
		overlay.id = 'jaws-helper-overlay';
		overlay.style.cssText =
			'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9999;';
		overlay.onclick = () => closeModal();
		document.body.appendChild(overlay);

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') closeModal();
		});

		function closeModal() {
			modal.remove();
			overlay.remove();
		}
	}

	addJAWSGuide();
})();

console.log(`
Bookmarklet name: JAWS Helper (short version)
`);

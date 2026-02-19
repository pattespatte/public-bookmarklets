/*
 * Source: https://github.com/pattespatte/public-bookmarklets
 * Author: Patrik (pattespatte)
 * License: MIT
 */
// Description: The NVDA Helper bookmarklet displays a quick reference guide for testing with the NVDA screen reader. Shows a modal panel with essential keyboard shortcuts for reading navigation, headings, landmarks, tables, lists, graphics, links, and form controls. Displays the NVDA modifier key (Ctrl+Alt+N or Insert) and lists common commands for on/off, stop reading, continuous reading, and element navigation. References Deque University for more comprehensive shortcuts. Useful for testers learning NVDA or needing quick reference during audits. Close with X, clicking outside, or pressing Escape. WCAG SC 2.1.1: Keyboard, 2.4.1: Bypass Blocks, 3.3.2: Labels or Instructions.
(function () {
	'use strict';

	function addNVDAGuide() {
		var modal = document.createElement('div');
		modal.id = 'nvda-helper-modal';
		modal.style.cssText =
			"position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:10000;background:#fff;color:#111;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:8px;width:90%;max-width:600px;max-height:80%;overflow-y:auto;padding:1em;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;";

		var closeButton = document.createElement('button');
		closeButton.innerHTML = '&times;';
		closeButton.style.cssText =
			'position:absolute;top:0.5em;right:0.5em;background:none;border:none;font-size:1.5em;cursor:pointer;color:#666;';
		closeButton.onclick = () => closeModal();

		// Add close button to the modal
		modal.appendChild(closeButton);

		var guideContent = `
			<style>
				#nvda-helper-modal>table {border-collapse:collapse;width:100%;}
				#nvda-helper-modal td, #nvda-helper-modal th {padding:8px;border:1px solid #ddd;}
				#nvda-helper-modal td:nth-child(2) {white-space:nowrap;}
				#nvda-helper-modal tr:nth-child(odd) {background:#eee;}
				#nvda-helper-modal tr:nth-child(even) {background:#fff;}
				#nvda-helper-modal a {text-decoration:underline;}
			</style>
			<h1>NVDA Guide</h1>
			<p>The default NVDA key is <strong>Ctrl + Alt + N</strong> or <strong>Insert</strong>.</p>
			<table>
				<tr>
					<th>Task</th>
					<th>Command</th>
				</tr>
				<tr>
					<td>Turn <strong>NVDA on</strong></td>
					<td>Control + Alt + N</td>
				</tr>
				<tr>
					<td>Turn <strong>NVDA off</strong></td>
					<td>NVDA key + Q</td>
				</tr>
				<tr>
					<td><strong>Stop Reading</strong></td>
					<td>Control</td>
				</tr>
				<tr>
					<td><strong>Start reading</strong> continuously from this point on</td>
					<td>Insert + ▼ or Numpad Plus (+)</td>
				</tr>
				<tr>
					<td><strong>Read next item</strong></td>
					<td></td>
				</tr>
				<tr>
					<td><strong>Read next focusable item</strong> (e.g. link, button)</td>
					<td>Tab</td>
				</tr>
				<tr>
					<td><strong>Activate</strong><strong> link</strong></td>
					<td>Enter</td>
				</tr>
				<tr>
					<td><strong>Activate</strong><strong> button</strong></td>
					<td>Enter or Spacebar</td>
				</tr>
				<tr>
					<td>Go to <strong>next heading</strong></td>
					<td>H</td>
				</tr>
				<tr>
					<td>Go to <strong>next heading of level [1-6]</strong></td>
					<td>1 - 6</td>
				</tr>
				<tr>
					<td>List <strong>all headings</strong></td>
					<td>NVDA key + F7</td>
				</tr>
				<tr>
					<td>Go to <strong>next landmark/region</strong></td>
					<td>D</td>
				</tr>
				<tr>
					<td>Show list of <strong>all links, headings, form fields, buttons, and landmarks</strong></td>
					<td>NVDA key + F7</td>
				</tr>
				<tr>
					<td>Go to the <strong>next table</strong></td>
					<td>T</td>
				</tr>
				<tr>
					<td>Navigate <strong>table cells</strong></td>
					<td>Ctrl + Alt + ▼ or ▲ or ◀︎ or ▶︎</td>
				</tr>
				<tr>
					<td>Go to the <strong>next list</strong></td>
					<td>L</td>
				</tr>
				<tr>
					<td>Go to the <strong>next list item</strong></td>
					<td>I</td>
				</tr>
				<tr>
					<td>Go to the <strong>next graphic</strong></td>
					<td>G</td>
				</tr>
				<tr>
					<td>List <strong>all links</strong></td>
					<td>NVDA key + F7</td>
				</tr>
				<tr>
					<td>Go to the <strong>next link</strong></td>
					<td>K</td>
				</tr>
				<tr>
					<td>Go to <strong>next unvisited link</strong></td>
					<td>U</td>
				</tr>
				<tr>
					<td>Go to <strong>next visited link</strong></td>
					<td>V</td>
				</tr>
				<tr>
					<td><strong>Toggle</strong> between: Radio buttons,&lt;select&gt;list items, Tabs (ARIA widget), Tree view items (ARIA widget), Menu items (ARIA widget)</td>
					<td>▶︎ or ▼ or ◀︎ or ▲</td>
				</tr>
				<tr>
					<td>To <strong>previous heading, landmark, table, focusable item, etc.</strong></td>
					<td>Shift + [H, D, T, Tab, etc.]</td>
				</tr>
			</table>
			<p>For more shortcuts, visit <a href="https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts">Deque University</a>.</p>
		`;

		modal.insertAdjacentHTML('beforeend', guideContent);
		document.body.appendChild(modal);

		var overlay = document.createElement('div');
		overlay.id = 'nvda-helper-overlay';
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
	addNVDAGuide();
})();

console.log(`
Bookmarklet name: NVDA Helper
`);

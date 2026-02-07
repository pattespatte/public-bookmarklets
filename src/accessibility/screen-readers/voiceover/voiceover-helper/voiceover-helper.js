javascript: (function () {
	'use strict';
	// Description: The VoiceOver Helper bookmarklet displays a quick reference guide for testing with Apple's VoiceOver screen reader. Shows a modal panel with essential VoiceOver commands including start/stop, navigation, rotor usage, and element interaction. Explains the VoiceOver modifier (Ctrl+Alt), rotor navigation for element types, and basic commands like entering/escaping sections and interacting with controls. References Apple's official documentation and Deque University. Useful for testers learning VoiceOver or needing quick reference during audits. Close with X, clicking outside, or pressing Escape.

	function addVoiceOverGuide() {
		var modal = document.createElement('div');
		modal.id = 'voiceover-helper-modal';
		modal.style.position = 'fixed';
		modal.style.top = '50%';
		modal.style.left = '50%';
		modal.style.transform = 'translate(-50%, -50%)';
		modal.style.zIndex = '10000';
		modal.style.background = '#fff';
		modal.style.color = '#111';
		modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
		modal.style.borderRadius = '8px';
		modal.style.width = '90%';
		modal.style.maxWidth = '600px';
		modal.style.maxHeight = '80%';
		modal.style.overflowY = 'auto';
		modal.style.padding = '1em';
		modal.style.fontFamily =
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

		var closeButton = document.createElement('button');
		closeButton.innerHTML = '&times;';
		closeButton.style.position = 'absolute';
		closeButton.style.top = '0.5em';
		closeButton.style.right = '0.5em';
		closeButton.style.background = 'none';
		closeButton.style.border = 'none';
		closeButton.style.fontSize = '1.5em';
		closeButton.style.cursor = 'pointer';
		closeButton.style.color = '#666';

		closeButton.addEventListener('click', function () {
			closeModal();
		});
		// Add close button to the modal
		modal.appendChild(closeButton);

		var guideContent = `
			<style>
				#voiceover-helper-modal>table {
					border-collapse: collapse;
					width: 100%;
				}
				#voiceover-helper-modal td {
					padding: 8px;
					border: 1px solid #ddd; /* Optional: adds borders for clarity */
				}
				#voiceover-helper-modal a {
					text-decoration: underline;
				}
			</style>
			<h1>VoiceOver guide</h1>
			<p>The default VoiceOver (VO) button is <strong>ctrl + alt</strong>.</p>
			<table>
				<tr>
					<td>cmd + F5</td>
					<td>start or stop VoiceOver</td>
				</tr>
				<tr>
					<td>VO + A</td>
					<td>start reading</td>
				</tr>
				<tr>
					<td>VO</td>
					<td>stop reading</td>
				</tr>
				<tr>
					<td>VO + Shift + ▼</td>
					<td>go into a section</td>
				</tr>
				<tr>
					<td>VO + Shift + ▲</td>
					<td>exit a section</td>
				</tr>
				<tr>
					<td>VO + ▶︎</td>
					<td>next</td>
				</tr>
				<tr>
					<td>VO + ◀︎</td>
					<td>previous</td>
				</tr>
				<tr>
					<td>Enter</td>
					<td>click a link or button</td>
				</tr>
				<tr>
					<td>Space</td>
					<td>select a checkbox, radio or dropdown</td>
				</tr>
			</table>
			<h2>The rotor</h2>
			<p>The rotor lets you navigate by element type, for example headings and links.</p>
			<table>
				<tr>
					<td>VO + U</td>
					<td>open the rotor</td>
				</tr>
				<tr>
					<td>◀︎ ▶︎</td>
					<td>switch between element types</td>
				</tr>
				<tr>
					<td>▲ ▼</td>
					<td>select an element</td>
				</tr>
				<tr>
					<td>Space or Enter</td>
					<td>go to selected element</td>
				</tr>
			</table>
			<p>For more shortcuts, visit <a href="https://support.apple.com/guide/voiceover/general-commands-cpvokys01/mac">Apple</a> or <a href="https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts">Deque University</a>.</p>
		`;

		modal.insertAdjacentHTML('beforeend', guideContent);
		document.body.appendChild(modal);

		var overlay = document.createElement('div');
		overlay.id = 'voiceover-helper-overlay';
		overlay.style.position = 'fixed';
		overlay.style.top = '0';
		overlay.style.left = '0';
		overlay.style.width = '100%';
		overlay.style.height = '100%';
		overlay.style.background = 'rgba(0, 0, 0, 0.4)';
		overlay.style.zIndex = '9999';
		overlay.addEventListener('click', function () {
			closeModal();
		});
		document.body.appendChild(overlay);

		document.addEventListener('keydown', function escKeyListener(event) {
			if (event.key === 'Escape') {
				closeModal();
				document.removeEventListener('keydown', escKeyListener);
			}
		});

		function closeModal() {
			if (modal) modal.remove();
			if (overlay) overlay.remove();
		}
	}
	addVoiceOverGuide();
})();

console.log(`
Source: https://github.com/joelanman/voiceover-helper
Bookmarklet name: VoiceOver Helper
`);

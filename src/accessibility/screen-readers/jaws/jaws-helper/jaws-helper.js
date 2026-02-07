/*
 * Source: https://github.com/pattespatte/public-bookmarklets
 * Author: Patrik (pattespatte)
 * License: MIT
 */
javascript: (function () {
	'use strict';
	// Description: The JAWS Helper bookmarklet displays a comprehensive quick reference guide for testing with the JAWS screen reader. Shows modal panels with keyboard shortcuts for reading navigation (headings, landmarks, tables, lists, links), text reading (by line, character, word, sentence), forms mode, and other commands. Includes tables organized by topic with task descriptions and corresponding keystrokes. References Deque University as the source. Useful for testers learning JAWS or needing a quick reference during audits. Close with X, clicking outside, or pressing Escape.

	function addJAWSGuide() {
		var modal = document.createElement('div');
		modal.id = 'jaws-helper-modal';
		modal.style.cssText =
			"position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:10000;background:#fff;color:#111;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:8px;width:90%;max-width:90%;max-height:90%;overflow-y:auto;padding:1em;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;";

		var closeButton = document.createElement('button');
		closeButton.innerHTML = '&times;';
		closeButton.style.cssText =
			'position:absolute;top:0.5em;right:0.5em;background:none;border:none;font-size:1.5em;cursor:pointer;color:#666;';
		closeButton.onclick = () => closeModal();

		modal.appendChild(closeButton);

		var guideContent = `
			<style>
				#jaws-helper-modal th, #jaws-helper-modal p, #jaws-helper-modal td {font-weight:normal}
				#jaws-helper-modal table {border-collapse:collapse;width:100%}
				#jaws-helper-modal tr {border:1px solid #ddd}
				#jaws-helper-modal th, #jaws-helper-modal td {padding:4px;color:#111;background:#fff}
				#jaws-helper-modal thead>tr>th, #jaws-helper-modal td {font-weight:bold}
				#jaws-helper-modal a {text-decoration:underline}
			</style>
			<h1>JAWS Guide</h1>
			<p>The default JAWS key is Insert.</p>
			<h2>Getting started</h2>
			<p><strong>PC Cursor:</strong> The usual cursor on the screen. When activated, users can move this cursor around the screen. It can only go where a cursor can be placed.</p>
			<p><strong>Virtual PC Cursor:</strong> The virtual PC cursor is similar to the PC Cursor, and is used for navigating HTML documents.</p>
			<p><strong>JAWS cursor:</strong> The JAWS cursor is the mouse pointer on the screen. When activated, users can move around the screen and navigate through areas where a normal cursor cannot go.</p>
			<p><strong>Forms Mode:</strong> When entering a form using Tab, Arrow Keys, or the JAWS cursor, JAWS automatically leaves Browse Mode and enters Forms Mode. This changes some of the keystrokes so that the user can enter text. If Forms mode does not activate automatically, press Enter when on a form field to activate it. Press the Numpad Plus (+) to go back to browse mode and use normal navigation keystrokes.</p>

			<h2>The basics</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th scope="col">Topic</th>
							<th scope="col">Task</th>
							<th scope="col">Command</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th rowspan="4" scope="rowgroup">Reading:</th>
							<th scope="row">Stop reading</th>
							<td>Control</td>
						</tr>
						<tr>
							<th scope="row">Start reading continuously from this point on</th>
							<td>Insert + ▼</td>
						</tr>
						<tr>
							<th scope="row">Read next item</th>
							<td>▼</td>
						</tr>
						<tr>
							<th scope="row">Read next <em>focusable</em> item (e.g. link, button)</th>
							<td>Tab</td>
						</tr>
						<tr>
							<th rowspan="2" scope="rowgroup">Activate:</th>
							<th scope="row">Link</th>
							<td>Enter</td>
						</tr>
						<tr>
							<th scope="row">Button</th>
							<td>Enter or Space Bar</td>
						</tr>
						<tr>
							<th rowspan="3" scope="rowgroup">Headings:</th>
							<th scope="row">Go to next heading</th>
							<td>H</td>
						</tr>
						<tr>
							<th scope="row">Show list of all headings</th>
							<td>Insert + F6</td>
						</tr>
						<tr>
							<th scope="row">Go to next heading of level [1-6]</th>
							<td>1 - 6
							</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Landmarks:</th>
							<th scope="row">Go to next landmark/region</th>
							<td>R</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Main:</th>
							<th scope="row">Go to the main content region</th>
							<td>Q</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Elements list:</th>
							<th scope="row">Show list of all buttons, frames, graphics, lists, links, etc.</th>
							<td>Insert + F3</td>
						</tr>
						<tr>
							<th rowspan="2" scope="rowgroup">Tables:</th>
							<th scope="row">Go to next table</th>
							<td>T</td>
						</tr>
						<tr>
							<th scope="row">Navigate table cells</th>
							<td>Ctrl + Alt + ▶︎ or ▼ or ◀︎ or ▲</td>
						</tr>
						<tr>
							<th rowspan="2" scope="rowgroup">Lists:</th>
							<th scope="row">Go to next list</th>
							<td>L</td>
						</tr>
						<tr>
							<th scope="row">Go to next list item</th>
							<td>I</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Graphics:</th>
							<th scope="row">Go to next graphic</th>
							<td>G</td>
						</tr>
						<tr>
							<th rowspan="3" scope="rowgroup">Links:</th>
							<th scope="row">List all links</th>
							<td>Insert + F7</td>
						</tr>
						<tr>
							<th scope="row">Go to next <em>unvisited</em> link</th>
							<td>U</td>
						</tr>
						<tr>
							<th scope="row">Go to next <em>visited</em> link</th>
							<td>V</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Navigate:</th>
							<th scope="row">Toggle between:<br> Radio buttons,<br> &lt;select&gt; list items,<br> Tabs (ARIA widget),<br> Tree view items (ARIA widget),<br> Menu items (ARIA widget)</th>
							<td>▶︎ or ▼ or ◀︎ or ▲</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Virtual PC Cursor:</th>
							<th scope="row">Toggle Virtual PC Cursor</th>
							<td>Insert + Z</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Go backward:</th>
							<th scope="row">To previous heading, landmark, table, focusable item, etc.</th>
							<td>Shift + [H, R, T, Tab, etc.]</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2>Reading text</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th scope="col">Topic</th>
							<th scope="col">Task</th>
							<th scope="col">Command</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th rowspan="5" scope="rowgroup">Line:</th>
							<th scope="row">Say prior line</th>
							<td>▲</td>
						</tr>
						<tr>
							<th scope="row">Say next line</th>
							<td>▼</td>
						</tr>
						<tr>
							<th scope="row">Say current line</th>
							<td>Insert + ▲</td>
						</tr>
						<tr>
							<th scope="row">Say to cursor</th>
							<td>Insert + Home</td>
						</tr>
						<tr>
							<th scope="row">Say from cursor</th>
							<td>Insert + Page Up</td>
						</tr>
						<tr>
							<th rowspan="4" scope="rowgroup">Character:</th>
							<th scope="row">Say prior character</th>
							<td>◀︎</td>
						</tr>
						<tr>
							<th scope="row">Say next character</th>
							<td>▶︎</td>
						</tr>
						<tr>
							<th scope="row">Say character</th>
							<td>Numpad 5</td>
						</tr>
						<tr>
							<th scope="row">Say character phonetically</th>
							<td>Numpad 5 twice quickly</td>
						</tr>
						<tr>
							<th rowspan="3" scope="rowgroup">Word:</th>
							<th scope="row">Say prior word</th>
							<td>Insert + ◀︎</td>
						</tr>
						<tr>
							<th scope="row">Say next word</th>
							<td>Insert + ▶︎</td>
						</tr>
						<tr>
							<th scope="row">Say word</th>
							<td>Insert + Numpad 5</td>
						</tr>
						<tr>
							<th rowspan="3" scope="rowgroup">Sentence:</th>
							<th scope="row">Say prior sentence</th>
							<td>Alt + ▲</td>
						</tr>
						<tr>
							<th scope="row">Say next sentence</th>
							<td>Alt + ▼</td>
						</tr>
						<tr>
							<th scope="row">Say current sentence</th>
							<td>Alt + Numpad 5</td>
						</tr>
						<tr>
							<th rowspan="4" scope="rowgroup">Spelling:</th>
							<th scope="row">Spell word</th>
							<td>Insert + Numpad 5 twice quickly</td>
						</tr>
						<tr>
							<th scope="row">Spell current line</th>
							<td>Insert + ▲ twice quickly</td>
						</tr>
						<tr>
							<th scope="row">Spell to cursor</th>
							<td>Insert + Home twice quickly</td>
						</tr>
						<tr>
							<th scope="row">Spell from cursor</th>
							<td>Insert + Page Up twice quickly</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Fast forward:</th>
							<th scope="row">Forward during a say all</th>
							<td>▶︎</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Rewind:</th>
							<th scope="row">Rewind during a say all</th>
							<td>◀︎</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2>Tables</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th scope="col">Topic</th>
							<th scope="col">Task</th>
							<th scope="col">Command</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th rowspan="1" scope="rowgroup">Table:</th>
							<th scope="row">Go to next (previous) table</th>
							<td>T (Shift + T)</td>
						</tr>
						<tr>
							<th rowspan="7" scope="rowgroup">Cell:</th>
							<th scope="row">Cell to right</th>
							<td>Ctrl + Alt + ▶︎</td>
						</tr>
						<tr>
							<th scope="row">Cell to left</th>
							<td>Ctrl + Alt + ◀︎</td>
						</tr>
						<tr>
							<th scope="row">Cell below</th>
							<td>Ctrl + Alt + ▼</td>
						</tr>
						<tr>
							<th scope="row">Cell above</th>
							<td>Ctrl + Alt + ▲</td>
						</tr>
						<tr>
							<th scope="row">First Cell</th>
							<td>Ctrl + Alt + Home</td>
						</tr>
						<tr>
							<th scope="row">Last cell</th>
							<td>Ctrl + Alt + End</td>
						</tr>
						<tr>
							<th scope="row">Say current cell</th>
							<td>Ctrl + Alt + Numpad 5</td>
						</tr>
						<tr>
							<th rowspan="5" scope="rowgroup">Row:</th>
							<th scope="row">Read current row</th>
							<td>Insert + Shift + ▲</td>
						</tr>
						<tr>
							<th scope="row">Read from start of row</th>
							<td>Insert + Shift + Home</td>
						</tr>
						<tr>
							<th scope="row">Read to end of row</th>
							<td>Insert + Shift + Page Up</td>
						</tr>
						<tr>
							<th scope="row">First cell in row</th>
							<td>Ctrl + Alt + Shift + ◀︎</td>
						</tr>
						<tr>
							<th scope="row">Last cell in row</th>
							<td>Ctrl + Alt + Shift + ▶︎</td>
						</tr>
						<tr>
							<th rowspan="5" scope="rowgroup">Column:</th>
							<th scope="row">Read current column</th>
							<td>Insert + Shift + Numpad 5</td>
						</tr>
						<tr>
							<th scope="row">Read from top of column</th>
							<td>Insert + Shift + End</td>
						</tr>
						<tr>
							<th scope="row">Read to bottom of column</th>
							<td>Insert + Shift + Page Down</td>
						</tr>
						<tr>
							<th scope="row">First cell in column</th>
							<td>Ctrl + Alt + Shift + ▲</td>
						</tr>
						<tr>
							<th scope="row">Last cell in column</th>
							<td>Ctrl + Alt + Shift + ▼</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2>Forms</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th scope="col">Topic</th>
							<th scope="col">Task</th>
							<th scope="col">Command</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th rowspan="1" scope="rowgroup">Form elements:</th>
							<th scope="row">List all form elements</th>
							<td>Insert + F5</td>
						</tr>
						<tr>
							<th rowspan="4" scope="rowgroup">Navigate:</th>
							<th scope="row">Next focusable item</th>
							<td>Tab</td>
						</tr>
						<tr>
							<th scope="row">Next form field</th>
							<td>F</td>
						</tr>
						<tr>
							<th scope="row">Next button</th>
							<td>B</td>
						</tr>
						<tr>
							<th scope="row">Next checkbox</th>
							<td>X</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Checkboxes:</th>
							<th scope="row">Select and deselect</th>
							<td>Space Bar or Enter</td>
						</tr>
						<tr>
							<th rowspan="3" scope="rowgroup">Combo boxes (&lt;select&gt;):</th>
							<th scope="row">Open combo box</th>
							<td>Alt + ▼</td>
						</tr>
						<tr>
							<th scope="row">Browse/select options</th>
							<td>▼ or the First letter</td>
						</tr>
						<tr>
							<th scope="row">Select multiple options</th>
							<td>Shift + ▼ (or ▲)</td>
						</tr>
						<tr>
							<th rowspan="1" scope="rowgroup">Radio buttons:</th>
							<th scope="row">Toggle selection</th>
							<td> ▲/▼</td>
						</tr>
						<tr>
							<th rowspan="2" scope="rowgroup">Forms mode*:</th>
							<th scope="row">Enter forms mode</th>
							<td>Enter (when focus is on a form field)</td>
						</tr>
						<tr>
							<th scope="row">Exit forms mode (enter browse mode)</th>
							<td>Numpad Plus (+)</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>* “Forms mode” allows you to enter data into form fields. Browse mode allows you to navigate the page using standard screen reader shortcuts (e.g. to navigate headings, landmarks, links, etc.)</p>

			<h2>Other commands</h2>
			<table>
				<thead>
					<tr>
						<th scope="col">Task</th>
						<th scope="col">Command</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Search for a word or a phrase</th>
						<td>Ctrl + F</td>
					</tr>
					<tr>
						<th scope="row">Refresh Screen, i.e. repaints all the currently displayed items on the screen</th>
						<td>Insert + Esc</td>
					</tr>
					<tr>
						<th scope="row">Reformat documents, i.e. reformats multiple column pages to be more readable with speech.</th>
						<td>Insert + F5</td>
					</tr>
					<tr>
						<th scope="row">Help with current element</th>
						<td>Insert + F1</td>
					</tr>
				</tbody>
			</table>
			<p>JAWS, which stands for Job Access with Speech, is a screen reader developed by <a href="https://freedomscientific.com">Freedom Scientific.</a></p>
			<p>Shortcuts from <a href="https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts">Deque University</a>. Also available in a <a href="https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/jaws-guide.pdf">single-page printer-friendly PDF version</a>.</p>
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
Bookmarklet name: JAWS Helper
`);

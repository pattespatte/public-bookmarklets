/*
 * Source: https://github.com/pattespatte/public-bookmarklets
 * Author: Patrik (pattespatte)
 * License: MIT
 */
(function () {
	"use strict";
	// Avoid duplicates
	if (window.__nvdaPopoverCleanup) window.__nvdaPopoverCleanup();

	let btn = document.createElement("button");
	btn.id = "nvda-helper-popover-btn";
	btn.type = "button";
	btn.textContent = "NVDA Helper";
	btn.setAttribute("popovertarget", "nvda-helper-popover");
	btn.style.cssText = `
		position:fixed;
		bottom:1em;
		right:1em;
		z-index:10001;
		border-radius:1.5em;
		border:none;
		background:#155b2a;
		color:#fff;
		padding:.7em 1.5em;
		box-shadow:0 2px 8px rgba(0,0,0,.2);
		font-family:inherit;
		font-size:1.1em;
		cursor:pointer;
	`;

	let pop = document.createElement("div");
	pop.id = "nvda-helper-popover";
	pop.setAttribute("popover", "");
	pop.style.cssText = `
		border:1px solid #888;
		border-radius:.5rem;
		padding:1em;
		background:#fff;
		box-shadow:0 2px 8px rgba(0,0,0,0.2);
		color:#333;
		font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
		font-size:.9em;
		line-height:1.2em;
		margin:0 auto;
		max-height:95vh;
		overflow-y:auto;
		width:43rem;
		z-index:10002;
	`;

	pop.innerHTML = `
		<style>
			#nvda-helper-popover table {border-collapse:collapse;width:100%;}
			#nvda-helper-popover td, #nvda-helper-popover th {padding:8px;border:1px solid #ddd;}
			#nvda-helper-popover td:nth-child(2) {white-space:nowrap;}
			#nvda-helper-popover tr:nth-child(odd) {background:#eee;}
			#nvda-helper-popover tr:nth-child(even) {background:#fff;}
			#nvda-helper-popover a {text-decoration:underline;}
			#nvda-helper-close {float:right;font-size:1.3em;padding:.2em .8em;margin:0 auto auto;cursor:pointer;}
		</style>
		<div class="popover-container">
			<button id="nvda-helper-close" popovertarget="nvda-helper-popover" popovertargetaction="hide" aria-label="Close">&times;</button>
			<h1>NVDA Guide</h1>
			<p>The default NVDA key is <strong>Ctrl + Alt + N</strong> or <strong>Insert</strong>.</p>
			<table>
				<tr>
					<th>Task</th>
					<th>Command</th>
				</tr>
				<tr><td>Turn <strong>NVDA on</strong></td><td>Control + Alt + N</td></tr>
				<tr><td>Turn <strong>NVDA off</strong></td><td>NVDA key + Q</td></tr>
				<tr><td><strong>Stop Reading</strong></td><td>Control</td></tr>
				<tr><td><strong>Start reading</strong> continuously from this point on</td><td>Insert + ▼ or Numpad Plus (+)</td></tr>
				<tr><td><strong>Read next item</strong></td><td>▼</td></tr>
				<tr><td><strong>Read next focusable item</strong> (e.g. link, button)</td><td>Tab</td></tr>
				<tr><td><strong>Activate link</strong></td><td>Enter</td></tr>
				<tr><td><strong>Activate button</strong></td><td>Enter or Spacebar</td></tr>
				<tr><td>Go to <strong>next heading</strong></td><td>H</td></tr>
				<tr><td>Go to <strong>next heading of level [1-6]</strong></td><td>1 - 6</td></tr>
				<tr><td>List <strong>all headings</strong></td><td>NVDA key + F7</td></tr>
				<tr><td>Go to <strong>next landmark/region</strong></td><td>D</td></tr>
				<tr><td>Show list of <strong>all links, headings, form fields, buttons, and landmarks</strong></td><td>NVDA key + F7</td></tr>
				<tr><td>Go to the <strong>next table</strong></td><td>T</td></tr>
				<tr><td>Navigate <strong>table cells</strong></td><td>Ctrl + Alt + ▼ or ▲ or ◀︎ or ▶︎</td></tr>
				<tr><td>Go to the <strong>next list</strong></td><td>L</td></tr>
				<tr><td>Go to the <strong>next list item</strong></td><td>I</td></tr>
				<tr><td>Go to the <strong>next graphic</strong></td><td>G</td></tr>
				<tr><td>List <strong>all links</strong></td><td>NVDA key + F7</td></tr>
				<tr><td>Go to the <strong>next link</strong></td><td>K</td></tr>
				<tr><td>Go to <strong>next unvisited link</strong></td><td>U</td></tr>
				<tr><td>Go to <strong>next visited link</strong></td><td>V</td></tr>
				<tr><td><strong>Toggle</strong> between: Radio buttons, &lt;select&gt;list items, Tabs (ARIA widget), Tree view items (ARIA widget), Menu items (ARIA widget)</td><td>▶︎ or ▼ or ◀︎ or ▲</td></tr>
				<tr><td>To <strong>previous heading, landmark, table, focusable item, etc.</strong></td><td>Shift + [H, D, T, Tab, etc.]</td></tr>
			</table>
			<p>For more shortcuts, visit <a href="https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts" target="_blank">Deque University</a>.</p>
		</div>
	`;

	document.body.appendChild(btn);
	document.body.appendChild(pop);

	function cleanup() {
	btn.remove();
	pop.remove();
	document.removeEventListener("keydown", keyHandler);
	}
	window.__nvdaPopoverCleanup = cleanup;

	function keyHandler(e) {
	if (pop.matches(":popover-open") && e.key === "Escape") pop.hidePopover();
	}
	document.addEventListener("keydown", keyHandler);
	pop.addEventListener("close", cleanup);
})();
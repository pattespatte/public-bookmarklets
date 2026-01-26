(function () {
	"use strict";
	// Avoid duplicates
	if (window.__voiceoverPopoverCleanup) window.__voiceoverPopoverCleanup();

	let btn = document.createElement("button");
	btn.id = "voiceover-helper-popover-btn";
	btn.type = "button";
	btn.textContent = "VoiceOver Helper";
	btn.setAttribute("popovertarget", "voiceover-helper-popover");
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
	pop.id = "voiceover-helper-popover";
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
		width:42rem;
		z-index:10002;
	`;

	pop.innerHTML = `
		<style>
			#voiceover-helper-popover table {border-collapse:collapse;width:100%;}
			#voiceover-helper-popover td, #voiceover-helper-popover th {padding:8px;border:1px solid #ddd;}
			#voiceover-helper-popover td:nth-child(2) {white-space:nowrap;}
			#voiceover-helper-popover tr:nth-child(odd) {background:#eee;}
			#voiceover-helper-popover tr:nth-child(even) {background:#fff;}
			#voiceover-helper-popover a {text-decoration:underline;}
			#voiceover-helper-close {float:right;font-size:1.3em;padding:.2em .8em;margin:0 auto auto;cursor:pointer;}
		</style>
		<div class="popover-container">
			<button id="voiceover-helper-close" popovertarget="voiceover-helper-popover" popovertargetaction="hide" aria-label="Close">&times;</button>
			<h1>VoiceOver guide</h1>
			<p>The default VoiceOver (VO) button is <strong>ctrl + alt</strong>.</p>
			<table>
				<tr>
					<td>start or stop VoiceOver</td>
					<td>cmd + F5</td>
				</tr>
				<tr>
					<td>start reading</td>
					<td>VO + A</td>
				</tr>
				<tr>
					<td>stop reading</td>
					<td>VO</td>
				</tr>
				<tr>
					<td>go into a section</td>
					<td>VO + Shift + ▼</td>
				</tr>
				<tr>
					<td>exit a section</td>
					<td>VO + Shift + ▲</td>
				</tr>
				<tr>
					<td>next</td>
					<td>VO + ▶︎</td>
				</tr>
				<tr>
					<td>previous</td>
					<td>VO + ◀︎</td>
				</tr>
				<tr>
					<td>click a link or button</td>
					<td>Enter</td>
				</tr>
				<tr>
					<td>select a checkbox, radio or dropdown</td>
					<td>Space</td>
				</tr>
			</table>
			<h2>The rotor</h2>
			<p>The rotor lets you navigate by element type, for example headings and links.</p>
			<table>
				<tr>
					<td>open the rotor</td>
					<td>VO + U</td>
				</tr>
				<tr>
					<td>switch between element types</td>
					<td>◀︎ ▶︎</td>
				</tr>
				<tr>
					<td>select an element</td>
					<td>▲ ▼</td>
				</tr>
				<tr>
					<td>go to selected element</td>
					<td>Space or Enter</td>
				</tr>
			</table>
			<p>For more shortcuts, visit <a href="https://support.apple.com/guide/voiceover/general-commands-cpvokys01/mac">Apple</a> or <a href="https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts">Deque University</a>.</p>
		</div>
	`;

	document.body.appendChild(btn);
	document.body.appendChild(pop);

	function cleanup() {
	btn.remove();
	pop.remove();
	document.removeEventListener("keydown", keyHandler);
	}
	window.__voiceoverPopoverCleanup = cleanup;

	function keyHandler(e) {
	if (pop.matches(":popover-open") && e.key === "Escape") pop.hidePopover();
	}
	document.addEventListener("keydown", keyHandler);
	pop.addEventListener("close", cleanup);
})();
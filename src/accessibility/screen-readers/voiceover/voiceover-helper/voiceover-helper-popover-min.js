!(function () {
	'use strict';
	window.__voiceoverPopoverCleanup && window.__voiceoverPopoverCleanup();
	let e = document.createElement('button');
	((e.id = 'voiceover-helper-popover-btn'),
		(e.type = 'button'),
		(e.textContent = 'VoiceOver Helper'),
		e.setAttribute('popovertarget', 'voiceover-helper-popover'),
		(e.style.cssText =
			'position:fixed;bottom:1em;right:1em;z-index:10001; border-radius:1.5em;border:none;background:#155b2a;color:#fff; padding:.7em 1.5em;box-shadow:0 2px 8px rgba(0,0,0,.2); font-family:inherit;font-size:1.1em;cursor:pointer;'));
	let o = document.createElement('div');
	function t() {
		(e.remove(), o.remove(), document.removeEventListener('keydown', r));
	}
	function r(e) {
		o.matches(':popover-open') && 'Escape' === e.key && o.hidePopover();
	}
	((o.id = 'voiceover-helper-popover'),
		o.setAttribute('popover', ''),
		(o.style.cssText =
			"border:1px solid #888;border-radius:.5rem;padding:1em; background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.2); font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; font-size:.9em;line-height:1.2em;color:#333;margin:0 auto;width:43rem;max-height:95vh;overflow-y:auto; z-index:10002;"),
		(o.innerHTML = `<style>#voiceover-helper-popover table{border-collapse:collapse;width:100%}#voiceover-helper-popover td,#voiceover-helper-popover th{padding:8px;border:1px solid #ddd}#voiceover-helper-popover td:nth-child(2){white-space:nowrap}#voiceover-helper-popover tr:nth-child(odd){background:#eee}#voiceover-helper-popover tr:nth-child(even){background:#fff}#voiceover-helper-popover a{text-decoration:underline}#voiceover-helper-close{float:right;font-size:1.3em;padding:.2em .8em;margin:0 auto auto;cursor:pointer}</style><div class=popover-container><button aria-label=Close id=voiceover-helper-close popovertarget=voiceover-helper-popover popovertargetaction=hide>×</button><h1>VoiceOver guide</h1><p>The default VoiceOver (VO) button is <strong>ctrl + alt</strong>.<table><tr><td>start or stop VoiceOver<td>cmd + F5<tr><td>start reading<td>VO + A<tr><td>stop reading<td>VO<tr><td>go into a section<td>VO + Shift + ▼<tr><td>exit a section<td>VO + Shift + ▲<tr><td>next<td>VO + ▶︎<tr><td>previous<td>VO + ◀︎<tr><td>click a link or button<td>Enter<tr><td>select a checkbox, radio or dropdown<td>Space</table><h2>The rotor</h2><p>The rotor lets you navigate by element type, for example headings and links.<table><tr><td>open the rotor<td>VO + U<tr><td>switch between element types<td>◀︎ ▶︎<tr><td>select an element<td>▲ ▼<tr><td>go to selected element<td>Space or Enter</table><p>For more shortcuts, visit <a href=https://support.apple.com/guide/voiceover/general-commands-cpvokys01/mac>Apple</a> or <a href=https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts>Deque University</a>.</div>`),
		document.body.appendChild(e),
		document.body.appendChild(o),
		(window.__voiceoverPopoverCleanup = t),
		document.addEventListener('keydown', r),
		o.addEventListener('close', t));
})();
// Description: The VoiceOver Helper Popover (minified) bookmarklet displays a quick reference guide for Apple's VoiceOver in a native HTML popover. Creates a green "VoiceOver Helper" button in the bottom-right corner that opens a compact popover with essential VoiceOver commands including start/stop, navigation, rotor usage, and element interaction. Uses the native popover API for modern browser support. Close with X button, clicking outside, or pressing Escape. References Apple's official documentation and Deque University. Useful for quick reference during testing. WCAG SC 2.1.1: Keyboard, 2.4.1: Bypass Blocks.
console.log(
	'\nSource: https://github.com/joelanman/voiceover-helper\nBookmarklet name: VoiceOver Helper Popover\n'
);

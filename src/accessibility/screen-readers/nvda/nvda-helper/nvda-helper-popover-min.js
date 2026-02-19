/*
 * Source: https://github.com/pattespatte/public-bookmarklets
 * Author: Patrik (pattespatte)
 * License: MIT
 */
!(function () {
	'use strict';
	window.__nvdaPopoverCleanup && window.__nvdaPopoverCleanup();
	let t = document.createElement('button');
	((t.id = 'nvda-helper-popover-btn'),
		(t.type = 'button'),
		(t.textContent = 'NVDA Helper'),
		t.setAttribute('popovertarget', 'nvda-helper-popover'),
		(t.style.cssText = `position:fixed; bottom:1em; right:1em; z-index:10001; border-radius:1.5em; border:none; background:#155b2a; color:#fff; padding:.7em 1.5em; box-shadow:0 2px 8px rgba(0,0,0,.2); font-family:inherit; font-size:1.1em; cursor:pointer; `));
	let e = document.createElement('div');
	function o() {
		(t.remove(), e.remove(), document.removeEventListener('keydown', r));
	}
	function r(t) {
		e.matches(':popover-open') && 'Escape' === t.key && e.hidePopover();
	}
	((e.id = 'nvda-helper-popover'),
		e.setAttribute('popover', ''),
		(e.style.cssText =
			" border:1px solid #888; border-radius:.5rem; padding:1em; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.2); color:#333; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; font-size:.9em; line-height:1.2em; margin:0 auto; max-height:95vh; overflow-y:auto; width:43rem; z-index:10002;"),
		(e.innerHTML = `<style>#nvda-helper-popover table{border-collapse:collapse;width:100%}#nvda-helper-popover td,#nvda-helper-popover th{padding:8px;border:1px solid #ddd}#nvda-helper-popover td:nth-child(2){white-space:nowrap}#nvda-helper-popover tr:nth-child(odd){background:#eee}#nvda-helper-popover tr:nth-child(even){background:#fff}#nvda-helper-popover a{text-decoration:underline}#nvda-helper-close{float:right;font-size:1.3em;padding:.2em .8em;margin:0 auto auto;cursor:pointer}</style><div class=popover-container><button aria-label=Close id=nvda-helper-close popovertarget=nvda-helper-popover popovertargetaction=hide>\xd7</button><h1>NVDA Guide</h1><p>The default NVDA key is <strong>Ctrl + Alt + N</strong> or <strong>Insert</strong>.<table><tr><th>Task<th>Command<tr><td>Turn <strong>NVDA on</strong><td>Control + Alt + N<tr><td>Turn <strong>NVDA off</strong><td>NVDA key + Q<tr><td><strong>Stop Reading</strong><td>Control<tr><td><strong>Start reading</strong> continuously from this point on<td>Insert + ▼ or Numpad Plus (+)<tr><td><strong>Read next item</strong><td>▼<tr><td><strong>Read next focusable item</strong> (e.g. link, button)<td>Tab<tr><td><strong>Activate link</strong><td>Enter<tr><td><strong>Activate button</strong><td>Enter or Spacebar<tr><td>Go to <strong>next heading</strong><td>H<tr><td>Go to <strong>next heading of level [1-6]</strong><td>1 - 6<tr><td>List <strong>all headings</strong><td>NVDA key + F7<tr><td>Go to <strong>next landmark/region</strong><td>D<tr><td>Show list of <strong>all links, headings, form fields, buttons, and landmarks</strong><td>NVDA key + F7<tr><td>Go to the <strong>next table</strong><td>T<tr><td>Navigate <strong>table cells</strong><td>Ctrl + Alt + ▼ or ▲ or ◀︎ or ▶︎<tr><td>Go to the <strong>next list</strong><td>L<tr><td>Go to the <strong>next list item</strong><td>I<tr><td>Go to the <strong>next graphic</strong><td>G<tr><td>List <strong>all links</strong><td>NVDA key + F7<tr><td>Go to the <strong>next link</strong><td>K<tr><td>Go to <strong>next unvisited link</strong><td>U<tr><td>Go to <strong>next visited link</strong><td>V<tr><td><strong>Toggle</strong> between: Radio buttons, &lt;select>list items, Tabs (ARIA widget), Tree view items (ARIA widget), Menu items (ARIA widget)<td>▶︎ or ▼ or ◀︎ or ▲<tr><td>To <strong>previous heading, landmark, table, focusable item, etc.</strong><td>Shift + [H, D, T, Tab, etc.]</table><p>For more shortcuts, visit <a href=https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts target=_blank>Deque University</a>.</div>`),
		document.body.appendChild(t),
		document.body.appendChild(e),
		(window.__nvdaPopoverCleanup = o),
		document.addEventListener('keydown', r),
		e.addEventListener('close', o));
})();
// Description: The NVDA Helper Popover (minified) bookmarklet displays a quick reference guide for NVDA in a native HTML popover. Creates a green "NVDA Helper" button in the bottom-right corner that opens a compact popover with essential NVDA shortcuts including on/off, reading, navigation, headings, landmarks, tables, lists, and links. Uses the native popover API for modern browser support. Close with X button, clicking outside, or pressing Escape. Useful for quick reference during testing without taking up full screen space. WCAG SC 2.1.1: Keyboard, 2.4.1: Bypass Blocks, 3.3.2: Labels or Instructions.

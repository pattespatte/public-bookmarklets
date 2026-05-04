(function () {
	'use strict';
	// Description: The Form Error Reveal bookmarklet identifies all required form fields that are empty and marks them as invalid. Finds inputs, textareas, and selects with `required` attribute or `aria-required="true"`, checks if they have no value, adds `aria-invalid="true"` to empty fields, inserts "Required" error messages visually below each field, and automatically focuses the first empty required field. Displays an alert with the count of fields needing input. Useful for testing form validation behavior. WCAG SC 3.3.1: Error Identification, WCAG SC 3.3.3: Error Suggestion.
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
		const inputs = [...document.querySelectorAll('input,textarea,select')];
		let first = null,
			count = 0;
		inputs.forEach((el) => {
			const required =
				el.required || el.getAttribute('aria-required') === 'true';
			const empty = !(el.value || '').trim();
			if (required && empty) {
				el.setAttribute('aria-invalid', 'true');
				if (
					!el.nextElementSibling ||
					!el.nextElementSibling.matches('.a11y-msg')
				) {
					const m = document.createElement('div');
					m.className = 'a11y-msg';
					m.style =
						'color:#b00020;font:12px/1.3 ui-monospace,monospace;margin:4px 0';
					m.textContent = 'Required';
					el.insertAdjacentElement('afterend', m);
				}
				if (!first) first = el;
				count++;
			}
		});
		if (first) {
			first.focus();
		}
		toast(
			count
				? count + ' required fields need input'
				: 'No empty required fields'
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Form error reveal
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

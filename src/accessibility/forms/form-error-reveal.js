(function () {
	'use strict';
	// Description: The Form Error Reveal bookmarklet identifies all required form fields that are empty and marks them as invalid. Finds inputs, textareas, and selects with `required` attribute or `aria-required="true"`, checks if they have no value, adds `aria-invalid="true"` to empty fields, inserts "Required" error messages visually below each field, and automatically focuses the first empty required field. Displays an alert with the count of fields needing input. Useful for testing form validation behavior. WCAG SC 3.3.1: Error Identification, WCAG SC 3.3.3: Error Suggestion.
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
		alert(
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
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

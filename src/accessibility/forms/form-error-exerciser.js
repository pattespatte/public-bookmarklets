(function () {
	'use strict';
	// Description: The Form Error Exerciser bookmarklet tests form validation behavior by clearing required fields and triggering validation. Finds the first form element, clears all required fields, calls reportValidity() or checkValidity() to trigger browser validation, checks whether focus moved to the first invalid field, and verifies that aria-describedby references point to valid elements. Displays an alert with validation result, count of invalid fields, first error focus status, and bad aria-describedby references. WCAG SC 3.3.1: Error Identification, WCAG SC 3.3.3: Error Suggestion.
	try {
		const form =
			document.querySelector('form') ||
			document.querySelector('[role="form"]');
		if (!form) {
			alert('No form found');
			return;
		}
		const fields = [
			...form.querySelectorAll('input,select,textarea'),
		].filter((f) => !f.disabled);
		for (const f of fields) {
			if (f.required || f.getAttribute('aria-required') === 'true') {
				try {
					f.value = '';
				} catch {}
			}
		}
		const before = document.activeElement;
		const ok = form.reportValidity
			? form.reportValidity()
			: form.checkValidity();
		const invalid = [...form.querySelectorAll(':invalid')];
		let firstFocus =
			document.activeElement && document.activeElement !== before
				? document.activeElement
				: null;
		// association check
		const badAssoc = invalid.filter((f) => {
			const ids = (f.getAttribute('aria-describedby') || '')
				.trim()
				.split(/\s+/)
				.filter(Boolean);
			return (
				ids.length && !ids.every((id) => document.getElementById(id))
			);
		}).length;
		alert(
			`Valid: ${ok}  Invalid fields: ${invalid.length}\nFirst error focus: ${firstFocus ? firstFocus.name || firstFocus.id || firstFocus.tagName : '(none)'}\nBad aria-describedby refs: ${badAssoc}`
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Form error exerciser
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

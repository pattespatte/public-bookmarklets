// Description: The Check Field Labels bookmarklet verifies that all form inputs, textareas, and select elements have properly associated labels. Checks for explicit labels using the `for` attribute matching the input's ID, `aria-labelledby` references, `aria-label` attributes, and implicit labels (input wrapped in a label). Labeled fields are marked with a green checkmark and outlined in teal. Unlabeled fields are marked with a red X and outlined in red. Also detects labels with `for` attributes that reference non-existent field IDs. Includes an informational box with a link to W3C guidance. Run again to remove. WCAG SC 1.3.1: Info and Relationships, WCAG SC 3.3.2: Labels or Instructions.
(function () {
	try {
		// Remove existing labels and styles
		document
			.querySelectorAll('#wai-styles,#wai-info-box,.wai-label')
			.forEach((a) => a.remove());

		// Add new styles
		document.body.insertAdjacentHTML(
			'afterbegin',
			"<style id='wai-styles'>.wai-label{color:black;font-weight:bold;font-size:small;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif;background-color:#eed009;margin:0 2px;padding:2px;speak:literal-punctuation}.wai-good{outline:2px solid #005a6a}.wai-bad{outline:3px dashed #c0272d}label{line-height:200%}#wai-info-box{z-index:1000;color:black;font-family:Noto Sans,Trebuchet MS,Helvetica Neue,Arial,sans-serif;border:solid 1px #ddd;background-color:#fff;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)}#wai-info-box header{font-weight:700;background-color:#f2f2f2;color:#005a6a;padding:8px 16px}#wai-info-box header a{float:right;text-decoration:none}#wai-info-box div{padding:8px 16px}.wai-more-info{position:fixed;bottom:5em;right:5em}</style>"
		);

		// Check each input, textarea, and select element
		for (let a of document.querySelectorAll('input, textarea, select')) {
			// Skip hidden, button, submit, or reset inputs
			if (
				a.getAttribute('type') &&
				a.getAttribute('type').match(/hidden|button|submit|reset/)
			) {
				continue;
			}

			// Check for label with `for` attribute
			let label = a.getAttribute('id')
				? document.querySelector(
						"label[for='" + a.getAttribute('id') + "']"
					)
				: null;

			if (label) {
				// Field is labeled with a matching `label[for]`
				a.insertAdjacentHTML(
					'beforebegin',
					"<span class='wai-good'><span class='wai-label'>✓ Labelled</span></span>"
				);
				a.previousElementSibling.appendChild(a);
				label.insertAdjacentHTML(
					'afterbegin',
					"<span class='wai-label'>Label for field with ID='<a href='#" +
						a.getAttribute('id') +
						"'>" +
						a.getAttribute('id') +
						"</a>'</span>"
				);
				label.classList.add('wai-good');
			} else if (a.getAttribute('aria-labeledby')) {
				// Field is labeled using `aria-labelledby`
				let ids = a.getAttribute('aria-labeledby').split(/\s+/);
				if (ids.length > 0) {
					if (!a.getAttribute('id')) {
						a.setAttribute('id', ids[0] + '-field');
					}

					a.insertAdjacentHTML(
						'beforebegin',
						"<span class='wai-good'><span class='wai-label'>✓ Labelled</span></span>"
					);
					a.previousElementSibling.appendChild(a);

					for (let id of ids) {
						let labelElement = document.querySelector('#' + id);
						if (labelElement) {
							labelElement.insertAdjacentHTML(
								'afterbegin',
								"<span class='wai-label'>Label for ID='<a href='#" +
									a.getAttribute('id') +
									"'>" +
									a.getAttribute('id') +
									"</a>'</span>"
							);
							labelElement.classList.add('wai-good');
						}
					}
				}
			} else if (a.getAttribute('aria-label')) {
				// Field is labeled using `aria-label`
				a.insertAdjacentHTML(
					'beforebegin',
					"<span class='wai-good'><span class='wai-label'>! Labelled (using ARIA)</span></span>"
				);
				a.previousElementSibling.appendChild(a);
			} else if (a.parentElement.tagName === 'LABEL') {
				// Field is wrapped in a label
				a.parentElement.classList.add('wai-good');
				a.parentElement.insertAdjacentHTML(
					'afterbegin',
					"<span class='wai-label'>✓ Labelled</span>"
				);
			} else {
				// Field is missing a label
				let message = a.getAttribute('id')
					? "✗ Missing label (No matching label for ID='" +
						a.getAttribute('id') +
						"' found)"
					: '✗ Missing label';

				a.insertAdjacentHTML(
					'beforebegin',
					"<span class='wai-bad'><span class='wai-label'>" +
						message +
						'</span></span>'
				);
				a.previousElementSibling.appendChild(a);
			}
		}

		// Check all labels for missing fields
		for (let label of document.querySelectorAll('label')) {
			if (
				label.getAttribute('for') &&
				!document.querySelector('#' + label.getAttribute('for'))
			) {
				label.insertAdjacentHTML(
					'afterbegin',
					"<span class='wai-label'>Label with no matching field with ID='" +
						label.getAttribute('for') +
						"'</span>"
				);
				label.classList.add('wai-bad');
			}
		}

		// Add the informational box
		document.body.insertAdjacentHTML(
			'beforeend',
			"<aside id='wai-info-box' class='wai-more-info'><header>Find out more<a href='javascript:void(0)' aria-label='dismiss' onclick='document.querySelectorAll(\"#wai-styles,#wai-info-box,.wai-label\").forEach(el => el.remove())'>X</a></header><div><a href='https://w3.org/wai/test-evaluate/easy-checks/form-field-labels/'>Checking Field Labels</a></div></aside>"
		);
	} catch (error) {
		console.error('An error occurred in the bookmarklet:', error);
	}
})();

console.log(`
Source: https://www.w3.org/WAI/test-evaluate/easy-checks/form-field-labels/
Bookmarklet name: Check field labels (w3c, WCAG SC 3.3.2)
`);

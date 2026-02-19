// Description: The Deque W3C Validator bookmarklet submits the current page's full HTML source to the W3C Nu Validator for comprehensive markup validation. Extracts the document type declaration and full HTML, creates a hidden form that POSTs the content directly to validator.w3.org/nu, opens results in a new tab with source view enabled, and bypasses URL-based validation which works on localhost/authenticated pages. Validates against HTML5 and identifies syntax errors, accessibility issues, and best practice violations. WCAG SC 4.1.1: Parsing (Obsolete and removed).
(function () {
	var doctypeNode = document.doctype;
	var doctypeHtml =
		'<!DOCTYPE ' +
		doctypeNode.name +
		(doctypeNode.publicId ? ' PUBLIC "' + doctypeNode.publicId + '"' : '') +
		(!doctypeNode.publicId && doctypeNode.systemId ? ' SYSTEM' : '') +
		(doctypeNode.systemId ? ' "' + doctypeNode.systemId + '"' : '') +
		'>';
	var htmlWrapper = document.documentElement.outerHTML;
	var allContent = doctypeHtml + htmlWrapper;
	var validatorForm = document.getElementById(
		'deque-w3c-validator-bookmarklet'
	);
	if (validatorForm) {
		validatorForm.remove();
	}
	var form = document.createElement('form');
	form.id = 'deque-w3c-validator-bookmarklet';
	form.method = 'POST';
	form.action =
		'https://validator.w3.org/nu/?showsource=yes&nocache=' + Math.random();
	form.target = '_blank';
	form.enctype = 'multipart/form-data';
	var textarea = document.createElement('textarea');
	textarea.name = 'content';
	textarea.value = allContent;
	form.appendChild(textarea);
	document.body.appendChild(form);
	form.submit();
	var validatorForm = document.getElementById(
		'deque-w3c-validator-bookmarklet'
	);
	if (validatorForm) {
		validatorForm.remove();
	}
})();

console.log(`
Source: https://dequeuniversity.com/validator
Bookmarklet name: Deque W3C Validator
`);

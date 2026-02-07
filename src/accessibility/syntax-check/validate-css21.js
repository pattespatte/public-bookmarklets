// Description: The W3C CSS 2.1 Validator bookmarklet opens the W3C CSS Validation Service in a new window to validate the page's CSS against CSS 2.1 specifications. Passes the current page URL to jigsaw.w3.org/css-validator with the css21 profile and warnings disabled. Useful for identifying CSS syntax errors and deprecated properties. Requires the page to be publicly accessible or same-origin for the validator to fetch stylesheets.
var loc = document.location;
var css = window.open(
	'https://jigsaw.w3.org/css-validator/validator?profile=css21&amp;warning=0&amp;uri=' +
		loc,
	'css'
);

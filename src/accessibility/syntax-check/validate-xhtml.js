// Description: The W3C XHTML/HTML Validator bookmarklet opens the W3C Markup Validation Service in a new window to validate the page's markup. Passes the current page URL to validator.w3.org with verbose output enabled. Checks for HTML/XHTML syntax errors, missing required attributes, improperly nested elements, and other markup issues. Requires the page to be publicly accessible or same-origin for the validator to fetch content.
var loc = document.location;
var html = window.open(
	'https://validator.w3.org/check?verbose=1&amp;uri=' + loc,
	'html'
);

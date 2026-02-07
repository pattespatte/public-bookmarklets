// Description: The W3C CSS3/SVG Validator bookmarklet opens the W3C CSS Validation Service in a new window to validate the page's CSS against CSS3 and SVG specifications. Passes the current page URL to jigsaw.w3.org/css-validator with the css3svg profile and warnings disabled. Useful for identifying modern CSS issues and SVG styling problems. Requires the page to be publicly accessible or same-origin for the validator to fetch stylesheets.
var loc = document.location;
var css = window.open(
	'https://jigsaw.w3.org/css-validator/validator?profile=css3svg&amp;warning=0&amp;uri=' +
		loc,
	'css'
);

console.log(`
Source: https://jigsaw.w3.org/css-validator/
Bookmarklet name: W3C CSS Validation Service
`);

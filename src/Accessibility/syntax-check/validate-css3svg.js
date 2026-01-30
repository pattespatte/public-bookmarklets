// Description: Validates CSS/SVG with W3C validator
var loc = document.location;
var css = window.open("https://jigsaw.w3.org/css-validator/validator?profile=css3svg&amp;warning=0&amp;uri=" + loc, "css");

console.log(`
Source: https://jigsaw.w3.org/css-validator/
Bookmarklet name: W3C CSS Validation Service
`);

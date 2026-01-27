// Description: Validates CSS with W3C CSS 2.1 validator
var loc = document.location;
var css = window.open("https://jigsaw.w3.org/css-validator/validator?profile=css21&amp;warning=0&amp;uri=" + loc, "css");
# Improve bookmarklet

Please help me create an a11y bookmarklet. I want it to be an easy way of testing WCAG success criterion 1.4.4 in Google Chrome. In Firefox you can zoom (or enlarge) text without enlarging images. Thats is what I want to simulate in Chrome.

Suggested bookmarklet name: Toggle Text Zoom 200% (WCAG SC 1.4.4)

We can be inspired by my original code at https://codepen.io/patte/pen/zYmrozy but since it has issues we might as well start from scratch.

I want you to:

- Make it possible to toggle with a button (200% on and off) with a button placed at the lower right corner.

Here is WCAG success criterion 1.4.4: https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html

Here are some pages I use to test the code with:

- https://caiorss.github.io/bookmarklet-maker/
- https://www.ehalsomyndigheten.se/om-oss/regeringsuppdrag/nationell-vard-och-omsorgsgivarkatalog2/
- https://www.reddit.com/r/ChatGPTCoding/comments/1cqwfiq/what_coding_llm_is_the_best/

Let's start with javascript code with comments that I can minify and turn in to a bookmarklet when we have a working script.
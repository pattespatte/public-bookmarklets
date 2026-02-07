# Improve check-links.js

Here is a script that I use as a bookmarklet. It works and I want your help to improve it. Here is what currently works but still buggy:

- - The script provides immediate visual feedback by changing the color of each link on the page based on the result of the check. It also ends with a summary. Here is the visual output:
    - **Gray:** Link is being checked.
    - **Green:** Link is OK (200 status).
    - **Red:** Link is broken (404 status) or could not be reached.
    - **Orange:** Link is a redirect (3xx status) or returned another status code.

I want to see status of links on the web page in color and a summary. I test the script by pasting it into the console window. When it works my plan is to convert it to a bookmarklet.

Here is an example of the summary output:

```markdown
https://httpstat.us/200 is OK (200)
https://httpstat.us/301 returned status 0
https://httpstat.us/302 returned status 0
https://httpstat.us/404 is broken (404)
https://httpstat.us/500 returned status 500
https://nonexistentdomain.example.com/ could not be reached after multiple attempts
```

The desired output is to change these lines:
```markdown
https://httpstat.us/301 returned status 0
https://httpstat.us/302 returned status 0
```

to this:

```markdown
https://httpstat.us/301 returned status 301
https://httpstat.us/302 returned status 302
```

Also, please ignore all links starting with "mailto:" and "javascript:"

Script: 
```javascript
/* jshint esversion: 6 */
javascript: (function () {
	const links = document.querySelectorAll('a');
	const results = [];
	let completedRequests = 0;

	if (links.length === 0) {
		alert('No links found on this page.');
		return;
	}

	function checkLink(url, link, retries = 2) {
		// Indicate that the link is being checked
		link.style.color = 'gray';

		fetch(url, { method: 'HEAD', redirect: 'manual' })
			.then(response => {
				if (response.ok) {
					results.push(`${url} is OK (${response.status})`);
					link.style.color = 'green';
				} else if (response.status === 404) {
					results.push(`${url} is broken (404)`);
					link.style.color = 'red';
				} else if (response.status >= 300 && response.status < 400) {
					results.push(`${url} is a redirect (${response.status})`);
					link.style.color = 'orange';
				} else {
					results.push(`${url} returned status ${response.status}`);
					link.style.color = 'orange';
				}
				completedRequests++;
			})
			.catch(error => {
				if (retries > 0) {
					setTimeout(() => checkLink(url, link, retries - 1), 1000);
				} else {
					results.push(`${url} could not be reached after multiple attempts`);
					link.style.color = 'red';
					completedRequests++;
				}
			})
			.finally(() => {
				if (completedRequests === links.length) {
					// Show summary in a popup window
					const summaryWindow = window.open("", "Link Check Summary", "width=600,height=400");
					summaryWindow.document.write(`<pre>${results.join('\n')}</pre>`);
					summaryWindow.document.close();
				}
			});
	}

	links.forEach((link, index) => {
		const url = link.href;
		setTimeout(() => checkLink(url, link), index * 100); // Add delay between requests
	});
})();
```

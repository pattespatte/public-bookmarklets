// Description: The Find Broken Images bookmarklet checks all images on the page by fetching their src URLs. Reports broken images (404, network errors, or invalid URLs) in a popup window with the problematic URLs listed. WCAG SC 1.1.1: Non-text Content (images must have alt text, broken images should be avoided).
(function () {
	const images = document.images;
	let brokenCount = 0;
	let brokenURLs = '';

	const checkImage = async (image) => {
		try {
			const response = await fetch(image.src, { method: 'HEAD' });
			if (!response.ok) {
				brokenCount++;
				brokenURLs += `URL: ${image.src}\n`;
			}
		} catch (error) {
			brokenCount++;
			brokenURLs += `URL: ${image.src}\n`;
		}
	};

	const checkAllImages = async () => {
		await Promise.all(Array.from(images).map((image) => checkImage(image)));

		const text = `${brokenCount} broken image${brokenCount === 1 ? '' : 's'}`;
		if (brokenCount) {
			console.log(`${text}:\n\n${brokenURLs}`);
			const popup = window.open(
				'',
				'Broken Images',
				'width=400,height=400'
			);
			popup.document.write(`<pre>${text}:\n\n${brokenURLs}</pre>`);
			popup.document.close();
		} else {
			alert('No broken images.');
		}
	};

	checkAllImages();
})();

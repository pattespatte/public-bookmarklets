// Description: Highlights images with broken src attributes
(function () {
	const images = document.images;
	let brokenCount = 0;
	let brokenURLs = "";

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
		await Promise.all(Array.from(images).map(image => checkImage(image)));

		const text = `${brokenCount} broken image${brokenCount === 1 ? "" : "s"}`;
		if (brokenCount) {
			console.log(`${text}:\n\n${brokenURLs}`);
			const popup = window.open("", "Broken Images", "width=400,height=400");
			popup.document.write(`<pre>${text}:\n\n${brokenURLs}</pre>`);
			popup.document.close();
		} else {
			alert("No broken images.");
		}
	};

	checkAllImages();
})();
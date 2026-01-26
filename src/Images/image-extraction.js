javascript: {
	let e = [],
		t = /url\([ \t]*['"`]\x3f([^\)'"`]+)['"`]\x3f[ \t]*\)/,
		a = function (r) {
			Array.from(r.children).forEach((r) => {
				"IMG" === r.tagName && e.push(r.src);
				let l = r.style.backgroundImage;
				if (l && l.toLowerCase().includes("url(")) {
					let n = l.match(t);
					n
						? e.push(n[1])
						: console.warn("Failed to extract image URL from:", l);
				}
				a(r);
			});
		};
	a(document.body),
		(document.body.innerHTML = ""),
		e.forEach((e) => {
			let t = document.createElement("DIV"),
				a = document.createElement("P"),
				r = document.createElement("A");
			(r.href = e), (r.innerText = e), a.appendChild(r), t.appendChild(a);
			let l = new Image();
			(l.src = e), t.appendChild(l), document.body.appendChild(t);
		});
}

console.log(`
	Source: https://gynvael.coldwind.pl/?id=781
	Bookmarklet name: Image extraction
	`);
	
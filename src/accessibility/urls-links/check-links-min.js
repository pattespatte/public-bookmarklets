// Description: The Check Links bookmarklet validates all links on the page by fetching their URLs. Finds all anchor links (excluding mailto: and javascript:), tests each link with HTTP HEAD requests, colors links green (OK), red (broken/404), or orange (redirect/error), shows a progress indicator during testing, and displays a modal with full results when complete. Includes retry logic for network failures. Useful for identifying broken links and HTTP errors. WCAG SC 2.4.4: Link Purpose (In Context).
(!(function () {
	const t = document.createElement('style');
	((t.textContent =
		'.link-checker-modal {position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background:white;padding:20px;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,0.1);max-width:80%;max-height:80vh;z-index:10000;}.link-checker-content {max-height:calc(80vh - 40px);overflow-y:auto;}.link-checker-overlay {position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;cursor:pointer;}.link-checker-close {position:absolute;top:10px;right:10px;cursor:pointer;font-size:20px;color:#666;}.link-checker-close:hover {color:#000;}.progress-container {position:fixed;top:20px;right:20px;background:white;padding:15px;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,0.1);z-index:10000;min-width:200px;}.progress-bar {width:100%;height:20px;background-color:#f0f0f0;border-radius:10px;overflow:hidden;}.progress-fill {height:100%;background-color:#4CAF50;width:0%;transition:width 0.3s ease;}.progress-text {text-align:center;margin-top:5px;font-family:Arial, sans-serif;}'),
		document.head.appendChild(t));
	const e = Array.from(document.querySelectorAll('a')).filter(
			(t) =>
				!t.href.startsWith('mailto:') &&
				!t.href.startsWith('javascript:')
		),
		n = [];
	let o = 0;
	if (0 === e.length) return void alert('No valid links found on this page.');
	function r(t) {
		document.body.removeChild(t);
	}
	const c = (function () {
		const t = document.createElement('div');
		t.className = 'progress-container';
		const e = document.createElement('div');
		e.className = 'progress-bar';
		const n = document.createElement('div');
		n.className = 'progress-fill';
		const o = document.createElement('div');
		return (
			(o.className = 'progress-text'),
			(o.textContent = 'Checking links: 0%'),
			e.appendChild(n),
			t.appendChild(e),
			t.appendChild(o),
			document.body.appendChild(t),
			{
				update: (t) => {
					((n.style.width = `${t}%`),
						(o.textContent = `Checking links: ${Math.round(t)}%`));
				},
				remove: () => {
					document.body.removeChild(t);
				},
			}
		);
	})();
	function s(t, e, r = 2) {
		((e.style.color = 'gray'),
			fetch(t, { method: 'HEAD', redirect: 'manual' })
				.then((r) => {
					(r.ok
						? (n.push(`${t} is OK (${r.status})`),
							(e.style.color = 'green'))
						: 404 === r.status
							? (n.push(`${t} is broken (404)`),
								(e.style.color = 'red'))
							: r.status >= 300 && r.status < 400
								? (n.push(`${t} is a redirect (${r.status})`),
									(e.style.color = 'orange'))
								: (n.push(`${t} returned status ${r.status}`),
									(e.style.color = 'orange')),
						o++,
						a());
				})
				.catch((c) => {
					r > 0
						? setTimeout(() => s(t, e, r - 1), 1e3)
						: (n.push(
								`${t} could not be reached after multiple attempts`
							),
							(e.style.color = 'red'),
							o++,
							a());
				}));
	}
	function a() {
		const t = (o / e.length) * 100;
		(c.update(t),
			o === e.length &&
				setTimeout(() => {
					(c.remove(),
						(function (t) {
							const e = document.createElement('div');
							((e.className = 'link-checker-overlay'),
								(e.onclick = (t) => {
									t.target === e && r(e);
								}));
							const n = document.createElement('div');
							n.className = 'link-checker-modal';
							const o = document.createElement('span');
							((o.className = 'link-checker-close'),
								(o.innerHTML = '×'),
								(o.onclick = () => r(e)));
							const c = document.createElement('div');
							c.className = 'link-checker-content';
							const s = document.createElement('pre');
							((s.textContent = t),
								c.appendChild(s),
								n.appendChild(o),
								n.appendChild(c),
								e.appendChild(n),
								document.body.appendChild(e));
						})(n.join('\n')));
				}, 100));
	}
	e.forEach((t, e) => {
		const n = t.href;
		setTimeout(() => s(n, t), 100 * e);
	});
})(),
	console.log(
		'Source: https://codepen.io/patte/pen/mdNvWNx\nBookmarklet name: Check Links'
	));

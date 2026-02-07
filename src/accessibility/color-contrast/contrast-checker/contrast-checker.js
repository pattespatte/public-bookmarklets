// Description: The Contrast Checker bookmarklet embeds the WebAIM Contrast Checker tool in a draggable iframe panel on the page. Loads the mini contrast checker from webaim.org, provides color pickers for foreground and background colors, displays the contrast ratio, and shows pass/fail results for WCAG AA and AAA conformance at both normal and large text sizes. The panel can be dragged by the header bar and closed with the X button or Esc key. Press Esc to close. WCAG SC 1.4.3: Contrast (Minimum).
(function () {
	var constrastletelem = document.getElementById('contrastletdragable');
	if (constrastletelem == null) {
		var contrastletdragable = document.createElement('div');
		contrastletdragable.id = 'contrastletdragable';
		contrastletdragable.style.width = '425px';
		contrastletdragable.style.position = 'absolute';
		contrastletdragable.style.right = '20px';
		contrastletdragable.style.top = window.pageYOffset + 20 + 'px';
		contrastletdragable.style.zIndex = '10000';
		contrastletdragable.style.boxSizing = 'content-box';

		var contrastletdragzone = document.createElement('div');
		contrastletdragzone.id = 'contrastletdragzone';
		contrastletdragzone.style.width = '100%';
		contrastletdragzone.style.height = '15px';
		contrastletdragzone.style.cursor = 'move';
		contrastletdragzone.style.backgroundColor = '#0f2c65';
		contrastletdragzone.style.boxSizing = 'content-box';
		contrastletdragable.appendChild(contrastletdragzone);

		document.body.appendChild(contrastletdragable);

		var contrastletclose = document.createElement('button');
		contrastletclose.id = 'contrastletclose';
		contrastletclose.style.width = '15px';
		contrastletclose.style.height = '15px';
		contrastletclose.style.float = 'right';
		contrastletclose.style.padding = '0';
		contrastletclose.style.border = '0';
		contrastletclose.style.backgroundColor = '#777';
		contrastletclose.style.color = '#fff';
		contrastletclose.style.borderTop = '1px solid #0f2c65';
		contrastletclose.style.borderRight = '1px solid #0f2c65';
		contrastletclose.setAttribute('aria-label', 'Close Contrast Checker');
		contrastletclose.addEventListener(
			'click',
			function () {
				contrastletdragable.remove();
			},
			false
		);

		var contrastletclosetext = document.createTextNode('X');
		contrastletclose.appendChild(contrastletclosetext);

		contrastletdragzone.appendChild(contrastletclose);

		var contrastlet = document.createElement('iframe');
		contrastlet.src =
			'https://webaim.org/resources/contrastchecker/mini?ver=2&a=' +
			Math.random();
		contrastlet.style.width = '421px';
		contrastlet.style.height = '368px';
		contrastlet.style.margin = '0px';
		contrastlet.style.borderStyle = 'solid';
		contrastlet.style.borderColor = '#0f2c65';
		contrastlet.style.boxSizing = 'content-box';

		contrastletdragable.appendChild(contrastlet);

		let x = 0;
		let y = 0;

		const mouseDownHandler = function (e) {
			x = e.clientX;
			y = e.clientY;
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		};

		const mouseMoveHandler = function (e) {
			const dx = e.clientX - x;
			const dy = e.clientY - y;

			contrastletdragable.style.top = `${contrastletdragable.offsetTop + dy}px`;
			contrastletdragable.style.left = `${contrastletdragable.offsetLeft + dx}px`;

			x = e.clientX;
			y = e.clientY;
		};

		const mouseUpHandler = function () {
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};

		contrastletdragable.addEventListener('mousedown', mouseDownHandler);

		document.addEventListener('keyup', function (event) {
			if (event.keyCode === 27) {
				contrastletdragable.remove();
			}
		});
		contrastlet.addEventListener('keyup', function (event) {
			if (event.keyCode === 27) {
				contrastletdragable.remove();
			}
		});

		document.addEventListener('securitypolicyviolation', (e) => {
			contrastlet.remove();
			var contrastleterrortext = document.createTextNode(
				'The Content Security Policy on this page does not allow embedded iframes. The Contrast Checker Bookmarklet cannot run on this page. Press Esc to dismiss this message.'
			);
			contrastletdragable.style.backgroundColor = '#fff';
			contrastletdragable.appendChild(contrastleterrortext);
		});
	}
})();

console.log(`
Source: https://webaim.org/resources/contrastchecker/bookmarklet
Bookmarklet name: Contrast Checker
`);

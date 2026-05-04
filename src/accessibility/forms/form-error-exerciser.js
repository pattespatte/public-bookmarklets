(function () {
	'use strict';
	// Description: The Form Error Exerciser bookmarklet tests form validation behavior by clearing required fields and triggering validation. Finds the first form element, clears all required fields, calls reportValidity() or checkValidity() to trigger browser validation, checks whether focus moved to the first invalid field, and verifies that aria-describedby references point to valid elements. Displays an alert with validation result, count of invalid fields, first error focus status, and bad aria-describedby references. WCAG SC 3.3.1: Error Identification, WCAG SC 3.3.3: Error Suggestion.
	const toast = (function () {
		const H = 'a11y-toast-host';
		return function (msg, type) {
			let host = document.getElementById(H);
			if (!host) {
				host = document.createElement('div');
				host.id = H;
				host.style.cssText =
					'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:2147483647;pointer-events:none';
				document.body.appendChild(host);
				const sh = host.attachShadow({ mode: 'open' });
				sh.innerHTML =
					'<style>@keyframes ti{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes to{from{opacity:1}to{opacity:0;transform:translateY(-8px)}}.t{animation:ti .2s ease-out;pointer-events:auto;color:#fff;font:13px/1.4 system-ui,-apple-system,sans-serif;border-radius:8px;padding:10px 16px;box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:pre-line;word-break:break-word;max-width:400px;text-align:center;cursor:pointer;margin-top:8px}.i{background:#333}.e{background:#b91c1c}.x{animation:to .2s ease-in forwards}</style><div id="s" style="display:flex;flex-direction:column-reverse;align-items:center"></div>';
			}
			const s = host.shadowRoot.getElementById('s');
			const d = document.createElement('div');
			d.className = 't ' + (type === 'error' ? 'e' : 'i');
			d.textContent = msg;
			d.onclick = function () {
				d.classList.add('x');
				setTimeout(function () {
					d.remove();
				}, 200);
			};
			s.appendChild(d);
			setTimeout(
				function () {
					d.classList.add('x');
					setTimeout(function () {
						d.remove();
					}, 200);
				},
				type === 'error' ? 8000 : 4000
			);
		};
	})();
	try {
		const form =
			document.querySelector('form') ||
			document.querySelector('[role="form"]');
		if (!form) {
			toast('No form found');
			return;
		}
		const fields = [
			...form.querySelectorAll('input,select,textarea'),
		].filter((f) => !f.disabled);
		for (const f of fields) {
			if (f.required || f.getAttribute('aria-required') === 'true') {
				try {
					f.value = '';
				} catch {}
			}
		}
		const before = document.activeElement;
		const ok = form.reportValidity
			? form.reportValidity()
			: form.checkValidity();
		const invalid = [...form.querySelectorAll(':invalid')];
		let firstFocus =
			document.activeElement && document.activeElement !== before
				? document.activeElement
				: null;
		// association check
		const badAssoc = invalid.filter((f) => {
			const ids = (f.getAttribute('aria-describedby') || '')
				.trim()
				.split(/\s+/)
				.filter(Boolean);
			return (
				ids.length && !ids.every((id) => document.getElementById(id))
			);
		}).length;
		toast(
			`Valid: ${ok}  Invalid fields: ${invalid.length}\nFirst error focus: ${firstFocus ? firstFocus.name || firstFocus.id || firstFocus.tagName : '(none)'}\nBad aria-describedby refs: ${badAssoc}`
		);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Form error exerciser
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

(function () {
	'use strict';
	// Description: The Table Structure Verifier bookmarklet validates header associations in data tables. Finds all tables on the page, identifies data cells (td), checks if each cell has properly associated headers via the `headers` attribute or `scope` attributes on header cells, outlines cells without clear header associations in red, and displays an alert with the count of problematic cells. Useful for verifying that data tables have proper header relationships for screen reader users. Note: Does not check layout tables, which should not have headers. WCAG SC 1.3.1: Info and Relationships.
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
		const tables = [...document.querySelectorAll('table')];
		if (!tables.length) {
			toast('No tables');
			return;
		}
		let issues = 0;
		function headersForCell(td, table) {
			const ths = [...table.querySelectorAll('th')];
			const viaHeaders = (td.getAttribute('headers') || '')
				.split(/\s+/)
				.filter(Boolean)
				.map((id) => document.getElementById(id))
				.filter(Boolean);
			if (viaHeaders.length) return new Set(viaHeaders);
			// scope based
			const set = new Set();
			const row = td.parentElement;
			const colIndex = [...row.children].indexOf(td);
			for (const th of ths) {
				const scope = (th.getAttribute('scope') || '').toLowerCase();
				if (scope === 'col') {
					const r = [...th.parentElement.children].indexOf(th);
					if (r === colIndex) set.add(th);
				} else if (scope === 'row') {
					if (th.parentElement === row) set.add(th);
				}
			}
			return set;
		}
		tables.forEach((table) => {
			const tds = [...table.querySelectorAll('td')];
			tds.forEach((td) => {
				const set = headersForCell(td, table);
				if (!set.size) {
					td.style.outline = '3px solid #e00';
					issues++;
				}
			});
		});
		toast(`Cells without clear headers: ${issues}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Table structure verifier
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

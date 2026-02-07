(function () {
	'use strict';
	// Description: The Table Structure Verifier bookmarklet validates header associations in data tables. Finds all tables on the page, identifies data cells (td), checks if each cell has properly associated headers via the `headers` attribute or `scope` attributes on header cells, outlines cells without clear header associations in red, and displays an alert with the count of problematic cells. Useful for verifying that data tables have proper header relationships for screen reader users. Note: Does not check layout tables, which should not have headers. WCAG SC 1.3.1: Info and Relationships.
	try {
		const tables = [...document.querySelectorAll('table')];
		if (!tables.length) {
			alert('No tables');
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
		alert(`Cells without clear headers: ${issues}`);
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Table structure verifier
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

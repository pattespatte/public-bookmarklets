(function () {
	'use strict';
	// Description: The Session Recorder bookmarklet creates a logging panel to record test session notes and actions during accessibility testing. Displays a panel with a text input area for notes, buttons to add notes to the log, copy the full log to clipboard, download the log as a text file, and close the panel. Automatically timestamps each log entry. Useful for documenting findings during manual accessibility audits. Run again to close.
	try {
		const ID = 'a11y-session-rec';
		if (document.getElementById(ID)) {
			document.getElementById(ID).remove();
			return;
		}
		const panel = document.createElement('div');
		panel.id = ID;
		panel.style =
			'position:fixed;z-index:2147483647;left:8px;top:8px;width:360px;max-height:80vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px ui-monospace,monospace;padding:10px';
		const log = (window.__a11yLog = window.__a11yLog || []);
		const area = document.createElement('textarea');
		area.rows = 8;
		area.style = 'width:100%';
		area.placeholder = 'Notes...';
		const list = document.createElement('pre');
		list.style =
			'max-height:30vh;overflow:auto;background:#f7f7f7;border:1px solid #eee;border-radius:8px;padding:8px';
		const btn = (t, fn) => {
			const b = document.createElement('button');
			b.textContent = t;
			b.style =
				'padding:6px 8px;border:1px solid #ccc;border-radius:8px;background:#fafafa;cursor:pointer;margin-right:6px';
			b.onclick = fn;
			return b;
		};
		function render() {
			list.textContent = log
				.map((x) => `[${x.time}] ${x.msg}`)
				.join('\n');
		}
		function add(msg) {
			log.push({ time: new Date().toLocaleString(), msg });
			render();
		}
		add('Session started');
		panel.append(area, document.createElement('div'));
		const row = panel.lastChild;
		row.append(
			btn('Add note', () => {
				if (area.value.trim()) {
					add(area.value.trim());
					area.value = '';
				}
			}),
			btn('Copy log', () => {
				navigator.clipboard.writeText(list.textContent);
				alert('Copied');
			}),
			btn('Download', () => {
				const blob = new Blob([list.textContent], {
					type: 'text/plain',
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'a11y-session.txt';
				a.click();
				setTimeout(() => URL.revokeObjectURL(url), 1000);
			}),
			btn('Close', () => panel.remove())
		);
		panel.append(list);
		document.body.appendChild(panel);
		render();
		console.log(`
Source: https://github.com/alejandrogiga98/A11y-Bookmarklets
Bookmarklet name: Session recorder
Author: alejandrogiga98
License: MIT License
`);
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

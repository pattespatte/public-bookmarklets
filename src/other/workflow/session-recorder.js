(function () {
	'use strict';
	// Description: The Session Recorder bookmarklet creates a logging panel to record test session notes and actions during accessibility testing. Displays a panel with a text input area for notes, buttons to add notes to the log, copy the full log to clipboard, download the log as a text file, and close the panel. Automatically timestamps each log entry. Useful for documenting findings during manual accessibility audits. Run again to close.
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
				toast('Copied');
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
		toast('Bookmarklet Error: ' + err.message, 'error');
	}
})();
void 0;

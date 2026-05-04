#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');

// Ensure src directory exists
if (!existsSync(SRC_DIR)) {
	mkdirSync(SRC_DIR, { recursive: true });
}

// Get name from command line
const name = process.argv[2];

if (!name) {
	console.error('Usage: node scripts/new.js <name>');
	console.error('Example: node scripts/new.js hello-world');
	process.exit(1);
}

// Validate name (alphanumeric, hyphens, underscores only)
if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
	console.error(
		'Error: Name must contain only letters, numbers, hyphens, and underscores'
	);
	process.exit(1);
}

const filePath = join(SRC_DIR, `${name}.js`);

if (existsSync(filePath)) {
	console.error(`Error: ${name}.js already exists in src/`);
	process.exit(1);
}

// Template for new bookmarklet
const template = `(function() {
  'use strict';

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
    // ===== YOUR CODE HERE =====
    // Available: document, window, location, navigator, etc.

    // Example: Show a toast notification
    toast('Hello from ${name} bookmarklet!');

    // Example: Get page info
    console.log('Page title:', document.title);
    console.log('Page URL:', location.href);

    // ===== END YOUR CODE =====

  } catch (err) {
    toast('Bookmarklet Error: ' + err.message, 'error');
  }
})();
void 0;
`;

writeFileSync(filePath, template);
console.log(`Created src/${name}.js`);
console.log(`Edit the file, then run: node scripts/build.js`);

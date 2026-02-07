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

  try {
    // ===== YOUR CODE HERE =====
    // Available: document, window, location, navigator, etc.

    // Example: Show an alert
    alert('Hello from ${name} bookmarklet!');

    // Example: Get page info
    console.log('Page title:', document.title);
    console.log('Page URL:', location.href);

    // ===== END YOUR CODE =====

  } catch (err) {
    alert('Bookmarklet Error: ' + err.message);
  }
})();
void 0;
`;

writeFileSync(filePath, template);
console.log(`Created src/${name}.js`);
console.log(`Edit the file, then run: node scripts/build.js`);

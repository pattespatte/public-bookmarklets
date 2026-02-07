#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import clipboardy from 'clipboardy';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist');

// Get name from command line
const name = process.argv[2];

if (!name) {
	console.error('Usage: node scripts/copy.js <name>');
	console.error('Example: node scripts/copy.js hello-world');
	process.exit(1);
}

const bookmarkletPath = join(DIST_DIR, `${name}.bookmarklet`);

if (!existsSync(bookmarkletPath)) {
	console.error(`Error: ${name}.bookmarklet not found in dist/`);
	console.error(
		'Run "node scripts/build.js" first to build the bookmarklet.'
	);
	process.exit(1);
}

const bookmarklet = readFileSync(bookmarkletPath, 'utf-8');

await clipboardy.write(bookmarklet);

console.log(`Copied ${name} bookmarklet to clipboard!`);
console.log(`Length: ${bookmarklet.length} characters`);

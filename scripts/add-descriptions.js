#!/usr/bin/env node

import {
	readFileSync,
	writeFileSync,
	readdirSync,
	statSync,
	existsSync,
} from 'fs';
import { join, dirname, sep, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');

// Find all .js files
function findJSFiles(dir) {
	const files = [];
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.name === '_private') continue;
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...findJSFiles(fullPath));
		} else if (entry.isFile() && entry.name.endsWith('.js')) {
			files.push(fullPath);
		}
	}
	return files;
}

// Generate description from filename/path
function generateDescription(relPath) {
	const parts = relPath.replace(/\.js$/, '').split(sep);
	const filename = parts[parts.length - 1];

	// Common patterns and their descriptions
	const patterns = {
		'alt-checker': 'Checks images for missing or empty alt text',
		'find-broken-images': 'Highlights images with broken src attributes',
		'image-extraction': 'Lists all images on the page with their sources',
		'remove-colors':
			'Removes all colors from the page, showing only black and white',
		'contrast-checker':
			'Opens WebAIM contrast checker to test color contrast',
		contrast: 'Color contrast analysis tool',
		'lost-focus-alert': 'Alerts when focus is lost from the active element',
		'reveal-focus-order':
			'Visualizes the focus order of interactive elements',
		'jaws-helper': 'Helper tools for JAWS screen reader testing',
		'jaws-helper-simple': 'Simplified JAWS screen reader helper',
		'nvda-helper': 'Helper tools for NVDA screen reader testing',
		'nvda-helper-popover': 'NVDA helper with popover interface',
		'voiceover-helper': 'Helper tools for VoiceOver screen reader testing',
		'voiceover-helper-popover': 'VoiceOver helper with popover interface',
		targetsize: 'Checks touch target sizes against WCAG guidelines',
		'text-spacing-bookmarklet':
			'Tests text spacing requirements (WCAG 1.4.12)',
		'font-size-2em-wcag-1.4.4':
			'Sets font size to 200% to test WCAG 1.4.4 reflow',
		'check-field-labels': 'Checks form fields for proper labels',
		landmarks: 'Lists ARIA landmarks on the page',
		'landmarks-accessibility-bookmarklets':
			'Comprehensive landmark and accessibility checker',
		'deque-w3c-validator-bookmarklet':
			'Opens Deque/W3C validator for the current page',
		'validate-xhtml': 'Validates page XHTML with W3C validator',
		'validate-css21': 'Validates CSS with W3C CSS 2.1 validator',
		'validate-css3svg': 'Validates CSS/SVG with W3C validator',
		'a-xe-console': 'Deque axe accessibility testing in console',
		'check-links': 'Checks all links on the page and reports broken ones',
		'check-links-min': 'Minified version of link checker',
		'list-links': 'Lists all links with their accessible names',
		'wai-aria': 'Comprehensive WAI-ARIA attribute checker',
		'wai-ariamin': 'Minified WAI-ARIA checker',
		'analyze-css-stats': 'Opens CSS stats analysis for the page',
		'remove-css': 'Disables all CSS on the page',
		'toggle-styles': 'Toggles page CSS on/off',
		'show-performance': 'Shows page performance metrics',
		'show-scripts': 'Lists all scripts loaded on the page',
		'copy-selection-to-md-with-turndown':
			'Copies selected text as Markdown using Turndown',
		'copy-selection-to-md': 'Copies selected text as Markdown',
		'unblock-router': 'Unblocks ASUS router login page',
		'check-language-on-this-page-w3c':
			'Checks page language declaration (W3C)',
		'check-required-fields-on-this-page-w3c':
			'Checks form required field indicators (W3C)',
		glasses: 'Blurs the page like looking through glasses',
		'reading-order': 'Visualizes reading order of content',
		'ga-tracking-code': 'Shows Google Analytics tracking code on the page',
		'a11y-graphics': 'Accessibility image reviewer',
		'a11y-lib-guide': 'Generates accessibility library guide report',
		'a11y-reporter': 'Runs axe accessibility testing',
		'a11y-tabbings': 'Reviews tab order and tabbable elements',
		'a11y-core-functions': 'Core functions for accessibility bookmarklets',
	};

	if (patterns[filename]) {
		return patterns[filename];
	}

	// Generate from filename
	const name = filename.replace(/-/g, ' ');
	return `${name.charAt(0).toUpperCase() + name.slice(1)} bookmarklet`;
}

// Main
const jsFiles = findJSFiles(SRC_DIR);
let addedCount = 0;

for (const srcPath of jsFiles) {
	const relPath = relative(SRC_DIR, srcPath);
	const code = readFileSync(srcPath, 'utf-8');

	// Check if already has description
	if (code.includes('// Description:')) {
		console.log(`⊘ ${relPath} - already has description`);
		continue;
	}

	const description = generateDescription(relPath);

	// Add description after the first line (usually 'use strict' or start of function)
	const lines = code.split('\n');
	let insertIndex = 0;

	// Find best place to insert (after 'use strict', after comment block, or at start)
	for (let i = 0; i < Math.min(10, lines.length); i++) {
		if (
			lines[i].includes("'use strict'") ||
			lines[i].includes('"use strict"')
		) {
			insertIndex = i + 1;
			break;
		}
		if (
			lines[i].trim().startsWith('//') ||
			lines[i].trim().startsWith('/*')
		) {
			continue;
		}
		if (
			lines[i].trim().startsWith('(function') ||
			lines[i].trim().startsWith('function')
		) {
			insertIndex = i;
			break;
		}
	}

	lines.splice(insertIndex, 0, `// Description: ${description}`);
	writeFileSync(srcPath, lines.join('\n'));

	console.log(`✓ ${relPath}`);
	console.log(`  Added: ${description}`);
	addedCount++;
}

console.log(`\n✓ Added descriptions to ${addedCount} file(s)`);

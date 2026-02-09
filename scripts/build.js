#!/usr/bin/env node

import {
	readFileSync,
	readdirSync,
	mkdirSync,
	writeFileSync,
	existsSync,
	statSync,
	copyFileSync,
	rmSync,
} from 'fs';
import { join, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';
import { minify as terserMinify } from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');
const DIST_DIR = join(ROOT, 'dist');
const DIST_PRIVATE_DIR = join(DIST_DIR, 'private');
const COLLECTIONS_DIR = join(DIST_DIR, 'collections');
const TEST_DIR = join(DIST_DIR, 'test');

// Ensure dist directories exist
if (!existsSync(DIST_DIR)) {
	mkdirSync(DIST_DIR, { recursive: true });
}
if (!existsSync(DIST_PRIVATE_DIR)) {
	mkdirSync(DIST_PRIVATE_DIR, { recursive: true });
}
if (!existsSync(COLLECTIONS_DIR)) {
	mkdirSync(COLLECTIONS_DIR, { recursive: true });
}
if (!existsSync(TEST_DIR)) {
	mkdirSync(TEST_DIR, { recursive: true });
}

// Recursively find all .js files in directory (public only - skips _private)
function findJSFiles(dir, baseDir = dir) {
	const files = [];
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		// Skip _private directories
		if (entry.name === '_private') continue;

		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...findJSFiles(fullPath, baseDir));
		} else if (entry.isFile() && entry.name.endsWith('.js')) {
			files.push(fullPath);
		}
	}

	return files;
}

// Recursively find all .js files in _private directories only
function findJSFilesPrivate(dir, baseDir = dir) {
	const files = [];
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);

		if (entry.isDirectory()) {
			// Only process _private directories
			if (entry.name === '_private') {
				files.push(...findJSFilesInDir(fullPath, fullPath));
			} else {
				// Recursively look for _private subdirectories
				files.push(...findJSFilesPrivate(fullPath, baseDir));
			}
		}
	}

	return files;
}

// Helper: Find all .js files in a directory (no filtering, for _private content)
function findJSFilesInDir(dir, baseDir = dir) {
	const files = [];
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...findJSFilesInDir(fullPath, baseDir));
		} else if (entry.isFile() && entry.name.endsWith('.js')) {
			files.push(fullPath);
		}
	}

	return files;
}

// URI encode with proper character escaping
function uriEncode(code) {
	return encodeURIComponent(code).replace(/'/g, '%27').replace(/!/g, '%21');
}

// Minify JS using terser
async function minifyJS(code) {
	const result = await terserMinify(code, {
		compress: {
			dead_code: true,
			drop_console: false,
			conditionals: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			hoist_funs: true,
			keep_fargs: false,
			hoist_vars: false,
			if_return: true,
			join_vars: true,
			side_effects: true,
		},
		mangle: {
			toplevel: false,
			properties: false,
		},
		format: {
			ascii_only: true,
			comments: false,
		},
	});
	return result.code;
}

// Minify HTML using html-minifier-terser
async function minifyHTML(html) {
	return htmlMinify(html, {
		collapseWhitespace: true,
		removeComments: true,
		removeEmptyAttributes: true,
		minifyCSS: true,
		minifyJS: true,
	});
}

// Convert to web-friendly filename (kebab-case)
function toWebFriendlyName(name) {
	return name
		.replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to kebab-case
		.replace(/[\s_&]+/g, '-') // spaces, underscores, ampersands to hyphens
		.replace(/[^a-zA-Z0-9-]/g, '') // remove special chars
		.replace(/-+/g, '-') // collapse multiple hyphens
		.replace(/^-|-$/g, '') // trim leading/trailing hyphens
		.toLowerCase();
}

// Convert directory path to web-friendly (keeps slashes, converts dir names)
function toWebFriendlyPath(path) {
	return path
		.split(sep)
		.map((part) => toWebFriendlyName(part))
		.join('/');
}

// Convert kebab-case to Title Case with special handling for acronyms
function toTitleCase(name) {
	// Multi-word special cases (must be applied first, before splitting)
	const multiWordCases = [
		{ from: 'wai-aria', to: 'WAI-ARIA' },
		{ from: 'voiceover-helper', to: 'VoiceOver Helper' },
		{ from: 'lib-guide', to: 'LibGuide' },
		{
			from: 'check-language-on-this-page--w3c',
			to: 'Check Language on This Page W3C',
		},
		{
			from: 'check-required-fields-on-this-page--w3c',
			to: 'Check Required Fields on This Page W3C',
		},
		{ from: 'structure-and-headings', to: 'Structure & Headings' },
	];

	// Check multi-word cases first (before any processing)
	const lowerName = name.toLowerCase();
	for (const { from, to } of multiWordCases) {
		if (lowerName === from) {
			return to;
		}
	}

	// Single-word special cases
	const specialCases = {
		jaws: 'JAWS',
		nvda: 'NVDA',
		wcag: 'WCAG',
		voiceover: 'VoiceOver',
		xhtml: 'XHTML',
		w3c: 'W3C',
		css: 'CSS',
		css21: 'CSS 2.1',
		css3svg: 'CSS3 & SVG',
		ga: 'GA',
		md: 'MD',
		a11y: 'A11Y',
		lib: 'Lib',
		guide: 'Guide',
		targetsize: 'Target Size',
		contrastchecker: 'Contrast Checker',
		urls: 'URLs',
		asusrouter: 'Asus Router',
		asus: 'Asus',
		router: 'Router',
	};

	// Pattern-based replacements (for compound patterns like css21)
	const patternCases = [
		{ pattern: /^css(\d+)$/, replacement: 'CSS$1' },
		{ pattern: /^css(.+)svg$/, replacement: 'CSS$1SVG' },
	];

	// First, handle camelCase by inserting hyphens before uppercase letters
	let result = name.replace(/([a-z])([A-Z])/g, '$1-$2');

	// Convert to lowercase first, then split by hyphens AND spaces
	const words = result.toLowerCase().split(/[\s-]+/);

	// Process each word
	result = words
		.map((word) => {
			// Check if it's a special case
			if (specialCases[word]) {
				return specialCases[word];
			}
			// Check pattern-based cases
			for (const { pattern, replacement } of patternCases) {
				if (pattern.test(word)) {
					return word.replace(pattern, replacement);
				}
			}
			// Otherwise capitalize first letter
			if (word.length > 0) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
			return word;
		})
		.join(' ');

	// Clean up any double spaces
	result = result.replace(/\s+/g, ' ').trim();

	// Post-process specific patterns
	const postProcessCases = [
		{ from: 'Lib Guide', to: 'LibGuide' },
		{ from: 'Voice Over', to: 'VoiceOver' },
	];
	for (const { from, to } of postProcessCases) {
		result = result.replace(from, to);
	}

	return result;
}

// Extract source URL from source code comments
function extractSourceInfo(code) {
	// Look for Source: patterns in console.log statements
	// Must be followed by a URL (http/https) or domain-like pattern
	const sourcePatterns = [
		// Match Source: followed by URL, stopping at literal \n, \r, "Bookmarklet name:", actual newline, or backtick
		/Source:\s*(https?:\/\/.+?)(?=\\n|\\r|Bookmarklet name:|\n|`|$)/i,
		// Match Source: followed by domain-like text (for non-URL sources)
		/Source:\s*([a-zA-Z0-9][a-zA-Z0-9-]*\..+?)(?=\\n|\\r|Bookmarklet name:|\n|`|$)/i,
	];

	for (const pattern of sourcePatterns) {
		const match = code.match(pattern);
		if (match && match[1]) {
			let source = match[1].trim();
			// Clean up common patterns
			source = source.replace(/^original code at\s+/i, '');
			source = source.replace(/^inspired by\s+/i, '');
			// Remove trailing escape sequences (\n, \r, etc.)
			source = source.replace(/\\[nr]$/, '');
			// Remove trailing punctuation
			source = source.replace(/[.,;:]$/, '');
			return source;
		}
	}
	return null;
}

// Extract description from source code comments
function extractDescription(code) {
	// Match // Description: ... pattern
	const match = code.match(/\/\/ Description:\s*(.+?)(?:\r?\n|$)/);
	if (match && match[1]) {
		return match[1].trim();
	}
	return null;
}

// Extract WCAG SC references from description
function extractWCAGRefs(description) {
	if (!description) return [];

	const refs = [];

	// Match all WCAG SC patterns throughout the description
	// Pattern: "WCAG SC X.X.X: Name" - stop at period, comma, em-dash, or paren
	const wcagPattern = /WCAG SC\s+([\d.]+):\s*([^.,(—]+?)(?:[.,(—]|$)/g;
	let match;

	while ((match = wcagPattern.exec(description)) !== null) {
		refs.push({
			scNumber: match[1],
			scName: match[2].trim()
		});
	}

	return refs;
}

// Remove WCAG SC references from description text
function removeWCAGRefsFromDescription(description) {
	if (!description) return description;
	// Remove all WCAG SC patterns, handling trailing punctuation
	return description
		.replace(/\.?\s*WCAG SC\s+[\d.]+:\s*[^.,]+[.,]?\s*/g, '. ')
		.replace(/\.?\s*,\s*WCAG SC\s+[\d.]+:\s*[^.,]+[.,]?\s*/g, '. ')
		.replace(/\s+\.\s*$/, '.') // Clean up trailing period + space
		.replace(/\.\s*\./g, '.') // Clean up double periods
		.trim();
}

// Strip parenthetical content from badge text
function stripParenthetical(text) {
	return text.replace(/\s*\(.*?\)\s*/g, ' ').trim();
}

// Generate badge HTML for WCAG references
function generateWCAGBadges(wcagRefs) {
	if (!wcagRefs || wcagRefs.length === 0) return '';

	const badgesHtml = wcagRefs.map(ref =>
		`<span class="badge badge-secondary">WCAG SC ${ref.scNumber}: ${stripParenthetical(ref.scName)}</span>`
	).join('');
	return `<div class="badges">${badgesHtml}</div>`;
}

// Build a single bookmarklet
async function buildBookmarklet(srcPath, displayName, relPath, distDir = DIST_DIR) {
	if (!existsSync(srcPath)) {
		console.warn(`Warning: ${srcPath} not found, skipping`);
		return null;
	}

	console.log(`Building ${displayName}...`);

	let code = readFileSync(srcPath, 'utf-8');

	// Extract source info and description before minification
	const sourceUrl = extractSourceInfo(code);
	const description = extractDescription(code);

	// Process embedded HTML (marked with /* HTML */)
	const htmlMatches = code.match(/\/\*\s*HTML\s*\*\/\s*`([^`]+)`/g);
	if (htmlMatches) {
		for (const match of htmlMatches) {
			const html = match.match(/`([^`]+)`/)[1];
			const minified = await minifyHTML(html);
			code = code.replace(match, `\`${minified}\``);
		}
	}

	// Minify the JavaScript
	const minified = await minifyJS(code);

	// Create bookmarklet URL
	const bookmarklet = `javascript:${uriEncode(minified)}`;

	// Get filename from relPath - keep directory structure, only convert filename
	const fileNameWithoutExt = relPath.replace(/\.js$/, '');
	const pathParts = fileNameWithoutExt.split(sep);
	const dirName = pathParts.slice(0, -1).join(sep); // all but last part
	const baseName = pathParts[pathParts.length - 1]; // last part
	const webFriendlyDir = toWebFriendlyPath(dirName);
	const webFriendlyBase = toWebFriendlyName(baseName);
	const fileName = webFriendlyDir
		? `${webFriendlyDir}/${webFriendlyBase}`
		: webFriendlyBase;

	// Calculate relative path to index.html
	const depth = pathParts.length - 1;
	const isPrivate = distDir === DIST_PRIVATE_DIR;
	const backPath =
		depth > 0
			? '../'.repeat(depth) + (isPrivate ? '../index.html' : 'index.html')
			: (isPrivate ? '../index.html' : 'index.html');

	// Get leaf name for button (last part of display name)
	const leafName = displayName.split(' / ').pop();

	// Extract WCAG references and clean description
	const wcagRefs = extractWCAGRefs(description);
	const cleanedDescription = removeWCAGRefsFromDescription(description);
	const wcagBadges = generateWCAGBadges(wcagRefs);
	const wcagBadgesPlain = wcagRefs.map(ref => `WCAG SC ${ref.scNumber}: ${ref.scName}`);

	// Write to dist as .html (for drag-and-drop)
	const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName} Bookmarklet</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Ctext%20y=%22.9em%22%20font-size=%2290%22%3E📚%3C/text%3E%3C/svg%3E">
  <style>
    :root {
      --bg-body: #f5f5f5;
      --bg-card: #ffffff;
      --bg-code: #f8f8f8;
      --text-primary: #333333;
      --text-secondary: #666666;
      --text-link: #0066cc;
      --text-link-hover: #0052a3;
      --border-color: rgba(0,0,0,0.1);
      --badge-bg: #6c757d;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-body: #1a1a1a;
        --bg-card: #2d2d2d;
        --bg-code: #1e1e1e;
        --text-primary: #e0e0e0;
        --text-secondary: #a0a0a0;
        --text-link: #4dabf7;
        --text-link-hover: #74c0fc;
        --border-color: rgba(255,255,255,0.1);
        --badge-bg: #495057;
      }
    }
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: var(--bg-body); }
    .container { text-align: center; padding: 2rem; background: var(--bg-card); border-radius: 8px; box-shadow: 0 2px 8px var(--border-color); max-width: 600px; }
    h1 { margin: 0 0 1rem; }
    a.bookmarklet { display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; cursor: pointer; }
    a.bookmarklet:hover { background: #0052a3; }
    .code { margin-top: 1.5rem; padding: 1rem; background: var(--bg-code); border-radius: 4px; text-align: left; overflow-x: auto; font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow-y: auto; color: var(--text-primary); }
    .hint { margin-top: 1rem; color: var(--text-secondary); font-size: 14px; }
    @media (max-width: 500px) {
      .hint { font-size: 12px; }
    }
    .back-link { margin-top: 1rem; display: inline-block; color: var(--text-link); text-decoration: none; }
    .back-link:hover { text-decoration: underline; color: var(--text-link-hover); }
    .description { color: var(--text-secondary); font-size: 1rem; margin-bottom: 0.5rem; line-height: 1.5; text-align: left; }
    .badges { margin: 0.5rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
    .badge { display: inline-block; padding: 0.35em 0.65em; font-size: 0.75em; font-weight: 700; line-height: 1; color: #fff; text-align: center; white-space: nowrap; vertical-align: baseline; border-radius: 0.25rem; background-color: var(--badge-bg); }
  </style>
</head>
<body>
  <div class="container">
    <h1>${displayName}</h1>
    ${cleanedDescription ? `<p class="description">${cleanedDescription}</p>` : ''}
    ${wcagBadges}
    <a href="${bookmarklet}" class="bookmarklet">Run ${leafName}</a>
    <p class="hint">Test run or drag to<br>bookmarklets bar to install</p>
    <div class="code">${bookmarklet}</div>
    <a href="${backPath}" class="back-link">← Back to all bookmarklets</a>
  </div>
</body>
</html>`;

	// Create output directory structure in dist (using web-friendly paths)
	const outputPath = join(distDir, fileName);
	const outputDir = dirname(outputPath);
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	const htmlPath = `${outputPath}.html`;
	const bookmarkletPath = `${outputPath}.bookmarklet`;

	writeFileSync(htmlPath, htmlOutput);
	writeFileSync(bookmarkletPath, bookmarklet);

	console.log(`  ✓ ${fileName}.html -> ${bookmarklet.length} bytes`);

	return {
		name: displayName,
		bookmarklet,
		size: bookmarklet.length,
		fileName,
		path: `${fileName}.html`,
		sourceUrl,
		description,
		wcagRefs,
		wcagBadges,
		wcagBadgesPlain,
	};
}

// Generate index.html with all bookmarklets
function generateIndex(bookmarklets, isPrivate = false) {
	// Group bookmarklets by their path hierarchy
	function groupByPath(items, level = 0) {
		const groups = {};
		for (const item of items) {
			const parts = item.name.split(' / ');
			if (parts.length > level) {
				const key = parts[level];
				if (!groups[key]) {
					groups[key] = [];
				}
				groups[key].push(item);
			}
		}
		return groups;
	}

	// Recursively build nested HTML structure
	function buildNestedHTML(items, level = 0) {
		const groups = groupByPath(items, level);

		if (Object.keys(groups).length === 0) {
			// Leaf level - output bookmark entries
			return items
				.map((b) => {
					const parts = b.name.split(' / ');
					const leafName = toTitleCase(
						parts[parts.length - 1]
							.replace(/-min$/, '')
							.replace(/ Min$/, '')
					);
					let sourceLine = '';
					if (b.sourceUrl) {
						try {
							const url = new URL(b.sourceUrl);
							const hostname = url.hostname.replace('www.', '');
							sourceLine = `<small class="source-link">Source: <a href="${b.sourceUrl}" target="_blank" rel="noopener">${hostname}</a></small>`;
						} catch {
							sourceLine = `<small class="source-link">Source: ${b.sourceUrl}</small>`;
						}
					}
					const wcagBadgesHtml = b.wcagBadges || '';
					return `
              <div class="bookmarklet-item">
                <div class="bookmarklet-info">
                  <a href="${b.path}"><strong>${leafName}</strong></a>
                  ${wcagBadgesHtml}
                  ${sourceLine}
                </div>
                <div class="bookmarklet-actions">
                  <span style="padding: 8px 0; display: inline-block;">Run or drag to <i>Bookmarks Bar</i>:</span> <a href="${b.bookmarklet}" class="bookmarklet-link">${leafName}</a>
                </div>
              </div>`;
				})
				.join('');
		}

		// Create sections with headings
		const result = [];
		for (const [groupName, groupItems] of Object.entries(groups).sort()) {
			const groupParts = groupItems[0].name.split(' / ');
			// Flatten by one level: treat the penultimate level as leaf for display
			const hasNested = level + 2 < groupParts.length;
			const headingLevel = Math.min(level + 2, 6); // Start at h2, max h6

			// Build the content for this section
			let subContent;
			if (hasNested) {
				// Has more nested levels - recurse
				subContent = buildNestedHTML(groupItems, level + 1);
			} else {
				// Leaf level - output bookmark items
				subContent = groupItems
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((b) => {
						const parts = b.name.split(' / ');
						const leafName = toTitleCase(
							parts[parts.length - 1]
								.replace(/-min$/, '')
								.replace(/ Min$/, '')
						);
						let sourceLine = '';
						if (b.sourceUrl) {
							try {
								const url = new URL(b.sourceUrl);
								const hostname = url.hostname.replace(
									'www.',
									''
								);
								sourceLine = `<small class="source-link">Source: <a href="${b.sourceUrl}" target="_blank" rel="noopener">${hostname}</a></small>`;
							} catch {
								sourceLine = `<small class="source-link">Source: ${b.sourceUrl}</small>`;
							}
						}
						const wcagBadgesHtml = b.wcagBadges || '';
						return `
              <div class="bookmarklet-item">
                <div class="bookmarklet-info">
                  <a href="${b.path}"><strong>${leafName}</strong></a>
                  ${wcagBadgesHtml}
                  ${sourceLine}
                </div>
                <div class="bookmarklet-actions">
                  <span style="padding: 8px 0; display: inline-block;">Run or drag to <i>Bookmarks Bar</i>:</span> <a href="${b.bookmarklet}" class="bookmarklet-link">${leafName}</a>
                </div>
              </div>`;
					})
					.join('');
			}

			// Always create a section with heading
			result.push(`
        <section class="category-section">
          <h${headingLevel} class="category-heading">${toTitleCase(groupName)}</h${headingLevel}>
          <div class="category-content">
${subContent}
          </div>
        </section>`);
		}

		return result.join('');
	}

	const content = buildNestedHTML(bookmarklets);

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bookmarklets</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Ctext%20y=%22.9em%22%20font-size=%2290%22%3E📚%3C/text%3E%3C/svg%3E">
  <style>
    :root {
      --bg-body: #f5f5f5;
      --bg-card: #ffffff;
      --bg-code: #f0f0f0;
      --bg-instructions: #f8f9fa;
      --bg-hover: #fafafa;
      --text-primary: #333333;
      --text-secondary: #666666;
      --text-tertiary: #888888;
      --text-link: #0066cc;
      --text-link-hover: #0052a3;
      --border-color: #e0e0e0;
      --border-subtle: #e8e8e8;
      --border-faint: #f0f0f0;
      --shadow-color: rgba(0,0,0,0.1);
      --shadow-subtle: rgba(0,0,0,0.05);
      --badge-bg: #6c757d;
      --quick-collections-bg: #f0f7ff;
      --quick-collections-border: #b3d9ff;
      --quick-collections-heading: #0066cc;
      --quick-test-bg: #e8f5e9;
      --quick-test-border: #81c784;
      --quick-test-heading: #2e7d32;
      --quick-private-bg: #f5f5f5;
      --quick-private-border: #d0d0d0;
      --quick-private-heading: #666666;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-body: #0f0f0f;
        --bg-card: #1e1e1e;
        --bg-code: #2a2a2a;
        --bg-instructions: #252525;
        --bg-hover: #2a2a2a;
        --text-primary: #e0e0e0;
        --text-secondary: #a0a0a0;
        --text-tertiary: #808080;
        --text-link: #4dabf7;
        --text-link-hover: #74c0fc;
        --border-color: #3a3a3a;
        --border-subtle: #333333;
        --border-faint: #2a2a2a;
        --shadow-color: rgba(0,0,0,0.4);
        --shadow-subtle: rgba(0,0,0,0.2);
        --badge-bg: #495057;
        --quick-collections-bg: #1a2838;
        --quick-collections-border: #2a4559;
        --quick-collections-heading: #4dabf7;
        --quick-test-bg: #1b5e20;
        --quick-test-border: #2e7d32;
        --quick-test-heading: #66bb6a;
        --quick-private-bg: #2a2a2a;
        --quick-private-border: #3a3a3a;
        --quick-private-heading: #a0a0a0;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: var(--text-primary); background: var(--bg-body); min-height: 100vh; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    header { text-align: center; color: var(--text-primary); margin-bottom: 40px; }
    h1 { font-size: 2.5rem; margin-bottom: 10px; }
    .subtitle { opacity: 0.7; font-size: 1.1rem; }
    .card { background: var(--bg-card); border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px var(--shadow-color); }
    .instructions { background: var(--bg-instructions); border-left: 4px solid #0066cc; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    .instructions ol { margin-left: 20px; }
    .instructions li { margin-bottom: 8px; }
    .category-section { margin-bottom: 30px; }
    .category-section:last-child { margin-bottom: 0; }
    .category-heading { font-size: 1.5rem; margin: 25px 0 15px; padding-bottom: 8px; border-bottom: 2px solid var(--border-color); color: var(--text-primary); }
    .category-section .category-section .category-heading { font-size: 1.3rem; margin: 20px 0 12px; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); }
    .category-section .category-section .category-section .category-heading { font-size: 1.15rem; margin: 15px 0 10px; border-bottom: 1px solid var(--border-faint); color: var(--text-secondary); }
    .category-section .category-section .category-section .category-section .category-heading { font-size: 1.05rem; margin: 12px 0 8px; border-bottom: none; color: var(--text-tertiary); }
    .category-content { margin-left: 15px; }
    .bookmarklet-item { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 8px; transition: box-shadow 0.2s, background 0.2s; }
    .bookmarklet-item:hover { box-shadow: 0 2px 8px var(--shadow-subtle); background: var(--bg-hover); }
    .bookmarklet-info { flex: 1; min-width: 0; }
    .bookmarklet-info > a { text-decoration: none; color: inherit; transition: color 0.2s; }
    .bookmarklet-info > a:hover { color: var(--text-link); }
    .bookmarklet-info > a strong { pointer-events: none; }
    .bookmarklet-actions { display: flex; gap: 8px; flex-shrink: 0; }
    .bookmarklet-link { display: inline-block; padding: 8px 16px; background: #0066cc; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: background 0.2s; white-space: nowrap; cursor: pointer; font-size: 14px; }
    .bookmarklet-link:hover { background: #0052a3; }
    .source-link { display: block; margin-top: 4px; color: var(--text-tertiary); font-size: 12px; }
    .source-link a { color: var(--text-tertiary); text-decoration: none; }
    .source-link a:hover { text-decoration: underline; color: var(--text-link); }
    .badges { margin: 4px 0; display: flex; flex-wrap: wrap; gap: 0.35rem; }
    .badge { display: inline-block; padding: 0.25em 0.5em; font-size: 0.7rem; font-weight: 600; line-height: 1; color: #fff; text-align: center; white-space: nowrap; vertical-align: baseline; border-radius: 0.25rem; background-color: var(--badge-bg); }
    .footer { text-align: center; margin-top: 20px; color: var(--text-secondary); opacity: 0.8; }
    code { background: var(--bg-code); padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    .test-pages { margin: 20px 0; padding: 15px; background: var(--quick-test-bg); border-left: 4px solid #4caf50; border-radius: 4px; }
    .test-pages h3 { margin: 0 0 10px; color: var(--quick-test-heading); font-size: 1.1rem; }
    .test-pages p { margin: 5px 0; color: var(--text-secondary); font-size: 14px; }
    .test-pages a { color: var(--text-link); text-decoration: none; font-weight: 500; }
    .test-pages a:hover { text-decoration: underline; }
    .search-container { margin-bottom: 20px; }
    .search-input { width: 100%; padding: 12px 16px; font-size: 16px; border: 2px solid var(--border-color); border-radius: 8px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; background: var(--bg-card); color: var(--text-primary); }
    .search-input:focus { border-color: #0066cc; box-shadow: 0 0 0 3px rgba(0,102,204,0.2); }
    .search-input::placeholder { color: var(--text-tertiary); }
    .no-results { text-align: center; padding: 40px 20px; color: var(--text-secondary); }
    .no-results strong { color: var(--text-primary); }
    .hidden { display: none !important; }
    .quick-links { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
    .quick-link-box { padding: 15px 20px; border-radius: 8px; text-align: center; }
    .quick-link-box.collections { background: var(--quick-collections-bg); border: 1px solid var(--quick-collections-border); }
    .quick-link-box.test { background: var(--quick-test-bg); border: 1px solid var(--quick-test-border); }
    .quick-link-box.private { background: var(--quick-private-bg); border: 1px solid var(--quick-private-border); }
    .quick-link-box h2 { margin: 0 0 8px; font-size: 1.1rem; }
    .quick-link-box.collections h3 { color: var(--quick-collections-heading); }
    .quick-link-box.test h2 { color: var(--quick-test-heading); }
    .quick-link-box.private h2 { color: var(--quick-private-heading); }
    .quick-link-box p { margin: 0; color: var(--text-secondary); font-size: 14px; }
    .quick-link-box a { color: var(--text-link); text-decoration: none; font-weight: 500; }
    .quick-link-box a:hover { text-decoration: underline; }
    @media (max-width: 600px) {
      .bookmarklet-item { flex-direction: column; align-items: flex-start; gap: 10px; }
      .bookmarklet-link { width: 100%; text-align: center; margin: 0 !important; }
      .quick-links { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📚 Bookmarklets</h1>
      <p class="subtitle">Drag links to your bookmarks bar to install</p>
    </header>

    <main class="card">
      <div class="quick-links">
        <div class="quick-link-box collections">
          <h2>📦 Collections</h2>
          <p><a href="${isPrivate ? '../collections/index.html' : 'collections/index.html'}">View Collections (Bulk Import)</a></p>
        </div>
        ${isPrivate ? `
        <div class="quick-link-box test">
          <h2>🔓 Public</h2>
          <p><a href="../index.html">Public Bookmarklets</a> - Return to main collection</p>
        </div>
        ` : `
        <div class="quick-link-box test">
          <h2>🧪 Test Page</h2>
          <p><a href="test/a11y-nightmare.html" target="_blank">90's A11y Nightmare</a> - Retro test page with 50+ accessibility violations</p>
        </div>
        `}
      </div>

      <p style="margin-bottom:15px;">Available Bookmarklets (${bookmarklets.length})</p>

      <div class="search-container">
        <input type="text" id="search-input" class="search-input" placeholder="🔍 Search bookmarklets by name or category..." aria-label="Search bookmarklets">
      </div>

${content || '<p class="empty-state">No bookmarklets built yet. Run <code>npm run build</code></p>'}
    </main>

    <script>
      (function() {
        'use strict';
        const searchInput = document.getElementById('search-input');
        const bookmarkletItems = document.querySelectorAll('.bookmarklet-item');
        const categorySections = document.querySelectorAll('.category-section');

        function normalizeText(text) {
          return text.toLowerCase().replace(/\\s+/g, ' ');
        }

        function getCategoryName(section) {
          const heading = section.querySelector('.category-heading');
          return heading ? heading.textContent.trim() : '';
        }

        function getAllCategoryNames(section) {
          const names = [];
          let current = section;
          while (current && current.classList.contains('category-section')) {
            const name = getCategoryName(current);
            if (name) names.push(name);
            current = current.parentElement.closest('.category-section');
          }
          return names;
        }

        function filterBookmarklets() {
          const query = normalizeText(searchInput.value);
          let visibleCount = 0;

          bookmarkletItems.forEach(function(item) {
            const nameLink = item.querySelector('.bookmarklet-info > a');
            const sourceLink = item.querySelector('.source-link');
            const badgesContainer = item.querySelector('.badges');
            const name = nameLink ? nameLink.textContent.trim() : '';
            const source = sourceLink ? sourceLink.textContent.trim() : '';
            const badges = badgesContainer ? badgesContainer.textContent.trim() : '';

            const section = item.closest('.category-section');
            const categoryNames = getAllCategoryNames(section);
            const searchableText = [name, source, badges, ...categoryNames].join(' ').toLowerCase();

            const matches = query === '' || searchableText.includes(query);
            item.classList.toggle('hidden', !matches);
            if (matches) visibleCount++;
          });

          categorySections.forEach(function(section) {
            const visibleItems = section.querySelectorAll('.bookmarklet-item:not(.hidden)');
            section.classList.toggle('hidden', visibleItems.length === 0);
          });

          let noResultsMsg = document.getElementById('no-results');
          if (visibleCount === 0 && query !== '') {
            if (!noResultsMsg) {
              noResultsMsg = document.createElement('div');
              noResultsMsg.id = 'no-results';
              noResultsMsg.className = 'no-results';
              searchInput.after(noResultsMsg);
            }
            noResultsMsg.textContent = 'No bookmarklets found matching "' + searchInput.value + '"';
            noResultsMsg.classList.remove('hidden');
          } else if (noResultsMsg) {
            noResultsMsg.classList.add('hidden');
          }
        }

        searchInput.addEventListener('input', filterBookmarklets);
      })();
    </script>

    <footer class="footer">
      <p>Built with <a href="https://github.com/pattespatte/public-bookmarklets" style="color:var(--text-link);">Bookmarklet Manager</a></p>
      ${isPrivate ? '<p style="margin-top:10px;"><a href="../index.html" style="color:var(--text-link);">← Back to public bookmarklets</a></p>' : ''}
    </footer>
  </div>
</body>
</html>`;
}

// Generate Netscape Bookmark file format (importable by browsers)
function generateNetscapeBookmarkFile(bookmarklets, title) {
	const timestamp = Math.floor(Date.now() / 1000);

	// Group bookmarklets by their category path (e.g., "Accessibility / A11Y Tools")
	function groupByPath(items, level = 0) {
		const groups = {};

		for (const item of items) {
			const parts = item.name.split(' / ');
			if (parts.length > level) {
				const key = parts[level];
				if (!groups[key]) {
					groups[key] = [];
				}
				groups[key].push(item);
			}
		}

		return groups;
	}

	// Recursively build nested DL structure
	function buildNestedStructure(items, level = 0) {
		const groups = groupByPath(items, level);

		if (Object.keys(groups).length === 0) {
			// Leaf level - output bookmark entries with just the leaf name
			return items
				.map((b) => {
					const parts = b.name.split(' / ');
					const leafName = toTitleCase(
						parts[parts.length - 1]
							.replace(/-min$/, '')
							.replace(/ Min$/, '')
					);
					return `				<DT><A HREF="${b.bookmarklet}" ADD_DATE="${timestamp}">${leafName}</A>`;
				})
				.join('\n');
		}

		// Has subgroups - create folders
		const result = [];
		for (const [groupName, groupItems] of Object.entries(groups)) {
			const groupParts = groupItems[0].name.split(' / ');
			const hasNested = level + 1 < groupParts.length;

			if (!hasNested) {
				// Flat list of bookmarks - use leaf names
				for (const b of groupItems) {
					const parts = b.name.split(' / ');
					const leafName = toTitleCase(
						parts[parts.length - 1]
							.replace(/-min$/, '')
							.replace(/ Min$/, '')
					);
					result.push(
						`				<DT><A HREF="${b.bookmarklet}" ADD_DATE="${timestamp}">${leafName}</A>`
					);
				}
			} else {
				// Nested folder structure
				const subContent = buildNestedStructure(groupItems, level + 1);
				const prettyGroupName = toTitleCase(groupName);
				result.push(`			<DT>
				<H3 ADD_DATE="${timestamp}">${prettyGroupName}</H3>
				<DL>
${subContent}
				</DL>`);
			}
		}

		return result.join('\n');
	}

	const entries = buildNestedStructure(bookmarklets);

	return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<script src="https://cdn.jsdelivr.net/npm/bookmark-file-prettify/dist/bundle.js"></script>
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL>
	<p>
		<DT>
			<H3 ADD_DATE="${timestamp}" LAST_MODIFIED="${timestamp}">${title}</H3>
			<DL>
${entries}
			</DL>
		</DT>
	</p>
</DL>
`;
}

// Build collections - group bookmarklets by category and generate bookmark files
function buildCollections(bookmarklets) {
	console.log('\nBuilding collections...');

	// Clean up old collection files (except index.html)
	const existingFiles = readdirSync(COLLECTIONS_DIR);
	for (const file of existingFiles) {
		if (file.startsWith('bookmarklets-') && file.endsWith('.html')) {
			const filePath = join(COLLECTIONS_DIR, file);
			rmSync(filePath);
			console.log(`  ✓ Removed old ${file}`);
		}
	}

	// Group bookmarklets by top-level directory
	const grouped = {};
	for (const b of bookmarklets) {
		// Get the top-level category from the display name or path
		const category = b.name.split(' / ')[0];
		if (!grouped[category]) {
			grouped[category] = [];
		}
		grouped[category].push(b);
	}

	// Also create an "all" collection with all bookmarklets
	const collections = [
		{ name: 'all', title: 'All Bookmarklets', bookmarklets: bookmarklets },
		...Object.entries(grouped).map(([category, items]) => ({
			name: toWebFriendlyName(category),
			title: `${category} Bookmarklets`,
			bookmarklets: items,
		})),
	];

	for (const collection of collections) {
		const fileName = `bookmarklets-${collection.name}.html`;
		const outputPath = join(COLLECTIONS_DIR, fileName);
		const content = generateNetscapeBookmarkFile(
			collection.bookmarklets,
			collection.title
		);
		writeFileSync(outputPath, content);
		console.log(
			`  ✓ ${fileName} (${collection.bookmarklets.length} bookmarklets)`
		);
	}

	console.log(
		`\n✓ Built ${collections.length} collection(s) to dist/collections/`
	);

	// Generate collections index.html
	generateCollectionsIndex(collections);
}

// Generate collections index.html
function generateCollectionsIndex(collections) {
	const allCollection = collections.find((c) => c.name === 'all');
	const accessibilityCollection = collections.find(
		(c) => c.name === 'accessibility'
	);
	const otherCollection = collections.find((c) => c.name === 'other');

	const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bookmarklet Collections</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Ctext%20y=%22.9em%22%20font-size=%2290%22%3E📚%3C/text%3E%3C/svg%3E">
  <style>
    :root {
      --bg-body: #f5f5f5;
      --bg-card: #ffffff;
      --bg-code: #f0f0f0;
      --bg-instructions: #f8f9fa;
      --bg-hover: #fafafa;
      --text-primary: #333333;
      --text-secondary: #666666;
      --text-link: #0066cc;
      --text-link-hover: #0052a3;
      --border-color: #e0e0e0;
      --shadow-color: rgba(0,0,0,0.1);
      --shadow-subtle: rgba(0,0,0,0.05);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-body: #0f0f0f;
        --bg-card: #1e1e1e;
        --bg-code: #2a2a2a;
        --bg-instructions: #252525;
        --bg-hover: #2a2a2a;
        --text-primary: #e0e0e0;
        --text-secondary: #a0a0a0;
        --text-link: #4dabf7;
        --text-link-hover: #74c0fc;
        --border-color: #3a3a3a;
        --shadow-color: rgba(0,0,0,0.4);
        --shadow-subtle: rgba(0,0,0,0.2);
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: var(--text-primary); background: var(--bg-body); min-height: 100vh; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    header { text-align: center; color: var(--text-primary); margin-bottom: 40px; }
    h1 { font-size: 2.5rem; margin-bottom: 10px; }
    .subtitle { opacity: 0.7; font-size: 1.1rem; }
    .card { background: var(--bg-card); border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px var(--shadow-color); margin-bottom: 30px; }
    .instructions-container { display: grid; grid-template-columns: 1fr; gap: 16px; }
    .instructions { background: var(--bg-instructions); border-left: 4px solid #0066cc; padding: 15px; border-radius: 4px; }
    .instructions ol { margin-left: 20px; }
    .instructions li { margin-bottom: 8px; }
    @media (min-width: 769px) {
      .instructions-container { grid-template-columns: 1fr 1fr; }
    }
    .collection-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .collection-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 18px; transition: box-shadow 0.2s, transform 0.2s, background 0.2s; display: flex; flex-direction: column; }
    .collection-card:hover { box-shadow: 0 3px 12px var(--shadow-subtle); transform: translateY(-1px); background: var(--bg-hover); }
    .collection-icon { font-size: 2rem; margin-bottom: 8px; }
    .collection-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 6px; }
    .collection-title a { text-decoration: none; color: inherit; }
    .collection-title a:hover { color: var(--text-link); }
    .collection-description { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px; flex: 1; }
    .collection-link { display: inline-block; padding: 8px 16px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background 0.2s; white-space: nowrap; text-align: center; font-size: 0.9rem; }
    .collection-link:hover { background: #0052a3; }
    .footer { text-align: center; margin-top: 20px; color: var(--text-secondary); opacity: 0.8; }
    .back-link { display: inline-block; margin-bottom: 20px; color: var(--text-link); text-decoration: none; }
    .back-link:hover { text-decoration: underline; }
    code { background: var(--bg-code); padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    @media (max-width: 768px) {
      .collection-grid { grid-template-columns: 2fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="../index.html" class="back-link">← Back to all bookmarklets</a>

    <header>
      <h1>📦 Bookmarklet Collections</h1>
      <p class="subtitle">Import multiple bookmarklets at once</p>
    </header>

    <main class="card">
      <h2>How to Import Collections</h2>

      <div class="instructions-container">
        <div>
          <h3 style="margin: 0 0 10px; font-size: 1.1rem;">Chrome</h3>
          <div class="instructions">
            <ol>
              <li><strong>Download</strong> a collection file by clicking "Download"</li>
              <li><strong>Open</strong> <code>chrome://settings/importData</code> in Chrome</li>
              <li>Select <strong>"Bookmarks HTML File"</strong> from the import options</li>
              <li><strong>Choose</strong> the downloaded HTML file</li>
            </ol>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 10px; font-size: 1.1rem;">Edge</h3>
          <div class="instructions">
            <ol>
              <li><strong>Download</strong> a collection file by clicking "Download"</li>
              <li><strong>Open</strong> <code>edge://settings/importData</code> in Edge</li>
              <li>Select <strong>"Favorites or Bookmarks HTML File"</strong> from the import options</li>
              <li><strong>Choose</strong> the downloaded HTML file</li>
            </ol>
          </div>
        </div>
      </div>

    <h2 style="margin-bottom:20px;">Available Collections</h2>

    <div class="collection-grid">
${allCollection
			? `
      <div class="collection-card">
        <div class="collection-icon">📚</div>
        <div class="collection-title">
          <a href="bookmarklets-${allCollection.name}.html">All Bookmarklets</a>
        </div>
        <p class="collection-description">Complete collection of all ${allCollection.bookmarklets.length} bookmarklets</p>
        <a href="bookmarklets-${allCollection.name}.html" download class="collection-link">Download</a>
      </div>
`
			: ''
		}

${accessibilityCollection
			? `
      <div class="collection-card">
        <div class="collection-icon">♿</div>
        <div class="collection-title">
          <a href="bookmarklets-${accessibilityCollection.name}.html">Accessibility Bookmarklets</a>
        </div>
        <p class="collection-description">${accessibilityCollection.bookmarklets.length} accessibility testing and diagnostic tools</p>
        <a href="bookmarklets-${accessibilityCollection.name}.html" download class="collection-link">Download</a>
      </div>
`
			: ''
		}

${otherCollection
			? `
      <div class="collection-card">
        <div class="collection-icon">🛠️</div>
        <div class="collection-title">
          <a href="bookmarklets-${otherCollection.name}.html">Other Bookmarklets</a>
        </div>
        <p class="collection-description">${otherCollection.bookmarklets.length} general utility and developer tools</p>
        <a href="bookmarklets-${otherCollection.name}.html" download class="collection-link">Download</a>
      </div>
`
			: ''
		}
    </div>

    </main>

    <footer class="footer">
      <p><a href="../index.html">← Back to individual bookmarklets</a></p>
    </footer>
  </div>
</body>
</html>
`;

	writeFileSync(join(COLLECTIONS_DIR, 'index.html'), indexContent);
	console.log(`  ✓ collections/index.html`);
}

// Generate bookmarklets.json manifest
function generateManifest(bookmarklets) {
	console.log('\nGenerating bookmarklets.json manifest...');

	const manifest = bookmarklets.map((b) => {
		const parts = b.name.split(' / ');
		const category = parts.length > 1 ? parts[0] : 'Other';
		// Strip -min suffix and " Min" (title-cased version)
		let leaf = parts[parts.length - 1].replace(/-min$/, '').replace(/ Min$/, '');
		const leafName = toTitleCase(leaf);

		return {
			name: leafName,
			category: category,
			url: b.bookmarklet,
			path: b.path,
			size: b.size,
			description: b.description || null,
		};
	});

	writeFileSync(
		join(DIST_DIR, 'bookmarklets.json'),
		JSON.stringify(manifest, null, 2)
	);
	console.log(`  ✓ bookmarklets.json (${manifest.length} entries)`);
}

// Format bytes to human-readable format (KB)
function formatBytes(bytes) {
	if (bytes < 1024) {
		return `${bytes} B`;
	}
	return `${(bytes / 1024).toFixed(2)} KB`;
}

// Generate markdown overview of all bookmarklets
function generateMarkdown(bookmarklets) {
	console.log('\nGenerating bookmarklets.md overview...');

	// Group by category
	const groups = {};
	for (const b of bookmarklets) {
		const parts = b.name.split(' / ');
		const category = parts.length > 1 ? parts[0] : 'Other';
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(b);
	}

	// Sort categories and bookmarklets
	const sortedCategories = Object.keys(groups).sort();

	// Generate markdown
	let markdown = '# Bookmarklets\n\n';

	for (const category of sortedCategories) {
		markdown += `## ${category}\n\n`;
		const sortedBookmarklets = groups[category].sort((a, b) =>
			a.name.localeCompare(b.name)
		);

		for (const b of sortedBookmarklets) {
			const leafName = b.name.split(' / ').pop();
			const relativePath = b.path; // already relative to dist/

			markdown += `### [${leafName}](${relativePath})\n\n`;

			if (b.sourceUrl) {
				markdown += `**Source:** ${b.sourceUrl}\n\n`;
			}

			markdown += `**Size:** ${formatBytes(b.size)}\n\n`;

			if (b.description) {
				markdown += `${b.description}\n\n`;
			}

			markdown += '---\n\n';
		}
	}

	writeFileSync(join(DIST_DIR, 'bookmarklets.md'), markdown);
	console.log(`  ✓ bookmarklets.md`);
}

// Copy test page to dist
function copyTestPages() {
	console.log('\nCopying test page...');

	const a11yNightmareSrc = join(SRC_DIR, 'test', 'a11y-nightmare.html');
	const a11yNightmareDist = join(TEST_DIR, 'a11y-nightmare.html');

	if (existsSync(a11yNightmareSrc)) {
		copyFileSync(a11yNightmareSrc, a11yNightmareDist);
		console.log(`  ✓ test/a11y-nightmare.html`);
	} else {
		console.log(`  ! test/a11y-nightmare.html not found, skipping`);
	}
}

// Build private bookmarklets
async function buildPrivate() {
	console.log('\nBuilding private bookmarklets...\n');

	// Recursively find all .js files in _private directories
	const jsFiles = findJSFilesPrivate(SRC_DIR);

	if (jsFiles.length === 0) {
		console.log('No private source files found in src/_private/');
		return [];
	}

	console.log(`Found ${jsFiles.length} private JavaScript file(s)\n`);

	// Normalize path by collapsing redundant intermediate directories
	function normalizePath(relPath) {
		const parts = relPath.replace(/\.js$/, '').split(sep);
		const normalized = [];
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const nextPart = parts[i + 1];
			const afterNext = parts[i + 2];

			// Skip this directory if:
			// 1. Next part is exactly the same (e.g., "nvda-helper/" before "nvda-helper.js")
			const isExactMatch =
				nextPart && part.toLowerCase() === nextPart.toLowerCase();
			// 2. When the next directory is a prefix of the current directory, and the one after
			//    extends the next directory (e.g., "jaws/jaws-helper/jaws-helper-popover.js")
			//    Skip "jaws" since "jaws-helper" already contains it and is extended further.
			const isPrefixMatch =
				nextPart &&
				afterNext &&
				nextPart.toLowerCase().startsWith(part.toLowerCase()) &&
				afterNext.toLowerCase().startsWith(nextPart.toLowerCase() + '-');

			if (isExactMatch || isPrefixMatch) {
				continue;
			}
			normalized.push(part);
		}
		// Strip -min suffix before title-casing (handle minified versions)
		const stripped = normalized.map((part) => part.replace(/-min$/, ''));
		return stripped.map((part) => toTitleCase(part)).join(' / ');
	}

	const bookmarklets = [];

	for (const srcPath of jsFiles) {
		// Get relative path from SRC_DIR, removing _private prefix for display
		let relPath = relative(SRC_DIR, srcPath);
		// Remove _private from the path for display purposes
		const relPathNoPrivate = relPath.replace(/_private[\/\\]?/, '');
		const displayName = normalizePath(relPathNoPrivate);

		const result = await buildBookmarklet(srcPath, displayName, relPathNoPrivate, DIST_PRIVATE_DIR);
		if (result) {
			bookmarklets.push(result);
		}
	}

	// Generate private index.html
	writeFileSync(join(DIST_PRIVATE_DIR, 'index.html'), generateIndex(bookmarklets, true));

	console.log(`\n✓ Built ${bookmarklets.length} private bookmarklet(s) to dist/private/`);
	console.log(`✓ Generated dist/private/index.html`);

	// Generate private collection
	if (bookmarklets.length > 0) {
		const privateCollectionContent = generateNetscapeBookmarkFile(
			bookmarklets,
			'Private Bookmarklets'
		);
		writeFileSync(
			join(COLLECTIONS_DIR, 'bookmarklets-private.html'),
			privateCollectionContent
		);
		console.log(`✓ Generated dist/collections/bookmarklets-private.html`);
	}

	return bookmarklets;
}

// Main build function
async function build() {
	console.log('Building bookmarklets...\n');

	// Recursively find all .js files in src/ (excluding _private)
	const jsFiles = findJSFiles(SRC_DIR);

	if (jsFiles.length === 0) {
		console.log('No source files found in src/');
		// Still generate index with empty state
		writeFileSync(join(DIST_DIR, 'index.html'), generateIndex([], false));
		return;
	}

	console.log(`Found ${jsFiles.length} JavaScript file(s)\n`);

	// Normalize path by collapsing redundant intermediate directories
	function normalizePath(relPath) {
		const parts = relPath.replace(/\.js$/, '').split(sep);
		const normalized = [];
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const nextPart = parts[i + 1];
			const afterNext = parts[i + 2];

			// Skip this directory if:
			// 1. Next part is exactly the same (e.g., "nvda-helper/" before "nvda-helper.js")
			const isExactMatch =
				nextPart && part.toLowerCase() === nextPart.toLowerCase();
			// 2. When the next directory is a prefix of the current directory, and the one after
			//    extends the next directory (e.g., "jaws/jaws-helper/jaws-helper-popover.js")
			//    Skip "jaws" since "jaws-helper" already contains it and is extended further.
			const isPrefixMatch =
				nextPart &&
				afterNext &&
				nextPart.toLowerCase().startsWith(part.toLowerCase()) &&
				afterNext.toLowerCase().startsWith(nextPart.toLowerCase() + '-');

			if (isExactMatch || isPrefixMatch) {
				continue;
			}
			normalized.push(part);
		}
		// Strip -min suffix before title-casing (handle minified versions)
		const stripped = normalized.map((part) => part.replace(/-min$/, ''));
		return stripped.map((part) => toTitleCase(part)).join(' / ');
	}

	const bookmarklets = [];

	for (const srcPath of jsFiles) {
		// Get relative path from SRC_DIR
		const relPath = relative(SRC_DIR, srcPath);
		const displayName = normalizePath(relPath);

		const result = await buildBookmarklet(srcPath, displayName, relPath);
		if (result) {
			bookmarklets.push(result);
		}
	}

	// Generate index.html
	writeFileSync(join(DIST_DIR, 'index.html'), generateIndex(bookmarklets));

	console.log(`\n✓ Built ${bookmarklets.length} bookmarklet(s) to dist/`);
	console.log(`✓ Generated index.html`);

	// Build collections
	buildCollections(bookmarklets);

	// Generate bookmarklets.json manifest
	generateManifest(bookmarklets);

	// Generate markdown overview
	generateMarkdown(bookmarklets);

	// Copy test pages
	copyTestPages();

	// Build private bookmarklets
	await buildPrivate();
}

build().catch((err) => {
	console.error('Build error:', err);
	process.exit(1);
});

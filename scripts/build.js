#!/usr/bin/env node

import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';
import { minify as terserMinify } from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');
const DIST_DIR = join(ROOT, 'dist');

// Ensure dist directory exists
if (!existsSync(DIST_DIR)) {
  mkdirSync(DIST_DIR, { recursive: true });
}

// Recursively find all .js files in directory
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

// URI encode with proper character escaping
function uriEncode(code) {
  return encodeURIComponent(code)
    .replace(/'/g, '%27')
    .replace(/!/g, '%21');
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
  return path.split(sep).map(part => toWebFriendlyName(part)).join('/');
}

// Build a single bookmarklet
async function buildBookmarklet(srcPath, displayName, relPath) {
  if (!existsSync(srcPath)) {
    console.warn(`Warning: ${srcPath} not found, skipping`);
    return null;
  }

  console.log(`Building ${displayName}...`);

  let code = readFileSync(srcPath, 'utf-8');

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
  const fileName = webFriendlyDir ? `${webFriendlyDir}/${webFriendlyBase}` : webFriendlyBase;

  // Calculate relative path to index.html
  const depth = pathParts.length - 1;
  const backPath = depth > 0 ? '../'.repeat(depth) + 'index.html' : 'index.html';

  // Write to dist as .html (for drag-and-drop)
  const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName} Bookmarklet</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .container { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px; }
    h1 { margin: 0 0 1rem; }
    a.bookmarklet { display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; cursor: pointer; }
    a.bookmarklet:hover { background: #0052a3; }
    .code { margin-top: 1.5rem; padding: 1rem; background: #f8f8f8; border-radius: 4px; text-align: left; overflow-x: auto; font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow-y: auto; }
    .hint { margin-top: 1rem; color: #666; font-size: 14px; }
    @media (max-width: 500px) {
      .hint { font-size: 12px; }
    }
    .back-link { margin-top: 1rem; display: inline-block; color: #0066cc; text-decoration: none; }
    .back-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${displayName}</h1>
    <a href="${bookmarklet}" class="bookmarklet">Run ${displayName}</a>
    <p class="hint">Test run or drag to<br>bookmarklets bar to install</p>
    <div class="code">${bookmarklet}</div>
    <a href="${backPath}" class="back-link">← Back to all bookmarklets</a>
  </div>
</body>
</html>`;

  // Create output directory structure in dist (using web-friendly paths)
  const outputPath = join(DIST_DIR, fileName);
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const htmlPath = `${outputPath}.html`;
  const bookmarkletPath = `${outputPath}.bookmarklet`;

  writeFileSync(htmlPath, htmlOutput);
  writeFileSync(bookmarkletPath, bookmarklet);

  console.log(`  ✓ ${fileName}.html -> ${bookmarklet.length} bytes`);

  return { name: displayName, bookmarklet, size: bookmarklet.length, fileName, path: `${fileName}.html` };
}

// Generate index.html with all bookmarklets
function generateIndex(bookmarklets) {
  const bookmarkletList = bookmarklets.map(b => `
        <li class="bookmarklet-item">
          <div>
            <strong>${b.name}</strong>
            <small style="display:block;color:#666;margin-top:4px;">${b.size} bytes</small>
          </div>
          <a href="${b.path}" class="bookmarklet-link">View</a>
          <a href="${b.bookmarklet}" class="bookmarklet-link" style="margin-left: 8px;">Run</a>
        </li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bookmarklets</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; min-height: 100vh; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    header { text-align: center; color: #333; margin-bottom: 40px; }
    h1 { font-size: 2.5rem; margin-bottom: 10px; }
    .subtitle { opacity: 0.7; font-size: 1.1rem; }
    .card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .instructions { background: #f8f9fa; border-left: 4px solid #0066cc; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    .instructions ol { margin-left: 20px; }
    .instructions li { margin-bottom: 8px; }
    .bookmarklet-list { list-style: none; }
    .bookmarklet-item { display: flex; align-items: center; justify-content: space-between; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 10px; transition: box-shadow 0.2s; }
    .bookmarklet-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .bookmarklet-link { display: inline-block; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: background 0.2s; white-space: nowrap; cursor: pointer; }
    .bookmarklet-link:hover { background: #0052a3; }
    .footer { text-align: center; margin-top: 20px; color: #666; opacity: 0.8; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📚 Bookmarklets</h1>
      <p class="subtitle">Drag links to your bookmarks bar to install</p>
    </header>

    <div class="card">
      <h2>How to Use</h2>
      <div class="instructions">
        <ol>
          <li><strong>Click</strong> any "Run" button below to test the bookmarklet on this page</li>
          <li><strong>Drag</strong> the button to your bookmarks bar to install it</li>
          <li>Navigate to any website and click the bookmarklet to run it</li>
        </ol>
      </div>

      <h2 style="margin-bottom:15px;">Available Bookmarklets (${bookmarklets.length})</h2>
      <ul class="bookmarklet-list">
        ${bookmarkletList || '<li class="empty-state">No bookmarklets built yet. Run <code>npm run build</code></li>'}
      </ul>
    </div>

    <div class="footer">
      <p>Built with <a href="https://github.com" style="color:white;">Bookmarklet Manager</a></p>
    </div>
  </div>
</body>
</html>`;
}

// Main build function
async function build() {
  console.log('Building bookmarklets...\n');

  // Recursively find all .js files in src/
  const jsFiles = findJSFiles(SRC_DIR);

  if (jsFiles.length === 0) {
    console.log('No source files found in src/');
    // Still generate index with empty state
    writeFileSync(join(DIST_DIR, 'index.html'), generateIndex([]));
    return;
  }

  console.log(`Found ${jsFiles.length} JavaScript file(s)\n`);

  const bookmarklets = [];

  for (const srcPath of jsFiles) {
    // Get relative path from SRC_DIR
    const relPath = relative(SRC_DIR, srcPath);
    const displayName = relPath
      .replace(/\.js$/, '')
      .replace(new RegExp(`\\${sep}`, 'g'), ' / '); // Use " / " as separator

    const result = await buildBookmarklet(srcPath, displayName, relPath);
    if (result) {
      bookmarklets.push(result);
    }
  }

  // Generate index.html
  writeFileSync(join(DIST_DIR, 'index.html'), generateIndex(bookmarklets));

  console.log(`\n✓ Built ${bookmarklets.length} bookmarklet(s) to dist/`);
  console.log(`✓ Generated index.html`);
}

build().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});

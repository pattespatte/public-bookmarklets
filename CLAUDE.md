# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Bookmarklet Manager

Builds JavaScript bookmarklets (`javascript:` URLs) from ES6+ source files. Contains 80+ accessibility-focused bookmarklets organized in categories, with a sophisticated build pipeline that generates HTML pages, collections, and manifests.

## Quick Start

```bash
# Install dependencies
npm install

# Create new bookmarklet
npm run new <name>

# Build all (minify, URI-encode, output to /dist)
npm run build

# Copy bookmarklet to clipboard
npm run copy <name>

# Test with drag-and-drop
npm run serve
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build all bookmarklets to `dist/` |
| `npm run new <name>` | Create new bookmarklet from template in `src/` |
| `npm run copy <name>` | Copy bookmarklet URL to clipboard (use kebab-case name) |
| `npm run serve` | Start HTTP server on `dist/` for testing |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Source File Structure

```
src/
├── accessibility/         # 70+ accessibility bookmarklets
│   ├── a11y-bookmarklet/  # External library (MPL-2.0 license)
│   ├── analysis/          # Page analysis tools
│   ├── color/             # Color tools
│   ├── color-contrast/    # Contrast checking (includes WebAIM tool)
│   ├── focus-interactive/ # Focus management
│   ├── forms/             # Form validation
│   ├── images/            # Image accessibility
│   ├── keyboard/          # Keyboard navigation
│   ├── live-regions/      # ARIA live regions
│   ├── media/             # Captions/media
│   ├── motion/            # Motion/preference checks
│   ├── reading/           # Reading order
│   ├── screen-readers/    # JAWS, NVDA, VoiceOver helpers
│   ├── spacing/           # Text spacing, target sizes
│   ├── structure-and-headings/
│   ├── syntax-check/      # HTML/CSS validation
│   ├── urls-links/        # Link checking
│   └── zoom/              # Zoom/scaling
├── other/                 # General utilities (CSS, dev tools, etc.)
├── test/                  # Test pages (e.g., a11y-nightmare.html)
└── _private/              # Private bookmarklets (NOT built)
```

## Bookmarklet Source Format

```javascript
// Description: [What it does, optionally include WCAG SC references]
(function () {
 'use strict';
 try {
  // ===== YOUR CODE HERE =====
  // Available: document, window, location, navigator, etc.

  // ===== END YOUR CODE =====
 } catch (err) {
  alert('Bookmarklet Error: ' + err.message);
 }
})();
void 0;

console.log(`
Source: https://example.com/original-source
Bookmarklet name: Your Bookmarklet Name
`);
```

**Required metadata:**

- `// Description:` - Single-line description at top of file (parsed by build script)
- `console.log` with `Source:` and `Bookmarklet name:` at end (parsed for attribution)
- WCAG Success Criterion references in description format: `WCAG SC X.X.X: Name`

## Requirements

| Rule | Requirement |
|------|-------------|
| **IIFE** | Wrap in `(function(){ 'use strict'; ... })();` |
| **No Navigation** | End with `void 0;` |
| **Self-contained** | No external runtime dependencies (CDN OK if needed) |
| **Security** | Use `createElement` over `innerHTML`; Shadow DOM for UI |
| **Z-index** | Use `999999+` for injected elements |
| **Attribution** | Include source URL and author in console.log block |

## Build Pipeline Architecture

The `scripts/build.js` script (1472 lines) implements a multi-stage build:

1. **Discovery**: Recursively finds all `.js` files (skips `_private/` directories)
2. **Minification**:
   - `terser` for JavaScript
   - `html-minifier-terser` for HTML
   - `lightningcss` for CSS
3. **Encoding**: URI encode special chars (`%` `%25`, `"` `%22`, `<` `%3C`, `>` `%3E`, `#` `%23`)
4. **Metadata Extraction**: Parses `// Description:` and `console.log` blocks for WCAG refs, source URLs
5. **HTML Generation**: Creates individual pages with drag-and-drop support, dark mode
6. **Collection Building**: Generates Netscape Bookmark format for bulk import
7. **Manifest Generation**: Creates `bookmarklets.json` and `bookmarklets.md`

**Key naming logic:**

- Source filenames → web-friendly kebab-case (special handling for acronyms)
- Directory paths are flattened in display (redundant names collapsed)
- Title case conversion with special cases (WAI-ARIA, JAWS, NVDA, VoiceOver, etc.)

## Output Structure

```
dist/
├── index.html             # Main catalog with search/filter
├── bookmarklets.json      # Machine-readable manifest
├── bookmarklets.md        # Human-readable overview
├── collections/           # Netscape Bookmark files for bulk import
├── test/                  # Test pages
├── accessibility/         # Mirrors src structure
└── private/               # Built private bookmarklets
```

## WCAG Integration

The build system automatically extracts and displays WCAG Success Criteria references from descriptions:

- Format: `WCAG SC 1.4.3: Contrast (Minimum)`
- Generates badges in HTML output
- Creates filterable categories in main index

## Licensing

- **Primary**: MIT License
- **Mixed licenses**: MPL-2.0 for a11y-bookmarklet library files
- See `THIRD-PARTY-NOTICES.md` for full attributions
- Full license texts stored in `LICENSES/` directory

## Private Bookmarklets

Files in `src/_private/` are excluded from public builds. These are typically:

- Custom tools under investigation
- Third-party code with unclear licensing
- Personal utilities not ready for distribution

Private bookmarklets can still be built manually by moving them to public directories.

## Reference Resources

- WCAG - <https://www.w3.org/WAI/standards-guidelines/wcag/>
- MSDN Bookmarklet Reference - <https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85)>
- Bookmarklet Maker - <https://caiorss.github.io/bookmarklet-maker/>

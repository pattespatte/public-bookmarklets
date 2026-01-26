# CLAUDE.md

## Project: Bookmarklet Manager

Builds JavaScript bookmarklets (`javascript:` URLs) from ES6+ source files.

## Quick Start

```bash
# Create new bookmarklet
node scripts/new.js <name>

# Build all (minify, URI-encode, output to /dist)
node scripts/build.js

# Copy bookmarklet to clipboard
node scripts/copy.js <name>

# Test with drag-and-drop
npx http-server dist
```

## Template (src/<name>.js)

```javascript
(function() {
  'use strict';
  try {
    // Your code here
    console.log('Hello from bookmarklet!');
  } catch (err) {
    alert('Bookmarklet Error: ' + err.message);
  }
})();
void 0;
```

## Requirements

| Rule | Requirement |
|------|-------------|
| **IIFE** | Wrap in `(function(){ 'use strict'; ... })();` |
| **No Navigation** | End with `void 0;` |
| **Self-contained** | No external runtime dependencies (CDN only if needed) |
| **Security** | Use `createElement` over `innerHTML`; Shadow DOM for UI |
| **Z-index** | Use `999999+` for injected elements |

## Build Pipeline

1. **Minify**: `terser` (JS), `html-minifier-terser` (HTML), `lightningcss` (CSS)
2. **Prefix**: Add `javascript:`
3. **Encode**: URI encode special chars (`%` `%25`, `"` `%22`, `<` `%3C`, `>` `%3E`, `#` `%23`)

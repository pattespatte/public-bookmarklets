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
(function () {
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

| Rule               | Requirement                                             |
| ------------------ | ------------------------------------------------------- |
| **IIFE**           | Wrap in `(function(){ 'use strict'; ... })();`          |
| **No Navigation**  | End with `void 0;`                                      |
| **Self-contained** | No external runtime dependencies (CDN only if needed)   |
| **Security**       | Use `createElement` over `innerHTML`; Shadow DOM for UI |
| **Z-index**        | Use `999999+` for injected elements                     |

## Build Pipeline

1. **Minify**: `terser` (JS), `html-minifier-terser` (HTML), `lightningcss` (CSS)
2. **Prefix**: Add `javascript:`
3. **Encode**: URI encode special chars (`%` `%25`, `"` `%22`, `<` `%3C`, `>` `%3E`, `#` `%23`)

**Primary Goals:**

- Organize existing bookmarklets with source control
- Create reusable patterns and utilities
- Maintain both readable source and production-ready encoded versions
- Document usage and compatibility

**Development Tools:**

- Claude Code / glmcode for AI-assisted development
- Local testing via browser DevTools
- External minification services for production builds

**Reference Resources:**

- WCAG - https://www.w3.org/WAI/standards-guidelines/wcag/
- MSDN Bookmarklet Reference - <https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85)>
- Bookmarklet Maker - <https://caiorss.github.io/bookmarklet-maker/>
- Toptal JS Minifier - <https://www.toptal.com/developers/javascript-minifier>
- HTML Minifier - <https://kangax.github.io/html-minifier/>
- Lightning CSS - <https://lightningcss.dev/playground/>

# AGENTS.md

Guidance for coding agents working in this repository.
This is a public collection of 100+ accessibility-focused JavaScript bookmarklets
with a build pipeline that turns ES6+ source files into minified, URI-encoded
`javascript:` URLs plus an HTML catalog. Read `CLAUDE.md` and `README.md` for
full background; this file captures the conventions agents most often get wrong.

## Commands

| Command                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `npm run build`        | Build all bookmarklets to `dist/` (the main check) |
| `npm run new <name>`   | Scaffold a new bookmarklet from the current template in `src/` |
| `npm run copy <name>`  | Copy a built bookmarklet URL to the clipboard      |
| `npm run serve`        | Serve `dist/` over HTTP for manual testing         |
| `npm run format`       | Format with Prettier (run before committing)       |
| `npm run format:check` | Verify formatting in CI                            |

Package is `"type": "module"` — scripts and `.js` sources use ESM. There is no
test runner, lint, or typecheck; `npm run build` + `npm run format:check` are
the verification steps. After editing any bookmarklet, rebuild and eyeball the
output in `dist/`.

## Source layout

```
src/
├── accessibility/   # ~77 a11y bookmarklets, grouped by subcategory
├── other/           # css, developer, markdown, miscellaneous, validation, visual, workflow
├── test/            # Test pages (e.g. a11y-nightmare.html), not bookmarklets
└── _private/        # NOT built — excluded by build.js
scripts/             # build.js, new.js, copy.js, add-descriptions.js
dist/                # Generated output — do not hand-edit
```

Place new bookmarklets in the correct category subdirectory under `src/`. Files
in `src/_private/` are intentionally excluded from public builds; only move a
file there if it should not ship.

## Bookmarklet requirements (mandatory)

Every bookmarklet source file must follow these rules — the build pipeline
assumes them and breaking them breaks the catalog:

- **IIFE + strict**: wrap the body in `(function () { 'use strict'; ... })();`.
- **End with `void 0;`** so the bookmarklet does not navigate away.
- **Self-contained**: no runtime imports. CDN fetches are acceptable only when
  unavoidable.
- **`// Description:`** as the first commented line inside the IIFE. Parsed by
  the build for the catalog listing. Include WCAG references in the form
  `WCAG SC 1.4.3: Contrast (Minimum)` when relevant — they become filter
  badges.
- **Attribution block** at the end of the file via `console.log`:

  ```js
  console.log(`
  Source: <original source URL>
  Bookmarklet name: <Display Name>
  Author: <author>
  License: <SPDX id>
  `);
  ```

  The build parses `Source:` and `Bookmarklet name:` for attribution.
- **Security**: prefer `createElement` over `innerHTML`; use Shadow DOM for any
  injected UI so the page's own CSS does not leak in.
- **Z-index**: injected elements use `999999+` (the toast host uses
  `2147483647`).

The canonical template lives in `scripts/new.js` — run `npm run new <name>` to
get a correctly-scaffolded file rather than writing the IIFE from scratch.

## UI conventions (important — recent migration)

- **Toasts, not `alert()`.** A repo-wide migration (commit `e683863`) replaced
  `alert()` with an inline toast helper. New code must use the toast pattern
  from the `scripts/new.js` template: an `a11y-toast-host` element with a Shadow
  DOM containing the styles, called as `toast(msg)` or `toast(msg, 'error')`.
  The catch block should report errors via `toast(err.message, 'error')`, not
  `alert()`. Some legacy files still contain `alert()`; do not introduce new
  uses.
- **Overlays scroll with the page.** Highlight/badge wrapper overlays use
  `position: absolute` (not `fixed`) so annotations track page content during
  scroll — see commits `cbed047` / `679b96b`. Use `position: fixed` only for
  true viewport-locked UI such as the toast host.

## Coding style

Formatting is enforced by Prettier (`.prettierrc`) and EditorConfig
(`.editorconfig`):

- **JavaScript/HTML/CSS**: tabs, 4-unit indent, LF line endings.
- **JSON/YAML/Markdown**: 2-space indent.
- **JS**: single quotes, trailing commas (`es5`).
- Markdown files: preserve trailing whitespace, keep final newline.

Run `npm run format` before committing; `npm run format:check` fails CI
otherwise.

## Build pipeline notes

`scripts/build.js` (~1500 lines) is a multi-stage pipeline:

1. Recursively discovers `.js` files under `src/` (skips `_private/`).
2. Minifies JS (`terser`), HTML (`html-minifier-terser`), CSS (`lightningcss`).
3. URI-encodes special characters (`% " < > #`).
4. Extracts metadata from `// Description:` and the trailing `console.log`.
5. Generates per-bookmarklet HTML pages, the main `index.html` catalog,
   Netscape-format collection files for bulk import, and `bookmarklets.json`
   / `bookmarklets.md` manifests into `dist/`.

Because metadata is extracted by parsing comments and the `console.log` block,
keep those sections exactly in the documented format — do not rename the
`Source:` / `Bookmarklet name:` keys or move the description line.

## Licensing

- **MIT** is the default license.
- **MPL-2.0** applies to the `a11y-bookmarklet` library files under
  `src/accessibility/a11y-bookmarklet/` (A11Y Graphics, LibGuide, Reporter,
  Tabbings). Do not strip their license headers.
- Each file's license is declared in its `console.log` attribution block and
  surfaced in `THIRD-PARTY-NOTICES.md`. Full license texts live in `LICENSES/`.
- Code with unclear or incompatible licensing goes in `src/_private/`.

## Git workflow

- Propose the commit message and list the staged files first; wait for the
  owner's approval before running `git commit` or `git push`. This applies even
  to shorthand like "commit & push".
- Recent commit style uses Conventional Commits prefixes: `Feat:`, `Fix:`,
  `Refactor:`, with a short imperative subject and a body when the "why" is not
  obvious.
- `dist/` is build output — confirm whether it should be included in a given
  commit based on the change being made.

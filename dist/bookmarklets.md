# Bookmarklets

## Accessibility

### [A11Y Graphics](accessibility/a11y-bookmarklet/a11y-graphics.html)

**Source:** https://metageeky.github.io/accessibility-bookmarklet/

**Size:** 737 B

The A11Y Graphics bookmarklet loads an image reviewer tool from the external accessibility-bookmarklet library. Fetches the image-reviewer-ui.js module which provides a panel for reviewing all images on the page, checking for alt text, analyzing decorative vs informative images, and flagging accessibility issues. Requires internet connection to load the external library. WCAG SC 1.1.1: Non-text Content.

---

### [A11Y LibGuide](accessibility/a11y-bookmarklet/a11y-lib-guide.html)

**Source:** https://metageeky.github.io/accessibility-bookmarklet/

**Size:** 1009 B

The A11Y LibGuide bookmarklet generates a comprehensive accessibility report formatted for library/content guide audits using the axe-core library. Loads the external accessibility-bookmarklet library with axe-core integration, runs automated accessibility tests, formats results specifically for library/educational content guidelines, and displays the report with issues organized by severity. Requires internet connection to load the external library. Uses axe-core for WCAG compliance testing.

---

### [A11Y Reporter](accessibility/a11y-bookmarklet/a11y-reporter.html)

**Source:** https://metageeky.github.io/accessibility-bookmarklet/

**Size:** 942 B

The A11Y Reporter bookmarklet generates a comprehensive automated accessibility report using the axe-core testing engine. Loads the external accessibility-bookmarklet library with axe-core integration, runs a full page accessibility audit testing against WCAG rules, displays violations, passes, and incomplete results in an interactive panel, and includes image reviewer and tabbable element analysis. Requires internet connection to load the external library. Uses axe-core for WCAG compliance testing across all success criteria.

---

### [A11Y Tabbings](accessibility/a11y-bookmarklet/a11y-tabbings.html)

**Source:** https://metageeky.github.io/accessibility-bookmarklet/

**Size:** 745 B

The A11Y Tabbings bookmarklet loads a comprehensive tabbable/focusable element reviewer from the external accessibility-bookmarklet library. Fetches and initializes the tabbable-reviewer-ui.js library, which displays an interactive panel showing all tabbable elements in their tab order, allows stepping through focus elements, and identifies potential keyboard navigation issues. Requires internet connection to load the external library. WCAG SC 2.1.1: Keyboard, WCAG SC 2.4.3: Focus Order.

---

### [Accessible Name Consistency](accessibility/analysis/accessible-name-consistency.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.77 KB

The Accessible Name Consistency bookmarklet compares computed accessible names to visible label text to detect potential WCAG 2.5.3 Label in Name violations. Calculates accessible names using accessibility tree computation, finds nearby visible labels (label[for], parent label, or sibling label), measures text similarity using Levenshtein distance, outlines elements with low similarity (<60%) in red, and displays an alert with the count of problematic items. Hover over outlined elements to see name vs label text and similarity score. Run again to remove. WCAG SC 2.5.3: Label in Name.

---

### [First Accessible Paint](accessibility/analysis/first-accessible-paint.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.20 KB

The First Accessible Paint bookmarklet estimates when the page becomes keyboard-usable for assistive technology users. Measures time from start until both landmark regions (main, nav, region, header, footer) and focusable elements exist, uses MutationObserver to detect when these elements appear in the DOM, attempts to focus the first focusable element to confirm, and displays an alert with the elapsed time in milliseconds. If page is already usable, reports current elapsed time. Useful for measuring performance impacts on keyboard/screen reader users. WCAG SC 2.4.1: Bypass Blocks.

---

### [Focus Graph Analyzer](accessibility/analysis/focus-graph-analyzer.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.35 KB

The Focus Graph Analyzer bookmarklet models keyboard tab order as a directed graph to identify potential focus issues. Builds the tab order sequence from focusable elements (considering tabindex values), draws badges showing each element's position and its forward target, calculates trap candidates (elements where forward and backward targets equal themselves), counts positive tabindex items that override natural order, identifies unreachable interactive elements, and displays an alert with statistics. Visualizes the focus flow to detect keyboard traps and ordering problems. Run again to remove. WCAG SC 2.1.1: Keyboard, WCAG SC 2.4.3: Focus Order.

---

### [Interaction State Fuzzer](accessibility/analysis/interaction-state-fuzzer.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.65 KB

The Interaction State Fuzzer bookmarklet tests common ARIA widget patterns for proper keyboard and interaction behaviors. Opens dialogs and tests Escape key to close, navigates menus with arrow keys and tests Escape, clicks aria-expanded toggles and verifies state changes, and reports any patterns that don't respond correctly. Displays an alert with any issues found (e.g., "Dialog did not close on Escape", "Toggle did not change aria-expanded"). Useful for automated testing of widget interaction patterns. WCAG SC 2.1.1: Keyboard, WCAG SC 4.1.2: Name, Role, Value.

---

### [Keyboard Unit Tester](accessibility/analysis/keyboard-unit-tester.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.35 KB

The Keyboard Behavior Unit Tester bookmarklet automatically tests whether interactive controls respond to keyboard activation. Finds links, buttons, and inputs, programmatically dispatches Enter and Space keyboard events, measures if click handlers were triggered, and reports elements that failed to respond to keyboard activation. Helps identify interactive elements that only work with mouse/touch input, which is a WCAG violation. Displays an alert with the count of silent (non-responsive) elements. WCAG SC 2.1.1: Keyboard.

---

### [Reading Order Correlator](accessibility/analysis/reading-order-correlator.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.77 KB

The Reading Order Correlator bookmarklet compares visual reading order to DOM source order using the Kendall tau correlation coefficient. Finds all content blocks (headings, paragraphs, lists, sections, etc.), sorts them by visual position (top-to-bottom, left-to-right), calculates the number of inversions where visual order differs from DOM order, computes the tau correlation coefficient (1 = perfect correlation, 0 = no correlation), highlights elements with large position discrepancies (5+ positions) in red with up-down arrows, and displays an alert with tau value and inversion count. Run again to remove. WCAG SC 1.3.2: Meaningful Sequence.

---

### [Role Constraint Solver](accessibility/analysis/role-constraint-solver.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.14 KB

The Role Constraint Solver bookmarklet checks ARIA widget roles for proper required child ownership relationships. Validates listbox/option, tablist/tab, and menu/menuitem relationships, identifies parent elements missing required child roles, and proposes fixes (e.g., "Add role='option' to first child"). Displays an alert listing all ownership gaps found with suggested remedies. Useful for verifying ARIA widget patterns are correctly implemented. WCAG SC 1.3.1: Info and Relationships, WCAG SC 4.1.2: Name, Role, Value.

---

### [Table Structure Verifier](accessibility/analysis/table-structure-verifier.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.29 KB

The Table Structure Verifier bookmarklet validates header associations in data tables. Finds all tables on the page, identifies data cells (td), checks if each cell has properly associated headers via the `headers` attribute or `scope` attributes on header cells, outlines cells without clear header associations in red, and displays an alert with the count of problematic cells. Useful for verifying that data tables have proper header relationships for screen reader users. Note: Does not check layout tables, which should not have headers. WCAG SC 1.3.1: Info and Relationships.

---

### [Visual Only Icon Detector](accessibility/analysis/visual-only-icon-detector.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.62 KB

The Visual Only Icon Detector bookmarklet identifies icon-only controls that may have insufficient accessible names. Finds small buttons/links (≤40x40px) with no visible text but containing SVG or background images, checks for aria-label, title, or aria-labelledby, flags controls with very short names (<3 characters) as potential issues, outlines problematic icons in red, and displays an alert with the count of at-risk controls. Hover over outlined elements to see their status. Useful for finding icon buttons that need better labels. Run again to remove. WCAG SC 2.5.3: Label in Name.

---

### [Voice Command Readiness](accessibility/analysis/voice-command-readiness.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.37 KB

The Voice Command Readiness bookmarklet checks controls for unique and concise names suitable for voice control. Finds links, buttons, and inputs, extracts their accessible names (aria-label, aria-labelledby, visible text), normalizes names (lowercase, collapse whitespace, truncate to 60), identifies duplicate names used by multiple controls which would prevent voice targeting, and counts excessively long names (>6 words) which are harder to speak. Displays an alert with counts of duplicates and long names. Useful for testing voice control compatibility.

---

### [Color Vision Filters](accessibility/color/color-vision-filters.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.88 KB

The Color Vision Filters bookmarklet applies SVG color matrix filters to simulate different types of color blindness (color vision deficiencies). Cycles through four modes: protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind), and normal vision. Each run advances to the next mode. Uses SVG feColorMatrix elements to transform colors according to scientific color perception data, helping designers test content accessibility for users with color vision deficiencies. Run four times to return to normal. WCAG SC 1.4.1: Use of Color.

---

### [Contrast Spot Check](accessibility/color/contrast-spot-check.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.19 KB

Click any text element to compute the contrast ratio between foreground and background colors, with pass/fail results for WCAG AA and AAA conformance levels. Displays the ratio, colors, and text size. Press Esc to stop. WCAG SC 1.4.3: Contrast (Minimum).

---

### [Forced Colors Preview](accessibility/color/forced-colors-preview.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.14 KB

The Forced Colors Preview bookmarklet approximates the Windows high contrast mode / forced colors appearance. Applies CSS that overrides backgrounds to transparent/black, sets text to white, makes links cyan with underlines, gives form controls white borders on black backgrounds, and applies grayscale + contrast filters to images and videos. Useful for testing whether pages remain usable when users' color preferences override the site's design. Run again to remove. WCAG SC 1.4.11: Non-text Contrast.

---

### [Non Text Contrast Auditor](accessibility/color/non-text-contrast-auditor.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.40 KB

The Non-Text Contrast Auditor bookmarklet checks focus indicator thickness and contrast on interactive controls. Finds all focusable elements (links, buttons, inputs, etc.), temporarily focuses each element to trigger its focus styles, measures the outline width and calculates contrast between outline color and background color, flags elements with outline width < 2px or contrast ratio < 3:1 (WCAG AA minimum for non-text contrast), outlines problematic controls in red, and displays an alert with counts of low-contrast and thin rings. Run again to remove. WCAG SC 1.4.11: Non-text Contrast.

---

### [Palette Contrast Extractor](accessibility/color/palette-contrast-extractor.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.78 KB

The Palette Contrast Extractor bookmarklet identifies common color pairs used on the page and sorts them by contrast ratio. Samples foreground/background color pairs from visible text elements, traverses up the DOM tree to find non-transparent backgrounds, uses the WCAG 2 relative luminance formula to calculate contrast ratios, counts frequency of each color pair, and displays an alert listing the top 20 pairs sorted from lowest to highest contrast with occurrence counts. Useful for identifying which color combinations on the page may have contrast issues. WCAG SC 1.4.3: Contrast (Minimum).

---

### [Rendered Contrast Heatmap](accessibility/color/rendered-contrast-heatmap.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.45 KB

The Rendered Contrast Heatmap bookmarklet creates a visual overlay showing contrast pass/fail status for all visible text. Samples foreground and background colors from text elements, traverses the DOM for non-transparent backgrounds, calculates contrast ratios, determines text size and boldness to apply appropriate thresholds (3:1 for large text, 4.5:1 for normal text), overlays text elements with colored backgrounds: green (pass), yellow (borderline within 1 of threshold), or red (fail), and displays an alert with pass/borderline/fail counts. Hover over text to see the contrast ratio. Run again to remove. WCAG SC 1.4.3: Contrast (Minimum).

---

### [Contrast Checker](accessibility/color-contrast/contrast-checker/contrast-checker.html)

**Source:** https://webaim.org/resources/contrastchecker/bookmarklet

**Size:** 2.94 KB

The Contrast Checker bookmarklet embeds the WebAIM Contrast Checker tool in a draggable iframe panel on the page. Loads the mini contrast checker from webaim.org, provides color pickers for foreground and background colors, displays the contrast ratio, and shows pass/fail results for WCAG AA and AAA conformance at both normal and large text sizes. The panel can be dragged by the header bar and closed with the X button or Esc key. Press Esc to close. WCAG SC 1.4.3: Contrast (Minimum).

---

### [Remove Colors](accessibility/color-contrast/remove-colors.html)

**Source:** https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#remove-colors

**Size:** 766 B

Remove Colors bookmarklet

---

### [Lost Focus Alert](accessibility/focus-interactive/lost-focus-alert.html)

**Source:** https://a11y-tools.com/bookmarklets/#lostfocus

**Size:** 2.06 KB

The Lost Focus Alert bookmarklet tracks focus changes on interactive elements and displays a large alert notification when focus is lost to the document body. This typically indicates a focus management bug where JavaScript intercepts a click/focus event but fails to properly set focus to a new element, leaving keyboard users stranded. The offending element is highlighted with a red outline and a warning icon. Alerts appear at the bottom of the screen with details logged to the console. Reload the page to stop tracking. WCAG SC 2.4.3: Focus Order.

---

### [Reveal Focus Order](accessibility/focus-interactive/reveal-focus-order.html)

**Source:** https://a11y-tools.com/bookmarklets/#revealfocusorder

**Size:** 75.33 KB

The Reveal Focus Order bookmarklet visualizes the tab order of all focusable elements on the page. Displays a numbered list panel showing all focusable elements in tab order sequence, allows clicking list items to highlight corresponding elements on the page, and can draw lines connecting focusable elements to visualize the tab path (includes color picker for line color). Useful for identifying non-intuitive focus orders caused by positive tabindex values or DOM structure issues. Click "Hide panel" to remove. WCAG SC 2.4.3: Focus Order.

---

### [Focus Path Recorder](accessibility/forms/focus-path-recorder.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.30 KB

The Focus Path Recorder bookmarklet records Tab key navigation through the page and generates a downloadable report. Records each Tab press, capturing the timestamp, element tag name, and accessible name (aria-label, ID, name, alt, or text content), and when Esc is pressed, downloads a text file named "focus-path.txt" with the complete navigation history. Useful for documenting focus order issues and verifying logical tab flow. WCAG SC 2.4.3: Focus Order.

---

### [Form Error Exerciser](accessibility/forms/form-error-exerciser.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.41 KB

The Form Error Exerciser bookmarklet tests form validation behavior by clearing required fields and triggering validation. Finds the first form element, clears all required fields, calls reportValidity() or checkValidity() to trigger browser validation, checks whether focus moved to the first invalid field, and verifies that aria-describedby references point to valid elements. Displays an alert with validation result, count of invalid fields, first error focus status, and bad aria-describedby references. WCAG SC 3.3.1: Error Identification, WCAG SC 3.3.3: Error Suggestion.

---

### [Form Error Reveal](accessibility/forms/form-error-reveal.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.12 KB

The Form Error Reveal bookmarklet identifies all required form fields that are empty and marks them as invalid. Finds inputs, textareas, and selects with `required` attribute or `aria-required="true"`, checks if they have no value, adds `aria-invalid="true"` to empty fields, inserts "Required" error messages visually below each field, and automatically focuses the first empty required field. Displays an alert with the count of fields needing input. Useful for testing form validation behavior. WCAG SC 3.3.1: Error Identification, WCAG SC 3.3.3: Error Suggestion.

---

### [Alt Checker](accessibility/images/alt-checker.html)

**Source:** https://blog.ohheybrian.com/2021/11/check-for-alt-tags-with-a-bookmarklet/

**Size:** 1.77 KB

The Alt Checker bookmarklet highlights images with missing or empty alt attributes, helping identify non-text content that lacks accessible alternatives. Images without alt text are outlined in red, while decorative images (alt="") are outlined in blue. Run again to remove the overlays. WCAG SC 1.1.1: Non-text Content.

---

### [Find Broken Images](accessibility/images/find-broken-images.html)

**Size:** 757 B

The Find Broken Images bookmarklet checks all images on the page by fetching their src URLs. Reports broken images (404, network errors, or invalid URLs) in a popup window with the problematic URLs listed. WCAG SC 1.1.1: Non-text Content (images must have alt text, broken images should be avoided).

---

### [Image Extraction](accessibility/images/image-extraction.html)

**Source:** https://gynvael.coldwind.pl/?id=781

**Size:** 982 B

The Image Extraction bookmarklet replaces the page content with a gallery of all images found, including <img> src attributes and background-image CSS values. Each image is displayed as a thumbnail with a link to open the full-size version. Useful for reviewing all graphical content on a page. Note: Does not detect <input type="image"> or SVG background images.

---

### [Keyboard Trap Tester](accessibility/keyboard/keyboard-trap-tester.html)

**Source:** https://github.com/pattespatte/public-bookmarklets/

**Size:** 18.83 KB

The Keyboard Trap Tester bookmarklet automatically simulates Tab key presses to detect keyboard traps - focus cycles where users cannot navigate away using only the keyboard. Displays a panel with test progress, highlights trapped elements in red, and reports the iteration count where cycles were detected. Run again to remove. WCAG SC 2.1.2: No Keyboard Trap.

---

### [Skip Link Validator](accessibility/keyboard/skip-link-validator.html)

**Source:** https://github.com/pattespatte/public-bookmarklets/

**Size:** 10.93 KB

The Skip Link Validator bookmarklet analyzes skip navigation links that allow keyboard users to bypass repetitive content. Finds all anchor links with href starting with "#", identifies which are actual skip links (containing keywords like "skip", "jump", "main content"), validates that links have accessible names (visible text, aria-label, or title), and checks if target elements exist. Displays a panel showing whether the first link on the page is a skip link (best practice), lists all skip links found with their validation status, and highlights elements on hover. Run again to remove. WCAG SC 2.4.1: Bypass Blocks.

---

### [Live Region Monitor](accessibility/live-regions/live-region-monitor.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.56 KB

The Live Region Monitor bookmarklet watches for updates to aria-live and role="alert" regions. Finds all live regions on the page, uses MutationObserver to monitor DOM changes, logs new text content with timestamps as it appears, deduplicates identical messages, and displays a scrolling panel in the top-right corner showing all live region announcements. Useful for debugging dynamic content announcements and verifying that live regions work correctly. Run again to close. WCAG SC 4.1.3: Status Messages.

---

### [Caption Quality Heuristics](accessibility/media/caption-quality-heuristics.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.37 KB

The Caption Quality Heuristics bookmarklet analyzes caption track quality for videos. Finds all video elements, filters to caption/subtitle tracks, analyzes cues for reading speed (words per minute), gaps between captions (dead air where no captions appear), overlapping captions, and displays an alert with statistics for each track: track label, WPM rate, total gap time in seconds, and overlap count. High WPM (>180) may be too fast to read comfortably; gaps indicate missing content; overlaps indicate poor caption timing. WCAG SC 1.2.2: Captions (Prerecorded).

---

### [Media Captions Checker](accessibility/media/media-captions-checker.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 972 B

The Media Captions Checker bookmarklet reports caption status, autoplay, and controls for video and audio elements. Finds all video and audio elements, checks for caption/subtitle tracks in textTracks, reports autoplay attribute status, reports controls attribute status, and displays an alert with each media element's status in the format: "TAG captions:yes/no autoplay:yes/no controls:yes/no". Useful for verifying media accessibility. No media found shows "No media found" alert. WCAG SC 1.2.2: Captions (Prerecorded), WCAG SC 1.2.4: Captions (Live), WCAG SC 1.4.2: Audio Control.

---

### [Motion Inspector](accessibility/motion/motion-inspector.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.16 KB

The Motion Inspector bookmarklet lists all CSS animations and Web Animations API animations on the page with controls to pause, play, or slow them. Uses `document.getAnimations()` to find all active animations, displays a panel showing each animation's play state, duration, iterations, and playback rate, and provides buttons to pause all animations, play all animations, set half-speed playback, or restore normal speed. Useful for testing animation controls and verifying that animations can be paused. Run again to remove. WCAG SC 2.3.3: Animation from Interactions.

---

### [Toggle Prefers Reduced Motion](accessibility/motion/toggle-prefers-reduced-motion.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 689 B

The Toggle Prefers Reduced Motion bookmarklet injects CSS to simulate the `prefers-reduced-motion: reduce` media query, disabling all animations and transitions on the page. Uses a media query rule to set `animation: none !important` and `transition: none !important` for all elements when the reduced motion preference is active. Run again to remove. Useful for testing whether pages properly respect users' motion preferences. WCAG SC 2.3.3: Animation from Interactions.

---

### [Multilingual Bidi Audit](accessibility/reading/multilingual-bidi-audit.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.95 KB

The Multilingual and BIDI Audit bookmarklet checks language and direction attributes against actual text content. Detects RTL script characters (Hebrew, Arabic ranges), identifies elements containing RTL text without `dir="rtl"`, checks for missing `lang` attributes, highlights language issues in orange dashed borders, highlights direction issues in red solid borders, and displays an alert with the total count of issues. Run again to remove. WCAG SC 3.1.1: Language of Page, WCAG SC 3.1.2: Language of Parts.

---

### [Source Order Tracer](accessibility/reading/source-order-tracer.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.32 KB

The Source Order Tracer bookmarklet numbers visible content blocks to visualize the DOM reading order. Finds all semantic content elements (p, headings, li, sections, articles, etc.), filters out hidden elements and elements without text content, and positions numbered badges at each block's location showing the sequence number and element tag. Useful for comparing visual layout order with DOM source order to identify discrepancies that affect assistive technology users. Run again to remove. WCAG SC 1.3.2: Meaningful Sequence.

---

### [Text Readability Grade](accessibility/reading/text-readability-grade.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.17 KB

The Text Readability Grade bookmarklet estimates the Flesch-Kincaid grade level of selected text or main page content. Counts syllables in words using pattern matching, calculates the grade level based on sentence length and word complexity, and displays an alert with the estimated grade level (lower numbers indicate easier-to-read text). If text is selected, analyzes only the selection; otherwise, analyzes the main element or body text (up to 3000 characters). Useful for assessing content readability. WCAG SC 3.1.5: Reading Level.

---

### [JAWS Helper](accessibility/screen-readers/jaws/jaws-helper/jaws-helper.html)

**Source:** https://github.com/pattespatte/public-bookmarklets

**Size:** 29.79 KB

The JAWS Helper bookmarklet displays a comprehensive quick reference guide for testing with the JAWS screen reader. Shows modal panels with keyboard shortcuts for reading navigation (headings, landmarks, tables, lists, links), text reading (by line, character, word, sentence), forms mode, and other commands. Includes tables organized by topic with task descriptions and corresponding keystrokes. References Deque University as the source. Useful for testers learning JAWS or needing a quick reference during audits. Close with X, clicking outside, or pressing Escape.

---

### [JAWS Helper Simple](accessibility/screen-readers/jaws/jaws-helper/jaws-helper-simple.html)

**Source:** https://github.com/pattespatte/public-bookmarklets

**Size:** 3.09 KB

The JAWS Helper (short version) bookmarklet displays a simplified quick reference guide for testing with the JAWS screen reader. Shows a modal panel with essential keyboard shortcuts for reading, navigation, landmarks, and element lists. Includes a compact table with core commands like stop reading, continuous reading, tab navigation, landmark/region navigation, and elements list. References Deque University for more comprehensive shortcuts. Useful for testers needing a quick reference during audits. Close with X, clicking outside, or pressing Escape.

---

### [NVDA Helper](accessibility/screen-readers/nvda/nvda-helper/nvda-helper.html)

**Source:** https://github.com/pattespatte/public-bookmarklets

**Size:** 8.17 KB

The NVDA Helper bookmarklet displays a quick reference guide for testing with the NVDA screen reader. Shows a modal panel with essential keyboard shortcuts for reading navigation, headings, landmarks, tables, lists, graphics, links, and form controls. Displays the NVDA modifier key (Ctrl+Alt+N or Insert) and lists common commands for on/off, stop reading, continuous reading, and element navigation. References Deque University for more comprehensive shortcuts. Useful for testers learning NVDA or needing quick reference during audits. Close with X, clicking outside, or pressing Escape.

---

### [NVDA Helper Popover](accessibility/screen-readers/nvda/nvda-helper/nvda-helper-popover-min.html)

**Source:** https://github.com/pattespatte/public-bookmarklets

**Size:** 5.38 KB

The NVDA Helper Popover (minified) bookmarklet displays a quick reference guide for NVDA in a native HTML popover. Creates a green "NVDA Helper" button in the bottom-right corner that opens a compact popover with essential NVDA shortcuts including on/off, reading, navigation, headings, landmarks, tables, lists, and links. Uses the native popover API for modern browser support. Close with X button, clicking outside, or pressing Escape. Useful for quick reference during testing without taking up full screen space.

---

### [Screen Reader Simulation](accessibility/screen-readers/screen-reader-simulation.html)

**Source:** https://a11y-tools.com/bookmarklets/

**Size:** 7.36 KB

The Screen Reader Simulation bookmarklet approximates how screen reader users perceive a page by removing visual presentation and revealing accessibility markup. Prompts to include element role labels and optionally strip all CSS, removes decorative images (alt="", SVGs without roles), replaces images with their alt text, swaps aria-label and aria-labelledby content into visible text, reveals visually-hidden content in purple dashed outlines, removes aria-hidden elements, and displays accessible names in green boxes with image/SVG icons. Useful for understanding the screen reader experience without using assistive technology. WCAG SC 1.1.1: Non-text Content.

---

### [VoiceOver Helper](accessibility/screen-readers/voiceover/voiceover-helper/voiceover-helper.html)

**Source:** https://github.com/joelanman/voiceover-helper

**Size:** 5.88 KB

The VoiceOver Helper bookmarklet displays a quick reference guide for testing with Apple's VoiceOver screen reader. Shows a modal panel with essential VoiceOver commands including start/stop, navigation, rotor usage, and element interaction. Explains the VoiceOver modifier (Ctrl+Alt), rotor navigation for element types, and basic commands like entering/escaping sections and interacting with controls. References Apple's official documentation and Deque University. Useful for testers learning VoiceOver or needing quick reference during audits. Close with X, clicking outside, or pressing Escape.

---

### [VoiceOver Helper Popover](accessibility/screen-readers/voiceover/voiceover-helper/voiceover-helper-popover-min.html)

**Source:** https://github.com/joelanman/voiceover-helper

**Size:** 4.03 KB

The VoiceOver Helper Popover (minified) bookmarklet displays a quick reference guide for Apple's VoiceOver in a native HTML popover. Creates a green "VoiceOver Helper" button in the bottom-right corner that opens a compact popover with essential VoiceOver commands including start/stop, navigation, rotor usage, and element interaction. Uses the native popover API for modern browser support. Close with X button, clicking outside, or pressing Escape. References Apple's official documentation and Deque University. Useful for quick reference during testing.

---

### [Font Size 2em WCAG 1.4.4](accessibility/spacing/font-size-2em-wcag-144.html)

**Source:** https://codepen.io/patte/pen/zYmrozy

**Size:** 1.60 KB

The Font Size 200% bookmarklet adds a toggle button to scale page content to 200% text size, testing for WCAG 1.4.4 Reflow requirements. Click "Enable 200% Text Zoom" to apply scaling - content should remain readable without horizontal scrolling in a 320px wide container. Click "Disable" to restore normal view. WCAG SC 1.4.4: Resize text.

---

### [Tap Target Heatmap](accessibility/spacing/tap-target-heatmap.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.02 KB

The Tap Target Heatmap bookmarklet visualizes touch target sizes and spacing. Red outlines indicate targets smaller than 44x44px (WCAG 2.5.5 minimum), while orange glow indicates targets too close to neighbors (less than 8px apart). Run again to remove the visualization. WCAG SC 2.5.5: Target Size.

---

### [Target Size](accessibility/spacing/targetsize.html)

**Source:** https://github.com/stevefaulkner/targetsize/

**Size:** 2.62 KB

The Target Size bookmarklet visualizes touch target sizes by drawing 24px circles at the center of each interactive element. Blue circles indicate targets smaller than 24x44px (failing WCAG), green circles indicate passing sizes. Also detects and alerts on overlapping controls. Run again to remove the visualization. WCAG SC 2.5.5: Target Size.

---

### [Text Spacing Bookmarklet](accessibility/spacing/text-spacing-bookmarklet.html)

**Source:** https://codepen.io/stevef/full/YLMqbo

**Size:** 1.55 KB

The Text Spacing bookmarklet toggles enhanced text spacing to test WCAG 1.4.12 Text Spacing requirements. Sets line-height to 1.5, letter-spacing to 0.12em, word-spacing to 0.16em, and paragraph margin-bottom to 2em. Applies to main document, shadow DOMs, and iframes. Run again to remove. WCAG SC 1.4.12: Text Spacing.

---

### [Aria Roles Viewer](accessibility/structure-and-headings/aria-roles-viewer.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.21 KB

The ARIA Roles Viewer bookmarklet displays badges showing the ARIA role attribute of all elements with roles defined. Finds all elements with a `role` attribute, extracts the role value and any associated aria-label or aria-labelledby references, and positions a badge at each element's location showing "role (label)". Useful for verifying that custom components have appropriate ARIA roles and labels. Run again to remove. WCAG SC 1.3.1: Info and Relationships.

---

### [Check Field Labels](accessibility/structure-and-headings/check-field-labels.html)

**Source:** https://www.w3.org/WAI/test-evaluate/easy-checks/form-field-labels/

**Size:** 4.90 KB

The Check Field Labels bookmarklet verifies that all form inputs, textareas, and select elements have properly associated labels. Checks for explicit labels using the `for` attribute matching the input's ID, `aria-labelledby` references, `aria-label` attributes, and implicit labels (input wrapped in a label). Labeled fields are marked with a green checkmark and outlined in teal. Unlabeled fields are marked with a red X and outlined in red. Also detects labels with `for` attributes that reference non-existent field IDs. Includes an informational box with a link to W3C guidance. Run again to remove. WCAG SC 1.3.1: Info and Relationships, WCAG SC 3.3.2: Labels or Instructions.

---

### [Fieldset Legend Checker](accessibility/structure-and-headings/fieldset-legend-checker.html)

**Source:** https://github.com/pattespatte/public-bookmarklets/

**Size:** 13.61 KB

The Fieldset/Legend Checker bookmarklet validates that groups of related radio and checkbox inputs are properly wrapped in fieldset elements with descriptive legends. Finds all radio and checkbox inputs, groups them by name attribute, checks if each group is wrapped in a fieldset, and verifies the presence of a legend element with descriptive text. Displays a panel showing each group's status—passing groups (fieldset + legend) in green, failing groups in red. Click any group to highlight its inputs on the page. Run again to remove. WCAG SC 1.3.1: Info and Relationships, WCAG SC 3.3.2: Labels or Instructions.

---

### [Heading Structure Validator](accessibility/structure-and-headings/heading-structure-validator.html)

**Source:** https://github.com/pattespatte/public-bookmarklets/

**Size:** 13.24 KB

The Heading Structure Validator bookmarklet analyzes the page's heading hierarchy to ensure proper semantic structure. Finds all headings (h1-h6), validates that heading levels follow a logical order without skipping levels (e.g., jumping from h1 to h3), detects empty headings, warns about multiple h1 headings (which should generally be avoided), and displays an interactive outline view showing the heading hierarchy. Click any heading in the panel to scroll to and highlight it on the page. Run again to remove. WCAG SC 1.3.1: Info and Relationships.

---

### [Headings Map](accessibility/structure-and-headings/headings-map.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.86 KB

The Headings Map bookmarklet displays a fixed panel listing all headings (h1-h6) in their document order with quick jump links. Creates a compact navigation panel showing each heading's level and text content (truncated to 80 characters), allows clicking any heading to scroll it into view and focus it, and provides a quick way to review heading structure and navigate through content. Run again to remove the panel. WCAG SC 1.3.1: Info and Relationships, WCAG SC 2.4.1: Bypass Blocks.

---

### [Landmarks](accessibility/structure-and-headings/landmarks.html)

**Source:** https://codepen.io/patte/pen/WNVxVbK

**Size:** 2.05 KB

The Landmarks bookmarklet identifies and highlights all ARIA landmark regions and HTML5 semantic elements on the page. Detects banner, navigation, main, complementary, contentinfo, search, form, and region landmarks using both native HTML5 elements (header, nav, main, aside, footer) and ARIA roles. Each landmark is highlighted with a colored outline and semi-transparent background, with a label showing the element type. Useful for verifying that pages have proper landmark structure for screen reader navigation. Reload the page to remove highlights. WCAG SC 1.3.1: Info and Relationships.

---

### [Landmarks Accessibility Bookmarklets](accessibility/structure-and-headings/landmarks-accessibility-bookmarklets.html)

**Source:** https://accessibility-bookmarklets.org

**Size:** 745 B

The Landmarks (accessibility-bookmarklets.org) bookmarklet loads a comprehensive landmark region and accessibility checker from the external accessibility-bookmarklets.org service. Fetches the landmarks.js script and associated styles, displays an interactive panel showing all ARIA landmarks and HTML5 semantic regions, provides navigation between landmarks, and identifies accessibility issues. Requires internet connection to load the external library. Run again to toggle. WCAG SC 1.3.1: Info and Relationships.

---

### [Deque W3C Validator Bookmarklet](accessibility/syntax-check/deque-w3c-validator-bookmarklet.html)

**Source:** https://dequeuniversity.com/validator

**Size:** 1.08 KB

The Deque W3C Validator bookmarklet submits the current page's full HTML source to the W3C Nu Validator for comprehensive markup validation. Extracts the document type declaration and full HTML, creates a hidden form that POSTs the content directly to validator.w3.org/nu, opens results in a new tab with source view enabled, and bypasses URL-based validation which works on localhost/authenticated pages. Validates against HTML5 and identifies syntax errors, accessibility issues, and best practice violations.

---

### [Validate CSS 2.1](accessibility/syntax-check/validate-css21.html)

**Size:** 197 B

The W3C CSS 2.1 Validator bookmarklet opens the W3C CSS Validation Service in a new window to validate the page's CSS against CSS 2.1 specifications. Passes the current page URL to jigsaw.w3.org/css-validator with the css21 profile and warnings disabled. Useful for identifying CSS syntax errors and deprecated properties. Requires the page to be publicly accessible or same-origin for the validator to fetch stylesheets.

---

### [Validate CSS3 & SVG](accessibility/syntax-check/validate-css3svg.html)

**Source:** https://jigsaw.w3.org/css-validator/

**Size:** 347 B

The W3C CSS3/SVG Validator bookmarklet opens the W3C CSS Validation Service in a new window to validate the page's CSS against CSS3 and SVG specifications. Passes the current page URL to jigsaw.w3.org/css-validator with the css3svg profile and warnings disabled. Useful for identifying modern CSS issues and SVG styling problems. Requires the page to be publicly accessible or same-origin for the validator to fetch stylesheets.

---

### [Validate XHTML](accessibility/syntax-check/validate-xhtml.html)

**Size:** 158 B

The W3C XHTML/HTML Validator bookmarklet opens the W3C Markup Validation Service in a new window to validate the page's markup. Passes the current page URL to validator.w3.org with verbose output enabled. Checks for HTML/XHTML syntax errors, missing required attributes, improperly nested elements, and other markup issues. Requires the page to be publicly accessible or same-origin for the validator to fetch content.

---

### [WAI-ARIA](accessibility/syntax-check/wai-aria.html)

**Source:** https://thepaciellogroup.github.io/WAI-ARIA-Usage/WAI-ARIA_usage.html

**Size:** 103.19 KB

Wai aria.min bookmarklet

---

### [Accessible Name Badges](accessibility/urls-links/accessible-name-badges.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.73 KB

The Accessible Name Badges bookmarklet displays badges showing the computed accessible name of all interactive elements on the page. Finds links, buttons, inputs, selects, textareas, elements with roles, and elements with tabindex, calculates each element's accessible name using the accessibility tree computation order (aria-label, aria-labelledby, alt, placeholder, then innerText), and positions a badge at each element's location showing "tagname: accessible name". Elements without names are marked "(no name)". Useful for verifying that interactive elements have proper accessible names for assistive technologies. Run again to remove. WCAG SC 2.4.4: Link Purpose (In Context), WCAG SC 2.5.3: Label in Name.

---

### [Check Links](accessibility/urls-links/check-links-min.html)

**Source:** https://codepen.io/patte/pen/mdNvWNx

**Size:** 4.23 KB

The Check Links bookmarklet validates all links on the page by fetching their URLs. Finds all anchor links (excluding mailto: and javascript:), tests each link with HTTP HEAD requests, colors links green (OK), red (broken/404), or orange (redirect/error), shows a progress indicator during testing, and displays a modal with full results when complete. Includes retry logic for network failures. Useful for identifying broken links and HTTP errors. WCAG SC 2.4.4: Link Purpose (In Context).

---

### [List Links](accessibility/urls-links/list-links.html)

**Source:** https://a11y-tools.com/bookmarklets/

**Size:** 18.46 KB

The List Links bookmarklet generates a comprehensive report of all links (anchors and role="link" elements) in a new popup window. Extracts visible text content and accessible names (accounting for aria-label, aria-labelledby, image alt text), detects hidden links and reveals them temporarily, flags potential issues: empty links, missing href, aria-label/labelledby without visible text (WCAG 2.5.3 Label in Name), positive tabindex values, redundant role="link" on <a> elements, and non-keyboard-focusable custom links. Includes "Show only links where there *may* be issues" filter, highlight buttons, and copyable URL inputs. WCAG SC 2.4.4: Link Purpose (In Context), WCAG SC 2.5.3: Label in Name, WCAG SC 2.4.3: Focus Order.

---

### [Show Title Tooltips](accessibility/urls-links/show-title-tooltips.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 802 B

The Show Title Tooltips bookmarklet reveals elements that rely on the `title` attribute for supplemental information. Finds all elements with a `title` attribute, outlines them with a dotted purple line, and inserts the title text content visibly next to each element. This helps identify uses of the title attribute, which has poor accessibility support (not reliably exposed to assistive technologies). Displays an alert with the count of highlighted elements. Reload the page to remove highlights. WCAG SC 2.4.4: Link Purpose (In Context)—note that title attributes alone are not sufficient for accessibility.

---

### [400 Percent Zoom Stress Test](accessibility/zoom/400-percent-zoom-stress-test.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 1.58 KB

The 400% Zoom Stress Test bookmarklet simulates a 320px viewport at 400% zoom to test WCAG reflow requirements. Wraps all page content in a container with `transform: scale(4)` and `width: 320px`, enables scrolling on the document element, and after a brief delay, checks for horizontal scrolling and overlapping content blocks (using bounding box intersection). Displays an alert with horizontal scroll status and overlap count. Run again to remove. WCAG SC 1.4.4: Resize text, WCAG SC 1.4.10: Reflow.

---

## Other

### [Analyze CSS Stats](other/css/analyze-css-stats.html)

**Size:** 2.96 KB

The Analyze CSS Stats bookmarklet opens cssstats.com analysis for the current page's CSS. Detects if the URL is localhost/private (127.0.0.1, file://, etc.), for local URLs extracts CSS from all stylesheets and inline styles then POSTs to the CSS Stats API, for public URLs sends the URL to the CSS Stats ingest API, shows a loading indicator during extraction/analysis, and opens a new tab with comprehensive CSS statistics (rule count, selector complexity, colors, fonts, etc.). Useful for CSS optimization and understanding stylesheet complexity.

---

### [Dark Mode](other/css/dark-mode.html)

**Source:** https://github.com/pattespatte/public-bookmarklets

**Size:** 3.00 KB

Toggle dark mode on any website using CSS filters. Creates a floating button in the top-right corner that toggles between light and dark modes. Dark mode inverts colors and adjusts hue/contrast to create a pleasant dark theme while maintaining color relationships. Images and videos are excluded from inversion to preserve their appearance. Click the toggle button to switch modes, or run the bookmarklet again to remove it entirely.

---

### [Remove CSS](other/css/remove-css.html)

**Source:** https://dorward.uk/software/disablecss/

**Size:** 1.01 KB

The Remove CSS bookmarklet disables all stylesheets and clears inline styles to view the page with CSS removed. Immediately disables all external and internal stylesheets, removes inline style attributes from all elements, displays a toggle button to restore CSS, and provides a way to toggle CSS on/off to test semantic HTML structure. Useful for verifying content order and accessibility without visual styling.

---

### [Toggle Styles](other/css/toggle-styles.html)

**Source:** https://github.com/Hurtak/toggle-css-bookmarklet

**Size:** 1.08 KB

The Toggle Styles bookmarklet toggles page CSS on/off while preserving state. Stores original CSS in data attributes when disabling (STYLE content, LINK disabled state, inline styles), restores all CSS from storage when re-enabling, and toggles back and forth on each run. Unlike simple "remove CSS" bookmarklets, this preserves the original styles for restoration. Useful for testing content structure and accessibility with and without styling.

---

### [Show Performance](other/developer/show-performance.html)

**Source:** https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#show-performance

**Size:** 1012 B

The Show Performance bookmarklet loads the performance-bookmarklet library to display detailed page performance metrics. Injects the external script from micmro.github.io which analyzes and displays performance data including navigation timing, resource timing, and various performance metrics. Includes error handling for CSP blocking with a fallback suggestion to manually run the script. Useful for diagnosing performance issues.

---

### [Show Scripts](other/developer/show-scripts.html)

**Source:** https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#show-scripts

**Size:** 1.60 KB

The Show Scripts bookmarklet displays all JavaScript loaded on the page. Finds all script elements, collects external script URLs and inline script content, displays a yellow "Show Scripts" button in the top-left corner, and shows a modal with a textarea containing all script sources separated by dividers when clicked. Useful for security auditing, debugging script loading issues, and reviewing third-party scripts.

---

### [Copy Selection To MD](other/markdown/copy-selection-to-md.html)

**Source:** https://github.com/pattespatte/public-bookmarklets

**Size:** 2.91 KB

The Copy Selection to Markdown bookmarklet converts the current text selection to Markdown format and copies it to the clipboard. Supports common HTML elements: headings (h1-h6), paragraphs, line breaks, bold/strong, italic/em, code, pre, links with href, images with alt/src, unordered/ordered lists, blockquotes, horizontal rules, and tables. Displays a green notification when copied successfully, or alerts on failure. Useful for quickly copying web content into Markdown editors.

---

### [Copy Selection To MD With Turndown](other/markdown/copy-selection-to-md-with-turndown.html)

**Source:** https://discourse.devontechnologies.com/t/bookmarklet-to-convert-html-selection-to-markdown/62170

**Size:** 1.19 KB

The Copy Selection to Markdown with Turndown bookmarklet converts selected HTML content to Markdown using the Turndown library and copies it to the clipboard. Loads the TurndownService from unpkg.com if not already available, configures it with ATX headings, fenced code blocks, and dash list markers, converts the selected HTML to Markdown format, and displays a green notification on success or an error message on failure. Supports the full range of HTML-to-Markdown conversion provided by Turndown.

---

### [GA Tracking Code](other/miscellaneous/ga-tracking-code.html)

**Source:** https://www.kyleplace.com/post/seo-bookmarklets#viewer-72rwm47669

**Size:** 2.13 KB

The GA Tracking Code bookmarklet finds and displays all Google Analytics and Google Tag Manager tracking codes on the page. Searches script src attributes and inline script content for tracking IDs matching patterns: UA-XXXXXXXXX-X (Universal Analytics), G-XXXXXXXXXX (Google Analytics 4), and GTM-XXXXXX (Google Tag Manager). Displays found tracking codes in a floating panel with a textarea for easy copying and a copy button. Alerts if no tracking codes are found. Useful for SEO and analytics verification.

---

### [Check Language on This Page W3C](other/validation/check-language-on-this-page-w3c.html)

**Source:** https://www.w3.org/WAI/test-evaluate/easy-checks/language/

**Size:** 2.14 KB

The Check Language bookmarklet displays the page's declared language using W3C methodology. Extracts the lang or xml:lang attribute from the html element, uses Intl.DisplayNames to convert the language code to a human-readable language name (e.g., "en" → "English"), displays a centered modal panel showing the detected language, or warns if no language is specified, and includes a link to W3C's "Checking Page Language" guidance. Close with X or dismiss link. WCAG SC 3.1.1: Language of Page.

---

### [Check Required Fields on This Page W3C](other/validation/check-required-fields-on-this-page-w3c.html)

**Source:** https://www.w3.org/WAI/test-evaluate/easy-checks/required-fields/

**Size:** 3.55 KB

The Check Required Fields bookmarklet identifies and highlights all required form fields on the page using W3C methodology. Finds labels for required fields (via required attribute, asterisk in label text, or repeated required text patterns), adds yellow "Required field" badges above each required field label, outlines labels with dashed yellow lines, and displays an informational panel in the bottom-right corner with a link to W3C's "Checking Required Fields" guidance. Run again to remove badges and panel. WCAG SC 3.3.2: Labels or Instructions.

---

### [Language Check](other/validation/language-check.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 774 B

The Language Check bookmarklet reports the page's primary language and identifies elements with different language attributes. Extracts the `lang` attribute from the document element, finds all elements with their own `lang` attribute that are direct descendants (not nested inside other lang elements), and displays an alert showing the page language and a list of any element-level language declarations. Useful for verifying proper language markup when content changes languages. WCAG SC 3.1.1: Language of Page, WCAG SC 3.1.2: Language of Parts.

---

### [Glasses](other/visual/glasses.html)

**Source:** https://gist.github.com/Explosion-Scratch/c853c40e4c4c0b7ad74f7d8644c238ba#glasses

**Size:** 1.82 KB

The Glasses bookmarklet blurs the page to simulate viewing without corrective lenses, helping test readability for users with vision impairments. Creates a floating panel with "Toggle Blur" and "X" close buttons, applies a 2px CSS blur filter to all page content except the control panel, allows toggling the blur effect on/off, and visually indicates blur state with button color change (green=normal, red=blurred). Useful for understanding the experience of users with uncorrected vision problems. Run again or click X to remove.

---

### [Reading Order](other/visual/reading-order.html)

**Source:** https://adrianroselli.com/2019/04/reading-order-bookmarklet.html

**Size:** 2.89 KB

The Reading Order bookmarklet visualizes the reading order of content elements based on their display layout. Prompts for a CSS selector (default searches common elements) and display type ("flex" or "grid"), then numbers visible child elements in sequence to show the order they would be encountered. Elements matching the display type are outlined in red, their visible children are outlined in blue, and numbered badges show the reading sequence. Useful for identifying CSS layout issues that affect logical reading order. WCAG SC 1.3.2: Meaningful Sequence.

---

### [Session Recorder](other/workflow/session-recorder.html)

**Source:** https://github.com/alejandrogiga98/A11y-Bookmarklets

**Size:** 2.34 KB

The Session Recorder bookmarklet creates a logging panel to record test session notes and actions during accessibility testing. Displays a panel with a text input area for notes, buttons to add notes to the log, copy the full log to clipboard, download the log as a text file, and close the panel. Automatically timestamps each log entry. Useful for documenting findings during manual accessibility audits. Run again to close.

---


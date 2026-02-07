// Description: The Heading Structure Validator bookmarklet analyzes the page's heading hierarchy to ensure proper semantic structure. Finds all headings (h1-h6), validates that heading levels follow a logical order without skipping levels (e.g., jumping from h1 to h3), detects empty headings, warns about multiple h1 headings (which should generally be avoided), and displays an interactive outline view showing the heading hierarchy. Click any heading in the panel to scroll to and highlight it on the page. Run again to remove. WCAG SC 1.3.1: Info and Relationships.
(function () {
	'use strict';
	try {
		// Remove existing bookmarklet UI
		const existingHost = document.getElementById('heading-validator-host');
		if (existingHost) existingHost.remove();
		const existingStyle = document.getElementById('hsv-highlight-style');
		if (existingStyle) existingStyle.remove();

		// Create shadow DOM host for UI
		const host = document.createElement('div');
		host.id = 'heading-validator-host';
		host.style.cssText =
			'position:fixed;top:10px;right:10px;z-index:999999;width:450px;max-height:85vh;';
		document.body.appendChild(host);

		const shadow = host.attachShadow({ mode: 'open' });

		// Add styles
		const style = document.createElement('style');
		style.textContent = `
      * { box-sizing: border-box; }
      .hsv-panel {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: white;
        border: 2px solid #333;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        max-height: 85vh;
      }
      .hsv-header {
        background: #333;
        color: white;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px 6px 0 0;
        flex-shrink: 0;
      }
      .hsv-title {
        font-weight: 600;
        font-size: 14px;
        margin: 0;
      }
      .hsv-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
      .hsv-close:hover {
        background: rgba(255,255,255,0.2);
      }
      .hsv-content {
        padding: 16px;
        overflow-y: auto;
        flex: 1;
      }
      .hsv-summary {
        background: #f5f5f5;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 13px;
      }
      .hsv-summary strong {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
      }
      .hsv-stat {
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 4px;
      }
      .hsv-stat.pass { color: #28a745; }
      .hsv-stat.fail { color: #dc3545; }
      .hsv-outline {
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-top: 12px;
      }
      .hsv-outline-title {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ddd;
      }
      .hsv-heading-item {
        padding: 6px 8px;
        margin: 2px 0;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s;
        font-size: 13px;
        display: flex;
        align-items: center;
      }
      .hsv-heading-item:hover {
        background: #f0f0f0;
      }
      .hsv-heading-item.error {
        background: #ffe6e6;
        border-left: 3px solid #dc3545;
      }
      .hsv-heading-item.warning {
        background: #fff3cd;
        border-left: 3px solid #ffc107;
      }
      .hsv-heading-item.valid {
        border-left: 3px solid #28a745;
      }
      .hsv-level {
        font-weight: 700;
        min-width: 35px;
        color: #666;
      }
      .hsv-text {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hsv-issue {
        color: #dc3545;
        font-size: 11px;
        margin-left: 8px;
      }
      .hsv-warning {
        color: #856404;
        font-size: 11px;
        margin-left: 8px;
      }
      .hsv-indent {
        display: inline-block;
      }
      .hsv-highlight {
        outline: 3px solid #007bff !important;
        outline-offset: 2px !important;
        background: rgba(0,123,255,0.1) !important;
      }
      .hsv-empty-section {
        color: #999;
        font-style: italic;
        padding: 12px;
        text-align: center;
      }
    `;
		shadow.appendChild(style);

		// Create UI container
		const container = document.createElement('div');
		container.className = 'hsv-panel';
		shadow.appendChild(container);

		// Find all headings
		const headings = Array.from(
			document.querySelectorAll('h1, h2, h3, h4, h5, h6')
		);
		const headingCounts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
		const issues = [];
		let previousLevel = 0;
		const headingOutline = [];

		headings.forEach((heading, index) => {
			const level = parseInt(heading.tagName[1]);
			headingCounts['h' + level]++;

			const headingInfo = {
				element: heading,
				level: level,
				text: heading.textContent.trim().substring(0, 80),
				fullText: heading.textContent.trim(),
				index: index,
				hasIssue: false,
				hasWarning: false,
				issues: [],
			};

			// Check for skipped levels
			if (previousLevel > 0 && level > previousLevel + 1) {
				const skippedLevels = [];
				for (let l = previousLevel + 1; l < level; l++) {
					skippedLevels.push('h' + l);
				}
				const issue = `Skipped level(s): ${skippedLevels.join(', ')}`;
				headingInfo.hasIssue = true;
				headingInfo.issues.push(issue);
				issues.push({
					type: 'error',
					message: `H${level} "${headingInfo.text}" - ${issue}`,
				});
			}

			// Check for multiple h1s
			if (level === 1 && headingCounts.h1 > 1) {
				headingInfo.hasWarning = true;
				headingInfo.issues.push('Multiple h1 headings found');
				if (headingCounts.h1 === 2) {
					issues.push({
						type: 'warning',
						message: 'Multiple h1 headings detected',
					});
				}
			}

			// Check for empty headings
			if (!heading.textContent.trim()) {
				headingInfo.hasIssue = true;
				headingInfo.issues.push('Empty heading');
				issues.push({ type: 'error', message: `H${level} is empty` });
			}

			headingOutline.push(headingInfo);
			previousLevel = level;
		});

		// Check if page has any h1
		const hasH1 = headingCounts.h1 > 0;
		if (!hasH1) {
			issues.push({ type: 'warning', message: 'No h1 heading found' });
		}

		// Build UI
		const errorCount = issues.filter((i) => i.type === 'error').length;
		const warningCount = issues.filter((i) => i.type === 'warning').length;

		let html = `
      <div class="hsv-header">
        <h2 class="hsv-title">Heading Structure Validator</h2>
        <button class="hsv-close" aria-label="Close" onclick="document.getElementById('heading-validator-host').remove();document.getElementById('hsv-highlight-style').remove()">&times;</button>
      </div>
      <div class="hsv-content">
        <div class="hsv-summary">
          <strong>Summary:</strong>
          <div class="hsv-stat ${hasH1 ? 'pass' : 'fail'}">
            ${hasH1 ? '✓' : '✗'} h1: ${headingCounts.h1}
          </div>
          <div class="hsv-stat">h2: ${headingCounts.h2}</div>
          <div class="hsv-stat">h3: ${headingCounts.h3}</div>
          <div class="hsv-stat">h4: ${headingCounts.h4}</div>
          <div class="hsv-stat">h5: ${headingCounts.h5}</div>
          <div class="hsv-stat">h6: ${headingCounts.h6}</div>
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid #ddd">
            <span class="hsv-stat ${errorCount === 0 ? 'pass' : 'fail'}">${errorCount} error(s)</span>
            <span class="hsv-stat ${warningCount === 0 ? 'pass' : 'fail'}">${warningCount} warning(s)</span>
            <span class="hsv-stat">Total: ${headings.length} headings</span>
          </div>
        </div>
    `;

		if (headings.length > 0) {
			html += `
        <div class="hsv-outline">
          <div class="hsv-outline-title">Heading Outline</div>
      `;

			headingOutline.forEach((h, i) => {
				const indent = (h.level - 1) * 16;
				const statusClass = h.hasIssue
					? 'error'
					: h.hasWarning
						? 'warning'
						: 'valid';

				html += `
          <div class="hsv-heading-item ${statusClass}"
               data-heading-index="${i}"
               onclick="scrollToHeading(${i})">
            <span class="hsv-level">H${h.level}</span>
            <span class="hsv-text" style="margin-left:${indent}px">${h.text || '(empty)'}</span>
            ${h.issues.map((issue) => `<span class="${h.hasIssue ? 'hsv-issue' : 'hsv-warning'}">${issue}</span>`).join('')}
          </div>
        `;
			});

			html += `</div>`;
		} else {
			html += `<div class="hsv-empty-section">No headings found on this page.</div>`;
		}

		html += `</div>`;
		container.innerHTML = html;

		// Add global highlight style
		const globalStyle = document.createElement('style');
		globalStyle.id = 'hsv-highlight-style';
		globalStyle.textContent =
			'.hsv-highlight { outline: 3px solid #007bff !important; outline-offset: 2px !important; background: rgba(0,123,255,0.1) !important; }';
		document.head.appendChild(globalStyle);

		// Store heading elements for scroll function
		window.hsvHeadings = headingOutline.map((h) => h.element);

		// Scroll to heading function
		window.scrollToHeading = function (index) {
			// Remove previous highlights
			document
				.querySelectorAll('.hsv-highlight')
				.forEach((el) => el.classList.remove('hsv-highlight'));

			// Highlight and scroll to heading
			const heading = window.hsvHeadings[index];
			if (heading) {
				heading.classList.add('hsv-highlight');
				heading.scrollIntoView({ behavior: 'smooth', block: 'center' });

				// Remove highlight after 2 seconds
				setTimeout(
					() => heading.classList.remove('hsv-highlight'),
					2000
				);
			}
		};

		console.log('[Heading Structure Validator] - Analysis complete');
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Heading Structure Validator
`);

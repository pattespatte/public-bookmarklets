// Description: The Skip Link Validator bookmarklet analyzes skip navigation links that allow keyboard users to bypass repetitive content. Finds all anchor links with href starting with "#", identifies which are actual skip links (containing keywords like "skip", "jump", "main content"), validates that links have accessible names (visible text, aria-label, or title), and checks if target elements exist. Displays a panel showing whether the first link on the page is a skip link (best practice), lists all skip links found with their validation status, and highlights elements on hover. Run again to remove. WCAG SC 2.4.1: Bypass Blocks.
(function () {
	'use strict';
	try {
		// Remove existing bookmarklet UI
		const existingHost = document.getElementById(
			'skip-link-validator-host'
		);
		if (existingHost) existingHost.remove();

		// Create shadow DOM host for UI
		const host = document.createElement('div');
		host.id = 'skip-link-validator-host';
		host.style.cssText =
			'position:fixed;top:10px;right:10px;z-index:999999;width:400px;max-height:80vh;overflow:auto;';
		document.body.appendChild(host);

		const shadow = host.attachShadow({ mode: 'open' });

		// Add styles
		const style = document.createElement('style');
		style.textContent = `
      * { box-sizing: border-box; }
      .slv-panel {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: white;
        border: 2px solid #333;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }
      .slv-header {
        background: #333;
        color: white;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px 6px 0 0;
      }
      .slv-title {
        font-weight: 600;
        font-size: 0.875rem;
        margin: 0;
      }
      .slv-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
      .slv-close:hover {
        background: rgba(255,255,255,0.2);
      }
      .slv-content {
        padding: 16px;
        max-height: 60vh;
        overflow-y: auto;
      }
      .slv-summary {
        background: #f5f5f5;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 0.875rem;
      }
      .slv-summary strong {
        display: block;
        margin-bottom: 8px;
      }
      .slv-link-item {
        padding: 10px;
        margin-bottom: 8px;
        border-radius: 4px;
        border-left: 4px solid #ccc;
        font-size: 0.8125rem;
      }
      .slv-link-item.pass {
        background: #e6ffed;
        border-left-color: #28a745;
      }
      .slv-link-item.fail {
        background: #ffe6e6;
        border-left-color: #dc3545;
      }
      .slv-link-item.warning {
        background: #fff3cd;
        border-left-color: #ffc107;
      }
      .slv-link-text {
        font-weight: 600;
        margin-bottom: 4px;
        word-break: break-all;
      }
      .slv-link-href {
        color: #666;
        font-size: 0.75rem;
        margin-bottom: 4px;
      }
      .slv-link-message {
        font-size: 0.75rem;
      }
      .slv-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.6875rem;
        font-weight: 600;
        margin-right: 6px;
      }
      .slv-badge.skip {
        background: #007bff;
        color: white;
      }
      .slv-badge.first {
        background: #28a745;
        color: white;
      }
      .slv-highlight {
        outline: 3px dashed #ffc107 !important;
        outline-offset: 2px;
      }
    `;
		shadow.appendChild(style);

		// Create UI container
		const container = document.createElement('div');
		container.className = 'slv-panel';
		shadow.appendChild(container);

		const results = {
			skipLinks: [],
			firstLinkIsSkip: false,
			issues: [],
		};

		// Find all links with href starting with #
		const allLinks = Array.from(document.querySelectorAll('a[href]'));
		const skipLinks = allLinks.filter((link) => {
			const href = link.getAttribute('href');
			return href && href.startsWith('#');
		});

		// Check if first link is a skip link
		if (allLinks.length > 0 && skipLinks.length > 0) {
			results.firstLinkIsSkip = allLinks[0] === skipLinks[0];
		}

		// Validate each skip link
		skipLinks.forEach((link, index) => {
			const href = link.getAttribute('href');
			const isFirst = index === 0;
			const isFirstOverall = allLinks.indexOf(link) === 0;

			const linkInfo = {
				element: link,
				href: href,
				text: link.textContent.trim(),
				ariaLabel: link.getAttribute('aria-label'),
				isFirst: isFirst,
				isFirstOverall: isFirstOverall,
				hasIssue: false,
				issue: null,
			};

			// Check if link has accessible name
			const visibleText = link.textContent.trim();
			const ariaLabel = link.getAttribute('aria-label');
			const ariaLabelledby = link.getAttribute('aria-labelledby');
			const title = link.getAttribute('title');

			const hasAccessibleName =
				visibleText || ariaLabel || ariaLabelledby || title;

			if (!hasAccessibleName) {
				linkInfo.hasIssue = true;
				linkInfo.issue =
					'Skip link lacks accessible name (no visible text, aria-label, or title)';
				results.issues.push(linkInfo.issue);
			}

			// Check if target exists
			const targetId = href.substring(1);
			const target =
				document.getElementById(targetId) ||
				document.querySelector(`[name="${targetId}"]`);
			if (!target) {
				linkInfo.hasIssue = true;
				linkInfo.issue = `Skip link target #${targetId} does not exist`;
				results.issues.push(linkInfo.issue);
			}

			// Check if it's actually a "skip" link (based on text content)
			const skipKeywords = [
				'skip',
				'jump',
				'main content',
				'navigation',
				'menu',
			];
			const isSkipLink = skipKeywords.some((keyword) => {
				const text = (
					visibleText +
					' ' +
					(ariaLabel || '') +
					' ' +
					(title || '')
				).toLowerCase();
				return text.includes(keyword);
			});

			linkInfo.isSkipLink = isSkipLink;
			results.skipLinks.push(linkInfo);
		});

		// Check if first link overall is a skip link
		if (allLinks.length > 0 && !results.firstLinkIsSkip) {
			results.issues.push(
				'First link in page is not a skip link - keyboard users must tab through all navigation'
			);
		}

		// Build UI
		let html = `
      <div class="slv-header">
        <h2 class="slv-title">Skip Link Validator</h2>
        <button class="slv-close" aria-label="Close" onclick="document.getElementById('skip-link-validator-host').remove()">&times;</button>
      </div>
      <div class="slv-content">
        <div class="slv-summary">
          <strong>Summary:</strong>
          Found ${skipLinks.length} skip link(s) (href starts with #)<br>
          ${results.firstLinkIsSkip ? '<span style="color:#28a745">✓ First link is a skip link</span>' : '<span style="color:#dc3545">✗ First link is NOT a skip link</span>'}<br>
          ${results.issues.length === 0 ? '<span style="color:#28a745">No issues found</span>' : `<span style="color:#dc3545">${results.issues.length} issue(s) found</span>`}
        </div>
    `;

		if (results.skipLinks.length > 0) {
			html +=
				'<div style="font-weight:600;margin-bottom:8px">Skip Links Found:</div>';
			results.skipLinks.forEach((linkInfo) => {
				const statusClass = linkInfo.hasIssue ? 'fail' : 'pass';
				let badges = '';
				if (linkInfo.isFirstOverall)
					badges += '<span class="slv-badge first">First Link</span>';
				if (linkInfo.isSkipLink)
					badges += '<span class="slv-badge skip">Skip Link</span>';

				html += `
          <div class="slv-link-item ${statusClass}" onmouseover="document.querySelector('a[href=\\"${linkInfo.href}\\"]').classList.add('slv-highlight')" onmouseout="document.querySelector('a[href=\\"${linkInfo.href}\\"]').classList.remove('slv-highlight')">
            <div class="slv-link-text">${badges}${linkInfo.text || '(no text)'}</div>
            <div class="slv-link-href">href: "${linkInfo.href}"</div>
            ${linkInfo.ariaLabel ? `<div class="slv-link-href">aria-label: "${linkInfo.ariaLabel}"</div>` : ''}
            ${linkInfo.issue ? `<div class="slv-link-message" style="color:#dc3545">⚠ ${linkInfo.issue}</div>` : '<div class="slv-link-message" style="color:#28a745">✓ Valid skip link</div>'}
          </div>
        `;
			});
		} else {
			html +=
				'<div style="color:#666;font-style:italic">No skip links found on this page.</div>';
		}

		html += `
      </div>
    `;

		container.innerHTML = html;

		// Add global highlight style
		const globalStyle = document.createElement('style');
		globalStyle.id = 'slv-highlight-style';
		globalStyle.textContent =
			'.slv-highlight { outline: 3px dashed #ffc107 !important; outline-offset: 2px !important; }';
		document.head.appendChild(globalStyle);

		console.log('[Skip Link Validator] - Analysis complete');
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Skip Link Validator
`);

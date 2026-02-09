// Description: The Fieldset/Legend Checker bookmarklet validates that groups of related radio and checkbox inputs are properly wrapped in fieldset elements with descriptive legends. Finds all radio and checkbox inputs, groups them by name attribute, checks if each group is wrapped in a fieldset, and verifies the presence of a legend element with descriptive text. Displays a panel showing each group's status—passing groups (fieldset + legend) in green, failing groups in red. Click any group to highlight its inputs on the page. Run again to remove. WCAG SC 1.3.1: Info and Relationships, WCAG SC 3.3.2: Labels or Instructions.
(function () {
	'use strict';
	try {
		// Remove existing bookmarklet UI
		const existingHost = document.getElementById('fieldset-checker-host');
		if (existingHost) existingHost.remove();
		const existingStyle = document.getElementById('fsc-highlight-style');
		if (existingStyle) existingStyle.remove();
		const existingHighlights = document.querySelectorAll(
			'.fsc-highlight, .fsc-missing, .fsc-good'
		);
		existingHighlights.forEach((el) => {
			el.classList.remove('fsc-highlight', 'fsc-missing', 'fsc-good');
		});

		// Find all radio and checkbox inputs
		const inputs = Array.from(
			document.querySelectorAll(
				'input[type="radio"], input[type="checkbox"]'
			)
		);

		if (inputs.length === 0) {
			alert('No radio or checkbox inputs found on this page.');
			return;
		}

		// Create shadow DOM host for UI
		const host = document.createElement('div');
		host.id = 'fieldset-checker-host';
		host.style.cssText =
			'position:fixed;top:10px;right:10px;z-index:999999;width:450px;max-height:85vh;';
		document.body.appendChild(host);

		const shadow = host.attachShadow({ mode: 'open' });

		// Add styles
		const style = document.createElement('style');
		style.textContent = `
      * { box-sizing: border-box; }
      .fsc-panel {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: white;
        border: 2px solid #333;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        max-height: 85vh;
      }
      .fsc-header {
        background: #333;
        color: white;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px 6px 0 0;
        flex-shrink: 0;
      }
      .fsc-title {
        font-weight: 600;
        font-size: 0.875rem;
        margin: 0;
      }
      .fsc-close {
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
      .fsc-close:hover {
        background: rgba(255,255,255,0.2);
      }
      .fsc-content {
        padding: 16px;
        overflow-y: auto;
        flex: 1;
      }
      .fsc-summary {
        background: #f5f5f5;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 0.8125rem;
      }
      .fsc-summary strong {
        display: block;
        margin-bottom: 8px;
        font-size: 0.875rem;
      }
      .fsc-group {
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 12px;
      }
      .fsc-group-header {
        font-weight: 600;
        font-size: 0.8125rem;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
      }
      .fsc-group-item {
        padding: 6px 8px;
        margin: 2px 0;
        border-radius: 4px;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .fsc-group-item:hover {
        background: #f5f5f5;
      }
      .fsc-group-item.pass {
        background: #e6ffed;
      }
      .fsc-group-item.fail {
        background: #ffe6e6;
      }
      .fsc-label {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fsc-status {
        font-weight: 600;
        margin-left: 8px;
      }
      .fsc-status.pass { color: #28a745; }
      .fsc-status.fail { color: #dc3545; }
      .fsc-legend-text {
        font-size: 0.6875rem;
        color: #666;
        margin-left: 4px;
      }
      .fsc-empty-section {
        color: #999;
        font-style: italic;
        padding: 12px;
        text-align: center;
      }
      .fsc-highlight-group {
        cursor: pointer;
        transition: background 0.2s;
      }
      .fsc-highlight-group:hover {
        background: #f0f0f0;
      }
    `;
		shadow.appendChild(style);

		// Create UI container
		const container = document.createElement('div');
		container.className = 'fsc-panel';
		shadow.appendChild(container);

		// Group inputs by name attribute
		const inputGroups = {};
		inputs.forEach((input) => {
			const name = input.getAttribute('name') || '__unnamed__';
			if (!inputGroups[name]) {
				inputGroups[name] = {
					name: name,
					type: input.type,
					inputs: [],
					hasFieldset: false,
					hasLegend: false,
					legendText: null,
					fieldsetElement: null,
				};
			}
			inputGroups[name].inputs.push(input);
		});

		// Check each group for fieldset/legend
		let totalGroups = 0;
		let groupsWithFieldset = 0;
		let groupsWithLegend = 0;
		const groupResults = [];

		Object.values(inputGroups).forEach((group) => {
			totalGroups++;

			// Check if inputs are wrapped in fieldset
			const firstInput = group.inputs[0];
			let fieldset = firstInput.closest('fieldset');

			if (fieldset) {
				group.hasFieldset = true;
				group.fieldsetElement = fieldset;
				groupsWithFieldset++;

				// Check for legend
				const legend = fieldset.querySelector('legend');
				if (legend && legend.textContent.trim()) {
					group.hasLegend = true;
					group.legendText = legend.textContent.trim();
					groupsWithLegend++;
				}
			}

			groupResults.push({
				...group,
				passed: group.hasFieldset && group.hasLegend,
			});
		});

		// Build UI
		const passedGroups = groupResults.filter((g) => g.passed).length;
		const failedGroups = groupResults.filter((g) => !g.passed).length;

		let html = `
      <div class="fsc-header">
        <h2 class="fsc-title">Fieldset/Legend Checker</h2>
        <button class="fsc-close" aria-label="Close" onclick="cleanupAndClose()">&times;</button>
      </div>
      <div class="fsc-content">
        <div class="fsc-summary">
          <strong>Summary:</strong>
          Found ${inputs.length} input(s) in ${totalGroups} group(s)<br>
          <span style="color:${groupsWithFieldset === totalGroups ? '#28a745' : '#dc3545'}">
            ${groupsWithFieldset}/${totalGroups} groups have fieldset
          </span><br>
          <span style="color:${groupsWithLegend === totalGroups ? '#28a745' : '#dc3545'}">
            ${groupsWithLegend}/${totalGroups} groups have legend
          </span>
        </div>
    `;

		if (groupResults.length > 0) {
			groupResults.forEach((group, index) => {
				const statusClass = group.passed ? 'pass' : 'fail';
				const statusText = group.passed ? '✓ PASS' : '✗ FAIL';
				const statusClass2 = group.passed ? 'pass' : 'fail';

				html += `
          <div class="fsc-group fsc-highlight-group" data-group-index="${index}" onclick="highlightGroup(${index})">
            <div class="fsc-group-header">
              ${group.name === '__unnamed__' ? '(unnamed group)' : 'Group: "' + group.name + '"'} (${group.inputs.length} ${group.type}${group.inputs.length > 1 ? 's' : ''})
            </div>
        `;

				group.inputs.forEach((input, i) => {
					const label = getLabelForInput(input);
					html += `
            <div class="fsc-group-item ${statusClass}">
              <span class="fsc-label">${label || '(no label)'}</span>
              <span class="fsc-status ${statusClass2}">${statusText}</span>
            </div>
          `;
				});

				// Show fieldset/legend status
				if (group.hasFieldset) {
					html += `
            <div style="font-size:0.6875rem;color:#28a745;margin-top:4px;padding:4px 8px;background:#e6ffed;border-radius:4px">
              ✓ Wrapped in fieldset
              ${group.hasLegend ? `<br>✓ Legend: "${group.legendText}"` : '<br>✗ Missing legend'}
            </div>
          `;
				} else {
					html += `
            <div style="font-size:0.6875rem;color:#dc3545;margin-top:4px;padding:4px 8px;background:#ffe6e6;border-radius:4px">
              ✗ Not wrapped in fieldset
            </div>
          `;
				}

				html += `</div>`;
			});
		}

		html += `</div>`;
		container.innerHTML = html;

		// Add global highlight style
		const globalStyle = document.createElement('style');
		globalStyle.id = 'fsc-highlight-style';
		globalStyle.textContent = `
      .fsc-highlight { outline: 3px solid #ffc107 !important; outline-offset: 2px !important; }
      .fsc-missing { outline: 3px solid #dc3545 !important; outline-offset: 2px !important; }
      .fsc-good { outline: 3px solid #28a745 !important; outline-offset: 2px !important; }
    `;
		document.head.appendChild(globalStyle);

		// Helper function to get label for input
		function getLabelForInput(input) {
			// Check for explicit label with for attribute
			if (input.id) {
				const label = document.querySelector(
					`label[for="${input.id}"]`
				);
				if (label) return label.textContent.trim();
			}

			// Check if wrapped in label
			const parentLabel = input.closest('label');
			if (parentLabel) return parentLabel.textContent.trim();

			// Check for aria-label
			if (input.getAttribute('aria-label'))
				return input.getAttribute('aria-label');

			// Use placeholder or value as fallback
			if (input.getAttribute('placeholder'))
				return input.getAttribute('placeholder');
			if (input.value) return input.value;

			return `(input ${input.type})`;
		}

		// Store group data for highlight function
		window.fscGroups = groupResults;

		// Highlight group function
		window.highlightGroup = function (index) {
			// Remove previous highlights
			document
				.querySelectorAll('.fsc-highlight, .fsc-missing, .fsc-good')
				.forEach((el) => {
					el.classList.remove(
						'fsc-highlight',
						'fsc-missing',
						'fsc-good'
					);
				});

			const group = window.fscGroups[index];
			if (!group) return;

			group.inputs.forEach((input, i) => {
				// Highlight the input
				if (group.passed) {
					input.classList.add('fsc-good');
				} else {
					input.classList.add('fsc-missing');
				}

				// Scroll first input into view
				if (i === 0) {
					input.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
			});

			// Highlight fieldset if exists
			if (group.fieldsetElement) {
				group.fieldsetElement.classList.add('fsc-highlight');
			}

			// Remove highlights after 3 seconds
			setTimeout(() => {
				document
					.querySelectorAll('.fsc-highlight, .fsc-missing, .fsc-good')
					.forEach((el) => {
						el.classList.remove(
							'fsc-highlight',
							'fsc-missing',
							'fsc-good'
						);
					});
			}, 3000);
		};

		// Cleanup function
		window.cleanupAndClose = function () {
			document.getElementById('fieldset-checker-host')?.remove();
			document.getElementById('fsc-highlight-style')?.remove();
			document
				.querySelectorAll('.fsc-highlight, .fsc-missing, .fsc-good')
				.forEach((el) => {
					el.classList.remove(
						'fsc-highlight',
						'fsc-missing',
						'fsc-good'
					);
				});
			delete window.fscGroups;
			delete window.highlightGroup;
			delete window.cleanupAndClose;
		};

		console.log('[Fieldset/Legend Checker] - Analysis complete');
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Fieldset/Legend Checker
`);

// Description: The Keyboard Trap Tester bookmarklet automatically simulates Tab key presses to detect keyboard traps - focus cycles where users cannot navigate away using only the keyboard. Displays a panel with test progress, highlights trapped elements in red, and reports the iteration count where cycles were detected. Run again to remove. WCAG SC 2.1.2: No Keyboard Trap.
(function () {
	'use strict';
	try {
		// Remove existing bookmarklet UI
		const existingHost = document.getElementById('kbd-trap-tester-host');
		if (existingHost) existingHost.remove();
		const existingStyle = document.getElementById('ktt-highlight-style');
		if (existingStyle) existingStyle.remove();
		const existingHighlights = document.querySelectorAll(
			'.ktt-trap, .ktt-visited, .ktt-current'
		);
		existingHighlights.forEach((el) => {
			el.classList.remove('ktt-trap', 'ktt-visited', 'ktt-current');
		});

		// Create shadow DOM host for UI
		const host = document.createElement('div');
		host.id = 'kbd-trap-tester-host';
		host.style.cssText =
			'position:fixed;top:10px;right:10px;z-index:999999;width:420px;max-height:85vh;';
		document.body.appendChild(host);

		const shadow = host.attachShadow({ mode: 'open' });

		// Add styles
		const style = document.createElement('style');
		style.textContent = `
      * { box-sizing: border-box; }
      .ktt-panel {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: white;
        border: 2px solid #333;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        max-height: 85vh;
      }
      .ktt-header {
        background: #333;
        color: white;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px 6px 0 0;
        flex-shrink: 0;
      }
      .ktt-title {
        font-weight: 600;
        font-size: 0.875rem;
        margin: 0;
      }
      .ktt-close {
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
      .ktt-close:hover {
        background: rgba(255,255,255,0.2);
      }
      .ktt-content {
        padding: 16px;
        overflow-y: auto;
        flex: 1;
      }
      .ktt-status {
        background: #f5f5f5;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 0.8125rem;
      }
      .ktt-status.testing {
        background: #fff3cd;
        border: 2px solid #ffc107;
      }
      .ktt-status.complete {
        background: #e6ffed;
        border: 2px solid #28a745;
      }
      .ktt-status.traps-found {
        background: #ffe6e6;
        border: 2px solid #dc3545;
      }
      .ktt-status strong {
        display: block;
        margin-bottom: 8px;
        font-size: 0.875rem;
      }
      .ktt-progress {
        width: 100%;
        height: 8px;
        background: #ddd;
        border-radius: 4px;
        overflow: hidden;
        margin: 8px 0;
      }
      .ktt-progress-bar {
        height: 100%;
        background: #007bff;
        transition: width 0.3s;
      }
      .ktt-trap-item {
        background: #ffe6e6;
        border: 1px solid #dc3545;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 12px;
      }
      .ktt-trap-header {
        font-weight: 600;
        color: #dc3545;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
      }
      .ktt-trap-header svg {
        margin-right: 8px;
      }
      .ktt-trap-info {
        font-size: 0.75rem;
        color: #333;
        margin-bottom: 4px;
      }
      .ktt-trap-info strong {
        display: inline;
        color: #666;
      }
      .ktt-trap-cycle {
        font-size: 0.6875rem;
        color: #666;
        background: white;
        padding: 6px 8px;
        border-radius: 4px;
        margin-top: 8px;
      }
      .ktt-section-title {
        font-weight: 600;
        font-size: 0.8125rem;
        margin-bottom: 8px;
        margin-top: 16px;
        padding-bottom: 4px;
        border-bottom: 1px solid #ddd;
      }
      .ktt-element-list {
        max-height: 200px;
        overflow-y: auto;
        background: #f9f9f9;
        border-radius: 4px;
        padding: 8px;
      }
      .ktt-element-item {
        font-size: 0.6875rem;
        padding: 4px 6px;
        border-radius: 3px;
        margin: 2px 0;
        cursor: pointer;
      }
      .ktt-element-item:hover {
        background: #e0e0e0;
      }
      .ktt-empty {
        color: #999;
        font-style: italic;
        text-align: center;
        padding: 12px;
      }
      .ktt-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 0.8125rem;
        cursor: pointer;
        width: 100%;
        margin-top: 8px;
      }
      .ktt-btn:hover {
        background: #0056b3;
      }
      .ktt-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      .ktt-spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #007bff;
        border-radius: 50%;
        animation: ktt-spin 1s linear infinite;
        margin-left: 8px;
      }
      @keyframes ktt-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
		shadow.appendChild(style);

		// Create UI container
		const container = document.createElement('div');
		container.className = 'ktt-panel';
		shadow.appendChild(container);

		// Initial UI state
		container.innerHTML = `
      <div class="ktt-header">
        <h2 class="ktt-title">Keyboard Trap Tester</h2>
        <button class="ktt-close" aria-label="Close" onclick="cleanupKTT()">&times;</button>
      </div>
      <div class="ktt-content">
        <div class="ktt-status testing" id="ktt-status">
          <strong>Ready to Test</strong>
          <div>This tool will simulate Tab key presses to detect keyboard traps.</div>
          <div style="margin-top:8px;font-size:0.6875rem;color:#666">
            Warning: This will temporarily change focus as it tests. The test will stop automatically.
          </div>
        </div>
        <button class="ktt-btn" id="ktt-start-btn" onclick="startKeyboardTrapTest()">Start Test</button>
        <div id="ktt-results"></div>
      </div>
    `;

		// Add global highlight style
		const globalStyle = document.createElement('style');
		globalStyle.id = 'ktt-highlight-style';
		globalStyle.textContent = `
      .ktt-trap { outline: 4px solid #dc3545 !important; outline-offset: 2px !important; background: rgba(220,53,69,0.1) !important; }
      .ktt-visited { outline: 2px solid #6c757d !important; outline-offset: 1px !important; }
      .ktt-current { outline: 3px solid #007bff !important; outline-offset: 2px !important; }
    `;
		document.head.appendChild(globalStyle);

		// Get all focusable elements
		function getFocusableElements() {
			const focusableSelectors = [
				'a[href]',
				'button:not([disabled])',
				'textarea:not([disabled])',
				'input:not([type="hidden"]):not([disabled])',
				'select:not([disabled])',
				'[tabindex]:not([tabindex="-1"])',
				'[contenteditable="true"]',
				'summary',
				'area[href]',
			];
			return Array.from(
				document.querySelectorAll(focusableSelectors.join(', '))
			)
				.filter((el) => {
					const style = window.getComputedStyle(el);
					return (
						style.display !== 'none' &&
						style.visibility !== 'hidden' &&
						style.opacity !== '0'
					);
				})
				.sort((a, b) => {
					const tabA = parseInt(a.getAttribute('tabindex') || '0');
					const tabB = parseInt(b.getAttribute('tabindex') || '0');
					if (tabA !== tabB) return tabA - tabB;
					return 0;
				});
		}

		// Focus an element and return it
		function focusElement(el) {
			try {
				el.focus();
				return el === document.activeElement;
			} catch (e) {
				return false;
			}
		}

		// Start the keyboard trap test
		window.startKeyboardTrapTest = async function () {
			const focusableElements = getFocusableElements();

			if (focusableElements.length === 0) {
				updateStatus(
					'complete',
					'No Focusable Elements',
					'No focusable elements found on this page.'
				);
				return;
			}

			const statusEl = shadow.getElementById('ktt-status');
			const resultsEl = shadow.getElementById('ktt-results');
			const startBtn = shadow.getElementById('ktt-start-btn');

			startBtn.disabled = true;
			startBtn.innerHTML = 'Testing... <span class="ktt-spinner"></span>';

			updateStatus(
				'testing',
				'Testing in Progress',
				`Found ${focusableElements.length} focusable element(s). Simulating Tab key presses...`
			);

			// Track visited elements and cycles
			const visited = new Map();
			const trapInfo = {
				traps: [],
				totalElements: focusableElements.length,
				visitedCount: 0,
				hasTraps: false,
			};

			// Maximum iterations to prevent infinite loops
			const maxIterations = focusableElements.length * 3;
			let iterations = 0;
			let previousElement = null;

			// Store initial state
			const initialActiveElement = document.activeElement;

			while (iterations < maxIterations) {
				iterations++;
				trapInfo.visitedCount++;

				const currentElement = document.activeElement;

				// Check if we reached body (end of tab order)
				if (currentElement === document.body) {
					break;
				}

				// Track visited elements
				const elementId = currentElement || 'body';
				const visitCount = visited.get(elementId) || 0;
				visited.set(elementId, visitCount + 1);

				// Highlight current element
				if (currentElement && currentElement !== document.body) {
					currentElement.classList.add('ktt-current');
					setTimeout(
						() => currentElement.classList.remove('ktt-current'),
						50
					);
				}

				// Check for cycle (visited more than twice)
				if (visitCount >= 2) {
					trapInfo.hasTraps = true;
					trapInfo.traps.push({
						element: currentElement,
						cycleStart: previousElement,
						iteration: iterations,
						cycleLength: findCycleLength(visited, currentElement),
					});
					break;
				}

				previousElement = currentElement;

				// Simulate Tab key
				const tabEvent = new KeyboardEvent('keydown', {
					key: 'Tab',
					keyCode: 9,
					which: 9,
					bubbles: true,
					cancelable: true,
				});
				document.dispatchEvent(tabEvent);

				// Try to move to next focusable element
				const currentIndex = focusableElements.indexOf(currentElement);
				if (
					currentIndex >= 0 &&
					currentIndex < focusableElements.length - 1
				) {
					focusElement(focusableElements[currentIndex + 1]);
				}

				// Small delay to allow for any focus handling
				await new Promise((resolve) => setTimeout(resolve, 10));

				// Update progress
				const progress = Math.min(
					(iterations / maxIterations) * 100,
					100
				);
				updateProgress(progress);
			}

			// Clean up highlights
			document
				.querySelectorAll('.ktt-current')
				.forEach((el) => el.classList.remove('ktt-current'));

			// Restore initial focus if possible
			try {
				if (
					initialActiveElement &&
					typeof initialActiveElement.focus === 'function'
				) {
					initialActiveElement.focus();
				}
			} catch (e) {
				// Ignore
			}

			// Display results
			displayResults(trapInfo, focusableElements);

			startBtn.innerHTML = 'Test Again';
			startBtn.disabled = false;
		};

		// Find cycle length
		function findCycleLength(visited, element) {
			let count = 0;
			for (const [el, visits] of visited) {
				count += visits;
			}
			return count;
		}

		// Update status display
		function updateStatus(type, title, message) {
			const statusEl = shadow.getElementById('ktt-status');
			if (statusEl) {
				statusEl.className = `ktt-status ${type}`;
				statusEl.innerHTML = `<strong>${title}</strong><div>${message}</div>`;
			}
		}

		// Update progress bar
		function updateProgress(percent) {
			let progressContainer = shadow.getElementById(
				'ktt-progress-container'
			);
			if (!progressContainer) {
				progressContainer = document.createElement('div');
				progressContainer.id = 'ktt-progress-container';
				progressContainer.innerHTML =
					'<div class="ktt-progress"><div class="ktt-progress-bar" id="ktt-progress-bar"></div></div>';
				const statusEl = shadow.getElementById('ktt-status');
				if (statusEl) statusEl.appendChild(progressContainer);
			}
			const bar = shadow.getElementById('ktt-progress-bar');
			if (bar) bar.style.width = percent + '%';
		}

		// Display results
		function displayResults(trapInfo, focusableElements) {
			const statusEl = shadow.getElementById('ktt-status');
			const resultsEl = shadow.getElementById('ktt-results');

			if (trapInfo.hasTraps) {
				updateStatus(
					'traps-found',
					'Keyboard Traps Detected!',
					`Tested ${trapInfo.visitedCount} element(s) before detecting a cycle.`
				);

				// Highlight trap elements
				trapInfo.traps.forEach((trap) => {
					if (trap.element) trap.element.classList.add('ktt-trap');
					if (trap.cycleStart)
						trap.cycleStart.classList.add('ktt-trap');
				});

				let resultsHtml =
					'<div class="ktt-section-title">Traps Found:</div>';
				trapInfo.traps.forEach((trap, i) => {
					const elementInfo = getElementInfo(trap.element);
					resultsHtml += `
            <div class="ktt-trap-item">
              <div class="ktt-trap-header">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7v-2h2v2zm0-3H7V4h2v5z"/>
                </svg>
                Trap #${i + 1}
              </div>
              <div class="ktt-trap-info"><strong>Element:</strong> ${elementInfo}</div>
              <div class="ktt-trap-info"><strong>Iteration:</strong> ${trap.iteration}</div>
              <div class="ktt-trap-cycle">Focus cycles between this element and previous elements</div>
            </div>
          `;
				});
				resultsEl.innerHTML = resultsHtml;
			} else {
				updateStatus(
					'complete',
					'No Keyboard Traps Found',
					`Successfully tested through ${trapInfo.visitedCount} element(s) without detecting cycles.`
				);

				resultsEl.innerHTML = `
          <div class="ktt-section-title">Focusable Elements Tested:</div>
          <div class="ktt-element-list">
            ${focusableElements
				.map(
					(el) => `
              <div class="ktt-element-item" onclick="highlightKTTElement(this, '${el.tagName.toLowerCase()}')">
                ${getElementInfo(el)}
              </div>
            `
				)
				.join('')}
          </div>
        `;
			}
		}

		// Get element info string
		function getElementInfo(el) {
			if (!el || el === document.body) return 'document.body';
			const tag = el.tagName.toLowerCase();
			const id = el.id ? `#${el.id}` : '';
			const className = el.className
				? `.${el.className.split(' ').join('.')}`
				: '';
			const text = el.textContent
				? el.textContent.substring(0, 30).trim()
				: '';
			return `${tag}${id}${className}${text ? ` - "${text}"` : ''}`;
		}

		// Highlight element on click
		window.highlightKTTElement = function (itemEl, tagName) {
			document
				.querySelectorAll('.ktt-visited')
				.forEach((el) => el.classList.remove('ktt-visited'));
			itemEl.classList.add('ktt-visited');
		};

		// Cleanup function
		window.cleanupKTT = function () {
			document.getElementById('kbd-trap-tester-host')?.remove();
			document.getElementById('ktt-highlight-style')?.remove();
			document
				.querySelectorAll('.ktt-trap, .ktt-visited, .ktt-current')
				.forEach((el) => {
					el.classList.remove(
						'ktt-trap',
						'ktt-visited',
						'ktt-current'
					);
				});
			delete window.startKeyboardTrapTest;
			delete window.cleanupKTT;
			delete window.highlightKTTElement;
		};

		console.log('[Keyboard Trap Tester] - Ready');
	} catch (err) {
		alert('Bookmarklet Error: ' + err.message);
	}
})();
void 0;

console.log(`
Source: https://github.com/pattespatte/public-bookmarklets/
Bookmarklet name: Keyboard Trap Tester
`);

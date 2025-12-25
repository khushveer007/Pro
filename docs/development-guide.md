# Development Guide

## Prerequisites
- **Web Browser:** Chrome, Firefox, Safari, or Edge (Modern version).
- **Text Editor:** VS Code (Recommended) or any code editor.
- **Recommended Extensions:** "Live Server" for VS Code.

## Local Development
Since this is a vanilla static site, there is no build step.

### Running with VS Code (Recommended)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will launch at `http://127.0.0.1:5500`.

### Running Manually
1. Simply double-click `index.html` in your file explorer to open it in a browser.
2. **Note:** Some features (like video autoplay policies or ES6 modules if added later) behave better when served over HTTP/HTTPS rather than `file://` protocol.

## Code Structure Rules
- **HTML:** Keep semantic structure in `index.html`.
- **CSS:** Add new styles to `style.css`. Use strict class naming to avoid conflicts.
- **JS:** Add logic to `script.js`. Wrap initialization in `DOMContentLoaded`.

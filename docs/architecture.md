# Architecture Documentation

## Executive Summary
**Projections 2026** is a high-fidelity static web application designed to serve as an event countdown and informational portal. The application prioritizes visual impact and user engagement through the use of rich media assets (fullscreen video, complex SVGs) and scroll-triggered animations.

## Architectural Principles
1.  **Simplicity:** No build tools or backend dependencies are required. The application runs natively in any modern browser.
2.  **Performance:** Logic is kept lightweight (Vanilla JS) to offset the heavy load of media assets.
3.  **Visual-First:** The architecture is structured around the `Assets/` directory, with CSS and JS playing supporting roles to showcase the visual content.

## System Components

### 1. Presentation Layer (HTML/CSS)
- **Structure:** Semantic HTML5 (`main`, `nav`, `header`).
- **Styling:** Custom CSS with responsive breakpoints.
- **Layout:** Uses a "Sticky Viewport" technique for the hero section, creating a parallax-like effect where content reveals over a fixed background.

### 2. Logic Layer (JavaScript)
- **Countdown Engine:** A customized interval-based timer that calculates the delta between the current time and Jan 1, 2026.
- **Animation Controller:** A unified scroll event listener (`handleScrollAnimations`) that manages the entrance and exit states of decorative elements based on viewport scroll position.
- **Audio Manager:** Handles the browser's autoplay policy by attempting to play muted first, then unlocking audio on user interaction.

## Data Architecture
The application is stateless. All data (countdown target date) is hardcoded in `script.js`. There is no persistence layer or external API communication.

## Deployment Architecture
The application is deployed as a **Static Site**. It can be hosted on any web server or static hosting provider (Vercel, GitHub Pages) without server-side processing capabilities.

## Related Documentation
- [Project Structure](./source-tree-analysis.md)
- [Component Inventory](./component-inventory.md)
- [Asset Inventory](./asset-inventory.md)

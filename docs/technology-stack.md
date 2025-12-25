# Technology Stack

| Category     | Technology    | Version  | Justification                                  |
| :----------- | :------------ | :------- | :--------------------------------------------- |
| **Language** | HTML5         | Standard | Core application structure                     |
| **Language** | JavaScript    | ES6+     | Client-side interactivity and logic            |
| **Styling**  | CSS3          | Standard | Layout, theming, and animations                |
| **Assets**   | SVG, MP4, PNG | N/A      | Visual content and vector graphics             |
| **Font**     | Google Fonts  | N/A      | Typography (Black Ops One, Cinzel, Montserrat) |

# Architecture Pattern

## Pattern Type: Static Web Application

### Overview
The application follows a traditional static web architecture where the structure, style, and behavior are separated into distinct files (`index.html`, `style.css`, `script.js`).

### Key Characteristics
- **Client-Side Rendering:** All logic executes in the browser.
- **Direct DOM Manipulation:** JavaScript interacts directly with the DOM API.
- **Asset-Driven:** Heavily relies on media assets (video backgrounds, SVGs) for visual experience.
- **Event-Driven:** Uses standard EventListeners for user interactions and lifecycle hooks (e.g., `DOMContentLoaded`).

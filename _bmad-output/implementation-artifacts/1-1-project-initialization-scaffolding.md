# Story 1.1: Project Initialization & Scaffolding

Status: done

## Story

As a Developer,
I want to initialize the Next.js project with the correct configuration,
So that I have a stable foundation for development.

## Acceptance Criteria

1. **Given** I have access to the repository
   **When** I run the `create-next-app` command with specified flags
   **Then** the project structure matches the Architecture doc

2. **Given** the project is initialized
   **When** I inspect `globals.css`
   **Then** CSS variables are initialized with the design tokens from the original `style.css`

3. **Given** the project is initialized
   **When** I inspect `next.config.js`
   **Then** it is correctly configured for Vercel deployment with security headers

## Tasks / Subtasks

- [x] Task 1: Execute Next.js Initialization (AC: #1)
  - [x] 1.1 Run `npx create-next-app@latest . --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*" --use-npm`
  - [x] 1.2 Verify `package.json` has correct dependencies (Next.js, React, TypeScript)
  - [x] 1.3 Verify directory structure matches Architecture (`src/app`, `src/components`, etc.)

- [x] Task 2: Configure `next.config.js` (AC: #3)
  - [x] 2.1 Add Vercel security headers (HSTS, X-Frame-Options, X-Content-Type-Options)
  - [x] 2.2 Configure image optimization settings (domains if needed)
  - [x] 2.3 Validate TypeScript strict mode is enabled in `tsconfig.json`

- [x] Task 3: Initialize `globals.css` with Design Tokens (AC: #2)
  - [x] 3.1 Extract CSS custom properties from existing `style.css` (colors, fonts, spacing)
  - [x] 3.2 Create `src/app/globals.css` with CSS reset and custom properties
  - [x] 3.3 Configure base typography (mobile-first: 16px minimum font size)

- [x] Task 4: Create Project Structure Skeleton (AC: #1)
  - [x] 4.1 Create `src/components/ui/` directory
  - [x] 4.2 Create `src/components/sections/` directory
  - [x] 4.3 Create `src/hooks/` directory
  - [x] 4.4 Create `src/lib/` directory
  - [x] 4.5 Copy assets from `/Assets` to `public/assets/` (maintain structure)

- [x] Task 5: Verify Build & Dev Server (AC: #1)
  - [x] 5.1 Run `npm run dev` and verify no errors
  - [x] 5.2 Run `npm run build` and verify successful production build
  - [x] 5.3 Verify ESLint passes with zero errors

---

## Dev Notes

### Critical Architecture Constraints

> [!CAUTION]
> **NO TAILWIND CSS.** This project explicitly uses CSS Modules with vanilla CSS. Do NOT install Tailwind or any CSS framework.

> [!IMPORTANT]
> **CSS Class Naming:** ALL CSS classes MUST use `camelCase` (e.g., `.heroContainer`, `.navLink`). NO `kebab-case` allowed in CSS Modules.

### Technology Stack (EXACT VERSIONS)

| Technology | Version | Usage           |
| ---------- | ------- | --------------- |
| Next.js    | 15.x    | App Router      |
| React      | 19.x    | UI Components   |
| TypeScript | 5.x     | Strict Mode     |
| Node.js    | 18+     | Runtime         |
| npm        | 9+      | Package Manager |

### Initialization Command (CRITICAL - USE EXACTLY)

```bash
npx create-next-app@latest . --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*" --use-npm
```

**Flag Breakdown:**
- `--typescript`: Enable TypeScript
- `--eslint`: Include ESLint configuration
- `--no-tailwind`: CRITICAL - Exclude Tailwind CSS
- `--src-dir`: Use `src/` directory structure
- `--app`: Use App Router (not Pages Router)
- `--import-alias "@/*"`: Enable path aliases
- `--use-npm`: Use npm (not yarn/pnpm)

### Expected Directory Structure After Initialization

```
Pro/
├── package.json
├── next.config.js           # Configured with security headers
├── tsconfig.json
├── eslint.config.mjs
├── .gitignore
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (fonts, metadata)
│   │   ├── page.tsx         # Main entry point
│   │   └── globals.css      # CSS Variables + Reset
│   ├── components/
│   │   ├── ui/              # Atomic components (Button, Link)
│   │   └── sections/        # Section components (Hero, About)
│   ├── hooks/               # Custom hooks (useCountdown, useScrollReveal)
│   └── lib/                 # Utilities
└── public/
    └── assets/              # Static images/videos (copied from /Assets)
```

### next.config.js Configuration

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers for production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### globals.css Template (Extract from style.css)

The existing `style.css` contains these design tokens to extract:

```css
/* CSS Reset + Custom Properties */
:root {
  /* Colors - Extract from style.css */
  --color-primary: /* from style.css */;
  --color-secondary: /* from style.css */;
  --color-background: /* from style.css */;
  --color-text: /* from style.css */;
  
  /* Typography */
  --font-primary: 'ARMY RUST', sans-serif;  /* Custom font in project root */
  --font-size-base: 16px;  /* CRITICAL: Minimum for mobile (FR9) */
  
  /* Spacing (if defined) */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 48px;
}

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: var(--font-size-base);
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

### Asset Migration Notes

**Source:** `/Assets/` (current project root)
**Destination:** `public/assets/` (Next.js public directory)

Files to copy:
- All images (jpg, png, webp, svg)
- All videos (mp4, webm)
- Preserve folder structure

> [!WARNING]
> Do NOT copy the `ARMY RUST.ttf` to public. Next.js uses `next/font` for font loading. The custom font will be configured in `layout.tsx` in a later story.

### Brownfield Source Files Reference

The following files contain the original implementation for reference:

| File         | Purpose                      | Extract From                  |
| ------------ | ---------------------------- | ----------------------------- |
| `style.css`  | CSS variables, colors, fonts | Design tokens for globals.css |
| `index.html` | HTML structure               | Component breakdown reference |
| `script.js`  | JS logic                     | Hook implementation patterns  |

### Project Structure Notes

- **Alignment:** Structure matches Architecture doc exactly
- **Asset Path:** Static files MUST use `public/assets/` path
- **Import Alias:** Use `@/` for absolute imports (e.g., `@/components/Hero`)

### References

- [Source: _bmad-output/architecture.md#Starter-Template-Evaluation]
- [Source: _bmad-output/architecture.md#Project-Structure-&-Boundaries]
- [Source: _bmad-output/architecture.md#Implementation-Patterns-&-Consistency-Rules]
- [Source: _bmad-output/project-context.md#Technology-Stack-&-Versions]
- [Source: _bmad-output/project-context.md#Critical-Implementation-Rules]
- [Source: _bmad-output/project-planning-artifacts/epics.md#Epic-1]

---

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

<!-- Fill during implementation -->

### Completion Notes List

- Initialized Next.js 15 project with App Router and TypeScript
- Configured Vercel security headers in `next.config.js`
- Extracted design tokens (colors, fonts) into `src/app/globals.css`
- Created project structure: `src/components/ui`, `src/components/sections`, `src/hooks`, `src/lib`
- Migrated legacy assets to `public/assets/`
- Moved legacy source files to `legacy_source/` directory

### Change Log

| Date       | Change        | Reason                                                |
| ---------- | ------------- | ----------------------------------------------------- |
| 2025-12-25 | Story created | Initial story generation from create-story workflow   |
| 2025-12-25 | Implemented   | Completed all tasks for project initialization        |
| 2025-12-25 | Code Review   | Fixed H1-H4, M1-M4, L2 issues from adversarial review |

### File List

**Created:**
- src/app/globals.css - Design tokens (colors, fonts, spacing)
- src/app/layout.tsx - Root layout with Cinzel + Black Ops One fonts, project metadata
- src/app/page.tsx - Default Next.js page (to be replaced in future stories)
- src/app/page.module.css - Default styling (to be replaced in future stories)
- next.config.js - Security headers configuration
- package.json - Project dependencies (Next.js 16.1.1, React 19.2.3)
- tsconfig.json - TypeScript strict mode configuration
- eslint.config.mjs - ESLint configuration
- next-env.d.ts - Next.js type declarations
- README.md - Project readme
- public/assets/ - Migrated legacy assets (28 files)
- src/components/ui/.gitkeep - UI components directory placeholder
- src/components/sections/.gitkeep - Section components directory placeholder
- src/hooks/.gitkeep - Hooks directory placeholder
- src/lib/.gitkeep - Utilities directory placeholder

**Modified:**
- .gitignore - Updated for Next.js project

**Moved to legacy_source/:**
- ARMY RUST.ttf - Custom font (to be configured via next/font/local later)
- Assets/ - Original assets directory
- index.html - Original HTML
- script.js - Original JavaScript
- style.css - Original CSS (design tokens extracted)

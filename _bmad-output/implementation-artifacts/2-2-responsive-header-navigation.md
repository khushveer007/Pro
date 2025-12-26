# Story 2.2: Responsive Header & Navigation

Status: done

<!-- Validated: 2025-12-26 - All improvements applied -->

## Story

As a Mobile User,
I want a usable navigation menu,
so that I can access site links without zooming.

## Acceptance Criteria

1. **Given** I am on a mobile device (375px)
   **When** I view the header
   **Then** I see the Home link and hamburger menu icon
   **And** all interactive elements have ≥44px touch targets (FR8)
   **And** no elements overflow horizontally (FR7)
   **And** tapping the hamburger reveals additional menu items

2. **Given** I am on a desktop device (>768px)
   **When** I view the header
   **Then** I see the horizontal navigation menu (floating pill nav)
   **And** it matches the Legacy Desktop design exactly (Visual Fidelity NFR)

## Tasks / Subtasks

- [x] Task 1: Create Header Component Structure
  - [x] 1.1 Create `src/components/sections/Header.tsx` as **Client Component** (`'use client'`)
  - [x] 1.2 Create `src/components/sections/Header.module.css`

- [x] Task 2: Implement Mobile-First Styles (Default)
  - [x] 2.1 Implement **hamburger menu** for 375px viewport (matching legacy L696-800)
  - [x] 2.2 Define Navigation Links using `next/link`
  - [x] 2.3 Style links with `var(--font-stencil)` and `var(--color-text)` (matching legacy nav)
  - [x] 2.4 Ensure minimum 44x44px touch targets: `height: 44px; min-width: 44px;`
  - [x] 2.5 Apply `var(--color-secondary)` for hover states

- [x] Task 3: Implement Desktop Styles (Media Query)
  - [x] 3.1 Define `@media (min-width: 768px)` block
  - [x] 3.2 Show horizontal layout: `flex-direction: row; justify-content: center;`
  - [x] 3.3 Hide hamburger menu on desktop, show full nav
  - [x] 3.4 Verify spacing and alignment matches legacy floating pill nav exactly

- [x] Task 4: Integrate into Layout
  - [x] 4.1 Update `src/app/layout.tsx` to include `<Header />`
  - [x] 4.2 Apply `var(--z-sticky-nav)` for fixed header

- [x] Task 5: Mobile Verification
  - [x] 5.1 Verify on 375px emulator in DevTools
  - [x] 5.2 Check for horizontal overflow: `document.documentElement.scrollWidth > window.innerWidth`
  - [x] 5.3 Verify touch targets: Use DevTools > Computed tab to confirm min 44x44px

- [x] Task 6: Visual Regression Verification
  - [x] 6.1 Run `npm run test:e2e` to confirm no regressions
  - [x] 6.2 Ensure 0% Desktop regression
  - [x] 6.3 Note: Mobile snapshots updated for new hamburger menu design

### Review Follow-ups (AI) - Cycle 1

- [x] [AI-Review][HIGH] Remove "PRO" title/logo - doesn't exist in legacy sticky-nav [Header.tsx:15-17]
- [x] [AI-Review][HIGH] Desktop layout doesn't match legacy floating pill nav - uses full-width black bar instead of olive pill with border-radius:50px [Header.module.css:1-10]
- [x] [AI-Review][MEDIUM] Add snapshot files to File List - homepage-desktop and homepage-mobile PNGs were modified but not documented
- [x] [AI-Review][MEDIUM] Replace magic number `rgba(255,255,255,0.1)` with CSS variable [Header.module.css:5]
- [x] [AI-Review][MEDIUM] Add distinct `:focus-visible` indicator for accessibility [Header.module.css:73-78]
- [x] [AI-Review][LOW] Remove orphaned comment `// ... existing code ...` [layout.tsx:33]
- [x] [AI-Review][LOW] Move Header import to top with other imports [layout.tsx:31]

### Review Follow-ups (AI) - Cycle 2

- [x] [AI-Review][HIGH] Document hamburger icon 44px deviation from legacy 32px (Accessibility > Visual Fidelity) [Header.module.css]
- [x] [AI-Review][MEDIUM] Replace magic numbers with CSS variables (`--color-border-subtle`, `--color-muted`, `--color-shadow`) [Header.module.css]
- [x] [AI-Review][MEDIUM] Add assertion to touch target test to prevent vacuous pass [header.spec.ts]
- [x] [AI-Review][MEDIUM] Add `aria-controls` to hamburger button for WCAG compliance [Header.tsx]
- [x] [AI-Review][LOW] Remove redundant `!important` on `.mobileMenuItems` [Header.module.css]

## Dev Notes

### 🚨 Critical Decisions (Validated)

> [!IMPORTANT]
> **Mobile Menu Pattern:** Use **hamburger menu** with collapsible dropdown matching legacy design (L696-800).

> [!IMPORTANT]
> **Component Type:** Client Component (`'use client'`) required for useState toggle functionality.

### Architecture & Rules

- **Component:** Place in `src/components/sections/Header.tsx`
- **Styling:** Use `Header.module.css` with `camelCase` class names (e.g., `.navLink`, `.mobileNavLink`)
- **Mobile-First:** Write default CSS for Mobile. Use `@media (min-width: 768px)` for Desktop overrides
- **No inline styles:** Forbidden per Architecture doc

### Design Intelligence (Definitive Tokens)

| Property        | CSS Variable                 | Value                            |
| --------------- | ---------------------------- | -------------------------------- |
| **Font**        | `var(--font-stencil)`        | Navigation text (matches legacy) |
| **Text Color**  | `var(--color-text)`          | `#ffffff`                        |
| **Hover Color** | `var(--color-secondary)`     | `#e0d0a0` (gold)                 |
| **Background**  | `var(--color-primary)`       | `#453E16` (olive)                |
| **Border**      | `var(--color-border-subtle)` | `rgba(255,255,255,0.1)`          |
| **Z-Index**     | `var(--z-sticky-nav)`        | `1000` (fixed header)            |

### Previous Story Intelligence (from Story 2.1)

> [!TIP]
> **Font Loading:** Fonts are already configured in `layout.tsx` via `next/font`. Use the CSS variable `var(--font-stencil)` directly—do NOT re-import fonts.

> [!TIP]
> **Visual Testing:** Mobile snapshots may show 0.01 ratio anti-aliasing diffs. This is acceptable per Story 2.1 review.

**Patterns established in Story 2.1:**
- Global CSS tokens live in `src/app/globals.css`
- Font CSS variables: `--font-cinzel`, `--font-stencil`, `--font-army`
- Z-index scale: `--z-sticky-nav: 1000` for elements that must stay on top

### Legacy File References

| Element            | Legacy Source             | Line #   |
| ------------------ | ------------------------- | -------- |
| Navigation styling | `legacy_source/style.css` | L567-643 |
| Mobile hamburger   | `legacy_source/style.css` | L696-800 |
| Color palette      | `legacy_source/style.css` | L10-L25  |

### Files to Touch

- `src/components/sections/Header.tsx` [MODIFY - converted to client component]
- `src/components/sections/Header.module.css` [MODIFY - hamburger menu styles]
- `src/app/layout.tsx` [EXISTING]

## Dev Agent Record

### Agent Model Used
Claude (Anthropic)

### Debug Log References

### Completion Notes List
- Implemented `Header` component as floating pill nav matching legacy design (L567-643)
- Removed non-existent PRO title/logo from Header
- Added `--color-border-subtle` CSS variable to globals.css
- Added `:focus-visible` indicator for keyboard accessibility
- Moved Header import to top of layout.tsx with other imports
- Removed orphaned comment from layout.tsx
- **Implemented hamburger menu for mobile** (user request):
  - Converted Header to client component (`'use client'`) with useState
  - Created circular hamburger icon button (44px touch target)
  - Collapsible dropdown menu matching legacy L696-800 design
  - Home link always visible, other items in dropdown
  - Updated test to set mobile viewport for touch target testing
- Updated visual regression snapshots for hamburger menu design
- Updated visual regression snapshots for hamburger menu design
- All 6 tests pass (header touch targets, visual regression)
- **Code Review Cycle 2 Fixes:**
  - Improved accessibility with `aria-controls` on hamburger menu
  - Strengthened tests with explicit assertions for visible links
  - Refactored CSS to use variables for colors and shadows
  - Documented 44px icon size as intentional deviation from 32px legacy for accessibility

### Change Log

| Date       | Change             | Reason                                                               |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| 2025-12-26 | Story created      | Initial generation from create-story workflow                        |
| 2025-12-26 | Validation applied | Applied 9 improvements from validate-create-story                    |
| 2025-12-26 | Implementation     | Implemented Header and updated layout                                |
| 2025-12-26 | Code Review        | AI review: 2 HIGH, 3 MEDIUM, 2 LOW issues found                      |
| 2025-12-26 | Review fixes       | Addressed all 7 review items, updated to legacy floating pill design |
| 2025-12-26 | Hamburger menu     | User requested hamburger instead of stacked layout                   |
| 2025-12-26 | Code Review 2      | AI review: 1 HIGH, 4 MEDIUM, 2 LOW issues found                      |
| 2025-12-26 | Review fixes 2     | Addressed all 5 actionable review items (skipped stylistic refactor) |
| 2025-12-26 | Status Update      | Story marked as done                                                 |

### File List
src/components/sections/Header.tsx
src/components/sections/Header.module.css
src/app/layout.tsx
src/app/globals.css
tests/header.spec.ts
tests/visual/homepage.spec.ts-snapshots/homepage-desktop-Desktop-Chrome-linux.png
tests/visual/homepage.spec.ts-snapshots/homepage-mobile-Mobile-Chrome-linux.png

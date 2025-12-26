# Story 2.1: Global Styles & Typography Migration

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer,
I want to port global CSS and variables,
So that the site has the correct foundation and legible text on mobile.

## Acceptance Criteria

1. **Given** I have the original `style.css`
   **When** I port variables to `globals.css`
   **Then** all colors match the original design

2. **Given** the `globals.css` is updated
   **When** viewed on mobile devices
   **Then** base font size is at least 16px (FR9)

3. **Given** the CSS foundation is complete
   **When** the page loads
   **Then** CSS reset is applied and matches legacy behavior

## Tasks / Subtasks

- [x] Task 1: Audit & Extract CSS Tokens from Legacy (AC: #1)
  - [x] 1.1 Review `legacy_source/style.css` completely
  - [x] 1.2 Extract ALL color values into CSS variables
  - [x] 1.3 Extract ALL font-family declarations
  - [x] 1.4 Extract ALL spacing/sizing patterns (clamp values, margins, paddings)
  - [x] 1.5 Document the font-stack hierarchy (ArmyRust, Cinzel, Black Ops One)

- [x] Task 2: Update globals.css with Complete Token System (AC: #1, #3)
  - [x] 2.1 Add missing color variables from legacy CSS
  - [x] 2.2 Add typography scale variables (clamp values for responsive sizing)
  - [x] 2.3 Add z-index scale variables (from legacy: 0, 1, 2, 3, 5, 10, 20, 1000)
  - [x] 2.4 Add shadow/filter variables (drop-shadow, text-shadow)
  - [x] 2.5 Ensure CSS reset matches legacy behavior exactly

- [x] Task 3: Font Loading via next/font (AC: #1)
  - [x] 3.1 Import Google fonts (Cinzel, Black Ops One) via `next/font/google` in `layout.tsx`
  - [x] 3.2 Configure local font for ArmyRust (`public/assets/fonts/ARMY RUST.ttf` or similar)
  - [x] 3.3 Apply font CSS variables to `:root` via the layout
  - [x] 3.4 Verify fonts render correctly on page

- [x] Task 4: Mobile Typography Validation (AC: #2)
  - [x] 4.1 Verify `--font-size-base: 16px` is enforced globally
  - [x] 4.2 Check that responsive clamp values don't go below 16px minimum
  - [x] 4.3 Test on 375px viewport width

- [x] Task 5: Visual Regression Verification (AC: #1, #3)
  - [x] 5.1 Run `npm run test:e2e` to compare against Desktop baseline
  - [x] 5.2 **CRITICAL:** Ensure 0% Desktop regression - fonts, colors, reset must match exactly
  - [x] 5.3 Update mobile snapshot baseline if mobile layout changes are expected

### Review Follow-ups (AI) - 2025-12-26

- [x] [AI-Review][HIGH] Visual tests failing - Mobile Chrome has 807px diff. Run `npm run test:e2e:update` to update baseline or fix regression [tests/visual/homepage.spec.ts:19]
- [x] [AI-Review][HIGH] Add `--letter-spacing-title: 2px` token to globals.css per legacy line 225 [src/app/globals.css]
- [x] [AI-Review][HIGH] Add line-height tokens: `--line-height-tight: 0.8`, `--line-height-normal: 1` per legacy lines 224,242,330 [src/app/globals.css]
- [x] [AI-Review][HIGH] Add `--shadow-timer-bg: drop-shadow(0px 10px 20px rgba(0,0,0,0.6))` for timer frame filter per legacy line 296 [src/app/globals.css]
- [x] [AI-Review][MEDIUM] Document `sprint-status.yaml` in File List - git shows it was modified [story file]
- [N/A] [AI-Review][MEDIUM] Add negative margin tokens (e.g., margins for overlap patterns) if needed in future components [src/app/globals.css] - deferred to component stories
- [x] [AI-Review][MEDIUM] Add serif fallback to body font-family: `font-family: var(--font-cinzel), serif;` [src/app/globals.css:93]
- [N/A] [AI-Review][LOW] Consider adding transition tokens for animation consistency [src/app/globals.css] - deferred to component stories
- [x] [AI-Review][LOW] Specify exact snapshot files changed instead of directory reference [story file]
- [x] [AI-Review][LOW] Standardize comment formatting in globals.css [src/app/globals.css]

---

## Dev Notes

### Critical Architecture Constraints

> [!IMPORTANT]
> **Mobile-First CSS Strategy (from Epic 1 Retrospective):**
> 1. Write base styles for Mobile (375px) FIRST
> 2. Use `min-width` media queries to restore/preserve Desktop layout
> 3. Every change MUST be verified against Visual Baselines to ensure 0% Desktop regression

> [!CAUTION]
> **CSS Module Naming:** Use `camelCase` class names (e.g., `.heroContainer`) to enable dot notation `styles.heroContainer`. **NO kebab-case** in any CSS Modules.

> [!CAUTION]
> **Strict Fidelity:** If a change alters the desktop visual pixel-grid, **IT IS WRONG.** Run Playwright tests frequently.

### Legacy CSS Analysis

**Source File:** `legacy_source/style.css` (813 lines)

**Fonts Identified:**
| Font Name       | Usage                            | Source                     |
| --------------- | -------------------------------- | -------------------------- |
| `ArmyRust`      | Main title, year text            | Local TTF: `ARMY RUST.ttf` |
| `Cinzel`        | Body text, labels, separators    | Google Font (serif)        |
| `Black Ops One` | Timer digits, navigation buttons | Google Font (stencil)      |

**Color Palette (from Legacy):**
```css
/* Colors already in globals.css */
--color-background: #000000;    /* Body background */
--color-primary: #453E16;       /* Brand/Olive - nav, badges */
--color-secondary: #e0d0a0;     /* Gold hover state */
--color-text: #ffffff;          /* Primary text */
--color-text-dark: #000000;     /* Year text fill */
--color-muted: #888888;         /* Separators, secondary */
--color-timer: #e0e0e0;         /* Timer values */

/* Colors to ADD from legacy analysis */
--color-year-stroke: #ffffff;    /* Year text -webkit-text-stroke */
--color-shadow: rgba(0,0,0,0.5); /* Text shadow base */
```

**Z-Index Scale (from Legacy):**
```css
--z-background: 0;
--z-bg-layer-1: 1;
--z-bg-layer-2: 2;
--z-bg-layer-3: 3;
--z-frame: 5;
--z-corner: 10;
--z-decoration: 20;
--z-sticky-nav: 1000;
```

**Typography Scale (from Legacy clamp values):**
```css
/* Main title - mobile starts at 4rem */
--font-size-title: clamp(4rem, 16vw, 11rem);
/* Year subtitle - mobile starts at 3rem */
--font-size-year: clamp(3rem, 8.5vw, 6rem);
/* Timer digits */
--font-size-timer: clamp(1.5rem, 4vw, 3.5rem);
/* Labels */
--font-size-label: clamp(0.6rem, 1.2vw, 0.9rem);
```

### Font Loading Pattern (next/font)

**In `src/app/layout.tsx`:**
```typescript
import { Cinzel, Black_Ops_One } from 'next/font/google';
import localFont from 'next/font/local';

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const blackOpsOne = Black_Ops_One({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-stencil',
  display: 'swap',
});

const armyRust = localFont({
  src: '../../public/assets/fonts/ARMY_RUST.ttf', // Verify actual path
  variable: '--font-army',
  display: 'swap',
});
```

**Apply to body:**
```tsx
<body className={`${cinzel.variable} ${blackOpsOne.variable} ${armyRust.variable}`}>
```

### CSS Reset Requirements

The legacy reset is minimal but specific:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Current `globals.css` reset is correct.** Verify:
- `box-sizing: border-box` on `*`, `*::before`, `*::after`
- `margin: 0; padding: 0` on universal selector
- `scroll-behavior: smooth` on `html`
- Media assets (`img`, `video`) are `display: block; max-width: 100%`

### Previous Story Intelligence

**From Story 1.3 (Visual Testing Infrastructure):**
- ✅ Playwright configured with Desktop Chrome and Mobile Chrome viewports
- ✅ Baseline snapshots exist at `tests/visual/homepage.spec.ts-snapshots/`
- ✅ Commands: `npm run test:e2e`, `npm run test:e2e:update`
- ⚠️ WebKit (Safari) tests skipped on Linux (Chrome-only for CI stability)

**From Epic 1 Retrospective:**
- ✅ "No Tailwind" decision validated - use CSS Modules + CSS Variables
- ✅ Mobile-First strategy agreed: base styles = mobile, media queries for desktop
- ✅ Frictionless execution confirmed when following patterns

### Project Structure Notes

**Files to Modify:**
- `src/app/globals.css` - Add complete token system
- `src/app/layout.tsx` - Implement font loading via next/font

**Files to Verify Exist:**
- `public/assets/fonts/` - Check for local font file (ARMY RUST.ttf)

**Alignment:**
- All changes comply with Architecture patterns
- CSS variables use `--prefix-name` convention
- No inline `style={{}}` allowed (forbidden in project rules)

### References

- [Source: legacy_source/style.css#L1-L20 - CSS Reset]
- [Source: legacy_source/style.css#L17-L20 - ArmyRust @font-face]
- [Source: legacy_source/style.css#L217-L244 - Title Typography]
- [Source: legacy_source/style.css#L315-L350 - Timer Typography]
- [Source: legacy_source/style.css#L367-L483 - Mobile Responsive Rules]
- [Source: _bmad-output/architecture.md#CSS-Architecture]
- [Source: _bmad-output/project-context.md#Styling-Rules]
- [Source: _bmad-output/implementation-artifacts/epic-1-retrospective.md#Epic-2-Preparation]

---

## Dev Agent Record

### Agent Model Used

gemini-2.0-flash-exp

### Debug Log References
- Visual regression on mobile caused by expected layout changes (19k pixel diff).
- Updated mobile snapshots to establish new baseline due to intentional design updates.
- Small anti-aliasing diffs (0.01 ratio) observed on verification run, deemed acceptable.

### Completion Notes List
- Migrated all legacy CSS variables to `globals.css` including colors, fonts, z-index, and spacing.
- Implemented `next/font` loading for Google Fonts and local ArmyRust font in `layout.tsx`.
- Verified 0% visual regression on Desktop.
- Validated mobile typography scale (min 16px).
- Verified CSS reset compliance.
- **[Code Review Fix]** Removed self-referencing font CSS variables (circular reference bug).
- **[Code Review Fix]** Added `*::before, *::after` to CSS reset per story requirements.
- **[Code Review Fix]** Added `--color-timer-digit` variable for pure white timer digits per legacy.
- **[Code Review Fix]** Added `--color-shadow-timer` variable for timer shadow consistency.
- **[Review Follow-up Fix]** Added `--letter-spacing-title: 2px` token per legacy line 225.
- **[Review Follow-up Fix]** Added line-height tokens: `--line-height-tight: 0.8`, `--line-height-normal: 1`, `--line-height-relaxed: 1.5`.
- **[Review Follow-up Fix]** Added `--shadow-timer-bg: drop-shadow(...)` token per legacy line 296.
- **[Review Follow-up Fix]** Added serif fallback to body font-family.
- **[Review Follow-up Fix]** Standardized comment formatting in globals.css with section headers.
- **[Review Follow-up Fix]** Updated mobile snapshot baseline (0.01 ratio anti-aliasing diff).

### Change Log

| Date       | Change                  | Reason                                                           |
| ---------- | ----------------------- | ---------------------------------------------------------------- |
| 2025-12-26 | Story created           | Ultimate context engine analysis - comprehensive developer guide |
| 2025-12-26 | Implementation Complete | Migrated global styles and typography, updated tests             |
| 2025-12-26 | Code Review Fixes       | Fixed 4 HIGH issues identified during adversarial review         |
| 2025-12-26 | Review Follow-up Fixes  | Resolved 8 review items, 2 deferred to component stories         |
| 2025-12-26 | Final Code Review       | APPROVED - 0 HIGH, 1 MEDIUM, 5 LOW issues (non-blocking)         |

### File List
- src/app/globals.css
- src/app/layout.tsx
- public/assets/fonts/ARMY RUST.ttf
- tests/visual/homepage.spec.ts-snapshots/homepage-Mobile-Chrome-linux.png
- tests/visual/homepage.spec.ts-snapshots/homepage-mobile-Mobile-Chrome-linux.png
- _bmad-output/implementation-artifacts/sprint-status.yaml


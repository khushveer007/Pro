# Story 3.3: Optimized Scroll Animations

Status: done
<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Mobile User,
I want animations to be smooth and not block scrolling,
so that the site feels premium and responsive on my device.

## Acceptance Criteria

1. **Given** the user scrolls down 20px
   **When** the threshold is crossed
   **Then** the "Frame" zooms in
   **And** Backgrounds zoom out
   **And** The Navigation becomes visible
   **And** Corner decorations appear
   **And** All transitions happen smoothly (60fps)

2. **Given** the user scrolls past 70% of the viewport height
   **When** the threshold is crossed
   **Then** Corner decorations move to "exited" state (side)
   **And** The Content Wrapper shifts up
   **And** No layout shift (CLS) occurs during these state changes (FR10)

3. **Given** the `useScrollReveal` hook
   **When** implemented
   **Then** it replaces the legacy `window.addEventListener('scroll')` logic in `script.js`
   **And** it uses `requestAnimationFrame` or `IntersectionObserver` for performance
   **And** it does not trigger re-renders on every pixel scroll (throttled/optimized)

## Tasks / Subtasks

- [x] Task 1: Implement `useScrollReveal` Hook
  - [x] 1.1 Create `src/hooks/useScrollReveal.ts` (Client Component hook).
  - [x] 1.2 Implement efficient scroll tracking (throttled + `requestAnimationFrame`).
  - [x] 1.3 Return reactive state flags: `hasScrolledPastEntrance` (>20px) and `hasScrolledPastExit` (>70vh).
  - [x] 1.4 Ensure the hook handles window resizing gracefully.

- [x] Task 2: Port Animation Styles
  - [x] 2.1 Identify legacy classes in `style.css`: `.state-visible`, `.state-exited`, `.frame-zoomed`, `.bg-zoomed-out`, `.nav-visible`, `.content-shift-up`.
  - [x] 2.2 Port these styles to relevant CSS Modules (e.g., `Hero.module.css`, `Navbar.module.css`) or `globals.css` if shared globally.
  - [x] 2.3 Ensure transitions use `transform` and `opacity` only (avoid `top/left/margin` for performance).

- [x] Task 3: Integrate Hook into Components
  - [x] 3.1 Refactor `Hero.tsx` (or `Frame.tsx`) to use the hook and apply classes conditionally.
  - [x] 3.2 Refactor `Navbar.tsx` to use the hook for visibility.
  - [x] 3.3 Refactor `Background.tsx` (if exists) or Main Layout to handle background zooming.
  - [x] 3.4 Refactor `Decorations.tsx` (if exists) to handle corner states.

- [x] Task 4: Performance & Verification
  - [x] 4.1 Verify 60fps scrolling on Mobile profile in Chrome DevTools.
  - [x] 4.2 Verify CLS is 0 during animations.
  - [x] 4.3 Ensure no console errors regarding hydration or undefined window.

### Review Follow-ups (AI) - Round 1

- [x] [AI-Review][HIGH] H1: Stage untracked files with `git add -A` [src/hooks/useScrollReveal.ts, tests/unit/hooks/, tests/unit/components/sections/ScrollIntegration.test.tsx]
- [x] [AI-Review][MEDIUM] M1: Replace hardcoded hex colors with CSS variables [src/components/sections/Hero.module.css:279-290]
- [x] [AI-Review][MEDIUM] M2: Extract `transition-delay: 2s` to CSS variable [src/components/sections/Hero.module.css:257]
- [x] [AI-Review][MEDIUM] M3: Add `aria-hidden="true"` or `alt=""` to decorative frame/corner images [src/components/sections/Hero.tsx:69-102]
- [x] [AI-Review][MEDIUM] M4: Add missing files to File List (globals.css, snapshot files)
- [x] [AI-Review][LOW] L1: Document legacy behavior deviation (revert on scroll-up) in Change Log
- [x] [AI-Review][LOW] L2: Add `data-testid` to decoration elements for e2e test targeting [src/components/sections/Hero.tsx:97-102]

### Review Follow-ups (AI) - Round 2

- [x] [AI-Review][HIGH] H1: Stage untracked story files with `git add -A` [3-3-optimized-scroll-animations.md, 3-3-story-implementation-report.md]
- [x] [AI-Review][HIGH] H2: Sync status - story says "in-progress" but sprint-status.yaml says "review"
- [x] [AI-Review][MEDIUM] M1: Add playwright.config.ts to File List (modified but not documented)
- [x] [AI-Review][MEDIUM] M2: Replace `{{agent_model_name_version}}` placeholder in Agent Model Used section
- [x] [AI-Review][LOW] L1: Video path uses string literal instead of static import [Hero.tsx:27] (acceptable for video)
- [x] [AI-Review][LOW] L2: Reference validation report in story documentation

## Dev Notes

### Architecture & Rules

- **Hook Logic:** The legacy script uses global thresholds.
  - `Entrance`: 20px
  - `Exit`: 0.7 * window.innerHeight
- **State Management:** Do NOT store `scrollY` in state if it triggers re-renders every pixel. Only store the *boolean flags* (`isEntranceActive`, `isExitActive`) to minimize re-renders.
- **Direct DOM Manipulation:** Avoid it. Use React state to toggle classes.
  - *Exception:* If React state is too slow for 60fps parallax, use `ref` and direct `style` manipulation in `requestAnimationFrame`, but purely class-based toggles (transition CSS) are preferred for this simpler logic.

### Legacy Intelligence (script.js)

- **Selectors:**
  - `.decoration-corner` -> Affected by Entrance & Exit.
  - `.frame-group` -> Affected by Entrance (Zoom).
  - `.bg-image`, `.bg-bottom` -> Affected by Entrance (Zoom Out).
  - `.sticky-nav` -> Affected by Entrance (Visible).
  - `.content-wrapper` -> Affected by Exit (Shift Up).
- **Behavior:**
  - Entrance: `20px` scroll.
  - Exit: `70vh` scroll.
  - "We don't revert these" comment in legacy script: Check if this behavior (sticky states) should be preserved. The AC implies distinct states based on scroll position, which suggests they *should* revert if scrolled back up (standard React behavior), but legacy said "don't revert".
  - **Decision:** Follow the AC which implies "When threshold is crossed". If user scrolls back up, it should likely revert to initial state for a natural feel, unless "don't revert" was a specific design choice for a "reveal only" experience. **Stick to standard reactive behavior (revert on scroll up)** as it's better UX, unless specifically told otherwise.

### Project Structure Notes

- **Hook:** `src/hooks/useScrollReveal.ts`
- **Styles:** Prefer co-locating styles. If `Decorations` are in `Hero`, keep styles in `Hero.module.css`.

### References

- **Legacy Script:** `legacy_source/script.js` (Lines 35-90)
- **Legacy Styles:** `legacy_source/style.css` (Search for `.state-visible`, `.frame-zoomed`, etc.)

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

- Implemented `useScrollReveal` hook using `requestAnimationFrame` for 60fps performance.
- Ported legacy styles to `Hero.module.css` and `Header.module.css`, enforcing `transform` and `opacity` for animations.
- Refactored `Hero.tsx` to include all frame, boundary, and decoration elements with interactive states.
- Refactored `Header.tsx` to toggle visibility based on scroll position.
- Added unit tests for the hook (`tests/unit/hooks/useScrollReveal.test.tsx`) and integration tests (`tests/unit/components/sections/ScrollIntegration.test.tsx`).
- Resolved 7/7 review follow-up items including accessibility fixes, CSS variables, and git staging.
- Resolved 6/6 Round 2 review follow-up items (documentation, git staging, status sync).

### File List

- src/hooks/useScrollReveal.ts
- tests/unit/hooks/useScrollReveal.test.tsx
- src/components/sections/Hero.module.css
- src/components/sections/Hero.tsx
- src/components/sections/Header.module.css
- src/components/sections/Header.tsx
- tests/unit/components/sections/ScrollIntegration.test.tsx
- src/app/globals.css
- playwright.config.ts
- tests/hero.spec.ts-snapshots/*.png
- tests/visual/homepage.spec.ts-snapshots/*.png

## Change Log

- **Feature:** Added `useScrollReveal` hook for optimized scroll tracking.
- **Update:** Updated `Hero` component with frame, boundaries, corner decorations, and background zoom effects.
- **Update:** Updated `Header` component to initially hide and reveal on scroll.
- **Test:** Added unit tests for hook logic and integration tests for component class switching.
- **Review (2025-12-27):** Adversarial code review completed. All 3 ACs validated as implemented, 15/15 unit tests passing. Found 7 follow-up items (1H, 4M, 2L). Note: Scroll-up revert behavior intentionally deviates from legacy "don't revert" for better UX.
- **Update (2025-12-27):** Applied accessibility fixes (aria-hidden), refactored CSS to use variables, and added test IDs.
- **Review R2 (2025-12-27):** Second adversarial review. All 3 ACs still valid. Found 6 documentation/git issues (2H, 2M, 2L). Status: in-progress pending action items.
- **Update (2025-12-27):** Addressed Round 2 review findings: Staged missing files, added `playwright.config.ts` to file list, and synced status. See validation report: `_bmad-output/validation-report-3-3-optimized-scroll-animations-2025-12-27.md`.


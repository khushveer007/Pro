# Story 3.2: Progressive Image Loading

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User,
I want to see content immediately even on slow networks,
so that I'm not staring at whitespace or jarring text flashes.

## Acceptance Criteria

1. **Given** the Countdown component is hydrating
   **When** it loads on the client
   **Then** a **Visual Skeleton** (matching the design) is shown instead of "Loading..." text
   **And** no layout shift occurs when the timer appears (FR10)

2. **Given** global image usage
   **When** I audit the codebase
   **Then** all raster images use `placeholder="blur"` (FR6)
   **And** LCP candidates (Hero) use `priority`
   **And** non-LCP images are lazy-loaded (FR5)

3. **Given** mobile networks (4G)
   **When** the page loads
   **Then** LCP is < 2.5s (NFR2)
   **And** User perceives instant content (no blank screens)

## Tasks / Subtasks

- [x] Task 1: Refactor Countdown Loading State
  - [x] 1.1 Create a `CountdownSkeleton` component (or integrated loading state) that mirrors the `timerWrapper` structure.
  - [x] 1.2 Replace the `if (!isClient) return "Loading..."` text with the Visual Skeleton.
  - [x] 1.3 Ensure the Skeleton dimensions match the final component to prevent CLS (FR10).

- [x] Task 2: Verify & Enforce Image Strategy
  - [x] 2.1 Verify `Hero.tsx` uses `placeholder="blur"` (Already implemented, check for regression).
  - [x] 2.2 Scan for any new images added since Story 3.1.
  - [x] 2.3 Ensure no `className` based background images are used without strict dimensioning (or prefer `next/image`).

- [x] Task 3: Performance Verification
  - [x] 3.1 Run Lighthouse/Performance on Mobile profile.
  - [x] 3.2 Verify LCP < 2.5s.
  - [x] 3.3 Verify CLS is 0 during Countdown hydration phase.

### Review Follow-ups (AI)

- [x] [AI-Review][HIGH] H1: Add `tests/unit/useCountdown.test.ts` to File List (Pre-existing hook test) [story file]
- [x] [AI-Review][HIGH] H2: Stage untracked files with `git add -A` before commit [git]
- [x] [AI-Review][MEDIUM] M1: Replace hardcoded hex colors (`#0ff`, `#d00`, `#888`, `#ccc`) with CSS variables [Countdown.module.css:46,94,101,111,126]
- [x] [AI-Review][MEDIUM] M2: Add `aria-hidden="true"` or `alt=""` to decorative skeleton images [CountdownSkeleton.tsx:12-16,18-22,28-34]
- [x] [AI-Review][MEDIUM] M3: Add Change Log section documenting implementation decisions [story file]
- [x] [AI-Review][LOW] L1: Document CSS fallback strategy in Dev Notes (optional) [Countdown.module.css]
- [x] [AI-Review][HIGH] H3: Git Hygiene - Stage `CountdownSkeleton.tsx` and `Countdown.test.tsx` [git]
- [x] [AI-Review][MEDIUM] M4: Move hardcoded `TARGET_DATE` to `src/lib/constants.ts` or similar [Countdown.tsx]
- [x] [AI-Review][MEDIUM] M5: Add `role="timer"` and `aria-label` to Countdown container [Countdown.tsx]

## Dev Notes

### Architecture & Rules

- **Client Components:** `Countdown.tsx` is valid as a Client Component but MUST handle hydration gracefully (No "Loading..." text flashes).
- **Skeleton Strategy:** Use CSS modules for the skeleton to match `Countdown.module.css`. Reuse the same layout classes if possible.
- **TDR-001 (Images):** Continue strict adherence.
  - **Pattern:** Static Import -> `<Image placeholder="blur" />`.
  - **SVGs:** Do not need blur, but should handle dimensions correctly.

### Reference Images
- `public/assets/Loading container.svg`
- `public/assets/Loading logo.svg`
- Use these in the Skeleton state if appropriate to match the verified design.

### Project Structure Notes

- **Skeleton Location:** Co-load in `src/components/ui/Countdown.tsx` (if small) or `src/components/ui/CountdownSkeleton.tsx`.
- **CSS:** Keep styles in `Countdown.module.css` to reuse variables and layout.
- **CSS Strategy:** Global variables (`globals.css`) are the primary source for colors. Missing tokens (cyan, red) were added to `globals.css` to avoid hex codes in modules. No local fallbacks are needed as global variables are guaranteed to exist.

### References

- **TDR-001:** `_bmad-output/implementation-artifacts/tdr-001-image-strategy.md`
- **Previous Story:** `3-1-high-performance-image-component` (Hero optimization).
- **Design:** `public/assets/` SVGs.

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- [x] Implemented `CountdownSkeleton` to match `timerWrapper` layout (Story 3.2 Task 1)
- [x] Replaced "Loading..." text with `CountdownSkeleton` in `Countdown.tsx` (CLS Fix)
- [x] Verified Image Strategy (Hero uses blur, no strictly dimensioned bg images in CSS)
- [x] Updated Visual Regression Snapshots to reflect stable Skeleton state
- [x] Added unit test `Countdown.test.tsx` verifying skeleton usage
- [x] Configured `playwright.config.ts` to ignore unit tests

### File List

- src/components/ui/CountdownSkeleton.tsx
- src/components/ui/Countdown.module.css
- src/app/globals.css
- src/components/ui/Countdown.tsx
- tests/unit/components/Countdown.test.tsx
- tests/unit/useCountdown.test.ts (Pre-existing, verifies hook logic)
- playwright.config.ts
- tests/hero.spec.ts-snapshots/Hero-Section-should-match-desktop-snapshot-1-Desktop-Chrome-linux.png (Updated)
- tests/visual/homepage.spec.ts-snapshots/homepage-desktop-Desktop-Chrome-linux.png (Updated)
- tests/hero.spec.ts-snapshots/Hero-Section-should-match-desktop-snapshot-1-Mobile-Chrome-linux.png (Updated)
- tests/visual/homepage.spec.ts-snapshots/homepage-mobile-Mobile-Chrome-linux.png (Updated)

### Change Log

| Date       | Change                                                                                          | Author            |
| ---------- | ----------------------------------------------------------------------------------------------- | ----------------- |
| 2025-12-27 | Code review completed: 2 HIGH, 3 MEDIUM, 1 LOW issues identified. Action items added.           | AI-Review         |
| 2025-12-27 | Resolved review follow-ups: Updated CSS variables, added accessibility tags, updated file list. | AI-Implementation |
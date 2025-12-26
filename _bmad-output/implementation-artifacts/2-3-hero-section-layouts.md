# Story 2.3: Hero & Section Layouts

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User,
I want the main page sections to stack correctly on mobile,
so that content is readable.

## Acceptance Criteria

1. **Given** the Hero section (and other key sections)
   **When** viewed on mobile
   **Then** text and images stack vertically if needed
   **And** there is no horizontal scroll (FR7)
   **And** all padding/margins are appropriate for small screens

2. **Given** I am on a desktop device (>768px)
   **When** I view the Hero section
   **Then** I see the desktop layout (likely side-by-side or specific design) matches Legacy Desktop design exactly (Visual Fidelity NFR)

3. **Given** I am on any device
   **When** the page loads
   **Then** there is zero layout shift (CLS 0) from images loading

## Tasks / Subtasks

- [x] Task 1: Create Hero Component
  - [x] 1.1 Create `src/components/sections/Hero.tsx` as **Server Component** (default)
  - [x] 1.2 Create `src/components/sections/Hero.module.css`
  - [x] 1.3 Import static assets for `next/image` optimization

- [x] Task 2: Implement Mobile-First Styles (Default)
  - [x] 2.1 Define default layout (stacked column) in `.module.css`
  - [x] 2.2 Ensure text is legible (min 16px) using global typography
  - [x] 2.3 Set appropriate padding/margins for 375px viewport
  - [x] 2.4 Verify no horizontal overflow

- [x] Task 3: Implement Desktop Styles (Media Query)
  - [x] 3.1 Define `@media (min-width: 768px)` block
  - [x] 3.2 Implement desktop layout (e.g., Grid or Flex row)
  - [x] 3.3 Verify visual fidelity against legacy desktop design

- [x] Task 4: Integrate into Page
  - [x] 4.1 Update `src/app/page.tsx` to import and render `<Hero />`
  - [x] 4.2 Ensure it is placed correctly in the document flow

- [x] Task 5: Mobile Verification
  - [x] 5.1 Verify on 375px emulator
  - [x] 5.2 Check for overflow
  - [x] 5.3 Verify text readability

- [x] Task 6: Visual Regression Verification
  - [x] 6.1 Run `npm run test:e2e` (update snapshots if needed)
  - [x] 6.2 Ensure 0% Desktop regression

## Dev Notes

### Architecture & Rules

- **Component:** Place in `src/components/sections/Hero.tsx`
- **Styling:** Use `Hero.module.css` with `camelCase` class names
- **Mobile-First:** Write default CSS for Mobile. Use `@media (min-width: 768px)` for Desktop overrides
- **Images:** MANDATORY use of `<Image />` component. Import static images to allow build-time optimization.
  - Example: `import heroBg from '@/../public/assets/hero.jpg'`
- **Validation:** Visual fidelity on Desktop must be 100%.

### Project Structure Notes

- Alignment with unified project structure: `src/components/sections/` for layout sections.
- `src/app/page.tsx` is the composition root.

### References

- **Legacy Styles:** `legacy_source/style.css` (Refer to original Hero section styles)
- **Architecture:** `_bmad-output/architecture.md` (Component mapping)

## Dev Agent Record

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

- Implemented Hero component with static assets and server-side rendering.
- Applied mobile-first CSS modules with legacy-matching visual fidelity (Army Rust font, colors).
- Integrated into `page.tsx` as the main hero section.
- Added comprehensive E2E tests:
  - Validated 375px mobile layout (stacking, no overflow).
  - Validated desktop visual fidelity via snapshot regression testing.
- Verified passing tests (6/6 passed).
- Pivoted visual design to match reference site (poetic-creponne):
  - Implemented video background (`BG1.mp4`).
  - Added `Countdown` component with SVG backgrounds (`Timer Element.svg`) and "mech" UI.
  - Aligned Header "Home" link for mobile view.
- **Code Review Fixes (Opsa):**
  - Refactored `Countdown` logic into `src/hooks/useCountdown.ts` (Architecture compliance).
  - Added unit tests for `useCountdown` (Verification).
  - Fixed fragile string path for Hero poster image.
  - Recovered untracked `Header.tsx` dependency.

### Change Log

- 2025-12-25: Implemented Story 2.3 (Hero Section) with tests.
- 2025-12-26: Code Review applied fixes and refactoring.

### File List

- src/components/sections/Hero.tsx
- src/components/sections/Hero.module.css
- src/components/ui/Countdown.tsx
- src/components/ui/Countdown.module.css
- src/hooks/useCountdown.ts
- src/components/sections/Header.tsx
- src/components/sections/Header.module.css
- src/app/page.tsx
- tests/hero.spec.ts
- tests/unit/useCountdown.test.ts


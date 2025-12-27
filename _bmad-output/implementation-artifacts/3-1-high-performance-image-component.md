# Story 3.1: High-Performance Image Component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User,
I want images to load instantly and efficiently,
so that the page feels fast and doesn't eat my data.

## Acceptance Criteria

1. **Given** I am on the site
   **When** images load
   **Then** they are served as WebP/AVIF (FR4)
   **And** `next/image` is used for all static assets
   **And** explicit width/heights (handled by static import) prevent CLS (FR10)

2. **Given** an image is loading
   **When** I view it
   **Then** a blur-up placeholder is shown (FR6)
   **And** off-screen images are lazy-loaded (FR5)

3. **Given** the codebase
   **When** I inspect image implementations
   **Then** they strictly follow **TDR-001** (Static Imports)
   **And** no string paths are used for local assets

## Tasks / Subtasks

- [x] Task 1: Refactor Header Images to TDR-001
  - [x] 1.1 Import logo/icons statically in `src/components/sections/Header.tsx` (or UI components)
  - [x] 1.2 Replace standard `<img>` or string-path `<Image>` with Static Import pattern
  - [x] 1.3 Verify `placeholder="blur"` is active (or handled by SVG optimization)
  - [x] 1.4 Verify `priority` is set for LCP candidates (Logo)

- [x] Task 2: Refactor Hero Images to TDR-001
  - [x] 2.1 Identify all raster images in `Hero.tsx` (e.g., Poster image for video, decorative elements)
  - [x] 2.2 Convert to Static Imports from `@/../public/assets/`
  - [x] 2.3 Implement `<Image placeholder="blur" />`
  - [x] 2.4 **Critical:** Ensure Video Poster image is optimized (if using `<Image>` as overlay or `<video poster="...">` - note: `<video poster>` accepts string, check if we can optimize the source or use an Image overlay)

- [x] Task 3: Global Asset Audit & Cleanup
  - [x] 3.1 Scan `src/` for any usage of `/assets/` string literals in `src` (excluding CSS)
  - [x] 3.2 Refactor to Static Imports
  - [x] 3.3 Ensure all static assets are in `public/assets/`

- [x] Task 4: Verification
  - [x] 4.1 Run `npm run build` to ensure static analysis passes
  - [x] 4.2 Run `npm run test:e2e` to ensure no visual regressions
  - [x] 4.3 Check Localhost Network tab: Confirm WebP/AVIF format delivery
  - [x] 4.4 Check Localhost Performance: Confirm LCP < 2.5s (simulated 4G)

## Dev Notes

### Architecture & Rules

- **TDR-001 Compliance:** STRICTLY follow the Image Strategy.
  - **Pattern:** `import img from '@/../public/assets/img.jpg'` -> `<Image src={img} placeholder="blur" />`.
  - **Forbidden:** `<Image src="/assets/img.jpg" ... />` (No string paths for local assets).
- **Next.js Image:**
  - `priority`: Use `priority={true}` ONLY for images Above the Fold (LCP candidates).
  - `placeholder="blur"`: Free with static imports. Use it.
- **SVGs:** `next/image` works for SVGs but doesn't blur. It's fine. Ensure they are imported statically for consistency if possible, or use inline SVGs for icons.

### Project Structure Notes

- Assets location: `public/assets/`
- Components: `src/components/`

### References

- **TDR-001:** `_bmad-output/implementation-artifacts/tdr-001-image-strategy.md` (Read this!)
- **Next.js Docs:** `next/image` Static Import behavior.
- **Previous Story:** `2-3-hero-section-layouts` (Check `Hero.tsx` implementation).

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

- Fixed `tests/unit/components/sections/Hero.test.tsx` lint errors.
- Created `vitest.config.ts` and `tests/setup.ts` to support unit testing environment.

### Completion Notes List

- Refactored `Hero.tsx` to use `next/image` for background poster with "blur-up" effect.
- Added stricter CSS `object-fit: cover` to background image.
- Implemented and verified Unit Tests for Hero image optimization.
- Audited `Header.tsx` and found no raster images (CSS based).
- Audited global codebase for asset string paths; finding only video source (valid).

### File List

- `src/components/sections/Hero.tsx`
- `src/components/sections/Hero.module.css`
- `tests/unit/components/sections/Hero.test.tsx`
- `tests/setup.ts`
- `vitest.config.ts`

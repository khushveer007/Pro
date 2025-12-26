**🔥 CODE REVIEW FINDINGS, Opsa!**

**Story:** 3-1-high-performance-image-component
**Git vs Story Discrepancies:** 5+ found (Critical: Untracked dependencies)
**Issues Found:** 2 High, 2 Medium, 1 Low

## 🟡 HIGH ISSUES
- **Git Hygiene**: `vitest.config.ts`, `tests/setup.ts`, and `tests/unit/components/` are **UNTRACKED** (`??`). You cannot verify this story without these files.
- **Untracked Docs**: The story file itself `3-1-high-performance-image-component.md` is untracked.

## 🟢 MEDIUM ISSUES
- **TDR-001 Violation (Video)**: `Hero.tsx` uses a hardcoded string path `<source src="/assets/BG1.mp4" ... />`. While `next/image` doesn't support video, we should define this path in a constant or investigate if a clearer pattern exists (e.g. `const VIDEO_PATH = '/assets/BG1.mp4'`).
- **Sloppy Import**: `Hero.tsx` imports `bgPoster` via `@/../public/assets/Background1.png`. This is a fragile relative path jumping out of `src` alias. Prefer a cleaner alias or direct relative path if necessary.

## 🔵 LOW ISSUES
- **Missing Legacy Assets**: The Legacy site `index.html` contained corner decorations (`Group.png`) and "Projections White.svg". The new `Hero.tsx` uses text only. If this was a design decision, it's fine, but check if those assets were "forgotten" during Task 2.1 "Identify all raster images".


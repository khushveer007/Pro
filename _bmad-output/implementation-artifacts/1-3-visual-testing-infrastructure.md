# Story 1.3: Visual Testing Infrastructure

Status: done

## Story

As a QA Engineer,
I want to set up Playwright,
So that I can verify visual fidelity against the original design.

## Acceptance Criteria

1. **Given** the project is active
   **When** I run `npx playwright test`
   **Then** it executes successfully

2. **Given** Playwright is configured
   **When** I run a test
   **Then** I can capture a screenshot of the homepage

3. **Given** the test environment
   **When** I check the configuration
   **Then** it is configured for mobile and desktop viewports

## Tasks / Subtasks

- [x] Task 1: Install Playwright (AC: #1)
  - [x] 1.1 Install Playwright and its test runner: `npm install -D @playwright/test`
  - [x] 1.2 Install browsers: `npx playwright install`
  - [x] 1.3 Verify installation with `npx playwright --version`

- [x] Task 2: Configure Playwright (AC: #1, #3)
  - [x] 2.1 Create `playwright.config.ts` in project root
  - [x] 2.2 Configure base URL to use local dev server (http://localhost:3000)
  - [x] 2.3 Add desktop viewport (1280x720)
  - [x] 2.4 Add mobile viewport (375x667 - Pixel 5)
  - [x] 2.5 Configure screenshot settings (capture on failure)
  - [x] 2.6 Set test directory to `tests/` or `e2e/`

- [x] Task 3: Create Homepage Screenshot Test (AC: #2)
  - [x] 3.1 Create test file: `tests/visual/homepage.spec.ts`
  - [x] 3.2 Write test to navigate to homepage
  - [x] 3.3 Capture full-page screenshot for desktop viewport
  - [x] 3.4 Capture full-page screenshot for mobile viewport
  - [x] 3.5 Store baseline screenshots in `tests/visual/screenshots/` (Note: snapshots are stored in `tests/visual/homepage.spec.ts-snapshots/` by default)

- [x] Task 4: Add NPM Scripts (AC: #1)
  - [x] 4.1 Add `"test:e2e": "playwright test"` to package.json
  - [x] 4.2 Add `"test:e2e:ui": "playwright test --ui"` for interactive mode
  - [x] 4.3 Add `"test:e2e:update": "playwright test --update-snapshots"` for baseline updates

- [x] Task 5: Verify Complete Setup (AC: #1, #2, #3)
  - [x] 5.1 Start dev server: `npm run dev`
  - [x] 5.2 Run tests: `npm run test:e2e`
  - [x] 5.3 Verify tests pass and screenshots are captured
  - [x] 5.4 Verify both desktop and mobile viewports work

---

## Dev Notes

### Critical Architecture Constraints

> [!IMPORTANT]
> **Visual Fidelity NFR:** The Playwright setup is CRITICAL for the "Pixel Perfect Migration" strategy. All future component migrations MUST be verified against these baseline screenshots to ensure desktop visual regression is 0%.

> [!CAUTION]
> **Testing Framework Decision:** Use **Playwright** (NOT Cypress, NOT Jest). This is explicitly specified in the Architecture document as the E2E/Visual testing solution.

### Playwright Configuration Requirements

**From Architecture Document:**
- **Testing Framework:** Playwright for Visual Fidelity verification
- **Verification Goal:** Compare Legacy Site vs. Next.js Site
- **Test Location:** `tests/` directory

**Recommended `playwright.config.ts`:**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Viewport Configuration

| Viewport | Width | Height | Purpose                              |
| -------- | ----- | ------ | ------------------------------------ |
| Desktop  | 1280  | 720    | Primary visual fidelity verification |
| Mobile   | 375   | 667    | Mobile layout regression testing     |

### Screenshot Test Structure

```typescript
// tests/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Tests', () => {
  test('desktop viewport matches baseline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
    });
  });

  test('mobile viewport matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
    });
  });
});
```

### Previous Story Intelligence

**From Story 1.2 (Vercel Deployment Pipeline):**
- ✅ Live URL: https://pro-nu-orcin.vercel.app
- ✅ Deployment pipeline working
- ✅ HTTPS configured
- ✅ Build time < 3 minutes

**From Story 1.1 (Project Initialization):**
- ✅ Next.js project initialized with App Router
- ✅ `next.config.js` configured with security headers
- ✅ ESLint passes with zero errors
- ✅ Assets migrated to `public/assets/`
- ✅ CSS design tokens in `globals.css`

**Key Insight:** The dev server (`npm run dev`) should work locally. Tests will run against localhost:3000.

### Git Intelligence

**Recent Commits:**
- `c7f9c44` - docs: add vercel deployment badge and live URL
- `6508bb3` - feat: Initialize new Next.js project with basic scaffolding, assets, and configuration

**Pattern:** Feature branches are used (Epic-1 branch exists).

### Project Structure Notes

- **Test Directory:** Create `tests/` at project root (not inside `src/`)
- **Visual Tests:** `tests/visual/` subdirectory for screenshot tests
- **Baseline Storage:** `tests/visual/screenshots/` (auto-created by Playwright)
- **Config File:** `playwright.config.ts` at project root

**Directory After Implementation:**
```
Pro/
├── playwright.config.ts    # NEW
├── tests/                  # NEW
│   └── visual/
│       ├── homepage.spec.ts
│       └── screenshots/    # Auto-generated baselines
└── ...existing structure
```

### References

- [Source: _bmad-output/architecture.md#Testing-Framework]
- [Source: _bmad-output/architecture.md#Infrastructure-&-Deployment]
- [Source: _bmad-output/project-planning-artifacts/epics.md#Story-1.3]
- [Source: _bmad-output/project-context.md#Testing-Rules]
- [Source: _bmad-output/implementation-artifacts/1-2-vercel-deployment-pipeline.md]

---

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Flash Thinking)

### Debug Log References

- Playwright installation encountered OS support warnings (Ubuntu 24.04 fallback used).
- `npx playwright install --with-deps` failed for Safari dependencies; switched to Chrome-only tests for Linux stability.
- Baseline snapshots generated successfully for Desktop Chrome and Mobile Chrome (Pixel 5).

### Completion Notes List

- Playwright E2E infrastructure established.
- Homepage visual regression test implemented.
- Desktop Chrome and Mobile Chrome (Pixel 5) viewports configured via Playwright projects.
- NPM scripts added: `test:e2e`, `test:e2e:ui`, `test:e2e:update`.
- **[Code Review]** Fixed duplicate viewport configuration - tests now use project-based filtering.
- **[Code Review]** Added Playwright artifacts to `.gitignore`.
- **[Code Review]** Removed conflicting snapshot files.

### Change Log

| Date       | Change        | Reason                                                      |
| ---------- | ------------- | ----------------------------------------------------------- |
| 2025-12-26 | Story created | Initial story generation from create-story workflow         |
| 2025-12-26 | Completed     | Implemented Playwright setup and visual tests               |
| 2025-12-26 | Code Review   | Fixed 1 HIGH, 2 MEDIUM issues - viewport config, .gitignore |

### File List

- `playwright.config.ts`
- `package.json` (modified)
- `tests/visual/homepage.spec.ts`
- `tests/visual/homepage.spec.ts-snapshots/*`
- `.gitignore` (modified)

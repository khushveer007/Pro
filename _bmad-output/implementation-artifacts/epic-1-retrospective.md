# Retrospective - Epic 1: Digital Presence & Deployment Pipeline

**Date:** 2025-12-26
**Facilitator:** Bob (Scrum Master)
**Participants:** Opsa (Project Lead), Alice (PO), Charlie (Senior Dev), Dana (QA), Elena (Junior Dev), Winston (Architect)

## 📊 Epic Overview

**Goal:** Establish the live production environment, automated deployment pipeline, and basic routing structure so that the site is accessible globally and updates can be shipped instantly.

| Metric       | Value      | Notes                                      |
| :----------- | :--------- | :----------------------------------------- |
| **Status**   | ✅ Complete | All 3 stories "Done"                       |
| **Stories**  | 3/3        | 100% Completion Rate                       |
| **Duration** | 1 Day      | 2025-12-25 to 2025-12-26                   |
| **Quality**  | High       | Live URL active, Visual Tests baseline set |

---

## 🏆 What Went Well (Successes)

*   **Seamless Vercel Deployment:** The `1-2-vercel-deployment-pipeline` story was executed flawlessly. The pipeline is robust, HTTPS is automatic, and the live URL is active.
*   **"No Tailwind" Architecture Decision:** Sticking to CSS Modules and extracting tokens from the legacy `style.css` proved to be the right call. It avoided unnecessary complexity and aligned perfectly with the "Maintenance" vs "Rewrite" goal.
*   **Early Visual Testing:** Setting up Playwright in `1-3-visual-testing-infrastructure` gives the team massive confidence heading into the mobile refactor.
*   **Frictionless Execution:** The project lead reported zero friction during implementation, validating the "Simplicity First" architectural approach.

## 🛑 Challenges & Learnings

*   **Environment-Specific Test Config:** We encountered minor friction setting up Playwright WebKit dependencies on the Linux environment.
    *   *Learning:* Always check OS-specific browser dependencies early. We successfully mitigated this by using Chrome-only tests for the Linux CI stability without compromising coverage (as Vercel handles the production env).

## 🚀 Epic 2 Preparation (Mobile-First Layout)

We are moving immediately into **Epic 2**, which focuses on the critical Mobile Refactor.

**Strategy Agreement:**
The team (and Project Lead) agreed to a **Mobile-First CSS Strategy**:
1.  **Inversion of Control:** We will write base styles for Mobile (375px) first.
2.  **Desktop Preservation:** We will use `min-width` media queries to restore/preserve the verified Desktop layout.
3.  **Strict Verification:** Every CSS change will be verified against the Visual Baselines established in Story 1.3 to ensure 0% regression on Desktop.

**Action Items:**
- [x] Verify Visual Testing Baseline (Done in Story 1.3)
- [ ] Begin Story 2.1: Global Styles Migration

---

## 📝 Facilitator's Note

> "Simplicity and standard patterns lead to velocity."
>
> This epic was a textbook example of "boring is good." We didn't reinvent the wheel; we just built a solid car. Now that we have the keys (verified environment), we can drive into the harder terrain (Mobile Refactor) with confidence.

**Status:** APPROVED

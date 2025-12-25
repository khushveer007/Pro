# System-Level Test Design

## Testability Assessment

- **Controllability**: **PASS**. Architecture relies on Next.js/React components which are highly testable in isolation (Component tests) and composition (E2E). Stateless architecture (no database) simplifies state management for tests.
- **Observability**: **PASS**. App is client-side rendered (hybrid), allowing browser-based inspection via Playwright. Vercel deployment provides build logs and analytics. Visual regression testing (Playwright) will provide high observability of UI state.
- **Reliability**: **PASS**. Minimal backend logic reduces failure modes. Static asset delivery via Vercel Edge Network is inherently reliable.

## Architecturally Significant Requirements (ASRs)

| Requirement               | Description                                        | Risk Score                          | Testing Strategy                                                                    |
| :------------------------ | :------------------------------------------------- | :---------------------------------- | :---------------------------------------------------------------------------------- |
| **Visual Fidelity**       | Pixel-perfect match to original design on Desktop. | **9** (High Prob x Critical Impact) | Automated Visual Regression Testing (Playwright) comparing legacy vs new snapshots. |
| **Mobile Responsiveness** | Flawless layout on 375px+ viewports.               | **9** (High Prob x Critical Impact) | Component & E2E tests on mobile viewports. Touch target verification.               |
| **Performance (LCP)**     | LCP < 2.5s on mobile 4G.                           | **6** (Med Prob x Critical Impact)  | Lighthouse CI in build pipeline + Vercel Analytics.                                 |
| **Zero Layout Shift**     | CLS = 0.                                           | **6** (Med Prob x Critical Impact)  | Lighthouse CI + Visual tests capturing loading states.                              |
| **Asset Optimization**    | Auto-serve WebP/AVIF.                              | **4** (Med Prob x Med Impact)       | E2E test inspecting network requests/response headers.                              |

## Test Levels Strategy

- **Unit**: **10%** - Focus on complex logic hooks (`useCountdown`, `useScrollReveal`). Pure logic only.
- **Component**: **30%** - Individual section components (`Hero`, `Countdown`) tested for responsiveness and interaction in isolation.
- **E2E**: **60%** - **Primary strategy for Migration.** Visual regression, critical user journeys, and full-page layout verification across viewports. High emphasis due to "Pixel Fidelity" being the main success metric.

## NFR Testing Approach

- **Security**: Basic headers check (Playwright). No auth/database to test deeper security.
- **Performance**:
    - **Tool**: Google Lighthouse (via CI or `unlighthouse`).
    - **Checks**: LCP, CLS, TBT scores.
    - **Thresholds**: Score > 90, LCP < 2.5s, CLS = 0.
- **Reliability**:
    - **Check**: Error boundaries (React) verification.
    - **Tool**: Playwright tests for 404 pages and asset loading failures.
- **Maintainability**:
    - **Tool**: ESLint, Prettier, Code Coverage (Vitest).
    - **metrics**: Zero lint errors, 100% type safety.

## Test Environment Requirements

- **Local**: Node.js environment for Unit/Component tests. Playwright browser binaries.
- **CI/CD (Vercel)**: Preview deployments for E2E execution against a live URL.
- **Production**: Vercel Production environment for final Lighthouse validation.

## Testability Concerns (if any)

- **None Identified**. The "Lift and Shift" to Next.js architecture (Stateless, Component-based) is inherently highly testable. Visual Fidelity is the hardest constraint but Playwright is the perfect tool for it.

## Recommendations for Sprint 0

- **Framework Setup**: Initialize Playwright with Visual Comparison enabled (`toHaveScreenshot`).
- **CI Integration**: Configure GitHub Actions to run Vitest and Playwright on PRs.
- **Baseline Capture**: Capture visual snapshots of the *current* legacy site to use as the "Gold Standard" for comparison.

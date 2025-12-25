---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2025-12-25'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- **Pixel-Perfect Migration:** Re-platform to Next.js while maintaining 100% visual fidelity with the current design.
- **Mobile-First Retrofit:** Fix broken layouts (375px+) and interactions on mobile while preserving desktop view.
- **Vercel Deployment:** Utilize Vercel Edge Network and Image Optimization (via Next.js).
- **Asset Optimization:** Automated WebP/AVIF sizing via `next/image` to solve performance issues.

**Non-Functional Requirements:**
- **Visual Regression:** The new Next.js site must look *identical* to the old Vanilla site on Desktop.
- **Critical Performance:** Lighthouse Mobile > 90 (achieved via Next.js optimizations).
- **Zero Layout Shift:** CLS of 0.

**Scale & Complexity:**
- **Primary Domain:** Frontend Restoration & Optimization.
- **Complexity Level:** Medium (Migration + strict fidelity constraints).
- **Estimated Architectural Components:** ~10-15 (Mapped 1:1 from existing HTML).

### Technical Constraints & Dependencies
- **Migration Strategy:** "Lift and Shift" Logic -> Refactor for Next.js.
- **Deployment:** Vercel.
- **Visual Constraint:** No "Redesign" allowed (except fixing broken mobile parts).

### Cross-Cutting Concerns Identified
- **Visual Fidelity:** Every component must be verified against the original.
- **Mobile Adaptation:** CSS must be refactored to handle mobile without altering the desktop capability.
- **Asset Pipeline:** Next.js Image component replaces manual asset handling.

## Starter Template Evaluation

### Primary Technology Domain
**Web Application (Next.js)** based on PRD requirement for proper asset optimization and Vercel deployment.

### Starter Options Considered
1.  **Standard Next.js Scaffold (create-next-app)** with CSS Modules.
    *   *Pros:* Best for "Pixel-Perfect Migration" because it offers a blank canvas with minimal opinionated styling, allowing us to port existing CSS more easily and safely than Tailwind-heavy starters.
    *   *Cons:* Requires manual setup (minimal).
2.  **T3 Stack / others**
    *   *Pros:* Great for new apps.
    *   *Cons:* Too opinionated (Tailwind, TRPC, Prisma) for a static site migration where we need to preserve existing specific CSS.

### Selected Starter: Standard Next.js (Official)

**Rationale for Selection:**
We selected the official **create-next-app** because it is the safest route to achieve the "Same Look, Better Engine" goal. By avoiding opinionated UI libraries, we can migrate the existing "Vanilla" CSS into **CSS Modules** component-by-component. This ensures we keep the exact visual design (desktop) while isolating styles to fix the mobile issues safely. It also gives us the `next/image` component to solve the performance issues automatically.

**Initialization Command:**

```bash
npx create-next-app@latest . --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*" --use-npm
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- **TypeScript:** Enforces type safety during the migration to prevent logic errors.
- **Next.js 15+ (App Router):** Provides the Layouts RFC which maps perfectly to the site's structure.

**Styling Solution:**
- **CSS Modules:** We will port the existing global CSS into modular blocks. This facilitates the "Mobile Retrofit" by allowing us to fix one component's mobile view without breaking another's desktop view (encapsulation).

**Build Tooling:**
- **Next.js Native:** Zero-config Vercel deployment.

**Testing Framework:**
- *To be added:* Vitest (for logic verification).

**Code Organization:**
- **src/app:** Modern routing structure.
- **src/components:** Reusable UI blocks mirroring the current HTML structure.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Hosting Strategy:** Vercel (Required for Next.js optimization).
- **Testing Strategy:** Playwright (Critical for Visual Fidelity NFR).
- **State Management:** React Hooks (Core Development Pattern).

**Important Decisions (Shape Architecture):**
- **Component Structure:** Atomic/Feature-based Hybrid.
- **Routing:** Next.js App Router (Standard).

**Deferred Decisions (Post-MVP):**
- **CMS Integration:** Content remains static/hardcoded for now.
- **PWA Features:** Service Workers deferred to Phase 2.

### Data Architecture

*   **Database:** None (Stateless).
*   **Data Source:** Local JSON/Constants files.
*   **Rationale:** Keeps architecture simple and 100% migratable from current static site.

### Authentication & Security

*   **None Required:** Public static site.
*   **Headers:** Standard Vercel security headers (HSTS, X-Frame-Options) configured via `next.config.js`.

### API & Communication Patterns

*   **None Required:** No external API calls.
*   **Internal Communication:** Props passing (Parent -> Child).

### Frontend Architecture

*   **State Management:** React Hooks (`useState`, `useEffect`).
    *   *Rationale:* Simple, native, sufficient for countdown/animation logic.
*   **Routing:** Next.js App Router.
    *   *Rationale:* Industry standard, utilizing Vercel's edge caching for layouts.
*   **CSS Architecture:** CSS Modules + Variables.
    *   *Rationale:* Scoped styling fixes mobile bugs while "Global" variables maintain the design tokens.

### Infrastructure & Deployment

*   **Platform:** Vercel.
*   **Asset Delivery:** Vercel Edge Network.
*   **CI/CD:** Vercel GitHub Integration (Automatic deployments on push to main).
*   **Testing:**
    *   **Unit:** Vitest (Logic).
    *   **E2E/Visual:** Playwright (Visual Fidelity).

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
3 areas where AI agents could make different choices (CSS Naming, File Structure, Migration Process).

### Naming Patterns

**CSS & Styling:**
- **File Naming:** `[Component].module.css` co-located with the component.
- **Class Naming:** **`camelCase`** (e.g., `.navLink`, `.heroContainer`).
    - *Constraint:* NO `kebab-case` in CSS Modules to allow dot notation `styles.navLink`.
- **Variables:** CSS Custom Properties in `globals.css` (e.g., `--color-primary`).

**Component Naming:**
- **Files:** `PascalCase.tsx` (e.g., `HeroSection.tsx`).
- **Exports:** Named Exports (e.g., `export function HeroSection`).

### Structure Patterns

**Project Organization (Next.js App Router):**
- `src/app/page.tsx` → Main entry.
- `src/app/layout.tsx` → Root layout (fonts, metadata).
- `src/components/ui/` → Reusable atoms (Buttons, Links).
- `src/components/sections/` → Major page sections (Hero, About, Countdown).
- `src/styles/` → Global configurations (`globals.css`, `reset.css`).

**Asset Organization:**
- `public/assets/` → All static images/videos.
    - *Agent Rule:* Always use `import` for `next/image` where possible, or `/assets/...` path for standard tags.

### Format Patterns

**Props Interface:**
- Defined inline if simple, or `interface [Component]Props` if complex.
- **Strict Typing:** No `any`.

**Responsive Design:**
- **Mobile-First:** Default styles = Mobile.
- **Breakpoints:** `@media (min-width: 768px)` inside the CSS Module.

### Process Patterns

**Migration Workflow:**
1.  Isolate HTML section (e.g., `<section id="hero">`).
2.  Create `src/components/sections/Hero.tsx`.
3.  Create `src/components/sections/Hero.module.css`.
4.  Copy CSS, rename classes to `camelCase`.
5.  Update JSX to use `styles.class`.
6.  Verify visually.

**Enforcement:**
- **Linting:** ESLint rules for Prettier and React Hooks.
- **Review:** Check for `style={{}}` tags (Forbidden, except for dynamic values).

## Project Structure & Boundaries

### Complete Project Directory Structure
```
Pro/
├── package.json          # Logic: Next.js + React + TypeScript
├── next.config.js        # Logic: Vercel headers, Image domain config
├── tsconfig.json         # Logic: Strict Mode enabled
├── .eslintrc.json        # Logic: Next.js Core Web Vitals preset
├── .gitignore
├── README.md
├── src/
│   ├── app/
│   │   ├── layout.tsx    # UI: Root HTML/Body + Metadata + Font Loading
│   │   ├── page.tsx      # UI: Main Landing Page Assembly
│   │   └── globals.css   # Style: CSS Variables + Reset + Typography
│   ├── components/
│   │   ├── ui/           # Atomic: Buttons, Links, Icons
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css
│   │   └── sections/     # Major: Mapped 1:1 to current HTML sections
│   │       ├── Hero.tsx
│   │       ├── Hero.module.css
│   │       ├── Countdown.tsx
│   │       └── ...
│   ├── hooks/
│   │   ├── useCountdown.ts     # Logic: Extracted from script.js
│   │   └── useScrollReveal.ts  # Logic: Ported animation observers
│   └── lib/
│       └── utils.ts      # Logic: Helper functions
└── public/
    └── assets/           # Data: Images, Videos, fonts (copied from current)
```

### Requirements to Structure Mapping

**Feature Mapping:**
- **Hero Section:** `src/components/sections/Hero.tsx` + `Hero.module.css`
- **Countdown Timer:** `src/components/sections/Countdown.tsx` (UI) + `src/hooks/useCountdown.ts` (Logic)
- **Scroll Animations:** `src/hooks/useScrollReveal.ts` (Replaces IntersectionObserver logic in script.js)

### Architectural Boundaries

**Asset Boundaries:**
- **Static files:** MUST live in `public/assets/`.
- **Import rule:** Components should import images: `import heroBg from '@/../public/assets/hero.jpg'` for `next/image` optimization.

**Component Boundaries:**
- **Section Components:** Self-contained. They DO NOT affect each other's layout (Grid/Flex isolation).
- **Global Styles:** Only for Variables (`--color-red`) and Typography. No global utility classes modifying layout.

## Architecture Validation Results

### Coherence Validation ✅
**Decision Compatibility:**
All decisions form a cohesive "Performance-First" stack. Next.js App Router (Logic) + Vercel (Hosting) + CSS Modules (Styling) enables the "Pixel Fidelity" goal without the overhead of heavy JS libraries.

### Requirements Coverage Validation ✅
**Functional Requirements Coverage:**
- **Mobile Retrofit:** Covered by Mobile-First CSS Modules pattern.
- **Asset Optimization:** Covered by `next/image` architecture.
- **Deployment:** Covered by Vercel configuration.

**Non-Functional Requirements Coverage:**
- **Visual Fidelity:** Addressed by Playwright Visual Testing strategy.
- **Performance:** Addressed by Next.js Core Web Vitals preset + Edge caching.

### Gap Analysis
- **Minor Gap:** Exact implementation details of the scroll animation port (IntersectionObserver -> React Hook) need to be solved during the "Hook Implementation" story. This is a known implementation detail, not an architectural blocker.

### Architecture Readiness Assessment
**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High
**First Implementation Priority:** Initialize the Next.js scaffold.

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2025-12-25
**Document Location:** _bmad-output/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- **Critical Decision:** Next.js Migration for Performance/Deployment.
- **Critical Strategy:** "Pixel Fidelity" via CSS Modules and Playwright.
- **Pattern:** Mobile-First CSS Refactoring.
- **Structure:** 1:1 Mapping of existing HTML to React Components.

**📚 AI Agent Implementation Guide**

- **Tech Stack:** Next.js 15, React, TypeScript, Vercel.
- **Consistency:** Use `camelCase` for CSS Modules. Use `public/assets/` for strictly static files.
- **Testing:** Playwright for Visual verification.

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing Pro. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
Initialize the Next.js scaffold using the standard `create-next-app` command without Tailwind.

**Development Sequence:**

1.  Initialize project (scaffold).
2.  Setup Global Styles & Variables (port from current).
3.  Migrate Layout & Key Components (Header/Footer).
4.  Implement Sections (Hero, Countdown) one by one.
5.  Verify visually with Playwright at each step.

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**
- [x] All functional requirements are supported
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled
- [x] Integration points are defined

**✅ Implementation Readiness**
- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Examples are provided for clarity

### Project Success Factors

**🎯 Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction.

**🔧 Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly.

**📋 Complete Coverage**
All project requirements are architecturally supported, with clear mapping from business needs to technical implementation.

**🏗️ Solid Foundation**
The chosen starter template and architectural patterns provide a production-ready foundation following current best practices.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.

---
stepsCompleted: [1, 2, 3, 4]
status: complete
---

# Pro - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Pro, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The system can automatically build and deploy to Vercel upon push to the main branch.
FR2: The system can serve all static assets via Vercel's Edge Network (CDN).
FR3: The system can handle client-side routing for all existing pages without full page reloads.
FR4: The system can automatically generate and serve next-gen image formats (WebP/AVIF) for all uploaded images.
FR5: The system can lazy-load images that are not in the initial viewport.
FR6: The system can display a blur-up placeholder while high-resolution images are loading.
FR7: The User can view all page content on devices with widths as small as 375px without horizontal scrolling.
FR8: The User can interact with all navigation elements (menus, buttons) on touch screens using minimum 44x44px touch targets.
FR9: The User can read all text content on mobile without manual zooming (minimum 16px font size).
FR10: The system can maintain layout stability (zero layout shift) as images and fonts load.

### NonFunctional Requirements

NFR1: Google Lighthouse Mobile Performance score > 90.
NFR2: Largest Contentful Paint (LCP) < 2.5 seconds on 4G networks.
NFR3: Cumulative Layout Shift (CLS) of exactly 0 on initial load.
NFR4: Zero horizontal scrolling on any device width >= 375px.
NFR5: All interactive elements have a minimum clickable area of 44x44px.
NFR6: Text content maintains a minimum font size of 16px to prevent iOS auto-zoom on input focus.
NFR7: Build time on Vercel < 3 minutes (managed via cache).
NFR8: 100% of deployed assets are served via HTTPS with valid SSL certificates.
NFR9: Codebase passes `eslint` and `prettier` checks with zero errors before any commit.

### Additional Requirements

- **Starter Template:** Standard Next.js (Official). Initialization Command: `npx create-next-app@latest . --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*" --use-npm`
- **Testing:** Playwright for Visual Fidelity.
- **Styling:** CSS Modules with `camelCase` class naming. NO `kebab-case` in CSS Modules.
- **Organization:** Mobile-first styles (default styles = mobile, media queries for larger screens).
- **Asset Organization:** Static files MUST live in `public/assets/`. Components should import images for `next/image` optimization.
- **Logic:** `useScrollReveal.ts` replaces IntersectionObserver logic for scroll animations.
- **Logic:** `useCountdown.ts` for countdown timer logic.
- **State Management:** React Hooks (`useState`, `useEffect`).
- **Routing:** Next.js App Router (`src/app`).
- **Mobile Adaptation:** Fix broken layouts (375px+) and interactions on mobile while preserving desktop view.
- **Visual Constraint:** No "Redesign" allowed (except fixing broken mobile parts).

### FR Coverage Map

FR1: Epic 1 - Digital Presence & Deployment Pipeline
FR2: Epic 1 - Digital Presence & Deployment Pipeline
FR3: Epic 1 - Digital Presence & Deployment Pipeline
FR4: Epic 3 - High-Performance Asset Delivery
FR5: Epic 3 - High-Performance Asset Delivery
FR6: Epic 3 - High-Performance Asset Delivery
FR7: Epic 2 - Mobile-First Layout & Navigation
FR8: Epic 2 - Mobile-First Layout & Navigation
FR9: Epic 2 - Mobile-First Layout & Navigation
FR10: Epic 3 - High-Performance Asset Delivery

## Epic List

### Epic 1: Digital Presence & Deployment Pipeline

**Goal:** Establish the live production environment, automated deployment pipeline, and basic routing structure so that the site is accessible globally and updates can be shipped instantly.
**FRs covered:** FR1, FR2, FR3

### Story 1.1: Project Initialization & Scaffolding

As a Developer,
I want to initialize the Next.js project with the correct configuration,
So that I have a stable foundation for development.

**Acceptance Criteria:**

**Given** I have access to the repository
**When** I run the `create-next-app` command with specified flags
**Then** the project structure matches the Architecture doc
**And** `globals.css` variables are initialized
**And** `next.config.js` is correctly configured

### Story 1.2: Vercel Deployment Pipeline

As a DevOps Engineer,
I want to connect the repository to Vercel,
So that changes are automatically deployed to a live URL.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I push to main
**Then** Vercel triggers a build
**And** the build completes in < 3 minutes (NFR7)
**And** the live URL serves content via HTTPS (NFR8)
**And** the site is publicly accessible

### Story 1.3: Visual Testing Infrastructure

As a QA Engineer,
I want to set up Playwright,
So that I can verify visual fidelity against the original design.

**Acceptance Criteria:**

**Given** the project is active
**When** I run `npx playwright test`
**Then** it executes successfully
**And** I can capture a screenshot of the homepage
**And** the test environment is configured for mobile and desktop viewports

### Epic 2: Mobile-First Layout & Navigation

**Goal:** Transform the core site structure and navigation to be fully responsive and usable on touchscreen devices, ensuring legibility and accessibility conform to mobile standards.
**FRs covered:** FR7, FR8, FR9

### Story 2.1: Global Styles & Typography Migration

As a Developer,
I want to port global CSS and variables,
So that the site has the correct foundation and legible text on mobile.

**Acceptance Criteria:**

**Given** I have the original `style.css`
**When** I port variables to `globals.css`
**Then** all colors match the original design
**And** base font size is at least 16px on mobile (FR9)
**And** CSS reset is applied

### Story 2.2: Responsive Header & Navigation

As a Mobile User,
I want to a usable navigation menu,
So that I can access site links without zooming.

**Acceptance Criteria:**

**Given** I am on a mobile device (375px)
**When** I view the header
**Then** I see a mobile-optimized menu (or layout)
**And** all links have >44px touch targets (FR8)
**And** no elements overflow horizontally

### Story 2.3: Hero & Section Layouts

As a User,
I want the main page sections to stack correctly on mobile,
So that content is readable.

**Acceptance Criteria:**

**Given** the Hero section (and other key sections)
**When** viewed on mobile
**Then** text and images stack vertically if needed
**And** there is no horizontal scroll (FR7)
**And** all padding/margins are appropriate for small screens

### Epic 3: High-Performance Asset Delivery

**Goal:** Optimize visual asset delivery with next-gen formats and loading strategies to ensure instant perceived speed and zero layout shifts.
**FRs covered:** FR4, FR5, FR6, FR10

### Story 3.1: High-Performance Image Component

As a User,
I want images to load instantly and efficiently,
So that the page feels fast and doesn't eat my data.

**Acceptance Criteria:**

**Given** I am on the site
**When** images load
**Then** they are served as WebP/AVIF (FR4)
**And** `next/image` is used for all static assets
**And** explicit width/heights prevent CLS (FR10)

### Story 3.2: Progressive Image Loading

As a User,
I want to see content immediately even on slow networks,
So that I'm not staring at whitespace.

**Acceptance Criteria:**

**Given** an image is loading
**When** I view it
**Then** a blur-up placeholder is shown (FR6)
**And** off-screen images are lazy-loaded (FR5)
**And** LCP is < 2.5s on mobile (NFR2)

### Story 3.3: Optimized Scroll Animations

As a Mobile User,
I want animations to be smooth and not block scrolling,
So that the site feels premium.

**Acceptance Criteria:**

**Given** the `useScrollReveal` hook
**When** elements enter viewport
**Then** they animate using opacity/transform
**And** the legacy `IntersectionObserver` implementation is removed
**And** animations do not cause layout shifts

### Story 3.4: Performance Triage & Final Polish

As a Site Owner,
I want a >90 Lighthouse score,
So that I meet the NFRs.

**Acceptance Criteria:**

**Given** the deployed Vercel URL
**When** I run Lighthouse Mobile
**Then** the score is > 90 (NFR1)
**And** CLS is verified as 0 (NFR3)
**And** no horizontal scroll exists (NFR4)



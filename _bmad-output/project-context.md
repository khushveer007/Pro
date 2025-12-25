---
project_name: 'Pro'
user_name: 'Opsa'
date: '2025-12-25'
sections_completed: ['technology_stack', 'framework_rules', 'testing_rules', 'critical_rules']
existing_patterns_found: 3
status: 'complete'
rule_count: 12
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Core Framework:**
- **Next.js:** v15.x (App Router)
- **React:** v19.x
- **TypeScript:** v5.x (Strict Mode)

**Styling:**
- **CSS Modules:** Native support (Scoped)
- **Engine:** Vanilla CSS (No Tailwind)

**Testing:**
- **Visual/E2E:** Playwright
- **Unit:** Vitest

**Infrastructure:**
- **Hosting:** Vercel (Edge Network)
- **Images:** `next/image` (WebP/AVIF automation)

## Critical Implementation Rules

### Language & Framework Rules

**TypeScript / JavaScript:**
- **Strict Mode:** No `any`. Define interfaces for all props.
- **Exports:** Use Named Exports (`export function Hero...`) for better tree-shaking and refactoring.
- **Async:** Use `async/await` over separate Promise chaining.

**Next.js & React:**
- **Server Components:** Default to Server Components. Add `'use client'` only when interaction (state/hooks) is required.
- **Images:** MANDATORY use of `<Image />` component for all assets. Import static images (`import bg from ...`) to allow build-time optimization.
- **Routing:** Use `src/app` directory. Keep `page.tsx` minimal; compose sections from `src/components`.

**Styling (CSS Modules):**
- **Naming:** **CRITICAL:** Use `camelCase` for class names (e.g., `.heroContainer`) to enable dot notation (`styles.heroContainer`).
- **File Structure:** Co-locate styles with components (e.g., `Hero.tsx` + `Hero.module.css`).
- **No Global Classes:** Do not rely on global CSS for layout. Only use globals for variables and typography.

### Testing Rules

- **Visual Fidelity (Playwright):**
  - All page migrations must be verified for 0% visual regression on Desktop.
  - Snapshots must compare Legacy Site vs. Next.js Site.
- **Logic (Vitest):**
  - Unit test complex hooks (e.g., `useCountdown`).
- **Convention:** Tests live in `tests/` directory or co-located `__tests__` folder.

---

## Usage Guidelines

**For AI Agents:**

-   **Read this file:** Before implementing ANY code or starting a story.
-   **Follow Exactly:** Do not deviate from `camelCase` or `next/image` rules.
-   **Strict Fidelity:** If a change alters the desktop visual pixel-grid, IT IS WRONG.
-   **Update:** If you discover a new critical pattern (e.g., a specific API quirk), propose adding it here.

**For Humans:**

-   **Keep it Lean:** Do not add tutorials here. Only strict rules.
-   **Maintenance:** Update versions in the Tech Stack section when upgrading `package.json`.
-   **Legacy:** As the migration completes, update this to reflect the new purely Next.js state.


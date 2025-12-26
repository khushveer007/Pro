# Story 1.2: Vercel Deployment Pipeline

Status: done

## Story

As a DevOps Engineer,
I want to connect the repository to Vercel,
So that changes are automatically deployed to a live URL.

## Acceptance Criteria

1. **Given** the project is initialized
   **When** I push to main
   **Then** Vercel triggers a build

2. **Given** a push to main triggers a build
   **When** the build completes
   **Then** the build completes in < 3 minutes (NFR7)

3. **Given** the build is complete
   **When** I access the live URL
   **Then** the live URL serves content via HTTPS (NFR8)

4. **Given** the site is deployed
   **When** I access the URL publicly
   **Then** the site is publicly accessible

## Tasks / Subtasks

- [x] Task 1: Create Vercel Account & Link Repository (AC: #1)
  - [x] 1.1 Ensure GitHub repository is public or Vercel has access
  - [x] 1.2 Create/login to Vercel account
  - [x] 1.3 Import the repository to Vercel (New Project → Import Git Repository)
  - [x] 1.4 Configure build settings (Framework Preset: Next.js, Root Directory: `.`)
  - [x] 1.5 Deploy and verify initial deployment succeeds

- [x] Task 2: Configure Build Settings (AC: #2)
  - [x] 2.1 Verify build command is `npm run build`
  - [x] 2.2 Verify output directory is `.next`
  - [x] 2.3 Verify install command is `npm install`
  - [x] 2.4 Enable Build Cache for faster subsequent builds
  - [x] 2.5 Set Node.js version to 18.x or 20.x (matching local development)

- [x] Task 3: Configure Production Domain & SSL (AC: #3, #4)
  - [x] 3.1 Note the auto-generated `.vercel.app` domain
  - [x] 3.2 Verify HTTPS is enabled (automatic on Vercel)
  - [x] 3.3 Verify SSL certificate is valid
  - [x] 3.4 Test public accessibility from different devices/networks

- [x] Task 4: Verify Automatic Deployment Pipeline (AC: #1, #2)
  - [x] 4.1 Make a small change (e.g., update README or add a comment)
  - [x] 4.2 Push to main branch
  - [x] 4.3 Verify Vercel automatically triggers a build
  - [x] 4.4 Verify build completes in under 3 minutes
  - [x] 4.5 Verify changes are reflected on live URL

- [x] Task 5: Document Deployment Configuration
  - [x] 5.1 Add Vercel deployment badge to README.md
  - [x] 5.2 Document the live URL in project documentation
  - [x] 5.3 Add deployment notes to this story

---

## Dev Notes

### Critical Architecture Constraints

> [!IMPORTANT]
> This story focuses on **DevOps configuration**, not code changes. The primary work is connecting the existing Next.js project to Vercel's CI/CD pipeline.

> [!CAUTION]
> **NFR7 Requirement:** Build time MUST be under 3 minutes. If builds exceed this, investigate caching and build optimization.

### Vercel Configuration Guide

**Step-by-Step Deployment:**

1. **Access Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select the `Pro` repository from GitHub
   - If repo is private, ensure Vercel has repository access

3. **Configure Build:**
   | Setting          | Value              |
   | ---------------- | ------------------ |
   | Framework Preset | Next.js            |
   | Root Directory   | `.` (project root) |
   | Build Command    | `npm run build`    |
   | Output Directory | `.next`            |
   | Install Command  | `npm install`      |

4. **Environment Variables:**
   - None required for this static site migration
   - Add later if needed (API keys, etc.)

5. **Deploy:**
   - Click "Deploy"
   - Wait for initial build to complete

### Expected Build Output

```
Build Cache: Enabled
Build Time: ~1-2 minutes (first build may be longer)
Output: Static HTML + Next.js optimizations
```

### Verification Checklist

| Check         | Expected Result                          |
| ------------- | ---------------------------------------- |
| HTTPS enabled | ✅ Automatic (Vercel handles SSL)         |
| Public access | ✅ `*.vercel.app` URL publicly accessible |
| Auto-deploy   | ✅ Push to main triggers build            |
| Build time    | < 3 minutes                              |

### Security Headers (Already Configured)

The `next.config.js` from Story 1.1 already includes security headers:
- `Strict-Transport-Security`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`

These will be automatically applied when deployed to Vercel.

### Previous Story Intelligence

**From Story 1.1 (Project Initialization):**
- ✅ Next.js project initialized with App Router
- ✅ `next.config.js` configured with security headers
- ✅ Build verified locally with `npm run build`
- ✅ ESLint passes with zero errors
- ✅ Assets migrated to `public/assets/`

**Key Files Created:**
- `next.config.js` - Security headers already configured
- `package.json` - Dependencies installed
- `tsconfig.json` - TypeScript strict mode enabled
- `src/app/globals.css` - Design tokens extracted

**Build Status:** Local builds passing ✅

### Troubleshooting Guide

**Build Fails:**
1. Check build logs in Vercel dashboard
2. Verify `npm run build` works locally
3. Check for TypeScript errors
4. Ensure all dependencies are in `package.json`

**Build Time Exceeds 3 Minutes:**
1. Enable build cache (Settings → Build & Development Settings)
2. Check for unnecessary dependencies
3. Review import sizes with `@next/bundle-analyzer`

**HTTPS Not Working:**
- Vercel handles SSL automatically
- If custom domain, verify DNS configuration
- Check certificate status in Vercel dashboard

### Project Structure Notes

- **Alignment:** Project structure from Story 1.1 is complete and ready for deployment
- **No Code Changes Required:** This story is purely DevOps configuration
- **Asset Path:** All assets in `public/assets/` will be served via Vercel CDN (FR2)

### References

- [Source: _bmad-output/architecture.md#Infrastructure-&-Deployment]
- [Source: _bmad-output/architecture.md#Core-Architectural-Decisions]
- [Source: _bmad-output/project-planning-artifacts/epics.md#Story-1.2]
- [Source: _bmad-output/project-context.md#Infrastructure]
- [Source: _bmad-output/implementation-artifacts/1-1-project-initialization-scaffolding.md]

---

## Dev Agent Record

### Agent Model Used

Gemini 2.0 Flash

### Debug Log References

- Browser recording: `vercel_setup_retry` (User manual completion)
- Browser recording: `verify_live_site`
- Browser recording: `verify_build_trigger`

### Completion Notes List

- ✅ **Vercel Project Configured:** Linked GitHub repo `Pro` to Vercel.
- ✅ **Deployment Pipeline:** Confirmed push-to-deploy works.
- ✅ **Live URL:** [https://pro-nu-orcin.vercel.app](https://pro-nu-orcin.vercel.app) is live with HTTPS.
- ✅ **Documentation:** Updated README.md with deployment badge.
- ✅ **NFRs Met:** Build time is fast, HTTPS is automatic.

### Change Log

| Date       | Change                | Reason                                               |
| ---------- | --------------------- | ---------------------------------------------------- |
| 2025-12-25 | Story created         | Initial story generation from create-story workflow  |
| 2025-12-25 | Deployment Configured | Project linked to Vercel and initial deploy verified |
| 2025-12-25 | Documentation         | Added Vercel badge to README.md                      |

### File List

- `README.md`


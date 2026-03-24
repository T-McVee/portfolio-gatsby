# Roadmap: Tim's Personal Platform

## Overview

A four-phase journey to ship Tim's portfolio platform. The work divides naturally: first stabilise infrastructure so every subsequent push lands correctly; then refresh stale content so the site accurately represents Tim's current story; then wire up the contact form so visitors can actually reach him; finally harden code quality and security before promoting the live URL publicly.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Infrastructure** - CI/CD pipeline to Azure App Service, App Service configuration, stale workflow removal, and content parser hardening
- [ ] **Phase 2: Content** - Refresh all stale content (bio, portfolio, skills, metadata) and add the /uses page
- [ ] **Phase 3: Contact Form** - Wire contact form to Resend with Zod validation
- [ ] **Phase 4: Hardening** - Fix Tailwind dynamic classes, add security headers, and add error boundary

## Phase Details

### Phase 1: Infrastructure
**Goal**: The app deploys correctly and automatically on every push to main, with no orphaned workflows or broken startup configuration
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, QUAL-01
**Success Criteria** (what must be TRUE):
  1. Pushing to main triggers a GitHub Actions run that deploys to Azure App Service without manual steps
  2. The deployed site loads correctly — no blank page, no startup error
  3. The old Azure Static Web Apps workflow file no longer exists in the repo
  4. `gray-matter` is installed and the MDX parser in `content.ts` uses it — build does not break on complex YAML frontmatter
  5. `.env.example` exists and documents all required environment variables
**Plans**: TBD

### Phase 2: Content
**Goal**: Every section of the site accurately reflects Tim's current career story, projects, and tools — nothing stale, nothing placeholder
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. The Bio/About section describes Tim's current role as a senior developer and tech leader, including the marketing-to-dev career arc
  2. The Portfolio section shows current projects (invoicing hub, agentic apps, GitHub projects) — stale 2023 entries removed
  3. The Skills section reflects the current stack (Next.js, TypeScript, Tailwind v4, Azure) — Gatsby removed
  4. Site metadata (title, description, OG tags) is accurate and uses a local OG image
  5. A /uses page exists and is reachable, listing Tim's tools, stack, and gear
**Plans**: TBD
**UI hint**: yes

### Phase 3: Contact Form
**Goal**: Visitors can reliably send Tim a message and Tim receives it in his inbox
**Depends on**: Phase 1
**Requirements**: CNTC-01, CNTC-02
**Success Criteria** (what must be TRUE):
  1. Submitting the contact form results in an email arriving in Tim's inbox via Resend
  2. Submitting with invalid inputs (empty name, bad email, blank message) shows field-level error messages and does not send
  3. If submission fails, the form preserves the user's input and shows an error state — it does not silently clear
**Plans**: TBD

### Phase 4: Hardening
**Goal**: The site is production-ready — no dynamic class stripping, no crash white-screens, and security headers present
**Depends on**: Phase 3
**Requirements**: QUAL-02, QUAL-03, QUAL-04
**Success Criteria** (what must be TRUE):
  1. All project cards render their correct styling in a production build — no missing Tailwind classes
  2. A runtime error in any section shows a recoverable error page, not a blank white screen
  3. Browser DevTools Network tab shows security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP) on every page response
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure | 0/TBD | Not started | - |
| 2. Content | 0/TBD | Not started | - |
| 3. Contact Form | 0/TBD | Not started | - |
| 4. Hardening | 0/TBD | Not started | - |

# Project Research Summary

**Project:** Personal developer portfolio platform — Tim McVinish
**Domain:** Personal developer portfolio / platform (Next.js App Router, Azure App Service)
**Researched:** 2026-03-24
**Confidence:** HIGH (stack + architecture + pitfalls verified against codebase; features MEDIUM due to no live web sources)

## Executive Summary

This is a personal developer portfolio in mid-migration from Gatsby to Next.js 16 App Router, with Tailwind CSS v4, TypeScript strict mode, and a target deployment to Azure App Service. The stack is already installed and correctly configured — no major dependency additions are needed for this milestone, with one exception: replace the hand-rolled MDX frontmatter parser with `gray-matter` before updating any content. The core milestone goal is threefold: refresh stale content (bio, projects, skills), add a `/uses` page, and ship a working CI/CD pipeline to Azure App Service via GitHub Actions.

The most important architectural decision has already been made correctly: page-level server components load data from `src/lib/content.ts`, passing typed props down to section components, with a single `PageClient.tsx` client boundary for interactive state. This pattern should be extended consistently for the `uses/` route (pure server component, no client wrapper) and must not be violated by letting section components fetch their own data. The content abstraction in `content.ts` is the payoff layer — all future content-source changes touch only that file.

The dominant risks are operational, not architectural. Three things will silently make the site look complete while actually being broken: (1) the contact form logs submissions to console instead of sending emails, (2) the existing GitHub Actions workflow targets Azure Static Web Apps rather than App Service and will deploy to the wrong service, and (3) the App Service instance has no startup command configured, causing a blank page after every otherwise-successful deployment. All three must be addressed before the live URL is promoted publicly.

---

## Key Findings

### Recommended Stack

The stack is stable and already installed. Next.js 16.2.1 with React 19.2.4 and TypeScript 5.x provides the full App Router feature set including Server Components, API routes, and ISR — all required for this project. Tailwind CSS v4.2 with `@tailwindcss/postcss` is correctly configured using the CSS-first pattern (`@import "tailwindcss"` in `globals.css`); no `tailwind.config.js` is needed or wanted. Azure App Service is the correct deployment target because the contact form API route requires a Node.js process — Azure Static Web Apps (the current orphaned target) cannot run server-side code.

The one addition needed: `gray-matter` to replace the regex-based `parseMdx()` in `content.ts`. The current parser fails on multiline YAML values, colons in strings, and complex arrays — edge cases that will be hit the moment content is updated in earnest.

**Core technologies:**
- **Next.js 16.2.1:** Framework — App Router, Server Components, API routes. Already installed; no changes.
- **React 19.2.4:** UI rendering — Server Actions, concurrent features. Already installed.
- **TypeScript 5.x (strict):** Type safety — strict mode, path aliases configured. Already installed.
- **Tailwind CSS v4.2:** Styling — CSS-first config, no `tailwind.config.js`. Already installed.
- **`gray-matter`:** Frontmatter parsing — replace hand-rolled `parseMdx()`. Needs `npm install gray-matter`.
- **Azure App Service:** Hosting — Node.js server mode, supports API routes. Target for new CI/CD workflow.
- **GitHub Actions + `azure/webapps-deploy@v3`:** CI/CD — replace orphaned Static Web Apps workflow.

**Do not add:** `next-seo` (native `metadata` API covers it), `@next/mdx` (wrong pattern for this use case), `output: "standalone"` (not needed for App Service without Docker), `autoprefixer` as standalone plugin (Tailwind v4 handles prefixes internally).

### Expected Features

The site has most table-stakes features in place but nearly all require content refresh. The outstanding engineering work is the contact form Resend integration and the CI/CD pipeline. One meaningful new page — `/uses` — can be added at low cost and high signal value.

**Must have (table stakes, P1 — this milestone):**
- Bio/About content updated — reflects current role and dual dev + marketing background
- Portfolio updated — includes invoicing hub, recent agentic projects; removes stale 2023 entries
- Skills updated — accurate stack (Next.js, TypeScript, Tailwind v4, Azure; remove Gatsby)
- Contact methods verified — correct GitHub, LinkedIn, and email URLs
- Site metadata updated — description, OG tags, local OG image (not postimg CDN)
- Contact form wired to Resend — submissions actually arrive in Tim's inbox
- CI/CD to Azure App Service via GitHub Actions — automated deploys on push to main
- Orphaned Static Web Apps workflow removed

**Should have (differentiators, P1-P2):**
- `/uses` page — editor, terminal, hardware, key services; signals craft and intentionality
- Narrative career arc in bio — marketing-to-dev transition is a genuine differentiator vs. generic job-title timelines
- Agentic/AI project showcase — signals Tim is current with 2025/2026 tooling expectations

**Defer (v2+):**
- Blog / MDX writing section — full content management pattern needed; don't rush alongside CI/CD
- Dark/light mode — cosmetic, adds CSS complexity and flash-of-wrong-theme risk; not requested
- Interactive tools and authenticated dashboard — separate routing and auth system design required
- CMS integration — just migrated away from Contentful; MDX + JSON in git is correct for a solo site

**Anti-features to explicitly avoid:** animated page transitions (accessibility + JS weight), real-time GitHub stats widgets (API rate limits, visual noise), CMS for this milestone.

### Architecture Approach

The existing architecture is sound and should be extended rather than changed. The rule is: types → content loader → content file → components → page. All file I/O funnels through named functions in `src/lib/content.ts`; pages never import `fs` directly. Server component pages pass typed props down to pure section components. The single `PageClient.tsx` client boundary on the home page owns all interactive state (modal, form). The `/uses` page is a pure server component with no client wrapper because it has no interactive state.

**Major components:**
1. `app/[route]/page.tsx` — Server component, loads data, assembles props; one per route
2. `PageClient.tsx` (home only) — Client boundary, owns modal and form state
3. `src/lib/content.ts` — All file I/O; the only file that changes if content source changes
4. `src/content/` — Source of truth; JSON for structured data, MDX for narrative content with frontmatter
5. `app/api/contact/route.ts` — Contact form handler; integrate Resend here, not in components
6. `app/uses/page.tsx` (to add) — Pure server component; loads `uses.json`, renders `UsesSection`

**Build order pattern for new features:** types in `types.ts` → loader in `content.ts` → content file in `content/` → section components in `components/[section]/` → route in `app/[route]/page.tsx`.

### Critical Pitfalls

1. **Contact form silently drops submissions** — `/api/contact/route.ts` only `console.log`s. Integrate Resend before any live deployment. Add Zod validation on both client and server. Only clear form state on confirmed `res.ok`; preserve values on error.

2. **Wrong CI/CD workflow deployed** — Existing workflow uses `Azure/static-web-apps-deploy` with `output_location: "public"`. Delete it entirely. New workflow must use `azure/webapps-deploy@v3`, run `npm ci && npm run build`, and zip `.next/`, `public/`, `package.json`, `package-lock.json`, `next.config.ts`.

3. **App Service blank page after deploy** — No startup command configured. Set `npm run start` in App Service Configuration blade. Set `PORT=8080` (App Service default) — Next.js defaults to 3000. Mismatch causes the Node process to exit immediately after deploy.

4. **Content refresh breaks the build** — `content.ts` uses bare `JSON.parse()` without try-catch and a regex MDX parser that fails on complex YAML. Install `gray-matter` and wrap JSON reads in try-catch with file-path error messages before editing any content files.

5. **Dynamic Tailwind classes vanish in production** — `src/components/work/Project.tsx` already identified as using this pattern (lines 48-60). Tailwind v4's scanner requires complete static class strings. Replace any template literals or `.join()` on partial class names with `clsx` and full static strings before visual QA.

---

## Implications for Roadmap

Based on combined research findings, four phases emerge. The ordering is driven by two hard dependencies: CI/CD must exist before contact form env vars can be set in production, and the content parser must be hardened before any content files are edited.

### Phase 1: Foundation Cleanup and Infrastructure

**Rationale:** Three critical pitfalls (wrong CI/CD workflow, missing startup command, stale credentials) will silently break the site if not addressed first. This phase unblocks everything else. Content work and feature work are blocked on having a working deployment target.

**Delivers:** Working GitHub Actions → Azure App Service pipeline; App Service correctly configured with Node.js startup command and port; old Static Web Apps workflow removed; stale Contentful env files deleted; `gray-matter` installed; content parser hardened; `.env.example` committed.

**Addresses:** P1 feature — CI/CD to Azure App Service; orphaned workflow removal.

**Avoids:** Pitfall 2 (wrong workflow), Pitfall 3 (blank page / missing startup command), Pitfall 4 (stale credentials), Pitfall 5 (build breaks during content editing).

**Research flag:** This phase needs phase-level research. The specific `azure/webapps-deploy@v3` artifact format (zip contents, required files) and App Service port configuration have LOW confidence in PITFALLS.md — validate before implementing the workflow.

---

### Phase 2: Content Refresh

**Rationale:** Content refresh is independent of CI/CD but must happen after the parser is hardened (Phase 1). All content changes can be developed and verified locally with `npm run build`. This is the highest ROI work in the milestone: stale content is a credibility problem visible to every visitor.

**Delivers:** Updated bio with current role, years of experience, and marketing-to-dev career narrative; updated portfolio including invoicing hub and agentic projects; updated skills list (Gatsby removed, Next.js/TypeScript/Tailwind v4/Azure added); verified contact methods; updated site metadata with accurate description and local OG image; `uses.json` created with Uses page content.

**Addresses:** P1 features — bio, portfolio, skills, contact methods, site metadata refresh; `/uses` page content.

**Avoids:** Pitfall 5 (JSON/MDX fragility — parser is hardened in Phase 1 before this phase begins).

**Research flag:** No research needed. Content is known; it's Tim's own information. MDX and JSON patterns are documented in ARCHITECTURE.md.

---

### Phase 3: Contact Form Integration

**Rationale:** Resend integration requires `RESEND_API_KEY` as an App Service Application Setting, which requires a working App Service (Phase 1). The API route (`/api/contact`) is already the correct integration boundary. This phase wires it up, fixes the existing UX bug (form clears on error), and adds input validation.

**Delivers:** Working contact form — submissions arrive in Tim's inbox; Zod validation on request body; form preserves values on error with user-facing error state; `console.log` of PII removed or gated to dev only; basic rate limiting on the endpoint.

**Addresses:** P1 feature — Resend contact form integration.

**Avoids:** Pitfall 1 (silent submission drops), security mistakes (PII in logs, no rate limiting, no request validation).

**Research flag:** No deep research needed. Resend's API is straightforward (single HTTP call). Zod is well-documented. Rate limiting approach (simple in-memory or Upstash) is a minor decision — choose based on budget/complexity preference at plan time.

---

### Phase 4: Styling Polish and Pre-deployment Hardening

**Rationale:** Visual QA, Tailwind dynamic class audit, and production hardening are done last — after content is in place and the pipeline is working — because they validate the complete assembled product before the URL is promoted publicly.

**Delivers:** Tailwind dynamic class audit and fixes across all components (especially `Project.tsx`); styling QA pass comparing against tmcvee.com reference (splash z-layering, project alternating layout, skills carousel); root-level `error.tsx` so crashes show a recoverable error page; security headers in `next.config.ts` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, basic CSP); `ButtonCta` changed from `<div>` to `<button>` for keyboard accessibility; Lighthouse audit and triage of any regressions.

**Addresses:** P2 features — styling QA, Lighthouse audit, OG image verification.

**Avoids:** Pitfall 6 (dynamic Tailwind classes vanish in production); security mistakes (missing headers); UX pitfalls (inaccessible CTA, white screen on crash).

**Research flag:** No research needed. All patterns are documented and well-established.

---

### Phase Ordering Rationale

- **Infrastructure before content:** Phase 1 hardening (parser, CI/CD, App Service config) prevents content updates in Phase 2 from silently breaking the build or deploying to the wrong target.
- **Content before contact form:** Phase 2 does not depend on Phase 3, but having real content deployed makes it easier to test the contact form flow end-to-end in production.
- **Contact form before hardening:** Phase 3 must complete before Phase 4 because the Resend env var and API route change can affect the full-stack smoke test.
- **Polish last:** Phase 4 validates the complete assembled product. Running Lighthouse against a site with placeholder content would produce misleading baselines.
- **Uses page spans Phases 1-2:** The route and data model are trivial (Phase 2 builds `uses.json` and `app/uses/page.tsx`); no separate phase needed.

### Research Flags

Phases needing deeper research during planning:
- **Phase 1:** Validate specific `azure/webapps-deploy@v3` workflow syntax and artifact zip format. PITFALLS.md flags this at LOW confidence. Also verify whether `SCM_DO_BUILD_DURING_DEPLOYMENT=false` is the correct App Service setting for a pre-built Next.js artifact.

Phases with standard patterns (skip research-phase):
- **Phase 2:** MDX/JSON content patterns are fully documented in ARCHITECTURE.md. Content is Tim's own — no external research needed.
- **Phase 3:** Resend integration is a single documented API call. Zod validation is standard.
- **Phase 4:** Tailwind static class patterns, security headers in `next.config.ts`, and `error.tsx` are all well-documented Next.js conventions.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against official Next.js 16.2.1 docs (2026-03-20), Tailwind v4 docs, Azure App Service docs. `package.json` cross-referenced. |
| Features | MEDIUM | WebSearch unavailable during research session. Based on codebase audit + HANDOVER.md (HIGH confidence sources) and training knowledge of portfolio patterns (MEDIUM). Phase-level research can validate any specific item. |
| Architecture | HIGH | Based on direct codebase read of `src/app/`, `src/lib/`, `src/components/` plus official App Router conventions. Patterns are established and well-documented. |
| Pitfalls | HIGH | Based on direct codebase audit identifying specific file locations and line numbers. Azure App Service port binding / `azure/webapps-deploy` action syntax flagged as LOW confidence — validate during Phase 1 planning. |

**Overall confidence:** HIGH for what to build and how; MEDIUM for exact feature prioritisation (features area); LOW for specific Azure Actions workflow syntax (Phase 1 needs verification).

### Gaps to Address

- **Azure Actions workflow syntax:** The specific artifact format for `azure/webapps-deploy@v3` (which files to zip, whether `node_modules` is included or rebuilt on App Service) has LOW confidence. Validate against the official `Azure/webapps-deploy` repository README or Microsoft Learn docs before writing the workflow in Phase 1.
- **App Service port binding:** Next.js defaults to port 3000; App Service Linux expects 8080. The correct fix (`PORT=8080` env var vs. `next start -p 8080` startup command) should be verified in Phase 1 — both should work, but App Service may behave differently depending on whether `PORT` is respected automatically.
- **Resend domain verification:** Resend requires a verified sending domain. If Tim's domain is not yet verified in Resend, the contact form integration will be blocked until that step completes. Confirm domain verification status at the start of Phase 3.

---

## Sources

### Primary (HIGH confidence)
- `https://nextjs.org/docs/app/getting-started/deploying` — Deployment options (Node.js server, static export); Next.js 16.2.1, 2026-03-20
- `https://nextjs.org/docs/app/guides/self-hosting` — Self-hosting, caching, env vars; Next.js 16.2.1, 2026-03-20
- `https://nextjs.org/docs/app/guides/mdx` — MDX patterns, confirms `@next/mdx` is page-based not data-loading; 2026-03-20
- `https://nextjs.org/docs/app/getting-started/metadata-and-og-images` — Native metadata API; 2026-03-20
- `https://tailwindcss.com/docs/installation/framework-guides/nextjs` — Tailwind v4.2 + Next.js setup
- `https://learn.microsoft.com/en-us/azure/app-service/deploy-github-actions` — GitHub Actions → App Service; 2025-11-28
- `package.json` (this repo) — Installed versions confirmed
- `src/lib/content.ts`, `.planning/codebase/CONCERNS.md`, `HANDOVER.md`, `.github/workflows/azure-static-web-apps-happy-wave-0b97bea00.yml` — Direct codebase audit

### Secondary (MEDIUM confidence)
- Training knowledge of developer portfolio patterns (uses.tech community, Josh W. Comeau / Lee Robinson style) — Feature prioritisation and differentiator analysis
- Training knowledge of Tailwind v4 static class scanning behaviour — Pitfall 6 prevention

### Tertiary (LOW confidence — validate before Phase 1)
- Training knowledge of `azure/webapps-deploy@v3` action artifact format and zip requirements
- Training knowledge of Azure App Service Linux port binding behaviour for Node.js processes

---
*Research completed: 2026-03-24*
*Ready for roadmap: yes*

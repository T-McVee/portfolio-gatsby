# Requirements: Tim's Personal Platform

**Defined:** 2026-03-24
**Core Value:** The site must clearly convey Tim's unique career story and passion as a senior developer and tech leader

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure

- [ ] **INFRA-01**: CI/CD pipeline deploys Next.js app to Azure App Service via GitHub Actions
- [ ] **INFRA-02**: Azure App Service configured with correct startup command and port (8080)
- [ ] **INFRA-03**: Stale Azure Static Web Apps workflow deleted from repo
- [ ] **INFRA-04**: Environment variables documented and configured for dev and production

### Content

- [ ] **CONT-01**: Bio/About section reflects current career story — senior developer and tech leader with dev + marketing background
- [ ] **CONT-02**: Portfolio section showcases current projects (invoicing hub, GitHub projects, agentic apps)
- [ ] **CONT-03**: Skills and tech data updated to reflect current expertise
- [ ] **CONT-04**: Site metadata and SEO updated (title, description, OG tags)
- [ ] **CONT-05**: Uses page exists at /uses showing tools, stack, and gear

### Contact

- [ ] **CNTC-01**: Contact form sends emails via Resend integration
- [ ] **CNTC-02**: Contact form inputs validated with Zod (name, email, message)

### Code Quality

- [ ] **QUAL-01**: Hand-rolled MDX parser replaced with gray-matter
- [ ] **QUAL-02**: Tailwind dynamic class construction fixed in Project.tsx (production-safe)
- [ ] **QUAL-03**: Security headers configured in next.config (X-Frame-Options, CSP, etc.)
- [ ] **QUAL-04**: Error boundary wraps app for graceful failure handling

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Blog

- **BLOG-01**: Blog page with list of published articles
- **BLOG-02**: Individual blog post pages rendered from MDX
- **BLOG-03**: Blog post metadata (date, tags, reading time)

### Interactive Tools

- **TOOL-01**: Games or calculators embedded as interactive pages
- **TOOL-02**: Tools discoverable from main navigation

### Authenticated Section

- **AUTH-01**: Authentication system (login for Tim only)
- **AUTH-02**: Protected routes for dashboard/tools
- **AUTH-03**: Agentic app integrations behind auth

### External Links

- **LINK-01**: Invoicing hub linked from portfolio or navigation
- **LINK-02**: GitHub profile prominently linked

## Out of Scope

| Feature | Reason |
|---------|--------|
| Dark mode toggle | Scope creep — can add later with minimal effort |
| CMS integration (Contentful etc.) | Deliberately moved to file-based content; no external dependency |
| Real-time GitHub activity widgets | API rate limits, maintenance burden, minimal value |
| Animated page transitions | Complexity without clear user value |
| Comments system | Not needed until blog exists |
| Public analytics dashboard | Privacy concerns, maintenance overhead |
| @next/mdx setup | Current data-loading MDX pattern is correct; @next/mdx is for MDX-as-pages |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| QUAL-01 | Phase 1 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CNTC-01 | Phase 3 | Pending |
| CNTC-02 | Phase 3 | Pending |
| QUAL-02 | Phase 4 | Pending |
| QUAL-03 | Phase 4 | Pending |
| QUAL-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-24*
*Last updated: 2026-03-24 after roadmap creation*

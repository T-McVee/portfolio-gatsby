# Tim's Personal Platform

## What This Is

A personal website and platform for Tim — a senior software developer and tech leader based in Brisbane. The public-facing site showcases his career story, portfolio of projects, tech stack/tools (Uses page), and contact information. Over time it will grow into a launchpad for interactive tools, a blog, and authenticated apps.

## Core Value

The site must clearly convey Tim's unique career story and passion as a senior developer and tech leader — everything else builds on that foundation.

## Requirements

### Validated

- ✓ Next.js App Router with TypeScript — existing
- ✓ Tailwind CSS v4 styling system — existing
- ✓ MDX-based content with frontmatter — existing
- ✓ Component architecture (Splash, Bio, Work, Skills, Footer) — existing
- ✓ Contact form with API route — existing
- ✓ FontAwesome icon system — existing
- ✓ Responsive design with custom breakpoints — existing

### Active

- [ ] Refresh Bio/About content to reflect current career story
- [ ] Update Portfolio section with current projects (invoicing hub, GitHub projects, agentic apps)
- [ ] Refresh Contact section with current details and social links
- [ ] Add Uses section (tools, stack, gear)
- [ ] Set up CI/CD pipeline to Azure App Service
- [ ] Clean up stale Gatsby artifacts and Azure Static Web Apps workflow
- [ ] Update site metadata and SEO

### Out of Scope

- Blog / content publishing — deferred to future milestone
- Interactive tools (games, calculators) embedded in site — future milestone
- Authenticated section for agentic apps — future milestone
- Invoicing hub integration — standalone app, may link later
- OAuth / user auth system — not needed until authenticated section

## Context

- Recently migrated from Gatsby 4 / React 17 / Contentful / styled-components to Next.js 16 / React 19 / Tailwind v4 / MDX
- Migration is structurally complete but all content is stale and needs refreshing
- Tim has a separate invoicing hub (Next.js, Azure App Service, Azure SQL, Azure Blobs) that may be linked or productised later
- GitHub: T-McVee — has other projects to showcase
- Tim has both dev experience (4+ years as of 2023) and marketing background (9+ years) — the site should reflect this dual perspective
- Existing Azure Static Web Apps workflow in repo is orphaned — deployment target is Azure App Service

## Constraints

- **Tech stack**: Next.js App Router, TypeScript, Tailwind CSS v4, MDX — already migrated, no framework changes
- **Hosting**: Azure App Service — consistent with Tim's other Azure infrastructure
- **Content**: File-based (MDX/JSON) — no external CMS dependency

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over Gatsby | Gatsby unmaintained, Next.js supports future interactive apps | ✓ Good |
| Tailwind over styled-components | SSR friction with styled-components in App Router | ✓ Good |
| MDX over Contentful | No external dependency for personal site content | ✓ Good |
| Azure App Service over Static Web Apps | Consistent with existing Azure infra, supports server-side features | — Pending |
| Content-first approach | Refresh content before adding interactive features | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-24 after initialization*

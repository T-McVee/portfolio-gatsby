# Feature Research

**Domain:** Personal developer portfolio / platform
**Researched:** 2026-03-24
**Confidence:** MEDIUM

> Note: WebSearch and WebFetch were unavailable during this research session. Findings are based on
> codebase audit (current site state) and training knowledge of the developer portfolio space (cutoff
> August 2025). Confidence is MEDIUM rather than HIGH for ecosystem claims. Phase-specific research
> can verify any individual item before build.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features a hiring manager, client, or recruiter expects to find. Missing these makes the site feel
unfinished or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero / splash with name and role | First impression — who is this person? | LOW | Exists. Content is stale — needs current role/title. |
| Bio / About section | Career story, background, what you do | LOW | Exists. Text is outdated (4+ years exp as of 2023). |
| Portfolio of projects | Proof of work | LOW | Exists. Only 6 projects, all pre-2024. New projects needed. |
| Skills / tech stack display | Quick signal of technical fit | LOW | Exists. Skills list is stale (Gatsby listed, Next.js missing). |
| Contact method | Way to reach you | LOW | Exists. GitHub, LinkedIn, email. Contact form stub needs Resend wired up. |
| Responsive design | Mobile users are ~50%+ of traffic | MEDIUM | Exists per handover, needs visual QA pass. |
| Working contact form | Recruiters and clients need to reach you without leaving the site | MEDIUM | Stub exists. Resend integration outstanding. |
| Open Graph / SEO metadata | Links shared on LinkedIn/Slack look professional | LOW | Exists in layout.tsx. OG image URL is hardcoded to postimg CDN — should be local. |
| Fast load / performance | Bounce rates are high on slow sites; also signals technical competence | MEDIUM | Next.js + static content should be fast. Lighthouse audit needed post-deploy. |
| HTTPS + custom domain | Without it the site looks abandoned | LOW | Azure App Service deployment handles this. CI/CD pipeline is the blocker. |

### Differentiators (Competitive Advantage)

Features that make Tim's site memorable and reflect his dual dev + marketing background.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Uses page | Signals craft and intentionality. Popular in senior dev circles (uses.tech). Shows depth beyond skills logos. | LOW | New page. MDX-based. Content: editor, terminal, hardware, services, frameworks. |
| Narrative career arc (not just timeline) | Tim's marketing → dev transition is a genuine differentiator. A bio that tells the story beats a list of job titles. | LOW | Content work, not engineering. High ROI for low effort. |
| Agentic / AI project showcase | 2025-2026 employers expect senior devs to be working with AI tooling. Showcasing agentic apps signals Tim is current. | MEDIUM | New project entries needed. May link to separate hosted tools in future milestones. |
| GitHub activity visible | Hiring managers increasingly check GitHub. A link with context ("here's what I'm building") beats an anonymous icon. | LOW | Contact methods already link to T-McVee. Consider adding pinned repo descriptions in project cards. |
| Invoicing hub as a product story | A real production app (Azure App Service + SQL + Blobs) demonstrates architecture judgment, not just front-end work. | LOW | Content only — add as a project with architecture notes. No integration needed this milestone. |
| Clean CI/CD story | Deploying to Azure App Service via GitHub Actions shows DevOps competence. Mentioning this in the bio or footer is a subtle credibility signal. | LOW | Badge or deploy status note. Secondary to just getting CI/CD working. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Dark/light mode toggle | Trendy, seen on many portfolios | Adds state management, CSS complexity, and flash-of-wrong-theme risk. Distraction from content work this milestone. | Use OS-preference via `prefers-color-scheme` media query when/if implemented. Not this milestone. |
| Animated page transitions / heavy motion | Impressive-looking demos | Accessibility issues (prefers-reduced-motion), adds JS weight, distracts from content. Tim's site already has scroll animations. | Keep existing Intersection Observer scroll reveals. No additional JS animation libraries. |
| CMS integration (Contentful, Sanity, etc.) | Easier content editing without code | Just migrated away from Contentful for good reason. Adds external dependency, cost, and auth complexity for a solo site. | MDX + JSON files in git. Edit in VS Code, commit, deploy. |
| Comments section | Engagement on blog/project pages | Requires moderation, spam handling, and auth. No blog this milestone. | Defer entirely until blog milestone. Use GitHub Discussions if needed then. |
| Real-time GitHub stats widgets | "Live" activity feels dynamic | Third-party API dependency (rate limits, downtime), adds visual noise, can expose personal activity. | Curated project cards with hand-written descriptions are more compelling than auto-generated stats. |
| Visitor analytics dashboard on the site | Shows you care about traffic | Public-facing analytics dashboards are unusual and can expose information. | Use Azure App Insights or Vercel Analytics server-side. Don't expose to visitors. |
| Blog (this milestone) | Common on dev portfolios | Out of scope until dedicated milestone. Rushing MDX blog setup alongside content refresh and CI/CD risks quality on all three. | Placeholder "writing coming soon" if needed. Full blog in a future milestone. |

---

## Feature Dependencies

```
[Working contact form]
    └──requires──> [Resend API key + env var configuration]
                       └──requires──> [Azure App Service env var setup]
                                          └──requires──> [CI/CD pipeline to Azure]

[Uses page]
    └──requires──> [New /uses route in Next.js App Router]
    └──requires──> [Uses content (MDX or JSON)]

[Project showcase (current)]
    └──requires──> [Updated project MDX files with new projects]
    └──requires──> [Project cover images in /public/images/projects/]

[SEO / OG metadata (correct)]
    └──requires──> [site-metadata.json updated with current URL, description]
    └──requires──> [Local OG image (not postimg CDN)]

[CI/CD to Azure App Service]
    └──enables──> [Resend contact form (env vars)]
    └──enables──> [HTTPS / custom domain validation]
    └──enables──> [Lighthouse audit baseline]

[Skills section (current)]
    └──requires──> [skills.json updated — remove Gatsby, add Next.js/TypeScript/Tailwind/Azure]
```

### Dependency Notes

- **CI/CD pipeline is the infrastructure dependency** for this milestone: contact form email delivery, environment variables, and production Lighthouse scores all depend on a working Azure App Service deployment.
- **Content refresh (bio, projects, skills) is independent** of CI/CD and can be done in parallel or first — it doesn't block deployment.
- **Uses page** is self-contained — new route + new content. No dependency on other features in this milestone.
- **Contact form Resend integration** has a soft dependency on CI/CD (env vars must be available in production), but can be developed and tested locally before the pipeline is ready.

---

## MVP Definition

### Launch With (v1 — this milestone)

The milestone goal is: refresh stale content, add Uses page, ship CI/CD to Azure App Service.

- [ ] Bio/About content updated — reflects current role, years of experience, dual background narrative
- [ ] Portfolio updated — includes invoicing hub, GitHub agentic projects, removes or updates stale entries
- [ ] Skills updated — accurate current stack (Next.js, TypeScript, Tailwind v4, Azure, React 19)
- [ ] Contact methods updated — correct email, verify GitHub and LinkedIn URLs
- [ ] Site metadata updated — description, OG tags, local OG image
- [ ] Uses page live at `/uses` — editor, terminal, hardware, key services/frameworks
- [ ] Contact form wired to Resend — submissions actually arrive
- [ ] CI/CD pipeline to Azure App Service via GitHub Actions — automated deploys on push to main
- [ ] Old Azure Static Web Apps workflow removed — no orphaned CI artifacts

### Add After Validation (v1.x)

These are natural follow-ons once the milestone deploys cleanly.

- [ ] Lighthouse audit and performance tuning — once deployed to Azure App Service, run audit and address any regressions
- [ ] Styling QA pass — compare against tmcvee.com reference for splash z-layering, project alternating layout, skills carousel
- [ ] OG image upgrade — replace postimg CDN reference with a proper local or generated OG image
- [ ] Deploy status badge — add to README or footer as a subtle DevOps credibility signal

### Future Consideration (v2+)

Defer until dedicated milestones.

- [ ] Blog / MDX writing section — future milestone; full content management pattern needed
- [ ] Interactive tools (games, calculators) — future milestone; separate routing and state concerns
- [ ] Authenticated section for agentic apps — future milestone; requires auth system design
- [ ] Dark/light mode — only if Tim wants it; not a user request, cosmetic improvement only

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Bio content refresh | HIGH | LOW | P1 |
| Portfolio content refresh | HIGH | LOW | P1 |
| Skills content refresh | HIGH | LOW | P1 |
| Contact methods refresh | HIGH | LOW | P1 |
| Site metadata / SEO refresh | HIGH | LOW | P1 |
| Uses page | MEDIUM | LOW | P1 |
| Resend contact form integration | MEDIUM | MEDIUM | P1 |
| CI/CD to Azure App Service | HIGH | MEDIUM | P1 |
| Remove orphaned Static Web Apps workflow | LOW | LOW | P1 |
| Styling QA pass | MEDIUM | MEDIUM | P2 |
| Lighthouse audit | MEDIUM | LOW-MEDIUM | P2 |
| OG image (local/generated) | LOW | LOW | P2 |
| Deploy status badge | LOW | LOW | P3 |
| Dark/light mode | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for this milestone
- P2: Should have, add when core is working
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

Reference portfolios examined via training knowledge (MEDIUM confidence — not live-verified).

| Feature | Typical senior dev portfolio | Josh W. Comeau / Lee Robinson style | Our approach |
|---------|------------------------------|--------------------------------------|--------------|
| Uses page | Rare to absent | Common — gear, editor, services | Add at `/uses` — MDX content |
| Blog | Common | Central feature | Out of scope this milestone |
| Dark mode | Common | Common | Deliberately deferred |
| Interactive demos | Rare | Sometimes | Out of scope this milestone |
| Project cards with tech tags | Standard | Standard | Already exists, needs content refresh |
| Hero with photo | Common | Varies | Existing splash design retained |
| Career narrative in bio | Rarely done well | Done well on personal sites | High-value content work, low cost |
| GitHub link in nav/footer | Standard | Standard | Already exists |
| Contact form | Standard | Varies | Exists, needs Resend wiring |
| Animated page transitions | Common (often overdone) | Minimal | Anti-feature — not building |

---

## Sources

- Codebase audit of `feature/migrate-to-nextjs` branch — HIGH confidence for current site state
- `HANDOVER.md` in project root — HIGH confidence for migration decisions and outstanding work
- `.planning/PROJECT.md` — HIGH confidence for milestone scope and constraints
- Training knowledge of developer portfolio patterns (uses.tech community, prominent dev personal sites) — MEDIUM confidence
- No live web sources available (WebSearch and WebFetch denied during this session)

---

*Feature research for: Personal developer portfolio / platform (Tim McVinish)*
*Researched: 2026-03-24*

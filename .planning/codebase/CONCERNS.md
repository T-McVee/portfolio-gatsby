# Codebase Concerns

**Analysis Date:** 2026-03-24

## Tech Debt

**Unvalidated JSON parsing:**
- Issue: `content.ts` uses raw `JSON.parse()` without error handling on all JSON file reads. Will crash build if JSON is malformed.
- Files: `src/lib/content.ts` (lines 8-12, 16-17, 24-26)
- Impact: Build breaks silently during deployment if any `.json` files have syntax errors
- Fix approach: Wrap `JSON.parse()` in try-catch, provide helpful error messages with file paths. Consider validating against TypeScript types at runtime.

**Hand-rolled MDX parser:**
- Issue: Custom frontmatter parser at `src/lib/content.ts` lines 47-80 handles YAML parsing manually with regex and string splitting.
- Files: `src/lib/content.ts:parseMdx()` function
- Impact: Fragile to edge cases (multiline values, special characters, YAML arrays/objects). Limited to simple key-value pairs.
- Fix approach: Add `gray-matter` or similar library if markdown complexity increases. Current simple parser works for basic frontmatter.

**No input validation on contact form:**
- Issue: Form submission handler in `src/app/PageClient.tsx` (lines 59-74) trusts form values without validation. API route only checks for empty strings.
- Files: `src/app/PageClient.tsx`, `src/app/api/contact/route.ts`
- Impact: Malicious or accidental input (script tags, extremely long messages) can be submitted. No XSS or DoS protection.
- Fix approach: Add Zod schema validation in both client and server. Sanitize email format. Set reasonable length limits on message.

**Console.log in production:**
- Issue: `src/app/api/contact/route.ts` line 16 logs contact submissions to stdout without environment check.
- Files: `src/app/api/contact/route.ts:16`
- Impact: Sensitive form data (names, emails) leaks to server logs. Privacy concern.
- Fix approach: Remove console.log or wrap in `if (process.env.NODE_ENV === 'development')` check.

**Bare window.open() without target validation:**
- Issue: `src/components/work/Project.tsx` line 40 calls `window.open(project.linkLive)` without checking URL format or protocol.
- Files: `src/components/work/Project.tsx:40`
- Impact: Could be exploited to open javascript: URIs or other malicious URLs. No validation of project.linkLive comes from trusted sources.
- Fix approach: Validate URL with `URL` constructor, ensure http/https protocol only.

## Known Bugs

**ButtonCta uses non-semantic div as button:**
- Symptoms: The contact CTA button in `src/components/ui/ButtonCta.tsx` is a `<div>` with `onClick` handler instead of `<button>` element
- Files: `src/components/ui/ButtonCta.tsx`
- Trigger: Click the contact CTA button, or inspect it in accessibility tools
- Impact: Fails keyboard navigation, screen readers don't announce as clickable, not in tab order
- Workaround: Use keyboard to open modal via Tab+Enter (doesn't work — no workaround)

**Modal doesn't prevent body scroll on all browsers:**
- Symptoms: On some browsers, user can scroll body content while modal is open
- Files: `src/app/globals.css` line 49-51
- Trigger: Open contact form modal, try to scroll
- Impact: Poor UX — user can accidentally interact with page behind modal
- Current mitigation: CSS `body:has(dialog[open]) { overflow: hidden }` works on modern browsers but not IE/older Safari
- Recommendations: Add JavaScript fallback to set `document.body.style.overflow = 'hidden'` when modal opens

**Form doesn't persist state on network error:**
- Symptoms: If fetch fails, form clears and user loses their message
- Files: `src/app/PageClient.tsx` lines 59-74
- Trigger: Submit form with network disabled
- Impact: User loses work, poor UX
- Workaround: Can't recover form data once cleared
- Fix approach: Only clear form on successful response (res.ok), show error toast instead

## Security Considerations

**Contact form endpoint is unauthenticated and unprotected:**
- Risk: `/api/contact` endpoint accepts POST with no rate limiting, authentication, or CSRF protection
- Files: `src/app/api/contact/route.ts`
- Current mitigation: None
- Recommendations: Add rate limiting (middleware or third-party), CSRF token validation, honeypot field

**Environment variables potentially exposed:**
- Risk: `.env.development` and `.env.production` files exist but contain Contentful credentials that are no longer used. Old .env files should be removed.
- Files: `.env.development`, `.env.production` (at project root)
- Current mitigation: These are .gitignored, so not in repo
- Recommendations: Remove these files entirely since Contentful is no longer used. Document required env vars in a `.env.example` file.

**Next.js config is empty:**
- Risk: `next.config.ts` has no security hardening headers, CSP, or image optimization config
- Files: `next.config.ts`
- Current mitigation: None
- Recommendations: Add `securityHeaders` middleware, CSP headers, image optimization settings (domains, cache)

## Performance Bottlenecks

**All projects and skills loaded on single page:**
- Problem: `src/app/page.tsx` synchronously loads all projects, skills, and contact methods from disk on every request
- Files: `src/lib/content.ts` (fs.readFileSync calls)
- Cause: Blocking I/O operations in getProjects, getSkills, getContactMethods
- Impact: Page generation slows as content grows. With 100+ projects, could add hundreds of ms to page load.
- Improvement path: Consider caching at build time, or lazy-loading projects via API. For now, acceptable since <10 projects.

**IntersectionObserver created per-project without memoization:**
- Problem: `src/components/work/Project.tsx` creates new IntersectionObserver for each project without cleanup optimization
- Files: `src/components/work/Project.tsx` lines 16-32
- Cause: Each observer instance is separate; no shared observer
- Impact: Minor — observers are cleaned up on unmount, but inefficient for many projects
- Improvement path: Create single shared observer at parent level, or use library like `react-intersection-observer`

**Tailwind class strings use .join() instead of static list:**
- Problem: `src/components/work/Project.tsx` lines 48-60 builds class string dynamically with array.join()
- Files: `src/components/work/Project.tsx`
- Cause: Dynamic class names prevent Tailwind from tree-shaking unused styles
- Impact: CSS bundle includes unused variations. Not severe for current size, but scales poorly.
- Improvement path: Use clsx or classnames library, or refactor to conditional classes at top level

## Fragile Areas

**Content files have no schema validation:**
- Files: `src/lib/content.ts`, all `.mdx` and `.json` in `src/content/`
- Why fragile: No type checking at parse time. If project.mdx frontmatter is missing required field, will fail at render time
- Safe modification: Add Zod schema to validate frontmatter after parsing, provide error messages
- Test coverage: No tests for content parsing — if MDX format breaks, only caught by build/test

**Modal dialog ref could be null without guard:**
- Files: `src/app/PageClient.tsx` lines 34, 44, 48
- Why fragile: dialogRef is typed as RefObject but could be null after render. showModal/close called without null check could fail
- Safe modification: Always check `dialogRef.current?.showModal()` pattern is already used, but ref type should be `React.RefObject<HTMLDialogElement>` not `| null`
- Test coverage: No tests — if ref fails to attach, will silently fail to open modal

**Inline Tailwind class strings are very long and unreadable:**
- Files: Multiple components (e.g., `src/components/work/Project.tsx` lines 48-60, `src/components/modal/ContactFormModal.tsx` lines 30-34)
- Why fragile: Hard to review, easy to miss typos, breaking on refactor
- Safe modification: Extract into named utility functions or CSS module classes
- Test coverage: No visual regression tests, so class changes not caught

## Scaling Limits

**No image optimization:**
- Current capacity: Single page with 6 project images, works fine
- Limit: If portfolio grows to 50+ projects, or adds more image-heavy sections, page load degrades
- Scaling path: Enable Next.js Image Optimization in `next.config.ts`, add `domains` for external sources, use `sizes` prop for responsive images

**No caching strategy:**
- Current capacity: Content reads from disk on every request (dev server fast, production slower)
- Limit: As content grows, blocking file I/O becomes noticeable
- Scaling path: Cache getProjects/getSkills at build time, use incremental static regeneration (ISR), or API layer

**No pagination or code-splitting:**
- Current capacity: All content rendered on single page, works for <10 projects
- Limit: 100+ projects will make page unmountably slow to scroll and interact
- Scaling path: Split projects into paginated pages or separate routes, lazy-load skills carousel

## Dependencies at Risk

**FontAwesome v6 explicitly imported:**
- Risk: Large bundle (3+ icons imported in PageClient). No tree-shaking for FA library.
- Impact: Adds ~50KB to JS bundle even if icons unused
- Recommendation: Import only icons actually used, consider smaller SVG icon library if few icons needed

**Next.js 16 is very new:**
- Risk: `next.config.ts` is empty; newer Next.js versions have breaking API changes
- Impact: Upgrades could break routing, image optimization, or middleware
- Recommendation: Pin version in package.json, test thoroughly before upgrading

## Missing Critical Features

**Contact form doesn't actually send emails:**
- Problem: `/api/contact` endpoint logs submissions but doesn't email them. User submits form but nobody is notified.
- Blocks: Contact form is non-functional for actual communication
- Priority: High — listed in HANDOVER.md as Phase 4, needs Resend or similar setup

**No test framework:**
- Problem: Zero automated tests. No test runner configured.
- Blocks: Can't safely refactor components, visual changes not caught
- Priority: High — HANDOVER.md lists Phase 5 as porting 8 existing Jest tests and adding new ones

**No deployment automation:**
- Problem: No GitHub Actions workflow for building/deploying to Azure Static Web Apps
- Blocks: Manual deployment required, no CI/CD
- Priority: High — HANDOVER.md lists Phase 6 as setting up Azure deployment

**No error boundary:**
- Problem: No React error boundary component. If any component crashes, entire page goes white.
- Blocks: Unhandled errors not surfaced or logged
- Recommendation: Add error.tsx error boundary at root and section levels, use Sentry or similar for error tracking

## Test Coverage Gaps

**Content parsing untested:**
- What's not tested: MDX frontmatter parser, JSON file reads, error cases (missing files, malformed JSON)
- Files: `src/lib/content.ts`
- Risk: If content format breaks, not caught until build or runtime
- Priority: High

**API route untested:**
- What's not tested: POST /api/contact validation, error responses, malformed request body
- Files: `src/app/api/contact/route.ts`
- Risk: Invalid requests could crash or expose errors
- Priority: Medium

**Form state management untested:**
- What's not tested: Form input changes, submit handler, reset behavior, error handling
- Files: `src/app/PageClient.tsx`, `src/components/modal/ContactForm.tsx`
- Risk: Form interactions could have hidden bugs, modal state could get stuck
- Priority: Medium

**Scroll animation untested:**
- What's not tested: IntersectionObserver triggering, CSS animation timing
- Files: `src/components/work/Project.tsx`
- Risk: Scroll animations could fail on certain devices/browsers
- Priority: Low

---

*Concerns audit: 2026-03-24*

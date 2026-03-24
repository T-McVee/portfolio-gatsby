# Stack Research

**Domain:** Personal developer portfolio/platform — Next.js App Router
**Researched:** 2026-03-24
**Confidence:** HIGH (core framework, deployment verified against official docs dated 2026-03-20)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.2.1 (current) | Framework | Already installed. Node.js server mode (`next start`) is the correct deployment target for Azure App Service — supports API routes, Server Components, ISR. Confirmed as current stable release via nextjs.org/docs. |
| React | 19.2.4 (current) | UI rendering | Already installed. React 19 brings Server Actions and improved concurrent features. No action needed. |
| TypeScript | 5.x | Type safety | Already installed. Strict mode enabled. Path alias `@/*` → `./src/*` configured. |
| Tailwind CSS | 4.2 | Styling | Already installed as `tailwindcss@^4` with `@tailwindcss/postcss`. v4 uses CSS-first config (`@import "tailwindcss"` in globals.css) — no `tailwind.config.js` needed. This is correct for v4. |

### Content & MDX

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `gray-matter` | ^4.0.3 | YAML frontmatter parsing | Replace the custom `parseMdx()` in `src/lib/content.ts`. gray-matter is the de-facto standard — handles edge cases (multiline values, nested YAML, type coercion) that the current hand-rolled parser will miss. Widely used, zero-maintenance. |
| Custom `fs`-based loader | — | Loading MDX content from `src/content/` | Keep this approach. `@next/mdx` is for rendering MDX as pages/routes — the project reads frontmatter as data and renders it via React components, which is a different pattern. The `fs` + gray-matter approach is correct for a portfolio data model. |

**Note on `@next/mdx`:** Do NOT add this package for this milestone. The project loads MDX files as data (frontmatter + body string), not as renderable components. `@next/mdx` solves a different problem. Adding it creates unnecessary complexity.

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@fortawesome/react-fontawesome` | 0.2.2 | Icon components | Already installed. Appropriate for a dev portfolio — dev-recognisable brand icons (GitHub, LinkedIn) plus UI icons. Keep. |
| `@fortawesome/fontawesome-svg-core` | 6.7.2 | Core FA library | Already installed. Required for icon type definitions. Keep. |
| `@fortawesome/free-brands-svg-icons` | 6.7.2 | Brand icons (GitHub, etc.) | Already installed. Keep. |
| `@fortawesome/free-solid-svg-icons` | 6.7.2 | UI icons | Already installed. Keep. |
| `@fortawesome/free-regular-svg-icons` | 6.7.2 | Regular style icons | Already installed. Keep if used, remove if not. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| TypeScript 5.x | Static type checking | Already configured. `tsconfig.json` targets ES2017 with strict mode. No changes needed. |
| PostCSS + `@tailwindcss/postcss` | Tailwind v4 CSS pipeline | Already configured in `postcss.config.mjs`. Required for Tailwind v4 — do not add `autoprefixer` as a separate plugin (Tailwind v4 handles vendor prefixes natively). |
| `@types/node` | Node.js types | Required for `fs`, `path` usage in content loaders. Already installed. |

### CI/CD & Deployment

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| GitHub Actions | CI/CD pipeline | Native integration with Azure. Replace the existing Azure Static Web Apps workflow — it targets the wrong service and uses outdated action versions. |
| Azure App Service | Hosting | Consistent with Tim's existing Azure infra (invoicing hub). Supports `next start` (Node.js server mode) natively. All Next.js features work including API routes and Server Components. |
| Publish Profile (GitHub Secret) | Deployment auth | Simpler to set up than OpenID Connect for a personal site. Download from Azure Portal → App Service → Overview → "Download publish profile". Store as `AZURE_WEBAPP_PUBLISH_PROFILE` secret. |

**Azure App Service deployment config required in `next.config.ts`:**
```ts
// No special config needed for Node.js server mode
// next start works out of the box on Azure App Service
// Set startup command in Azure: "npm run start"
// Set Node.js version in Azure App Service config to match local (20.x+)
```

**Replace** `.github/workflows/azure-static-web-apps-happy-wave-0b97bea00.yml` with a new workflow targeting Azure App Service using `azure/webapps-deploy@v3`.

---

## Installation

```bash
# Add gray-matter (replace custom frontmatter parser)
npm install gray-matter

# Types for gray-matter (may already be included)
npm install -D @types/gray-matter
```

No other additions needed for this milestone. All core dependencies are already installed.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `gray-matter` for frontmatter | Custom `parseMdx()` (current) | Never — the current implementation has known gaps: no type coercion, brittle array parsing, no nested YAML support. gray-matter has zero downside for this use case. |
| `next start` (Node.js server) | `output: "export"` (static) | Only if you never need API routes, Server Actions, or ISR. This portfolio has a contact form API route — static export would break it. |
| Azure App Service | Azure Static Web Apps | Static Web Apps is appropriate for fully static sites (no server). This project is not fully static (contact form API route requires Node.js). The existing Static Web Apps workflow is orphaned for this reason. |
| Publish profile auth (GitHub secret) | OpenID Connect | OpenID Connect is more secure but requires creating a Microsoft Entra app, service principal, and federated credentials via Azure CLI. Appropriate if this were a team environment; overkill for a personal site. |
| Native `next/image` | `<img>` tags | Use `next/image` for any new images added to the site — it provides automatic WebP conversion, lazy loading, and size optimization with zero extra dependencies. |
| Native Next.js metadata API | `next-seo` | `next-seo` is a third-party library that was needed pre-App Router. App Router has a native `metadata` export that covers all the same ground. Do NOT add `next-seo`. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `next-seo` | Unnecessary — Next.js App Router has a built-in `metadata` export that handles `<title>`, description, OG, Twitter cards, canonical URLs, and `robots`. Adding `next-seo` adds a dependency that duplicates native capability. | `export const metadata: Metadata = { ... }` in `layout.tsx` or `page.tsx` |
| `output: "standalone"` in next.config | Standalone mode creates a self-contained Docker image — appropriate for Docker/Kubernetes. Azure App Service runs Node.js natively and does not need a Docker container for a simple portfolio. Using standalone adds complexity without benefit here. | `next start` (default Node.js server mode) |
| `@next/mdx` | Solves the wrong problem for this project. `@next/mdx` is for rendering `.mdx` files as Next.js route pages. This project reads MDX as structured data (frontmatter + body). Adding `@next/mdx` would require a refactor and introduces complexity not needed for a simple portfolio. | Keep the `fs`-based loader in `src/lib/content.ts`, replace custom parser with `gray-matter`. |
| `styled-components` | Already removed (migration from Gatsby). SSR with styled-components in App Router requires a special registry wrapper and has been a known source of flash-of-unstyled-content issues. | Tailwind CSS v4 (already in place) |
| `react-helmet` | Pre-App Router head management library. Obsolete in App Router. | Native `metadata` API |
| `autoprefixer` as a standalone PostCSS plugin | Tailwind CSS v4 handles vendor prefixing internally via Lightning CSS. Adding `autoprefixer` to `postcss.config.mjs` would run it redundantly and can cause conflicts. | Leave `postcss.config.mjs` as-is (only `@tailwindcss/postcss`) |

---

## Stack Patterns by Variant

**For the contact form API route:**
- Use Next.js Route Handler (`app/api/contact/route.ts`) — already in place
- Keep the API route as a Server-side handler; do not convert to a Client Component with `fetch`
- Environment variables for email service (e.g. SMTP credentials) go in `.env.production` and are set as Azure App Service Application Settings

**For SEO metadata:**
- Use `export const metadata: Metadata` in `src/app/layout.tsx` for site-wide defaults
- Use `generateMetadata()` if dynamic metadata per-page is ever needed
- Add `opengraph-image.png` to `src/app/` as a static file for OG image — no code needed

**For MDX content loading:**
- Continue loading via `fs.readFileSync` in Server Components/Route Handlers
- Replace `parseMdx()` with `gray-matter` — it returns `{ data, content }` where `data` is frontmatter and `content` is the body
- MDX body is currently used as a plain string (rendered as HTML in `Description.tsx`) — this works but renders no JSX components; acceptable for the current portfolio model

**For Azure App Service deployment:**
- Set Node.js version: 20.x in Azure App Service configuration
- Set startup command: `npm run start` (or `node server.js` if using custom server)
- Build must run during deployment: use `npm run build` in the GitHub Actions workflow before deploying

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `tailwindcss@^4` | `@tailwindcss/postcss@^4` | Must use the `@tailwindcss/postcss` plugin, not the legacy `tailwindcss` PostCSS plugin. Already correct in this project. |
| `react@19.2.4` | `@types/react@^19` | Must match major versions. Already correct. |
| `next@16.2.1` | `react@19.x`, `react-dom@19.x` | Next.js 16 requires React 19. Already correct. |
| `next@16.2.1` | `@types/node@^20` | Node.js 20 type definitions are compatible. Already correct. |
| `gray-matter@^4` | All Node.js versions supported by Next.js | No known compatibility issues. |

---

## Sources

- `https://nextjs.org/docs/app/getting-started/deploying` — Deployment options confirmed (Node.js server, Docker, static export, adapters). Version: 16.2.1, last updated 2026-03-20. **HIGH confidence.**
- `https://nextjs.org/docs/app/guides/self-hosting` — Self-hosting configuration, caching, environment variables. Version: 16.2.1, last updated 2026-03-20. **HIGH confidence.**
- `https://nextjs.org/docs/app/guides/mdx` — MDX integration patterns for App Router. Version: 16.2.1, last updated 2026-03-20. **HIGH confidence.** Confirms `@next/mdx` is for page-based rendering, not data loading.
- `https://nextjs.org/docs/app/getting-started/metadata-and-og-images` — Native metadata API, OG images, favicons. Version: 16.2.1, last updated 2026-03-20. **HIGH confidence.** Confirms no third-party SEO library needed.
- `https://tailwindcss.com/docs/installation/framework-guides/nextjs` — Tailwind v4.2 installation with Next.js. **HIGH confidence.** Current version confirmed as 4.2.
- `https://learn.microsoft.com/en-us/azure/app-service/deploy-github-actions` — GitHub Actions deployment to Azure App Service. Updated 2025-11-28. Recommends OpenID Connect (secure) or publish profile (simpler). **HIGH confidence.**
- `package.json` (this repo) — Installed versions confirmed: Next.js 16.2.1, React 19.2.4, Tailwind v4, TypeScript 5.x, FontAwesome 6.7.2. **HIGH confidence.**
- `src/lib/content.ts` (this repo) — Current custom frontmatter parser reviewed. Identified specific gaps that motivate gray-matter replacement. **HIGH confidence.**

---

*Stack research for: Personal developer portfolio/platform (Next.js App Router, Azure App Service)*
*Researched: 2026-03-24*

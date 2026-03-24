# External Integrations

**Analysis Date:** 2026-03-24

## APIs & External Services

**Email/Contact:**
- Status: TODO - Placeholder implementation
- Location: `src/app/api/contact/route.ts`
- Current implementation: Logs contact form submissions to console only
- Planned integration: Resend or similar email service (not yet implemented)
- Note: TODO comment indicates need to wire up email service

**Icon CDN:**
- Font Awesome - Icons served via @fortawesome packages
- No external CDN calls - Icons bundled as npm dependencies
- SVG rendering through React components

## Data Storage

**Databases:**
- None - This is a static site with no persistent database

**File Storage:**
- Local filesystem only
- Static assets: `public/images/` directory
- No cloud storage integration

**Caching:**
- No explicit caching layer configured
- Next.js built-in caching for static pages and assets
- Default browser caching via HTTP headers

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system
- Portfolio site does not require authentication
- Contact form has no auth requirements

## Monitoring & Observability

**Error Tracking:**
- None detected - No Sentry, Rollbar, or similar

**Logs:**
- Console logging only
- Contact form submissions logged to console: `console.log("Contact form submission:", { name, email, message })`
- No centralized logging infrastructure

**Analytics:**
- Not detected - No Google Analytics, Mixpanel, or similar configured

## CI/CD & Deployment

**Hosting:**
- Azure Static Web Apps (primary deployment target)
- GitHub repository connected for CI/CD

**CI Pipeline:**
- GitHub Actions workflow: `.github/workflows/azure-static-web-apps-happy-wave-0b97bea00.yml`
- Triggers: Push to master branch, pull request events
- Build: Runs npm build via Azure Static Web Apps deploy action
- Deploy: Outputs to `public/` directory
- Secrets used: `AZURE_STATIC_WEB_APPS_API_TOKEN_HAPPY_WAVE_0B97BEA00`, `GITHUB_TOKEN`

**Deployment Config:**
- App location: `/` (root)
- Output location: `public/` (built app content)
- API location: Empty (no separate API deployment)

## Environment Configuration

**Required env vars:**
- None detected in current codebase
- Placeholder `.env.development` and `.env.production` files exist but unused

**Secrets location:**
- Azure Static Web Apps stores deployment token
- GitHub Actions secrets: `AZURE_STATIC_WEB_APPS_API_TOKEN_HAPPY_WAVE_0B97BEA00`

## Webhooks & Callbacks

**Incoming:**
- Contact form endpoint: `POST /api/contact` (`src/app/api/contact/route.ts`)
- Current validation: Requires name, email, message fields
- Response: JSON `{ success: true }` or error with 400 status

**Outgoing:**
- None currently implemented
- Planned: Email notifications via Resend (TODO)

## Content & Static Assets

**Images:**
- Favicon: `public/images/favicon.png` (referenced in metadata)
- Other assets: `public/images/` directory
- Open Graph image: Reference in `src/content/site-metadata.json`

**Content Format:**
- MDX for project descriptions with YAML frontmatter
- JSON for structured data (skills, contact methods, site metadata)
- HTML/CSS generated from React components

## Development vs Production

**Development:**
- Uses `.env.development`
- Local development server: `npm run dev`

**Production:**
- Uses `.env.production`
- Built output: `npm run build` creates optimized Next.js build
- Static export through Azure Static Web Apps
- Deployed to Azure Static Web Apps preview/production environments

---

*Integration audit: 2026-03-24*

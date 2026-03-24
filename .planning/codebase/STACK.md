# Technology Stack

**Analysis Date:** 2026-03-24

## Languages

**Primary:**
- TypeScript 5.x - All application code, full strict mode enabled
- CSS - Styling with Tailwind CSS v4 and custom CSS
- JavaScript - Build configuration and scripts

**Secondary:**
- JSON - Content files and configuration (`.json`)
- MDX - Project descriptions and content (`.mdx`)

## Runtime

**Environment:**
- Node.js - Server-side execution for Next.js
- Browser - Client-side React application

**Package Manager:**
- npm - Dependency management
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.2.1 - React meta-framework for production web applications
- React 19.2.4 - UI library for component rendering
- React DOM 19.2.4 - DOM rendering for React

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind
- PostCSS - CSS transformation pipeline (configured in `postcss.config.mjs`)

**UI & Icons:**
- @fortawesome/react-fontawesome 0.2.2 - React wrapper for Font Awesome
- @fortawesome/fontawesome-svg-core 6.7.2 - Core Font Awesome library
- @fortawesome/free-solid-svg-icons 6.7.2 - Solid icon set
- @fortawesome/free-brands-svg-icons 6.7.2 - Brand icon set
- @fortawesome/free-regular-svg-icons 6.7.2 - Regular icon set

**Build/Dev:**
- TypeScript 5 - Type checking and compilation
- @types/node 20 - Node.js type definitions
- @types/react 19 - React type definitions
- @types/react-dom 19 - React DOM type definitions

## Key Dependencies

**Critical:**
- next 16.2.1 - Core framework providing SSR, routing, API routes, build optimization
- react 19.2.4 - Foundation for all UI components
- tailwindcss 4 - Essential styling system

**Icon System:**
- @fortawesome/react-fontawesome - Provides `FontAwesomeIcon` component used throughout UI
- @fortawesome/fontawesome-svg-core - Required for icon type definitions and core functionality
- Font Awesome icon packs (solid, brands, regular) - Icon sets used in skill badges and social links

## Configuration

**Environment:**
- Development: `.env.development` (exists but not checked for contents)
- Production: `.env.production` (exists but not checked for contents)
- Environment variables loaded automatically by Next.js

**Build:**
- `next.config.ts` - Next.js configuration (minimal, standard setup)
- `tsconfig.json` - TypeScript compiler options:
  - Target: ES2017
  - Strict mode enabled
  - Path alias: `@/*` maps to `./src/*`
  - JSX: react-jsx (automatic runtime)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS

## Platform Requirements

**Development:**
- Node.js (version compatible with npm in package-lock.json)
- npm (v9 or higher recommended)

**Production:**
- Deployment target: Azure Static Web Apps
- CI/CD: GitHub Actions (Azure Static Web Apps CI/CD workflow)
- Build output: `public/` directory
- Next.js supports serverless deployment

## Content Management

**Static Content:**
- Project descriptions: `src/content/projects/*.mdx` - MDX files with YAML frontmatter
- Skills data: `src/content/skills.json` - JSON configuration
- Contact methods: `src/content/contact-methods.json` - JSON configuration
- Site metadata: `src/content/site-metadata.json` - JSON configuration

**Content Loading:**
- File-based (no database) - Content loaded at build/server-side
- Custom MDX parser in `src/lib/content.ts` - Parses YAML frontmatter and markdown body

---

*Stack analysis: 2026-03-24*

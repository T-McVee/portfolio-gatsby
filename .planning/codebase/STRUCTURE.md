# Codebase Structure

**Analysis Date:** 2026-03-24

## Directory Layout

```
portfolio-gatsby/
├── src/                           # Application source code
│   ├── app/                       # Next.js App Router pages and routes
│   │   ├── api/                   # API route handlers
│   │   │   └── contact/           # Contact form submission endpoint
│   │   ├── layout.tsx             # Root layout (metadata, HTML wrapper)
│   │   ├── page.tsx               # Homepage (server component, loads content)
│   │   ├── PageClient.tsx         # Homepage client component (modals, forms)
│   │   └── globals.css            # Global styles, Tailwind theme config
│   ├── components/                # Reusable React components
│   │   ├── ui/                    # Atomic UI components (buttons, icons, etc.)
│   │   ├── splash/                # Hero/splash section components
│   │   ├── bio/                   # About section components
│   │   ├── work/                  # Portfolio/projects section components
│   │   ├── skills/                # Skills section components
│   │   └── modal/                 # Contact form modal and related components
│   ├── lib/                       # Utilities and type definitions
│   │   ├── content.ts             # Content loader (reads JSON/MDX files)
│   │   └── types.ts               # TypeScript type definitions
│   └── content/                   # Static portfolio content
│       ├── site-metadata.json     # Site title, description, OG tags
│       ├── skills.json            # Skills list
│       ├── contact-methods.json    # Social links and contact info
│       └── projects/              # Project descriptions (MDX files)
├── public/                        # Static assets
│   └── images/                    # Image files (backgrounds, project covers)
├── .github/                       # GitHub configuration
├── .planning/                     # GSD planning documents
├── package.json                   # Dependencies, scripts
├── tsconfig.json                  # TypeScript configuration (with @ path alias)
├── postcss.config.mjs             # PostCSS/Tailwind configuration
└── README.md                      # Project documentation

```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router configuration, pages, API routes
- Contains: Page components (TSX), route handlers (TS), layout wrapper, global styles
- Key files: `page.tsx` (homepage), `layout.tsx` (HTML wrapper), `PageClient.tsx` (interactive layer), `api/contact/route.ts` (form endpoint)

**`src/components/`:**
- Purpose: Modular React components organized by feature/section
- Contains: 28 TSX components split into 6 subdirectories
- Key files: UI primitives in `ui/`, section components in `splash/`, `bio/`, `work/`, `skills/`, modal in `modal/`

**`src/components/ui/`:**
- Purpose: Reusable atomic UI components
- Contains: Button, ButtonCta, H1, Footer, Icon, LowerCta, SocialIcons
- Pattern: Presentational components that accept children and callback props

**`src/components/splash/`:**
- Purpose: Hero section with background, logo, header, social links
- Contains: Splash (container), Logo, HeaderUpper, HeaderLower, BgFront (background image)
- Pattern: Composition of sub-components, receives contactMethods array and modal handler

**`src/components/bio/`:**
- Purpose: About/biography section with experience blocks
- Contains: Bio (container), XpBlock (individual experience row)
- Pattern: Static rendered component, no props

**`src/components/work/`:**
- Purpose: Portfolio/projects showcase section
- Contains: Work (container), Projects, Project (individual card), Tags, ProjectLinks
- Pattern: Maps project array to cards, displays title, tags, links, description

**`src/components/skills/`:**
- Purpose: Technology skills section
- Contains: Skills (container), SkillsList, Skill (individual item)
- Pattern: Maps skills array to list items, renders icon or image

**`src/components/modal/`:**
- Purpose: Contact form modal and success screen
- Contains: ContactFormModal (dialog wrapper), ContactForm (form fields), Thankyou (success screen)
- Pattern: Manages dialog open/close, form state, success state

**`src/lib/`:**
- Purpose: Business logic, utilities, type definitions
- Contains: `content.ts` (file I/O, content loading), `types.ts` (TypeScript interfaces)
- Pattern: Pure functions, synchronous file I/O at build/request time

**`src/content/`:**
- Purpose: Static portfolio data in JSON and MDX format
- Contains:
  - `site-metadata.json` - site title, description, OG tags
  - `skills.json` - technology skills with icons/images
  - `contact-methods.json` - social media links
  - `projects/` - 6 MDX files with frontmatter (title, tags, links, cover) + markdown description

**`public/images/`:**
- Purpose: Static image assets
- Contains: Background images, project cover images, favicon
- Pattern: Referenced in components via Next.js Image component

## Key File Locations

**Entry Points:**
- `src/app/page.tsx` - Homepage: fetches content, renders PageClient
- `src/app/layout.tsx` - Root layout: sets metadata, wraps with HTML
- `src/app/api/contact/route.ts` - Contact API: validates and processes form

**Configuration:**
- `tsconfig.json` - TypeScript compiler options, path alias (`@/*` → `src/*`)
- `postcss.config.mjs` - Tailwind CSS pipeline
- `package.json` - Dependencies, dev scripts

**Core Logic:**
- `src/lib/content.ts` - Loads projects from MDX, skills/metadata from JSON
- `src/lib/types.ts` - Type definitions for Project, Skill, ContactMethod, SiteMetadata

**Styling:**
- `src/app/globals.css` - Theme variables (colors, breakpoints), animations, Tailwind import

## Naming Conventions

**Files:**
- Component files: PascalCase (`Splash.tsx`, `ContactForm.tsx`)
- API routes: lowercase with hyphens (`contact/route.ts`)
- Utility files: camelCase (`content.ts`, `types.ts`)
- Config files: lowercase with extension (`.mjs`, `.json`)

**Directories:**
- Feature sections: lowercase plural (`components/splash/`, `components/skills/`)
- API paths: lowercase with hyphens (`api/contact/`)
- Content type: lowercase plural (`projects/`)

**Variables and Functions:**
- Functions: camelCase (`getSiteMetadata()`, `getProjects()`, `handleOpenModal()`)
- React Components: PascalCase (`Splash`, `Bio`, `ContactFormModal`)
- State variables: camelCase (`formInfo`, `isSubmitted`, `dialogRef`)
- Props interfaces: PascalCase + Props suffix (`SplashProps`, `ContactFormModalProps`)

**Types:**
- Interfaces: PascalCase (`Project`, `Skill`, `ContactMethod`, `SiteMetadata`)
- Type names: PascalCase (no T prefix convention used)

## Where to Add New Code

**New Feature:**
- Primary code: `src/components/[feature-name]/[Component].tsx`
- Types: Add interface to `src/lib/types.ts`
- If needs API: `src/app/api/[route]/route.ts`

**New Component/Module:**
- UI component (reusable): `src/components/ui/[ComponentName].tsx`
- Feature component (section-specific): `src/components/[section]/[ComponentName].tsx`
- Follow PascalCase naming

**Utilities:**
- Shared helpers: `src/lib/[utility-name].ts`
- Export as named functions
- Add types to `src/lib/types.ts` if needed

**New Content:**
- Project: Add `XX-project-name.mdx` to `src/content/projects/` with YAML frontmatter
- Metadata: Update JSON files in `src/content/` (skills.json, contact-methods.json, site-metadata.json)

**Styling:**
- Global styles: Add to `src/app/globals.css`
- Component-scoped styles: Use Tailwind className prop
- Custom colors/breakpoints: Update `@theme` block in `globals.css`

## Special Directories

**`src/content/`:**
- Purpose: Static portfolio content (not compiled code)
- Generated: No (manually created)
- Committed: Yes

**`public/images/`:**
- Purpose: Static image assets served directly
- Generated: No (manually added)
- Committed: Yes

**`.next/`:**
- Purpose: Next.js build output (cache, compiled code)
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)

**`.planning/codebase/`:**
- Purpose: GSD mapping documents (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Generated: Yes (by mapping agent)
- Committed: Yes

---

*Structure analysis: 2026-03-24*

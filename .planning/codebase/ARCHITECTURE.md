# Architecture

**Analysis Date:** 2026-03-24

## Pattern Overview

**Overall:** Next.js App Router with server-side data loading and client-side interactivity

**Key Characteristics:**
- Server components render static content from JSON/MDX files
- Client components handle modal state and form interactions
- TypeScript for type safety across layers
- Tailwind CSS for styling with custom theme
- FontAwesome icons for UI iconography

## Layers

**Server Layer (Next.js App Router):**
- Purpose: Data fetching, static generation, metadata handling
- Location: `src/app/`
- Contains: Page components, API routes, layout configuration
- Depends on: Content library (`src/lib/content.ts`)
- Used by: Client layer components, browser requests

**Data/Content Layer:**
- Purpose: Manage content loading from JSON files and MDX files
- Location: `src/lib/`
- Contains: Type definitions (`types.ts`), content loaders (`content.ts`)
- Depends on: File system (fs module), process environment
- Used by: Server pages and client components

**Component Layer:**
- Purpose: Render UI across multiple feature sections
- Location: `src/components/`
- Contains: Page sections (splash, bio, work, skills), UI primitives, modals
- Depends on: Types from `src/lib/types.ts`, React, FontAwesome
- Used by: Server pages and other components

**Content Data:**
- Purpose: Static portfolio data
- Location: `src/content/`
- Contains: JSON files (site metadata, skills, contact methods), MDX files (project descriptions)
- Depends on: None
- Used by: Content loader layer

## Data Flow

**Page Rendering Flow:**

1. Browser requests `/`
2. `src/app/page.tsx` (Server Component) loads content via `content.ts` functions
3. Data passes to `src/app/PageClient.tsx` as props
4. `PageClient` renders layout with all section components (Splash, Bio, Work, Skills, Footer)
5. Each section component receives typed data and renders via Tailwind styles

**Contact Form Submission Flow:**

1. User fills form in `src/components/modal/ContactFormModal.tsx`
2. Form submission calls `handleFormSubmit` in `PageClient`
3. Fetch to `/api/contact` route (POST) with form data
4. `src/app/api/contact/route.ts` validates and logs submission
5. Response updates `isSubmitted` state, shows thank you message
6. User closes modal, form resets

**State Management:**
- Modal open/close state lives in `PageClient` (dialogRef, isSubmitted)
- Form input state managed via `formInfo` state object in `PageClient`
- Content data is immutable props passed from server
- No external state management (Redux, Zustand, etc.)

## Key Abstractions

**Content Loader:**
- Purpose: Parse and load portfolio content from files
- Examples: `src/lib/content.ts` (getSiteMetadata, getProjects, getSkills, getContactMethods)
- Pattern: File I/O at build time, returns typed data structures

**Type System:**
- Purpose: Define shape of data across application
- Examples: `src/lib/types.ts` exports Project, Skill, ContactMethod, SiteMetadata
- Pattern: Strict TypeScript interfaces, enforced at compile time

**Component Composition:**
- Purpose: Break UI into reusable sections
- Examples: Splash (top hero), Bio (about), Work (projects), Skills (technologies), Footer
- Pattern: Props-based composition, each section receives typed data array

**MDX Parsing:**
- Purpose: Extract frontmatter and markdown from project files
- Examples: `parseMdx()` in `src/lib/content.ts`
- Pattern: Regex-based frontmatter extraction, returns structured data

## Entry Points

**Web Application:**
- Location: `src/app/page.tsx`
- Triggers: Browser navigation to `/`
- Responsibilities: Load all content (projects, skills, contact methods), pass to PageClient

**API Endpoint:**
- Location: `src/app/api/contact/route.ts`
- Triggers: POST request to `/api/contact`
- Responsibilities: Validate contact form submission, log submission, return success response

**Layout:**
- Location: `src/app/layout.tsx`
- Triggers: All page requests
- Responsibilities: Set site metadata, wrap page with HTML/body, load global styles

## Error Handling

**Strategy:** Minimal error handling currently, with TODO comments for future improvement

**Patterns:**
- Form submission catches fetch errors and logs to console: `catch (error) => console.error("Form submission error:", error)`
- API endpoint validates required fields, returns 400 status on validation failure
- MDX parsing returns empty frontmatter if match fails: `if (!match) return { frontmatter: {}, body: content }`
- Content loaders use synchronous file I/O, will throw if files missing

## Cross-Cutting Concerns

**Logging:** Uses native `console.log()` for API submissions and errors

**Validation:** Form validation in API route checks for required fields (name, email, message)

**Authentication:** None - portfolio is public-facing with no auth required

**Styling:** Tailwind CSS with custom theme variables defined in `src/app/globals.css`, responsive breakpoints (phone: 376px, tablet: 768px, laptop: 1304px, xl: 1440px)

---

*Architecture analysis: 2026-03-24*

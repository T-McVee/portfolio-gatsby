## Project

**Tim's Personal Platform**

A personal website and platform for Tim — a senior software developer and tech leader based in Brisbane. The public-facing site showcases his career story, portfolio of projects, tech stack/tools (Uses page), and contact information. Over time it will grow into a launchpad for interactive tools, a blog, and authenticated apps.

**Core Value:** The site must clearly convey Tim's unique career story and passion as a senior developer and tech leader — everything else builds on that foundation.

### Constraints

- **Tech stack**: Next.js App Router, TypeScript, Tailwind CSS v4, MDX — already migrated, no framework changes
- **Hosting**: Azure App Service — consistent with Tim's other Azure infrastructure
- **Content**: File-based (MDX/JSON) — no external CMS dependency

## Technology Stack

## Languages
- TypeScript 5.x - All application code, full strict mode enabled
- CSS - Styling with Tailwind CSS v4 and custom CSS
- JavaScript - Build configuration and scripts
- JSON - Content files and configuration (`.json`)
- MDX - Project descriptions and content (`.mdx`)
## Runtime
- Node.js - Server-side execution for Next.js
- Browser - Client-side React application
- npm - Dependency management
- Lockfile: `package-lock.json` (present)
## Frameworks
- Next.js 16.2.1 - React meta-framework for production web applications
- React 19.2.4 - UI library for component rendering
- React DOM 19.2.4 - DOM rendering for React
- Tailwind CSS 4 - Utility-first CSS framework
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind
- PostCSS - CSS transformation pipeline (configured in `postcss.config.mjs`)
- @fortawesome/react-fontawesome 0.2.2 - React wrapper for Font Awesome
- @fortawesome/fontawesome-svg-core 6.7.2 - Core Font Awesome library
- @fortawesome/free-solid-svg-icons 6.7.2 - Solid icon set
- @fortawesome/free-brands-svg-icons 6.7.2 - Brand icon set
- @fortawesome/free-regular-svg-icons 6.7.2 - Regular icon set
- TypeScript 5 - Type checking and compilation
- @types/node 20 - Node.js type definitions
- @types/react 19 - React type definitions
- @types/react-dom 19 - React DOM type definitions
## Key Dependencies
- next 16.2.1 - Core framework providing SSR, routing, API routes, build optimization
- react 19.2.4 - Foundation for all UI components
- tailwindcss 4 - Essential styling system
- @fortawesome/react-fontawesome - Provides `FontAwesomeIcon` component used throughout UI
- @fortawesome/fontawesome-svg-core - Required for icon type definitions and core functionality
- Font Awesome icon packs (solid, brands, regular) - Icon sets used in skill badges and social links
## Configuration
- Development: `.env.development` (exists but not checked for contents)
- Production: `.env.production` (exists but not checked for contents)
- Environment variables loaded automatically by Next.js
- `next.config.ts` - Next.js configuration (minimal, standard setup)
- `tsconfig.json` - TypeScript compiler options:
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
## Platform Requirements
- Node.js (version compatible with npm in package-lock.json)
- npm (v9 or higher recommended)
- Deployment target: Azure Static Web Apps
- CI/CD: GitHub Actions (Azure Static Web Apps CI/CD workflow)
- Build output: `public/` directory
- Next.js supports serverless deployment
## Content Management
- Project descriptions: `src/content/projects/*.mdx` - MDX files with YAML frontmatter
- Skills data: `src/content/skills.json` - JSON configuration
- Contact methods: `src/content/contact-methods.json` - JSON configuration
- Site metadata: `src/content/site-metadata.json` - JSON configuration
- File-based (no database) - Content loaded at build/server-side
- Custom MDX parser in `src/lib/content.ts` - Parses YAML frontmatter and markdown body

## Conventions

## Naming Patterns
- Components: PascalCase (e.g., `Button.tsx`, `ContactForm.tsx`, `Project.tsx`)
- Utilities/Services: camelCase (e.g., `content.ts`, `types.ts`)
- Entry points: lowercase (e.g., `layout.tsx`, `page.tsx`, `route.ts`)
- Components: PascalCase (same as filename)
- Utility functions: camelCase (e.g., `parseMdx()`, `getProjects()`, `getSiteMetadata()`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleOpenModal()`, `handleFormChange()`, `handleFormSubmit()`)
- Helper functions: camelCase (e.g., `openSite()`)
- Constants: UPPER_SNAKE_CASE or camelCase (observed: camelCase for objects in CSS-in-JS, UPPER_SNAKE_CASE not used)
- State variables: camelCase (e.g., `isSubmitted`, `formInfo`, `dialogRef`)
- Props/parameters: camelCase (e.g., `rightAlign`, `handleOpenModal`, `contactMethods`)
- CSS class strings: kebab-case within className attributes
- Interfaces: PascalCase (e.g., `ButtonProps`, `ProjectProps`, `ContactFormProps`)
- Type aliases: PascalCase (e.g., `Project`, `Skill`, `ContactMethod`)
- Union/discriminated unions: PascalCase (e.g., `IconProp`)
## Code Style
- Indentation: 2 spaces
- Line length: Pragmatic (no strict limit observed)
- Semicolons: Always used
- Quotes: Double quotes for JSX attributes and strings
- No ESLint config detected
- No Prettier config detected
- Code relies on TypeScript strict mode for type safety
- Manual formatting appears to be the convention
## Import Organization
- `@/*` maps to `./src/*`
- Always use alias paths for absolute imports
- Example: `@/lib/content`, `@/components/ui/Button`, `@/lib/types`
## Error Handling
- Try-catch blocks for async operations (seen in `PageClient.tsx` form submission)
- Console.error for logging errors: `console.error("Form submission error:", error)`
- Graceful fallbacks using conditional returns: `if (!skills) return null;`
- JSON parsing with try-catch for safe parsing: `try { value = JSON.parse(value); } catch { ... }`
- Silent failure with console logging (form submission)
- Null checks before rendering (conditional returns)
- Optional chaining and non-null assertions for TypeScript (`skill.faLibrary!`)
## Logging
- `console.error()` for error messages
- Descriptive context: `console.log("Contact form submission:", { name, email, message })`
- Used minimally in production code
- Not used for debug logging in component code
## Comments
- Minimal comment usage observed
- Code is generally self-documenting through clear naming
- JSDoc not used in this codebase
## Function Design
- Small, focused functions
- Single responsibility principle observed
- Most components 15-50 lines
- Utility functions kept under 30 lines
- Use destructuring for props (all components use this pattern)
- TypeScript interfaces define prop shapes explicitly
- Optional parameters use `?:` syntax with default values
- Components return JSX.Element (implicit)
- Utility functions explicitly return typed values
- Null checks used for conditional rendering: `if (!skills) return null;`
## Module Design
- Default export for components: `export default function ComponentName(...)`
- Named export for utility functions: `export function functionName(...)`
- All files have a single primary export
- Not used in this codebase
- Each component has its own file
- Each util has its own file
- One component per file
- Props defined as interface immediately above component
- Type imports using `type` keyword: `import type { Project } from "@/lib/types"`
- CSS modules not used
- Tailwind CSS classes inline in className attributes
- Reusable class strings extracted to variables: `const inputClasses = "..."`
- Custom CSS animations in `globals.css` for complex effects
## TypeScript Patterns
- `"strict": true` in tsconfig.json
- All props require explicit types
- Non-null assertions used where type safety allows: `skill.faLibrary!`
- Type guards for conditional rendering
- `React.ReactNode` for children props
- `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>` for form handlers
- `React.FormEvent` for form submit events
- `React.RefObject<HTMLDialogElement | null>` for dialog refs
- Dedicated interface for each component's props
- Always placed before component function
- Extends with `extends` only when necessary (not observed)
## Tailwind CSS Conventions
- Responsive modifiers (e.g., `max-tablet:`, `max-laptop:`, `max-phone:`)
- Hover states: `hover:text-accent-1`, `hover:scale-110`
- Transition utilities: `transition-all duration-200`
- Breakpoints defined in `globals.css` theme variables
- Colors: `--color-accent-1`, `--color-grey`, `--color-dark-grey`
- Spacing: `--radius-small: 8px`
- Breakpoints: `--breakpoint-phone`, `--breakpoint-tablet`, `--breakpoint-laptop`
- Multi-line classes joined with `.join(" ")` for readability (seen in `Project.tsx`)
- Ternary operators for conditional classes
- Template literals for dynamic class composition
## Data Structure Patterns
- Synchronous file system operations in server components: `fs.readFileSync()`
- MDX frontmatter parsing done manually (no external parser)
- YAML-like parsing for frontmatter with custom logic
- Local component state with `useState()` for forms and modals
- Refs for DOM elements: `useRef<HTMLDialogElement>(null)`
- Props drilling for data (no context API or state management library)

## Architecture

## Pattern Overview
- Server components render static content from JSON/MDX files
- Client components handle modal state and form interactions
- TypeScript for type safety across layers
- Tailwind CSS for styling with custom theme
- FontAwesome icons for UI iconography
## Layers
- Purpose: Data fetching, static generation, metadata handling
- Location: `src/app/`
- Contains: Page components, API routes, layout configuration
- Depends on: Content library (`src/lib/content.ts`)
- Used by: Client layer components, browser requests
- Purpose: Manage content loading from JSON files and MDX files
- Location: `src/lib/`
- Contains: Type definitions (`types.ts`), content loaders (`content.ts`)
- Depends on: File system (fs module), process environment
- Used by: Server pages and client components
- Purpose: Render UI across multiple feature sections
- Location: `src/components/`
- Contains: Page sections (splash, bio, work, skills), UI primitives, modals
- Depends on: Types from `src/lib/types.ts`, React, FontAwesome
- Used by: Server pages and other components
- Purpose: Static portfolio data
- Location: `src/content/`
- Contains: JSON files (site metadata, skills, contact methods), MDX files (project descriptions)
- Depends on: None
- Used by: Content loader layer
## Data Flow
- Modal open/close state lives in `PageClient` (dialogRef, isSubmitted)
- Form input state managed via `formInfo` state object in `PageClient`
- Content data is immutable props passed from server
- No external state management (Redux, Zustand, etc.)
## Key Abstractions
- Purpose: Parse and load portfolio content from files
- Examples: `src/lib/content.ts` (getSiteMetadata, getProjects, getSkills, getContactMethods)
- Pattern: File I/O at build time, returns typed data structures
- Purpose: Define shape of data across application
- Examples: `src/lib/types.ts` exports Project, Skill, ContactMethod, SiteMetadata
- Pattern: Strict TypeScript interfaces, enforced at compile time
- Purpose: Break UI into reusable sections
- Examples: Splash (top hero), Bio (about), Work (projects), Skills (technologies), Footer
- Pattern: Props-based composition, each section receives typed data array
- Purpose: Extract frontmatter and markdown from project files
- Examples: `parseMdx()` in `src/lib/content.ts`
- Pattern: Regex-based frontmatter extraction, returns structured data
## Entry Points
- Location: `src/app/page.tsx`
- Triggers: Browser navigation to `/`
- Responsibilities: Load all content (projects, skills, contact methods), pass to PageClient
- Location: `src/app/api/contact/route.ts`
- Triggers: POST request to `/api/contact`
- Responsibilities: Validate contact form submission, log submission, return success response
- Location: `src/app/layout.tsx`
- Triggers: All page requests
- Responsibilities: Set site metadata, wrap page with HTML/body, load global styles
## Error Handling
- Form submission catches fetch errors and logs to console: `catch (error) => console.error("Form submission error:", error)`
- API endpoint validates required fields, returns 400 status on validation failure
- MDX parsing returns empty frontmatter if match fails: `if (!match) return { frontmatter: {}, body: content }`
- Content loaders use synchronous file I/O, will throw if files missing


<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->

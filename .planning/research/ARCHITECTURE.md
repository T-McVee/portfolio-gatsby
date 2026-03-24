# Architecture Research

**Domain:** Personal developer portfolio/platform (Next.js App Router)
**Researched:** 2026-03-24
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser                                   │
│  Route: /      Route: /uses     Route: /blog/[slug]  /dashboard │
└──────┬──────────────┬───────────────────┬──────────────┬────────┘
       │              │                   │              │
┌──────▼──────────────▼───────────────────▼──────────────▼────────┐
│                    Next.js App Router                            │
│  src/app/                                                        │
│  ├── layout.tsx          (root layout, metadata, global styles)  │
│  ├── page.tsx            (home — server component)               │
│  ├── uses/page.tsx       (uses — server component)               │
│  ├── blog/               (future)                                │
│  │   ├── page.tsx        (index — server component)              │
│  │   └── [slug]/page.tsx (post — server component)               │
│  ├── dashboard/          (future — auth-gated)                   │
│  │   └── page.tsx                                                │
│  └── api/                                                        │
│      └── contact/route.ts                                        │
├─────────────────────────────────────────────────────────────────┤
│                    Component Layer                               │
│  src/components/                                                 │
│  ├── [section]/          (splash, bio, work, skills, uses)       │
│  ├── blog/               (future: PostCard, PostList, MDXContent) │
│  ├── ui/                 (shared primitives: Button, Footer, etc) │
│  └── modal/              (ContactFormModal)                      │
├─────────────────────────────────────────────────────────────────┤
│                    Content / Data Layer                          │
│  src/lib/                                                        │
│  ├── content.ts          (file-system loaders)                   │
│  └── types.ts            (TypeScript interfaces)                 │
│                                                                  │
│  src/content/                                                    │
│  ├── site-metadata.json                                          │
│  ├── skills.json                                                 │
│  ├── contact-methods.json                                        │
│  ├── uses.json           (to add)                                │
│  └── projects/*.mdx                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `app/layout.tsx` | Global HTML shell, metadata, global CSS | Server component, no data loading |
| `app/page.tsx` | Home page data loading | Server component, calls content loaders, passes props to client |
| `PageClient.tsx` | Home page interactivity | Client component, owns modal state and form state |
| `app/uses/page.tsx` | Uses page (to add) | Server component, loads uses data, renders sections directly |
| Section components (Splash, Bio, Work, Skills) | Render a discrete page section | Pure render, receive typed props, no internal data fetching |
| `src/lib/content.ts` | File I/O and data parsing | Synchronous fs reads, returns typed arrays |
| `src/lib/types.ts` | Shared type contract | TypeScript interfaces only |
| `src/content/` | Source of truth for all content | JSON and MDX files, no build dependencies |
| `app/api/contact/route.ts` | Handle contact form POST | Validates, logs, returns 200/400 |

---

## Recommended Project Structure

Current structure is sound. Extend it as follows:

```
src/
├── app/
│   ├── layout.tsx              # Global layout, metadata, globals.css
│   ├── page.tsx                # Home — server component, loads content
│   ├── PageClient.tsx          # Home — client boundary, modal + form state
│   ├── globals.css
│   ├── uses/
│   │   └── page.tsx            # Uses page — server component (add now)
│   ├── blog/                   # Future milestone
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post
│   ├── dashboard/              # Future milestone (auth-gated)
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── splash/
│   ├── bio/
│   ├── work/
│   ├── skills/
│   ├── uses/                   # Add now: UsesSection, UsesCategory, UsesItem
│   ├── blog/                   # Future: PostCard, PostList, MDXContent
│   ├── ui/                     # Shared: Button, Footer, Icon, etc.
│   └── modal/
├── lib/
│   ├── content.ts              # File-system loaders — extend for uses, posts
│   └── types.ts                # Extend: UsesItem, UsesCategory, Post
└── content/
    ├── site-metadata.json
    ├── skills.json
    ├── contact-methods.json
    ├── uses.json               # Add now
    └── projects/
        └── *.mdx
```

### Structure Rationale

- **`app/[route]/page.tsx` as server components:** Data fetching stays at the page boundary, close to the route. Keeps components below pure renderers. Consistent with App Router conventions.
- **`PageClient.tsx` pattern:** The current server→client boundary is correct for the home page. The `uses/` page will not need a client wrapper (no modal/form state), so `uses/page.tsx` can be a pure server component with no `PageClient.tsx` equivalent.
- **`components/[section]/`:** Grouping by feature section (not by component type) keeps related components together. Each section folder is self-contained — no section imports from another section.
- **`lib/content.ts` single module:** All file I/O funnels through one module. Keeps the rest of the codebase unaware of the file system. When a CMS is added later, only this file needs to change.
- **`content/` as flat files:** No build tool dependency, no external service, works in any environment. MDX frontmatter is parsed by `parseMdx()` in `content.ts` — this is sufficient for the current use case.

---

## Architectural Patterns

### Pattern 1: Server Component → Client Boundary at the Page Level

**What:** Server components load data; a single `*Client.tsx` file owns all interactive state for that page. Data flows down as props, events flow up via callbacks.

**When to use:** Any page with both static content and interactivity (modals, forms, tabs). This is the current home page pattern.

**Trade-offs:** Simple and explicit. The boundary is obvious. Downside: if the interactive portion becomes large, `PageClient.tsx` can grow fat. Split it when it exceeds ~150 lines or has more than 3 distinct interactive concerns.

**Example (current pattern):**
```typescript
// app/page.tsx — server, loads data
export default function Home() {
  const projects = getProjects();
  const skills = getSkills();
  return <PageClient projects={projects} skills={skills} />;
}

// app/PageClient.tsx — client, owns state
"use client";
export default function PageClient({ projects, skills }) {
  const [modalOpen, setModalOpen] = useState(false);
  // ...
}
```

### Pattern 2: Pure Server Page (No Client Wrapper)

**What:** Pages that have no interactive state (no modals, no forms, no user events) render entirely as server components. No `PageClient.tsx` equivalent.

**When to use:** The `uses/` page. A list of tools and gear with no form or modal. Also the blog index and blog post pages (unless comments or reactions are added later).

**Trade-offs:** Simpler — no client/server boundary to manage. If interactivity is added later, introduce a `*Client.tsx` at that point.

**Example (uses page):**
```typescript
// app/uses/page.tsx — pure server, no client wrapper
export default function UsesPage() {
  const uses = getUses();
  return (
    <main>
      <UsesSection items={uses} />
    </main>
  );
}
```

### Pattern 3: Content Loader Abstraction

**What:** All file-system reads go through named functions in `src/lib/content.ts`. Pages never import `fs` directly. The return type is always a TypeScript interface from `types.ts`.

**When to use:** Every content type — projects, skills, contact methods, uses items, blog posts.

**Trade-offs:** Adds indirection. The payoff is that `content.ts` is the only file that needs to change if the content source changes (e.g., moving blog posts to a headless CMS in the future). This boundary must be respected as the codebase grows.

**Example (extending for uses):**
```typescript
// src/lib/content.ts
export function getUses(): UsesCategory[] {
  const raw = fs.readFileSync(path.join(contentDir, "uses.json"), "utf-8");
  return JSON.parse(raw) as UsesCategory[];
}
```

### Pattern 4: MDX for Rich Content, JSON for Structured Data

**What:** Use MDX (with frontmatter) for content that has a narrative body — project descriptions, blog posts. Use JSON for structured list data — skills, contact methods, uses items.

**When to use:**
- MDX: content that has a prose description alongside metadata
- JSON: content that is purely structured, no prose

**Trade-offs:** The current `parseMdx()` regex implementation is lightweight but fragile — it does not handle nested YAML, multi-line values, or complex types. It is sufficient for project cards. For blog posts, replace it with `gray-matter` (npm package) which handles the full YAML spec.

---

## Data Flow

### Request Flow (Home Page — Current)

```
Browser GET /
    ↓
app/layout.tsx — applies global metadata + styles
    ↓
app/page.tsx (Server Component)
    ↓
content.ts: getProjects(), getSkills(), getContactMethods()
    ↓ (fs.readFileSync)
src/content/*.json + *.mdx
    ↓ (typed data)
PageClient.tsx (Client Component) — receives projects, skills, contactMethods as props
    ↓
Section components (Splash, Bio, Work, Skills, Footer)
    → pure render from props
```

### Request Flow (Uses Page — To Add)

```
Browser GET /uses
    ↓
app/layout.tsx — applies global metadata + styles
    ↓
app/uses/page.tsx (Server Component)
    ↓
content.ts: getUses()
    ↓ (fs.readFileSync)
src/content/uses.json
    ↓ (typed data)
UsesSection component — pure render, no client wrapper needed
```

### Contact Form Submission Flow

```
User fills form in ContactFormModal
    ↓
handleFormChange → updates formInfo state (in PageClient)
    ↓
handleFormSubmit → fetch POST /api/contact
    ↓
app/api/contact/route.ts
    → validates required fields (name, email, message)
    → returns 200 OK or 400 Bad Request
    ↓
if 200 → setIsSubmitted(true) → modal shows Thankyou component
if error → console.error (currently no user-facing error state)
```

### State Management

```
PageClient (Client Component)
├── dialogRef: useRef<HTMLDialogElement>     — modal open/close (DOM ref)
├── isSubmitted: useState<boolean>           — form submission status
└── formInfo: useState<{name,email,...}>     — controlled form inputs

Props (immutable, from server):
├── projects: Project[]    → Work → Projects → Project
├── skills: Skill[]        → Skills → SkillsList → Skill
└── contactMethods: ContactMethod[]  → Splash, Footer

No external state library. No context. No server state cache (React Query etc.).
This is appropriate for the current scope.
```

### Key Data Flows

1. **Content to render:** `src/content/` files → `content.ts` loaders → page server component → section components as props. Unidirectional, no mutation.
2. **Form submission:** `PageClient` state → `fetch /api/contact` → API route → response status → UI state update.
3. **Modal lifecycle:** Button click → `handleOpenModal` → `dialogRef.current.showModal()` → native `<dialog>` element. Close → `handleCloseModal` → reset state.

---

## Build Order Implications

When extending the architecture across future milestones, build in this order:

| Step | What | Why First |
|------|------|-----------|
| 1 | Add `UsesCategory`/`UsesItem` types to `types.ts` | Types are the contract — define before implementing |
| 2 | Add `getUses()` to `content.ts` | Data layer before UI layer |
| 3 | Create `src/content/uses.json` | Content before components can be tested |
| 4 | Build `components/uses/` section components | Components before pages |
| 5 | Create `app/uses/page.tsx` | Page assembles components |
| — | (Future) Add `gray-matter` dependency | Required before blog post MDX parsing |
| — | (Future) Add `Post` type + `getPosts()` + `getPost(slug)` | Content layer for blog |
| — | (Future) `app/blog/page.tsx` + `app/blog/[slug]/page.tsx` | Route layer for blog |
| — | (Future) Auth middleware in `middleware.ts` | Before any auth-gated routes |

The pattern is always: **types → content loader → content file → components → page**. Pages are assembled last.

---

## Anti-Patterns

### Anti-Pattern 1: Fetching Data Inside Section Components

**What people do:** Import `fs` or call `getProjects()` directly inside `Work.tsx` or another section component.

**Why it's wrong:** Makes components impure — they can't be reused, tested, or rendered with mock data. Also moves file I/O deeper into the tree where it's invisible at the page level. In App Router, this can cause accidental waterfalls if multiple components independently fetch.

**Do this instead:** All data loading in `app/[route]/page.tsx`. Pass everything down as typed props.

---

### Anti-Pattern 2: Overusing `"use client"`

**What people do:** Add `"use client"` to section components (Work, Skills, Bio) because they need icons or minor state.

**Why it's wrong:** Marks the entire component tree below that boundary as client-only, losing server rendering benefits and increasing bundle size. FontAwesome icons in particular are often the trigger.

**Do this instead:** Keep section components as server components. Push `"use client"` down only to the smallest component that genuinely needs browser APIs or event handlers. The current `PageClient.tsx` boundary is the right level for the home page.

---

### Anti-Pattern 3: Growing `PageClient.tsx` Indefinitely

**What people do:** Add more state, more handlers, and more imports to `PageClient.tsx` as features grow.

**Why it's wrong:** Becomes a "god component" — hard to follow, hard to test, large client bundle. The current `PageClient.tsx` is already managing modal state, form state, and FontAwesome library initialisation simultaneously.

**Do this instead:** When `PageClient.tsx` exceeds ~150 lines or manages 3+ distinct concerns, extract. FontAwesome initialisation belongs in `layout.tsx` or a dedicated provider. Form state belongs in the form component itself. Modal state can live in a `useModal()` hook.

---

### Anti-Pattern 4: Regex MDX Parsing for Blog Posts

**What people do:** Extend the current `parseMdx()` regex to handle blog post frontmatter.

**Why it's wrong:** The current regex (`/^---\n([\s\S]*?)\n---\n([\s\S]*)$/`) handles simple key: value pairs. It breaks on multi-line values, nested objects, quoted colons, and YAML arrays with newlines — all common in blog post frontmatter (tags, dates, descriptions with colons).

**Do this instead:** Install `gray-matter` when building the blog. It handles the full YAML spec. The current regex is fine for project cards where frontmatter is simple and controlled.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Azure App Service | Docker/Node.js deploy target | Requires `output: 'standalone'` in `next.config.ts` for container deploys |
| Contact form backend | Current: logs to console only. Future: email via Resend or Azure Communication Services | API route (`/api/contact`) is already the integration boundary — swap the handler body |
| Auth (future) | Next.js `middleware.ts` + JWT/session cookie | Intercept requests to `/dashboard/*` before they hit the page |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `page.tsx` → `PageClient.tsx` | Props (typed interfaces) | Server-to-client boundary. Props must be serialisable — no functions, no class instances |
| `page.tsx` → section components (server-only pages) | Props (typed interfaces) | Same rule — keep props plain data |
| `PageClient.tsx` → section components | Props + callback functions | Client-to-client, so function props are allowed |
| `content.ts` → everything | Named exports, synchronous return | No side effects. Each loader reads one file or directory |
| `app/api/contact` → email service (future) | HTTP POST inside route handler | Isolate behind a `sendContactEmail()` function in `lib/email.ts` |

---

## Scaling Considerations

This is a personal portfolio — scaling to millions of users is not the concern. The relevant scaling axis is **feature growth**, not traffic.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (1 page, 4 sections) | Current architecture is appropriate. No changes needed. |
| +1-2 routes (/uses, /blog) | Add route folders under `app/`. Extend `content.ts`. No structural change needed. |
| +Auth + dashboard | Add `middleware.ts` for route protection. Add auth provider to `layout.tsx`. Keep auth logic in `lib/auth.ts`. |
| +Interactive tools embedded in pages | Introduce lazy loading (`next/dynamic`) for heavy client components. Keep tool components isolated in `components/tools/`. |
| +CMS replacing file-based content | Only `src/lib/content.ts` changes. All callers remain the same — this is the payoff of the content loader abstraction. |

### Scaling Priorities

1. **First friction point:** `PageClient.tsx` growing too large as the home page gains features. Extract state into hooks before adding Uses page interactivity.
2. **Second friction point:** `content.ts` becoming a large, unstructured file as content types grow. Group related loaders into separate files (`lib/projects.ts`, `lib/blog.ts`) when it exceeds ~150 lines.

---

## Sources

- Current codebase analysis: `src/app/`, `src/lib/`, `src/components/` — HIGH confidence (direct read)
- Next.js App Router conventions: next.js.org/docs/app — HIGH confidence (official documentation, current)
- `gray-matter` for YAML frontmatter parsing: well-established npm package, standard in Next.js MDX setups — HIGH confidence

---

*Architecture research for: Personal developer portfolio/platform (Next.js App Router)*
*Researched: 2026-03-24*

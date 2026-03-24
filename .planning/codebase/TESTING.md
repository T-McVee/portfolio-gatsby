# Testing Patterns

**Analysis Date:** 2026-03-24

## Test Framework

**Status:** Not Configured

- No test framework installed (Jest, Vitest, etc. not in dependencies)
- No test configuration files detected (`jest.config.js`, `vitest.config.ts`, etc.)
- No test runner scripts in package.json

**Development Dependencies:**
- `@tailwindcss/postcss`: ^4
- `@types/node`: ^20
- `@types/react`: ^19
- `@types/react-dom`: ^19
- `tailwindcss`: ^4
- `typescript`: ^5

No testing libraries found.

## Test File Organization

**Current State:** No test files in codebase

- Searched for `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` patterns
- No test files found in `src/` directory
- All test files in search results were from `node_modules/`

**Recommended Structure if Tests Were Added:**
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   └── ...
├── lib/
│   ├── content.ts
│   ├── content.test.ts
│   └── types.ts
└── ...
```

## Testing Infrastructure Gaps

**What's Missing:**
1. Test framework (Jest or Vitest recommended)
2. Assertion library (Jest includes, or need Chai/Vitest)
3. React testing utilities (@testing-library/react)
4. Test configuration
5. Test scripts in package.json

**Areas Without Test Coverage:**
- All components lack unit tests
- API routes untested (`src/app/api/contact/route.ts`)
- Content loading utilities untested (`src/lib/content.ts`)
- MDX parsing untested (`parseMdx()` function)

## Observable Code Patterns That Would Be Testable

**Data Utilities (src/lib/content.ts):**
```typescript
// These functions would benefit from tests:
- getProjects(): Project[]
- getSkills(): Skill[]
- getContactMethods(): ContactMethod[]
- parseMdx(content: string): { frontmatter: ..., body: ... }
```

**Component Patterns:**
```typescript
// Components include data-testid attributes ready for testing:
<article data-testid="project">
<div data-testid="cover-image">
<form data-testid="contact-form">
<section data-testid="skills">
<div data-testid="description">
<span data-testid="subtitle">
<p data-testid="body">
<ul data-testid="tags">
<li data-testid="tag">
<div data-testid="number">
<img data-testid="logo">
<div data-testid="white">
```

Presence of `data-testid` attributes suggests tests were planned but never implemented.

**Event Handlers Ready for Testing:**
- Form submission logic in `PageClient.tsx`: `handleFormSubmit()`
- Modal open/close: `handleOpenModal()`, `handleCloseModal()`
- Form input changes: `handleFormChange()`

**API Handler (src/app/api/contact/route.ts):**
```typescript
export async function POST(request: Request) {
  // Returns NextResponse with validation
  // Could be tested with supertest or fetch API
}
```

## Recommended Testing Strategy

**Phase 1: Setup (Not Yet Done)**
1. Install test framework: `npm install --save-dev vitest @vitest/ui`
2. Install React testing utilities: `npm install --save-dev @testing-library/react @testing-library/jest-dom`
3. Create `vitest.config.ts` configuration
4. Add test scripts to `package.json`:
   ```json
   "test": "vitest",
   "test:ui": "vitest --ui",
   "test:coverage": "vitest --coverage"
   ```

**Phase 2: Utility Tests (High Priority)**
Start with pure utility functions that have no dependencies:
- `parseMdx()` function tests for YAML frontmatter parsing
- Content loading functions with mocked file system

**Phase 3: Component Tests (Medium Priority)**
Test components with clear inputs/outputs:
- Props rendering (Button, H1, Icon, etc.)
- Conditional rendering (Tag returns null, Skills returns null)
- Form input handling

**Phase 4: Integration Tests (Medium Priority)**
Test component interactions:
- Modal open/close with form submission
- Data flow from page → components

**Phase 5: API Tests (Medium Priority)**
Test route handlers:
- POST /api/contact validation
- Error responses

## Current Code Readiness for Testing

**Positive Indicators:**
- Strong TypeScript typing makes props testable
- Components have clear inputs and outputs
- Separation of concerns (components vs. utilities vs. content)
- Data-testid attributes already present
- Pure functions in `content.ts` are easily testable

**Challenges:**
- No established patterns for mocking Next.js features
- File system operations in content.ts would need mocking
- Modal interactions use browser APIs (showModal, close)
- No existing test examples to follow

## Dependency Recommendations for Future Tests

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^23.0.0"
  }
}
```

---

*Testing analysis: 2026-03-24*

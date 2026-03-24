# Coding Conventions

**Analysis Date:** 2026-03-24

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Button.tsx`, `ContactForm.tsx`, `Project.tsx`)
- Utilities/Services: camelCase (e.g., `content.ts`, `types.ts`)
- Entry points: lowercase (e.g., `layout.tsx`, `page.tsx`, `route.ts`)

**Functions:**
- Components: PascalCase (same as filename)
- Utility functions: camelCase (e.g., `parseMdx()`, `getProjects()`, `getSiteMetadata()`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleOpenModal()`, `handleFormChange()`, `handleFormSubmit()`)
- Helper functions: camelCase (e.g., `openSite()`)

**Variables:**
- Constants: UPPER_SNAKE_CASE or camelCase (observed: camelCase for objects in CSS-in-JS, UPPER_SNAKE_CASE not used)
- State variables: camelCase (e.g., `isSubmitted`, `formInfo`, `dialogRef`)
- Props/parameters: camelCase (e.g., `rightAlign`, `handleOpenModal`, `contactMethods`)
- CSS class strings: kebab-case within className attributes

**Types:**
- Interfaces: PascalCase (e.g., `ButtonProps`, `ProjectProps`, `ContactFormProps`)
- Type aliases: PascalCase (e.g., `Project`, `Skill`, `ContactMethod`)
- Union/discriminated unions: PascalCase (e.g., `IconProp`)

## Code Style

**Formatting:**
- Indentation: 2 spaces
- Line length: Pragmatic (no strict limit observed)
- Semicolons: Always used
- Quotes: Double quotes for JSX attributes and strings

**Linting:**
- No ESLint config detected
- No Prettier config detected
- Code relies on TypeScript strict mode for type safety
- Manual formatting appears to be the convention

## Import Organization

**Order:**
1. External libraries (Next.js, React)
2. Third-party packages (FontAwesome)
3. Internal components and utilities (aliased with `@/`)
4. Type imports using `type` keyword when needed

**Examples:**
```typescript
import { useState, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";
import type { Project } from "@/lib/types";
```

**Path Aliases:**
- `@/*` maps to `./src/*`
- Always use alias paths for absolute imports
- Example: `@/lib/content`, `@/components/ui/Button`, `@/lib/types`

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (seen in `PageClient.tsx` form submission)
- Console.error for logging errors: `console.error("Form submission error:", error)`
- Graceful fallbacks using conditional returns: `if (!skills) return null;`
- JSON parsing with try-catch for safe parsing: `try { value = JSON.parse(value); } catch { ... }`

**Approach:**
- Silent failure with console logging (form submission)
- Null checks before rendering (conditional returns)
- Optional chaining and non-null assertions for TypeScript (`skill.faLibrary!`)

## Logging

**Framework:** Native `console` object

**Patterns:**
- `console.error()` for error messages
- Descriptive context: `console.log("Contact form submission:", { name, email, message })`
- Used minimally in production code
- Not used for debug logging in component code

## Comments

**When to Comment:**
- Minimal comment usage observed
- Code is generally self-documenting through clear naming
- JSDoc not used in this codebase

**Example of documented code (via self-documenting naming):**
```typescript
// Clear from function name and types, no comments needed
export function getProjects(): Project[] { ... }
export function getContactMethods(): ContactMethod[] { ... }
```

## Function Design

**Size:**
- Small, focused functions
- Single responsibility principle observed
- Most components 15-50 lines
- Utility functions kept under 30 lines

**Parameters:**
- Use destructuring for props (all components use this pattern)
- TypeScript interfaces define prop shapes explicitly
- Optional parameters use `?:` syntax with default values

**Return Values:**
- Components return JSX.Element (implicit)
- Utility functions explicitly return typed values
- Null checks used for conditional rendering: `if (!skills) return null;`

**Example function structure:**
```typescript
export default function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="...">
      {children}
    </button>
  );
}
```

## Module Design

**Exports:**
- Default export for components: `export default function ComponentName(...)`
- Named export for utility functions: `export function functionName(...)`
- All files have a single primary export

**Barrel Files:**
- Not used in this codebase
- Each component has its own file
- Each util has its own file

**Component Structure:**
- One component per file
- Props defined as interface immediately above component
- Type imports using `type` keyword: `import type { Project } from "@/lib/types"`

**Shared Styling:**
- CSS modules not used
- Tailwind CSS classes inline in className attributes
- Reusable class strings extracted to variables: `const inputClasses = "..."`
- Custom CSS animations in `globals.css` for complex effects

## TypeScript Patterns

**Strict Mode:** Enabled
- `"strict": true` in tsconfig.json
- All props require explicit types
- Non-null assertions used where type safety allows: `skill.faLibrary!`
- Type guards for conditional rendering

**Generic Types:**
- `React.ReactNode` for children props
- `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>` for form handlers
- `React.FormEvent` for form submit events
- `React.RefObject<HTMLDialogElement | null>` for dialog refs

**Component Props Pattern:**
- Dedicated interface for each component's props
- Always placed before component function
- Extends with `extends` only when necessary (not observed)

## Tailwind CSS Conventions

**Class Organization:**
- Responsive modifiers (e.g., `max-tablet:`, `max-laptop:`, `max-phone:`)
- Hover states: `hover:text-accent-1`, `hover:scale-110`
- Transition utilities: `transition-all duration-200`
- Breakpoints defined in `globals.css` theme variables

**Custom Theme Variables:**
- Colors: `--color-accent-1`, `--color-grey`, `--color-dark-grey`
- Spacing: `--radius-small: 8px`
- Breakpoints: `--breakpoint-phone`, `--breakpoint-tablet`, `--breakpoint-laptop`

**Class String Patterns:**
- Multi-line classes joined with `.join(" ")` for readability (seen in `Project.tsx`)
- Ternary operators for conditional classes
- Template literals for dynamic class composition

## Data Structure Patterns

**Content Loading:**
- Synchronous file system operations in server components: `fs.readFileSync()`
- MDX frontmatter parsing done manually (no external parser)
- YAML-like parsing for frontmatter with custom logic

**State Management:**
- Local component state with `useState()` for forms and modals
- Refs for DOM elements: `useRef<HTMLDialogElement>(null)`
- Props drilling for data (no context API or state management library)

---

*Convention analysis: 2026-03-24*

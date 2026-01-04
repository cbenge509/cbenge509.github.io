# Story 1.3: Design System Foundation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the portfolio to have consistent, professional typography, colors, and spacing throughout,
so that I experience a cohesive, polished design that reinforces Cris's attention to detail and quality.

## Acceptance Criteria

1. **AC1:** Typography system with responsive type scale
   - Space Grotesk loaded via @fontsource for display/headings (400, 700 weights)
   - Inter loaded via @fontsource for body text (400, 500, 600 weights)
   - JetBrains Mono loaded via @fontsource for code (400 weight)
   - Responsive type scale matching UX spec: hero 2.5rem (mobile) → 3.5rem (desktop)
   - Font-display: swap for fallback during loading

2. **AC2:** Color system with semantic CSS custom properties
   - Light mode colors defined in `:root` / `@theme`
   - Dark mode colors using `dark:` prefix or `.dark` class variants
   - Semantic color tokens: bg, surface, text, text-secondary, accent
   - Google Blue accent: #2563eb (light) / #3b82f6 (dark)
   - All colors accessible (WCAG AA 4.5:1 contrast ratio for text)

3. **AC3:** Tailwind CSS v4 `@theme` configuration extended
   - Custom color tokens mapped to Tailwind utilities
   - Font families configured: `font-display`, `font-sans`, `font-mono`
   - Spacing scale appropriate for generous whitespace
   - Standard transition durations: 150ms (micro), 300ms (component), 500ms (page)

4. **AC4:** Focus ring utility class for accessibility
   - `.focus-ring` class providing consistent focus styling
   - 2px accent color ring with 2px offset
   - Applied to all interactive elements (buttons, links, inputs)
   - Respects dark mode with appropriate offset colors

5. **AC5:** Reduced motion support
   - Global `@media (prefers-reduced-motion: reduce)` safety net
   - Disables all animation-duration and transition-duration
   - No jarring effects for motion-sensitive users

6. **AC6:** Base typography styles
   - Prose styles for readable content (65-70ch max-width)
   - Line-height: 1.7 for body text
   - Consistent heading scale with Space Grotesk
   - Code blocks with JetBrains Mono

7. **AC7:** Design tokens documentation
   - All tokens documented inline in global.css
   - Token usage examples in comments
   - Dark mode implementation pattern documented

## Tasks / Subtasks

- [x] Task 1: Extend typography configuration (AC: 1, 6)
  - [x] Verify @fontsource packages are installed (done in Story 1-1)
  - [x] Add responsive type scale to `@theme` block
  - [x] Configure font-family tokens: `--font-display`, `--font-sans`, `--font-mono`
  - [x] Add font-display: swap to prevent FOIT (Flash of Invisible Text)
  - [x] Create heading styles (h1-h6) with Space Grotesk
  - [x] Create prose styles for body content

- [x] Task 2: Complete color system implementation (AC: 2, 3)
  - [x] Extend existing `@theme` color tokens with full semantic palette
  - [x] Add border colors: `--color-border`, `--color-border-dark`
  - [x] Add hover state colors for interactive elements
  - [x] Verify WCAG AA contrast ratios for all text/background combinations
  - [x] Document color usage patterns in CSS comments

- [x] Task 3: Enhance focus ring utility (AC: 4)
  - [x] Update `.focus-ring` with focus-visible for keyboard-only focus
  - [x] Add dark mode support to focus-ring with proper offset colors
  - [x] Ensure 2px ring, 2px offset, accent color
  - [x] Add `.focus-ring-inset` variant for contained elements

- [x] Task 4: Add spacing and layout utilities (AC: 3)
  - [x] Add container max-width tokens (1280px for content)
  - [x] Add consistent section spacing utilities
  - [x] Add card padding and gap tokens
  - [x] Ensure generous whitespace per Apple-style design

- [x] Task 5: Animation and transition tokens (AC: 3, 5)
  - [x] Verify transition timing standards: fast (150ms), medium (300ms), slow (500ms)
  - [x] Add easing curves: `--ease-out`, `--ease-in-out`
  - [x] Verify reduced motion safety net is comprehensive
  - [x] Document animation pattern guidelines

- [x] Task 6: Create typography utility classes (AC: 6)
  - [x] Add `.prose` class for article/markdown content
  - [x] Add heading utility classes `.text-display-lg`, `.text-display-sm`
  - [x] Add `.text-body`, `.text-caption` for body text variants
  - [x] Ensure all text utilities have dark mode variants

- [x] Task 7: Verify and document design tokens (AC: 7)
  - [x] Add comprehensive inline documentation to global.css
  - [x] Run `npm run build` to verify no CSS errors
  - [x] Run `npx gts lint` to ensure code quality
  - [x] Test dark mode toggle to verify color system works

## Dev Notes

### Technology Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `@fontsource/inter` | installed | Body text font (400, 500, 600) |
| `@fontsource/space-grotesk` | installed | Display/heading font (400, 700) |
| `@fontsource/jetbrains-mono` | installed | Code font (400) |
| `tailwindcss` | 4.x | CSS framework with `@theme` config |

### Critical Implementation Notes

1. **Tailwind CSS v4 `@theme` Syntax:**
   - All custom values go in `@theme { }` block
   - Use CSS custom properties: `--color-accent: #2563eb`
   - Access via Tailwind: `bg-accent`, `text-accent`
   - NO `tailwind.config.js` - all config is CSS-based

2. **Dark Mode Implementation:**
   - Already implemented in Story 1-1 via `data-theme` attribute
   - Use `dark:` prefix for dark mode variants
   - OR define `--color-X-dark` variants in `@theme`
   - BaseLayout.astro has FOUC prevention script

3. **Responsive Typography Scale (from UX Spec):**
   ```
   Hero H1:     2.5rem (40px) → 3.5rem (56px)
   Section H2:  1.75rem (28px) → 2.25rem (36px)
   Card H3:     1.25rem (20px) → 1.5rem (24px)
   Body:        1rem (16px) → 1.125rem (18px)
   Caption:     0.875rem (14px)
   ```

4. **WCAG AA Contrast Requirements:**
   - Normal text: 4.5:1 minimum contrast ratio
   - Large text (24px+ or 18.66px+ bold): 3:1 minimum
   - UI components and graphics: 3:1 minimum
   - Test with: https://webaim.org/resources/contrastchecker/

### Color Palette (From UX Spec + Architecture)

```css
/* Light Mode */
--color-bg: #ffffff;
--color-surface: #f8fafc;
--color-text: #1a1a1a;
--color-text-secondary: #6b7280;
--color-accent: #2563eb;        /* Google Blue - primary */
--color-accent-hover: #1d4ed8;  /* Darker on hover */
--color-border: #e5e7eb;

/* Dark Mode */
--color-bg-dark: #0a0a0a;
--color-surface-dark: #171717;
--color-text-dark: #fafafa;
--color-text-secondary-dark: #9ca3af;
--color-accent-dark: #3b82f6;
--color-accent-hover-dark: #60a5fa;
--color-border-dark: #374151;
```

### Previous Story Context (Story 1-1 & 1-2)

From Story 1-1 (Project Initialization):
- Tailwind CSS v4 configured with `@tailwindcss/vite` plugin
- Fonts installed via @fontsource
- Basic `@theme` block exists in `src/styles/global.css`
- FOUC prevention script in BaseLayout.astro
- gts linting configured

From Story 1-2 (Content Collection Schemas):
- 6 content collections defined with Zod schemas
- Sample content created for all collections
- Build passes with content validation

Current `global.css` state:
- Font imports present
- Basic `@theme` with colors and fonts
- `.focus-ring` utility exists (needs enhancement)
- Reduced motion safety net exists

### Design System Patterns (From Architecture)

**Focus Ring Pattern:**
```css
.focus-ring {
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
         focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900;
}
```

**Transition Timing:**
| Duration | Use Case |
|----------|----------|
| 150ms | Micro-interactions: hover, toggle |
| 300ms | Component: cards, modals, menus |
| 500ms | Page: hero entrance, page transitions |

**Spacing Philosophy (Apple-Style):**
- Generous whitespace
- Section padding: 4rem (64px) mobile → 6rem (96px) desktop
- Card gaps: 1.5rem (24px) mobile → 2rem (32px) desktop
- Content max-width: 1280px (80rem)

### UX Specification Requirements

From `ux-design-specification.md`:
- **UX-5:** Typography system with Space Grotesk + Inter + JetBrains Mono
- **UX-6:** Color system with Google Blue accent and semantic tokens
- **UX-2:** WCAG 2.1 AA accessibility with visible focus-ring utility
- **UX-3:** Respect `prefers-reduced-motion`

### Triple-Threat Tag Colors (For Reference)

These colors will be used in project cards (Epic 2):
| Category | Light | Dark | Tailwind |
|----------|-------|------|----------|
| Leader | Blue tint | `#dbeafe` | `bg-blue-100` |
| Builder | Green tint | `#dcfce7` | `bg-green-100` |
| Winner | Amber tint | `#fef3c7` | `bg-amber-100` |
| Research | Purple tint | `#f3e8ff` | `bg-purple-100` |

### Project Structure Notes

**File to Modify:**
- `src/styles/global.css` - Primary design system file

**No New Files Needed:**
- All design tokens go in existing `global.css`
- Tailwind v4 uses CSS-based config, not JS

**Alignment with Architecture:**
- Matches Tailwind CSS v4 `@theme` pattern exactly
- Follows established transition timing standards
- Implements accessibility patterns from project-context.md

### Testing Design System

1. **Visual Verification:**
   - Start dev server: `npm run dev`
   - Check typography renders with correct fonts
   - Verify light/dark mode colors work
   - Test focus ring on interactive elements

2. **Build Verification:**
   - Run `npm run build` - should pass with no CSS errors
   - Run `npx gts lint` - should pass with no errors

3. **Accessibility Check:**
   - Use browser DevTools to verify contrast ratios
   - Tab through page to verify focus rings visible
   - Enable reduced motion in OS, verify animations disabled

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Color System]
- [Source: _bmad-output/project-context.md#Framework-Specific Rules]
- [Source: _bmad-output/project-context.md#Code Quality & Style Rules]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- No blocking issues encountered

### Completion Notes List

- **Task 1-6:** Implemented comprehensive design system in `src/styles/global.css` with:
  - Complete `@theme` block with all color, typography, spacing, and transition tokens
  - Responsive type scale using clamp() for fluid typography (40px-56px hero, 28px-36px h2, etc.)
  - Semantic color tokens with light/dark mode variants and WCAG AA contrast documentation
  - Focus ring utilities (`.focus-ring`, `.focus-ring-inset`) using focus-visible
  - Layout utilities (`.container-custom`, `.section-padding`, `.card-grid-gap`)
  - Typography utilities (`.text-display-lg`, `.text-display`, `.text-display-sm`, `.text-body`, `.text-body-lg`, `.text-caption`)
  - Comprehensive `.prose` class for article/markdown content with heading scale, lists, code blocks, blockquotes
  - Transition utilities (`.transition-fast`, `.transition-medium`, `.transition-slow`)
  - Easing curve tokens (`--ease-out`, `--ease-in-out`)
  - Reduced motion safety net that disables all animations/transitions

- **Task 7:** Verification complete:
  - Build passes with no CSS errors
  - gts lint passes with no errors
  - All 9 E2E tests pass validating:
    - Typography tokens applied correctly
    - Color system works in light/dark modes
    - Focus ring utility provides visible focus
    - Reduced motion media query defined
    - Accessibility checks pass (axe-core)
    - Typography classes available
    - Spacing and transition tokens defined

- **Additional work:**
  - Added Playwright, Vitest, and axe-core testing dependencies
  - Created `playwright.config.ts` for E2E test configuration
  - Created comprehensive E2E test suite in `e2e/design-system.spec.ts`
  - Updated `tsconfig.json` to include test files
  - Added test scripts to `package.json`
  - Fixed accessibility issue (removed opacity-75 from text)

### File List

- `src/styles/global.css` - Complete design system rewrite (~570 lines)
- `src/pages/index.astro` - Minor fix: removed opacity-75 for accessibility
- `e2e/design-system.spec.ts` - New E2E test suite for design system (9 tests)
- `playwright.config.ts` - New Playwright configuration
- `package.json` - Added test scripts and testing dependencies
- `tsconfig.json` - Added e2e and playwright.config.ts to includes

### Change Log

- 2026-01-03: Implemented complete design system foundation (Story 1.3)
- 2026-01-03: Adversarial code review completed - 6 issues fixed

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5 (Adversarial Code Review Workflow)
**Date:** 2026-01-03
**Outcome:** ✅ APPROVED (after fixes)

### Issues Found and Fixed

| ID | Severity | Issue | Resolution |
|----|----------|-------|------------|
| H1 | HIGH | `_content-test.astro` test page marked for removal still present | Deleted file |
| M1 | MEDIUM | Focus ring E2E test was weak - only checked focus, not ring visibility | Added computed style assertions for box-shadow |
| M2 | MEDIUM | No E2E tests for `.prose` class (AC6 coverage gap) | Added comprehensive prose class test |
| M3 | MEDIUM | No E2E tests for `.focus-ring-inset` variant | Added focus-ring-inset test |
| M4 | MEDIUM | No dark mode persistence test | Added theme persistence test with reload |
| M5 | MEDIUM | Typography test only verified `.text-display-lg`, not other classes | Added assertions for all display and body classes |

### Low Issues (Not Fixed - Acceptable)

| ID | Severity | Issue | Rationale |
|----|----------|-------|-----------|
| L1 | LOW | Accent color contrast ratio borderline (4.6:1) | Documented in CSS, meets WCAG AA |
| L2 | LOW | No co-located unit tests | Story only modified CSS, not components |

### Verification Results

- **Build:** ✅ Passes (benign CSS warning from Tailwind minifier)
- **Lint:** ✅ Passes (gts lint)
- **E2E Tests:** ✅ 12/12 passing (expanded from 9)
- **Accessibility:** ✅ axe-core passes

### Files Modified in Review

- `src/pages/_content-test.astro` - DELETED (was debug/test page)
- `e2e/design-system.spec.ts` - Enhanced with 3 new tests, strengthened existing tests


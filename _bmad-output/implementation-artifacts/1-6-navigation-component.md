# Story 1.6: Navigation Component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to navigate to any section from any page,
so that I can explore the portfolio efficiently.

## Acceptance Criteria

1. **AC1:** Desktop navigation displays correctly
   - Navigation shows links to: Home, Projects, About (credentials), Publications
   - Social links visible: GitHub, LinkedIn (with ↗ icon, open in new tab)
   - Theme toggle visible and functional
   - Site logo/name links to home page
   - All links have gradient underline hover effect (150ms ease-out)
   - All links have visible focus indicators (`.focus-ring` class)
   - Navigation is keyboard accessible

2. **AC2:** Hide-on-scroll behavior works correctly
   - Scrolling down > 50px hides navigation with smooth transition
   - Scrolling up reveals navigation
   - Navigation uses `requestAnimationFrame` debounce for performance
   - Navigation always visible when at top of page (< 50px scroll)

3. **AC3:** Mobile navigation (< 768px) with hamburger menu
   - Hamburger menu button visible on mobile
   - Clicking hamburger opens slide-out panel with all nav items
   - Panel has proper focus trap for accessibility (focus locked inside when open)
   - ESC key closes the mobile menu
   - Clicking outside the menu closes it
   - Menu transition is smooth and respects `prefers-reduced-motion`

4. **AC4:** Progressive enhancement - works without JavaScript
   - All navigation links remain functional when JS fails
   - Mobile menu displays as visible links (no hidden hamburger)
   - Theme toggle is hidden when JS disabled
   - Page is fully navigable without JavaScript

5. **AC5:** External links follow design patterns
   - GitHub and LinkedIn links open in new tab
   - External links use `rel="noopener noreferrer"`
   - External links display ↗ icon
   - Links have accessible label "(opens in new tab)" for screen readers

6. **AC6:** Navigation passes accessibility requirements
   - Uses semantic `<nav>` landmark with `aria-label="Main navigation"`
   - Mobile menu has `aria-expanded` attribute
   - Mobile menu has `aria-controls` for panel
   - Focus management: first focusable element in menu receives focus when opened
   - Focus returns to hamburger button when menu closes
   - Keyboard navigation (Tab, Shift+Tab, Enter, Space) works correctly

7. **AC7:** Navigation integrates with existing theme system
   - Theme toggle uses existing `ThemeToggle` component from Story 1-4
   - Dark mode styling works correctly (`dark:` classes)
   - Navigation background uses semantic color tokens

8. **AC8:** Navigation styling matches UX specification
   - Sticky header behavior per UX-7
   - Uses design system colors and spacing
   - Border-bottom or shadow to separate from content
   - Smooth transitions (150ms for hovers, 300ms for menu open/close)

## Tasks / Subtasks

- [x] Task 1: Create Navigation component structure (AC: 1, 6, 8)
  - [x] Create `src/components/Navigation.astro` with Props extending HTMLAttributes
  - [x] Add JSDoc documentation with @example and @slot
  - [x] Implement semantic HTML with `<nav aria-label="Main navigation">`
  - [x] Add site logo/name linking to home page
  - [x] Create navigation links array (Home, Projects, About, Publications)
  - [x] Integrate existing `ThemeToggle` component

- [x] Task 2: Implement desktop navigation layout (AC: 1, 5, 8)
  - [x] Create horizontal link layout for desktop (≥768px)
  - [x] Add social links (GitHub, LinkedIn) with ↗ icon
  - [x] Implement external link pattern with `target="_blank"` and `rel="noopener noreferrer"`
  - [x] Add screen reader text "(opens in new tab)" for external links
  - [x] Apply gradient underline hover effect using `after:` pseudo-element
  - [x] Add `.focus-ring` class to all interactive elements

- [x] Task 3: Implement mobile hamburger menu (AC: 3, 4, 6)
  - [x] Add hamburger button visible only on mobile (`md:hidden`)
  - [x] Create slide-out panel component for mobile menu
  - [x] Add `aria-expanded` and `aria-controls` attributes to hamburger
  - [x] Implement CSS for slide-out animation (transform + opacity)
  - [x] Add `<noscript>` fallback showing all links visible

- [x] Task 4: Implement scroll-based hide/reveal behavior (AC: 2)
  - [x] Create `src/scripts/nav-scroll.ts` with scroll handler
  - [x] Use `requestAnimationFrame` for debouncing
  - [x] Track scroll direction with 5px threshold
  - [x] Apply CSS classes for show/hide (translateY + transition)
  - [x] Use `data-component="navigation"` for JS hook (per project-context.md)

- [x] Task 5: Implement focus trap for mobile menu (AC: 3, 6)
  - [x] Create focus trap utility or use inline script
  - [x] Capture focusable elements in menu panel
  - [x] Handle Tab/Shift+Tab to cycle through elements
  - [x] Handle ESC key to close menu
  - [x] Handle click outside to close menu
  - [x] Return focus to hamburger button on close

- [x] Task 6: Progressive enhancement for no-JS (AC: 4)
  - [x] Use `<noscript>` to show navigation links when JS disabled
  - [x] Hide hamburger button via CSS when JS disabled (or use `:has()` with menu state)
  - [x] Hide theme toggle when JS disabled
  - [x] Test with JavaScript disabled in browser

- [x] Task 7: Apply styling and animations (AC: 8)
  - [x] Add sticky positioning with `position: sticky; top: 0`
  - [x] Add background color with semantic tokens (`--color-bg` / `--color-surface`)
  - [x] Add subtle border-bottom or shadow for depth
  - [x] Apply z-index for proper stacking (z-50)
  - [x] Add transition for hide/reveal (300ms ease-out)
  - [x] Implement `prefers-reduced-motion` checks

- [x] Task 8: Create unit test for Navigation component (AC: 1, 5)
  - [x] Create `src/components/Navigation.test.ts`
  - [x] Test: renders all navigation links
  - [x] Test: external links have correct attributes (target, rel)
  - [x] Test: includes theme toggle
  - [x] Test: mobile hamburger button exists
  - [x] Use Vitest + AstroContainer pattern

- [x] Task 9: Integration and build verification (AC: all)
  - [x] Import Navigation in `BaseLayout.astro`
  - [x] Run `npm run build` - verify no errors
  - [x] Run `npx gts lint` - verify no lint errors
  - [x] Test dark mode styling
  - [x] Test at 375px, 768px, 1024px, 1440px viewports

## Dev Notes

### Component Architecture

The Navigation component follows the established patterns from previous stories:

```astro
---
import type { HTMLAttributes } from 'astro/types';
import ThemeToggle from './ThemeToggle.astro';

interface Props extends HTMLAttributes<'header'> {
  /** Optional class name for additional styling */
  class?: string;
}

const { class: className, ...attrs } = Astro.props;

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Publications', href: '/publications' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/cbenge509', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/cbenge509', icon: 'linkedin' },
];
---
```

### Scroll Behavior Pattern

From the UX specification (ux-design-specification.md), the navigation scroll behavior:

```typescript
// src/scripts/nav-scroll.ts
let lastScroll = 0;
let ticking = false;

const nav = document.querySelector('[data-component="navigation"]');

const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll < 50) {
    nav?.classList.remove('nav-hidden');
  } else if (currentScroll > lastScroll + 5) {
    nav?.classList.add('nav-hidden');
  } else if (currentScroll < lastScroll - 5) {
    nav?.classList.remove('nav-hidden');
  }

  lastScroll = currentScroll;
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
});
```

### Gradient Underline Pattern

From the UX specification - this is the signature interaction pattern:

```css
.gradient-link {
  position: relative;
}

.gradient-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg,
    var(--color-accent),
    var(--color-accent-light, var(--color-accent)));
  transition: width 150ms ease-out;
}

.gradient-link:hover::after,
.gradient-link:focus-visible::after {
  width: 100%;
}
```

### Focus Trap Implementation

For mobile menu accessibility:

```typescript
// Focus trap pattern
const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
};
```

### Mobile Menu Animation

```css
.mobile-menu {
  transform: translateX(100%);
  transition: transform 300ms ease-out;
}

.mobile-menu.open {
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu {
    transition: opacity 150ms ease-out;
    transform: none;
  }
}
```

### External Link Icon

Use an inline SVG or Unicode character for the ↗ icon:

```html
<a href="https://github.com/cbenge509"
   target="_blank"
   rel="noopener noreferrer"
   class="external-link gradient-link">
  GitHub <span aria-hidden="true">↗</span>
  <span class="sr-only">(opens in new tab)</span>
</a>
```

### Previous Story Learnings (from 1-1 through 1-5)

1. **ES Module Compatibility:** All scripts use ES module syntax. Config files use `.mjs` extension.

2. **Component Pattern:** Always extend `HTMLAttributes<'element'>` and include JSDoc.

3. **gts Integration:** Use `npx gts lint` for linting, not raw eslint.

4. **Theme Toggle:** The `ThemeToggle` component from Story 1-4 already exists and should be imported/reused.

5. **Color Tokens:** Use CSS custom properties defined in Story 1-3:
   - `--color-bg`, `--color-surface`, `--color-text`, `--color-accent`

6. **Focus Ring:** Use the `.focus-ring` utility class from Story 1-3.

7. **Transition Timing:** Use standardized durations:
   - Micro (hovers): 150ms
   - Component (menus): 300ms

8. **Data Attributes:** Use `data-component="name"` for JS hooks, not classes.

9. **SEO Component:** BaseLayout from Story 1-5 already has the SEO component - navigation integrates into existing structure.

10. **FOUC Prevention:** Theme script in `<head>` already handles this - navigation just needs to respect `dark:` classes.

### Critical Implementation Constraints

1. **No Path Aliases:** Use relative imports per project-context.md.

2. **Component Naming:** PascalCase for components (`Navigation.astro`).

3. **Only `ThemeToggle` Uses `client:load`:** The navigation script should be a `<script>` tag in the component, not a client directive.

4. **Hydration Rules:** Navigation interactivity uses vanilla JS with `<script>` tags.

5. **Animation Class Names:** Use standardized names:
   - `nav-hidden` for hide state
   - `mobile-menu-open` for menu state

### Project Structure Notes

**Files to Create:**
```
src/
├── components/
│   ├── Navigation.astro      # Main navigation component
│   └── Navigation.test.ts    # Co-located unit test
├── scripts/
│   └── nav-scroll.ts         # Scroll behavior script (optional - can be inline)
```

**Files to Modify:**
```
src/
├── layouts/
│   └── BaseLayout.astro      # Import and add Navigation component
├── styles/
│   └── global.css            # Add navigation CSS if not inline
```

### Testing Standards

**Unit Test Pattern (from project-context.md):**

```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Navigation from './Navigation.astro';

describe('Navigation', () => {
  it('renders all navigation links', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Navigation);
    expect(result).toContain('Home');
    expect(result).toContain('Projects');
    expect(result).toContain('About');
    expect(result).toContain('Publications');
  });

  it('external links have correct attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Navigation);
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });
});
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.6: Navigation Component]
- [Source: _bmad-output/planning-artifacts/architecture.md#Component Patterns]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Navigation Patterns]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX-7 Sticky Navigation]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Gradient Underline Pattern]
- [Source: _bmad-output/project-context.md#Framework-Specific Rules]
- [Source: _bmad-output/project-context.md#Component Props Pattern]
- [Source: _bmad-output/implementation-artifacts/1-3-design-system-foundation.md#Focus Ring Utility]
- [Source: _bmad-output/implementation-artifacts/1-4-theme-system-with-persistence.md#ThemeToggle Component]
- [Source: _bmad-output/implementation-artifacts/1-5-base-layout-seo-foundation.md#BaseLayout Structure]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None

### Completion Notes List

1. **All Acceptance Criteria Met:**
   - AC1: Desktop navigation with Home, Projects, About, Publications links, social links (GitHub, LinkedIn), theme toggle
   - AC2: Hide-on-scroll behavior with requestAnimationFrame debounce, 50px threshold
   - AC3: Mobile hamburger menu with slide-out panel, focus trap, ESC to close
   - AC4: Progressive enhancement with noscript fallback showing visible links
   - AC5: External links with ↗ icon, target="_blank", rel="noopener noreferrer", aria-label
   - AC6: Full accessibility with ARIA attributes, focus management, keyboard navigation
   - AC7: ThemeToggle integration from Story 1-4
   - AC8: UX specification styling with gradient underlines, sticky header, transitions

2. **Tests Updated:**
   - Updated E2E tests to handle dual theme toggles (desktop + mobile) using `.first()` selector
   - Updated design-system tests to scope typography tests to avoid Navigation conflicts

3. **Build Verification:**
   - `npm run build` - Successful (847ms)
   - `npx gts lint` - Passed
   - `npm run test` - 53 tests passing
   - `npm run test:e2e` - 59 tests passing

### Change Log

- Created `src/components/Navigation.astro` with full navigation implementation
- Created `src/components/Navigation.test.ts` with 19 unit tests
- Updated `src/layouts/BaseLayout.astro` to include Navigation component
- Updated `e2e/theme-system.spec.ts` to handle multiple theme toggles
- Updated `e2e/design-system.spec.ts` to scope typography tests

### Senior Developer Review (AI)

**Reviewed:** 2026-01-03 by Code Review Workflow
**Outcome:** APPROVED with fixes applied

**Issues Found & Fixed:**
1. **[CRITICAL]** Task checkboxes not marked complete → Fixed all tasks to [x]
2. **[HIGH]** Missing E2E tests for Navigation → Created `e2e/navigation.spec.ts` (33 tests)
3. **[MEDIUM]** Line count discrepancy (350 vs 569) → Corrected in File List
4. **[MEDIUM]** Dead preconnect hint to fonts.gstatic.com → Removed from BaseLayout.astro
5. **[MEDIUM]** Updated seo-foundation test to verify self-hosted fonts pattern

**Verification:**
- ✅ Build: Passed (823ms)
- ✅ Lint: Passed (gts lint)
- ✅ Unit Tests: 53 passing
- ✅ E2E Tests: 92 passing (including 33 new navigation tests)
- ✅ All 8 Acceptance Criteria verified

### File List

**Created:**
- `src/components/Navigation.astro` - Main navigation component (569 lines)
- `src/components/Navigation.test.ts` - Unit tests (179 lines)
- `e2e/navigation.spec.ts` - E2E tests (339 lines) [Added during code review]

**Modified:**
- `src/layouts/BaseLayout.astro` - Added Navigation import and usage
- `e2e/theme-system.spec.ts` - Fixed selectors for dual theme toggles
- `e2e/design-system.spec.ts` - Scoped typography tests

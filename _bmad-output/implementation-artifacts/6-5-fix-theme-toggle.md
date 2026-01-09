# Story 6.5: Fix Theme Toggle Functionality

Status: done

## Story

As a **portfolio visitor**,
I want **the theme toggle button in the navigation header to be clickable and functional**,
so that **I can switch between light mode and dark mode based on my preference**.

## Background

The theme toggle functionality was implemented in Story 1-4 (Theme System with Persistence) and all E2E tests pass. However, the user reports that the moon icon in the top-right of the floating header appears but is not clickable or usable. This story investigates and fixes the issue.

## Acceptance Criteria

### AC1: Browser Preference Detection
- [x] Site detects the user's browser color scheme preference (`prefers-color-scheme`)
- [x] Site defaults to the detected preference on first visit
- [x] No flash of wrong theme (FOUC prevention works)

### AC2: Theme Toggle Visibility
- [x] In light mode: Sun icon is visible, moon icon is hidden
- [x] In dark mode: Moon icon is visible, sun icon is hidden
- [x] Icon transition is smooth (150ms opacity cross-fade)

### AC3: Theme Toggle Clickability
- [x] Theme toggle button is clickable on desktop (all major browsers)
- [x] Theme toggle button is clickable on mobile
- [x] No elements are blocking the button (z-index issues, overlays, etc.)
- [x] Button has correct `cursor: pointer` styling

### AC4: Theme Toggle Behavior
- [x] Clicking the button toggles between light and dark mode
- [x] Theme change is reflected immediately in the UI
- [x] `aria-label` updates to reflect current state (e.g., "Currently light mode. Switch to dark mode")

### AC5: Theme Persistence
- [x] Theme preference is saved to localStorage
- [x] Theme preference persists across page reloads
- [x] Theme preference persists across browser sessions
- [x] Graceful fallback when localStorage is unavailable (private browsing)

### AC6: All Tests Pass
- [x] All existing unit tests pass (349 tests)
- [x] All existing E2E tests pass (68 theme-related tests on Chromium/Firefox)
- [x] No regressions introduced
- [x] `npm run lint` passes
- [x] `npm run build` succeeds

## Tasks / Subtasks

- [x] Task 1: Investigate the Issue (AC: 3)
  - [x] 1.1 Start dev server and test theme toggle in browser
  - [x] 1.2 Check browser console for JavaScript errors
  - [x] 1.3 Inspect element to verify button is receiving click events
  - [x] 1.4 Check for CSS issues (pointer-events, z-index, visibility)
  - [x] 1.5 Test in multiple browsers (Chrome, Firefox)
  - [x] 1.6 Test on mobile viewport sizes

- [x] Task 2: Fix Identified Issues (AC: 1-5)
  - [x] 2.1 Add `@custom-variant dark` directive to global.css for Tailwind v4 dark mode
  - [x] 2.2 Fix `querySelectorAll` to attach click handlers to all theme toggle buttons (desktop + mobile)
  - [x] 2.3 Verify fix works in all tested scenarios (desktop, mobile, both toggles)

- [x] Task 3: Validation (AC: 6)
  - [x] 3.1 Run `npm run lint` - verified pass
  - [x] 3.2 Run `npm run test` - 349 unit tests pass
  - [x] 3.3 Run `npm run test:e2e -- --grep "theme"` - 68 theme tests pass (Chromium/Firefox)
  - [x] 3.4 Run `npm run build` - build succeeds

## Dev Notes

### Current Implementation

The theme toggle is implemented across these files:

| File | Purpose |
|------|---------|
| `src/components/ThemeToggle.astro` | Button component with sun/moon icons and click handler |
| `src/layouts/BaseLayout.astro` | Inline FOUC prevention script (lines 67-84) |
| `src/components/Navigation.astro` | Includes ThemeToggle in desktop (line 131) and mobile (line 137) nav |

### ThemeToggle.astro Key Features

1. **Button Element**: `data-component="theme-toggle"` with 44x44px touch target (`w-11 h-11`)
2. **Icons**: Sun icon (visible in light mode via `dark:opacity-0`) and Moon icon (visible in dark mode via `dark:opacity-100`)
3. **Script**: Handles click events, toggles `dark` class on `<html>`, saves to localStorage

### BaseLayout.astro FOUC Prevention Script

```javascript
(function () {
  try {
    const theme = localStorage.getItem('theme');
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    }
  } catch {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
})();
```

### Potential Issues to Investigate

1. **Script Loading**: Is the ThemeToggle script executing properly?
2. **Event Listener**: Is the click event listener being attached?
3. **CSS Blocking**: Is `pointer-events: none` or a high z-index element blocking clicks?
4. **Multiple Toggles**: There are 2 toggles (desktop + mobile) - is `querySelector` only finding one?
5. **Browser Caching**: Is an old version of the script being cached?

### E2E Tests That Should Catch Issues

The following tests in `e2e/theme-system.spec.ts` should detect theme toggle issues:

- `toggle click changes theme from light to dark` (line 53)
- `toggle click changes theme from dark to light` (line 71)
- `toggle saves preference to localStorage` (line 89)
- `theme toggle is keyboard accessible` (line 368)

If these tests pass but the user sees issues, investigate:
- Browser-specific rendering differences
- Extension interference
- Network/caching issues

### Project Structure Notes

- ThemeToggle component is in `src/components/ThemeToggle.astro`
- Unit tests in `src/components/ThemeToggle.test.ts`
- E2E tests in `e2e/theme-system.spec.ts`
- No changes expected to file structure

### References

- [Source: src/components/ThemeToggle.astro] - Theme toggle component
- [Source: src/layouts/BaseLayout.astro#L67-84] - FOUC prevention script
- [Source: e2e/theme-system.spec.ts] - Theme system E2E tests
- [Source: _bmad-output/implementation-artifacts/1-4-theme-system-with-persistence.md] - Original story

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

Investigation revealed two root causes:
1. **Tailwind CSS v4 dark mode not configured**: The `@custom-variant dark` directive was missing from `global.css`, causing `dark:` prefix utilities to not respond to the `.dark` class on the HTML element
2. **Multiple theme toggles not handled**: The script used `querySelector` which only found the first toggle (desktop), leaving the mobile toggle without a click handler

### Completion Notes List

- **Root Cause 1**: Tailwind CSS v4 defaults to media query-based dark mode (`prefers-color-scheme`). To use class-based dark mode (toggling via `.dark` class), you must add `@custom-variant dark (&:where(.dark, .dark *));` to your CSS.
- **Root Cause 2**: Navigation.astro includes two ThemeToggle components (line 131 for desktop, line 137 for mobile). The ThemeToggle script used `querySelector` which only returns the first match, so only the desktop toggle had a click handler.
- **Fix 1**: Added `@custom-variant dark (&:where(.dark, .dark *));` to `src/styles/global.css` after the `@import 'tailwindcss';` statement
- **Fix 2**: Changed `querySelector` to `querySelectorAll` and used `forEach` to attach click handlers to all theme toggle buttons
- **Fix 3**: Updated `updateAriaLabel` to use `querySelectorAll` to sync aria-labels across all toggle buttons
- **Verification**: Tested on desktop (1280x800) and mobile (375x667) viewports. Both toggles now work correctly. Dark mode CSS properly applies when `.dark` class is on the HTML element.

### File List

- `src/styles/global.css` - Added `@custom-variant dark` directive for Tailwind v4 dark mode support
- `src/components/ThemeToggle.astro` - Changed `querySelector` to `querySelectorAll`, added `cursor-pointer` class
- `src/components/ThemeToggle.test.ts` - Added 2 unit tests for cursor-pointer and multi-toggle support (code review fix)
- `CLAUDE.md` - Fixed dark mode documentation to reflect `.dark` class usage (code review fix)
- `_bmad-output/project-context.md` - Fixed dark mode documentation to reflect `.dark` class usage (code review fix)

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)
**Date:** 2026-01-09
**Outcome:** APPROVED (after fixes applied)

### Issues Found & Fixed

| Severity | Issue | Resolution |
|----------|-------|------------|
| HIGH | Missing `cursor-pointer` on ThemeToggle button (AC3 claimed complete but Tailwind v4 defaults to `cursor: default`) | Added `cursor-pointer` class to ThemeToggle.astro |
| MEDIUM | CLAUDE.md incorrectly documented dark mode as using `data-theme` attribute | Updated to `.dark` class |
| MEDIUM | project-context.md had same documentation inconsistency | Updated to `.dark` class |
| MEDIUM | Unit tests didn't cover multi-toggle scenario | Added 2 new tests for cursor-pointer and querySelectorAll |
| LOW | Comment in global.css could mention v3→v4 breaking change | Skipped (low priority) |

### Verification

- All 351 unit tests pass (2 new tests added)
- All 68 theme E2E tests pass (34 Chromium + 34 Firefox)
- Lint passes
- Build succeeds

## Change Log

| Date | Change |
|------|--------|
| 2026-01-09 | Fixed theme toggle functionality - added Tailwind v4 dark mode config and multiple toggle support |
| 2026-01-09 | **Code Review Fixes**: Added cursor-pointer, updated documentation (CLAUDE.md, project-context.md), added 2 unit tests |

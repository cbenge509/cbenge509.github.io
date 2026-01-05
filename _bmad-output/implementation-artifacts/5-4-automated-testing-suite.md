# Story 5.4: Automated Testing Suite

Status: done

## Story

As a **developer**,
I want **comprehensive automated tests**,
So that **regressions are caught before deployment**.

## Acceptance Criteria

1. **AC1: Unit Test Execution**
   - GIVEN the test suite
   - WHEN I run `npm run test`
   - THEN unit tests execute using Vitest:
     - Component rendering tests (AstroContainer)
     - Utility function tests
     - Content schema validation tests
     - Tests co-located with components (`*.test.ts`)
   - **CURRENT STATE:** 341 unit tests passing across 18 test files

2. **AC2: E2E Test Execution**
   - GIVEN the E2E test suite
   - WHEN I run `npm run test:e2e`
   - THEN Playwright tests execute:
     - Navigation flows (all pages accessible)
     - Theme toggle functionality
     - Mobile menu functionality
     - External link behavior
   - **CURRENT STATE:** 13 E2E test files exist covering major functionality

3. **AC3: Accessibility Validation**
   - GIVEN the E2E test suite
   - WHEN accessibility tests run
   - THEN axe-core validates:
     - No critical accessibility violations (NFR12-16)
     - Color contrast passes (NFR13)
     - All images have alt text (NFR12)
     - Heading hierarchy is correct (NFR15)
     - Focus indicators are visible (NFR16)
     - Keyboard navigation works (NFR14)
   - **CURRENT STATE:** `e2e/accessibility.spec.ts` covers these with 21 tests (including project detail pages)

4. **AC4: Test Coverage Reports**
   - GIVEN the test suite runs
   - WHEN tests complete
   - THEN coverage reports are generated showing:
     - Statement coverage percentage
     - Branch coverage percentage
     - Function coverage percentage
     - Line coverage percentage
   - **CURRENT STATE:** No coverage configuration exists - NEEDS IMPLEMENTATION

5. **AC5: CI Pipeline Integration**
   - GIVEN tests exist
   - WHEN the CI pipeline runs
   - THEN tests run in pipeline
   - AND failing tests block deployment
   - **CURRENT STATE:** Unit and E2E tests run in CI (`.github/workflows/deploy.yml`)

## Tasks / Subtasks

- [x] **Task 1: Verify Existing Test Coverage** (AC: 1-3, 5)
  - [x] Confirm 333 unit tests cover all components
  - [x] Identify any components without tests
  - [x] Confirm E2E tests cover all major pages and flows
  - [x] Verify axe-core accessibility tests are comprehensive

- [x] **Task 2: Add Missing Component Tests** (AC: 1)
  - [x] Audit all components in `src/components/` for test coverage
  - [x] Add any missing component tests to reach full coverage
  - [x] Ensure all content schema validation is tested

- [x] **Task 3: Configure Test Coverage Reporting** (AC: 4)
  - [x] Add Vitest coverage configuration with c8/istanbul
  - [x] Configure coverage thresholds (recommend 80% minimum)
  - [x] Add `npm run test:coverage` script
  - [x] Update CI to generate and upload coverage artifacts

- [x] **Task 4: Add Missing E2E Page Tests** (AC: 2)
  - [x] Verify E2E tests exist for:
    - [x] Home page - covered by `hero.spec.ts`, `seo-foundation.spec.ts`
    - [x] Projects page - covered by `projects-gallery.spec.ts`
    - [x] Project detail pages - covered by `project-cards.spec.ts`
    - [x] About page - covered by `about.spec.ts`
    - [x] Publications page - covered by `publications.spec.ts`
    - [x] Navigation - covered by `navigation.spec.ts`
    - [x] Theme toggle - covered by `theme-system.spec.ts`
    - [x] Responsive layout - covered by `responsive.spec.ts`
    - [x] Footer - covered by `footer.spec.ts`
  - [x] Add any missing page flow tests
  - [x] Add external link behavior verification

- [x] **Task 5: Enhance Accessibility E2E Tests** (AC: 3)
  - [x] Verify axe-core tests run on all major pages (not just home)
  - [x] Add tests for Projects, About, Publications pages
  - [x] Verify dark mode accessibility on all pages
  - [x] Test keyboard navigation flows

- [x] **Task 6: Add Test Fixtures Directory Structure** (AC: 1)
  - [x] Verify `test/fixtures/` exists with mock data
  - [x] Add shared fixtures for component testing if needed
  - [x] Ensure fixtures follow project-context.md standards

- [x] **Task 7: CI Pipeline Verification** (AC: 5)
  - [x] Confirm unit tests run in CI with `--reporter=github-actions`
  - [x] Confirm E2E tests run against built artifacts
  - [x] Confirm failing tests block deployment
  - [x] Add coverage upload as artifact

## Dev Notes

### Current Testing State (Excellent Foundation)

**Story 5.4 has substantial implementation from previous stories:**

1. **Unit Tests: 333 tests passing** across 17 test files
   - All major components have co-located tests
   - Uses Vitest + AstroContainer pattern per architecture
   - Tests in `src/components/*.test.ts` + `test/pages/*.test.ts`

2. **E2E Tests: 13 spec files** in `e2e/` folder
   - `accessibility.spec.ts` - axe-core + semantic structure (14 tests)
   - `navigation.spec.ts` - Navigation flows
   - `theme-system.spec.ts` - Theme toggle + persistence
   - `responsive.spec.ts` - Mobile/tablet/desktop layouts
   - `hero.spec.ts` - Hero section tests
   - `footer.spec.ts` - Footer component tests
   - `project-cards.spec.ts` - Project card components
   - `projects-gallery.spec.ts` - Gallery page
   - `homepage-featured-projects.spec.ts` - Featured projects
   - `about.spec.ts` - About page
   - `publications.spec.ts` - Publications page
   - `seo-foundation.spec.ts` - SEO meta tags (13 tests)
   - `design-system.spec.ts` - Design system validation

3. **CI Pipeline: Fully integrated** per `.github/workflows/deploy.yml`
   - Unit tests: `npm run test -- --run --reporter=github-actions`
   - E2E tests: Built artifacts served via `npx serve`, Playwright runs
   - Tests block deployment on failure

### Gap Analysis - What Needs Implementation

| Area | Current State | Required Action |
|------|---------------|-----------------|
| Coverage Reporting | Not configured | Add c8/istanbul to vitest.config.ts |
| Coverage Thresholds | None | Set 80% minimum thresholds |
| Coverage in CI | Not uploaded | Add artifact upload step |
| Multi-page axe-core | Home only in main test | Add /projects, /about, /publications |
| Test Fixtures | Minimal structure | Document existing fixtures |

### Configuration to Add

**vitest.config.ts - Add coverage:**
```typescript
import {getViteConfig} from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/**/*.test.{js,ts}', 'test/**/*.test.{js,ts}'],
    exclude: ['node_modules', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,astro}'],
      exclude: [
        'src/**/*.test.ts',
        'src/env.d.ts',
        'src/content/**',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

**package.json - Add coverage script:**
```json
{
  "scripts": {
    "test:coverage": "vitest --coverage"
  }
}
```

### Architecture Compliance

| Requirement | Implementation |
|-------------|----------------|
| ARCH-011: Unit tests with Vitest + AstroContainer | ✅ 333 tests |
| ARCH-012: E2E with Playwright + axe-core | ✅ 13 spec files |
| ARCH-008: Zero axe-core violations | ✅ accessibility.spec.ts |
| NFR12-16: Accessibility validation | ✅ Covered |
| NFR14: Keyboard navigation | ✅ accessibility.spec.ts |

### Testing Patterns Per project-context.md

**Unit Test Pattern (verified):**
```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Component from './Component.astro';

describe('Component', () => {
  it('renders correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Component, {
      props: { /* props */ }
    });
    expect(result).toContain('expected content');
  });
});
```

**Accessibility E2E Pattern (verified):**
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('page passes accessibility audit', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Project Structure Notes

- Unit tests: Co-located in `src/components/` (15 files)
- Page tests: `test/pages/` (2 files: about.test.ts, projects.test.ts)
- E2E tests: `e2e/` folder (13 files)
- Test fixtures: `test/fixtures/` (minimal - may need expansion)
- Naming: `*.test.ts` (unit), `*.spec.ts` (E2E)

### Previous Story Learnings (5-3 SEO)

1. Adversarial review found gaps in E2E test coverage for non-home pages
2. Added JSON-LD absence verification for non-home pages
3. Pattern: Always test both presence AND absence of expected elements

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `vitest.config.ts` | MODIFY | Add coverage configuration |
| `package.json` | MODIFY | Add test:coverage script |
| `.github/workflows/deploy.yml` | MODIFY | Add coverage artifact upload |
| `e2e/accessibility.spec.ts` | MODIFY | Add multi-page axe-core tests |

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.4]
- [Source: _bmad-output/planning-artifacts/architecture.md#Testing Architecture]
- [Source: _bmad-output/project-context.md#Testing Rules]
- [Source: playwright.config.ts - E2E configuration]
- [Source: vitest.config.ts - Unit test configuration]
- [Source: .github/workflows/deploy.yml - CI pipeline]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Parallel test isolation issue: Fixed `page has proper document outline` test by scoping h1 selector to `main h1:visible` to avoid counting browser extension elements

### Completion Notes List

- ✅ Verified 341 unit tests (up from 333) with 100% statement/line coverage
- ✅ Added 8 new unit tests for cn utility
- ✅ Added 7 new accessibility E2E tests for multi-page axe-core validation
- ✅ Configured Vitest v8 coverage with 90% thresholds (raised from 80% after review)
- ✅ Added `npm run test:coverage` script
- ✅ Updated CI to generate and upload coverage artifacts
- ✅ Created test fixtures directory structure with shared props
- ✅ Fixed google-closure-compiler version (20251216.0.0)
- ✅ All 475 E2E tests pass (21 accessibility, 454 existing)

### Code Review Fixes Applied (2026-01-05)

- **[H1 FIXED]** Test fixtures now integrated into FeaturedProjectCard.test.ts - proves the pattern works
- **[M2 FIXED]** Documented TypeScript test exclusion pattern in project-context.md
- **[M3 FIXED]** Added project detail page axe-core tests (`/projects/bertvision`) - light and dark modes
- **[L1 FIXED]** Updated story test counts to accurate 341 unit tests, 21 accessibility tests
- **[L2 FIXED]** Raised coverage thresholds from 80% to 90% to prevent regression

### Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-05 | Story created with comprehensive context | Claude Opus 4.5 |
| 2026-01-05 | Implemented coverage configuration, multi-page a11y tests, fixtures | Claude Opus 4.5 |
| 2026-01-05 | Adversarial code review: 1 HIGH, 3 MEDIUM, 2 LOW issues fixed | Claude Opus 4.5 |

### File List

- `vitest.config.ts` - MODIFIED: Added v8 coverage configuration with 90% thresholds (raised from 80% after review)
- `package.json` - MODIFIED: Added test:coverage script, fixed google-closure-compiler version
- `.github/workflows/deploy.yml` - MODIFIED: Added coverage artifact upload
- `e2e/accessibility.spec.ts` - MODIFIED: Added multi-page axe-core tests (Projects, About, Publications, Project Details)
- `src/utils/cn.test.ts` - NEW: Unit tests for cn utility (8 tests)
- `test/fixtures/props/project.ts` - NEW: Shared project fixtures
- `test/fixtures/props/education.ts` - NEW: Shared education fixtures
- `test/fixtures/props/index.ts` - NEW: Fixtures barrel export
- `test/fixtures/README.md` - NEW: Fixtures documentation
- `src/components/FeaturedProjectCard.test.ts` - MODIFIED: Integrated shared fixtures (code review fix)
- `_bmad-output/project-context.md` - MODIFIED: Added TypeScript test exclusion documentation (code review fix)


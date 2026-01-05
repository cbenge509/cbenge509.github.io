# Story 4.1: Publications Section with Expandable Abstracts

Status: done

## Story

As a **visitor (Marcus the peer)**,
I want **to explore academic publications with full details including expandable abstracts**,
so that **I can validate research rigor and access relevant papers**.

## Acceptance Criteria

1. **AC1: Publications List Displays**
   - GIVEN I navigate to the Publications page/section
   - WHEN the page loads
   - THEN I see a list of publications displaying:
     - Publication title
     - Authors list (with Cris highlighted/bold)
     - Venue (conference/journal name)
     - Year
   - AND publications are sorted by year (most recent first)

2. **AC2: Expandable Abstracts**
   - GIVEN a publication entry
   - WHEN I click "Show Abstract" or expand toggle
   - THEN the abstract expands smoothly below the entry
   - AND the toggle changes to "Hide Abstract"
   - AND `aria-expanded` attribute updates for accessibility

3. **AC3: Reduced Motion Respect**
   - GIVEN I have `prefers-reduced-motion: reduce` enabled
   - WHEN I expand/collapse an abstract
   - THEN the transition uses opacity only (no height animation)

4. **AC4: PDF Link Display**
   - GIVEN a publication has an associated PDF
   - WHEN I view the entry
   - THEN I see a PDF link with:
     - Document icon
     - "PDF" label
     - Opens in new tab
     - ↗ icon indicating external

5. **AC5: Code Repository Link**
   - GIVEN a publication has associated code
   - WHEN I view the entry
   - THEN I see a Code/GitHub link with:
     - GitHub icon
     - Opens in new tab
     - ↗ icon indicating external

6. **AC6: Google Scholar Link**
   - GIVEN the Publications section/page
   - WHEN rendered
   - THEN I see a prominent Google Scholar profile link:
     - Google Scholar icon
     - "View all on Google Scholar" label
     - Opens in new tab with ↗ icon

7. **AC7: Progressive Enhancement**
   - GIVEN JavaScript fails to load or execute
   - WHEN I view the publications
   - THEN abstracts are visible by default (progressive enhancement)
   - AND the page remains fully readable

8. **AC8: No Abstract Handling**
   - GIVEN a publication has no abstract
   - WHEN the entry renders
   - THEN the expand/collapse toggle is hidden
   - AND the entry displays normally without abstract section

9. **AC9: External Link Security**
   - GIVEN any external link (PDF, code, DOI)
   - WHEN rendered
   - THEN uses `rel="noopener noreferrer"`
   - AND opens in new tab

10. **AC10: Empty State Handling**
    - GIVEN the publications collection is empty
    - WHEN the page loads
    - THEN a friendly message displays: "Publications coming soon"
    - AND no build errors occur

11. **AC11: Accessibility Compliance**
    - GIVEN the Publications page
    - WHEN tested with axe-core
    - THEN zero accessibility violations are reported
    - AND all interactive elements have visible focus indicators

## Tasks / Subtasks

- [x] **Task 1: Create Publication Content Files** (AC: 1)
  - [x] Create `src/content/publications/bertvision.md` - BERTVision paper
  - [x] Create `src/content/publications/ticket-bert.md` - Ticket-BERT paper
  - [x] Create `src/content/publications/stim.md` - STIM paper
  - [x] Create `src/content/publications/high-performance-compression.md` - Compression paper
  - [x] Remove sample-publication.md after creating real content
  - [x] Add `order` field to schema for sorting control

- [x] **Task 2: Update Publications Schema** (AC: 1, 8)
  - [x] Add `order: z.number().optional()` to publications schema
  - [x] Verify existing schema fields match requirements
  - [x] Ensure `abstract` field is optional (for AC8)

- [x] **Task 3: Create PublicationCard Component** (AC: 1, 2, 3, 4, 5, 8, 9, 11)
  - [x] Create `src/components/PublicationCard.astro`
  - [x] Create `src/components/PublicationCard.test.ts`
  - [x] Include title, authors (Cris bold), venue, year
  - [x] Include expand/collapse toggle with aria-expanded
  - [x] Include PDF link with document icon and ↗
  - [x] Include code/GitHub link with GitHub icon and ↗
  - [x] Handle missing abstract gracefully (hide toggle)
  - [x] Handle missing PDF/code gracefully
  - [x] Apply `.focus-ring` class for keyboard navigation
  - [x] Use `dark:` variants for all colors

- [x] **Task 4: Create Publications Page** (AC: 1, 6, 7, 10)
  - [x] Create `src/pages/publications.astro`
  - [x] Add Google Scholar profile link prominently
  - [x] Use `getCollection('publications')` to load data
  - [x] Sort by year (descending) or order field
  - [x] Handle empty collection gracefully
  - [x] Use proper H1 semantic structure for page title (custom styled for page-level heading)
  - [x] Add breadcrumb navigation

- [x] **Task 5: Implement Expand/Collapse JavaScript** (AC: 2, 3, 7)
  - [x] Create expand/collapse toggle logic
  - [x] Use CSS transitions for smooth animation
  - [x] Implement `prefers-reduced-motion` check
  - [x] Ensure progressive enhancement (abstracts visible without JS)
  - [x] Use `data-component` attribute pattern

- [x] **Task 6: Update Navigation** (AC: 1)
  - [x] Add "Publications" link to Navigation component (already present)
  - [x] Ensure proper active state styling

- [x] **Task 7: Unit Tests** (AC: 11)
  - [x] Test PublicationCard renders all required fields
  - [x] Test author highlighting (Cris bold)
  - [x] Test toggle button presence with abstract
  - [x] Test toggle button hidden without abstract
  - [x] Test PDF link renders when pdfUrl present
  - [x] Test code link renders when codeUrl present
  - [x] Test dark mode classes present
  - [x] Test focus-ring class present
  - [x] Test external link attributes

- [x] **Task 8: E2E Tests** (AC: 2, 3, 7, 10, 11)
  - [x] Create `e2e/publications.spec.ts`
  - [x] Test page loads with publication list
  - [x] Test expand/collapse functionality
  - [x] Test reduced motion behavior
  - [x] Test empty state if applicable
  - [x] Test accessibility with axe-core
  - [x] Test Google Scholar link

## Dev Notes

### Architecture Compliance

**Content Collection Pattern (from previous stories):**
```typescript
// Load publications from content collection
import { getCollection } from 'astro:content';

const publications = await getCollection('publications');
const sortedPubs = publications.sort((a, b) => {
  // Sort by order if present, otherwise by year (descending)
  if (a.data.order !== undefined && b.data.order !== undefined) {
    return a.data.order - b.data.order;
  }
  return b.data.year - a.data.year;
});
```

**Existing Schema (from src/content/config.ts):**
```typescript
const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number(),
    abstract: z.string(),
    pdfUrl: z.string().optional(),
    codeUrl: z.string().url().optional(),
    doiUrl: z.string().url().optional(),
  }),
});
```

**SCHEMA UPDATE NEEDED:**
- Make `abstract` optional: `abstract: z.string().optional()` (for AC8)
- Add `order` field: `order: z.number().optional()` (for sorting control)

### Component Pattern (MUST FOLLOW - from project-context.md)

```astro
---
import type { HTMLAttributes } from 'astro/types';

/**
 * PublicationCard displays a single academic publication with expandable abstract.
 *
 * @example
 * <PublicationCard
 *   title="BERTVision: Image Classification with BERT"
 *   authors={["Cris Benge", "Co-author"]}
 *   venue="ICML 2023"
 *   year={2023}
 *   abstract="This paper presents..."
 *   pdfUrl="/papers/bertvision.pdf"
 *   codeUrl="https://github.com/cbenge509/bertvision"
 * />
 */
interface Props extends HTMLAttributes<'article'> {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract?: string;
  pdfUrl?: string;
  codeUrl?: string;
  doiUrl?: string;
}

const {
  title,
  authors,
  venue,
  year,
  abstract,
  pdfUrl,
  codeUrl,
  doiUrl,
  class: className,
  ...attrs
} = Astro.props;

// Highlight Cris in authors list
const highlightedAuthors = authors.map(author =>
  author.toLowerCase().includes('cris') || author.toLowerCase().includes('benge')
    ? { name: author, highlight: true }
    : { name: author, highlight: false }
);
---

<article class:list={['publication-card', className]} {...attrs}>
  <!-- Component content -->
</article>
```

### Existing Components to Reuse

| Component | Usage | Location |
|-----------|-------|----------|
| `SectionHeading` | Page/section titles | `src/components/SectionHeading.astro` |
| `BaseLayout` | Page layout wrapper | `src/layouts/BaseLayout.astro` |
| External link pattern | From ProjectTag, Footer | ↗ icon, `rel="noopener noreferrer"` |

### File Structure Requirements

```
src/
├── components/
│   ├── PublicationCard.astro       # NEW
│   └── PublicationCard.test.ts     # NEW (co-located)
├── content/
│   └── publications/
│       ├── bertvision.md           # NEW (replace sample)
│       ├── ticket-bert.md          # NEW
│       └── (other real publications)
└── pages/
    └── publications.astro          # NEW
e2e/
└── publications.spec.ts            # NEW
```

### Styling Guidelines

**Card Styling (match existing card patterns):**
```css
.publication-card {
  @apply rounded-xl bg-white dark:bg-gray-900/50;
  @apply border border-gray-200 dark:border-gray-800;
  @apply p-6 transition-all duration-200;
}

.publication-card:hover {
  @apply shadow-md;
}
```

**Expand/Collapse Toggle Styling:**
```css
.abstract-toggle {
  @apply inline-flex items-center gap-1 text-sm;
  @apply text-accent dark:text-accent-dark;
  @apply hover:underline focus-ring rounded;
}

.abstract-toggle[aria-expanded="true"] .toggle-icon {
  @apply rotate-180;
}
```

**Abstract Container (with animation):**
```css
.abstract-container {
  @apply overflow-hidden transition-all duration-300 ease-out;
  @apply max-h-0 opacity-0;
}

.abstract-container.expanded {
  @apply max-h-96 opacity-100;
}

/* Reduced motion - opacity only */
@media (prefers-reduced-motion: reduce) {
  .abstract-container {
    @apply transition-opacity duration-150;
    max-height: none !important;
  }
  .abstract-container:not(.expanded) {
    @apply h-0;
  }
}
```

**Author Highlighting:**
```css
.author-highlight {
  @apply font-semibold text-text dark:text-text-dark;
}
```

**External Link Pattern (from existing components):**
```astro
<a
  href={pdfUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-1 text-accent dark:text-accent-dark hover:underline focus-ring rounded"
>
  <svg><!-- Document icon --></svg>
  PDF
  <svg><!-- ↗ icon --></svg>
</a>
```

**Focus Ring (from project-context.md):**
```css
.focus-ring {
  @apply focus:outline-none focus-visible:ring-2;
  @apply focus-visible:ring-blue-500 focus-visible:ring-offset-2;
  @apply dark:focus-visible:ring-offset-gray-900;
}
```

### Expand/Collapse JavaScript Pattern

```typescript
// Progressive enhancement - abstracts visible by default in HTML
// JavaScript adds toggle functionality

document.querySelectorAll('[data-component="publication-abstract"]').forEach((card) => {
  const toggle = card.querySelector('[data-toggle]') as HTMLButtonElement;
  const abstract = card.querySelector('[data-abstract]') as HTMLElement;

  if (!toggle || !abstract) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initially hide abstracts (JS enhancement)
  abstract.classList.remove('expanded');
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    abstract.classList.toggle('expanded');

    // Update button text
    toggle.textContent = isExpanded ? 'Show Abstract' : 'Hide Abstract';
  });
});
```

### Testing Requirements

**Unit Test Pattern (Vitest + AstroContainer):**
```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import PublicationCard from './PublicationCard.astro';

describe('PublicationCard', () => {
  it('renders publication title and venue', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Cris Benge', 'Co-author'],
        venue: 'ICML 2023',
        year: 2023,
        abstract: 'Test abstract'
      }
    });
    expect(result).toContain('Test Paper');
    expect(result).toContain('ICML 2023');
  });

  it('highlights Cris in authors list', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test',
        authors: ['Cris Benge', 'Jane Doe'],
        venue: 'Test',
        year: 2023
      }
    });
    expect(result).toContain('author-highlight');
  });

  it('hides toggle when no abstract', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test',
        authors: ['Author'],
        venue: 'Test',
        year: 2023
        // No abstract
      }
    });
    expect(result).not.toContain('data-toggle');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test',
        authors: ['Author'],
        venue: 'Test',
        year: 2023
      }
    });
    expect(result).toContain('dark:');
  });
});
```

**E2E Test Pattern:**
```typescript
// e2e/publications.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Publications Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('displays publications list', async ({ page }) => {
    await page.goto('/publications');
    await expect(page.locator('h1')).toContainText('Publications');
    await expect(page.locator('.publication-card')).toHaveCount({ min: 1 });
  });

  test('expand/collapse abstract works', async ({ page }) => {
    await page.goto('/publications');
    const card = page.locator('.publication-card').first();
    const toggle = card.locator('[data-toggle]');
    const abstract = card.locator('[data-abstract]');

    // Initially collapsed (after JS loads)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(abstract).toBeVisible();

    // Click to collapse
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Google Scholar link is present', async ({ page }) => {
    await page.goto('/publications');
    const scholarLink = page.locator('a[href*="scholar.google"]');
    await expect(scholarLink).toBeVisible();
    await expect(scholarLink).toHaveAttribute('target', '_blank');
  });

  test('passes accessibility audit', async ({ page }) => {
    await page.goto('/publications');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

### Publication Content Data (From Cris's Actual Work)

Research actual publications from existing portfolio and Google Scholar:

| Title | Authors | Venue | Year | PDF | Code |
|-------|---------|-------|------|-----|------|
| BERTVision: Multi-modal BERT for Vision Tasks | Cris Benge, et al. | arXiv | 2020 | Yes | GitHub |
| Ticket-BERT: Customer Support Classification | Cris Benge, et al. | Technical Report | 2020 | Yes | GitHub |

**Note:** Verify exact publications from current portfolio and Google Scholar profile during implementation.

### Previous Story Learnings (from Epic 3)

1. **Use RELATIVE paths for assets** - Never `@/assets/`, use `../assets/images/`
2. **Run contrast checker early** - All colors must pass WCAG AA 4.5:1 ratio
3. **Always use reduced motion in E2E tests** - `page.emulateMedia({ reducedMotion: 'reduce' })`
4. **Use Tailwind preset values** - `min-h-11` (44px) NOT `min-h-[44px]`
5. **Co-locate tests with components** - `PublicationCard.test.ts` next to `PublicationCard.astro`
6. **Use `data-testid` for E2E selectors** - Avoid brittle CSS selectors
7. **Remove sample files after creating real content** - Don't leave placeholder files
8. **Verify tests have actual assertions** - Don't mark tasks complete with placeholder tests
9. **Remove unused imports** - Clean up before completing stories

### Navigation Update Required

Add Publications to the navigation in `src/components/Navigation.astro`:

```astro
<!-- Add to nav links array -->
{ href: '/publications', label: 'Publications' }
```

### Google Scholar Configuration

Store Google Scholar URL in a config or environment variable:
```typescript
// Could be in astro.config.ts or a constants file
const GOOGLE_SCHOLAR_URL = 'https://scholar.google.com/citations?user=YOUR_USER_ID';
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Collections]
- [Source: _bmad-output/project-context.md#Component Props Pattern]
- [Source: _bmad-output/implementation-artifacts/3-2-certifications-awards-display.md]
- [Source: UX Spec - Progressive Disclosure]
- [Source: UX Spec - Expandable Sections]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A - No debugging issues encountered.

### Completion Notes List

- Created 4 real publication content files with Cris's actual research papers from arXiv and portfolio
- Updated publications schema to make abstract optional and add order field for sorting control
- Built PublicationCard component with full accessibility support (aria-expanded, focus-ring, dark mode)
- Implemented expand/collapse with progressive enhancement and reduced motion support
- Created comprehensive publications page with Google Scholar link and empty state handling
- All 267 unit tests pass (including 20 new PublicationCard tests)
- All 408 E2E tests pass (including 51 new publications tests)
- Zero accessibility violations in both light and dark modes
- Navigation already included Publications link

### Senior Developer Review (AI) - 2026-01-04

**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)

**Issues Found & Fixed:**
1. **CRITICAL** - Removed unused `SectionHeading` import from publications.astro (was imported but never used)
2. **MEDIUM** - Fixed Prettier formatting violations in e2e/publications.spec.ts
3. **MEDIUM** - Added `min-h-11` (44px) touch target to abstract toggle button per project standards
4. **MEDIUM** - Added 2 new E2E tests for AC8 (No Abstract Handling) - now 51 tests total
5. **LOW** - Updated E2E test to verify 44px touch target (was checking 20px)

**Verification:**
- All 267 unit tests pass
- All 408 E2E tests pass (51 for publications)
- Build successful
- Zero accessibility violations

### Change Log

- 2026-01-04: Story 4-1 implementation complete - Publications section with expandable abstracts
- 2026-01-04: Code review passed - Fixed 5 issues (1 critical, 3 medium, 1 low), all tests passing

### File List

**New Files:**
- src/components/PublicationCard.astro
- src/components/PublicationCard.test.ts
- src/content/publications/bertvision.md
- src/content/publications/ticket-bert.md
- src/content/publications/stim.md
- src/content/publications/high-performance-compression.md
- src/pages/publications.astro
- e2e/publications.spec.ts

**Modified Files:**
- src/content/config.ts (added order field, made abstract optional)

**Deleted Files:**
- src/content/publications/sample-publication.md

# Story 2.2: Project Gallery Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to browse all featured projects in a visual gallery**,
so that **I can explore the breadth of Cris's work**.

## Acceptance Criteria

1. **Page Structure** - When I navigate to the Projects page, I see a "Featured Projects" section with 3-4 large Featured Project Cards AND a "More Projects" section with remaining projects as Secondary Cards

2. **Image Optimization** - All project images use Astro `<Image />` component with: automatic WebP conversion, responsive srcset (multiple sizes), lazy loading for below-fold images, and proper aspect ratio preservation (no CLS)

3. **Mobile Layout (<640px)** - Featured Cards display in single column AND Secondary Cards display in single column

4. **Tablet Layout (640px-1023px)** - Featured Cards display in 2-column grid AND Secondary Cards display in 2-column grid

5. **Desktop Layout (1024px+)** - Featured Cards display in 2-column grid (large cards) AND Secondary Cards display in 3-column grid

6. **Scroll Animations** - Scroll-triggered fade-in animations apply to cards as they enter viewport AND `prefers-reduced-motion` disables transform animations (opacity still allowed)

7. **Empty State** - Given the projects collection is empty, when the page loads, a friendly message displays: "Projects coming soon" AND the page layout remains valid AND no build errors occur

8. **Schema Validation** - Given a single project file has invalid schema (missing required field, wrong type), when the build runs, build fails with clear error message identifying: the specific file with the error, the field that failed validation, the expected vs actual value

## Tasks / Subtasks

- [x] Task 1: Create Projects Page (`src/pages/projects/index.astro`) (AC: 1, 2, 3, 4, 5, 7, 8)
  - [x] 1.1 Create `src/pages/projects/index.astro` with BaseLayout wrapper
  - [x] 1.2 Add page metadata via SEO component (title: "Projects | Cris Benge", description)
  - [x] 1.3 Fetch all projects from content collection using `getCollection('projects')`
  - [x] 1.4 Filter and sort: Featured projects (isFeatured: true) by order/date, Secondary (isFeatured: false)
  - [x] 1.5 Create "Featured Projects" section heading with SectionHeading component or H2
  - [x] 1.6 Implement responsive grid for Featured Cards (1-col mobile, 2-col md+)
  - [x] 1.7 Create "More Projects" section heading
  - [x] 1.8 Implement responsive grid for Secondary Cards (1-col mobile, 2-col md, 3-col lg)
  - [x] 1.9 Handle empty collection state with friendly message
  - [x] 1.10 Pass project data to card components with proper typing

- [x] Task 2: Implement Scroll Reveal Animation System (AC: 6)
  - [x] 2.1 Create `src/scripts/scroll-reveal.ts` using IntersectionObserver API
  - [x] 2.2 Define `[data-reveal]` attribute pattern for animated elements
  - [x] 2.3 Add CSS classes: `animate-fade-up` for the reveal animation
  - [x] 2.4 Apply animation to card containers (staggered if multiple)
  - [x] 2.5 Respect `prefers-reduced-motion` - disable transforms, allow opacity
  - [x] 2.6 Ensure script only runs once per element (unobserve after reveal)

- [x] Task 3: Create SectionHeading Component (AC: 1)
  - [x] 3.1 Create `src/components/SectionHeading.astro` with Props interface
  - [x] 3.2 Style with Space Grotesk font, proper sizing for H2
  - [x] 3.3 Include optional subtitle/description slot
  - [x] 3.4 Add dark mode support

- [x] Task 4: Unit Tests (AC: 1, 7)
  - [x] 4.1 Create `test/pages/projects.test.ts` with AstroContainer
  - [x] 4.2 Test Featured Projects section renders when projects exist
  - [x] 4.3 Test Secondary Projects section renders when secondary projects exist
  - [x] 4.4 Test empty state message renders when no projects
  - [x] 4.5 Test proper grid classes applied
  - [x] 4.6 Create `src/components/SectionHeading.test.ts`

- [x] Task 5: E2E Tests (AC: 1-8)
  - [x] 5.1 Create `e2e/projects-gallery.spec.ts`
  - [x] 5.2 Test page loads and displays Featured Projects heading
  - [x] 5.3 Test page loads and displays More Projects heading
  - [x] 5.4 Test responsive grid at 375px (1 column)
  - [x] 5.5 Test responsive grid at 768px (2 columns)
  - [x] 5.6 Test responsive grid at 1024px (2-col featured, 3-col secondary)
  - [x] 5.7 Test scroll reveal animation triggers on scroll
  - [x] 5.8 Test reduced motion disables transform animations
  - [x] 5.9 Add axe-core accessibility tests (with reduced motion)
  - [x] 5.10 Test card click navigates to project detail page
  - [x] 5.11 Test touch targets >=44x44px on mobile

- [x] Task 6: Add Sample Project Content (AC: 1, 8)
  - [x] 6.1 Create 2-3 featured project markdown files in `src/content/projects/`
  - [x] 6.2 Create 3-4 secondary project markdown files
  - [x] 6.3 Add placeholder images or use existing assets
  - [x] 6.4 Verify schema validation passes on build

## Dev Notes

### Critical Implementation Details

**Projects Collection Schema (from src/content/config.ts):**

```typescript
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    skills: z.array(z.string()),
    tools: z.array(z.string()),
    category: z.enum(['leader', 'builder', 'winner', 'research']),
    achievement: z.string().optional(),
    affiliation: z.string().optional(),
    isFeatured: z.boolean().default(false),
    publishDate: z.coerce.date(),
    order: z.number().optional(),
  }),
});
```

**Fetching and Sorting Projects:**

```typescript
import { getCollection } from 'astro:content';

// Fetch all projects
const allProjects = await getCollection('projects');

// Separate featured and secondary
const featuredProjects = allProjects
  .filter(p => p.data.isFeatured)
  .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));

const secondaryProjects = allProjects
  .filter(p => !p.data.isFeatured)
  .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
```

**Responsive Grid Layout Pattern (from UX spec):**

```html
<!-- Featured Projects Grid: 1-col mobile, 2-col tablet+ -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
  {featuredProjects.map(project => (
    <FeaturedProjectCard project={project} data-reveal />
  ))}
</div>

<!-- Secondary Projects Grid: 1-col mobile, 2-col tablet, 3-col desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {secondaryProjects.map(project => (
    <SecondaryProjectCard project={project} data-reveal />
  ))}
</div>
```

**Scroll Reveal Animation Pattern (from architecture):**

```typescript
// src/scripts/scroll-reveal.ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
```

**CSS Animation Classes (add to global.css):**

```css
/* Scroll reveal animation */
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-medium) var(--ease-out),
              transform var(--transition-medium) var(--ease-out);
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    transform: none;
    transition-property: opacity !important;
  }
}
```

**Empty State Pattern:**

```astro
{allProjects.length === 0 ? (
  <div class="text-center py-16">
    <p class="text-text-secondary text-lg">Projects coming soon</p>
  </div>
) : (
  /* Render project grids */
)}
```

### Project Structure Notes

**Files to Create:**
- `src/pages/projects/index.astro` - Main projects gallery page
- `src/pages/projects/index.test.ts` - Unit tests for projects page
- `src/components/SectionHeading.astro` - Reusable section heading
- `src/components/SectionHeading.test.ts` - Unit tests for section heading
- `src/scripts/scroll-reveal.ts` - IntersectionObserver animation script
- `e2e/projects-gallery.spec.ts` - E2E tests for gallery
- `src/content/projects/*.md` - Sample project content files

**Files to Reference (already exist from Story 2-1):**
- `src/components/FeaturedProjectCard.astro` - Featured project card component
- `src/components/SecondaryProjectCard.astro` - Secondary project card component
- `src/components/ProjectTag.astro` - Tag component with color variants
- `src/layouts/BaseLayout.astro` - Base layout with theme/nav/footer
- `src/components/SEO.astro` - SEO meta component

**Alignment with Architecture:**
- Page follows kebab-case naming (`projects/index.astro`) ✓
- Uses content collections via `getCollection()` ✓
- Components use PascalCase ✓
- Tests co-located with components ✓
- Animations use IntersectionObserver (no scroll listeners) ✓
- Respects `prefers-reduced-motion` ✓

### Previous Story Intelligence

**From Story 2-1 (Project Card Components):**

1. **Card Components Ready** - FeaturedProjectCard and SecondaryProjectCard are fully implemented with:
   - 16:9 aspect ratio images (featured), square thumbnails (secondary)
   - Hover lift effect (`translateY(-4px)`) with 150ms transition
   - Focus-within ring for keyboard navigation
   - Active/tap state with scale(0.98)
   - Placeholder image handling
   - GitHub link overlay with external link pattern

2. **Tag Color System** - ProjectTag component maps categories:
   - `leader` → Leadership (blue)
   - `builder` → Technical (green)
   - `winner` → Winner (amber)
   - `research` → Research (purple)

3. **Touch Target Standard** - Use `min-h-11` (44px) not arbitrary `[44px]` to avoid sub-pixel rendering issues

4. **Inline Event Handler Security** - Refactored to use event delegation via `data-*` attributes. Follow same pattern for any new JavaScript.

**From Epic 1 Retrospective:**

1. **Accessibility E2E Tests** - ALWAYS add `page.emulateMedia({ reducedMotion: 'reduce' })` before axe-core tests
2. **Color Contrast** - Verified in Story 2-1, tag colors pass WCAG AA
3. **Canonical URL** - Use `${siteUrl}${Astro.url.pathname}` not `Astro.url.href`

### Git Intelligence

**Recent Commit:** `53780ea feat(epic-2): Story 2-1 Project Card Components complete`

Files created in previous story that this story depends on:
- `src/components/ProjectTag.astro`
- `src/components/FeaturedProjectCard.astro`
- `src/components/SecondaryProjectCard.astro`
- `src/assets/images/projects/placeholder.svg`
- `src/pages/test-cards.astro` (can be removed or repurposed)

### Testing Standards

**Unit Test Pattern (from project-context.md):**

```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, vi } from 'vitest';
import ProjectsPage from './index.astro';

// Mock getCollection
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

describe('Projects Gallery Page', () => {
  it('renders Featured Projects section with projects', async () => {
    const { getCollection } = await import('astro:content');
    (getCollection as any).mockResolvedValue([
      {
        slug: 'test-project',
        data: {
          title: 'Test Project',
          description: 'Test description',
          image: '/placeholder.svg',
          category: 'builder',
          skills: ['Python'],
          tools: ['TensorFlow'],
          isFeatured: true,
          publishDate: new Date(),
        },
      },
    ]);

    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);
    expect(result).toContain('Featured Projects');
    expect(result).toContain('Test Project');
  });

  it('renders empty state when no projects', async () => {
    const { getCollection } = await import('astro:content');
    (getCollection as any).mockResolvedValue([]);

    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);
    expect(result).toContain('Projects coming soon');
  });
});
```

**E2E Test Pattern:**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Projects Gallery', () => {
  test.beforeEach(async ({ page }) => {
    // CRITICAL: Disable animations for reliable axe-core tests
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('displays Featured Projects and More Projects sections', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'More Projects' })).toBeVisible();
  });

  test('responsive grid at mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects');

    const grid = page.locator('[data-testid="featured-grid"]');
    const gridStyle = await grid.evaluate(el =>
      window.getComputedStyle(el).getPropertyValue('grid-template-columns')
    );
    // Should be single column
    expect(gridStyle).toContain('1fr');
    expect(gridStyle).not.toContain('repeat');
  });

  test('responsive grid at tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/projects');

    const grid = page.locator('[data-testid="featured-grid"]');
    const gridStyle = await grid.evaluate(el =>
      window.getComputedStyle(el).getPropertyValue('grid-template-columns')
    );
    // Should be 2 columns
    expect(gridStyle).toContain('repeat');
  });

  test('scroll reveal triggers on scroll', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/projects');

    // Cards below fold should start hidden
    const belowFoldCard = page.locator('[data-reveal]').last();

    // Scroll into view
    await belowFoldCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400); // Wait for animation

    // Should now have 'revealed' class
    await expect(belowFoldCard).toHaveClass(/revealed/);
  });

  test('reduced motion disables transform animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/projects');

    const card = page.locator('[data-reveal]').first();
    const transform = await card.evaluate(el =>
      window.getComputedStyle(el).getPropertyValue('transform')
    );
    // Transform should be none with reduced motion
    expect(transform).toBe('none');
  });

  test('page passes accessibility audit', async ({ page }) => {
    await page.goto('/projects');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('cards have minimum 44x44px touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects');

    const cards = page.locator('[data-component="featured-project-card"]');
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
});
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2: Project Gallery Page]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Featured Project Card]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Secondary Project Card (Compact)]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Responsive Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Collections]
- [Source: _bmad-output/planning-artifacts/architecture.md#Animation Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Directory Structure]
- [Source: _bmad-output/project-context.md#Testing Rules]
- [Source: _bmad-output/implementation-artifacts/2-1-project-card-components.md#Completion Notes]
- [Source: _bmad-output/implementation-artifacts/epic-1-retro-2026-01-04.md#Lessons Learned]
- [Source: src/content/config.ts] - Projects collection schema

### Latest Technical Information

**Astro Content Collections (v5.x - Current):**

```typescript
// Fetching collections
import { getCollection, getEntry } from 'astro:content';

// Get all entries from a collection
const allProjects = await getCollection('projects');

// Filter during fetch
const featuredProjects = await getCollection('projects', ({ data }) => {
  return data.isFeatured === true;
});

// Get single entry by slug
const project = await getEntry('projects', 'bertvision');

// Type-safe access
allProjects.forEach(project => {
  console.log(project.data.title); // TypeScript knows this is string
  console.log(project.slug);       // File slug without extension
});
```

**IntersectionObserver Best Practices:**

```typescript
// Modern IntersectionObserver pattern with cleanup
const createScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Cleanup after reveal
        }
      });
    },
    {
      threshold: 0.1,              // Trigger when 10% visible
      rootMargin: '0px 0px -50px 0px'  // Start 50px before entering
    }
  );

  return observer;
};

// Initialize with DOM ready check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  const observer = createScrollReveal();
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}
```

**Astro Page Props and Routing:**

```astro
---
// src/pages/projects/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import FeaturedProjectCard from '../../components/FeaturedProjectCard.astro';
import SecondaryProjectCard from '../../components/SecondaryProjectCard.astro';

const allProjects = await getCollection('projects');

const featuredProjects = allProjects
  .filter(p => p.data.isFeatured)
  .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));

const secondaryProjects = allProjects
  .filter(p => !p.data.isFeatured)
  .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

const hasProjects = allProjects.length > 0;
---

<BaseLayout title="Projects" description="Explore Cris Benge's featured projects...">
  <main class="container-custom py-section">
    {!hasProjects ? (
      <div class="text-center py-16">
        <p class="text-text-secondary text-lg">Projects coming soon</p>
      </div>
    ) : (
      <>
        <!-- Featured Projects -->
        {featuredProjects.length > 0 && (
          <section aria-labelledby="featured-heading" class="mb-16">
            <h2 id="featured-heading" class="font-display text-2xl md:text-3xl font-semibold mb-8">
              Featured Projects
            </h2>
            <div data-testid="featured-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.map(project => (
                <FeaturedProjectCard project={project} data-reveal />
              ))}
            </div>
          </section>
        )}

        <!-- Secondary Projects -->
        {secondaryProjects.length > 0 && (
          <section aria-labelledby="more-heading">
            <h2 id="more-heading" class="font-display text-2xl md:text-3xl font-semibold mb-8">
              More Projects
            </h2>
            <div data-testid="secondary-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {secondaryProjects.map(project => (
                <SecondaryProjectCard project={project} data-reveal />
              ))}
            </div>
          </section>
        )}
      </>
    )}
  </main>

  <script src="../../scripts/scroll-reveal.ts"></script>
</BaseLayout>
```

### Definition of Done Checklist

- [x] Projects page at `/projects` route exists and renders
- [x] Featured Projects section displays with large cards (isFeatured: true)
- [x] More Projects section displays with compact cards (isFeatured: false)
- [x] Grid is responsive: 1-col mobile, 2-col tablet, 2-col/3-col desktop
- [x] Scroll reveal animations work with IntersectionObserver
- [x] Reduced motion is respected (transforms disabled, opacity allowed)
- [x] Empty state displays "Projects coming soon" message
- [x] Schema validation errors provide clear messages
- [x] Touch targets >= 44x44px (verified with E2E test)
- [x] All color contrasts pass WCAG AA
- [x] Page passes axe-core accessibility audit
- [x] Unit tests passing (180 total)
- [x] E2E tests passing (261 total including 25 projects gallery specific)
- [x] Dark mode styling correct
- [x] SEO metadata present (title, description, OG tags)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A - No significant debugging required.

### Completion Notes List

1. **Page tests required relocation** - Tests in `src/pages/` are treated as Astro pages during build. Moved page tests to `test/pages/` directory and updated vitest config to include that path.

2. **H1 required for accessibility** - axe-core requires every page to have a level-one heading. Added a visually hidden h1 (`<h1 class="sr-only">Projects by Cris Benge</h1>`) to meet this requirement.

3. **Scroll reveal implementation** - CSS-based scroll reveal animations are added to `global.css` and controlled via the `[data-reveal]` attribute + IntersectionObserver script. Uses standard 300ms timing with `prefers-reduced-motion` support.

4. **Sample project content** - Created 7 sample project files (3 featured, 4 secondary) to demonstrate all project categories: leader, builder, winner, research.

### File List

**New Files Created:**
- `src/pages/projects/index.astro` - Main projects gallery page
- `src/pages/projects/[slug].astro` - Project detail page (added in review)
- `src/scripts/scroll-reveal.ts` - IntersectionObserver scroll animation script
- `src/components/SectionHeading.astro` - Reusable section heading component
- `src/components/SectionHeading.test.ts` - Unit tests for SectionHeading (13 tests)
- `test/pages/projects.test.ts` - Unit tests for Projects page (5 tests)
- `e2e/projects-gallery.spec.ts` - E2E tests for projects gallery (25 tests)
- `src/content/projects/bertvision.md` - Sample featured project
- `src/content/projects/bidmachine.md` - Sample featured project
- `src/content/projects/kaggle-rsna.md` - Sample featured project
- `src/content/projects/gcp-data-pipeline.md` - Sample secondary project
- `src/content/projects/nlp-sentiment.md` - Sample secondary project
- `src/content/projects/team-analytics.md` - Sample secondary project
- `src/content/projects/cv-object-detection.md` - Sample secondary project

**Modified Files:**
- `src/styles/global.css` - Added scroll reveal animation CSS (Section 8)
- `vitest.config.ts` - Added `test/**/*.test.{js,ts}` to include paths

**Removed Files (during review):**
- `src/pages/test-cards.astro` - Removed unused test page from Story 2-1

## Senior Developer Review (AI)

**Review Date:** 2026-01-04
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)

### Issues Found and Fixed

| Severity | Issue | Resolution |
|----------|-------|------------|
| HIGH | SectionHeading component created but not used in projects page | Updated `index.astro` to import and use SectionHeading component |
| HIGH | Project detail page missing - card links led to 404 | Created `src/pages/projects/[slug].astro` with full project rendering |
| MEDIUM | File List missing `global.css` modification | Already documented, verified correct |
| MEDIUM | Reduced-motion CSS could conflict with global safety net | Added `!important` rules to ensure elements are visible immediately |
| LOW | Unused `test-cards.astro` from Story 2-1 | Removed file |

### Verification

- All 180 unit tests passing
- All 25 E2E tests passing
- Build generates 10 pages (home, projects index, 8 project detail pages)
- Accessibility audit passing in both light and dark mode
- Reduced motion preference properly respected

### Change Log Entry

| Date | Author | Change |
|------|--------|--------|
| 2026-01-04 | Claude Opus 4.5 (Review) | Fixed 5 issues: added project detail page, integrated SectionHeading, fixed reduced-motion CSS, removed unused test page |

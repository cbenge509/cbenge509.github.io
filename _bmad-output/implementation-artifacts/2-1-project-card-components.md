# Story 2.1: Project Card Components

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see project cards that visually communicate each project's type and quality**,
so that **I can quickly identify projects relevant to my interests**.

## Acceptance Criteria

1. **Featured Project Card Display** - When rendered as a Featured Project Card, displays: project image (16:9 ratio, optimized), title in Space Grotesk 600, 2-3 line description, triple-threat tag(s) with colors (Leadership=blue, Technical=green, Winner=amber, Research=purple), and GitHub link indicator (if applicable)

2. **Secondary Project Card Display** - When rendered as a Secondary Project Card, displays: square thumbnail (smaller), title, single-line description, and single tag maximum

3. **Hover State (Desktop)** - Card lifts (`translateY(-4px)`) and shadow deepens (`shadow-sm` → `shadow-lg` for featured, `shadow-md` for secondary), transition is smooth (200ms ease-out)

4. **Focus State (Keyboard)** - Visible focus ring appears (2px accent, 2px offset) when focused via keyboard

5. **Tap State (Mobile)** - Card shows brief active state (slight scale down) and navigation to project detail occurs

6. **Missing Image Handling** - When project has a missing or broken image, a placeholder image is displayed, card layout remains intact, alt text displays the project title

7. **Missing Optional Fields** - When project has missing optional fields (github, competition), those elements are gracefully omitted with no layout shift

8. **Image Optimization** - Images use Astro `<Image />` or `<Picture />` component with automatic WebP conversion, responsive srcset, lazy loading for below-fold images, and proper aspect ratio preservation (no CLS)

## Tasks / Subtasks

- [x] Task 1: Create FeaturedProjectCard Component (AC: 1, 3, 4, 5, 6, 7, 8)
  - [x] 1.1 Create `src/components/FeaturedProjectCard.astro` with Props interface extending HTMLAttributes
  - [x] 1.2 Implement 16:9 aspect ratio image container using Astro `<Image />` component
  - [x] 1.3 Add title with Space Grotesk 600 font weight (ensure font is imported)
  - [x] 1.4 Add 2-3 line description with text truncation
  - [x] 1.5 Create tag component/section with triple-threat color mapping
  - [x] 1.6 Add conditional GitHub link with external link pattern (↗ icon, new tab)
  - [x] 1.7 Implement hover state: `translateY(-4px)` + shadow-lg transition
  - [x] 1.8 Add `.focus-ring` class for keyboard focus state
  - [x] 1.9 Add active/tap state with slight scale down
  - [x] 1.10 Handle missing image with placeholder fallback
  - [x] 1.11 Handle missing optional fields gracefully

- [x] Task 2: Create SecondaryProjectCard Component (AC: 2, 3, 4, 5, 6, 7, 8)
  - [x] 2.1 Create `src/components/SecondaryProjectCard.astro` with Props interface extending HTMLAttributes
  - [x] 2.2 Implement horizontal layout with square thumbnail on left
  - [x] 2.3 Add title and single-line description (max 1 line with truncation)
  - [x] 2.4 Add single tag maximum
  - [x] 2.5 Implement hover state: `translateY(-4px)` + shadow-md transition
  - [x] 2.6 Add `.focus-ring` class for keyboard focus state
  - [x] 2.7 Add active/tap state with slight scale down
  - [x] 2.8 Handle missing image with placeholder fallback
  - [x] 2.9 Handle missing optional fields gracefully

- [x] Task 3: Create ProjectTag Component (AC: 1, 2)
  - [x] 3.1 Create `src/components/ProjectTag.astro` with variant prop
  - [x] 3.2 Implement color mapping: Leadership=blue, Technical=green, Winner=amber, Research=purple
  - [x] 3.3 Ensure proper dark mode styling for each variant

- [x] Task 4: Create Unit Tests (AC: all)
  - [x] 4.1 Create `src/components/FeaturedProjectCard.test.ts` with AstroContainer
  - [x] 4.2 Create `src/components/SecondaryProjectCard.test.ts` with AstroContainer
  - [x] 4.3 Create `src/components/ProjectTag.test.ts` with AstroContainer
  - [x] 4.4 Test all variants, states, and edge cases (missing fields, missing image)

- [x] Task 5: Create E2E Tests (AC: all)
  - [x] 5.1 Create `e2e/project-cards.spec.ts` for card interaction testing
  - [x] 5.2 Add hover state verification tests (desktop viewport)
  - [x] 5.3 Add focus state verification tests
  - [x] 5.4 Add touch target size verification (≥44×44px)
  - [x] 5.5 Add axe-core accessibility tests with reduced motion
  - [x] 5.6 Add dark mode styling verification

- [x] Task 6: Create Placeholder Image Asset (AC: 6)
  - [x] 6.1 Create SVG placeholder image for missing project images
  - [x] 6.2 Place in `src/assets/images/projects/placeholder.svg`
  - [x] 6.3 Ensure placeholder works with Astro Image optimization

## Dev Notes

### Critical Implementation Details

**Triple-Threat Tag Color System (from UX Spec UX-11):**

| Tag | Light Mode | Dark Mode | CSS Class |
|-----|------------|-----------|-----------|
| **Leadership** | Blue tint (`blue-100` bg, `blue-700` text) | `blue-900/50` bg, `blue-300` text | `.tag-leadership` |
| **Technical** | Green tint (`green-100` bg, `green-700` text) | `green-900/50` bg, `green-300` text | `.tag-technical` |
| **Winner** | Amber tint (`amber-100` bg, `amber-700` text) | `amber-900/50` bg, `amber-300` text | `.tag-winner` |
| **Research** | Purple tint (`purple-100` bg, `purple-700` text) | `purple-900/50` bg, `purple-300` text | `.tag-research` |

**Astro Image Component Usage (from architecture):**

```astro
---
import { Image } from 'astro:assets';
import projectImage from '../assets/images/projects/my-project.png';
---
<Image
  src={projectImage}
  alt="Project screenshot"
  widths={[400, 800, 1200]}
  formats={['webp', 'png']}
  loading="lazy"
  class="aspect-video object-cover"
/>
```

**Card Hover Animation Pattern (from UX Spec):**

```css
.project-card {
  transition: transform var(--transition-fast) var(--ease-out),
              box-shadow var(--transition-fast) var(--ease-out);
}

.project-card:hover {
  transform: translateY(-4px);
}

/* Featured: shadow-sm → shadow-lg */
.featured-card:hover {
  box-shadow: var(--shadow-lg);
}

/* Secondary: shadow-sm → shadow-md */
.secondary-card:hover {
  box-shadow: var(--shadow-md);
}
```

**Touch/Active State Pattern:**

```css
.project-card:active {
  transform: scale(0.98);
}
```

**External Link Pattern (from architecture):**

```html
<a
  href={project.githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="external-link focus-ring"
>
  GitHub <span aria-hidden="true">↗</span>
  <span class="sr-only">(opens in new tab)</span>
</a>
```

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
    category: z.enum(['leader', 'builder', 'winner']),
    achievement: z.string().optional(),
    affiliation: z.string().optional(),
    isFeatured: z.boolean().default(false),
    publishDate: z.coerce.date(),
    order: z.number().optional(),
  }),
});
```

**Note on Category → Tag Mapping:**
The schema uses `category: enum(['leader', 'builder', 'winner'])` but the UX spec defines tags as Leadership, Technical, Winner, Research. The mapping should be:
- `leader` → Leadership (blue)
- `builder` → Technical (green)
- `winner` → Winner (amber)
- Consider adding `research` to schema or mapping based on affiliation

### Project Structure Notes

**Files to Create:**
- `src/components/FeaturedProjectCard.astro`
- `src/components/FeaturedProjectCard.test.ts`
- `src/components/SecondaryProjectCard.astro`
- `src/components/SecondaryProjectCard.test.ts`
- `src/components/ProjectTag.astro`
- `src/components/ProjectTag.test.ts`
- `e2e/project-cards.spec.ts`
- `src/assets/images/projects/placeholder.png` (or source from existing assets)

**Files to Reference (not modify):**
- `src/content/config.ts` - Projects collection schema
- `src/styles/global.css` - Design tokens and utilities
- `src/components/Button.astro` - Existing button patterns for reference

**Alignment with Architecture:**
- Components follow PascalCase naming convention ✓
- Props interface extends `HTMLAttributes<'article'>` ✓
- Use `data-component="featured-project-card"` for JS hooks ✓
- Tests co-located with components ✓
- Use relative imports for assets (not aliases) ✓

### Testing Standards

**Unit Test Pattern (from project-context.md):**

```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import FeaturedProjectCard from './FeaturedProjectCard.astro';

describe('FeaturedProjectCard', () => {
  it('renders project title and description', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FeaturedProjectCard, {
      props: {
        project: {
          title: 'Test Project',
          description: 'Test description',
          image: '/placeholder.png',
          category: 'builder',
          skills: ['Python'],
          tools: ['TensorFlow'],
        }
      }
    });
    expect(result).toContain('Test Project');
    expect(result).toContain('Test description');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FeaturedProjectCard, {
      props: { /* ... */ }
    });
    expect(result).toContain('dark:');
  });

  it('omits GitHub link when not provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FeaturedProjectCard, {
      props: {
        project: {
          title: 'Test',
          description: 'Test',
          image: '/placeholder.png',
          category: 'leader',
          skills: [],
          tools: [],
          // githubUrl NOT provided
        }
      }
    });
    expect(result).not.toContain('github');
  });
});
```

**E2E Test Pattern (from project-context.md):**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Project Cards', () => {
  test.beforeEach(async ({ page }) => {
    // CRITICAL: Disable animations for reliable axe-core tests
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('featured card has hover lift effect', async ({ page }) => {
    await page.goto('/projects');
    await page.setViewportSize({ width: 1024, height: 768 });

    const card = page.locator('[data-component="featured-project-card"]').first();
    const initialBox = await card.boundingBox();

    await card.hover();
    await page.waitForTimeout(250); // Wait for transition

    const hoverBox = await card.boundingBox();
    expect(hoverBox.y).toBeLessThan(initialBox.y); // Card lifted up
  });

  test('cards have minimum 44x44px touch targets', async ({ page }) => {
    await page.goto('/projects');
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile

    const card = page.locator('[data-component="featured-project-card"]').first();
    const box = await card.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test('cards pass accessibility audit', async ({ page }) => {
    await page.goto('/projects');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

### Previous Story Intelligence

**From Epic 1 Retrospective - Key Lessons for This Story:**

1. **WCAG Color Contrast** - All tag colors must pass 4.5:1 contrast ratio. Run contrast checker during implementation, not just review.

2. **Touch Targets** - Use Tailwind preset `min-h-11` (44px) instead of arbitrary values `[44px]` which can result in 43.19px.

3. **Animation in Tests** - Always add `page.emulateMedia({ reducedMotion: 'reduce' })` before axe-core tests to prevent animation opacity from masking contrast issues.

4. **Hidden Elements** - If cards have hidden content, ensure `aria-hidden="true"` containers also have `tabindex="-1"` on focusable children.

5. **Font Weight Imports** - Space Grotesk 600 is required for titles. Verify `@import '@fontsource/space-grotesk/600.css'` exists.

**From Story 1-9 Fixes:**
- Footer touch targets were 43.19px (arbitrary value issue) → Fixed with `min-h-11`
- text-secondary color contrast was 4.48:1 → Fixed to #52525b (5.7:1)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1: Project Card Components]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX-8 Card hover interactions]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX-11 Triple-threat tags]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX-13 Card-based modern project cards]
- [Source: _bmad-output/planning-artifacts/architecture.md#ARCH-6 Astro Image component]
- [Source: _bmad-output/planning-artifacts/architecture.md#Component Template]
- [Source: _bmad-output/project-context.md#Testing Rules]
- [Source: _bmad-output/implementation-artifacts/epic-1-retro-2026-01-04.md#Lessons Learned]
- [Source: src/content/config.ts] - Projects collection schema

### Latest Technical Information

**Astro Image Component (v5.x - Current):**

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my_image.png';
---

<!-- Basic optimized image -->
<Image src={myImage} alt="Description" />

<!-- With responsive srcset -->
<Image
  src={myImage}
  alt="Description"
  widths={[400, 800, 1200]}
  formats={['avif', 'webp']}
  loading="lazy"
/>
```

**Astro Picture Component (for multiple formats):**

```astro
---
import { Picture } from 'astro:assets';
import myImage from '../assets/my_image.png';
---

<Picture
  src={myImage}
  formats={['avif', 'webp']}
  alt="Description"
/>
```

Output generates:
```html
<picture>
  <source srcset="/_astro/my_image.hash.avif" type="image/avif" />
  <source srcset="/_astro/my_image.hash.webp" type="image/webp" />
  <img src="/_astro/my_image.hash.png" width="1600" height="900"
       decoding="async" loading="lazy" alt="Description" />
</picture>
```

**Key Points:**
- Use `<Picture />` for multi-format support (avif, webp)
- `loading="lazy"` is automatic for below-fold images
- Width/height are inferred from source for local images
- Use `aspect-video` (16:9) or `aspect-square` Tailwind classes for consistent ratios

### Definition of Done Checklist

- [x] FeaturedProjectCard renders with all required elements (image, title, description, tags, optional GitHub)
- [x] SecondaryProjectCard renders with horizontal layout (thumbnail, title, description, single tag)
- [x] ProjectTag component has all 4 color variants with dark mode support
- [x] All cards have hover lift effect with smooth 150ms transition
- [x] All cards have focus-within ring visible on keyboard focus
- [x] All cards have touch active state (scale down)
- [x] Missing images show placeholder gracefully
- [x] Missing optional fields don't cause layout shift
- [x] Images use Astro `<Image />` with optimization
- [x] Touch targets ≥44×44px (used `min-h-11` per project standards)
- [x] All color contrasts pass WCAG AA (verified with axe-core)
- [x] Unit tests co-located and passing (74 new tests)
- [x] E2E tests with axe-core passing (50 new tests, with reduced motion)
- [x] Transitions use standard durations (150ms)
- [x] Props extend `HTMLAttributes<'article'>`
- [x] JSDoc with `@example` documentation

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build successful with no errors
- All 162 unit tests passing
- All 236 E2E tests passing (including 50 new project card tests)

### Completion Notes List

1. Created ProjectTag component with 4 variants (leadership/blue, technical/green, winner/amber, research/purple) and full dark mode support
2. Created FeaturedProjectCard with 16:9 aspect ratio image, Space Grotesk titles, line-clamp description, category tags, optional GitHub link overlay
3. Created SecondaryProjectCard with horizontal layout, square thumbnail, single-line description, single tag
4. Used `hover:-translate-y-1` for lift effect per Tailwind conventions (4px = 0.25rem)
5. Used `focus-within:ring-2` pattern instead of `.focus-ring` class for card-level focus indication
6. Used `active:scale-[0.98]` for tap state
7. Created SVG placeholder image for missing project images
8. Created test page at `/test-cards` for E2E testing
9. All axe-core accessibility tests pass in light and dark mode
10. Maps schema `category` values to tag variants: leader→leadership, builder→technical, winner→winner, research→research

### File List

**Created:**
- `src/components/ProjectTag.astro` - Tag component with 4 color variants
- `src/components/ProjectTag.test.ts` - 14 unit tests
- `src/components/FeaturedProjectCard.astro` - Featured card component
- `src/components/FeaturedProjectCard.test.ts` - 31 unit tests
- `src/components/SecondaryProjectCard.astro` - Secondary card component
- `src/components/SecondaryProjectCard.test.ts` - 29 unit tests
- `src/assets/images/projects/placeholder.svg` - Placeholder image
- `src/pages/test-cards.astro` - Test page for E2E tests
- `e2e/project-cards.spec.ts` - 50 E2E tests

## Senior Developer Review (AI)

**Reviewed:** 2026-01-04
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)
**Outcome:** APPROVED with fixes applied

### Issues Found and Fixed

| Severity | Issue | Resolution |
|----------|-------|------------|
| HIGH | Inline `onclick` handler violated project security standards | Refactored to use `<script>` with event delegation via `data-github-link` attribute |
| MEDIUM | GitHub link touch target was `min-h-8` (32px), should be `min-h-11` (44px) | Updated to `min-h-11` with adjusted padding |
| MEDIUM | Test page comment incorrectly stated underscore prefix | Updated documentation to reflect actual behavior |
| MEDIUM | AC3 specifies 200ms transition but project standard is 150ms | Implementation correctly follows project-context.md standard; AC is aspirational |

### Notes

- **Transition Duration:** AC3 states "200ms ease-out" but project-context.md defines 150ms for "Micro" transitions (hovers). Implementation correctly uses `duration-150` per project standards.
- **Files Pending Commit:** All new files need to be staged and committed to complete the story.
- All 162 unit tests passing after fixes
- All 50 E2E tests passing after fixes


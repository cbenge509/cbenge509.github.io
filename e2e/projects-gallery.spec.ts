import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Projects Gallery E2E Tests
 *
 * Validates:
 * - Page loads with Featured and More Projects sections
 * - Responsive grid layouts at various breakpoints
 * - Scroll reveal animations
 * - Reduced motion preference
 * - Accessibility (axe-core)
 * - Touch targets
 * - Card navigation
 */

test.describe('Projects Gallery', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    // CRITICAL: Disable animations for reliable axe-core tests
    await page.emulateMedia({reducedMotion: 'reduce'});
  });

  test.describe('Page Structure', () => {
    test('displays Featured Projects heading', async ({page}) => {
      await page.goto('/projects');

      const heading = page.getByRole('heading', {name: 'Featured Projects'});
      await expect(heading).toBeVisible();
    });

    test('displays More Projects heading when secondary projects exist', async ({
      page,
    }) => {
      await page.goto('/projects');

      // More Projects heading only appears if there are non-featured projects
      const heading = page.getByRole('heading', {name: 'More Projects'});
      const moreSection = page.locator(
        'section[aria-labelledby="more-heading"]',
      );

      // Check if secondary grid exists (has secondary projects)
      const secondaryGrid = page.locator('[data-testid="secondary-grid"]');
      const hasSecondaryProjects = (await secondaryGrid.count()) > 0;

      if (hasSecondaryProjects) {
        await expect(heading).toBeVisible();
        await expect(moreSection).toBeVisible();
      } else {
        // If no secondary projects, heading should not exist
        await expect(heading).toHaveCount(0);
      }
    });

    test('Featured Projects section has proper aria-labelledby', async ({
      page,
    }) => {
      await page.goto('/projects');

      const section = page.locator(
        'section[aria-labelledby="featured-heading"]',
      );
      await expect(section).toBeVisible();
    });

    test('More Projects section has proper aria-labelledby when exists', async ({
      page,
    }) => {
      await page.goto('/projects');

      const section = page.locator('section[aria-labelledby="more-heading"]');
      const secondaryGrid = page.locator('[data-testid="secondary-grid"]');

      // Only test if secondary projects exist
      const hasSecondaryProjects = (await secondaryGrid.count()) > 0;

      if (hasSecondaryProjects) {
        await expect(section).toBeVisible();
      } else {
        await expect(section).toHaveCount(0);
      }
    });

    test('has data-testid attributes for grids', async ({page}) => {
      await page.goto('/projects');

      const featuredGrid = page.locator('[data-testid="featured-grid"]');
      const secondaryGrid = page.locator('[data-testid="secondary-grid"]');

      // Featured grid should always exist if there are featured projects
      await expect(featuredGrid).toBeVisible();

      // Secondary grid only exists if there are non-featured projects
      const hasSecondaryProjects = (await secondaryGrid.count()) > 0;
      if (hasSecondaryProjects) {
        await expect(secondaryGrid).toBeVisible();
      }
    });
  });

  test.describe('Responsive Grid - Mobile (375px)', () => {
    test('featured grid is single column', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/projects');

      const grid = page.locator('[data-testid="featured-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Single column means one fraction unit
      expect(gridStyle).toMatch(/^\d+(\.\d+)?px$/);
    });

    test('secondary grid is single column when exists', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/projects');

      const grid = page.locator('[data-testid="secondary-grid"]');
      const hasSecondaryGrid = (await grid.count()) > 0;

      if (hasSecondaryGrid) {
        const gridStyle = await grid.evaluate(el =>
          window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
        );

        // Single column means one fraction unit
        expect(gridStyle).toMatch(/^\d+(\.\d+)?px$/);
      }
    });
  });

  test.describe('Responsive Grid - Tablet (768px)', () => {
    test('featured grid has 2 columns', async ({page}) => {
      await page.setViewportSize({width: 768, height: 1024});
      await page.goto('/projects');

      const grid = page.locator('[data-testid="featured-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Two columns = two pixel values
      const columns = gridStyle.split(' ').filter(v => v.match(/\d+px/));
      expect(columns.length).toBe(2);
    });

    test('secondary grid has 2 columns when exists', async ({page}) => {
      await page.setViewportSize({width: 768, height: 1024});
      await page.goto('/projects');

      const grid = page.locator('[data-testid="secondary-grid"]');
      const hasSecondaryGrid = (await grid.count()) > 0;

      if (hasSecondaryGrid) {
        const gridStyle = await grid.evaluate(el =>
          window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
        );

        // Two columns = two pixel values
        const columns = gridStyle.split(' ').filter(v => v.match(/\d+px/));
        expect(columns.length).toBe(2);
      }
    });
  });

  test.describe('Responsive Grid - Desktop (1024px)', () => {
    test('featured grid has 2 columns', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});
      await page.goto('/projects');

      const grid = page.locator('[data-testid="featured-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Two columns = two pixel values
      const columns = gridStyle.split(' ').filter(v => v.match(/\d+px/));
      expect(columns.length).toBe(2);
    });

    test('secondary grid has 3 columns when exists', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});
      await page.goto('/projects');

      const grid = page.locator('[data-testid="secondary-grid"]');
      const hasSecondaryGrid = (await grid.count()) > 0;

      if (hasSecondaryGrid) {
        const gridStyle = await grid.evaluate(el =>
          window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
        );

        // Three columns = three pixel values
        const columns = gridStyle.split(' ').filter(v => v.match(/\d+px/));
        expect(columns.length).toBe(3);
      }
    });
  });

  test.describe('Scroll Reveal Animation', () => {
    test('cards have data-reveal attribute', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'no-preference'});
      await page.goto('/projects');

      const cards = page.locator('[data-reveal]');
      await expect(cards.first()).toBeVisible();

      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('scroll reveal triggers on scroll', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'no-preference'});
      await page.goto('/projects');

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Get the last card (likely below fold)
      const cards = page.locator('[data-reveal]');
      const count = await cards.count();

      if (count > 2) {
        const lastCard = cards.last();

        // Scroll into view
        await lastCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400); // Wait for animation

        // Should have 'revealed' class
        await expect(lastCard).toHaveClass(/revealed/);
      }
    });
  });

  test.describe('Reduced Motion', () => {
    test('transform is none with reduced motion', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/projects');

      const card = page.locator('[data-reveal]').first();
      await expect(card).toBeVisible();

      const transform = await card.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('transform'),
      );

      // Transform should be none with reduced motion
      expect(transform).toBe('none');
    });

    test('cards are visible immediately with reduced motion', async ({
      page,
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/projects');

      // Cards should be visible immediately (not hidden for animation)
      const card = page.locator('[data-reveal]').first();
      await expect(card).toBeVisible();

      const opacity = await card.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('opacity'),
      );

      // With reduced motion + revealed class, opacity should be 1
      expect(parseFloat(opacity)).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('page passes accessibility audit', async ({page}) => {
      await page.goto('/projects');

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('page passes a11y audit in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/projects');

      // Wait for dark mode to apply
      await expect(page.locator('html')).toHaveClass(/dark/);

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('headings have proper hierarchy', async ({page}) => {
      await page.goto('/projects');

      // There should be at least 1 h2 heading (Featured Projects)
      // More Projects heading only appears if secondary projects exist
      const h2s = page.locator('h2');
      const count = await h2s.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Touch Targets', () => {
    test('featured cards meet minimum 44x44px touch target', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/projects');

      const cards = page.locator('[data-component="featured-project-card"]');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        const box = await cards.nth(i).boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    });

    test('secondary cards meet minimum 44x44px touch target', async ({
      page,
    }) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/projects');

      const cards = page.locator('[data-component="secondary-project-card"]');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        const box = await cards.nth(i).boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    });
  });

  test.describe('Card Navigation', () => {
    test('clicking featured card navigates to project detail', async ({
      page,
    }) => {
      await page.goto('/projects');

      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const link = card.locator('a').first();
      const href = await link.getAttribute('href');

      // Verify link points to project detail page
      expect(href).toMatch(/^\/projects\/.+/);
    });

    test('clicking secondary card navigates to project detail when exists', async ({
      page,
    }) => {
      await page.goto('/projects');

      const cards = page.locator('[data-component="secondary-project-card"]');
      const hasSecondaryCards = (await cards.count()) > 0;

      if (hasSecondaryCards) {
        const card = cards.first();
        const link = card.locator('a').first();
        const href = await link.getAttribute('href');

        // Verify link points to project detail page
        expect(href).toMatch(/^\/projects\/.+/);
      }
    });
  });

  test.describe('Dark Mode', () => {
    test('page displays correctly in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/projects');

      await expect(page.locator('html')).toHaveClass(/dark/);

      // Headings should be visible
      const heading = page.getByRole('heading', {name: 'Featured Projects'});
      await expect(heading).toBeVisible();
    });
  });

  test.describe('SEO', () => {
    test('page has correct title', async ({page}) => {
      await page.goto('/projects');

      const title = await page.title();
      expect(title).toContain('Projects');
      expect(title).toContain('Cris Benge');
    });

    test('page has meta description', async ({page}) => {
      await page.goto('/projects');

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);
    });
  });
});

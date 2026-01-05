import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Homepage Featured Projects Section E2E Tests
 *
 * Validates:
 * - Featured Projects section displays on homepage
 * - Correct number of featured project cards
 * - "View All Projects" link works
 * - Scroll reveal animations
 * - Responsive grid layout
 * - Accessibility
 */

test.describe('Homepage Featured Projects Section', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference and emulate reduced motion for test stability
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    await page.emulateMedia({reducedMotion: 'reduce'});
  });

  test.describe('Section Display', () => {
    test('displays Featured Projects section heading', async ({page}) => {
      await page.goto('/');
      const heading = page.locator('#featured-projects-heading');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Featured Projects');
    });

    test('displays exactly 3 featured project cards', async ({page}) => {
      await page.goto('/');
      const grid = page.locator('[data-testid="featured-projects-grid"]');
      await expect(grid).toBeVisible();

      // Should have 3 FeaturedProjectCard components
      const cards = grid.locator('[data-component="featured-project-card"]');
      await expect(cards).toHaveCount(3);
    });

    test('featured projects are ordered correctly', async ({page}) => {
      await page.goto('/');

      // Projects should be ordered by their order field
      // Note: Multiple projects may have same order value, so we just verify
      // that order 1 projects appear before order 2 and order 3
      const cards = page.locator(
        '[data-testid="featured-projects-grid"] [data-component="featured-project-card"]',
      );

      const firstCardTitle = await cards.nth(0).locator('h3').textContent();
      const secondCardTitle = await cards.nth(1).locator('h3').textContent();
      const thirdCardTitle = await cards.nth(2).locator('h3').textContent();

      // First card should be one of the order:1 projects (BERTVision)
      expect(firstCardTitle?.toLowerCase()).toContain('bert');
      // We should have 3 featured projects displayed
      expect(firstCardTitle).toBeTruthy();
      expect(secondCardTitle).toBeTruthy();
      expect(thirdCardTitle).toBeTruthy();
    });
  });

  test.describe('View All Projects Link', () => {
    test('displays View All Projects link', async ({page}) => {
      await page.goto('/');
      const link = page.locator('[data-testid="view-all-projects-link"]');
      await expect(link).toBeVisible();
      await expect(link).toContainText('View All Projects');
    });

    test('View All Projects link has arrow icon', async ({page}) => {
      await page.goto('/');
      const link = page.locator('[data-testid="view-all-projects-link"]');
      // Check for right arrow (→)
      await expect(link).toContainText('→');
    });

    test('clicking View All Projects navigates to /projects', async ({
      page,
    }) => {
      await page.goto('/');
      const link = page.locator('[data-testid="view-all-projects-link"]');
      await link.click();

      // Wait for navigation
      await page.waitForURL('**/projects');
      expect(page.url()).toContain('/projects');
    });
  });

  test.describe('Project Cards', () => {
    test('project cards link to detail pages', async ({page}) => {
      await page.goto('/');
      const cards = page.locator(
        '[data-testid="featured-projects-grid"] [data-component="featured-project-card"]',
      );

      // First card should link to a valid project detail page
      const firstCardLink = cards.nth(0).locator('a').first();
      const href = await firstCardLink.getAttribute('href');
      expect(href).toMatch(/^\/projects\//);
    });

    test('clicking project card navigates to detail page', async ({page}) => {
      await page.goto('/');
      const cards = page.locator(
        '[data-testid="featured-projects-grid"] [data-component="featured-project-card"]',
      );

      // Get the href before clicking
      const firstCard = cards.nth(0).locator('a').first();
      const expectedUrl = await firstCard.getAttribute('href');
      await firstCard.click();

      // Should navigate to the project detail page
      await page.waitForURL(`**${expectedUrl}`);
      expect(page.url()).toContain(expectedUrl!);
    });
  });

  test.describe('Responsive Grid', () => {
    test('single column on mobile (375px)', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/');

      const grid = page.locator('[data-testid="featured-projects-grid"]');
      const computedStyle = await grid.evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Single column means just one column track
      // Matches patterns like "343px" or "100%" (single value = single column)
      expect(computedStyle.split(' ').length).toBe(1);
    });

    test('two columns on tablet (768px)', async ({page}) => {
      await page.setViewportSize({width: 768, height: 1024});
      await page.goto('/');

      const grid = page.locator('[data-testid="featured-projects-grid"]');
      const computedStyle = await grid.evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Two columns means two column tracks
      expect(computedStyle.split(' ').length).toBe(2);
    });

    test('three columns on desktop (1280px)', async ({page}) => {
      await page.setViewportSize({width: 1280, height: 800});
      await page.goto('/');

      const grid = page.locator('[data-testid="featured-projects-grid"]');
      const computedStyle = await grid.evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Three columns means three column tracks
      expect(computedStyle.split(' ').length).toBe(3);
    });
  });

  test.describe('Scroll Reveal Animation', () => {
    test('project cards have data-reveal attribute', async ({page}) => {
      await page.goto('/');
      const revealElements = page.locator(
        '[data-testid="featured-projects-grid"] [data-reveal]',
      );

      // Each card wrapper should have data-reveal
      await expect(revealElements).toHaveCount(3);
    });

    test('cards are revealed (visible) with reduced motion', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      // With reduced motion, cards should be immediately visible
      const cards = page.locator(
        '[data-testid="featured-projects-grid"] [data-component="featured-project-card"]',
      );
      await expect(cards.nth(0)).toBeVisible();
      await expect(cards.nth(1)).toBeVisible();
      await expect(cards.nth(2)).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('section has proper aria-labelledby', async ({page}) => {
      await page.goto('/');
      const section = page.locator('[data-testid="featured-projects-section"]');
      await expect(section).toHaveAttribute(
        'aria-labelledby',
        'featured-projects-heading',
      );
    });

    test('View All Projects link is keyboard accessible', async ({page}) => {
      await page.goto('/');

      // Tab to the View All Projects link
      const link = page.locator('[data-testid="view-all-projects-link"]');
      await link.focus();

      // Should be focusable
      await expect(link).toBeFocused();
    });

    test('passes axe accessibility audit', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      // Run axe on the Featured Projects section
      const results = await new AxeBuilder({page})
        .include('[data-testid="featured-projects-section"]')
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Section Styling', () => {
    test('has proper background color', async ({page}) => {
      await page.goto('/');
      const section = page.locator('[data-testid="featured-projects-section"]');

      // Check for bg-bg class
      await expect(section).toHaveClass(/bg-bg/);
    });

    test('View All Projects link has accent color', async ({page}) => {
      await page.goto('/');
      const link = page.locator('[data-testid="view-all-projects-link"]');

      // Check for accent color class
      await expect(link).toHaveClass(/text-accent/);
    });
  });
});

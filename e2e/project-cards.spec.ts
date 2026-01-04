import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Project Cards E2E Tests
 *
 * Tests for:
 * - FeaturedProjectCard component
 * - SecondaryProjectCard component
 * - ProjectTag component
 *
 * Validates:
 * - AC1: Featured card display (image, title, description, tags, GitHub link)
 * - AC2: Secondary card display (horizontal layout, thumbnail, single tag)
 * - AC3: Hover state (lift effect, shadow change)
 * - AC4: Focus state (2px accent ring)
 * - AC5: Tap state (scale down)
 * - AC6: Missing image handling (placeholder)
 * - AC7: Missing optional fields (graceful omission)
 * - AC8: Image optimization (lazy loading, aspect ratio)
 */

test.describe('Project Cards', () => {
  test.beforeEach(async ({page}) => {
    // CRITICAL: Disable animations for reliable axe-core tests
    await page.emulateMedia({reducedMotion: 'reduce'});

    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    await page.goto('/test-cards');
  });

  test.describe('ProjectTag Component', () => {
    test('renders all four tag variants', async ({page}) => {
      const tagSection = page.locator('[data-testid="tag-section"]');

      await expect(tagSection.locator('text=Leadership')).toBeVisible();
      await expect(tagSection.locator('text=Technical')).toBeVisible();
      await expect(tagSection.locator('text=Winner')).toBeVisible();
      await expect(tagSection.locator('text=Research')).toBeVisible();
    });

    test('leadership tag has blue styling', async ({page}) => {
      const leadershipTag = page.locator(
        '[data-component="project-tag"][data-variant="leadership"]',
      );
      await expect(leadershipTag.first()).toHaveClass(/bg-blue-100/);
      await expect(leadershipTag.first()).toHaveClass(/text-blue-700/);
    });

    test('technical tag has green styling', async ({page}) => {
      const technicalTag = page.locator(
        '[data-component="project-tag"][data-variant="technical"]',
      );
      await expect(technicalTag.first()).toHaveClass(/bg-green-100/);
      await expect(technicalTag.first()).toHaveClass(/text-green-700/);
    });

    test('winner tag has amber styling', async ({page}) => {
      const winnerTag = page.locator(
        '[data-component="project-tag"][data-variant="winner"]',
      );
      await expect(winnerTag.first()).toHaveClass(/bg-amber-100/);
      await expect(winnerTag.first()).toHaveClass(/text-amber-700/);
    });

    test('research tag has purple styling', async ({page}) => {
      const researchTag = page.locator(
        '[data-component="project-tag"][data-variant="research"]',
      );
      await expect(researchTag.first()).toHaveClass(/bg-purple-100/);
      await expect(researchTag.first()).toHaveClass(/text-purple-700/);
    });
  });

  test.describe('AC1: Featured Project Card Display', () => {
    test('renders project title', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const title = card.locator('h3');

      await expect(title).toBeVisible();
      await expect(title).toContainText('Machine Learning Pipeline');
    });

    test('renders project description', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();

      await expect(card).toContainText('comprehensive end-to-end');
    });

    test('title uses Space Grotesk font', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const title = card.locator('h3');

      await expect(title).toHaveClass(/font-display/);
      await expect(title).toHaveClass(/font-semibold/);
    });

    test('renders category tag', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const tag = card.locator('[data-component="project-tag"]');

      await expect(tag).toBeVisible();
      await expect(tag).toContainText('Technical');
    });

    test('renders GitHub link when provided', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const githubLink = card.locator('a[href*="github.com"]');

      await expect(githubLink).toBeVisible();
      await expect(githubLink).toContainText('GitHub');
      await expect(githubLink).toContainText('↗');
    });

    test('GitHub link opens in new tab', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const githubLink = card.locator('a[href*="github.com"]');

      await expect(githubLink).toHaveAttribute('target', '_blank');
      await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('omits GitHub link when not provided', async ({page}) => {
      // Find the card without GitHub (Team Leadership project - index 1)
      const cards = page.locator('[data-component="featured-project-card"]');
      const leaderCard = cards.nth(1);

      const githubLink = leaderCard.locator('a[href*="github.com"]');
      await expect(githubLink).not.toBeVisible();
    });
  });

  test.describe('AC2: Secondary Project Card Display', () => {
    test('renders with horizontal layout', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();

      await expect(card).toHaveClass(/flex/);
      await expect(card).toHaveClass(/items-stretch/);
    });

    test('renders project title', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      const title = card.locator('h3');

      await expect(title).toBeVisible();
      await expect(title).toContainText('Data Visualization Dashboard');
    });

    test('renders single tag only', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      const tags = card.locator('[data-component="project-tag"]');

      await expect(tags).toHaveCount(1);
    });

    test('title uses Space Grotesk font', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      const title = card.locator('h3');

      await expect(title).toHaveClass(/font-display/);
      await expect(title).toHaveClass(/font-semibold/);
    });
  });

  test.describe('AC3: Hover State (Desktop)', () => {
    test('featured card has hover lift class', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});

      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      await expect(card).toHaveClass(/hover:-translate-y-1/);
    });

    test('featured card has hover shadow class', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});

      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      await expect(card).toHaveClass(/shadow-sm/);
      await expect(card).toHaveClass(/hover:shadow-lg/);
    });

    test('secondary card has hover lift class', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});

      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      await expect(card).toHaveClass(/hover:-translate-y-1/);
    });

    test('secondary card has hover shadow class', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});

      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      await expect(card).toHaveClass(/shadow-sm/);
      await expect(card).toHaveClass(/hover:shadow-md/);
    });

    test('cards have smooth transition', async ({page}) => {
      const featuredCard = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const secondaryCard = page
        .locator('[data-component="secondary-project-card"]')
        .first();

      await expect(featuredCard).toHaveClass(/duration-150/);
      await expect(secondaryCard).toHaveClass(/duration-150/);
    });
  });

  test.describe('AC4: Focus State (Keyboard)', () => {
    test('featured card has focus-within ring class', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();

      await expect(card).toHaveClass(/focus-within:ring-2/);
      await expect(card).toHaveClass(/focus-within:ring-accent/);
    });

    test('secondary card has focus-within ring class', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();

      await expect(card).toHaveClass(/focus-within:ring-2/);
      await expect(card).toHaveClass(/focus-within:ring-accent/);
    });

    test('keyboard focus shows visible ring on featured card', async ({
      page,
    }) => {
      // Tab to the first featured card link
      const cardLink = page
        .locator('[data-component="featured-project-card"] > a')
        .first();

      await cardLink.focus();

      // The parent article should show focus indication via focus-within
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();

      // Verify the card has the focus-within classes
      await expect(card).toHaveClass(/focus-within:ring-2/);
    });
  });

  test.describe('AC5: Tap State (Mobile)', () => {
    test('featured card has active scale class', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      await expect(card).toHaveClass(/active:scale-\[0\.98\]/);
    });

    test('secondary card has active scale class', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      await expect(card).toHaveClass(/active:scale-\[0\.98\]/);
    });
  });

  test.describe('AC6: Missing Image Handling', () => {
    test('featured card shows placeholder when image is empty', async ({
      page,
    }) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const image = card.locator('img');

      await expect(image).toBeVisible();
      // The image should have an alt attribute
      await expect(image).toHaveAttribute('alt', /./);
    });

    test('secondary card shows placeholder when image is empty', async ({
      page,
    }) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      const image = card.locator('img');

      await expect(image).toBeVisible();
    });

    test('image container maintains aspect ratio', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const imageContainer = card.locator('.aspect-video');

      await expect(imageContainer).toBeVisible();
    });
  });

  test.describe('AC7: Missing Optional Fields', () => {
    test('card without GitHub link renders without errors', async ({page}) => {
      // The leader project has no GitHub link
      const cards = page.locator('[data-component="featured-project-card"]');
      const leaderCard = cards.nth(1);

      await expect(leaderCard).toBeVisible();
      await expect(leaderCard.locator('h3')).toContainText(
        'Federal AI Strategy',
      );
    });
  });

  test.describe('AC8: Image Optimization', () => {
    test('images have lazy loading attribute', async ({page}) => {
      const featuredCard = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const image = featuredCard.locator('img');

      await expect(image).toHaveAttribute('loading', 'lazy');
    });

    test('featured card has 16:9 aspect ratio container', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const aspectContainer = card.locator('.aspect-video');

      await expect(aspectContainer).toBeVisible();
    });
  });

  test.describe('Touch Target Size', () => {
    test('featured cards have minimum 44x44px clickable area', async ({
      page,
    }) => {
      await page.setViewportSize({width: 375, height: 667});

      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const box = await card.boundingBox();

      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('secondary cards have minimum 44x44px clickable area', async ({
      page,
    }) => {
      await page.setViewportSize({width: 375, height: 667});

      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      const box = await card.boundingBox();

      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('secondary card has min-h-11 class for touch targets', async ({
      page,
    }) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      await expect(card).toHaveClass(/min-h-11/);
    });
  });

  test.describe('Dark Mode Support', () => {
    test.beforeEach(async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/test-cards');
    });

    test('featured card has dark mode background class', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      await expect(card).toHaveClass(/dark:bg-surface-dark/);
    });

    test('featured card has dark mode text classes', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const title = card.locator('h3');
      await expect(title).toHaveClass(/dark:text-text-dark/);
    });

    test('secondary card has dark mode classes', async ({page}) => {
      const card = page
        .locator('[data-component="secondary-project-card"]')
        .first();
      await expect(card).toHaveClass(/dark:bg-surface-dark/);
    });

    test('tags have dark mode styling', async ({page}) => {
      const leadershipTag = page
        .locator('[data-component="project-tag"][data-variant="leadership"]')
        .first();
      await expect(leadershipTag).toHaveClass(/dark:bg-blue-900\/50/);
      await expect(leadershipTag).toHaveClass(/dark:text-blue-300/);
    });

    test('page renders correctly in dark mode', async ({page}) => {
      const htmlHasDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(htmlHasDark).toBe(true);

      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      await expect(card).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('featured cards pass axe-core audit', async ({page}) => {
      const accessibilityScanResults = await new AxeBuilder({page})
        .include('[data-testid="featured-cards-section"]')
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          'Featured cards accessibility violations:',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('secondary cards pass axe-core audit', async ({page}) => {
      const accessibilityScanResults = await new AxeBuilder({page})
        .include('[data-testid="secondary-cards-section"]')
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          'Secondary cards accessibility violations:',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('tag variants pass axe-core audit', async ({page}) => {
      const accessibilityScanResults = await new AxeBuilder({page})
        .include('[data-testid="tag-section"]')
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          'Tag accessibility violations:',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('page passes full accessibility audit', async ({page}) => {
      const accessibilityScanResults = await new AxeBuilder({page}).analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          'Page accessibility violations:',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('cards pass accessibility audit in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/test-cards');

      const accessibilityScanResults = await new AxeBuilder({page}).analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          'Dark mode accessibility violations:',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('featured cards have proper heading structure', async ({page}) => {
      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      const h3 = card.locator('h3');

      await expect(h3).toBeVisible();
      // Verify h3 has proper id for aria-labelledby
      await expect(h3).toHaveAttribute('id', /project-title-/);
    });

    test('card links have aria-labelledby referencing title', async ({
      page,
    }) => {
      const cardLink = page
        .locator('[data-component="featured-project-card"] > a')
        .first();

      await expect(cardLink).toHaveAttribute(
        'aria-labelledby',
        /project-title-/,
      );
    });
  });

  test.describe('Reduced Motion', () => {
    test('respects reduced motion preference', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/test-cards');

      const card = page
        .locator('[data-component="featured-project-card"]')
        .first();
      await expect(card).toBeVisible();

      // Cards should still render correctly with reduced motion
      await expect(card.locator('h3')).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('featured card links to project detail page', async ({page}) => {
      const cardLink = page
        .locator('[data-component="featured-project-card"] > a')
        .first();

      await expect(cardLink).toHaveAttribute('href', /\/projects\//);
    });

    test('secondary card links to project detail page', async ({page}) => {
      const cardLink = page
        .locator('[data-component="secondary-project-card"] > a')
        .first();

      await expect(cardLink).toHaveAttribute('href', /\/projects\//);
    });
  });
});

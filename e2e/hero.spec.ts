import {test, expect} from '@playwright/test';

/**
 * Hero Section E2E Tests
 *
 * Validates:
 * - Hero content is visible and correct
 * - Signature animation classes are present
 * - Credential badge stagger animation
 * - Reduced motion preference is respected
 * - Responsive layout at various viewports
 * - CTA buttons have correct attributes
 */

test.describe('Hero Section', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
  });

  test.describe('Content Display', () => {
    test('displays name correctly', async ({page}) => {
      await page.goto('/');
      const heroName = page.locator('[data-testid="hero-name"]');
      await expect(heroName).toBeVisible();
      await expect(heroName).toContainText('Cris Benge');
    });

    test('displays role correctly', async ({page}) => {
      await page.goto('/');
      const heroRole = page.locator('[data-testid="hero-role"]');
      await expect(heroRole).toBeVisible();
      await expect(heroRole).toContainText(
        'Head of Federal Innovation, Google',
      );
    });

    test('displays all credential badges', async ({page}) => {
      await page.goto('/');
      const credentials = page.locator('[data-testid="hero-credentials"]');
      await expect(credentials).toBeVisible();
      await expect(credentials).toContainText('Columbia MS');
      await expect(credentials).toContainText('Berkeley MIDS');
      await expect(credentials).toContainText('TS/SCI');
    });

    test('displays CTA buttons', async ({page}) => {
      await page.goto('/');
      const linkedIn = page.locator('[data-testid="hero-linkedin"]');
      const github = page.locator('[data-testid="hero-github"]');
      await expect(linkedIn).toBeVisible();
      await expect(github).toBeVisible();
    });
  });

  test.describe('Signature Animation', () => {
    test('has animation classes on hero elements', async ({page}) => {
      await page.goto('/');

      // Check animation classes are present (not timing, just class existence)
      const heroName = page.locator('[data-testid="hero-name"]');
      const heroRole = page.locator('[data-testid="hero-role"]');
      const heroCtas = page.locator('[data-testid="hero-ctas"]');

      await expect(heroName).toHaveClass(/hero-animate-name/);
      await expect(heroRole).toHaveClass(/hero-animate-role/);
      await expect(heroCtas).toHaveClass(/hero-animate-ctas/);
    });

    test('credential badges have staggered animation delays', async ({
      page,
    }) => {
      await page.goto('/');

      // Each credential badge should have its own animation delay
      const badge0 = page.locator('[data-testid="hero-credential-0"]');
      const badge1 = page.locator('[data-testid="hero-credential-1"]');
      const badge2 = page.locator('[data-testid="hero-credential-2"]');

      await expect(badge0).toHaveClass(/hero-animate-credential/);
      await expect(badge1).toHaveClass(/hero-animate-credential/);
      await expect(badge2).toHaveClass(/hero-animate-credential/);

      // Verify staggered delays via style attribute
      await expect(badge0).toHaveAttribute('style', /animation-delay: 400ms/);
      await expect(badge1).toHaveAttribute('style', /animation-delay: 550ms/);
      await expect(badge2).toHaveAttribute('style', /animation-delay: 700ms/);
    });
  });

  test.describe('Reduced Motion Support', () => {
    test('content is immediately visible with reduced motion', async ({
      page,
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      // All content should be immediately visible (opacity: 1)
      const heroName = page.locator('[data-testid="hero-name"]');
      const heroRole = page.locator('[data-testid="hero-role"]');

      await expect(heroName).toBeVisible();
      await expect(heroRole).toBeVisible();

      // Check computed opacity is 1 (not animating)
      const nameOpacity = await heroName.evaluate(el => {
        return window.getComputedStyle(el).opacity;
      });
      expect(nameOpacity).toBe('1');
    });
  });

  test.describe('Responsive Layout', () => {
    test('hero is readable at 375px mobile viewport', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      await expect(heroName).toBeVisible();

      // CTA buttons should be full width on mobile (below md: 768px)
      const linkedIn = page.locator('[data-testid="hero-linkedin"]');
      const box = await linkedIn.boundingBox();
      // Full width means button width is close to container width (accounting for padding)
      expect(box!.width).toBeGreaterThan(300);
    });

    test('CTA buttons are still stacked at 640px viewport', async ({page}) => {
      // At sm breakpoint (640px), buttons should still be stacked (we use md: 768px)
      await page.setViewportSize({width: 640, height: 800});
      await page.goto('/');

      const linkedIn = page.locator('[data-testid="hero-linkedin"]');
      const box = await linkedIn.boundingBox();
      // Still full width below md breakpoint
      expect(box!.width).toBeGreaterThan(500);
    });

    test('hero is readable at 768px tablet viewport', async ({page}) => {
      await page.setViewportSize({width: 768, height: 1024});
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      await expect(heroName).toBeVisible();

      // At md breakpoint (768px), buttons should be inline (w-auto)
      const linkedIn = page.locator('[data-testid="hero-linkedin"]');
      const box = await linkedIn.boundingBox();
      // Auto width means button is narrower than full container
      expect(box!.width).toBeLessThan(300);
    });

    test('hero is readable at 1024px desktop viewport', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      await expect(heroName).toBeVisible();
    });

    test('hero is readable at 1440px large desktop viewport', async ({
      page,
    }) => {
      await page.setViewportSize({width: 1440, height: 900});
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      await expect(heroName).toBeVisible();
    });
  });

  test.describe('CTA Buttons', () => {
    test('LinkedIn CTA has correct external link attributes', async ({
      page,
    }) => {
      await page.goto('/');
      const linkedIn = page.locator('[data-testid="hero-linkedin"]');

      await expect(linkedIn).toHaveAttribute('target', '_blank');
      await expect(linkedIn).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(linkedIn).toHaveAttribute(
        'href',
        'https://linkedin.com/in/cbenge509',
      );
    });

    test('GitHub CTA has correct external link attributes', async ({page}) => {
      await page.goto('/');
      const github = page.locator('[data-testid="hero-github"]');

      await expect(github).toHaveAttribute('target', '_blank');
      await expect(github).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(github).toHaveAttribute(
        'href',
        'https://github.com/cbenge509',
      );
    });

    test('CTA buttons have screen reader text for external links', async ({
      page,
    }) => {
      await page.goto('/');

      // Check for sr-only text indicating opens in new tab
      const srText = page.locator('[data-testid="hero-linkedin"] .sr-only');
      await expect(srText).toContainText('opens in new tab');
    });

    test('CTA buttons meet minimum touch target size', async ({page}) => {
      await page.goto('/');

      const linkedIn = page.locator('[data-testid="hero-linkedin"]');
      const box = await linkedIn.boundingBox();

      // Minimum touch target is 44x44px per WCAG
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Accessibility', () => {
    test('hero has proper heading structure', async ({page}) => {
      await page.goto('/');

      // h1 should be the name
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toContainText('Cris Benge');
    });

    test('hero section has aria-labelledby', async ({page}) => {
      await page.goto('/');

      const heroSection = page.locator(
        'section[aria-labelledby="hero-heading"]',
      );
      await expect(heroSection).toBeVisible();
    });
  });
});

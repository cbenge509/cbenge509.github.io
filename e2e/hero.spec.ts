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
      await expect(credentials).toContainText('Senior Leadership');
      await expect(credentials).toContainText('Research');
      await expect(credentials).toContainText('Data Science');
      await expect(credentials).toContainText('TS/SCI w/ Polygraph');
    });

    test('displays CTA buttons', async ({page}) => {
      await page.goto('/');
      const linkedIn = page.locator('[data-testid="hero-linkedin"]');
      const github = page.locator('[data-testid="hero-github"]');
      await expect(linkedIn).toBeVisible();
      await expect(github).toBeVisible();
    });

    test('displays profile image', async ({page}) => {
      await page.goto('/');
      const heroImage = page.locator('[data-testid="hero-image"]');
      await expect(heroImage).toBeVisible();
      await expect(heroImage).toHaveAttribute(
        'alt',
        'Cris Benge - Head of Federal Innovation at Google',
      );
    });

    test('profile image has rounded corners', async ({page}) => {
      await page.goto('/');
      const heroImage = page.locator('[data-testid="hero-image"]');
      await expect(heroImage).toHaveClass(/rounded-2xl/);
    });

    test('profile image uses eager loading for above-fold content', async ({
      page,
    }) => {
      await page.goto('/');
      const heroImage = page.locator('[data-testid="hero-image"]');
      await expect(heroImage).toHaveAttribute('loading', 'eager');
    });

    test('profile image has high fetchpriority for LCP optimization', async ({
      page,
    }) => {
      await page.goto('/');
      const heroImage = page.locator('[data-testid="hero-image"]');
      await expect(heroImage).toHaveAttribute('fetchpriority', 'high');
    });

    test('profile image has responsive sizes attribute', async ({page}) => {
      await page.goto('/');
      const heroImage = page.locator('[data-testid="hero-image"]');
      const sizes = await heroImage.getAttribute('sizes');
      expect(sizes).toBeTruthy();
      expect(sizes).toContain('768px');
    });
  });

  test.describe('Two-Column Layout', () => {
    test('image and content are side-by-side on desktop', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});
      await page.goto('/');

      const imageContainer = page.locator(
        '[data-testid="hero-image-container"]',
      );
      const heroName = page.locator('[data-testid="hero-name"]');

      const imageBox = await imageContainer.boundingBox();
      const nameBox = await heroName.boundingBox();

      // On desktop, image should be to the left of the name (x positions differ)
      expect(imageBox!.x).toBeLessThan(nameBox!.x);
      // They should be roughly vertically aligned (similar y position within reason)
      expect(Math.abs(imageBox!.y - nameBox!.y)).toBeLessThan(100);
    });

    test('image is above content on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/');

      const imageContainer = page.locator(
        '[data-testid="hero-image-container"]',
      );
      const heroName = page.locator('[data-testid="hero-name"]');

      const imageBox = await imageContainer.boundingBox();
      const nameBox = await heroName.boundingBox();

      // On mobile, image should be above the name (image y is smaller)
      expect(imageBox!.y).toBeLessThan(nameBox!.y);
    });

    test('content is centered on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/');

      // On mobile, the content should have centered text alignment
      const heroName = page.locator('[data-testid="hero-name"]');
      const textAlign = await heroName.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      expect(textAlign).toBe('center');
    });

    test('content is left-aligned on desktop', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      const textAlign = await heroName.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      expect(textAlign).toBe('left');
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

      // Verify staggered delays via style attribute (updated for image animation)
      await expect(badge0).toHaveAttribute('style', /animation-delay: 500ms/);
      await expect(badge1).toHaveAttribute('style', /animation-delay: 650ms/);
      await expect(badge2).toHaveAttribute('style', /animation-delay: 800ms/);
    });

    test('profile image has animation class', async ({page}) => {
      await page.goto('/');
      const imageContainer = page.locator(
        '[data-testid="hero-image-container"]',
      );
      await expect(imageContainer).toHaveClass(/hero-animate-image/);
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
      const github = page.locator('[data-testid="hero-github"]');

      const linkedInBox = await linkedIn.boundingBox();
      const githubBox = await github.boundingBox();

      // At 640px (below md:768px), buttons should be stacked vertically
      // GitHub button should be below LinkedIn button
      expect(githubBox!.y).toBeGreaterThan(linkedInBox!.y);
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
        'https://www.linkedin.com/in/crisbenge/',
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

      // ExternalLink component uses aria-label with "(opens in new tab)" suffix
      const linkedInButton = page.locator('[data-testid="hero-linkedin"]');
      await expect(linkedInButton).toHaveAttribute(
        'aria-label',
        /opens in new tab/,
      );
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

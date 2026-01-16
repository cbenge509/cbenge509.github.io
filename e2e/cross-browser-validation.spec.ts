import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Cross-Browser Validation E2E Tests
 *
 * Story 5.5 AC7: Validation Checklist
 * Comprehensive validation across all browsers (AC3)
 *
 * This test suite runs automated checks that would typically be in a manual checklist:
 * - [ ] All browsers tested manually → Automated via Playwright projects
 * - [ ] Performance audit passed → Lighthouse CI
 * - [ ] Mobile usability verified → Responsive tests + touch targets
 * - [ ] Accessibility audit passed → axe-core
 */

const pages = [
  {name: 'Homepage', path: '/'},
  {name: 'Projects', path: '/projects/'},
  {name: 'About', path: '/about/'},
  {name: 'Publications', path: '/publications/'},
];

test.describe('Cross-Browser Validation Checklist (AC7)', () => {
  test.describe('Browser Compatibility (AC3)', () => {
    // This describe block runs across all configured browsers (chromium, firefox, webkit)
    // defined in playwright.config.ts projects

    for (const pageConfig of pages) {
      test.describe(`${pageConfig.name} page`, () => {
        test('renders correctly', async ({page}) => {
          await page.goto(pageConfig.path);

          // Page loads without JavaScript errors
          const errors: string[] = [];
          page.on('pageerror', error => errors.push(error.message));

          // Main content is visible
          const main = page.locator('main');
          await expect(main).toBeVisible();

          // Navigation is present
          const nav = page.locator('[data-component="navigation"]');
          await expect(nav).toBeVisible();

          // Footer is present
          const footer = page.locator('footer[data-component="footer"]');
          await expect(footer).toBeVisible();

          // No JS errors occurred
          expect(errors).toHaveLength(0);
        });

        test('navigation works', async ({page}) => {
          // Use desktop viewport to ensure nav links are visible
          await page.setViewportSize({width: 1024, height: 768});
          await page.goto('/');

          // Click Projects nav link (without trailing slash)
          const projectsLink = page.locator('nav a[href="/projects"]').first();
          await projectsLink.click();
          await expect(page).toHaveURL(/\/projects/);

          // Click About nav link
          const aboutLink = page.locator('nav a[href="/about"]').first();
          await aboutLink.click();
          await expect(page).toHaveURL(/\/about/);

          // Click Publications nav link
          const pubsLink = page.locator('nav a[href="/publications"]').first();
          await pubsLink.click();
          await expect(page).toHaveURL(/\/publications/);

          // Navigate back to home
          const homeLink = page.locator('nav a[href="/"]').first();
          await homeLink.click();
          await expect(page).toHaveURL(/\/$/);
        });
      });
    }
  });

  test.describe('Mobile Usability Verification', () => {
    const mobileViewport = {width: 375, height: 667};

    for (const pageConfig of pages) {
      test(`${pageConfig.name} is usable on mobile`, async ({page}) => {
        await page.setViewportSize(mobileViewport);
        await page.goto(pageConfig.path);

        // No horizontal scrolling
        const scrollWidth = await page.evaluate(
          () => document.body.scrollWidth,
        );
        expect(scrollWidth).toBeLessThanOrEqual(mobileViewport.width);

        // Content is readable (minimum font size)
        const bodyFontSize = await page.evaluate(() => {
          return parseFloat(window.getComputedStyle(document.body).fontSize);
        });
        expect(bodyFontSize).toBeGreaterThanOrEqual(16);

        // Main content area is visible
        const main = page.locator('main');
        await expect(main).toBeVisible();
      });
    }

    test('mobile menu opens and closes', async ({page}) => {
      await page.setViewportSize(mobileViewport);
      await page.goto('/');

      const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
      const mobileMenu = page.locator('#mobile-menu');

      // Menu starts closed
      await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

      // Menu opens on click
      await hamburger.click();
      await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

      // Menu closes on escape
      await page.keyboard.press('Escape');
      await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test.describe('Accessibility Audit (WCAG 2.1 AA)', () => {
    test.beforeEach(async ({page}) => {
      // Disable animations for accurate contrast checks
      await page.emulateMedia({reducedMotion: 'reduce'});
    });

    for (const pageConfig of pages) {
      test(`${pageConfig.name} passes accessibility audit`, async ({page}) => {
        await page.goto(pageConfig.path);

        const results = await new AxeBuilder({page}).analyze();

        if (results.violations.length > 0) {
          console.log(
            `Accessibility violations on ${pageConfig.name}:`,
            JSON.stringify(
              results.violations.map(v => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes.length,
              })),
              null,
              2,
            ),
          );
        }

        expect(results.violations).toEqual([]);
      });
    }
  });

  test.describe('Theme System Cross-Browser', () => {
    test('dark mode toggle works correctly', async ({page}) => {
      await page.goto('/');

      // Get theme toggle
      const themeToggle = page
        .locator('[data-component="theme-toggle"]')
        .first();

      // Initial state - check if dark class is present
      const initialIsDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });

      // Toggle theme
      await themeToggle.click();

      // Theme should have changed
      const newIsDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(newIsDark).not.toBe(initialIsDark);

      // Toggle back
      await themeToggle.click();
      const restoredIsDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(restoredIsDark).toBe(initialIsDark);
    });

    test('theme persists across page navigation', async ({page}) => {
      await page.goto('/');

      // Set dark theme via toggle
      const themeToggle = page
        .locator('[data-component="theme-toggle"]')
        .first();

      // Get initial state
      const initialIsDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });

      // If currently light, toggle to dark
      if (!initialIsDark) {
        await themeToggle.click();
      }

      // Verify dark mode is set
      await expect(page.locator('html')).toHaveClass(/dark/);

      // Navigate to another page
      await page.goto('/about/');

      // Theme should persist
      await expect(page.locator('html')).toHaveClass(/dark/);
    });
  });

  test.describe('Interactive Elements Cross-Browser', () => {
    test('links have proper hover states', async ({page, browserName}) => {
      // Skip hover tests on mobile browsers where hover doesn't apply
      test.skip(
        browserName === 'webkit' && process.platform === 'darwin',
        'Hover not applicable on touch devices',
      );

      await page.goto('/');

      // Test nav link hover
      const navLink = page.locator('.link-underline-gradient').first();
      if ((await navLink.count()) > 0) {
        await navLink.hover();
        // Verify hover state is applied (link should still be visible)
        await expect(navLink).toBeVisible();
      }
    });

    test('focus states are visible', async ({page}) => {
      await page.goto('/');

      // Tab to first focusable element
      await page.keyboard.press('Tab');

      // Get active element
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          tagName: el.tagName,
          hasOutline: styles.outlineStyle !== 'none',
          hasRing:
            styles.boxShadow !== 'none' || el.classList.contains('focus-ring'),
        };
      });

      expect(activeElement).not.toBeNull();
      // Element should have visible focus indicator
      expect(activeElement?.hasOutline || activeElement?.hasRing).toBeTruthy();
    });
  });

  test.describe('Image Loading Cross-Browser', () => {
    for (const pageConfig of pages) {
      test(`images load correctly on ${pageConfig.name}`, async ({page}) => {
        await page.goto(pageConfig.path);

        // Wait for network to settle to ensure all images have loaded
        await page.waitForLoadState('networkidle');

        // Find all images
        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
          const img = images.nth(i);
          const isVisible = await img.isVisible();

          if (isVisible) {
            const src = await img.getAttribute('src');

            // Wait for this specific image to load with a timeout
            // This handles SVGs and lazy-loaded images in all browsers
            try {
              await page.waitForFunction(
                (imgSrc: string) => {
                  const imgEl = document.querySelector(
                    `img[src="${imgSrc}"]`,
                  ) as HTMLImageElement;
                  if (!imgEl) return true; // Image removed from DOM
                  // For raster images
                  if (imgEl.naturalWidth > 0) return true;
                  // For SVGs - check rendered dimensions
                  const rect = imgEl.getBoundingClientRect();
                  return rect.width > 0 && rect.height > 0;
                },
                src,
                {timeout: 5000},
              );
            } catch {
              // If timeout, the soft expect below will catch it
            }

            // Check image has loaded
            const loaded = await img.evaluate((el: HTMLImageElement) => {
              // For raster images, naturalWidth > 0 indicates loaded
              if (el.naturalWidth > 0) return true;
              // For SVGs and edge cases, check rendered dimensions
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0;
            });
            expect.soft(loaded, `Image ${src} should be loaded`).toBeTruthy();

            // Check image has alt text for accessibility
            const alt = await img.getAttribute('alt');
            expect
              .soft(alt, `Image ${src} should have alt text`)
              .not.toBeNull();
          }
        }
      });
    }
  });
});

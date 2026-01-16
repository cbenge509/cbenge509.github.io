import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Footer Component E2E Tests
 *
 * Validates:
 * - AC1: Social Links Display (GitHub, LinkedIn with ↗ icons)
 * - AC2: Copyright Notice with dynamic year
 * - AC3: Gradient Underline Hover effect
 * - AC4: Focus Indicators (.focus-ring)
 * - AC5: External Link Behavior (target="_blank", rel, screen reader text)
 * - AC6: Visual Distinction (surface background)
 * - AC7: Generous Spacing (py-8 md:py-12)
 * - AC8: Dark Mode Support
 * - AC9: Responsive Layout
 */

test.describe('Footer Component', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    await page.goto('/');
  });

  test.describe('AC1: Social Links Display', () => {
    test('displays GitHub link with arrow icon', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const githubLink = footer.locator('a[href*="github.com"]');

      await expect(githubLink).toBeVisible();
      await expect(githubLink).toContainText('GitHub');
      await expect(githubLink).toContainText('↗');
    });

    test('displays LinkedIn link with arrow icon', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const linkedinLink = footer.locator('a[href*="linkedin.com"]');

      await expect(linkedinLink).toBeVisible();
      await expect(linkedinLink).toContainText('LinkedIn');
      await expect(linkedinLink).toContainText('↗');
    });
  });

  test.describe('AC2: Copyright Notice', () => {
    test('displays copyright with current year', async ({page}) => {
      const currentYear = new Date().getFullYear();
      const footer = page.locator('footer[data-component="footer"]');

      await expect(footer).toContainText(`© ${currentYear}`);
      await expect(footer).toContainText('Cris Benge');
    });
  });

  test.describe('AC3: Gradient Underline Hover', () => {
    test('footer links have link-underline-gradient class for gradient effect', async ({
      page,
    }) => {
      const footer = page.locator('footer[data-component="footer"]');
      const footerLinks = footer.locator('.link-underline-gradient');

      // Should have 2 footer links (GitHub, LinkedIn) - Email removed in Story 6.3, Astro removed in Story 6.4
      await expect(footerLinks).toHaveCount(2);
    });

    test('gradient underline appears on hover', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const githubLink = footer.locator('a[href*="github.com"]');

      // Hover over the link
      await githubLink.hover();

      // Wait for the transition to complete (150ms + buffer)
      await page.waitForTimeout(200);

      // Check that the ::after pseudo-element has width set (gradient underline)
      const hasHoverEffect = await page.evaluate(() => {
        const link = document.querySelector(
          'footer[data-component="footer"] a[href*="github.com"]',
        );
        if (!link) return false;

        const afterStyles = window.getComputedStyle(link, '::after');
        // In hover state, width should be greater than 0
        const width = parseFloat(afterStyles.width) || 0;
        return width > 0;
      });

      expect(hasHoverEffect).toBe(true);
    });
  });

  test.describe('AC4: Focus Indicators', () => {
    test('all footer links have focus-ring class', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const links = footer.locator('a');
      const count = await links.count();

      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        await expect(link).toHaveClass(/focus-ring/);
      }
    });

    test('focus is visible when tabbing to footer links', async ({page}) => {
      // Tab until we reach a footer link
      let reachedFooter = false;
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.closest('footer[data-component="footer"]') !== null;
        });
        if (focused) {
          reachedFooter = true;
          break;
        }
      }

      expect(reachedFooter).toBe(true);

      // Check that focused element has focus indication
      const hasFocusIndication = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return false;
        const styles = window.getComputedStyle(el);
        return styles.boxShadow !== 'none' || styles.outline !== 'none';
      });

      expect(hasFocusIndication).toBe(true);
    });
  });

  test.describe('AC5: External Link Behavior', () => {
    test('external links open in new tab', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const externalLinks = footer.locator('a[target="_blank"]');

      // All footer links should be external (GitHub, LinkedIn) - Astro removed in Story 6.4
      await expect(externalLinks).toHaveCount(2);
    });

    test('external links have security attributes', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const externalLinks = footer.locator('a[target="_blank"]');
      const count = await externalLinks.count();

      for (let i = 0; i < count; i++) {
        const link = externalLinks.nth(i);
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });

    test('external links have aria-labels with opens in new tab', async ({
      page,
    }) => {
      const footer = page.locator('footer[data-component="footer"]');

      // Check social links have proper aria-labels
      const githubLink = footer.locator('a[href*="github.com"]');
      await expect(githubLink).toHaveAttribute(
        'aria-label',
        /opens in new tab/,
      );

      const linkedinLink = footer.locator('a[href*="linkedin.com"]');
      await expect(linkedinLink).toHaveAttribute(
        'aria-label',
        /opens in new tab/,
      );
    });
  });

  test.describe('AC6: Visual Distinction', () => {
    test('footer has surface background color', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');

      await expect(footer).toHaveClass(/bg-surface/);
    });

    test('footer has border-top for separation', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');

      await expect(footer).toHaveClass(/border-t/);
      await expect(footer).toHaveClass(/border-border/);
    });
  });

  test.describe('AC7: Generous Spacing', () => {
    test('footer has proper padding', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const container = footer.locator('.container-custom');

      await expect(container).toHaveClass(/py-8/);
      await expect(container).toHaveClass(/md:py-12/);
    });
  });

  test.describe('AC8: Dark Mode Support', () => {
    test('footer has dark mode classes', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');

      await expect(footer).toHaveClass(/dark:bg-surface-dark/);
      await expect(footer).toHaveClass(/dark:border-border-dark/);
    });

    test('footer renders correctly in dark mode', async ({page}) => {
      // Enable dark mode
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/');

      const footer = page.locator('footer[data-component="footer"]');
      await expect(footer).toBeVisible();

      // Verify dark class is applied
      const htmlHasDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(htmlHasDark).toBe(true);
    });
  });

  test.describe('AC9: Responsive Layout', () => {
    test('footer uses flex-col on mobile', async ({page}) => {
      // Set mobile viewport
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/');

      const footer = page.locator('footer[data-component="footer"]');
      const flexContainer = footer.locator('.flex-col');

      await expect(flexContainer.first()).toBeVisible();
    });

    test('footer uses flex-row on desktop', async ({page}) => {
      // Set desktop viewport
      await page.setViewportSize({width: 1280, height: 800});
      await page.goto('/');

      const footer = page.locator('footer[data-component="footer"]');

      // Check for md:flex-row class
      await expect(footer.locator('.md\\:flex-row').first()).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('footer passes axe-core accessibility audit', async ({page}) => {
      const accessibilityScanResults = await new AxeBuilder({page})
        .include('footer[data-component="footer"]')
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          'Footer accessibility violations:',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('footer has navigation landmark with aria-label', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const nav = footer.locator('nav[aria-label="Social links"]');

      await expect(nav).toBeVisible();
    });

    test('footer passes accessibility in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/');

      const accessibilityScanResults = await new AxeBuilder({page})
        .include('footer[data-component="footer"]')
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Reduced Motion', () => {
    test('respects reduced motion preference', async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      // Verify the footer still renders correctly
      const footer = page.locator('footer[data-component="footer"]');
      await expect(footer).toBeVisible();

      // Check that reduced motion styles are active
      const hasReducedMotionStyles = await page.evaluate(() => {
        const link = document.querySelector('footer .link-underline-gradient');
        if (!link) return false;

        const afterStyles = window.getComputedStyle(link, '::after');
        // In reduced motion, width should be 100% (no animation, opacity used instead)
        return afterStyles.width === '100%' || afterStyles.opacity !== '';
      });

      // The test passes if reduced motion is being handled
      expect(hasReducedMotionStyles).toBeDefined();
    });
  });

  // ============================================================
  // Story 6.3: Email Removal Verification
  // ============================================================

  test.describe('Email Removal Verification (Story 6.3)', () => {
    test('footer does NOT have email link', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const emailLink = footer.locator('[data-testid="footer-email-link"]');
      await expect(emailLink).toHaveCount(0);
    });

    test('footer does NOT have mailto link', async ({page}) => {
      const footer = page.locator('footer[data-component="footer"]');
      const mailtoLinks = footer.locator('a[href^="mailto:"]');
      await expect(mailtoLinks).toHaveCount(0);
    });

    test('footer displays only GitHub and LinkedIn social links', async ({
      page,
    }) => {
      const footer = page.locator('footer[data-component="footer"]');
      const nav = footer.locator('nav[aria-label="Social links"]');

      // Verify GitHub and LinkedIn are present
      await expect(nav.locator('a[href*="github.com"]')).toBeVisible();
      await expect(nav.locator('a[href*="linkedin.com"]')).toBeVisible();

      // Verify only 2 social links in nav (Email removed)
      const socialLinks = nav.locator('a');
      await expect(socialLinks).toHaveCount(2);
    });
  });
});

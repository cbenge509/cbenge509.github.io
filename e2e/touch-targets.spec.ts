import {test, expect} from '@playwright/test';

/**
 * Touch Target Validation E2E Tests
 *
 * Story 5.5 AC5: All touch targets >= 44x44px (UX-4)
 *
 * Per project-context.md:
 * - Minimum 44x44px touch area for all interactive elements
 * - Use Tailwind preset classes: min-h-11 (44px), NOT min-h-[44px]
 */

// All pages to test
const pages = [
  {name: 'Homepage', path: '/'},
  {name: 'Projects', path: '/projects/'},
  {name: 'About', path: '/about/'},
  {name: 'Publications', path: '/publications/'},
];

// Mobile viewport for touch target testing
const mobileViewport = {width: 375, height: 667};

test.describe('Touch Target Validation (AC5)', () => {
  test.beforeEach(async ({page}) => {
    await page.setViewportSize(mobileViewport);
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
  });

  for (const pageConfig of pages) {
    test.describe(`${pageConfig.name} page`, () => {
      test.beforeEach(async ({page}) => {
        await page.goto(pageConfig.path);
      });

      test('all buttons have >= 44px touch targets', async ({page}) => {
        const buttons = page.locator('button:visible');
        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
          const button = buttons.nth(i);
          const box = await button.boundingBox();
          if (box) {
            expect
              .soft(box.width, `Button ${i + 1} width`)
              .toBeGreaterThanOrEqual(44);
            expect
              .soft(box.height, `Button ${i + 1} height`)
              .toBeGreaterThanOrEqual(44);
          }
        }
      });

      test('primary navigation links have adequate touch targets', async ({
        page,
      }) => {
        // Test navigation links (mobile menu is opened to test those links)
        const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
        if ((await hamburger.count()) > 0 && (await hamburger.isVisible())) {
          await hamburger.click();
          const mobileLinks = page.locator('.mobile-menu-link');
          const count = await mobileLinks.count();

          for (let i = 0; i < count; i++) {
            const link = mobileLinks.nth(i);
            const box = await link.boundingBox();
            if (box) {
              expect
                .soft(box.height, `Mobile menu link ${i + 1} height`)
                .toBeGreaterThanOrEqual(44);
            }
          }

          // Close menu
          await page.keyboard.press('Escape');
        }
      });

      test('theme toggle has >= 44px touch target', async ({page}) => {
        const themeToggle = page
          .locator('[data-component="theme-toggle"]')
          .first();
        if ((await themeToggle.count()) > 0) {
          const box = await themeToggle.boundingBox();
          if (box) {
            expect(box.width).toBeGreaterThanOrEqual(44);
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      });
    });
  }

  test.describe('Navigation touch targets', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/');
    });

    test('hamburger menu button has >= 44px touch target', async ({page}) => {
      const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
      const box = await hamburger.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    });

    test('mobile menu links have >= 44px height', async ({page}) => {
      const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
      await hamburger.click();

      const menuLinks = page.locator('.mobile-menu-link');
      const count = await menuLinks.count();

      for (let i = 0; i < count; i++) {
        const link = menuLinks.nth(i);
        const box = await link.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });

  test.describe('Card touch targets', () => {
    test('project cards are tappable on Projects page', async ({page}) => {
      await page.goto('/projects/');
      const projectCards = page.locator('[data-testid="project-card"] a');
      const count = await projectCards.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          const card = projectCards.nth(i);
          const box = await card.boundingBox();
          if (box) {
            // Cards should be large enough to tap easily
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    });

    test('publication abstract toggle buttons have adequate touch targets', async ({
      page,
    }) => {
      await page.goto('/publications/');
      // Check the "Show Abstract" toggle buttons which have min-h-11 (44px)
      const abstractToggles = page.locator('.abstract-toggle');
      const count = await abstractToggles.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          const button = abstractToggles.nth(i);
          const box = await button.boundingBox();
          if (box) {
            expect
              .soft(box.height, `Abstract toggle ${i + 1}`)
              .toBeGreaterThanOrEqual(44);
          }
        }
      }
    });
  });

  test.describe('Form controls', () => {
    test('contact form controls have >= 44px touch targets', async ({page}) => {
      await page.goto('/about/');

      // Check for any form inputs on the page
      const inputs = page.locator(
        'input:visible, textarea:visible, select:visible',
      );
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        const box = await input.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });

  test.describe('Social links', () => {
    test('footer social links have >= 44px touch targets', async ({page}) => {
      await page.goto('/');
      const footer = page.locator('footer[data-component="footer"]');
      const socialLinks = footer.locator('a');
      const count = await socialLinks.count();

      for (let i = 0; i < count; i++) {
        const link = socialLinks.nth(i);
        const box = await link.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('hero social links have >= 44px touch targets', async ({page}) => {
      await page.goto('/');
      const heroLinks = page.locator(
        '[data-testid="hero-linkedin"], [data-testid="hero-github"]',
      );
      const count = await heroLinks.count();

      for (let i = 0; i < count; i++) {
        const link = heroLinks.nth(i);
        const box = await link.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });
});

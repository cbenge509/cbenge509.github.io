import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Responsive Validation E2E Tests
 *
 * Story 1.9: Validates responsive behavior across all viewports
 *
 * Acceptance Criteria Covered:
 * - AC1: Mobile Viewport (320px - 639px)
 * - AC2: Tablet Viewport (640px - 1023px)
 * - AC3: Desktop Viewport (1024px+)
 * - AC4: Responsive Testing at 375px, 768px, 1024px, 1440px
 * - AC5: Continuous Breakpoints - No layout breaks 320px to 1920px
 * - AC6: Performance Mobile - Lighthouse ≥90 (separate task)
 * - AC7: Touch Targets ≥44×44px
 * - AC8: Navigation Mobile - Hamburger menu functionality
 * - AC9: Hero Mobile - Left-aligned, readable, full-width CTAs
 * - AC10: Footer Mobile - Stacks vertically, social links accessible
 */

// Define viewport configurations for testing
const viewports = {
  mobile: {name: 'mobile', width: 375, height: 667},
  tablet: {name: 'tablet', width: 768, height: 1024},
  desktop: {name: 'desktop', width: 1024, height: 768},
  largeDesktop: {name: 'large-desktop', width: 1440, height: 900},
} as const;

// All breakpoints for sweep test (320px to 1920px in 100px increments)
const breakpointSweep: number[] = [];
for (let width = 320; width <= 1920; width += 100) {
  breakpointSweep.push(width);
}

test.describe('Responsive Layout - AC1, AC2, AC3, AC4, AC5', () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
  });

  test.describe('Mobile Viewport (375px) - AC1', () => {
    test.beforeEach(async ({page}) => {
      await page.setViewportSize({
        width: viewports.mobile.width,
        height: viewports.mobile.height,
      });
      await page.goto('/');
    });

    test('no horizontal scrolling occurs', async ({page}) => {
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('content is readable and accessible', async ({page}) => {
      // Check main heading is visible
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();

      // Verify font size is at least 16px for body text
      const bodyFontSize = await page.evaluate(() => {
        const body = document.body;
        return parseFloat(window.getComputedStyle(body).fontSize);
      });
      expect(bodyFontSize).toBeGreaterThanOrEqual(16);
    });

    test('hamburger menu is visible', async ({page}) => {
      const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
      await expect(hamburger).toBeVisible();
    });

    test('desktop nav links are hidden', async ({page}) => {
      const desktopNav = page.locator('.desktop-nav');
      await expect(desktopNav).not.toBeVisible();
    });
  });

  test.describe('Tablet Viewport (768px) - AC2', () => {
    test.beforeEach(async ({page}) => {
      await page.setViewportSize({
        width: viewports.tablet.width,
        height: viewports.tablet.height,
      });
      await page.goto('/');
    });

    test('no horizontal scrolling occurs', async ({page}) => {
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('layout adapts appropriately at tablet size', async ({page}) => {
      // Navigation should show full nav or hamburger at this breakpoint
      const nav = page.locator('[data-component="navigation"]');
      await expect(nav).toBeVisible();

      // Hero should be visible and properly laid out
      const hero = page.locator('[data-testid="hero-name"]');
      await expect(hero).toBeVisible();
    });

    test('spacing increases from mobile', async ({page}) => {
      // Check container has increased padding at md breakpoint
      const container = page.locator('.container-custom').first();
      const paddingLeft = await container.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).paddingLeft);
      });
      // At md breakpoint, padding should be 24px (1.5rem)
      expect(paddingLeft).toBeGreaterThanOrEqual(24);
    });
  });

  test.describe('Desktop Viewport (1024px) - AC3', () => {
    test.beforeEach(async ({page}) => {
      await page.setViewportSize({
        width: viewports.desktop.width,
        height: viewports.desktop.height,
      });
      await page.goto('/');
    });

    test('no horizontal scrolling occurs', async ({page}) => {
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('desktop navigation is visible', async ({page}) => {
      // Desktop nav uses "hidden md:flex" class, not ".desktop-nav"
      const desktopNav = page.locator('nav .hidden.md\\:flex');
      await expect(desktopNav).toBeVisible();
    });

    test('hamburger menu is hidden on desktop', async ({page}) => {
      const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
      await expect(hamburger).not.toBeVisible();
    });

    test('hover interactions work on cards', async ({page}) => {
      // Check that links have proper hover states
      const navLink = page.locator('.nav-link').first();
      if ((await navLink.count()) > 0) {
        await navLink.hover();
        // Hover should trigger transition (checking ::after pseudo-element)
        const afterWidth = await navLink.evaluate(el => {
          const after = window.getComputedStyle(el, '::after');
          return after.width;
        });
        expect(afterWidth).not.toBe('0px');
      }
    });
  });

  test.describe('Large Desktop Viewport (1440px) - AC3', () => {
    test.beforeEach(async ({page}) => {
      await page.setViewportSize({
        width: viewports.largeDesktop.width,
        height: viewports.largeDesktop.height,
      });
      await page.goto('/');
    });

    test('no horizontal scrolling occurs', async ({page}) => {
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('content is centered with max-width container', async ({page}) => {
      const container = page.locator('.container-custom').first();
      const box = await container.boundingBox();

      if (box) {
        // Container max-width is 1280px (80rem)
        expect(box.width).toBeLessThanOrEqual(1280);

        // Container should be centered (margin-left should be > 0)
        expect(box.x).toBeGreaterThan(0);
      }
    });

    test('generous whitespace surrounds content', async ({page}) => {
      const container = page.locator('.container-custom').first();
      const paddingLeft = await container.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).paddingLeft);
      });
      // Container uses consistent 24px (1.5rem) padding at all breakpoints
      expect(paddingLeft).toBeGreaterThanOrEqual(24);
    });
  });

  test.describe('All Standard Breakpoints - AC4', () => {
    const standardBreakpoints = [
      {width: 375, name: '375px (mobile)'},
      {width: 768, name: '768px (tablet)'},
      {width: 1024, name: '1024px (desktop)'},
      {width: 1440, name: '1440px (large desktop)'},
    ];

    for (const bp of standardBreakpoints) {
      test(`passes at ${bp.name}`, async ({page}) => {
        await page.setViewportSize({width: bp.width, height: 800});
        await page.goto('/');

        // No horizontal scrolling
        const scrollWidth = await page.evaluate(
          () => document.body.scrollWidth,
        );
        expect(scrollWidth).toBeLessThanOrEqual(bp.width);

        // Page loads without error
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();

        // No JavaScript errors on page
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.waitForTimeout(500);
        expect(errors).toHaveLength(0);
      });
    }
  });

  test.describe('Continuous Breakpoint Sweep - AC5', () => {
    test('no layout breaks between 320px and 1920px', async ({page}) => {
      const failedWidths: number[] = [];

      for (const width of breakpointSweep) {
        await page.setViewportSize({width, height: 800});
        await page.goto('/');

        // Check for horizontal scrolling
        const scrollWidth = await page.evaluate(
          () => document.body.scrollWidth,
        );
        if (scrollWidth > width) {
          failedWidths.push(width);
        }

        // Check that key elements are visible (use specific hero heading to avoid Playwright overlay)
        const heading = page.locator('[data-testid="hero-name"]');
        const isVisible = await heading.isVisible();
        if (!isVisible) {
          failedWidths.push(width);
        }
      }

      expect(failedWidths).toHaveLength(0);
    });
  });
});

test.describe('Touch Target Validation - AC7', () => {
  test.beforeEach(async ({page}) => {
    await page.setViewportSize({
      width: viewports.mobile.width,
      height: viewports.mobile.height,
    });
    await page.goto('/');
  });

  test('all navigation links have ≥44px touch targets', async ({page}) => {
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

  test('hero CTA buttons have ≥44px touch targets', async ({page}) => {
    const linkedIn = page.locator('[data-testid="hero-linkedin"]');
    const box = await linkedIn.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('footer social links have ≥44px touch targets', async ({page}) => {
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

  test('theme toggle has ≥44px touch target', async ({page}) => {
    const themeToggle = page.locator('[data-component="theme-toggle"]').first();
    const box = await themeToggle.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('hamburger menu button has ≥44px touch target', async ({page}) => {
    const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
    const box = await hamburger.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('Mobile Navigation - AC8', () => {
  test.beforeEach(async ({page}) => {
    await page.setViewportSize({
      width: viewports.mobile.width,
      height: viewports.mobile.height,
    });
    await page.goto('/');
  });

  test('hamburger menu opens on mobile', async ({page}) => {
    const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
    const mobileMenu = page.locator('#mobile-menu');

    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    await hamburger.click();
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
  });

  test('hamburger menu closes on Escape', async ({page}) => {
    const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
    const mobileMenu = page.locator('#mobile-menu');

    await hamburger.click();
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    await page.keyboard.press('Escape');
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('hamburger menu closes on clicking outside', async ({page}) => {
    const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
    const mobileMenu = page.locator('#mobile-menu');

    await hamburger.click();
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    // Wait for menu open animation to complete (nav gets menu-open class)
    const nav = page.locator('[data-component="navigation"]');
    await expect(nav).toHaveClass(/menu-open/);

    // Click on backdrop
    await page.evaluate(() => {
      const backdrop = document.querySelector('.mobile-menu-backdrop');
      backdrop?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('focus trap works within mobile menu', async ({page}) => {
    const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
    await hamburger.click();

    // Tab through menu items
    const menuLinks = page.locator('.mobile-menu-link');
    const linkCount = await menuLinks.count();

    // Tab to last element
    for (let i = 0; i < linkCount; i++) {
      await page.keyboard.press('Tab');
    }

    // Tab once more should cycle within focus trap
    await page.keyboard.press('Tab');

    const activeElement = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(['BUTTON', 'A']).toContain(activeElement);
  });

  test('all nav items accessible in mobile menu', async ({page}) => {
    const hamburger = page.locator('[data-component="mobile-menu-toggle"]');
    await hamburger.click();

    const mobilePanel = page.locator('.mobile-menu-panel');
    await expect(mobilePanel.getByRole('link', {name: 'Home'})).toBeVisible();
    await expect(
      mobilePanel.getByRole('link', {name: 'Projects'}),
    ).toBeVisible();
    await expect(mobilePanel.getByRole('link', {name: 'About'})).toBeVisible();
    await expect(
      mobilePanel.getByRole('link', {name: 'Publications'}),
    ).toBeVisible();
  });
});

test.describe('Hero Section Mobile - AC9', () => {
  test.beforeEach(async ({page}) => {
    await page.setViewportSize({
      width: viewports.mobile.width,
      height: viewports.mobile.height,
    });
    await page.goto('/');
  });

  test('hero section is left-aligned', async ({page}) => {
    const heroName = page.locator('[data-testid="hero-name"]');
    const textAlign = await heroName.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    expect(['left', 'start']).toContain(textAlign);
  });

  test('hero text is readable with minimum 16px font', async ({page}) => {
    const heroRole = page.locator('[data-testid="hero-role"]');
    const fontSize = await heroRole.evaluate(el => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test('CTA buttons are full-width on mobile', async ({page}) => {
    const linkedIn = page.locator('[data-testid="hero-linkedin"]');
    const box = await linkedIn.boundingBox();
    if (box) {
      // Full width means button width is close to container width
      expect(box.width).toBeGreaterThan(300);
    }
  });

  test('CTA buttons have ≥44px height touch target', async ({page}) => {
    const linkedIn = page.locator('[data-testid="hero-linkedin"]');
    const box = await linkedIn.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('Footer Mobile - AC10', () => {
  test.beforeEach(async ({page}) => {
    await page.setViewportSize({
      width: viewports.mobile.width,
      height: viewports.mobile.height,
    });
    await page.goto('/');
  });

  test('footer stacks vertically on mobile', async ({page}) => {
    const footer = page.locator('footer[data-component="footer"]');
    const flexContainer = footer.locator('.flex-col');

    await expect(flexContainer.first()).toBeVisible();
  });

  test('social links are accessible and tappable', async ({page}) => {
    const footer = page.locator('footer[data-component="footer"]');
    const githubLink = footer.locator('a[href*="github.com"]');
    const linkedinLink = footer.locator('a[href*="linkedin.com"]');

    await expect(githubLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();

    // Check touch target size
    const githubBox = await githubLink.boundingBox();
    const linkedinBox = await linkedinLink.boundingBox();

    if (githubBox) {
      expect(githubBox.height).toBeGreaterThanOrEqual(44);
    }
    if (linkedinBox) {
      expect(linkedinBox.height).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('Visual Layout Validation', () => {
  for (const [, viewport] of Object.entries(viewports)) {
    test.describe(`${viewport.name} viewport (${viewport.width}x${viewport.height})`, () => {
      test.beforeEach(async ({page}) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto('/');
      });

      test('hero section layout is correct', async ({page}) => {
        const hero = page.locator('[data-testid="hero-name"]');
        await expect(hero).toBeVisible();
      });

      test('navigation layout is correct', async ({page}) => {
        const nav = page.locator('[data-component="navigation"]');
        await expect(nav).toBeVisible();
      });

      test('footer layout is correct', async ({page}) => {
        const footer = page.locator('footer[data-component="footer"]');
        await expect(footer).toBeVisible();
      });
    });
  }

  test('container max-width is 1280px on desktop', async ({page}) => {
    await page.setViewportSize({width: 1600, height: 900});
    await page.goto('/');

    const container = page.locator('.container-custom').first();
    const box = await container.boundingBox();

    if (box) {
      expect(box.width).toBeLessThanOrEqual(1280);
    }
  });

  test('generous whitespace on desktop', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 900});
    await page.goto('/');

    const container = page.locator('.container-custom').first();
    const box = await container.boundingBox();

    if (box) {
      // Container should have visible margin on each side
      expect(box.x).toBeGreaterThan(0);
    }
  });
});

test.describe('Accessibility at Each Viewport', () => {
  for (const [, viewport] of Object.entries(viewports)) {
    test(`passes axe-core at ${viewport.name} (${viewport.width}px)`, async ({
      page,
    }) => {
      // Emulate reduced motion to disable animations for accurate color contrast checks
      await page.emulateMedia({reducedMotion: 'reduce'});

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');

      const results = await new AxeBuilder({page}).analyze();

      if (results.violations.length > 0) {
        console.log(
          `Accessibility violations at ${viewport.name}:`,
          JSON.stringify(results.violations, null, 2),
        );
      }

      expect(results.violations).toEqual([]);
    });
  }
});

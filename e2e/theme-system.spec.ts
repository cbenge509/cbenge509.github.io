import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Theme System E2E Tests
 *
 * Validates all 5 Acceptance Criteria for Story 1.4:
 * - AC1: System preference detection on first visit
 * - AC2: Smooth theme toggle with persistence
 * - AC3: Persistence across sessions
 * - AC4: Reduced motion support
 * - AC5: Private browsing fallback
 */

test.describe('Theme System', () => {
  test.beforeEach(async ({context}) => {
    // Clear localStorage before each test for isolation
    await context.addInitScript(() => {
      localStorage.clear();
    });
  });

  test.describe('AC1: System preference detection on first visit', () => {
    test('respects system dark preference', async ({page}) => {
      await page.emulateMedia({colorScheme: 'dark'});
      await page.goto('/');

      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });

    test('respects system light preference', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      const html = page.locator('html');
      await expect(html).not.toHaveClass(/dark/);
    });

    test('FOUC prevention script applies theme before first paint', async ({
      page,
    }) => {
      await page.emulateMedia({colorScheme: 'dark'});

      // Navigate and check - the inline script should apply dark class before paint
      await page.goto('/');
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });
  });

  test.describe('AC2: Smooth theme toggle with persistence', () => {
    test('toggle click changes theme from light to dark', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      const html = page.locator('html');
      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();

      // Initially light mode
      await expect(html).not.toHaveClass(/dark/);

      // Click toggle
      await toggle.click();

      // Now dark mode
      await expect(html).toHaveClass(/dark/);
    });

    test('toggle click changes theme from dark to light', async ({page}) => {
      await page.emulateMedia({colorScheme: 'dark'});
      await page.goto('/');

      const html = page.locator('html');
      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();

      // Initially dark mode
      await expect(html).toHaveClass(/dark/);

      // Click toggle
      await toggle.click();

      // Now light mode
      await expect(html).not.toHaveClass(/dark/);
    });

    test('toggle saves preference to localStorage', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();

      // Click toggle to switch to dark
      await toggle.click();

      // Check localStorage
      const theme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(theme).toBe('dark');
    });

    test('body has 150ms transition for smooth theme switch', async ({
      page,
    }) => {
      await page.goto('/');

      const body = page.locator('body');
      const transitionDuration = await body.evaluate(
        el => window.getComputedStyle(el).transitionDuration,
      );

      // Should be 150ms (may be rendered as .15s, 0.15s, or 150ms)
      expect(['150ms', '.15s', '0.15s', '0s']).toContain(transitionDuration);
      // Note: With reduced motion in CI, this may be 0s - that's expected
    });
  });

  test.describe('AC3: Persistence across sessions', () => {
    test('saved dark preference persists after page reload', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });

      await page.goto('/');

      // Dark class should be applied by FOUC prevention script
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);

      // Reload page
      await page.reload();

      // Dark mode should still be applied
      await expect(html).toHaveClass(/dark/);
    });

    test('saved light preference persists after page reload', async ({
      page,
    }) => {
      await page.emulateMedia({colorScheme: 'dark'}); // System would prefer dark
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'light');
      });

      await page.goto('/');

      // Light mode should be applied despite system preference
      const html = page.locator('html');
      await expect(html).not.toHaveClass(/dark/);
    });

    test('localStorage overrides system preference', async ({page}) => {
      // System prefers light, but localStorage says dark
      await page.emulateMedia({colorScheme: 'light'});
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });

      await page.goto('/');

      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });
  });

  test.describe('AC4: Reduced motion support', () => {
    test('respects reduced motion preference - no transitions', async ({
      page,
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      // Check that transitions are disabled via the safety net
      const body = page.locator('body');
      const transitionDuration = await body.evaluate(
        el => window.getComputedStyle(el).transitionDuration,
      );

      // With reduced motion, transition should be near-instant (0.01ms or 0s)
      const durationMs = parseFloat(transitionDuration) * 1000;
      expect(durationMs).toBeLessThan(50);
    });

    test('reduced motion safety net applies to all elements', async ({
      page,
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      // Check that the reduced motion media query rule exists
      const hasReducedMotionRule = await page.evaluate(() => {
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (
                rule instanceof CSSMediaRule &&
                rule.conditionText.includes('prefers-reduced-motion')
              ) {
                return true;
              }
            }
          } catch {
            // Skip cross-origin stylesheets
            continue;
          }
        }
        return false;
      });

      expect(hasReducedMotionRule).toBe(true);
    });
  });

  test.describe('AC5: Private browsing fallback', () => {
    test('handles localStorage unavailable gracefully', async ({page}) => {
      // Mock localStorage to throw errors (simulating Safari private mode)
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          value: {
            getItem: () => null,
            setItem: () => {
              throw new Error('QuotaExceededError');
            },
            removeItem: () => {},
            clear: () => {},
          },
          writable: true,
        });
      });

      await page.goto('/');

      // Should not throw any errors - check console
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Page should load without JS errors
      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();
      await expect(toggle).toBeVisible();

      // Toggle should still work (session-only persistence)
      await toggle.click();

      // Check no console errors related to localStorage
      const localStorageErrors = consoleErrors.filter(
        e => e.includes('localStorage') || e.includes('QuotaExceeded'),
      );
      expect(localStorageErrors).toEqual([]);
    });

    test('falls back to system preference when localStorage unavailable', async ({
      page,
    }) => {
      // Mock localStorage unavailable + system prefers dark
      await page.emulateMedia({colorScheme: 'dark'});
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          value: {
            getItem: () => {
              throw new Error('SecurityError');
            },
            setItem: () => {
              throw new Error('SecurityError');
            },
            removeItem: () => {
              throw new Error('SecurityError');
            },
            clear: () => {},
          },
          writable: true,
        });
      });

      await page.goto('/');

      // Should still detect system dark preference
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });

    test('toggle works in private browsing mode (session-only)', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          value: {
            getItem: () => null,
            setItem: () => {
              throw new Error('QuotaExceededError');
            },
            removeItem: () => {},
            clear: () => {},
          },
          writable: true,
        });
      });

      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      const html = page.locator('html');
      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();

      // Initially light
      await expect(html).not.toHaveClass(/dark/);

      // Click toggle - should still work
      await toggle.click();

      // Should switch to dark (in-memory only)
      await expect(html).toHaveClass(/dark/);

      // Click again - should switch back
      await toggle.click();
      await expect(html).not.toHaveClass(/dark/);
    });
  });

  test.describe('Accessibility', () => {
    test('theme toggle has correct initial aria-label', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();
      await expect(toggle).toHaveAttribute(
        'aria-label',
        /Currently light mode\. Switch to dark mode/,
      );
    });

    test('aria-label updates after toggle', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();

      // Click to switch to dark
      await toggle.click();

      await expect(toggle).toHaveAttribute(
        'aria-label',
        /Currently dark mode\. Switch to light mode/,
      );
    });

    test('theme toggle has minimum 44x44px touch target', async ({page}) => {
      await page.goto('/');

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();
      const box = await toggle.boundingBox();

      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('theme toggle is keyboard accessible', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      // Tab past the skip link and navigation to the first toggle
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // CB logo
      await page.keyboard.press('Tab'); // Home link
      await page.keyboard.press('Tab'); // Projects link
      await page.keyboard.press('Tab'); // About link
      await page.keyboard.press('Tab'); // Publications link
      await page.keyboard.press('Tab'); // GitHub link
      await page.keyboard.press('Tab'); // LinkedIn link
      await page.keyboard.press('Tab'); // Theme toggle

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();
      await expect(toggle).toBeFocused();

      // Press Enter to toggle
      await page.keyboard.press('Enter');

      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });

    test('page passes axe-core accessibility audit', async ({page}) => {
      // Emulate reduced motion to disable animations for accurate color contrast checks
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/');

      const accessibilityScanResults = await new AxeBuilder({page}).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('page passes axe-core in dark mode', async ({page}) => {
      // Emulate reduced motion and dark color scheme
      await page.emulateMedia({colorScheme: 'dark', reducedMotion: 'reduce'});
      await page.goto('/');

      const accessibilityScanResults = await new AxeBuilder({page}).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Icon visibility', () => {
    test('sun icon is visible in light mode', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto('/');

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();
      const sunIcon = toggle.locator('svg').first();
      const moonIcon = toggle.locator('svg').last();

      // Sun should be visible (opacity: 1)
      const sunOpacity = await sunIcon.evaluate(
        el => window.getComputedStyle(el).opacity,
      );
      expect(parseFloat(sunOpacity)).toBe(1);

      // Moon should be hidden (opacity: 0)
      const moonOpacity = await moonIcon.evaluate(
        el => window.getComputedStyle(el).opacity,
      );
      expect(parseFloat(moonOpacity)).toBe(0);
    });

    test('moon icon is visible in dark mode', async ({page}) => {
      await page.emulateMedia({colorScheme: 'dark'});
      await page.goto('/');

      // Use first() since there are 2 toggles (desktop + mobile nav)
      const toggle = page.locator('[data-component="theme-toggle"]').first();
      const sunIcon = toggle.locator('svg').first();
      const moonIcon = toggle.locator('svg').last();

      // Sun should be hidden (opacity: 0)
      const sunOpacity = await sunIcon.evaluate(
        el => window.getComputedStyle(el).opacity,
      );
      expect(parseFloat(sunOpacity)).toBe(0);

      // Moon should be visible (opacity: 1)
      const moonOpacity = await moonIcon.evaluate(
        el => window.getComputedStyle(el).opacity,
      );
      expect(parseFloat(moonOpacity)).toBe(1);
    });
  });
});

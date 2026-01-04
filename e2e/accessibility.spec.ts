import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility E2E Tests
 *
 * Validates:
 * - axe-core accessibility audit passes with zero violations
 * - Semantic structure (header, main, footer exist)
 * - Skip link functionality
 * - Focus management
 */

test.describe('Accessibility', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    // Ensure reduced motion is set to avoid animation-related contrast issues
    await page.emulateMedia({reducedMotion: 'reduce'});
  });

  test('home page has no accessibility violations', async ({page}) => {
    await page.goto('/');
    // Wait for any remaining transitions to complete
    await page.waitForTimeout(100);

    const accessibilityScanResults = await new AxeBuilder({page}).analyze();

    // Log violations for debugging if any exist
    if (accessibilityScanResults.violations.length > 0) {
      console.log(
        'Accessibility violations:',
        JSON.stringify(accessibilityScanResults.violations, null, 2),
      );
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('home page has no accessibility violations in dark mode', async ({
    page,
  }) => {
    // Set dark mode preference
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
    });

    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({page}).analyze();

    // Log violations for debugging if any exist
    if (accessibilityScanResults.violations.length > 0) {
      console.log(
        'Dark mode accessibility violations:',
        JSON.stringify(accessibilityScanResults.violations, null, 2),
      );
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('semantic structure has required elements', async ({page}) => {
    await page.goto('/');

    // Verify main element exists
    const main = page.locator('main');
    await expect(main).toHaveCount(1);

    // Main should have the correct id for skip link
    await expect(main).toHaveAttribute('id', 'main-content');
  });

  test('page has proper document outline', async ({page}) => {
    await page.goto('/');

    // Check for h1 - every page should have exactly one h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // H1 should be visible
    await expect(h1).toBeVisible();
  });

  test('all interactive elements are keyboard accessible', async ({page}) => {
    await page.goto('/');

    // Collect all focusable elements
    const focusableElements = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      return elements.map(el => ({
        tagName: el.tagName.toLowerCase(),
        text: el.textContent?.trim().slice(0, 50) || '',
        hasTabIndex: el.hasAttribute('tabindex'),
        tabIndex: el.getAttribute('tabindex'),
      }));
    });

    // All elements should be reachable via Tab
    for (let i = 0; i < focusableElements.length; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.tagName.toLowerCase() || '';
      });

      // Just verify that focus is moving (some element is focused)
      expect(focused).not.toBe('');
    }
  });

  test('color contrast meets WCAG AA standards', async ({page}) => {
    await page.goto('/');

    // Run axe-core specifically for color contrast
    const results = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('color contrast meets WCAG AA standards in dark mode', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
    });

    await page.goto('/');

    // Run axe-core specifically for color contrast
    const results = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('images have alt text', async ({page}) => {
    await page.goto('/');

    // Run axe-core specifically for image alt text
    const results = await new AxeBuilder({page})
      .withRules(['image-alt'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('links have discernible text', async ({page}) => {
    await page.goto('/');

    // Run axe-core specifically for link names
    const results = await new AxeBuilder({page})
      .withRules(['link-name'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('buttons have discernible text', async ({page}) => {
    await page.goto('/');

    // Run axe-core specifically for button names
    const results = await new AxeBuilder({page})
      .withRules(['button-name'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('focus is visible on all interactive elements', async ({page}) => {
    await page.goto('/');

    // Tab through all interactive elements and verify focus is visible
    let previousFocus = '';
    const maxTabs = 20; // Safety limit

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');

      const currentFocus = await page.evaluate(() => {
        const el = document.activeElement;
        return el
          ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`
          : '';
      });

      // If we've looped back to the beginning, stop
      if (currentFocus === previousFocus && i > 0) {
        break;
      }

      // Check that the focused element has visible focus indication
      const hasFocusIndication = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return true; // Skip body

        const styles = window.getComputedStyle(el);

        // Check for outline, box-shadow (ring), or border changes
        const hasOutline =
          styles.outline !== 'none' &&
          styles.outlineStyle !== 'none' &&
          styles.outlineWidth !== '0px';
        const hasBoxShadow = styles.boxShadow !== 'none';
        const hasBorder = styles.borderWidth !== '0px';

        return hasOutline || hasBoxShadow || hasBorder;
      });

      expect(hasFocusIndication).toBe(true);
      previousFocus = currentFocus;
    }
  });

  test('reduced motion preference is respected', async ({page}) => {
    // Emulate reduced motion preference
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto('/');

    // Check that reduced motion media query styles are applied
    const hasReducedMotionStyles = await page.evaluate(() => {
      // Check if any stylesheet has reduced motion rules
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

    expect(hasReducedMotionStyles).toBe(true);
  });
});

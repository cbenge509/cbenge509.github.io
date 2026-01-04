import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Design System E2E Tests
 *
 * Validates:
 * - Typography tokens are applied correctly
 * - Color system works in light/dark modes
 * - Focus rings are visible for accessibility
 * - Reduced motion is respected
 */

test.describe('Design System Foundation', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
  });

  test('typography tokens are applied correctly', async ({page}) => {
    await page.goto('/');

    // Verify font families are loaded
    const body = page.locator('body');
    const fontFamily = await body.evaluate(
      el => window.getComputedStyle(el).fontFamily,
    );

    // Inter should be in the font stack
    expect(fontFamily.toLowerCase()).toContain('inter');
  });

  test('color system works in light mode', async ({page}) => {
    await page.goto('/');

    // Force light mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    const html = page.locator('html');

    // Check CSS custom properties are defined
    // Note: Browser may compute #ffffff as #fff
    const bgColor = await html.evaluate(el => {
      return getComputedStyle(el).getPropertyValue('--color-bg').trim();
    });

    expect(['#ffffff', '#fff']).toContain(bgColor);
  });

  test('color system works in dark mode', async ({page}) => {
    await page.goto('/');

    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    });

    const html = page.locator('html');

    // Check CSS custom properties are defined
    const bgDarkColor = await html.evaluate(el => {
      return getComputedStyle(el).getPropertyValue('--color-bg-dark').trim();
    });

    expect(bgDarkColor).toBe('#0a0a0a');
  });

  test('focus ring utility provides visible focus', async ({page}) => {
    await page.goto('/');

    // Add a test button with focus-ring class
    await page.evaluate(() => {
      const button = document.createElement('button');
      button.className = 'focus-ring';
      button.textContent = 'Test Button';
      button.style.padding = '10px 20px';
      document.body.appendChild(button);
    });

    const button = page.locator('button:has-text("Test Button")');

    // Focus the button directly (keyboard navigation tested separately)
    // Note: Page may have other focusable elements (e.g., ThemeToggle) so direct focus is more reliable
    await button.focus();

    // Verify the button is focused
    await expect(button).toBeFocused();

    // M1 Fix: Verify focus ring styles are actually applied
    const focusStyles = await button.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        outlineStyle: styles.outlineStyle,
        // Ring is rendered via box-shadow in Tailwind
        boxShadow: styles.boxShadow,
      };
    });

    // Focus-visible applies ring via box-shadow, outline should be none
    expect(focusStyles.outlineStyle).toBe('none');
    // Box-shadow should contain the ring (not 'none')
    expect(focusStyles.boxShadow).not.toBe('none');
  });

  test('focus-ring-inset utility works for contained elements', async ({
    page,
  }) => {
    await page.goto('/');

    // Add a test input with focus-ring-inset class
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.className = 'focus-ring-inset';
      input.type = 'text';
      input.placeholder = 'Test Input';
      input.style.padding = '10px';
      input.style.border = '1px solid #ccc';
      document.body.appendChild(input);
    });

    const input = page.locator('input[placeholder="Test Input"]');

    // Focus the input
    await input.focus();

    // Verify the input is focused
    await expect(input).toBeFocused();

    // Verify inset ring styles are applied
    const focusStyles = await input.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        outlineStyle: styles.outlineStyle,
        boxShadow: styles.boxShadow,
      };
    });

    expect(focusStyles.outlineStyle).toBe('none');
    // Inset ring should be applied via box-shadow
    expect(focusStyles.boxShadow).not.toBe('none');
  });

  test('reduced motion media query is defined', async ({page}) => {
    await page.goto('/');

    // Check that reduced motion styles exist in the document
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

  test('passes accessibility checks', async ({page}) => {
    // Emulate reduced motion to disable animations for accurate color contrast checks
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({page}).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('typography classes are available and use correct fonts', async ({
    page,
  }) => {
    await page.goto('/');

    // Inject test elements with typography classes in a unique container
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'typography-test-container';
      container.innerHTML = `
        <h1 class="text-display-lg">Display Large</h1>
        <h2 class="text-display">Display</h2>
        <h3 class="text-display-sm">Display Small</h3>
        <p class="text-body">Body text</p>
        <p class="text-body-lg">Body large</p>
        <span class="text-caption">Caption text</span>
      `;
      document.body.appendChild(container);
    });

    // Use container scope to avoid conflicts with Navigation elements
    const testContainer = page.locator('#typography-test-container');

    // M5 Fix: Verify ALL display classes use Space Grotesk
    const displayLg = testContainer.locator('.text-display-lg');
    const displayLgFont = await displayLg.evaluate(
      el => window.getComputedStyle(el).fontFamily,
    );
    expect(displayLgFont.toLowerCase()).toContain('space grotesk');

    const display = testContainer.locator('.text-display');
    const displayFont = await display.evaluate(
      el => window.getComputedStyle(el).fontFamily,
    );
    expect(displayFont.toLowerCase()).toContain('space grotesk');

    const displaySm = testContainer.locator('.text-display-sm');
    const displaySmFont = await displaySm.evaluate(
      el => window.getComputedStyle(el).fontFamily,
    );
    expect(displaySmFont.toLowerCase()).toContain('space grotesk');

    // Verify body classes use Inter
    const body = testContainer.locator('.text-body').first();
    const bodyFont = await body.evaluate(
      el => window.getComputedStyle(el).fontFamily,
    );
    expect(bodyFont.toLowerCase()).toContain('inter');
  });

  test('prose class provides readable content styles', async ({page}) => {
    await page.goto('/');

    // Inject a prose container with content
    await page.evaluate(() => {
      const article = document.createElement('article');
      article.className = 'prose';
      article.innerHTML = `
        <h1>Prose Heading</h1>
        <p>This is a paragraph of prose content that should have optimal line length.</p>
        <h2>Subheading</h2>
        <p>More content here.</p>
      `;
      document.body.appendChild(article);
    });

    const prose = page.locator('.prose');

    // Verify prose styles are applied
    const proseStyles = await prose.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        maxWidth: styles.maxWidth,
        lineHeight: styles.lineHeight,
        fontFamily: styles.fontFamily,
      };
    });

    // Max-width should be 65ch for optimal readability
    // Browser computes ch to px, so check it's a reasonable value (600-700px for 65ch at 16px base)
    const maxWidthPx = parseFloat(proseStyles.maxWidth);
    expect(maxWidthPx).toBeGreaterThan(500);
    expect(maxWidthPx).toBeLessThan(800);
    // Line-height should be 1.7 (computed as unitless or px)
    expect(parseFloat(proseStyles.lineHeight)).toBeGreaterThanOrEqual(1.5);
    // Font family should be Inter
    expect(proseStyles.fontFamily.toLowerCase()).toContain('inter');

    // Verify prose heading uses Space Grotesk
    const proseH1 = page.locator('.prose h1');
    const proseH1Font = await proseH1.evaluate(
      el => window.getComputedStyle(el).fontFamily,
    );
    expect(proseH1Font.toLowerCase()).toContain('space grotesk');
  });

  test('dark mode theme persists after page reload', async ({page}) => {
    // Override the beforeEach's addInitScript by adding our own that sets dark mode
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
    });

    await page.goto('/');

    // Verify dark class is applied by the FOUC prevention script
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);

    // Reload the page
    await page.reload();

    // Verify dark mode persists after reload
    // The FOUC prevention script should apply dark class before paint
    const hasDarkClassAfterReload = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClassAfterReload).toBe(true);

    // Verify localStorage still has dark theme
    const storedTheme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });
    expect(storedTheme).toBe('dark');
  });

  test('spacing tokens are defined', async ({page}) => {
    await page.goto('/');

    // Check that spacing custom properties are defined
    const sectionSpacing = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--spacing-section')
        .trim();
    });

    expect(sectionSpacing).toBe('6rem');
  });

  test('transition tokens are defined', async ({page}) => {
    await page.goto('/');

    // Check that transition timing custom properties are defined
    // Note: Browser may compute 150ms as .15s or 0.15s
    const transitionFast = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--transition-fast')
        .trim();
    });

    expect(['150ms', '.15s', '0.15s']).toContain(transitionFast);
  });
});

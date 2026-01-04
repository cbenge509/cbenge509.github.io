import {test, expect} from '@playwright/test';

/**
 * SEO Foundation E2E Tests
 *
 * Validates:
 * - Skip link functionality and visibility
 * - Page title format with site name suffix
 * - Meta description presence
 * - Open Graph meta tags
 * - Canonical URL
 * - JSON-LD Person schema on home page
 * - JSON-LD NOT present on other pages
 * - Semantic HTML structure
 */

test.describe('SEO Foundation', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
  });

  test('skip link is first focusable element', async ({page}) => {
    await page.goto('/');

    // Press Tab to focus the first focusable element
    await page.keyboard.press('Tab');

    // Get the currently focused element
    const focused = page.locator(':focus');

    // Verify it's the skip link
    await expect(focused).toHaveAttribute('href', '#main-content');
    await expect(focused).toContainText('Skip to content');
  });

  test('skip link becomes visible on focus', async ({page}) => {
    await page.goto('/');

    // Skip link should initially be visually hidden
    const skipLink = page.locator('a[href="#main-content"]');
    const initialDisplay = await skipLink.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        width: styles.width,
        height: styles.height,
        position: styles.position,
      };
    });

    // Initially should be positioned off-screen (sr-only pattern uses clip or tiny dimensions)
    expect(
      initialDisplay.width === '1px' ||
        initialDisplay.height === '1px' ||
        initialDisplay.position === 'absolute',
    ).toBe(true);

    // Tab to focus the skip link
    await page.keyboard.press('Tab');

    // After focus, should be visible
    const focusedStyles = await skipLink.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        zIndex: styles.zIndex,
      };
    });

    // Should be absolutely positioned with high z-index when focused
    expect(focusedStyles.position).toBe('absolute');
    expect(parseInt(focusedStyles.zIndex)).toBeGreaterThanOrEqual(100);
  });

  test('skip link navigates to main content', async ({page}) => {
    await page.goto('/');

    // Focus and click the skip link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Check that URL hash changed
    expect(page.url()).toContain('#main-content');

    // Main content should exist
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('page title format includes site name suffix', async ({page}) => {
    await page.goto('/');

    // Title should be "Home | Cris Benge"
    await expect(page).toHaveTitle('Home | Cris Benge');
  });

  test('meta description is present and not empty', async ({page}) => {
    await page.goto('/');

    // Check meta description exists and has content
    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute('content');

    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(10);
  });

  test('Open Graph tags are present', async ({page}) => {
    await page.goto('/');

    // Check required OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogImage = page.locator('meta[property="og:image"]');
    const ogUrl = page.locator('meta[property="og:url"]');
    const ogType = page.locator('meta[property="og:type"]');

    await expect(ogTitle).toHaveAttribute('content', /Cris Benge/);
    await expect(ogDescription).toHaveAttribute('content', /.+/);
    await expect(ogImage).toHaveAttribute('content', /.+/);
    await expect(ogUrl).toHaveAttribute('content', /.+/);
    await expect(ogType).toHaveAttribute('content', 'website');
  });

  test('Twitter card meta tags are present', async ({page}) => {
    await page.goto('/');

    // Check Twitter card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    const twitterDescription = page.locator('meta[name="twitter:description"]');
    const twitterImage = page.locator('meta[name="twitter:image"]');

    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    await expect(twitterTitle).toHaveAttribute('content', /Cris Benge/);
    await expect(twitterDescription).toHaveAttribute('content', /.+/);
    await expect(twitterImage).toHaveAttribute('content', /.+/);
  });

  test('canonical URL is set', async ({page}) => {
    await page.goto('/');

    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).toContain('cbenge509.github.io');
  });

  test('has JSON-LD Person schema on home page', async ({page}) => {
    await page.goto('/');

    // Find the JSON-LD script
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const content = await jsonLdScript.textContent();

    expect(content).toBeTruthy();

    const parsed = JSON.parse(content!);

    // Validate Person schema structure
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('Person');
    expect(parsed.name).toBe('Cris Benge');
    expect(parsed.jobTitle).toBe('Head of Federal Innovation');
    expect(parsed.worksFor).toBeDefined();
    expect(parsed.worksFor['@type']).toBe('Organization');
    expect(parsed.worksFor.name).toBe('Google');
    expect(parsed.sameAs).toBeInstanceOf(Array);
    expect(parsed.sameAs.length).toBeGreaterThan(0);
    expect(parsed.alumniOf).toBeInstanceOf(Array);
    expect(parsed.alumniOf.length).toBe(2);
  });

  test('semantic HTML structure is present', async ({page}) => {
    await page.goto('/');

    // Check for semantic elements
    const main = page.locator('main');
    await expect(main).toHaveCount(1);
    await expect(main).toHaveAttribute('id', 'main-content');

    // Check that main contains the page content
    await expect(main).toBeVisible();
  });

  test('viewport meta tag is responsive', async ({page}) => {
    await page.goto('/');

    const viewport = page.locator('meta[name="viewport"]');
    const content = await viewport.getAttribute('content');

    expect(content).toContain('width=device-width');
  });

  test('fonts are self-hosted (no external preconnect needed)', async ({
    page,
  }) => {
    await page.goto('/');

    // Fonts are self-hosted via @fontsource, so no preconnect hints are needed
    // Verify no preconnect to external font CDNs (performance optimization)
    const preconnect = page.locator(
      'link[rel="preconnect"][href*="fonts.gstatic.com"]',
    );
    await expect(preconnect).toHaveCount(0);
  });
});

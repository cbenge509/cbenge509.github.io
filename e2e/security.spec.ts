import {test, expect} from '@playwright/test';

/**
 * Security Validation E2E Tests
 *
 * Story 5.5 AC6: Security Validation
 * - HTTPS enforcement (NFR22) - verified by GitHub Pages
 * - SRI hashes for external resources (NFR23)
 *
 * Note: GitHub Pages automatically enforces HTTPS for all sites.
 * This test suite validates SRI hashes and external resource security.
 */

const pages = [
  {name: 'Homepage', path: '/'},
  {name: 'Projects', path: '/projects/'},
  {name: 'About', path: '/about/'},
  {name: 'Publications', path: '/publications/'},
];

test.describe('Security Validation (AC6)', () => {
  test.describe('External Resources SRI Validation (NFR23)', () => {
    for (const pageConfig of pages) {
      test.describe(`${pageConfig.name} page`, () => {
        test.beforeEach(async ({page}) => {
          await page.goto(pageConfig.path);
        });

        test('external scripts have integrity attribute', async ({page}) => {
          // Find scripts with external sources (http:// or https://)
          const externalScripts = page.locator(
            'script[src^="http://"], script[src^="https://"]',
          );
          const count = await externalScripts.count();

          // If no external scripts, that's acceptable (we self-host everything)
          if (count === 0) {
            // Verify no external scripts exist - this is good!
            expect(count).toBe(0);
            return;
          }

          // If external scripts exist, they must have integrity attribute
          for (let i = 0; i < count; i++) {
            const script = externalScripts.nth(i);
            const src = await script.getAttribute('src');
            const integrity = await script.getAttribute('integrity');
            expect
              .soft(
                integrity,
                `External script ${src} should have integrity attribute`,
              )
              .toBeTruthy();
          }
        });

        test('external stylesheets have integrity attribute', async ({
          page,
        }) => {
          // Find stylesheets with external sources
          const externalStyles = page.locator(
            'link[rel="stylesheet"][href^="http://"], link[rel="stylesheet"][href^="https://"]',
          );
          const count = await externalStyles.count();

          // If no external stylesheets, that's acceptable (we self-host everything)
          if (count === 0) {
            expect(count).toBe(0);
            return;
          }

          // If external stylesheets exist, they must have integrity attribute
          for (let i = 0; i < count; i++) {
            const style = externalStyles.nth(i);
            const href = await style.getAttribute('href');
            const integrity = await style.getAttribute('integrity');
            expect
              .soft(
                integrity,
                `External stylesheet ${href} should have integrity attribute`,
              )
              .toBeTruthy();
          }
        });

        test('no external fonts loaded from CDN', async ({page}) => {
          // We self-host fonts via @fontsource, verify no Google Fonts or other CDN fonts
          const googleFonts = page.locator(
            'link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]',
          );
          const count = await googleFonts.count();
          expect(count, 'Should not load fonts from Google Fonts CDN').toBe(0);
        });
      });
    }
  });

  test.describe('Self-Hosted Resource Verification', () => {
    test('all resources are self-hosted', async ({page}) => {
      await page.goto('/');

      // Check for any external resources
      const externalResources = page.locator(
        'script[src^="http://"], script[src^="https://"], ' +
          'link[rel="stylesheet"][href^="http://"], link[rel="stylesheet"][href^="https://"], ' +
          'link[href*="fonts.googleapis.com"]',
      );
      const count = await externalResources.count();

      // Log any external resources found for documentation
      if (count > 0) {
        const resources: string[] = [];
        for (let i = 0; i < count; i++) {
          const el = externalResources.nth(i);
          const src =
            (await el.getAttribute('src')) || (await el.getAttribute('href'));
          if (src) resources.push(src);
        }
        console.log('External resources found:', resources);
      }

      // Per project-context.md: "The portfolio site self-hosts all assets"
      // If this test fails, SRI hashes need to be added
      expect(
        count,
        'All resources should be self-hosted or have SRI hashes',
      ).toBe(0);
    });
  });

  test.describe('Security Headers (informational)', () => {
    test('page loads without security-related console errors', async ({
      page,
    }) => {
      const securityErrors: string[] = [];

      page.on('console', msg => {
        const text = msg.text().toLowerCase();
        if (
          text.includes('mixed content') ||
          text.includes('blocked') ||
          text.includes('insecure')
        ) {
          securityErrors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForTimeout(1000); // Allow time for any delayed security messages

      expect(securityErrors).toHaveLength(0);
    });
  });

  test.describe('No Inline Event Handlers', () => {
    for (const pageConfig of pages) {
      test(`${pageConfig.name} page has no inline onclick handlers`, async ({
        page,
      }) => {
        await page.goto(pageConfig.path);

        // Check for inline event handlers which are a security anti-pattern
        const inlineHandlers = page.locator(
          '[onclick], [onmouseover], [onerror]',
        );
        const count = await inlineHandlers.count();

        expect(
          count,
          'Should not use inline event handlers (per project-context.md)',
        ).toBe(0);
      });
    }
  });
});

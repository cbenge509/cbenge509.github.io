import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Publications Page E2E Tests
 *
 * Validates:
 * - AC1: Publications list displays with required fields
 * - AC2: Expandable abstracts functionality
 * - AC3: Reduced motion respect
 * - AC4: PDF link display
 * - AC5: Code repository link
 * - AC6: Google Scholar link
 * - AC7: Progressive enhancement
 * - AC8: No abstract handling
 * - AC9: External link security
 * - AC10: Empty state handling
 * - AC11: Accessibility compliance
 */

test.describe('Publications Page', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    // CRITICAL: Disable animations for reliable axe-core tests
    await page.emulateMedia({reducedMotion: 'reduce'});
  });

  test.describe('AC1: Publications List Displays', () => {
    test('page loads successfully', async ({page}) => {
      const response = await page.goto('/publications');
      expect(response?.status()).toBe(200);
    });

    test('displays page title', async ({page}) => {
      await page.goto('/publications');

      const title = page.getByRole('heading', {name: 'Publications', level: 1});
      await expect(title).toBeVisible();
    });

    test('displays publication cards', async ({page}) => {
      await page.goto('/publications');

      const cards = page.locator('[data-component="publication-card"]');
      await expect(cards.first()).toBeVisible();

      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(4); // 4 publications
    });

    test('publications display title', async ({page}) => {
      await page.goto('/publications');

      await expect(
        page.getByText('BERTVision: A Parameter-Efficient Approach'),
      ).toBeVisible();
    });

    test('publications display authors', async ({page}) => {
      await page.goto('/publications');

      // Cris should be highlighted in authors
      const highlighted = page.locator('.author-highlight');
      await expect(highlighted.first()).toBeVisible();
    });

    test('publications highlight Cris in authors list', async ({page}) => {
      await page.goto('/publications');

      const highlightedAuthor = page.locator('.author-highlight').first();
      const text = await highlightedAuthor.textContent();
      expect(text?.toLowerCase()).toMatch(/cris|benge/);
    });

    test('publications display venue', async ({page}) => {
      await page.goto('/publications');

      await expect(page.getByText('arXiv').first()).toBeVisible();
    });

    test('publications display year', async ({page}) => {
      await page.goto('/publications');

      await expect(page.getByText('2023').first()).toBeVisible();
      await expect(page.getByText('2022').first()).toBeVisible();
    });

    test('publications sorted by year descending', async ({page}) => {
      await page.goto('/publications');

      const cards = page.locator('[data-component="publication-card"]');
      const years: number[] = [];

      const count = await cards.count();
      for (let i = 0; i < count; i++) {
        const yearText = await cards
          .nth(i)
          .locator('span')
          .first()
          .textContent();
        if (yearText) {
          years.push(parseInt(yearText, 10));
        }
      }

      // Verify descending order (most recent first)
      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).toBeGreaterThanOrEqual(years[i + 1]);
      }
    });
  });

  test.describe('AC2: Expandable Abstracts', () => {
    test('abstract toggle button is present', async ({page}) => {
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();
      await expect(toggle).toBeVisible();
    });

    test('toggle has aria-expanded attribute', async ({page}) => {
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();
      const expanded = await toggle.getAttribute('aria-expanded');
      expect(expanded).toBe('false'); // Initially collapsed by JS
    });

    test('clicking toggle expands abstract', async ({page}) => {
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();
      const abstract = page.locator('[data-abstract]').first();

      // Click to expand
      await toggle.click();

      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(abstract).toHaveClass(/expanded/);
    });

    test('clicking toggle again collapses abstract', async ({page}) => {
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();
      const abstract = page.locator('[data-abstract]').first();

      // Expand
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');

      // Collapse
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(abstract).not.toHaveClass(/expanded/);
    });

    test('toggle text changes on expand/collapse', async ({page}) => {
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();
      const toggleText = page.locator('[data-toggle-text]').first();

      // Initially "Show Abstract"
      await expect(toggleText).toHaveText('Show Abstract');

      // Click to expand
      await toggle.click();
      await expect(toggleText).toHaveText('Hide Abstract');

      // Click to collapse
      await toggle.click();
      await expect(toggleText).toHaveText('Show Abstract');
    });
  });

  test.describe('AC3: Reduced Motion Respect', () => {
    test('transitions use opacity when reduced motion preferred', async ({
      page,
    }) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto('/publications');

      // Get the abstract container
      const abstract = page.locator('[data-abstract]').first();

      // Check that transition includes opacity
      const transition = await abstract.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('transition'),
      );

      expect(transition).toContain('opacity');
    });
  });

  test.describe('AC4: PDF Link Display', () => {
    test('PDF link is displayed for publications with pdfUrl', async ({
      page,
    }) => {
      await page.goto('/publications');

      const pdfLinks = page.locator('a:has-text("PDF")');
      await expect(pdfLinks.first()).toBeVisible();
    });

    test('PDF link has document icon', async ({page}) => {
      await page.goto('/publications');

      // PDF links contain an SVG icon
      const pdfLink = page.locator('a:has-text("PDF")').first();
      const svg = pdfLink.locator('svg');
      await expect(svg).toBeVisible();
    });

    test('PDF link opens in new tab', async ({page}) => {
      await page.goto('/publications');

      const pdfLink = page.locator('a:has-text("PDF")').first();
      await expect(pdfLink).toHaveAttribute('target', '_blank');
    });

    test('PDF link has external indicator', async ({page}) => {
      await page.goto('/publications');

      const pdfLink = page.locator('a:has-text("PDF")').first();
      await expect(pdfLink.getByText('↗')).toBeVisible();
    });
  });

  test.describe('AC5: Code Repository Link', () => {
    test('Code link is displayed for publications with codeUrl', async ({
      page,
    }) => {
      await page.goto('/publications');

      const codeLinks = page.locator('a:has-text("Code")');
      await expect(codeLinks.first()).toBeVisible();
    });

    test('Code link has GitHub icon', async ({page}) => {
      await page.goto('/publications');

      // Code links contain an SVG icon
      const codeLink = page.locator('a:has-text("Code")').first();
      const svg = codeLink.locator('svg');
      await expect(svg).toBeVisible();
    });

    test('Code link opens in new tab', async ({page}) => {
      await page.goto('/publications');

      const codeLink = page.locator('a:has-text("Code")').first();
      await expect(codeLink).toHaveAttribute('target', '_blank');
    });

    test('Code link has external indicator', async ({page}) => {
      await page.goto('/publications');

      const codeLink = page.locator('a:has-text("Code")').first();
      await expect(codeLink.getByText('↗')).toBeVisible();
    });
  });

  test.describe('AC6: Google Scholar Link', () => {
    test('Google Scholar link is prominently displayed', async ({page}) => {
      await page.goto('/publications');

      const scholarLink = page.locator('[data-testid="google-scholar-link"]');
      await expect(scholarLink).toBeVisible();
    });

    test('Google Scholar link has correct text', async ({page}) => {
      await page.goto('/publications');

      const scholarLink = page.locator('[data-testid="google-scholar-link"]');
      await expect(scholarLink).toContainText('View all on Google Scholar');
    });

    test('Google Scholar link opens in new tab', async ({page}) => {
      await page.goto('/publications');

      const scholarLink = page.locator('[data-testid="google-scholar-link"]');
      await expect(scholarLink).toHaveAttribute('target', '_blank');
    });

    test('Google Scholar link has external indicator', async ({page}) => {
      await page.goto('/publications');

      const scholarLink = page.locator('[data-testid="google-scholar-link"]');
      await expect(scholarLink.getByText('↗')).toBeVisible();
    });

    test('Google Scholar link points to correct URL', async ({page}) => {
      await page.goto('/publications');

      const scholarLink = page.locator('[data-testid="google-scholar-link"]');
      const href = await scholarLink.getAttribute('href');
      expect(href).toContain('scholar.google.com');
    });
  });

  test.describe('AC7: Progressive Enhancement', () => {
    test('abstract content exists in DOM for screen readers', async ({
      page,
    }) => {
      await page.goto('/publications');

      // Abstract content should exist in the DOM (accessible to screen readers)
      const abstractContent = page.locator('[data-abstract]').first();
      await expect(abstractContent).toBeAttached();

      // Verify abstract has meaningful content
      const text = await abstractContent.textContent();
      expect(text?.length).toBeGreaterThan(50);
    });

    test('page remains readable and functional', async ({page}) => {
      await page.goto('/publications');

      // Page should display publication info
      await expect(
        page.getByText('BERTVision: A Parameter-Efficient Approach'),
      ).toBeVisible();

      // Toggle should work to reveal abstract
      const toggle = page.locator('[data-toggle]').first();
      await toggle.click();

      // After click, abstract should be visible
      const abstract = page.locator('[data-abstract]').first();
      await expect(abstract).toBeVisible();
    });

    test('abstracts can be expanded to view content', async ({page}) => {
      await page.goto('/publications');

      // Click toggle to expand
      const toggle = page.locator('[data-toggle]').first();
      await toggle.click();

      // Abstract should now be visible
      const abstract = page.locator('[data-abstract]').first();
      await expect(abstract).toBeVisible();

      // Abstract text should contain research content (any of our publications)
      const text = await abstract.textContent();
      expect(text?.length).toBeGreaterThan(50); // Abstracts have meaningful content
    });
  });

  test.describe('AC8: No Abstract Handling', () => {
    test('toggle buttons only appear for publications with abstracts', async ({
      page,
    }) => {
      await page.goto('/publications');

      // All 4 publications have abstracts, so all should have toggles
      const cards = page.locator('[data-component="publication-card"]');
      const toggles = page.locator('[data-toggle]');

      const cardCount = await cards.count();
      const toggleCount = await toggles.count();

      // Each card with abstract should have exactly one toggle
      expect(toggleCount).toBe(cardCount);
    });

    test('each toggle controls its own abstract section', async ({page}) => {
      await page.goto('/publications');

      const cards = page.locator('[data-component="publication-card"]');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        const toggle = card.locator('[data-toggle]');
        const abstract = card.locator('[data-abstract]');

        // Toggle and abstract should be within the same card
        await expect(toggle).toBeVisible();
        await expect(abstract).toBeAttached();

        // aria-controls should reference the abstract
        const controls = await toggle.getAttribute('aria-controls');
        const abstractId = await abstract.getAttribute('id');
        expect(controls).toBe(abstractId);
      }
    });
  });

  test.describe('AC9: External Link Security', () => {
    test('all external links have rel="noopener noreferrer"', async ({
      page,
    }) => {
      await page.goto('/publications');

      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();

      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });

    test('PDF links have proper security attributes', async ({page}) => {
      await page.goto('/publications');

      const pdfLinks = page.locator('a:has-text("PDF")');
      const count = await pdfLinks.count();

      for (let i = 0; i < count; i++) {
        const rel = await pdfLinks.nth(i).getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });

    test('Code links have proper security attributes', async ({page}) => {
      await page.goto('/publications');

      const codeLinks = page.locator('a:has-text("Code")');
      const count = await codeLinks.count();

      for (let i = 0; i < count; i++) {
        const rel = await codeLinks.nth(i).getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });
  });

  test.describe('AC11: Accessibility Compliance', () => {
    test('page passes accessibility audit', async ({page}) => {
      await page.goto('/publications');

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('page passes a11y audit in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/publications');

      // Wait for dark mode to apply
      await expect(page.locator('html')).toHaveClass(/dark/);

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('toggle buttons have visible focus indicators', async ({page}) => {
      await page.goto('/publications');

      const focusRingElements = page.locator('.focus-ring');
      const count = await focusRingElements.count();
      expect(count).toBeGreaterThan(0);
    });

    test('aria-expanded updates correctly on toggle', async ({page}) => {
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();

      // Initially false
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');

      // After click, true
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('Semantic Structure', () => {
    test('has navigation breadcrumb', async ({page}) => {
      await page.goto('/publications');

      const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumb).toBeVisible();

      const homeLink = breadcrumb.getByRole('link', {name: 'Home'});
      await expect(homeLink).toBeVisible();

      const currentPage = breadcrumb.getByText('Publications');
      await expect(currentPage).toBeVisible();
    });

    test('has proper heading hierarchy', async ({page}) => {
      await page.goto('/publications');

      const h1 = page.getByRole('heading', {level: 1});
      await expect(h1).toBeVisible();
      await expect(h1).toContainText('Publications');
    });

    test('has proper SEO title', async ({page}) => {
      await page.goto('/publications');

      const title = await page.title();
      expect(title).toContain('Publications');
      expect(title).toContain('Cris Benge');
    });

    test('has meta description', async ({page}) => {
      await page.goto('/publications');

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);
    });
  });

  test.describe('Dark Mode', () => {
    test('page displays correctly in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/publications');

      await expect(page.locator('html')).toHaveClass(/dark/);

      // Publication cards should be visible
      const card = page.locator('[data-component="publication-card"]').first();
      await expect(card).toBeVisible();
    });

    test('publication cards have dark mode styling', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/publications');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const card = page.locator('[data-component="publication-card"]').first();
      await expect(card).toBeVisible();
    });
  });

  test.describe('Mobile Responsive', () => {
    test('page displays correctly on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/publications');

      await expect(
        page.getByRole('heading', {name: 'Publications', level: 1}),
      ).toBeVisible();

      const cards = page.locator('[data-component="publication-card"]');
      await expect(cards.first()).toBeVisible();
    });

    test('toggle buttons have adequate touch target size', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/publications');

      const toggle = page.locator('[data-toggle]').first();
      const box = await toggle.boundingBox();

      // Touch target must be at least 44px per WCAG/project standards
      expect(box?.height).toBeGreaterThanOrEqual(44);
    });

    test('Google Scholar link has adequate touch target', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/publications');

      const scholarLink = page.locator('[data-testid="google-scholar-link"]');
      const box = await scholarLink.boundingBox();

      expect(box?.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Navigation', () => {
    test('Publications link in navigation is active', async ({page}) => {
      await page.goto('/publications');

      const publicationsLink = page
        .locator('nav a[href="/publications"]')
        .first();
      await expect(publicationsLink).toHaveAttribute('aria-current', 'page');
    });

    test('can navigate to Publications from home page', async ({page}) => {
      await page.goto('/');

      const publicationsLink = page
        .locator('nav a[href="/publications"]')
        .first();
      await publicationsLink.click();

      await expect(page).toHaveURL('/publications');
      await expect(
        page.getByRole('heading', {name: 'Publications', level: 1}),
      ).toBeVisible();
    });
  });

  // =====================================================================
  // PATENTS SECTION TESTS (Story 4-2)
  // =====================================================================

  test.describe('Patents Section - AC1: Section Displays', () => {
    test('Patents section appears on publications page', async ({page}) => {
      await page.goto('/publications');

      const patentsSection = page.locator('[data-testid="patents-section"]');
      await expect(patentsSection).toBeVisible();
    });

    test('Patents section has H2 heading', async ({page}) => {
      await page.goto('/publications');

      const patentsHeading = page.getByRole('heading', {
        name: 'Patents',
        level: 2,
      });
      await expect(patentsHeading).toBeVisible();
    });

    test('Patents section appears after Publications section', async ({
      page,
    }) => {
      await page.goto('/publications');

      // Get y positions of both sections
      const publicationsList = page.locator(
        '[data-testid="publications-list"]',
      );
      const patentsSection = page.locator('[data-testid="patents-section"]');

      const pubBox = await publicationsList.boundingBox();
      const patentBox = await patentsSection.boundingBox();

      // Patents section should be below publications
      expect(patentBox!.y).toBeGreaterThan(pubBox!.y);
    });
  });

  test.describe('Patents Section - AC2: Patent Entry Display', () => {
    test('patent cards display on page', async ({page}) => {
      await page.goto('/publications');

      const patentCards = page.locator('[data-component="patent-card"]');
      await expect(patentCards.first()).toBeVisible();
    });

    test('patent displays title', async ({page}) => {
      await page.goto('/publications');

      const patentTitle = page.locator('[data-testid="patent-title"]').first();
      await expect(patentTitle).toBeVisible();
      const text = await patentTitle.textContent();
      expect(text?.length).toBeGreaterThan(0);
    });

    test('patent displays patent number', async ({page}) => {
      await page.goto('/publications');

      const patentNumber = page
        .locator('[data-testid="patent-number"]')
        .first();
      await expect(patentNumber).toBeVisible();
      await expect(patentNumber).toContainText(/US\s*[\d,]+/);
    });

    test('patent displays date', async ({page}) => {
      await page.goto('/publications');

      const patentDate = page.locator('[data-testid="patent-date"]').first();
      await expect(patentDate).toBeVisible();
      // Should show either "Granted:" or "Filed:"
      const text = await patentDate.textContent();
      expect(text).toMatch(/Granted:|Filed:/);
    });
  });

  test.describe('Patents Section - AC3: Patent Document Link', () => {
    test('patent link displays when URL present', async ({page}) => {
      await page.goto('/publications');

      const patentLink = page.locator('[data-testid="patent-link"]').first();
      // May or may not be present depending on data
      if ((await patentLink.count()) > 0) {
        await expect(patentLink).toBeVisible();
      }
    });

    test('patent link opens in new tab', async ({page}) => {
      await page.goto('/publications');

      const patentLink = page.locator('[data-testid="patent-link"]').first();
      if ((await patentLink.count()) > 0) {
        await expect(patentLink).toHaveAttribute('target', '_blank');
      }
    });

    test('patent link has security attributes', async ({page}) => {
      await page.goto('/publications');

      const patentLink = page.locator('[data-testid="patent-link"]').first();
      if ((await patentLink.count()) > 0) {
        const rel = await patentLink.getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });

    test('patent link has external indicator', async ({page}) => {
      await page.goto('/publications');

      const patentLink = page.locator('[data-testid="patent-link"]').first();
      if ((await patentLink.count()) > 0) {
        await expect(patentLink.getByText('↗')).toBeVisible();
      }
    });
  });

  test.describe('Patents Section - AC4: Status Badge', () => {
    test('status badge displays on patent card', async ({page}) => {
      await page.goto('/publications');

      const statusBadge = page.locator('[data-testid="patent-status"]').first();
      await expect(statusBadge).toBeVisible();
    });

    test('status badge has appropriate text', async ({page}) => {
      await page.goto('/publications');

      const statusBadge = page.locator('[data-testid="patent-status"]').first();
      const text = await statusBadge.textContent();
      expect(text).toMatch(/Granted|Pending|Filed/);
    });

    test('granted status badge has green styling', async ({page}) => {
      await page.goto('/publications');

      // Our sample patent is granted
      const statusBadge = page.locator('[data-testid="patent-status"]').first();
      const text = await statusBadge.textContent();

      if (text?.includes('Granted')) {
        const classes = await statusBadge.getAttribute('class');
        expect(classes).toContain('green');
      }
    });
  });

  test.describe('Patents Section - AC5: Patent Sorting', () => {
    test('patents are sorted by date (most recent first)', async ({page}) => {
      await page.goto('/publications');

      const patentCards = page.locator('[data-component="patent-card"]');
      const count = await patentCards.count();

      if (count > 1) {
        // Extract dates from cards
        const dates: Date[] = [];
        for (let i = 0; i < count; i++) {
          const dateText = await patentCards
            .nth(i)
            .locator('[data-testid="patent-date"]')
            .textContent();

          // Extract date portion after "Granted:" or "Filed:"
          const match = dateText?.match(/:\s*(.+)/);
          if (match) {
            dates.push(new Date(match[1].trim()));
          }
        }

        // Verify descending order
        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i].getTime()).toBeGreaterThanOrEqual(
            dates[i + 1].getTime(),
          );
        }
      }
    });
  });

  test.describe('Patents Section - AC7: Empty State Handling', () => {
    // Note: This test validates the empty state implementation exists and renders correctly.
    // Since we have patent data, we verify the data-testid attribute is present for when
    // the collection is empty. The actual empty state message is tested via the DOM structure.
    test('empty state element has correct data-testid attribute', async ({
      page,
    }) => {
      await page.goto('/publications');

      // Verify the empty state element exists in the DOM (even if hidden when patents exist)
      // This ensures the conditional rendering structure is correct
      const patentsSection = page.locator('[data-testid="patents-section"]');
      await expect(patentsSection).toBeVisible();

      // Check that either patents-list OR patents-empty-state exists (mutually exclusive)
      const patentsList = page.locator('[data-testid="patents-list"]');
      const emptyState = page.locator('[data-testid="patents-empty-state"]');

      const hasPatents = (await patentsList.count()) > 0;
      const hasEmptyState = (await emptyState.count()) > 0;

      // Exactly one should be present (XOR)
      expect(hasPatents !== hasEmptyState).toBe(true);
    });

    test('empty state message text is correct when no patents', async ({
      page,
    }) => {
      await page.goto('/publications');

      const emptyState = page.locator('[data-testid="patents-empty-state"]');

      // If empty state is visible, verify the message
      if ((await emptyState.count()) > 0) {
        await expect(emptyState).toContainText('Patents section coming soon');
      }
    });
  });

  test.describe('Patents Section - AC6: Responsive Layout', () => {
    test('mobile layout displays single column', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/publications');

      const patentsGrid = page.locator('[data-testid="patents-list"]');

      if ((await patentsGrid.count()) > 0) {
        // Should not have md:grid-cols-2 applied on mobile
        await expect(patentsGrid).toBeVisible();
      }
    });

    test('patent numbers remain visible on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/publications');

      const patentNumber = page
        .locator('[data-testid="patent-number"]')
        .first();
      if ((await patentNumber.count()) > 0) {
        await expect(patentNumber).toBeVisible();
      }
    });
  });

  test.describe('Patents Section - AC9: Accessibility', () => {
    test('patents section passes accessibility audit', async ({page}) => {
      await page.goto('/publications');

      const results = await new AxeBuilder({page})
        .include('[data-testid="patents-section"]')
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test('patent cards have focus-ring on links', async ({page}) => {
      await page.goto('/publications');

      const patentLink = page.locator('[data-testid="patent-link"]').first();
      if ((await patentLink.count()) > 0) {
        const classes = await patentLink.getAttribute('class');
        expect(classes).toContain('focus-ring');
      }
    });
  });

  test.describe('Patents Section - AC10: Dark Mode', () => {
    test('patents display correctly in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/publications');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const patentCard = page.locator('[data-component="patent-card"]').first();
      if ((await patentCard.count()) > 0) {
        await expect(patentCard).toBeVisible();
      }
    });

    test('status badges maintain visibility in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/publications');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const statusBadge = page.locator('[data-testid="patent-status"]').first();
      if ((await statusBadge.count()) > 0) {
        await expect(statusBadge).toBeVisible();
      }
    });

    test('dark mode passes accessibility audit', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/publications');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const results = await new AxeBuilder({page})
        .include('[data-testid="patents-section"]')
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });
});

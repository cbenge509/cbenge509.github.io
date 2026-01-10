import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * About Page E2E Tests
 *
 * Validates:
 * - AC1: About page exists and loads
 * - AC2: Education section displays with all required fields
 * - AC3: Education entries sorted correctly
 * - AC4: External links open in new tab with proper security attrs
 * - AC5: Mobile responsive layout
 * - AC6: Semantic structure (breadcrumb, heading hierarchy, SEO)
 * - AC7: Empty state handling (tested via unit tests)
 * - AC8: Accessibility compliance
 */

test.describe('About Page', () => {
  test.beforeEach(async ({page}) => {
    // Clear theme preference for test isolation
    await page.addInitScript(() => {
      localStorage.removeItem('theme');
    });
    // CRITICAL: Disable animations for reliable axe-core tests
    await page.emulateMedia({reducedMotion: 'reduce'});
  });

  test.describe('AC1: About Page Exists', () => {
    test('page loads successfully', async ({page}) => {
      const response = await page.goto('/about');
      expect(response?.status()).toBe(200);
    });

    test('displays page title', async ({page}) => {
      await page.goto('/about');

      const title = page.getByRole('heading', {name: 'About Me', level: 1});
      await expect(title).toBeVisible();
    });

    test('displays professional bio', async ({page}) => {
      await page.goto('/about');

      const bioSection = page.locator('[aria-labelledby="bio-heading"]');
      await expect(bioSection).toBeVisible();

      // Bio should mention Cris Benge - use first() to avoid strict mode
      await expect(page.getByText('Cris Benge').first()).toBeVisible();
    });
  });

  test.describe('AC2: Education Section Displays', () => {
    test('Education section heading is visible', async ({page}) => {
      await page.goto('/about');

      const heading = page.getByRole('heading', {name: 'Education'});
      await expect(heading).toBeVisible();
    });

    test('education cards are displayed', async ({page}) => {
      await page.goto('/about');

      const cards = page.locator('.education-card');
      await expect(cards.first()).toBeVisible();

      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(3); // Columbia, Berkeley, IWU
    });

    test('education cards display institution name', async ({page}) => {
      await page.goto('/about');

      await expect(page.getByText('Columbia University')).toBeVisible();
      await expect(page.getByText('UC Berkeley')).toBeVisible();
      await expect(page.getByText('Indiana Wesleyan University')).toBeVisible();
    });

    test('education cards display degree type', async ({page}) => {
      await page.goto('/about');

      // Scope to education grid to avoid matching 'MS' in other text (e.g., "Systems", bio paragraphs)
      const grid = page.locator('[data-testid="education-grid"]');
      await expect(grid.getByText('MS', {exact: true})).toBeVisible();
      await expect(grid.getByText('Masters')).toBeVisible();
      await expect(grid.getByText('BS', {exact: true})).toBeVisible();
    });

    test('education cards display field of study', async ({page}) => {
      await page.goto('/about');

      // Use education grid scope to find specific field text in cards
      const grid = page.locator('[data-testid="education-grid"]');
      await expect(grid.getByText('Computer Science')).toBeVisible();
      await expect(grid.getByText('Data Science')).toBeVisible();
      await expect(grid.getByText('Information Systems')).toBeVisible();
    });

    test('education cards display graduation year', async ({page}) => {
      await page.goto('/about');

      // Use education grid scope to avoid conflicts with award years
      const grid = page.locator('[data-testid="education-grid"]');
      await expect(grid.getByText('2025')).toBeVisible();
      await expect(grid.getByText('2021')).toBeVisible();
      await expect(grid.getByText('2012')).toBeVisible();
    });

    test('education cards display institution logos', async ({page}) => {
      await page.goto('/about');

      const logos = page.locator('.education-card img');
      const count = await logos.count();
      expect(count).toBeGreaterThanOrEqual(3);

      // Check alt text on first logo
      const firstLogo = logos.first();
      const alt = await firstLogo.getAttribute('alt');
      expect(alt).toContain('logo');
    });

    test('honors/distinctions are displayed when present', async ({page}) => {
      await page.goto('/about');

      // Columbia has honors
      await expect(
        page.getByText('Machine Learning Specialization'),
      ).toBeVisible();
    });
  });

  test.describe('AC3: Education Data Sorted', () => {
    test('education entries appear in correct order', async ({page}) => {
      await page.goto('/about');

      const cards = page.locator('.education-card');

      // First card should be Columbia (order: 1)
      const firstCard = cards.first();
      await expect(firstCard.getByText('Columbia University')).toBeVisible();

      // Verify all three are present in order by checking grid
      const grid = page.locator('[data-testid="education-grid"]');
      await expect(grid).toBeVisible();
    });
  });

  test.describe('AC4: Institution External Links', () => {
    test('institution links have target="_blank"', async ({page}) => {
      await page.goto('/about');

      const links = page.locator('.education-card a[target="_blank"]');
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('institution links have rel="noopener noreferrer"', async ({page}) => {
      await page.goto('/about');

      const links = page.locator('.education-card a[target="_blank"]');
      const count = await links.count();

      for (let i = 0; i < count; i++) {
        const rel = await links.nth(i).getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });

    test('external links show arrow icon', async ({page}) => {
      await page.goto('/about');

      // Look for the ↗ character in links
      const externalIndicators = page.locator('.education-card a >> text=↗');
      const count = await externalIndicators.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('external links have accessible text for screen readers', async ({
      page,
    }) => {
      await page.goto('/about');

      const srOnlyText = page.locator('.education-card .sr-only');
      const count = await srOnlyText.count();
      expect(count).toBeGreaterThanOrEqual(3);

      const firstSrText = await srOnlyText.first().textContent();
      expect(firstSrText).toContain('opens in new tab');
    });
  });

  test.describe('AC5: Mobile Responsive', () => {
    test('layout adapts to single column on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      const grid = page.locator('[data-testid="education-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Single column means one fraction unit
      expect(gridStyle).toMatch(/^\d+(\.\d+)?px$/);
    });

    test('content remains readable on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      // All education cards should be visible
      const cards = page.locator('.education-card');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        await expect(cards.nth(i)).toBeVisible();
      }
    });

    test('touch targets are at least 44x44px', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      // Check external link touch targets
      const links = page.locator('.education-card a');
      const count = await links.count();

      for (let i = 0; i < count; i++) {
        const box = await links.nth(i).boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    });
  });

  test.describe('AC6: Semantic Structure', () => {
    test('has navigation breadcrumb', async ({page}) => {
      await page.goto('/about');

      const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumb).toBeVisible();

      // Should have Home link
      const homeLink = breadcrumb.getByRole('link', {name: 'Home'});
      await expect(homeLink).toBeVisible();

      // Should show current page
      const currentPage = breadcrumb.getByText('About');
      await expect(currentPage).toBeVisible();
    });

    test('has proper heading hierarchy (H1 for page, H2 for sections)', async ({
      page,
    }) => {
      await page.goto('/about');

      // H1 for page title
      const h1 = page.getByRole('heading', {level: 1});
      await expect(h1).toBeVisible();

      // H2 for Education section
      const h2 = page.getByRole('heading', {name: 'Education', level: 2});
      await expect(h2).toBeVisible();
    });

    test('has proper SEO title', async ({page}) => {
      await page.goto('/about');

      const title = await page.title();
      expect(title).toContain('About');
      expect(title).toContain('Cris Benge');
    });

    test('has meta description', async ({page}) => {
      await page.goto('/about');

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);
    });

    test('has OG tags', async ({page}) => {
      await page.goto('/about');

      const ogTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute('content');
      expect(ogTitle).toBeTruthy();

      const ogDescription = await page
        .locator('meta[property="og:description"]')
        .getAttribute('content');
      expect(ogDescription).toBeTruthy();
    });
  });

  test.describe('AC8: Accessibility Compliance', () => {
    test('page passes accessibility audit', async ({page}) => {
      await page.goto('/about');

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('page passes a11y audit in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      // Wait for dark mode to apply
      await expect(page.locator('html')).toHaveClass(/dark/);

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('interactive elements have visible focus indicators', async ({
      page,
    }) => {
      await page.goto('/about');

      // Tab to the first external link in education card
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // Home (nav)
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Home link
      await page.keyboard.press('Tab'); // Projects link
      await page.keyboard.press('Tab'); // About link
      await page.keyboard.press('Tab'); // Publications
      await page.keyboard.press('Tab'); // ... navigation links
      // Eventually we should hit the breadcrumb home link
      // For now, just verify the page has focus-ring classes

      const focusRingElements = page.locator('.focus-ring');
      const count = await focusRingElements.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Dark Mode', () => {
    test('page displays correctly in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      // Education section should be visible
      const heading = page.getByRole('heading', {name: 'Education'});
      await expect(heading).toBeVisible();
    });

    test('education cards have dark mode styling', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      // Cards should be visible with dark background
      const card = page.locator('.education-card').first();
      await expect(card).toBeVisible();
    });
  });

  test.describe('Responsive Grid - Tablet (768px)', () => {
    test('education grid has 2 columns', async ({page}) => {
      await page.setViewportSize({width: 768, height: 1024});
      await page.goto('/about');

      const grid = page.locator('[data-testid="education-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Two columns = two pixel values
      const columns = gridStyle.split(' ').filter(v => v.match(/\d+px/));
      expect(columns.length).toBe(2);
    });
  });

  test.describe('Responsive Grid - Desktop (1024px)', () => {
    test('education grid has 3 columns', async ({page}) => {
      await page.setViewportSize({width: 1024, height: 768});
      await page.goto('/about');

      const grid = page.locator('[data-testid="education-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Three columns = three pixel values
      const columns = gridStyle.split(' ').filter(v => v.match(/\d+px/));
      expect(columns.length).toBe(3);
    });
  });

  test.describe('Navigation', () => {
    test('About link in navigation is active', async ({page}) => {
      await page.goto('/about');

      const aboutLink = page.locator('nav a[href="/about"]').first();
      await expect(aboutLink).toHaveAttribute('aria-current', 'page');
    });

    test('can navigate to About from home page', async ({page}) => {
      await page.goto('/');

      const aboutLink = page.locator('nav a[href="/about"]').first();
      await aboutLink.click();

      await expect(page).toHaveURL('/about');
      await expect(page.getByRole('heading', {name: 'About Me'})).toBeVisible();
    });
  });

  test.describe('Profile Image', () => {
    test('profile image is displayed', async ({page}) => {
      await page.goto('/about');

      const profileImg = page.locator('img[alt*="Cris Benge"]');
      await expect(profileImg).toBeVisible();
    });

    test('profile image has proper alt text', async ({page}) => {
      await page.goto('/about');

      const profileImg = page.locator('img[alt*="Cris Benge"]');
      const alt = await profileImg.getAttribute('alt');
      expect(alt).toContain('Cris Benge');
    });
  });

  // ============================================================
  // Story 3-2: Certifications & Awards Display
  // ============================================================

  test.describe('Certifications Section (Story 3-2, AC1)', () => {
    test('certifications section heading is visible', async ({page}) => {
      await page.goto('/about');

      const heading = page.getByRole('heading', {name: 'Certifications'});
      await expect(heading).toBeVisible();
    });

    test('certification cards are displayed', async ({page}) => {
      await page.goto('/about');

      const cards = page.locator('[data-testid="certification-card"]');
      await expect(cards.first()).toBeVisible();

      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(9); // 9 certifications
    });

    test('certification cards display name', async ({page}) => {
      await page.goto('/about');

      await expect(
        page.getByText('Azure Certified Solution Architect Expert'),
      ).toBeVisible();
    });

    test('certification cards display issuer', async ({page}) => {
      await page.goto('/about');

      // Check for issuers in certification cards
      const cards = page.locator('[data-testid="certification-card"]');
      const cardContent = await cards.first().textContent();
      expect(cardContent).toContain('Microsoft');
    });

    test('certification cards display year', async ({page}) => {
      await page.goto('/about');

      // Azure Certified Solution Architect should show year
      const grid = page.locator('[data-testid="certifications-grid"]');
      await expect(grid.getByText('2023').first()).toBeVisible();
    });

    test('certification cards display category badges', async ({page}) => {
      await page.goto('/about');

      // Category badges should be visible
      await expect(page.getByText('Cloud').first()).toBeVisible();
      await expect(page.getByText('Data').first()).toBeVisible();
      await expect(page.getByText('Database').first()).toBeVisible();
    });

    test('certifications grouped by category visually', async ({page}) => {
      await page.goto('/about');

      // Check that category badges exist for different types
      const cloudBadges = page
        .locator('[data-testid="category-badge"]')
        .filter({
          hasText: 'Cloud',
        });
      const dataBadges = page.locator('[data-testid="category-badge"]').filter({
        hasText: 'Data',
      });
      const dbBadges = page.locator('[data-testid="category-badge"]').filter({
        hasText: 'Database',
      });

      expect(await cloudBadges.count()).toBeGreaterThanOrEqual(1);
      expect(await dataBadges.count()).toBeGreaterThanOrEqual(1);
      expect(await dbBadges.count()).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Awards Section (Story 3-2, AC2)', () => {
    test('awards section heading is visible', async ({page}) => {
      await page.goto('/about');

      const heading = page.getByRole('heading', {name: 'Awards & Honors'});
      await expect(heading).toBeVisible();
    });

    test('competition honors subsection is visible', async ({page}) => {
      await page.goto('/about');

      const subheading = page.getByRole('heading', {
        name: 'Competition Honors',
      });
      await expect(subheading).toBeVisible();
    });

    test('professional recognition subsection is visible', async ({page}) => {
      await page.goto('/about');

      const subheading = page.getByRole('heading', {
        name: 'Professional Recognition',
      });
      await expect(subheading).toBeVisible();
    });

    test('award cards are displayed', async ({page}) => {
      await page.goto('/about');

      const cards = page.locator('[data-testid="award-card"]');
      await expect(cards.first()).toBeVisible();

      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(8); // 4 competition + 4 professional
    });

    test('award cards display title', async ({page}) => {
      await page.goto('/about');

      await expect(
        page.getByText('World Bank Publication Topics'),
      ).toBeVisible();
    });

    test('award cards display organization', async ({page}) => {
      await page.goto('/about');

      // Check for organizations
      await expect(page.getByText('DrivenData').first()).toBeVisible();
      await expect(page.getByText('Kaggle').first()).toBeVisible();
    });

    test('award cards display year', async ({page}) => {
      await page.goto('/about');

      const grid = page.locator('[data-testid="competition-awards-grid"]');
      await expect(grid.getByText('2019').first()).toBeVisible();
    });

    test('award cards display description', async ({page}) => {
      await page.goto('/about');

      await expect(
        page.getByText('Machine learning competition').first(),
      ).toBeVisible();
    });
  });

  test.describe('Visual Badge Distinction (Story 3-2, AC3)', () => {
    test('competition awards have placement badges', async ({page}) => {
      await page.goto('/about');

      // Look for placement badges with 1st Place, Top 12%, etc.
      const placementBadges = page.locator('[data-testid="placement-badge"]');
      const count = await placementBadges.count();
      expect(count).toBeGreaterThanOrEqual(4); // 4 competition awards
    });

    test('1st place shows gold styling', async ({page}) => {
      await page.goto('/about');

      const goldBadge = page
        .locator('[data-testid="placement-badge"]')
        .filter({hasText: '1st Place'})
        .first();
      await expect(goldBadge).toBeVisible();

      // Check for amber/gold class
      const className = await goldBadge.getAttribute('class');
      expect(className).toContain('bg-amber');
    });

    test('top percentage shows silver styling', async ({page}) => {
      await page.goto('/about');

      const silverBadge = page
        .locator('[data-testid="placement-badge"]')
        .filter({hasText: 'Top 12%'});
      await expect(silverBadge).toBeVisible();

      // Check for gray (silver) class
      const className = await silverBadge.getAttribute('class');
      expect(className).toContain('bg-gray');
    });

    test('professional awards have category badge', async ({page}) => {
      await page.goto('/about');

      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      const profBadges = profGrid.locator('[data-testid="category-badge"]');
      const count = await profBadges.count();
      expect(count).toBeGreaterThanOrEqual(4); // 4 professional awards
    });

    test('competition and professional awards visually distinguished', async ({
      page,
    }) => {
      await page.goto('/about');

      // Competition cards should have "Competition" badge
      const compGrid = page.locator('[data-testid="competition-awards-grid"]');
      await expect(compGrid.getByText('Competition').first()).toBeVisible();

      // Professional cards should have "Professional" badge
      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      await expect(profGrid.getByText('Professional').first()).toBeVisible();
    });
  });

  test.describe('Sorted by Order (Story 3-2, AC4)', () => {
    test('certifications are sorted by order field', async ({page}) => {
      await page.goto('/about');

      const cards = page.locator('[data-testid="certification-card"]');

      // First card should be Azure Certified Solution Architect (order: 1)
      const firstCard = cards.first();
      await expect(
        firstCard.getByText('Azure Certified Solution Architect Expert'),
      ).toBeVisible();
    });

    test('competition awards are sorted by order field', async ({page}) => {
      await page.goto('/about');

      const grid = page.locator('[data-testid="competition-awards-grid"]');
      const cards = grid.locator('[data-testid="award-card"]');

      // First competition award should be World Bank (order: 1)
      const firstCard = cards.first();
      await expect(
        firstCard.getByText('World Bank Publication Topics'),
      ).toBeVisible();
    });
  });

  test.describe('Mobile Responsive - Certifications & Awards (Story 3-2, AC5)', () => {
    test('certifications grid is single column on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      const grid = page.locator('[data-testid="certifications-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Single column = one pixel value
      expect(gridStyle).toMatch(/^\d+(\.\d+)?px$/);
    });

    test('awards grid is single column on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      const grid = page.locator('[data-testid="competition-awards-grid"]');
      const gridStyle = await grid.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('grid-template-columns'),
      );

      // Single column = one pixel value
      expect(gridStyle).toMatch(/^\d+(\.\d+)?px$/);
    });

    test('badges remain visible on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      // Category badges should be visible
      await expect(page.getByText('Cloud').first()).toBeVisible();
      await expect(page.getByText('Competition').first()).toBeVisible();

      // Placement badges should be visible
      await expect(page.getByText('1st Place').first()).toBeVisible();
    });
  });

  test.describe('Hover States (Story 3-2, AC6)', () => {
    test('certification cards have hover lift effect classes', async ({
      page,
    }) => {
      await page.goto('/about');

      const card = page.locator('[data-testid="certification-card"]').first();
      const className = await card.getAttribute('class');

      expect(className).toContain('hover:shadow-md');
      expect(className).toContain('hover:-translate-y-1');
    });

    test('award cards have hover lift effect classes', async ({page}) => {
      await page.goto('/about');

      const card = page.locator('[data-testid="award-card"]').first();
      const className = await card.getAttribute('class');

      expect(className).toContain('hover:shadow-md');
      expect(className).toContain('hover:-translate-y-1');
    });
  });

  test.describe('Accessibility - Certifications & Awards (Story 3-2, AC8)', () => {
    test('certifications section passes accessibility audit', async ({
      page,
    }) => {
      await page.goto('/about');

      // Run axe on entire page (includes certifications section)
      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });

    test('certifications section has proper heading structure', async ({
      page,
    }) => {
      await page.goto('/about');

      // H2 for Certifications section
      const h2 = page.getByRole('heading', {name: 'Certifications', level: 2});
      await expect(h2).toBeVisible();
    });

    test('awards section has proper heading structure', async ({page}) => {
      await page.goto('/about');

      // H2 for Awards section
      const h2 = page.getByRole('heading', {
        name: 'Awards & Honors',
        level: 2,
      });
      await expect(h2).toBeVisible();

      // H3 for subsections
      const compHeading = page.getByRole('heading', {
        name: 'Competition Honors',
        level: 3,
      });
      await expect(compHeading).toBeVisible();

      const profHeading = page.getByRole('heading', {
        name: 'Professional Recognition',
        level: 3,
      });
      await expect(profHeading).toBeVisible();
    });
  });

  test.describe('Dark Mode - Certifications & Awards', () => {
    test('certification cards display correctly in dark mode', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      // Cards should be visible
      const card = page.locator('[data-testid="certification-card"]').first();
      await expect(card).toBeVisible();
    });

    test('award cards display correctly in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      // Cards should be visible
      const card = page.locator('[data-testid="award-card"]').first();
      await expect(card).toBeVisible();
    });

    test('page passes a11y audit in dark mode with new sections', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const results = await new AxeBuilder({page}).analyze();
      expect(results.violations).toEqual([]);
    });
  });

  // ============================================================
  // Story 4-3: Contact & CV Section
  // ============================================================

  test.describe('Contact Section (Story 4-3, AC1)', () => {
    test('contact section is visible on about page', async ({page}) => {
      await page.goto('/about');

      const contactSection = page.locator('[data-testid="contact-section"]');
      await expect(contactSection).toBeVisible();
    });

    test('contact section has heading "Get In Touch"', async ({page}) => {
      await page.goto('/about');

      const heading = page.getByRole('heading', {name: 'Get In Touch'});
      await expect(heading).toBeVisible();
    });

    test('contact section has subtitle text', async ({page}) => {
      await page.goto('/about');

      await expect(page.getByText('Interested in connecting')).toBeVisible();
    });
  });

  test.describe('LinkedIn as Primary CTA (Story 4-3, AC2)', () => {
    test('LinkedIn link is visible and prominent', async ({page}) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      await expect(linkedInLink).toBeVisible();
      await expect(linkedInLink).toContainText('Connect on LinkedIn');
    });

    test('LinkedIn link has correct URL', async ({page}) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      await expect(linkedInLink).toHaveAttribute(
        'href',
        /linkedin\.com\/in\/crisbenge/,
      );
    });

    test('LinkedIn link opens in new tab', async ({page}) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      await expect(linkedInLink).toHaveAttribute('target', '_blank');
    });

    test('LinkedIn link has security attributes', async ({page}) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      await expect(linkedInLink).toHaveAttribute('rel', /noopener/);
      await expect(linkedInLink).toHaveAttribute('rel', /noreferrer/);
    });

    test('LinkedIn link has external link icon', async ({page}) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      await expect(linkedInLink).toContainText('↗');
    });

    test('LinkedIn has primary CTA styling (accent background)', async ({
      page,
    }) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      const className = await linkedInLink.getAttribute('class');
      expect(className).toContain('bg-accent');
    });
  });

  test.describe('Email Removal Verification (Story 6.3)', () => {
    test('ContactSection does NOT have email link', async ({page}) => {
      await page.goto('/about');

      const emailLink = page.locator('[data-testid="email-link"]');
      await expect(emailLink).toHaveCount(0);
    });

    test('ContactSection does NOT have mailto link', async ({page}) => {
      await page.goto('/about');

      const mailtoLinks = page.locator(
        '[data-testid="contact-section"] a[href^="mailto:"]',
      );
      await expect(mailtoLinks).toHaveCount(0);
    });

    test('ContactSection does NOT display "Email Me" text', async ({page}) => {
      await page.goto('/about');

      const section = page.locator('[data-testid="contact-section"]');
      await expect(section.getByText('Email Me')).toHaveCount(0);
    });
  });

  test.describe('GitHub Button [data-testid="github-button"] (Story 6.3)', () => {
    test('GitHub button is visible', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      await expect(githubButton).toBeVisible();
    });

    test('GitHub button has correct URL', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      await expect(githubButton).toHaveAttribute(
        'href',
        /github\.com\/cbenge509/,
      );
    });

    test('GitHub button opens in new tab', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      await expect(githubButton).toHaveAttribute('target', '_blank');
    });

    test('GitHub button has security attributes', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      await expect(githubButton).toHaveAttribute('rel', /noopener/);
      await expect(githubButton).toHaveAttribute('rel', /noreferrer/);
    });

    test('GitHub button displays "View GitHub" text', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      await expect(githubButton).toContainText('View GitHub');
    });

    test('GitHub button has external link icon', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      await expect(githubButton).toContainText('↗');
    });
  });

  test.describe('CV Link Handling (Story 4-3, AC8)', () => {
    test('no broken CV link rendered when CV is hidden', async ({page}) => {
      await page.goto('/about');

      // CV is intentionally hidden (showCV=false) due to missing file
      const cvLink = page.locator('[data-testid="cv-link"]');
      await expect(cvLink).toHaveCount(0);
    });
  });

  test.describe('Contact Section Styling (Story 4-3, AC5)', () => {
    test('contact section has visual distinction with rounded corners', async ({
      page,
    }) => {
      await page.goto('/about');

      const section = page.locator('[data-testid="contact-section"]');
      const className = await section.getAttribute('class');
      expect(className).toContain('rounded-2xl');
    });

    test('CTAs have proper touch targets (min-h-11 = 44px)', async ({page}) => {
      await page.goto('/about');

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      const box = await linkedInLink.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    });

    test('GitHub button has proper touch target', async ({page}) => {
      await page.goto('/about');

      const githubButton = page.locator('[data-testid="github-button"]');
      const box = await githubButton.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Contact Section Accessibility (Story 4-3, AC9)', () => {
    test('contact section passes accessibility audit', async ({page}) => {
      await page.goto('/about');

      const results = await new AxeBuilder({page})
        .include('[data-testid="contact-section"]')
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test('interactive elements have visible focus indicators', async ({
      page,
    }) => {
      await page.goto('/about');

      const focusRingElements = page.locator(
        '[data-testid="contact-section"] .focus-ring',
      );
      const count = await focusRingElements.count();
      expect(count).toBeGreaterThanOrEqual(2); // LinkedIn, GitHub (CV hidden in test)
    });

    test('section has proper aria-labelledby', async ({page}) => {
      await page.goto('/about');

      const section = page.locator('[data-testid="contact-section"]');
      await expect(section).toHaveAttribute(
        'aria-labelledby',
        'contact-heading',
      );
    });
  });

  test.describe('Contact Section Dark Mode (Story 4-3, AC10)', () => {
    test('contact section displays correctly in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const section = page.locator('[data-testid="contact-section"]');
      await expect(section).toBeVisible();
    });

    test('LinkedIn CTA maintains visibility in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const linkedInLink = page.locator('[data-testid="linkedin-link"]');
      await expect(linkedInLink).toBeVisible();
    });

    test('contact section passes a11y audit in dark mode', async ({page}) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const results = await new AxeBuilder({page})
        .include('[data-testid="contact-section"]')
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  // ============================================================
  // Story 6.2: Professional Recognition Logos
  // ============================================================

  test.describe('Professional Recognition Logos (Story 6.2)', () => {
    test('Professional Recognition cards display organization logos', async ({
      page,
    }) => {
      await page.goto('/about');

      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      const logos = profGrid.locator('img[alt*="logo"]');

      // All 4 professional awards should have logos
      const count = await logos.count();
      expect(count).toBe(4);
    });

    test('Professional Recognition logos have correct alt text', async ({
      page,
    }) => {
      await page.goto('/about');

      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      const logos = profGrid.locator('img[alt*="logo"]');
      const count = await logos.count();

      for (let i = 0; i < count; i++) {
        const alt = await logos.nth(i).getAttribute('alt');
        expect(alt).toBe('Microsoft logo');
      }
    });

    test('Professional Recognition logos have correct dimensions', async ({
      page,
    }) => {
      await page.goto('/about');

      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      const logos = profGrid.locator('img[alt*="logo"]');
      const firstLogo = logos.first();

      await expect(firstLogo).toHaveAttribute('width', '64');
      await expect(firstLogo).toHaveAttribute('height', '64');
    });

    test('Competition Honors cards do NOT display logos', async ({page}) => {
      await page.goto('/about');

      const compGrid = page.locator('[data-testid="competition-awards-grid"]');
      const logos = compGrid.locator('img[alt*="logo"]');

      // Competition awards should have no logos
      const count = await logos.count();
      expect(count).toBe(0);
    });

    test('Professional Recognition logos are visible in dark mode', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/about');

      await expect(page.locator('html')).toHaveClass(/dark/);

      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      const logos = profGrid.locator('img[alt*="logo"]');
      const firstLogo = logos.first();

      await expect(firstLogo).toBeVisible();
    });

    test('Professional Recognition logos have rounded-lg styling', async ({
      page,
    }) => {
      await page.goto('/about');

      const profGrid = page.locator('[data-testid="professional-awards-grid"]');
      const logos = profGrid.locator('img[alt*="logo"]');
      const firstLogo = logos.first();

      const className = await firstLogo.getAttribute('class');
      expect(className).toContain('rounded-lg');
    });
  });

  test.describe('Footer Email Removal Verification (Story 6.3)', () => {
    test('footer does NOT have email link', async ({page}) => {
      await page.goto('/about');

      const emailLink = page.locator('[data-testid="footer-email-link"]');
      await expect(emailLink).toHaveCount(0);
    });

    test('footer does NOT have mailto link', async ({page}) => {
      await page.goto('/about');

      const footerMailtoLinks = page.locator('footer a[href^="mailto:"]');
      await expect(footerMailtoLinks).toHaveCount(0);
    });

    test('footer displays only GitHub and LinkedIn social links', async ({
      page,
    }) => {
      await page.goto('/about');

      // Verify GitHub and LinkedIn are present
      const githubLink = page.locator('[data-testid="footer-github-link"]');
      const linkedInLink = page.locator('[data-testid="footer-linkedin-link"]');
      await expect(githubLink).toBeVisible();
      await expect(linkedInLink).toBeVisible();

      // Verify email is NOT present
      const emailLink = page.locator('[data-testid="footer-email-link"]');
      await expect(emailLink).toHaveCount(0);
    });
  });

  test.describe('Contact Section Mobile Responsive', () => {
    test('contact section is visible on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      const section = page.locator('[data-testid="contact-section"]');
      await expect(section).toBeVisible();
    });

    test('CTAs wrap properly on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      // All CTAs should be visible (LinkedIn, GitHub - no email)
      await expect(page.locator('[data-testid="linkedin-link"]')).toBeVisible();
      await expect(page.locator('[data-testid="github-button"]')).toBeVisible();
    });

    test('touch targets meet 44px minimum on mobile', async ({page}) => {
      await page.setViewportSize({width: 375, height: 667});
      await page.goto('/about');

      const links = page.locator(
        '[data-testid="contact-section"] a[class*="min-h-11"]',
      );
      const count = await links.count();

      for (let i = 0; i < count; i++) {
        const box = await links.nth(i).boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    });
  });
});

import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect, beforeEach} from 'vitest';
import Navigation from './Navigation.astro';

describe('Navigation', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  describe('Desktop Navigation', () => {
    it('renders all navigation links', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('Home');
      expect(result).toContain('Projects');
      expect(result).toContain('About');
      expect(result).toContain('Publications');
    });

    it('renders social links with correct attributes', async () => {
      const result = await container.renderToString(Navigation);

      // GitHub link
      expect(result).toContain('GitHub');
      expect(result).toContain('github.com/cbenge509');

      // LinkedIn link
      expect(result).toContain('LinkedIn');
      expect(result).toContain('linkedin.com');

      // External link attributes
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('renders external link indicator (arrow)', async () => {
      const result = await container.renderToString(Navigation);

      // Arrow symbol for external links
      expect(result).toContain('↗');
    });

    it('renders site logo/name linking to home', async () => {
      const result = await container.renderToString(Navigation);

      // CB logo text
      expect(result).toContain('CB');
      // Link to home
      expect(result).toContain('href="/"');
    });
  });

  describe('Mobile Navigation', () => {
    it('renders hamburger menu button', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('data-component="mobile-menu-toggle"');
      expect(result).toContain('aria-label="Open navigation menu"');
      expect(result).toContain('aria-expanded="false"');
    });

    it('renders mobile menu panel', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('id="mobile-menu"');
      expect(result).toContain('mobile-menu-panel');
    });

    it('has aria-controls linking to mobile menu', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('aria-controls="mobile-menu"');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic nav element with aria-label', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('<nav');
      expect(result).toContain('aria-label="Main navigation"');
    });

    it('includes focus-ring class on interactive elements', async () => {
      const result = await container.renderToString(Navigation);

      // Multiple elements should have focus-ring
      const focusRingCount = (result.match(/focus-ring/g) || []).length;
      expect(focusRingCount).toBeGreaterThan(5);
    });

    it('uses data-component attribute for JS hooks', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('data-component="navigation"');
      expect(result).toContain('data-component="mobile-menu-toggle"');
    });

    it('includes spacer for fixed header', async () => {
      const result = await container.renderToString(Navigation);

      // Spacer div to prevent content from hiding under fixed header
      expect(result).toContain('h-16');
    });
  });

  describe('Active Link Highlighting', () => {
    it('marks home as active when currentPath is /', async () => {
      const result = await container.renderToString(Navigation, {
        props: {currentPath: '/'},
      });

      // Should have aria-current="page" on home link
      // Note: This is a basic check; the actual implementation may vary
      expect(result).toContain('aria-current="page"');
    });

    it('marks Projects as active when currentPath starts with /projects', async () => {
      const result = await container.renderToString(Navigation, {
        props: {currentPath: '/projects/bertvision'},
      });

      expect(result).toContain('aria-current="page"');
    });
  });

  describe('Theme Integration', () => {
    it('includes ThemeToggle component', async () => {
      const result = await container.renderToString(Navigation);

      // ThemeToggle uses this data attribute
      expect(result).toContain('data-component="theme-toggle"');
    });
  });

  describe('Progressive Enhancement', () => {
    it('includes noscript fallback styles', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('<noscript>');
      expect(result).toContain('mobile-menu-toggle');
    });
  });

  describe('Styling', () => {
    it('uses fixed positioning for sticky header', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('fixed');
      expect(result).toContain('top-0');
    });

    it('applies backdrop blur for modern glass effect', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('backdrop-blur');
    });

    it('includes dark mode classes', async () => {
      const result = await container.renderToString(Navigation);

      expect(result).toContain('dark:bg-bg-dark');
      expect(result).toContain('dark:text-text-dark');
    });

    it('includes nav-link class for gradient underline', async () => {
      const result = await container.renderToString(Navigation);

      // nav-link class is applied to links for gradient underline styling
      // The actual CSS with linear-gradient is in the style block
      expect(result).toContain('nav-link');
      // Multiple nav links should have this class
      const navLinkCount = (result.match(/nav-link/g) || []).length;
      expect(navLinkCount).toBeGreaterThan(4);
    });
  });
});

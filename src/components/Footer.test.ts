import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import Footer from './Footer.astro';

describe('Footer', () => {
  const currentYear = new Date().getFullYear();

  it('renders GitHub social link with correct href', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('href="https://github.com/cbenge509"');
    expect(result).toContain('GitHub');
  });

  it('renders LinkedIn social link with correct href', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('href="https://www.linkedin.com/in/crisbenge/"');
    expect(result).toContain('LinkedIn');
  });

  describe('email removal verification', () => {
    it('does NOT contain mailto link', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Footer);
      expect(result).not.toContain('mailto:');
    });

    it('does NOT contain email label', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Footer);
      expect(result).not.toContain('>Email<');
      expect(result).not.toContain('data-testid="footer-email-link"');
    });

    it('does NOT contain email aria-label', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Footer);
      expect(result).not.toContain('aria-label="Send email"');
    });
  });

  it('external links have target="_blank" attribute', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('target="_blank"');
  });

  it('external links have rel="noopener noreferrer" attribute', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('external links have arrow icons that are aria-hidden', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('aria-hidden="true"');
    expect(result).toContain('↗');
  });

  it('copyright notice contains current year', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    // HTML entity &copy; is rendered as-is in the raw HTML
    expect(result).toContain(`&copy; ${currentYear}`);
    expect(result).toContain('Cris Benge');
  });

  it('focus-ring class is applied to links', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('focus-ring');
  });

  it('footer has surface background class', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('bg-surface');
    expect(result).toContain('dark:bg-surface-dark');
  });

  it('footer has border-top for visual distinction', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('border-t');
    expect(result).toContain('border-border');
    expect(result).toContain('dark:border-border-dark');
  });

  it('social links have aria-label with opens in new tab text', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('aria-label="GitHub profile (opens in new tab)"');
    expect(result).toContain(
      'aria-label="LinkedIn profile (opens in new tab)"',
    );
  });

  it('has data-component attribute for JS targeting', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('data-component="footer"');
  });

  describe('Astro tech credit removal verification (Story 6.4)', () => {
    it('does NOT contain Built with text', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Footer);
      expect(result).not.toContain('Built with');
    });

    it('does NOT contain Astro link', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Footer);
      expect(result).not.toContain('href="https://astro.build"');
    });
  });

  it('has responsive layout classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    // Mobile: flex-col, Desktop: md:flex-row
    expect(result).toContain('flex-col');
    expect(result).toContain('md:flex-row');
  });

  it('has generous padding for Apple-style spacing', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('py-8');
    expect(result).toContain('md:py-12');
  });

  it('has container-custom for consistent layout', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('container-custom');
  });

  it('has footer-link class for gradient underline styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('footer-link');
  });

  it('applies custom class when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer, {
      props: {class: 'custom-footer-class'},
    });
    expect(result).toContain('custom-footer-class');
  });

  it('has social links navigation with aria-label', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('aria-label="Social links"');
  });

  it('dark mode classes are present for all colors', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);
    expect(result).toContain('dark:text-text-dark');
    expect(result).toContain('dark:hover:text-accent-dark');
  });
});

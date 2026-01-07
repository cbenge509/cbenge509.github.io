import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import Hero from './Hero.astro';

describe('Hero', () => {
  it('renders name correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('Cris Benge');
  });

  it('renders role correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('Head of Federal Innovation, Google');
  });

  it('renders credential badges', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('Columbia University');
    expect(result).toContain('UC Berkeley');
    expect(result).toContain('TS/SCI');
  });

  it('renders LinkedIn and GitHub CTAs', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('LinkedIn');
    expect(result).toContain('GitHub');
    expect(result).toContain('linkedin.com/in/crisbenge');
    expect(result).toContain('github.com/cbenge509');
  });

  it('external links have correct attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('external links have screen reader text', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('(opens in new tab)');
  });

  it('has proper heading structure', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    // h1 with id="hero-heading" contains the name
    expect(result).toMatch(
      /<h1[^>]*id="hero-heading"[^>]*>[\s\S]*Cris Benge[\s\S]*<\/h1>/,
    );
  });

  it('has aria-labelledby for accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('aria-labelledby="hero-heading"');
  });

  it('has animation classes for signature animation', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('hero-animate-name');
    expect(result).toContain('hero-animate-role');
    expect(result).toContain('hero-animate-credential');
    expect(result).toContain('hero-animate-ctas');
  });

  it('credential badges have staggered animation delays', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    // Credential badges animate after image (0-300ms) and name (100-500ms)
    // Starting at 500ms with 150ms stagger: 500ms, 650ms, 800ms
    expect(result).toContain('animation-delay: 500ms');
    expect(result).toContain('animation-delay: 650ms');
    expect(result).toContain('animation-delay: 800ms');
  });

  it('has data-testid attributes for testing', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('data-testid="hero-name"');
    expect(result).toContain('data-testid="hero-role"');
    expect(result).toContain('data-testid="hero-credentials"');
    expect(result).toContain('data-testid="hero-ctas"');
    expect(result).toContain('data-testid="hero-linkedin"');
    expect(result).toContain('data-testid="hero-github"');
  });

  it('applies custom class when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: {class: 'custom-class'},
    });
    expect(result).toContain('custom-class');
  });

  it('includes focus-ring class for keyboard accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('focus-ring');
  });

  it('has minimum touch target height for mobile accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    // Buttons should have min-h-11 (44px) for touch targets
    expect(result).toContain('min-h-11');
  });

  it('renders profile image by default', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('data-testid="hero-image"');
    expect(result).toContain('data-testid="hero-image-container"');
    expect(result).toContain(
      'alt="Cris Benge - Head of Federal Innovation at Google"',
    );
  });

  it('has two-column layout classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    // Check for flex layout classes for two-column design
    expect(result).toContain('flex');
    expect(result).toContain('flex-col');
    expect(result).toContain('md:flex-row');
    expect(result).toContain('items-center');
  });

  it('hides image when showImage is false', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: {showImage: false},
    });
    expect(result).not.toContain('data-testid="hero-image"');
    expect(result).not.toContain('data-testid="hero-image-container"');
  });

  it('has image animation class', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('hero-animate-image');
  });

  it('image has rounded corners styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('rounded-2xl');
  });

  it('image uses eager loading for above-fold content', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('loading="eager"');
  });

  it('image has fetchpriority high for LCP optimization', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('fetchpriority="high"');
  });

  it('image has responsive sizes attribute', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    expect(result).toContain('sizes=');
  });

  it('clearance badge has accent styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    // TS/SCI badge should have accent color styling with WCAG-compliant contrast
    expect(result).toContain('bg-accent/5');
    expect(result).toContain('text-accent-hover');
  });

  it('education badges have surface styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero);
    // Education badges should have surface background
    expect(result).toContain('bg-surface');
  });
});

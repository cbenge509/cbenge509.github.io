import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import SEO from './SEO.astro';

describe('SEO', () => {
  it('renders title with site suffix', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Projects', description: 'My projects'},
    });

    expect(result).toContain('<title>Projects | Cris Benge</title>');
  });

  it('renders meta description', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Projects', description: 'Portfolio projects by Cris'},
    });

    expect(result).toContain('name="description"');
    expect(result).toContain('Portfolio projects by Cris');
  });

  it('renders Open Graph title', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'About', description: 'About Cris Benge'},
    });

    expect(result).toContain('property="og:title"');
    expect(result).toContain('About | Cris Benge');
  });

  it('renders Open Graph description', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'About', description: 'About Cris Benge'},
    });

    expect(result).toContain('property="og:description"');
    expect(result).toContain('About Cris Benge');
  });

  it('renders Open Graph image with default path', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Home', description: 'Welcome'},
    });

    expect(result).toContain('property="og:image"');
    expect(result).toContain('/og-default.png');
  });

  it('renders Open Graph image with custom path', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Projects',
        description: 'Projects',
        image: '/images/projects-og.png',
      },
    });

    expect(result).toContain('property="og:image"');
    expect(result).toContain('/images/projects-og.png');
  });

  it('renders Open Graph type as website', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Home', description: 'Welcome'},
    });

    expect(result).toContain('property="og:type"');
    expect(result).toContain('website');
  });

  it('renders Twitter card meta tags', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Home', description: 'Welcome'},
    });

    expect(result).toContain('name="twitter:card"');
    expect(result).toContain('summary_large_image');
    expect(result).toContain('name="twitter:title"');
    expect(result).toContain('name="twitter:description"');
    expect(result).toContain('name="twitter:image"');
  });

  it('renders canonical URL link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Home', description: 'Welcome'},
    });

    expect(result).toContain('rel="canonical"');
  });

  it('renders custom canonical URL when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Welcome',
        canonical: 'https://cbenge509.github.io/custom-page',
      },
    });

    expect(result).toContain('href="https://cbenge509.github.io/custom-page"');
  });

  it('includes JSON-LD when includePersonSchema is true', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Portfolio',
        includePersonSchema: true,
      },
    });

    expect(result).toContain('application/ld+json');
    expect(result).toContain('Cris Benge');
    expect(result).toContain('"@type":"Person"');
  });

  it('does NOT include JSON-LD when includePersonSchema is false', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Projects',
        description: 'Projects page',
        includePersonSchema: false,
      },
    });

    expect(result).not.toContain('application/ld+json');
  });

  it('does NOT include JSON-LD by default', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'About',
        description: 'About page',
      },
    });

    expect(result).not.toContain('application/ld+json');
  });

  it('includes noindex meta when noIndex is true', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Draft',
        description: 'Draft page',
        noIndex: true,
      },
    });

    expect(result).toContain('name="robots"');
    expect(result).toContain('noindex,nofollow');
  });

  it('does NOT include noindex meta by default', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Welcome',
      },
    });

    expect(result).not.toContain('noindex');
  });

  it('JSON-LD includes job title', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Portfolio',
        includePersonSchema: true,
      },
    });

    expect(result).toContain('Head of Federal Innovation');
  });

  it('JSON-LD includes organization (Google)', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Portfolio',
        includePersonSchema: true,
      },
    });

    expect(result).toContain('"@type":"Organization"');
    expect(result).toContain('"name":"Google"');
  });

  it('JSON-LD includes social profiles', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Portfolio',
        includePersonSchema: true,
      },
    });

    expect(result).toContain('github.com/cbenge509');
    expect(result).toContain('linkedin.com/in/crisbenge');
    // Note: Google Scholar URL will be added when available
  });

  it('JSON-LD includes alumni info', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Home',
        description: 'Portfolio',
        includePersonSchema: true,
      },
    });

    expect(result).toContain('Columbia University');
    expect(result).toContain('UC Berkeley');
  });

  it('renders og:site_name', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SEO, {
      props: {title: 'Home', description: 'Welcome'},
    });

    expect(result).toContain('property="og:site_name"');
    expect(result).toContain('Cris Benge');
  });
});

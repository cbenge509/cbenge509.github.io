import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import SectionHeading from './SectionHeading.astro';

describe('SectionHeading', () => {
  it('renders heading text correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Featured Projects'},
    });
    expect(result).toContain('Featured Projects');
  });

  it('renders as h2 by default', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Test Heading'},
    });
    expect(result).toContain('<h2');
    expect(result).toContain('</h2>');
  });

  it('renders as h1 when specified', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      props: {as: 'h1'},
      slots: {default: 'Page Title'},
    });
    expect(result).toContain('<h1');
    expect(result).toContain('</h1>');
  });

  it('renders as h3 when specified', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      props: {as: 'h3'},
      slots: {default: 'Subsection'},
    });
    expect(result).toContain('<h3');
    expect(result).toContain('</h3>');
  });

  it('includes id for aria-labelledby', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      props: {id: 'featured-heading'},
      slots: {default: 'Featured Projects'},
    });
    expect(result).toContain('id="featured-heading"');
  });

  it('uses Space Grotesk font family', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Test'},
    });
    expect(result).toContain('font-display');
  });

  it('has responsive text sizing classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Test'},
    });
    expect(result).toContain('text-2xl');
    expect(result).toContain('md:text-3xl');
  });

  it('has dark mode text color', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Test'},
    });
    expect(result).toContain('dark:text-text-dark');
  });

  it('applies custom class when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      props: {class: 'custom-class'},
      slots: {default: 'Test'},
    });
    expect(result).toContain('custom-class');
  });

  it('renders subtitle slot when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {
        default: 'Featured Projects',
        subtitle: 'Highlighted work from my portfolio',
      },
    });
    expect(result).toContain('Featured Projects');
    expect(result).toContain('Highlighted work from my portfolio');
  });

  it('subtitle has secondary text color', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {
        default: 'Featured Projects',
        subtitle: 'Subtitle text',
      },
    });
    expect(result).toContain('text-text-secondary');
    expect(result).toContain('dark:text-text-secondary-dark');
  });

  it('has margin-bottom for spacing', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Test'},
    });
    expect(result).toContain('mb-8');
  });

  it('has semibold font weight', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeading, {
      slots: {default: 'Test'},
    });
    expect(result).toContain('font-semibold');
  });
});

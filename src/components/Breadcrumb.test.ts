import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import Breadcrumb from './Breadcrumb.astro';

describe('Breadcrumb', () => {
  it('renders current page name', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'About'},
    });
    expect(result).toContain('About');
  });

  it('renders Home link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Test'},
    });
    expect(result).toContain('href="/"');
    expect(result).toContain('Home');
  });

  it('has aria-label for accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Test'},
    });
    expect(result).toContain('aria-label="Breadcrumb"');
  });

  it('marks current page with aria-current', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Publications'},
    });
    expect(result).toContain('aria-current="page"');
  });

  it('has focus-ring on Home link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Test'},
    });
    expect(result).toContain('focus-ring');
  });

  it('has separator with aria-hidden', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Test'},
    });
    expect(result).toContain('aria-hidden="true"');
    expect(result).toContain('/');
  });

  it('applies custom class', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Test', class: 'custom-breadcrumb'},
    });
    expect(result).toContain('custom-breadcrumb');
  });

  it('has minimum touch target on Home link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Breadcrumb, {
      props: {currentPage: 'Test'},
    });
    expect(result).toContain('min-h-11');
  });
});

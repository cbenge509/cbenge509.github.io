import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import ThemeToggle from './ThemeToggle.astro';

describe('ThemeToggle', () => {
  it('renders with correct aria-label', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('aria-label');
    expect(result).toContain('Currently');
    expect(result).toContain('mode');
  });

  it('has focus-ring class for accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('focus-ring');
  });

  it('has data-component attribute for JS hooks', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('data-component="theme-toggle"');
  });

  it('renders as a button element', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('<button');
    expect(result).toContain('</button>');
  });

  it('has type="button" to prevent form submission', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('type="button"');
  });

  it('renders sun and moon SVG icons', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    // Should have two SVGs (sun and moon)
    const svgMatches = result.match(/<svg/g);
    expect(svgMatches).not.toBeNull();
    expect(svgMatches!.length).toBe(2);
  });

  it('icons have aria-hidden for accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    // Both icons should be aria-hidden
    const ariaHiddenMatches = result.match(/aria-hidden="true"/g);
    expect(ariaHiddenMatches).not.toBeNull();
    expect(ariaHiddenMatches!.length).toBe(2);
  });

  it('has 44x44px minimum touch target via w-11 h-11 classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    // w-11 = 44px (11 * 4px), h-11 = 44px
    expect(result).toContain('w-11');
    expect(result).toContain('h-11');
  });

  it('accepts additional class names via props', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle, {
      props: {class: 'custom-class'},
    });

    expect(result).toContain('custom-class');
  });

  it('icons have transition-opacity for smooth cross-fade', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('transition-opacity');
  });

  it('icons have duration-150 for micro-interaction timing', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('duration-150');
  });

  it('moon icon has dark:opacity-100 for visibility in dark mode', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('dark:opacity-100');
  });

  it('sun icon has dark:opacity-0 to hide in dark mode', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    expect(result).toContain('dark:opacity-0');
  });

  it('includes script tag for theme toggling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ThemeToggle);

    // Script is rendered as module reference in container tests
    expect(result).toContain('script');
    expect(result).toContain('ThemeToggle.astro');
  });
});

import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import ExternalLink from './ExternalLink.astro';

describe('ExternalLink', () => {
  describe('Accessibility', () => {
    it('always includes target="_blank"', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {href: 'https://example.com', ariaLabel: 'Example'},
        slots: {default: 'Link'},
      });
      expect(result).toContain('target="_blank"');
    });

    it('always includes rel="noopener noreferrer"', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {href: 'https://example.com', ariaLabel: 'Example'},
        slots: {default: 'Link'},
      });
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('appends "(opens in new tab)" to aria-label', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {href: 'https://example.com', ariaLabel: 'Example Link'},
        slots: {default: 'Link'},
      });
      expect(result).toContain('aria-label="Example Link (opens in new tab)"');
    });

    it('includes focus-ring class for keyboard navigation', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {href: 'https://example.com', ariaLabel: 'Example'},
        slots: {default: 'Link'},
      });
      expect(result).toContain('focus-ring');
    });
  });

  describe('Variants', () => {
    it('renders text variant with correct classes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          variant: 'text',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('inline-flex');
      expect(result).toContain('items-center');
      expect(result).toContain('hover:text-accent');
    });

    it('renders button variant with accent color by default', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('bg-accent');
      expect(result).toContain('text-white');
      expect(result).toContain('rounded-lg');
    });

    it('renders button variant with neutral color scheme', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button',
          colorScheme: 'neutral',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('bg-surface');
      expect(result).toContain('hover:bg-accent');
    });

    it('renders button-outlined variant with border', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button-outlined',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('border');
      expect(result).toContain('border-border');
      expect(result).toContain('rounded-lg');
    });

    it('renders card-action variant with accent text', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Action',
          variant: 'card-action',
        },
        slots: {default: 'Action'},
      });
      expect(result).toContain('text-accent');
      expect(result).toContain('hover:underline');
    });

    it('renders badge variant with backdrop blur', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Badge',
          variant: 'badge',
        },
        slots: {default: 'Badge'},
      });
      expect(result).toContain('rounded-full');
      expect(result).toContain('backdrop-blur-sm');
      expect(result).toContain('bg-bg/90');
    });
  });

  describe('Sizes', () => {
    it('renders xs size with text-xs and gap-1', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          variant: 'text',
          size: 'xs',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('text-xs');
      expect(result).toContain('gap-1');
    });

    it('renders sm size with text-sm', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          variant: 'text',
          size: 'sm',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('text-sm');
    });

    it('renders button with base size including padding and min-height', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button',
          size: 'base',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('px-6');
      expect(result).toContain('py-3');
      expect(result).toContain('min-h-11');
    });

    it('renders lg size with larger padding', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button',
          size: 'lg',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('px-8');
      expect(result).toContain('py-4');
      expect(result).toContain('text-lg');
    });
  });

  describe('Icons', () => {
    it('renders arrow suffix by default', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {href: 'https://example.com', ariaLabel: 'Link'},
        slots: {default: 'Link'},
      });
      expect(result).toContain('↗');
      expect(result).toContain('aria-hidden="true"');
    });

    it('hides arrow when showArrow=false', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          showArrow: false,
        },
        slots: {default: 'Link'},
      });
      expect(result).not.toContain('↗');
    });

    it('renders arrow with text-xs for small sizes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          size: 'sm',
        },
        slots: {default: 'Link'},
      });
      // Arrow should have text-xs class for small sizes
      expect(result).toMatch(/<span[^>]*class="text-xs"[^>]*>[\s\S]*↗/);
    });

    it('renders PDF prefix icon', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com/doc.pdf',
          ariaLabel: 'PDF',
          prefixIcon: 'pdf',
        },
        slots: {default: 'PDF'},
      });
      expect(result).toContain('<svg');
      expect(result).toContain('w-4 h-4');
      // PDF icon has document path
      expect(result).toContain('M7 21h10');
    });

    it('renders GitHub prefix icon', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://github.com/user/repo',
          ariaLabel: 'GitHub',
          prefixIcon: 'github',
        },
        slots: {default: 'Code'},
      });
      expect(result).toContain('<svg');
      expect(result).toContain('fill="currentColor"');
      // GitHub icon path starts with M12
      expect(result).toContain('M12 2C6.477');
    });

    it('renders external link prefix icon', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://doi.org/123',
          ariaLabel: 'DOI',
          prefixIcon: 'external',
        },
        slots: {default: 'DOI'},
      });
      expect(result).toContain('<svg');
      // External link icon has specific path
      expect(result).toContain('M13.828 10.172');
    });

    it('does not render prefix icon when prefixIcon="none"', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          prefixIcon: 'none',
        },
        slots: {default: 'Link'},
      });
      // Should not have SVG for icons (only potential arrow)
      const svgCount = (result.match(/<svg/g) || []).length;
      expect(svgCount).toBe(0);
    });
  });

  describe('Custom Classes', () => {
    it('merges custom classes via cn() utility', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          class: 'custom-class mt-4',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('custom-class');
      expect(result).toContain('mt-4');
    });

    it('forwards data-testid attribute', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          'data-testid': 'external-link-test',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('data-testid="external-link-test"');
    });

    it('forwards additional HTML attributes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          'data-custom': 'custom-value',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('data-custom="custom-value"');
    });
  });

  describe('Dark Mode', () => {
    it('includes dark mode classes for text variant', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Link',
          variant: 'text',
        },
        slots: {default: 'Link'},
      });
      expect(result).toContain('dark:text-text-dark');
      expect(result).toContain('dark:hover:text-accent-dark');
    });

    it('includes dark mode classes for button variant', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('dark:bg-accent');
      expect(result).toContain('dark:hover:bg-accent-hover');
    });

    it('includes dark mode classes for button-outlined variant', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Button',
          variant: 'button-outlined',
        },
        slots: {default: 'Button'},
      });
      expect(result).toContain('dark:border-border-dark');
      expect(result).toContain('dark:text-text-dark');
    });

    it('includes dark mode classes for card-action variant', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Action',
          variant: 'card-action',
        },
        slots: {default: 'Action'},
      });
      expect(result).toContain('dark:text-accent-dark');
    });

    it('includes dark mode classes for badge variant', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://example.com',
          ariaLabel: 'Badge',
          variant: 'badge',
        },
        slots: {default: 'Badge'},
      });
      expect(result).toContain('dark:bg-bg-dark/90');
      expect(result).toContain('dark:text-text-dark');
      expect(result).toContain('dark:hover:bg-accent-dark');
    });
  });

  describe('Slot Content', () => {
    it('renders slot content correctly', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {href: 'https://example.com', ariaLabel: 'Example'},
        slots: {default: 'Click me to visit Example'},
      });
      expect(result).toContain('Click me to visit Example');
    });
  });

  describe('href Attribute', () => {
    it('renders the correct href attribute', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ExternalLink, {
        props: {
          href: 'https://github.com/cbenge509',
          ariaLabel: 'GitHub Profile',
        },
        slots: {default: 'GitHub'},
      });
      expect(result).toContain('href="https://github.com/cbenge509"');
    });
  });
});

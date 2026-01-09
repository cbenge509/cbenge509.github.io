import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect, beforeEach} from 'vitest';
import ContactSection from './ContactSection.astro';

describe('ContactSection', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  describe('Default Rendering', () => {
    it('renders section with correct data-testid', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('data-testid="contact-section"');
    });

    it('renders section heading "Get In Touch"', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('Get In Touch');
    });

    it('renders subtitle about connecting', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('Interested in connecting');
    });

    it('renders aria-labelledby for accessibility', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('aria-labelledby="contact-heading"');
      expect(result).toContain('id="contact-heading"');
    });
  });

  describe('LinkedIn Link (Primary CTA)', () => {
    it('renders LinkedIn link with correct URL', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('linkedin.com/in/crisbenge');
    });

    it('renders LinkedIn with "Connect on LinkedIn" text', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('Connect on LinkedIn');
    });

    it('renders LinkedIn as primary CTA with accent background', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('bg-accent');
      expect(result).toContain('dark:bg-accent-dark');
    });

    it('renders LinkedIn link with external link icon', async () => {
      const result = await container.renderToString(ContactSection, {});
      // Check for the external link arrow icon
      expect(result).toContain('↗');
    });

    it('renders LinkedIn link with correct security attributes', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('renders LinkedIn link with aria-label', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain(
        'aria-label="Connect on LinkedIn (opens in new tab)"',
      );
    });

    it('renders LinkedIn link with data-testid', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('data-testid="linkedin-link"');
    });
  });

  describe('email removal verification', () => {
    it('does NOT contain any email-related content', async () => {
      const result = await container.renderToString(ContactSection, {});
      // Verify all email references are removed
      expect(result).not.toContain('mailto:');
      expect(result).not.toContain('Email Me');
      expect(result).not.toContain('data-testid="email-link"');
      expect(result).not.toContain('cris.benge@gmail.com');
    });
  });

  describe('CV Download Link', () => {
    it('renders CV link with PDF extension', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('.pdf');
    });

    it('renders "View CV" button text', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('View CV');
    });

    it('renders CV link with target="_blank"', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('target="_blank"');
    });

    it('renders CV link with data-testid', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('data-testid="cv-link"');
    });

    it('renders CV link with aria-label', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('aria-label="View CV (opens in new tab)"');
    });

    it('hides CV link when showCV=false', async () => {
      const result = await container.renderToString(ContactSection, {
        props: {showCV: false},
      });
      expect(result).not.toContain('View CV');
      expect(result).not.toContain('data-testid="cv-link"');
    });
  });

  describe('GitHub Button [data-testid="github-button"]', () => {
    it('renders GitHub button with correct URL', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('href="https://github.com/cbenge509"');
    });

    it('renders "View GitHub" button text', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('View GitHub');
    });

    it('renders GitHub button with external link icon', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('↗');
    });

    it('renders GitHub button with correct security attributes', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('renders GitHub button with aria-label', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain(
        'aria-label="GitHub profile (opens in new tab)"',
      );
    });

    it('renders GitHub button with data-testid', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('data-testid="github-button"');
    });

    it('renders GitHub button with secondary styling (border)', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('border-border');
      expect(result).toContain('dark:border-border-dark');
    });
  });

  describe('Dark Mode Support', () => {
    it('includes dark mode classes for section background', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('dark:bg-surface-dark');
    });

    it('includes dark mode classes for text', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('dark:text-text-dark');
    });

    it('includes dark mode classes for borders', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('dark:border-border-dark');
    });

    it('includes dark mode classes for accent colors', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('dark:bg-accent-dark');
      expect(result).toContain('dark:hover:bg-accent-hover-dark');
    });

    it('includes dark mode classes for secondary text', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('dark:text-text-secondary-dark');
    });
  });

  describe('Accessibility', () => {
    it('includes focus-ring class on all interactive elements', async () => {
      const result = await container.renderToString(ContactSection, {});
      // Count focus-ring occurrences (should be at least 3: LinkedIn, GitHub, CV)
      const focusRingCount = (result.match(/focus-ring/g) || []).length;
      expect(focusRingCount).toBeGreaterThanOrEqual(3);
    });

    it('has 44px minimum touch targets (min-h-11)', async () => {
      const result = await container.renderToString(ContactSection, {});
      // Check for min-h-11 class (44px)
      expect(result).toContain('min-h-11');
    });

    it('has section element with role="region" via aria-labelledby', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('aria-labelledby="contact-heading"');
    });

    it('hides decorative icons from screen readers', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('aria-hidden="true"');
    });
  });

  describe('External Link Security', () => {
    it('all external links have noopener noreferrer', async () => {
      const result = await container.renderToString(ContactSection, {});
      // Check that rel="noopener noreferrer" appears for external links
      const relCount = (result.match(/rel="noopener noreferrer"/g) || [])
        .length;
      // Should be at least 3 (LinkedIn, CV, GitHub)
      expect(relCount).toBeGreaterThanOrEqual(3);
    });

    it('all external links open in new tab', async () => {
      const result = await container.renderToString(ContactSection, {});
      // Count target="_blank" occurrences
      const targetCount = (result.match(/target="_blank"/g) || []).length;
      // Should be at least 3 (LinkedIn, CV, GitHub)
      expect(targetCount).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Styling', () => {
    it('has rounded section corners', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('rounded-2xl');
    });

    it('has responsive padding', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('py-16');
      expect(result).toContain('md:py-20');
    });

    it('has centered content layout', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('text-center');
      expect(result).toContain('mx-auto');
    });

    it('has flex layout for buttons', async () => {
      const result = await container.renderToString(ContactSection, {});
      expect(result).toContain('flex flex-wrap');
      expect(result).toContain('justify-center');
    });
  });

  describe('Custom Props', () => {
    it('passes through additional HTML attributes', async () => {
      const result = await container.renderToString(ContactSection, {
        props: {'data-custom': 'test'},
      });
      expect(result).toContain('data-custom="test"');
    });

    it('merges custom class with existing classes', async () => {
      const result = await container.renderToString(ContactSection, {
        props: {class: 'my-custom-class'},
      });
      expect(result).toContain('my-custom-class');
      expect(result).toContain('bg-surface'); // Still has base classes
    });

    it('can hide CV while keeping other links', async () => {
      const result = await container.renderToString(ContactSection, {
        props: {showCV: false},
      });
      expect(result).not.toContain('View CV');
      // Should still render LinkedIn and GitHub
      expect(result).toContain('Connect on LinkedIn');
      expect(result).toContain('View GitHub');
    });
  });
});

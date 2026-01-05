import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import PatentCard from './PatentCard.astro';

describe('PatentCard', () => {
  it('renders patent title and number', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test Patent Title',
        patentNumber: 'US 10,123,456',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('Test Patent Title');
    expect(result).toContain('US 10,123,456');
  });

  it('renders granted status badge with correct color', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('Granted');
    expect(result).toContain('bg-green');
    expect(result).toContain('text-green');
  });

  it('renders pending status badge with amber color', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'pending' as const,
      },
    });
    expect(result).toContain('Pending');
    expect(result).toContain('bg-amber');
    expect(result).toContain('text-amber');
  });

  it('renders filed status badge with blue color', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'filed' as const,
      },
    });
    expect(result).toContain('Filed');
    expect(result).toContain('bg-blue');
    expect(result).toContain('text-blue');
  });

  it('hides external link when url not provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        // No url
      },
    });
    expect(result).not.toContain('View Patent');
    expect(result).not.toContain('target="_blank"');
  });

  it('includes external link with proper attributes when url provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        url: 'https://patents.google.com/patent/US123',
      },
    });
    expect(result).toContain('View Patent');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
    expect(result).toContain('https://patents.google.com/patent/US123');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('dark:');
    expect(result).toContain('dark:bg-surface-dark');
    expect(result).toContain('dark:border-gray-700');
    expect(result).toContain('dark:text-text-dark');
  });

  it('includes focus-ring class on link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        url: 'https://patents.google.com/patent/US123',
      },
    });
    expect(result).toContain('focus-ring');
  });

  it('displays grant date when provided', async () => {
    const container = await AstroContainer.create();
    // Use noon UTC to avoid timezone issues
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15T12:00:00Z'),
        grantDate: new Date('2022-06-20T12:00:00Z'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('Granted:');
    // Check for year and month in the output (timezone-safe check)
    expect(result).toMatch(/Jun\s+\d+,\s+2022/);
  });

  it('displays filing date when no grant date', async () => {
    const container = await AstroContainer.create();
    // Use noon UTC to avoid timezone issues
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15T12:00:00Z'),
        status: 'pending' as const,
      },
    });
    expect(result).toContain('Filed:');
    // Check for year and month in the output (timezone-safe check)
    expect(result).toMatch(/Jan\s+\d+,\s+2020/);
  });

  it('renders description when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        description: 'A method for efficiently processing data.',
      },
    });
    expect(result).toContain('A method for efficiently processing data.');
  });

  it('does not render description when not provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).not.toContain('data-testid="patent-description"');
  });

  it('includes data-component attribute for JS hooks', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('data-component="patent-card"');
  });

  it('uses semantic article element', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('<article');
    expect(result).toContain('</article>');
  });

  it('accepts additional class names via className prop', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        class: 'custom-class',
      },
    });
    expect(result).toContain('custom-class');
  });

  it('includes aria-label on external link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        url: 'https://patents.google.com/patent/US123',
      },
    });
    expect(result).toContain('aria-label');
    expect(result).toContain('opens in new tab');
  });

  it('includes patent number in monospace font', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 10,123,456',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
      },
    });
    expect(result).toContain('font-mono');
  });

  it('external link has minimum 44px touch target (min-h-11)', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PatentCard, {
      props: {
        title: 'Test',
        patentNumber: 'US 123',
        filingDate: new Date('2020-01-15'),
        status: 'granted' as const,
        url: 'https://patents.google.com/patent/US123',
      },
    });
    expect(result).toContain('min-h-11');
  });
});

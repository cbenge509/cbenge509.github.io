import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import CertificationCard from './CertificationCard.astro';

describe('CertificationCard', () => {
  it('renders certification name and issuer', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Azure Certified Solution Architect Expert',
        issuer: 'Microsoft',
        year: 2023,
        category: 'cloud',
      },
    });
    expect(result).toContain('Azure Certified Solution Architect Expert');
    expect(result).toContain('Microsoft');
  });

  it('renders year', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test Cert',
        issuer: 'Test Issuer',
        year: 2021,
        category: 'data',
      },
    });
    expect(result).toContain('2021');
  });

  it('includes cloud category badge with correct styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
      },
    });
    expect(result).toContain('Cloud');
    expect(result).toContain('bg-blue-100');
    expect(result).toContain('dark:bg-blue-900/50');
  });

  it('includes data category badge with correct styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'data',
      },
    });
    expect(result).toContain('Data');
    expect(result).toContain('bg-green-100');
    expect(result).toContain('dark:bg-green-900/50');
  });

  it('includes database category badge with correct styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'database',
      },
    });
    expect(result).toContain('Database');
    expect(result).toContain('bg-purple-100');
    expect(result).toContain('dark:bg-purple-900/50');
  });

  it('includes other category badge with correct styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'other',
      },
    });
    expect(result).toContain('Other');
    expect(result).toContain('bg-gray-100');
    expect(result).toContain('dark:bg-gray-700');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
      },
    });
    expect(result).toContain('dark:bg-gray-900/50');
    expect(result).toContain('dark:border-gray-800');
    expect(result).toContain('dark:text-text-dark');
  });

  it('includes hover lift effect classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
      },
    });
    expect(result).toContain('hover:shadow-md');
    expect(result).toContain('hover:-translate-y-1');
  });

  it('renders verification link when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
        verificationUrl: 'https://example.com/verify',
      },
    });
    expect(result).toContain('Verify Credential');
    expect(result).toContain('href="https://example.com/verify"');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('does not render verification link when not provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
      },
    });
    expect(result).not.toContain('Verify Credential');
  });

  it('includes focus-ring class on verification link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
        verificationUrl: 'https://example.com/verify',
      },
    });
    expect(result).toContain('focus-ring');
  });

  it('has data-testid for testing', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
      },
    });
    expect(result).toContain('data-testid="certification-card"');
    expect(result).toContain('data-testid="category-badge"');
  });

  it('spreads additional attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
        'data-reveal': true,
      },
    });
    expect(result).toContain('data-reveal');
  });

  it('includes min-h-11 for touch target on verification link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CertificationCard, {
      props: {
        name: 'Test',
        issuer: 'Test',
        year: 2023,
        category: 'cloud',
        verificationUrl: 'https://example.com/verify',
      },
    });
    expect(result).toContain('min-h-11');
  });
});

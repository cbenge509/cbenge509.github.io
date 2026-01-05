import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect, beforeEach} from 'vitest';
import EducationCard from './EducationCard.astro';

// Mock image metadata for testing
const mockLogoImage = {
  src: '/mock-logo.svg',
  width: 64,
  height: 64,
  format: 'svg' as const,
};

describe('EducationCard', () => {
  let container: AstroContainer;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  it('renders institution name', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('Columbia University');
  });

  it('renders degree and field', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('M.S.');
    expect(result).toContain('Applied Analytics');
  });

  it('renders graduation year', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'UC Berkeley',
        degree: 'MIDS',
        field: 'Data Science',
        year: 2019,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('2019');
  });

  it('renders external link with correct attributes when institutionUrl provided', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
        institutionUrl: 'https://www.columbia.edu',
      },
    });
    expect(result).toContain('href="https://www.columbia.edu"');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
    expect(result).toContain('↗'); // External link icon
    expect(result).toContain('(opens in new tab)'); // Screen reader text
  });

  it('renders institution as heading when no URL provided', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Illinois Wesleyan University',
        degree: 'B.S.',
        field: 'Computer Science',
        year: 1998,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('<h3');
    expect(result).toContain('Illinois Wesleyan University');
    expect(result).not.toContain('target="_blank"');
  });

  it('renders honors when provided', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
        honors: ['Graduate Certificate in Machine Learning', 'Summa Cum Laude'],
      },
    });
    expect(result).toContain('Graduate Certificate in Machine Learning');
    expect(result).toContain('Summa Cum Laude');
  });

  it('does not render honors section when empty', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'UC Berkeley',
        degree: 'MIDS',
        field: 'Data Science',
        year: 2019,
        logoImage: mockLogoImage,
        honors: [],
      },
    });
    // Should not have any list items for honors
    expect(result).not.toContain('rounded-full text-xs font-medium');
  });

  it('includes dark mode classes', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('dark:');
  });

  it('renders article semantic element', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'UC Berkeley',
        degree: 'MIDS',
        field: 'Data Science',
        year: 2019,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('<article');
  });

  it('passes through custom className', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
        class: 'custom-class',
      },
    });
    expect(result).toContain('custom-class');
  });

  it('includes focus-ring class on external links', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: mockLogoImage,
        institutionUrl: 'https://www.columbia.edu',
      },
    });
    expect(result).toContain('focus-ring');
  });

  it('renders logo image with proper alt text', async () => {
    const result = await container.renderToString(EducationCard, {
      props: {
        institution: 'UC Berkeley',
        degree: 'MIDS',
        field: 'Data Science',
        year: 2019,
        logoImage: mockLogoImage,
      },
    });
    expect(result).toContain('alt="UC Berkeley logo"');
  });
});

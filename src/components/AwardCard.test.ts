import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import AwardCard from './AwardCard.astro';

// Mock image metadata for testing logo rendering
const mockLogoImage = {
  src: '/mock-microsoft-logo.svg',
  width: 64,
  height: 64,
  format: 'svg' as const,
};

describe('AwardCard', () => {
  it('renders award title and description', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'DrivenData: World Bank Publication Topics',
        year: 2019,
        category: 'competition',
        description: 'Machine learning competition to classify publications.',
      },
    });
    expect(result).toContain('DrivenData: World Bank Publication Topics');
    expect(result).toContain(
      'Machine learning competition to classify publications.',
    );
  });

  it('renders year', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test Award',
        year: 2020,
        category: 'professional',
        description: 'Test description',
      },
    });
    expect(result).toContain('2020');
  });

  it('renders organization when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test Award',
        year: 2020,
        category: 'professional',
        description: 'Test description',
        organization: 'Microsoft',
      },
    });
    expect(result).toContain('Microsoft');
  });

  it('includes competition category badge with correct styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
      },
    });
    expect(result).toContain('Competition');
    expect(result).toContain('bg-indigo-100');
    expect(result).toContain('dark:bg-indigo-900/50');
  });

  it('includes professional category badge with correct styling', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2020,
        category: 'professional',
        description: 'Test',
      },
    });
    expect(result).toContain('Professional');
    expect(result).toContain('bg-blue-100');
    expect(result).toContain('dark:bg-blue-900/50');
  });

  it('renders gold placement badge for 1st place', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
        placement: '1st Place',
      },
    });
    expect(result).toContain('1st Place');
    expect(result).toContain('bg-amber-100');
    expect(result).toContain('dark:bg-amber-900/50');
  });

  it('renders silver placement badge for 2nd place', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
        placement: '2nd Place',
      },
    });
    expect(result).toContain('2nd Place');
    expect(result).toContain('bg-gray-200');
    expect(result).toContain('dark:bg-gray-600');
  });

  it('renders bronze placement badge for 3rd place', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
        placement: '3rd Place',
      },
    });
    expect(result).toContain('3rd Place');
    expect(result).toContain('bg-orange-100');
    expect(result).toContain('dark:bg-orange-900/50');
  });

  it('renders silver placement badge for Top X%', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
        placement: 'Top 12%',
      },
    });
    expect(result).toContain('Top 12%');
    expect(result).toContain('bg-gray-200');
    expect(result).toContain('dark:bg-gray-600');
  });

  it('does not render placement badge for professional awards', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2020,
        category: 'professional',
        description: 'Test',
        placement: '1st Place', // Should be ignored
      },
    });
    expect(result).not.toContain('data-testid="placement-badge"');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
      },
    });
    expect(result).toContain('dark:bg-gray-900/50');
    expect(result).toContain('dark:border-gray-800');
    expect(result).toContain('dark:text-text-dark');
  });

  it('includes hover lift effect classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
      },
    });
    expect(result).toContain('hover:shadow-md');
    expect(result).toContain('hover:-translate-y-1');
  });

  it('has data-testid for testing', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
      },
    });
    expect(result).toContain('data-testid="award-card"');
    expect(result).toContain('data-testid="category-badge"');
  });

  it('spreads additional attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'Test',
        'data-reveal': true,
      },
    });
    expect(result).toContain('data-reveal');
  });

  it('includes line-clamp-2 class for description truncation', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2019,
        category: 'competition',
        description: 'A very long description that might need truncation',
      },
    });
    expect(result).toContain('line-clamp-2');
  });

  it('renders silver placement badge for 13th place (other rankings)', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(AwardCard, {
      props: {
        title: 'Test',
        year: 2017,
        category: 'competition',
        description: 'Test',
        placement: '13th Place',
      },
    });
    expect(result).toContain('13th Place');
    expect(result).toContain('bg-gray-200'); // Silver style for non-top-3
  });

  // Story 6.2: Logo rendering tests
  describe('Logo rendering (Story 6.2)', () => {
    it('renders organization logo when logoImage is provided', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Circle of Excellence',
          year: 2020,
          category: 'professional',
          description: 'Exceptional performance award',
          organization: 'Microsoft',
          logoImage: mockLogoImage,
        },
      });
      expect(result).toContain('alt="Microsoft logo"');
      expect(result).toContain('width="64"');
      expect(result).toContain('height="64"');
      expect(result).toContain('rounded-lg');
    });

    it('renders without logo when logoImage is not provided', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'professional',
          description: 'Test description',
          organization: 'TestOrg',
        },
      });
      // Should not contain any logo-related elements
      expect(result).not.toContain('alt="TestOrg logo"');
      expect(result).not.toContain('flex-shrink-0');
    });

    it('uses organization name in logo alt text', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'professional',
          description: 'Test description',
          organization: 'Microsoft',
          logoImage: mockLogoImage,
        },
      });
      expect(result).toContain('alt="Microsoft logo"');
    });

    it('uses default alt text when organization is not provided', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'professional',
          description: 'Test description',
          logoImage: mockLogoImage,
        },
      });
      expect(result).toContain('alt="Organization logo"');
    });

    it('maintains backward compatibility - competition awards without logo render correctly', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Data Science Bowl',
          year: 2018,
          category: 'competition',
          description: 'Competition achievement',
          placement: '1st Place',
          organization: 'Kaggle',
        },
      });
      expect(result).toContain('Data Science Bowl');
      expect(result).toContain('Kaggle');
      expect(result).toContain('1st Place');
      expect(result).not.toContain('alt="Kaggle logo"');
    });

    it('applies flex layout with gap when logo is present', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'professional',
          description: 'Test description',
          organization: 'Microsoft',
          logoImage: mockLogoImage,
        },
      });
      expect(result).toContain('items-start');
      expect(result).toContain('gap-4');
    });

    it('applies column layout when logo is not present', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'competition',
          description: 'Test description',
        },
      });
      expect(result).toContain('flex-col');
      expect(result).toContain('gap-3');
    });

    it('handles very long organization names in alt text', async () => {
      const container = await AstroContainer.create();
      const longOrgName =
        'International Association of Very Long Organization Names Inc.';
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'professional',
          description: 'Test description',
          organization: longOrgName,
          logoImage: mockLogoImage,
        },
      });
      expect(result).toContain(`alt="${longOrgName} logo"`);
    });

    it('renders logo correctly when logoImage has different formats', async () => {
      const pngLogoImage = {
        src: '/mock-logo.png',
        width: 64,
        height: 64,
        format: 'png' as const,
      };
      const container = await AstroContainer.create();
      const result = await container.renderToString(AwardCard, {
        props: {
          title: 'Test Award',
          year: 2020,
          category: 'professional',
          description: 'Test description',
          organization: 'TestOrg',
          logoImage: pngLogoImage,
        },
      });
      expect(result).toContain('alt="TestOrg logo"');
      expect(result).toContain('width="64"');
    });
  });
});

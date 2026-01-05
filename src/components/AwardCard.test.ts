import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import AwardCard from './AwardCard.astro';

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
});

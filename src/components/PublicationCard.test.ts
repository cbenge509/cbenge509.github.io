import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import PublicationCard from './PublicationCard.astro';

describe('PublicationCard', () => {
  it('renders publication title and venue', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper Title',
        authors: ['Author One', 'Author Two'],
        venue: 'ICML 2023',
        year: 2023,
        abstract: 'Test abstract content',
      },
    });

    expect(result).toContain('Test Paper Title');
    expect(result).toContain('ICML 2023');
    expect(result).toContain('2023');
  });

  it('renders all authors', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Alice Smith', 'Bob Jones', 'Charlie Brown'],
        venue: 'Test Venue',
        year: 2023,
      },
    });

    expect(result).toContain('Alice Smith');
    expect(result).toContain('Bob Jones');
    expect(result).toContain('Charlie Brown');
  });

  it('highlights Cris in authors list with author-highlight class', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Cris Benge', 'Jane Doe'],
        venue: 'Test Venue',
        year: 2023,
      },
    });

    expect(result).toContain('author-highlight');
    expect(result).toContain('Cris Benge');
  });

  it('highlights author with Benge in name', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['C. Benge', 'Co-author'],
        venue: 'Test Venue',
        year: 2023,
      },
    });

    expect(result).toContain('author-highlight');
  });

  it('shows toggle button when abstract is present', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        abstract: 'This is a test abstract with content.',
      },
    });

    expect(result).toContain('data-toggle');
    expect(result).toContain('data-abstract');
    expect(result).toContain('aria-expanded');
  });

  it('hides toggle button when no abstract provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        // No abstract
      },
    });

    expect(result).not.toContain('data-toggle');
    expect(result).not.toContain('data-abstract');
  });

  it('hides toggle when abstract is empty string', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        abstract: '',
      },
    });

    expect(result).not.toContain('data-toggle');
  });

  it('hides toggle when abstract is whitespace only', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        abstract: '   ',
      },
    });

    expect(result).not.toContain('data-toggle');
  });

  it('renders PDF link when pdfUrl is present', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        pdfUrl: 'https://example.com/paper.pdf',
      },
    });

    expect(result).toContain('https://example.com/paper.pdf');
    expect(result).toContain('PDF');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('renders code link when codeUrl is present', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        codeUrl: 'https://github.com/example/repo',
      },
    });

    expect(result).toContain('https://github.com/example/repo');
    expect(result).toContain('Code');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('renders DOI link when doiUrl is present', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        doiUrl: 'https://doi.org/10.1234/example',
      },
    });

    expect(result).toContain('https://doi.org/10.1234/example');
    expect(result).toContain('DOI');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('does not render links section when no links provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
      },
    });

    expect(result).not.toContain('PDF');
    expect(result).not.toContain('Code');
    expect(result).not.toContain('DOI');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
      },
    });

    expect(result).toContain('dark:');
    expect(result).toContain('dark:bg-surface-dark');
    expect(result).toContain('dark:text-text-dark');
  });

  it('includes focus-ring class on interactive elements', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        pdfUrl: 'https://example.com/paper.pdf',
        abstract: 'Test abstract',
      },
    });

    expect(result).toContain('focus-ring');
  });

  it('uses data-component attribute for JS hooks', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
      },
    });

    expect(result).toContain('data-component="publication-card"');
  });

  it('includes external link icons (↗) on all links', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        pdfUrl: 'https://example.com/paper.pdf',
        codeUrl: 'https://github.com/example/repo',
        doiUrl: 'https://doi.org/10.1234/example',
      },
    });

    // Count external link indicators
    const arrowCount = (result.match(/↗/g) || []).length;
    expect(arrowCount).toBeGreaterThanOrEqual(3);
  });

  it('renders aria-label on PDF link for accessibility', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'My Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        pdfUrl: 'https://example.com/paper.pdf',
      },
    });

    expect(result).toContain('aria-label');
    expect(result).toContain('opens in new tab');
  });

  it('renders aria-controls on toggle button', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        abstract: 'Test abstract content',
      },
    });

    expect(result).toContain('aria-controls');
  });

  it('passes through additional HTML attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        'data-testid': 'custom-test-id',
      },
    });

    expect(result).toContain('data-testid="custom-test-id"');
  });

  it('applies custom className', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PublicationCard, {
      props: {
        title: 'Test Paper',
        authors: ['Author'],
        venue: 'Test Venue',
        year: 2023,
        class: 'custom-class',
      },
    });

    expect(result).toContain('custom-class');
  });
});

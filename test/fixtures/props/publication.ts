/**
 * Shared test fixtures for publication-related components
 */

export interface MockPublication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract?: string;
  pdfUrl?: string;
  codeUrl?: string;
  doiUrl?: string;
}

export function createMockPublication(
  overrides: Partial<MockPublication> = {},
): MockPublication {
  return {
    title: 'Test Paper Title',
    authors: ['Author One', 'Author Two'],
    venue: 'ICML 2023',
    year: 2023,
    abstract: 'Test abstract content for the publication.',
    ...overrides,
  };
}

export const mockPublications = {
  basic: createMockPublication(),
  withLinks: createMockPublication({
    pdfUrl: 'https://example.com/paper.pdf',
    codeUrl: 'https://github.com/example/repo',
    doiUrl: 'https://doi.org/10.1234/example',
  }),
  withCris: createMockPublication({
    authors: ['Cris Benge', 'Jane Doe'],
  }),
  minimal: createMockPublication({
    abstract: undefined,
    pdfUrl: undefined,
    codeUrl: undefined,
    doiUrl: undefined,
  }),
};

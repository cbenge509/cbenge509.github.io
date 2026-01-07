/**
 * Shared test fixtures for project-related components
 * These fixtures provide consistent mock data for FeaturedProjectCard,
 * SecondaryProjectCard, and other project-related components.
 */

/**
 * Mock ImageMetadata for testing Astro Image component
 * This mimics the structure of Astro's ImageMetadata type
 */
export interface MockImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

export interface MockProject {
  title: string;
  description: string;
  image: MockImageMetadata;
  category: 'leader' | 'builder' | 'winner' | 'research';
  skills: string[];
  tools: string[];
  githubUrl?: string;
  liveUrl?: string;
  achievement?: string;
  affiliation?: string;
}

/**
 * Default mock image that mimics Astro's ImageMetadata structure
 */
export const mockImageMetadata: MockImageMetadata = {
  src: '/_astro/test-project.hash.webp',
  width: 800,
  height: 450,
  format: 'webp',
};

export const createMockProject = (
  overrides: Partial<MockProject> = {},
): MockProject => ({
  title: 'Test ML Project',
  description:
    'A comprehensive machine learning pipeline for data processing and model training.',
  image: mockImageMetadata,
  category: 'builder',
  skills: ['Python', 'TensorFlow', 'PyTorch'],
  tools: ['Docker', 'Kubernetes'],
  githubUrl: 'https://github.com/example/test-project',
  ...overrides,
});

export const mockProjects = {
  builder: createMockProject({
    category: 'builder',
    title: 'Builder Project',
  }),
  leader: createMockProject({
    category: 'leader',
    title: 'Leadership Project',
  }),
  winner: createMockProject({
    category: 'winner',
    title: 'Competition Winner',
    achievement: 'Grand Prize',
  }),
  research: createMockProject({
    category: 'research',
    title: 'Research Publication',
  }),
  minimal: createMockProject({
    githubUrl: undefined,
    liveUrl: undefined,
    achievement: undefined,
    affiliation: undefined,
  }),
};

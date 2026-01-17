/**
 * Shared test fixtures for award-related components
 */

export interface MockImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

export interface MockAward {
  title: string;
  year: number;
  category: 'competition' | 'professional';
  description: string;
  placement?: string;
  organization?: string;
  logoImage?: MockImageMetadata;
}

export const mockLogoImage: MockImageMetadata = {
  src: '/mock-logo.svg',
  width: 64,
  height: 64,
  format: 'svg',
};

export function createMockAward(overrides: Partial<MockAward> = {}): MockAward {
  return {
    title: 'Test Award',
    year: 2020,
    category: 'competition',
    description: 'Test award description.',
    ...overrides,
  };
}

export const mockAwards = {
  competition: createMockAward({
    category: 'competition',
    placement: '1st Place',
    organization: 'DrivenData',
  }),
  professional: createMockAward({
    category: 'professional',
    organization: 'Microsoft',
  }),
  withLogo: createMockAward({
    category: 'professional',
    organization: 'Microsoft',
    logoImage: mockLogoImage,
  }),
  firstPlace: createMockAward({
    category: 'competition',
    placement: '1st Place',
  }),
  secondPlace: createMockAward({
    category: 'competition',
    placement: '2nd Place',
  }),
  thirdPlace: createMockAward({
    category: 'competition',
    placement: '3rd Place',
  }),
  topPercent: createMockAward({
    category: 'competition',
    placement: 'Top 12%',
  }),
  minimal: createMockAward({
    placement: undefined,
    organization: undefined,
    logoImage: undefined,
  }),
};

/**
 * Shared test fixtures for certification-related components
 */

export interface MockCertification {
  name: string;
  issuer: string;
  year: number;
  category: 'cloud' | 'data' | 'database' | 'other';
  verificationUrl?: string;
}

export function createMockCertification(
  overrides: Partial<MockCertification> = {},
): MockCertification {
  return {
    name: 'Azure Certified Solution Architect Expert',
    issuer: 'Microsoft',
    year: 2023,
    category: 'cloud',
    ...overrides,
  };
}

export const mockCertifications = {
  cloud: createMockCertification({
    category: 'cloud',
  }),
  data: createMockCertification({
    name: 'Data Engineering Professional',
    category: 'data',
  }),
  database: createMockCertification({
    name: 'Database Administrator',
    category: 'database',
  }),
  other: createMockCertification({
    name: 'Project Management Professional',
    category: 'other',
  }),
  withVerification: createMockCertification({
    verificationUrl: 'https://example.com/verify',
  }),
  minimal: createMockCertification({
    verificationUrl: undefined,
  }),
};

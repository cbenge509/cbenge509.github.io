/**
 * Shared test fixtures for education-related components
 */

export interface MockEducation {
  institution: string;
  degree: string;
  field: string;
  year: number;
  gpa?: string;
  logoImage: string;
  institutionUrl?: string;
  honors?: string[];
  order: number;
}

export const createMockEducation = (
  overrides: Partial<MockEducation> = {},
): MockEducation => ({
  institution: 'Test University',
  degree: 'Master of Science',
  field: 'Computer Science',
  year: 2023,
  gpa: '4.0',
  logoImage: '/images/logos/test-university.svg',
  institutionUrl: 'https://test.edu',
  honors: ['Summa Cum Laude'],
  order: 1,
  ...overrides,
});

export const mockEducation = {
  graduate: createMockEducation({
    degree: 'Master of Science',
    field: 'Machine Learning',
  }),
  undergraduate: createMockEducation({
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    year: 2019,
    order: 2,
  }),
  minimal: createMockEducation({
    gpa: undefined,
    institutionUrl: undefined,
    honors: undefined,
  }),
};

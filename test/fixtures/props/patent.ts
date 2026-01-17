/**
 * Shared test fixtures for patent-related components
 */

export interface MockPatent {
  title: string;
  patentNumber: string;
  filingDate: Date;
  grantDate?: Date;
  status: 'filed' | 'pending' | 'granted';
  url?: string;
  description?: string;
}

export function createMockPatent(
  overrides: Partial<MockPatent> = {},
): MockPatent {
  return {
    title: 'Test Patent Title',
    patentNumber: 'US 10,123,456',
    filingDate: new Date('2020-01-15T12:00:00Z'),
    status: 'granted',
    ...overrides,
  };
}

export const mockPatents = {
  granted: createMockPatent({
    status: 'granted',
    grantDate: new Date('2022-06-20T12:00:00Z'),
  }),
  pending: createMockPatent({
    status: 'pending',
    grantDate: undefined,
  }),
  filed: createMockPatent({
    status: 'filed',
    grantDate: undefined,
  }),
  withUrl: createMockPatent({
    url: 'https://patents.google.com/patent/US10123456',
  }),
  withDescription: createMockPatent({
    description: 'A method for efficiently processing data.',
  }),
  minimal: createMockPatent({
    grantDate: undefined,
    url: undefined,
    description: undefined,
  }),
};

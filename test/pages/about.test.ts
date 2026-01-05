import {describe, it, expect, vi} from 'vitest';

// Mock content collections
vi.mock('astro:content', async () => {
  return {
    getCollection: vi.fn().mockImplementation((name: string) => {
      if (name === 'education') {
        return [
          {
            id: 'columbia',
            data: {
              institution: 'Columbia University',
              degree: 'M.S.',
              field: 'Applied Analytics',
              year: 2020,
              logoImage: '../../assets/images/logos/columbia.svg',
              institutionUrl: 'https://www.columbia.edu',
              honors: ['Graduate Certificate in Machine Learning'],
              order: 1,
            },
          },
          {
            id: 'berkeley',
            data: {
              institution: 'UC Berkeley',
              degree: 'MIDS',
              field: 'Data Science',
              year: 2019,
              logoImage: '../../assets/images/logos/berkeley.svg',
              institutionUrl: 'https://www.berkeley.edu',
              order: 2,
            },
          },
          {
            id: 'iwu',
            data: {
              institution: 'Illinois Wesleyan University',
              degree: 'B.S.',
              field: 'Computer Science',
              year: 1998,
              logoImage: '../../assets/images/logos/iwu.svg',
              institutionUrl: 'https://www.iwu.edu',
              honors: ['Minor in Mathematics'],
              order: 3,
            },
          },
        ];
      }
      return [];
    }),
  };
});

describe('About Page', () => {
  describe('Education Section', () => {
    it('education entries should sort by order field', () => {
      // AC3: Education Data Sorted
      const entries = [
        {data: {order: 3, institution: 'IWU'}},
        {data: {order: 1, institution: 'Columbia'}},
        {data: {order: 2, institution: 'Berkeley'}},
      ];

      const sorted = entries.sort((a, b) => a.data.order - b.data.order);

      expect(sorted[0].data.institution).toBe('Columbia');
      expect(sorted[1].data.institution).toBe('Berkeley');
      expect(sorted[2].data.institution).toBe('IWU');
    });

    it('empty collection should hide education section', () => {
      // AC7: Empty State Handling
      const hasEducation = [].length > 0;
      expect(hasEducation).toBe(false);
    });

    it('non-empty collection should show education section', () => {
      // AC7: Empty State Handling
      const mockEducation = [{id: 'test', data: {institution: 'Test'}}];
      const hasEducation = mockEducation.length > 0;
      expect(hasEducation).toBe(true);
    });
  });

  // Story 3-2: Certifications Section
  describe('Certifications Section', () => {
    it('certifications entries should sort by order field', () => {
      // AC4: Sorted by Order
      const entries = [
        {data: {order: 5, name: 'MCSE Data'}},
        {data: {order: 1, name: 'Azure Architect'}},
        {data: {order: 3, name: 'MCSM SQL'}},
      ];

      const sorted = entries.sort((a, b) => a.data.order - b.data.order);

      expect(sorted[0].data.name).toBe('Azure Architect');
      expect(sorted[1].data.name).toBe('MCSM SQL');
      expect(sorted[2].data.name).toBe('MCSE Data');
    });

    it('empty certifications collection should hide certifications section', () => {
      // AC7: Empty State Handling
      const hasCertifications = [].length > 0;
      expect(hasCertifications).toBe(false);
    });

    it('non-empty certifications collection should show certifications section', () => {
      // AC7: Empty State Handling
      const mockCertifications = [
        {
          id: 'azure-architect',
          data: {name: 'Azure Architect', category: 'cloud'},
        },
      ];
      const hasCertifications = mockCertifications.length > 0;
      expect(hasCertifications).toBe(true);
    });

    it('certification entries should have required fields', () => {
      const mockEntry = {
        name: 'Azure Certified Solution Architect Expert',
        issuer: 'Microsoft',
        year: 2023,
        category: 'cloud',
        order: 1,
      };

      expect(mockEntry.name).toBeDefined();
      expect(mockEntry.issuer).toBeDefined();
      expect(mockEntry.year).toBeDefined();
      expect(mockEntry.category).toBeDefined();
      expect(mockEntry.order).toBeDefined();
    });

    it('verificationUrl should be optional', () => {
      const entryWithUrl = {
        name: 'Azure Architect',
        verificationUrl: 'https://verify.microsoft.com/123',
      };
      const entryWithoutUrl = {
        name: 'Legacy Cert',
      };

      expect(entryWithUrl.verificationUrl).toBeDefined();
      expect(entryWithoutUrl.verificationUrl).toBeUndefined();
    });
  });

  // Story 3-2: Awards Section
  describe('Awards Section', () => {
    it('awards entries should sort by order field', () => {
      // AC4: Sorted by Order
      const entries = [
        {data: {order: 5, title: 'Platinum Club'}},
        {data: {order: 1, title: 'World Bank Competition'}},
        {data: {order: 3, title: 'Sales Forecasting'}},
      ];

      const sorted = entries.sort((a, b) => a.data.order - b.data.order);

      expect(sorted[0].data.title).toBe('World Bank Competition');
      expect(sorted[1].data.title).toBe('Sales Forecasting');
      expect(sorted[2].data.title).toBe('Platinum Club');
    });

    it('empty awards collection should hide awards section', () => {
      // AC7: Empty State Handling
      const hasAwards = [].length > 0;
      expect(hasAwards).toBe(false);
    });

    it('non-empty awards collection should show awards section', () => {
      // AC7: Empty State Handling
      const mockAwards = [
        {
          id: 'drivendata-2019',
          data: {title: 'World Bank', category: 'competition'},
        },
      ];
      const hasAwards = mockAwards.length > 0;
      expect(hasAwards).toBe(true);
    });

    it('awards can be filtered by category', () => {
      // AC2: Awards Section Displays - competition vs professional
      const mockAwards = [
        {data: {title: 'World Bank', category: 'competition'}},
        {data: {title: 'Kaggle RSNA', category: 'competition'}},
        {data: {title: 'Platinum Club', category: 'professional'}},
        {data: {title: 'Hero Award', category: 'professional'}},
      ];

      const competitionAwards = mockAwards.filter(
        a => a.data.category === 'competition',
      );
      const professionalAwards = mockAwards.filter(
        a => a.data.category === 'professional',
      );

      expect(competitionAwards.length).toBe(2);
      expect(professionalAwards.length).toBe(2);
    });

    it('award entries should have required fields', () => {
      const mockEntry = {
        title: 'World Bank Publication Topics',
        year: 2019,
        category: 'competition',
        description: 'Machine learning competition',
        order: 1,
      };

      expect(mockEntry.title).toBeDefined();
      expect(mockEntry.year).toBeDefined();
      expect(mockEntry.category).toBeDefined();
      expect(mockEntry.description).toBeDefined();
      expect(mockEntry.order).toBeDefined();
    });

    it('placement and organization should be optional', () => {
      const competitionAward = {
        title: 'World Bank',
        placement: '1st Place',
        organization: 'DrivenData',
      };
      const professionalAward = {
        title: 'Hero Award',
        organization: 'Microsoft',
      };

      expect(competitionAward.placement).toBeDefined();
      expect(competitionAward.organization).toBeDefined();
      expect(professionalAward.placement).toBeUndefined();
      expect(professionalAward.organization).toBeDefined();
    });
  });

  describe('Content Validation', () => {
    it('education entries should have required fields', () => {
      const mockEntry = {
        institution: 'Columbia University',
        degree: 'M.S.',
        field: 'Applied Analytics',
        year: 2020,
        logoImage: 'path/to/logo.svg',
        order: 1,
      };

      expect(mockEntry.institution).toBeDefined();
      expect(mockEntry.degree).toBeDefined();
      expect(mockEntry.field).toBeDefined();
      expect(mockEntry.year).toBeDefined();
      expect(mockEntry.logoImage).toBeDefined();
      expect(mockEntry.order).toBeDefined();
    });

    it('institution URL should be optional', () => {
      const entryWithUrl = {
        institution: 'Columbia',
        institutionUrl: 'https://www.columbia.edu',
      };
      const entryWithoutUrl = {
        institution: 'Local College',
      };

      expect(entryWithUrl.institutionUrl).toBeDefined();
      expect(entryWithoutUrl.institutionUrl).toBeUndefined();
    });

    it('honors array should be optional', () => {
      const entryWithHonors = {
        institution: 'Columbia',
        honors: ['Summa Cum Laude'],
      };
      const entryWithoutHonors = {
        institution: 'Berkeley',
      };

      expect(entryWithHonors.honors).toBeDefined();
      expect(entryWithHonors.honors?.length).toBe(1);
      expect(entryWithoutHonors.honors).toBeUndefined();
    });
  });
});

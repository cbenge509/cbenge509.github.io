import {describe, it, expect} from 'vitest';
import {
  byOrder,
  byYearDesc,
  byPublishDateDesc,
  byPatentDateDesc,
  byOrderOrYearDesc,
} from './collection-sort';

describe('collection-sort utilities', () => {
  describe('byOrder', () => {
    it('sorts by order ascending', () => {
      const items = [
        {data: {order: 2}},
        {data: {order: 1}},
        {data: {order: 3}},
      ];
      const sorted = items.sort(byOrder);
      expect(sorted.map(i => i.data.order)).toEqual([1, 2, 3]);
    });

    it('puts items without order last', () => {
      const items = [{data: {order: 2}}, {data: {}}, {data: {order: 1}}];
      const sorted = items.sort(byOrder);
      expect(sorted.map(i => i.data.order)).toEqual([1, 2, undefined]);
    });
  });

  describe('byYearDesc', () => {
    it('sorts by year descending', () => {
      const items = [
        {data: {year: 2022}},
        {data: {year: 2024}},
        {data: {year: 2023}},
      ];
      const sorted = items.sort(byYearDesc);
      expect(sorted.map(i => i.data.year)).toEqual([2024, 2023, 2022]);
    });
  });

  describe('byPublishDateDesc', () => {
    it('sorts by publish date descending', () => {
      const items = [
        {data: {publishDate: new Date('2023-01-15')}},
        {data: {publishDate: new Date('2024-06-01')}},
        {data: {publishDate: new Date('2023-12-01')}},
      ];
      const sorted = items.sort(byPublishDateDesc);
      expect(sorted[0].data.publishDate.getFullYear()).toBe(2024);
      expect(sorted[2].data.publishDate.getFullYear()).toBe(2023);
    });
  });

  describe('byPatentDateDesc', () => {
    it('uses grantDate when present', () => {
      const items = [
        {
          data: {
            filingDate: new Date(2020, 0, 1),
            grantDate: new Date(2023, 5, 1),
          },
        },
        {
          data: {
            filingDate: new Date(2022, 0, 1),
            grantDate: new Date(2024, 0, 1),
          },
        },
        {
          data: {
            filingDate: new Date(2019, 0, 1),
            grantDate: new Date(2022, 0, 1),
          },
        },
      ];
      const sorted = [...items].sort(byPatentDateDesc);
      expect(sorted[0].data.grantDate?.getFullYear()).toBe(2024);
      expect(sorted[1].data.grantDate?.getFullYear()).toBe(2023);
      expect(sorted[2].data.grantDate?.getFullYear()).toBe(2022);
    });

    it('falls back to filingDate when grantDate missing', () => {
      const items = [
        {data: {filingDate: new Date(2022, 0, 1)}},
        {data: {filingDate: new Date(2023, 5, 1)}},
        {data: {filingDate: new Date(2021, 5, 1)}},
      ];
      const sorted = [...items].sort(byPatentDateDesc);
      expect(sorted[0].data.filingDate.getFullYear()).toBe(2023);
      expect(sorted[1].data.filingDate.getFullYear()).toBe(2022);
      expect(sorted[2].data.filingDate.getFullYear()).toBe(2021);
    });
  });

  describe('byOrderOrYearDesc', () => {
    it('uses order when both have it', () => {
      const items = [
        {data: {order: 2, year: 2024}},
        {data: {order: 1, year: 2022}},
      ];
      const sorted = items.sort(byOrderOrYearDesc);
      expect(sorted[0].data.order).toBe(1);
    });

    it('falls back to year when order missing', () => {
      const items = [{data: {year: 2022}}, {data: {year: 2024}}];
      const sorted = items.sort(byOrderOrYearDesc);
      expect(sorted[0].data.year).toBe(2024);
    });
  });
});

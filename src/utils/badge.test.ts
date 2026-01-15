import {describe, it, expect} from 'vitest';
import {
  BADGE_BASE_CLASSES,
  CERTIFICATION_BADGE_COLORS,
  PATENT_STATUS_COLORS,
  AWARD_CATEGORY_COLORS,
  getPlacementBadgeColor,
} from './badge';

describe('badge utilities', () => {
  describe('BADGE_BASE_CLASSES', () => {
    it('provides consistent base classes', () => {
      expect(BADGE_BASE_CLASSES).toContain('inline-flex');
      expect(BADGE_BASE_CLASSES).toContain('items-center');
      expect(BADGE_BASE_CLASSES).toContain('rounded-full');
      expect(BADGE_BASE_CLASSES).toContain('text-xs');
      expect(BADGE_BASE_CLASSES).toContain('font-medium');
    });
  });

  describe('CERTIFICATION_BADGE_COLORS', () => {
    it('provides cloud badge colors', () => {
      expect(CERTIFICATION_BADGE_COLORS.cloud).toContain('bg-blue-100');
      expect(CERTIFICATION_BADGE_COLORS.cloud).toContain('text-blue-800');
      expect(CERTIFICATION_BADGE_COLORS.cloud).toContain('dark:bg-blue-900');
    });

    it('provides data badge colors', () => {
      expect(CERTIFICATION_BADGE_COLORS.data).toContain('bg-green-100');
      expect(CERTIFICATION_BADGE_COLORS.data).toContain('text-green-800');
    });

    it('provides database badge colors', () => {
      expect(CERTIFICATION_BADGE_COLORS.database).toContain('bg-purple-100');
      expect(CERTIFICATION_BADGE_COLORS.database).toContain('text-purple-800');
    });

    it('provides other category badge colors', () => {
      expect(CERTIFICATION_BADGE_COLORS.other).toContain('bg-gray-100');
      expect(CERTIFICATION_BADGE_COLORS.other).toContain('text-gray-800');
    });
  });

  describe('PATENT_STATUS_COLORS', () => {
    it('provides granted status colors (green)', () => {
      expect(PATENT_STATUS_COLORS.granted).toContain('bg-green-100');
      expect(PATENT_STATUS_COLORS.granted).toContain('text-green-800');
    });

    it('provides pending status colors (amber)', () => {
      expect(PATENT_STATUS_COLORS.pending).toContain('bg-amber-100');
      expect(PATENT_STATUS_COLORS.pending).toContain('text-amber-800');
    });

    it('provides filed status colors (blue)', () => {
      expect(PATENT_STATUS_COLORS.filed).toContain('bg-blue-100');
      expect(PATENT_STATUS_COLORS.filed).toContain('text-blue-800');
    });
  });

  describe('AWARD_CATEGORY_COLORS', () => {
    it('provides competition category colors (indigo)', () => {
      expect(AWARD_CATEGORY_COLORS.competition).toContain('bg-indigo-100');
      expect(AWARD_CATEGORY_COLORS.competition).toContain('text-indigo-800');
    });

    it('provides professional category colors (blue)', () => {
      expect(AWARD_CATEGORY_COLORS.professional).toContain('bg-blue-100');
      expect(AWARD_CATEGORY_COLORS.professional).toContain('text-blue-800');
    });
  });

  describe('getPlacementBadgeColor', () => {
    it('returns gold for 1st place', () => {
      expect(getPlacementBadgeColor('1st Place')).toContain('bg-amber-100');
      expect(getPlacementBadgeColor('1st Place')).toContain('text-amber-800');
    });

    it('returns gold for first place (case insensitive)', () => {
      expect(getPlacementBadgeColor('First Place')).toContain('bg-amber-100');
      expect(getPlacementBadgeColor('FIRST PLACE')).toContain('bg-amber-100');
    });

    it('returns silver for 2nd place', () => {
      expect(getPlacementBadgeColor('2nd Place')).toContain('bg-gray-200');
      expect(getPlacementBadgeColor('2nd Place')).toContain('text-gray-700');
    });

    it('returns bronze for 3rd place', () => {
      expect(getPlacementBadgeColor('3rd Place')).toContain('bg-orange-100');
      expect(getPlacementBadgeColor('3rd Place')).toContain('text-orange-800');
    });

    it('returns bronze for third place (case insensitive)', () => {
      expect(getPlacementBadgeColor('Third Place')).toContain('bg-orange-100');
      expect(getPlacementBadgeColor('THIRD PLACE')).toContain('bg-orange-100');
    });

    it('returns silver for Top X% placement', () => {
      expect(getPlacementBadgeColor('Top 12%')).toContain('bg-gray-200');
      expect(getPlacementBadgeColor('Top 5%')).toContain('bg-gray-200');
    });

    it('returns silver for other placements', () => {
      expect(getPlacementBadgeColor('4th Place')).toContain('bg-gray-200');
      expect(getPlacementBadgeColor('Finalist')).toContain('bg-gray-200');
    });
  });
});

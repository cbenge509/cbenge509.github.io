import {describe, it, expect} from 'vitest';
import {
  cardContainerClasses,
  cardSurfaceContainerClasses,
  BULLET_SEPARATOR,
} from './card-styles';

describe('card-styles utilities', () => {
  describe('cardContainerClasses', () => {
    it('provides consistent card container classes', () => {
      const classes = cardContainerClasses();
      expect(classes).toContain('rounded-xl');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('dark:bg-gray-900/50');
      expect(classes).toContain('border');
      expect(classes).toContain('border-gray-200');
      expect(classes).toContain('dark:border-gray-800');
      expect(classes).toContain('p-6');
      expect(classes).toContain('transition-all');
      expect(classes).toContain('hover:shadow-md');
      expect(classes).toContain('hover:-translate-y-1');
    });

    it('merges custom classes with card container', () => {
      const classes = cardContainerClasses('custom-class another-class');
      expect(classes).toContain('custom-class');
      expect(classes).toContain('another-class');
      expect(classes).toContain('rounded-xl');
      expect(classes).toContain('bg-white');
    });

    it('handles undefined className', () => {
      const classes = cardContainerClasses(undefined);
      expect(classes).toContain('rounded-xl');
      expect(classes).not.toContain('undefined');
    });

    it('handles empty string className', () => {
      const classes = cardContainerClasses('');
      expect(classes).toContain('rounded-xl');
    });
  });

  describe('cardSurfaceContainerClasses', () => {
    it('provides surface-based card classes', () => {
      const classes = cardSurfaceContainerClasses();
      expect(classes).toContain('rounded-xl');
      expect(classes).toContain('bg-surface');
      expect(classes).toContain('dark:bg-surface-dark');
      expect(classes).toContain('border');
      expect(classes).toContain('border-gray-200');
      expect(classes).toContain('dark:border-gray-700');
      expect(classes).toContain('p-6');
      expect(classes).toContain('transition-shadow');
      expect(classes).toContain('hover:shadow-md');
    });

    it('does not include transform hover effect', () => {
      const classes = cardSurfaceContainerClasses();
      expect(classes).not.toContain('hover:-translate-y-1');
    });

    it('merges custom classes with surface container', () => {
      const classes = cardSurfaceContainerClasses('patent-card');
      expect(classes).toContain('patent-card');
      expect(classes).toContain('bg-surface');
    });

    it('handles undefined className', () => {
      const classes = cardSurfaceContainerClasses(undefined);
      expect(classes).toContain('bg-surface');
      expect(classes).not.toContain('undefined');
    });
  });

  describe('BULLET_SEPARATOR', () => {
    it('provides accessible bullet separator markup', () => {
      expect(BULLET_SEPARATOR).toContain('<span');
      expect(BULLET_SEPARATOR).toContain('aria-hidden="true"');
      expect(BULLET_SEPARATOR).toContain('•');
      expect(BULLET_SEPARATOR).toContain('</span>');
    });

    it('is a const string', () => {
      expect(typeof BULLET_SEPARATOR).toBe('string');
    });

    it('contains proper HTML structure', () => {
      expect(BULLET_SEPARATOR).toBe('<span aria-hidden="true">•</span>');
    });
  });
});

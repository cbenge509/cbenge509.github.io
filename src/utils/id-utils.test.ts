import {describe, it, expect} from 'vitest';
import {toSlugId} from './id-utils';

describe('id-utils', () => {
  describe('toSlugId', () => {
    it('converts text to lowercase slug', () => {
      expect(toSlugId('My Publication Title')).toBe('my-publication-title');
    });

    it('replaces multiple spaces with single hyphens', () => {
      expect(toSlugId('Title   With   Spaces')).toBe('title-with-spaces');
    });

    it('handles single word input', () => {
      expect(toSlugId('Title')).toBe('title');
    });

    it('adds prefix when provided', () => {
      expect(toSlugId('My Title', 'abstract')).toBe('abstract-my-title');
    });

    it('works with various prefixes', () => {
      expect(toSlugId('Test Item', 'section')).toBe('section-test-item');
      expect(toSlugId('Test Item', 'content')).toBe('content-test-item');
    });

    it('handles already lowercase text', () => {
      expect(toSlugId('already lowercase')).toBe('already-lowercase');
    });

    it('handles mixed case text', () => {
      expect(toSlugId('MiXeD CaSe TeXt')).toBe('mixed-case-text');
    });

    it('returns empty prefix when prefix is undefined', () => {
      expect(toSlugId('test', undefined)).toBe('test');
    });
  });
});

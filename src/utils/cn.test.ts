import {describe, it, expect} from 'vitest';
import {cn} from './cn';

describe('cn utility', () => {
  it('combines class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const shouldInclude = true;
    const shouldExclude = false;
    expect(
      cn('base', shouldInclude && 'included', shouldExclude && 'excluded'),
    ).toBe('base included');
  });

  it('merges Tailwind conflicts (later wins)', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('handles objects with boolean values', () => {
    expect(cn({foo: true, bar: false, baz: true})).toBe('foo baz');
  });

  it('merges complex Tailwind utilities', () => {
    expect(cn('text-red-500 bg-blue-200', 'text-green-500')).toBe(
      'bg-blue-200 text-green-500',
    );
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
  });
});

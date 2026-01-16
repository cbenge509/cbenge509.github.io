/**
 * Utility functions for generating URL-safe element IDs.
 */

/**
 * Converts a string to a URL-safe slug for use as element IDs.
 * Replaces whitespace with hyphens and converts to lowercase.
 *
 * @param text - The text to convert
 * @param prefix - Optional prefix for the ID
 * @returns URL-safe slug
 *
 * @example
 * ```ts
 * toSlugId('My Publication Title');
 * // Returns: 'my-publication-title'
 *
 * toSlugId('My Publication Title', 'abstract');
 * // Returns: 'abstract-my-publication-title'
 * ```
 */
export function toSlugId(text: string, prefix?: string): string {
  const slug = text.replace(/\s+/g, '-').toLowerCase();
  return prefix ? `${prefix}-${slug}` : slug;
}

/**
 * Badge utility functions for consistent badge styling across card components.
 * Provides type-safe color mappings for common badge patterns.
 *
 * NOTE: Explicit color strings are intentionally used rather than a factory function.
 * This design choice keeps colors readable, customizable, and compatible with
 * Tailwind's JIT purging (dynamic class strings may not be detected).
 */

/**
 * Standard badge base classes used by all badge types.
 * Use with cn() to compose with color classes.
 *
 * @example
 * ```ts
 * import {cn} from './cn';
 * import {BADGE_BASE_CLASSES, CERTIFICATION_BADGE_COLORS} from './badge';
 *
 * const badgeClass = cn(BADGE_BASE_CLASSES, CERTIFICATION_BADGE_COLORS.cloud);
 * ```
 */
export const BADGE_BASE_CLASSES =
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium' as const;

/**
 * Category badge color mappings for certification cards.
 * Provides consistent styling for cloud, data, database, and other certifications.
 */
export const CERTIFICATION_BADGE_COLORS: Record<
  'cloud' | 'data' | 'database' | 'other',
  string
> = {
  cloud: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
  data: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  database:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
} as const;

/**
 * Patent status badge color mappings.
 * Provides visual differentiation for filed, pending, and granted patents.
 */
export const PATENT_STATUS_COLORS: Record<
  'filed' | 'pending' | 'granted',
  string
> = {
  granted:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pending:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  filed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
} as const;

/**
 * Award category badge color mappings.
 * Differentiates competition awards from professional recognition.
 */
export const AWARD_CATEGORY_COLORS = {
  competition:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
  professional:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
} as const;

/**
 * Education honor badge colors.
 * Blue color scheme for academic distinctions.
 *
 * NOTE: Kept as named constant (not inlined) for:
 * - Consistency with other badge color exports
 * - Semantic clarity in component usage
 * - Single source of truth for design changes
 */
export const EDUCATION_HONOR_COLORS =
  'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' as const;

/**
 * Display labels for certification categories.
 */
export const CERTIFICATION_CATEGORY_LABELS: Record<
  'cloud' | 'data' | 'database' | 'other',
  string
> = {
  cloud: 'Cloud',
  data: 'Data',
  database: 'Database',
  other: 'Other',
} as const;

/**
 * Determines placement badge style based on ranking text.
 * Provides semantic color coding:
 * - Gold: 1st place
 * - Silver: 2nd place or Top X%
 * - Bronze: 3rd place
 *
 * @param placement - Placement text (e.g., "1st Place", "Top 12%", "2nd Place")
 * @returns Tailwind classes for badge styling
 *
 * @example
 * ```ts
 * import {cn} from './cn';
 * import {BADGE_BASE_CLASSES, getPlacementBadgeColor} from './badge';
 *
 * const placement = "1st Place";
 * const badgeClass = cn(BADGE_BASE_CLASSES, getPlacementBadgeColor(placement));
 * // Returns gold-colored badge classes
 * ```
 */
export function getPlacementBadgeColor(placement: string): string {
  const lower = placement.toLowerCase();

  if (lower.includes('1st') || lower.includes('first')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200';
  }

  if (lower.includes('3rd') || lower.includes('third')) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200';
  }

  // 2nd place or "Top X%" - silver style
  return 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200';
}

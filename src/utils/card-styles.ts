import {cn} from './cn';

/**
 * Card styling utilities for consistent card component appearance.
 * Provides reusable class compositions for card containers and common patterns.
 */

/**
 * Standard card container classes used across card components.
 * Includes rounded corners, background, border, padding, and hover effects.
 * Uses white background with gray-900 for dark mode.
 *
 * @param className - Optional additional classes to merge
 * @returns Merged class string with card base styles
 *
 * @example
 * ```astro
 * ---
 * import {cardContainerClasses} from '../utils/card-styles';
 * import {cn} from '../utils/cn';
 * ---
 * <article class={cardContainerClasses(cn('custom-class', className))}>
 *   Card content
 * </article>
 * ```
 */
export function cardContainerClasses(className?: string): string {
  return cn(
    'rounded-xl',
    'bg-white dark:bg-gray-900/50',
    'border border-gray-200 dark:border-gray-800',
    'p-6',
    'transition-all duration-200',
    'hover:shadow-md hover:-translate-y-1',
    className,
  );
}

/**
 * Card container classes for cards using surface colors.
 * Used by PatentCard, PublicationCard, and project cards.
 * Surface colors provide semantic alternatives to white/gray-900.
 *
 * @param className - Optional additional classes to merge
 * @returns Merged class string with surface-based card styles
 *
 * @example
 * ```astro
 * ---
 * import {cardSurfaceContainerClasses} from '../utils/card-styles';
 * ---
 * <article class={cardSurfaceContainerClasses('patent-card')}>
 *   Patent content
 * </article>
 * ```
 */
export function cardSurfaceContainerClasses(className?: string): string {
  return cn(
    'rounded-xl',
    'bg-surface dark:bg-surface-dark',
    'border border-gray-200 dark:border-gray-700',
    'p-6',
    'transition-shadow duration-150',
    'hover:shadow-md',
    className,
  );
}

/**
 * External link classes for consistent styling.
 * Provides standard accent color, hover underline, and focus ring.
 *
 * @example
 * ```astro
 * <a
 *   href={url}
 *   target="_blank"
 *   rel="noopener noreferrer"
 *   class={EXTERNAL_LINK_CLASSES}
 * >
 *   Link text
 * </a>
 * ```
 */
export const EXTERNAL_LINK_CLASSES =
  'inline-flex items-center gap-1 text-sm text-accent dark:text-accent-dark hover:underline focus-ring rounded' as const;

/**
 * Bullet separator for metadata sections.
 * Consistent accessible separator used across cards.
 * Uses aria-hidden for screen reader accessibility.
 *
 * @example
 * ```astro
 * ---
 * import {BULLET_SEPARATOR} from '../utils/card-styles';
 * ---
 * <div>
 *   <span>{issuer}</span>
 *   <Fragment set:html={BULLET_SEPARATOR} />
 *   <span>{year}</span>
 * </div>
 * ```
 */
export const BULLET_SEPARATOR = '<span aria-hidden="true">•</span>' as const;

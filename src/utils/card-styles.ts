import {cn} from './cn';

/**
 * Card styling utilities for consistent card component appearance.
 * Provides reusable class compositions for card containers and common patterns.
 */

/**
 * Card container with elevated hover effect (lift + shadow).
 * Best for interactive cards that benefit from visual lift feedback.
 * Uses white/gray-900 background for maximum contrast.
 *
 * Use this for: Interactive cards, clickable items, cards in grids
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
 * Card container with subtle hover effect (shadow only, no lift).
 * Best for content cards where lift animation would be distracting.
 * Uses surface tokens for semantic color theming.
 *
 * Use this for: Content-heavy cards, publication cards, patent cards
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

/**
 * Interactive card container for clickable project cards.
 * Includes focus-within ring, active scale, and elevated hover effect.
 * Uses surface tokens for semantic color theming.
 *
 * Use this for: Project cards, clickable items with focus-within support
 *
 * @param className - Optional additional classes to merge
 * @returns Merged class string with interactive card styles
 *
 * @example
 * ```astro
 * ---
 * import {interactiveCardClasses} from '../utils/card-styles';
 * ---
 * <article class={interactiveCardClasses('featured-card')}>
 *   Card content with nested link
 * </article>
 * ```
 */
export function interactiveCardClasses(className?: string): string {
  return cn(
    'rounded-lg overflow-hidden',
    'bg-surface dark:bg-surface-dark',
    'shadow-sm hover:shadow-lg',
    'transition-all duration-150 ease-out',
    'hover:-translate-y-1',
    'active:scale-[0.98]',
    'focus-within:ring-2 focus-within:ring-accent dark:focus-within:ring-accent-dark',
    'focus-within:ring-offset-2 focus-within:ring-offset-bg dark:focus-within:ring-offset-bg-dark',
    className,
  );
}

/**
 * Project category utilities for mapping content collection categories
 * to display variants and labels.
 *
 * Used by FeaturedProjectCard and SecondaryProjectCard to provide
 * consistent category-to-variant mapping and display labels.
 */

/**
 * Project category type from content collection schema.
 */
export type ProjectCategory = 'leader' | 'builder' | 'winner' | 'research';

/**
 * ProjectTag variant type for styling.
 */
export type ProjectTagVariant =
  | 'leadership'
  | 'technical'
  | 'winner'
  | 'research';

/**
 * Maps content collection category to ProjectTag variant.
 * Provides consistent category-to-variant transformation.
 *
 * @example
 * ```ts
 * import {CATEGORY_TO_VARIANT} from './project-categories';
 *
 * const category: ProjectCategory = 'leader';
 * const variant = CATEGORY_TO_VARIANT[category]; // 'leadership'
 * ```
 */
export const CATEGORY_TO_VARIANT: Record<ProjectCategory, ProjectTagVariant> = {
  leader: 'leadership',
  builder: 'technical',
  winner: 'winner',
  research: 'research',
} as const;

/**
 * Display labels for project categories.
 * Provides human-readable labels for UI display.
 *
 * @example
 * ```ts
 * import {CATEGORY_LABELS} from './project-categories';
 *
 * const category: ProjectCategory = 'leader';
 * const label = CATEGORY_LABELS[category]; // 'Leadership'
 * ```
 */
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  leader: 'Leadership',
  builder: 'Technical',
  winner: 'Winner',
  research: 'Research',
} as const;

/**
 * Project data shape from content collection.
 * Used by FeaturedProjectCard and SecondaryProjectCard components.
 */
export interface ProjectData {
  title: string;
  description: string;
  image: ImageMetadata;
  category: ProjectCategory;
  skills: string[];
  tools: string[];
  githubUrl?: string;
  achievement?: string;
  affiliation?: string;
}

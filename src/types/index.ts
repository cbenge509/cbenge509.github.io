/**
 * Shared TypeScript type definitions
 */

/**
 * Theme type for light/dark mode
 */
export type Theme = 'light' | 'dark';

/**
 * Navigation item type
 */
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

/**
 * Social link type
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

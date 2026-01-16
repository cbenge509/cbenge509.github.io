/**
 * Centralized profile data for consistent use across components.
 * Single source of truth for social links and professional information.
 */

export interface SocialLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/cbenge509',
    ariaLabel: 'GitHub profile',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/crisbenge/',
    ariaLabel: 'LinkedIn profile',
  },
] as const;

/**
 * Get a specific social link by label.
 */
export function getSocialLink(label: 'GitHub' | 'LinkedIn'): SocialLink {
  const link = SOCIAL_LINKS.find(l => l.label === label);
  if (!link) throw new Error(`Social link not found: ${label}`);
  return link;
}

/**
 * CV download URL (relative to public directory).
 */
export const CV_URL = '/cris-benge-cv.pdf' as const;

/**
 * Professional credentials displayed in Hero component.
 */
export interface Credential {
  label: string;
  type: 'education' | 'clearance';
}

/**
 * Hero section profile data.
 */
export const HERO_PROFILE = {
  name: 'Cris Benge',
  role: 'Head of Federal Innovation, Google',
  credentials: [
    {label: 'Senior Leadership', type: 'education'},
    {label: 'Research', type: 'education'},
    {label: 'Data Science', type: 'education'},
    {label: 'TS/SCI w/ Polygraph', type: 'clearance'},
  ] satisfies Credential[],
} as const;

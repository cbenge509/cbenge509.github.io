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

/**
 * Extended profile data for about page and SEO.
 * Single source of truth for biographical and schema.org data.
 */
export const PROFILE_DATA = {
  name: 'Cris Benge',
  jobTitle: 'Head of Federal Innovation',
  employer: 'Google',
  siteUrl: 'https://cbenge509.github.io',
  twitterHandle: '@cbaborern',

  bio: {
    intro:
      "I'm Cris Benge, Head of Federal Innovation at Google, where I lead AI/ML prototype initiatives that transform how U.S. federal agencies leverage cutting-edge technology to solve complex mission problems.",
    experience:
      'With over two decades of experience in software engineering, data science, and technical leadership, I specialize in building scalable machine learning systems and driving innovation at the intersection of technology and public service.',
    passion:
      "I'm passionate about mentoring the next generation of technologists and contributing to open-source projects and research that advance the field of artificial intelligence.",
  },

  // Derived from SOCIAL_LINKS for single source of truth
  socialProfiles: SOCIAL_LINKS.map(link => link.href),

  education: [{name: 'Columbia University'}, {name: 'UC Berkeley'}],
};

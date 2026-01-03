---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - docs/index.md
  - docs/architecture.md
  - docs/tech-stack.md
  - docs/development.md
  - docs/content-guide.md
workflowType: 'architecture'
project_name: 'cbenge509.github.io'
user_name: 'Cris'
date: '2026-01-02'
lastStep: 8
status: 'complete'
completedAt: '2026-01-02'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The PRD defines 32 functional requirements across 6 domains:

| Domain | FRs | Key Capabilities |
|--------|-----|------------------|
| Navigation & IA | FR1-4 | Site-wide nav, social links, CV access |
| Professional Profile | FR5-9 | Credentials, clearance, Google Scholar |
| Project Portfolio | FR10-15 | Gallery, project details, GitHub integration |
| Publications & Patents | FR16-20 | Expandable abstracts, PDFs, new Patents section |
| Theme & Display | FR23-26 | Dark/light mode with system detection + manual toggle |
| Responsive | FR30-32 | Full mobile/tablet/desktop functionality |

**Architectural Implications:**
- Component-based architecture for reusable UI elements
- Content schema for markdown-driven project/publication data
- Theme system with localStorage persistence and FOUC prevention
- Mobile-first responsive design with breakpoints at 640/768/1024/1280px

**Non-Functional Requirements:**

23 NFRs drive key architectural decisions:

| Category | Key Targets | Architectural Impact |
|----------|-------------|---------------------|
| Performance (NFR1-6) | FCP < 1.5s, LCP < 2s, CLS < 0.1, Lighthouse > 90 | Asset optimization, minimal JS, efficient CSS |
| Compatibility (NFR7-11) | Latest 2 versions of major browsers | Modern CSS/JS, no polyfills needed |
| Accessibility (NFR12-16) | WCAG AA compliance | Semantic HTML, focus management, ARIA patterns |
| SEO (NFR17-21) | Top 3 for "Cris Benge", Lighthouse SEO > 90 | Meta tags, structured data, sitemap |
| Security (NFR22-23) | HTTPS, SRI hashes | GitHub Pages SSL, CDN integrity |

**Scale & Complexity:**

- Primary domain: Static Web Application (JAMstack)
- Complexity level: Medium
- Estimated pages: ~15 (home + 9 projects + education + skills + awards + patents)
- Estimated components: 12-15 reusable UI components

### Technical Constraints & Dependencies

**Platform Constraints:**
- Must deploy to GitHub Pages (static files only)
- No server-side rendering or dynamic backends
- Build output must be pure HTML/CSS/JS

**Migration Constraints:**
- Brownfield project - must preserve all existing content
- Zero-downtime transition required
- Current content in 13 HTML files must be extracted to structured data

**Technology Decisions (from UX Spec):**
- CSS Framework: Tailwind CSS (already decided)
- SSG Candidate: Astro (recommended, to be confirmed)
- Dark Mode Strategy: Class-based with `dark:` prefix
- Typography: Space Grotesk (display) + Inter (body) + JetBrains Mono (code)
- Color System: Google Blue accent (#2563eb light / #3b82f6 dark)

### Cross-Cutting Concerns Identified

| Concern | Scope | Implementation Notes |
|---------|-------|---------------------|
| **Theme System** | All pages, all components | CSS custom properties, inline head script, localStorage |
| **Navigation** | All pages | Sticky header, hide-on-scroll, mobile hamburger |
| **SEO** | All pages | Base layout with configurable meta |
| **Responsive** | All components | Mobile-first, Tailwind breakpoints |
| **Accessibility** | All interactive elements | Focus management, ARIA, reduced-motion |
| **Performance** | All assets | Image optimization, font loading strategy, minimal JS |
| **Animation System** | Hero + scroll reveals | CSS keyframes, IntersectionObserver, reduced-motion respect |

### Content Architecture

**Content Schema Design (Astro Content Collections):**

| Collection | Schema Fields | Source |
|------------|---------------|--------|
| `projects` | title, description, image, github, skills[], tools[], featured, date, category (Leader/Builder/Winner) | Extracted from 9 project HTML pages |
| `publications` | title, authors, venue, year, abstract, pdfUrl, codeUrl | Extracted from index.html |
| `patents` | title, patentNumber, url, date | New content section |
| `education` | institution, degree, field, year, gpa, honors | Extracted from education page |
| `certifications` | name, issuer, date, badgeUrl | Extracted from skills page |

**Validation:** Zod schemas for type-safe content at build time.

### Component Architecture

**UX Spec → Astro Component Mapping:**

| UX Component | Astro File | Props | Notes |
|--------------|------------|-------|-------|
| Hero Section | `Hero.astro` | name, role, credentials[], ctas[] | Signature animation |
| Credential Badge | `CredentialBadge.astro` | label, variant | education/clearance/cert |
| Featured Project Card | `FeaturedProjectCard.astro` | project (from collection) | Triple-threat tags |
| Secondary Project Card | `SecondaryProjectCard.astro` | project | Compact horizontal |
| Navigation Bar | `Navigation.astro` | currentPath | Hide-on-scroll behavior |
| CTA Button | `Button.astro` | variant, href, external | primary/secondary/ghost |
| Theme Toggle | `ThemeToggle.astro` | - | Client-side island |
| Publication Card | `PublicationCard.astro` | publication | Expandable abstract |

### Island Architecture

**Interactive Elements (Client-Side JS):**

This is a static site with minimal JavaScript. Only ONE interactive island requires client hydration:

| Island | Directive | Purpose |
|--------|-----------|---------|
| `ThemeToggle.astro` | `client:load` | Toggle dark/light mode, persist to localStorage |

All other interactivity (nav scroll behavior, animation triggers) uses vanilla JS with no framework hydration.

### Testing Architecture

**Quality Gates (CI Pipeline):**

| Gate | Tool | Threshold | Blocks Merge |
|------|------|-----------|--------------|
| Performance | Lighthouse CI | Score ≥ 90 | Yes |
| Accessibility | Lighthouse CI | Score ≥ 90 | Yes |
| SEO | Lighthouse CI | Score ≥ 90 | Yes |
| Content Validation | Astro build | Zero schema errors | Yes |
| Link Checking | lychee or similar | No broken links | Yes |

**Test Strategy:**

| Level | Scope | Tools |
|-------|-------|-------|
| Schema | Content validates against Zod types | Astro build |
| Component | Components render correctly | Astro test utils |
| Visual | Dark mode, responsive layouts | Playwright screenshots |
| E2E | Theme persistence, navigation | Playwright |

**Dark Mode Smoke Test (Critical):**
1. Load page → verify no FOUC
2. Toggle to dark → verify transition
3. Reload → verify dark persists
4. Clear localStorage → verify system preference fallback

### Migration Path

**Incremental Deployment Strategy:**

| Phase | Action | Risk Mitigation |
|-------|--------|-----------------|
| 1 | Build new site in `/src`, deploy to `/v2/` preview | Old site untouched |
| 2 | Content migration + validation | Schema catches errors |
| 3 | Visual QA on preview URL | Side-by-side comparison |
| 4 | DNS cutover to new site | Instant rollback possible |
| 5 | Remove old HTML files | Git history preserves |

## Starter Template Evaluation

### Primary Technology Domain

Static Web Application (JAMstack) deploying to GitHub Pages.

### Starter Options Considered

| Option | Assessment |
|--------|------------|
| Pre-built portfolio templates | Rejected - would conflict with comprehensive UX spec |
| AstroWind | Rejected - opinionated structure, unnecessary components |
| Official Astro CLI (minimal) | **Selected** - full control, latest versions |

### Selected Approach: Minimal Astro + Tailwind v4

**Rationale:**
- UX specification defines exact component architecture - no template conflicts
- Custom animation system requires precise implementation control
- Tailwind v4 is new; fresh start ensures latest patterns
- Brownfield migration needs exact content schema control

**Initialization Command:**

```bash
# Create project with TypeScript
npm create astro@latest cbenge509-portfolio -- --template minimal --typescript strict

# Add Tailwind CSS v4
cd cbenge509-portfolio && npx astro add tailwind

# Install typography fonts
npm install @fontsource/inter @fontsource/space-grotesk
```

### Architectural Decisions from Starter

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Language** | TypeScript (strict) | Type-safe content collections |
| **CSS Framework** | Tailwind CSS v4 | UX spec requirement |
| **Build Tool** | Vite | Astro default, fast HMR |
| **Output** | Static HTML/CSS/JS | GitHub Pages compatible |
| **Config Style** | CSS-based Tailwind | v4 pattern, no JS config |

### Project Structure

```
src/
├── components/          # UX spec component implementations
│   ├── Hero.astro
│   ├── FeaturedProjectCard.astro
│   ├── Navigation.astro
│   ├── ThemeToggle.astro
│   └── ...
├── content/
│   ├── config.ts        # Zod schemas (from Step 2)
│   ├── projects/        # Markdown content
│   └── publications/
├── layouts/
│   └── BaseLayout.astro # Theme script, meta, nav
├── pages/
│   ├── index.astro
│   ├── projects/
│   └── ...
└── styles/
    └── global.css       # Tailwind + CSS tokens
```

### Development Dependencies to Add

```json
{
  "devDependencies": {
    "@playwright/test": "latest",
    "@tailwindcss/typography": "latest",
    "lighthouse": "latest"
  }
}
```

**Note:** Project initialization is the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Already Decided (from UX Spec + Starter):**
- SSG Framework: Astro 5.x
- CSS Framework: Tailwind CSS v4
- Language: TypeScript (strict)
- Build Tool: Vite
- Hosting: GitHub Pages
- Dark Mode: Class-based with localStorage
- Component Architecture: Per UX specification
- Content Schema: Per Step 2 analysis

**Critical Decisions (Made in This Step):**
- Image optimization strategy
- Font loading approach
- Animation implementation
- CI/CD pipeline structure
- Development tooling

**Deferred Decisions (Post-MVP):**
- Analytics migration (GA4 vs alternatives)
- Search functionality (if needed)
- Contact form (if needed)

### Content & Asset Pipeline

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Image Optimization** | Astro `<Image />` component | Built-in, auto WebP conversion, responsive srcsets, lazy loading, zero config |
| **Font Loading** | @fontsource packages | Self-hosted, GDPR-friendly, no external requests, works offline |
| **Font Subsetting** | Latin subset only | Reduces font file size, sufficient for English content |

**Image Component Pattern:**
```astro
---
import { Image } from 'astro:assets';
import projectImage from '../assets/project.png';
---
<Image
  src={projectImage}
  alt="Project screenshot"
  widths={[400, 800, 1200]}
  formats={['webp', 'png']}
  loading="lazy"
/>
```

**Font Loading Pattern:**
```typescript
// src/styles/fonts.css
@import '@fontsource/space-grotesk/400.css';
@import '@fontsource/space-grotesk/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/jetbrains-mono/400.css';
```

### Animation Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Animation Library** | None (Pure CSS + JS) | Zero dependencies, GPU-accelerated, minimal bundle |
| **Scroll Animations** | IntersectionObserver API | Native browser API, no hydration needed |
| **Reduced Motion** | CSS `prefers-reduced-motion` | Accessibility requirement, native support |

**Animation Implementation Pattern:**

```css
/* Hero entrance animation */
@keyframes hero-entrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-animated {
  animation: hero-entrance 0.8s ease-out forwards;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .hero-animated {
    animation: none;
    opacity: 1;
  }
}
```

**Scroll Reveal Pattern:**
```typescript
// src/scripts/scroll-reveal.ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
```

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **CI/CD Pipeline** | Single GitHub Actions workflow | Simple, includes quality gates, one file to maintain |
| **Branch Strategy** | v2 branch with preview | Zero risk to production, side-by-side comparison |
| **Preview Deployment** | GitHub Pages (branch deploy) | Free, same infrastructure as production |

**GitHub Actions Workflow Structure:**

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [v2, main]
  pull_request:
    branches: [v2, main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint

  build:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  lighthouse:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          configPath: ./lighthouserc.json
          uploadArtifacts: true

  deploy:
    needs: [build, lighthouse]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Lighthouse CI Configuration:**
```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

**Branch Strategy:**

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `main` | Production (current Bootstrap site) | cbenge509.github.io |
| `v2` | New Astro site development | Preview URL |
| Feature branches | Individual features | PR previews |

**Migration Cutover Process:**
1. Develop on `v2` branch
2. QA on preview URL
3. When ready: merge `v2` → `main`
4. Old site instantly replaced
5. Git history preserves rollback option

### Development Experience

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Linting/Formatting** | gts (Google TypeScript Style) | Google's opinionated config, includes ESLint + Prettier, single tool |
| **Build-time Analysis** | Closure Compiler | Additional static analysis with `--jscomp_warning=lintChecks` |
| **Security Scanning** | Semgrep | SAST tool for JavaScript/TypeScript vulnerability detection |
| **Pre-commit Hooks** | Husky + gts | Catches issues early, prevents broken commits |
| **Editor Config** | .editorconfig + VSCode settings | Consistent across environments |

**gts (Google TypeScript Style) - Primary Tooling:**

gts provides Google's opinionated ESLint config, Prettier config, and CLI. Do NOT create separate `.eslintrc` or `.prettierrc` files.

```bash
# Initialize gts in project (run once during setup)
npx gts init

# Lint check (use in CI and pre-commit)
npx gts lint

# Auto-fix linting issues
npx gts fix

# Check formatting without fixing
npx gts check
```

**Closure Compiler Lint Checks (Build-Time):**
```bash
# Run on compiled JavaScript output during build
npx google-closure-compiler \
  --jscomp_warning=lintChecks \
  --js=dist/**/*.js \
  --checks_only
```

**Semgrep Security Scanning:**
```bash
# Run security scan with auto rules
semgrep scan --config=auto .

# Run with specific rulesets for JavaScript/TypeScript
semgrep scan --config=p/javascript --config=p/typescript .
```

**Husky + gts Setup:**
```bash
# .husky/pre-commit
npx gts lint
npx gts check
```

**Style Rules (Enforced by gts):**
- 2-space indentation (not 4)
- Single quotes for strings
- No trailing commas in function parameters
- Semicolons required
- No unused variables or imports

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (Astro + Tailwind)
2. Development tooling (ESLint, Prettier, Husky)
3. Base layout with theme system
4. Content collections + schemas
5. Core components (Hero, Nav, Cards)
6. Pages + routing
7. Animation system
8. CI/CD pipeline
9. Content migration
10. QA + cutover

**Cross-Component Dependencies:**

| Decision | Affects |
|----------|---------|
| Astro Image | All components with images |
| Font loading | BaseLayout, global styles |
| Animation system | Hero, scroll reveal components |
| Theme system | All components (dark: classes) |
| CI/CD | All merges to v2/main |

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 14 areas where AI agents could make different choices

### Naming Patterns

**Component & File Naming:**

| Type | Convention | Example |
|------|------------|---------|
| Astro components | PascalCase | `Hero.astro`, `ProjectCard.astro` |
| Page files | kebab-case | `projects/[slug].astro` |
| Layout files | PascalCase | `BaseLayout.astro` |
| Utility scripts | kebab-case | `scroll-reveal.ts` |
| Content files | kebab-case slug | `bertvision.md` |
| Test files | Component name + `.test.ts` | `Hero.test.ts` |
| Fixture files | Component name + `.fixtures.ts` | `Hero.fixtures.ts` |

**Content Frontmatter Fields:**
- Use camelCase: `publishDate`, `githubUrl`, `isFeatured`
- Never snake_case or PascalCase in frontmatter

**CSS & Animation Patterns:**
- Tailwind utilities first
- Custom classes use BEM-lite: `hero__title`, `card--featured`
- Always pair light/dark variants: `bg-white dark:bg-gray-900`

**Animation Class Naming:**

| Animation | Class | Usage |
|-----------|-------|-------|
| Hero entrance | `animate-hero-entrance` | Hero component only |
| Fade up on scroll | `animate-fade-up` | Cards, sections with `data-reveal` |
| Subtle hover lift | `hover:animate-subtle-lift` | Interactive cards |

### Structure Patterns

**Project Organization:**
```
src/
├── components/        # Flat structure, PascalCase files
│   ├── Hero.astro
│   ├── Hero.test.ts   # Co-located unit test
│   ├── Hero.fixtures.ts # Test data (if needed)
│   └── SEO.astro      # Dedicated SEO meta component
├── content/           # Collections with config.ts
├── layouts/           # BaseLayout.astro (single layout)
├── pages/             # File-based routing
├── scripts/           # Client-side vanilla JS
├── styles/            # global.css entry point
└── assets/images/     # Processed by Astro (relative imports)
e2e/                   # E2E tests at project root
├── navigation.spec.ts
├── theme.spec.ts
└── accessibility.spec.ts
```

**Test Organization:**
- Unit tests: Co-located (`Hero.test.ts` next to `Hero.astro`)
- Test fixtures: Co-located (`Hero.fixtures.ts`) or `test/fixtures/` if shared
- E2E tests: `e2e/` folder at project root
- Naming: `*.test.ts` (unit), `*.spec.ts` (E2E)

### Component Template

**Copy-paste starter for new components:**
```astro
---
import type { HTMLAttributes } from 'astro/types';

/**
 * [Component description - what it does and when to use it]
 *
 * @example
 * <ComponentName requiredProp="value" />
 *
 * @slot default - Main content area
 * @slot footer - Optional footer actions (if applicable)
 */
interface Props extends HTMLAttributes<'div'> {
  /** Description of required prop */
  requiredProp: string;
  /** Description of optional prop */
  optionalProp?: 'option1' | 'option2';
}

const {
  requiredProp,
  optionalProp = 'option1',
  class: className,
  ...attrs
} = Astro.props;
---

<div class:list={['component-base', className]} {...attrs}>
  <slot />
  <slot name="footer" />
</div>
```

### Format Patterns

**Component Props Pattern (with HTMLAttributes):**
```astro
---
import type { HTMLAttributes } from 'astro/types';

/**
 * Hero section with animated entrance and credential badges.
 *
 * @example
 * <Hero name="Cris Benge" role="AI Researcher" credentials={credentials} />
 *
 * @slot default - Additional content below credentials
 */
interface Props extends HTMLAttributes<'section'> {
  name: string;
  role: string;
  credentials?: string[];
}

const { name, role, credentials = [], class: className, ...attrs } = Astro.props;
---
<section class:list={['hero', className]} {...attrs}>
  <!-- Component content -->
  <slot />
</section>
```

**Key patterns:**
- Extend `HTMLAttributes` for accessibility passthrough (`aria-*`, `data-*`, `id`)
- JSDoc comment with `@example` and `@slot` documentation
- Destructure `class` as `className`, spread remaining attrs
- Use `class:list` for conditional classes

**Layout Props Interface:**
```typescript
// All pages must pass these to BaseLayout
interface LayoutProps {
  title: string;           // Page title (appended to site name)
  description: string;     // Meta description
  image?: string;          // OG image path
  noIndex?: boolean;       // For draft/preview pages
  class?: string;          // Body class customization
}
```

**SEO Component Pattern:**
```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
}

const { title, description, image, canonical, noIndex = false } = Astro.props;
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const fullTitle = `${title} | Cris Benge`;
const ogImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-default.png`;
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical || Astro.url.href} />

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={Astro.url.href} />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />

{noIndex && <meta name="robots" content="noindex,nofollow" />}
```

**Import Order:**
1. Astro imports (`astro:content`, `astro:assets`)
2. Component imports
3. Utility imports
4. Type imports
5. Asset imports (use relative paths for Astro image optimization)

### Environment Variables Pattern

```typescript
// src/env.d.ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Site URL for canonical links and OG images */
  readonly PUBLIC_SITE_URL: string;
  /** Google Analytics ID (optional) */
  readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

**Rules:**
- Only `PUBLIC_` prefixed variables are exposed to client-side code
- Never commit `.env` files with secrets
- Document all env vars in `env.d.ts` with JSDoc comments

### Client Script Pattern

**For non-hydrated interactivity (theme toggle, scroll reveal):**

```astro
---
// Component with client-side behavior
---
<button
  id="theme-toggle"
  data-component="theme-toggle"
  class="focus-ring"
  aria-label="Toggle dark mode"
>
  <!-- Icon content -->
</button>

<script>
  // Self-initializing script - runs once when component loads
  document.querySelectorAll('[data-component="theme-toggle"]').forEach((el) => {
    el.addEventListener('click', () => {
      const isDark = document.documentElement.dataset.theme === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem('theme', newTheme);
    });
  });
</script>
```

**Rules:**
- Use `data-component="name"` attribute for JS hooks (not classes)
- Scripts self-initialize via `querySelectorAll`
- No framework hydration needed for simple interactions

### Accessibility Patterns

**Focus Ring Utility:**
```css
/* global.css - Consistent focus states */
.focus-ring {
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900;
}
```

All interactive elements (buttons, links, toggles) must include `.focus-ring` or equivalent focus styling.

**Reduced Motion Safety Net:**
```css
/* global.css - Respects user preference globally */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Transition Timing Standards

| Category | Duration | Tailwind Class | Usage |
|----------|----------|----------------|-------|
| Micro interactions | 150ms | `duration-150` | Hover states, toggles |
| Component transitions | 300ms | `duration-300` | Cards, modals, menus |
| Page/section transitions | 500ms | `duration-500` | Hero entrance, page loads |

All transitions use `ease-out` unless specified otherwise.

### Code Comment Guidelines

| Scenario | Comment? | Example |
|----------|----------|---------|
| Complex regex | Yes | `// Matches kebab-case slugs: a-z, 0-9, hyphens` |
| Business logic | Yes | `// Featured projects appear first, then by date` |
| Obvious code | No | Don't comment `const name = props.name` |
| Workarounds | Yes | `// TODO: Remove when Astro fixes #1234` |
| Type coercion | Yes | `// Zod coerces string dates to Date objects` |
| Why, not what | Yes | Explain intent, not mechanics |

### Testing Patterns

**Component Test Pattern (AstroContainer):**
```typescript
// Hero.test.ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Hero from './Hero.astro';

describe('Hero', () => {
  it('renders name and role', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: { name: 'Cris Benge', role: 'AI Researcher' }
    });
    expect(result).toContain('Cris Benge');
    expect(result).toContain('AI Researcher');
  });

  it('includes dark mode classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: { name: 'Test', role: 'Test' }
    });
    expect(result).toContain('dark:');
  });
});
```

**Accessibility E2E Test Pattern (axe-core):**
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page has no a11y violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('projects page has no a11y violations', async ({ page }) => {
    await page.goto('/projects');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

### Definition of Done - Pattern Compliance

**Every component story must verify:**

- [ ] Props extend `HTMLAttributes<'element'>`
- [ ] JSDoc with `@example` (and `@slot` if applicable)
- [ ] Dark mode classes included (`dark:`)
- [ ] Focus states present (`.focus-ring` or equivalent)
- [ ] Unit test co-located and passing
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Transitions use standard durations (150/300/500ms)
- [ ] No lint or type errors

**Every content story must verify:**

- [ ] Frontmatter uses camelCase fields
- [ ] Schema validation passes
- [ ] Images resolve correctly
- [ ] Links are valid

### Enforcement Guidelines

**All AI Agents MUST:**
1. Use PascalCase for components, kebab-case for content/pages
2. Define explicit `Props` interface extending `HTMLAttributes` for every component
3. Include JSDoc comment with `@example` and `@slot` documentation
4. Use camelCase for all frontmatter fields
5. Prefer Tailwind utilities over custom CSS
6. Include `dark:` variant for all color classes
7. Use `.focus-ring` or equivalent on all interactive elements
8. Use standard transition durations (150/300/500ms)
9. Use `data-component` attributes for JS hooks (not classes)
10. Fail builds on validation errors
11. Co-locate unit tests with components
12. Use relative paths for asset imports (not aliases)
13. Document environment variables in `env.d.ts`

**Verification Methods:**
- ESLint: Naming conventions
- TypeScript strict: Type safety
- Astro build: Content schema validation
- Prettier: Import ordering + Tailwind class sorting
- axe-core: Accessibility compliance in E2E
- Definition of Done checklist: Pattern compliance

### Anti-Patterns to Avoid

| Anti-Pattern | Correct Pattern |
|--------------|-----------------|
| `hero.astro` | `Hero.astro` |
| `publish_date` in frontmatter | `publishDate` |
| Separate dark mode CSS file | `dark:` utilities inline |
| `__tests__/` folder | Co-located `*.test.ts` |
| Inline types in Astro props | Explicit `interface Props extends HTMLAttributes` |
| Custom CSS for colors | Tailwind color utilities |
| Missing JSDoc on components | JSDoc with `@example` and `@slot` |
| Custom animation names | Standard `animate-*` classes |
| Inconsistent transition times | Use 150/300/500ms standards |
| `@/assets` import aliases | Relative `../assets/` paths |
| Missing focus styles | Include `.focus-ring` class |
| Classes for JS hooks | `data-component` attributes |
| Inline SEO meta tags | Use `<SEO />` component |
| Undocumented env vars | Document in `env.d.ts` |

## Project Structure & Boundaries

### Complete Project Directory Structure

```
cbenge509-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: lint → build → lighthouse → deploy
├── .husky/
│   └── pre-commit                  # Runs lint-staged before commits
├── e2e/
│   ├── accessibility.spec.ts       # axe-core accessibility tests
│   ├── navigation.spec.ts          # Navigation flow tests
│   ├── projects.spec.ts            # Projects gallery + detail pages
│   ├── seo.spec.ts                 # OG tags, meta validation
│   └── theme.spec.ts               # Theme persistence tests
├── public/
│   ├── favicon.ico
│   ├── og-default.png              # Default Open Graph image
│   ├── pdf/                        # Static PDF files
│   │   ├── bertvision.pdf
│   │   ├── ticket-bert.pdf
│   │   └── cv.pdf
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── profile/
│   │       │   └── cbenge.jpg
│   │       ├── projects/
│   │       │   ├── bertvision.png
│   │       │   ├── facial-keypoints.png
│   │       │   ├── social-media.png
│   │       │   ├── arxiv.png
│   │       │   ├── crime.png
│   │       │   ├── worldbank.png
│   │       │   ├── dsbowl.png
│   │       │   ├── futuresales.png
│   │       │   └── collegeincome.png
│   │       └── logos/
│   │           ├── columbia.png
│   │           ├── berkeley.png
│   │           └── iwu.png
│   ├── components/
│   │   ├── Button.astro
│   │   ├── Button.test.ts
│   │   ├── CredentialBadge.astro
│   │   ├── CredentialBadge.test.ts
│   │   ├── FeaturedProjectCard.astro
│   │   ├── FeaturedProjectCard.test.ts
│   │   ├── Footer.astro
│   │   ├── Footer.test.ts
│   │   ├── Hero.astro
│   │   ├── Hero.test.ts
│   │   ├── Navigation.astro
│   │   ├── Navigation.test.ts
│   │   ├── PatentCard.astro
│   │   ├── PatentCard.test.ts
│   │   ├── PublicationCard.astro
│   │   ├── PublicationCard.test.ts
│   │   ├── SecondaryProjectCard.astro
│   │   ├── SecondaryProjectCard.test.ts
│   │   ├── SectionHeading.astro
│   │   ├── SEO.astro
│   │   ├── SkillBadge.astro
│   │   ├── ThemeToggle.astro
│   │   └── ThemeToggle.test.ts
│   ├── content/
│   │   ├── config.ts               # Zod schemas for ALL collections
│   │   ├── projects/               # Markdown content
│   │   │   ├── bertvision.md
│   │   │   ├── facial-keypoints.md
│   │   │   ├── social-media-intelligence.md
│   │   │   ├── arxiv-analysis.md
│   │   │   ├── crime-statistics.md
│   │   │   ├── worldbank-classification.md
│   │   │   ├── data-science-bowl.md
│   │   │   ├── future-sales.md
│   │   │   └── college-outcomes.md
│   │   ├── publications/           # Markdown content
│   │   │   ├── bertvision-paper.md
│   │   │   ├── ticket-bert.md
│   │   │   ├── stim.md
│   │   │   └── school-closures.md
│   │   ├── patents/                # Markdown content
│   │   │   └── (patent files when added)
│   │   ├── education/              # YAML data (no markdown body)
│   │   │   ├── columbia.yaml
│   │   │   ├── berkeley.yaml
│   │   │   └── iwu.yaml
│   │   ├── certifications/         # YAML data
│   │   │   ├── azure-architect.yaml
│   │   │   ├── azure-data-scientist.yaml
│   │   │   ├── aws-solutions.yaml
│   │   │   ├── mcsm-sql.yaml
│   │   │   └── mcm-sql.yaml
│   │   └── awards/                 # YAML data
│   │       ├── drivendata-worldbank.yaml
│   │       ├── kaggle-facial-keypoints.yaml
│   │       ├── microsoft-platinum.yaml
│   │       └── ...
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro             # Home (About)
│   │   ├── projects/
│   │   │   ├── index.astro         # Projects gallery
│   │   │   └── [slug].astro        # Dynamic project detail
│   │   ├── education.astro
│   │   ├── skills.astro
│   │   ├── awards.astro
│   │   └── patents.astro
│   ├── scripts/
│   │   ├── scroll-reveal.ts
│   │   └── theme-init.ts
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   └── index.ts                # Shared type exports (LayoutProps, etc.)
│   ├── utils/
│   │   ├── cn.ts                   # Tailwind class merge utility
│   │   └── format.ts               # formatDate(), formatList()
│   └── env.d.ts
├── test/
│   └── fixtures/
│       ├── projects.ts             # Mock project entries
│       ├── publications.ts         # Mock publication entries
│       └── setup.ts                # Test setup/teardown
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierrc
├── astro.config.ts                 # TypeScript config
├── eslint.config.js                # Flat ESLint config
├── lighthouserc.json
├── package.json
├── playwright.config.ts
├── README.md
├── tailwind.config.ts              # TypeScript config
├── tsconfig.json
└── vitest.config.ts
```

### Content Collections (All Content in Collections)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// === CONTENT COLLECTIONS (Markdown with body) ===

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    skills: z.array(z.string()),
    tools: z.array(z.string()),
    category: z.enum(['leader', 'builder', 'winner']),
    achievement: z.string().optional(),
    affiliation: z.string().optional(),
    isFeatured: z.boolean().default(false),
    publishDate: z.coerce.date(),
    order: z.number().optional(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    abstract: z.string(),
    pdfUrl: z.string().optional(),
    codeUrl: z.string().url().optional(),
    doiUrl: z.string().url().optional(),
  }),
});

const patents = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    patentNumber: z.string(),
    filingDate: z.coerce.date(),
    grantDate: z.coerce.date().optional(),
    url: z.string().url().optional(),
    status: z.enum(['filed', 'pending', 'granted']),
  }),
});

// === DATA COLLECTIONS (YAML/JSON, no markdown body) ===

const education = defineCollection({
  type: 'data',
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    year: z.number(),
    gpa: z.string().optional(),
    logoImage: z.string(),
    honors: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

const certifications = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.number(),
    badgeUrl: z.string().optional(),
    category: z.enum(['cloud', 'data', 'database', 'other']),
    order: z.number(),
  }),
});

const awards = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.enum(['competition', 'professional']),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  projects,
  publications,
  patents,
  education,
  certifications,
  awards,
};
```

### Utility Files

**Tailwind Class Merge (`src/utils/cn.ts`):**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Format Utilities (`src/utils/format.ts`):**
```typescript
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    ...options,
  }).format(date);
}

export function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(' and ');
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}
```

**Shared Types (`src/types/index.ts`):**
```typescript
export interface LayoutProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  class?: string;
}

export type Theme = 'light' | 'dark';
export type ProjectCategory = 'leader' | 'builder' | 'winner';
```

### Story-to-File Mapping

| Story | Files to Create/Modify |
|-------|------------------------|
| Project Initialization | `package.json`, `astro.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts` |
| Development Tooling | `.husky/pre-commit`, `.editorconfig`, `.gitignore`, `.env.example`, `.prettierrc`, `eslint.config.js` |
| Content Schema | `src/content/config.ts` |
| Utility Functions | `src/utils/cn.ts`, `src/utils/format.ts`, `src/types/index.ts` |
| Global Styles | `src/styles/global.css` |
| BaseLayout | `src/layouts/BaseLayout.astro`, `src/components/SEO.astro` |
| Navigation | `src/components/Navigation.astro`, `src/components/Navigation.test.ts` |
| Theme System | `src/components/ThemeToggle.astro`, `src/scripts/theme-init.ts` |
| Hero Component | `src/components/Hero.astro`, `src/components/Hero.test.ts`, `src/components/CredentialBadge.astro` |
| Button Component | `src/components/Button.astro`, `src/components/Button.test.ts` |
| Project Cards | `src/components/FeaturedProjectCard.astro`, `src/components/SecondaryProjectCard.astro` + tests |
| Projects Page | `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro` |
| Home Page | `src/pages/index.astro` |
| Publications | `src/components/PublicationCard.astro`, content in `publications/` |
| Education Page | `src/pages/education.astro`, content in `education/` |
| Skills Page | `src/pages/skills.astro`, content in `certifications/` |
| Awards Page | `src/pages/awards.astro`, content in `awards/` |
| CI/CD Pipeline | `.github/workflows/deploy.yml`, `lighthouserc.json` |
| E2E Tests | All files in `e2e/` |
| Content Migration | All `src/content/**/*.md` and `*.yaml` files |

### Component Dependency Graph

```
BaseLayout (FOUNDATION - implement first)
├── SEO ← Used by all pages
├── Navigation
│   └── ThemeToggle ← Interactive island
└── Footer

Content Collections (FOUNDATION - implement second)
└── config.ts ← All pages depend on schemas

Utility Layer (FOUNDATION - implement third)
├── cn.ts ← Used by all components
├── format.ts ← Used by cards, pages
└── types/index.ts ← Used everywhere

Page Components (implement after foundations)
├── Hero ← Home page
│   └── CredentialBadge
├── FeaturedProjectCard ← Projects page
├── SecondaryProjectCard ← Projects page
├── PublicationCard ← Home page
├── PatentCard ← Patents page
├── SkillBadge ← Skills page
└── SectionHeading ← All section pages

Pages (implement last)
├── index.astro ← Depends on Hero, PublicationCard
├── projects/index.astro ← Depends on cards, content
├── projects/[slug].astro ← Depends on project content
├── education.astro ← Depends on education content
├── skills.astro ← Depends on certifications content
├── awards.astro ← Depends on awards content
└── patents.astro ← Depends on patents content
```

### Implementation Order (Recommended)

1. **Foundation Layer**
   - Project initialization (Astro + Tailwind + TypeScript)
   - Development tooling (ESLint, Prettier, Husky)
   - Content collection schemas
   - Utility functions + types

2. **Layout Layer**
   - Global styles (Tailwind config, animations, focus-ring)
   - BaseLayout with theme script
   - SEO component
   - Navigation + ThemeToggle
   - Footer

3. **Component Layer**
   - Button (used by many components)
   - Hero + CredentialBadge
   - SectionHeading
   - FeaturedProjectCard + SecondaryProjectCard
   - PublicationCard
   - SkillBadge

4. **Page Layer**
   - Home page (index.astro)
   - Projects gallery + detail pages
   - Education, Skills, Awards, Patents pages

5. **Content Layer**
   - Migrate all project content
   - Migrate publications
   - Add education, certifications, awards YAML data

6. **Quality Layer**
   - CI/CD pipeline
   - Lighthouse configuration
   - E2E tests

### Test Configuration

**Vitest Config (`vitest.config.ts`):**
```typescript
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    setupFiles: ['./test/fixtures/setup.ts'],
    globals: true,
  },
});
```

### Additional Dependencies

```json
{
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### Page Boundaries

| Page | Route | Data Source | Components Used |
|------|-------|-------------|-----------------|
| Home | `/` | Static + publications | Hero, PublicationCard, CredentialBadge |
| Projects | `/projects` | projects collection | FeaturedProjectCard, SecondaryProjectCard |
| Project Detail | `/projects/[slug]` | Single project | Full project layout |
| Education | `/education` | education collection | CredentialBadge, SectionHeading |
| Skills | `/skills` | certifications collection | SkillBadge, SectionHeading |
| Awards | `/awards` | awards collection | SectionHeading |
| Patents | `/patents` | patents collection | PatentCard |

### Data Flow

```
Content Collections (Markdown/YAML + Frontmatter)
           │
           ▼
    Zod Schema Validation (build-time)
           │
           ▼
    getCollection() / getEntry()
           │
           ▼
    Page Components (*.astro pages)
           │
           ▼
    UI Components (receive typed props)
           │
           ▼
    Static HTML Output
```

### Migration File Mapping

| Current Location | New Location |
|------------------|--------------|
| `index.html` (bio) | `src/pages/index.astro` |
| `index.html` (publications) | `src/content/publications/*.md` |
| `projects/*/index.html` | `src/content/projects/*.md` |
| `education/index.html` | `src/content/education/*.yaml` + `src/pages/education.astro` |
| `skills/index.html` | `src/content/certifications/*.yaml` + `src/pages/skills.astro` |
| `honors_awards/index.html` | `src/content/awards/*.yaml` + `src/pages/awards.astro` |
| `assets/img/*` | `src/assets/images/*` |
| `assets/pdf/*` | `public/pdf/*` |
| `assets/css/main.css` | `src/styles/global.css` (rebuilt) |
| `assets/js/theme.js` | `src/scripts/theme-init.ts` |
| `assets/js/dark_mode.js` | `src/components/ThemeToggle.astro` |

## Architectural Requirements (ARCH) - Formal Traceability

_Formal architectural requirements for traceability to test design ASRs and implementation stories._

### ARCH Requirements Registry

| ARCH ID | Requirement | Category | NFR Trace | ASR Trace | Verification Method |
|---------|-------------|----------|-----------|-----------|---------------------|
| ARCH-001 | Use gts (Google TypeScript Style) for all linting and formatting | Quality | - | - | CI: `gts lint` pass |
| ARCH-002 | Run Closure Compiler with `--jscomp_warning=lintChecks` on build output | Quality | - | - | CI: Zero Closure warnings |
| ARCH-003 | Semgrep SAST scan must pass with zero high/critical findings | Security | NFR22-23 | ASR-SEC-01 | CI: Semgrep gate |
| ARCH-004 | npm audit must report zero high/critical vulnerabilities | Security | NFR22-23 | ASR-SEC-02 | CI: `npm audit --audit-level=high` |
| ARCH-005 | Lighthouse Performance score ≥ 90 | Performance | NFR1-6 | ASR-01 | CI: Lighthouse CI gate |
| ARCH-006 | Lighthouse Accessibility score ≥ 90 | Accessibility | NFR12-16 | ASR-02 | CI: Lighthouse CI gate |
| ARCH-007 | Lighthouse SEO score ≥ 90 | SEO | NFR17-21 | ASR-09 | CI: Lighthouse CI gate |
| ARCH-008 | Zero axe-core accessibility violations | Accessibility | NFR12-16 | ASR-07 | E2E: axe-core tests |
| ARCH-009 | No FOUC on theme initialization | UX | - | ASR-03 | E2E: Visual regression |
| ARCH-010 | Dark mode preference persists across sessions | UX | FR23-26 | ASR-04 | E2E: localStorage validation |
| ARCH-011 | Content Collection schema validation at build time | Data Integrity | - | ASR-05 | Build: Zod validation |
| ARCH-012 | All interactive elements have visible focus states | Accessibility | NFR12-16 | ASR-07 | E2E: Focus ring presence |
| ARCH-013 | External resources must have SRI hashes | Security | NFR22-23 | ASR-SEC-03 | Manual: Build review |
| ARCH-014 | No hardcoded secrets or API keys in codebase | Security | NFR22-23 | ASR-SEC-04 | CI: Semgrep secrets detection |
| ARCH-015 | TypeScript strict mode with zero `any` types | Quality | - | - | Build: TSC strict |
| ARCH-016 | All components extend HTMLAttributes for a11y passthrough | Accessibility | NFR12-16 | - | Code review |
| ARCH-017 | Reduced motion respected via prefers-reduced-motion | Accessibility | NFR12-16 | - | E2E: Motion emulation |

### Security Architecture Requirements (ARCH-SEC)

| ARCH-SEC ID | Requirement | Risk Level | Enforcement |
|-------------|-------------|------------|-------------|
| ARCH-SEC-01 | Zero Semgrep high/critical findings | BLOCKING | CI gate - merge blocked |
| ARCH-SEC-02 | Zero npm audit high/critical vulnerabilities | BLOCKING | CI gate - merge blocked |
| ARCH-SEC-03 | SRI hashes on all external resources | HIGH | Manual review checklist |
| ARCH-SEC-04 | No secrets in codebase (Semgrep secrets rules) | BLOCKING | CI gate - Semgrep p/secrets |
| ARCH-SEC-05 | No eval() or Function() constructor usage | HIGH | CI: Semgrep rule |
| ARCH-SEC-06 | No inline event handlers (onclick, etc.) | MEDIUM | CI: gts lint rule |

### Traceability Matrix

```
NFR → ARCH → ASR → Test

NFR1-6 (Performance) → ARCH-005 → ASR-01 → Lighthouse CI
NFR12-16 (Accessibility) → ARCH-006, ARCH-008, ARCH-012, ARCH-017 → ASR-02, ASR-07 → axe-core E2E
NFR17-21 (SEO) → ARCH-007 → ASR-09 → Lighthouse CI
NFR22-23 (Security) → ARCH-003, ARCH-004, ARCH-013, ARCH-014 → ASR-SEC-* → Semgrep + npm audit
FR23-26 (Theme) → ARCH-009, ARCH-010 → ASR-03, ASR-04 → E2E theme tests
```

## Architecture Validation

### Coherence Validation Results

**Decision Compatibility:** ✅ All Decisions Compatible

| Decision Area | Validation |
|---------------|------------|
| Astro 5 + Tailwind v4 + TypeScript strict | Compatible - all modern, use @tailwindcss/vite plugin |
| Dark mode class-based + data-theme attribute | Compatible - inline head script prevents FOUC |
| Content Collections + Zod schemas | Compatible - type-safe frontmatter at build time |
| Pure CSS animations + IntersectionObserver | Compatible - zero hydration overhead |
| GitHub Actions CI/CD | Compatible - standard workflow for Astro + GitHub Pages |

**Pattern Consistency:** ✅ All Patterns Consistent

| Pattern | Verification |
|---------|--------------|
| Component naming (PascalCase) | All component files use PascalCase |
| Content naming (kebab-case) | All content files use kebab-case slugs |
| Frontmatter fields (camelCase) | All schema fields use camelCase |
| Test co-location | Tests placed next to components |
| Import organization | Clear order defined |

**Structure Alignment:** ✅ Structure Aligned

| Element | Verification |
|---------|--------------|
| Component dependencies | Dependency graph matches file structure |
| Content schemas | All 6 collections defined with complete schemas |
| Page routes | File-based routing matches requirements |
| Test organization | E2E/unit/fixtures properly organized |

### Requirements Coverage Matrix

**Functional Requirements (32/32 Covered):**

| FR Group | FRs | Coverage |
|----------|-----|----------|
| Navigation & IA | FR1-4 | Navigation component, BaseLayout, Footer |
| Professional Profile | FR5-9 | Hero, CredentialBadge, Google Scholar link |
| Project Portfolio | FR10-15 | projects collection, card components, GitHub links |
| Publications & Patents | FR16-20 | publications + patents collections, expandable cards |
| Awards & Recognition | FR21-22 | awards collection, Awards page |
| Theme & Display | FR23-26 | ThemeToggle, localStorage, prefers-color-scheme |
| Contact & CTA | FR27-29 | Footer, social links |
| Responsive | FR30-32 | Mobile-first Tailwind, breakpoints |

**Non-Functional Requirements (23/23 Covered):**

| NFR Group | NFRs | Coverage |
|-----------|------|----------|
| Performance | NFR1-6 | Lighthouse CI ≥90, Astro Image, minimal JS |
| Browser Compatibility | NFR7-11 | Modern browsers, responsive design |
| Accessibility | NFR12-16 | focus-ring, semantic HTML, axe-core E2E |
| SEO | NFR17-21 | SEO component, structured data, sitemap |
| Security | NFR22-23 | HTTPS (GitHub Pages), SRI hashes |

### SEO Implementation (Gap Resolution)

**Structured Data (JSON-LD Person Schema):**

Add to `src/components/SEO.astro`:

```astro
---
// Add to existing SEO component props
interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  includePersonSchema?: boolean; // Only on home page
}

const { includePersonSchema = false } = Astro.props;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Cris Benge",
  "jobTitle": "Head of Federal Innovation",
  "worksFor": {
    "@type": "Organization",
    "name": "Google"
  },
  "url": "https://cbenge509.github.io",
  "sameAs": [
    "https://github.com/cbenge509",
    "https://linkedin.com/in/crisbenge",
    "https://scholar.google.com/citations?user=YOUR_ID"
  ],
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Columbia University"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "UC Berkeley"
    }
  ]
};
---

{includePersonSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
)}
```

**Sitemap Integration:**

```bash
# Add @astrojs/sitemap to project
npx astro add sitemap
```

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://cbenge509.github.io',
  integrations: [tailwind(), sitemap()],
});
```

**robots.txt:**

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://cbenge509.github.io/sitemap-index.xml
```

### Implementation Readiness Summary

| Readiness Factor | Status |
|------------------|--------|
| Component templates | ✅ Ready |
| Content schemas | ✅ Ready |
| Test patterns | ✅ Ready |
| CI/CD workflow | ✅ Ready |
| Story-to-file mapping | ✅ Ready |
| Dependency graph | ✅ Ready |
| Anti-patterns documented | ✅ Ready |
| Definition of Done | ✅ Ready |

### Completeness Checklist

- [x] Project context analyzed (32 FRs, 23 NFRs)
- [x] Starter template evaluated (minimal Astro + Tailwind v4)
- [x] Core architectural decisions made (8 decision areas)
- [x] Implementation patterns defined (14 conflict points resolved)
- [x] Project structure finalized (complete directory tree)
- [x] Content collections specified (6 collections with Zod schemas)
- [x] Component architecture mapped (12 components)
- [x] Test strategy documented (unit + E2E + accessibility)
- [x] CI/CD pipeline defined (lint → build → lighthouse → deploy)
- [x] Migration path planned (v2 branch strategy)
- [x] SEO implementation specified (structured data, sitemap, robots.txt)
- [x] Coherence validated (all decisions compatible)
- [x] Requirements coverage verified (32 FRs + 23 NFRs mapped)
- [x] Implementation readiness confirmed

**Validation Result:** ✅ ARCHITECTURE VALIDATED - Ready for Implementation

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-02
**Document Location:** _bmad-output/planning-artifacts/architecture.md

### Final Architecture Deliverables

**Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**Implementation Ready Foundation**

- 15+ architectural decisions made across 8 decision areas
- 14 implementation patterns defined (conflict points resolved)
- 12 UI components specified with templates
- 55 requirements fully supported (32 FRs + 23 NFRs)
- 6 content collections with complete Zod schemas

**AI Agent Implementation Guide**

- Technology stack: Astro 5.x + Tailwind CSS v4 + TypeScript strict
- Consistency rules preventing implementation conflicts
- Project structure with clear boundaries and dependencies
- Testing patterns: Vitest (unit), Playwright + axe-core (E2E)

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing cbenge509-portfolio. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
```bash
# Create project with TypeScript
npm create astro@latest cbenge509-portfolio -- --template minimal --typescript strict

# Add Tailwind CSS v4
cd cbenge509-portfolio && npx astro add tailwind

# Install typography fonts
npm install @fontsource/inter @fontsource/space-grotesk

# Install utilities
npm install clsx tailwind-merge
```

**Development Sequence:**

1. Initialize project using documented starter template
2. Set up development tooling (ESLint, Prettier, Husky)
3. Create content collection schemas
4. Implement BaseLayout with theme system
5. Build components following established patterns
6. Create pages and content migration
7. Set up CI/CD pipeline with Lighthouse gates

### Quality Assurance Checklist

**✅ Architecture Coherence**

- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**

- [x] All 32 functional requirements are supported
- [x] All 23 non-functional requirements are addressed
- [x] Cross-cutting concerns handled (theme, responsive, SEO, accessibility)
- [x] Integration points defined (GitHub Pages, Lighthouse CI)

**✅ Implementation Readiness**

- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Code examples provided for clarity

### Project Success Factors

**Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction.

**Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly.

**Complete Coverage**
All 55 project requirements are architecturally supported, with clear mapping from business needs to technical implementation.

**Solid Foundation**
The minimal Astro + Tailwind v4 starter provides a production-ready foundation following current best practices.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Cris Benge (AI Researcher) built with Astro 5.x, Tailwind CSS v4, and TypeScript in strict mode. Deployed to GitHub Pages at cbenge509.github.io.

## Commands

```bash
# Development (dev server runs at http://localhost:4321)
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Linting (uses Google TypeScript Style via gts)
npm run lint             # Run gts lint
npm run fix              # Auto-fix lint issues
npm run check            # Check formatting

# Testing
npm run test             # Run unit tests (Vitest)
npm run test:coverage    # Unit tests with coverage
npm run test:e2e         # Run E2E tests (Playwright, all browsers)
npm run test:e2e:ui      # Playwright with UI mode

# Run single test file
npx vitest run src/components/Hero.test.ts
npx playwright test e2e/hero.spec.ts
npx playwright test e2e/hero.spec.ts --project=chromium  # Single browser

# Type checking
npx tsc --noEmit --project tsconfig.ci.json  # CI-style (excludes test files)
```

## Architecture

### Tech Stack
- **Astro 5.x** - Static site generator
- **Tailwind CSS v4** - Uses `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`)
- **TypeScript** - Strict mode, no `any` types
- **Vitest** - Unit tests (co-located with components)
- **Playwright** - E2E tests (Chromium, Firefox, WebKit)
- **gts** - Google TypeScript Style for linting/formatting

### Directory Structure
```
src/
├── components/       # Astro components with co-located *.test.ts files
├── content/          # Content collections (projects, publications, patents, education, certifications, awards)
├── layouts/          # BaseLayout.astro
├── pages/            # Route pages
├── styles/           # global.css with Tailwind v4 @theme config
├── utils/            # Utilities (cn.ts for class merging)
└── types/            # Type definitions
e2e/                  # Playwright E2E tests (*.spec.ts)
test/fixtures/        # Test mock data (content/, props/)
```

### Content Collections
All content lives in `src/content/` with Zod schemas defined in `config.ts`:
- **projects** (content) - Portfolio projects with categories: leader, builder, winner, research
- **publications** (content) - Academic papers with authors, venue, abstract
- **patents** (content) - Patent filings with status tracking
- **education** (data) - Degrees and institutions
- **certifications** (data) - Professional certs by category
- **awards** (data) - Competition/professional awards

### Key Patterns

**Component Props**: Always extend HTMLAttributes for accessibility passthrough
```typescript
interface Props extends HTMLAttributes<'section'> {
  title: string;
}
const { title, class: className, ...attrs } = Astro.props;
```

**Dark Mode**: Class-based using `.dark` class on `<html>`, inline script in `<head>` prevents FOUC. Use `dark:` prefix for all color utilities.

**Hydration**: Only `ThemeToggle` uses `client:load`. All other interactivity uses vanilla JS with `<script>` tags and `data-component` attributes.

**Class Composition**: Use `cn()` utility (clsx + tailwind-merge) for combining classes.

**Asset Paths**: Use RELATIVE paths (`../assets/images/...`), never path aliases - Astro Image optimization requires this.

### Testing Patterns

**Unit tests**: Co-located `*.test.ts` using AstroContainer
```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
const container = await AstroContainer.create();
const result = await container.renderToString(Component, { props: {...} });
```

**E2E tests**: Always emulate reduced motion for accessibility tests
```typescript
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});
```

**Coverage thresholds**: 90% for statements, branches, functions, lines. Coverage excludes `src/scripts/` (runtime scripts tested via E2E), `src/content/` (data), and `src/pages/` (routes).

### CI Pipeline (GitHub Actions - deploy.yml)
Runs in stages: security (npm audit, Semgrep) → lint/type check → build + unit tests → E2E tests (all browsers) + Lighthouse CI → deploy to GitHub Pages on master push. PRs run all checks except deploy.

### Pre-commit Hooks
Husky runs: `gts lint`, `gts check`, npm audit (warn), Semgrep (if installed)

## Critical Rules

- TypeScript strict mode - no `any` types
- Every component needs co-located unit test
- All interactive elements need `.focus-ring` class and 44px minimum touch targets (exception: inline text links within paragraphs)
- Never use `Astro.url.href` for canonical URLs (returns localhost in dev)
- CI type checking uses `tsconfig.ci.json` which excludes test files intentionally
- Tailwind v4 config is CSS-based in `global.css` using `@theme` directive

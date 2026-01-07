---
project_name: 'cbenge509.github.io'
user_name: 'Cris'
date: '2026-01-02'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - quality_rules
  - workflow_rules
  - anti_patterns
status: 'complete'
rule_count: 47
optimized_for_llm: true
source_documents:
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Core Framework
- **Astro 5.x** - Static site generator with TypeScript strict mode
- **Tailwind CSS v4** - CSS-based configuration (not JS config)
  - CRITICAL: Use `@tailwindcss/vite` plugin, NOT `@astrojs/tailwind`
- **TypeScript** - Strict mode enabled, no `any` types allowed
- **Vite** - Build tool (Astro default)

### Content & Data
- **Astro Content Collections** - All content in `src/content/`
- **Zod** - Schema validation for content frontmatter

### Testing
- **Vitest** - Unit tests (co-located with components)
- **Playwright** - E2E tests in `e2e/` folder
- **axe-core** - Accessibility testing in E2E

### Fonts (Self-Hosted via @fontsource)
- Inter (body): 400, 500, 600 weights
- Space Grotesk (display): 400, 600, 700 weights
- JetBrains Mono (code): 400 weight

**Font Import Rule:** Always audit font weight usage against imports. If design specifies weight 600, ensure `@import '@fontsource/space-grotesk/600.css'` exists.

### Utilities
- `cn()` utility combining clsx + tailwind-merge for class composition

## Critical Implementation Rules

### Language-Specific Rules (TypeScript/Astro)

**TypeScript Configuration:**
- Strict mode enabled - no `any` types allowed
- Use explicit return types on exported functions
- Prefer `interface` over `type` for object shapes
- Use `z.infer<typeof schema>` for Zod-derived types
- **CI uses `tsconfig.ci.json`** which excludes test files - this is intentional
  - Running `npx tsc --noEmit` locally shows "errors" in test files (Astro module imports)
  - These are expected - Astro components import correctly at runtime via Vitest
  - For CI type checking, use: `npx tsc --noEmit --project tsconfig.ci.json`

**Import Order (enforced by Prettier):**
1. Astro imports (`astro:content`, `astro:assets`)
2. Component imports (`./components/...`)
3. Utility imports (`./utils/...`)
4. Type imports (`./types/...`)
5. Asset imports (`../assets/...`)

**Path Rules:**
- Use RELATIVE paths for assets: `../assets/images/photo.png`
- NEVER use path aliases like `@/assets/` - Astro Image won't optimize them
- Content collection imports use `astro:content`

**Astro Component Frontmatter:**
- All logic goes in the `---` fence at top
- Props interface must be named `Props`
- Destructure props with defaults: `const { prop = 'default' } = Astro.props`

**Environment Variables:**
- Only `PUBLIC_` prefixed vars are client-accessible
- Document all env vars in `src/env.d.ts` with JSDoc
- Never commit `.env` files with secrets

### Framework-Specific Rules (Astro + Tailwind)

**Component Props Pattern:**
- ALWAYS extend `HTMLAttributes<'element'>` for accessibility passthrough
- Include JSDoc with `@example` usage and `@slot` documentation
- Destructure `class` as `className`, spread remaining attrs
- Use `class:list` for conditional classes

```astro
---
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'section'> {
  title: string;
  variant?: 'primary' | 'secondary';
}

const { title, variant = 'primary', class: className, ...attrs } = Astro.props;
---
<section class:list={['base-class', className]} {...attrs}>
```

**Tailwind CSS v4 Rules:**
- CSS-based config in `global.css`, not `tailwind.config.js`
- Use `@theme` directive for custom values
- Tailwind utilities FIRST, custom CSS only when necessary
- ALWAYS pair light/dark variants: `bg-white dark:bg-gray-900`

**Dark Mode System:**
- Class-based using `data-theme` attribute on `<html>`
- Inline script in `<head>` prevents FOUC (flash of unstyled content)
- Use `dark:` prefix for all color utilities
- localStorage key: `'theme'`

**Hydration Rules:**
- ONLY `ThemeToggle` component uses `client:load`
- All other interactivity uses vanilla JS with `<script>` tags
- Use `data-component="name"` attributes for JS hooks (not classes)

**Content Collections:**
- ALL content must be in collections (no hardcoded data in pages)
- Use `getCollection()` for lists, `getEntry()` for singles
- Frontmatter fields use camelCase: `publishDate`, `githubUrl`

### Testing Rules

**Test Organization:**
- Unit tests: Co-located with components (`Hero.test.ts` next to `Hero.astro`)
- E2E tests: `e2e/` folder at project root
- Test fixtures: `test/fixtures/` for shared mock data
- Naming: `*.test.ts` for unit, `*.spec.ts` for E2E

**Unit Test Pattern (Vitest + AstroContainer):**
```typescript
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
  });
});
```

**E2E Accessibility Test Pattern (Playwright + axe-core):**
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('page has no a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

**Test Requirements:**
- Every component must have a co-located unit test
- All pages must pass axe-core accessibility audit
- Dark mode must be tested (toggle, persistence, system preference)
- No broken links allowed (validated in CI)

**Test Fixture Standards:**
```
test/
├── fixtures/
│   ├── content/           # Mock content for schema tests
│   │   ├── projects/test-project.md
│   │   └── publications/test-publication.md
│   └── props/             # Component prop fixtures
│       ├── hero.ts
│       └── project-card.ts
└── utils/
    └── render-component.ts
```

**Playwright CI Configuration:**
- Use `reducedMotion: 'reduce'` in CI to avoid animation flakiness
- Test animation *presence* (class exists), not timing
- Clear localStorage in `beforeEach` for theme isolation

**CRITICAL: Accessibility E2E Tests (Learned from Epic 1):**
```typescript
// ALWAYS disable animations in axe-core tests to catch contrast issues
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('page passes accessibility audit', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```
Animation opacity at 0 during axe-core scan can mask contrast violations. Always emulate reduced motion.

### Code Quality & Style Rules

**Naming Conventions:**
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.astro`, `ProjectCard.astro` |
| Pages | kebab-case | `projects/[slug].astro` |
| Content files | kebab-case slug | `bertvision.md` |
| Utility scripts | kebab-case | `scroll-reveal.ts` |
| Test files | Component + `.test.ts` | `Hero.test.ts` |

**Animation Class Names (standardized):**
- `animate-hero-entrance` - Hero section entrance
- `animate-fade-up` - Scroll reveal for cards/sections
- `hover:animate-subtle-lift` - Interactive card hover

**Transition Timing Standards:**
| Category | Duration | Tailwind | Usage |
|----------|----------|----------|-------|
| Micro | 150ms | `duration-150` | Hovers, toggles |
| Component | 300ms | `duration-300` | Cards, modals |
| Page | 500ms | `duration-500` | Hero, page loads |

**Accessibility Requirements:**
- All interactive elements must have `.focus-ring` class
- Global reduced-motion safety net in `global.css`
- Semantic HTML with proper heading hierarchy (h1 → h2 → h3)
- All images require descriptive `alt` text

**Touch Target Rules (Learned from Epic 1):**
- Minimum 44x44px touch area for all interactive elements
- Use Tailwind preset classes: `min-h-11` (44px), NOT `min-h-[44px]`
- Arbitrary values like `[44px]` can result in 43.19px due to rendering
- Exception: Inline text links within paragraphs (prose content) are exempt from 44px min-height

**Container Width Patterns:**
- `max-w-5xl mx-auto` - Standard content pages (projects, about, publications)
- `container-custom` - Full-width sections with consistent padding
- Choose ONE approach per section for visual consistency

**Hidden Element Accessibility (Learned from Epic 1):**
- Containers with `aria-hidden="true"` must also have `tabindex="-1"` on all focusable children
- Toggle `tabindex` via JavaScript when container visibility changes
- Example: Mobile menu links need `tabindex="-1"` when menu is closed

**Comment Guidelines:**
| Scenario | Comment? |
|----------|----------|
| Complex regex | Yes - explain pattern |
| Business logic | Yes - explain why |
| Obvious code | No |
| Workarounds | Yes - include TODO with issue # |
| Why, not what | Yes - explain intent |

### Linting & Style Rules (Google TypeScript Style)

**Primary Tooling: gts (Google TypeScript Style)**
- gts provides Google's opinionated ESLint config, Prettier config, and CLI
- ALWAYS use gts commands instead of raw ESLint/Prettier commands

**gts Commands:**
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

**gts Integration with Existing Tooling:**
- gts replaces standalone ESLint config - do NOT create separate `.eslintrc`
- gts includes Prettier config - do NOT create separate `.prettierrc`
- Husky pre-commit hooks should call `gts lint` and `gts check`

**Pre-commit Hook Configuration:**
```bash
# .husky/pre-commit
npx gts lint
npx gts check
semgrep scan --config=auto --error .
```

**Closure Compiler Lint Checks (Build-Time):**
- Use Closure Compiler with `--jscomp_warning=lintChecks` for additional static analysis
- Run on compiled JavaScript output during build process
- Add to CI pipeline as a quality gate

```bash
# Example Closure Compiler lint check
npx google-closure-compiler \
  --jscomp_warning=lintChecks \
  --js=dist/**/*.js \
  --checks_only
```

**Style Rules (Enforced by gts):**
- 2-space indentation (not 4)
- Single quotes for strings
- No trailing commas in function parameters
- Semicolons required
- No unused variables or imports

### Security Scanning Rules

**Primary Tool: Semgrep**
- Semgrep performs static application security testing (SAST)
- Run on every PR and before deployment
- Zero high/critical findings required to merge

**Semgrep Commands (run locally before commit):**
```bash
# Install Semgrep
brew install semgrep          # macOS/Linux via Homebrew
pip install semgrep           # Alternative via pip

# Run security scan with auto rules
semgrep scan --config=auto .

# Run with specific rulesets for JavaScript/TypeScript
semgrep scan --config=p/javascript --config=p/typescript .

# Output SARIF for GitHub Security tab integration
semgrep scan --config=auto --sarif --output=semgrep.sarif .
```

**Semgrep CI Integration:**
```yaml
# Add to .github/workflows/deploy.yml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Run Semgrep
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/javascript
          p/typescript
          p/security-audit
```

**Security Scanning Requirements:**
- [ ] Zero high-severity Semgrep findings
- [ ] Zero critical npm audit vulnerabilities
- [ ] All external resources have SRI hashes
- [ ] No hardcoded secrets or API keys
- [ ] No `eval()` or `Function()` constructor usage

**npm Audit Integration:**
```bash
# Run before every build
npm audit --audit-level=high

# In CI (fails on high/critical)
npm audit --audit-level=high || exit 1
```

### Development Workflow Rules

**Branch Strategy:**
| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `master` | Production | cbenge509.github.io |
| Feature branches | Individual features | PR checks (no deploy) |

*Note: The v2 migration is complete. All development uses feature branches with PRs to master.*

**CI/CD Pipeline (GitHub Actions):**
1. Security Scan (Semgrep SAST)
2. Dependency Audit (npm audit --audit-level=high)
3. Lint (gts lint + gts check)
4. Build (Astro build)
5. Closure Compiler Lint (--jscomp_warning=lintChecks)
6. Unit Tests (Vitest)
7. E2E Tests (Playwright + axe-core)
8. Lighthouse CI (Performance/A11y/SEO ≥ 90)
9. Deploy (to GitHub Pages)

**Quality Gates (must pass to merge):**
- Zero Semgrep high/critical findings (BLOCKING)
- Zero npm audit high/critical vulnerabilities (BLOCKING)
- Zero gts lint errors (BLOCKING)
- Zero Closure Compiler lint warnings (BLOCKING)
- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 90
- Lighthouse SEO ≥ 90
- Zero TypeScript errors
- All tests passing

**Pre-commit Hooks (Husky + gts):**
- `*.{js,ts,astro}` → `gts fix` (lint + format)
- `*.{css,md,json}` → Prettier (gts doesn't handle these)
- Security: `npm audit --audit-level=high` (warns, doesn't block)

**Deployment Process:**
1. Develop on `v2` branch
2. QA on preview URL
3. When ready: merge `v2` → `main`
4. Old site instantly replaced
5. Git history preserves rollback option

### Critical Don't-Miss Rules

**Anti-Patterns to AVOID:**

| Anti-Pattern | Correct Pattern |
|--------------|-----------------|
| `hero.astro` | `Hero.astro` (PascalCase components) |
| `publish_date` in frontmatter | `publishDate` (camelCase) |
| Separate dark mode CSS file | `dark:` utilities inline |
| `__tests__/` folder | Co-located `*.test.ts` |
| `@/assets/image.png` | `../assets/image.png` (relative paths) |
| `@astrojs/tailwind` | `@tailwindcss/vite` (Tailwind v4) |
| Inline types in props | `interface Props extends HTMLAttributes` |
| Missing focus styles | Include `.focus-ring` class |
| Classes for JS hooks | `data-component` attributes |
| Inline SEO meta tags | Use `<SEO />` component |
| Hardcoded content in pages | Content Collections only |
| Standalone `.eslintrc` file | Use gts (manages ESLint config) |
| Standalone `.prettierrc` file | Use gts (manages Prettier config) |
| `npx eslint` or `npx prettier` | Use `npx gts lint` / `npx gts fix` |
| Skipping security scans | Run Semgrep on every PR |

**Edge Cases to Handle:**

- **FOUC Prevention:** Theme script MUST be inline in `<head>`, not external
- **Image Optimization:** Only works with relative imports, not aliases
- **Content Validation:** Zod schemas fail build on invalid frontmatter
- **Reduced Motion:** Global CSS safety net catches missed animations
- **Canonical URL (Learned from Epic 1):** Never use `Astro.url.href` for canonical URLs - it returns localhost in dev mode. Use `${siteUrl}${Astro.url.pathname}` instead

**Security Rules:**
- Never commit `.env` files
- External resources need SRI hashes
- No inline event handlers (`onclick`, etc.)

**Performance Gotchas:**
- Only ONE component should use `client:load` (ThemeToggle)
- Lazy load images below the fold
- Fonts are self-hosted (no Google Fonts CDN)
- Minimize CSS custom properties (use Tailwind utilities)

**Definition of Done (Every Component):**
- [ ] Props extend `HTMLAttributes<'element'>`
- [ ] JSDoc with `@example` and `@slot` if applicable
- [ ] Dark mode classes included (`dark:`)
- [ ] Focus states present (`.focus-ring`)
- [ ] Unit test co-located and passing
- [ ] Transitions use standard durations (150/300/500ms)

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

---

**Last Updated:** 2026-01-04 (Epic 1 lessons learned added)

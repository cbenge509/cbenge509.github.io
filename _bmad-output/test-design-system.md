# System-Level Test Design

**Date:** 2026-01-02
**Author:** Cris (TEA Agent Review)
**Project:** cbenge509.github.io
**Status:** Draft

---

## Executive Summary

**Mode:** System-Level Testability Review (Phase 3 - Solutioning)
**Purpose:** Validate architecture testability before implementation-readiness gate check

**Testability Assessment:** PASS with minor recommendations

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Controllability | PASS | Static site, content collections, clear data boundaries |
| Observability | PASS | Lighthouse CI, browser DevTools, build errors |
| Reliability | PASS | Deterministic builds, no external runtime dependencies |

---

## Testability Assessment

### Controllability: PASS

**Can we control system state for testing?**

| Factor | Assessment | Evidence |
|--------|------------|----------|
| Data seeding | ✅ Excellent | Content Collections with Zod schemas - test data can be validated at build time |
| State isolation | ✅ Excellent | Static site - no shared state between requests |
| Theme state | ✅ Good | localStorage-based - can be cleared/set in tests |
| Error triggering | ✅ Good | Build-time validation catches schema errors |

**Recommendations:**
- Create test fixtures for Content Collections validation
- Implement localStorage mocking in E2E tests

### Observability: PASS

**Can we inspect system state?**

| Factor | Assessment | Evidence |
|--------|------------|----------|
| Build output | ✅ Excellent | Astro build provides clear success/failure |
| Schema validation | ✅ Excellent | Zod errors show exact field and file |
| Performance metrics | ✅ Excellent | Lighthouse CI in pipeline |
| Visual state | ✅ Good | Playwright screenshots for dark mode |

**Recommendations:**
- Add console.error monitoring in E2E tests
- Include network request assertions for external resources

### Reliability: PASS

**Are tests isolated and reproducible?**

| Factor | Assessment | Evidence |
|--------|------------|----------|
| Test isolation | ✅ Excellent | Static output - each build is independent |
| Determinism | ✅ Excellent | No dynamic data, no external APIs at runtime |
| Parallelization | ✅ Excellent | Co-located tests can run in parallel |
| Flakiness risk | ✅ Low | No network dependencies, no async data fetching |

**Minor Concerns:**
- Animation timing tests may need `prefers-reduced-motion` handling
- Theme persistence tests need localStorage isolation

---

## Architecturally Significant Requirements (ASRs)

Based on PRD NFRs and architecture decisions, these quality requirements drive testing strategy:

### High-Priority ASRs (Risk Score ≥6)

| ASR ID | Requirement | Category | Probability | Impact | Score | Test Approach |
|--------|-------------|----------|-------------|--------|-------|---------------|
| ASR-01 | Lighthouse Performance ≥90 | PERF | 2 | 3 | 6 | Lighthouse CI gate in pipeline |
| ASR-02 | Lighthouse Accessibility ≥90 | SEC | 2 | 3 | 6 | Lighthouse CI + axe-core E2E |
| ASR-03 | No FOUC on theme load | BUS | 2 | 3 | 6 | E2E visual regression + timing |
| ASR-04 | Dark mode persistence | BUS | 2 | 3 | 6 | E2E localStorage validation |

### Medium-Priority ASRs (Risk Score 3-4)

| ASR ID | Requirement | Category | Probability | Impact | Score | Test Approach |
|--------|-------------|----------|-------------|--------|-------|---------------|
| ASR-05 | Content schema validation | DATA | 2 | 2 | 4 | Build-time Zod validation |
| ASR-06 | Responsive breakpoints | BUS | 2 | 2 | 4 | Visual regression at 640/768/1024/1280 |
| ASR-07 | Navigation accessibility | SEC | 2 | 2 | 4 | axe-core + keyboard navigation E2E |
| ASR-08 | Image optimization | PERF | 1 | 3 | 3 | Build verification + Lighthouse |

### Low-Priority ASRs (Risk Score 1-2)

| ASR ID | Requirement | Category | Probability | Impact | Score | Test Approach |
|--------|-------------|----------|-------------|--------|-------|---------------|
| ASR-09 | SEO meta tags | BUS | 1 | 2 | 2 | Lighthouse SEO + HTML validation |
| ASR-10 | External link integrity | OPS | 1 | 2 | 2 | Link checker in CI |

---

## Test Levels Strategy

Based on architecture (Static Web Application, GitHub Pages deployment):

### Recommended Test Distribution

| Level | Percentage | Rationale |
|-------|------------|-----------|
| Unit (Component) | 30% | Vitest + AstroContainer for component rendering |
| Integration (Build) | 20% | Astro build validates content + schemas |
| E2E (Browser) | 40% | Playwright for theme, navigation, accessibility |
| Performance | 10% | Lighthouse CI for NFR validation |

### Test Level Assignments

| Test Level | Scope | Tools | Run Frequency |
|------------|-------|-------|---------------|
| **Unit** | Component props, utilities, formatters | Vitest + AstroContainer | Every commit |
| **Schema** | Content Collection validation | Astro build + Zod | Every commit |
| **E2E** | Theme toggle, navigation, responsive | Playwright | PR to main |
| **Accessibility** | WCAG AA compliance | axe-core via Playwright | PR to main |
| **Visual** | Dark mode, responsive layouts | Playwright screenshots | PR to main |
| **Performance** | Lighthouse scores | Lighthouse CI | PR to main |
| **Links** | No broken internal/external links | lychee | Nightly |

---

## NFR Testing Approach

### Performance (NFR1-6)

| NFR | Target | Test Method | Tool |
|-----|--------|-------------|------|
| FCP < 1.5s | Lighthouse audit | CI pipeline gate | Lighthouse CI |
| LCP < 2s | Lighthouse audit | CI pipeline gate | Lighthouse CI |
| CLS < 0.1 | Lighthouse audit | CI pipeline gate | Lighthouse CI |
| Score ≥90 | All categories | CI pipeline gate | Lighthouse CI |

**Implementation:**
- `lighthouserc.json` with assertion thresholds
- Run on every PR to main/v2
- Block merge on failures

### Accessibility (NFR12-16)

| NFR | Target | Test Method | Tool |
|-----|--------|-------------|------|
| WCAG AA | Compliance | Automated audit | axe-core via Playwright |
| Focus management | Visible indicators | E2E keyboard navigation | Playwright |
| Reduced motion | Animation disabling | E2E with emulation | Playwright |
| Semantic HTML | Heading hierarchy | axe-core rules | axe-core |

**Implementation:**
```typescript
// e2e/accessibility.spec.ts pattern
import AxeBuilder from '@axe-core/playwright';

test('no a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Security Testing Gates (NFR22-23)

_Security testing is BLOCKING - zero tolerance for high/critical findings._

#### Primary Security Scanning: Semgrep SAST

_Run locally before commit AND in CI as safety net._

| Gate | Tool | Config | Threshold | Blocks Merge |
|------|------|--------|-----------|--------------|
| **SAST Scan** | Semgrep | p/javascript, p/typescript, p/security-audit | Zero high/critical | **YES** |
| **Secrets Detection** | Semgrep | p/secrets | Zero findings | **YES** |
| **Dependency Audit** | npm audit | --audit-level=high | Zero high/critical | **YES** |

**Local Development Workflow:**
```bash
# Before committing, run both linting and security
npx gts lint              # Lint check
npx gts check             # Format check
semgrep scan --config=auto --error .  # Security scan (fails on findings)
npm audit --audit-level=high          # Dependency check
```

**Semgrep CI Integration:**
```yaml
# .github/workflows/deploy.yml - Security job
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
          p/secrets
    - name: npm audit
      run: npm audit --audit-level=high
```

**Semgrep Local Commands (run before commit):**
```bash
# Install Semgrep
brew install semgrep          # macOS/Linux via Homebrew
pip install semgrep           # Alternative via pip

# Run full security scan
semgrep scan --config=auto .

# Run with specific rulesets
semgrep scan --config=p/javascript --config=p/typescript --config=p/secrets .

# Run with --error flag to fail on findings (use in pre-commit)
semgrep scan --config=auto --error .

# Output SARIF for GitHub Security tab
semgrep scan --config=auto --sarif --output=semgrep.sarif .
```

#### Security ASRs (Architecturally Significant Requirements)

| ASR-SEC ID | Requirement | ARCH Trace | Risk | Test Approach |
|------------|-------------|------------|------|---------------|
| ASR-SEC-01 | Zero Semgrep high/critical findings | ARCH-003 | BLOCKING | CI: Semgrep gate |
| ASR-SEC-02 | Zero npm audit high/critical vulns | ARCH-004 | BLOCKING | CI: npm audit gate |
| ASR-SEC-03 | SRI hashes on external resources | ARCH-013 | HIGH | Manual: Build review |
| ASR-SEC-04 | No hardcoded secrets in codebase | ARCH-014 | BLOCKING | CI: Semgrep p/secrets |
| ASR-SEC-05 | No eval()/Function() constructor | ARCH-SEC-05 | HIGH | CI: Semgrep rule |
| ASR-SEC-06 | No inline event handlers | ARCH-SEC-06 | MEDIUM | CI: gts lint |
| ASR-SEC-07 | HTTPS enforced | - | LOW | GitHub Pages default |

#### Security Quality Gate Checklist

**Pre-Merge Security Requirements:**
- [ ] Semgrep scan passes with zero high/critical findings
- [ ] npm audit passes with zero high/critical vulnerabilities
- [ ] No secrets detected (API keys, passwords, tokens)
- [ ] No eval() or Function() constructor usage
- [ ] External resources have SRI hashes (manual verification)
- [ ] No inline event handlers (onclick, onload, etc.)

**Note:** GitHub Pages provides HTTPS by default. SRI verification is manual during implementation.

### SEO (NFR17-21)

| NFR | Target | Test Method | Tool |
|-----|--------|-------------|------|
| Meta tags | Present on all pages | HTML validation | Playwright assertions |
| Structured data | JSON-LD Person schema | HTML validation | Playwright assertions |
| Sitemap | Generated | Build verification | File existence check |
| Lighthouse SEO ≥90 | Score | CI pipeline gate | Lighthouse CI |

---

## Test Environment Requirements

### Local Development
- Node.js 20+ (for Astro 5.x)
- Playwright browsers installed (`npx playwright install`)
- No external services required

### CI Environment (GitHub Actions)
- ubuntu-latest runner
- Node.js 20
- Playwright dependencies
- Lighthouse CI action

### Test Data Strategy
- **Content fixtures:** Mock markdown files in `test/fixtures/content/`
- **Component fixtures:** Props objects in co-located `*.test.ts`
- **No external mocking needed:** Static site has no runtime APIs

---

## Testability Concerns

### No Blocking Concerns

The architecture is highly testable:
- ✅ Static output - deterministic, reproducible
- ✅ Content Collections - type-safe, validateable
- ✅ Single hydration point - minimal JS complexity
- ✅ Lighthouse CI - built-in NFR validation

### Minor Recommendations

| Concern | Impact | Recommendation |
|---------|--------|----------------|
| Animation timing | Low | Use `prefers-reduced-motion` emulation in tests |
| Theme flicker detection | Medium | Add visual regression for first 100ms of page load |
| localStorage isolation | Low | Clear localStorage in Playwright `beforeEach` |

---

## Party Mode Enhancements (2026-01-02)

*Enhancements identified through multi-agent review by Murat (TEA), Winston (Architect), Sally (UX), and Amelia (Dev).*

### 1. Post-Deploy Smoke Test (High Priority)

**Rationale:** GitHub Pages CDN may cache stale content after deploy.

**Implementation:**
```yaml
# Add to .github/workflows/deploy.yml after deploy job
post-deploy-smoke:
  needs: deploy
  runs-on: ubuntu-latest
  steps:
    - name: Wait for CDN propagation
      run: sleep 30
    - name: Smoke test production
      run: |
        curl -f https://cbenge509.github.io/ || exit 1
        curl -f https://cbenge509.github.io/projects/ || exit 1
```

**Verification:** Critical paths load on production URL after deploy.

### 2. Visual Regression Baselines (Medium Priority)

**Rationale:** Portfolio sites live or die by visual quality at each breakpoint.

**Implementation:**
```typescript
// e2e/visual-regression.spec.ts
const breakpoints = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'wide', width: 1920, height: 1080 },
];

for (const bp of breakpoints) {
  test(`homepage visual - ${bp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('/');
    await expect(page).toHaveScreenshot(`home-${bp.name}.png`);
  });
}
```

**Verification:** Screenshots compared on every PR, differences flagged for review.

### 3. Test Fixture Standards (High Priority)

**Rationale:** Content Collections need mock data for schema validation tests.

**Directory Structure:**
```
test/
├── fixtures/
│   ├── content/
│   │   ├── projects/
│   │   │   └── test-project.md
│   │   ├── publications/
│   │   │   └── test-publication.md
│   │   └── config.test.ts
│   └── props/
│       ├── hero.ts
│       └── project-card.ts
└── utils/
    └── render-component.ts
```

**Schema Validation Test Pattern:**
```typescript
// test/fixtures/content/config.test.ts
import { describe, it, expect } from 'vitest';
import { projectSchema, publicationSchema } from '@/content/config';

describe('Content Schemas', () => {
  it('validates project frontmatter', () => {
    const validProject = {
      title: 'Test Project',
      description: 'A test project',
      image: './test.png',
      skills: ['TypeScript'],
      tools: ['Astro'],
      category: 'builder',
      publishDate: new Date(),
    };
    expect(() => projectSchema.parse(validProject)).not.toThrow();
  });
});
```

**Add to project-context.md:** Test Fixture Standards section.

### 4. Reduced Motion CI Strategy (Medium Priority)

**Rationale:** Animation timing tests cause CI flakiness.

**Playwright Config:**
```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Disable animations in CI for deterministic tests
    reducedMotion: process.env.CI ? 'reduce' : 'no-preference',
  },
});
```

**Test Strategy:**
- CI: Test animation *presence* (class exists), not timing
- Local/Manual: Verify animation *quality* and feel

**Animation Presence Test:**
```typescript
test('hero has entrance animation class', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('[data-component="hero"]');
  await expect(hero).toHaveClass(/animate-hero-entrance/);
});
```

### 5. UX Timing Assertions (Low Priority)

**Rationale:** Users perceive delays over 300ms as "broken."

**Custom Assertions:**
```typescript
// e2e/performance.spec.ts
test('theme script executes quickly', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');

  // Theme should be applied before DOMContentLoaded
  const themeApplied = await page.evaluate(() => {
    return document.documentElement.hasAttribute('data-theme');
  });

  expect(themeApplied).toBe(true);
  expect(Date.now() - startTime).toBeLessThan(500); // Page + theme < 500ms
});
```

**Metrics Covered by Lighthouse (don't duplicate):**
- First Contentful Paint
- Largest Contentful Paint
- Cumulative Layout Shift

---

## Additional ASR (From Party Mode)

| ASR ID | Requirement | Category | Probability | Impact | Score | Test Approach |
|--------|-------------|----------|-------------|--------|-------|---------------|
| ASR-11 | Post-deploy cache validation | OPS | 2 | 2 | 4 | Post-deploy smoke test job |

---

## Recommendations for Sprint 0

### Framework Setup (`testarch-framework` workflow)

1. **Vitest Configuration**
   - Co-located tests (`*.test.ts` next to components)
   - AstroContainer for component rendering
   - Coverage thresholds (≥80% for utilities)

2. **Playwright Configuration**
   - Projects: chromium, firefox, webkit
   - axe-core integration
   - Screenshot comparison for visual regression
   - Theme state helpers

3. **CI Pipeline**
   - Lint → Build → Test → Lighthouse → Deploy
   - Artifact upload for screenshots
   - Lighthouse budget assertions

### Test Infrastructure Checklist

- [ ] `vitest.config.ts` with Astro integration
- [ ] `playwright.config.ts` with multiple browsers
- [ ] `lighthouserc.json` with score thresholds
- [ ] `.github/workflows/deploy.yml` with test jobs
- [ ] `test/fixtures/` directory structure
- [ ] `e2e/` directory with base tests

---

## Quality Gate Criteria (Pre-Implementation)

| Gate | Threshold | Blocking? | Tool |
|------|-----------|-----------|------|
| **Security: Semgrep SAST** | Zero high/critical | **Yes** | Semgrep |
| **Security: npm audit** | Zero high/critical | **Yes** | npm audit |
| **Security: Secrets** | Zero findings | **Yes** | Semgrep p/secrets |
| **Linting: gts** | Zero errors | **Yes** | gts lint |
| **Linting: Closure Compiler** | Zero warnings | **Yes** | google-closure-compiler |
| Lighthouse Performance | ≥90 | Yes | Lighthouse CI |
| Lighthouse Accessibility | ≥90 | Yes | Lighthouse CI |
| Lighthouse SEO | ≥90 | Yes | Lighthouse CI |
| axe-core violations | 0 | Yes | @axe-core/playwright |
| TypeScript errors | 0 | Yes | tsc --noEmit |
| Broken links | 0 | Yes | lychee |

---

## Validation Checklist

- [x] Controllability assessed (PASS)
- [x] Observability assessed (PASS)
- [x] Reliability assessed (PASS)
- [x] ASRs identified and scored
- [x] Test levels strategy defined
- [x] NFR testing approach documented
- [x] Environment requirements specified
- [x] Testability concerns flagged
- [x] Sprint 0 recommendations provided
- [x] Quality gate criteria defined

---

**Testability Review Result:** PASS - Architecture is highly testable

**Recommendation for Gate Check:** No testability blockers. Proceed with implementation-readiness check.

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `testarch-test-design` (System-Level Mode)
**Version**: 4.0 (BMad v6)

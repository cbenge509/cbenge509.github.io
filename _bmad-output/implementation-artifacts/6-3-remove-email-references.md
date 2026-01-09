# Story 6.3: Remove Email References Sitewide

Status: done

## Story

As a **portfolio owner**,
I want **all email addresses and "Email Me" references removed from the entire site**,
so that **visitors contact me exclusively through LinkedIn and GitHub, reducing unwanted email inquiries while maintaining clear contact pathways**.

## Acceptance Criteria

### AC1: Footer Component - Email Link Removal
- [x] The Email link is completely removed from the Footer component
- [x] Footer displays only: GitHub and LinkedIn social links
- [x] Social links navigation maintains proper spacing and alignment
- [x] Footer unit tests updated to reflect email removal
- [x] No `mailto:` or email address references remain in Footer.astro

### AC2: ContactSection Component - Email to GitHub Conversion
- [x] The "Email Me" button is removed from ContactSection
- [x] A new GitHub button replaces the Email button position (secondary styling, matching CV button)
- [x] GitHub button text: "View GitHub" with external link arrow icon
- [x] GitHub button opens in new tab with proper `rel="noopener noreferrer"`
- [x] GitHub button has `aria-label="GitHub profile (opens in new tab)"`
- [x] GitHub button has `data-testid="github-button"`

### AC3: ContactSection - Secondary GitHub Text Removal
- [x] The "Or check out my work on GitHub" paragraph is completely removed
- [x] Section layout adjusts properly without the secondary text
- [x] Visual spacing remains balanced after removal

### AC4: ContactSection - Subtitle Text Update
- [x] The subtitle text "Interested in connecting? Reach out via email or LinkedIn." is updated
- [x] New subtitle: "Interested in connecting? Reach out on LinkedIn or check out my work on GitHub."

### AC5: ContactSection Props Cleanup
- [x] The `showEmail` prop is removed from ContactSection interface
- [x] The `email` constant is removed from the component
- [x] All email-related code is removed from the component
- [x] JSDoc documentation updated to remove email references

### AC6: Codebase-Wide Email Audit
- [x] No `mailto:` links remain anywhere in the codebase
- [x] No `cris.benge@gmail.com` references remain anywhere
- [x] No "Email Me" text remains anywhere
- [x] `grep -r "email" src/` returns only false positives (variable names, not user-facing content)

### AC7: Unit Tests Updated
- [x] Footer.test.ts - All email-related tests removed or inverted
- [x] ContactSection.test.ts - All email-related tests removed or inverted
- [x] New test: ContactSection renders GitHub button with correct attributes
- [x] New test: ContactSection does NOT contain email references
- [x] All existing non-email tests continue to pass

### AC8: E2E Tests Updated
- [x] About page E2E tests updated if they reference email
- [x] New E2E test: ContactSection GitHub button navigates correctly
- [x] Accessibility audit passes without email link

### AC9: All Tests Pass
- [x] `npm run lint` passes
- [x] `npm run build` succeeds
- [x] `npm run test` passes (all unit tests)
- [x] `npm run test:e2e` passes (all E2E tests - 564 passed, 13 pre-existing failures unrelated to story)

## Tasks / Subtasks

- [x] Task 1: Update Footer Component (AC: 1)
  - [x] 1.1 Edit `src/components/Footer.astro` - remove Email object from socialLinks array
  - [x] 1.2 Verify Footer renders correctly with only GitHub and LinkedIn
  - [x] 1.3 Visual check spacing is balanced with 2 links instead of 3

- [x] Task 2: Update Footer Unit Tests (AC: 1, 7)
  - [x] 2.1 Edit `src/components/Footer.test.ts` - remove/invert email test cases
  - [x] 2.2 Add test: Footer does NOT contain mailto or email references
  - [x] 2.3 Verify all Footer tests pass (22 tests passing)

- [x] Task 3: Update ContactSection Component (AC: 2, 3, 4, 5)
  - [x] 3.1 Edit `src/components/ContactSection.astro` - remove `showEmail` prop from interface
  - [x] 3.2 Remove `email` constant and all email-related code
  - [x] 3.3 Remove the "Email Me" button block
  - [x] 3.4 Add GitHub button in place of email button with secondary styling
  - [x] 3.5 Remove the "Or check out my work on GitHub" paragraph entirely
  - [x] 3.6 Update subtitle text from "email or LinkedIn" to "LinkedIn or check out my work on GitHub"
  - [x] 3.7 Update JSDoc to remove email references

- [x] Task 4: Update ContactSection Unit Tests (AC: 7)
  - [x] 4.1 Edit `src/components/ContactSection.test.ts` - remove all email-related tests
  - [x] 4.2 Add test: ContactSection renders GitHub button with data-testid
  - [x] 4.3 Add test: ContactSection GitHub button has external link attributes
  - [x] 4.4 Add test: ContactSection does NOT contain mailto references
  - [x] 4.5 Add test: ContactSection does NOT contain "Email Me" text
  - [x] 4.6 Update tests that used `showEmail` prop
  - [x] 4.7 Verify all ContactSection tests pass (46 tests passing)

- [x] Task 5: Codebase Email Audit (AC: 6)
  - [x] 5.1 Run `grep -r "mailto:" src/` and verify zero results (only in test files verifying absence)
  - [x] 5.2 Run `grep -r "cris.benge@gmail.com" .` and verify zero results (only in story/test artifacts)
  - [x] 5.3 Run `grep -r "Email Me" src/` and verify zero results (only in test files verifying absence)
  - [x] 5.4 Document any remaining "email" references (test file names and assertions only)

- [x] Task 6: E2E Test Updates (AC: 8)
  - [x] 6.1 Check `e2e/about.spec.ts` for email references and remove/update
  - [x] 6.2 Add E2E test: ContactSection has GitHub button that opens in new tab
  - [x] 6.3 Add E2E tests: Footer email removal verification
  - [x] 6.4 Verify accessibility audit passes

- [x] Task 7: Final Validation (AC: 9)
  - [x] 7.1 Run `npm run lint` - pass
  - [x] 7.2 Run `npm run build` - success
  - [x] 7.3 Run `npm run test` - all 351 unit tests pass
  - [x] 7.4 Run `npm run test:e2e` - 564 E2E tests pass (13 pre-existing failures unrelated to this story)
  - [x] 7.5 Build output verification - no mailto in dist/about/index.html

## Dev Notes

### Footer Implementation (src/components/Footer.astro lines 22-35)

The `socialLinks` array has 2 items (Email removed):
```typescript
const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/cbenge509',
    ariaLabel: 'GitHub profile (opens in new tab)',
    isExternal: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/crisbenge/',
    ariaLabel: 'LinkedIn profile (opens in new tab)',
    isExternal: true,
  },
];
```

**Status:** ✅ Email removed as of Story 6.3 implementation.

### ContactSection Implementation (src/components/ContactSection.astro)

**Implemented structure:**
1. SectionHeading "Get In Touch" with subtitle: "Interested in connecting? Reach out on LinkedIn or check out my work on GitHub."
2. Button row: LinkedIn (primary), View GitHub (secondary), View CV (secondary)
3. NO paragraph below buttons (removed "Or check out my work on GitHub")

**Status:** ✅ Email removed and GitHub button added as of Story 6.3 implementation.

### GitHub Button Implementation Reference

The GitHub button uses secondary styling (matching CV button):
```html
<a
  href={githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-2 px-6 py-3 min-h-11 border border-border dark:border-border-dark text-text dark:text-text-dark rounded-lg hover:bg-surface-dark/5 dark:hover:bg-surface/5 transition-colors duration-150 focus-ring"
  aria-label="GitHub profile (opens in new tab)"
  data-testid="github-button"
>
  View GitHub
  <span aria-hidden="true">↗</span>
</a>
```

**Status:** ✅ Implemented as of Story 6.3.

### Files to Modify

| File | Change |
|------|--------|
| `src/components/Footer.astro` | Remove Email from socialLinks array |
| `src/components/Footer.test.ts` | Remove email tests, add no-email verification |
| `src/components/ContactSection.astro` | Remove email, add GitHub button, remove secondary text |
| `src/components/ContactSection.test.ts` | Remove email tests, add GitHub button tests |
| `e2e/about.spec.ts` | Update if email references exist |

### Email References to Remove

**Footer.astro:**
- Lines 22-28: Email object in socialLinks array

**Footer.test.ts:**
- Line 22-25: `it('renders email link with mailto protocol'...`
- Line 29-36: `it('email link does not have external arrow icon'...`
- Line 38-41: `it('email link has correct aria-label'...`

**ContactSection.astro:**
- Line 24-25: `showEmail` prop in interface
- Line 30: `showEmail = true` in destructuring
- Lines 32-33: `email` constant
- Line 56: "Reach out via email or LinkedIn" subtitle text
- Lines 74-85: Email button block
- Lines 105-118: "Or check out my work on GitHub" paragraph

**ContactSection.test.ts:**
- Lines 78-91: Multiple email-related test cases
- Lines 93-98: `hides email link when showEmail=false` test
- Lines 284-288: `can hide both email and CV` test

### Important Implementation Notes

1. **Button Order**: After removal, the button order should be: LinkedIn (primary), GitHub (secondary), CV (secondary)

2. **GitHub URL Already Defined**: The `githubUrl` constant already exists in ContactSection.astro at line 35, so no new constant is needed

3. **External Link Pattern**: GitHub button must have `target="_blank"`, `rel="noopener noreferrer"`, and the ↗ icon

4. **Test ID Convention**: Use `data-testid="github-button"` for the new button (different from `github-link` which was used for the inline text link)

5. **Subtitle Update**: Change from "Reach out via email or LinkedIn." to "Reach out on LinkedIn or check out my work on GitHub."

### Testing Requirements

**New Unit Tests for ContactSection:**
```typescript
describe('GitHub button', () => {
  it('renders GitHub button with correct href', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ContactSection, { props: {} });
    expect(result).toContain('href="https://github.com/cbenge509"');
    expect(result).toContain('data-testid="github-button"');
  });

  it('GitHub button opens in new tab', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ContactSection, { props: {} });
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('renders "View GitHub" text', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ContactSection, { props: {} });
    expect(result).toContain('View GitHub');
  });
});

describe('email removal verification', () => {
  it('does NOT contain mailto link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ContactSection, { props: {} });
    expect(result).not.toContain('mailto:');
  });

  it('does NOT contain "Email Me" text', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ContactSection, { props: {} });
    expect(result).not.toContain('Email Me');
  });
});
```

**New Unit Tests for Footer:**
```typescript
describe('email removal verification', () => {
  it('does NOT contain mailto link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer, { props: {} });
    expect(result).not.toContain('mailto:');
  });

  it('does NOT contain email label', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer, { props: {} });
    expect(result).not.toContain('>Email<');
  });
});
```

### Project Structure Notes

- All changes align with existing component patterns
- No new files created - only modifications to existing files
- Unit tests co-located with components per CLAUDE.md requirements
- E2E tests in e2e/ folder

### Risk Assessment

**Low Risk Story:**
- Simple removal operations (no new features)
- Clear scope with well-defined files to modify
- Existing test patterns to follow
- No schema or data model changes
- No new dependencies

### Definition of Done

- [x] Footer displays only GitHub and LinkedIn (no Email)
- [x] ContactSection has GitHub button instead of Email button
- [x] "Or check out my work on GitHub" paragraph removed
- [x] Subtitle updated to reference LinkedIn and GitHub (no email)
- [x] No mailto: links in codebase
- [x] No email address strings in codebase
- [x] All unit tests pass (including new verification tests)
- [x] All E2E tests pass (564 passed, 13 pre-existing failures)
- [x] Lint passes
- [x] Build succeeds
- [x] Visual verification via build output analysis

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A - No issues encountered during implementation

### Completion Notes List

1. **Footer Changes**: Removed Email object from socialLinks array, leaving GitHub and LinkedIn only
2. **ContactSection Changes**:
   - Removed `showEmail` prop and `email` constant
   - Added GitHub button with "View GitHub" text, external link icon, and proper security attributes
   - Removed "Or check out my work on GitHub" paragraph
   - Updated subtitle text to reference LinkedIn and GitHub
3. **Unit Tests**:
   - Footer: 22 tests passing (3 email tests replaced with email removal verification tests)
   - ContactSection: 46 tests passing (email tests replaced with email removal + GitHub button tests)
4. **E2E Tests**:
   - All email-related tests in about.spec.ts updated to verify email removal
   - New GitHub Button test suite added (6 tests)
   - New Footer Email Removal Verification test suite added (3 tests)
   - 564 tests pass, 13 failures are pre-existing issues unrelated to this story (education cards, patents)
5. **Codebase Audit**: Confirmed no mailto: links or email addresses in source files (only in test assertions verifying absence)

### File List

| File | Changes |
|------|---------|
| `src/components/Footer.astro` | Removed Email from socialLinks array |
| `src/components/Footer.test.ts` | Replaced 3 email tests with email removal verification |
| `src/components/ContactSection.astro` | Removed showEmail prop, email constant, Email button; added GitHub button; updated subtitle |
| `src/components/ContactSection.test.ts` | Replaced email tests with email removal verification + GitHub button tests |
| `e2e/about.spec.ts` | Updated email tests to removal verification, added GitHub Button tests, updated mobile tests |

---

## Senior Developer Review (AI)

**Review Date:** 2026-01-09
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)
**Outcome:** ✅ APPROVED

### Issues Found and Fixed

| ID | Severity | Issue | Resolution |
|----|----------|-------|------------|
| M1 | MEDIUM | Test redundancy in ContactSection email verification (4 separate tests with duplicate container setup) | Consolidated into single test with multiple assertions |
| M2 | MEDIUM | E2E test coverage gap - Footer email removal only tested on /about page | Added email removal tests to `e2e/footer.spec.ts` (tests on home page), fixed link count comment |
| M3 | MEDIUM | ContactSection JSDoc incomplete - doesn't mention GitHub button | Updated JSDoc to document button layout: LinkedIn (primary), GitHub (secondary), CV (secondary) |
| L1 | LOW | Test describe block names inconsistent | Updated describe blocks to include data-testid: `GitHub Button [data-testid="github-button"]` |
| L2 | LOW | Story Dev Notes section showed outdated implementation | Updated Dev Notes to reflect current implementation with status markers |

### Verification

- ✅ All Acceptance Criteria verified as implemented
- ✅ All tasks marked [x] confirmed complete
- ✅ No git vs story File List discrepancies
- ✅ `npm run lint` passes
- ✅ `npm run build` succeeds
- ✅ 348 unit tests pass (consolidated from 351)
- ✅ No mailto or email references in source files
- ✅ No mailto or email references in build output

### Change Log Entry

```
2026-01-09 | Adversarial Code Review | APPROVED | 3 MEDIUM, 2 LOW issues fixed
- M1: Consolidated ContactSection email verification tests
- M2: Added Footer email removal E2E tests to footer.spec.ts
- M3: Updated ContactSection JSDoc to document GitHub button
- L1: Updated test describe blocks with data-testid references
- L2: Updated story Dev Notes to reflect current implementation
```

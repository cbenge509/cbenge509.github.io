---
stepsCompleted: [1, 2, 3, 4]
status: complete
completedDate: 2026-01-03
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# cbenge509.github.io - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for cbenge509.github.io, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Site Navigation & Information Architecture:**
- FR1: Visitors can navigate to any major section (About, Projects, Education, Skills, Awards) from any page
- FR2: Visitors can return to the home page from any location on the site
- FR3: Visitors can access social links (GitHub, LinkedIn) from any page
- FR4: Visitors can download or view the CV/resume

**Professional Profile Display:**
- FR5: Visitors can view the professional summary and current role on the home page
- FR6: Visitors can see academic credentials (degrees, institutions, honors)
- FR7: Visitors can view professional certifications and their issuing organizations
- FR8: Visitors can see security clearance level (Top Secret/SCI)
- FR9: Visitors can access the Google Scholar profile via external link

**Project Portfolio:**
- FR10: Visitors can browse all featured projects in a visual gallery format
- FR11: Visitors can view detailed information for each individual project
- FR12: Visitors can see project skills/techniques used for each project
- FR13: Visitors can see tools/technologies used for each project
- FR14: Visitors can access the GitHub repository for each project (where applicable)
- FR15: Visitors can see competition results/achievements for relevant projects

**Publications & Patents:**
- FR16: Visitors can view a list of publications with titles and authors
- FR17: Visitors can expand/collapse publication abstracts
- FR18: Visitors can access PDF versions of publications
- FR19: Visitors can view US Patents with links to patent documents
- FR20: Visitors can access code repositories associated with publications

**Awards & Recognition:**
- FR21: Visitors can view competition honors (Kaggle, DrivenData placements)
- FR22: Visitors can view professional awards and recognitions

**Theme & Display Preferences:**
- FR23: Visitors can view the site in light or dark mode
- FR24: The site can detect and apply the visitor's system theme preference automatically
- FR25: Visitors can manually toggle between light and dark modes
- FR26: The site can remember the visitor's theme preference across sessions

**Contact & Call-to-Action:**
- FR27: Visitors can contact the portfolio owner via available channels
- FR28: Visitors can connect via LinkedIn
- FR29: Visitors can view the portfolio owner's GitHub profile

**Responsive Experience:**
- FR30: Visitors can access all site functionality on mobile devices
- FR31: Visitors can access all site functionality on tablet devices
- FR32: Visitors can access all site functionality on desktop devices

### NonFunctional Requirements

**Performance:**
- NFR1: Pages load in under 2 seconds on 4G connections (Lighthouse performance score, field data)
- NFR2: First Contentful Paint (FCP) under 1.5 seconds (Lighthouse audit)
- NFR3: Largest Contentful Paint (LCP) under 2.0 seconds (Lighthouse audit)
- NFR4: Cumulative Layout Shift (CLS) under 0.1 (Lighthouse audit)
- NFR5: Total page weight under 1MB per page (Browser DevTools)
- NFR6: Lighthouse Performance score above 90 (Lighthouse audit)

**Browser Compatibility:**
- NFR7: Site functions correctly in Chrome (latest 2 versions) - Manual testing
- NFR8: Site functions correctly in Firefox (latest 2 versions) - Manual testing
- NFR9: Site functions correctly in Safari (latest 2 versions) - Manual testing
- NFR10: Site functions correctly in Edge (latest 2 versions) - Manual testing
- NFR11: No horizontal scrolling at any viewport width 320px+ - Manual testing

**Accessibility:**
- NFR12: All images have descriptive alt text (Automated audit)
- NFR13: Color contrast meets WCAG AA standards (4.5:1 for text) - Lighthouse accessibility audit
- NFR14: All interactive elements are keyboard accessible (Manual testing)
- NFR15: Heading hierarchy is semantic (h1 → h2 → h3) - Automated audit
- NFR16: Focus indicators are visible for keyboard navigation (Manual testing)

**SEO & Discoverability:**
- NFR17: Each page has a unique, descriptive title tag (Automated audit)
- NFR18: Each page has a meta description (Automated audit)
- NFR19: Open Graph tags present for social sharing (Automated audit)
- NFR20: Site appears in top 3 results for "Cris Benge" search (Google search verification)
- NFR21: Lighthouse SEO score above 90 (Lighthouse audit)

**Security (Minimal - Static Site):**
- NFR22: Site served over HTTPS (Browser verification)
- NFR23: External resources loaded with SRI hashes (Code review)

### Additional Requirements

**From Architecture Document:**

- **ARCH-1**: Initialize project with minimal Astro 5.x + Tailwind CSS v4 + TypeScript strict (starter template for Epic 1, Story 1)
- **ARCH-2**: Implement Content Collections with Zod schema validation for projects, publications, patents, education, certifications, awards
- **ARCH-3**: Set up GitHub Actions CI/CD pipeline with Lighthouse quality gates (score ≥90)
- **ARCH-4**: Use v2 branch deployment strategy for preview before cutover
- **ARCH-5**: Implement SEO with JSON-LD Person schema, XML sitemap, robots.txt
- **ARCH-6**: Use Astro `<Image />` component for automatic image optimization (WebP, srcset, lazy loading)
- **ARCH-7**: Self-host fonts via @fontsource packages (Inter, Space Grotesk, JetBrains Mono)
- **ARCH-8**: Implement animation system with pure CSS keyframes + IntersectionObserver for scroll reveals
- **ARCH-9**: Configure development tooling: ESLint, Prettier with Tailwind plugin, Husky pre-commit hooks
- **ARCH-10**: All components must follow Props interface pattern extending HTMLAttributes with JSDoc documentation
- **ARCH-11**: Unit tests co-located with components using Vitest + AstroContainer
- **ARCH-12**: E2E tests in /e2e folder using Playwright + axe-core for accessibility

**From UX Design Document:**

- **UX-1**: Mobile-first responsive design with breakpoints at 640/768/1024/1280px
- **UX-2**: WCAG 2.1 AA accessibility compliance with visible focus-ring utility class
- **UX-3**: Respect `prefers-reduced-motion`: disable transforms but allow opacity transitions
- **UX-4**: Minimum 44×44px touch targets on all interactive elements
- **UX-5**: Typography system: Space Grotesk (display/headings) + Inter (body) + JetBrains Mono (code)
- **UX-6**: Color system: Google Blue accent (#2563eb light / #3b82f6 dark) with semantic tokens
- **UX-7**: Navigation: Sticky header that hides on scroll-down, reveals on scroll-up
- **UX-8**: Card interactions: hover lift (`translateY(-4px)`) + shadow deepening transitions
- **UX-9**: Gradient underline hover pattern on all links (150ms ease-out)
- **UX-10**: Hero signature animation sequence (sequenced entrance 0-1.2s on page load)
- **UX-11**: Triple-threat tags on project cards (Leadership=blue, Technical=green, Winner=amber, Research=purple)
- **UX-12**: Left-aligned bold hero layout with asymmetric design
- **UX-13**: Card-based modern project cards with image, title, description, tags
- **UX-14**: Theme toggle in navigation bar with localStorage persistence and FOUC prevention via inline head script
- **UX-15**: External links show ↗ icon and open in new tab with `rel="noopener noreferrer"`

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Navigate to any major section from any page |
| FR2 | Epic 1 | Return to home page from any location |
| FR3 | Epic 1 | Access social links (GitHub, LinkedIn) from any page |
| FR4 | Epic 4 | Download or view CV/resume |
| FR5 | Epic 1 | View professional summary and current role on home page |
| FR6 | Epic 3 | See academic credentials (degrees, institutions, honors) |
| FR7 | Epic 3 | View professional certifications |
| FR8 | Epic 1 | See security clearance level (TS/SCI) |
| FR9 | Epic 4 | Access Google Scholar profile via external link |
| FR10 | Epic 2 | Browse all featured projects in visual gallery |
| FR11 | Epic 2 | View detailed information for each project |
| FR12 | Epic 2 | See project skills/techniques used |
| FR13 | Epic 2 | See tools/technologies used |
| FR14 | Epic 2 | Access GitHub repository for each project |
| FR15 | Epic 2 | See competition results/achievements |
| FR16 | Epic 4 | View list of publications with titles and authors |
| FR17 | Epic 4 | Expand/collapse publication abstracts |
| FR18 | Epic 4 | Access PDF versions of publications |
| FR19 | Epic 4 | View US Patents with links (NEW FEATURE) |
| FR20 | Epic 4 | Access code repositories for publications |
| FR21 | Epic 3 | View competition honors |
| FR22 | Epic 3 | View professional awards |
| FR23 | Epic 1 | View site in light or dark mode |
| FR24 | Epic 1 | Auto-detect system theme preference |
| FR25 | Epic 1 | Manually toggle between modes |
| FR26 | Epic 1 | Remember theme preference across sessions |
| FR27 | Epic 4 | Contact portfolio owner |
| FR28 | Epic 1 | Connect via LinkedIn |
| FR29 | Epic 1 | View GitHub profile |
| FR30 | Epic 1 | Access all functionality on mobile |
| FR31 | Epic 1 | Access all functionality on tablet |
| FR32 | Epic 1 | Access all functionality on desktop |

## Epic List

### Epic 1: Professional First Impression

**Goal:** Visitors can land on the home page and immediately understand "who Cris is" - passing the 3-second test. The site works on mobile, supports dark mode, navigation is functional, and the hero section with signature animation creates instant "wow factor."

**FRs Covered:** FR1, FR2, FR3, FR5, FR8, FR23, FR24, FR25, FR26, FR28, FR29, FR30, FR31, FR32 (14 FRs)

**Additional Requirements:**
- ARCH-1: Initialize project with Astro 5.x + Tailwind CSS v4 + TypeScript strict
- ARCH-2: Implement ALL content collection schemas (projects, publications, patents, education, certifications, awards)
- ARCH-7: Self-host fonts via @fontsource (Inter, Space Grotesk, JetBrains Mono)
- ARCH-9: Development tooling (ESLint, Prettier, Husky)
- ARCH-10: Component patterns with Props extending HTMLAttributes
- UX-1: Mobile-first responsive design
- UX-2: WCAG 2.1 AA accessibility with focus-ring utility
- UX-5: Typography system (Space Grotesk + Inter + JetBrains Mono)
- UX-6: Color system with Google Blue accent
- UX-7: Sticky navigation that hides on scroll
- UX-10: Hero signature animation sequence (NON-NEGOTIABLE)
- UX-12: Left-aligned bold hero layout
- UX-14: Theme toggle with localStorage persistence and FOUC prevention

---

### Epic 2: Project Portfolio Experience

**Goal:** Visitors can explore all featured projects, see technical depth through triple-threat categorization, and access GitHub repositories. Marcus can validate "this person actually codes."

**FRs Covered:** FR10, FR11, FR12, FR13, FR14, FR15 (6 FRs)

**Additional Requirements:**
- ARCH-6: Astro Image component for optimization
- UX-8: Card hover interactions (lift + shadow)
- UX-9: Gradient underline hover pattern
- UX-11: Triple-threat tags (Leadership=blue, Technical=green, Winner=amber, Research=purple)
- UX-13: Card-based modern project cards
- UX-15: External links with ↗ icon

---

### Epic 3: Professional Credentials

**Goal:** Visitors can see full educational background, certifications, and awards - validating the "Columbia + Berkeley + Google" signal.

**FRs Covered:** FR6, FR7, FR21, FR22 (4 FRs)

---

### Epic 4: Publications, Patents & Professional Engagement

**Goal:** Visitors can explore academic publications with expandable abstracts, access the NEW patents section, connect via Google Scholar, and have clear paths to take action (contact, CV download).

**FRs Covered:** FR4, FR9, FR16, FR17, FR18, FR19, FR20, FR27 (8 FRs)

**Additional Requirements:**
- UX-3: Respect prefers-reduced-motion for expand/collapse
- UX-15: External links with ↗ icon

---

### Epic 5: Content Migration & Quality Assurance

**Goal:** All existing content (9 projects, publications, education, etc.) migrated, new patents added, CI/CD pipeline operational, and the site meets all quality targets.

**NFRs Covered:** NFR1-NFR23 (all 23 NFRs)

**Additional Requirements:**
- ARCH-3: GitHub Actions CI/CD with Lighthouse quality gates (≥90)
- ARCH-4: v2 branch deployment strategy for preview
- ARCH-5: SEO with JSON-LD Person schema, sitemap, robots.txt
- ARCH-11: Unit tests with Vitest + AstroContainer
- ARCH-12: E2E tests with Playwright + axe-core
- UX-4: Touch target validation (44×44px minimum)

---

## Epic 1: Professional First Impression

**Goal:** Visitors can land on the home page and immediately understand "who Cris is" - passing the 3-second test. The site works on mobile, supports dark mode, navigation is functional, and the hero section with signature animation creates instant "wow factor."

### Story 1.1: Project Initialization & Tooling

**As a** developer,
**I want** a properly initialized Astro 5.x project with Tailwind CSS v4 and TypeScript strict mode,
**So that** I have a solid foundation with modern tooling for building the portfolio.

**Acceptance Criteria:**

**Given** a fresh project directory
**When** the initialization is complete
**Then** the project has:
- Astro 5.x configured with TypeScript strict mode
- Tailwind CSS v4 with PostCSS configured
- ESLint with recommended rules + Astro plugin
- Prettier with Tailwind plugin for class sorting
- Husky pre-commit hooks running lint and format
- `npm run dev` starts development server successfully
- `npm run build` produces static output in `dist/`

**And** the project structure follows Astro conventions:
```
src/
  components/
  layouts/
  pages/
  content/
  styles/
```

---

### Story 1.2: Content Collection Schemas

**As a** developer,
**I want** Zod-validated content collection schemas for all portfolio content types,
**So that** content is type-safe and validated at build time.

**Acceptance Criteria:**

**Given** the Astro project with content collections configured
**When** schemas are defined
**Then** the following collections exist with typed schemas:

| Collection | Key Fields |
|------------|------------|
| `projects` | title, description, image, skills[], tools[], github?, competition?, featured, category (leadership/technical/winner/research) |
| `publications` | title, authors[], venue, year, abstract, pdf?, code?, scholar? |
| `patents` | title, number, date, abstract, link |
| `education` | institution, degree, field, year, honors? |
| `certifications` | name, issuer, date, expires? |
| `awards` | title, organization, year, description |

**And** TypeScript types are auto-generated from schemas
**And** invalid content fails build with clear error messages
**And** sample content file exists for each collection demonstrating schema

---

### Story 1.3: Design System Foundation

**As a** developer,
**I want** a design system with typography, colors, and spacing tokens configured,
**So that** all components use consistent, documented design values.

**Acceptance Criteria:**

**Given** Tailwind CSS v4 is configured
**When** the design system is implemented
**Then** the following are configured:

**Typography:**
- Space Grotesk font loaded via @fontsource for display/headings
- Inter font loaded via @fontsource for body text
- JetBrains Mono loaded via @fontsource for code
- Responsive type scale matching UX spec (hero 2.5rem→3.5rem, etc.)

**Colors (CSS custom properties):**
```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-accent: #2563eb;
}
.dark {
  --color-bg: #0a0a0a;
  --color-surface: #171717;
  --color-text: #fafafa;
  --color-text-secondary: #9ca3af;
  --color-accent: #3b82f6;
}
```

**And** Tailwind config extends theme with custom tokens
**And** utility class `.focus-ring` provides consistent focus styling (2px accent, 2px offset)

---

### Story 1.4: Theme System with Persistence

**As a** visitor,
**I want** to view the site in light or dark mode based on my preference,
**So that** I have a comfortable viewing experience.

**Acceptance Criteria:**

**Given** I visit the site for the first time
**When** the page loads
**Then** the theme matches my system preference (prefers-color-scheme)
**And** there is no flash of wrong theme (FOUC prevention via inline head script)

**Given** I click the theme toggle
**When** the mode switches
**Then** the transition is smooth (150ms)
**And** my preference is saved to localStorage

**Given** I return to the site later
**When** the page loads
**Then** my saved preference is applied (localStorage overrides system)

**Given** I am using reduced motion preferences
**When** the theme toggles
**Then** there is no transition animation

**Given** localStorage is unavailable (private browsing mode)
**When** the page loads
**Then** the theme falls back to system preference
**And** theme toggle still functions (session-only persistence)
**And** no JavaScript errors are thrown

---

### Story 1.5: Base Layout & SEO Foundation

**As a** visitor,
**I want** every page to have consistent structure and proper metadata,
**So that** the site is accessible, performant, and discoverable.

**Acceptance Criteria:**

**Given** any page on the site
**When** the page renders
**Then** the BaseLayout provides:
- Semantic HTML structure (`<header>`, `<main>`, `<footer>`)
- Skip link as first focusable element ("Skip to content")
- Responsive meta viewport
- Preconnect hints for external resources

**And** SEO metadata includes:
- Unique `<title>` with site name suffix
- Meta description
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL

**And** the layout passes:
- HTML validation (no errors)
- Lighthouse Accessibility audit ≥90

---

### Story 1.6: Navigation Component

**As a** visitor,
**I want** to navigate to any section from any page,
**So that** I can explore the portfolio efficiently.

**Acceptance Criteria:**

**Given** I am on any page
**When** I view the navigation
**Then** I see links to: Home, Projects, About (credentials), Publications
**And** I see social links: GitHub, LinkedIn (with ↗ icon, open in new tab)
**And** I see the theme toggle

**Given** I scroll down the page
**When** scrolling exceeds 50px downward
**Then** the navigation hides with smooth transition

**Given** I scroll up
**When** scrolling direction reverses
**Then** the navigation reveals

**Given** I am on mobile (< 768px)
**When** I view the navigation
**Then** I see a hamburger menu button
**And** clicking it opens a slide-out panel with all nav items
**And** the panel has proper focus trap for accessibility

**Given** I click the site logo/name
**When** the click registers
**Then** I am navigated to the home page

**And** all navigation links have:
- Gradient underline hover effect (150ms ease-out)
- Visible focus indicators
- Keyboard accessibility

---

### Story 1.7: Hero Section with Signature Animation

**As a** visitor (Rachel the recruiter),
**I want** to immediately understand who Cris is within 3 seconds of landing,
**So that** I recognize this is a senior technical leader worth my attention.

**Acceptance Criteria:**

**Given** I land on the home page
**When** the page loads
**Then** I see a left-aligned hero with:
- Name: "Cris Benge" in Space Grotesk 700, large display size
- Role: "Head of Federal Innovation, Google"
- Credentials row: [Columbia MS] [Berkeley MIDS] [TS/SCI] as badges
- CTA buttons: [LinkedIn →] (primary) [GitHub →] (secondary)

**And** the signature animation sequence plays:
1. Name fades in + slides up (0-400ms)
2. Role fades in (200-500ms)
3. Credentials stagger in (400-800ms)
4. CTAs fade in (600-1000ms)

**Given** I have `prefers-reduced-motion: reduce` enabled
**When** the page loads
**Then** all content appears immediately without animation
**And** opacity transitions are allowed (not jarring)

**Given** I am on mobile (375px width)
**When** I view the hero
**Then** the layout remains left-aligned and readable
**And** all text is legible (minimum 16px body)
**And** CTA buttons are full-width and ≥44px touch target

---

### Story 1.8: Footer Component

**As a** visitor,
**I want** to access key links from the bottom of any page,
**So that** I always have a path to connect.

**Acceptance Criteria:**

**Given** I am on any page
**When** I scroll to the footer
**Then** I see:
- Social links: GitHub, LinkedIn (with ↗ icons)
- Copyright notice with current year
- Optional: "Built with Astro" or similar tech credit

**And** links have:
- Gradient underline hover effect
- Visible focus indicators
- External links open in new tab with `rel="noopener noreferrer"`

**And** the footer is visually distinct (surface background color)
**And** spacing is generous (matches Apple-style design)

---

### Story 1.9: Responsive Validation & Polish

**As a** visitor on any device,
**I want** the site to work flawlessly on mobile, tablet, and desktop,
**So that** I have a great experience regardless of how I access it.

**Acceptance Criteria:**

**Given** I access the site on mobile (320px - 639px)
**When** I interact with the home page
**Then** all content is readable and accessible
**And** no horizontal scrolling occurs
**And** touch targets are ≥44×44px
**And** navigation hamburger menu works correctly

**Given** I access the site on tablet (640px - 1023px)
**When** I view the home page
**Then** layout adapts appropriately (may show full nav or hamburger)
**And** spacing increases from mobile

**Given** I access the site on desktop (1024px+)
**When** I view the home page
**Then** content is centered with max-width container (1280px)
**And** generous whitespace surrounds content
**And** hover interactions work (card lifts, underlines)

**And** testing validates:
- Chrome DevTools responsive mode at: 375px, 768px, 1024px, 1440px
- No layout breaks at any width between 320px and 1920px
- Lighthouse Performance ≥90 on mobile simulation

---

## Epic 2: Project Portfolio Experience

**Goal:** Visitors can explore all featured projects, see technical depth through triple-threat categorization, and access GitHub repositories. Marcus can validate "this person actually codes."

### Story 2.1: Project Card Components

**As a** visitor,
**I want** to see project cards that visually communicate each project's type and quality,
**So that** I can quickly identify projects relevant to my interests.

**Acceptance Criteria:**

**Given** a featured project
**When** rendered as a Featured Project Card
**Then** the card displays:
- Project image (16:9 ratio, optimized)
- Title in Space Grotesk 600
- 2-3 line description
- Triple-threat tag(s) with colors:
  - Leadership = blue tint
  - Technical = green tint
  - Winner = amber tint
  - Research = purple tint
- GitHub link indicator (if applicable)

**Given** a secondary project
**When** rendered as a Secondary Project Card
**Then** the card displays:
- Square thumbnail (smaller)
- Title
- Single-line description
- Single tag maximum

**Given** I hover over any project card (desktop)
**When** hover state activates
**Then** the card lifts (`translateY(-4px)`)
**And** shadow deepens (`shadow-sm` → `shadow-lg` for featured, `shadow-md` for secondary)
**And** transition is smooth (200ms ease-out)

**Given** I focus on a card via keyboard
**When** focus is active
**Then** visible focus ring appears (2px accent, 2px offset)

**Given** I tap a card on mobile
**When** tap completes
**Then** card shows brief active state (slight scale down)
**And** navigation to project detail occurs

**Given** a project with a missing or broken image
**When** the card renders
**Then** a placeholder image is displayed
**And** the card layout remains intact
**And** alt text displays the project title

**Given** a project with missing optional fields (github, competition)
**When** the card renders
**Then** those elements are gracefully omitted
**And** no layout shift occurs

---

### Story 2.2: Project Gallery Page

**As a** visitor,
**I want** to browse all featured projects in a visual gallery,
**So that** I can explore the breadth of Cris's work.

**Acceptance Criteria:**

**Given** I navigate to the Projects page
**When** the page loads
**Then** I see a "Featured Projects" section with 3-4 large Featured Project Cards
**And** I see a "More Projects" section with remaining projects as Secondary Cards

**Given** the page displays project images
**When** images render
**Then** images use Astro `<Image />` component with:
- Automatic WebP conversion
- Responsive srcset (multiple sizes)
- Lazy loading for below-fold images
- Proper aspect ratio preservation (no CLS)

**Given** I view the gallery on mobile (< 640px)
**When** the layout renders
**Then** Featured Cards display in single column
**And** Secondary Cards display in single column

**Given** I view the gallery on tablet (640px - 1023px)
**When** the layout renders
**Then** Featured Cards display in 2-column grid
**And** Secondary Cards display in 2-column grid

**Given** I view the gallery on desktop (1024px+)
**When** the layout renders
**Then** Featured Cards display in 2-column grid (large cards)
**And** Secondary Cards display in 3-column grid

**And** scroll-triggered fade-in animations apply to cards as they enter viewport
**And** `prefers-reduced-motion` disables transform animations (opacity still allowed)

**Given** the projects collection is empty
**When** the page loads
**Then** a friendly message displays: "Projects coming soon"
**And** the page layout remains valid
**And** no build errors occur

---

### Story 2.3: Project Detail Page

**As a** visitor (Marcus the peer),
**I want** to view complete details about a specific project,
**So that** I can validate the technical depth and quality of work.

**Acceptance Criteria:**

**Given** I click on a project card
**When** the detail page loads
**Then** I see:
- Project title (H1)
- Hero image (full-width, optimized)
- Full description
- Skills/Techniques section with tag pills (FR12)
- Tools/Technologies section with tag pills (FR13)
- Competition results (if applicable) with placement badge (FR15)

**Given** the project has a GitHub repository
**When** I view the detail page
**Then** I see a prominent GitHub link with:
- Repository name
- ↗ icon indicating external link
- Opens in new tab with `rel="noopener noreferrer"`
- Gradient underline hover effect

**Given** the project won a competition
**When** I view the detail page
**Then** I see a Competition Results section with:
- Competition name
- Placement (e.g., "1st Place", "Top 5%")
- Visual badge/indicator

**Given** I am reading the project narrative
**When** scrolling through content
**Then** typography is optimized for readability:
- Prose max-width (65-70ch)
- Line height 1.7
- Comfortable paragraph spacing

**And** the page includes:
- Breadcrumb navigation ("Projects > Project Name")
- Back to gallery link

**And** all external links:
- Display ↗ icon
- Open in new tab
- Have accessible labels "(opens in new tab)"

**Given** I navigate to a non-existent project slug
**When** the page attempts to load
**Then** a 404 page is displayed with:
- Clear "Project not found" message
- Link back to projects gallery
- Consistent site styling

**Given** a project has a broken GitHub link
**When** I click the GitHub link
**Then** the link opens in new tab (external link behavior)
**And** the broken link is logged for review (build-time validation preferred)

---

## Epic 3: Professional Credentials

**Goal:** Visitors can see full educational background, certifications, and awards - validating the "Columbia + Berkeley + Google" signal.

### Story 3.1: About Page with Education Display

**As a** visitor,
**I want** to view Cris's educational background,
**So that** I can understand the academic credentials behind the professional expertise.

**Acceptance Criteria:**

**Given** I navigate to the About page
**When** the page loads
**Then** I see a page title and brief professional bio

**And** I see an Education section displaying:
- Each degree as a card or list item
- Institution name with logo/icon (Columbia, Berkeley)
- Degree type (M.S., MIDS)
- Field of study
- Graduation year
- Honors/distinctions (if applicable)

**Given** the education data
**When** rendered
**Then** entries are sorted by year (most recent first)
**And** institution names link to institution websites (external, new tab)

**Given** I am on mobile
**When** viewing the Education section
**Then** layout adapts to single column
**And** all content remains readable

**And** the About page includes:
- Navigation breadcrumb
- Semantic heading hierarchy (H1 for page, H2 for sections)
- Proper metadata (title, description, OG tags)

**Given** the education collection is empty
**When** the page loads
**Then** the Education section is hidden or shows placeholder
**And** the page layout remains valid
**And** no build errors occur

---

### Story 3.2: Certifications & Awards Display

**As a** visitor,
**I want** to view Cris's professional certifications and awards,
**So that** I can see validated expertise and recognized achievements.

**Acceptance Criteria:**

**Given** I am on the About page
**When** I scroll to the Certifications section
**Then** I see each certification displaying:
- Certification name
- Issuing organization
- Date obtained
- Expiration date (if applicable)
- Verification link (if available)

**Given** I am on the About page
**When** I scroll to the Awards section
**Then** I see a combined display of:

**Competition Honors (FR21):**
- Competition name (Kaggle, DrivenData, etc.)
- Placement/ranking (e.g., "1st Place", "Top 1%")
- Year
- Visual badge indicating tier (gold/silver/bronze or similar)

**Professional Awards (FR22):**
- Award name
- Granting organization
- Year
- Brief description

**Given** awards data
**When** rendered
**Then** competition honors are visually distinguished from professional awards
**And** entries are sorted by year (most recent first)

**Given** I am on mobile
**When** viewing Certifications and Awards
**Then** layout adapts appropriately
**And** badges/icons remain visible and meaningful

**And** hover states on certification/award cards:
- Subtle lift effect (consistent with project cards)
- Focus indicators for keyboard navigation

**Given** the certifications collection is empty
**When** the page loads
**Then** the Certifications section is hidden or shows placeholder

**Given** the awards collection is empty
**When** the page loads
**Then** the Awards section is hidden or shows placeholder

**And** in all empty states, page layout remains valid and no build errors occur

---

## Epic 4: Publications, Patents & Professional Engagement

**Goal:** Visitors can explore academic publications with expandable abstracts, access the NEW patents section, connect via Google Scholar, and have clear paths to take action (contact, CV download).

### Story 4.1: Publications Section with Expandable Abstracts

**As a** visitor (Marcus the peer),
**I want** to explore academic publications with full details,
**So that** I can validate research rigor and access relevant papers.

**Acceptance Criteria:**

**Given** I navigate to the Publications page/section
**When** the page loads
**Then** I see a list of publications displaying:
- Publication title
- Authors list (with Cris highlighted)
- Venue (conference/journal name)
- Year

**Given** a publication entry
**When** I click "Show Abstract" or expand toggle
**Then** the abstract expands smoothly below the entry
**And** the toggle changes to "Hide Abstract"
**And** `aria-expanded` attribute updates for accessibility

**Given** I have `prefers-reduced-motion: reduce` enabled
**When** I expand/collapse an abstract
**Then** the transition uses opacity only (no height animation)

**Given** a publication has an associated PDF
**When** I view the entry
**Then** I see a PDF link with:
- Document icon
- "PDF" label
- Opens in new tab
- ↗ icon indicating external

**Given** a publication has associated code
**When** I view the entry
**Then** I see a Code/GitHub link with:
- GitHub icon
- Opens in new tab
- ↗ icon indicating external

**Given** the Publications section
**When** rendered
**Then** I see a prominent Google Scholar profile link (FR9):
- Google Scholar icon
- "View all on Google Scholar" label
- Opens in new tab with ↗ icon

**And** publications are sorted by year (most recent first)
**And** all external links use `rel="noopener noreferrer"`

**Given** JavaScript fails to load or execute
**When** I view the publications
**Then** abstracts are visible by default (progressive enhancement)
**And** the page remains fully readable

**Given** a publication has no abstract
**When** the entry renders
**Then** the expand/collapse toggle is hidden
**And** the entry displays normally without abstract section

---

### Story 4.2: Patents Section

**As a** visitor,
**I want** to view Cris's US Patents,
**So that** I can see intellectual property contributions and innovation.

**Acceptance Criteria:**

**Given** I navigate to the Patents section (on Publications page or separate)
**When** the section loads
**Then** I see each patent displaying:
- Patent title
- Patent number (e.g., "US 10,123,456")
- Issue date
- Brief abstract/description

**Given** a patent entry
**When** I view it
**Then** I see a link to the official patent document:
- Links to USPTO or Google Patents
- Opens in new tab
- ↗ icon indicating external
- Gradient underline hover effect

**Given** multiple patents exist
**When** rendered
**Then** patents are sorted by date (most recent first)
**And** each patent has a distinct visual treatment (card or list item)

**Given** I am on mobile
**When** viewing the Patents section
**Then** layout adapts to single column
**And** patent numbers and links remain clearly visible

**And** the section includes:
- Section heading (H2)
- Brief intro text explaining the patents context (optional)
- Consistent styling with Publications section

**Given** the patents collection is empty
**When** the page/section loads
**Then** a message displays: "Patents section coming soon" or section is hidden
**And** no build errors occur

**Given** a patent has no external link
**When** the entry renders
**Then** the patent displays without link
**And** no broken link indicators appear

---

### Story 4.3: Contact & CV Section

**As a** visitor,
**I want** clear paths to contact Cris and access his CV,
**So that** I can take action after being impressed by the portfolio.

**Acceptance Criteria:**

**Given** I want to contact Cris
**When** I look for contact options
**Then** I find a Contact section (footer, dedicated section, or page) with:
- Email link (mailto:) or contact form
- LinkedIn profile link (prominent, primary CTA styling)
- GitHub profile link

**Given** the contact options
**When** rendered
**Then** LinkedIn is positioned as the primary CTA (recruiter journey)
**And** all external links open in new tab with ↗ icon

**Given** I want to download or view the CV
**When** I look for CV access
**Then** I find a CV button/link with:
- "Download CV" or "View CV" label
- Links to PDF file
- Option to view in browser or download

**Given** I click the CV link
**When** the action completes
**Then** the CV opens in a new tab (view) or downloads
**And** the file is optimized for size (reasonable PDF)

**Given** the Contact section
**When** rendered on any page
**Then** the section is visually distinct and easy to find
**And** CTAs have proper hover states (gradient underline or button style)
**And** touch targets are ≥44×44px

**And** the Contact section appears:
- In the footer (always accessible)
- Optionally as a dedicated Contact page
- Optionally within the About page

**Given** the CV PDF file is missing or inaccessible
**When** I click the CV link
**Then** a helpful error page or message is shown
**And** the broken link is detected at build time (preferred) or logged

**Given** external social links (LinkedIn, GitHub) are unreachable
**When** I click them
**Then** they open in new tab (standard external link behavior)
**And** the site does not display errors

---

## Epic 5: Content Migration & Quality Assurance

**Goal:** All existing content (9 projects, publications, education, etc.) migrated, new patents added, CI/CD pipeline operational, and the site meets all quality targets.

### Story 5.1: Content Migration

**As a** site owner,
**I want** all existing portfolio content migrated to the new site,
**So that** no information is lost and the new site is complete.

**Acceptance Criteria:**

**Given** the existing portfolio site (13 HTML files)
**When** content migration is complete
**Then** the following content is migrated to content collections:

**Projects (9 featured):**
- All project titles, descriptions, and images
- Skills and tools lists
- GitHub repository links
- Competition results where applicable
- Categorized with triple-threat tags

**Publications:**
- All publication entries with titles and authors
- Abstracts
- PDF links (verified working)
- Code repository links

**Education:**
- Columbia M.S. details
- Berkeley MIDS details
- Any honors/distinctions

**Certifications:**
- All current certifications
- Issuing organizations and dates

**Awards:**
- Competition honors (Kaggle, DrivenData placements)
- Professional awards

**Patents (NEW):**
- All US Patents with numbers
- Issue dates
- Links to patent documents

**Given** migrated content
**When** the build runs
**Then** all content passes Zod schema validation
**And** no build errors related to content

**Given** the migrated site
**When** compared to the original
**Then** no content is missing or incorrect
**And** all links are updated and working

---

### Story 5.2: CI/CD Pipeline with Quality Gates

**As a** developer,
**I want** automated deployment with quality gates,
**So that** only high-quality code reaches production.

**Acceptance Criteria:**

**Given** a push to the `v2` branch
**When** GitHub Actions workflow triggers
**Then** the pipeline executes:
1. Install dependencies
2. Run linting (ESLint)
3. Run formatting check (Prettier)
4. Run unit tests (Vitest)
5. Build the site (Astro build)
6. Run Lighthouse CI audit

**Given** Lighthouse CI runs
**When** scores are evaluated
**Then** the build fails if any score is below 90:
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

**Given** all checks pass on `v2` branch
**When** deployment triggers
**Then** the site deploys to GitHub Pages preview URL

**Given** the v2 preview is approved
**When** merged to `main`/`master`
**Then** the site deploys to production (cbenge509.github.io)

**And** the workflow includes:
- Caching for node_modules (faster builds)
- Artifact upload for Lighthouse reports
- Clear error messages on failure
- Build time under 5 minutes

---

### Story 5.3: SEO & Metadata Implementation

**As a** site owner,
**I want** comprehensive SEO optimization,
**So that** the site ranks well and shares correctly on social media.

**Acceptance Criteria:**

**Given** the site is deployed
**When** search engines crawl the site
**Then** they find:
- XML sitemap at `/sitemap.xml` listing all pages
- robots.txt at `/robots.txt` allowing crawling
- Canonical URLs on all pages

**Given** the home page
**When** viewed by search engines
**Then** JSON-LD Person schema is present with:
- Name: Cris Benge
- Job title
- Organization (Google)
- Social links (LinkedIn, GitHub)
- Education credentials

**Given** any page on the site
**When** the page loads
**Then** it has:
- Unique, descriptive `<title>` tag (NFR17)
- Meta description (NFR18)
- Open Graph tags: og:title, og:description, og:image, og:url (NFR19)
- Twitter card meta tags

**Given** I share a page URL on LinkedIn/Twitter
**When** the preview generates
**Then** a proper card appears with:
- Site title and description
- Preview image (og:image)
- Correct URL

**And** Lighthouse SEO score ≥ 90 (NFR21)

---

### Story 5.4: Automated Testing Suite

**As a** developer,
**I want** comprehensive automated tests,
**So that** regressions are caught before deployment.

**Acceptance Criteria:**

**Given** the test suite
**When** I run `npm run test`
**Then** unit tests execute using Vitest:
- Component rendering tests (AstroContainer)
- Utility function tests
- Content schema validation tests
- Tests co-located with components (`*.test.ts`)

**Given** the E2E test suite
**When** I run `npm run test:e2e`
**Then** Playwright tests execute:
- Navigation flows (all pages accessible)
- Theme toggle functionality
- Mobile menu functionality
- External link behavior

**Given** the E2E test suite
**When** accessibility tests run
**Then** axe-core validates:
- No critical accessibility violations (NFR12-16)
- Color contrast passes (NFR13)
- All images have alt text (NFR12)
- Heading hierarchy is correct (NFR15)
- Focus indicators are visible (NFR16)
- Keyboard navigation works (NFR14)

**And** test coverage reports are generated
**And** tests run in CI pipeline
**And** failing tests block deployment

---

### Story 5.5: Performance & Cross-Browser Validation

**As a** visitor,
**I want** the site to load fast and work in all modern browsers,
**So that** I have a great experience regardless of my setup.

**Acceptance Criteria:**

**Given** the deployed site
**When** measured by Lighthouse
**Then** performance metrics meet targets:
- First Contentful Paint < 1.5s (NFR2)
- Largest Contentful Paint < 2.0s (NFR3)
- Cumulative Layout Shift < 0.1 (NFR4)
- Total page weight < 1MB per page (NFR5)
- Overall Performance score ≥ 90 (NFR6)

**Given** the deployed site
**When** tested on 4G connection simulation
**Then** pages load in under 2 seconds (NFR1)

**Given** the deployed site
**When** tested in supported browsers
**Then** the site functions correctly in:
- Chrome (latest 2 versions) (NFR7)
- Firefox (latest 2 versions) (NFR8)
- Safari (latest 2 versions) (NFR9)
- Edge (latest 2 versions) (NFR10)

**Given** any viewport width from 320px to 1920px
**When** viewing the site
**Then** no horizontal scrolling occurs (NFR11)

**Given** touch devices
**When** interacting with the site
**Then** all touch targets are ≥ 44×44px (UX-4)

**Given** the deployed site
**When** security is evaluated
**Then**:
- Site is served over HTTPS (NFR22)
- External resources use SRI hashes where applicable (NFR23)

**And** validation checklist completed:
- [ ] All browsers tested manually
- [ ] Performance audit passed
- [ ] Mobile usability verified
- [ ] Accessibility audit passed

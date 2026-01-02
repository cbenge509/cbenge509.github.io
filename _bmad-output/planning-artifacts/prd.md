---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
skippedSteps:
  - step: 5
    name: 'Domain-Specific Exploration'
    reason: 'Portfolio website is in General (Personal Branding) domain with no regulatory/compliance requirements'
  - step: 6
    name: 'Innovation Discovery'
    reason: 'Project is excellent execution of proven concepts (SSG, templating, responsive design) rather than breakthrough innovation'
inputDocuments:
  - docs/index.md
  - docs/architecture.md
  - docs/tech-stack.md
  - docs/development.md
  - docs/content-guide.md
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 5
workflowType: 'prd'
lastStep: 11
workflowComplete: true
completedDate: '2026-01-01'
---

# Product Requirements Document - cbenge509.github.io

**Author:** Cris
**Date:** 2026-01-01

## Executive Summary

This project is a comprehensive modernization of Cris Benge's professional portfolio website (cbenge509.github.io). The current site, while functional, was designed several years ago and no longer reflects the caliber of a senior AI researcher and solution architect with credentials from Columbia and UC Berkeley, multiple competition wins, and US patents.

**The Vision:** Transform the portfolio from a static information repository into an engaging, modern experience that actively sells visitors on Cris's professional excellence. The site should communicate competence and attention to detail through its very design - before visitors even read the content.

### Target Audience

| Persona | Behavior | Needs |
|---------|----------|-------|
| **Primary: Recruiters/Hiring Managers** | Quick scan (30-60 seconds), looking for credibility signals | Fast access to highlights, clear professional positioning, easy contact/next steps |
| **Secondary: Peers/Collaborators** | Deeper exploration (5-10 minutes), evaluating technical depth | Project details, publications, patents, evidence of expertise |

### Core Objectives

| Phase | Objective | Rationale |
|-------|-----------|-----------|
| **Phase 1: Technical Foundation** | Modular architecture with templating/SSG, eliminating code duplication | Unblocks rapid design iteration; current state requires ~45 min to add a project |
| **Phase 2: Design Exploration** | Create 2-3 design concepts, gather feedback before implementation | Validate "modern and professional" with real users, not assumptions |
| **Phase 3: Implementation** | New content (Patents, Google Scholar), UI/UX overhaul, dark mode | Build on stable foundation with validated design direction |

### New Content & Features

- **US Patents section** with links to patent documents
- **Google Scholar integration** linking to existing profile
- **Browser dark mode auto-detection** (trivial technically via `prefers-color-scheme`; real work is design system support)
- **Complete UI/UX redesign** - clean, professional, engaging experience

### Technology Candidates (to evaluate)

| SSG | Pros | Cons |
|-----|------|------|
| **Jekyll** | Native GitHub Pages support, no build config needed | Ruby ecosystem, slower builds |
| **Hugo** | Extremely fast, single binary | Go templating learning curve |
| **Eleventy** | JS-based, highly flexible, simple | Requires GitHub Actions for deploy |
| **Astro** | Modern, component-based, excellent DX | Newer ecosystem, requires GitHub Actions |

### Migration Approach

**Incremental, not big-bang:**
1. Set up SSG with templating (reproduce current site structure)
2. Validate build/deploy pipeline works with GitHub Pages
3. Iterate on design with rapid feedback cycles
4. Add new content sections once foundation is stable

**Constraint:** Must remain fully compatible with GitHub Pages static hosting.

### What Makes This Special

The current site receives feedback like "good, but I didn't spend much time there" - visitors get bored or find it off-putting. This modernization addresses that directly by creating a portfolio that:

1. **Sells through design** - The site itself demonstrates the caliber of professional Cris is
2. **Serves distinct user journeys** - Recruiters get quick credibility; peers get depth
3. **Engages without overwhelming** - Information is easy to find without clutter or density
4. **Guides to action** - Visitors know exactly how to take the next step (contact, LinkedIn, CV)
5. **Enables rapid evolution** - Adding new projects or updating content becomes trivial

The measure of success: visitors stay, explore, take action, and leave impressed - not just informed.

## Project Classification

| Attribute | Value |
|-----------|-------|
| **Technical Type** | Web Application (Static Portfolio) |
| **Domain** | General (Personal Branding) |
| **Complexity** | Medium |
| **Project Context** | Brownfield - modernizing existing system |
| **Migration Strategy** | Incremental |

## Success Criteria

### User Success

**Primary Goal:** Visitors find what they need quickly AND experience a "wow factor" that signals the caliber of the person behind the site.

| Criteria | Description | Measurement |
|----------|-------------|-------------|
| **Quick Discovery** | Visitors find relevant information without friction or digging | <3 clicks to any major content section |
| **Wow Factor** | Site design itself communicates "high-caliber professional" | Qualitative feedback: "impressive" |
| **Lasting Impression** | Visitors leave thinking "this person must be impressive too" | Unprompted positive comments |
| **Emotional Journey** | Impressed first, then confident in capabilities | User feedback themes |

**Success Moment (Recruiter):** "This person has the credentials I need AND clearly pays attention to quality - I should reach out even for future roles."

**Success Moment (Peer):** "This person is meticulous and high-caliber - I want to collaborate with them."

### Business Success

**Context:** Portfolio owner currently at Google, targeting top-tier AI companies (Meta, Anthropic, OpenAI, xAI, Netflix).

| Timeframe | Success Indicator |
|-----------|-------------------|
| **3 Months** | Increased traffic (especially repeat visits), uptick in recruiter outreach, increased LinkedIn cross-traffic |
| **12 Months** | Consistent positive feedback, continued quality outreach, sustained engagement |

**Key ROI Indicators:**
- Higher-tier role outreach (Senior Director level vs Senior Developer)
- Outreach from target companies (Meta, Anthropic, OpenAI, xAI, Netflix)
- Recruiters mentioning the site positively during outreach

**Ultimate Validation:** Colleagues ask "how did you build this?" and want to share it.

### Technical Success

| Criteria | Target | Current State |
|----------|--------|---------------|
| **Add New Project** | <30 minutes | ~45 minutes |
| **Code Duplication** | Zero (templated) | High (13 files with repeated code) |
| **Page Load Time** | <2 seconds | TBD (measure baseline) |
| **Uptime/Reliability** | GitHub Pages managed | GitHub Pages managed |
| **Developer Experience** | Easy for competent developer | Tedious, error-prone |

**Tech Stack Flexibility:** No strong preference for modern vs stable - whichever best meets the requirements.

**Anti-goals:** None specified - open to any approach that works.

### Measurable Outcomes

| Metric | Baseline | Target | Validation Method |
|--------|----------|--------|-------------------|
| Time on site | TBD | 2x current | Google Analytics |
| Bounce rate | TBD | -30% | Google Analytics |
| Repeat visitors | TBD | Increase | Google Analytics |
| Project add time | 45 min | <30 min | Developer experience |
| Code duplication | 13 files | 0 (templated) | Code review |
| Page load | TBD | <2 sec | Lighthouse |
| Qualitative feedback | "Good but didn't stay" | "Impressive, explored" | User interviews (3-5) |

## Product Scope

### MVP - Minimum Viable Product

**Must ship for v1.0:**

- [ ] SSG/templating setup (eliminate code duplication)
- [ ] Migrate all existing content:
  - Projects (9 featured)
  - Education
  - Skills & Certifications
  - Honors & Awards
  - Publications
- [ ] New Patents section with links
- [ ] Google Scholar link integration
- [ ] Dark mode auto-detection (`prefers-color-scheme`)
- [ ] One validated design direction (modern, professional, impressive)
- [ ] Mobile responsive design
- [ ] GitHub Pages deployment via GitHub Actions
- [ ] Page load <2 seconds

### Growth Features (Post-MVP)

**v1.1 enhancements:**

- [ ] Design polish and micro-interactions
- [ ] Analytics integration (establish baseline metrics)
- [ ] Performance optimization (lazy loading, WebP images)
- [ ] SEO improvements (meta tags, structured data)
- [ ] Accessibility audit and improvements

### Vision (Future)

**Potential future additions:**

- [ ] Blog/writing section for thought leadership
- [ ] Interactive project demos or live previews
- [ ] Automated content updates from GitHub API
- [ ] Speaking engagements / conference talks section

## User Journeys

### Journey 1: Rachel Chen - The Recruiter Who Stopped Scrolling

Rachel is a Senior Technical Recruiter at Anthropic, deep in a search for a Senior Director of Applied ML. It's 4:47 PM on a Thursday, and she's been reviewing candidate profiles for two hours straight. LinkedIn profiles blur together - the same corporate headshots, the same buzzword-laden summaries, the same "Results-driven leader" headlines.

Her hiring manager pings her: "Check out this guy - Cris Benge. His LinkedIn looked interesting but he has a portfolio site." Rachel clicks the link, expecting another WordPress template or academic page from 2015.

She stops scrolling.

The site loads instantly, and within three seconds Rachel's posture changes. This isn't a resume with a domain name - this is *crafted*. The design is clean, modern, confident. Before she reads a single word, she thinks: "Whoever made this pays attention to details."

Her eyes find the essentials immediately: **Head of Federal Innovation at Google**. Columbia MS in Computer Science. UC Berkeley MIDS. Her eyebrows raise slightly at **Top Secret/SCI with Polygraph** - that's rare and valuable. The project grid catches her attention - actual ML work, competition wins, published research. This isn't just a manager who used to code; this is a technical leader who still ships.

She clicks into a project page. The documentation is thorough but not overwhelming. The GitHub links work. The writing is clear.

Rachel checks the time - 4:52 PM. She has a call in 8 minutes. Normally she'd close the tab and add the candidate to her "maybe" pile. Instead, she bookmarks the site and opens LinkedIn to draft a message. As she types, she thinks: "I'm going to send this site to Marcus on the hiring committee. He needs to see what a candidate portfolio *should* look like."

She hits send on her LinkedIn message before her next call.

**Key Moments:**
- First 3 seconds: Design quality signals "this person pays attention"
- Quick discovery: Current role, credentials, clearance level visible immediately
- Depth available: Project details, GitHub links, publications accessible
- Action taken: LinkedIn message sent, site bookmarked to share

---

### Journey 2: Dr. Marcus Webb - The Skeptical Peer

Marcus is a Principal Research Scientist at OpenAI, three years into a career of fielding collaboration requests from people who read one blog post about transformers. He's protective of his time and slightly cynical about LinkedIn-polished profiles.

But today is different. His colleague Sarah, whose judgment he trusts, sent him a link with a simple message: "You should look at Cris Benge's BERT compression work. Might be relevant to that efficiency project you mentioned."

Marcus clicks the link between meetings, already preparing to skim and close. The site loads - clean, professional. He notes the design quality but doesn't dwell on it. He's here for substance.

His eyes scan for the signals that matter: **Publications**. He sees conference papers - actual peer-reviewed work, not Medium posts. He clicks into the BERTVision project. The summary is concise, technically precise, doesn't over-explain or hand-wave. There's a GitHub link. He opens it in a new tab.

The repository is well-organized. Real commits. Actual code, not just a README with promises. He skims the architecture - this person understands the domain.

Back on the portfolio, he notices the competition results. Kaggle placements. DrivenData wins - first place finishes. These aren't participation trophies; these are results that require actual implementation skill.

He clicks on a publication PDF. Skims the abstract, methodology section. The writing is rigorous. The approach is sound. This isn't someone who manages ML teams from a distance - this is someone who still thinks deeply about the work.

Marcus checks the time. He's spent 12 minutes - longer than he intended. He has what he needs. He navigates to the contact section, finds the email, and drafts a message:

"Hi Cris - I came across your BERTVision work via a colleague's recommendation. I'm exploring some related ideas around efficient architectures and wondering if you'd have 30 minutes to discuss potential collaboration..."

He hits send, adds the site to his bookmarks, and heads to his meeting thinking about transformer compression.

**Key Moments:**
- Substance over style: Design noted but depth is what matters
- Technical validation: Publications, GitHub repos, competition results
- Deep dive: Reads paper, checks code quality, evaluates rigor
- Action taken: Collaboration email sent

---

### Journey 3: Cris Benge - The Sunday Night Update

**Current State (The Pain):**

It's 9:47 PM on a Sunday. Cris just finished documenting a new ML project he's proud of - a novel approach to few-shot learning that he built over several weekends. He wants to add it to his portfolio while the details are fresh.

He opens VS Code and sighs. He knows what's coming.

First, he navigates to an existing project folder and copies the entire `index.html` file. He creates a new folder, pastes it in, and starts the tedious find-and-replace dance. Title. Description. Image paths. GitHub links. He has to remember which CSS classes control which layouts. He updates the skills section, the tools section, the collaborators.

Then he opens the main projects page. He copies an existing project card, pastes it, updates six different fields. He double-checks the image path - was it `/assets/img/` or `assets/img/`? He's been burned by that before.

He commits, pushes, and waits. And waits. Ten minutes later, he refreshes the live site. The image is broken. He fixes the path, commits again, waits another ten minutes. Now the card layout is slightly off on mobile. He can't test that locally. Another commit. Another wait.

By 11:15 PM, the project is finally live. What should have been a 15-minute task consumed 90 minutes of his Sunday night.

**Future State (The Dream):**

It's 9:47 PM on a Sunday. Cris just finished documenting a new ML project. He wants to add it to his portfolio.

He opens his terminal and runs `npm run dev`. The local server spins up in seconds - an exact replica of the production site.

He creates a new markdown file in the `/projects` folder using the project template:

```yaml
---
title: "Few-Shot Learning Framework"
description: "Novel approach to few-shot classification"
image: "few-shot-hero.png"
github: "https://github.com/cbenge509/few-shot-framework"
skills: ["PyTorch", "Meta-Learning", "Transfer Learning"]
tools: ["Python", "Weights & Biases", "Docker"]
collaborators: ["Dr. Sarah Chen", "Marcus Webb"]
featured: true
date: 2026-01-15
---

## The Story

This project started when I noticed a gap in how existing few-shot methods handled...
```

He drops the hero image into `/assets/img/projects/`. The local site hot-reloads. He checks desktop view, mobile view, dark mode, light mode - all in seconds. Everything looks right.

He commits and pushes. The GitHub Action builds and deploys in under a minute.

By 10:05 PM, he's done and back on the couch. Eighteen minutes total, including writing the project narrative.

**Key Moments:**
- Pain eliminated: No code copying, no multi-file updates
- Template-driven: Consistent structure, clear where content goes
- Local testing: Instant feedback before deploying
- Fast deployment: Minutes, not hours

---

### Journey Requirements Summary

These journeys reveal the following capability requirements:

| Journey | Required Capabilities |
|---------|----------------------|
| **Recruiter (Rachel)** | Instant visual impact, quick-scan information hierarchy, prominent credentials display, clear contact/CTA, mobile-responsive, fast load times |
| **Peer (Marcus)** | Deep-dive project pages, publication/patent listings, GitHub integration, technical rigor visible, Google Scholar link, downloadable papers |
| **Maintainer (Cris)** | SSG templating, markdown-based content, local dev server, hot reload, clear asset organization, single-source project data, fast CI/CD pipeline |

**Cross-Cutting Requirements:**
- Professional, polished design that signals quality before content is read
- Dark/light mode support with system preference detection
- Sub-2-second page loads
- Mobile-first responsive design
- Clear information architecture (credentials, projects, publications, patents, contact)

## Web Application Specific Requirements

### Project-Type Overview

This is a **Multi-Page Application (MPA)** built with a static site generator, deploying individual HTML files for each route. This architecture is optimal for:
- GitHub Pages hosting (no server-side rendering needed)
- SEO (each page is independently crawlable)
- Performance (pre-rendered HTML, no JavaScript required for initial render)
- Simplicity (no client-side routing complexity)

### Browser Support Matrix

| Browser | Minimum Version | Priority |
|---------|-----------------|----------|
| Chrome | Latest 2 versions | Primary |
| Edge | Latest 2 versions | Primary |
| Firefox | Latest 2 versions | Primary |
| Safari | Latest 2 versions | Primary |

**Notes:**
- No legacy browser support required (IE11, older Edge)
- Modern CSS features (Grid, Flexbox, CSS Variables) can be used freely
- Modern JavaScript (ES6+) acceptable without transpilation concerns

### Responsive Design Requirements

| Breakpoint | Target Devices | Priority |
|------------|----------------|----------|
| Mobile | 320px - 767px | High (recruiters on phones) |
| Tablet | 768px - 1023px | Medium |
| Desktop | 1024px+ | High (primary viewing context) |

**Approach:**
- Mobile-first CSS methodology
- Flexible grid layouts that adapt across breakpoints
- Touch-friendly tap targets on mobile (minimum 44px)
- No horizontal scrolling at any breakpoint

### Performance Targets

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.0s | Lighthouse |
| Time to Interactive (TTI) | < 2.0s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Total Page Weight | < 1MB | DevTools |
| Lighthouse Performance Score | > 90 | Lighthouse |

**Optimization Strategies:**
- Optimized images (WebP format, lazy loading)
- Minimal JavaScript (no heavy frameworks)
- CDN-delivered assets (fonts, icons)
- Preconnect to external origins
- Efficient caching headers via GitHub Pages

### SEO Strategy

**Primary Goal:** Appear in search results for "Cris Benge" queries

| SEO Element | Implementation |
|-------------|----------------|
| Title Tags | Unique, descriptive per page (e.g., "Cris Benge - AI Researcher & Solution Architect") |
| Meta Descriptions | Compelling summaries for each page |
| Open Graph Tags | Rich previews for LinkedIn/Twitter sharing |
| Canonical URLs | Prevent duplicate content issues |
| Sitemap | XML sitemap for search engine discovery |
| Robots.txt | Allow full crawling |
| Structured Data | Person schema for enhanced search results |

**Secondary Considerations:**
- Clean URL structure (`/projects/bertvision/` not `/projects/bertvision/index.html`)
- Fast page loads (ranking factor)
- Mobile-friendly (ranking factor)
- HTTPS (provided by GitHub Pages)

### Accessibility Approach

**Compliance Level:** Best practices (no strict compliance requirement)

| Practice | Implementation |
|----------|----------------|
| Semantic HTML | Proper heading hierarchy, landmarks, lists |
| Alt Text | Descriptive alt text for all images |
| Color Contrast | Sufficient contrast for readability |
| Keyboard Navigation | All interactive elements keyboard accessible |
| Focus Indicators | Visible focus states for keyboard users |
| Skip Links | Skip-to-content link for screen readers |

**Note:** While strict WCAG compliance is not required, following accessibility best practices improves usability for all visitors and is low-effort with modern frameworks.

### Implementation Considerations

**Static Site Generator Requirements:**
- Local development server with hot reload
- Markdown-based content authoring
- Template/component system for consistent layouts
- Asset pipeline for image optimization
- Build output compatible with GitHub Pages

**Deployment Pipeline:**
- GitHub Actions for automated builds
- Deploy to GitHub Pages on push to main/master
- Build validation before deploy
- Fast build times (< 60 seconds ideal)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP
**Focus:** Deliver the "wow factor" that makes visitors stay, explore, and take action. Prioritize visual impact and content presentation over developer tooling.

**Rationale:** The core problem isn't maintenance efficiency - it's that visitors find the current site unengaging and leave quickly. An impressive experience must come first; streamlined content management can follow once the destination is worth visiting.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- ✅ Rachel (Recruiter): First-impression impact, quick credential discovery, clear call-to-action
- ✅ Marcus (Peer): Deep project pages, publications, GitHub integration, technical rigor

**Must-Have Capabilities:**

| Feature | Purpose | Success Metric |
|---------|---------|----------------|
| Modern visual design | Instant "wow factor" | Qualitative feedback: "impressive" |
| Clear information hierarchy | Credentials visible in 3 seconds | <3 clicks to any major section |
| Professional project pages | Deep-dive content for peers | GitHub links work, content is thorough |
| Dark mode auto-detection | Modern UX expectation | `prefers-color-scheme` support |
| Mobile responsive design | Recruiters on phones | No horizontal scroll, touch-friendly |
| Fast page loads | Don't lose impatient visitors | <2 second load time |
| Patents section | Showcase IP credentials | Links to patent documents |
| Google Scholar link | Academic credibility | Working link to profile |

**Explicitly Deferred from MVP:**
- SSG/templating infrastructure
- Markdown-based content authoring
- Automated deployment pipeline
- Analytics integration

### Post-MVP Features

**Phase 2 - Maintainer Experience:**

| Feature | Purpose | Success Metric |
|---------|---------|----------------|
| SSG migration | Eliminate code duplication | Zero repeated HTML |
| Templating system | Consistent layouts | Single-source components |
| Markdown content | Easy authoring | No HTML editing for content |
| Local dev server | Fast iteration | Hot reload preview |
| GitHub Actions CI/CD | Automated deployment | Push-to-deploy in <60 sec |

**Phase 2 Success:** Adding a new project takes <30 minutes (down from 45+ minutes currently).

**Phase 3 - Polish & Growth:**

| Feature | Purpose |
|---------|---------|
| Analytics integration | Establish baseline metrics, track engagement |
| Performance optimization | WebP images, lazy loading, further speed gains |
| SEO improvements | Structured data, enhanced meta tags, sitemap |
| Accessibility audit | WCAG best practices verification |
| Blog/writing section | Thought leadership content (potential) |

### Risk Mitigation Strategy

| Risk Type | Risk | Mitigation |
|-----------|------|------------|
| **Design Risk** | "Modern and professional" is subjective | Create 2-3 design concepts, gather feedback from 3-5 people before full implementation |
| **Technical Risk** | Manual HTML updates during MVP may slow progress | Keep MVP scope tight; accept short-term pain for validated design direction |
| **Market Risk** | New design may not improve engagement | Establish baseline metrics before launch; conduct lightweight user feedback |

## Functional Requirements

### Site Navigation & Information Architecture

- **FR1:** Visitors can navigate to any major section (About, Projects, Education, Skills, Awards) from any page
- **FR2:** Visitors can return to the home page from any location on the site
- **FR3:** Visitors can access social links (GitHub, LinkedIn) from any page
- **FR4:** Visitors can download or view the CV/resume

### Professional Profile Display

- **FR5:** Visitors can view the professional summary and current role on the home page
- **FR6:** Visitors can see academic credentials (degrees, institutions, honors)
- **FR7:** Visitors can view professional certifications and their issuing organizations
- **FR8:** Visitors can see security clearance level (Top Secret/SCI)
- **FR9:** Visitors can access the Google Scholar profile via external link

### Project Portfolio

- **FR10:** Visitors can browse all featured projects in a visual gallery format
- **FR11:** Visitors can view detailed information for each individual project
- **FR12:** Visitors can see project skills/techniques used for each project
- **FR13:** Visitors can see tools/technologies used for each project
- **FR14:** Visitors can access the GitHub repository for each project (where applicable)
- **FR15:** Visitors can see competition results/achievements for relevant projects

### Publications & Patents

- **FR16:** Visitors can view a list of publications with titles and authors
- **FR17:** Visitors can expand/collapse publication abstracts
- **FR18:** Visitors can access PDF versions of publications
- **FR19:** Visitors can view US Patents with links to patent documents
- **FR20:** Visitors can access code repositories associated with publications

### Awards & Recognition

- **FR21:** Visitors can view competition honors (Kaggle, DrivenData placements)
- **FR22:** Visitors can view professional awards and recognitions

### Theme & Display Preferences

- **FR23:** Visitors can view the site in light or dark mode
- **FR24:** The site can detect and apply the visitor's system theme preference automatically
- **FR25:** Visitors can manually toggle between light and dark modes
- **FR26:** The site can remember the visitor's theme preference across sessions

### Contact & Call-to-Action

- **FR27:** Visitors can contact the portfolio owner via available channels
- **FR28:** Visitors can connect via LinkedIn
- **FR29:** Visitors can view the portfolio owner's GitHub profile

### Responsive Experience

- **FR30:** Visitors can access all site functionality on mobile devices
- **FR31:** Visitors can access all site functionality on tablet devices
- **FR32:** Visitors can access all site functionality on desktop devices

## Non-Functional Requirements

### Performance

| NFR | Requirement | Measurement |
|-----|-------------|-------------|
| **NFR1** | Pages load in under 2 seconds on 4G connections | Lighthouse performance score, field data |
| **NFR2** | First Contentful Paint (FCP) under 1.5 seconds | Lighthouse audit |
| **NFR3** | Largest Contentful Paint (LCP) under 2.0 seconds | Lighthouse audit |
| **NFR4** | Cumulative Layout Shift (CLS) under 0.1 | Lighthouse audit |
| **NFR5** | Total page weight under 1MB per page | Browser DevTools |
| **NFR6** | Lighthouse Performance score above 90 | Lighthouse audit |

### Browser Compatibility

| NFR | Requirement | Measurement |
|-----|-------------|-------------|
| **NFR7** | Site functions correctly in Chrome (latest 2 versions) | Manual testing |
| **NFR8** | Site functions correctly in Firefox (latest 2 versions) | Manual testing |
| **NFR9** | Site functions correctly in Safari (latest 2 versions) | Manual testing |
| **NFR10** | Site functions correctly in Edge (latest 2 versions) | Manual testing |
| **NFR11** | No horizontal scrolling at any viewport width 320px+ | Manual testing |

### Accessibility

| NFR | Requirement | Measurement |
|-----|-------------|-------------|
| **NFR12** | All images have descriptive alt text | Automated audit |
| **NFR13** | Color contrast meets WCAG AA standards (4.5:1 for text) | Lighthouse accessibility audit |
| **NFR14** | All interactive elements are keyboard accessible | Manual testing |
| **NFR15** | Heading hierarchy is semantic (h1 → h2 → h3) | Automated audit |
| **NFR16** | Focus indicators are visible for keyboard navigation | Manual testing |

### SEO & Discoverability

| NFR | Requirement | Measurement |
|-----|-------------|-------------|
| **NFR17** | Each page has a unique, descriptive title tag | Automated audit |
| **NFR18** | Each page has a meta description | Automated audit |
| **NFR19** | Open Graph tags present for social sharing | Automated audit |
| **NFR20** | Site appears in top 3 results for "Cris Benge" search | Google search verification |
| **NFR21** | Lighthouse SEO score above 90 | Lighthouse audit |

### Security (Minimal - Static Site)

| NFR | Requirement | Measurement |
|-----|-------------|-------------|
| **NFR22** | Site served over HTTPS | Browser verification |
| **NFR23** | External resources loaded with SRI hashes | Code review |

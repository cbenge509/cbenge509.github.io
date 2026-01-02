# Architecture Overview

## Project Summary

**Project:** Cris Benge Portfolio Website
**Type:** Static Web Application (Portfolio/Personal Website)
**Repository:** cbenge509.github.io
**Hosting:** GitHub Pages
**Status:** Production

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Pages                              │
│                    (Static File Hosting)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────────┐     ┌──────────────────┐                │
│   │   HTML Pages     │     │  Static Assets   │                │
│   │                  │     │                  │                │
│   │  - index.html    │     │  /assets/css/    │                │
│   │  - projects/     │     │  /assets/js/     │                │
│   │  - education/    │     │  /assets/img/    │                │
│   │  - skills/       │     │  /assets/pdf/    │                │
│   │  - honors_awards/│     │                  │                │
│   └──────────────────┘     └──────────────────┘                │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                      External CDN Resources                      │
│   Bootstrap 4.5.2 | MDBootstrap 4.19.1 | jQuery 3.5.1           │
│   Font Awesome 5.14 | Academicons 1.9 | Google Fonts            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │  User Browser   │
                     │                 │
                     │ - Renders HTML  │
                     │ - Executes JS   │
                     │ - localStorage  │
                     └─────────────────┘
```

### Component Architecture

| Component | Technology | Purpose |
|-----------|------------|---------|
| Layout System | Bootstrap 4 Grid | Responsive page structure |
| Navigation | Bootstrap Navbar | Fixed-top navigation with mobile toggle |
| Theme System | Custom JS + CSS | Dark/light mode with localStorage persistence |
| Content Cards | Bootstrap Cards | Project portfolio display |
| Icons | Font Awesome + Academicons | Social links and decorations |
| Analytics | Google Analytics | Visitor tracking (UA-162315295-1) |

---

## Page Structure

### Navigation Flow

```
                    ┌──────────────┐
                    │    About     │ (index.html)
                    │   (Home)     │
                    └──────┬───────┘
                           │
    ┌──────────┬───────────┼───────────┬──────────┐
    ▼          ▼           ▼           ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Portfolio│ │ Awards │ │ Skills │ │Academics│ │ Theme  │
│   (9)   │ │        │ │        │ │        │ │ Toggle │
└────┬────┘ └────────┘ └────────┘ └────────┘ └────────┘
     │
     ├── BERTVision (external)
     ├── Facial Keypoints
     ├── Social Media Intelligence (external)
     ├── ArXiV Analysis
     ├── Crime Statistics
     ├── World Bank Classification
     ├── Data Science Bowl
     ├── Future Sales Prediction
     └── College Outcomes
```

---

## Key Design Decisions

### 1. Static Site Architecture
- **Decision:** Pure HTML/CSS/JS without a build process
- **Rationale:** Simple, fast, zero server dependencies
- **Trade-offs:** Manual content updates, no templating

### 2. CDN-Based Dependencies
- **Decision:** All frameworks loaded from CDNs (StackPath, cdnjs)
- **Rationale:** Faster initial load, browser caching benefits
- **Trade-offs:** External dependency on CDN availability

### 3. localStorage Theme Persistence
- **Decision:** Theme preference stored in browser localStorage
- **Rationale:** Persists across sessions, no server needed
- **Implementation:** `theme.js` initializes, `dark_mode.js` toggles

### 4. Responsive Design Pattern
- **Decision:** Bootstrap 4 grid with fixed-top navbar
- **Rationale:** Proven responsive pattern, mobile-first
- **Breakpoint:** `navbar-expand-sm` (collapses on mobile)

---

## File Dependencies

```
index.html
├── External CDN
│   ├── bootstrap.min.css (4.5.2)
│   ├── mdb.min.css (4.19.1)
│   ├── font-awesome/all.min.css (5.14.0)
│   ├── academicons.min.css (1.9.0)
│   ├── google fonts (Roboto)
│   ├── jquery.min.js (3.5.1)
│   ├── popper.min.js (2.4.4)
│   ├── bootstrap.min.js (4.5.2)
│   └── mdb.min.js (4.19.1)
├── Local Assets
│   ├── /assets/css/main.css
│   ├── /assets/js/theme.js (in <head>)
│   ├── /assets/js/common.js (before </body>)
│   └── /assets/js/dark_mode.js (before </body>)
└── Google Analytics (gtag.js)
```

---

## Security Considerations

| Area | Implementation | Notes |
|------|---------------|-------|
| HTTPS | GitHub Pages SSL | Automatic certificate |
| SRI | Used for CDN resources | Integrity hashes on all CDN links |
| CSP | Not implemented | Static site, low risk |
| Cookies | None | localStorage only |

---

## Performance Characteristics

- **Initial Load:** Fast (CDN-cached dependencies)
- **TTFB:** Low (GitHub Pages edge network)
- **Render Blocking:** `theme.js` in head (prevents FOUC)
- **Image Optimization:** PNG format (consider WebP for optimization)

---

## Maintenance Notes

### Adding New Project Pages
1. Create new folder under `/projects/`
2. Add `index.html` using existing project page as template
3. Add project card to `/projects/index.html`
4. Add project thumbnail to `/assets/img/`

### Updating Content
- Edit HTML directly in respective `index.html` files
- Update PDFs by replacing files in `/assets/pdf/`
- Update images by replacing files in `/assets/img/`

### Theme Modifications
- Primary styles in `/assets/css/main.css`
- Theme toggle logic in `/assets/js/dark_mode.js`
- Theme initialization in `/assets/js/theme.js`

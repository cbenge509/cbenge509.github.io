# Technology Stack

## Overview

This portfolio website uses a modern static site stack with CDN-delivered frameworks for optimal performance and maintainability.

---

## Frontend Technologies

### CSS Framework

| Package | Version | CDN Source | Purpose |
|---------|---------|------------|---------|
| Bootstrap | 4.5.2 | StackPath | Core responsive grid and components |
| MDBootstrap | 4.19.1 | cdnjs | Material Design extensions for Bootstrap |

### JavaScript Libraries

| Package | Version | CDN Source | Purpose |
|---------|---------|------------|---------|
| jQuery | 3.5.1 | cdnjs | DOM manipulation, Bootstrap dependency |
| Popper.js | 2.4.4 | cdnjs | Tooltip/popover positioning |

### Icon Libraries

| Package | Version | CDN Source | Purpose |
|---------|---------|------------|---------|
| Font Awesome | 5.14.0 | cdnjs | Social icons, UI icons |
| Academicons | 1.9.0 | cdnjs | Academic/research icons |
| Material Icons | Latest | Google Fonts | Material design icons |

### Typography

| Font Family | Source | Usage |
|-------------|--------|-------|
| Roboto | Google Fonts | Primary body text |
| Roboto Slab | Google Fonts | Headers, emphasis |

---

## Custom JavaScript

### Theme System

```javascript
// theme.js - Initialization (runs in <head>)
// Prevents flash of unstyled content (FOUC)
let initTheme = (theme) => {
  // Detects system preference if no stored preference
  // Sets data-theme attribute on <html>
  // Stores preference in localStorage
};

// dark_mode.js - Toggle logic (runs at end of <body>)
// Handles click on #light-toggle
// Transitions smoothly between themes
```

### Content Interaction

```javascript
// common.js - Publication toggles
// Handles .abstract and .bibtex click events
// Toggles visibility of hidden content sections
```

---

## Hosting & Deployment

| Service | Purpose | Configuration |
|---------|---------|---------------|
| GitHub Pages | Static file hosting | Automatic on push to `master` |
| GitHub CDN | Asset delivery | Built into GitHub Pages |

### Deployment Flow

```
Local Development
      │
      ▼
  git commit
      │
      ▼
  git push origin master
      │
      ▼
  GitHub Actions (automatic)
      │
      ▼
  GitHub Pages Build
      │
      ▼
  Live at cbenge509.github.io
```

---

## External Services

| Service | Purpose | Identifier |
|---------|---------|------------|
| Google Analytics | Visitor analytics | UA-162315295-1 |
| GitHub | Source repository | cbenge509/cbenge509.github.io |

---

## Browser Support

Based on Bootstrap 4.5.2 and MDBootstrap 4.19.1:

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 45+ |
| Firefox | 38+ |
| Safari | 9+ |
| Edge | 12+ |
| Internet Explorer | 10+ (limited) |

---

## Development Requirements

### Local Development

No build tools required. Simply:

1. Clone the repository
2. Open any `.html` file in a browser
3. Or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx available)
npx serve

# PHP
php -S localhost:8000
```

### Dependencies

- Git (for version control)
- Any modern web browser (for testing)
- Text editor or IDE

---

## CDN URLs Reference

All external resources with SRI hashes:

```html
<!-- Bootstrap CSS -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha512-MoRNloxbStBcD8z3M/2BmnT+rg4IsMxPkXaGh2zD6LGNNFE80W3onsAhRcMAMrSoyWL9xD7Ert0men7vR8LUZg=="
      crossorigin="anonymous">

<!-- MDBootstrap CSS -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css"
      integrity="sha512-RO38pBRxYH3SoOprtPTD86JFOclM51/XTIdEPh5j8sj4tp8jmQIx26twG52UaLi//hQldfrh7e51WzP9wuP32Q=="
      crossorigin="anonymous" />

<!-- Font Awesome -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
      crossorigin="anonymous">

<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="
        crossorigin="anonymous"></script>

<!-- Bootstrap JS Bundle -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha512-M5KW3ztuIICmVIhjSqXe01oV2bpe248gOxqmlcYrEzAvws7Pw3z6BK0iGbrwvdrUQUhi3eXgtxp5I8PDo9YfjQ=="
        crossorigin="anonymous"></script>
```

---

## Potential Upgrades

| Current | Potential Upgrade | Benefit |
|---------|------------------|---------|
| Bootstrap 4.5.2 | Bootstrap 5.x | Dropped jQuery dependency, updated components |
| Manual HTML | Jekyll/Hugo | Templating, build automation |
| PNG images | WebP format | Smaller file sizes, faster loads |
| UA Analytics | GA4 | Updated analytics platform |

# Development Guide

## Quick Start

### Clone and Run

```bash
# Clone the repository
git clone https://github.com/cbenge509/cbenge509.github.io.git
cd cbenge509.github.io

# Open directly in browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## Project Structure

```
cbenge509.github.io/
├── index.html                    # Home page (About)
├── education/
│   └── index.html               # Academic credentials
├── honors_awards/
│   └── index.html               # Awards and honors
├── projects/
│   ├── index.html               # Portfolio overview
│   ├── arxiv/index.html         # Project details
│   ├── collegeincome/index.html
│   ├── crime/index.html
│   ├── dsbowl/index.html
│   ├── facialkeypoints/index.html
│   ├── futuresales/index.html
│   └── worldbank/index.html
├── skills/
│   └── index.html               # Certifications & competencies
├── assets/
│   ├── css/
│   │   ├── main.css            # Primary stylesheet
│   │   └── style.css           # Additional styles
│   ├── js/
│   │   ├── theme.js            # Theme initialization
│   │   ├── dark_mode.js        # Theme toggle
│   │   ├── common.js           # Abstract/BibTeX toggles
│   │   └── mansory.js          # Masonry layout (unused)
│   ├── img/                    # Images and logos
│   └── pdf/                    # PDF documents
└── docs/                       # Project documentation
```

---

## Common Tasks

### Adding a New Project

1. **Create project folder:**
   ```bash
   mkdir projects/newproject
   ```

2. **Create index.html** (use existing project as template):
   ```bash
   cp projects/arxiv/index.html projects/newproject/index.html
   ```

3. **Update the new project page:**
   - Change `<title>` tag
   - Update meta description
   - Modify project header and content
   - Update image references

4. **Add project thumbnail:**
   ```bash
   cp your-thumbnail.png assets/img/newproject_project.png
   ```

5. **Add card to portfolio page** (`projects/index.html`):
   ```html
   <div class="card hoverable">
     <a href="/projects/newproject/index.html" target="_blank">
       <img src="/assets/img/newproject_project.png"
            alt="project thumbnail"
            class="card-img-top"
            height=225>
       <div class="card-body">
         <h2 class="card-title">New Project Name</h2>
         <p class="card-text">Brief description of the project.</p>
       </div>
     </a>
   </div>
   ```

### Updating the About Page

Edit `index.html` directly:
- Bio section: Update the text in the main content area
- Publications: Add/modify entries in the publications list
- Profile image: Replace `assets/img/cbenge.jpg`

### Modifying Navigation

Navigation is duplicated in each HTML file. To update:

1. Modify the navbar in one file
2. Copy the `<nav>` section to all other HTML files

Navigation structure:
```html
<nav id="navbar" class="navbar navbar-light navbar-expand-sm fixed-top">
  <div class="container">
    <!-- Social Icons -->
    <!-- Navbar Toggle -->
    <!-- Nav Items -->
  </div>
</nav>
```

### Updating Theme Styles

**Light mode styles:** `/assets/css/main.css`
**Dark mode styles:** Uses CSS variables with `[data-theme="dark"]` selector

To add new theme-aware styles:
```css
/* Light mode (default) */
.my-element {
  color: #333;
}

/* Dark mode */
[data-theme="dark"] .my-element {
  color: #eee;
}
```

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Project thumbnails | `{project}_project.png` | `arxiv_project.png` |
| Detail images | `{project}_{desc}.png` | `crime_model.png` |
| Logos | `{name}.png` or `{name}_logo.png` | `columbia_logo.png` |
| PDF documents | Descriptive name | `High Performance Compression NLP.pdf` |

---

## Deployment

Deployment is automatic via GitHub Pages:

1. **Make changes** to HTML/CSS/JS files
2. **Commit** your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. **Push** to master:
   ```bash
   git push origin master
   ```
4. **Wait** ~1-2 minutes for GitHub Pages to build
5. **Verify** changes at https://cbenge509.github.io/

### Checking Deployment Status

- GitHub repository → Actions tab
- Or visit the site and check for updates

---

## Testing Locally

### Quick Test
Simply open any HTML file in a browser. Note: Some features may not work correctly due to CORS restrictions with `file://` protocol.

### Local Server (Recommended)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -SimpleHTTPServer 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Testing Dark Mode
1. Click the moon/sun icon in the navbar
2. Refresh the page - theme should persist
3. Clear localStorage to reset: `localStorage.removeItem('theme')`

---

## Troubleshooting

### Issue: Styles not loading locally
**Cause:** Opening HTML file directly (file:// protocol)
**Solution:** Use a local server

### Issue: Dark mode doesn't persist
**Cause:** localStorage blocked or cleared
**Solution:** Check browser settings for localStorage access

### Issue: Images not displaying
**Cause:** Incorrect path or missing file
**Solution:** Verify path starts with `/assets/` and file exists

### Issue: Changes not showing on live site
**Cause:** GitHub Pages cache or build delay
**Solution:** Wait 2-5 minutes, try hard refresh (Ctrl+Shift+R)

---

## Code Quality

### HTML Validation
Use [W3C Validator](https://validator.w3.org/) to check HTML

### CSS Validation
Use [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

### Accessibility
- All images should have `alt` attributes
- Links should have descriptive text
- Color contrast should meet WCAG guidelines

---

## Git Workflow

### Branch Strategy
- `master` - Production branch (deploys to GitHub Pages)
- No feature branches (solo project, direct commits)

### Commit Message Convention
Keep messages concise and descriptive:
```
added podcast creator, updated intro
update (for minor changes)
fixed typo
updated to new resume
```

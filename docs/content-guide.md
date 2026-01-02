# Content Guide

## Site Content Overview

This portfolio website showcases Cris Benge's professional work, academic achievements, and technical expertise.

---

## Page Sections

### 1. About Page (index.html)

**Purpose:** Primary landing page with professional introduction

**Content Structure:**
- Profile image (`assets/img/cbenge.jpg`)
- Bio text with professional summary
- Portfolio highlight (linked to BERTVision)
- Publications section with expandable abstracts
- Social links (GitHub, LinkedIn, Resume)

**Publications Format:**
```html
<li>
  <div class="row">
    <!-- Year/Venue column -->
    <div class="col-sm-2 abbr">
      <abbr class="badge">Venue Year</abbr>
    </div>
    <!-- Content column -->
    <div class="col-sm-8">
      <div class="title">Paper Title</div>
      <div class="author">Author List</div>
      <div class="links">
        <a class="abstract">Abs</a>
        <a href="pdf-link">PDF</a>
        <a href="code-link">Code</a>
      </div>
      <div class="abstract hidden">
        <p>Abstract text...</p>
      </div>
    </div>
  </div>
</li>
```

---

### 2. Portfolio Page (projects/index.html)

**Purpose:** Showcase of data science and ML projects

**Current Projects (9):**

| Project | Type | Achievement |
|---------|------|-------------|
| BERTVision | NLP/Compression | Research project |
| Facial Keypoints | Computer Vision | 2nd place Kaggle |
| Social Media Intelligence | Experiment | UC Berkeley research |
| ArXiV Analysis | Data Visualization | UC Berkeley project |
| Crime Statistics | Statistical Inference | UC Berkeley research |
| World Bank | NLP Classification | 1st place DrivenData |
| Data Science Bowl 2018 | Instance Segmentation | Top 12% Kaggle |
| Future Sales | Time Series | 13th place Kaggle |
| College Outcomes | Regression | 1st place DrivenData |

**Card Template:**
```html
<div class="card hoverable">
  <a href="/projects/{name}/index.html" target="_blank">
    <img src="/assets/img/{name}_project.png"
         alt="project thumbnail"
         class="card-img-top"
         height=225>
    <div class="card-body">
      <h2 class="card-title">Project Title</h2>
      <p class="card-text">Brief description.</p>
    </div>
  </a>
</div>
```

---

### 3. Awards Page (honors_awards/index.html)

**Purpose:** Highlight competition wins and professional awards

**Sections:**
- ML Competition Honors (DrivenData, Kaggle)
- Microsoft Awards (Platinum Club, Champion, Hero, BetterTogether)

**Award Entry Format:**
```html
<tr style="padding:10px">
  <td style="padding:10px">Year</td>
  <td style="padding:10px">
    <b>Achievement</b> : Description
  </td>
</tr>
```

---

### 4. Skills Page (skills/index.html)

**Purpose:** Display certifications and technical competencies

**Certifications Listed:**
- Microsoft Azure Certified Solution Architect Expert
- Microsoft Azure Certified Data Scientist
- AWS Certified Solution Architect Associate
- Microsoft Certified Solutions Master: SQL Server [MCSM]
- Microsoft Certified Master: SQL Server [MCM]
- And more...

**Competency Categories:**
- Data science core skills
- Data science languages and applications
- Machine learning domains
- Machine learning frameworks
- Visualization technologies
- Data platforms
- Database domain expertise
- Industry experience
- Leadership

---

### 5. Academics Page (education/index.html)

**Purpose:** Academic credentials and degrees

**Degrees:**
| Institution | Degree | Year |
|-------------|--------|------|
| Columbia University | MS Computer Science (ML) | Expected 2024 |
| UC Berkeley | MIDS (Data Science) | 2021, GPA 4.0 |
| Indiana Wesleyan | BS Business Information Systems | 2012 |
| Indiana Wesleyan | AS Business | 2006 |

---

## Individual Project Pages

Each project has a dedicated page with:

1. **Header**
   - Project title (linked to GitHub)
   - Affiliation and achievement
   - Horizontal rule

2. **Hero Image**
   - Main project visualization

3. **Project Description**
   - Overview paragraph

4. **Skills**
   - Comma-separated list of techniques

5. **Tools**
   - Comma-separated list of technologies

6. **Motivation**
   - Background and context
   - Problem description
   - Approach summary

7. **Additional Image(s)**
   - Supporting visualizations

8. **Repository Link**
   - Link to GitHub repository

---

## Assets

### Images Location: `/assets/img/`

**Profile:**
- `cbenge.jpg` - Profile photo

**Project Thumbnails:**
- `{project}_project.png` - Card thumbnails

**Project Details:**
- `{project}_{description}.png` - In-page images

**Logos:**
- `columbia_logo.png`, `ucb.png`, `iwu.png` - University logos
- Microsoft award badges

### PDFs Location: `/assets/pdf/`

Research papers and documents:
- `Ticket-BERT.pdf`
- `STIM.pdf`
- `High Performance Compression NLP.pdf`
- `Cristopher Benge - North Carolina Crime.pdf`
- `AIfSG___Automatic_Detection_of_School_Closures_for_Public_Health_Monitoring.pdf`
- `Cristopher Benge CV Public (2024).pdf`

---

## External Links

### GitHub Projects

| Project | Repository |
|---------|------------|
| BERTVision | https://cbenge509.github.io/BERTVision/ |
| Facial Keypoints | https://github.com/cbenge509/w4732_final_project |
| ArXiV Analysis | https://github.com/cbenge509/arxiv-ai-analysis |
| Crime Statistics | https://github.com/cbenge509/w203_Final |
| World Bank | https://github.com/cbenge509/wb2019 |
| Data Science Bowl | https://github.com/cbenge509/dsbowl_2018 |
| Future Sales | https://github.com/cbenge509/1C_Regression |
| College Outcomes | https://github.com/cbenge509/DataScienceCapstone_Oct2017 |

### Social Links
- GitHub: https://github.com/cbenge509
- LinkedIn: https://www.linkedin.com/in/crisbenge

---

## Content Updates Checklist

When updating content:

- [ ] Update the relevant HTML file
- [ ] Check all internal links work
- [ ] Verify images display correctly
- [ ] Test in both light and dark modes
- [ ] Check mobile responsiveness
- [ ] Commit and push to master
- [ ] Verify changes on live site

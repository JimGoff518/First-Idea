# Goff Law SEO Implementation Playbook

**Prepared by**: Billy
**For**: Goff Law DFW (www.gofflawdfw.com)
**Goal**: Dominate DFW personal injury search results

---

## Phase 1: Quick Wins (Week 1-2)

### 1.1 Trust Signal Blitz

**Current State**: "$5M+ Won" appears only on homepage
**Target State**: Trust signals on EVERY page

#### Action Items

**A. Calculate Your Aggregate Figure**
```
Total settlements + verdicts = $_____ Million
```
Display as: "Over $X Million Recovered for Texas Families"

**B. Select 5 Best Case Results**
Create a table like this:

| Case Type | Amount | Year |
|-----------|--------|------|
| Truck Accident | $X | 2024 |
| Brain Injury | $X | 2023 |
| Sexual Assault | $X | 2024 |
| Premises Liability | $X | 2023 |
| Wrongful Death | $X | 2022 |

**C. Add to Every Page Template**

Add a trust bar below navigation:
```html
<div class="trust-bar">
  <span>$X Million+ Recovered</span>
  <span>|</span>
  <span>Top 40 Under 40</span>
  <span>|</span>
  <span>SuperLawyers</span>
  <span>|</span>
  <span>Free Consultation: 972-928-0085</span>
</div>
```

---

### 1.2 Fix Technical Issues

**Issue**: Multiple practice area URLs returning 404

**Action Items**:
1. Audit all URLs in sitemap against live site
2. Fix or redirect any broken pages
3. Submit updated sitemap to Google Search Console

**Check These URLs**:
- /truck-accident-attorney/
- /car-accident-attorney-dallas/
- /personal-injury-lawyer-dallas/
- /brain-injury-lawyer-dallas/
- /sexual-assault-lawyer-dallas/

---

### 1.3 Schema Markup Additions

**Add Attorney Schema to Homepage**

```json
{
  "@context": "https://schema.org",
  "@type": "Attorney",
  "name": "Jim Goff",
  "jobTitle": "Personal Injury Attorney",
  "url": "https://gofflawdfw.com/",
  "image": "[attorney headshot URL]",
  "telephone": "+1-972-928-0085",
  "email": "jim@gofflawdfw.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12720 Hillcrest Rd #1045",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75230"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "[Law School Name]"
  },
  "award": [
    "Top 40 Under 40",
    "SuperLawyers",
    "Best Lawyers in America",
    "Million Dollar Advocates Forum"
  ],
  "knowsAbout": [
    "Personal Injury Law",
    "Truck Accidents",
    "Brain Injuries",
    "Sexual Assault Cases",
    "Wrongful Death"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Dallas-Fort Worth Metroplex"
  }
}
```

---

## Phase 2: Location Domination (Week 3-4)

### 2.1 DFW Suburb Page Creation

**Create these 15 pages first** (highest population/search volume):

| City | URL Pattern | Title Pattern |
|------|-------------|---------------|
| Fort Worth | /personal-injury-lawyer-fort-worth/ | Fort Worth Personal Injury Lawyer \| Goff Law |
| Arlington | /personal-injury-lawyer-arlington-tx/ | Arlington TX Personal Injury Attorney \| Goff Law |
| Plano | /personal-injury-lawyer-plano/ | Plano Personal Injury Lawyer \| Goff Law |
| Irving | /personal-injury-lawyer-irving-tx/ | Irving TX Personal Injury Attorney \| Goff Law |
| Garland | /personal-injury-lawyer-garland-tx/ | Garland Personal Injury Lawyer \| Goff Law |
| Frisco | /personal-injury-lawyer-frisco/ | Frisco Personal Injury Lawyer \| Goff Law |
| McKinney | /personal-injury-lawyer-mckinney/ | McKinney Personal Injury Attorney \| Goff Law |
| Grand Prairie | /personal-injury-lawyer-grand-prairie/ | Grand Prairie Personal Injury Lawyer \| Goff Law |
| Denton | /personal-injury-lawyer-denton-tx/ | Denton TX Personal Injury Attorney \| Goff Law |
| Mesquite | /personal-injury-lawyer-mesquite-tx/ | Mesquite Personal Injury Lawyer \| Goff Law |
| Carrollton | /personal-injury-lawyer-carrollton/ | Carrollton Personal Injury Attorney \| Goff Law |
| Richardson | /personal-injury-lawyer-richardson-tx/ | Richardson Personal Injury Lawyer \| Goff Law |
| Lewisville | /personal-injury-lawyer-lewisville/ | Lewisville Personal Injury Attorney \| Goff Law |
| Allen | /personal-injury-lawyer-allen-tx/ | Allen TX Personal Injury Lawyer \| Goff Law |
| Flower Mound | /personal-injury-lawyer-flower-mound/ | Flower Mound Personal Injury Lawyer \| Goff Law |

### 2.2 Location Page Template

Each page should include:

```markdown
# [City] Personal Injury Lawyer

[2-3 sentences intro mentioning city name and personal injury focus]

## Why Choose Goff Law for Your [City] Injury Case

[Paragraph about serving [City] residents, mention proximity to Dallas office]

## [City] Accident Statistics

| Type | Annual Average | Source |
|------|---------------|--------|
| Car Accidents | X,XXX | TxDOT |
| Truck Accidents | XXX | TxDOT |
| Pedestrian Accidents | XX | City data |

## Practice Areas We Handle in [City]

- Car Accidents
- Truck Accidents
- Motorcycle Accidents
- Brain Injuries
- Wrongful Death
- [etc.]

## Serving [City] and Surrounding Areas

We serve clients throughout [City] including neighborhoods like:
- [Neighborhood 1]
- [Neighborhood 2]
- [Neighborhood 3]

## Contact Our [City] Personal Injury Attorneys

[Contact form]
[Phone number]
[Office address with "X miles from [City]" note]

## Frequently Asked Questions About [City] Injury Cases

### How long do I have to file a personal injury claim in [City]?
[Answer mentioning Texas 2-year statute of limitations]

### How much does a [City] personal injury lawyer cost?
[Answer about contingency fees]

### What should I do after a car accident in [City]?
[Step-by-step answer]
```

### 2.3 LocalBusiness Schema for Each Location

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Goff Law - [City] Personal Injury Lawyer",
  "description": "Personal injury attorney serving [City], TX",
  "url": "https://gofflawdfw.com/personal-injury-lawyer-[city]/",
  "telephone": "+1-972-928-0085",
  "areaServed": {
    "@type": "City",
    "name": "[City]",
    "containedInPlace": {
      "@type": "State",
      "name": "Texas"
    }
  },
  "priceRange": "Free Consultation",
  "paymentAccepted": "Contingency Fee",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12720 Hillcrest Rd #1045",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75230"
  }
}
```

---

## Phase 3: Content Machine (Month 2-3)

### 3.1 Blog Content Calendar

**Target**: 8-10 posts per month

#### Week 1 Topics (Every Month)
| Day | Topic Type | Example |
|-----|------------|---------|
| Mon | Local news tie-in | "Recent I-35 Truck Accident: What Dallas Drivers Should Know" |
| Wed | How-to guide | "How to File a Personal Injury Claim in Texas" |
| Fri | FAQ answer | "How Much Is My Car Accident Case Worth in Dallas?" |

#### Week 2 Topics
| Day | Topic Type | Example |
|-----|------------|---------|
| Mon | Case type deep-dive | "Brain Injury Settlements in Texas: What to Expect" |
| Wed | Local statistics | "2024 Dallas Pedestrian Accident Statistics" |
| Fri | Client education | "What Insurance Companies Don't Want You to Know" |

#### Week 3 Topics
| Day | Topic Type | Example |
|-----|------------|---------|
| Mon | Emerging topic | "AI Self-Driving Car Accidents: Who Is Liable?" |
| Wed | Practice area | "Rideshare Accidents in Dallas: Uber and Lyft Liability" |
| Fri | Community | "Dallas Personal Injury Attorney Sponsors Local Youth Sports" |

#### Week 4 Topics
| Day | Topic Type | Example |
|-----|------------|---------|
| Mon | Mass tort update | "Galaxy Gas Lawsuit Update: What Victims Should Know" |
| Thu | Seasonal | "Holiday Drunk Driving in DFW: Staying Safe This Season" |

### 3.2 Pillar Content (Long-Form Guides)

Create 5 comprehensive guides (3,000+ words each):

1. **The Complete Guide to Texas Personal Injury Law**
   - Statute of limitations
   - Comparative negligence
   - Damage types
   - Claims process

2. **Dallas Truck Accident Guide**
   - Common causes
   - Liable parties
   - Evidence needed
   - Settlement timeline

3. **Brain Injury Claims in Texas: Everything You Need to Know**
   - Types of TBI
   - Proving damages
   - Long-term care costs
   - Case valuation

4. **Sexual Assault Civil Cases in Texas**
   - Criminal vs civil
   - Third-party liability
   - Privacy protections
   - Compensation types

5. **DFW Car Accident Complete Guide**
   - What to do at scene
   - Dealing with insurance
   - When to hire a lawyer
   - Timeline expectations

---

## Phase 4: Video & Testimonials (Month 2)

### 4.1 Video Testimonials

**Get 3-5 clients to record testimonials**

Script prompt:
```
1. What happened to you?
2. How did Goff Law help?
3. What was the result?
4. Would you recommend Goff Law?
```

**Technical requirements**:
- Minimum 1080p quality
- Good lighting
- Clear audio
- 60-90 seconds each

**Where to display**:
- Homepage carousel
- Relevant practice area pages
- Dedicated testimonials page
- YouTube channel

### 4.2 Attorney Introduction Video

**Create a 2-3 minute video with Jim Goff**:

Script outline:
```
1. Introduction (name, firm, experience)
2. Why I became a personal injury lawyer
3. What makes Goff Law different
4. Our commitment to clients
5. Call to action (free consultation)
```

### 4.3 Video Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Client Testimonial: [Client First Name]",
  "description": "[Brief description of case type]",
  "thumbnailUrl": "[thumbnail URL]",
  "uploadDate": "2026-01-24",
  "duration": "PT1M30S",
  "contentUrl": "[video URL]",
  "embedUrl": "[embed URL]"
}
```

---

## Phase 5: Ongoing Optimization

### 5.1 Monthly Tasks

| Task | Frequency | Owner |
|------|-----------|-------|
| Publish 8-10 blog posts | Monthly | Content team |
| Update case results | As wins occur | Jim |
| Review Google Search Console | Weekly | SEO |
| Respond to Google reviews | Within 24 hours | Office |
| Update local statistics | Quarterly | Content team |
| Audit for broken links | Monthly | SEO |

### 5.2 Quarterly Tasks

| Task | Frequency |
|------|-----------|
| Create new suburb page | Every 2 weeks until complete |
| Record new testimonial | Quarterly |
| Update attorney bio | Quarterly |
| Competitive analysis refresh | Quarterly |
| Schema audit | Quarterly |

### 5.3 Key Metrics to Track

| Metric | Current | 30-Day Goal | 90-Day Goal |
|--------|---------|-------------|-------------|
| Organic traffic | Baseline | +15% | +50% |
| Keyword rankings (top 10) | Count | +5 | +20 |
| Local pack appearances | Count | +3 | +10 |
| Leads from organic | Count | +20% | +50% |
| Pages indexed | ~90 | 110 | 150 |

---

## Resource Requirements

### Content Creation
- Blog posts: $100-200/post or in-house
- Location pages: $150-300/page or template + customize
- Pillar guides: $500-1000/guide

### Video Production
- Testimonials: $500-1500 for batch of 5
- Attorney video: $1000-2500
- Ongoing: Smartphone videos acceptable for social

### Technical SEO
- Schema implementation: 2-4 hours developer time
- 404 fixes: 1-2 hours
- Ongoing monitoring: 2-3 hours/month

### Estimated Total Investment (90 Days)
| Category | Low | High |
|----------|-----|------|
| Content | $3,000 | $8,000 |
| Video | $1,500 | $4,000 |
| Technical | $1,000 | $2,500 |
| **Total** | **$5,500** | **$14,500** |

---

## Success Milestones

### 30 Days
- [ ] Trust signals on all pages
- [ ] 5 suburb pages live
- [ ] 8 new blog posts published
- [ ] All 404s fixed
- [ ] Attorney schema implemented

### 60 Days
- [ ] 10 suburb pages live
- [ ] 16 new blog posts published
- [ ] Case results page created
- [ ] 2 video testimonials recorded
- [ ] FAQ schema on 5+ pages

### 90 Days
- [ ] 15 suburb pages live
- [ ] 24 new blog posts published
- [ ] Attorney intro video live
- [ ] LocalBusiness schema on all location pages
- [ ] 50% increase in organic traffic

---

*Implementation playbook complete. Let's go win DFW.*

— Billy

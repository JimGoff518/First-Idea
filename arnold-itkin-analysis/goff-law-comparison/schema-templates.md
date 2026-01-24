# Ready-to-Use Schema Markup for Goff Law

**Copy, customize, and implement these schemas immediately.**

---

## 1. Attorney Schema (Add to Homepage & About Page)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Attorney",
  "name": "Jim Goff",
  "givenName": "Jim",
  "familyName": "Goff",
  "jobTitle": "Personal Injury Attorney",
  "description": "Dallas personal injury attorney with experience in truck accidents, brain injuries, sexual assault cases, and wrongful death. Over $5 million recovered for Texas clients.",
  "url": "https://gofflawdfw.com/",
  "image": "https://gofflawdfw.com/[PATH-TO-HEADSHOT].jpg",
  "telephone": "+1-972-928-0085",
  "email": "jim@gofflawdfw.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12720 Hillcrest Rd #1045",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75230",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.9029",
    "longitude": "-96.7898"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "[YOUR LAW SCHOOL NAME]"
  },
  "award": [
    "Top 40 Under 40",
    "Super Lawyers",
    "Best Lawyers in America",
    "Million Dollar Advocates Forum"
  ],
  "knowsAbout": [
    "Personal Injury Law",
    "Truck Accident Claims",
    "Brain Injury Cases",
    "Sexual Assault Civil Cases",
    "Wrongful Death",
    "Product Liability",
    "Premises Liability"
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Dallas"
    },
    {
      "@type": "City",
      "name": "Fort Worth"
    },
    {
      "@type": "State",
      "name": "Texas"
    }
  ],
  "memberOf": [
    {
      "@type": "Organization",
      "name": "State Bar of Texas"
    },
    {
      "@type": "Organization",
      "name": "Million Dollar Advocates Forum"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/in/[LINKEDIN-PROFILE]",
    "https://www.facebook.com/[FACEBOOK-PAGE]",
    "https://twitter.com/[TWITTER-HANDLE]"
  ]
}
</script>
```

---

## 2. Law Firm Organization Schema (Add to All Pages)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Goff Law, PLLC",
  "alternateName": "Goff Law DFW",
  "description": "Dallas personal injury law firm specializing in truck accidents, brain injuries, sexual assault cases, and wrongful death. Free consultations available.",
  "url": "https://gofflawdfw.com/",
  "logo": "https://gofflawdfw.com/[PATH-TO-LOGO].png",
  "image": "https://gofflawdfw.com/[PATH-TO-OFFICE-IMAGE].jpg",
  "telephone": "+1-972-928-0085",
  "email": "jim@gofflawdfw.com",
  "priceRange": "Free Consultation - Contingency Fee",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Contingency Fee - No Fee Unless We Win",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12720 Hillcrest Rd #1045",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75230",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.9029",
    "longitude": "-96.7898"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "areaServed": [
    {"@type": "City", "name": "Dallas"},
    {"@type": "City", "name": "Fort Worth"},
    {"@type": "City", "name": "Arlington"},
    {"@type": "City", "name": "Plano"},
    {"@type": "City", "name": "Irving"},
    {"@type": "City", "name": "Frisco"},
    {"@type": "City", "name": "McKinney"},
    {"@type": "City", "name": "Cedar Hill"},
    {"@type": "AdministrativeArea", "name": "Dallas-Fort Worth Metroplex"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Personal Injury Legal Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Car Accident Claims"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Truck Accident Claims"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brain Injury Cases"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sexual Assault Civil Cases"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Wrongful Death Claims"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Premises Liability"}}
    ]
  },
  "sameAs": [
    "https://www.google.com/maps/place/Goff+Law",
    "https://www.linkedin.com/company/[COMPANY-PAGE]",
    "https://www.facebook.com/[FACEBOOK-PAGE]"
  ]
}
</script>
```

---

## 3. FAQ Schema (Add to Practice Area Pages)

### Example for Truck Accident Page:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much is my truck accident case worth in Dallas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Truck accident settlements in Dallas typically range from $50,000 to several million dollars depending on injury severity, medical costs, lost wages, and pain and suffering. Goff Law has recovered over $5 million for Texas clients. Contact us for a free case evaluation."
      }
    },
    {
      "@type": "Question",
      "name": "How long do I have to file a truck accident lawsuit in Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Texas, you have 2 years from the date of the truck accident to file a personal injury lawsuit. This is called the statute of limitations. However, it's important to contact an attorney as soon as possible to preserve evidence and build the strongest case."
      }
    },
    {
      "@type": "Question",
      "name": "Who can be held liable in a Dallas truck accident?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiple parties can be liable in a truck accident including: the truck driver, the trucking company, the truck manufacturer, cargo loading companies, and maintenance providers. An experienced truck accident attorney can identify all liable parties to maximize your compensation."
      }
    },
    {
      "@type": "Question",
      "name": "What should I do after a truck accident in Dallas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After a truck accident: 1) Call 911 and get medical attention, 2) Document the scene with photos, 3) Get the truck driver's information and trucking company name, 4) Don't give recorded statements to insurance companies, 5) Contact a Dallas truck accident lawyer immediately. Evidence in truck cases can disappear quickly."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a lawyer for a truck accident claim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, truck accident cases are complex and involve multiple parties with large insurance policies. Trucking companies have teams of lawyers working to minimize your compensation. A truck accident attorney levels the playing field and typically recovers significantly more than self-represented claimants."
      }
    }
  ]
}
</script>
```

---

## 4. Service Schema (Add to Each Practice Area Page)

### Example for Brain Injury Page:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Brain Injury Legal Representation",
  "name": "Dallas Brain Injury Lawyer",
  "description": "Legal representation for traumatic brain injury victims in Dallas-Fort Worth. We help TBI victims recover compensation for medical bills, lost wages, and long-term care needs.",
  "provider": {
    "@type": "LegalService",
    "name": "Goff Law, PLLC",
    "url": "https://gofflawdfw.com/"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Dallas-Fort Worth Metroplex"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Brain Injury Case Types",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Traumatic Brain Injury Claims"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Concussion Cases"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Diffuse Axonal Injury Claims"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Brain Hemorrhage Cases"}}
    ]
  }
}
</script>
```

---

## 5. Location Page Schema (Use for Each Suburb Page)

### Template - Replace [CITY] with actual city name:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Goff Law - [CITY] Personal Injury Lawyer",
  "description": "Personal injury attorney serving [CITY], Texas. Experienced in car accidents, truck accidents, brain injuries, and wrongful death. Free consultations.",
  "url": "https://gofflawdfw.com/personal-injury-lawyer-[city-slug]/",
  "telephone": "+1-972-928-0085",
  "email": "jim@gofflawdfw.com",
  "priceRange": "Free Consultation",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12720 Hillcrest Rd #1045",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75230",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "City",
    "name": "[CITY]",
    "containedInPlace": {
      "@type": "State",
      "name": "Texas"
    }
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[CITY LATITUDE]",
    "longitude": "[CITY LONGITUDE]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "parentOrganization": {
    "@type": "LegalService",
    "name": "Goff Law, PLLC",
    "url": "https://gofflawdfw.com/"
  }
}
</script>
```

### City Coordinates Reference:

| City | Latitude | Longitude |
|------|----------|-----------|
| Fort Worth | 32.7555 | -97.3308 |
| Arlington | 32.7357 | -97.1081 |
| Plano | 33.0198 | -96.6989 |
| Irving | 32.8140 | -96.9489 |
| Garland | 32.9126 | -96.6389 |
| Frisco | 33.1507 | -96.8236 |
| McKinney | 33.1972 | -96.6397 |
| Grand Prairie | 32.7460 | -96.9978 |
| Denton | 33.2148 | -97.1331 |
| Mesquite | 32.7668 | -96.5992 |
| Carrollton | 32.9537 | -96.8903 |
| Richardson | 32.9483 | -96.7299 |
| Lewisville | 33.0462 | -96.9942 |

---

## 6. Review/Testimonial Schema (When You Have Reviews)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Goff Law, PLLC",
  "url": "https://gofflawdfw.com/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "[NUMBER OF REVIEWS]",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "[Client First Name]"
      },
      "datePublished": "2024-XX-XX",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "[Testimonial text here]"
    }
  ]
}
</script>
```

---

## 7. Breadcrumb Schema (Add to All Inner Pages)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://gofflawdfw.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Legal Services",
      "item": "https://gofflawdfw.com/legal-services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Current Page Name]",
      "item": "https://gofflawdfw.com/[current-page-url]/"
    }
  ]
}
</script>
```

---

## Implementation Checklist

- [ ] Add Attorney schema to homepage
- [ ] Add Organization schema to all pages (via header)
- [ ] Add FAQ schema to 5 top practice area pages
- [ ] Add Service schema to each practice area page
- [ ] Add Location schema to each suburb page (as created)
- [ ] Add Breadcrumb schema to all inner pages
- [ ] Test all schema with Google's Rich Results Test: https://search.google.com/test/rich-results

---

## Validation Tool

After implementing, test each page at:
**https://search.google.com/test/rich-results**

Look for:
- No errors
- All intended types detected
- Preview shows expected rich snippets

---

*Schema templates ready for implementation. — Billy*

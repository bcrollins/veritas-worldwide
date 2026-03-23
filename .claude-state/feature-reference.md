# The Record — Feature Reference

## Publication Structure
31 chapters (Foreword + Overview + 28 Chapters + Epilogue). Chronological documentary history from 1694 to present. Every chapter contains: title, subtitle, date range, author (B.R.), content blocks, inline sources, cross-links to related chapters, keyword tags.

## Navigation
Header: Sticky. Veritas Worldwide Press logo-link. Nav tabs: The Record (home), Search, Methodology, Sources, Saved (logged-in only). Sign In / Account dropdown. Mobile hamburger menu. Crimson accent bar below header.
Footer: Three columns — branding/credits, nav links, principles statement. Copyright line.

## Home Page (The Record)
Masthead with Volume/Edition banner. "The Record" display title. Subtitle. Tagline with crimson rules. Stats bar (31 chapters, 240+ years, 500+ sources, 100% free). Featured article (Foreword) with full preview card. Complete Table of Contents in two-column grid. Donation Banner (dark bg, humble copy, Stripe link). Reading Guide CTA (Foreword + Methodology links).

## Chapter Page
Chapter label (number + date range). Full title (Playfair Display). Author + date. Bookmark button (logged-in). Content blocks rendered in sequence: drop caps, body text, headings, subheadings, pull quotes with attribution, evidence boxes (three tiers with distinct styling), stat cards (dark bg, crimson values), data tables (dark header, striped rows), timelines (year + description grid). Source footnotes at bottom. Cross-links to related chapters. Previous/Next chapter navigation.

## Content Access Policy
All content is free and open to all readers. No content gating. Premium features (download, share, bookmark) require a free account. Editorial directive: "allow users to read everything without account creation."

## Search
Full-text search across all chapters. Keyword matching on titles, subtitles, content, keywords. Results show chapter number, title, subtitle, matching context. Links to chapter pages.

## Methodology Page
Explains the four-tier source hierarchy. Explains the three-tier evidence classification. Presents editorial standards. Independent verification guidance.

## Sources Page
Master bibliography organized by chapter. Links to primary documents where available. Source count and categorization.

## Bookmarks Page
Logged-in: Grid of saved chapters as cards. Not logged-in: Sign-in prompt.

## Auth System
localStorage-backed (MVP). SHA-256 password hashing via Web Crypto API. Sign Up/Sign In modal. React Context for reactive state. Toast notifications.

## Donation System
Stripe Payment Link via publisher account. "Customer chooses what to pay" with $10 default. Humble messaging on home page. Preset buttons ($5/$10/$25/$50/$100) + Custom amount.

## Evidence Tiers (sacred — never alter)
- VERIFIED (Green #166534): Primary source documents
- CIRCUMSTANTIAL (Amber #92400E): Documented facts, interpretive conclusion
- DISPUTED (Red #991B1B): Reported but not independently confirmed

## Source Hierarchy
- Tier 1 (Primary): Congressional records, court filings, executive orders, declassified docs
- Tier 2 (Peer-Reviewed): Academic journals, university press
- Tier 3 (Verified Journalism): Investigative reporting with named sources, FOIA docs
- Tier 4 (Secondary): Biographies, historical surveys, memoirs — context only

## Design System
Parchment bg (#FAF8F5), Dark ink (#1A1A1A), Crimson accents (#8B1A1A). Playfair Display + Source Serif 4 + Inter + JetBrains Mono. Evidence tier icons (✓/◐/⚠). Print-optimized. Reduced-motion support.

## Future Features (prioritized)
1. Newsletter signup
2. Reading progress indicator
3. Dark mode toggle
4. Chapter PDF export
5. Social sharing buttons
6. Related chapters sidebar
7. Annotation/highlighting (logged-in)
8. Audio narration
9. Multi-volume support
10. Interactive timeline
11. Source verification status indicators
12. Community notes (moderated)
13. API for chapter data
14. RSS feed
15. Multilingual support

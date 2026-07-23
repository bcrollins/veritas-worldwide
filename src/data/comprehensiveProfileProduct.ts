/**
 * Comprehensive Online Profile — product copy, FAQs, and deliverable outline.
 * Entity-only attribution. No operator personal identity.
 */

export type EvidenceTierInReport = 'Verified' | 'Corroborated' | 'Unconfirmed' | 'Out of scope'

export const PROFILE_REPORT_SECTIONS = [
  {
    id: 'executive',
    title: 'Executive summary',
    body: 'Subject identity, confidence of match, high-signal findings, and open questions.',
  },
  {
    id: 'identity',
    title: 'Identity resolution',
    body: 'Legal name variants, known aliases, dates, locations, and disambiguation against near-matches.',
  },
  {
    id: 'public-web',
    title: 'Public web & media',
    body: 'News, interviews, blogs, forums, and archived pages with capture dates.',
  },
  {
    id: 'social-professional',
    title: 'Social & professional graph',
    body: 'Public social profiles, professional directories, organizational affiliations, and cross-links.',
  },
  {
    id: 'records',
    title: 'Public records trail',
    body: 'Court dockets, corporate filings, property, campaign finance, and regulatory records where lawfully public.',
  },
  {
    id: 'devices-accounts',
    title: 'Device & account authentication',
    body: 'Only linkages that can be authenticated to the subject (e.g. public WHOIS, app store, breach-notice self-admission, court exhibits). Never guesswork.',
  },
  {
    id: 'network',
    title: 'Associated entities',
    body: 'Companies, nonprofits, political committees, and repeatedly co-appearing public actors — each with a source trail.',
  },
  {
    id: 'timeline',
    title: 'Chronology',
    body: 'Dated event timeline built only from sourced items.',
  },
  {
    id: 'methodology',
    title: 'Methodology appendix',
    body: 'Collection methods, evidence-tier definitions, exclusions, and how to re-verify every citation.',
  },
] as const

export const PROFILE_FAQS = [
  {
    q: 'What does $499 include?',
    a: 'One comprehensive online profile on a single named subject: authenticated public trails, evidence-tiered findings, device/account links only when verified, and a methodology appendix so you can re-check every claim.',
  },
  {
    q: 'What does “device and authenticated” mean?',
    a: 'If a phone number, email, handle, domain, or device identifier appears in a public or lawfully obtained record and can be tied to the subject with a durable source, we include it and show the proof. We do not invent linkages from weak co-occurrence.',
  },
  {
    q: 'Is this hacking or private investigation of sealed systems?',
    a: 'No. Collection is limited to open-source intelligence (OSINT) and lawfully public records. We do not break into accounts, buy illegal data, or solicit sealed medical or classified material.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Typical delivery is 5–10 business days after payment and complete intake. Complex multi-jurisdiction subjects may take longer; we confirm scope before starting deep collection.',
  },
  {
    q: 'What if the subject has almost no public footprint?',
    a: 'You still receive a full methodology write-up, negative-result documentation, and every authenticated trail we found. Sparse records are reported honestly — never padded with rumor.',
  },
  {
    q: 'Can I order a profile on a public official already in Power Profiles?',
    a: 'Yes. Public Power Profiles are free editorial surfaces with dual-cited integrity dockets. A Comprehensive Online Profile is a private, paid research deliverable that goes deeper and is delivered only to you.',
  },
  {
    q: 'Who can order?',
    a: 'Adult clients who attest to a lawful purpose (due diligence, journalism, research, personal safety within the law, etc.). We refuse orders that appear to facilitate harassment, stalking, or unlawful surveillance.',
  },
  {
    q: 'How do I pay and what is the refund policy?',
    a: 'Secure Stripe checkout for $499 USD. If we cannot open a viable investigation after intake (e.g. impossible disambiguation or prohibited purpose), we refund. After substantial collection begins, refunds are case-by-case within 14 days.',
  },
] as const

export const LAWFUL_PURPOSE_OPTIONS = [
  { value: 'due-diligence', label: 'Business / counterparty due diligence' },
  { value: 'journalism', label: 'Journalism or editorial research' },
  { value: 'academic', label: 'Academic or historical research' },
  { value: 'legal', label: 'Legal matter with counsel (civil)' },
  { value: 'personal-safety', label: 'Personal safety / known-threat documentation (lawful)' },
  { value: 'other', label: 'Other lawful purpose (describe)' },
] as const

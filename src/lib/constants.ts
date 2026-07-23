/**
 * Shared constants for Veritas Worldwide
 */

/** Stripe Payment Link — "Customer chooses what to pay" donation link */
export const DONATE_URL = 'https://buy.stripe.com/eVqeVd0mTbaE3FDaCrasg0d'

/** Site tagline — displayed in header */
export const TAGLINE = 'No party. No agenda. Just the record.'

/**
 * Comprehensive Online Profile — fixed-price OSINT deliverable.
 * Primary checkout: server creates a Stripe Checkout Session ($499) when
 * STRIPE_SECRET_KEY is configured. Optional static Payment Link override:
 * VITE_COMPREHENSIVE_PROFILE_CHECKOUT_URL or COMPREHENSIVE_PROFILE_CHECKOUT_URL.
 */
export const COMPREHENSIVE_PROFILE = {
  name: 'Comprehensive Online Profile',
  slug: 'comprehensive-profile',
  priceUsd: 499,
  currency: 'USD',
  deliveryBusinessDays: '5–10',
  contactEmail: 'rights@veritasworldwide.com',
  /** Optional static Payment Link; prefer dynamic /api/services/comprehensive-profile/checkout */
  /** Optional static Payment Link; prefer dynamic server checkout */
  checkoutUrl: '',
  tagline: 'Every public, device-verified trail — one authenticated report.',
  scope: [
    'Identity resolution across public name, alias, and entity variants',
    'Open-web, social, professional, and news presence mapping',
    'Court, corporate, property, and regulatory public-record trails (jurisdiction-dependent)',
    'Device/account linkage only when independently verifiable and lawfully obtainable',
    'Source-backed dossier with evidence tiers and methodology appendix',
    'Authenticated deliverable: sources, capture dates, and verification notes',
  ],
  exclusions: [
    'No illegal hacking, credential theft, or private-system intrusion',
    'No confidential medical, sealed, or illegally obtained records',
    'No stalking facilitation — lawful purpose attestation required',
    'No guarantee that every rumor is true; only authenticated public trails',
  ],
  methodology: [
    'Intake: identify the subject with enough disambiguators to avoid misattribution',
    'Scope lock: confirm lawful purpose and report boundaries in writing',
    'Collection: public web, official records, archived captures, and corroborating primary sources',
    'Authentication: each finding requires a durable source URL or document handle plus capture metadata',
    'Device/account claims: included only when the link is verified to the subject (not inferred alone)',
    'Synthesis: structured report with evidence tiers (Verified / Corroborated / Unconfirmed)',
    'Delivery: encrypted handoff + methodology appendix for independent review',
  ],
} as const

/** Membership tier payment links */
export const MEMBERSHIP = {
  correspondent: {
    name: 'Correspondent',
    monthlyPrice: 5,
    annualPrice: 48,
    annualSavings: 20,
    monthlyUrl: 'https://buy.stripe.com/8x29AS5N808Z7crcS52go0i',
    annualUrl: 'https://buy.stripe.com/aFadR87Vg4pfeET5pD2go0j',
    features: [
      'Early access to new chapters (48 hours before public)',
      'Weekly editorial briefing email',
      'Access to raw source document library',
      'Member badge on your profile',
      'Ad-free reading experience',
    ],
    color: '#92400E',
    icon: 'signal',
  },
  investigator: {
    name: 'Investigator',
    monthlyPrice: 12,
    annualPrice: 120,
    annualSavings: 17,
    monthlyUrl: 'https://buy.stripe.com/5kQ9ASejE9Jz54j19n2go0k',
    annualUrl: 'https://buy.stripe.com/28E8wO4J4f3TfIX19n2go0l',
    features: [
      'Everything in Correspondent',
      'Monthly exclusive deep-dive dossier',
      'Annotated source library with editor notes',
      'Priority fact-check & correction requests',
      'Quarterly editorial roundtable (virtual)',
      'Custom citation export tools',
    ],
    color: '#1E3A5F',
    icon: 'search',
    popular: true,
  },
  founding: {
    name: 'Founding Circle',
    monthlyPrice: 25,
    annualPrice: 240,
    annualSavings: 20,
    monthlyUrl: 'https://buy.stripe.com/eVq14ma3odZPfIXbO12go0m',
    annualUrl: 'https://buy.stripe.com/5kQaEWa3o7Br0O36tH2go0n',
    features: [
      'Everything in Investigator',
      'Your name or initials on the Founding Circle page',
      'Direct editorial feedback channel',
      'Vote on the next investigation topic',
      'Annual print compilation (when available)',
      'Founding member rate — locked for life',
    ],
    color: '#8B1A1A',
    icon: 'pillar',
  },
} as const

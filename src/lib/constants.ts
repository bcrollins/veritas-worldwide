/**
 * Shared constants for Veritas Worldwide Press
 */

/** Stripe Payment Link — "Customer chooses what to pay" donation link */
export const DONATE_URL = 'https://buy.stripe.com/eVqeVd0mTbaE3FDaCrasg0d'

/** Site tagline — displayed in header */
export const TAGLINE = 'No party. No agenda. Just the record.'

/** Membership tier payment links */
export const MEMBERSHIP = {
  correspondent: {
    name: 'Correspondent',
    monthlyPrice: 5,
    annualPrice: 48,
    annualSavings: 20,
    monthlyUrl: 'https://buy.stripe.com/eVq5kDfhN1A4gspcKzasg07',
    annualUrl: 'https://buy.stripe.com/eVq9AT1qXemQ3FDdODasg08',
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
    monthlyUrl: 'https://buy.stripe.com/7sYaEXfhN1A4gspcKzasg09',
    annualUrl: 'https://buy.stripe.com/3cI9AT3z5fqU6RP6mbasg0a',
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
    monthlyUrl: 'https://buy.stripe.com/8x2dR95Hd0w0fol25Vasg0b',
    annualUrl: 'https://buy.stripe.com/14A00jedJ5Qkfol6mbasg0c',
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

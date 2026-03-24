/**
 * Shared constants for Veritas Worldwide Press
 */

/** Stripe Payment Link — "Customer chooses what to pay" donation link */
export const DONATE_URL = 'https://buy.stripe.com/7sY00jd9F5Qkb857qfasg05'

/** Site tagline — displayed in header */
export const TAGLINE = 'No party. No agenda. Just the record.'

/** Membership tier payment links */
export const MEMBERSHIP = {
  correspondent: {
    name: 'Correspondent',
    monthlyPrice: 5,
    annualPrice: 48,
    annualSavings: 20,
    monthlyUrl: 'https://buy.stripe.com/4gMeVccbw3lbgN105j2go06',
    annualUrl: 'https://buy.stripe.com/14AbJ0b7s5tjbsH6tH2go07',
    features: [
      'Early access to new chapters (48 hours before public)',
      'Weekly editorial briefing email',
      'Access to raw source document library',
      'Member badge on your profile',
      'Ad-free reading experience',
    ],
    color: '#92400E',
    icon: '📡',
  },
  investigator: {
    name: 'Investigator',
    monthlyPrice: 12,
    annualPrice: 120,
    annualSavings: 17,
    monthlyUrl: 'https://buy.stripe.com/fZu8wOejE7Br1S72dr2go08',
    annualUrl: 'https://buy.stripe.com/3cI5kC3F0bRH68n2dr2go09',
    features: [
      'Everything in Correspondent',
      'Monthly exclusive deep-dive dossier',
      'Annotated source library with editor notes',
      'Priority fact-check & correction requests',
      'Quarterly editorial roundtable (virtual)',
      'Custom citation export tools',
    ],
    color: '#1E3A5F',
    icon: '🔍',
    popular: true,
  },
  founding: {
    name: 'Founding Circle',
    monthlyPrice: 25,
    annualPrice: 240,
    annualSavings: 20,
    monthlyUrl: 'https://buy.stripe.com/14A6oG6Rc6xn7cr2dr2go0a',
    annualUrl: 'https://buy.stripe.com/14A9AS5N89Jz7cr6tH2go0b',
    features: [
      'Everything in Investigator',
      'Your name or initials on the Founding Circle page',
      'Direct editorial feedback channel',
      'Vote on the next investigation topic',
      'Annual print compilation (when available)',
      'Founding member rate — locked for life',
    ],
    color: '#8B1A1A',
    icon: '🏛️',
  },
} as const

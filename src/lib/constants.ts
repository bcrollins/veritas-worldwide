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
    monthlyUrl: 'https://buy.stripe.com/eVq00iejE3lbfIX3hv2go0c',
    annualUrl: 'https://buy.stripe.com/14A7sKcbw8FvfIX9FT2go0d',
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
    monthlyUrl: 'https://buy.stripe.com/3cIdR8ejE6xnbsHcS52go0e',
    annualUrl: 'https://buy.stripe.com/aFaeVc2AW5tjdAP6tH2go0f',
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
    monthlyUrl: 'https://buy.stripe.com/9B6eVc4J41d38gvg4h2go0g',
    annualUrl: 'https://buy.stripe.com/28E00i4J44pf40f2dr2go0h',
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

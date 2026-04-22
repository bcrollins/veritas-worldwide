type SignupSourceMeta = {
  displayLabel: string
  subscriberLabel: string
  isInstitute: boolean
}

export const SIGNUP_SOURCE_META = {
  newsletter_inline: {
    displayLabel: 'Inline Signup',
    subscriberLabel: 'New Subscriber',
    isInstitute: false,
  },
  newsletter_footer: {
    displayLabel: 'Footer Signup',
    subscriberLabel: 'New Subscriber',
    isInstitute: false,
  },
  exit_intent: {
    displayLabel: 'Exit Intent',
    subscriberLabel: 'New Subscriber',
    isInstitute: false,
  },
  content_gate: {
    displayLabel: 'Deep Archive',
    subscriberLabel: 'Archive Subscriber',
    isInstitute: false,
  },
  dossier_download: {
    displayLabel: 'Dossier Download',
    subscriberLabel: 'Dossier Subscriber',
    isInstitute: false,
  },
  membership_page: {
    displayLabel: 'Membership Page',
    subscriberLabel: 'Membership Subscriber',
    isInstitute: false,
  },
  article_cta: {
    displayLabel: 'Current Reporting',
    subscriberLabel: 'Current Reporting Subscriber',
    isInstitute: false,
  },
  topic_hub: {
    displayLabel: 'Topic Hub',
    subscriberLabel: 'Topic Hub Subscriber',
    isInstitute: false,
  },
  institute_course: {
    displayLabel: 'Institute Course',
    subscriberLabel: 'Institute Course Subscriber',
    isInstitute: true,
  },
  institute_guide: {
    displayLabel: 'Institute Guide',
    subscriberLabel: 'Institute Guide Subscriber',
    isInstitute: true,
  },
  institute_catalog: {
    displayLabel: 'Institute Catalog',
    subscriberLabel: 'Institute Catalog Subscriber',
    isInstitute: true,
  },
  institute_book: {
    displayLabel: 'Field Manual',
    subscriberLabel: 'Field Manual Subscriber',
    isInstitute: true,
  },
  newsletter_legacy_migration: {
    displayLabel: 'Legacy Migration',
    subscriberLabel: 'Migrated Subscriber',
    isInstitute: false,
  },
  bible_history_page: {
    displayLabel: 'Bible History Page',
    subscriberLabel: 'Bible History Subscriber',
    isInstitute: false,
  },
} as const satisfies Record<string, SignupSourceMeta>

export type SubscriptionSource = keyof typeof SIGNUP_SOURCE_META

export const INSTITUTE_SIGNUP_SOURCES = [
  'institute_course',
  'institute_guide',
  'institute_catalog',
  'institute_book',
] as const satisfies readonly SubscriptionSource[]

export const HUBSPOT_SIGNUP_PROPERTY_KEYS = {
  lastCapturePath: 'veritas_last_capture_path',
  lastContentInterest: 'veritas_last_content_interest',
  lastSignupArticle: 'veritas_last_signup_article',
  lastSignupReferrer: 'veritas_last_signup_referrer',
  lastSignupReturnTo: 'veritas_last_signup_return_to',
  lastSignupSource: 'veritas_last_signup_source',
  lastSignupTopic: 'veritas_last_signup_topic',
} as const

function titleCaseLabel(value: string) {
  return value
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

export function formatSignupSourceLabel(value: string) {
  return SIGNUP_SOURCE_META[value as SubscriptionSource]?.displayLabel || titleCaseLabel(value)
}

export function getSubscriberSourceLabel(value: string) {
  return SIGNUP_SOURCE_META[value as SubscriptionSource]?.subscriberLabel || 'New Subscriber'
}

export function isInstituteSignupSource(value: string) {
  return INSTITUTE_SIGNUP_SOURCES.includes(value as (typeof INSTITUTE_SIGNUP_SOURCES)[number])
}

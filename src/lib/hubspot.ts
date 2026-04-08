/**
 * HubSpot Integration Module for Veritas Worldwide
 * 
 * Uses HubSpot's tracking code (loaded in index.html) for:
 * - Contact identification via _hsq.push(["identify", ...])
 * - Page view tracking via _hsq.push(["trackPageView"])
 * - Custom event tracking via _hsq.push(["trackCustomBehavioralEvent", ...])
 * 
 * No API keys exposed client-side. The tracking code (portal 245470580)
 * handles all contact creation and event logging server-side.
 */

const PORTAL_ID = '245470580'
const STORAGE_KEY = 'veritas_subscriber'

/* ── Types ────────────────────────────────────────────────────── */
export interface SubscriberData {
  email: string
  firstName?: string
  lastName?: string
  source: SubscriptionSource
  contentInterest?: string
  referrer?: string
}

export type SubscriptionSource =
  | 'newsletter_inline'
  | 'newsletter_footer'
  | 'exit_intent'
  | 'content_gate'
  | 'dossier_download'
  | 'membership_page'
  | 'article_cta'
  | 'topic_hub'
  | 'institute_course'
  | 'institute_guide'
  | 'institute_catalog'
  | 'institute_book'
  | 'newsletter_legacy_migration'
  | 'bible_history_page'

/* ── HubSpot Tracking Queue ───────────────────────────────────── */
declare global {
  interface Window {
    _hsq: Array<[string, ...any[]]>
  }
}

function getHsq(): Array<[string, ...any[]]> {
  window._hsq = window._hsq || []
  return window._hsq
}

/**
 * Identify a contact in HubSpot. Creates the contact if new,
 * updates if existing. Requires no API key — uses tracking code.
 */
export function identifyContact(data: SubscriberData): void {
  const hsq = getHsq()

  const properties: Record<string, string> = {
    email: data.email,
  }
  if (data.firstName) properties.firstname = data.firstName
  if (data.lastName) properties.lastname = data.lastName

  hsq.push(['identify', properties])
  hsq.push(['trackPageView'])

  // Track the subscription event
  trackEvent('newsletter_signup', {
    source: data.source,
    content_interest: data.contentInterest || 'general',
    referrer: data.referrer || document.referrer || 'direct',
  })

  // Store locally to prevent re-prompting
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      email: data.email,
      subscribedAt: new Date().toISOString(),
      source: data.source,
    }))
  } catch {}
}

/**
 * Track a custom behavioral event in HubSpot
 */
export function trackEvent(name: string, properties?: Record<string, string>): void {
  const hsq = getHsq()
  hsq.push(['trackCustomBehavioralEvent', {
    name,
    properties: properties || {},
  }])
}

/**
 * Track a page view (called automatically by HubSpot, but
 * useful for SPA route changes)
 */
export function trackPageView(path?: string): void {
  const hsq = getHsq()
  if (path) {
    hsq.push(['setPath', path])
  }
  hsq.push(['trackPageView'])
}

/**
 * Check if the visitor is already a subscriber
 */
export function isSubscribed(): boolean {
  try {
    return !!localStorage.getItem(STORAGE_KEY)
  } catch {
    return false
  }
}

/**
 * Get stored subscriber info
 */
export function getSubscriberInfo(): { email: string; subscribedAt: string; source: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Submit to HubSpot Forms API (non-authenticated, client-side safe).
 * This is a fallback for when the tracking code isn't loaded yet.
 */
export async function submitToHubSpotForm(
  formId: string,
  data: SubscriberData
): Promise<boolean> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formId}`

  const fields = [
    { name: 'email', value: data.email },
  ]
  if (data.firstName) fields.push({ name: 'firstname', value: data.firstName })
  if (data.lastName) fields.push({ name: 'lastname', value: data.lastName })

  const body = {
    fields,
    context: {
      pageUri: window.location.href,
      pageName: document.title,
    },
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return res.ok
  } catch {
    return false
  }
}

export { PORTAL_ID }

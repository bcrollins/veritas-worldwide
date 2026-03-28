/**
 * GA4 Event Tracking — centralized helper for Google Analytics 4
 *
 * Uses gtag() which is loaded via the script tag in index.html.
 * All events are typed and follow GA4 recommended event naming.
 * Silent no-op if gtag is not available (e.g., ad blockers).
 */

import { scoreShareClicked } from './leadScoring'

type GtagFn = (...args: unknown[]) => void

function getGtag(): GtagFn | null {
  const w = window as unknown as Record<string, unknown>
  return typeof w.gtag === 'function' ? (w.gtag as GtagFn) : null
}

/** SPA page view — call on every React Router route change */
export function trackPageView(path: string, title: string): void {
  getGtag()?.('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.origin + path,
  })
}

/** User signs up for a free account */
export function trackSignUp(method: string = 'email'): void {
  getGtag()?.('event', 'sign_up', { method })
}

/** User signs in */
export function trackLogin(method: string = 'email'): void {
  getGtag()?.('event', 'login', { method })
}

/** User clicks the donation/support link (with dollar amount from DonationBanner) */
export function trackDonationClick(amount: number | string): void {
  getGtag()?.('event', 'begin_checkout', {
    currency: 'USD',
    value: typeof amount === 'number' ? amount : parseFloat(amount) || 0,
    items: [{ item_name: 'Donation', item_category: 'Support' }],
  })
}

/** User clicks a Support link (header, mobile menu, or footer) */
export function trackSupportClick(location: string): void {
  getGtag()?.('event', 'select_promotion', {
    promotion_name: 'Support CTA',
    creative_slot: location,
  })
}

/** User bookmarks a chapter */
export function trackBookmark(chapterId: string, action: 'add' | 'remove'): void {
  getGtag()?.('event', action === 'add' ? 'add_to_wishlist' : 'remove_from_cart', {
    items: [{ item_id: chapterId, item_name: chapterId }],
  })
}

/** User performs a search */
export function trackSearch(query: string): void {
  getGtag()?.('event', 'search', { search_term: query })
}

/** User shares content */
export function trackShare(method: string, contentId: string): void {
  scoreShareClicked(method, contentId)
  getGtag()?.('event', 'share', {
    method,
    content_type: 'chapter',
    content_id: contentId,
  })
}

/** User downloads a PDF */
export function trackDownload(chapterId: string): void {
  getGtag()?.('event', 'file_download', {
    file_name: `${chapterId}.pdf`,
    file_extension: 'pdf',
  })
}

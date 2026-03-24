import { useEffect } from 'react'
import { identifyContact, isSubscribed } from '../../lib/hubspot'

/**
 * NewsletterPopup — CONSOLIDATED into ExitIntentCapture.
 *
 * This component no longer renders a popup. Instead, it performs a
 * one-time migration of any existing localStorage newsletter signups
 * into HubSpot so leads aren't lost. The actual exit-intent modal
 * is handled by ExitIntentCapture.tsx which is wired to HubSpot.
 */
export default function NewsletterPopup() {
  useEffect(() => {
    // Migrate any old localStorage-only signups to HubSpot
    try {
      const legacyEmails = JSON.parse(localStorage.getItem('veritas_newsletter') || '[]') as string[]
      if (legacyEmails.length > 0 && !isSubscribed()) {
        // Sync the most recent email to HubSpot
        const latestEmail = legacyEmails[legacyEmails.length - 1]
        if (latestEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(latestEmail)) {
          identifyContact({
            email: latestEmail,
            source: 'newsletter_legacy_migration',
            contentInterest: 'general',
            referrer: window.location.pathname,
          })
        }
        // Mark migration complete so we don't re-sync
        localStorage.removeItem('veritas_newsletter')
      }
    } catch {
      // Silently ignore migration errors
    }
  }, [])

  // Render nothing — exit-intent is handled by ExitIntentCapture
  return null
}

/**
 * Lightweight A/B Testing Framework for Veritas Press
 *
 * Zero dependencies. Uses localStorage for sticky assignment.
 * Fires GA4 custom events for variant tracking.
 * 
 * Usage:
 *   const variant = useExperiment('cta-copy', ['Join Us', 'Become a Member', 'Support the Record'])
 *   // variant = 'Join Us' | 'Become a Member' | 'Support the Record'
 *   // Assignment is sticky per user for the experiment's lifetime.
 *
 * Tracking:
 *   trackConversion('cta-copy', 'signup')
 *   // Fires GA4 event: experiment_conversion { experiment, variant, action }
 */

const STORAGE_PREFIX = 'veritas_ab_'

interface ExperimentConfig {
  /** Experiment name (kebab-case) */
  name: string
  /** Variant names — first is control */
  variants: string[]
  /** Traffic percentage (0-100) allocated to experiment. Default 100. */
  trafficPct?: number
}

/** Active experiments registry — add new experiments here */
export const EXPERIMENTS: ExperimentConfig[] = [
  {
    name: 'membership-cta-copy',
    variants: ['Join Us', 'Become a Member', 'Support Independent Research'],
    trafficPct: 100,
  },
  {
    name: 'donation-banner-style',
    variants: ['minimal', 'impact-stats', 'social-proof'],
    trafficPct: 100,
  },
]

/**
 * Get or assign a variant for an experiment.
 * Assignment is deterministic and sticky via localStorage.
 */
export function getVariant(experimentName: string, variants: string[]): string {
  if (!variants.length) return ''
  const key = STORAGE_PREFIX + experimentName
  try {
    const stored = localStorage.getItem(key)
    if (stored && variants.includes(stored)) return stored
  } catch {}
  // Assign randomly
  const idx = Math.floor(Math.random() * variants.length)
  const variant = variants[idx]
  try { localStorage.setItem(key, variant) } catch {}
  return variant
}

/**
 * Track an experiment impression (variant shown to user).
 * Call once per page view where the experiment is rendered.
 */
export function trackImpression(experimentName: string): void {
  const config = EXPERIMENTS.find(e => e.name === experimentName)
  if (!config) return
  const variant = getVariant(experimentName, config.variants)
  fireEvent('experiment_impression', experimentName, variant)
}

/**
 * Track a conversion event for an experiment.
 * Call when the user takes the desired action (signup, click, donate).
 */
export function trackConversion(experimentName: string, action: string): void {
  const config = EXPERIMENTS.find(e => e.name === experimentName)
  if (!config) return
  const variant = getVariant(experimentName, config.variants)
  fireEvent('experiment_conversion', experimentName, variant, action)
}

function fireEvent(eventName: string, experiment: string, variant: string, action?: string): void {
  const w = window as unknown as Record<string, unknown>
  if (typeof w.gtag !== 'function') return
  const gtag = w.gtag as (...args: unknown[]) => void
  const params: Record<string, string> = {
    experiment_name: experiment,
    experiment_variant: variant,
  }
  if (action) params.conversion_action = action
  gtag('event', eventName, params)
}

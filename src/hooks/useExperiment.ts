import { useMemo, useEffect } from 'react'
import { getVariant, trackImpression, EXPERIMENTS } from '../lib/abTest'

/**
 * React hook for A/B testing.
 * Returns the assigned variant string for the given experiment.
 * Automatically tracks an impression on mount.
 *
 * @param experimentName - Must match a name in EXPERIMENTS registry
 * @returns The assigned variant string, or the first variant as fallback
 */
export function useExperiment(experimentName: string): string {
  const config = EXPERIMENTS.find(e => e.name === experimentName)
  const variants = config?.variants ?? []

  const variant = useMemo(
    () => getVariant(experimentName, variants),
    [experimentName]
  )

  useEffect(() => {
    trackImpression(experimentName)
  }, [experimentName])

  return variant
}

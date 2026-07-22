/**
 * Integrity Score — power-profile public-record falsehood docket.
 *
 * Score starts at 100 and deducts only for **verified** documented falsehoods
 * (public statement + independent primary/authoritative contradiction).
 * Profiles without a compiled docket return `null` (not a fake 100).
 *
 * Editorial rule: disputed or opinion claims never affect the score.
 */

import type { DocumentedFalsehood, FalsehoodSeverity } from '../data/profileData'

export type { DocumentedFalsehood, FalsehoodSeverity }

export const FALSEHOOD_SEVERITY_DEDUCTION: Record<FalsehoodSeverity, number> = {
  minor: 8,
  material: 15,
  egregious: 25,
}

export const INTEGRITY_SCORE_MAX = 100

export interface IntegrityScoreResult {
  /** 0–100, or null when no docket has been compiled for this profile */
  score: number | null
  /** Verified falsehoods that actually reduced the score */
  scoredFalsehoods: DocumentedFalsehood[]
  /** All docket entries (including non-verified research rows) */
  docket: DocumentedFalsehood[]
  totalDeduction: number
  hasDocket: boolean
  label: string
  /** CSS-friendly band for color */
  band: 'unscored' | 'high' | 'moderate' | 'low' | 'critical'
}

export function getScoredFalsehoods(
  docket: DocumentedFalsehood[] | undefined | null,
): DocumentedFalsehood[] {
  if (!docket?.length) return []
  return docket.filter((f) => f.tier === 'verified')
}

/**
 * Compute integrity score from a compiled docket.
 * - `undefined` / omitted docket → null (not yet scored)
 * - empty array → 100 (docket compiled; no verified falsehoods on file)
 * - verified rows → 100 − severity deductions, floored at 0
 */
export function computeIntegrityScore(
  docket: DocumentedFalsehood[] | undefined | null,
): IntegrityScoreResult {
  if (docket == null) {
    return {
      score: null,
      scoredFalsehoods: [],
      docket: [],
      totalDeduction: 0,
      hasDocket: false,
      label: 'Not scored',
      band: 'unscored',
    }
  }

  const scoredFalsehoods = getScoredFalsehoods(docket)
  const totalDeduction = scoredFalsehoods.reduce(
    (sum, f) => sum + (FALSEHOOD_SEVERITY_DEDUCTION[f.severity] ?? 0),
    0,
  )
  const score = Math.max(0, INTEGRITY_SCORE_MAX - totalDeduction)

  let band: IntegrityScoreResult['band'] = 'high'
  if (score < 40) band = 'critical'
  else if (score < 60) band = 'low'
  else if (score < 80) band = 'moderate'

  const label =
    scoredFalsehoods.length === 0
      ? 'Clean docket'
      : scoredFalsehoods.length === 1
        ? '1 verified falsehood'
        : `${scoredFalsehoods.length} verified falsehoods`

  return {
    score,
    scoredFalsehoods,
    docket,
    totalDeduction,
    hasDocket: true,
    label,
    band,
  }
}

export function integrityBandColor(band: IntegrityScoreResult['band']): string {
  switch (band) {
    case 'high':
      return '#166534'
    case 'moderate':
      return '#92400E'
    case 'low':
      return '#9A3412'
    case 'critical':
      return '#991B1B'
    default:
      return '#6B7280'
  }
}

export function integrityBandBg(band: IntegrityScoreResult['band']): string {
  switch (band) {
    case 'high':
      return 'bg-[#F0FDF4] border-[#166534]/25 text-[#166534]'
    case 'moderate':
      return 'bg-[#FFFBEB] border-[#92400E]/25 text-[#92400E]'
    case 'low':
      return 'bg-[#FFF7ED] border-[#9A3412]/25 text-[#9A3412]'
    case 'critical':
      return 'bg-[#FEF2F2] border-[#991B1B]/25 text-[#991B1B]'
    default:
      return 'bg-surface border-border text-ink-muted'
  }
}

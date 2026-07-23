/**
 * Veritas Worldwide — Evidence-tier taxonomy
 * Used by The Record Volume I (subset) and The Record of Jesus Christ (full set).
 * Attribution: Veritas Worldwide only.
 */

/** Full scholarly taxonomy for pure evidentiary compilation. */
export type ScholarlyEvidenceTier =
  | 'verified'
  | 'well_attested'
  | 'circumstantial'
  | 'contested'
  | 'interpretive'
  | 'speculative'
  | 'literary_theological'

/** Legacy three-tier map used by Volume I chapter UI. */
export type LegacyEvidenceTier = 'verified' | 'circumstantial' | 'disputed'

export interface TierDisplay {
  id: ScholarlyEvidenceTier
  label: string
  shortLabel: string
  description: string
  icon: string
  colorVar: string
  bgVar: string
  borderVar: string
  /** Maps to Volume I legacy badge when needed. */
  legacyMap: LegacyEvidenceTier
}

export const SCHOLARLY_TIER_ORDER: ScholarlyEvidenceTier[] = [
  'verified',
  'well_attested',
  'circumstantial',
  'contested',
  'interpretive',
  'speculative',
  'literary_theological',
]

export const SCHOLARLY_TIERS: Record<ScholarlyEvidenceTier, TierDisplay> = {
  verified: {
    id: 'verified',
    label: 'Verified',
    shortLabel: 'Verified',
    description:
      'Multiple independent primary sources and/or physical/scientific corroboration with high confidence. Proof-grade within the domain of historical or scientific method.',
    icon: '✓',
    colorVar: 'var(--color-verified)',
    bgVar: 'var(--color-verified-bg)',
    borderVar: 'var(--color-verified-border)',
    legacyMap: 'verified',
  },
  well_attested: {
    id: 'well_attested',
    label: 'Well-Attested',
    shortLabel: 'Well-Attested',
    description:
      'Strong primary or early secondary attestation with limited contrary evidence. Not multi-source physical proof, but historically robust.',
    icon: '◆',
    colorVar: 'var(--color-well-attested)',
    bgVar: 'var(--color-well-attested-bg)',
    borderVar: 'var(--color-well-attested-border)',
    legacyMap: 'verified',
  },
  circumstantial: {
    id: 'circumstantial',
    label: 'Circumstantial',
    shortLabel: 'Circumstantial',
    description:
      'Indirect but coherent supporting evidence. Individual facts may be documented; the connection between them is inference.',
    icon: '◐',
    colorVar: 'var(--color-circumstantial)',
    bgVar: 'var(--color-circumstantial-bg)',
    borderVar: 'var(--color-circumstantial-border)',
    legacyMap: 'circumstantial',
  },
  contested: {
    id: 'contested',
    label: 'Contested / Scholarly Debate',
    shortLabel: 'Contested',
    description:
      'Significant disagreement among qualified specialists. Multiple positions are presented with evidence weights; consensus is not certainty.',
    icon: '⇄',
    colorVar: 'var(--color-contested)',
    bgVar: 'var(--color-contested-bg)',
    borderVar: 'var(--color-contested-border)',
    legacyMap: 'disputed',
  },
  interpretive: {
    id: 'interpretive',
    label: 'Interpretive Analysis',
    shortLabel: 'Interpretive',
    description:
      'Reasoned reconstruction that goes beyond raw data. Labeled as analysis, not as primary fact.',
    icon: '◇',
    colorVar: 'var(--color-interpretive)',
    bgVar: 'var(--color-interpretive-bg)',
    borderVar: 'var(--color-interpretive-border)',
    legacyMap: 'circumstantial',
  },
  speculative: {
    id: 'speculative',
    label: 'Speculative / Unverifiable',
    shortLabel: 'Speculative',
    description:
      'Hypothesis or tradition lacking sufficient primary or physical support for historical or scientific assertion.',
    icon: '?',
    colorVar: 'var(--color-speculative)',
    bgVar: 'var(--color-speculative-bg)',
    borderVar: 'var(--color-speculative-border)',
    legacyMap: 'disputed',
  },
  literary_theological: {
    id: 'literary_theological',
    label: 'Literary / Theological Development',
    shortLabel: 'Literary-Theological',
    description:
      'Later interpretive, liturgical, or doctrinal elaboration. Never presented as historical or scientific fact.',
    icon: '†',
    colorVar: 'var(--color-literary)',
    bgVar: 'var(--color-literary-bg)',
    borderVar: 'var(--color-literary-border)',
    legacyMap: 'disputed',
  },
}

export function tierLabel(tier: ScholarlyEvidenceTier): string {
  return SCHOLARLY_TIERS[tier].label
}

export function isProofGrade(tier: ScholarlyEvidenceTier): boolean {
  return tier === 'verified' || tier === 'well_attested'
}

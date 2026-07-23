/**
 * Interval 16 claim wave — deepening controls past 209.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'

interface RocSource {
  id: string
  citation: string
  url?: string
  kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific'
}

interface RocClaim {
  id: string
  claim: string
  detail: string
  tier: ScholarlyEvidenceTier
  proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'
  sources: RocSource[]
  confidenceNote?: string
}

export const ROC_WAVE13_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-cmb-polarization',
      claim:
        'CMB polarization (E-modes; B-mode searches) provides independent cosmological information beyond temperature anisotropies alone.',
      detail:
        'E-modes are detected and constrain reionization and lensing. Primordial B-modes remain a search target for inflationary gravitational waves.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'planck-pol',
          citation: 'Planck Collaboration polarization papers; BICEP/Keck program summaries.',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-babylonian-chronicle-jerusalem',
      claim:
        'Babylonian Chronicle entries record Nebuchadnezzar’s campaigns against Judah, including the 597 BCE deportation horizon.',
      detail:
        'Primary extra-biblical control for late monarchic Judah’s fall sequence. Complements 2 Kings without verifying every prophetic detail.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'grayson-abc',
          citation: 'Grayson, A.K. Assyrian and Babylonian Chronicles. Eisenbrauns/T.H.P., reprints.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-pompey-63',
      claim:
        'Pompey’s intervention in Judea (63 BCE) brought Hasmonean civil conflict under Roman arbitration and began lasting Roman overlordship.',
      detail:
        'Josephus primary narrative. Sets the imperial frame for later prefects and client kings including Herod and Antipas.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'jos-pompey',
          citation: 'Josephus, Antiquities 14; War 1 (Pompey narrative).',
          kind: 'primary',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-exorcism-reputation',
      claim:
        'Exorcism / spirit-expulsion is multiply attested as a public activity associated with Jesus in Synoptic tradition and is treated by many historians as a characteristic reputation.',
      detail:
        'Historical reputation ≠ modern ontological claim about spirits. Method separates report of activity from supernatural metaphysics.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'twelftree-exorcism',
          citation: 'Twelftree, G.H. Jesus the Exorcist. Mohr Siebeck / Hendrickson.',
          kind: 'peer_reviewed',
        },
        {
          id: 'meier-vol2-exorcism',
          citation: 'Meier, J.P. A Marginal Jew, Vol. 2 (miracles / exorcism discussions).',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-family-1-13',
      claim:
        'Medieval Greek manuscript families (e.g., Family 1, Family 13) show structured textual relationships useful for genealogical criticism beyond simple “majority count.”',
      detail:
        'Classical stemmatic groupings still inform work alongside CBGM for some textual units.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'lake-family1',
          citation: 'Lake, K. Codex 1 of the Gospels and its Allies; Family 13 studies.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-tacitus-context',
      claim:
        'Tacitus Annals 15.44 places Christus’s execution under Tiberius by procurator Pontius Pilate within a Nero-era persecution narrative.',
      detail:
        'Important Roman literary control. Textual transmission of Annals is medieval; authenticity of 15.44 is widely accepted among classicists with standard caveats.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'tacitus-ann15-detail',
          citation: 'Tacitus, Annals 15.44 (Teubner/OCT/Loeb); Van Voorst survey.',
          kind: 'primary',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-yodefat',
      claim:
        'Yodefat (Jotapata) siege archaeology correlates with Josephus’s First Revolt narrative and illustrates Galilean war destruction layers.',
      detail:
        'Useful for post-66 CE trauma context. Not a Jesus-lifetime ministry site control.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'adi-yodefat',
          citation: 'Adi Erlich / Yodefat excavation literature; Josephus War 3.',
          kind: 'survey',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-quadratus',
      claim:
        'Quadratus’s apology (early 2nd c.), preserved in fragment via Eusebius, claims some healed/raised by Jesus lived into later times — early apologetic tradition, not contemporary medical record.',
      detail:
        'Reception history of miracle claims. Method: report as early Christian assertion, not VERIFIED medical history.',
      tier: 'circumstantial',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'eusebius-quadratus',
          citation: 'Eusebius, HE 4.3 (Quadratus fragment).',
          kind: 'primary',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-contextual-credibility',
      claim:
        'Contextual credibility / historical plausibility criteria ask whether a tradition fits first-century Jewish Palestine — necessary but not sufficient for authenticity.',
      detail:
        'Method hygiene: fit can support or fail a reconstruction but does not alone prove an individual saying.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'theissen-plausible',
          citation: 'Theissen, G. & Winter, D. The Quest for the Plausible Jesus.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],
}

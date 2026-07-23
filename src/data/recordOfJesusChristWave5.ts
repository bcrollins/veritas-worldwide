/**
 * Interval 8 claim wave — manuscript depth, archaeology, and method hygiene.
 * Attribution: Veritas Worldwide only.
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

export const ROC_WAVE5_CLAIMS: Record<string, RocClaim[]> = {
  'nt-textual-criticism': [
    {
      id: 'nt-p46-paul',
      claim: 'Papyrus P46 is among the earliest substantial collections of Pauline letters (typically dated late 2nd / early 3rd century CE).',
      detail:
        'Chester Beatty / Michigan holdings. Critical for early Pauline textual history; exact paleographic bounds remain ranges.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'kenyon-p46', citation: 'Kenyon / Chester Beatty Biblical Papyri editions; INTF Liste P46.', kind: 'critical_edition' },
      ],
    },
    {
      id: 'nt-codex-alexandrinus',
      claim: 'Codex Alexandrinus (A 02, 5th c.) is a major early nearly complete Greek Bible witness held by the British Library.',
      detail:
        'Foundational for both OT Greek and NT textual criticism alongside ℵ B.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'bl-alexandrinus', citation: 'British Library — Codex Alexandrinus digital collections.', kind: 'museum' },
      ],
    },
  ],
  'historical-jesus': [
    {
      id: 'hj-parables',
      claim: 'Parables form a characteristic teaching form in the Synoptic tradition and are widely treated as a historically distinctive feature of Jesus’ public speech.',
      detail:
        'Inventory and authenticity of individual parables vary by criterion sets. Form is better attested than any single story’s ipsissima verba.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'jeremias-parables', citation: 'Jeremias, J. The Parables of Jesus (classic).', kind: 'survey' },
        { id: 'scott-parables', citation: 'Scott, B.B. Hear Then the Parable. Fortress, 1989.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-apocalyptic',
      claim: 'Whether Jesus is best reconstructed as primarily apocalyptic prophet (Schweitzer trajectory) or sapiential/ethical teacher remains a major scholarly divide.',
      detail:
        'Both poles cite Synoptic materials. Contested interpretive frame, not a manuscript fact.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'allison-apocalyptic', citation: 'Allison, D.C. Jesus of Nazareth: Millenarian Prophet. Fortress, 1998.', kind: 'peer_reviewed' },
        { id: 'borg-jesus', citation: 'Borg, M. Jesus: A New Vision (sapiential trajectory).', kind: 'survey' },
      ],
    },
  ],
  'levantine-archaeology': [
    {
      id: 'arch-bethsaida',
      claim: 'Bethsaida identification and Early Roman occupation layers are active archaeological research topics relevant to Galilee Gospel geography.',
      detail:
        'Site debates (et-Tell vs. el-Araj) illustrate limits of toponym certainty. Contextual, not proof of specific miracles.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'arav-bethsaida', citation: 'Arav, R. / Notley, R.S. Bethsaida excavations literature.', kind: 'survey' },
      ],
    },
  ],
  'second-temple': [
    {
      id: 'st-mikvaot',
      claim: 'Stepped ritual baths (miqva’ot) are archaeologically widespread in late Second Temple Judea and Galilee, evidencing purity practice infrastructure.',
      detail:
        'Supports social-religious context for purification language in early Jewish and Christian sources without proving specific Gospel episodes.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'reich-mikveh', citation: 'Reich, R. studies on miqva’ot in Jerusalem / Judea.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'modern-scholarship': [
    {
      id: 'mod-open-access-trend',
      claim: 'Open digital libraries (INTF NT.VMR, IAA DSS, British Library codices) have lowered barriers to primary manuscript inspection since the 2010s.',
      detail:
        'Access improvement is documented; interpretive disagreements remain. Good for E-E-A-T and researcher utility.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'ntvmr', citation: 'INTF New Testament Virtual Manuscript Room.', url: 'https://ntvmr.uni-muenster.de/', kind: 'critical_edition' },
      ],
    },
  ],
  cosmology: [
    {
      id: 'cosmo-recombination',
      claim: 'CMB photons free-stream from the surface of last scattering at recombination (~z ≈ 1090 in standard ΛCDM).',
      detail:
        'Textbook standard cosmology. Reported as model-frame science, not theology.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'planck-cosmo', citation: 'Planck Collaboration cosmological parameter papers (2018/2020).', kind: 'scientific' },
      ],
    },
  ],
}

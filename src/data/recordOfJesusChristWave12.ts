/**
 * Interval 15 claim wave — beyond 200: Rome, text families, and method.
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

export const ROC_WAVE12_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-dark-matter-status',
      claim:
        'Multiple independent lines (galaxy rotation curves, cluster lensing, CMB acoustic peaks) favor a non-baryonic dark matter component within ΛCDM.',
      detail:
        'Particle identity remains unknown. Framework status is science_model; not a theological claim.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'bertone-dark-matter',
          citation: 'Bertone, G. & Hooper, D. “History of dark matter.” Rev. Mod. Phys. 90 (2018).',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-hezekiah-bulla',
      claim:
        'Bullae and seals naming Hezekiah (and debated related officials) provide epigraphic controls for late-8th-century Judah’s royal administration.',
      detail:
        'Material onomastics corroborate a royal name known from Kings/Isaiah. They do not verify every narrative episode.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'mazar-bullae',
          citation: 'Mazar, E. Ophel excavations publications; IAA seal/bulla catalogues.',
          kind: 'survey',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-hasmonean-period',
      claim:
        'The Hasmonean period (2nd–1st c. BCE) established Jewish political autonomy later dismantled under Roman client and provincial rule — essential pre-history for first-century Judea.',
      detail:
        'Josephus and archaeology (e.g., Hasmonean fortifications, coins) control the broad outline. Not a Jesus biography source.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'schwartz-imperialism',
          citation: 'Schwartz, S. Imperialism and Jewish Society. Princeton UP, 2001.',
          kind: 'peer_reviewed',
        },
        {
          id: 'jos-hasmoneans',
          citation: 'Josephus, Antiquities 12–14 (Hasmonean narrative).',
          kind: 'primary',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-prayer-abba',
      claim:
        'The address “Abba” in Mark 14:36 and Pauline usage (Rom 8:15; Gal 4:6) is often cited in debates about Jesus’ prayer language; over-claims about uniqueness are contested.',
      detail:
        'Aramaic address to God as father is significant for piety history; “unique intimacy” popularizations require critical restraint.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        {
          id: 'jeremias-abba',
          citation: 'Jeremias, J. The Prayers of Jesus (classic claim); subsequent critiques in HJ literature.',
          kind: 'survey',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-versional-evidence',
      claim:
        'Early versions (Old Latin, Syriac, Coptic) are independent textual witnesses that can preserve early readings not always visible in later Greek majority streams.',
      detail:
        'Versional evidence requires reverse translation caution. Still essential in ECM/NA apparatuses.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'metzger-versions',
          citation: 'Metzger, B.M. The Early Versions of the New Testament. Clarendon, 1977.',
          kind: 'survey',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-lucian-peregrinus',
      claim:
        'Lucian of Samosata (2nd c.) satirizes Christians in The Passing of Peregrinus, treating Christ as a crucified “sophist” founder of a cult.',
      detail:
        'Hostile literary attestation of Christian memory of a crucified founder. Satire genre; not independent biography.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'lucian-peregrinus',
          citation: 'Lucian, De Morte Peregrini (critical editions; ET Harmon Loeb).',
          kind: 'primary',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-gamla',
      claim:
        'Gamla (Golan) destruction in the First Jewish Revolt is archaeologically and literarily documented (Josephus), illustrating Galilee/Golan war archaeology.',
      detail:
        'Context for revolt-era trauma shaping Jewish and Christian memory after 70. Not a Gospel setting for Jesus’ lifetime ministry core.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'syon-gamla',
          citation: 'Syon, D. / Gamla excavation reports; Josephus War 4.',
          kind: 'survey',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-papias',
      claim:
        'Papias of Hierapolis (early 2nd c.), preserved in fragments via Eusebius, offers early traditions about Mark and Matthew’s composition — valuable and debated.',
      detail:
        'Second-hand via Eusebius. Classic source for Gospel origins traditions; reliability contested case-by-case.',
      tier: 'circumstantial',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'eusebius-papias',
          citation: 'Eusebius, HE 3.39 (Papias fragments).',
          kind: 'primary',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-multiple-attestation-limits',
      claim:
        'Multiple attestation increases historical confidence when sources are independent; Synoptic dependence and shared traditions limit independence assumptions.',
      detail:
        'Method hygiene: count independent streams carefully (Mark, Q-or-Matthew/Luke special, John, Paul, Josephus).',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'porter-criteria-ma',
          citation: 'Porter, S.E. The Criteria for Authenticity in Historical-Jesus Research.',
          kind: 'survey',
        },
      ],
    },
  ],
}

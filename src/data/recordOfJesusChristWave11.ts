/**
 * Interval 14 claim wave — Dewey decimal depth on text, Rome, and method.
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

export const ROC_WAVE11_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-inflation-status',
      claim:
        'Cosmic inflation is the leading early-universe paradigm for flatness and horizon problems; direct detection of primordial B-mode polarization remains an active observational goal.',
      detail:
        'Model status: widely used, not laboratory “closed.” Report as science_model research frontier without teleology.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'guth-inflation',
          citation: 'Guth, A.H. “Inflationary universe…” Phys. Rev. D 23 (1981); Planck inflation papers.',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-amarna-letters',
      claim:
        'The Amarna letters (14th c. BCE) document Late Bronze Canaanite-Egyptian diplomacy and conflict language used in comparative ANE historical method.',
      detail:
        'Primary archive for Late Bronze Levant politics. Not a direct control for Iron Age Israel’s founding narratives, but foundational for region-scale historiography.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'moran-amarna',
          citation: 'Moran, W.L. The Amarna Letters. Johns Hopkins UP, 1992.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-herod-antipas',
      claim:
        'Herod Antipas ruled Galilee and Perea as tetrarch (4 BCE–39 CE); Josephus and coins document his rule and cities (Tiberias; Sepphoris reconstruction).',
      detail:
        'Political frame for Jesus’ Galilean ministry. Specific Gospel courtroom scenes remain literary-historical reconstructions.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'jos-antipas',
          citation: 'Josephus, Antiquities 18; War 2 (Antipas passages).',
          kind: 'primary',
        },
        {
          id: 'jensen-antipas',
          citation: 'Jensen, M.H. Herod Antipas in Galilee. Mohr Siebeck, 2006.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-disciples-twelve',
      claim:
        'A circle of close followers including a group remembered as “the Twelve” is multiply attested; exact membership lists vary slightly across Gospels.',
      detail:
        'Social core of the movement is well attested; individual name-list variants are text-critical and tradition-history issues.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'meier-twelve',
          citation: 'Meier, J.P. A Marginal Jew, Vol. 3 (companions / Twelve).',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-harmonie-readings',
      claim:
        'Harmonization among Synoptic parallels is a recognized scribal tendency that can produce secondary agreements in later manuscripts.',
      detail:
        'Classic TC category. Explains some variant clusters without requiring theological conspiracy models.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'fee-harmonization',
          citation: 'Fee, G.D. essays on harmonization; Metzger Textual Commentary introductions.',
          kind: 'survey',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-suetonius-chrestus',
      claim:
        'Suetonius (Claudius 25) mentions disturbances in Rome under Claudius involving “Chrestus” — identification with Christ/Christians is possible but contested.',
      detail:
        'Ambiguous onomastic evidence. Do not treat as secure independent biography of Jesus.',
      tier: 'circumstantial',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'suetonius-claudius',
          citation: 'Suetonius, Divus Claudius 25; Van Voorst discussion.',
          kind: 'primary',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-tiberias',
      claim:
        'Tiberias, founded by Antipas on the Sea of Galilee, is archaeologically and literarily documented as a Herodian urban center.',
      detail:
        'Urban context for first-century Galilee. Gospel narratives more often set in smaller towns; Tiberias frames elite Antipas rule.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'tiberias-excavations',
          citation: 'Hirschfeld, Y. / later Tiberias excavation reports; Josephus Life / Antiquities.',
          kind: 'survey',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-barnabas',
      claim:
        'The Epistle of Barnabas (late 1st / early 2nd c.) allegorizes Hebrew Bible law and shows early Christian supersessionist interpretation.',
      detail:
        'Reception history of Christian scriptural reading. Not a source for the historical Jesus’ lifetime practices.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'barnabas-af',
          citation: 'Epistle of Barnabas in Apostolic Fathers editions (Holmes).',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-criterion-embarrassment-limits',
      claim:
        'The criterion of embarrassment is heuristic and circular if “embarrassing” is defined by later Christian theology rather than first-century Jewish context.',
      detail:
        'Method hygiene card for HJ readers. Useful when carefully applied; not a proof engine.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'theissen-winter-crit',
          citation: 'Theissen, G. & Winter, D. The Quest for the Plausible Jesus.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],
}

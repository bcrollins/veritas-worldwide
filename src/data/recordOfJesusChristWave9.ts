/**
 * Interval 12 claim wave — canon lists, Galilee economy, and apparatus hygiene.
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

export const ROC_WAVE9_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-structure-formation',
      claim:
        'Large-scale structure (galaxy clustering, weak lensing) provides independent ΛCDM tests complementary to the CMB and BAO.',
      detail:
        'Survey programs (DES, KiDS, HSC, Euclid-era analyses) constrain matter clustering amplitude. Report as science status; not theology.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'des-y3',
          citation: 'DES Collaboration Year-3 cosmology papers; related weak-lensing surveys.',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-kuntillet-ajrud',
      claim:
        'Inscriptions from Kuntillet ‘Ajrud include blessing formulae pairing Yahweh with other divine names — key data for Israelite religion debates.',
      detail:
        'Primary epigraphy for popular/local religion in the Iron Age. Interpretation (polytheism vs. localized epithets) is contested; the texts exist as physical finds.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'meshel-ajrud',
          citation: 'Meshel, Z. Kuntillet ‘Ajrud (Ḥorvat Teman). Israel Exploration Society, 2012.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-elephantine',
      claim:
        'Elephantine papyri document a Jewish military colony in Egypt (5th c. BCE) with a local temple of YHW and correspondence with Jerusalem/Samaria authorities.',
      detail:
        'Major control for diaspora Judaism and temple practice outside Jerusalem. Chronologically pre-Jesus; foundational Second Temple context.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'porten-elephantine',
          citation: 'Porten, B. et al. The Elephantine Papyri in English. Brill / Society of Biblical Literature.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-galilee-economy',
      claim:
        'Galilee under Antipas was an agrarian and fishing economy with urbanization at Sepphoris and Tiberias; Jesus traditions sit in that social landscape.',
      detail:
        'Archaeology and Josephus frame context. Specific economic readings of parables (debt, day laborers) are reconstructions with scholarly disagreement.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'reed-galilee',
          citation: 'Reed, J.L. Archaeology and the Galilean Jesus. Trinity Press International, 2000.',
          kind: 'peer_reviewed',
        },
        {
          id: 'freyne-galilee',
          citation: 'Freyne, S. Galilee and Gospel. Mohr Siebeck / Fortress essays.',
          kind: 'survey',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-orthodox-corruption',
      claim:
        'Bart Ehrman’s “orthodox corruption” thesis argues some early scribes altered texts in christologically charged passages; magnitude and intent remain debated.',
      detail:
        'Important method debate. Even critics of Ehrman accept that theological motives can influence some variants; case-by-case apparatus work is required.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        {
          id: 'ehrman-corruption',
          citation: 'Ehrman, B.D. The Orthodox Corruption of Scripture. Oxford UP, 1993 (2nd ed. 2011).',
          kind: 'peer_reviewed',
        },
        {
          id: 'wallace-response',
          citation: 'Wallace, D.B. / other responses in TC literature reviewing Ehrman’s case studies.',
          kind: 'survey',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-mara-bar-serapion',
      claim:
        'The Mara bar Serapion letter (Syriac; date debated, often 1st–3rd c.) may allude to a “wise king” of the Jews executed by his people — identification with Jesus is uncertain.',
      detail:
        'Possible non-Christian allusion at best. Chronology and referent contested; do not treat as secure HJ control.',
      tier: 'circumstantial',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'vanvoorst-mara',
          citation: 'Van Voorst, R.E. Jesus Outside the New Testament (Mara bar Serapion discussion).',
          kind: 'survey',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-magdala-synagogue',
      claim:
        'A first-century synagogue at Magdala (Migdal) on the Sea of Galilee is excavated and published, expanding evidence for Galilean synagogue architecture.',
      detail:
        'Contextualizes Gospel synagogue settings. Does not prove specific Gospel episodes occurred in that building.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'magdala-excavations',
          citation: 'Magdala Project / IAA publications on the Magdala synagogue and stone.',
          kind: 'survey',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-melito-passover',
      claim:
        'Melito of Sardis’s Peri Pascha (2nd c.) is an early Christian paschal homily with high christology and anti-Jewish rhetoric — reception history, not HJ primary data.',
      detail:
        'Useful for second-century Christian interpretation of Passover and Jesus. Hostile framing of Judaism is historical evidence of conflict, not of first-century events.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'melito-pascha',
          citation: 'Melito of Sardis, On Pascha (critical editions; ET Hall / Stewart-Sykes).',
          kind: 'primary',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-third-quest',
      claim:
        'The “Third Quest” emphasizes Jesus’ Jewish context (Sanders, Vermes, Meier, Wright, Crossan, et al.) against earlier de-Judaizing portraits.',
      detail:
        'Historiographical label with porous boundaries. Useful for readers; not a single school with uniform conclusions.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'theissen-merz-quest',
          citation: 'Theissen, G. & Merz, A. The Historical Jesus: A Comprehensive Guide.',
          kind: 'survey',
        },
      ],
    },
  ],
}

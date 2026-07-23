/**
 * Interval 18 claim wave — continuous corpus growth past 227.
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

export const ROC_WAVE15_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-reionization',
      claim:
        'CMB optical depth and high-z galaxy surveys constrain the epoch of reionization when the first stars ionized the intergalactic medium.',
      detail:
        'Active observational frontier within ΛCDM + astrophysics. Science_model reporting only.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'planck-tau', citation: 'Planck Collaboration optical depth τ constraints; JWST high-z galaxy papers (ongoing).', kind: 'scientific' },
      ],
    },
  ],
  'ancient-near-east': [
    {
      id: 'ane-ekron-inscription',
      claim:
        'The Ekron royal dedicatory inscription names Philistine rulers and a temple of Ptgyh — primary control for Iron Age Philistine urban religion and politics.',
      detail:
        'Archaeological primary text. Comparative for Judges/Samuel Philistine setting without equating every biblical episode.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'gitin-ekron', citation: 'Gitin, S., Dothan, T., Naveh, J. Ekron inscription publications.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'second-temple': [
    {
      id: 'st-alexander-jannaeus',
      claim:
        'Alexander Jannaeus (Hasmonean king-priest) is documented in Josephus and coins; his reign illustrates internal Judean conflict before Roman dominance.',
      detail:
        'Political-religious background for later Second Temple tensions. Not a Jesus-source directly.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'jos-jannaeus', citation: 'Josephus, Antiquities 13; War 1; Hasmonean coinage catalogues.', kind: 'primary' },
      ],
    },
  ],
  'historical-jesus': [
    {
      id: 'hj-tax-collectors',
      claim:
        'Association with tax collectors / toll collectors is multiply attested and often treated as historically characteristic of Jesus’ social practice (table fellowship theme).',
      detail:
        'Social-historical reconstruction with strong Synoptic support; exact economics of toll farming vary by locale.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'donahue-tax', citation: 'Donahue, J.R. tax collector studies; Sanders, Jesus and Judaism.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'nt-textual-criticism': [
    {
      id: 'nt-itacism',
      claim:
        'Itacism and vowel interchange are common Greek scribal phenomena that generate many orthographic variants without semantic change.',
      detail:
        'Method hygiene: distinguish spelling noise from meaningful textual differences in apparatus reading.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'gignac-grammar', citation: 'Gignac, F.T. A Grammar of the Greek Papyri of the Roman and Byzantine Periods (phonology).', kind: 'survey' },
      ],
    },
  ],
  'non-christian-attestation': [
    {
      id: 'nc-galen-christians',
      claim:
        'Galen (2nd c.) makes brief remarks on Christians as a philosophical school/sect — hostile/neutral medical-philosopher notice of a known group.',
      detail:
        'Secondary for Christian social presence in the empire; not a Jesus biography control.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'walzer-galen', citation: 'Walzer, R. Galen on Jews and Christians. Oxford, 1949.', kind: 'survey' },
      ],
    },
  ],
  'levantine-archaeology': [
    {
      id: 'arch-kursi',
      claim:
        'Kursi (traditional Gergesa/Gadara region) has a Byzantine monastery commemorating the swine miracle tradition — reception archaeology, not first-century proof of the miracle.',
      detail:
        'Method: distinguish pilgrimage architecture from historical event verification.',
      tier: 'interpretive',
      proofVsConcept: 'tradition',
      sources: [
        { id: 'tsafrir-kursi', citation: 'Tsafrir, Y. / Kursi excavation and pilgrimage site literature.', kind: 'survey' },
      ],
    },
  ],
  'early-christian-literature': [
    {
      id: 'ec-martyrdom-polycarp',
      claim:
        'The Martyrdom of Polycarp (mid-2nd c. traditions) is an early Christian martyr narrative shaping later hagiography.',
      detail:
        'Reception history of Christian identity under persecution. Not HJ primary data.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'polycarp-martyrdom', citation: 'Martyrdom of Polycarp in Apostolic Fathers / acts of the martyrs editions.', kind: 'critical_edition' },
      ],
    },
  ],
  'modern-scholarship': [
    {
      id: 'mod-criteria-coherence-limits',
      claim:
        'Coherence criteria risk circularity: they test sayings against a reconstructed “core Jesus” that itself depends on prior authentications.',
      detail:
        'Method hygiene already signaled in earlier cards; restate for reader clarity as corpus grows.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'keith-criteria-end', citation: 'Keith, C. & Le Donne, A., eds. Jesus, Criteria, and the Demise of Authenticity.', kind: 'peer_reviewed' },
      ],
    },
  ],
}

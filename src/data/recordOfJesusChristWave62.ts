/**
 * Interval claim wave — wave62.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE62_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-baryon-acoustic-scale-rs',
    claim: 'The comoving sound horizon r_s at the drag epoch is the BAO standard ruler; late-time BAO surveys measure D_M(z)/r_d and D_H(z)/r_d rather than absolute distances without an external early-universe calibration or pure geometry assumptions.',
    detail: 'Method hygiene for distance ladders that mix CMB-calibrated r_d with late BAO ratios.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'desi-rd-scale', citation: 'DESI Collaboration BAO methodology papers; Eisenstein & Hu sound-horizon theory.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-black-obelisk-jehu-image',
    claim: 'The Black Obelisk of Shalmaneser III (British Museum) depicts a kneeling figure labeled as Jehu of Israel bringing tribute — the only known contemporary image claimed to represent an Israelite/Judahite king named in the Hebrew Bible.',
    detail: 'Primary Assyrian visual/epigraphic evidence; biblical narrative correlation remains interpretive at the margins of regnal chronology.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'bm-black-obelisk', citation: 'British Museum Black Obelisk; ANET; Grabbe Ancient Israel surveys.', kind: 'museum', url: 'https://www.britishmuseum.org/collection/object/W_1848-1104-1' }],
  }],
  'second-temple': [{
    id: 'st-philo-legatio-caligula-crisis',
    claim: 'Philo’s Embassy to Gaius (Legatio ad Gaium) is a primary Jewish account of the Caligula crisis over the proposed statue in the Jerusalem Temple — critical context for mid-first-century Judean politics under Rome.',
    detail: 'Primary literary source with rhetorical aims; dates and audience require critical reading.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-legatio', citation: 'Philo, Legatio ad Gaium (Loeb/Colson); Smallwood / later Philo studies.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-multiple-attestation-limits',
    claim: 'Multiple attestation (independent sources sharing a tradition) raises relative likelihood but can reflect shared earlier sources, oral streams, or later harmonization — it is not automatic proof of discrete historical events.',
    detail: 'Criterion hygiene card adjacent to embarrassment and coherence method notes.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'theissen-multiple', citation: 'Theissen & Winter criteria history; Keith/Le Donne method volumes.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-cbgm-coherence-based',
    claim: 'The Coherence-Based Genealogical Method (CBGM) used in the Editio Critica Maior models textual flow among witnesses without assuming a simple tree stemma — a major shift from classical Lachmannian genealogy for the Greek NT.',
    detail: 'Method status for ECM/INTF work; unit-by-unit results still require apparatus reading.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'mink-cbgm', citation: 'Mink CBGM papers; INTF ECM introductions; Wasserman/Gurry CBGM handbook.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-lucian-peregrinus-christians',
    claim: 'Lucian of Samosata’s Passing of Peregrinus satirizes Christians who revere a crucified sophist in Palestine — a second-century pagan literary notice of Christian devotion, not an independent biography of Jesus.',
    detail: 'Genre: satire. Useful for reception of Christian claims; weak as HJ source-critical data.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'lucian-peregrinus', citation: 'Lucian, De Morte Peregrini; Van Voorst Jesus Outside the New Testament.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-masada-roman-camps',
    claim: 'The Roman F-series camps and circumvallation works at Masada form a primary landscape of the Flavian siege system, independent of every narrative detail in Josephus War 7.',
    detail: 'Archaeological landscape fact vs. every narrative detail in Josephus are distinct evidentiary layers.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'yadin-masada', citation: 'Yadin Masada publications; subsequent IAA/expedition reports; Josephus War 7.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-polycarp-martyrdom-genre',
    claim: 'The Martyrdom of Polycarp (mid–late 2nd c.) is among the earliest Christian martyr acts; its genre blends historical report and edifying narrative and must be weighed accordingly.',
    detail: 'Reception and martyrdom literature; not a first-generation HJ source.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'mart-polycarp', citation: 'Martyrdom of Polycarp (Holmes Apostolic Fathers); Dehandschutter / later studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-brown-death-messiah',
    claim: 'Raymond E. Brown’s The Death of the Messiah remains a standard multi-volume historical and literary commentary on the passion narratives, modeling exhaustive source-critical engagement without reducing theology to history uncritically.',
    detail: 'Historiographic landmark for passion research; individual conclusions remain scholarly debate.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'brown-death-messiah', citation: 'Brown, R.E. The Death of the Messiah (Anchor Bible Reference).', kind: 'survey' }],
  }],
}

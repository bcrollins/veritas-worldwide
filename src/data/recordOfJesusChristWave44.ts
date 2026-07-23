/**
 * Interval 47 claim wave — wave44.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE44_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-cmb-e-mode-polarization',
    claim: 'CMB E-mode polarization has been measured by multiple experiments and tightly constrains reionization optical depth and lensing potential within ΛCDM.',
    detail: 'Complements B-mode search cards; E-modes are established detections. Science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-emode', citation: 'Planck Collaboration polarization papers; WMAP/SPT/ACT E-mode results.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-ophel-inscription-fragment',
    claim: 'Hebrew inscription fragments from the Ophel excavations (including early alphabetic pieces) contribute to debates on literacy and administration in Iron Age Jerusalem.',
    detail: 'Fragmentary epigraphy; historical synthesis (state formation timelines) remains contested.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'mazar-ophel-inscr', citation: 'Mazar, E. Ophel excavations inscription reports; subsequent epigraphic discussions.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-temple-warning-inscription',
    claim: 'The Temple balustrade warning inscription (soreg) forbids Gentiles to enter the inner courts on pain of death — a primary Greek epigraphic control for Temple spatial purity rules.',
    detail: 'Museum/epigraphic primary; frames Acts 21 purity conflict context without proving that narrative’s details.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'soreg-inscription', citation: 'Temple warning inscription (Istanbul Archaeology Museums / partial fragments); Bickerman / subsequent discussions.', kind: 'museum' }],
  }],
  'historical-jesus': [{
    id: 'hj-kingdom-present-future',
    claim: 'Critical reconstructions disagree whether Jesus’ kingdom proclamation was primarily present, future, or both (“already/not yet”); the tension is a central HJ interpretive debate.',
    detail: 'Interpretive frame debate — not a single VERIFIED laboratory fact about ontology of the kingdom.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'dunn-kingdom', citation: 'Dunn, Jesus Remembered; Allison, Constructing Jesus; Sanders, Jesus and Judaism (kingdom discussions).', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-lectionary-text-type',
    claim: 'Greek Gospel lectionaries form a large medieval witness class with distinctive textual profiles; they are valuable but secondary to continuous-text majuscules/minuscules for initial-text work.',
    detail: 'Complements earlier lectionary cards with text-type/method placement.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'ometto-lect', citation: 'Osburn / Jordan lectionary studies; Aland categories; INTF Liste lectionary entries.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-celsus-true-doctrine-title',
    claim: 'Celsus’s work is conventionally titled True Doctrine (Alēthēs Logos); the title and structure are reconstructed primarily from Origen’s quotations rather than a complete pagan manuscript.',
    detail: 'Source-preservation method card for all Celsus-dependent claims.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'hoffmann-title', citation: 'Hoffmann, Celsus On the True Doctrine; Chadwick Origen Contra Celsum introduction.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-herodium-lower-palace',
    claim: 'Herodium’s lower palace and pool complex document Herodian luxury architecture at monumental scale beyond the hilltop fortress cylinder.',
    detail: 'Complements Herodium tomb-debate card with lower-complex architecture focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'netzer-lower-herodium', citation: 'Netzer, The Architecture of Herod / Herodium lower palace reports.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-justin-first-apology-eucharist',
    claim: 'Justin’s First Apology describes Sunday assembly with readings, prayer, and eucharistic thanksgiving — mid-2nd-century evidence of Christian worship structure.',
    detail: 'Reception of liturgy; not a transcript of the Last Supper historical meal.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'justin-1apol-65', citation: 'Justin, 1 Apology 65–67 (critical editions; ET Falls/Barnard).', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-new-perspective-paul',
    claim: 'The “New Perspective on Paul” (Sanders, Dunn, Wright and interlocutors) reinterprets Second Temple Judaism and Paul’s relation to Torah against Lutheran law/gospel stereotypes — a major late-20th-century shift still debated.',
    detail: 'Historiographic/theological-history card adjacent to HJ Jewishness consensus; not a single closed school.',
    tier: 'interpretive',
    proofVsConcept: 'debate',
    sources: [{ id: 'dunn-npp', citation: 'Dunn, The New Perspective on Paul; Sanders, Paul and Palestinian Judaism; Wright / critiques.', kind: 'survey' }],
  }],
}

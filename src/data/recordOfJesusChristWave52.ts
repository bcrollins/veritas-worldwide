/**
 * Interval 55 claim wave — wave52.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE52_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-supernova-ia-standard-candle',
    claim: 'Type Ia supernovae serve as standardized candles for measuring cosmic distances and provided foundational evidence for late-time acceleration.',
    detail: 'Observational cosmology pillar; calibration systematics remain an active research topic. Science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'riess-perlmutter', citation: 'Riess et al. / Perlmutter et al. acceleration papers; Pantheon+ and later SN Ia compilations.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-black-obelisk-jehu-detail',
    claim: 'The Black Obelisk of Shalmaneser III depicts a kneeling figure labeled as of Jehu of Israel paying tribute — a rare visual control for 9th-century Israelite kingship.',
    detail: 'Complements earlier Black Obelisk cards with visual/onomastic emphasis; royal identity reading is standard but not free of debate.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'bm-obelisk-jehu', citation: 'British Museum Black Obelisk; COS/ANET translations; subsequent Jehu identification literature.', kind: 'museum' }],
  }],
  'second-temple': [{
    id: 'st-josephus-apion',
    claim: 'Josephus’s Against Apion defends Jewish antiquity and customs against Greco-Roman critics — primary evidence of late first-century Jewish apologetic discourse.',
    detail: 'Apologetic genre; useful for how Josephus presents Judaism to outsiders, not HJ biography.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-apion', citation: 'Josephus, Against Apion; Barclay commentary; Mason Josephus studies.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-parables-kingdom',
    claim: 'Many parables are framed as kingdom-of-God teaching; historians widely treat parabolic teaching as characteristic of Jesus while debating authenticity of individual parables.',
    detail: 'Complements parables-core card with kingdom-frame emphasis.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'snodgrass-kingdom', citation: 'Snodgrass, Stories with Intent; Jeremias Parables; Dunn Jesus Remembered.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-bohairic-coptic',
    claim: 'The Bohairic Coptic version is a major Egyptian versional witness, later than Sahidic in many assessments, and remains valuable for the full versional apparatus.',
    detail: 'Complements general Coptic card with dialect-specific placement.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-bohairic', citation: 'Metzger Early Versions (Coptic dialects); Horner / modern Coptic NT editions.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-origen-celsus-method',
    claim: 'Using Origen’s Contra Celsum as a source for Celsus requires discounting Origen’s selection, paraphrase, and rebuttal framing when reconstructing the pagan critique.',
    detail: 'Source-critical method card for all Celsus-dependent claims.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'chadwick-celsus-method', citation: 'Chadwick, Origen Contra Celsum introduction; Hoffmann reconstruction notes.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caesarea-theater',
    claim: 'The Herodian/Roman theater at Caesarea Maritima is a major excavated entertainment structure documenting urban cultural architecture of the provincial capital.',
    detail: 'Urban archaeology; not a Gospel episode verifier.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'caesarea-theater', citation: 'Caesarea excavation reports (theater); Netzer Herodian architecture surveys.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-justin-trypho-limits',
    claim: 'Justin’s Dialogue with Trypho is a constructed literary dialogue; it evidence mid-2nd-c. Christian scriptural argument but cannot be treated as a transcript of a single historical debate.',
    detail: 'Genre limits for using Trypho as straightforward historical reportage.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'justin-trypho-genre', citation: 'Justin, Dialogue with Trypho; Allert / scholarly introductions on dialogue genre.', kind: 'peer_reviewed' }],
  }],
  'modern-scholarship': [{
    id: 'mod-crossan-historical-jesus-book',
    claim: 'John Dominic Crossan’s The Historical Jesus (1991) was a landmark Jesus Seminar–era synthesis using inventory methods and open-commensality models — still a reference point for critique and engagement.',
    detail: 'Historiographic landmark card; method and conclusions remain contested.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'crossan-1991', citation: 'Crossan, The Historical Jesus; subsequent Jesus Seminar debates and critiques.', kind: 'survey' }],
  }],
}

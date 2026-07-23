/**
 * Interval 51 claim wave — wave48.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE48_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-flatness-omega-k',
    claim: 'CMB data constrain spatial curvature Ω_k to be consistent with flat geometry at high precision within standard ΛCDM analyses.',
    detail: 'Parameter constraint; inflation motivates near-flatness. Science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-curvature', citation: 'Planck Collaboration curvature constraints; combined BAO+CMB flatness bounds.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-yehoash-tablet-forgery-caution',
    claim: 'The so-called Jehoash Inscription tablet is widely regarded as a modern forgery by many epigraphers; it must not be used as VERIFIED royal Judean building evidence.',
    detail: 'Authenticity caution card — report scholarly forgery consensus without overstating unanimity on every laboratory test.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'rollston-yehoash', citation: 'Rollston / epigraphic authenticity literature on the Jehoash tablet; IAA-related reports.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-herod-coinage-propaganda',
    claim: 'Herodian coinage avoids human portraits in Judean issues while displaying Greek-style symbols and inscriptions — primary numismatic evidence of cultural negotiation under client kingship.',
    detail: 'Material propaganda; complements literary Josephus portraits of Herod.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'meshorer-herod-coins', citation: 'Meshorer, Jewish Coins; Hendin Guide to Biblical Coins (Herodian issues).', kind: 'survey' }],
  }],
  'historical-jesus': [{
    id: 'hj-galilee-village-itinerancy',
    claim: 'Jesus’ activity is widely reconstructed as itinerant village-to-village ministry in Galilee rather than a fixed urban base, matching agrarian social patterns under Antipas.',
    detail: 'Social-historical reconstruction; exact itinerary maps remain speculative.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'reed-itinerancy', citation: 'Reed, Archaeology and the Galilean Jesus; Freyne Galilee studies; Synoptic journey notices.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-coptic-versions-witness',
    claim: 'Coptic versions (Sahidic, Bohairic, and dialects) are early Egyptian witnesses valuable for the apparatus, especially where Greek evidence is divided.',
    detail: 'Translation technique and dialect history must control how Coptic readings are weighed.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-coptic', citation: 'Metzger, The Early Versions (Coptic); Askeland / Coptic NT edition projects.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-pliny-legal-procedure',
    claim: 'Pliny’s letter details interrogation procedure, thrice-questioned persistence tests, and punishment of obstinate Christians — primary early 2nd-c. administrative procedure evidence.',
    detail: 'Complements Pliny worship/hymn cards with legal-procedure focus; not HJ biography.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'pliny-procedure', citation: 'Pliny Ep. 10.96–97; Sherwin-White commentary; Cook Roman Attitudes.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-jerusalem-burnt-house',
    claim: 'The Burnt House and related Upper City destruction layers preserve evidence of the 70 CE Roman destruction of Jerusalem elite neighborhoods.',
    detail: 'War archaeology terminus; frames post-70 Jewish and Christian trajectories without proving Gospel topography claims.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'avigad-burnt-house', citation: 'Avigad, Discovering Jerusalem; subsequent Jewish Quarter reports.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-shepherd-similitudes',
    claim: 'The Shepherd of Hermas Similitudes develop elaborate allegorical visions of the church as a tower — major 2nd-century Roman Christian apocalyptic-ethical literature.',
    detail: 'Reception history; once widely read, later non-canonical in most churches.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'hermas-sim', citation: 'Shepherd of Hermas Similitudes (Holmes/Loeb); Osiek Hermas commentary.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-500-plus-living-corpus',
    claim: 'A 500+ claim evidentiary corpus remains a living index: new editions, finds, and scientific results require continuous card updates under the ROC update-triggers doctrine.',
    detail: 'Anti-complacency meta-card at the 500+ milestone; completeness ≠ closure.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'veritas-triggers-500', citation: 'Veritas Worldwide ROC 05-UPDATE-TRIGGERS.md; export/verify soft-floor doctrine.', kind: 'survey' }],
  }],
}

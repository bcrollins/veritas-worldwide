/**
 * Interval 45 claim wave — wave42.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE42_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-helium-mass-fraction',
    claim: 'Big Bang nucleosynthesis predicts a primordial helium-4 mass fraction Y_p ≈ 0.25, confirmed by astrophysical helium abundance measurements within uncertainties.',
    detail: 'Classic concordance between nuclear physics and early-universe expansion; science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'bbn-yp', citation: 'PDG BBN reviews; Aver/Izotov helium abundance programs; Cyburt et al. BBN calculations.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-silwan-necropolis',
    claim: 'The Silwan (Siloam) necropolis rock-cut tombs in Jerusalem are primary Iron Age elite burial architecture often discussed in relation to Judahite capital society.',
    detail: 'Architectural/epigraphic corpus; individual tomb identifications with biblical names remain debated case-by-case.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'ussishkin-silwan', citation: 'Ussishkin, The Village of Silwan; subsequent City of David / Silwan surveys.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-yahad-messianic-rule',
    claim: 'The Rule of the Congregation (1QSa) and related yahad texts describe messianic banquet and leadership structures — evidence of dual-messiah / messianic expectation diversity at Qumran.',
    detail: 'Sectarian eschatology; comparative value for first-century messianism without equating Qumran and Jesus movements.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: '1qsa-rule', citation: '1QSa critical editions; Collins, The Scepter and the Star; Schiffman yahad studies.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-exorcism-social-context',
    claim: 'Exorcism and spirit-affliction language sits within wider Mediterranean and Jewish healing cultures; Jesus’ reputation as exorcist is multiply attested while ontological spirit claims remain outside proof-grade science.',
    detail: 'Social-historical context card; complements earlier exorcism reputation card with comparative culture focus.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'twelftree-context', citation: 'Twelftree, Jesus the Exorcist; Eve, The Jewish Context of Jesus’ Miracles; Meier Vol. 2.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-ecm-mark-status',
    claim: 'The Editio Critica Maior for Mark (and related CBGM publications) provides the current fullest apparatus and genealogical analysis for reconstructing Mark’s initial text.',
    detail: 'Edition status; readings still debated unit-by-unit. Complements general ECM method cards.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'ecm-mark', citation: 'INTF Editio Critica Maior: Mark; Mink CBGM method papers.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-porphyry-fragments-method',
    claim: 'Porphyry’s Against the Christians survives mainly in hostile Christian quotations; reconstruction requires source-critical caution about selection and paraphrase bias.',
    detail: 'Method card for all late pagan polemics preserved by opponents.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'magny-porphyry', citation: 'Magny, Porphyry in Fragments; Berchman, Porphyry Against the Christians.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-qumran-caves-map',
    claim: 'Eleven primary Qumran caves (1Q–11Q) and related Judean Desert findspots form a mapped manuscript deposition landscape, not a single library room find.',
    detail: 'Geographic/method hygiene for DSS claims; cave assignment matters for textual association.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'tov-caves', citation: 'Tov, Revised Lists of the Texts from the Judaean Desert; DJD series cave introductions.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-origen-contra-celsum-structure',
    claim: 'Origen’s Contra Celsum systematically quotes and rebuts Celsus’s True Doctrine, thereby preserving large portions of a major 2nd-century pagan critique of Christianity.',
    detail: 'Double value: Christian apologetic + mediated pagan source; not independent first-century HJ reportage.',
    tier: 'verified',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'origen-cc-structure', citation: 'Origen, Contra Celsum (SC/GCS critical editions; ET Chadwick); Hoffmann Celsus reconstruction.', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-theissen-covenant-plausibility',
    claim: 'Gerd Theissen’s “plausibility criterion” (historical continuity with Judaism + contextual plausibility + later church effects) was proposed as a constructive alternative to classical authenticity criteria.',
    detail: 'Historiographic method option; still debated relative to memory approaches and criteria-skepticism.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'theissen-plausible', citation: 'Theissen & Winter, The Quest for the Plausible Jesus; Theissen, The Shadow of the Galilean.', kind: 'peer_reviewed' }],
  }],
}

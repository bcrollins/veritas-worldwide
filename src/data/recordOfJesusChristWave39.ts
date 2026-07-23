/**
 * Interval 42 claim wave — wave39.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE39_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-isw-integrated-sachs',
    claim: 'The late-time Integrated Sachs–Wolfe (ISW) effect predicts CMB temperature correlations with large-scale structure as dark energy begins to dominate — a cross-check of ΛCDM expansion history.',
    detail: 'Detection significance has been reported in multiple cross-correlation studies; systematics remain actively assessed. Science_model.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'isw-crosscorr', citation: 'ISW–large-scale structure cross-correlation papers (2MASS/NVSS/Planck series); reviews in cosmology literature.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-bulla-baruch',
    claim: 'Clay bullae naming “Berekyahu son of Neriyahu the scribe” (Baruch) are widely discussed as epigraphic controls for late-monarchic Judahite administration and the Jeremiah tradition’s scribal milieu.',
    detail: 'Authenticity debates exist for some market-sourced bullae; provenanced excavation context is the gold standard for VERIFIED upgrades.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'avigad-bullae', citation: 'Avigad, Hebrew Bullae; subsequent BAR/IEJ authenticity discussions of Baruch/related bullae.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-1qs-penal-code',
    claim: 'The Community Rule (1QS) includes a detailed penal code for community offenses — primary evidence of disciplined sectarian governance at Qumran-related groups.',
    detail: 'Legal-sectarian practice text; complements broader Community Rule card with governance focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: '1qs-penal', citation: '1QS VI–VII (critical DSS editions); Schiffman, Reclaiming the Dead Sea Scrolls (penal code discussions).', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-q-source-hypothesis',
    claim: 'The Q source hypothesis posits a lost sayings collection behind Matthew and Luke’s double tradition; it remains the majority Two-Source explanation but is contested by Farrer and other models.',
    detail: 'Source-critical reconstruction, not a recovered manuscript. Do not treat Q as a VERIFIED physical document.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'kloppenborg-q', citation: 'Kloppenborg, Excavating Q; Goodacre, The Case Against Q; standard Synoptic Problem handbooks.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-farrer-hypothesis',
    claim: 'The Farrer hypothesis (Mark → Matthew → Luke without Q) is the leading alternative to the Two-Source Theory for Synoptic literary relationships.',
    detail: 'Higher-critical model with implications for how double tradition is explained; not a manuscript apparatus fact.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'goodacre-farrer', citation: 'Goodacre, The Case Against Q; Farrer, “On Dispensing with Q”; Watson / Poirier debates.', kind: 'peer_reviewed' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-julian-against-galileans',
    claim: 'Emperor Julian’s Against the Galileans (4th c., fragmentary via Cyril of Alexandria) is a late imperial philosophical polemic against Christianity — reception history, not first-century biography.',
    detail: 'Report as hostile late reception; do not upgrade to VERIFIED HJ controls.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'julian-galileans', citation: 'Julian, Against the Galileans (fragments via Cyril); Wright Loeb / critical reconstructions.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-gamla-synagogue-finds',
    claim: 'Gamla’s late Second Temple synagogue and associated finds (including a possible base for Torah reading) provide material evidence of communal Jewish assembly architecture before 70 CE.',
    detail: 'Complements Gamla revolt archaeology with synagogue-space focus; not a Gospel episode proof.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'syon-gamla-syn', citation: 'Syon / Gamla excavation reports; Levine, The Ancient Synagogue (Gamla).', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-protevangelium-james',
    claim: 'The Protevangelium of James (mid-2nd c. or later) is an infancy gospel expanding Mary and nativity traditions — popular reception literature, not a first-generation historical source.',
    detail: 'Apocryphal narrative development; useful for later Christian piety history, not HJ primary controls.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'hock-protev', citation: 'Hock, The Infancy Gospels of James and Thomas; critical editions of Protevangelium Jacobi.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-sanders-practice-belief',
    claim: 'E.P. Sanders’s Judaism: Practice and Belief and Jesus and Judaism reoriented HJ research around covenantal nomism and Jesus within Judaism — foundational Third Quest framing still widely engaged.',
    detail: 'Historiographic landmark card; subsequent refinements and critiques (including “covenantal nomism” debates) remain active.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'sanders-jpb', citation: 'Sanders, E.P. Judaism: Practice and Belief; Jesus and Judaism; later “New Perspective” debates.', kind: 'survey' }],
  }],
}

/**
 * Interval 58 claim wave — wave55.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE55_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-cmb-acoustic-peaks-overview',
    claim: 'The CMB temperature power spectrum’s acoustic peak pattern is a primary observational foundation for flat ΛCDM parameter estimation (geometry, baryons, dark matter, and early expansion).',
    detail: 'Meta-card synthesizing peak physics already detailed elsewhere; science_model status.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-peaks', citation: 'Planck Collaboration temperature power spectrum papers; Hu/White acoustic peak pedagogy.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-tel-dan-house-david-genre',
    claim: 'The Tel Dan stele is Aramaic royal victory propaganda; its “House of David” line functions within enemy-king rhetoric and must be read as genre-constrained historical evidence.',
    detail: 'Complements bytdwd reading cards with genre emphasis.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'suriano-dan-genre', citation: 'Suriano / Biran-Naveh literature; subsequent Tel Dan genre analyses.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-mikveh-galilee-density',
    claim: 'Late Second Temple Galilee shows widespread miqva’ot in villages and towns, evidencing purity infrastructure beyond Jerusalem alone.',
    detail: 'Complements Jerusalem miqveh density card with regional Galilee focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'adler-galilee-miqveh', citation: 'Adler purity archaeology; Reich miqva’ot typology; Galilee survey reports.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-exorcism-language-limits',
    claim: 'Exorcism language in the Gospels participates in broader Mediterranean spirit-affliction discourse; historical reputation does not license laboratory verification of spirit ontology.',
    detail: 'Method hygiene complementing exorcism reputation/social-context cards.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'twelftree-limits', citation: 'Twelftree, Jesus the Exorcist; Eve Jewish Context; Meier Vol. 2.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-armenian-version',
    claim: 'The Armenian version of the NT is an important early versional tradition useful for the apparatus, especially in relation to Greek and Syriac transmission paths.',
    detail: 'Translation history and revision layers require specialized control.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-armenian', citation: 'Metzger, The Early Versions (Armenian); Alexanian / Armenian Bible studies.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-tacitus-sources-debate',
    claim: 'Whether Tacitus drew on official archives, common knowledge, or Christian-adjacent rumor for Annals 15.44 remains debated; the notice’s core is still widely treated as independent of the Gospels.',
    detail: 'Source-path debate without overturning the core Christus–Pilate notice.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'vanvoorst-tacitus-sources', citation: 'Van Voorst; Cook; scholarly debates on Tacitus’s sources for 15.44.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-magdala-synagogue-plan',
    claim: 'The Magdala synagogue’s plan (including benches and central features associated with the Magdala stone) documents a late Second Temple Galilean assembly building type.',
    detail: 'Complements Magdala stone/miqva’ot cards with architectural-plan focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'magdala-plan', citation: 'Magdala Project synagogue reports; Levine Ancient Synagogue comparisons.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-shepherd-visions',
    claim: 'The Shepherd of Hermas Visions section presents revelatory encounters shaping Roman Christian penitential theology in the 2nd century.',
    detail: 'Complements Mandates/Similitudes cards; reception history, not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'hermas-visions', citation: 'Shepherd of Hermas Visions (Holmes/Loeb); Osiek Hermas commentary.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-theissen-shadow-galilean',
    claim: 'Gerd Theissen’s The Shadow of the Galilean popularized narrative historical method for HJ research while embedding sociological analysis of first-century Palestine.',
    detail: 'Historiographic landmark for public-facing HJ method; scholarly reception mixed on genre hybrid.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'theissen-shadow', citation: 'Theissen, The Shadow of the Galilean; related sociological HJ essays.', kind: 'survey' }],
  }],
}

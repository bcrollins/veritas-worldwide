/**
 * Interval 61 claim wave — wave58.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE58_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-photon-baryon-fluid',
    claim: 'Before recombination, photons and baryons formed a tightly coupled fluid whose acoustic oscillations imprint the CMB peak pattern and the BAO scale.',
    detail: 'Foundational plasma physics for peak/BAO cards; science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'hu-white-fluid', citation: 'Hu & White acoustic peak pedagogy; Planck Collaboration early-universe papers.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-omri-mesha-context',
    claim: 'The Mesha Stele’s reference to Omri’s oppression of Moab provides an independent Moabite frame for 9th-century Israel–Moab conflict also reflected in Kings traditions.',
    detail: 'Royal propaganda genre; correlation with biblical Omride chronology is standard but detail-level debates persist.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'mesha-omri', citation: 'Mesha Stele COS/ANET; Dearman / Routledge Moab studies; 2 Kings 3 critical commentaries.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-josephus-essene-shared-property',
    claim: 'Josephus describes Essene common property and communal discipline — literary ethnography that must be weighed carefully against Qumran archaeology and other sources.',
    detail: 'Complements Essene hypothesis/limits cards with shared-property focus.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-essene-property', citation: 'Josephus War 2 / Ant. 18 Essene passages; Mason / Taylor Essene studies.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-baptism-repentance-frame',
    claim: 'Jesus’ baptism by John is widely accepted as historical; the repentance/forgiveness framing of John’s baptism is early tradition with theological development in later Christian narration.',
    detail: 'Event core vs. interpretive framing distinction is methodologically essential.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-baptism-frame', citation: 'Meier, A Marginal Jew Vol. 2; Dunn Jesus Remembered; Synoptic baptism narratives.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-slavonic-version-limits',
    claim: 'Slavonic biblical versions are later medieval traditions valuable for reception history; they must not be confused with the separate problem of Slavonic Josephus expansions.',
    detail: 'Method hygiene separating versional NT evidence from Slavonic Josephus interpolations.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'metzger-slavonic', citation: 'Metzger Early Versions notes; Leeming Slavonic Josephus literature (for contrast).', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-pliny-legal-status-summary',
    claim: 'Taken together, Pliny’s interrogation report and Trajan’s reply document an early 2nd-c. imperial approach: Christians are punishable if obstinate when accused, but not to be hunted proactively.',
    detail: 'Administrative synthesis card; not HJ biography.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'pliny-trajan-summary', citation: 'Pliny Ep. 10.96–97; Sherwin-White; Cook Roman Attitudes.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-gamla-walls',
    claim: 'Gamla’s fortification walls and destruction layers from the First Revolt provide material control for Josephus’s Golan war narrative in broad outline.',
    detail: 'War archaeology; narrative detail correlation remains case-by-case.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'syon-gamla-walls', citation: 'Syon / Gamla excavation reports; Josephus War 4.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-2-clement-homily',
    claim: '2 Clement is an early Christian homily (often treated as mid-2nd-c.) urging repentance and ethical perseverance — reception of preaching form, not HJ primary data.',
    detail: 'Authorship and precise date debated; value is early homiletic ethics.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: '2clement-holmes', citation: '2 Clement (Holmes Apostolic Fathers); Pratscher / critical introductions.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-le-donne-historical-jesus',
    claim: 'Anthony Le Donne’s work on memory and historiography argues that historical Jesus research must account for refraction through social memory rather than only atomistic authenticity criteria.',
    detail: 'Historiographic method card in the post-criteria landscape.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'ledonne-memory', citation: 'Le Donne, The Historiographical Jesus; Keith & Le Donne criteria volumes.', kind: 'peer_reviewed' }],
  }],
}

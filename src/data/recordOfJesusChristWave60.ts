/**
 * Interval 63 claim wave — wave60.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE60_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-angular-diameter-distance',
    claim: 'Angular diameter distance D_A(z) relates observed angular size to physical scale and is constrained by BAO and CMB acoustic-scale measurements in ΛCDM.',
    detail: 'Geometric cosmology tool; science_model parameter mapping.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'bao-da', citation: 'DESI/eBOSS BAO D_A measurements; Planck acoustic-scale geometry.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-hezekiah-tunnel-date-debate',
    claim: 'While Hezekiah’s tunnel is archaeologically verified, absolute dating debates (radiocarbon, paleography, historical correlation) continue at the margins of a late-8th-century consensus.',
    detail: 'Engineering fact vs. precise year assignment distinction.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'frumkin-tunnel-date', citation: 'Frumkin / Shimron tunnel dating studies; Reich/Shukron; biblical synchronisms.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-dead-sea-scrolls-languages',
    claim: 'Dead Sea Scrolls are predominantly Hebrew with substantial Aramaic and some Greek — primary evidence of multilingual literary culture in late Second Temple Judea.',
    detail: 'Corpus-language overview; not a claim about every community’s daily speech.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'tov-languages', citation: 'Tov, Textual Criticism of the Hebrew Bible / DSS language surveys; DJD series.', kind: 'survey' }],
  }],
  'historical-jesus': [{
    id: 'hj-criteria-coherence',
    claim: 'The criterion of coherence (material fitting a reconstructed core is more likely authentic) is circular if the core itself depends on contested criteria — a classic method hazard in HJ research.',
    detail: 'Method hygiene card in the criteria suite.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'theissen-coherence', citation: 'Theissen & Winter criteria history; Keith/Le Donne method volumes.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-ecm-john-status',
    claim: 'The Editio Critica Maior for John (and related CBGM work) provides the fullest modern apparatus for the Fourth Gospel’s initial text reconstruction.',
    detail: 'Edition status; Johannine textual problems remain unit-by-unit.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'ecm-john', citation: 'INTF Editio Critica Maior: John; Mink CBGM method papers.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-celsus-jewish-source-claim',
    claim: 'Origen reports Celsus citing a Jewish interlocutor’s polemic against Jesus; whether this reflects a real Jewish source or literary device remains debated.',
    detail: 'Source-within-source caution for Celsus materials.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'origen-celsus-jew', citation: 'Origen Contra Celsum 1; Hoffmann reconstruction; Schäfer Jesus in the Talmud comparisons.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-sepphoris-theater-debate',
    claim: 'The dating of Sepphoris’s theater (first-century vs later) remains debated and affects reconstructions of Jesus’ exposure to urban Greco-Roman entertainment culture.',
    detail: 'Architectural fact of a theater vs. secure Antipas-era dating are distinct questions.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'meyers-theater', citation: 'Meyers/Strange Sepphoris literature; subsequent theater dating debates.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-barnabas-anti-temple',
    claim: 'The Epistle of Barnabas develops anti-temple and supersessionist readings of Israel’s cult — early Christian reception of temple destruction theology.',
    detail: 'Reception history; not a source for first-century HJ temple teaching details without care.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'barnabas-temple', citation: 'Epistle of Barnabas (Holmes); Paget Barnabas studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-sanders-paul-palestinian-judaism',
    claim: 'E.P. Sanders’s Paul and Palestinian Judaism reconfigured Paul studies by arguing against legalistic caricatures of Judaism — foundational for the New Perspective debates.',
    detail: 'Historiographic landmark adjacent to HJ Jewishness consensus cards.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'sanders-ppj', citation: 'Sanders, E.P. Paul and Palestinian Judaism; later NPP literature.', kind: 'survey' }],
  }],
}

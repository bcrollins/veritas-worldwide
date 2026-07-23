/**
 * Interval 49 claim wave — wave46.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE46_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-omega-b-h2',
    claim: 'CMB acoustic peaks tightly constrain the physical baryon density Ω_b h², matching independent BBN deuterium constraints within uncertainties.',
    detail: 'Concordance pillar between CMB and BBN; science_model parameter status.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-obh2', citation: 'Planck Collaboration baseline Ω_b h²; Cooke deuterium comparisons.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-bullae-gedalyahu',
    claim: 'Bullae naming Gedaliah and related officials are discussed as possible epigraphic controls for late Judahite administration around the Babylonian crisis (with authenticity depending on provenance).',
    detail: 'Provenanced vs market-sourced distinction is mandatory for tier upgrades.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'avigad-gedaliah', citation: 'Avigad bullae corpus; subsequent authenticity and Ophel find discussions.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-pharisee-josephus-portrait',
    claim: 'Josephus’s portrait of Pharisees (popular influence, legal expertise, belief in fate/resurrection per his schemes) is primary but tendentious and must be read against his elite agenda.',
    detail: 'Method hygiene for all Pharisee-related Second Temple cards.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'mason-pharisees', citation: 'Mason, Flavius Josephus on the Pharisees; Josephus Ant./War party descriptions.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-sinners-table-core',
    claim: 'Jesus’ association with “tax collectors and sinners” at meals is multiply attested and widely treated as a historically distinctive social practice of his movement.',
    detail: 'Complements table-fellowship limits card with core attestation emphasis; theological meaning remains interpretive.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'dunn-sinners', citation: 'Dunn, Jesus Remembered; Sanders, Jesus and Judaism; Synoptic meal traditions.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-early-versions-evidence',
    claim: 'Early versions (Latin, Syriac, Coptic) are independent witnesses that can preserve ancient readings and must be weighed with knowledge of translation technique.',
    detail: 'Versional evidence is secondary to Greek but indispensable for the full apparatus tradition.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-versions', citation: 'Metzger, The Early Versions of the New Testament; UBS/NA version sigla guides.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-suetonius-claudius-frame',
    claim: 'Suetonius places the Chrestus disturbance in a Claudian expulsion notice about Jews in Rome — administrative anecdote, not a secure Jesus biography.',
    detail: 'Complements earlier Suetonius caution with narrative-frame focus.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'suetonius-claudius-25', citation: 'Suetonius, Claudius 25.4; Van Voorst; Smallwood Jews under Roman Rule.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-magdala-harbor',
    claim: 'Magdala’s harbor and industrial installations document a commercial fishing town on the Sea of Galilee in the Early Roman period.',
    detail: 'Economic geography for Gospel fishing settings; not episode-level proof.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'magdala-harbor', citation: 'Magdala Project harbor/industry reports; Galilee economic archaeology surveys.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-ignatius-recensions-method',
    claim: 'Ignatius’s letters survive in multiple recensions (middle, long, short); modern critical work privileges the middle recension as the earliest recoverable form.',
    detail: 'Textual-history method card for Ignatius reception; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'holmes-ignatius', citation: 'Holmes, Apostolic Fathers (Ignatius introductions); Lightfoot / modern recension studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-bauckham-eyewitness-limits',
    claim: 'Richard Bauckham’s eyewitness thesis argues Gospel traditions retain named eyewitness control; critics dispute the reach of onomastic and inclusio arguments.',
    detail: 'Historiographic debate card — report both the thesis and the critique without advocacy.',
    tier: 'interpretive',
    proofVsConcept: 'debate',
    sources: [{ id: 'bauckham-eyewitnesses', citation: 'Bauckham, Jesus and the Eyewitnesses; critical responses in JSNT/SBL literature.', kind: 'peer_reviewed' }],
  }],
}

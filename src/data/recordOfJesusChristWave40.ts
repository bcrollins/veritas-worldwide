/**
 * Interval 43 claim wave — wave40.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE40_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-bao-standard-ruler',
    claim: 'Baryon acoustic oscillations provide a standard-ruler distance measure from the sound horizon scale imprinted in the galaxy distribution — a cornerstone of late-universe expansion constraints.',
    detail: 'Complements CMB acoustic-scale cards with late-time geometric probe. Science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'bao-reviews', citation: 'Eisenstein & Hu BAO theory; SDSS/BOSS/eBOSS/DESI BAO measurement papers.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-tel-miqne-ekron-inscription',
    claim: 'The Ekron royal dedicatory inscription (Tel Miqne) names Philistine rulers and a temple dedication — primary Iron Age Philistine epigraphy for coastal plain politics and religion.',
    detail: 'Complements earlier Ekron card with explicit royal/temple dedication focus if prior card is general; otherwise stands as inscription-primary control.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'gitin-ekron', citation: 'Gitin / Dothan / Naveh Ekron inscription publications; Tel Miqne excavation reports.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-philo-embassy-gaius',
    claim: 'Philo’s Embassy to Gaius narrates the Alexandrian Jewish crisis and the Caligula Temple statue threat from a contemporary diaspora Jewish perspective.',
    detail: 'Primary literary control for 38–41 CE Jewish–Roman conflict; complements Caligula crisis card with Philo’s voice.',
    tier: 'verified',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-embassy', citation: 'Philo, Legatio ad Gaium (Loeb/critical editions); Smallwood / Schwartz treatments.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-criteria-embarrassment',
    claim: 'The criterion of embarrassment (traditions unlikely to be invented because they create difficulty for the early church) is a classic HJ tool now widely qualified or rejected as a standalone proof engine.',
    detail: 'Method hygiene: useful heuristic, not laboratory certainty. Complements criteria-not-enough meta card.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'keith-embarrassment', citation: 'Keith & Le Donne, Jesus, Criteria, and the Demise of Authenticity; Theissen/Winter criteria history.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-acts-western-expansions',
    claim: 'Codex Bezae and allied “Western” witnesses often present a longer, paraphrastic Acts text; modern editors generally prefer the Alexandrian shorter form as closer to the initial text for most units.',
    detail: 'Per-unit evaluation remains mandatory; CBGM/ECM refine book-level judgments.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'ropes-acts-west', citation: 'Ropes, The Text of Acts; Parker, Codex Bezae; ECM Acts discussions.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-no-pilate-report-survives',
    claim: 'No authentic “Acts of Pilate” or official prefectural report on Jesus is known from the first century; later Acts of Pilate / Gospel of Nicodemus texts are Christian apocrypha.',
    detail: 'Method: distinguish lost-admin-archives possibility from surviving late Christian compositions.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'elliott-apocrypha-pilate', citation: 'Elliott, The Apocryphal New Testament (Acts of Pilate); Bond, Pontius Pilate.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-magdala-miqvaot',
    claim: 'Magdala excavations include miqva’ot and industrial installations alongside the synagogue complex — material purity and economic infrastructure on the Galilee shore.',
    detail: 'Complements Magdala stone/synagogue cards with purity-installation focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'magdala-miqveh', citation: 'Magdala Project excavation reports; Reich miqva’ot typology comparisons.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-irenaeus-apostolic-preaching',
    claim: 'Irenaeus’s Demonstration of the Apostolic Preaching (Epideixis) presents a rule-of-faith summary of Christian proclamation for a late-2nd-century audience.',
    detail: 'Reception of catechetical theology; not HJ primary biography.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'irenaeus-epideixis', citation: 'Irenaeus, Epideixis (Armenian tradition; ET Smith/Behr); Behr introductions.', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-multiple-attestation-method',
    claim: 'Multiple independent attestation remains a widely taught HJ criterion: traditions appearing in independent sources gain historical weight — while independence judgments themselves are often contested.',
    detail: 'Method card with explicit circularity risk when source theories shift (Q, Farrer, John independence).',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-attestation', citation: 'Meier, A Marginal Jew (criteria); Keith/Le Donne critiques of criteria.', kind: 'survey' }],
  }],
}

/**
 * Interval 39 claim wave — wave36.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE36_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-cosmic-shear-surveys',
    claim: 'Cosmic shear weak-lensing surveys (e.g., KiDS, DES, HSC, and forthcoming Euclid/LSST analyses) measure large-scale structure growth as an independent probe of dark matter and dark energy.',
    detail: 'Survey science status; tension metrics with CMB-inferred S8 are an active research topic. Science_model.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'kids-des-shear', citation: 'KiDS / DES / HSC weak-lensing cosmology papers; Euclid consortium forecasts.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-lmlk-jar-handles',
    claim: 'lmlk (“belonging to the king”) jar handles from late-8th-century Judah form a large administrative ceramic corpus associated with Hezekiah-era preparation against Assyria.',
    detail: 'Archaeological typology and distribution are primary; exact bureaucratic function details remain reconstructed.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'lipschits-lmlk', citation: 'Lipschits / Sergi / Koch lmlk studies; Vaughn, Theology, History, and Archaeology in the Chronicler’s Account.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-qumran-cemetery',
    claim: 'The Qumran cemetery and associated settlement archaeology frame debates about who produced/used the Dead Sea Scrolls and the site’s sectarian character.',
    detail: 'Material cemetery data are primary; demographic and identity reconstructions remain contested.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'magness-qumran', citation: 'Magness, J. The Archaeology of Qumran; de Vaux field reports; subsequent cemetery studies.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-son-of-man-idiom',
    claim: 'The “Son of Man” idiom in the Gospels is a major historical-Jesus puzzle: Aramaic speech-level meaning, Daniel 7 connection, and authenticity of individual sayings are all actively debated.',
    detail: 'Method: do not collapse linguistic, apocalyptic, and christological layers into a single VERIFIED fact.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'casey-son-of-man', citation: 'Casey, M. The Solution to the “Son of Man” Problem; Collins, The Scepter and the Star; Hurtado essays.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-western-text-type',
    claim: 'The so-called Western text (e.g., Codex Bezae in Acts/Gospels) is a recognized early textual cluster with expansions and paraphrastic tendencies; its relationship to the initial text is evaluated per unit of variation.',
    detail: 'Text-type labels are heuristic; CBGM reduces dependence on rigid text-type trees.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'parker-bezae-west', citation: 'Parker, Codex Bezae; Metzger/Ehrman text introductions; ECM Acts discussions.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-no-roman-trial-minutes',
    claim: 'No authentic Roman judicial minutes of Jesus’ trial before Pilate are known; Gospel passion trial scenes are literary-theological narratives constrained by Roman provincial practice models.',
    detail: 'Absence of acta is archival reality; reconstruction of trial procedure uses comparative prefectural practice (Bond et al.).',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'bond-trial', citation: 'Bond, Pontius Pilate in History and Interpretation; Sherwin-White, Roman Society and Roman Law in the New Testament.', kind: 'peer_reviewed' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-wadi-murabbaat',
    claim: 'Wadi Murabbaʿat caves yielded Bar Kokhba-period documents and biblical fragments — primary Judean Desert controls for early 2nd-century CE Jewish life and text transmission.',
    detail: 'Documentary archaeology after 70 CE; not Gospel narrative verification.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'benoit-murabbaat', citation: 'Benoit/Milik/de Vaux, Les grottes de Murabbaʿat (DJD II); subsequent Bar Kokhba documentary studies.', kind: 'critical_edition' }],
  }],
  'early-christian-literature': [{
    id: 'ec-1-clement-structure',
    claim: '1 Clement (Rome to Corinth, commonly c. 96 CE) appeals to OT examples and apostolic memory to urge church order — early Roman Christian leadership rhetoric, not a HJ biography.',
    detail: 'Dating and authorship details debated; value is reception of authority and OT Christian reading.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'clement-holmes', citation: '1 Clement in Holmes, Apostolic Fathers; Lona, Der erste Clemensbrief.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-boyarin-jewish-gospels',
    claim: 'Daniel Boyarin argues that high christological ideas could emerge from within Jewish binitarian/angelic traditions rather than only from later paganization — a major Jewish-studies intervention in Gospel theology debates.',
    detail: 'Historiographic/theological-history thesis; contested across guilds; report as debate, not VERIFIED HJ biography.',
    tier: 'interpretive',
    proofVsConcept: 'debate',
    sources: [{ id: 'boyarin-jewish-gospels', citation: 'Boyarin, D. The Jewish Gospels; Border Lines; related responses in Jewish–Christian studies.', kind: 'survey' }],
  }],
}

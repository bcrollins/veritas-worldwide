/**
 * Interval claim wave — wave64.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE64_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-planck-theta-star',
    claim: 'Planck measures the angular scale of the sound horizon θ_* with high precision; combined with a sound-horizon model it tightly constrains the angular-diameter distance to last scattering in ΛCDM.',
    detail: 'Observational geometric constraint; model dependence enters when mapping θ_* to physical parameters.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-theta-star', citation: 'Planck Collaboration cosmological parameter papers (θ_* / acoustic scale).', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-mesha-stele-israel',
    claim: 'The Mesha Stele (Moabite Stone) is a primary 9th-century BCE inscription of King Mesha mentioning Omri and Israel — a cornerstone external control for early Israelite royal history.',
    detail: 'Epigraphic primary source; biblical parallel readings remain interpretive where wording is damaged or polemical.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'mesha-stele-louvre', citation: 'Louvre Mesha Stele; COS/ANET translations; Dearman / later Mesha studies.', kind: 'museum' }],
  }],
  'second-temple': [{
    id: 'st-temple-tax-tyrian',
    claim: 'The Jerusalem Temple tax was commonly paid in Tyrian silver (half-shekel tradition), illustrating how Second Temple economy mixed Judean cult requirements with wider Mediterranean currency networks.',
    detail: 'Economic-historical reconstruction from literary and numismatic evidence; local practice could vary.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'meshorer-tyrian', citation: 'Meshorer Temple tax / Tyrian shekel numismatics; Mishnah Sheqalim; NT half-shekel narratives as later Christian reception.', kind: 'survey' }],
  }],
  'historical-jesus': [{
    id: 'hj-galilee-village-economy',
    claim: 'Archaeology and agrarian studies place most Galilean villages in a modest agrarian economy under Herodian/Roman taxation; this frames Jesus’ audience without proving any single saying’s authenticity.',
    detail: 'Context card; economic background is not a criterion that authenticates discrete logia.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'reed-galilee', citation: 'Reed, Archaeology and the Galilean Jesus; Freyne Galilee studies; later village surveys.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-p75-bodmer-luke-john',
    claim: '𝔓⁷⁵ (Bodmer XIV–XV) is a major early witness to Luke and John with strong affinity to Codex Vaticanus (B) in many units — a key pillar of the “Alexandrian” early text discussion.',
    detail: 'Manuscript relationship fact; not a license to ignore other early witnesses at variation units.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'p75-bodmer', citation: 'Bodmer XIV–XV / 𝔓⁷⁵ editions; NA28 apparatus; INTF Liste.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-thallus-africanus-fragment',
    claim: 'Julius Africanus reports that Thallus explained the darkness at the crucifixion as an eclipse; the fragment is second-hand and cannot independently date or prove Gospel passion chronology.',
    detail: 'Source-within-source caution; eclipse explanation is scientifically awkward for Passover full moon — method hygiene required.',
    tier: 'circumstantial',
    proofVsConcept: 'debate',
    sources: [{ id: 'africanus-thallus', citation: 'Julius Africanus via later citation chains; Van Voorst; Habermas/Licona surveys of non-Christian notices.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caesarea-pilate-context',
    claim: 'Caesarea Maritima’s Herodian harbor and Roman administrative remains form the urban stage for prefectural rule; the Pilate inscription found there anchors Pilate’s historical office without validating every Gospel trial detail.',
    detail: 'Site + inscription control for Roman prefecture; narrative trial scenes remain literary-historical questions.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'caesarea-pilate-inscr', citation: 'Pontius Pilate inscription (Israel Museum/IAA); Holum / Porath Caesarea archaeology.', kind: 'museum' }],
  }],
  'early-christian-literature': [{
    id: 'ec-didache-eucharist-prayers',
    claim: 'The Didache’s eucharistic prayers (chs. 9–10) preserve early community meal thanksgivings that differ in form from the canonical Last Supper institution narratives — primary evidence of liturgical diversity.',
    detail: 'Liturgical reception; not a first-generation HJ source for the historical meal itself without care.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'didache-eucharist', citation: 'Didache 9–10 (Holmes); Niederwimmer; Jefford Didache studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-allison-resurrecting-jesus',
    claim: 'Dale C. Allison Jr.’s Resurrecting Jesus models careful historical treatment of resurrection traditions while distinguishing historical description from theological claim — a major twenty-first-century reference point.',
    detail: 'Historiographic landmark adjacent to memory-method work; conclusions remain guild-debated.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'allison-resurrecting', citation: 'Allison, D.C. Resurrecting Jesus; related resurrection historiography.', kind: 'survey' }],
  }],
}

/**
 * Interval claim wave — wave66.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE66_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-cmb-polarization-e-modes',
    claim: 'CMB E-mode polarization measurements confirm acoustic-peak physics and constrain reionization optical depth τ; they are independent of temperature maps alone in standard ΛCDM analyses.',
    detail: 'Science_model observational pillar; B-mode inflation searches remain upper-limit science.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-pol', citation: 'Planck polarization papers; WMAP/Planck τ constraints.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-amarna-letters-canaan',
    claim: 'The Amarna letters (14th c. BCE) are primary diplomatic correspondence describing Canaanite city-state politics under Egyptian hegemony — background for later Israelite settlement debates, not proof of biblical narratives.',
    detail: 'Primary archive; historical correlation to biblical conquest/settlement models is interpretive.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'moran-amarna', citation: 'Moran, The Amarna Letters; Rainey / later Amarna scholarship.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-mikvaot-jerusalem-density',
    claim: 'Jerusalem’s dense stepped-pool (mikveh) installations in late Second Temple strata are archaeological evidence of purity practice intensity among some urban populations.',
    detail: 'Material culture of purity; not a direct census of belief or of Jesus-movement practice.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'reich-mikvaot', citation: 'Reich mikveh studies; Magness / later purity archaeology.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-parable-form-memory',
    claim: 'Parabolic teaching is widely judged characteristic of Jesus’ public speech on form-critical and memory grounds, while authenticity of any single parable remains unit-level debate.',
    detail: 'Genre-level consensus vs. per-unit authenticity are distinct method layers.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'jeremias-parables', citation: 'Jeremias, The Parables of Jesus; Snodgrass; modern memory approaches.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-codex-vaticanus-b',
    claim: 'Codex Vaticanus (B, 4th c.) is a primary continuous-text Greek witness foundational to modern critical editions of the NT, often aligning with early papyri such as 𝔓⁷⁵ in Luke/John.',
    detail: 'Manuscript status; not automatic correctness at every variation unit.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'vaticanus-b', citation: 'Codex Vaticanus facsimiles; NA28 apparatus; INTF Liste.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-tacitus-annals-15-44',
    claim: 'Tacitus Annals 15.44 reports Nero’s punishment of Christians and mentions Christus executed under Pontius Pilate — a key early second-century Roman historiographic notice, not a Gospel-independent biography.',
    detail: 'Attested Roman history writing; source dependence on Christian or official rumor remains debated.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'tacitus-ann15', citation: 'Tacitus, Annals 15.44; Van Voorst; Cook; manuscript tradition of Annals.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-nazareth-first-century-settlement',
    claim: 'Excavation evidence supports a small first-century settlement at Nazareth; sensational claims that Nazareth did not exist in Jesus’ time are not the scholarly mainstream reading of the archaeology.',
    detail: 'Settlement existence vs. reconstructing daily life details are distinct; mythicist non-existence claims overreach current data.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'dark-nazareth', citation: 'Dark / Alexandre Nazareth archaeology surveys; Strange / Reed Galilee context.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-1-clement-corinth',
    claim: '1 Clement (late first / early second century) addresses Corinthian church order and appeals to scriptural and apostolic examples — primary evidence of early Roman-Corinthian Christian networks.',
    detail: 'Reception and ecclesiology; not a first-generation HJ narrative source.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: '1clement-holmes', citation: '1 Clement (Holmes Apostolic Fathers); Lona / critical introductions.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-sanders-historical-figure',
    claim: 'E.P. Sanders’s Jesus and Judaism / The Historical Figure of Jesus models a covenantal-Jewish Jesus focused on kingdom and Temple conflict — foundational for Third Quest reconstructions.',
    detail: 'Historiographic landmark; individual judgments remain contested across schools.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'sanders-historical-figure', citation: 'Sanders, E.P. The Historical Figure of Jesus; Jesus and Judaism.', kind: 'survey' }],
  }],
}

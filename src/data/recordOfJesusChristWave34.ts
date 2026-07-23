/**
 * Interval 37 claim wave — wave34.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE34_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-desi-bao-dynamics',
    claim: 'DESI baryon acoustic oscillation measurements are testing whether dark energy’s equation of state evolves with time, with early data releases prompting active ΛCDM extension debates.',
    detail: 'Frontier Stage-IV cosmology; results are model-dependent and updating. Complements Stage-IV survey design cards.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'desi-dr', citation: 'DESI Collaboration BAO / dark-energy data-release papers (2024–2026 series).', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-khirbet-qeiyafa',
    claim: 'Khirbet Qeiyafa (Judah/Shephelah, early Iron Age) is a fortified site whose dating and political affiliation are central to debates on the 10th-century BCE Judahite state.',
    detail: 'Excavation data are primary; historical synthesis (United Monarchy scale) remains contested.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'garfinkel-qeiyafa', citation: 'Garfinkel / Ganor / Hasel Khirbet Qeiyafa excavation reports; Finkelstein responses.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-4qinstruction',
    claim: '4QInstruction (Musar leMevin) is a major Qumran wisdom text combining sapiential and apocalyptic themes — evidence of instructional diversity in late Second Temple Judaism.',
    detail: 'Literary-sectarian context for wisdom/apocalyptic fusion; not HJ primary data.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'goff-4qinstruction', citation: 'Goff, M. 4QInstruction; DJD editions of 1Q/4Q Instruction fragments.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-parables-core',
    claim: 'Parables as a characteristic teaching form of Jesus are among the most widely accepted features of the historical Jesus tradition, though individual parable authenticity and original wording remain reconstructed case-by-case.',
    detail: 'Form-historical core judgment; allegorical church expansions are reception history.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'jeremias-parables', citation: 'Jeremias, The Parables of Jesus; Scott, Hear Then the Parable; Snodgrass, Stories with Intent.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-p-egerton',
    claim: 'Papyrus Egerton 2 is an early non-canonical gospel fragment with Johannine and Synoptic-like episodes — evidence of diverse Jesus-narrative circulation in the second century.',
    detail: 'Extra-canonical textual witness; not a first-generation control and not part of the NA28 continuous text.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'bell-skeat-egerton', citation: 'Bell & Skeat, Fragments of an Unknown Gospel; later Egerton editions and discussions.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-no-contemporary-imperial-acta',
    claim: 'No contemporary Roman imperial acta, trial minutes, or census rolls naming Jesus of Nazareth are known to survive; non-Christian literary controls begin decades later.',
    detail: 'Argument from silence with archival survival bias — does not by itself prove non-existence; frames the quality of available controls.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'vanvoorst-silence', citation: 'Van Voorst, Jesus Outside the New Testament; Ehrman, Did Jesus Exist? (source inventory discussions).', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-babatha-archive',
    claim: 'The Babatha archive (Nahal Hever) is a major Judean Desert papyrus find documenting a Jewish woman’s legal and economic life under Roman rule in the early 2nd century CE.',
    detail: 'Documentary baseline for provincial Jewish life after 70; not a Gospel narrative verifier.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'lewis-babatha', citation: 'Lewis, Yadin, Greenfield, The Documents from the Bar Kokhba Period in the Cave of Letters (Babatha).', kind: 'critical_edition' }],
  }],
  'early-christian-literature': [{
    id: 'ec-barnabas-epistle',
    claim: 'The Epistle of Barnabas (late 1st / early 2nd c.) offers allegorical OT interpretation and a “two ways” ethic — early Christian reception, not a first-generation Jesus source.',
    detail: 'Useful for supersessionist and ethical trajectories in early Christianity; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'barnabas-holmes', citation: 'Epistle of Barnabas in Holmes, Apostolic Fathers; Paget, The Epistle of Barnabas.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-wright-critical-realism',
    claim: 'N.T. Wright’s critical-realist historical method reconstructs Jesus as a Jewish prophet enacting return-from-exile and kingdom narratives — a major Third Quest synthesis with explicit theological engagement.',
    detail: 'Historiographic position card; method and conclusions are debated across confessional and secular guilds.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'wright-jvg', citation: 'Wright, N.T. Jesus and the Victory of God; The New Testament and the People of God (critical realism).', kind: 'survey' }],
  }],
}

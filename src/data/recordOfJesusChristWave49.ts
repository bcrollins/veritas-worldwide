/**
 * Interval 52 claim wave — wave49.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE49_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-dark-matter-omega-c',
    claim: 'CMB and large-scale structure fits constrain the cold dark matter density parameter Ω_c h² as a major component of the cosmic energy budget in standard ΛCDM.',
    detail: 'Parameter constraint within science_model framework; particle identity of dark matter remains open.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-ocdm', citation: 'Planck Collaboration baseline Ω_c h²; DESI combined cosmology papers.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-mesha-line-by-line',
    claim: 'The Mesha Stele’s narrative lines describe Moabite revolt against Israel and cultic acts including reference to vessels of YHWH — primary Moabite royal propaganda requiring line-level critical reading.',
    detail: 'Complements earlier Mesha/YHWH cards with source-critical propaganda-genre emphasis.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'mesha-lines', citation: 'Mesha Stele COS/ANET editions; Dearman / Routledge Moab studies.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-josephus-life-autobiography',
    claim: 'Josephus’s Life (Vita) is an autobiographical defense of his conduct in the Galilee war, written against Justus of Tiberias and other critics.',
    detail: 'Primary but highly self-interested; method hygiene for any Vita-dependent reconstruction.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-vita', citation: 'Josephus, Life; Mason, Life of Josephus commentary; Rajak Josephus studies.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-john-baptist-execution',
    claim: 'John the Baptist’s execution by Herod Antipas is independently attested by Josephus (Ant. 18) and the Gospels, with differing motive emphases — a high-confidence historical event framing Jesus’ early context.',
    detail: 'Multiple attestation across Jewish and Christian sources; theological meaning of John’s death is reception history.',
    tier: 'verified',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-ant18-john', citation: 'Josephus Ant. 18.116–119; Meier, A Marginal Jew Vol. 2; Synoptic beheading narratives.', kind: 'primary' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-latin-vetus-latina',
    claim: 'The Old Latin (Vetus Latina) tradition preserves pre-Vulgate Latin translations of the NT that sometimes retain ancient readings independent of later Vulgate standardization.',
    detail: 'Versional evidence requiring knowledge of Latin translation technique; not a substitute for Greek continuous-text witnesses.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'gryson-vetus', citation: 'Gryson / Vetus Latina editions; Metzger Early Versions (Latin); Houghton Latin NT text.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-thallus-mediated-only',
    claim: 'All surviving Thallus references to a darkness around the crucifixion period are mediated through later Christian citation chains; no independent Thallus manuscript survives.',
    detail: 'Reinforces mediated-citation limits; do not upgrade to VERIFIED astronomical corroboration of Gospel darkness.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'vanvoorst-thallus-mediated', citation: 'Van Voorst, Jesus Outside the New Testament; Africanus/Syncellus fragment chain.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-masada-siege-ramp',
    claim: 'The Roman siege ramp and camps at Masada are archaeologically documented landscape features matching Josephus’s account of the 73/74 CE siege in broad outline.',
    detail: 'War archaeology; Josephus’s mass-suicide narrative details remain debated relative to material evidence.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'yadin-masada-ramp', citation: 'Yadin, Masada; Ben-Tor / subsequent Masada reports; Magness on Josephus vs archaeology.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-ignatius-rome-letter',
    claim: 'Ignatius’s Letter to the Romans urgently seeks martyrdom and asks Roman Christians not to intervene — a primary early 2nd-c. window on episcopal self-understanding and martyr ideal.',
    detail: 'Reception of church order and martyrdom; not HJ primary biography.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'ignatius-rom', citation: 'Ignatius, To the Romans (middle recension; Holmes Apostolic Fathers).', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-wright-jesus-victory',
    claim: 'N.T. Wright’s Jesus and the Victory of God reconstructs Jesus as enacting Israel’s return-from-exile story within a critical-realist method — a major Third Quest synthesis still widely engaged and contested.',
    detail: 'Historiographic position card; complements Wright critical-realism method card with book-level thesis reporting.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'wright-jvg-thesis', citation: 'Wright, N.T. Jesus and the Victory of God; responses in historical Jesus literature.', kind: 'survey' }],
  }],
}

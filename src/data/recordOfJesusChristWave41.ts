/**
 * Interval 44 claim wave — wave41.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE41_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-sound-horizon-scale',
    claim: 'The sound horizon at recombination is a precisely measured scale from CMB acoustics that anchors BAO standard-ruler cosmology and absolute distance calibration in ΛCDM analyses.',
    detail: 'Links early-universe physics to late-time distance ladders; science_model parameter, not theological inference.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-rs', citation: 'Planck Collaboration sound-horizon / θ* constraints; DESI BAO rd discussions.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-hezekiah-bulla-provenanced',
    claim: 'A provenanced bulla reading “Belonging to Hezekiah [son of] Ahaz king of Judah” from controlled Ophel excavations is a primary royal seal impression of late-8th-century Judah.',
    detail: 'Provenanced excavation context upgrades confidence relative to market-sourced bullae; not a narrative verifier for every Kings episode.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'mazar-hezekiah-bulla', citation: 'Mazar, E. Ophel excavations; official IAA/Hebrew University reports on Hezekiah bulla.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-josephus-war-preface',
    claim: 'Josephus’s preface to the Jewish War frames his work as a corrective to other accounts and as written for both Roman and Jewish audiences under Flavian patronage.',
    detail: 'Source-critical method hygiene for all War-dependent claims: bias, audience, and patronage matter.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-war-preface', citation: 'Josephus, Jewish War 1.preface; Mason, Josephus and the New Testament.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-galilee-jewish-context-core',
    claim: 'Jesus’ public activity is overwhelmingly set in Jewish Galilee under Antipas, with pilgrimage and conflict episodes in Jerusalem — a geographical core shared across critical reconstructions.',
    detail: 'Geography core judgment; specific itinerary details remain reconstructed from Gospel narratives.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'freyne-galilee', citation: 'Freyne, Galilee and Gospel; Reed, Archaeology and the Galilean Jesus; Sanders outline.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-majority-text-debate',
    claim: 'Majority Text / Byzantine-priority theories argue the numerically dominant medieval form best represents the initial text; most critical editors instead prefer earlier diverse witnesses weighted by genealogy and internal evidence.',
    detail: 'Edition-philosophy debate; not a claim that Byzantine readings are never original.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'robinson-majority', citation: 'Robinson/Pierpont Majority Text defenses; Wallace / Metzger critical-text responses; ECM method papers.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-thallus-original-lost',
    claim: 'Thallus’s histories survive only in later Christian citations (e.g., Julius Africanus via Syncellus); no independent first-century Thallus manuscript exists to verify crucifixion-darkness claims.',
    detail: 'Reinforces mediated-citation limits: report the chain, do not upgrade to VERIFIED astronomical proof.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'africanus-syncellus', citation: 'Julius Africanus fragments via Syncellus; Van Voorst Thallus discussion.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-tiberias-gate-complex',
    claim: 'Tiberias excavations document city gates, streets, and public architecture of the Antipas foundation and later Roman phases on the western Sea of Galilee shore.',
    detail: 'Urban archaeology of the tetrarchic capital; Gospel narratives more often set in smaller towns.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'hirschfeld-tiberias-gate', citation: 'Hirschfeld / later Tiberias excavation reports; Josephus Life/Ant. on Tiberias.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-eusebius-chronicon',
    claim: 'Eusebius’s Chronicon (Chronicle) synchronizes biblical, Near Eastern, and Greco-Roman timelines — foundational for later Christian world chronology and for preserving fragments of lost authors.',
    detail: 'Reception of Christian historiography; absolute year assignments often disputed by modern chronology.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'eusebius-chronicon', citation: 'Eusebius, Chronicon (Armenian/Latin traditions; critical studies); Burgess/Mosshammer chronology literature.', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-criteria-dissimilarity-limits',
    claim: 'The double dissimilarity criterion (authentic if unlike Judaism and early church) is now widely criticized for producing a de-Judaized Jesus and is largely retired as a primary authenticity engine.',
    detail: 'Method history card: Third Quest corrections re-embed Jesus in Judaism; report the critique, not a replacement slogan as fact.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'theissen-winter', citation: 'Theissen & Winter, The Quest for the Plausible Jesus; Keith/Le Donne criteria critiques.', kind: 'peer_reviewed' }],
  }],
}

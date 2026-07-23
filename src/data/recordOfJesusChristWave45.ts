/**
 * Interval 48 claim wave — wave45 (crosses 500-claim milestone).
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE45_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-cmb-lensing-potential',
    claim: 'Reconstruction of the CMB lensing potential map provides a projected mass map of the universe and an independent growth-of-structure probe within ΛCDM.',
    detail: 'Complements generic CMB lensing card with potential-map product focus. Science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-lensing-map', citation: 'Planck Collaboration lensing potential maps; ACT/SPT lensing reconstructions.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-lmlk-iconography',
    claim: 'lmlk jar handles carry royal iconography (scarab/winged sun variants) and place-name stamps — primary visual-administrative evidence for late-8th-century Judah.',
    detail: 'Complements earlier lmlk distribution cards with iconographic/administrative typology focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'lipschits-icon', citation: 'Lipschits / Sergi / Koch lmlk typology studies; Vaughn administrative Judah.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-mikveh-jerusalem-density',
    claim: 'Jerusalem shows an exceptionally high density of late Second Temple miqva’ot, reflecting intensified purity practice among residents and pilgrims.',
    detail: 'Archaeological density pattern; complements general miqva’ot cards with capital-city focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'reich-jerusalem-miqveh', citation: 'Reich, miqva’ot of Jerusalem studies; Adler purity archaeology surveys.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-resurrection-appearances-early',
    claim: 'Early Christian proclamation included claims of post-crucifixion appearances (notably 1 Cor 15:3–8); historians debate the nature of those experiences while treating the early proclamation itself as well attested.',
    detail: 'Method: separate early claim-attestation from ontological resurrection as laboratory fact (out of scope as VERIFIED).',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'allison-appearances', citation: 'Allison, Resurrecting Jesus; Lüdemann / Wright / Ehrman appearance debates; 1 Cor 15 critical commentaries.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-p46-collection-shape',
    claim: 'Papyrus P46 is an early substantial Pauline collection whose book order and contents inform debates on early Pauline corpus formation.',
    detail: 'Complements P46 dating cards with collection-shape focus; not a complete modern NT canon snapshot.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'kenyon-p46-order', citation: 'Kenyon / Comfort P46 studies; Royse / Epp discussions of early Pauline collections.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-tacitus-annals-christians-frame',
    claim: 'Tacitus frames Christians as a hated group blamed by Nero after the Rome fire — valuable for Roman elite attitude and the Christus–Pilate notice nested in Annals 15.44.',
    detail: 'Literary framing of persecution memory; not independent biography of Jesus’ teachings.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'tacitus-nero-frame', citation: 'Tacitus Ann. 15.44; Van Voorst; Cook, Roman Attitudes Toward the Christians.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caesarea-harbor-herod',
    claim: 'Herod’s artificial harbor at Caesarea Maritima (Sebastos) is a major engineering achievement documented by underwater and terrestrial archaeology.',
    detail: 'Complements Caesarea administrative cards with harbor-engineering focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'raban-sebastos', citation: 'Raban / Hohlfelder Caesarea harbor projects; Netzer Herodian architecture.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-polycarp-martyrdom-text',
    claim: 'The Martyrdom of Polycarp is an early Christian martyr narrative (mid-2nd c. core with possible later shaping) describing Polycarp’s death at Smyrna.',
    detail: 'Reception of martyrdom ideal; historical kernel widely accepted with literary development debated.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'mart-polycarp', citation: 'Martyrdom of Polycarp (Holmes Apostolic Fathers; critical editions); Dehandschutter studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-memory-approach-limits',
    claim: 'Social memory approaches to the historical Jesus emphasize how communities remember rather than how criteria recover authentic atoms — a major 21st-century method turn with its own limits and disputes.',
    detail: 'Complements earlier memory cards with explicit limits: memory models can under-determine unique events.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'keith-memory-limits', citation: 'Keith & Le Donne (eds.), Jesus, Criteria, and the Demise of Authenticity; Kirk/Thatcher memory volumes.', kind: 'peer_reviewed' }],
  }],
}

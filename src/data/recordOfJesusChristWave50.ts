/**
 * Interval 53 claim wave — wave50.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE50_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-omega-lambda',
    claim: 'Late-time acceleration measurements and CMB fits constrain a dominant dark-energy density parameter Ω_Λ ≈ 0.7 in flat ΛCDM baselines.',
    detail: 'Parameter status within science_model; microphysical nature of dark energy remains open (including w(z) tests).',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-olambda', citation: 'Planck Collaboration baseline Ω_Λ; supernova + BAO combined constraints.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-tel-dan-bytdwd-reading',
    claim: 'The Tel Dan stele’s bytdwd reading is widely accepted as “House of David,” though minority alternative readings exist and must be labeled as such.',
    detail: 'Epigraphic consensus with residual debate — method: report majority + minority without silencing either.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'biran-naveh-bytdwd', citation: 'Biran & Naveh Tel Dan publications; subsequent bytdwd debates in IEJ/BASOR.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-qumran-pesharim',
    claim: 'Qumran pesharim (continuous commentaries) interpret prophetic books as fulfilled in the community’s history — primary evidence of Second Temple exegetical method.',
    detail: 'Reception of prophecy; not a template that automatically validates later Christian pesher-like readings as historical proof.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'horgan-pesharim', citation: 'Horgan, Pesharim; DJD pesher editions; Brooke on Qumran exegesis.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-tax-collectors-core',
    claim: 'Jesus’ association with tax collectors is multiply attested in Synoptic tradition and is widely treated as historically distinctive given the profession’s social stigma.',
    detail: 'Social-historical core; later church moral lessons are reception history.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'donahue-tax', citation: 'Donahue / scholarly surveys of tax collectors in Jesus tradition; Dunn Jesus Remembered.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-vulgate-jerome',
    claim: 'Jerome’s Vulgate became the dominant Latin Bible of the medieval West; critical editions distinguish Vulgate text forms from earlier Vetus Latina strata.',
    detail: 'Edition-history card; Vulgate is reception of Latin scripture, not the earliest recoverable Greek initial text.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'weber-vulgate', citation: 'Weber/Gryson Vulgate editions; Houghton, The Latin New Testament.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-lucian-christians-frame',
    claim: 'Lucian’s satirical frame treats Christians as gullible followers of a crucified sophist — elite mockery evidence for known Christian devotion in the 2nd century.',
    detail: 'Complements earlier Lucian cards with genre-frame emphasis; not independent biography.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'lucian-peregrinus-frame', citation: 'Lucian, De Morte Peregrini; Van Voorst; Edwards on Lucian and Christians.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-herodium-upper-palace',
    claim: 'Herodium’s upper palace-fortress cylinder and associated structures document elite Herodian military-residential architecture overlooking the Judean desert edge.',
    detail: 'Complements lower-palace and tomb-debate cards with upper complex focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'netzer-upper-herodium', citation: 'Netzer, The Architecture of Herod; Herodium upper palace excavation reports.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-polycarp-philippians-reception',
    claim: 'Polycarp’s Philippians shows early reception of Paul and other NT writings as authoritative for church order and ethics in the early 2nd century.',
    detail: 'Complements earlier Polycarp cards with explicit NT-reception focus; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'polycarp-phil-reception', citation: 'Polycarp, Philippians (Holmes); Berding / Hartog reception studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-fredriksen-from-jesus-to-christ',
    claim: 'Paula Fredriksen’s From Jesus to Christ maps trajectories from the historical Jesus to early christological development within Jewish and Roman contexts.',
    detail: 'Historiographic synthesis; debates continue on pace and causes of “parting of the ways.”',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'fredriksen-fjt', citation: 'Fredriksen, P. From Jesus to Christ; When Christians Were Jews.', kind: 'survey' }],
  }],
}

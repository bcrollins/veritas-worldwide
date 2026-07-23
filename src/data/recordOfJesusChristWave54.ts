/**
 * Interval 57 claim wave — wave54.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE54_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-growth-rate-fs8',
    claim: 'Redshift-space distortion and weak-lensing analyses constrain the structure growth rate combination fσ8, testing general-relativistic growth in ΛCDM.',
    detail: 'Growth probe complementary to geometric BAO/SN distances; science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'desi-fs8', citation: 'DESI / eBOSS fσ8 growth-rate papers; KiDS/DES lensing S8 comparisons.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-siloam-pool-context',
    claim: 'The Pool of Siloam area in Jerusalem is archaeologically associated with water systems fed by Hezekiah’s tunnel — primary urban-hydraulic context for Iron Age and later city life.',
    detail: 'Complements Siloam inscription/tunnel cards with pool-context focus; Gospel episode identification is separate.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'reich-siloam-pool', citation: 'Reich/Shukron Siloam Pool publications; City of David excavation reports.', kind: 'survey' }],
  }],
  'second-temple': [{
    id: 'st-herod-josephus-portrait',
    claim: 'Josephus’s portrait of Herod the Great mixes administrative achievement with tyranny narratives shaped by sources and Flavian context — primary but tendentious.',
    detail: 'Method hygiene for all Herod-dependent historical claims.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'richardson-herod', citation: 'Josephus Ant./War Herod narratives; Richardson, Herod; Netzer architecture controls.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-prayer-abba-limits',
    claim: 'While Abba/Father address is early and distinctive in Jesus tradition, claims that Abba was unique, infantile, or unprecedented in Judaism are overstated relative to broader evidence.',
    detail: 'Complements Abba/Lord’s Prayer cards with overclaim hygiene.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'barr-abba', citation: 'Barr, “Abba isn’t Daddy”; Jeremias Prayers of Jesus; Dunn Jesus Remembered.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-gothic-version',
    claim: 'The Gothic version (Wulfila tradition) is an early Germanic translation of the NT preserving valuable versional evidence, especially where Greek witnesses diverge.',
    detail: 'Translation technique and limited manuscript survival constrain weight per unit.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-gothic', citation: 'Metzger, The Early Versions (Gothic); Falluomini Gothic Bible studies.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-suetonius-nero-christians',
    claim: 'Suetonius mentions punishments of Christians under Nero in a list of Nero’s acts — brief Roman elite notice of Christian presence in Rome, not a Jesus biography.',
    detail: 'Complements Tacitus Nero-frame with Suetonius’s briefer notice; independence and sources debated.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'suetonius-nero-16', citation: 'Suetonius, Nero 16.2; Van Voorst; Cook Roman Attitudes.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-jerusalem-cardo',
    claim: 'The Cardo Maximus and related Roman street systems in Jerusalem document post-70 / Aelia Capitolina urban reorganization visible in excavation and Madaba map tradition.',
    detail: 'Later Roman city planning; frames post-revolt urban change, not first-century Gospel streets one-to-one.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'avigad-cardo', citation: 'Avigad Jewish Quarter / Cardo reports; subsequent Aelia Capitolina surveys.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-clement-corinthians-order',
    claim: '1 Clement addresses Corinthian church disorder by appealing to apostolic succession ideals and OT examples — early Roman Christian intervention in another city’s church life.',
    detail: 'Complements 1 Clement structure card with order/authority focus; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'clement-order', citation: '1 Clement (Holmes); Lona Der erste Clemensbrief; Jeffers social-historical studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-allison-constructing-jesus',
    claim: 'Dale C. Allison Jr.’s Constructing Jesus argues for remembering patterns and extended discourses rather than only isolated authentic atoms — a major alternative to strict criteria method.',
    detail: 'Historiographic method landmark in post-criteria HJ research.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'allison-constructing-book', citation: 'Allison, D.C. Constructing Jesus; related essays on memory and method.', kind: 'survey' }],
  }],
}

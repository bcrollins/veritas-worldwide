/**
 * Interval 19 claim wave.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'

interface RocSource {
  id: string
  citation: string
  url?: string
  kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific'
}

interface RocClaim {
  id: string
  claim: string
  detail: string
  tier: ScholarlyEvidenceTier
  proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'
  sources: RocSource[]
  confidenceNote?: string
}

export const ROC_WAVE16_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-weak-lensing',
    claim: 'Weak gravitational lensing maps the projected mass distribution of the universe and constrains S8/σ8 amplitude parameters in ΛCDM fits.',
    detail: 'Independent of distance-ladder H0. Active tension research with CMB S8 inferences in some analyses.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'kids-des-lensing', citation: 'KiDS / DES weak-lensing cosmology papers.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-deir-alla',
    claim: 'The Deir Alla inscription mentions Balaam son of Beor — a rare extra-biblical onomastic parallel to Numbers 22–24 traditions.',
    detail: 'Primary Transjordan text. Literary relationship to Numbers is debated; name correspondence is the solid datum.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'hoftijzer-deiralla', citation: 'Hoftijzer, J. & van der Kooij, G. Aramaic Texts from Deir Alla.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-roman-census-practices',
    claim: 'Roman provincial censuses and tax registrations are documented empire-wide; Luke’s census of Quirinius is a specific chronological crux relative to Herod’s death.',
    detail: 'General practice verified; Luke 2 chronology remains contested among historians.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'schurer-census', citation: 'Schürer revised; Josephus Ant. 18 on Quirinius; Luke 2 discussions in BDAG/commentaries.', kind: 'survey' }],
  }],
  'historical-jesus': [{
    id: 'hj-healings-reputation',
    claim: 'Healing activity is multiply attested as part of Jesus’ public reputation in Synoptic tradition; historians often accept a healing reputation while bracketing modern medical ontologies.',
    detail: 'Reputation ≠ clinical verification of each pericope. Method separates social report from metaphysics.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-healings', citation: 'Meier, A Marginal Jew, Vol. 2 (healings); Eve, The Healer from Nazareth.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-singular-readings',
    claim: 'Singular readings (unique to one MS) are used in scribal-habits studies to profile individual copyists without treating them as initial text.',
    detail: 'Royse-style method. Supports mechanical-error models and caution against over-harmonizing rare variants into the initial text.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'royse-singular', citation: 'Royse, J.R. Scribal Habits in Early Greek New Testament Papyri.', kind: 'peer_reviewed' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-marcus-aurelius-christians',
    claim: 'Marcus Aurelius (Meditations) and second-century elite literature occasionally notice Christians as a social type; such notices are thin and polemical.',
    detail: 'Social presence evidence only. Not a Jesus biography control.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'wilken-christians', citation: 'Wilken, R.L. The Christians as the Romans Saw Them. Yale UP.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caesarea-philippi',
    claim: 'Paneas / Caesarea Philippi (Banias) is archaeologically documented as a Herodian/Philip city at the Jordan headwaters with a Paneion cult site.',
    detail: 'Geographic setting for Mark 8 / Matthew 16 traditions. Archaeology confirms the site; episodes remain literary-historical.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'berlin-paneas', citation: 'Berlin, A.M. Paneas/Caesarea Philippi excavations literature.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-diognetus',
    claim: 'The Epistle to Diognetus (2nd/3rd c.?) is an early Christian apology describing Christian life as a civic “soul of the world.”',
    detail: 'Reception of Christian identity rhetoric. Not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'diognetus-af', citation: 'Epistle to Diognetus in Apostolic Fathers / early Christian literature editions.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-memory-distortion',
    claim: 'Social memory research emphasizes both conservation and distortion in group remembering — neither pure invention nor pure stenography.',
    detail: 'Balances naive reliability and cynical fabrication models for Gospel tradition.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'kirk-memory', citation: 'Kirk, A. / Thatcher, T. memory and tradition essays; Keith, Jesus’ Literacy.', kind: 'peer_reviewed' }],
  }],
}

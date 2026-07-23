/**
 * Interval 50 claim wave — wave47.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE47_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-scalar-spectral-tilt',
    claim: 'A red-tilted scalar spectral index (n_s < 1) from CMB data is a key empirical success for slow-roll inflation model classes, though many specific models remain viable.',
    detail: 'Complements spectral-index parameter card with model-class implication focus. Science_model.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-inflation', citation: 'Planck Collaboration inflation papers; n_s constraints vs slow-roll predictions.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-hezekiah-tunnel-inscription-language',
    claim: 'The Siloam Tunnel inscription’s Hebrew narrative describes the breakthrough meeting of two work crews — primary linguistic evidence for late-8th-century Judahite Hebrew in a royal engineering context.',
    detail: 'Complements engineering/tunnel cards with language/epigraphy focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'siloam-hebrew', citation: 'Siloam inscription editions (COS/Ahituv); Istanbul Archaeology Museums.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-essene-josephus-limits',
    claim: 'Josephus’s Essene descriptions are literary ethnography with idealizing features; equating every detail with Qumran archaeology is methodologically unsafe.',
    detail: 'Complements Essene hypothesis card with source-criticism of Josephus’s ethnography.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'mason-essenes', citation: 'Mason / Taylor Essene studies; Josephus War/Ant. Essene passages.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-apocalyptic-prophet-core',
    claim: 'A broad stream of critical scholarship reconstructs Jesus as an apocalyptic Jewish prophet announcing God’s imminent kingdom — a mainstream option over purely sapiential or cynic models.',
    detail: 'Complements Ehrman apocalyptic card with core-consensus framing; still contested at the margins.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'sanders-apocalyptic', citation: 'Sanders, Jesus and Judaism; Allison, Jesus of Nazareth; Ehrman apocalyptic prophet volume.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-syriac-peshitta-witness',
    claim: 'The Syriac Peshitta is a major early version of the NT with complex textual relationships to Greek traditions; it is essential for versional evidence and Eastern reception history.',
    detail: 'Translation technique and revision history require specialized control when citing Peshitta readings.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'peshitta-studies', citation: 'Metzger Early Versions (Syriac); Kiraz / Peshitta Institute editions.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-josephus-tf-partial-authenticity',
    claim: 'The majority critical position on the Testimonium Flavianum holds that Josephus wrote a shorter notice later expanded by Christian scribes; total authenticity and total forgery are minority positions.',
    detail: 'Complements earlier TF cards with explicit partial-authenticity majority map.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'meier-tf-partial', citation: 'Meier, A Marginal Jew (TF); Whealey, Josephus on Jesus; Feldman surveys.', kind: 'peer_reviewed' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-sea-galilee-boat-context',
    claim: 'The first-century “Galilee Boat” (Ginosar) provides rare preserved wood hull evidence for lake fishing craft in the Jesus-era economic landscape.',
    detail: 'Material culture of fishing; not a Gospel episode identifier.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'werdin-boat', citation: 'Wachsmann / Galilee Boat conservation and publication; Ginosar museum displays.', kind: 'museum' }],
  }],
  'early-christian-literature': [{
    id: 'ec-didache-two-ways',
    claim: 'The Didache opens with a “Two Ways” ethical treatise (way of life / way of death) paralleling Jewish dual-path instruction traditions.',
    detail: 'Complements earlier Didache cards with Two Ways literary focus; dating commonly late 1st / early 2nd c.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'didache-twoways', citation: 'Niederwimmer, The Didache; Holmes Apostolic Fathers; Two Ways tractate comparisons.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-ehrman-forged-debates',
    claim: 'Bart Ehrman’s Forged / Forgery and Counterforgery arguments about pseudepigraphy in early Christian literature are widely discussed and contested regarding scope, intent categories, and ancient authorial norms.',
    detail: 'Historiographic debate card on authorship practices — not a blanket verdict on every traditional attribution.',
    tier: 'interpretive',
    proofVsConcept: 'debate',
    sources: [{ id: 'ehrman-forged', citation: 'Ehrman, Forged; Forgery and Counterforgery; critical responses in NTS/JBL literature.', kind: 'survey' }],
  }],
}

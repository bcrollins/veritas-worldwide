/**
 * Interval 60 claim wave — wave57.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE57_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-recombination-epoch',
    claim: 'CMB photons last-scatter at recombination (z ≈ 1090), when the universe cooled enough for neutral hydrogen to form — the surface of last scattering underlying the acoustic peak pattern.',
    detail: 'Foundational early-universe physics for all CMB parameter cards; science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-recomb', citation: 'Planck Collaboration recombination / last-scattering papers; standard cosmology textbooks.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-babylonian-chronicle-method',
    claim: 'Babylonian Chronicles are annalistic royal records requiring critical reading of selection, year formulas, and political framing when used as controls for biblical chronology.',
    detail: 'Method hygiene for Chronicle-dependent Judah claims (e.g., 597 BCE).',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'grayson-chronicles', citation: 'Grayson, Assyrian and Babylonian Chronicles; COS translations; Grabbe method essays.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-war-scroll-detail',
    claim: 'The War Scroll (1QM) details eschatological battle organization, purity rules, and dualistic warfare ideology within a Qumran-related literary milieu.',
    detail: 'Complements earlier War Scroll cards with organization/purity detail focus.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: '1qm-detail', citation: '1QM critical editions; Duhaime War Scroll studies; DSS study editions.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-jerusalem-final-visit',
    claim: 'A final Jerusalem visit culminating in arrest and crucifixion is a near-universal element of historical Jesus outlines across competing schools.',
    detail: 'Outline strength ≠ certainty of every Passion narrative detail (trial scripts, words from the cross, etc.).',
    tier: 'verified',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'sanders-final-visit', citation: 'Sanders historical outline; Brown Death of the Messiah; Dunn Jesus Remembered.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-ethiopic-version',
    claim: 'The Ethiopic (Geʿez) version of the NT is a major African versional tradition with complex Greek/Syriac relationships and later revision history.',
    detail: 'Specialized apparatus contribution; translation layers must be controlled.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-ethiopic', citation: 'Metzger, The Early Versions (Ethiopic); Zuurmond / Ethiopic NT projects.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-pliny-carmen-limits',
    claim: 'Pliny’s report of Christians singing a carmen to Christ “as to a god” is early 2nd-c. devotion language; it does not by itself prove first-century christology details or HJ biography.',
    detail: 'Complements earlier Pliny hymn cards with chronological/theological overclaim limits.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'pliny-carmen-limits', citation: 'Pliny Ep. 10.96; Hurtado Lord Jesus Christ; Van Voorst.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-herodium-pool-complex',
    claim: 'Herodium’s large pool complex and associated lower-palace gardens document Herodian luxury landscaping and water engineering at monumental scale.',
    detail: 'Complements upper/lower palace cards with pool-complex focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'netzer-pool', citation: 'Netzer Herodium pool/garden reports; The Architecture of Herod.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-ignatius-magnesians',
    claim: 'Ignatius’s Letter to the Magnesians opposes “Judaizing” practices and urges unity under bishop, presbyters, and deacons — early 2nd-c. evidence of identity boundary rhetoric.',
    detail: 'Reception of Christian–Jewish boundary discourse; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'ignatius-magn', citation: 'Ignatius, To the Magnesians (middle recension; Holmes Apostolic Fathers).', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-crossan-inventory-method',
    claim: 'Crossan’s inventory method ranked Gospel and extracanonical units by attestation strata — an influential Jesus Seminar–era procedure widely critiqued for circularity and source assumptions.',
    detail: 'Method history card; report procedure and critiques without advocacy.',
    tier: 'interpretive',
    proofVsConcept: 'debate',
    sources: [{ id: 'crossan-inventory', citation: 'Crossan, The Historical Jesus (inventory); critiques in Meier/Wright/Allison literature.', kind: 'survey' }],
  }],
}

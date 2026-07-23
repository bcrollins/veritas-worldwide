/**
 * Interval 40 claim wave — wave37.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE37_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-neutrino-mass-sum',
    claim: 'Cosmology and oscillation experiments jointly constrain the sum of neutrino masses; oscillation proves non-zero mass while cosmological bounds limit the absolute scale.',
    detail: 'Cross-probe science_model; laboratory β-decay and cosmological upper limits are complementary.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-sum-mnu', citation: 'Planck Collaboration neutrino mass sum constraints; Particle Data Group oscillation reviews.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-babylonian-chronicle-597',
    claim: 'The Babylonian Chronicle records Nebuchadnezzar’s 597 BCE capture of Jerusalem and installation of a new king — primary cuneiform control for the first Judean deportation horizon.',
    detail: 'Chronicle genre is annalistic; complements Jehoiachin ration tablets and 2 Kings 24.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'abc5-jerusalem', citation: 'Babylonian Chronicle ABC 5 (Jerusalem chronicle); Grayson Assyrian and Babylonian Chronicles; COS translations.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-4qmm-t',
    claim: '4QMMT (Miqsat Maʿaśe ha-Torah) presents halakhic rulings distinguishing a Qumran-related group from other Jewish authorities — primary evidence of legal sectarianism before 70 CE.',
    detail: 'Legal-letter form; relationship to yahad identity is scholarly reconstruction.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'qimron-strugnell-mmt', citation: 'Qimron & Strugnell, DJD X (4QMMT); Schiffman / Grossman discussions.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-abba-address',
    claim: 'Jesus’ use of “Abba” (Father) address in prayer tradition is widely treated as historically distinctive Aramaic piety language, though exact sociolinguistic uniqueness claims are debated.',
    detail: 'Complements Lord’s Prayer core card; avoid overclaiming that Abba was unprecedented or infantile.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'jeremias-abba', citation: 'Jeremias, The Prayers of Jesus (Abba); Barr, “Abba isn’t Daddy”; Dunn Jesus Remembered.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-acts-we-sections',
    claim: 'The “we” sections of Acts (first-person plural travel narrative) are a classic source-critical and textual phenomenon; explanations include eyewitness diary, literary device, or source incorporation.',
    detail: 'Not solved by apparatus alone; intersects higher criticism with continuous-text tradition.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'campbell-we-sections', citation: 'Campbell, The “We” Passages in the Acts of the Apostles; Fitzmyer Acts commentary; Porter essays.', kind: 'peer_reviewed' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-justus-tiberias-lost',
    claim: 'Justus of Tiberias wrote a lost history of Jewish kings and a Galilean war account known mainly via Josephus’s polemic — a reminder that non-Christian Judean historiography is incompletely preserved.',
    detail: 'Lost-source method card; cannot be mined for HJ details beyond the fact of competing local historiography.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'rajak-justus', citation: 'Josephus Life (Justus polemic); Rajak / Schürer discussions of Justus of Tiberias.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-en-gedi',
    claim: 'En-Gedi excavations document a long-lived oasis settlement with Second Temple through Byzantine strata, including agricultural and industrial remains along the Dead Sea western shore.',
    detail: 'Regional settlement archaeology; biblical toponym continuity is debated case-by-case.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'hirschfeld-engeddi', citation: 'Hirschfeld, En-Gedi excavations; subsequent IAA reports.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-tatian-diatessaron',
    claim: 'Tatian’s Diatessaron (late 2nd c.) is a gospel harmony that dominated Syriac Christian reading for centuries — major reception evidence for four-Gospel prestige and regional text forms.',
    detail: 'Harmony is secondary composition; reconstructing its exact Greek/Syriac base text is specialized and contested.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'petersen-diatessaron', citation: 'Petersen, W.L. Tatian’s Diatessaron; Joosten / Lange Diatessaron studies.', kind: 'survey' }],
  }],
  'modern-scholarship': [{
    id: 'mod-meier-marginal-method',
    claim: 'John P. Meier’s multi-volume A Marginal Jew models exhaustive criteria-based historical Jesus research with explicit uncertainty ratings — a methodological benchmark for the Third Quest.',
    detail: 'Historiographic method card; later memory approaches critique criteria foundations while still using Meier as a reference corpus.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-marginal-jew', citation: 'Meier, J.P. A Marginal Jew (5 vols.); method discussions in Keith/Le Donne volumes.', kind: 'survey' }],
  }],
}

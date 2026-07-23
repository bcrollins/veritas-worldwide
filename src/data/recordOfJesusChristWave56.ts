/**
 * Interval 59 claim wave — wave56.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE56_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-dark-energy-w0',
    claim: 'Cosmological fits commonly parameterize dark energy’s equation of state today as w0; current data are consistent with a cosmological constant (w ≈ −1) within uncertainties, while Stage-IV surveys test deviations.',
    detail: 'Parameter-level science_model; complements DESI BAO dynamics cards.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'desi-w0', citation: 'DESI dark-energy equation-of-state papers; Planck + SN Ia combined w constraints.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-hezekiah-lmlk-distribution',
    claim: 'Spatial distribution of lmlk jar handles concentrates in late-8th-century Judahite sites, supporting royal administrative networks under Assyrian pressure.',
    detail: 'Complements iconography/lmlk cards with geographic distribution focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'lipschits-distribution', citation: 'Lipschits / Sergi / Koch lmlk distribution studies; Vaughn administrative Judah.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-philo-special-laws',
    claim: 'Philo’s Special Laws treatises expound Torah commandments for a Hellenistic Jewish audience, combining literal and allegorical exegesis.',
    detail: 'Literary-legal context for diaspora Judaism; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-spec', citation: 'Philo, De Specialibus Legibus (Loeb); Runia Philo surveys.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-table-fellowship-sinners-limits',
    claim: 'Open table fellowship with “sinners” is widely accepted as historical practice, but reconstructing exact social boundaries and later church expansions of the motif requires caution.',
    detail: 'Complements table-fellowship core cards with limits hygiene.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'dunn-table-limits', citation: 'Dunn, Jesus Remembered; Crossan open commensality debates; Sanders practice studies.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-georgian-version',
    claim: 'The Georgian version of the NT is an early Caucasian versional tradition that contributes independent readings to the critical apparatus in selected units.',
    detail: 'Specialized versional evidence; translation technique controls weight.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-georgian', citation: 'Metzger, The Early Versions (Georgian); Birdsall / Georgian Bible studies.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-josephus-ant20-james-context',
    claim: 'Josephus Ant. 20.200 places James’s death in a high-priestly succession conflict under Albinus — political context that frames the “brother of Jesus called Christ” notice.',
    detail: 'Complements James authenticity cards with succession-politics context.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-ant20-context', citation: 'Josephus Ant. 20.197–203; Mason/Feldman discussions.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-tiberias-cardo-roman',
    claim: 'Tiberias excavations include Roman street systems and public architecture reflecting the city’s role as a lakeside urban center after Antipas’s foundation.',
    detail: 'Complements gate-complex cards with street/urban plan focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'hirschfeld-tiberias-street', citation: 'Hirschfeld / later Tiberias excavation reports; Josephus Life/Ant.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-didache-baptism-rules',
    claim: 'The Didache’s baptism instructions (running water preference, trine immersion alternatives) preserve early Christian ritual diversity before later liturgical standardization.',
    detail: 'Complements earlier Didache eucharist/two-ways cards with baptismal focus.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'didache-baptism', citation: 'Niederwimmer, The Didache; Holmes Apostolic Fathers; baptism section commentaries.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-ehrman-did-jesus-exist',
    claim: 'Bart Ehrman’s Did Jesus Exist? argues against mythicist denial of a historical Jesus using standard historical methods — a widely cited popular-scholarly intervention in the existence debate.',
    detail: 'Historiographic position card; mythicist counter-literature remains active at the margins of the guild.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'ehrman-exist', citation: 'Ehrman, B.D. Did Jesus Exist?; Carrier/other mythicist responses; Van Voorst source inventory.', kind: 'survey' }],
  }],
}

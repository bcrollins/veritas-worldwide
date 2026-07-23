/**
 * Interval 62 claim wave — wave59.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE59_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-neutrino-hierarchy-limits',
    claim: 'Oscillation data establish mass-squared differences among neutrino mass states, while cosmology bounds the absolute mass sum — hierarchy (normal vs inverted) remains under active experimental test.',
    detail: 'Cross-probe science_model; complements mass-sum cards without claiming hierarchy detection.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'pdg-hierarchy', citation: 'Particle Data Group neutrino reviews; Planck/DESI mass-sum bounds; oscillation experiments.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-sennacherib-lachish-reliefs',
    claim: 'Assyrian palace reliefs depict the siege of Lachish with detailed military engineering — primary visual propaganda for Sennacherib’s 701 BCE campaign.',
    detail: 'Complements prism texts; reliefs are Assyrian narrative art, not neutral photography.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'bm-lachish-reliefs', citation: 'British Museum Lachish reliefs; Ussishkin Lachish; Grabbe Sennacherib volume.', kind: 'museum' }],
  }],
  'second-temple': [{
    id: 'st-philo-every-good-man',
    claim: 'Philo’s Every Good Man is Free includes an idealized portrait of Essenes as virtuous philosophers — literary ethnography requiring critical reading against other sources.',
    detail: 'Complements Josephus Essene ethnography with Philo’s parallel idealization.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-prob', citation: 'Philo, Quod Omnis Probus Liber Sit (Loeb); Taylor Essene studies.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-kingdom-of-god-nearness',
    claim: 'Jesus’ kingdom proclamation includes nearness/urgency language in early tradition; historians debate present vs future emphasis without denying the kingdom theme’s centrality.',
    detail: 'Complements kingdom present/future card with nearness-language focus.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'dunn-nearness', citation: 'Dunn, Jesus Remembered; Allison Constructing Jesus; Sanders Jesus and Judaism.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-old-syriac-gospels',
    claim: 'The Old Syriac Gospel witnesses (Curetonian and Sinaitic) preserve an early Syriac translation layer distinct from the later Peshitta standardization.',
    detail: 'Key versional evidence for Gospel text history in the East.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-old-syriac', citation: 'Metzger Early Versions (Old Syriac); Kiraz / Syriac Gospel editions.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-tacitus-annals-genre',
    claim: 'Tacitus’s Annals is senatorial historiography with moral and political aims; notices about Christians must be read within that elite Roman genre, not as neutral police reports.',
    detail: 'Genre hygiene for Annals 15.44 and related notices.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'tacitus-genre', citation: 'Tacitus Annals introductions; Syme Tacitus; Cook Roman Attitudes.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caesarea-aqueduct',
    claim: 'The high-level aqueduct system supplying Caesarea Maritima is a major Herodian/Roman hydraulic work documented by archaeology along the coastal plain.',
    detail: 'Urban infrastructure of the provincial capital; complements harbor/theater cards.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'caesarea-aqueduct', citation: 'Caesarea aqueduct surveys; Porath / later IAA reports.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-ignatius-trallians',
    claim: 'Ignatius’s Letter to the Trallians warns against docetic denial of Jesus’ flesh and urges submission to the bishop — early 2nd-c. anti-docetic and monepiscopal rhetoric.',
    detail: 'Reception of christology and church order; not HJ primary biography.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'ignatius-trall', citation: 'Ignatius, To the Trallians (middle recension; Holmes Apostolic Fathers).', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-wright-ntpg',
    claim: 'N.T. Wright’s The New Testament and the People of God sets a critical-realist worldview framework for reading early Judaism and Christianity as story-shaped communities.',
    detail: 'Method/worldview prolegomenon to Wright’s Jesus and Paul volumes.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'wright-ntpg', citation: 'Wright, N.T. The New Testament and the People of God.', kind: 'survey' }],
  }],
}

/**
 * Interval claim wave — wave65.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE65_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-inflation-horizon-problem',
    claim: 'Cosmic inflation is a science_model framework that can solve the horizon and flatness problems by a period of accelerated early expansion; it is constrained by CMB observables (n_s, r upper limits) rather than proven as unique history.',
    detail: 'Model status: successful phenomenology does not equal unique proof of a specific inflaton potential.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'guth-linde-inflation', citation: 'Guth inflation; Linde chaotic inflation reviews; Planck inflation constraints.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-cyrus-cylinder-policy-w65',
    claim: 'The Cyrus Cylinder (British Museum) records Achaemenid royal ideology of restoration of cults after Babylon’s fall — often compared with biblical return traditions without equating the cylinder to Ezra–Nehemiah narrative detail.',
    detail: 'Primary Persian propaganda text; biblical parallel is interpretive correlation, not identity of documents.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'bm-cyrus', citation: 'British Museum Cyrus Cylinder; ANET/COS; Kuhrt Achaemenid studies.', kind: 'museum', url: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941' }],
  }],
  'second-temple': [{
    id: 'st-herod-temple-expansion-w65',
    claim: 'Herod’s expansion of the Temple Mount platform is archaeologically and literarily well-documented; the scale of the project shapes reconstructions of pilgrimage economy and Jesus’ Temple scenes as urban stage.',
    detail: 'Architectural fact of Herodian expansion; Gospel scene authenticity remains separate method questions.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'netzer-herod-temple', citation: 'Netzer Herodian architecture; Ritmeyer Temple Mount studies; Josephus War/Ant.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-kingdom-language-range',
    claim: '“Kingdom of God/Heaven” language is multiply attested across Gospel streams and is widely treated as characteristic of Jesus’ proclamation, while the precise eschatological meaning (present/future/both) remains debated.',
    detail: 'Core motif consensus vs. interpretive models of kingdom timing are distinct layers.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-kingdom', citation: 'Meier A Marginal Jew kingdom discussions; Sanders; Wright; Allison kingdom studies.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-codex-sinaiticus-scope',
    claim: 'Codex Sinaiticus (ℵ, 4th c.) is among the earliest nearly complete Christian Bibles in Greek and a primary continuous-text witness across OT (LXX) and NT for modern critical editions.',
    detail: 'Manuscript fact; individual readings still weighed unit-by-unit against B, A, papyri, and versions.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'sinaiticus-project', citation: 'Codex Sinaiticus Project; NA28 apparatus; Lake/Milne paleography literature.', kind: 'critical_edition', url: 'https://www.codexsinaiticus.org/' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-pliny-trajan-correspondence',
    claim: 'Pliny the Younger’s letter to Trajan (Ep. 10.96–97) describes early second-century Christian practice and Roman judicial handling in Bithynia-Pontus — primary non-Christian administrative evidence of the movement’s spread.',
    detail: 'Attested Roman official report; not a biography of Jesus, though it mentions Christian devotion to Christ.',
    tier: 'verified',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'pliny-ep10', citation: 'Pliny, Epistles 10.96–97 (Loeb); Sherwin-White commentary; Van Voorst.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-bethsaida-et-tell-debate',
    claim: 'Identification of New Testament Bethsaida with et-Tell (and competing sites) remains archaeologically debated; the debate itself is data about how Gospel geography is tested against excavation.',
    detail: 'Site-identification debate card; not a denial that a Bethsaida tradition exists in the sources.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'arav-bethsaida', citation: 'Arav Bethsaida excavations; Notley/Strange site debates; later IAA literature.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-ignatius-romans-martyrdom',
    claim: 'Ignatius of Antioch’s Letter to the Romans expresses eagerness for martyrdom and is a primary early second-century window on episcopal self-understanding and Roman Christian networks.',
    detail: 'Reception and church order; not a first-generation HJ narrative source.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'ignatius-romans', citation: 'Ignatius, Romans (Holmes Apostolic Fathers); Schoedel Hermeneia.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-fredriksen-jesus-jerusalem',
    claim: 'Paula Fredriksen’s work (e.g., Jesus of Nazareth, King of the Jews) models a historically Jewish Jesus within pilgrimage and purity frameworks while treating Gospel Passion politics with critical care.',
    detail: 'Historiographic landmark in Jewishness-of-Jesus research; conclusions remain debated.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'fredriksen-jnkoj', citation: 'Fredriksen, P. Jesus of Nazareth, King of the Jews; related essays.', kind: 'survey' }],
  }],
}

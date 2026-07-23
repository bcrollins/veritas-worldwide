/**
 * Interval claim wave — wave61.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE61_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-desi-bao-rd',
    claim: 'DESI Year-1 BAO measurements of the dilaton scale r_d and distance ratios test ΛCDM expansion history independently of CMB-calibrated early-universe priors when analyzed with flexible late-time models.',
    detail: 'Geometric probe status; dynamical dark-energy preference claims remain model-dependent and under active reanalysis.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'desi-y1-bao', citation: 'DESI Collaboration BAO papers (Y1); companion cosmology analyses.', kind: 'scientific', url: 'https://data.desi.lbl.gov/' }],
  }],
  'ancient-near-east': [{
    id: 'ane-lachish-reliefs-siege',
    claim: 'Assyrian palace reliefs of Sennacherib’s siege of Lachish (British Museum) are primary visual evidence of Neo-Assyrian military practice complementary to the prism annals and Level III destruction archaeology at Tel Lachish.',
    detail: 'Material and epigraphic streams corroborate a 701 BCE campaign frame; they do not independently narrate Jerusalem’s outcome.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'bm-lachish', citation: 'British Museum Sennacherib Lachish reliefs; Ussishkin Lachish excavations; Grabbe Sennacherib volume.', kind: 'museum', url: 'https://www.britishmuseum.org/collection/object/W_1856-0909-14-1' }],
  }],
  'second-temple': [{
    id: 'st-josephus-war-composition',
    claim: 'Josephus’s Jewish War was composed in Rome after 70 CE under Flavian patronage; its chronology and casualty figures require critical filtering even where topographical detail is strong.',
    detail: 'Primary narrative source with known rhetorical aims — attested_report for events, reconstruction for precise numbers.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'thackeray-war', citation: 'Josephus, Jewish War (Loeb/Thackeray); Mason / Rajak Josephus studies.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-embarrassment-method-limits',
    claim: 'The criterion of embarrassment (material unlikely invented because it was awkward for early Christians) is heuristic, not a proof rule; later communities could reframe awkward tradition for new purposes.',
    detail: 'Method hygiene: embarrassment can raise relative likelihood but cannot alone verify discrete sayings or deeds.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'theissen-embarrassment', citation: 'Theissen & Winter, The Quest for the Plausible Jesus; Keith/Le Donne criteria critiques.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-byzantine-text-majority',
    claim: 'The Byzantine (majority) textform dominates medieval Greek continuous-text manuscripts and often differs from the earliest Alexandrian witnesses at variation units used in modern critical editions.',
    detail: 'Descriptive stemmatic fact; majority counting is not an automatic authenticity argument (method hygiene).',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'hodges-farstad', citation: 'Aland/Aland Text of the NT; Robinson/Pierpont / Hodges-Farstad majority editions as descriptive corpora.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-mara-bar-serapion-letter',
    claim: 'The Syriac letter of Mara bar Serapion mentions a “wise king” executed by the Jews whose laws lived on; identification with Jesus is possible but not secure, and the letter’s date is debated (late first–third century).',
    detail: 'Circumstantial non-Christian notice if accepted; genre and dating uncertainties keep it off proof-grade biography.',
    tier: 'circumstantial',
    proofVsConcept: 'debate',
    sources: [{ id: 'vanvoorst-mara', citation: 'Van Voorst, Jesus Outside the New Testament; Cureton Spicilegium Syriacum; later Mara studies.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-capernaum-synagogue-phases',
    claim: 'Capernaum’s white limestone synagogue is generally dated to the Byzantine period (4th–5th c. CE) overlying earlier basalt structures; first-century synagogue identification depends on those earlier phases, not the standing limestone edifice alone.',
    detail: 'Stratigraphic distinction prevents anachronistic tour-guide claims about the standing building as Jesus’ synagogue.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'corbo-lothar', citation: 'Corbo / Loffreda Capernaum reports; Strange/Shanks synagogue surveys.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-papias-five-expositions',
    claim: 'Papias of Hierapolis (early 2nd c.) composed five books of Expositions of the Sayings of the Lord, now lost except for fragments preserved chiefly in Eusebius — including notes on Mark and Matthew traditions.',
    detail: 'Early reception evidence about gospel origins; Papias’s chain-of-tradition claims are themselves historical data requiring critical assessment.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'eusebius-papias', citation: 'Eusebius HE 3.39; Holmes Apostolic Fathers; Bauckham Jesus and the Eyewitnesses (Papias discussions).', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-meier-marginal-jew-method',
    claim: 'John P. Meier’s A Marginal Jew multi-volume project models exhaustive criterion-based HJ reconstruction with explicit tiers of judgment — a modern scholarly baseline even where individual conclusions remain contested.',
    detail: 'Historiographic landmark; method illustration, not endorsement of every Meier verdict.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-marginal', citation: 'Meier, J.P. A Marginal Jew (Anchor Yale / Doubleday multi-volume).', kind: 'survey' }],
  }],
}

/**
 * Interval 56 claim wave — wave53.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE53_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-matter-power-spectrum',
    claim: 'Galaxy surveys and weak lensing measure the matter power spectrum P(k), testing ΛCDM structure growth across scales.',
    detail: 'Independent growth probe complementary to CMB acoustic peaks; science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'desi-pk', citation: 'DESI / eBOSS / KiDS matter power spectrum and growth-rate papers.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-merneptah-people-not-city',
    claim: 'On the Merneptah Stele, “Israel” is marked with the determinative for a people/group rather than a city-state — a primary Egyptian classification detail in the earliest extra-biblical Israel reference.',
    detail: 'Epigraphic nuance; does not by itself settle settlement archaeology debates.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'hasel-determinative', citation: 'Hasel Merneptah studies; Kitchen / Redford discussions of the determinative.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-josephus-jewish-war-structure',
    claim: 'Josephus’s Jewish War is structured as a Flavian-era history of the revolt with preface, campaign narrative, and temple destruction climax — genre and patronage shape its presentation.',
    detail: 'Source-critical framing for all War-dependent claims.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'mason-war-structure', citation: 'Josephus, Jewish War; Mason, Flavius Josephus on the Pharisees / War introductions.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-galilean-crowds',
    claim: 'Synoptic traditions depict large crowds following Jesus in Galilee; historians treat popular following as plausible while numbers and miracle-crowd linkages remain reconstructed.',
    detail: 'Social-historical plausibility; crowd size figures in narrative are not laboratory counts.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'dunn-crowds', citation: 'Dunn, Jesus Remembered; Sanders historical outline; Synoptic crowd notices.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-sahidic-coptic',
    claim: 'The Sahidic Coptic version is among the earliest substantial Egyptian translations of the NT and a key versional witness in the critical apparatus.',
    detail: 'Complements Bohairic/general Coptic cards with dialect-priority focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'metzger-sahidic', citation: 'Metzger, The Early Versions (Sahidic); Horner / modern Sahidic editions.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-pliny-trajan-reply',
    claim: 'Trajan’s reply to Pliny (Ep. 10.97) instructs not to seek Christians out but to punish the obstinate if properly accused — primary imperial policy evidence for early 2nd-c. Christian legal status.',
    detail: 'Administrative policy; not HJ biography.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'pliny-trajan-97', citation: 'Pliny Ep. 10.96–97; Sherwin-White commentary; Cook Roman Attitudes.', kind: 'primary' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-sepphoris-roman-phases',
    claim: 'Sepphoris excavations document multi-phase Hellenistic–Roman–Byzantine urban development near Nazareth, framing debates about Galilee’s urban–village spectrum.',
    detail: 'Complements earlier Sepphoris cards with phase-development emphasis; not a Gospel episode proof.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'meyers-sepphoris-phases', citation: 'Meyers / Strange Sepphoris excavation literature; subsequent urban Galilee surveys.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-ignatius-ephesians',
    claim: 'Ignatius’s Letter to the Ephesians emphasizes unity under the bishop and eucharistic unity — early 2nd-c. evidence of monepiscopal ideals in Asia Minor.',
    detail: 'Reception of church order; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'ignatius-eph', citation: 'Ignatius, To the Ephesians (middle recension; Holmes Apostolic Fathers).', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-sanders-jesus-and-judaism-book',
    claim: 'E.P. Sanders’s Jesus and Judaism (1985) re-centered Jesus within covenantal Judaism and challenged anti-Jewish caricatures in earlier scholarship — a foundational Third Quest landmark.',
    detail: 'Historiographic landmark; subsequent refinements of covenantal nomism remain active.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'sanders-jaj', citation: 'Sanders, E.P. Jesus and Judaism; Judaism: Practice and Belief; later NPP debates.', kind: 'survey' }],
  }],
}

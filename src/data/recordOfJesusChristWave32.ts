/**
 * Interval 35 claim wave — wave32.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE32_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-jwst-high-z-galaxies',
    claim: 'James Webb Space Telescope observations of unexpectedly luminous high-redshift galaxies have prompted active model revisions for early structure formation and star-formation efficiency.',
    detail: 'Frontier observational science; parameter updates expected. Does not overturn expansion cosmology or BBN baseline cards.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'jwst-highz', citation: 'JWST early-release / CEERS / JADES high-z galaxy papers (Nature/ApJ series, ongoing).', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-samaria-ostraca',
    claim: 'The Samaria ostraca (Iron Age Israel) are primary Hebrew administrative dockets recording wine/oil deliveries and personal names in the Northern Kingdom capital region.',
    detail: 'Epigraphic control for Israelite literacy and fiscal administration; not a Kings narrative verifier for every episode.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'reisner-samaria', citation: 'Reisner/Fisher/Lyon Samaria publications; Ahituv Echoes from the Past (Samaria ostraca).', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-temple-scroll',
    claim: 'The Temple Scroll (11QTa) from Qumran presents an idealized Temple plan and purity legislation distinct from the later Mishnah — evidence of alternative legal imaginations in Second Temple Judaism.',
    detail: 'Sectarian/ideal law text; not a blueprint of Herod’s Temple as built.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'yadin-11qt', citation: 'Yadin, Y. The Temple Scroll; Qimron/García Martínez editions; DSS study editions.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-joseph-arimathea-burial',
    claim: 'The tradition that Joseph of Arimathea buried Jesus is multiply attested in the Gospels and is often judged to have an early historical core, though details and motive reconstructions vary.',
    detail: 'Burial practice context supports a historical judgment short of laboratory certainty; empty-tomb implications remain separately contested.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'brown-death', citation: 'Brown, R.E. The Death of the Messiah; Allison, Resurrecting Jesus (burial discussions).', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-conjectural-emendation',
    claim: 'Conjectural emendation (proposing a reading with no extant manuscript support) is rare in modern NT editions compared with classical philology; editors prefer documented variants in the apparatus.',
    detail: 'Method hygiene: ECM/NA28 practice favors attested readings; conjectures are exceptional and labeled when discussed.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'wachtel-conjecture', citation: 'Wachtel/Holmes discussions of conjectural emendation; Metzger Textual Commentary practice notes.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-slavonic-josephus',
    claim: 'The Slavonic version of Josephus’s Jewish War contains expansions (including Jesus-related passages) widely judged to be later Christian interpolations, not first-century Josephan text.',
    detail: 'Reception-history caution: do not treat Slavonic expansions as independent VERIFIED non-Christian controls.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'leeming-slavonic', citation: 'Leeming & Leeming, Josephus’ Jewish War and Its Slavonic Version; Van Voorst / Meier TF literature.', kind: 'critical_edition' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caiaphas-ossuary',
    claim: 'An ornate ossuary inscribed “Joseph son of Caiaphas” (and related finds) is widely associated with the high-priestly family of Caiaphas known from Josephus and the Gospels.',
    detail: 'Epigraphic/onomastic probability is high in scholarly discussion; absolute individual identification retains residual debate.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'greenhut-caiaphas', citation: 'Greenhut / Reich publications on the Caiaphas family tomb; Bond, Caiaphas.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-theophilus-autolycus',
    claim: 'Theophilus of Antioch’s Ad Autolycum (late 2nd c.) is an early Greek apology defending Christian monotheism and scriptural chronology to a pagan interlocutor.',
    detail: 'Reception of apologetic method and “Christian” naming; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'theophilus-autolycus', citation: 'Theophilus, Ad Autolycum (SC/Oxford critical editions; ET Grant).', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-ehrman-apocalyptic-jesus',
    claim: 'Bart Ehrman’s reconstruction places Jesus as an apocalyptic Jewish prophet announcing imminent kingdom judgment — a mainstream Third Quest option over cynic-sage models.',
    detail: 'Historiographic position card; competing reconstructions (crossan-type sapiential, etc.) remain active.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'ehrman-apocalyptic', citation: 'Ehrman, B.D. Jesus: Apocalyptic Prophet of the New Millennium; Sanders Jesus and Judaism.', kind: 'survey' }],
  }],
}

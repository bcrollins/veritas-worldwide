/**
 * Interval 36 claim wave — wave33.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE33_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-bullet-cluster',
    claim: 'The Bullet Cluster (1E 0657-56) shows spatial separation between X-ray gas and gravitational-lensing mass peaks after a cluster collision — a landmark empirical argument for collisionless dark matter.',
    detail: 'Astrophysical evidence within ΛCDM structure framework; modified-gravity counter-models exist and remain minority. Science_model.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'clowe-bullet', citation: 'Clowe et al., “A Direct Empirical Proof of the Existence of Dark Matter,” ApJ 648 (2006); subsequent lensing analyses.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-jehoiachin-rations',
    claim: 'Babylonian administrative tablets record oil rations for “Ya’u-kīnu, king of the land of Yahudu” (Jehoiachin) and his sons in exile — primary cuneiform control for 2 Kings 25:27–30.',
    detail: 'Onomastic/administrative proof-grade data for the Judean royal exile; narrative detail beyond the tablets remains biblical.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'weidner-rations', citation: 'Weidner ration tablets; ANET/COS translations; Albright/Park discussion of Jehoiachin in exile.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-copper-scroll',
    claim: 'The Copper Scroll (3Q15) from Qumran lists alleged treasure deposits in Hebrew — a unique metal DSS text whose historical treasure map status remains debated.',
    detail: 'Material fact of the text is verified; whether the deposits were real, legendary, or Temple inventory remains contested.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'lefkovits-3q15', citation: 'Lefkovits, J.K. The Copper Scroll 3Q15; DSS study editions.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-women-empty-tomb-witnesses',
    claim: 'The tradition that women were the first witnesses to the empty tomb is multiply attested in the Gospels and is often treated as early, partly because female legal testimony was culturally devalued — a classic criterion-of-embarrassment argument.',
    detail: 'Historical judgment on tradition shape; empty-tomb facticity and resurrection ontology remain separately contested.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'bauckham-women-witnesses', citation: 'Bauckham, Jesus and the Eyewitnesses (women witnesses); Allison, Resurrecting Jesus.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-western-non-interpolations',
    claim: 'Westcott-Hort’s “Western non-interpolations” hypothesis treated certain shorter Western readings (esp. in Luke 24) as original against longer Alexandrian forms; modern editors largely reverse or qualify that preference.',
    detail: 'Edition-history method card; NA/UBS/ECM generally prefer the longer Alexandrian readings in classic W-H non-interpolation loci.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'hort-wni', citation: 'Westcott & Hort, Introduction (1881); Metzger Textual Commentary; recent ECM Luke discussions.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-nazareth-inscription',
    claim: 'The so-called Nazareth Inscription is a Greek imperial edict against tomb violation; proposed links to early Christian empty-tomb controversy are speculative and provenance is debated.',
    detail: 'Epigraphic object is real; HJ connection is circumstantial at best — do not upgrade to VERIFIED Jesus evidence.',
    tier: 'circumstantial',
    proofVsConcept: 'debate',
    sources: [{ id: 'metzger-nazareth', citation: 'Metzger / Billington / subsequent marble provenance studies of the Nazareth Inscription.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-chalk-stone-vessels',
    claim: 'Chalk-stone vessels are archaeologically widespread in late Second Temple Jewish contexts and are widely interpreted as purity-related tableware less susceptible to ritual impurity than pottery.',
    detail: 'Material culture of purity practice; supports Gospel stone-jar settings as plausible without proving specific miracle narratives.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'magen-stone', citation: 'Magen, Y. The Stone Vessel Industry in the Second Temple Period; Adler purity studies.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-gospel-of-peter',
    claim: 'The Gospel of Peter (partially preserved, notably the Akhmîm fragment) is a non-canonical passion/resurrection narrative with distinctive apologetic and possibly docetic features — 2nd-century reception, not a first-generation Jesus source.',
    detail: 'Apocryphal reception history; useful for diversity of early Christian storytelling, not HJ primary controls.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'foster-gpet', citation: 'Foster, P. The Gospel of Peter; critical editions of the Akhmîm fragment.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-crossan-cynic-limits',
    claim: 'John Dominic Crossan’s Mediterranean cynic-sage reconstruction of Jesus is a major Jesus Seminar–era model; most subsequent Third Quest work reasserts a thoroughly Jewish apocalyptic or reformist frame instead.',
    detail: 'Historiographic debate card — report the model and the mainstream counter-weight without advocacy.',
    tier: 'interpretive',
    proofVsConcept: 'debate',
    sources: [{ id: 'crossan-historical', citation: 'Crossan, The Historical Jesus; critiques in Wright, Jesus and the Victory of God; Ehrman apocalyptic reconstructions.', kind: 'survey' }],
  }],
}

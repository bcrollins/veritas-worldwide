/**
 * Interval 41 claim wave — wave38.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE38_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-sz-sunyaev-zeldovich',
    claim: 'The Sunyaev–Zel’dovich effect measures CMB spectral distortion from hot cluster gas and is used as a cluster-finding and cosmology probe complementary to X-ray and optical surveys.',
    detail: 'Observational technique within ΛCDM structure framework; science_model for cluster cosmology pipelines.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'sz-reviews', citation: 'Carlstrom et al. SZ reviews; Planck/ACT/SPT SZ cluster catalogs.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-elephantine-passover-papyrus',
    claim: 'Elephantine papyri include correspondence about observing Passover/Unleavened Bread under Persian administration — primary evidence for diaspora Jewish festival practice in the 5th century BCE.',
    detail: 'Complements earlier Elephantine temple cards with festival-practice focus.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'porten-passover', citation: 'Porten, Elephantine Papyri in English (Passover papyrus); COS translations.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-tyrian-shekel-temple-tax',
    claim: 'Tyrian silver shekels were widely used for the Jerusalem Temple tax in the late Second Temple period because of consistent silver purity — a numismatic-fiscal context for money-changer scenes.',
    detail: 'Numismatic practice is well documented; Gospel narrative details remain separate literary questions.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'meshorer-tyrian', citation: 'Meshorer, Temple tax / Tyrian shekel discussions; Sanders, Judaism: Practice and Belief.', kind: 'peer_reviewed' }],
  }],
  'historical-jesus': [{
    id: 'hj-passion-predictions',
    claim: 'Synoptic passion predictions (Jesus foretelling death/resurrection) are multiply present in the Gospels; historians disagree whether they are authentic forecasts, post-event vaticinia ex eventu, or mixed.',
    detail: 'Classic authenticity debate — label contested, not VERIFIED laboratory fact.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'allison-passion-pred', citation: 'Allison, Constructing Jesus; Brown, Death of the Messiah; form-critical treatments of passion predictions.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-na28-ubs5-status',
    claim: 'Nestle-Aland 28th edition and UBS5 remain the standard working critical texts for most academic NT work, while ECM volumes progressively refine the initial text for specific books.',
    detail: 'Edition status card; “standard” ≠ “final” — ECM updates feed future NA editions.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'na28-intro', citation: 'Nestle-Aland Novum Testamentum Graece 28; UBS5; INTF ECM project overviews.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-porphyry-against-christians',
    claim: 'Porphyry’s Against the Christians (late 3rd c., fragments via Christian rebuttals) was a major philosophical critique of Christian scripture and claims — hostile reception, not first-century reportage.',
    detail: 'Fragmentary survival via opponents requires careful source criticism.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'berchman-porphyry', citation: 'Berchman, Porphyry Against the Christians; Hoffmann / Magny fragment collections.', kind: 'critical_edition' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-caesarea-pilate-praetorium',
    claim: 'Caesarea Maritima’s Roman administrative complex (including praetorium contexts) frames where prefects like Pilate were based — coastal capital archaeology for Judean governance.',
    detail: 'Supports administrative geography; not a transcript of any Gospel trial scene.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'holum-caesarea', citation: 'Holum / Raban / Caesarea excavation reports; Bond, Pontius Pilate (Caesarea base).', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-tertullian-apology',
    claim: 'Tertullian’s Apologeticum (c. 197 CE) defends Christians before Roman authorities on legal and philosophical grounds — Latin North African apologetic reception.',
    detail: 'Not HJ primary data; valuable for early Christian legal self-presentation.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'tertullian-apol', citation: 'Tertullian, Apologeticum (CCSL/critical editions; ET Glover/Souter).', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-fredriksen-when-christians',
    claim: 'Paula Fredriksen’s work reconstructs how Jesus-followers became “Christians” within Jewish and Roman contexts, stressing apocalyptic hope and later identity separation trajectories.',
    detail: 'Historiographic synthesis card; debates continue on timing of “parting of the ways.”',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'fredriksen-when', citation: 'Fredriksen, P. When Christians Were Jews; Jesus of Nazareth, King of the Jews.', kind: 'survey' }],
  }],
}

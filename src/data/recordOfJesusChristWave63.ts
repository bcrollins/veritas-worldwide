/**
 * Interval claim wave — wave63.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE63_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-nucleosynthesis-light-elements',
    claim: 'Big Bang nucleosynthesis predicts light-element abundances (D, ⁴He, ⁷Li) fixed by the baryon-to-photon ratio; deuterium measurements remain the most robust BBN baryometer while the lithium problem is an open tension.',
    detail: 'Science_model status; lithium discrepancy is a research problem, not a license to invent non-standard cosmologies without further data.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'bbn-cyburt', citation: 'Cyburt et al. BBN reviews; Cooke deuterium measurements; Fields lithium reviews.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-siloam-tunnel-inscription',
    claim: 'The Siloam Tunnel Inscription (Istanbul Archaeology Museums; cast copies elsewhere) is a primary Hebrew inscription describing the meeting of two tunnel crews — archaeological control for Jerusalem’s water system traditionally linked to Hezekiah.',
    detail: 'Epigraphic fact of the inscription; absolute dating and biblical correlation debates are separate layers.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'siloam-inscription', citation: 'Siloam Inscription editions; Reich/Shukron tunnel archaeology; ANEP/ANET references.', kind: 'museum' }],
  }],
  'second-temple': [{
    id: 'st-josephus-antiquities-composition',
    claim: 'Josephus’s Jewish Antiquities (completed c. 93/94 CE in Rome) retells Israel’s history for a Greco-Roman audience and is a primary literary source for Second Temple institutions, with known Flavian-era rhetorical framing.',
    detail: 'Attested literary product; individual episodes require critical filtering against archaeology and other sources.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-ant-thackeray', citation: 'Josephus, Antiquities (Loeb); Mason / Feldman Josephus studies.', kind: 'critical_edition' }],
  }],
  'historical-jesus': [{
    id: 'hj-aramaic-substrate-limits',
    claim: 'Semitic/Aramaic substrata in Greek Gospel diction can indicate early tradition layers, but retroversion arguments are often underdetermined and cannot alone prove authenticity of specific sayings.',
    detail: 'Linguistic method hygiene; not a proof rule for discrete logia.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'fitzmyer-aramaic', citation: 'Fitzmyer Aramaic studies; Casey Aramaic sources debates; later method critiques.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-p66-bodmer-john',
    claim: '𝔓⁶⁶ (Bodmer II) is a major early papyrus witness to John (c. 200 CE range) with extensive text and corrections — foundational for reconstructing the Fourth Gospel’s early transmission.',
    detail: 'Manuscript fact; individual readings still weighed in the apparatus against 𝔓⁷⁵, ℵ, B, and others.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'p66-bodmer', citation: 'Bodmer II / 𝔓⁶⁶ editions; INTF Liste; NA28/ECM John apparatus.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-talmud-yeshu-limits',
    claim: 'Later rabbinic passages sometimes read as allusions to Jesus (Yeshu) are chronologically late, textually complex, and cannot be treated as independent first-century biography without severe method caution.',
    detail: 'Reception/polemic data at best; not proof-grade HJ narrative.',
    tier: 'contested',
    proofVsConcept: 'debate',
    sources: [{ id: 'schaefer-jesus-talmud', citation: 'Schäfer, Jesus in the Talmud; Van Voorst; critical Talmud editions.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-qumran-occupation-strata',
    claim: 'Qumran’s multi-phase occupation (including the main settlement associated with the scroll caves) is archaeologically documented; identifying the community as Essene vs. another group remains debated.',
    detail: 'Stratigraphy and material culture vs. sociological identification are distinct questions.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'de-vaux-qumran', citation: 'de Vaux / Magness Qumran archaeology; DJD cave publications.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-justin-first-apology',
    claim: 'Justin Martyr’s First Apology (mid-2nd c.) addresses Roman authorities with descriptions of Christian worship, scripture reading, and defense against charges — a primary window on mid-century Christian self-presentation.',
    detail: 'Apologetic genre; useful for liturgy and reception, not raw HJ reportage.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'justin-1apol', citation: 'Justin, 1 Apology (Minns/Parvis or SC editions); Barnard Justin studies.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-wright-jesus-victory-god',
    claim: 'N.T. Wright’s Jesus and the Victory of God models a “Third Quest” synthesis placing Jesus within Second Temple Jewish eschatology; its conclusions remain debated while its source engagement is widely treated as a scholarly landmark.',
    detail: 'Historiographic landmark; not automatic endorsement of every reconstruction.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'wright-jvg', citation: 'Wright, N.T. Jesus and the Victory of God (Christian Origins series).', kind: 'survey' }],
  }],
}

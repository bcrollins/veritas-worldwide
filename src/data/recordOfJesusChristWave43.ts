/**
 * Interval 46 claim wave — wave43.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE43_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-deuterium-abundance',
    claim: 'Primordial deuterium abundance measured in high-redshift quasar absorption systems matches BBN predictions for the baryon density inferred from the CMB.',
    detail: 'Cross-probe concordance card; science_model. Complements helium Y_p and BAO baryon cards.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'cooke-deuterium', citation: 'Cooke et al. primordial deuterium measurements; Cyburt BBN reviews; Planck Ω_b h².', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-city-david-bullae-context',
    claim: 'Hundreds of clay bullae and seal impressions from controlled City of David / Ophel excavations document late Iron Age Judahite administrative literacy and onomastics.',
    detail: 'Corpus-level epigraphic control; individual name-to-Bible identifications vary in confidence.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'reich-bullae', citation: 'Reich / Shukron / Mazar bullae publications; Avigad Hebrew Bullae comparative corpus.', kind: 'peer_reviewed' }],
  }],
  'second-temple': [{
    id: 'st-josephus-antiquities-preface',
    claim: 'Josephus’s preface to Jewish Antiquities presents the work as a full history of the Jewish people for Greco-Roman readers, with apologetic and pedagogical aims.',
    detail: 'Source-critical framing for all Antiquities-dependent claims including the Testimonium debates.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'jos-ant-preface', citation: 'Josephus, Antiquities 1.preface; Mason, Josephus and the New Testament.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-table-fellowship-limits',
    claim: 'Open table fellowship with “sinners” is widely treated as a historically distinctive Jesus practice; the precise social boundaries and theological meanings remain reconstructed and debated.',
    detail: 'Complements earlier table-fellowship cards with explicit uncertainty about interpretive overlays.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'crossan-commensality', citation: 'Crossan, The Historical Jesus (open commensality); Dunn, Jesus Remembered; Sanders practice studies.', kind: 'survey' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-byzantine-priority-limits',
    claim: 'Byzantine-priority theories correctly note the medieval majority’s internal coherence, but most modern editors reject equating numerical dominance with initial-text status without early genealogical support.',
    detail: 'Complements Majority Text debate card with explicit editorial majority practice.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'wallace-byzantine', citation: 'Wallace critiques of Byzantine priority; Robinson defenses; ECM/CBGM method papers.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-no-contemporary-jewish-literary',
    claim: 'No surviving Jewish literary work from Jesus’ lifetime (outside later Christian texts) names him; Philo is silent and the earliest Jewish controls (Josephus) are post-70.',
    detail: 'Archival silence with genre/opportunity caveats — weak negative evidence, not non-existence proof.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'vanvoorst-silence-jewish', citation: 'Van Voorst, Jesus Outside the New Testament; Ehrman, Did Jesus Exist?.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-nazareth-farmstead',
    claim: 'Excavations and surveys at Nazareth document Early Roman agricultural terraces, quarries, and modest domestic remains consistent with a small Jewish village setting.',
    detail: 'Supports modest-village reconstructions; densitometry and tourism-era overclaims are separate issues.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'dark-nazareth-farm', citation: 'Dark, K. Nazareth archaeology; Pfann / Strange survey literature.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-eusebius-martyrs-palestine',
    claim: 'Eusebius’s Martyrs of Palestine records Diocletianic persecution narratives in the early 4th century — primary reception of Christian martyrdom culture, not HJ biography.',
    detail: 'Late antique Christian historiography; useful for persecution memory formation.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'eusebius-martyrs', citation: 'Eusebius, Martyrs of Palestine (critical editions; ET Lawlor/Oulton / Barnes discussions).', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-crossan-open-commensality',
    claim: 'Crossan’s “open commensality” thesis treats radical shared meals as the social heart of the historical Jesus movement — influential Jesus Seminar–era reconstruction still widely cited and contested.',
    detail: 'Historiographic position card; complements cynic-model limits with positive Crossan thesis reporting.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'crossan-hj-meals', citation: 'Crossan, The Historical Jesus; Jesus: A Revolutionary Biography; critiques in Wright/Meier literature.', kind: 'survey' }],
  }],
}

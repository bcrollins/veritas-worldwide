/**
 * Interval 38 claim wave — wave35.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE35_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-primordial-bmodes-search',
    claim: 'Searches for primordial CMB B-mode polarization aim to constrain the inflationary tensor-to-scalar ratio r; no definitive primordial detection has been confirmed to date.',
    detail: 'Active observational frontier; non-detection already bounds high-scale inflation models. Complements tensor-to-scalar cards.',
    tier: 'well_attested',
    proofVsConcept: 'science_model',
    sources: [{ id: 'bicep-keck-r', citation: 'BICEP/Keck + Planck joint r constraints; Simons Observatory / CMB-S4 design papers.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-sargon-samaria-fall',
    claim: 'Assyrian royal inscriptions (Sargon II and related annals) claim the conquest of Samaria and deportations in the late 8th century BCE — primary imperial controls for the fall of the Northern Kingdom.',
    detail: 'Propaganda genre requires critical reading; correlation with 2 Kings 17 is standard but detail-level debates persist.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'sargon-annals', citation: 'Sargon II annals (COS/ANET); Younger, Ancient Conquest Accounts; 2 Kings 17 critical commentaries.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-therapeutae-philo',
    claim: 'Philo’s De Vita Contemplativa describes the Therapeutae, a contemplative Jewish community in Egypt with communal study and allegorical exegesis — evidence of diaspora Jewish diversity.',
    detail: 'Literary description; historicity of details debated; comparative value for sectarian lifestyle, not HJ biography.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-vita-cont', citation: 'Philo, De Vita Contemplativa (Loeb/critical editions); Taylor, Jewish Women Philosophers of First-Century Alexandria.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-last-supper-historicity',
    claim: 'That Jesus shared a final meal with disciples before arrest is widely accepted as historical; whether it was a Passover seder, the exact words of institution, and eucharistic theology are reconstructed and contested.',
    detail: 'Core meal event vs. liturgical wording distinction is methodologically essential.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'jeremias-eucharistic', citation: 'Jeremias, The Eucharistic Words of Jesus; Meier, A Marginal Jew (Vol. on meals); cross-gospel comparisons.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-oxyrhynchus-sayings',
    claim: 'Oxyrhynchus papyri include early Christian texts and sayings collections (e.g., P.Oxy. fragments related to Gospel of Thomas and unknown gospels) documenting Egyptian textual diversity.',
    detail: 'Papyrological controls for second/third-century circulation; not continuous-text NA28 witnesses alone.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'poxy-christian', citation: 'Grenfell & Hunt Oxyrhynchus Papyri series; Lührmann / Kraus discussions of Christian papyri.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-philo-silence-on-jesus',
    claim: 'Philo of Alexandria (d. c. 50 CE), a prolific Jewish writer overlapping Jesus’ lifetime regionally in the empire, never mentions Jesus — a silence that is expected given Philo’s Egyptian diaspora focus and genre, not a decisive non-existence proof.',
    detail: 'Method: silence arguments require opportunity and genre relevance; Philo is weak negative evidence at best.',
    tier: 'circumstantial',
    proofVsConcept: 'debate',
    sources: [{ id: 'vanvoorst-philo-silence', citation: 'Van Voorst, Jesus Outside the New Testament; Ehrman, Did Jesus Exist? (arguments from silence).', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-masada-scrolls',
    claim: 'Manuscript fragments recovered at Masada (including biblical and sectarian-related texts) provide archaeological context for Jewish literary culture through the First Revolt terminus.',
    detail: 'Site + text association is archaeologically framed; not a Gospel episode proof.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'yadin-masada-texts', citation: 'Yadin, Masada; Tov / Masada textual publications; Netzer architecture volumes.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-diognetus-epistle',
    claim: 'The Epistle to Diognetus is an early Christian apology describing Christians as a distinct “third race” in the world — reception of identity rhetoric, not HJ primary data.',
    detail: 'Date commonly 2nd century; authorship unknown.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'diognetus-holmes', citation: 'Epistle to Diognetus in Holmes, Apostolic Fathers; Jefford / critical introductions.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-amy-jill-levine-jewish-jesus',
    claim: 'Amy-Jill Levine’s scholarship emphasizes reading Jesus within Judaism against Christian stereotype and anachronism — a major contribution to Jewish–Christian historical Jesus dialogue.',
    detail: 'Historiographic/ethical method card for guild practice; not a single reconstruction of every pericope.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'levine-misunderstood', citation: 'Levine, A.-J. The Misunderstood Jew; Short Stories by Jesus; Jewish Annotated New Testament (ed.).', kind: 'survey' }],
  }],
}

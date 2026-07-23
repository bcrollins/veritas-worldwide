/**
 * Interval 34 claim wave — wave31.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE31_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-ligo-gravitational-waves',
    claim: 'LIGO/Virgo/KAGRA detections of gravitational waves from compact binary mergers confirm strong-field general-relativistic predictions and open multi-messenger astronomy (e.g., GW170817).',
    detail: 'Observational science status; not a cosmology-of-origins substitute for CMB/BBN cards. Science_model for waveform inference pipelines.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'ligo-2016', citation: 'Abbott et al. (LIGO/Virgo), Phys. Rev. Lett. 116 (2016) and subsequent catalog papers; GW170817 multi-messenger follow-up.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-arad-ostraca',
    claim: 'The Arad ostraca (Iron Age Judah) are primary Hebrew administrative/military correspondence documenting fort supply, names, and YHWH-related greetings in a border fortress context.',
    detail: 'Epigraphic control for Judahite literacy and fort administration; not a narrative verifier for every Kings episode.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'ahituv-arad', citation: 'Ahituv, S. Echoes from the Past (Arad ostraca); Aharoni Arad Inscriptions.', kind: 'critical_edition' }],
  }],
  'second-temple': [{
    id: 'st-caligula-statue-crisis',
    claim: 'The Caligula (Gaius) statue crisis (c. 39–41 CE) — the planned installation of the emperor’s image in the Jerusalem Temple — is documented by Philo and Josephus as a near-catastrophe for Judean–Roman relations.',
    detail: 'Primary literary control for Temple sanctity politics a decade after Jesus; chronological context, not HJ biography.',
    tier: 'verified',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-legatio', citation: 'Philo, Legatio ad Gaium; Josephus Ant. 18.8 / War 2.10; Smallwood / Bilde treatments.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-lords-prayer-core',
    claim: 'The Lord’s Prayer (Matt 6 / Luke 11) is widely treated as preserving early Aramaic-flavored prayer tradition of the Jesus movement (including “Abba”/Father address patterns), though exact wording and Sitz im Leben remain reconstructed.',
    detail: 'Historical-core judgment on prayer tradition; theological expansion and liturgical fixation are reception history.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'jeremias-prayer', citation: 'Jeremias, The Prayers of Jesus; Dunn, Jesus Remembered; Allison Constructing Jesus (prayer traditions).', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-lectio-difficilior',
    claim: 'The canons lectio difficilior potior and lectio brevior potior are traditional internal criteria in NT textual criticism; modern editors apply them with corpus-aware caution because scribes both simplify and expand.',
    detail: 'Method hygiene for apparatus reading; not a mechanical upgrade rule for every variant.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'metzger-canons', citation: 'Metzger/Ehrman, The Text of the New Testament (canons of criticism); ECM editorial principles.', kind: 'survey' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-toledot-yeshu',
    claim: 'Toledot Yeshu traditions are late medieval (and earlier oral-literary) Jewish counter-narratives about Jesus; they are reception/polemic history, not independent first-century biography.',
    detail: 'Method: report genre and date range; do not upgrade to VERIFIED HJ controls.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'meerson-schaefer', citation: 'Meerson & Schäfer, Toledot Yeshu: The Life Story of Jesus (critical editions/translations).', kind: 'critical_edition' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-khirbet-qana',
    claim: 'Khirbet Qana (and competing sites) are archaeological candidates for New Testament Cana of Galilee; excavation documents multi-period settlement including Roman-era occupation.',
    detail: 'Site identification remains debated among candidates; material culture frames Gospel geography without proving specific miracle episodes.',
    tier: 'well_attested',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'edwards-qana', citation: 'Edwards, D.R. / Khirbet Qana excavation reports; Galilee survey literature on Cana candidates.', kind: 'survey' }],
  }],
  'early-christian-literature': [{
    id: 'ec-athenagoras-plea',
    claim: 'Athenagoras’s Plea for the Christians (late 2nd c.) is an early apologetic addressing Roman rulers on Christian monotheism, ethics, and charges of atheism/immorality.',
    detail: 'Reception of Christian self-presentation to imperial audience; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'athenagoras-legatio', citation: 'Athenagoras, Legatio pro Christianis (SC/Loeb critical editions; ET Schoedel).', kind: 'primary' }],
  }],
  'modern-scholarship': [{
    id: 'mod-jewishness-of-jesus-consensus',
    claim: 'A broad post-Holocaust / Third Quest consensus situates Jesus firmly within first-century Judaism; reconstructions differ on how he related to Torah, purity, and eschatology inside that world.',
    detail: 'Historiographic meta-card; specific reconstructions remain interpretive and contested.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'fredriksen-jesus', citation: 'Fredriksen, P. Jesus of Nazareth, King of the Jews; Sanders, Jesus and Judaism; Levine, The Misunderstood Jew.', kind: 'survey' }],
  }],
}

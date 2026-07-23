/**
 * The Record of Jesus Christ — pure evidentiary corpus
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 *
 * Scope: scientific description of cosmological origins (as science) through
 * 2026 scholarly assessment of the biblical textual tradition and the historical
 * figure Jesus of Nazareth. Every claim carries an evidence tier.
 *
 * Method: historical-critical; Nestle-Aland / UBS apparatus standards for text;
 * stratigraphy / radiocarbon for archaeology; observational cosmology for physics.
 * No advocacy. No theological conclusion as historical fact.
 */

import type { ScholarlyEvidenceTier } from './evidenceTiers'
import { ROC_EXTRA_CLAIMS, ROC_TIMELINE } from './recordOfJesusChristExtras'
import { ROC_WAVE3_CLAIMS } from './recordOfJesusChristWave3'
import { ROC_WAVE4_CLAIMS } from './recordOfJesusChristWave4'
import { ROC_WAVE5_CLAIMS } from './recordOfJesusChristWave5'
import { ROC_WAVE6_CLAIMS } from './recordOfJesusChristWave6'
import { ROC_WAVE7_CLAIMS } from './recordOfJesusChristWave7'
import { ROC_WAVE8_CLAIMS } from './recordOfJesusChristWave8'
import { ROC_WAVE9_CLAIMS } from './recordOfJesusChristWave9'
import { ROC_WAVE10_CLAIMS } from './recordOfJesusChristWave10'
import { ROC_WAVE11_CLAIMS } from './recordOfJesusChristWave11'
import { ROC_WAVE12_CLAIMS } from './recordOfJesusChristWave12'
import { ROC_WAVE13_CLAIMS } from './recordOfJesusChristWave13'
import { ROC_WAVE14_CLAIMS } from './recordOfJesusChristWave14'
import { ROC_WAVE15_CLAIMS } from './recordOfJesusChristWave15'
import { ROC_WAVE16_CLAIMS } from './recordOfJesusChristWave16'
import { ROC_WAVE17_CLAIMS } from './recordOfJesusChristWave17'
import { ROC_WAVE18_CLAIMS } from './recordOfJesusChristWave18'
import { ROC_WAVE19_CLAIMS } from './recordOfJesusChristWave19'
import { ROC_WAVE20_CLAIMS } from './recordOfJesusChristWave20'
import { ROC_WAVE21_CLAIMS } from './recordOfJesusChristWave21'
import { ROC_WAVE22_CLAIMS } from './recordOfJesusChristWave22'
import { ROC_WAVE23_CLAIMS } from './recordOfJesusChristWave23'
import { ROC_WAVE24_CLAIMS } from './recordOfJesusChristWave24'
import { ROC_WAVE25_CLAIMS } from './recordOfJesusChristWave25'
import { ROC_WAVE26_CLAIMS } from './recordOfJesusChristWave26'
import { ROC_WAVE27_CLAIMS } from './recordOfJesusChristWave27'
import { ROC_WAVE28_CLAIMS } from './recordOfJesusChristWave28'
import { ROC_WAVE29_CLAIMS } from './recordOfJesusChristWave29'
import { ROC_WAVE30_CLAIMS } from './recordOfJesusChristWave30'
import { ROC_WAVE31_CLAIMS } from './recordOfJesusChristWave31'

export { ROC_TIMELINE } from './recordOfJesusChristExtras'

export interface RocSource {
  id: string
  citation: string
  url?: string
  /** primary | peer_reviewed | critical_edition | museum | survey */
  kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific'
}

export interface RocClaim {
  id: string
  claim: string
  detail: string
  tier: ScholarlyEvidenceTier
  /** Explicit proof vs concept flag for reader hygiene. */
  proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'
  sources: RocSource[]
  /** Optional confidence note (dating ranges, consensus level). */
  confidenceNote?: string
}

export interface RocSection {
  id: string
  number: string
  title: string
  subtitle: string
  dateRange: string
  summary: string
  claims: RocClaim[]
}

export const ROC_META = {
  title: 'The Record of Jesus Christ',
  subtitle:
    'A pure evidentiary compilation of historical, textual, archaeological, and scientific data related to the biblical textual tradition and Jesus of Nazareth.',
  publisher: 'Veritas Worldwide',
  publishDate: 'July 2026',
  methodologyVersion: '1.0',
  authorEntity: 'Veritas Worldwide',
  path: '/record-of-jesus-christ',
  companionPath: '/bible',
} as const

export const ROC_METHODOLOGY_NOTES: string[] = [
  'Every claim carries a mandatory evidence tier. Proof-grade data is never conflated with theological development.',
  'The Bible is treated as a collection of ancient texts subject to the same historical-critical methods applied to any corpus of antiquity.',
  'Criteria of multiple independent attestation, embarrassment, coherence, and contextual credibility are used only as historical tools.',
  'Manuscript dates are paleographic and/or radiocarbon ranges with uncertainty; absolute single-year certainty is not claimed without justification.',
  'Non-Christian attestations (Josephus, Tacitus, etc.) are presented with scholarly consensus and minority views labeled.',
  'Cosmological content is observational science (CMB, expansion, nucleosynthesis). Fine-tuning is reported as parameter constraints; teleological inference is labeled outside the evidentiary record if present.',
  'Divinity, resurrection as theological fact, and prophecy-fulfillment claims are out of scope as historical conclusions.',
  'Attribution of this compilation is to Veritas Worldwide only.',
]

/* ── Sections (chronological) ─────────────────────────────────── */

const S01_COSMOLOGY: RocSection = {
  id: 'cosmology',
  number: 'I',
  title: 'Scientific Description of Cosmological Origins',
  subtitle: 'Observational pillars of the standard cosmological model — reported as science, not as theology.',
  dateRange: 't ≈ 0 → present (model frame)',
  summary:
    'The standard ΛCDM Big Bang model is constrained by independent observational pillars. This section documents measurable parameters only; it does not assert teleology.',
  claims: [
    {
      id: 'cosmo-cmb',
      claim: 'The cosmic microwave background (CMB) is a near-isotropic blackbody at T ≈ 2.725 K, consistent with a hot early universe.',
      detail:
        'COBE, WMAP, and Planck measured the CMB spectrum and anisotropies. The blackbody shape and acoustic-peak structure of temperature and polarization anisotropies are primary observational pillars of the hot Big Bang framework within ΛCDM.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'planck2018', citation: 'Planck Collaboration. “Planck 2018 results. VI. Cosmological parameters.” A&A 641, A6 (2020).', url: 'https://www.aanda.org/articles/aa/abs/2020/09/aa33910-18/aa33910-18.html', kind: 'scientific' },
        { id: 'cobe-firas', citation: 'Mather, J.C. et al. “A Preliminary Measurement of the Cosmic Microwave Background Spectrum by the Cosmic Background Explorer (COBE) Satellite.” ApJ 354 (1990): L37–L40.', kind: 'scientific' },
      ],
      confidenceNote: 'Model parameters refined continuously; the existence of the CMB as a thermal remnant is not in serious dispute among working cosmologists.',
    },
    {
      id: 'cosmo-expansion',
      claim: 'Spectroscopic redshift of galaxies correlates with distance (Hubble–Lemaître law), indicating metric expansion of space.',
      detail:
        'Independent distance ladders (Cepheids, Type Ia supernovae) and baryon acoustic oscillations constrain the expansion history. Local H₀ measurements and early-universe inferences from the CMB currently differ at a level known as the Hubble tension — a parameter-level debate within the expansion framework, not a rejection of expansion itself.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'hubble1929', citation: 'Hubble, E. “A Relation between Distance and Radial Velocity among Extra-Galactic Nebulae.” PNAS 15 (1929): 168–173.', kind: 'scientific' },
        { id: 'riess2022', citation: 'Riess, A.G. et al. “A Comprehensive Measurement of the Local Value of the Hubble Constant…” ApJ Letters (ongoing SH0ES program).', kind: 'scientific' },
      ],
      confidenceNote: 'Expansion: verified. Exact H₀ value: contested between early- and late-universe methods.',
    },
    {
      id: 'cosmo-bbn',
      claim: 'Primordial abundances of light elements (⁴He, D, ³He, ⁷Li) are broadly consistent with Big Bang nucleosynthesis predictions.',
      detail:
        'Standard BBN predicts light-element yields as functions of baryon density. Observed deuterium and helium abundances align well with CMB-inferred baryon density; the lithium problem remains an active research topic.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'cyburt2016', citation: 'Cyburt, R.H. et al. “Big Bang Nucleosynthesis: Present status.” Rev. Mod. Phys. 88 (2016): 015004.', kind: 'scientific' },
      ],
      confidenceNote: 'Core BBN framework well-attested; ⁷Li discrepancy is contested.',
    },
    {
      id: 'cosmo-age',
      claim: 'Under Planck 2018 ΛCDM parameters, the universe age is approximately 13.8 billion years.',
      detail:
        'Planck Collaboration reports H₀ ≈ 67.4 km s⁻¹ Mpc⁻¹ and Ωm ≈ 0.315 in baseline ΛCDM, yielding an age near 13.8 Gyr. Alternative cosmologies and systematics shift the figure within model-dependent bounds.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'planck2018b', citation: 'Planck Collaboration. A&A 641, A6 (2020), Table 2 baseline parameters.', kind: 'scientific' },
      ],
    },
  ],
}

const S02_ANE: RocSection = {
  id: 'ancient-near-east',
  number: 'II',
  title: 'Ancient Near Eastern Context and Textual Parallels',
  subtitle: 'Primary inscriptions and literary corpora that frame Israelite and Judahite textual traditions.',
  dateRange: 'c. 3000–539 BCE',
  summary:
    'Extra-biblical inscriptions and Mesopotamian/Egyptian literary traditions supply independent chronological and cultural controls for reading Hebrew Bible materials as ancient literature.',
  claims: [
    {
      id: 'ane-merneptah',
      claim: 'The Merneptah Stele (c. 1208 BCE) contains the earliest known extra-biblical reference to “Israel” as a people in Canaan.',
      detail:
        'Egyptian granite victory stele of Pharaoh Merneptah includes the line conventionally read “Israel is laid waste; his seed is not,” with a people-determinative. Housed in the Egyptian Museum, Cairo.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'anet', citation: 'Pritchard, J.B., ed. Ancient Near Eastern Texts Relating to the Old Testament. 3rd ed. Princeton UP, 1969.', kind: 'critical_edition' },
        { id: 'kitchen2003', citation: 'Kitchen, K.A. On the Reliability of the Old Testament. Eerdmans, 2003.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'ane-mesha',
      claim: 'The Mesha Stele (c. 840 BCE) names Omri of Israel, Yahweh, and Moabite campaigns paralleling 2 Kings 3.',
      detail:
        'Basalt inscription of King Mesha of Moab (Dhiban). Louvre collection. Provides independent ninth-century West Semitic royal propaganda intersecting biblical narrative geography and theonyms.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'louvre-mesha', citation: 'Musée du Louvre — Stèle de Mésha (AO 5066).', url: 'https://collections.louvre.fr/', kind: 'museum' },
      ],
    },
    {
      id: 'ane-tel-dan',
      claim: 'The Tel Dan Stele (9th century BCE) attests the phrase “House of David” (bytdwd) outside the Bible.',
      detail:
        'Aramaic victory inscription excavated at Tel Dan (1993–94). Widely accepted as referring to the Judahite dynastic house of David; minority readings of bytdwd have been proposed and largely rejected in subsequent literature.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'biran1993', citation: 'Biran, A. & Naveh, J. “An Aramaic Stele Fragment from Tel Dan.” Israel Exploration Journal 43 (1993): 81–98.', url: 'https://www.jstor.org/stable/27926373', kind: 'peer_reviewed' },
      ],
      confidenceNote: 'Reading “House of David” is majority scholarly position; alternative etymologies exist and are minority.',
    },
    {
      id: 'ane-flood-literature',
      claim: 'Mesopotamian flood traditions (Atrahasis, Gilgamesh XI) are independent literary parallels to Genesis flood narrative forms.',
      detail:
        'Comparative literature documents shared motifs (divine decision, boat, birds, sacrifice). Parallelism demonstrates cultural-literary relationship; it does not by itself prove or disprove a single global historical flood. Geological assessment of a recent global flood is rejected by mainstream earth science; local catastrophic flood hypotheses remain interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'george2003', citation: 'George, A.R. The Babylonian Gilgamesh Epic. Oxford UP, 2003.', kind: 'critical_edition' },
        { id: 'tigue-flood', citation: 'Tigay, J.H. The Evolution of the Gilgamesh Epic. Bolchazy-Carducci, 2002 (reprint).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'ane-exodus-historicity',
      claim: 'The historicity and scale of an Israelite exodus from Egypt remain contested in critical scholarship.',
      detail:
        'Maximalist positions argue for a historical core with later literary expansion; minimalist and many mainstream critical positions find insufficient direct Egyptian attestation for a mass exodus as narrated in Exodus. Archaeological settlement data in the highlands of Canaan (Iron I) is often treated separately from the literary Exodus account.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'finkelstein2001', citation: 'Finkelstein, I. & Silberman, N.A. The Bible Unearthed. Free Press, 2001.', kind: 'survey' },
        { id: 'kitchen2003b', citation: 'Kitchen, K.A. On the Reliability of the Old Testament. Eerdmans, 2003.', kind: 'peer_reviewed' },
        { id: 'devers2003', citation: 'Dever, W.G. Who Were the Early Israelites and Where Did They Come From? Eerdmans, 2003.', kind: 'peer_reviewed' },
      ],
    },
  ],
}

const S03_SECOND_TEMPLE: RocSection = {
  id: 'second-temple',
  number: 'III',
  title: 'Second Temple Judaism',
  subtitle: 'Primary Jewish literature, Qumran, and the Judean political setting before and during the early first century CE.',
  dateRange: 'c. 539 BCE – 70 CE',
  summary:
    'Second Temple sources (Hebrew Bible final forms, Apocrypha/Pseudepigrapha, DSS, Philo, Josephus) define the religious and political matrix of Jesus of Nazareth.',
  claims: [
    {
      id: 'st-dss',
      claim: 'Dead Sea Scrolls (discovered 1946–1956) preserve Hebrew Bible books and sectarian texts from roughly the third century BCE to first century CE.',
      detail:
        'Approximately 900 manuscripts from Qumran caves. Every Hebrew Bible book except Esther is represented in fragment form. Great Isaiah Scroll (1QIsaᵃ) is a near-complete Isaiah copy. Digital library: Israel Antiquities Authority.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'dss-digital', citation: 'Israel Antiquities Authority — Leon Levy Dead Sea Scrolls Digital Library.', url: 'https://www.deadseascrolls.org.il/', kind: 'museum' },
        { id: 'tov2012', citation: 'Tov, E. Textual Criticism of the Hebrew Bible. 3rd ed. Fortress, 2012.', kind: 'critical_edition' },
      ],
    },
    {
      id: 'st-isaiah-stability',
      claim: 'Comparison of 1QIsaᵃ (c. 2nd–1st century BCE) with the medieval Masoretic Text shows high overall agreement with mostly orthographic and minor variants.',
      detail:
        'Scholarly descriptions commonly summarize very high agreement with differences largely in spelling, article usage, and scribal slips; some meaningful variants exist and are catalogued in critical apparatuses. “95%” figures in popular literature should be treated as approximate pedagogical summaries, not laboratory measurements.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'ulrich2010', citation: 'Ulrich, E. The Biblical Qumran Scrolls. Brill, 2010.', kind: 'critical_edition' },
        { id: 'abegg1999', citation: 'Abegg, M., Flint, P., Ulrich, E. The Dead Sea Scrolls Bible. HarperOne, 1999.', kind: 'survey' },
      ],
    },
    {
      id: 'st-josephus-corpus',
      claim: 'Flavius Josephus (late first century CE) is a principal non-Christian Jewish historian for Herodian and early Roman Judea.',
      detail:
        'Jewish War, Antiquities, Life, Against Apion. Critical editions: Niese; Loeb Classical Library (Thackeray et al.); Brill Josephus project (ongoing). Essential for dating Pilate, high priests, and the Jewish War.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'josephus-loeb', citation: 'Josephus. Works. Loeb Classical Library. Harvard UP.', kind: 'critical_edition' },
        { id: 'mason2001', citation: 'Mason, S. Flavius Josephus on the Pharisees. Brill, 2001 (and related Mason editions).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'st-philo',
      claim: 'Philo of Alexandria provides contemporary diaspora Jewish philosophical and exegetical context for the early first century CE.',
      detail:
        'Extensive Greek corpus. Not a narrative source for Jesus, but crucial for understanding Hellenistic Jewish conceptual vocabulary that later Christian authors also inhabit.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'philo-loeb', citation: 'Philo. Works. Loeb Classical Library. Harvard UP.', kind: 'critical_edition' },
      ],
    },
  ],
}

const S04_HISTORICAL_JESUS: RocSection = {
  id: 'historical-jesus',
  number: 'IV',
  title: 'The Historical Figure of Jesus of Nazareth',
  subtitle: 'What can be said under historical method about a first-century Galilean Jew executed under Pontius Pilate.',
  dateRange: 'c. 4 BCE – 33 CE (conventional ranges)',
  summary:
    'A broad critical consensus holds that Jesus of Nazareth was a historical person baptized by John and crucified under Pilate. Specific deeds, sayings, and theological titles are tiered separately.',
  claims: [
    {
      id: 'hj-existence',
      claim: 'The existence of Jesus of Nazareth as a first-century Jewish man is the near-consensus position of critical historians of antiquity.',
      detail:
        'Supported by multiple early Christian sources (Pauline letters; Synoptic tradition) and non-Christian references (Josephus Ant. 20.200 re: James; Tacitus Annals 15.44; Josephus Testimonium with partial authenticity debate). Mythicist positions exist and are minority in mainstream academia.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'ehrman2012', citation: 'Ehrman, B.D. Did Jesus Exist? HarperOne, 2012.', kind: 'survey' },
        { id: 'meier1991', citation: 'Meier, J.P. A Marginal Jew. Vols. 1–5. Yale UP / Doubleday, 1991–2016.', kind: 'peer_reviewed' },
        { id: 'sanders1985', citation: 'Sanders, E.P. Jesus and Judaism. Fortress, 1985.', kind: 'peer_reviewed' },
      ],
      confidenceNote: 'Existence: well-attested historical judgment. Specific miracle claims: not historical proof-grade.',
    },
    {
      id: 'hj-baptism',
      claim: 'Baptism of Jesus by John the Baptist is widely judged historical under the criterion of embarrassment and multiple attestation.',
      detail:
        'Present in Mark, Q/Matthew-Luke tradition, and indirectly relevant in John. Embarrassment: a superior figure submitting to John’s baptism of repentance. Still a historical reconstruction, not archaeological proof.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'meier-vol2', citation: 'Meier, J.P. A Marginal Jew, Vol. 2. Doubleday, 1994.', kind: 'peer_reviewed' },
        { id: 'crossan1991', citation: 'Crossan, J.D. The Historical Jesus. HarperSanFrancisco, 1991.', kind: 'survey' },
      ],
    },
    {
      id: 'hj-crucifixion',
      claim: 'Crucifixion of Jesus under Pontius Pilate (prefect of Judea c. 26–36 CE) is multiply attested and coheres with Roman practice.',
      detail:
        'Independent strands: Paul (e.g., 1 Cor 1–2; 15), Mark passion tradition, Josephus (partial), Tacitus. Archaeological parallel: crucified remains of Yehohanan (Giv‘at ha-Mivtar) demonstrate nails-through-heel practice in Judea.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'tzaferis1985', citation: 'Tzaferis, V. “Crucifixion — The Archaeological Evidence.” BAR 11:1 (1985).', kind: 'peer_reviewed' },
        { id: 'bond1998', citation: 'Bond, H.K. Pontius Pilate in History and Interpretation. Cambridge UP, 1998.', kind: 'peer_reviewed' },
        { id: 'tacitus-ann15', citation: 'Tacitus, Annals 15.44 (critical Latin editions; Loeb).', kind: 'primary' },
      ],
      confidenceNote: 'Date commonly placed c. 30–33 CE; exact year contested within that window.',
    },
    {
      id: 'hj-pilate-stone',
      claim: 'The Pilate Stone (Caesarea Maritima, 1961) independently attests Pontius Pilate as prefect of Judea.',
      detail:
        'Latin limestone dedication naming […]TIUS PILATUS […] PRAEFECTUS IUDA[EA]E. Israel Museum. Confirms the prefect title (vs. later “procurator” anachronism in some literary sources).',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'frova1961', citation: 'Frova, A. “L’iscrizione di Ponzio Pilato a Cesarea.” Rendiconti dell’Istituto Lombardo 95 (1961).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-caiaphas',
      claim: 'An ossuary inscribed “Yehosef bar Qayafa” (discovered 1990) is widely identified with the high-priestly family of Caiaphas.',
      detail:
        'Josephus and the Gospels name Caiaphas as high priest in the relevant period. Ossuary identification is majority but not beyond all challenge; name frequency and find context are part of the argument.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'reich1992', citation: 'Reich, R. “Caiaphas Name Inscribed on Bone Boxes.” BAR 18:5 (1992).', kind: 'peer_reviewed' },
        { id: 'jos-ant18', citation: 'Josephus, Antiquities 18.2.2 (Caiaphas high priesthood).', kind: 'primary' },
      ],
    },
    {
      id: 'hj-resurrection-hist',
      claim: 'Claims of bodily resurrection are theological assertions; historians can document early belief and proclamation, not laboratory verification of the event.',
      detail:
        '1 Corinthians 15:3–8 preserves an early creedal formula that critical scholars typically date to within a few years of the crucifixion. Empty-tomb narratives and appearance traditions are literarily complex. Historical method can establish that some earliest followers proclaimed that Jesus had been raised; it cannot scientifically verify a resurrection as a natural event. Theological conclusions are out of scope as historical fact.',
      tier: 'literary_theological',
      proofVsConcept: 'tradition',
      sources: [
        { id: 'habermas2005', citation: 'Habermas, G. “Resurrection Research from 1975 to the Present.” Journal for the Study of the Historical Jesus (survey of scholarly literature).', kind: 'survey' },
        { id: 'ehrman2014', citation: 'Ehrman, B.D. How Jesus Became God. HarperOne, 2014.', kind: 'survey' },
        { id: 'allison2021', citation: 'Allison, D.C. The Resurrection of Jesus: Apologetics, Polemics, History. T&T Clark, 2021.', kind: 'peer_reviewed' },
      ],
      confidenceNote: 'Early proclamation: well-attested as historical report of belief. Ontological resurrection: not historical-scientific VERIFIED.',
    },
  ],
}

const S05_NT_TEXT: RocSection = {
  id: 'nt-textual-criticism',
  number: 'V',
  title: 'New Testament Textual Criticism and Manuscript Evidence',
  subtitle: 'Papyri, majuscules, Nestle-Aland / UBS apparatus, and the limits of reconstruction.',
  dateRange: 'c. 50 CE – medieval transmission',
  summary:
    'The NT is the best-attested literary corpus of Mediterranean antiquity by raw manuscript count. Attestation quantity is not identical to inerrancy; variants are real and catalogued.',
  claims: [
    {
      id: 'nt-ms-count',
      claim: 'Greek New Testament continuous-text manuscripts number on the order of several thousand, with additional lectionaries and versions.',
      detail:
        'INTF (Münster) maintains the official registry (Liste). Popular figures (“5,800 Greek MSS”) are order-of-magnitude pedagogical numbers that change as fragments are catalogued. Latin, Syriac, Coptic, and other versions multiply the total witness base.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'intf', citation: 'Institut für Neutestamentliche Textforschung (INTF) — New Testament Virtual Manuscript Room.', url: 'https://ntvmr.uni-muenster.de/', kind: 'critical_edition' },
        { id: 'metzger2005', citation: 'Metzger, B.M. & Ehrman, B.D. The Text of the New Testament. 4th ed. Oxford UP, 2005.', kind: 'survey' },
      ],
    },
    {
      id: 'nt-p52',
      claim: 'Papyrus P52 (Rylands Greek P 457) is among the earliest surviving NT fragments (John 18), paleographically dated roughly to the second century CE.',
      detail:
        'Dating ranges vary by paleographer (often cited c. 125–175 CE; some allow broader second-century bounds). Early Egyptian provenance demonstrates geographic spread of Johannine text. It is a fragment, not a complete Gospel.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'roberts1935', citation: 'Roberts, C.H. An Unpublished Fragment of the Fourth Gospel in the John Rylands Library. Manchester UP, 1935.', kind: 'primary' },
        { id: 'rylands', citation: 'University of Manchester, John Rylands Library — P.Ryl. 457.', kind: 'museum' },
      ],
      confidenceNote: 'Paleographic dates are ranges, not single years.',
    },
    {
      id: 'nt-majuscules',
      claim: 'Fourth–fifth century majuscules (ℵ 01 Sinaiticus, A 02 Alexandrinus, B 03 Vaticanus, C 04 Ephraemi, D 05 Bezae) are foundational for the critical text.',
      detail:
        'Codex Sinaiticus and Vaticanus are especially central to modern critical editions. Digital facsimiles are publicly available for several witnesses.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'sinaiticus', citation: 'Codex Sinaiticus Project.', url: 'https://www.codexsinaiticus.org/', kind: 'museum' },
        { id: 'na28', citation: 'Nestle-Aland Novum Testamentum Graece, 28th ed. (NA28). Deutsche Bibelgesellschaft.', kind: 'critical_edition' },
        { id: 'ubs5', citation: 'UBS Greek New Testament, 5th ed. (UBS5).', kind: 'critical_edition' },
      ],
    },
    {
      id: 'nt-variants',
      claim: 'Hundreds of thousands of variant readings exist across the tradition; the vast majority are orthographic or trivial, while a minority affect meaning.',
      detail:
        'Textual criticism quantifies and evaluates variants via external and internal criteria. Famous meaningful variants include the ending of Mark (16:9–20), the pericope adulterae (John 7:53–8:11), and the Comma Johanneum (1 John 5:7–8 in later tradition). Critical editions mark these explicitly.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'metzger-tc', citation: 'Metzger, B.M. A Textual Commentary on the Greek New Testament. 2nd ed. UBS, 1994.', kind: 'critical_edition' },
        { id: 'ehrman1993', citation: 'Ehrman, B.D. The Orthodox Corruption of Scripture. Oxford UP, 1993.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nt-paul-dates',
      claim: 'Undisputed Pauline letters are typically dated c. 49–58 CE and are the earliest surviving Christian literary corpus.',
      detail:
        'Seven-letter authentic core (Romans, 1–2 Corinthians, Galatians, Philippians, 1 Thessalonians, Philemon) is majority critical consensus. Deutero-Pauline and Pastoral authenticity is contested.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'meeks2003', citation: 'Meeks, W.A. The First Urban Christians. 2nd ed. Yale UP, 2003.', kind: 'peer_reviewed' },
        { id: 'roetzel1998', citation: 'Roetzel, C. Paul: The Man and the Myth. Fortress, 1998.', kind: 'survey' },
      ],
    },
    {
      id: 'nt-gospel-dates',
      claim: 'Critical consensus commonly dates Mark c. 65–75 CE, Matthew and Luke c. 80–90 CE, John c. 90–100 CE — with debate bands around each.',
      detail:
        'Earlier and later dates are argued. Independence, dependence (Markan priority, Q hypothesis), and John’s relation to the Synoptics are active research problems. Dating is reconstruction, not manuscript colophon fact.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'brown1997', citation: 'Brown, R.E. An Introduction to the New Testament. Yale UP, 1997.', kind: 'survey' },
        { id: 'klopp2008', citation: 'Kloppenborg, J.S. Q, the Earliest Gospel. WJK, 2008.', kind: 'peer_reviewed' },
      ],
    },
  ],
}

const S06_NONCHRISTIAN: RocSection = {
  id: 'non-christian-attestation',
  number: 'VI',
  title: 'Non-Christian Attestations',
  subtitle: 'Josephus, Tacitus, and related references — with full debate status.',
  dateRange: 'c. 90–120 CE (composition of key passages)',
  summary:
    'Non-Christian literary references are limited but historically significant. Each passage has a distinct authenticity and interpretation profile.',
  claims: [
    {
      id: 'nc-tf',
      claim: 'Josephus, Antiquities 18.63–64 (Testimonium Flavianum) is widely judged partly authentic with Christian interpolations; fully authentic and fully forged positions are minorities.',
      detail:
        'Greek text as received contains phrases unlikely for a non-Christian Jew (“if indeed one ought to call him a man,” “he was the Christ,” resurrection affirmation). Reconstruction of a shorter neutral core is the majority critical approach (e.g., Meier and many others). Arabic and Syriac witnesses (Agapius, Michael the Syrian) are used in some reconstructions.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'meier-tf', citation: 'Meier, J.P. A Marginal Jew, Vol. 1, pp. 56–88 (Testimonium analysis).', kind: 'peer_reviewed' },
        { id: 'whealey2003', citation: 'Whealey, A. Josephus on Jesus. Peter Lang, 2003.', kind: 'peer_reviewed' },
        { id: 'paganini', citation: 'Paget, J.C. “Some Observations on Josephus and Christianity.” JTS 52 (2001): 539–624.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nc-james',
      claim: 'Josephus, Antiquities 20.200 refers to “the brother of Jesus who is called Christ, James” in the account of Ananus’s execution of James — generally judged authentic.',
      detail:
        'Passage identifies James in relation to Jesus called Christ in a context of high-priestly politics c. 62 CE. Majority critical view: authentic. Used as independent attestation of Jesus and of James’s leadership stature.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'jos-ant20', citation: 'Josephus, Antiquities 20.9.1 (§200).', kind: 'primary' },
        { id: 'painter1999', citation: 'Painter, J. Just James. Fortress, 1999.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nc-tacitus',
      claim: 'Tacitus, Annals 15.44 reports that “Christus” was executed under Tiberius by the procurator Pontius Pilate and that the movement originated in Judea.',
      detail:
        'Context: Nero’s persecution after the Great Fire of Rome (64 CE). Written c. 115 CE. Generally accepted as genuine Tacitean text; debate concerns Tacitus’s sources (Roman records vs. Christian hearsay) rather than wholesale forgery.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'tacitus-text', citation: 'Tacitus, Annals 15.44 (Teubner/OCT/Loeb).', kind: 'primary' },
        { id: 'vanvoorst2000', citation: 'Van Voorst, R.E. Jesus Outside the New Testament. Eerdmans, 2000.', kind: 'survey' },
      ],
    },
    {
      id: 'nc-pliny',
      claim: 'Pliny the Younger, Epistles 10.96–97, describes early second-century Christian worship practices in Bithynia-Pontus and imperial policy under Trajan.',
      detail:
        'Not a biography of Jesus; documents Christ-cult devotion (“carmen Christo quasi deo”) and Roman administrative response. Primary for early Christian social history.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'pliny-ep', citation: 'Pliny the Younger, Epistulae 10.96–97.', kind: 'primary' },
      ],
    },
  ],
}

const S07_ARCHAEOLOGY: RocSection = {
  id: 'levantine-archaeology',
  number: 'VII',
  title: 'Levantine Archaeology Relevant to the Jesus Tradition',
  subtitle: 'Sites, inscriptions, and material culture with direct or contextual bearing.',
  dateRange: 'Iron Age – Early Roman',
  summary:
    'Archaeology rarely “proves” individual Gospel pericopes; it constrains geography, onomastics, economy, and Roman administration.',
  claims: [
    {
      id: 'arch-nazareth',
      claim: 'Nazareth existed as a small Jewish settlement in the Early Roman period; monumental first-century remains are limited.',
      detail:
        'Excavations indicate a modest agricultural village. Claims of a large first-century city are not supported. The rock-cut houses and later Christian commemorative architecture require stratigraphic separation.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'dark2020', citation: 'Dark, K. Roman-Period and Byzantine Nazareth and Its Hinterland. Routledge / PEF, 2020.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'arch-capernaum',
      claim: 'Capernaum (Kefar Nahum) was a fishing village on the Sea of Galilee with Early Roman occupation; a later synagogue stands over earlier remains.',
      detail:
        'Basalt house structures and the white limestone synagogue (later) are key tourist and scholarly loci. Association of a specific “house of Peter” is traditional/interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'corbo1975', citation: 'Corbo, V. Cafarnao. Franciscan Printing Press (excavation reports).', kind: 'survey' },
      ],
    },
    {
      id: 'arch-siloam',
      claim: 'The Siloam Tunnel inscription (discovered 1880) describes construction of Hezekiah’s tunnel, matching 2 Kings 20:20 / 2 Chr 32:30 as royal hydraulic works.',
      detail:
        'Paleo-Hebrew inscription; now in Istanbul Archaeology Museums. Radiocarbon and geological studies of the tunnel support late Iron Age construction broadly consistent with late eighth-century context.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'shanks2005', citation: 'Shanks, H. “The Siloam Pool: Where Jesus Healed the Blind Man.” BAR 31:5 (2005).', kind: 'survey' },
      ],
    },
    {
      id: 'arch-jericho',
      claim: 'Jericho’s Late Bronze destruction layers and relation to a conquest narrative remain a classic contested case in biblical archaeology.',
      detail:
        'Kenyon’s dating challenged earlier Garstang conclusions; Wood and others re-opened debate. Represents methodological limits of correlating literary conquest accounts with destruction horizons.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'kenyon1957', citation: 'Kenyon, K. Digging Up Jericho. Praeger, 1957.', kind: 'survey' },
        { id: 'wood1990', citation: 'Wood, B.G. “Did the Israelites Conquer Jericho? A New Look at the Archaeological Evidence.” BAR 16:2 (1990).', kind: 'survey' },
      ],
    },
  ],
}

const S08_EARLY_CHRISTIANITY: RocSection = {
  id: 'early-christian-literature',
  number: 'VIII',
  title: 'Early Christian Literature Beyond the New Testament',
  subtitle: 'Apostolic Fathers, apocrypha, and the formation of the canon.',
  dateRange: 'c. 70–400 CE',
  summary:
    'Second- and third-century literature documents diversity of early Christian groups and the gradual stabilization of a 27-book NT canon.',
  claims: [
    {
      id: 'ec-athanasius',
      claim: 'Athanasius, 39th Festal Letter (367 CE), lists the exact 27-book New Testament canon later ratified in the West.',
      detail:
        'Earlier partial lists (Muratorian Fragment, Eusebius’s categories) show process, not instant closure. Councils of Hippo (393) and Carthage (397) reflect regional reception.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'athanasius-festal', citation: 'Athanasius, Festal Letter 39 (critical editions of Athanasian corpus).', kind: 'primary' },
        { id: 'metzger-canon', citation: 'Metzger, B.M. The Canon of the New Testament. Oxford UP, 1987.', kind: 'survey' },
      ],
    },
    {
      id: 'ec-apostolic-fathers',
      claim: 'The Apostolic Fathers (1 Clement, Didache, Ignatius, Polycarp, etc.) provide early non-NT Christian primary sources.',
      detail:
        'Critical editions: Loeb Apostolic Fathers (Ehrman); Holmes. Dates and compositional unity vary by text; 1 Clement is often placed c. 95–100 CE.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'ehrman-af', citation: 'Ehrman, B.D., ed./trans. The Apostolic Fathers. 2 vols. LCL. Harvard UP, 2003.', kind: 'critical_edition' },
      ],
    },
    {
      id: 'ec-gospel-thomas',
      claim: 'The Gospel of Thomas (Nag Hammadi) is a sayings gospel whose dating and dependence on canonical Gospels are contested.',
      detail:
        'Coptic text from Nag Hammadi Codex II; Greek Oxyrhynchus fragments. Independent early sayings source vs. secondary dependence theories both have scholarly defenders.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'patterson1993', citation: 'Patterson, S.J. The Gospel of Thomas and Jesus. Polebridge, 1993.', kind: 'peer_reviewed' },
        { id: 'gathercole2012', citation: 'Gathercole, S. The Composition of the Gospel of Thomas. Cambridge UP, 2012.', kind: 'peer_reviewed' },
      ],
    },
  ],
}

const S09_MODERN: RocSection = {
  id: 'modern-scholarship',
  number: 'IX',
  title: 'Modern Scholarly and Scientific Assessment to 2026',
  subtitle: 'Critical editions, quests for the historical Jesus, radiocarbon, and digital corpora.',
  dateRange: 'c. 1778 – 2026',
  summary:
    'From Reimarus and Strauss through form criticism, the New Quest, the Third Quest, and contemporary digital manuscript science.',
  claims: [
    {
      id: 'mod-critical-editions',
      claim: 'NA28/UBS5 (and ongoing ECM/INTF work) are the standard working critical texts of the Greek NT for academic use.',
      detail:
        'The Editio Critica Maior progressively replaces hand editions for books it covers. Citation practice should specify edition.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'na28b', citation: 'Nestle-Aland 28 (2012). Deutsche Bibelgesellschaft.', kind: 'critical_edition' },
        { id: 'ecm', citation: 'INTF Editio Critica Maior (various fascicles).', url: 'https://www.uni-muenster.de/INTF/', kind: 'critical_edition' },
      ],
    },
    {
      id: 'mod-radiocarbon-dss',
      claim: 'Radiocarbon dating of selected Dead Sea Scrolls supports late Second Temple copy ranges broadly consistent with paleography.',
      detail:
        'AMS ¹⁴C studies (1990s onward) provide calibrated ranges with confidence intervals; not every scroll is carbon-dated. Paleography and radiocarbon are complementary, occasionally in tension for individual items.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'bonani1992', citation: 'Bonani, G. et al. “Radiocarbon Dating of Fourteen Dead Sea Scrolls.” Radiocarbon 34 (1992): 843–849.', kind: 'scientific' },
        { id: 'jurecki2020', citation: 'Subsequent IAA / collaborative ¹⁴C programs (see IAA publications).', kind: 'scientific' },
      ],
    },
    {
      id: 'mod-historical-jesus-quests',
      claim: '“Quests” for the historical Jesus are historiographical programs with shifting criteria; no single reconstruction commands universal assent.',
      detail:
        'Schweitzer’s critique of the First Quest; New Quest (Käsemann et al.); Third Quest emphasizing Jewish context (Sanders, Vermes, Meier, Wright, Crossan, et al.). Method diversity is itself data about the limits of the sources.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'schweitzer1906', citation: 'Schweitzer, A. The Quest of the Historical Jesus (ET of Von Reimarus zu Wrede).', kind: 'survey' },
        { id: 'theissen2002', citation: 'Theissen, G. & Merz, A. The Historical Jesus: A Comprehensive Guide. Fortress, 1998.', kind: 'survey' },
      ],
    },
    {
      id: 'mod-population-genetics',
      claim: 'Population genetics of the Levant documents deep regional continuity with admixture layers; it does not identify individuals named in ancient texts.',
      detail:
        'Ancient DNA studies (e.g., Southern Levant Bronze/Iron Age) inform demographic history. Using genetics to “prove” biblical genealogies of named persons exceeds the data and is labeled speculative if attempted.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'agrinat2020', citation: 'Agranat-Tamir, L. et al. “The Genomic History of the Bronze Age Southern Levant.” Cell 181 (2020): 1146–1157.', kind: 'scientific' },
      ],
    },
  ],
}

function withExtras(section: RocSection): RocSection {
  const extra = [
    ...(ROC_EXTRA_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE3_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE4_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE5_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE6_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE7_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE8_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE9_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE10_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE11_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE12_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE13_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE14_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE15_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE16_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE17_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE18_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE19_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE20_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE21_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE22_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE23_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE24_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE25_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE26_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE27_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE28_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE29_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE30_CLAIMS[section.id] ?? []),
    ...(ROC_WAVE31_CLAIMS[section.id] ?? []),
  ]
  if (extra.length === 0) return section
  return { ...section, claims: [...section.claims, ...extra] }
}

export const ROC_SECTIONS: RocSection[] = [
  S01_COSMOLOGY,
  S02_ANE,
  S03_SECOND_TEMPLE,
  S04_HISTORICAL_JESUS,
  S05_NT_TEXT,
  S06_NONCHRISTIAN,
  S07_ARCHAEOLOGY,
  S08_EARLY_CHRISTIANITY,
  S09_MODERN,
].map(withExtras)

export function rocAllClaims(): RocClaim[] {
  return ROC_SECTIONS.flatMap(s => s.claims)
}

export function rocClaimCount(): number {
  return rocAllClaims().length
}

export function rocSourceCount(): number {
  const ids = new Set<string>()
  for (const c of rocAllClaims()) {
    for (const s of c.sources) ids.add(s.id)
  }
  return ids.size
}

export function rocTierHistogram(): Record<ScholarlyEvidenceTier, number> {
  const hist = {
    verified: 0,
    well_attested: 0,
    circumstantial: 0,
    contested: 0,
    interpretive: 0,
    speculative: 0,
    literary_theological: 0,
  } satisfies Record<ScholarlyEvidenceTier, number>
  for (const c of rocAllClaims()) hist[c.tier] += 1
  return hist
}

export function rocExportJson(): string {
  const payload = {
    meta: ROC_META,
    generatedAt: new Date().toISOString(),
    claimCount: rocClaimCount(),
    sourceCount: rocSourceCount(),
    tierHistogram: rocTierHistogram(),
    sections: ROC_SECTIONS.map(s => ({
      id: s.id,
      number: s.number,
      title: s.title,
      dateRange: s.dateRange,
      claims: s.claims.map(c => ({
        id: c.id,
        claim: c.claim,
        detail: c.detail,
        tier: c.tier,
        proofVsConcept: c.proofVsConcept,
        confidenceNote: c.confidenceNote ?? null,
        sources: c.sources,
      })),
    })),
    timeline: ROC_TIMELINE,
    attribution: 'Veritas Worldwide',
  }
  return JSON.stringify(payload, null, 2)
}

export function rocExportCsv(): string {
  const rows: string[] = [
    ['section_id', 'section_title', 'claim_id', 'tier', 'proof_vs_concept', 'claim', 'source_count', 'source_ids'].join(','),
  ]
  const esc = (v: string) => `"${v.replace(/"/g, '""').replace(/\n/g, ' ')}"`
  for (const s of ROC_SECTIONS) {
    for (const c of s.claims) {
      rows.push(
        [
          esc(s.id),
          esc(s.title),
          esc(c.id),
          esc(c.tier),
          esc(c.proofVsConcept),
          esc(c.claim),
          String(c.sources.length),
          esc(c.sources.map(x => x.id).join(';')),
        ].join(','),
      )
    }
  }
  return rows.join('\n')
}

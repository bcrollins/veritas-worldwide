/**
 * Interval-2+ claim expansions for The Record of Jesus Christ.
 * Attribution: Veritas Worldwide only.
 * Types mirrored from recordOfJesusChrist to avoid circular imports.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'

interface RocSource {
  id: string
  citation: string
  url?: string
  kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific'
}

interface RocClaim {
  id: string
  claim: string
  detail: string
  tier: ScholarlyEvidenceTier
  proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'
  sources: RocSource[]
  confidenceNote?: string
}

/** Additional claims keyed by section id. */
export const ROC_EXTRA_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-matter-energy',
      claim: 'Planck baseline ΛCDM reports cold dark matter and dark energy as dominant density components of the present universe.',
      detail:
        'Planck 2018 parameters give Ωc h² and ΩΛ such that ordinary baryonic matter is a minority fraction of the cosmic energy budget. Dark matter and dark energy are operational parameters constrained by data; their microphysical identity remains an open research problem.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'planck-params', citation: 'Planck Collaboration. A&A 641, A6 (2020).', kind: 'scientific' },
      ],
    },
    {
      id: 'cosmo-fine-tuning-params',
      claim: 'Several dimensionless physical parameters appear finely constrained for complex chemistry; teleological interpretation is philosophical, not a scientific conclusion of this Record.',
      detail:
        'Examples discussed in the physics literature include the cosmological constant problem and nuclear resonance levels relevant to carbon production. Reporting parameter sensitivity is scientific; inferring design or purpose is outside the evidentiary compilation and is not labeled VERIFIED here.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'carr-reees', citation: 'Carr, B.J. & Rees, M.J. “The anthropic principle and the structure of the physical world.” Nature 278 (1979): 605–612.', kind: 'scientific' },
        { id: 'weinberg1987', citation: 'Weinberg, S. “Anthropic Bound on the Cosmological Constant.” Phys. Rev. Lett. 59 (1987): 2607.', kind: 'scientific' },
      ],
      confidenceNote: 'Parameter facts: scientific literature. Purpose claims: out of scope as historical/scientific fact.',
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-cyrus-cylinder',
      claim: 'The Cyrus Cylinder (c. 539 BCE) records Achaemenid policy of restoring temples and returning displaced populations after the conquest of Babylon.',
      detail:
        'British Museum collection. Aligns thematically with Ezra 1 / 2 Chronicles 36 return rhetoric without being a Hebrew-language decree. Comparative imperial propaganda is the secure framing.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'bm-cyrus', citation: 'British Museum — Cyrus Cylinder (1880,0617.1941).', url: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941', kind: 'museum' },
      ],
    },
    {
      id: 'ane-babylonian-chronicles',
      claim: 'Babylonian Chronicles document Nebuchadnezzar’s campaigns against Jerusalem, providing independent chronological control for the late Iron Age Judah narrative.',
      detail:
        'ABC 5 (Jerusalem Chronicle) records the 597 BCE capture. Corroborates a historical Babylonian military horizon; literary theological framing in Kings/Chronicles remains a separate analysis layer.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'grayson1975', citation: 'Grayson, A.K. Assyrian and Babylonian Chronicles. Eisenbrauns / TCS 5.', kind: 'critical_edition' },
      ],
    },
    {
      id: 'ane-hezekiah-lmlk',
      claim: 'lmlk jar handles and related Judahite administrative seals concentrate in late eighth-century contexts associated with Hezekiah’s reign and Assyrian threat.',
      detail:
        'Archaeological distribution supports a centralized Judahite supply system. Correlation with biblical Hezekiah is well-attested in scholarship; precise year-by-year campaign matching remains interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'upshaw-lmlk', citation: 'Lipschits, O. et al. studies on lmlk impressions (various IEJ / Tel Aviv articles).', kind: 'peer_reviewed' },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-community-rule',
      claim: 'Qumran sectarian texts (e.g., Community Rule 1QS, War Scroll 1QM, Pesharim) document a Jewish movement with distinctive purity, calendar, and eschatology in the late Second Temple period.',
      detail:
        'Not Christian documents. Essential comparative context for apocalyptic language and community discipline in the Judean desert. Essene identification is majority but not unanimous.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'garcia-martinez', citation: 'García Martínez, F. & Tigchelaar, E. The Dead Sea Scrolls Study Edition. Brill, 1997–98.', kind: 'critical_edition' },
        { id: 'vermes2011', citation: 'Vermes, G. The Complete Dead Sea Scrolls in English. Penguin, rev. eds.', kind: 'survey' },
      ],
    },
    {
      id: 'st-dss-books',
      claim: 'Among biblical DSS copies, Psalms, Deuteronomy, Isaiah, Exodus, and Genesis are among the most frequently attested books; Esther is not securely attested at Qumran.',
      detail:
        'Counts vary by fragment identification. Pedagogical “every book except Esther” summary is standard; precise fragment tallies should cite DJD / IAA catalogues for any given claim.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'tov-text-dss', citation: 'Tov, E. Textual Criticism of the Hebrew Bible. 3rd ed. Fortress, 2012 (DSS chapter).', kind: 'critical_edition' },
        { id: 'iaa-dss', citation: 'IAA Leon Levy DSS Digital Library.', url: 'https://www.deadseascrolls.org.il/', kind: 'museum' },
      ],
    },
    {
      id: 'st-herod-temple',
      claim: 'Herod’s expansion of the Jerusalem Temple platform is archaeologically and literarily well documented for the late first century BCE – first century CE.',
      detail:
        'Josephus describes the project; Western Wall and southern excavations expose Herodian ashlars and street levels destroyed in 70 CE. Contextualizes Gospel temple scenes as Early Roman urban-religious space.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'jos-war-temple', citation: 'Josephus, Jewish War 5; Antiquities 15 (Temple descriptions).', kind: 'primary' },
        { id: 'ritmeyer', citation: 'Ritmeyer, L. The Quest: Revealing the Temple Mount in Jerusalem. Carta, 2006.', kind: 'survey' },
      ],
    },
    {
      id: 'st-parties',
      claim: 'Josephus and later rabbinic memory describe Pharisees, Sadducees, and Essenes as major Jewish schools; exact social demographics remain reconstructed.',
      detail:
        'Primary Josephan typology is foundational. Essene–Qumran link is majority. Gospel portrayals of Pharisees are literary-theological sources requiring historical criticism, not raw census data.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'jos-ant18-parties', citation: 'Josephus, Antiquities 18.1.2–5 (schools).', kind: 'primary' },
        { id: 'sanders1992', citation: 'Sanders, E.P. Judaism: Practice and Belief 63 BCE–66 CE. SCM/TPI, 1992.', kind: 'peer_reviewed' },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-galilee-context',
      claim: 'Early Roman Galilee included agricultural villages, fishing economy on the lake, and nearby urban centers such as Sepphoris and Tiberias.',
      detail:
        'Archaeology and Josephus frame Jesus’ activity zone as Jewish Galilee under Herodian tetrarchy (Antipas) and later Roman administration. “Peasant” vs “artisan” socioeconomic models remain interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'freyne2000', citation: 'Freyne, S. Galilee and Gospel. Mohr Siebeck / Brill studies.', kind: 'peer_reviewed' },
        { id: 'reed2000', citation: 'Reed, J.L. Archaeology and the Galilean Jesus. Trinity Press, 2000.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-language',
      claim: 'Jesus likely spoke Aramaic as a primary vernacular; Greek exposure in Galilee is plausible; Hebrew literacy/use is debated for the population stratum.',
      detail:
        'Aramaic sayings preserved in Greek Gospels (e.g., talitha koum, eloi eloi) support Aramaic speech. Extent of Greek and Hebrew competence is contested and class-dependent.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'fitzmyer1979', citation: 'Fitzmyer, J.A. A Wandering Aramean. Scholars Press, 1979.', kind: 'peer_reviewed' },
        { id: 'casey1998', citation: 'Casey, M. Aramaic Sources of Mark’s Gospel. Cambridge UP, 1998.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-miracles-method',
      claim: 'Miracle narratives are not historically “verified” under naturalistic historical method; historians can study reports, meanings, and social effects of wonder-traditions.',
      detail:
        'Multiple attestation of healing/exorcism reputation exists in early sources. Ontological miracle claims exceed historical-scientific verification criteria used in this Record and are not labeled VERIFIED as events.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'meier-vol2-mir', citation: 'Meier, J.P. A Marginal Jew, Vol. 2 (mentor, message, miracles).', kind: 'peer_reviewed' },
        { id: 'eve2002', citation: 'Eve, E. The Jewish Context of Jesus’ Miracles. Sheffield, 2002.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-quirinius',
      claim: 'Luke’s census notice linking Jesus’ birth to a registration under Quirinius (6 CE) is a classic chronological problem relative to a Herodian birth before 4 BCE.',
      detail:
        'Josephus places Quirinius’s census after Archelaus’s removal (6 CE). Harmonization theories (earlier census, translation issues) exist; many critical historians treat the Lucan notice as theologically motivated chronology. Contested.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'jos-ant18-census', citation: 'Josephus, Antiquities 18.1.1 (Quirinius census).', kind: 'primary' },
        { id: 'brown-birth', citation: 'Brown, R.E. The Birth of the Messiah. Yale UP, updated ed.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-bethlehem',
      claim: 'Bethlehem birth is narrated in Matthew and Luke with divergent infancy stories; historical verification is contested, while Nazareth association is stronger.',
      detail:
        'Infancy narratives differ in geography, chronology, and cast. Micah 5 intertextuality is a literary factor. Many historical Jesus reconstructions prefer Nazareth origin with Bethlehem as theological claim.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'brown-birth2', citation: 'Brown, R.E. The Birth of the Messiah.', kind: 'peer_reviewed' },
        { id: 'allison-birth', citation: 'Allison, D.C. studies on Matthew infancy tradition.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-magi-star',
      claim: 'Magi and star narratives in Matthew 2 are literary-theological traditions; astronomical “explanations” are speculative correlations, not historical proof.',
      detail:
        'Conjunction hypotheses (e.g., Jupiter-Saturn) appear in popular and some scholarly discussion but do not establish Matthean historicity. Tiered as literary/theological development for the narrative claim.',
      tier: 'literary_theological',
      proofVsConcept: 'tradition',
      sources: [
        { id: 'matt2', citation: 'Matthew 2 (critical Greek text NA28).', kind: 'primary' },
        { id: 'brown-birth3', citation: 'Brown, R.E. The Birth of the Messiah (Magi chapter).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-crucifixion-year',
      claim: 'Crucifixion year is commonly constrained to c. 30–33 CE by Pilate’s tenure (26–36), Passover weekday arguments, and astronomical full-moon tables — exact year remains debated.',
      detail:
        'Humphreys, Pratt, and others propose specific dates; critical caution remains because Gospel chronologies differ (Synoptics vs John on Passover timing).',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'humphreys2011', citation: 'Humphreys, C. The Mystery of the Last Supper. Cambridge UP, 2011.', kind: 'survey' },
        { id: 'meier-vol1-chron', citation: 'Meier, J.P. A Marginal Jew, Vol. 1 (chronology).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-empty-tomb',
      claim: 'Empty-tomb narratives appear in the canonical Gospels with differences; whether an empty tomb is historical is debated; early creed in 1 Cor 15 emphasizes appearances more than tomb logistics.',
      detail:
        'Mark ends (in earliest recoverable form for many critics) with empty tomb and fear; later endings and other Gospels expand. Historical judgments diverge (historical core vs. legendary development).',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'allison-res', citation: 'Allison, D.C. The Resurrection of Jesus. T&T Clark, 2021.', kind: 'peer_reviewed' },
        { id: 'craig-vs-crossan', citation: 'Published debates (Craig, Crossan, Lüdemann, et al.) — positions diverge.', kind: 'survey' },
      ],
    },
    {
      id: 'hj-appearances',
      claim: 'Early Christian proclamation included claims of post-crucifixion appearances to individuals and groups (1 Cor 15:3–8); the nature of those experiences is not scientifically settled.',
      detail:
        'The creedal list is early. Psychological, legendary-growth, and theological explanations compete. This Record documents the attestation of the claims, not a verdict on ontology.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: '1cor15', citation: '1 Corinthians 15:3–8 (NA28).', kind: 'primary' },
        { id: 'allison-res2', citation: 'Allison, D.C. The Resurrection of Jesus. T&T Clark, 2021.', kind: 'peer_reviewed' },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-p45-p46-p47',
      claim: 'Chester Beatty papyri (P45, P46, P47) are major third-century witnesses to Gospels/Acts, Paul, and Revelation respectively.',
      detail:
        'Held primarily in Dublin (CBL) and partial Michigan holdings for P46. Crucial for early textual history predating the great fourth-century majuscules.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'kenyon-cb', citation: 'Kenyon, F.G. The Chester Beatty Biblical Papyri (facsimile editions).', kind: 'critical_edition' },
        { id: 'intf-liste', citation: 'INTF manuscript Liste / NT.VMR.', url: 'https://ntvmr.uni-muenster.de/', kind: 'critical_edition' },
      ],
    },
    {
      id: 'nt-p66-p75',
      claim: 'Bodmer papyri P66 and P75 are early substantial witnesses to John (and Luke/John for P75), foundational for Alexandrian text studies.',
      detail:
        'Dating typically second/third century ranges (paleography). P75’s affinity with Vaticanus (B) is a classic result in modern textual criticism.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'martin-bodmer', citation: 'Martin, V. / Barns, etc. Papyrus Bodmer editions (Cologny).', kind: 'critical_edition' },
        { id: 'metzger2005b', citation: 'Metzger & Ehrman, The Text of the New Testament. 4th ed.', kind: 'survey' },
      ],
    },
    {
      id: 'nt-mark-ending',
      claim: 'The longer ending of Mark (16:9–20) is absent from the earliest major witnesses (ℵ B) and is marked as secondary in NA28/UBS apparatuses.',
      detail:
        'Shorter ending and freer expansions also exist in the tradition. Majority Byzantine manuscripts include 16:9–20. Critical editions present the evidence; doctrine is not decided by apparatus symbols.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'metzger-tc-mark', citation: 'Metzger, B.M. A Textual Commentary on the Greek New Testament (Mark 16).', kind: 'critical_edition' },
        { id: 'na28-mark', citation: 'NA28 apparatus at Mark 16:8–20.', kind: 'critical_edition' },
      ],
    },
    {
      id: 'nt-pericope-adulterae',
      claim: 'John 7:53–8:11 (pericope adulterae) is widely judged a later insertion into John; early Greek continuous-text support is weak.',
      detail:
        'Appears in different locations in some manuscripts; absent from early papyri and ℵ B. NA28 double-brackets the passage. A famous meaningful variant with strong critical consensus on secondary status in John.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'metzger-tc-pa', citation: 'Metzger, Textual Commentary (John 7:53–8:11).', kind: 'critical_edition' },
        { id: 'knust-wasserman', citation: 'Knust, J. & Wasserman, T. To Cast the First Stone. Princeton UP, 2019.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nt-comma-johanneum',
      claim: 'The Comma Johanneum (1 John 5:7–8 Trinitarian formula in some later Latin/TR traditions) lacks early Greek support and is omitted in modern critical editions.',
      detail:
        'Entered late medieval Latin tradition; Erasmus’s editions and the Textus Receptus popularized it in early modern Protestant Bibles. Textbook case of secondary theological expansion in transmission.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'metzger-tc-comma', citation: 'Metzger, Textual Commentary (1 John 5:7–8).', kind: 'critical_edition' },
      ],
    },
    {
      id: 'nt-synoptic-problem',
      claim: 'The Synoptic Problem (literary relationship of Matthew, Mark, Luke) remains an active field; Markan priority is majority, Q hypothesis is majority but contested by Farrer and other models.',
      detail:
        'Two-Source Theory (Mark + Q) remains standard in many introductions; Farrer (Mark→Matthew→Luke without Q), Matthean priority minorities, and oral-performance models compete. Contested at the level of detailed source maps.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'goodacre2002', citation: 'Goodacre, M. The Case Against Q. T&T Clark, 2002.', kind: 'peer_reviewed' },
        { id: 'kloppenborg1987', citation: 'Kloppenborg, J.S. The Formation of Q. Fortress, 1987.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nt-john-historicity',
      claim: 'John’s Gospel is generally dated later than the Synoptics; its independent historical value for Jesus research is debated (high Christology vs. early tradition cores).',
      detail:
        'Archaeology (e.g., Bethesda pools) shows local knowledge; discourses differ sharply from Synoptic style. Third Quest scholars vary widely on usable Johannine strata.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'brown-john', citation: 'Brown, R.E. The Gospel According to John (AB).', kind: 'peer_reviewed' },
        { id: 'anderson2006', citation: 'Anderson, P.N. The Fourth Gospel and the Quest for Jesus. T&T Clark, 2006.', kind: 'peer_reviewed' },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-tf-reconstructions',
      claim: 'Major scholarly reconstructions of the Testimonium Flavianum range from a short neutral core to more expansive partial authenticity; wholesale authenticity and wholesale forgery are minority poles.',
      detail:
        'Meier’s reconstructed core is widely cited; Whealey surveys reception history; Olson and others press forgery; some confessional scholars defend fuller authenticity. Evidence weights favor partial authenticity but the claim remains contested.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'meier-tf2', citation: 'Meier, J.P. A Marginal Jew, Vol. 1, 56–88.', kind: 'peer_reviewed' },
        { id: 'whealey2003b', citation: 'Whealey, A. Josephus on Jesus. Peter Lang, 2003.', kind: 'peer_reviewed' },
        { id: 'olson1999', citation: 'Olson, K.A. “Eusebius and the Testimonium Flavianum.” CBQ 61 (1999): 305–322.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nc-tacitus-latin',
      claim: 'Tacitus Annals 15.44 (Latin) states that Christus suffered the extreme penalty under Tiberius by sentence of procurator Pontius Pilate, and that the superstitio arose in Judea.',
      detail:
        'Standard critical text. “Procurator” is anachronistic relative to epigraphic “prefect” (Pilate Stone) but does not negate the reference. Source path (archives vs. common knowledge) debated.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'tacitus-loeb', citation: 'Tacitus, Annals 15.44 (Loeb/Teubner).', kind: 'primary' },
        { id: 'vanvoorst2000b', citation: 'Van Voorst, R. Jesus Outside the New Testament. Eerdmans, 2000.', kind: 'survey' },
      ],
    },
    {
      id: 'nc-suetonius',
      claim: 'Suetonius, Claudius 25.4, refers to disturbances in Rome impulsore Chresto — often discussed as a possible garbled reference to Christ-related conflict, but identification is uncertain.',
      detail:
        '“Chrestus” may be a common name or a misspelling of Christus. Not a secure independent biography of Jesus; circumstantial at best for early Roman Christian presence.',
      tier: 'circumstantial',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'suet-claud', citation: 'Suetonius, Divus Claudius 25.4.', kind: 'primary' },
        { id: 'vanvoorst-suet', citation: 'Van Voorst, Jesus Outside the New Testament (Suetonius chapter).', kind: 'survey' },
      ],
    },
    {
      id: 'nc-mara',
      claim: 'The Syriac letter of Mara bar Serapion mentions a “wise king” executed by the Jews; identification with Jesus is possible but not certain.',
      detail:
        'Date and referent debated. Often listed among possible allusions; insufficient alone for historical reconstruction of Jesus.',
      tier: 'circumstantial',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'mara-letter', citation: 'Mara bar Serapion letter (Syriac; various ET in Van Voorst / Cureton traditions).', kind: 'primary' },
      ],
    },
    {
      id: 'nc-lucian',
      claim: 'Lucian of Samosata (2nd c.) satirizes Christians and refers to their crucified sophist in Passing of Peregrinus — evidence of known Christian devotion, not independent biography.',
      detail:
        'Hostile/satirical literary source for second-century Christian social profile.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'lucian-peregrinus', citation: 'Lucian, De Morte Peregrini.', kind: 'primary' },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-yehohanan',
      claim: 'The crucified remains of Yehohanan son of Hagkol (Giv‘at ha-Mivtar) provide osteological evidence of Roman crucifixion practice in Judea (nail through heel bone).',
      detail:
        'Rare skeletal evidence; demonstrates nails could be used and bodies could receive secondary burial. Does not identify Jesus; constrains execution practice context.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'tzaferis1985b', citation: 'Tzaferis, V. “Crucifixion — The Archaeological Evidence.” BAR 11:1 (1985).', kind: 'peer_reviewed' },
        { id: 'zias-seki', citation: 'Zias, J. & Sekeles, E. “The Crucified Man from Giv‘at ha-Mivtar: A Reappraisal.” IEJ 35 (1985).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'arch-sepphoris',
      claim: 'Sepphoris (Zippori), ~6 km from Nazareth, was a significant urban center in Early Roman Galilee under Antipas.',
      detail:
        'Excavations show monumental building phases. Relevance to Jesus is contextual (labor market, hellenization debates), not a Gospel setting by name.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'meyers-sepphoris', citation: 'Meyers, E. et al. Sepphoris excavation reports.', kind: 'survey' },
      ],
    },
    {
      id: 'arch-james-ossuary',
      claim: 'The so-called James ossuary inscription (“James son of Joseph brother of Jesus”) remains contested regarding authenticity of the brother phrase and provenance.',
      detail:
        'High-profile forgery trial in Israel ended without conclusive criminal conviction on the inscription, but scholarly opinion remains divided. Not treated as verified proof of New Testament James.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'shanks-witherington', citation: 'Shanks, H. & Witherington, B. The Brother of Jesus. Harper, 2003 (pro-authenticity popular).', kind: 'survey' },
        { id: 'ossuary-critical', citation: 'Critical assessments in NEA / BAR exchanges and IAA statements (various).', kind: 'survey' },
      ],
    },
    {
      id: 'arch-talpiot',
      claim: 'Talpiot “Jesus family tomb” statistical and onomastic claims are speculative and rejected by most specialists as identification of the New Testament Jesus.',
      detail:
        'Common names in first-century Judea undermine unique identification. Media claims outran peer consensus. Labeled speculative/unverifiable for the identification hypothesis.',
      tier: 'speculative',
      proofVsConcept: 'tradition',
      sources: [
        { id: 'kilty-elliott', citation: 'Kilty, K. & Elliott, M. statistical critiques; Magness and others archaeological responses.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'arch-pool-bethesda',
      claim: 'Excavations north of the Temple Mount have exposed twin pools matching John’s description of Bethesda with five porticoes (John 5) better than once assumed.',
      detail:
        'Supports Johannine local knowledge of Jerusalem topography; does not by itself verify the healing narrative as historical event.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'vonwahlde', citation: 'von Wahlde, U.C. studies on Bethesda archaeology and John 5.', kind: 'peer_reviewed' },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-muratorian',
      claim: 'The Muratorian Fragment is an early (often 2nd-century, date contested) Latin canon list showing a nearly formed but not identical NT collection.',
      detail:
        'Includes most NT books; omits some; discusses disputed works. Evidence of process toward canon.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'metzger-canon2', citation: 'Metzger, B.M. The Canon of the New Testament. Oxford UP, 1987.', kind: 'survey' },
      ],
    },
    {
      id: 'ec-marcion',
      claim: 'Marcion of Sinope (mid-2nd century) promulgated a reduced Gospel+Paul collection, prompting proto-orthodox canon and theological responses.',
      detail:
        'Reconstructed from opponents (Tertullian, Epiphanius). Important for second-century textual and theological history; not a source for the historical Jesus independent of Luke-related material.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'lieuten', citation: 'Lieu, J. Marcion and the Making of a Heretic. Cambridge UP, 2015.', kind: 'peer_reviewed' },
        { id: 'beDuhn2013', citation: 'BeDuhn, J. The First New Testament: Marcion’s Scriptural Canon. Polebridge, 2013.', kind: 'survey' },
      ],
    },
    {
      id: 'ec-irenaeus',
      claim: 'Irenaeus (c. 180 CE) argues for a fourfold Gospel (Matthew, Mark, Luke, John) against alternative gospel usages.',
      detail:
        'Against Heresies 3.11.8. Marks a key moment in public defense of the four-Gospel collection still standard in mainstream Christianity.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'irenaeus-ah', citation: 'Irenaeus, Adversus Haereses 3.11.8.', kind: 'primary' },
      ],
    },
    {
      id: 'ec-nicaea',
      claim: 'The Council of Nicaea (325 CE) addressed Christological doctrine (homoousios) under Constantine; it did not create the NT canon list.',
      detail:
        'Popular myth that Nicaea “chose the books of the Bible” is false. Canon processes are earlier and multi-local; Nicaea’s creed is literary-theological development of doctrine.',
      tier: 'literary_theological',
      proofVsConcept: 'tradition',
      sources: [
        { id: 'ayres2004', citation: 'Ayres, L. Nicaea and Its Legacy. Oxford UP, 2004.', kind: 'peer_reviewed' },
        { id: 'metzger-canon3', citation: 'Metzger, Canon of the New Testament (corrects Nicaea myth).', kind: 'survey' },
      ],
      confidenceNote: 'Historical fact of council: verified. Doctrinal content: theological development tier for faith claims.',
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-criteria-critique',
      claim: 'Classical criteria of authenticity (embarrassment, dissimilarity, multiple attestation) are historiographical tools with known biases; recent memory and social approaches revise their use.',
      detail:
        'Keith, Le Donne, Allison, and others critique criterion fundamentalism. Criteria remain useful when applied cautiously and labeled as interpretive method, not laboratory proof.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'keith-ledonne', citation: 'Keith, C. & Le Donne, A., eds. Jesus, Criteria, and the Demise of Authenticity. T&T Clark, 2012.', kind: 'peer_reviewed' },
        { id: 'theissen-winter', citation: 'Theissen, G. & Winter, D. The Quest for the Plausible Jesus. WJK, 2002.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'mod-memory-approach',
      claim: 'Social/collective memory approaches reconstruct how groups remembered Jesus rather than claiming verbatim ipsissima verba recovery.',
      detail:
        'Allison’s constructivist caution: the past is accessible through memory refraction. Labeled interpretive analysis.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'allison-constructing', citation: 'Allison, D.C. Constructing Jesus. Baker Academic, 2010.', kind: 'peer_reviewed' },
        { id: 'kirk-thatcher', citation: 'Kirk, A. & Thatcher, T., eds. Memory, Tradition, and Text. SBL, 2005.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'mod-turin-shroud',
      claim: 'The Shroud of Turin is a medieval relic by mainstream radiocarbon dating (1988); authenticity as first-century burial cloth remains speculative/unverified for historical Jesus studies.',
      detail:
        '1988 ¹⁴C results (Nature 1989) place the linen in the medieval period. Alternative contamination/repair hypotheses exist and are minority relative to the Nature study. Not used here as historical proof of the crucifixion.',
      tier: 'speculative',
      proofVsConcept: 'tradition',
      sources: [
        { id: 'damon1989', citation: 'Damon, P.E. et al. “Radiocarbon Dating of the Shroud of Turin.” Nature 337 (1989): 611–615.', kind: 'scientific' },
      ],
    },
    {
      id: 'mod-textus-receptus',
      claim: 'The Textus Receptus tradition (Erasmus onward) underlies early modern vernacular Bibles but is not the base text of modern critical editions (NA/UBS).',
      detail:
        'Important for reception history. Critical editions prefer earlier Alexandrian and diverse witnesses via stemmatic and reasoned eclecticism.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'metzger-text', citation: 'Metzger & Ehrman, The Text of the New Testament.', kind: 'survey' },
      ],
    },
    {
      id: 'mod-war-70',
      claim: 'The Jewish-Roman War culminating in the 70 CE destruction of the Temple is a primary historical horizon for dating and interpreting the Synoptic Gospels.',
      detail:
        'Josephus, archaeology of Jerusalem burn layers, and the Arch of Titus provide multi-source verification of the war’s outcome. Gospel “temple prediction” passages are read by many critics as post-70 literary shaping (contested by early-date advocates).',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'jos-war', citation: 'Josephus, Jewish War.', kind: 'primary' },
        { id: 'arch-titus', citation: 'Arch of Titus, Rome — triumphal reliefs of Temple spoils.', kind: 'museum' },
      ],
    },
  ],
}

export const ROC_TIMELINE: {
  date: string
  title: string
  detail: string
  tier: ScholarlyEvidenceTier
  sectionId: string
}[] = [
  { date: 't≈0 (model)', title: 'Hot Big Bang / inflationary cosmology framework', detail: 'CMB, expansion, and BBN as observational pillars of ΛCDM.', tier: 'verified', sectionId: 'cosmology' },
  { date: 'c. 1208 BCE', title: 'Merneptah Stele names Israel', detail: 'Earliest extra-biblical reference to Israel as a people in Canaan.', tier: 'verified', sectionId: 'ancient-near-east' },
  { date: 'c. 840 BCE', title: 'Mesha Stele & Tel Dan Stele horizon', detail: 'Moabite and Aramean royal inscriptions intersecting Israel/Judah.', tier: 'verified', sectionId: 'ancient-near-east' },
  { date: '597–586 BCE', title: 'Babylonian captures of Jerusalem', detail: 'Chronicles and biblical narrative of exile; Temple destruction 586.', tier: 'verified', sectionId: 'ancient-near-east' },
  { date: '539 BCE', title: 'Cyrus takes Babylon', detail: 'Cyrus Cylinder imperial policy; biblical return traditions.', tier: 'verified', sectionId: 'ancient-near-east' },
  { date: 'c. 250–150 BCE', title: 'Septuagint translation activity', detail: 'Hebrew scriptures into Greek in Ptolemaic Alexandria.', tier: 'well_attested', sectionId: 'second-temple' },
  { date: 'c. 200 BCE–70 CE', title: 'Dead Sea Scrolls copied', detail: 'Biblical and sectarian manuscripts at Qumran.', tier: 'verified', sectionId: 'second-temple' },
  { date: 'c. 4 BCE–33 CE', title: 'Lifetime of Jesus of Nazareth (conventional)', detail: 'Birth under late Herod debated; death under Pilate well-attested.', tier: 'well_attested', sectionId: 'historical-jesus' },
  { date: 'c. 26–36 CE', title: 'Prefecture of Pontius Pilate', detail: 'Pilate Stone + literary sources.', tier: 'verified', sectionId: 'historical-jesus' },
  { date: 'c. 30–33 CE', title: 'Crucifixion of Jesus', detail: 'Multiply attested; exact year debated within window.', tier: 'verified', sectionId: 'historical-jesus' },
  { date: 'c. 49–58 CE', title: 'Undisputed Pauline letters', detail: 'Earliest surviving Christian literature.', tier: 'well_attested', sectionId: 'nt-textual-criticism' },
  { date: 'c. 66–70 CE', title: 'Jewish-Roman War; Temple destroyed', detail: 'Josephus + archaeology + Arch of Titus.', tier: 'verified', sectionId: 'modern-scholarship' },
  { date: 'c. 65–100 CE', title: 'Canonical Gospels composed (critical ranges)', detail: 'Mark earlier; John later; exact years contested.', tier: 'contested', sectionId: 'nt-textual-criticism' },
  { date: 'c. 93–94 CE', title: 'Josephus Antiquities', detail: 'Includes James passage; TF debated.', tier: 'well_attested', sectionId: 'non-christian-attestation' },
  { date: 'c. 112–115 CE', title: 'Pliny–Trajan correspondence; Tacitus Annals', detail: 'Roman administrative and historical notices of Christians/Christus.', tier: 'well_attested', sectionId: 'non-christian-attestation' },
  { date: 'c. 125–250 CE', title: 'Early NT papyri (P52, P66, P75, Chester Beatty)', detail: 'Egyptian finds demonstrating early text circulation.', tier: 'verified', sectionId: 'nt-textual-criticism' },
  { date: 'c. 180 CE', title: 'Irenaeus fourfold Gospel', detail: 'Public defense of Matthew–John collection.', tier: 'verified', sectionId: 'early-christian-literature' },
  { date: '325 CE', title: 'Council of Nicaea', detail: 'Christological creed; did not create the biblical canon list.', tier: 'literary_theological', sectionId: 'early-christian-literature' },
  { date: '367 CE', title: 'Athanasius 39th Festal Letter', detail: 'Exact 27-book NT list.', tier: 'verified', sectionId: 'early-christian-literature' },
  { date: '4th–5th c.', title: 'ℵ A B C D majuscules', detail: 'Foundational continuous-text witnesses.', tier: 'verified', sectionId: 'nt-textual-criticism' },
  { date: '1455 CE', title: 'Gutenberg Bible', detail: 'Print revolution for Latin Vulgate text.', tier: 'verified', sectionId: 'modern-scholarship' },
  { date: '1516 CE', title: 'Erasmus Greek NT', detail: 'Basis for Textus Receptus stream.', tier: 'verified', sectionId: 'modern-scholarship' },
  { date: '1946–1956', title: 'Dead Sea Scrolls discovery', detail: 'Transforms HB textual criticism.', tier: 'verified', sectionId: 'second-temple' },
  { date: '1988–89', title: 'Shroud of Turin radiocarbon', detail: 'Medieval date in Nature study; identification claims speculative.', tier: 'speculative', sectionId: 'modern-scholarship' },
  { date: '2012–2026', title: 'NA28 / ECM / digital NT.VMR era', detail: 'Current critical text infrastructure.', tier: 'verified', sectionId: 'modern-scholarship' },
]

/**
 * Interval 4 claim wave — Record of Jesus Christ
 * Attribution: Veritas Worldwide only.
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

export const ROC_WAVE3_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-cmb-power',
      claim: 'The CMB angular power spectrum exhibits acoustic peaks whose positions and amplitudes constrain baryon density, dark matter density, and curvature in ΛCDM fits.',
      detail:
        'Planck and predecessor experiments publish temperature and polarization power spectra. Peak structure is a primary observable; popular “pictures of the early universe” should be read as mapped anisotropy data, not photographs of galaxies at recombination.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'planck-cmb', citation: 'Planck Collaboration. “Planck 2018 results. V. CMB power spectra…” A&A 641, A5 (2020).', kind: 'scientific' },
      ],
    },
  ],
  'ancient-near-east': [
    {
      id: 'ane-inscription-map',
      claim: 'Key West Semitic and Egyptian inscriptions relevant to Israel/Judah (Merneptah, Mesha, Tel Dan, Siloam, etc.) form a geographically distributed control set across Egypt, Transjordan, and the Galilee–Golan.',
      detail:
        'Findspots constrain independent political actors speaking about Israel/Judah. Mapping is archaeological geography, not a claim that every biblical narrative episode is thereby verified.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'halpern-ane', citation: 'Survey treatments in Kitchen; ANET; COS (Context of Scripture).', kind: 'survey' },
      ],
    },
  ],
  'second-temple': [
    {
      id: 'st-mishnah-context',
      claim: 'The Mishnah (c. 200 CE redaction) and related Tannaitic literature preserve legal memory of Second Temple practice but are post-70 literary products requiring critical use for pre-70 reconstruction.',
      detail:
        'Useful for purity, Temple, and festival law as later rabbis remembered or systematized it. Not a contemporary transcript of Jesus’ lifetime courts.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'neushner-mishnah', citation: 'Neusner, J. The Mishnah: A New Translation. Yale UP (and critical editions of Mishnah).', kind: 'critical_edition' },
        { id: 'sanders-practice', citation: 'Sanders, E.P. Judaism: Practice and Belief 63 BCE–66 CE.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'st-temple-economy',
      claim: 'The Jerusalem Temple system involved tithes, offerings, and currency exchange for worshippers — a documented economic-religious complex in Josephus and later rabbinic memory.',
      detail:
        'Gospel “money changers” pericopes sit in this context. Exact scale and Jesus’ intent are literary-historical reconstructions beyond the mere existence of Temple commerce.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'jos-temple-econ', citation: 'Josephus, Antiquities / War Temple descriptions; cf. Sanders, Judaism: Practice and Belief.', kind: 'primary' },
      ],
    },
    {
      id: 'st-prefecture',
      claim: 'Roman Judea after 6 CE was administered by equestrian prefects (later procurators) based primarily at Caesarea, with troops and judicial powers including capital cases in practice.',
      detail:
        'Pilate’s prefecture is epigraphically and literarily attested. Day-to-day collaboration with high-priestly elites is reconstructed from Josephus and the Gospels with differing emphases.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'schurer', citation: 'Schürer, E. The History of the Jewish People in the Age of Jesus Christ (rev. Vermes et al.). T&T Clark.', kind: 'survey' },
        { id: 'bond-pilate2', citation: 'Bond, H.K. Pontius Pilate in History and Interpretation. Cambridge UP, 1998.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'historical-jesus': [
    {
      id: 'hj-herod-death',
      claim: 'The death of Herod the Great is conventionally dated to 4 BCE (with minority arguments for 1 BCE / other), anchoring the latest plausible nativity window in Matthew’s framework.',
      detail:
        'Josephus’ chronology, eclipse notices, and numismatics drive the debate. Exact year remains contested; the 4 BCE majority is pedagogical, not absolute.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'schurer-herod', citation: 'Schürer, History of the Jewish People (Herod chronology).', kind: 'survey' },
        { id: 'steinmann', citation: 'Steinmann, A. “When Did Herod the Great Reign?” Novum Testamentum 51 (2009) — minority later date.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-pauline-chronology',
      claim: 'Pauline absolute chronology is reconstructed from Acts, the letters, and external anchors (Gallio inscription at Delphi); competing schemes (Ramsay, Knox, Hyldahl, et al.) differ by several years.',
      detail:
        'The Gallio proconsulship (Acts 18) is a rare external fix. Relative order of letters is better constrained than absolute years. Table-level disagreement is expected and labeled contested.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'murphy-oconnor', citation: 'Murphy-O’Connor, J. Paul: A Critical Life. Oxford UP, 1996.', kind: 'survey' },
        { id: 'jewett', citation: 'Jewett, R. A Chronology of Paul’s Life. Fortress, 1979.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-women-movement',
      claim: 'Early Christian sources name women as patrons, witnesses, and coworkers (e.g., Mary Magdalene traditions; Romans 16 co-workers); social roles are historically reconstructable within limits.',
      detail:
        'Multiple attestation of women’s presence exists. Later ecclesiastical restrictions are literary-theological developments not reducible to a single first-generation pattern.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'fiorenza', citation: 'Schüssler Fiorenza, E. In Memory of Her. Crossroad, 1983.', kind: 'peer_reviewed' },
        { id: 'bauckham-women', citation: 'Bauckham, R. Gospel Women. Eerdmans, 2002.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-james-leadership',
      claim: 'James the brother of Jesus is attested as a Jerusalem leadership figure (Paul; Acts; Josephus Ant. 20.200) until his death c. 62 CE.',
      detail:
        'Paul’s “pillars” (Gal 2) and Josephus’s execution account are primary. Precise title and authority structure are reconstructed.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'gal2', citation: 'Galatians 1–2 (NA28).', kind: 'primary' },
        { id: 'jos-james2', citation: 'Josephus, Antiquities 20.200.', kind: 'primary' },
        { id: 'painter-james', citation: 'Painter, J. Just James. Fortress, 1999.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-peter-rome',
      claim: 'Peter’s presence and martyrdom in Rome are early traditions (1 Clement; later Acts of Peter) with varying historical confidence; New Testament itself does not narrate a Roman martyrdom.',
      detail:
        'Mainstream scholarship often accepts a Roman end for Peter as plausible but not proven to archaeological certainty. Vatican necropolis claims are contested interpretive overlays.',
      tier: 'circumstantial',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: '1clem5', citation: '1 Clement 5–6.', kind: 'primary' },
        { id: 'zwierlein', citation: 'Zwierlein, O. Peter in Rome (critical review of Roman tradition).', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-gal2-conflict',
      claim: 'Galatians 2 records a conflict between Paul and Cephas (Peter) at Antioch over table fellowship with gentiles — primary evidence of diversity and dispute in the earliest movement.',
      detail:
        'Historical kernel widely accepted; harmonizations with Acts 15 are interpretive. Documents ethnic-boundary negotiation, not a later myth alone.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'gal2-text', citation: 'Galatians 2:11–14 (NA28).', kind: 'primary' },
        { id: 'dunn-gal', citation: 'Dunn, J.D.G. The Epistle to the Galatians. Black’s / Hendrickson.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-literacy',
      claim: 'Literacy rates in Early Roman Judea/Galilee were limited relative to modern norms; most people encountered texts orally and through specialists.',
      detail:
        'Estimates vary (often low double-digit % or lower for full literacy). Jesus as tekton and Scripture-quoting teacher is compatible with oral-performative skill without assuming elite scribal education.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'hezer', citation: 'Hezser, C. Jewish Literacy in Roman Palestine. Mohr Siebeck, 2001.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'nt-textual-criticism': [
    {
      id: 'nt-origen-hexapla',
      claim: 'Origen’s Hexapla (3rd c.) arranged Hebrew and Greek columns for comparative Old Testament textual work — a landmark of ancient textual criticism.',
      detail:
        'Survives fragmentarily via quotations and manuscript traditions. Relevant to Septuagint history more than NT continuous text, but foundational for Christian scholarly textual culture.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'salvesen', citation: 'Salvesen, A. / Field’s Hexapla studies; Norton, G. on Hexaplaric tradition.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'nt-eusebius-ch',
      claim: 'Eusebius’s Church History is an indispensable but tendentious fourth-century source for earlier Christian literature and martyrdoms; source-critical caution is mandatory.',
      detail:
        'Preserves quotations otherwise lost. Imperial theology and selective use of sources require critical filters (Lawlor & Oulton; Grant; Barnes).',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'eusebius-he', citation: 'Eusebius, Historia Ecclesiastica (GCS / Loeb).', kind: 'primary' },
        { id: 'barnes-eusebius', citation: 'Barnes, T.D. Constantine and Eusebius. Harvard UP, 1981.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'non-christian-attestation': [
    {
      id: 'nc-talmud',
      claim: 'Certain Babylonian Talmud passages are sometimes read as hostile allusions to Jesus; dating, redaction, and identification are highly contested and often late.',
      detail:
        'Not independent first-century biography. Critical scholarship treats many “Yeshu” traditions as later polemical layers. Tiered as contested/circumstantial for historical Jesus reconstruction.',
      tier: 'circumstantial',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'schafer', citation: 'Schäfer, P. Jesus in the Talmud. Princeton UP, 2007.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'levantine-archaeology': [
    {
      id: 'arch-masada',
      claim: 'Masada’s archaeology confirms a First Jewish Revolt–period fortress with Roman siege works; Josephus’s mass-suicide narrative is only partly controllable by material remains.',
      detail:
        'Yadin excavations and later reassessments. Josephus remains the narrative spine; osteological and stratigraphic data constrain but do not fully verify every rhetorical claim.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'yadin-masada', citation: 'Yadin, Y. Masada. Random House / IEJ reports.', kind: 'survey' },
        { id: 'ben-tor', citation: 'Later reassessments in IEJ / Magness discussions of Masada.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'arch-bar-kokhba',
      claim: 'The Bar Kokhba revolt (132–135 CE) is archaeologically and papyrologically attested; its aftermath reshaped Judean demography and Jewish–Christian trajectories.',
      detail:
        'Cave of Letters papyri, coins, and Roman sources. Connection to “parting of the ways” historiography is interpretive with multiple models.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'yalon-bar', citation: 'Yadin, Y. Bar-Kokhba. Random House; Mildenberg coin studies.', kind: 'survey' },
        { id: 'eck', citation: 'Eck, W. on Roman suppression of Bar Kokhba (JRS / related).', kind: 'peer_reviewed' },
      ],
    },
  ],
  'early-christian-literature': [
    {
      id: 'ec-update-triggers',
      claim: 'This Record’s perpetual update triggers include: new major papyri/majuscule publications, INTF Liste changes, peer-reviewed dig reports, and material consensus shifts in historical Jesus research.',
      detail:
        'Operational meta-claim for Veritas maintenance — not an ancient historical event. Ensures decade-coherent revision without silent certainty inflation.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'intf-home', citation: 'INTF Münster — ongoing ECM / Liste.', url: 'https://www.uni-muenster.de/INTF/', kind: 'critical_edition' },
      ],
    },
  ],
  'modern-scholarship': [
    {
      id: 'mod-genetics-limits',
      claim: 'Ancient DNA of the Southern Levant informs regional demographic history; it cannot identify named New Testament individuals or prove specific genealogies in the Gospels.',
      detail:
        'Reiterates methodological boundary: population genetics ≠ onomastic identification. Any popular claim otherwise is speculative.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'agrinat2020b', citation: 'Agranat-Tamir et al., Cell 181 (2020).', kind: 'scientific' },
      ],
    },
    {
      id: 'mod-print-gutenberg',
      claim: 'Print culture from Gutenberg onward multiplied biblical text access and stabilized vernacular canons — a reception-historical fact separate from first-century origins.',
      detail:
        'Documented printing history. Does not alter paleographic dating of ancient manuscripts.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'needham-print', citation: 'Standard histories of the book / British Library Gutenberg documentation.', kind: 'survey' },
      ],
    },
  ],
}

/**
 * Interval 7 claim wave — deeper manuscript, early church, and method cards.
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

export const ROC_WAVE4_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-nucleosynthesis-li',
      claim: 'The cosmological lithium problem remains an open tension between standard BBN predictions for ⁷Li and many stellar abundance measurements.',
      detail:
        'Does not overturn BBN as a framework; marks a parameter/systematics research frontier. Reported as science status, not teleology.',
      tier: 'contested',
      proofVsConcept: 'science_model',
      sources: [
        { id: 'fields2011', citation: 'Fields, B.D. “The Primordial Lithium Problem.” Annu. Rev. Nucl. Part. Sci. 61 (2011).', kind: 'scientific' },
      ],
    },
  ],
  'ancient-near-east': [
    {
      id: 'ane-ugarit',
      claim: 'Ugaritic texts (Ras Shamra) supply Northwest Semitic mythic and ritual parallels used in comparative study of Hebrew Bible poetry and divine council language.',
      detail:
        'Literary-cultural comparison is well established; equation of specific biblical narratives with Ugaritic myths is interpretive and contested case-by-case.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'parker-ugarit', citation: 'Parker, S.B., ed. Ugaritic Narrative Poetry. SBL, 1997.', kind: 'critical_edition' },
        { id: 'smith-origins', citation: 'Smith, M.S. The Origins of Biblical Monotheism. Oxford UP, 2001.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'ane-black-obelisk',
      claim: 'The Black Obelisk of Shalmaneser III depicts Jehu (or a representative) of Israel paying tribute — an extra-biblical visual control for the Omride/Jehu period.',
      detail:
        'British Museum. Corroborates an Israelite royal name and Assyrian tributary politics; does not verify every Kings narrative detail.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'bm-obelisk', citation: 'British Museum — Black Obelisk of Shalmaneser III.', url: 'https://www.britishmuseum.org/', kind: 'museum' },
      ],
    },
  ],
  'second-temple': [
    {
      id: 'st-lxx-textual',
      claim: 'The Septuagint often preserves readings that differ from the medieval Masoretic Text; some align with Qumran Hebrew witnesses.',
      detail:
        'Textual pluriformity in the Second Temple period is a major result of modern criticism. Neither LXX nor MT is a simple “original.”',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'tov-lxx', citation: 'Tov, E. Textual Criticism of the Hebrew Bible (LXX chapters).', kind: 'critical_edition' },
        { id: 'jobes-silva', citation: 'Jobes, K.H. & Silva, M. Invitation to the Septuagint. 2nd ed. Baker, 2015.', kind: 'survey' },
      ],
    },
    {
      id: 'st-pharisees-josephus',
      claim: 'Josephus’s descriptions of Pharisees, Sadducees, and Essenes are primary but tendentious; social realities were more complex than three-school schemes.',
      detail:
        'Essential starting point; critical scholarship supplements with DSS, Gospels (as hostile sources), and rabbinic memory with caution.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'jos-bj2', citation: 'Josephus, Jewish War 2.8; Antiquities 18.1.', kind: 'primary' },
        { id: 'goodman2007', citation: 'Goodman, M. Rome and Jerusalem. Penguin/Allen Lane, 2007.', kind: 'survey' },
      ],
    },
  ],
  'historical-jesus': [
    {
      id: 'hj-kingdom-proclamation',
      claim: 'A core historical judgment across diverse scholars is that Jesus proclaimed God’s kingdom / reign as central to his public activity.',
      detail:
        'Multiply attested in Synoptic tradition. Exact content (apocalyptic vs. sapiential emphases) remains contested among reconstructions.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'sanders1985b', citation: 'Sanders, E.P. Jesus and Judaism. Fortress, 1985.', kind: 'peer_reviewed' },
        { id: 'wright-jvg', citation: 'Wright, N.T. Jesus and the Victory of God. Fortress, 1996.', kind: 'peer_reviewed' },
        { id: 'crossan1991b', citation: 'Crossan, J.D. The Historical Jesus. HarperSanFrancisco, 1991.', kind: 'survey' },
      ],
    },
    {
      id: 'hj-table-fellowship',
      claim: 'Traditions of Jesus’ open table fellowship with “sinners” and tax collectors are widely treated as historically plausible under embarrassment and multiple attestation.',
      detail:
        'Still a reconstruction from literary sources. Social meaning (boundary crossing vs. repentance-focused mission) is interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'meier-vol2-table', citation: 'Meier, J.P. A Marginal Jew, Vol. 2.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-temple-action',
      claim: 'An action by Jesus in the Temple (disruption of commerce / symbolic demonstration) is multiply attested; interpretation ranges from prophetic sign to failed revolt cue.',
      detail:
        'Mark 11 / parallels; John places a similar episode earlier. Historical core often affirmed; motive remains interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'sanders-temple', citation: 'Sanders, E.P. Jesus and Judaism (Temple chapter).', kind: 'peer_reviewed' },
        { id: 'evans-temple', citation: 'Evans, C.A. studies on Jesus and the Temple.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'hj-titles',
      claim: 'Titles applied to Jesus (Messiah/Christ, Son of Man, Son of God, Lord) have layered historical and literary-theological histories; none should be treated as a single unproblematic first-century label without analysis.',
      detail:
        'Son of Man debates (Danielic, idiomatic, titular) are classic contested ground. Post-Easter Christology is literary-theological development layered on earlier usage.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        { id: 'hahn-son', citation: 'Hurtado, L. Lord Jesus Christ. Eerdmans, 2003.', kind: 'peer_reviewed' },
        { id: 'collins-sonman', citation: 'Collins, A.Y. & Collins, J.J. King and Messiah as Son of God. Eerdmans, 2008.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'nt-textual-criticism': [
    {
      id: 'nt-ecm-method',
      claim: 'The Editio Critica Maior (ECM) and CBGM (Coherence-Based Genealogical Method) represent the current large-scale critical reconstruction program for the Greek NT at INTF.',
      detail:
        'Method is technical and still debated in details; NA text gradually aligns with ECM results book by book.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'mink-cbgm', citation: 'Mink, G. / Wasserman, T. on CBGM; INTF ECM introductions.', kind: 'peer_reviewed' },
        { id: 'intf-ecm', citation: 'INTF Editio Critica Maior project pages.', url: 'https://www.uni-muenster.de/INTF/', kind: 'critical_edition' },
      ],
    },
    {
      id: 'nt-western-text',
      claim: 'The so-called Western text (e.g., Codex Bezae in Acts) exhibits expansive and paraphrastic tendencies relative to Alexandrian witnesses.',
      detail:
        'Classification is traditional; modern stemmatics nuance “text-types.” Still a useful pedagogical map of major variation patterns.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'metzger-western', citation: 'Metzger & Ehrman, The Text of the New Testament (Western text).', kind: 'survey' },
      ],
    },
    {
      id: 'nt-homoeoteleuton',
      claim: 'Many NT variants arise from ordinary scribal mechanics (homoeoteleuton, dittography, orthography), not theological conspiracy.',
      detail:
        'Standard result of textual criticism. Does not deny that some variants have doctrinal interest; most do not.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'metzger-scribal', citation: 'Metzger, Textual Commentary / The Text of the New Testament.', kind: 'survey' },
      ],
    },
  ],
  'non-christian-attestation': [
    {
      id: 'nc-thallus-phlegon',
      claim: 'Later Christian authors cite Thallus and Phlegon regarding darkness at the crucifixion; the original pagan contexts are lost and the citations are mediated.',
      detail:
        'Not independent contemporary reports recoverable in full. Circumstantial at best; often overstated in apologetic literature.',
      tier: 'circumstantial',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'vanvoorst-thallus', citation: 'Van Voorst, R. Jesus Outside the New Testament (Thallus/Phlegon discussion).', kind: 'survey' },
      ],
    },
  ],
  'levantine-archaeology': [
    {
      id: 'arch-magdala',
      claim: 'Magdala excavations reveal a first-century Galilean town with a synagogue and harbor installations, enriching the social map of Jesus’ activity zone.',
      detail:
        'Does not prove specific Gospel episodes at Magdala; provides settlement context for Magdalene toponymy and Galilean Judaism.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'magdala-reports', citation: 'Magdala Project / IAA and academic field reports (various).', kind: 'survey' },
      ],
    },
    {
      id: 'arch-galilee-boat',
      claim: 'The “Jesus Boat” (first-century Galilee boat, discovered 1986) illustrates fishing technology on the lake in the Early Roman period.',
      detail:
        'Radiocarbon and construction analysis place it in the relevant era. Name is popular; no inscription ties it to Gospel figures.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'wachsmann', citation: 'Wachsmann, S. The Sea of Galilee Boat. Plenum / Texas A&M, 1995.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'early-christian-literature': [
    {
      id: 'ec-ignatius',
      claim: 'Ignatius of Antioch’s letters (early 2nd c., authenticity of middle recension majority) show monepiscopacy advocacy and high Christological language in transit to martyrdom.',
      detail:
        'Critical editions debate interpolations. Primary for early ecclesial structure debates, not for reconstructing Jesus’ lifetime.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'ehrman-ignatius', citation: 'Ehrman, B.D. Apostolic Fathers LCL (Ignatius).', kind: 'critical_edition' },
      ],
    },
    {
      id: 'ec-didache',
      claim: 'The Didache preserves an early Christian “two ways” ethic, baptismal and eucharistic instructions, and itinerant ministry rules — dating commonly late 1st / early 2nd c.',
      detail:
        'Exact date and locale contested. Important for practice history distinct from NT narrative Gospels.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        { id: 'niederwimmer', citation: 'Niederwimmer, K. The Didache. Hermeneia. Fortress, 1998.', kind: 'peer_reviewed' },
      ],
    },
  ],
  'modern-scholarship': [
    {
      id: 'mod-criteria-embarrassment',
      claim: 'The criterion of embarrassment is a heuristic, not a proof algorithm; it can be misapplied when later communities reframe “embarrassing” material.',
      detail:
        'Still used cautiously in historical Jesus research. Label: interpretive method.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        { id: 'theissen-winter2', citation: 'Theissen & Winter, The Quest for the Plausible Jesus.', kind: 'peer_reviewed' },
      ],
    },
    {
      id: 'mod-digital-dss',
      claim: 'The Leon Levy Dead Sea Scrolls Digital Library enables open inspection of high-resolution plate images for many Qumran manuscripts.',
      detail:
        'Changes access economics of textual criticism; does not by itself resolve dating debates.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        { id: 'iaa-dss2', citation: 'IAA Leon Levy DSS Digital Library.', url: 'https://www.deadseascrolls.org.il/', kind: 'museum' },
      ],
    },
  ],
}

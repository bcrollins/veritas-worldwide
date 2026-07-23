/**
 * Interval 11 claim wave — inscriptions, Pauline corpus, and reception hygiene.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
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

export const ROC_WAVE8_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-desi-bao',
      claim:
        'DESI and related Stage-IV BAO surveys are tightening late-universe expansion constraints and testing dark-energy equation-of-state models against ΛCDM.',
      detail:
        'Active research frontier. Report results as model constraints; do not import cosmological debates into theological conclusions.',
      tier: 'well_attested',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'desi-dr1',
          citation: 'DESI Collaboration data-release / BAO papers (2024–2025 series).',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-siloam-inscription',
      claim:
        'The Siloam Tunnel inscription (Jerusalem) is a primary Hebrew epigraphic witness associated with Hezekiah’s water system construction narrative.',
      detail:
        'Now in Istanbul Archaeology Museums. Corroborates a major engineering work; biblical attribution frames require historical argument beyond the inscription alone.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'siloam-text',
          citation: 'Siloam inscription editions in COS / Ahituv Echoes from the Past; Istanbul Archaeology Museums.',
          kind: 'museum',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-samaria-papyri',
      claim:
        'The Wadi Daliyeh (Samaria) papyri document mid-4th-century BCE legal/administrative life under late Persian / early Hellenistic rule in Samaria.',
      detail:
        'Important for Yehud/Samaria social history; not a direct Jesus-source. Contextualizes Second Temple political geography.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'gropp-daliyeh',
          citation: 'Gropp, D.M. Wadi Daliyeh II: The Samaria Papyri from Wadi Daliyeh. DJD 28. Clarendon, 2001.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-meal-practice',
      claim:
        'Shared meals / table fellowship appear as a distinctive social practice in Synoptic traditions and are widely treated as historically characteristic of Jesus’ movement.',
      detail:
        'Multiple attestation and social-historical plausibility support a core practice; exact theological meaning of each meal scene remains interpretive.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'crossan-meals',
          citation: 'Crossan, J.D. The Historical Jesus (open commensality discussions).',
          kind: 'survey',
        },
        {
          id: 'smith-symposium',
          citation: 'Smith, D.E. From Symposium to Eucharist. Fortress, 2003.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'hj-romans-execution',
      claim:
        'Crucifixion was a Roman capital punishment method used in Judea; archaeological and literary controls exist independent of the Gospels (e.g., Yehohanan heel bone; Josephus).',
      detail:
        'Establishes method availability and brutality; does not by itself prove any single victim’s identity without further evidence.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'zias-crucifixion',
          citation: 'Zias, J. & Sekeles, E. “The Crucified Man from Giv‘at ha-Mivtar.” IEJ 35 (1985).',
          kind: 'peer_reviewed',
        },
        {
          id: 'jos-crucifixion',
          citation: 'Josephus, Jewish War (multiple crucifixion references).',
          kind: 'primary',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-byzantine-priority',
      claim:
        'Byzantine-priority / majority-text theories remain minority positions in mainstream critical editions, which generally prefer early diverse witnesses over later numerical majority alone.',
      detail:
        'Debate is real and published; state the majority scholarly practice without ridiculing dissent. NA/UBS/ECM methods are transparent about external evidence weighting.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        {
          id: 'robinson-pierpont',
          citation: 'Robinson, M.A. & Pierpont, W.G. The New Testament in the Original Greek: Byzantine Textform.',
          kind: 'critical_edition',
        },
        {
          id: 'wallace-majority',
          citation: 'Wallace, D.B. essays on majority text; Metzger/Ehrman Text of the NT surveys.',
          kind: 'survey',
        },
      ],
    },
    {
      id: 'nt-lectionaries',
      claim:
        'Greek lectionary manuscripts form a large late witness class used in ECM/CBGM and traditional criticism for reception history more than for earliest text alone.',
      detail:
        'Valuable for liturgical transmission; chronological lateness usually reduces initial-text weight relative to early continuous-text papyri and majuscules.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'jordan-lectionaries',
          citation: 'Jordan, C.R.D. / INTF lectionary studies; ECM documentation.',
          kind: 'survey',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-talmud-dating',
      claim:
        'Rabbinic passages sometimes linked to Jesus (e.g., b. Sanhedrin traditions) are late, layered, and methodologically hazardous as first-century biography.',
      detail:
        'May preserve polemic memory of Christian claims centuries later. Do not treat as independent contemporary reportage of the historical Jesus.',
      tier: 'circumstantial',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'schafer-jesus',
          citation: 'Schäfer, P. Jesus in the Talmud. Princeton UP, 2007.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-herodium',
      claim:
        'Herodium is a major Herodian fortress-palace complex with extensive excavation; it anchors elite architecture of late Second Temple Judea.',
      detail:
        'Contextualizes Herodian material culture. Not a Gospel episode location for Jesus’ ministry core, but relevant political landscape.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'netzer-herodium',
          citation: 'Netzer, E. The Architecture of Herod / Herodium excavation reports.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-polycarp',
      claim:
        'Polycarp’s Letter to the Philippians (mid-2nd c.) cites or alludes to multiple NT writings and shows early reception of Pauline and Gospel traditions.',
      detail:
        'Useful for canon history and early citation practice. Not a first-generation Jesus source.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'polycarp-phil',
          citation: 'Polycarp, Philippians (Apostolic Fathers editions; Holmes).',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-jesus-seminar',
      claim:
        'The Jesus Seminar (1980s–2000s) popularized colored-bead voting on sayings authenticity; its methods and conclusions remain highly contested in the guild.',
      detail:
        'Historically influential public-facing project. Report as one method cluster, not as consensus baseline.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        {
          id: 'funk-five-gospels',
          citation: 'Funk, R.W., Hoover, R.W., et al. The Five Gospels. Macmillan, 1993.',
          kind: 'survey',
        },
        {
          id: 'johnson-real-jesus',
          citation: 'Johnson, L.T. The Real Jesus. HarperSanFrancisco, 1996 (critical response).',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],
}

/**
 * Interval 10 claim wave — ostraca, ossuaries, canon lists, and method cards.
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

export const ROC_WAVE7_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-dark-energy',
      claim:
        'Type Ia supernova surveys (1990s–present) established late-time accelerated expansion, modeled in ΛCDM as a cosmological-constant / dark-energy component.',
      detail:
        'Nobel-recognized observational result within the standard model frame. Physical nature of dark energy remains open; not a theological claim.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'riess1998',
          citation: 'Riess, A.G. et al. “Observational Evidence from Supernovae for an Accelerating Universe…” AJ 116 (1998).',
          kind: 'scientific',
        },
        {
          id: 'perlmutter1999',
          citation: 'Perlmutter, S. et al. “Measurements of Ω and Λ from 42 High-Redshift Supernovae.” ApJ 517 (1999).',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-lachish-letters',
      claim:
        'The Lachish ostraca (letters) are late-Iron-Age Hebrew administrative/military correspondence relevant to Judah’s final decades before the Babylonian destruction.',
      detail:
        'Primary epigraphic control for literacy and military logistics; they do not verify every prophetic narrative detail in Jeremiah/Kings.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'torczyner-lachish',
          citation: 'Torczyner (Tur-Sinai), H. et al. Lachish I: The Lachish Letters. Oxford, 1938; subsequent re-editions.',
          kind: 'critical_edition',
        },
        {
          id: 'ahituv-echoes',
          citation: 'Ahituv, S. Echoes from the Past: Hebrew and Cognate Inscriptions. Carta, 2008.',
          kind: 'survey',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-coinage-revolt',
      claim:
        'Jewish revolt coinage (First Revolt 66–70 CE; Bar Kokhba 132–135 CE) provides dated material propaganda and economic evidence independent of Christian texts.',
      detail:
        'Numismatic controls for political self-representation and chronology. Useful context for post-70 Judaism and Roman response; not Gospel narrative proof.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'meshorer-coins',
          citation: 'Meshorer, Y. A Treasury of Jewish Coins. Yad Ben-Zvi / Amphora, 2001.',
          kind: 'survey',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-q-hypothesis',
      claim:
        'The Two-Source Hypothesis posits Markan priority plus a sayings source “Q” behind Matthew and Luke; Q remains a scholarly reconstruction without a surviving manuscript.',
      detail:
        'Dominant but contested Synoptic solution (Farrer/Goulder and other alternatives exist). Report as model of literary dependence, not as a discovered papyrus.',
      tier: 'contested',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'kloppenborg-q',
          citation: 'Kloppenborg, J.S. Excavating Q. Fortress, 2000.',
          kind: 'peer_reviewed',
        },
        {
          id: 'goodacre-case',
          citation: 'Goodacre, M. The Case Against Q. Trinity Press International, 2002.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'hj-criterion-coherence',
      claim:
        'Coherence criteria ask whether a proposed saying/deed fits a reconstructed core portrait of Jesus; the method is circular if the core is itself unstable.',
      detail:
        'Method hygiene: coherence is a secondary check after independent controls, not a free-standing proof engine.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'porter-criteria',
          citation: 'Porter, S.E. The Criteria for Authenticity in Historical-Jesus Research. Sheffield/T&T Clark, 2000.',
          kind: 'survey',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-comma-johanneum',
      claim:
        'The Comma Johanneum (1 John 5:7–8 Trinitarian expansion in some later Latin/Textus Receptus traditions) is absent from the earliest Greek manuscript tradition and is treated as secondary in modern critical editions.',
      detail:
        'Classic illustration that “printed tradition” ≠ “earliest recoverable text.” Theological use history is reception, not initial-text status.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'metzger-comma',
          citation: 'Metzger, B.M. A Textual Commentary on the Greek New Testament (1 John 5:7–8).',
          kind: 'critical_edition',
        },
        {
          id: 'na28-1john',
          citation: 'Nestle-Aland 28 apparatus on 1 John 5:7–8.',
          kind: 'critical_edition',
        },
      ],
    },
    {
      id: 'nt-western-text',
      claim:
        'The so-called Western text (e.g., Codex Bezae in Acts) often presents freer, paraphrastic readings that complicate simple Alexandrian/Byzantine dichotomies.',
      detail:
        'Text-type labels are heuristic. CBGM and ECM work increasingly model local genealogical relations rather than rigid geographic families.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'parker-bezae',
          citation: 'Parker, D.C. Codex Bezae: An Early Christian Manuscript and its Text. Cambridge UP, 1992.',
          kind: 'peer_reviewed',
        },
        {
          id: 'ehrman-holmes',
          citation: 'Ehrman, B.D. & Holmes, M.W., eds. The Text of the New Testament in Contemporary Research. 2nd ed. Brill, 2013.',
          kind: 'survey',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-martial-juvenes',
      claim:
        'No contemporary Roman historian from Jesus’ lifetime mentions him; the earliest non-Christian literary controls (Josephus, Tacitus, Pliny) are decades later.',
      detail:
        'Absence of contemporary Roman notice is expected for a provincial preacher and is not by itself proof of non-existence. Chronological distance must be stated honestly.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'vanvoorst-silence',
          citation: 'Van Voorst, R.E. Jesus Outside the New Testament (discussion of silence and later witnesses).',
          kind: 'survey',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-ossuaries-practice',
      claim:
        'Secondary burial in limestone ossuaries is archaeologically well attested in late Second Temple Jerusalem and environs (roughly late 1st c. BCE–70 CE).',
      detail:
        'Contextualizes burial practices for crucifixion-victim and family-tomb discussions. Individual name-bearing ossuaries require authentication case-by-case (forgery risk).',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'rahmani-ossuaries',
          citation: 'Rahmani, L.Y. A Catalogue of Jewish Ossuaries. Israel Antiquities Authority, 1994.',
          kind: 'museum',
        },
        {
          id: 'hachlili-burial',
          citation: 'Hachlili, R. Jewish Funerary Customs, Practices and Rites in the Second Temple Period. Brill, 2005.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-origen-hexapla',
      claim:
        'Origen’s Hexapla (3rd c.) arranged Hebrew and Greek OT columns for comparative textual work — early Christian engagement with pluriform scriptural text.',
      detail:
        'Mostly lost; reconstructed from quotations and catenae. Important for history of Christian biblical scholarship, not for first-century Jesus biography directly.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'salvesen-hexapla',
          citation: 'Salvesen, A. / Norton, G. Hexapla studies; Field’s Origenis Hexaplorum fragments.',
          kind: 'critical_edition',
        },
      ],
    },
    {
      id: 'ec-eusebius-he',
      claim:
        'Eusebius’s Ecclesiastical History (early 4th c.) is a foundational but tendentious narrative source for earlier Christian writers, martyrdoms, and canon discussions.',
      detail:
        'Primary for what Eusebius wanted preserved; critical use required for 2nd–3rd century reconstruction. Not a contemporary of Jesus.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'eusebius-he',
          citation: 'Eusebius, Historia Ecclesiastica (critical editions; ET Lake/Oulton Loeb).',
          kind: 'primary',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-social-memory',
      claim:
        'Social memory approaches treat Gospel traditions as communal remembering under social constraints rather than pure invention or pure stenography.',
      detail:
        'Influential method in 21st-century HJ studies (e.g., Keith, Le Donne, Rodríguez). Complements and sometimes revises criterion-based authenticity grids.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'keith-memory',
          citation: 'Keith, C. Jesus’ Literacy / memory essays; Le Donne, A. The Historiographical Jesus.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],
}

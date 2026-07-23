/**
 * Interval 9 claim wave — ECM apparatus depth, non-Christian controls,
 * archaeology hygiene, and method cards.
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

export const ROC_WAVE6_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-bao',
      claim:
        'Baryon acoustic oscillations (BAO) measured in large-scale galaxy surveys provide an independent standard-ruler constraint on the expansion history within ΛCDM.',
      detail:
        'BAO is a late-universe geometric probe complementary to the CMB. It constrains distance–redshift relations; it is not a theological argument.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'eisenstein2005',
          citation:
            'Eisenstein, D.J. et al. “Detection of the Baryon Acoustic Peak in the Large-Scale Correlation Function of SDSS Luminous Red Galaxies.” ApJ 633 (2005).',
          kind: 'scientific',
        },
        {
          id: 'alam2021',
          citation: 'Alam, S. et al. (eBOSS Collaboration). “Completed SDSS-IV extended Baryon Oscillation Spectroscopic Survey…” Phys. Rev. D 103 (2021).',
          kind: 'scientific',
        },
      ],
    },
    {
      id: 'cosmo-hubble-tension',
      claim:
        'The Hubble tension denotes a statistically significant discrepancy between early-universe (CMB-inferred) and some late-universe local H₀ measurements.',
      detail:
        'Research frontier within expansion cosmology (systematics vs new physics). Does not negate metric expansion as a verified framework fact.',
      tier: 'contested',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'verde2019',
          citation: 'Verde, L., Treu, T., Riess, A.G. “Tensions between the early and late Universe.” Nature Astronomy 3 (2019).',
          kind: 'scientific',
        },
      ],
      confidenceNote: 'Existence of tension is well reported; resolution path remains open.',
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-sennacherib',
      claim:
        'Sennacherib’s annals (Taylor Prism / related prisms) describe the 701 BCE campaign against Judah and Hezekiah’s tribute without claiming Jerusalem’s capture.',
      detail:
        'Assyrian royal inscriptions are primary political propaganda. They control the campaign’s existence and outcome framing; they do not independently verify every Kings narrative detail.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'taylor-prism',
          citation: 'British Museum — Taylor Prism (Sennacherib); COS / ANET translations of Sennacherib annals.',
          url: 'https://www.britishmuseum.org/',
          kind: 'museum',
        },
        {
          id: 'grabbe-hezekiah',
          citation: 'Grabbe, L.L. (ed.). Like a Bird in a Cage: The Invasion of Sennacherib in 701 BCE. Sheffield, 2003.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'ane-cos-corpus',
      claim:
        'The Context of Scripture (COS) and ANET anthologies assemble primary ANE texts used as comparative controls for Hebrew Bible literature and historiography.',
      detail:
        'Anthology access is methodological infrastructure. Parallel motifs require case-by-case literary and historical analysis; similarity ≠ dependence by default.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'cos-hallo',
          citation: 'Hallo, W.W. & Younger, K.L., eds. The Context of Scripture. 3 vols. Brill.',
          kind: 'critical_edition',
        },
        {
          id: 'anet-pritchard',
          citation: 'Pritchard, J.B., ed. Ancient Near Eastern Texts Relating to the Old Testament. 3rd ed. Princeton UP, 1969.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-herod-temple',
      claim:
        'Herod’s expansion of the Jerusalem Temple Mount is archaeologically and literarily documented (Josephus; Western Wall / Temple Mount retaining architecture).',
      detail:
        'Physical scale of the Herodian platform is material fact. Specific Gospel episodes set in the courts remain literary-historical reconstructions layered on that setting.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'jos-war-temple',
          citation: 'Josephus, Jewish War 5; Antiquities 15 (Temple building).',
          kind: 'primary',
        },
        {
          id: 'netzer-herod',
          citation: 'Netzer, E. The Architecture of Herod, the Great Builder. Mohr Siebeck, 2006.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'st-synagogue-origins',
      claim:
        'The institutional origins and pre-70 function of “synagogues” remain debated; archaeological assembly buildings and literary references do not form a single simple type.',
      detail:
        'Relevant to Gospel synagogue scenes as social setting. Avoid projecting later rabbinic synagogue liturgy wholesale onto early-first-century Galilee.',
      tier: 'contested',
      proofVsConcept: 'debate',
      sources: [
        {
          id: 'runesson-synagogue',
          citation: 'Runesson, A., Binder, D.D., Olsson, B. The Ancient Synagogue from its Origins to 200 C.E. Brill, 2008.',
          kind: 'survey',
        },
        {
          id: 'levine-synagogue',
          citation: 'Levine, L.I. The Ancient Synagogue. 2nd ed. Yale UP, 2005.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-criteria-limits',
      claim:
        'Classical authenticity criteria (multiple attestation, embarrassment, dissimilarity) are heuristic tools with known biases; they do not yield laboratory-grade “proof” of individual sayings.',
      detail:
        'Contemporary method literature stresses memory, social context, and cumulative plausibility over atomistic criterion checklists. Criteria remain pedagogically useful when limitations are stated.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'keith-le-donn',
          citation: 'Keith, C. & Le Donne, A., eds. Jesus, Criteria, and the Demise of Authenticity. T&T Clark, 2012.',
          kind: 'peer_reviewed',
        },
        {
          id: 'theissen-winter',
          citation: 'Theissen, G. & Winter, D. The Quest for the Plausible Jesus. WJK, 2002.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'hj-john-baptist-movement',
      claim:
        'John the Baptist is multiply attested (Josephus Ant. 18; Synoptics; Johannine tradition) as an independent purification/repentance preacher executed by Herod Antipas.',
      detail:
        'Josephus’s account is a major non-Gospel control. Jesus’ relationship to John’s movement is a standard historical reconstruction node (baptism; continuity/discontinuity).',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'jos-ant18-john',
          citation: 'Josephus, Antiquities 18.116–119 (John the Baptist).',
          kind: 'primary',
        },
        {
          id: 'meier-vol2-john',
          citation: 'Meier, J.P. A Marginal Jew, Vol. 2 (John the Baptist chapters). Doubleday, 1994.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'hj-family-rejection',
      claim:
        'Traditions of family misunderstanding or tension (Mark 3; John 7) are often cited under the criterion of embarrassment as unlikely free invention by later church idealization.',
      detail:
        'Heuristic only. Embarrassment criteria are contested and circular if over-applied; report as method practice, not automatic historicity certificates.',
      tier: 'circumstantial',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'mark3-family',
          citation: 'Mark 3:21, 31–35; John 7:5 (synoptic/Johannine comparison).',
          kind: 'primary',
        },
        {
          id: 'meier-vol1-family',
          citation: 'Meier, J.P. A Marginal Jew, Vol. 1 (family / criteria discussions).',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-ecm-method',
      claim:
        'The Editio Critica Maior (ECM) and the Coherence-Based Genealogical Method (CBGM) model manuscript relationships as a guided stemmatic network rather than a simple bipartite Alexandrian/Byzantine tree.',
      detail:
        'State-of-the-art critical-edition method for portions of the NT (Acts, Catholic Epistles, ongoing Gospels work at INTF). Readers should not equate “majority text” with “original” without argument.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'ecm-intro',
          citation: 'Institute for New Testament Textual Research (INTF) — Editio Critica Maior documentation; Mink, G. CBGM literature.',
          url: 'https://www.uni-muenster.de/INTF/',
          kind: 'critical_edition',
        },
        {
          id: 'wasserman-gurry',
          citation: 'Wasserman, T. & Gurry, P.J. A New Approach to Textual Criticism: An Introduction to the CBGM. SBL, 2017.',
          kind: 'survey',
        },
      ],
    },
    {
      id: 'nt-p66-p75',
      claim:
        'Bodmer papyri P66 (John) and P75 (Luke/John) are major early substantial witnesses typically dated to the late 2nd / early 3rd century and foundational for early Alexandrian text studies.',
      detail:
        'Paleographic dates are ranges. P75’s affinity with Codex Vaticanus is a classic result; it does not freeze the entire NT text to a single form.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'intf-p66',
          citation: 'INTF Liste P66, P75; Martin / Kasser Bodmer editions; digital NT.VMR.',
          url: 'https://ntvmr.uni-muenster.de/',
          kind: 'critical_edition',
        },
      ],
    },
    {
      id: 'nt-pericope-adulterae',
      claim:
        'The pericope adulterae (John 7:53–8:11) is widely judged a later insertion on strong external manuscript grounds, though the story circulated early in the Latin and some Greek traditions.',
      detail:
        'Textbook example of textual criticism distinguishing early tradition history from initial text of John. Liturgical and ethical afterlife is separate from authorial status.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'metzger-tc',
          citation: 'Metzger, B.M. A Textual Commentary on the Greek New Testament. 2nd ed. UBS.',
          kind: 'critical_edition',
        },
        {
          id: 'knust-wasserman',
          citation: 'Knust, J. & Wasserman, T. To Cast the First Stone. Princeton UP, 2019.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'nt-ending-mark',
      claim:
        'The longer ending of Mark (16:9–20) is absent from the earliest major Greek witnesses (ℵ B) and is treated in critical editions as secondary, while shorter alternative endings also exist.',
      detail:
        'Classic apparatus case. Theological use of the longer ending is a reception-history question distinct from initial-text reconstruction.',
      tier: 'well_attested',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'na28-mark16',
          citation: 'Nestle-Aland 28 apparatus on Mark 16; Metzger Textual Commentary.',
          kind: 'critical_edition',
        },
        {
          id: 'kelhoffer-mark',
          citation: 'Kelhoffer, J.A. Miracle and Mission: The Authentication of Missionaries and Their Message in the Longer Ending of Mark. Mohr Siebeck, 2000.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-thallus-phlegon',
      claim:
        'Later Christian authors cite Thallus and Phlegon regarding a darkness or eclipse around the time of the crucifixion; the original works are lost and the citations are mediated.',
      detail:
        'At best second-hand and chronologically contested. Do not treat as independent proof-grade astronomical confirmation of Gospel darkness motifs.',
      tier: 'circumstantial',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'africanus-thallus',
          citation: 'Julius Africanus via Syncellus (fragments); discussion in Van Voorst, Jesus Outside the New Testament.',
          kind: 'survey',
        },
        {
          id: 'vanvoorst2000',
          citation: 'Van Voorst, R.E. Jesus Outside the New Testament. Eerdmans, 2000.',
          kind: 'survey',
        },
      ],
    },
    {
      id: 'nc-celsus',
      claim:
        'Celsus (2nd c.), preserved mainly via Origen’s Contra Celsum, is an early pagan critic who treats Jesus as a historical magician/charlatan figure rather than a mythic non-entity.',
      detail:
        'Hostile attestation of Christian claims and of a historical founder figure as opponents understood him. Filtered through Origen’s rebuttal structure.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'origen-celsum',
          citation: 'Origen, Contra Celsum (critical editions; ET Chadwick).',
          kind: 'primary',
        },
        {
          id: 'hoffmann-celsus',
          citation: 'Hoffmann, R.J. Celsus, On the True Doctrine (reconstruction/ET). Oxford UP, 1987.',
          kind: 'survey',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-caesarea-maritima',
      claim:
        'Caesarea Maritima — Herodian harbor city and later Roman provincial capital — is extensively excavated and contextualizes prefectural administration relevant to Pilate traditions.',
      detail:
        'The Pilate stone was found here. Urban archaeology documents Roman Judea’s administrative geography; it does not narrate Gospel trials by itself.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'holum-caesarea',
          citation: 'Holum, K.G. et al. Caesarea papers / JECM publications on Caesarea Maritima.',
          kind: 'survey',
        },
        {
          id: 'pilate-inscription',
          citation: 'Pontius Pilate inscription (Caesarea) — Israel Museum / excavation reports.',
          kind: 'museum',
        },
      ],
    },
    {
      id: 'arch-quran-not-control',
      claim:
        'The Qur’an (7th c. CE) is a late secondary witness for first-century Palestinian history and is not used here as a primary control for the historical Jesus.',
      detail:
        'Method hygiene card: late religious literature may preserve traditions of interest for comparative religion but fails chronological proximity criteria for HJ reconstruction.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'reynolds-quran',
          citation: 'Reynolds, G.S. The Qur’an and Its Biblical Subtext. Routledge, 2010 (comparative method; not HJ primary source).',
          kind: 'survey',
        },
      ],
    },
    {
      id: 'arch-destruction-70',
      claim:
        'The Roman destruction of Jerusalem and the Temple in 70 CE is multiply attested (Josephus; archaeological burn/destruction layers; Roman triumph iconography such as the Arch of Titus spoils relief).',
      detail:
        'Major chronological and social rupture for Judaism and the early Jesus movement. Material and literary evidence converge on the event’s historicity.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'jos-war6',
          citation: 'Josephus, Jewish War 6–7.',
          kind: 'primary',
        },
        {
          id: 'arch-titus',
          citation: 'Arch of Titus (Rome) spoils relief; Temple Mount / Upper City destruction archaeology surveys.',
          kind: 'museum',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-1clement',
      claim:
        '1 Clement (usually dated late 1st c.) attests early Roman Christian leadership correspondence and cites Jesus traditions and Pauline letters as authoritative.',
      detail:
        'Important for early reception and church order. Not a Gospel; useful for dating a developing Christian literary network.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'clement-loeb',
          citation: '1 Clement in Apostolic Fathers (Loeb / Holmes editions).',
          kind: 'critical_edition',
        },
        {
          id: 'gregory-clement',
          citation: 'Gregory, A.F. “1 Clement” in The Writings of the Apostolic Fathers (ed. Foster).',
          kind: 'survey',
        },
      ],
    },
    {
      id: 'ec-justin-apology',
      claim:
        'Justin Martyr’s First Apology (mid-2nd c.) describes Christian worship, “memoirs of the apostles,” and defends Christians before a Roman audience.',
      detail:
        'Primary window on mid-2nd-century Christian self-presentation and Gospel usage. Apologetic genre shapes selection and framing.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'justin-apology',
          citation: 'Justin Martyr, First Apology (critical editions; ET Barnard / Falls).',
          kind: 'primary',
        },
      ],
    },
    {
      id: 'ec-gospel-harmony',
      claim:
        'Tatian’s Diatessaron (late 2nd c.) harmonized the four Gospels into a single narrative widely used in Syriac Christianity — evidence of early fourfold Gospel prestige and of textual fluidity in use.',
      detail:
        'Harmony practice shows both high status of the four and willingness to restructure them. Reconstruction of Tatian’s text is complex (secondary witnesses).',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'petersen-diatessaron',
          citation: 'Petersen, W.L. Tatian’s Diatessaron: Its Creation, Dissemination, Significance, and History in Scholarship. Brill, 1994.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-na28-ubs5',
      claim:
        'Nestle-Aland 28 and UBS5 are the standard working critical Greek NT editions for most academic exegesis; their apparatus documents selected variants, not every known reading.',
      detail:
        'Edition status is scholarly infrastructure fact. Ongoing ECM work will revise portions; “the critical text” is a living scholarly construct.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'na28',
          citation: 'Nestle-Aland, Novum Testamentum Graece, 28th ed. Deutsche Bibelgesellschaft.',
          kind: 'critical_edition',
        },
        {
          id: 'ubs5',
          citation: 'United Bible Societies, The Greek New Testament, 5th ed.',
          kind: 'critical_edition',
        },
      ],
    },
    {
      id: 'mod-mythicism-fringe',
      claim:
        'Full mythicism (Jesus of Nazareth as entirely non-historical) remains a fringe position in mainstream historical scholarship of Second Temple Judaism and early Christianity.',
      detail:
        'Fringe ≠ forbidden: arguments are published and answered (e.g., Ehrman; Casey). Consensus existence of a historical Jesus is a historiographical status report, not a creed.',
      tier: 'well_attested',
      proofVsConcept: 'debate',
      sources: [
        {
          id: 'ehrman-exist',
          citation: 'Ehrman, B.D. Did Jesus Exist? HarperOne, 2012.',
          kind: 'survey',
        },
        {
          id: 'casey-jesus',
          citation: 'Casey, M. Jesus: Evidence and Argument or Mythicist Myths? Bloomsbury, 2014.',
          kind: 'peer_reviewed',
        },
      ],
    },
    {
      id: 'mod-open-data-ethics',
      claim:
        'Modern digital manuscript projects raise access, conservation, provenance, and citation-ethics issues distinct from the content of any single reading.',
      detail:
        'Researcher hygiene: prefer stable identifiers, museum/INTF catalogue numbers, and licensed images. Open access improves inspection; it does not settle interpretive disputes.',
      tier: 'interpretive',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'ntvmr-ethics',
          citation: 'INTF NT.VMR policies; IAA DSS digital library terms; British Library manuscript reuse guidance.',
          kind: 'museum',
        },
      ],
    },
  ],
}

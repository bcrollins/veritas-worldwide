/**
 * Interval 13 claim wave — Qumran sect, Pauline corpus integrity, and method cards.
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

export const ROC_WAVE10_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [
    {
      id: 'cosmo-neutrino-bbn',
      claim:
        'Standard BBN and CMB analyses constrain the effective number of neutrino species (N_eff) near the Standard Model expectation.',
      detail:
        'Parameter constraint within ΛCDM + particle physics. Not a theological statement.',
      tier: 'verified',
      proofVsConcept: 'science_model',
      sources: [
        {
          id: 'planck-neff',
          citation: 'Planck Collaboration cosmological parameters papers (N_eff constraints).',
          kind: 'scientific',
        },
      ],
    },
  ],

  'ancient-near-east': [
    {
      id: 'ane-ketef-hinnom',
      claim:
        'Ketef Hinnom silver scrolls contain early Hebrew priestly blessing text (Numbers 6) — among the oldest biblical text witnesses in metal.',
      detail:
        'Primary epigraphy for late Iron Age / early Second Temple textual tradition. Does not freeze the entire Torah to that date.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'barkay-ketef',
          citation: 'Barkay, G. et al. Ketef Hinnom publications; Israel Museum displays.',
          kind: 'museum',
        },
      ],
    },
  ],

  'second-temple': [
    {
      id: 'st-war-scroll',
      claim:
        'The War Scroll (1QM) and related DSS texts depict eschatological battle ideology within a Second Temple Jewish sectarian milieu.',
      detail:
        'Primary for diversity of Jewish apocalyptic imagination. Comparative for early Christian eschatology without equating texts.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: '1qm-edition',
          citation: '1QM editions in DJD / PTSDSSP; Vermes DSS translations.',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'historical-jesus': [
    {
      id: 'hj-jewishness-consensus',
      claim:
        'Mainstream historical Jesus research treats Jesus as a first-century Jew operating within Second Temple Judaism, not as a later Gentile construct.',
      detail:
        'Near-universal among critical scholars across confessional lines. Specific reconstructions (apocalyptic prophet vs. sage) still diverge.',
      tier: 'well_attested',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'sanders-jesus-judaism',
          citation: 'Sanders, E.P. Jesus and Judaism. Fortress, 1985.',
          kind: 'peer_reviewed',
        },
        {
          id: 'vermes-jew',
          citation: 'Vermes, G. Jesus the Jew. Fortress / SCM editions.',
          kind: 'survey',
        },
      ],
    },
  ],

  'nt-textual-criticism': [
    {
      id: 'nt-scribal-habits',
      claim:
        'Codicology and singular-reading studies document mechanical scribal habits (leaps, dittography, harmonization) that explain many variants without theological motive.',
      detail:
        'Method hygiene: not every variant is “corruption.” Mechanical and intentional changes both exist and must be argued case-by-case.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'royse-scribal',
          citation: 'Royse, J.R. Scribal Habits in Early Greek New Testament Papyri. Brill, 2008.',
          kind: 'peer_reviewed',
        },
        {
          id: 'metzger-scribal',
          citation: 'Metzger, B.M. & Ehrman, B.D. The Text of the New Testament (scribal habits chapters).',
          kind: 'survey',
        },
      ],
    },
  ],

  'non-christian-attestation': [
    {
      id: 'nc-pliny-christians',
      claim:
        'Pliny the Younger’s letter to Trajan (Ep. 10.96) describes early 2nd-century Bithynian Christians worshiping Christ “as a god” and legal policy toward them.',
      detail:
        'Primary Roman administrative evidence for Christian communities and cultic language. Not a biography of Jesus; confirms name and worship practices decades later.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'pliny-ep1096',
          citation: 'Pliny, Epistles 10.96–97 (critical Latin editions; Loeb).',
          kind: 'primary',
        },
      ],
    },
  ],

  'levantine-archaeology': [
    {
      id: 'arch-jerusalem-destruction-layers',
      claim:
        'Destruction layers and burn evidence in Jerusalem’s Upper City and related loci align with the 70 CE Roman destruction horizon.',
      detail:
        'Archaeological confirmation of a major historical rupture. Site-by-site interpretation requires careful stratigraphy.',
      tier: 'verified',
      proofVsConcept: 'proof_grade_data',
      sources: [
        {
          id: 'geva-jerusalem',
          citation: 'Geva, H. / Avigad, N. Jewish Quarter excavations; Josephus War correlation surveys.',
          kind: 'survey',
        },
      ],
    },
  ],

  'early-christian-literature': [
    {
      id: 'ec-shepherd-hermas',
      claim:
        'The Shepherd of Hermas (2nd c.) was widely read and sometimes treated as scripture in some churches, illustrating fluid early canons.',
      detail:
        'Reception history for Christian literature. Not a Gospel; useful for discipline and repentance themes in Roman Christianity.',
      tier: 'well_attested',
      proofVsConcept: 'attested_report',
      sources: [
        {
          id: 'hermas-edition',
          citation: 'Shepherd of Hermas in Apostolic Fathers editions (Holmes / Loeb).',
          kind: 'critical_edition',
        },
      ],
    },
  ],

  'modern-scholarship': [
    {
      id: 'mod-living-text',
      claim:
        '“Living text” models (e.g., Parker) emphasize early Christian textual fluidity and community use rather than a single frozen original always recoverable.',
      detail:
        'Influential method frame alongside traditional initial-text reconstruction. Not a claim that “anything goes” — still disciplined TC work.',
      tier: 'interpretive',
      proofVsConcept: 'reconstruction',
      sources: [
        {
          id: 'parker-living',
          citation: 'Parker, D.C. The Living Text of the Gospels. Cambridge UP, 1997.',
          kind: 'peer_reviewed',
        },
      ],
    },
  ],
}

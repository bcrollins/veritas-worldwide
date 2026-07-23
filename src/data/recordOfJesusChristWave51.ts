/**
 * Interval 54 claim wave — wave51.
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 */
import type { ScholarlyEvidenceTier } from './evidenceTiers'
interface RocSource { id: string; citation: string; url?: string; kind: 'primary' | 'peer_reviewed' | 'critical_edition' | 'museum' | 'survey' | 'scientific' }
interface RocClaim { id: string; claim: string; detail: string; tier: ScholarlyEvidenceTier; proofVsConcept: 'proof_grade_data' | 'attested_report' | 'reconstruction' | 'debate' | 'tradition' | 'science_model'; sources: RocSource[]; confidenceNote?: string }
export const ROC_WAVE51_CLAIMS: Record<string, RocClaim[]> = {
  cosmology: [{
    id: 'cosmo-age-of-universe',
    claim: 'Standard ΛCDM fits to CMB data yield a universe age of approximately 13.8 billion years, with model-dependent uncertainties at the percent level.',
    detail: 'Parameter output of the science_model; alternative cosmologies shift the figure within their assumptions.',
    tier: 'verified',
    proofVsConcept: 'science_model',
    sources: [{ id: 'planck-age', citation: 'Planck Collaboration 2018 baseline age; subsequent combined analyses.', kind: 'scientific' }],
  }],
  'ancient-near-east': [{
    id: 'ane-cyrus-cylinder-policy-limits',
    claim: 'The Cyrus Cylinder’s temple-restoration and return language is Achaemenid royal ideology; it is not a verbatim decree matching Ezra’s wording line-for-line.',
    detail: 'Method hygiene against naive proof-texting of biblical return narratives from the Cylinder alone.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'cyrus-cylinder-limits', citation: 'British Museum Cyrus Cylinder editions; Kuhrt / Grabbe Persian period studies.', kind: 'museum' }],
  }],
  'second-temple': [{
    id: 'st-philo-migration-abraham',
    claim: 'Philo’s treatises on Abraham (e.g., On the Migration of Abraham) exemplify allegorical Torah exegesis for a Hellenistic Jewish audience in the early first century.',
    detail: 'Literary-philosophical context; not HJ primary data.',
    tier: 'well_attested',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'philo-migr', citation: 'Philo, De Migratione Abrahami (Loeb); Runia Philo surveys.', kind: 'primary' }],
  }],
  'historical-jesus': [{
    id: 'hj-sabbath-controversies',
    claim: 'Sabbath controversy stories (healings, grain-plucking debates) are multiply present in the Synoptics and are widely used in reconstructions of Jesus’ Torah practice disputes.',
    detail: 'Historical core of conflict-over-practice is plausible; exact legal positions and wording remain reconstructed.',
    tier: 'well_attested',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'sanders-sabbath', citation: 'Sanders, Jewish Law from Jesus to the Mishnah; Doering Sabbath studies; Synoptic sabbath pericopes.', kind: 'peer_reviewed' }],
  }],
  'nt-textual-criticism': [{
    id: 'nt-ecm-acts-status',
    claim: 'The Editio Critica Maior for Acts provides the fullest modern apparatus and CBGM-informed initial text for Acts, refining older NA readings in selected units.',
    detail: 'Edition status; Western text issues in Acts remain a classic special problem.',
    tier: 'verified',
    proofVsConcept: 'proof_grade_data',
    sources: [{ id: 'ecm-acts', citation: 'INTF Editio Critica Maior: Acts; Mink CBGM; Parker on Acts text.', kind: 'critical_edition' }],
  }],
  'non-christian-attestation': [{
    id: 'nc-mara-serapion-genre',
    claim: 'The Mara bar Serapion letter is a Syriac consolatory/philosophical letter whose “wise king” line is genre-constrained and chronologically uncertain — weak HJ control at best.',
    detail: 'Complements earlier Mara cards with genre emphasis; do not upgrade to VERIFIED Jesus biography.',
    tier: 'circumstantial',
    proofVsConcept: 'attested_report',
    sources: [{ id: 'vanvoorst-mara-genre', citation: 'Van Voorst, Jesus Outside the New Testament; Cureton/Syriac letter literature.', kind: 'survey' }],
  }],
  'levantine-archaeology': [{
    id: 'arch-qumran-settlement-phases',
    claim: 'Qumran settlement archaeology is periodized into occupation phases (commonly Ib/II schemes with revisions) that frame when the site could have hosted a manuscript-using community.',
    detail: 'Stratigraphic debate continues; manuscript contents remain primary regardless of exact phase labels.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'magness-phases', citation: 'Magness, The Archaeology of Qumran; de Vaux field reports; subsequent revisions.', kind: 'peer_reviewed' }],
  }],
  'early-christian-literature': [{
    id: 'ec-barnabas-two-ways',
    claim: 'The Epistle of Barnabas includes a Two Ways ethical section related to the Didache’s Two Ways tradition — evidence of shared early Christian moral catechesis forms.',
    detail: 'Literary relationship and direction of dependence remain debated.',
    tier: 'well_attested',
    proofVsConcept: 'debate',
    sources: [{ id: 'barnabas-twoways', citation: 'Epistle of Barnabas (Holmes); Niederwimmer Didache; Two Ways tractate comparisons.', kind: 'critical_edition' }],
  }],
  'modern-scholarship': [{
    id: 'mod-meier-criteria-catalogue',
    claim: 'John P. Meier’s multi-volume A Marginal Jew catalogues and applies a suite of authenticity criteria with graded judgments — a reference standard even for scholars who reject criteria-based method.',
    detail: 'Historiographic method landmark; memory approaches critique foundations while still citing Meier’s results map.',
    tier: 'interpretive',
    proofVsConcept: 'reconstruction',
    sources: [{ id: 'meier-catalogue', citation: 'Meier, A Marginal Jew (5 vols.); Keith/Le Donne on criteria demise.', kind: 'survey' }],
  }],
}

export const SOURCE_HIERARCHY_ORDER = [
  'governmentLegal',
  'institutional',
  'investigativeJournalism',
  'academic',
  'secondary',
] as const

export type SourceHierarchy = (typeof SOURCE_HIERARCHY_ORDER)[number]

type SourceLike = {
  text?: string | null
  url?: string | null
  hierarchy?: string | null
}

const GOV_OR_LEGAL_PATTERN =
  /(congress|senate|house of representatives|congressional record|court|supreme court|district court|appeals court|indictment|complaint|lawsuit|executive order|federal register|national archives|archives\.gov|presidential library|declassified|foia|freedom of information act|gao|government accountability office|congressional research service|crs report|department of justice|justice department|attorney general|treasury|state department|white house|fbi vault|cia reading room|cia\.gov\/readingroom|hearing transcript|treaty|statute|public law|office of inspector general|oig|icj|international court of justice|u\.s\. code|uscourts\.gov)/i

const INSTITUTIONAL_PATTERN =
  /(annual report|10-k|10-q|8-k|proxy statement|investor relations|earnings report|shareholder letter|form 990|charity filing|federal reserve|federalreserve\.gov|frbservices|bank for international settlements|bis\.org|international monetary fund|imf|world bank|un ocha|ochaopt|reliefweb|who\.int|world health organization|unrwa|unicef|united nations|unodc|ohchr|organization for economic cooperation and development|oecd|aipac|corporate filing|institutional report|ministry of health|ministry of finance)/i

const INVESTIGATIVE_JOURNALISM_PATTERN =
  /(new york times|nyt|washington post|wall street journal|wsj|reuters|associated press|ap news|bloomberg|propublica|the guardian|guardian|financial times|vanity fair|the intercept|forensic architecture|bbc|cnn|nbc news|abc news|cbs news|npr|mother jones|open secrets|opensecrets|investigative reporting|journalist|news investigation)/i

const ACADEMIC_PATTERN =
  /(peer-reviewed|peer reviewed|academic journal|law review|journal article|doctoral dissertation|dissertation|thesis|university press|oxford university press|cambridge university press|harvard university press|stanford university press|university of chicago press|jstor|doi\.org|working paper|scholar|lancet|new england journal of medicine|foreign affairs)/i

function getSourceHaystack(source: SourceLike) {
  return `${source.text || ''} ${source.url || ''}`.replace(/\s+/g, ' ').trim()
}

function inferPrimarySourceHierarchy(haystack: string): SourceHierarchy {
  if (INSTITUTIONAL_PATTERN.test(haystack)) {
    return 'institutional'
  }

  return 'governmentLegal'
}

export function getSourceHierarchyLabel(hierarchy: SourceHierarchy): string {
  switch (hierarchy) {
    case 'governmentLegal':
      return 'Government & Legal'
    case 'institutional':
      return 'Institutional Records'
    case 'investigativeJournalism':
      return 'Investigative Journalism'
    case 'academic':
      return 'Academic & Scholarly'
    case 'secondary':
    default:
      return 'Secondary Analysis'
  }
}

export function createEmptySourceHierarchyCounts(): Record<SourceHierarchy, number> {
  return {
    governmentLegal: 0,
    institutional: 0,
    investigativeJournalism: 0,
    academic: 0,
    secondary: 0,
  }
}

export function normalizeSourceHierarchy(source: SourceLike): SourceHierarchy {
  const haystack = getSourceHaystack(source)

  switch (source.hierarchy) {
    case 'governmentLegal':
    case 'institutional':
    case 'investigativeJournalism':
    case 'academic':
    case 'secondary':
      return source.hierarchy
    case 'primary':
      return inferPrimarySourceHierarchy(haystack)
    case 'peerReviewed':
      return 'academic'
    case 'verifiedJournalism':
      return 'investigativeJournalism'
    default:
      break
  }

  if (GOV_OR_LEGAL_PATTERN.test(haystack)) {
    return 'governmentLegal'
  }

  if (INSTITUTIONAL_PATTERN.test(haystack)) {
    return 'institutional'
  }

  if (INVESTIGATIVE_JOURNALISM_PATTERN.test(haystack)) {
    return 'investigativeJournalism'
  }

  if (ACADEMIC_PATTERN.test(haystack)) {
    return 'academic'
  }

  return 'secondary'
}

export function getSourceHierarchyCounts(sources: SourceLike[]): Record<SourceHierarchy, number> {
  const counts = createEmptySourceHierarchyCounts()

  for (const source of sources) {
    counts[normalizeSourceHierarchy(source)] += 1
  }

  return counts
}

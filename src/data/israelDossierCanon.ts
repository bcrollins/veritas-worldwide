export type DossierCategory = 'financial' | 'humanitarian' | 'legal' | 'social'

export type DossierSourceCategory =
  | 'public-record'
  | 'un-international'
  | 'peer-reviewed'
  | 'monitor-ngo'
  | 'press-osint'
  | 'other'

export interface DossierCategoryMeta {
  label: string
  icon: string
  color: string
  accentColor: string
  bg: string
  border: string
  hoverBorder: string
  headerImage?: string
  headerCaption?: string
}

export interface DossierLatestPublicRecord {
  id: 'gaza-fatalities' | 'children-killed' | 'journalists-killed' | 'us-aid-obligations'
  value: string
  label: string
  source: string
  sourceUrl: string
  note: string
  category: DossierCategory
  shortLabel: string
}

export interface DossierPdfStat {
  v: string
  l: string
  s: string
}

export interface DossierCarouselSlideCanon {
  headline: string
  stat?: string
  body: string
  source: string
  sourceUrl: string
  bgStyle: 'dark' | 'crimson' | 'light' | 'stat'
}

export const ISRAEL_DOSSIER_LAST_VERIFIED = '2026-04-22'

export const ISRAEL_DOSSIER_ASSETS = {
  financial: '/og/chapter-15.png',
  humanitarian: '/og-image.png',
  legal: '/og/chapter-16.png',
  domestic: '/og/chapter-14.png',
  source: '/og/chapter-29.png',
} as const

export const ISRAEL_DOSSIER_CATEGORY_META: Record<DossierCategory, DossierCategoryMeta> = {
  financial: {
    label: 'U.S. Aid & Military Spending',
    icon: 'money',
    color: '#1a1a1a',
    accentColor: '#8B0000',
    bg: 'bg-surface',
    border: 'border-border',
    hoverBorder: 'hover:border-ink/30',
    headerImage: ISRAEL_DOSSIER_ASSETS.financial,
    headerCaption: 'CRS estimates $298B in inflation-adjusted U.S. aid obligations to Israel from 1946 through 2024',
  },
  humanitarian: {
    label: 'Humanitarian Impact',
    icon: 'warning',
    color: '#1a1a1a',
    accentColor: '#8B0000',
    bg: 'bg-surface',
    border: 'border-border',
    hoverBorder: 'hover:border-ink/30',
    headerImage: ISRAEL_DOSSIER_ASSETS.humanitarian,
    headerCaption: 'Humanitarian-impact records are presented with source attribution and reporting boundaries',
  },
  legal: {
    label: 'International Law & UN Record',
    icon: 'scale',
    color: '#1a1a1a',
    accentColor: '#8B0000',
    bg: 'bg-surface',
    border: 'border-border',
    hoverBorder: 'hover:border-ink/30',
    headerImage: ISRAEL_DOSSIER_ASSETS.legal,
    headerCaption: 'International-law records require separation between court holdings, warrants, advisory opinions, and analysis',
  },
  social: {
    label: 'Domestic Policy & Public Opinion',
    icon: 'pillar',
    color: '#1a1a1a',
    accentColor: '#8B0000',
    bg: 'bg-surface',
    border: 'border-border',
    hoverBorder: 'hover:border-ink/30',
    headerImage: ISRAEL_DOSSIER_ASSETS.domestic,
    headerCaption: 'Domestic lobbying, campaign-finance records, and anti-BDS legislation shape U.S. policy toward Israel',
  },
}

export const ISRAEL_DOSSIER_PUBLIC_RECORDS = {
  gazaFatalities: {
    id: 'gaza-fatalities',
    value: '72,289+',
    label: 'reported Palestinian fatalities in Gaza',
    shortLabel: 'Reported Gaza fatalities',
    source: 'OCHA Reported Impact Snapshot',
    sourceUrl: 'https://www.ochaopt.org/sites/default/files/Gaza_Reported_Impact_Snapshot_01_April_2026.pdf',
    note: 'OCHA attributes cumulative Gaza casualty figures to MoH Gaza and flags that UN verification is separate from source attribution.',
    category: 'humanitarian',
  },
  childrenKilled: {
    id: 'children-killed',
    value: '21,289+',
    label: 'children reported killed in Gaza',
    shortLabel: 'Children reported killed',
    source: 'UNICEF State of Palestine update',
    sourceUrl: 'https://www.unicef.org/media/178696/file/State-of-Palestine-Humanitarian-Situation-Update-and-Humanitarian-Response-5-February-2026.pdf.pdf',
    note: 'UNICEF reported this child fatality count through 3 February 2026, alongside 44,500 reported injured children.',
    category: 'humanitarian',
  },
  journalistDeaths: {
    id: 'journalists-killed',
    value: '261+',
    label: 'journalists and media workers among the killed',
    shortLabel: 'Journalists/media workers',
    source: 'Committee to Protect Journalists',
    sourceUrl: 'https://cpj.org/2023/10/journalist-casualties-in-the-israel-gaza-war/',
    note: 'CPJ describes these as preliminary investigations updated 17 April 2026 across Gaza, Yemen, Lebanon, Israel, and Iran since the Israel-Gaza war began.',
    category: 'humanitarian',
  },
  aidObligations: {
    id: 'us-aid-obligations',
    value: '$298B',
    label: 'inflation-adjusted U.S. aid obligations to Israel, 1946-2024',
    shortLabel: 'Inflation-adjusted aid',
    source: 'Congressional Research Service RL33222',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    note: 'CRS reports $174.965B in current dollars through 2025 and an estimated $298B in constant 2024 dollars through 2024.',
    category: 'financial',
  },
} as const satisfies Record<string, DossierLatestPublicRecord>

export const ISRAEL_DOSSIER_LATEST_PUBLIC_RECORDS = [
  ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities,
  ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled,
  ISRAEL_DOSSIER_PUBLIC_RECORDS.journalistDeaths,
  ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations,
] as const

export const ISRAEL_DOSSIER_AID_STAT_DETAILS = [
  {
    title: 'What this means',
    text: "CRS identifies Israel as the largest cumulative recipient of U.S. foreign assistance since World War II. The $298B figure is CRS's constant-2024-dollar estimate for obligations from 1946 through 2024.",
  },
  {
    title: 'Current-dollar figure',
    text: 'CRS reports $174.965B in current, non-inflation-adjusted bilateral assistance and missile defense funding through 2025.',
  },
  {
    title: 'Recent acceleration',
    text: 'Since October 2023, an additional $26.4B supplemental package was approved on top of the $3.8B annual baseline - the fastest acceleration of aid since the Camp David Accords.',
  },
] as const

export const ISRAEL_DOSSIER_SOURCE_CATEGORY_META: Record<'all' | DossierSourceCategory, { label: string; description: string }> = {
  all: { label: 'All sources', description: 'Every linked source used by the live dossier.' },
  'public-record': { label: 'Public record', description: 'Government, court, legislative, and official institutional records.' },
  'un-international': { label: 'UN / international', description: 'UN agencies, ICJ, ICC, WHO, UNICEF, OCHA, IPC, and international bodies.' },
  'peer-reviewed': { label: 'Peer reviewed', description: 'Journal articles, academic surveys, and research institutions.' },
  'monitor-ngo': { label: 'Monitor / NGO', description: 'Rights monitors, press-freedom trackers, and specialist documentation groups.' },
  'press-osint': { label: 'Press / OSINT', description: 'Established reporting, visual investigations, and open-source forensic work.' },
  other: { label: 'Other', description: 'Supplemental context that should be checked before publication use.' },
}

export const ISRAEL_DOSSIER_PDF_COVER_STATS = ISRAEL_DOSSIER_LATEST_PUBLIC_RECORDS.map((record) => ({
  v: record.value,
  l: record.shortLabel,
}))

export const ISRAEL_DOSSIER_PDF_KEY_STATS: DossierPdfStat[] = [
  {
    v: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.value,
    l: 'Inflation-adjusted U.S. aid obligations to Israel (1946-2024)',
    s: 'Congressional Research Service, Report RL33222',
  },
  { v: '$3.8B/year', l: 'Annual U.S. military aid under 2016 MOU (FY2019-2028)', s: 'U.S. State Department, 10-Year MOU' },
  { v: '$26.4B', l: 'Emergency supplemental aid package signed April 2024', s: 'U.S. Congress, H.R.815' },
  {
    v: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.value,
    l: 'Reported Palestinian fatalities in Gaza as of 1 Apr. 2026',
    s: 'OCHA snapshot, attributed to MoH Gaza',
  },
  {
    v: ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled.value,
    l: 'Children reported killed in Gaza through 3 Feb. 2026',
    s: 'UNICEF State of Palestine health update',
  },
  { v: '14,000+', l: 'MK-84 2,000-pound bombs supplied by U.S. to Israel', s: 'Wall Street Journal / NYT investigation' },
  {
    v: ISRAEL_DOSSIER_PUBLIC_RECORDS.journalistDeaths.value,
    l: 'Journalists and media workers among those killed since Oct. 7, 2023',
    s: 'Committee to Protect Journalists',
  },
  { v: '1.9M', l: "Palestinians displaced - 90% of Gaza's population", s: 'UNRWA' },
  { v: 'Unlawful', l: "ICJ ruled Israel's occupation of Palestinian territory illegal (July 2024)", s: 'International Court of Justice' },
  { v: '51+', l: 'U.S. vetoes shielding Israel from UN Security Council resolutions', s: 'UNSC records' },
  { v: '$180M+', l: 'Pro-Israel lobby spending in 2024 U.S. elections', s: 'OpenSecrets' },
  { v: '320,600+', l: 'Housing units estimated damaged in Gaza', s: 'OCHA / UNOSAT' },
  { v: '>1,700', l: 'Health workers reported killed in Gaza', s: 'OCHA snapshot, attributed to MoH Gaza' },
  { v: '230+', l: 'UNRWA staff killed - highest UN death toll in any conflict', s: 'UNRWA' },
  { v: '12/12', l: 'Universities in Gaza destroyed', s: 'Euro-Med / UNESCO' },
]

export const ISRAEL_DOSSIER_CHAPTER_15 = {
  subtitle: "A sourced accounting of U.S. aid obligations to Israel, including CRS's $298 billion constant-dollar total for 1946-2024 and the legal framework that enables it.",
  heroImage: ISRAEL_DOSSIER_ASSETS.financial,
  heroAlt: 'Veritas chapter card for U.S. foreign aid to Israel',
  heroCaption: 'CRS reports that Israel is the largest cumulative recipient of U.S. foreign assistance since World War II, with $298 billion in constant 2024 dollars obligated from 1946 through 2024.',
  heroCredit: 'Veritas Worldwide',
  sourceCitation: 'Congressional Research Service, "U.S. Foreign Aid to Israel," Report RL33222, Updated May 28, 2025. congress.gov/crs-product/RL33222',
  defenseBudgetCallout: "RELATED: Chapter 15 - U.S. Foreign Aid to Israel documents CRS's $298 billion constant-dollar aid-obligation total for 1946-2024. Chapter 11 - Shadow Institutions examines the private organizations influencing defense policy.",
  aipacCallout: "RELATED: Chapter 14 - AIPAC & Congressional Lobbying documents how the lobby operates, who it funds, and what happens to those who oppose it. Chapter 15 details CRS's $298 billion constant-dollar aid-obligation total for 1946-2024.",
} as const

export const ISRAEL_DOSSIER_BRAND_SLIDE = {
  headline: 'The Israel Dossier',
  body: 'CRS aid records, OCHA casualty snapshots, UNICEF child casualty updates, and CPJ press-freedom tracking in one source-first dossier. Every figure linked to its source.',
  source: 'Veritas Israel Dossier',
  bgStyle: 'dark',
} as const

export const ISRAEL_DOSSIER_CANON_CAROUSEL_SLIDES: DossierCarouselSlideCanon[] = [
  {
    headline: '$298 BILLION',
    stat: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.value,
    body: 'CRS estimates U.S. aid obligations to Israel at $298B in constant 2024 dollars from 1946 through 2024.',
    source: 'Congressional Research Service, Report RL33222',
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.sourceUrl,
    bgStyle: 'stat',
  },
  {
    headline: '72,289+ Reported Fatalities',
    stat: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.value,
    body: "OCHA's 1 April 2026 snapshot attributed 72,289 reported Palestinian fatalities in Gaza to MoH Gaza. The UN separately notes source attribution and verification boundaries.",
    source: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.source,
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.sourceUrl,
    bgStyle: 'crimson',
  },
  {
    headline: '21,289+ Children Reported Killed',
    stat: ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled.value,
    body: 'UNICEF reported at least 21,289 children killed and 44,500 injured in Gaza through 3 February 2026.',
    source: 'UNICEF State of Palestine health update',
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled.sourceUrl,
    bgStyle: 'dark',
  },
]

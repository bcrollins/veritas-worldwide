export type DossierCategory = 'financial' | 'humanitarian' | 'legal' | 'social'
export type DossierStatCategory = DossierCategory | 'infrastructure' | 'domestic' | 'comparative'

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

export interface DossierStatDetail {
  title: string
  text: string
  sourceUrl?: string
}

export interface DossierStatCard {
  value: string
  label: string
  source: string
  sourceUrl: string
  category: DossierStatCategory
  note?: string
  lastVerified: string
  details?: DossierStatDetail[]
  imageUrl?: string
  tier?: 'verified' | 'circumstantial' | 'disputed'
}

export interface DossierDocumentedIncident {
  title: string
  date: string
  location: string
  summary: string
  evidence: string
  sources: { label: string; url: string }[]
  multimedia: { type: 'video' | 'investigation' | 'photo-essay' | 'document'; label: string; url: string }[]
  tier: 'verified' | 'circumstantial'
  casualties?: { killed: number; injured?: number }
  imageUrl?: string
}

export interface DossierMoneyTrailNode {
  id: string
  label: string
  amount: string
  type: 'legislation' | 'weapon' | 'delivery' | 'impact'
  date: string
  detail: string
  sourceUrl: string
  children?: string[]
}


export interface DossierTimelineEvent {
  year: string
  title: string
  description: string
  source: string
  sourceUrl: string
  tier: 'verified' | 'circumstantial'
  imageUrl?: string
}

export interface DossierLobbyingRecord {
  organization: string
  amount: string
  cycle: string
  recipients: string
  source: string
  sourceUrl: string
  note?: string
}

export interface DossierLegalCase {
  title: string
  court: string
  date: string
  ruling: string
  significance: string
  sourceUrl: string
  status: 'decided' | 'pending' | 'ongoing'
}

export interface DossierCarouselSlideCanon {
  headline: string
  stat?: string
  body: string
  source: string
  sourceUrl: string
  bgStyle: 'dark' | 'crimson' | 'light' | 'stat'
}

export interface DossierCourseSourceAnchor {
  label: string
  url: string
  category: DossierSourceCategory
}

export interface DossierCourseArtifact {
  label: string
  description: string
  url: string
  filename: string
  format: 'CSV' | 'Markdown'
}

export interface DossierCourseModule {
  id: string
  title: string
  kicker: string
  objective: string
  sourceAnchors: DossierCourseSourceAnchor[]
  workProduct: string
  qualityGate: string
  exercise: string
  instituteSlug: string
  artifact: DossierCourseArtifact
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

export const ISRAEL_DOSSIER_CORE_STATS: DossierStatCard[] = [
  // ─── FINANCIAL ───
  {
    value: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.value,
    label: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.label,
    imageUrl: ISRAEL_DOSSIER_ASSETS.financial,
    source: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.source,
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.sourceUrl,
    category: 'financial',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    details: [...ISRAEL_DOSSIER_AID_STAT_DETAILS],
  },
  {
    value: '$3.8B',
    label: 'Annual U.S. military aid under 2016 MOU (FY2019–FY2028)',
    source: 'U.S. State Department, 10-Year MOU',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    category: 'financial',
    lastVerified: '2026-03-24',
    note: '$33B in FMF grants + $5B in missile defense over 10 years',
    details: [
      { title: 'How it works', text: 'Under the 2016 Memorandum of Understanding, Israel receives $3.3B/year in Foreign Military Financing (FMF) and $500M/year for missile defense — automatically, regardless of which party controls Congress.' },
      { title: 'Unique provision', text: 'Israel is the only country permitted to spend a portion of U.S. military aid on its own domestic defense industry rather than buying American-made equipment.' },
    ],
  },
  {
    value: '$26.4B',
    label: 'Emergency supplemental aid package signed April 2024',
    source: 'U.S. Congress, H.R.815 — Israel Security Supplemental',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
    category: 'financial',
    lastVerified: '2026-03-24',
    note: 'Includes $5.2B for Iron Dome/David\'s Sling, $3.5B for weapons procurement',
    details: [
      { title: 'Where the $26.4B went', text: '$4B to replenish Iron Dome and David\'s Sling missile defense systems. $1.2B for the Iron Beam laser defense system. $3.5B for advanced weapons procurement through Foreign Military Financing. $1B for artillery and critical munitions production.' },
      { title: 'Timeline', text: 'Signed into law April 24, 2024. Funds began flowing immediately. This was on top of the existing $3.8B annual baseline — meaning U.S. military aid exceeded $30B in a single fiscal year.' },
      { title: 'The bill', text: 'H.R.815 — the "Israel Security Supplemental Appropriations Act, 2024" — passed the House 366-58 and Senate 79-18.', sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815' },
    ],
  },
  {
    value: '$8B',
    label: 'Proposed arms sale notified to Congress (January 2025)',
    source: 'U.S. State Department notification to Congress',
    sourceUrl: 'https://www.dsca.mil/press-media/major-arms-sales',
    category: 'financial',
    lastVerified: '2026-03-24',
    note: 'Includes air-to-air missiles, 155mm shells, Hellfire missiles, 500-lb bombs',
    details: [
      { title: 'What\'s in the package', text: 'Medium-range air-to-air missiles (AIM-120 AMRAAM), 155mm artillery shells for long-range strikes, AGM-114 Hellfire missiles (the same used in targeted killings), and MK-82 500-pound bombs.' },
      { title: 'Context', text: 'This sale was notified just days after President Trump released a Biden-era hold on 1,800 MK-84 2,000-pound bombs. These are the same bomb type linked to mass-casualty events in Gaza.' },
    ],
  },
  {
    value: '$46.5B',
    label: 'Israel defense budget 2024 — a 65% year-over-year increase',
    source: 'Stockholm International Peace Research Institute (SIPRI)',
    sourceUrl: 'https://www.sipri.org/databases/milex',
    category: 'financial',
    lastVerified: '2026-03-24',
    details: [
      { title: 'Comparison', text: 'Israel\'s 2024 military spending ($46.5B) exceeds that of Egypt ($4.6B), Jordan ($2.3B), Lebanon ($2.1B), Syria ($1.8B), and all neighboring states combined.' },
      { title: 'Per capita', text: 'At roughly $4,800 per citizen, Israel has one of the highest per-capita military expenditures in the world.' },
    ],
  },
  {
    value: '14,000+',
    label: 'MK-84 2,000-pound bombs supplied by U.S. to Israel (2023–2024)',
    imageUrl: ISRAEL_DOSSIER_ASSETS.financial,
    source: 'Wall Street Journal / NYT investigation',
    sourceUrl: 'https://responsiblestatecraft.org/us-weapons-gaza/',
    category: 'financial',
    lastVerified: '2026-03-24',
    note: 'Each MK-84 has a lethal blast radius of 360 meters — 4 football fields',
    details: [
      { title: 'What is an MK-84?', text: 'A 2,000-pound (900kg) unguided general-purpose bomb. When fitted with JDAM GPS guidance kits, it becomes a precision munition — but with a blast radius that makes "precision" irrelevant in dense civilian areas like Gaza (6,500 people/km²).' },
      { title: 'Documented use against civilians', text: 'NYT investigation found MK-84 bombs were responsible for some of the deadliest attacks on Palestinian civilians. Identified in the July 13, 2024 al-Mawasi strike (90+ killed), the October 2023 Jabalia refugee camp strikes (120+ killed), and numerous residential building collapses.' },
      { title: 'Biden pause & Trump release', text: 'In May 2024, Biden paused delivery of 1,800 MK-84 bombs citing civilian casualty concerns. In January 2025, Trump released them immediately upon taking office.' },
    ],
  },
  {
    value: '54:1',
    label: 'GDP per capita ratio — Israel ($54,177) vs. Palestine ($2,592)',
    source: 'World Bank, 2024 data',
    sourceUrl: 'https://countryeconomy.com/countries/compare/israel/palestine',
    category: 'financial',
    lastVerified: '2026-03-24',
    note: 'Gaza GDP contracted 85% during Oct 2023–Sep 2024',
    details: [
      { title: 'Economic devastation', text: 'Gaza\'s GDP contracted by 85% in the first year of the war — the steepest economic collapse ever recorded by the World Bank for any territory. Pre-war unemployment was already 45%.' },
      { title: 'Aid dependency', text: 'Before October 2023, 80% of Gaza\'s population depended on international aid. The blockade, in place since 2007, restricted imports of construction materials, medical equipment, and dual-use goods.' },
    ],
  },
  {
    value: '$50K–$100K',
    label: 'Cost per Iron Dome interceptor missile',
    source: 'Encyclopaedia Britannica / Rafael Advanced Defense Systems',
    sourceUrl: 'https://www.britannica.com/topic/Iron-Dome',
    category: 'financial',
    lastVerified: '2026-03-24',
    details: [
      { title: 'How Iron Dome works', text: 'Each Tamir interceptor costs $50,000–$100,000 and is designed to shoot down short-range rockets costing Hamas as little as $300–$800 each. The U.S. has funded $2.6B+ for Iron Dome replenishment since 2011.' },
      { title: 'Cost asymmetry', text: 'Israel spends roughly $50,000 to intercept a rocket that cost $500 to make. During escalations, Israel can fire hundreds of interceptors per day — a burn rate of $5M–$50M daily, subsidized by U.S. taxpayers.' },
    ],
  },
  // ─── HUMANITARIAN ───
  {
    value: '75,200',
    label: 'Estimated violent deaths in Gaza through Jan. 5, 2025',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
    source: 'Gaza Ministry of Health / Lancet field survey (Jan 2025)',
    sourceUrl: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext',
    category: 'humanitarian',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    note: 'Survey estimate, not a live cumulative count. OCHA separately reported 72,289 Gaza fatalities as of 1 April 2026, attributed to MoH Gaza.',
    details: [
      { title: 'Independent verification', text: 'A population-representative household survey published in The Lancet Global Health (2025) estimated 75,200 violent deaths and 8,540 excess non-violent deaths between Oct 7, 2023 and Jan 5, 2025. The Gaza MoH figure for this period was 49,090 — 34.7% below the survey estimate.' },
      { title: 'Life-years lost', text: 'Researchers estimated over 3 million life-years lost as of July 2025 — reflecting the disproportionate killing of children and young adults.', sourceUrl: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)02112-9/fulltext' },
      { title: 'Who is being killed', text: 'OHCHR verified that 70% of fatalities in residential buildings were women and children. Airwars independently confirmed 75% correlation between publicly reported victim names and MoH data.' },
    ],
  },
  {
    value: ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled.value,
    label: 'Children reported killed in Gaza through Feb. 3, 2026',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
    source: 'UNICEF State of Palestine health update',
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled.sourceUrl,
    category: 'humanitarian',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    note: 'UNICEF reported 44,500 injured children and more than 11,000 children with serious injuries requiring long-term rehabilitation.',
    details: [
      { title: 'Source boundary', text: 'UNICEF frames these as reported figures, not independently verified final totals. The update covers the period from 7 October 2023 through 3 February 2026.' },
      { title: 'Long-term injury burden', text: 'UNICEF estimated more than 11,000 children had serious injuries likely to require long-term rehabilitation, while 4,000 children needed urgent medical evacuation for advanced care unavailable inside Gaza.' },
      { title: 'Health system condition', text: 'The same update reported that no hospital in Gaza was fully functional and only half of hospitals were partially functional.' },
    ],
  },
  {
    value: '70%',
    label: 'Of verified fatalities in residential buildings were women and children',
    source: 'UN Office of the High Commissioner for Human Rights (OHCHR)',
    sourceUrl: 'https://www.ohchr.org/sites/default/files/documents/countries/opt/20241106-Gaza-Update-Report-OPT.pdf',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    details: [
      { title: 'How verified', text: 'OHCHR cross-referenced fatalities from three independent sources. The 70% figure refers specifically to deaths in homes and residential buildings — not active combat zones.' },
      { title: 'Family obliteration', text: 'OHCHR verified 200+ families losing 5–9 members, 172 families losing 10–19 members, 69 families losing 20–29, and 43 families losing 30+. The Al Najjar family lost 138 members across 18 separate incidents.' },
    ],
  },
  {
    value: ISRAEL_DOSSIER_PUBLIC_RECORDS.journalistDeaths.value,
    label: 'Journalists and media workers among those killed since Oct. 7, 2023',
    imageUrl: ISRAEL_DOSSIER_ASSETS.source,
    source: 'Committee to Protect Journalists (CPJ), Apr. 17, 2026 update',
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.journalistDeaths.sourceUrl,
    category: 'humanitarian',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    note: 'More journalists killed than in any conflict since CPJ began tracking in 1992',
    details: [
      { title: '2024 record', text: '2024 was the deadliest year for journalists in CPJ history — 124 killed globally, nearly two-thirds of them Palestinians killed by Israel.', sourceUrl: 'https://cpj.org/special-reports/2024-is-deadliest-year-for-journalists-in-cpj-history-almost-70-percent-killed-by-israel/' },
      { title: '2025 record broken again', text: '2025 matched the record: 126 killed globally, with Israel responsible for 2/3 of all deaths worldwide.', sourceUrl: 'https://cpj.org/special-reports/record-129-press-members-killed-in-2025-israel-responsible-for-2-of-3-of-deaths/' },
      { title: 'Targeting finding', text: 'CPJ states that, as of April 2026, it had determined at least 64 journalists and media workers were directly targeted and killed by Israeli forces in reprisal for their work, while other cases remained under investigation.' },
    ],
  },
  {
    value: '1.9M',
    label: 'Palestinians displaced — 90% of Gaza\'s population',
    source: 'UNRWA Situation Report #155',
    sourceUrl: 'https://www.unrwa.org/resources/reports/unrwa-situation-report-155-situation-gaza-strip-and-west-bank-including-east-jerusalem',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    details: [
      { title: 'Forced displacement', text: 'B\'Tselem documented that 90% of Gaza\'s pre-war population of 2.1 million has been displaced at least once. Many have been displaced 5–10 times, ordered to move to "safe zones" that were subsequently bombed.', sourceUrl: 'https://www.btselem.org/gaza_strip/202512_no_place_under_heaven_forced_displacement_in_the_gaza_strip_2023_2025' },
      { title: 'Infrastructure destruction', text: 'OCHA cites UNOSAT satellite imagery analysis estimating more than 320,600 damaged housing units in Gaza as of 11 October 2025. Longer-term rebuild estimates remain scenario-dependent and should be cited separately.' },
    ],
  },
  {
    value: '3:1',
    label: 'Water consumption ratio — Israelis 247L/day vs. Palestinians 82L/day',
    source: "B'Tselem (Israeli human rights organization)",
    sourceUrl: 'https://www.btselem.org/water',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    note: 'In some West Bank areas, Palestinian consumption drops to 26L/day — disaster zone levels',
    details: [
      { title: 'WHO standard', text: 'The WHO minimum for survival is 50 liters/day. Many Palestinians in the West Bank live on 26L/day. In Gaza during the war, per-capita water availability dropped below 3 liters/day in some areas.' },
      { title: 'Control mechanism', text: 'Israel controls 80% of Palestinian water resources through Mekorot (the national water company). Palestinians must purchase their own water back from Israel at marked-up prices.' },
    ],
  },
  {
    value: '351',
    label: 'Palestinian children detained by Israel (Dec 2025) — 51% without charge',
    source: 'Defense for Children International — Palestine (DCIP)',
    sourceUrl: 'https://www.dci-palestine.org/palestinian_child_administrative_detainees_reach_all_time_high',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    note: 'Highest child detention numbers since monitoring began in 2008',
  },
  {
    value: '36,000+',
    label: 'Palestinians displaced by settlement expansion in West Bank',
    source: 'UN Human Rights Office (OHCHR), March 2026',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2026/03/israels-settlement-expansion-drives-mass-displacement-west-bank-un-report',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
  },
  {
    value: '1,732',
    label: 'Documented settler violence incidents in 12 months (to Oct 2025)',
    source: 'UN Human Rights Office (OHCHR)',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2026/03/israels-settlement-expansion-drives-mass-displacement-west-bank-un-report',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
  },
  // ─── LEGAL & INTERNATIONAL ───
  {
    value: 'Unlawful',
    label: "ICJ ruled Israel's occupation of Palestinian territory is illegal (July 19, 2024)",
    imageUrl: ISRAEL_DOSSIER_ASSETS.legal,
    source: 'International Court of Justice, Advisory Opinion',
    sourceUrl: 'https://www.icj-cij.org/node/204176',
    category: 'legal',
    lastVerified: '2026-03-24',
    note: 'Court found violations of prohibition on racial segregation and apartheid',
    details: [
      { title: 'What the court said', text: 'The ICJ found that Israel\'s continued presence in the Occupied Palestinian Territory is unlawful, that Israel is under an obligation to bring it to an end as rapidly as possible, and that Israel\'s policies and practices amount to de facto annexation.' },
      { title: 'Apartheid finding', text: 'The court specifically found violations of the prohibition on racial segregation and apartheid under international law — the first time the world\'s highest court has applied this term to Israel.' },
      { title: 'Enforcement', text: 'ICJ advisory opinions are not legally binding but carry enormous moral and political weight. 157 of 193 UN member states voted to demand Israel comply.' },
    ],
  },
  {
    value: '51+',
    label: 'U.S. vetoes of UN Security Council resolutions critical of Israel',
    imageUrl: ISRAEL_DOSSIER_ASSETS.legal,
    source: 'UN Security Council records / Jewish Virtual Library',
    sourceUrl: 'https://jewishvirtuallibrary.org/u-s-vetoes-of-un-security-council-resolutions-critical-to-israel',
    category: 'legal',
    lastVerified: '2026-03-24',
    note: 'More than half of all U.S. vetoes in UNSC history have shielded Israel',
    details: [
      { title: 'What this means', text: 'The United States has used its veto power at the UN Security Council more than 51 times to block resolutions critical of Israel — more than half of all vetoes the U.S. has ever cast. This includes vetoes of ceasefire resolutions during active military operations.' },
      { title: 'Recent vetoes', text: 'Between October 2023 and March 2025, the U.S. vetoed four separate ceasefire resolutions, even as the death toll in Gaza surpassed 40,000.' },
    ],
  },
  {
    value: '173',
    label: 'UN General Assembly resolutions against Israel (2015–2024) vs. 80 for rest of world',
    source: 'UN Watch analysis of UNGA voting records',
    sourceUrl: 'https://unwatch.org/2024-unga-resolutions-on-israel-vs-rest-of-the-world/',
    category: 'legal',
    lastVerified: '2026-03-24',
  },
  {
    value: '750,000+',
    label: 'Israeli settlers in occupied West Bank including East Jerusalem',
    source: 'UN Human Rights Office (OHCHR), March 2025',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2025/03/israel-ramps-settlement-and-annexation-west-bank-dire-human-rights',
    category: 'legal',
    lastVerified: '2026-03-24',
    note: 'Settlement count rose ~50% from 141 (2022) to 210 (2025)',
    details: [
      { title: 'International law', text: 'All Israeli settlements in the occupied territories are considered illegal under international law (Fourth Geneva Convention, Art. 49). UNSC Resolution 2334 (2016) reaffirmed this, passing 14–0.' },
      { title: 'Expansion rate', text: 'The number of settlements and outposts increased from 141 in 2022 to 210 in 2025 — a 50% increase in just three years, with settler population growing by approximately 15,000 per year.' },
    ],
  },
  {
    value: 'UNSC 2334',
    label: 'Security Council resolution declaring all Israeli settlements illegal (2016)',
    source: 'United Nations Security Council',
    sourceUrl: 'https://en.wikipedia.org/wiki/United_Nations_Security_Council_Resolution_2334',
    category: 'legal',
    lastVerified: '2026-03-24',
    note: 'Passed 14–0, U.S. abstained under Obama administration',
  },
  // ─── SOCIAL: Benefits, Domestic Policy ───
  {
    value: 'Universal',
    label: 'Healthcare coverage for all Israeli citizens since 1995',
    source: 'Commonwealth Fund / Israel Ministry of Health',
    sourceUrl: 'https://www.commonwealthfund.org/international-health-policy-center/countries/israel',
    category: 'social',
    lastVerified: '2026-03-24',
    note: 'Funded in part through U.S. aid that offsets domestic budget pressure',
    details: [
      { title: 'How it works', text: 'Israel\'s National Health Insurance Law (1995) guarantees universal healthcare to all citizens and permanent residents through four competing health funds. Co-pays are minimal. Life expectancy is 83 years — among the highest in the world.' },
      { title: 'The aid connection', text: 'U.S. military aid effectively subsidizes Israel\'s domestic spending by covering defense costs that would otherwise come from the general budget. This frees billions for social programs that American taxpayers themselves often lack access to.' },
    ],
  },
  {
    value: '84%',
    label: 'Of Israeli Jews believe Oct 7 attack justifies current military actions in Gaza',
    source: 'Tel Aviv University / PCPSR joint survey, Sept 2024',
    sourceUrl: 'https://en-social-sciences.tau.ac.il/peaceindex/joint-israeli-palestinian-surveys/2024-09',
    category: 'social',
    lastVerified: '2026-03-24',
    details: [
      { title: 'Methodology', text: 'Joint poll conducted by Tel Aviv University and the Palestinian Center for Policy and Survey Research. Representative sample of Israeli Jews and Palestinians surveyed September 2024.' },
      { title: 'Contrasting view', text: 'In the same survey, only 2% of Israeli Jews described the suffering in Gaza as "very significant." Meanwhile, 94% of Palestinians described IDF actions as war crimes.' },
    ],
  },
  {
    value: '61%',
    label: 'Of Israelis support Saudi normalization even during ongoing conflict',
    source: 'Israel Democracy Institute, Sept 2024',
    sourceUrl: 'https://en.idi.org.il/tags-en/1465',
    category: 'social',
    lastVerified: '2026-03-24',
  },
  {
    value: '90%',
    label: 'Tuition discount for first year of university for IDF veterans',
    source: 'Israel Council for Higher Education / Nefesh B\'Nefesh',
    sourceUrl: 'https://www.nbn.org.il/life-in-israel/government-services/rights-and-benefits/student-authority-tuition-benefits/',
    category: 'social',
    lastVerified: '2026-03-24',
  },
  {
    value: '170,000',
    label: 'Active IDF personnel + 465,000 reservists (635,000 total force)',
    source: 'Global Firepower / IDF',
    sourceUrl: 'https://www.globalfirepower.com/country-military-strength-detail.php?country_id=israel',
    category: 'social',
    lastVerified: '2026-03-24',
  },
  {
    value: '7.6%',
    label: "Israel's health spending as % of GDP — below OECD average of 9.3%",
    source: 'OECD Health Statistics / World Bank',
    sourceUrl: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=IL',
    category: 'social',
    lastVerified: '2026-03-24',
    note: 'Lower health spending is possible because U.S. aid covers defense costs',
  },
]

export const ISRAEL_DOSSIER_CORE_INCIDENTS: DossierDocumentedIncident[] = [
  {
    title: 'The Killing of Hind Rajab, Age 5',
    date: 'January 29, 2024',
    location: 'Tel al-Hawa, Gaza City',
    summary: 'Five-year-old Hind Rajab and six family members were fleeing Gaza City when their civilian Kia Picanto was fired upon by an Israeli tank. Hind\'s 15-year-old cousin Layan called the Palestine Red Crescent: "They are shooting at us. The tank is right next to me." All passengers except Hind were killed instantly. Hind survived in the car for three hours, speaking to PRCS dispatchers by phone, whispering: "Come take me. I\'m so scared." Two paramedics — Yusuf Zeino and Ahmed al-Madhoun — were dispatched with Israeli military coordination. Both were killed en route. Twelve days later, when Israeli forces withdrew, the bodies were recovered.',
    evidence: 'Forensic Architecture analysis found 335 bullet holes in the family\'s Kia Picanto. The firing tank was positioned 13–23 meters away. Investigators concluded: "It is not plausible that the shooter could not have seen that the car was occupied by civilians, including children." Audio recordings of Hind\'s phone calls were released publicly. Al Jazeera\'s October 2025 documentary revealed new evidence of a "double-tap" strike — the ambulance was hit by a separate, deliberate attack. A bipartisan U.S. congressional bill (the Hind Rajab Act) was introduced in March 2026.',
    sources: [
      { label: 'Washington Post — Full investigative timeline with forensic reconstruction', url: 'https://www.washingtonpost.com/world/interactive/2024/hind-rajab-israel-gaza-killing-timeline/' },
      { label: 'Al Jazeera — New double-tap strike evidence (2025 documentary)', url: 'https://www.aljazeera.com/news/2026/3/23/substantial-evidence-of-double-tap-strike-in-killing-of-gazas-hind-rajab' },
      { label: 'Common Dreams — Forensic Architecture: 335 bullets at close range', url: 'https://www.commondreams.org/news/hind-rajab-forensic-investigation' },
      { label: 'Hind Rajab Foundation — Full story', url: 'https://www.hindrajabfoundation.org/hind-rajabs-story' },
      { label: 'U.S. Congress — Hind Rajab Act introduced (March 2026)', url: 'https://jayapal.house.gov/2026/03/12/jayapal-jacobs-welch-introduce-bicameral-bill-demanding-accountability-for-hind-rajab-palestinian-child-killed-by-israeli-forces/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Forensic Architecture — Full reconstruction with audio', url: 'https://forensic-architecture.org/investigation/the-killing-of-hind-rajab' },
      { type: 'investigation', label: 'Al Jazeera — Documentary evidence summary (2025)', url: 'https://www.aljazeera.com/news/2025/10/21/new-al-jazeera-documentary-reveals-evidence-in-hind-rajab-familys-killing' },
      { type: 'document', label: 'Defense for Children International — Legal brief', url: 'https://www.dci-palestine.org/israeli_forces_shoot_kill_4_year_old_palestinian_girl_in_the_backseat_of_a_car' },
    ],
    tier: 'verified',
    casualties: { killed: 9 },
  },
  {
    title: 'The Rafah Paramedic Convoy Massacre',
    date: 'March 23, 2025',
    location: 'Al-Hashashin, Southern Rafah',
    summary: 'Israeli forces attacked a convoy of clearly marked humanitarian vehicles — five ambulances, a fire truck, and a UN vehicle — killing 15 aid workers at dawn. The dead included eight Palestine Red Crescent members, five civil defense workers, and one UN employee. All vehicles had emergency lights activated and were traveling a coordinated route. Israel initially claimed the convoy approached without lights and was suspected of transporting militants.',
    evidence: 'Video footage recovered from the buried phone of paramedic Rifaat Radwan — interred with the victims in a mass grave for eight days — directly contradicted the IDF account. The video, filmed from the front seat, shows all emergency lights on and clearly marked ambulances. Radwan is heard reciting prayers and saying: "Forgive me mom, this is the path I chose — to help people." The bodies were found in an unmarked mass grave on March 30. Under pressure from the video evidence, the Israeli military reversed its initial account on March 31.',
    sources: [
      { label: 'CNN — Audio and video capture last moments', url: 'https://www.cnn.com/2025/04/07/middleeast/gaza-aid-workers-killed-audio-intl-invs' },
      { label: 'NBC News — Video of the moment Israeli forces opened fire', url: 'https://www.nbcnews.com/news/world/video-moment-israeli-forces-gaza-medics-killed-rcna199824' },
      { label: 'CBC News — Israel changes account after video surfaces', url: 'https://www.cbc.ca/news/world/gaza-paramedics-first-responders-rafah-israel-1.7503193' },
      { label: 'Middle East Eye — New video evidence disputes Israeli account', url: 'https://www.middleeasteye.net/news/new-video-evidence-disputes-israeli-armys-account-medic-killings' },
      { label: 'Anadolu Agency — Survivor interview', url: 'https://www.aa.com.tr/en/middle-east/interview-survivor-of-rafah-ambulance-massacre-exposes-israeli-army-atrocities/3531451' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN Investigation — Recovered phone footage', url: 'https://www.cnn.com/2025/04/07/middleeast/gaza-aid-workers-killed-audio-intl-invs' },
      { type: 'video', label: 'TRT World — Survivor testimony', url: 'https://www.trtworld.com/article/02f8ed7948e3' },
    ],
    tier: 'verified',
    casualties: { killed: 15 },
  },
  {
    title: 'World Central Kitchen Aid Workers Targeted by Drone Strikes',
    date: 'April 1, 2024',
    location: 'Deir al-Balah, Central Gaza',
    summary: 'Three separate Israeli drone strikes killed seven World Central Kitchen aid workers traveling in a three-car convoy that had coordinated its movements with the IDF. The team had just finished unloading 100 tons of humanitarian food aid brought by ship from Cyprus. Killed were nationals of the United States, Canada, United Kingdom, Australia, Poland, and Palestine. WCK founder José Andrés said Israel "targeted us deliberately, car by car."',
    evidence: 'The three vehicles were struck sequentially over 2.4 km — each car hit after survivors attempted to flee the previous strike. GPS coordinates had been shared with the IDF in advance. Israel\'s own military investigation concluded the strike "violated its standards and should not have occurred." A reserve colonel and major were dismissed; three more officers reprimanded. Despite coordination and clearly marked vehicles with WCK logo on the roof, all three were hit in succession.',
    sources: [
      { label: 'NPR — Israel fires officers after drone strikes', url: 'https://www.npr.org/2024/04/05/1242986585/israels-military-dismisses-officers-over-world-central-kitchen-airstrike' },
      { label: 'CNN — Who were the 7 killed workers', url: 'https://edition.cnn.com/2024/04/03/middleeast/world-central-kitchen-workers-gaza-israel-strike-intl' },
      { label: 'Washington Post — Strike halts Gaza aid operations', url: 'https://www.washingtonpost.com/world/2024/04/01/world-central-kitchen-gaza-deaths-wck/' },
      { label: 'World Central Kitchen — Official statement', url: 'https://wck.org/news/gaza-team-update/' },
      { label: 'CNN — "Systematically, car by car" — José Andrés', url: 'https://www.cnn.com/2024/04/04/middleeast/jose-andres-wck-israel-strike-criticism-intl' },
    ],
    multimedia: [
      { type: 'photo-essay', label: 'NBC News — Visual investigation of the strike sequence', url: 'https://www.nbcnews.com/news/world/world-central-kitchen-says-israeli-strike-kills-7-workers-halts-aid-rcna145976' },
      { type: 'investigation', label: 'Al Jazeera Sanad — Three-strike convoy probe', url: 'https://www.aljazeera.com/news/2024/4/2/al-jazeera-sanad-probe-finds-israeli-forces-deliberately-hit-wck-convoy' },
    ],
    tier: 'verified',
    casualties: { killed: 7 },
  },
  {
    title: 'The Flour Massacre — Aid Seekers Shot While Waiting for Food',
    date: 'February 29, 2024',
    location: 'Al-Rashid Street, Gaza City',
    summary: 'At approximately 4:30 a.m., Israeli tanks and snipers opened fire on thousands of Palestinian civilians who had been waiting hours for an aid convoy on coastal Al-Rashid Street. The shooting continued for approximately 90 minutes as aid trucks arrived. At least 118 Palestinians were killed and 760 injured. The attack came one day after the World Food Programme warned that over 500,000 Gazans were at risk of famine.',
    evidence: 'Forensic and ballistic experts reviewed video evidence showing that automatic gunfire began before the IDF said the convoy had started crossing through its checkpoint — contradicting the Israeli account that a "stampede" caused most deaths. Hospital records showed the majority of victims had gunshot wounds, not trampling injuries. The 972 Magazine published survivor testimonies describing "indiscriminate" Israeli fire into crowds. UN experts formally condemned the attack as a deliberate massacre.',
    sources: [
      { label: 'CNN — Videos and eyewitness accounts cast doubt on Israeli timeline', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-investigation-cmd/index.html' },
      { label: 'OHCHR — UN experts condemn "flour massacre"', url: 'https://www.ohchr.org/en/press-releases/2024/03/un-experts-condemn-flour-massacre-urge-israel-end-campaign-starvation-gaza' },
      { label: 'Al Jazeera — "The blood was everywhere" (longform)', url: 'https://www.aljazeera.com/news/longform/2024/3/5/the-blood-was-everywhere-inside-israels-flour-massacre-in-gaza' },
      { label: '972 Magazine — Survivor testimonies', url: 'https://www.972mag.com/gaza-aid-convoy-massacre-testimonies/' },
      { label: 'NBC News — How 118 people died in the aid convoy', url: 'https://www.nbcnews.com/news/world/gaza-aid-convoy-deaths-al-rashid-israel-idf-hamas-rcna141497' },
    ],
    multimedia: [
      { type: 'video', label: 'Al Jazeera — Longform visual investigation', url: 'https://www.aljazeera.com/news/longform/2024/3/5/the-blood-was-everywhere-inside-israels-flour-massacre-in-gaza' },
      { type: 'investigation', label: 'CNN — Forensic video analysis', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-investigation-cmd/index.html' },
    ],
    tier: 'verified',
    casualties: { killed: 118, injured: 760 },
  },
  {
    title: 'Nuseirat Hostage Rescue — 274 Civilians Killed in "Rescue" Operation',
    date: 'June 8, 2024',
    location: 'Nuseirat Refugee Camp, Central Gaza',
    summary: 'The IDF launched a large-scale operation to rescue four Israeli hostages from two residential apartment buildings in Nuseirat refugee camp. The operation succeeded in recovering Noa Argamani, Shlomi Ziv, Almog Meir Jan, and Andrey Kozlov. It also killed at least 274 Palestinians — including 64 children and 57 women — and injured nearly 700. Israeli forces allegedly entered the camp disguised as displaced persons and aid workers in a humanitarian truck before calling in intense air, sea, and ground bombardment.',
    evidence: 'The use of a humanitarian aid truck as a Trojan horse was confirmed by multiple eyewitness accounts and later acknowledged by Israeli media. OHCHR documented 274 fatalities including 64 children. EU foreign policy chief Josep Borrell called it a "bloodbath." OHCHR stated both Israeli forces and Palestinian armed groups may have committed war crimes. The Israeli military acknowledged fewer than 100 deaths — a figure contradicted by hospital records and morgue counts.',
    sources: [
      { label: 'OHCHR — UN experts condemn "outrageous disregard" for civilians', url: 'https://www.ohchr.org/en/press-releases/2024/06/un-experts-condemn-outrageous-disregard-palestinian-civilians-during-israels' },
      { label: 'Washington Post — Israel rescues hostages, leaving trail of death', url: 'https://www.washingtonpost.com/world/2024/06/08/israel-hostages-nuseirat-camp-gaza/' },
      { label: 'Al Jazeera — Israeli killings may be war crimes: UN', url: 'https://www.aljazeera.com/news/2024/6/11/israeli-killings-of-gaza-civilians-during-raid-may-be-war-crimes-un' },
      { label: 'Euro-Med Monitor — Al Jazeera documentary warrants investigation', url: 'https://euromedmonitor.org/en/article/6773/' },
    ],
    multimedia: [
      { type: 'video', label: 'Al Jazeera World — Nuseirat 274 documentary', url: 'https://www.aljazeera.com/video/al-jazeera-world/2025/10/22/nuseirat-274' },
      { type: 'investigation', label: 'Euro-Med Monitor — Full investigation report', url: 'https://euromedmonitor.org/en/article/6773/' },
    ],
    tier: 'verified',
    casualties: { killed: 274, injured: 698 },
  },
  {
    title: 'Al-Mawasi "Safe Zone" Bombing — 90+ Killed in Designated Humanitarian Area',
    date: 'July 13, 2024',
    location: 'Al-Mawasi, Khan Yunis (IDF-designated "safe zone")',
    summary: 'Israeli forces dropped multiple MK-84 2,000-pound bombs on the al-Mawasi area — a zone the IDF itself had designated as a humanitarian "safe zone" for displaced civilians. The strike targeted Hamas military wing commander Mohammed Deif. At least 90 Palestinians were killed and over 300 wounded. The area was packed with displaced families living in tents who had followed IDF evacuation orders to move there.',
    evidence: 'Satellite imagery, crater analysis, and munition fragments confirmed the use of at least two MK-84 2,000-pound bombs — U.S.-manufactured weapons with a lethal blast radius of 360 meters. The bombs were dropped on a densely packed tent encampment. Israel later said it successfully killed its target (confirmed months later), but international observers noted that using 2,000-pound bombs in a civilian "safe zone" represents a disproportionate use of force under international humanitarian law.',
    sources: [
      { label: 'Al Jazeera — What bombs were used in al-Mawasi "safe zone"', url: 'https://www.aljazeera.com/news/2024/9/12/what-bombs-did-israel-use-against-the-al-mawasi-safe-zone-in-gaza' },
      { label: 'Responsible Statecraft — 20 times Israel used US weapons in likely war crimes', url: 'https://responsiblestatecraft.org/us-weapons-gaza/' },
      { label: 'AOAV — US ships 1,600 MK-84 heavy bombs to Israel', url: 'https://aoav.org.uk/2025/us-ships-1600-mk-84-heavy-bombs-to-israel-amid-concerns-of-resurgent-conflict/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Al Jazeera — Bomb fragment analysis and crater mapping', url: 'https://www.aljazeera.com/news/2024/9/12/what-bombs-did-israel-use-against-the-al-mawasi-safe-zone-in-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 90, injured: 300 },
  },
]

export const ISRAEL_DOSSIER_MONEY_TRAIL: DossierMoneyTrailNode[] = [
  {
    id: 'hr815',
    label: 'H.R.815 — Israel Security Supplemental',
    amount: '$26.4B',
    type: 'legislation',
    date: 'April 24, 2024',
    detail: 'Signed into law. Passed House 366-58, Senate 79-18. Includes $4B for Iron Dome replenishment, $3.5B for weapons procurement, $1.2B for Iron Beam, $1B for artillery munitions.',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
    children: ['iron-dome', 'fmf-weapons', 'munitions'],
  },
  {
    id: 'annual-mou',
    label: '10-Year MOU (2016) — Annual Baseline',
    amount: '$3.8B/year',
    type: 'legislation',
    date: '2019–2028',
    detail: 'Automatic annual aid: $3.3B in Foreign Military Financing + $500M for missile defense. Israel is the only recipient allowed to spend FMF on its own defense industry.',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    children: ['fmf-weapons', 'iron-dome'],
  },
  {
    id: 'trump-release',
    label: 'Trump releases 1,800 MK-84 bombs',
    amount: '~$360M',
    type: 'delivery',
    date: 'January 2025',
    detail: 'President Trump released a Biden-era hold on 1,800 MK-84 2,000-pound bombs immediately upon taking office. Each MK-84 costs ~$3,100 bare; with JDAM kits, ~$25,000 each.',
    sourceUrl: 'https://www.armyrecognition.com/news/army-news/2025/breaking-news-us-greenlights-mk-84-bombs-for-israel-despite-us-president-donald-trumps-military-sales-pause',
    children: ['mk84-use'],
  },
  {
    id: 'fmf-weapons',
    label: 'Foreign Military Financing → Weapons Procurement',
    amount: '$3.5B+',
    type: 'weapon',
    date: '2024',
    detail: 'FMF grants used to purchase: F-35 stealth fighters, Apache attack helicopters, MK-84 bombs, JDAM guidance kits, 155mm artillery shells, Hellfire missiles, and small-diameter bombs.',
    sourceUrl: 'https://www.dsca.mil/press-media/major-arms-sales',
    children: ['mk84-use', 'jdam-use'],
  },
  {
    id: 'iron-dome',
    label: 'Iron Dome / David\'s Sling Replenishment',
    amount: '$4B+',
    type: 'weapon',
    date: '2024',
    detail: 'Tamir interceptors ($50K–$100K each) and David\'s Sling Stunner missiles ($1M+ each). Used to defend Israeli territory from rocket attacks while offensive operations continue in Gaza.',
    sourceUrl: 'https://www.britannica.com/topic/Iron-Dome',
  },
  {
    id: 'munitions',
    label: 'Artillery & Critical Munitions Production',
    amount: '$1B',
    type: 'weapon',
    date: '2024',
    detail: '155mm artillery shells, tank ammunition, and other ground-force munitions used in the Gaza ground invasion. 155mm shells have been documented striking residential areas.',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
    children: ['artillery-use'],
  },
  {
    id: 'mk84-use',
    label: 'MK-84 Bombs → Documented Civilian Impact',
    amount: '14,000+ delivered',
    type: 'impact',
    date: '2023–2025',
    detail: 'MK-84 2,000-pound bombs identified in: al-Mawasi "safe zone" attack (90+ killed, July 2024), Jabalia refugee camp strikes (120+ killed, Oct 2023), and numerous residential building collapses. Lethal blast radius: 360 meters.',
    sourceUrl: 'https://responsiblestatecraft.org/us-weapons-gaza/',
  },
  {
    id: 'jdam-use',
    label: 'JDAM-Guided Strikes → Residential Areas',
    amount: '$680M package (Nov 2024)',
    type: 'impact',
    date: '2024',
    detail: 'A $680M package of Joint Direct Attack Munitions (JDAM) kits and small-diameter bombs approved November 2024. JDAMs convert unguided "dumb bombs" into GPS-guided munitions — but in Gaza\'s density (6,500 people/km²), even "precision" strikes kill civilians.',
    sourceUrl: 'https://armssalesaccountabilityproject.com/wp-content/uploads/10.4.24-JDAM-White-Paper.pdf',
  },
  {
    id: 'artillery-use',
    label: '155mm Artillery → Civilian Areas',
    amount: 'Thousands of shells',
    type: 'impact',
    date: '2023–2025',
    detail: '155mm artillery, designed for open-battlefield use, has been fired into one of the most densely populated areas on Earth. Each shell has a casualty radius of 50+ meters. Used extensively during the Jabalia and Nuseirat operations.',
    sourceUrl: 'https://www.ohchr.org/sites/default/files/documents/countries/opt/20241106-Gaza-Update-Report-OPT.pdf',
  },
]

export const ISRAEL_DOSSIER_HISTORICAL_TIMELINE: DossierTimelineEvent[] = [
  {
    year: '1917',
    title: 'The Balfour Declaration',
    description: 'British Foreign Secretary Arthur Balfour writes to Lord Rothschild: "His Majesty\'s Government view with favour the establishment in Palestine of a national home for the Jewish people." Britain controlled neither the land nor the consent of its 700,000 Arab inhabitants.',
    source: 'The Avalon Project — The Balfour Declaration',
    sourceUrl: 'https://avalon.law.yale.edu/20th_century/balfour.asp',
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.legal,
  },
  {
    year: '1947',
    title: 'UN Partition Plan (Resolution 181)',
    description: 'The UN General Assembly votes to partition Palestine into Jewish and Arab states, granting 56% of the land to the Jewish state despite Jews comprising 33% of the population and owning 7% of the land. Arab states reject the plan.',
    source: 'United Nations General Assembly Resolution 181',
    sourceUrl: 'https://www.un.org/unispal/document/auto-insert-185393/',
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.legal,
  },
  {
    year: '1948',
    title: 'The Nakba — 750,000 Palestinians Expelled',
    description: 'During the 1948 Arab-Israeli War, approximately 750,000 Palestinians are expelled or flee from their homes. Over 400 Palestinian villages are depopulated and destroyed. Israel declares independence on May 14.',
    source: 'UN Conciliation Commission for Palestine, Final Report',
    sourceUrl: 'https://www.un.org/unispal/document/auto-insert-206564/',
    tier: 'verified',
  },
  {
    year: '1967',
    title: 'Six-Day War — Occupation Begins',
    description: 'Israel captures the West Bank, Gaza Strip, Sinai Peninsula, and Golan Heights. Military occupation of Palestinian territories begins — now in its 58th year. UN Security Council Resolution 242 calls for Israeli withdrawal.',
    source: 'UN Security Council Resolution 242',
    sourceUrl: 'https://digitallibrary.un.org/record/90717',
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.legal,
  },
  {
    year: '1967',
    title: 'USS Liberty Attack — 34 Americans Killed',
    description: 'Israeli air and naval forces attack the USS Liberty, a clearly marked U.S. Navy intelligence ship, in international waters off the Sinai Peninsula. 34 American servicemen killed, 171 wounded. Israel calls it a case of mistaken identity; surviving crew members and multiple investigations dispute this.',
    source: 'U.S. State Department FRUS, Vol. XIX, Document 284',
    sourceUrl: 'https://history.state.gov/historicaldocuments/frus1964-68v19/d284',
    tier: 'verified',
  },
  {
    year: '1978',
    title: 'Camp David Accords — U.S. Aid Escalates',
    description: 'Israel and Egypt sign the Camp David Accords, brokered by President Carter. As part of the deal, the U.S. commits to $3 billion/year in military and economic aid to Israel and $2 billion/year to Egypt — permanently reshaping U.S. foreign aid.',
    source: 'Jimmy Carter Presidential Library',
    sourceUrl: 'https://www.jimmycarterlibrary.gov/research/camp_david_accords',
    tier: 'verified',
  },
  {
    year: '1982',
    title: 'Sabra and Shatila Massacre',
    description: 'Israeli-allied Lebanese Phalangist militia massacres between 800 and 3,500 Palestinian and Lebanese Shia civilians in the Sabra and Shatila refugee camps. Israeli forces surround the camps and provide illumination. The Kahan Commission finds Defense Minister Ariel Sharon bears "personal responsibility."',
    source: 'Kahan Commission Report (Israeli government)',
    sourceUrl: 'https://www.mfa.gov.il/mfa/foreignpolicy/mfadocuments/yearbook6/pages/104%20report%20of%20the%20commission%20of%20inquiry%20into%20the%20e.aspx',
    tier: 'verified',
  },
  {
    year: '1987',
    title: 'First Intifada Begins',
    description: 'Palestinian uprising against Israeli occupation. Over six years, 1,551 Palestinians and 422 Israelis are killed. Defense Minister Yitzhak Rabin orders soldiers to "break their bones" — a policy documented by B\'Tselem.',
    source: 'B\'Tselem — Israeli Information Center for Human Rights',
    sourceUrl: 'https://www.btselem.org/statistics/first_intifada_tables',
    tier: 'verified',
  },
  {
    year: '1993',
    title: 'Oslo Accords',
    description: 'Israel and the PLO sign the Declaration of Principles on Interim Self-Government. Intended as a 5-year interim arrangement leading to a final status agreement. That agreement never materializes. Settlement population triples in the years following Oslo.',
    source: 'UN Peacemaker',
    sourceUrl: 'https://peacemaker.un.org/israelopt-osloaccord93',
    tier: 'verified',
  },
  {
    year: '2004',
    title: 'ICJ Rules Separation Wall Illegal',
    description: 'The International Court of Justice rules 14-1 that Israel\'s construction of a wall in the occupied Palestinian territory is contrary to international law. Israel ignores the ruling. The wall is now 712 km long, 85% built inside the West Bank.',
    source: 'International Court of Justice, Advisory Opinion',
    sourceUrl: 'https://www.icj-cij.org/case/131',
    tier: 'verified',
  },
  {
    year: '2007',
    title: 'Gaza Blockade Begins',
    description: 'Following Hamas\'s takeover of Gaza, Israel imposes a land, air, and sea blockade. The UN and ICRC describe it as collective punishment of 2 million civilians. The blockade continues for 19 years.',
    source: 'ICRC — Gaza closure: not another year!',
    sourceUrl: 'https://casebook.icrc.org/print/pdf/node/21121',
    tier: 'verified',
  },
  {
    year: '2014',
    title: 'Operation Protective Edge — 2,251 Palestinians Killed',
    description: '51-day Israeli military operation in Gaza. 2,251 Palestinians killed (including 551 children) and 73 Israelis killed (including 6 civilians). UN Human Rights Council finds evidence of war crimes by both sides.',
    source: 'UN OHCHR Report A/HRC/29/52',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza',
    tier: 'verified',
  },
  {
    year: '2016',
    title: '$38 Billion MOU Signed',
    description: 'Obama administration signs the largest military aid package in U.S. history: $38 billion over 10 years ($3.8B/year). Israel is the only country permitted to spend part of U.S. military aid on its own defense industry.',
    source: 'U.S. State Department Fact Sheet',
    sourceUrl: 'https://2009-2017.state.gov/r/pa/prs/ps/2016/09/261987.htm',
    tier: 'verified',
  },
  {
    year: '2018',
    title: 'Great March of Return — 223 Palestinians Killed',
    description: 'Palestinians in Gaza hold weekly protests at the border fence demanding the right of return. Later UN reporting records 223 Palestinians killed and more than 36,100 injured during the 2018–2019 protest period, while citing earlier commission findings on lethal force used against demonstrators.',
    source: 'UN report A/78/545 on children and armed conflict in the Occupied Palestinian Territory',
    sourceUrl: 'https://documents.un.org/doc/undoc/gen/n23/315/25/pdf/n2331525.pdf',
    tier: 'verified',
  },
  {
    year: '2021',
    title: 'Human Rights Watch: "A Threshold Crossed" — Apartheid Finding',
    description: 'Human Rights Watch publishes a 213-page report concluding that Israel\'s treatment of Palestinians amounts to the crimes of apartheid and persecution. Amnesty International publishes a similar finding in February 2022.',
    source: 'Human Rights Watch',
    sourceUrl: 'https://www.hrw.org/report/2021/04/27/threshold-crossed/israeli-authorities-and-crimes-apartheid-and-persecution',
    tier: 'verified',
  },
  {
    year: '2023',
    title: 'October 7 Attack and Gaza War Begins',
    description: 'Hamas and other Palestinian armed groups launch a surprise attack on southern Israel, killing approximately 1,139 Israelis and foreign nationals and taking 251 hostages. Israel declares war and begins a military campaign in Gaza; OCHA\'s 1 April 2026 snapshot attributed 72,289 reported Palestinian fatalities in Gaza to MoH Gaza, while survey-based estimates and identified-fatality breakdowns use different methods.',
    source: 'Israeli Ministry of Foreign Affairs / Gaza MoH / Lancet',
    sourceUrl: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext',
    tier: 'verified',
  },
  {
    year: '2024',
    title: 'ICJ Orders Provisional Measures / ICC Issues Arrest Warrants',
    description: 'The ICJ orders Israel to prevent genocide in Gaza (Jan). The ICJ rules the occupation itself is illegal (Jul). The ICC issues arrest warrants for Netanyahu and Gallant for war crimes and crimes against humanity (Nov).',
    source: 'ICJ / ICC official records',
    sourceUrl: 'https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges',
    tier: 'verified',
  },
]

export const ISRAEL_DOSSIER_EXPANDED_INCIDENTS: DossierDocumentedIncident[] = [  // ─── NEW INCIDENT: Jabalia Refugee Camp ───
  {
    title: 'Jabalia Refugee Camp — Repeated Strikes on Densest Civilian Area',
    date: 'October 31, 2023 — ongoing through 2024',
    location: 'Jabalia Refugee Camp, Northern Gaza',
    summary: 'Israel conducted multiple large-scale airstrikes on Jabalia refugee camp, one of the most densely populated places on Earth (116,000 people in 1.4 km²). The first strike on October 31, 2023 hit a residential area, killing over 120 people. Israel stated it was targeting a Hamas commander. Subsequent strikes in November 2023 and throughout 2024 continued hitting residential buildings, UN shelters, and market areas within the camp.',
    evidence: 'Satellite imagery from Planet Labs showed at least 15 large craters consistent with MK-84 2,000-pound bombs in a residential area. Euro-Med Human Rights Monitor documented the use of at least six heavy bombs in the first attack alone. CNN geolocated video of the aftermath, confirming residential buildings were the primary structures destroyed.',
    sources: [
      { label: 'Euro-Med Monitor — Documentation of Jabalia strikes', url: 'https://euromedmonitor.org/en/article/5908' },
      { label: 'Al Jazeera — What we know so far about the Jabalia attack', url: 'https://www.aljazeera.com/news/2023/11/1/israels-deadly-attack-on-the-jabalia-refugee-camp-what-we-know-so-far' },
    ],
    multimedia: [
      { type: 'video', label: 'Al Jazeera — Photo report on Gaza strike aftermath', url: 'https://www.aljazeera.com/gallery/2023/11/4/israel-ramps-up-attacks-in-gaza-striking-schools-hospitals-and-mosques' },
    ],
    tier: 'verified',
    casualties: { killed: 120, injured: 280 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  // ─── NEW INCIDENT: Al-Ahli Arab Hospital ───
  {
    title: 'Al-Ahli Arab Hospital Explosion — Disputed Responsibility',
    date: 'October 17, 2023',
    location: 'Al-Ahli Arab Hospital, Gaza City',
    summary: 'A massive explosion in the courtyard of Al-Ahli Arab Hospital killed an estimated 100-300 people sheltering there. Initial Palestinian reports blamed an Israeli airstrike. Israel claimed a misfired Palestinian Islamic Jihad rocket caused the explosion. Multiple independent investigations reached conflicting conclusions.',
    evidence: 'AP visual analysis and Human Rights Watch found evidence more consistent with a rocket than a large air-dropped bomb, while Forensic Architecture challenged key elements of Israel\'s public narrative and argued the available evidence remained inconclusive. The crater size was smaller than typical MK-84 impacts. U.S. intelligence assessed with "low confidence" it was a Palestinian rocket misfire. No party has provided conclusive evidence.',
    sources: [
      { label: 'AP — Visual analysis of the Al-Ahli hospital blast', url: 'https://apnews.com/article/israel-palestinians-hamas-war-hospital-rocket-gaza-e0fa550faa4678f024797b72132452e3' },
      { label: 'Forensic Architecture — Israeli disinformation and Al-Ahli hospital', url: 'https://www.forensicarchitecture.org/investigation/israeli-disinformation-al-ahli-hospital' },
      { label: 'Human Rights Watch — Hospital investigation', url: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Forensic Architecture — Blast sequence analysis', url: 'https://www.forensicarchitecture.org/investigation/israeli-disinformation-al-ahli-hospital' },
    ],
    tier: 'circumstantial',
    casualties: { killed: 200, injured: 500 },
  },
  // ─── NEW INCIDENT: Systematic Destruction of Universities ───
  {
    title: 'Systematic Destruction of Every University in Gaza',
    date: 'October 2023 — March 2026',
    location: 'All university campuses in Gaza',
    summary: 'All 12 universities in Gaza have been damaged or destroyed by Israeli military operations, including the Islamic University of Gaza, Al-Azhar University, and Al-Aqsa University. Satellite imagery shows controlled demolitions of campus buildings weeks after Israeli forces secured the areas — suggesting destruction beyond military necessity.',
    evidence: 'Euro-Med Human Rights Monitor documented the destruction of all 12 institutions using satellite imagery comparisons. Forensic Architecture published spatial analysis showing several university buildings were demolished by controlled explosions rather than airstrikes, indicating deliberate destruction rather than collateral damage. UNESCO condemned the "scholasticide" — the systematic destruction of educational infrastructure.',
    sources: [
      { label: 'Euro-Med Monitor — Complete destruction of Gaza universities', url: 'https://euromedmonitor.org/en/article/6129' },
      { label: 'UNESCO — Gaza education emergency updates', url: 'https://www.unesco.org/en/gaza/education' },
      { label: 'Forensic Architecture — Spatial analysis of Israeli military conduct in Gaza', url: 'https://content.forensic-architecture.org/wp-content/uploads/2024/10/Summary-of-Findings_Spatial-Analysis-of-the-Israeli-militarys-conduct-in-Gaza-since-October-2023.pdf' },
    ],
    multimedia: [
      { type: 'photo-essay', label: 'Satellite before/after imagery of all 12 campuses', url: 'https://euromedmonitor.org/en/article/6129' },
    ],
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  // ─── NEW INCIDENT: Destruction of Al-Shifa Hospital ───
  {
    title: 'Al-Shifa Hospital Siege and Destruction',
    date: 'November 2023 — March 2024',
    location: 'Al-Shifa Hospital, Gaza City',
    summary: 'Israeli forces besieged and raided Al-Shifa Hospital — Gaza\'s largest medical complex — twice. The first raid (November 15, 2023) was justified by claims of a Hamas command center beneath the hospital. Israel presented video of a tunnel shaft and a few weapons but no evidence of the extensive underground complex initially described. The second raid (March 18, 2024) lasted two weeks and left the hospital in ruins. Over 400 people were killed in and around the hospital during the two operations.',
    evidence: 'Israel released video showing a tunnel shaft and corridor beneath Al-Shifa during the first raid, along with a small cache of weapons. Independent analysts, including the Washington Post, found the evidence fell short of the claimed "command and control center." The second raid resulted in near-total destruction of the facility. WHO reported the hospital was rendered "a death zone" and "an empty shell."',
    sources: [
      { label: 'Washington Post — Analysis of Israel\'s Al-Shifa evidence', url: 'https://www.washingtonpost.com/world/2023/11/17/israel-hamas-al-shifa-hospital-evidence/' },
      { label: 'WHO — High-risk mission to Al-Shifa hospital', url: 'https://www.emro.who.int/opt/news/who-leads-very-high-risk-joint-humanitarian-mission-to-al-shifa-hospital-in-gaza.html' },
      { label: 'WHO — Six months of war leave Al-Shifa hospital in ruins', url: 'https://www.who.int/news/item/06-04-2024-six-months-of-war-leave-al-shifa-hospital-in-ruins--who-mission-reports' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO — Post-raid mission report from Al-Shifa', url: 'https://www.who.int/news/item/06-04-2024-six-months-of-war-leave-al-shifa-hospital-in-ruins--who-mission-reports' },
      { type: 'investigation', label: 'Washington Post — Evaluating the tunnel evidence', url: 'https://www.washingtonpost.com/world/2023/11/17/israel-hamas-al-shifa-hospital-evidence/' },
    ],
    tier: 'verified',
    casualties: { killed: 400 },
  },
  // ─── NEW INCIDENT: Starvation as Weapon ───
  {
    title: 'Deliberate Starvation — Aid Blocked While Famine Declared',
    date: 'January 2024 — ongoing',
    location: 'Northern Gaza',
    summary: 'The Integrated Food Security Phase Classification (IPC) — the global authority on hunger — declared famine in northern Gaza in March 2024, making it the first official famine declaration since 2017 Somalia. Israel was documented blocking, delaying, and restricting humanitarian aid delivery while the population starved. The IPC found that 100% of Gaza\'s population was in crisis-level food insecurity or worse.',
    evidence: 'The IPC Famine Review Committee confirmed famine conditions in northern Gaza. COGAT (Israeli military body controlling aid) approved only 37% of humanitarian aid missions in November 2024. WFP reported that food aid trucks were held at checkpoints for days. Multiple videos showed Israeli settlers and soldiers physically blocking aid convoys. Documented cases of children dying from malnutrition were reported by WHO, UNICEF, and MSF.',
    sources: [
      { label: 'IPC — Famine confirmed in northern Gaza', url: 'https://www.ipcinfo.org/ipc-country-analysis/details-map/en/c/1157345/' },
      { label: 'WFP — "Catastrophic hunger" in Gaza', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { label: 'WHO — People in Gaza starving, sick and dying as aid blockade continues', url: 'https://www.who.int/news/item/12-05-2025-people-in-gaza-starving--sick-and-dying-as-aid-blockade-continues' },
      { label: 'Reuters — Israeli settlers block Gaza aid convoys', url: 'https://www.reuters.com/world/middle-east/israeli-activists-block-gaza-aid-trucks-2024-02-12/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'CNN — Mothers and babies trapped in Gaza\'s starvation siege', url: 'https://www.cnn.com/2024/03/06/middleeast/israel-gaza-starvation-siege-mothers-babies-intl' },
      { type: 'document', label: 'IPC Famine Review Committee Report', url: 'https://www.ipcinfo.org/ipc-country-analysis/details-map/en/c/1157345/' },
    ],
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  // ─── NEW INCIDENT: Killing of Journalist Shireen Abu Akleh ───
  {
    title: 'Killing of Journalist Shireen Abu Akleh',
    date: 'May 11, 2022',
    location: 'Jenin Refugee Camp, West Bank',
    summary: 'Al Jazeera journalist Shireen Abu Akleh, a Palestinian-American, was shot and killed while covering an Israeli military raid in Jenin refugee camp. She was wearing a clearly marked press vest and helmet. Israeli forces initially blamed Palestinian gunfire, then acknowledged an Israeli soldier "likely" fired the fatal shot. The U.S. State Department found no reason to pursue further investigation despite Abu Akleh\'s American citizenship.',
    evidence: 'CNN, AP, The Washington Post, and Bellingcat all conducted independent video and audio analyses concluding the fatal shot came from an Israeli military convoy and that no active Palestinian gunfire was present in the immediate vicinity. The UN OHCHR similarly stated the available information was consistent with fire from Israeli security forces and inconsistent with indiscriminate armed activity by Palestinians at the location. Israel later acknowledged there was a high possibility an Israeli soldier fired the shot.',
    sources: [
      { label: 'CNN — Independent investigation into the killing', url: 'https://www.cnn.com/2022/05/24/middleeast/shireen-abu-akleh-jenin-killing-investigation-cmd-intl' },
      { label: 'Bellingcat — Geolocation and audio reconstruction', url: 'https://www.bellingcat.com/news/mena/2022/05/14/unravelling-the-killing-of-shireen-abu-akleh/' },
      { label: 'UN OHCHR — Statement on killing of Shireen Abu Akleh', url: 'https://www.ohchr.org/en/press-briefing-notes/2022/06/killing-journalist-occupied-palestinian-territory' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Bellingcat — Geolocated shooting sequence', url: 'https://www.bellingcat.com/news/mena/2022/05/14/unravelling-the-killing-of-shireen-abu-akleh/' },
    ],
    tier: 'verified',
  },
  // ─── NEW INCIDENT: Flour Massacre ───
  {
    title: '"Flour Massacre" — Aid Seekers Killed While Gathering Food',
    date: 'February 29, 2024',
    location: 'Al-Rashid Street, Gaza City',
    summary: 'Israeli forces opened fire on Palestinians crowding around aid trucks in Gaza City, killing at least 112 people and wounding over 760. Israel said soldiers fired after feeling threatened by the crowd and that some casualties occurred in a stampede. Multiple videos showed gunfire striking people as they fled. The event became known as the "flour massacre."',
    evidence: 'Eyewitness videos analyzed by CNN and BBC showed sustained gunfire as crowds ran away from the trucks. Doctors at Al-Shifa hospital reported gunshot wounds as the primary cause of death among many victims. The U.S. blocked an initial UN Security Council statement condemning the killings.',
    sources: [
      { label: 'CNN — Videos and eyewitness accounts of deadly aid delivery', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-investigation-cmd' },
      { label: 'BBC — What happened in Gaza aid convoy incident?', url: 'https://www.bbc.com/news/world-middle-east-68445973' },
      { label: 'UN News — Secretary-General appalled by aid convoy killings', url: 'https://news.un.org/en/story/2024/03/1147157' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN — Convoy shooting evidence review', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-investigation-cmd' },
    ],
    tier: 'verified',
    casualties: { killed: 112, injured: 760 },
  },
  // ─── NEW INCIDENT: Rafah Tent Camp Strike ───
  {
    title: 'Rafah Tent Camp Fire — Families Burned Alive in Designated Safe Zone',
    date: 'May 26, 2024',
    location: 'Tal al-Sultan, Rafah',
    summary: 'An Israeli airstrike hit a tent camp for displaced families in Tal al-Sultan, Rafah — an area Israel had designated as a humanitarian safe zone. The strike triggered a massive fire that burned through tents and makeshift shelters. At least 45 people were killed, including many women and children, with victims reported burned alive or decapitated. The strike came two days after the ICJ ordered Israel to halt its Rafah offensive.',
    evidence: 'Videos verified by Reuters, AP, and CNN showed charred bodies, children\'s remains, and burning tents in a densely packed camp. Israel said it was targeting two Hamas officials and blamed secondary explosions, but independent analysts said the munitions and fire spread still raised serious questions about proportionality and the designation of the site as a safe area.',
    sources: [
      { label: 'Reuters — Rafah camp strike verified footage', url: 'https://www.reuters.com/world/middle-east/israeli-strike-rafah-kills-displaced-palestinians-camp-fire-2024-05-27/' },
      { label: 'AP — Rafah strike aftermath and casualty reports', url: 'https://apnews.com/article/israel-palestinians-hamas-war-news-05-27-2024-7b743a848ef8bfbe69a9659a4a5dd047' },
      { label: 'ICJ — May 24 order on Rafah offensive', url: 'https://www.icj-cij.org/case/192' },
    ],
    multimedia: [
      { type: 'video', label: 'Reuters — Verified camp fire footage', url: 'https://www.reuters.com/world/middle-east/israeli-strike-rafah-kills-displaced-palestinians-camp-fire-2024-05-27/' },
    ],
    tier: 'verified',
    casualties: { killed: 45, injured: 249 },
  },
  // ─── NEW INCIDENT: Killing of Hind Rajab ───
  {
    title: 'Killing of Hind Rajab and Ambulance Crew',
    date: 'January 29, 2024',
    location: 'Tel al-Hawa, Gaza City',
    summary: 'Six-year-old Hind Rajab was trapped in a car with six dead relatives after an Israeli attack in Gaza City. She was heard pleading for help in recorded calls with the Palestinian Red Crescent Society. PRCS dispatched an ambulance after coordinating safe passage with Israeli authorities. Hind, the two paramedics, and the ambulance were later found destroyed. Investigations found the car and ambulance had been repeatedly fired upon by an Israeli tank positioned about 13 meters away.',
    evidence: 'Forensic Architecture and Earshot analyzed the audio, bullet patterns, and scene geometry, concluding Israeli tank fire was responsible. The analysis showed over 300 bullet impacts on the vehicle and no evidence supporting claims of active combat at the time of the ambulance dispatch. PRCS released the audio recordings of Hind\'s final calls.',
    sources: [
      { label: 'Forensic Architecture — Hind Rajab investigation', url: 'https://www.forensicarchitecture.org/investigation/the-killing-of-hind-rajab' },
      { label: 'PRCS — Statement on ambulance crew killed attempting Hind rescue', url: 'https://www.palestinercs.org/public/files/image/2024/statements/en%20PRCS%20Amal%20Statement%2011022024.pdf' },
      { label: 'Al Jazeera Fault Lines — Documentary investigation with Forensic Architecture and Earshot', url: 'https://www.aljazeera.com/video/fault-lines/2024/6/21/the-night-wont-end-bidens-war-on-gaza-2' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Forensic Architecture — Spatial reconstruction', url: 'https://www.forensicarchitecture.org/investigation/the-killing-of-hind-rajab' },
    ],
    tier: 'verified',
    casualties: { killed: 3 },
  },
  // ─── NEW INCIDENT: UNRWA Staff Death Toll ───
  {
    title: 'UNRWA Staff Death Toll — Highest UN Death Toll in Any Conflict',
    date: 'October 2023 — ongoing',
    location: 'Throughout Gaza',
    summary: 'Over 230 UNRWA staff members have been killed since October 7, 2023 — the highest number of UN staff killed in any single conflict in the history of the United Nations. UNRWA facilities have been struck over 500 times despite coordinates being shared with Israeli forces. Israel passed legislation banning UNRWA from operating in its territory, threatening the primary aid lifeline for 5.9 million Palestinian refugees.',
    evidence: 'UNRWA Commissioner-General Philippe Lazzarini has formally documented each staff killing. GPS coordinates of all UNRWA facilities were shared with the IDF as required by international humanitarian law. Despite this, UNRWA schools, shelters, and warehouses have been struck repeatedly. Israel\'s Knesset voted to ban UNRWA on October 28, 2024 — a move condemned by the UN Secretary-General, WHO, UNICEF, and 120+ member states.',
    sources: [
      { label: 'UNRWA — Situation reports and staff casualty tracker', url: 'https://www.unrwa.org/resources/reports/unrwa-situation-update' },
      { label: 'UN News — Highest UN staff death toll in any conflict', url: 'https://news.un.org/en/story/2024/11/1157071' },
      { label: 'Al Jazeera — What Israel\'s UNRWA ban means for millions of Palestinians', url: 'https://www.aljazeera.com/news/2025/1/29/what-israels-unrwa-ban-means-for-millions-of-palestinians-by-the-numbers' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA — Complete staff casualty documentation', url: 'https://www.unrwa.org/resources/reports/unrwa-situation-update' },
    ],
    tier: 'verified',
    casualties: { killed: 230 },
  },
  // ─── NEW INCIDENT: Use of AI Targeting Systems ───
  {
    title: '"Lavender" and "Where\'s Daddy?" — AI-Assisted Targeting of Homes',
    date: 'October 2023 — ongoing',
    location: 'Throughout Gaza',
    summary: 'Israeli military sources revealed to +972 Magazine that the IDF used two AI systems: "Lavender," which generated a database of 37,000+ suspected Hamas operatives with minimal human verification (an average of 20 seconds per target), and "Where\'s Daddy?", which tracked targets to their family homes and authorized strikes when they entered. Sources stated the acceptable civilian casualty ratio was 15-20 civilians per low-ranking militant and up to 100+ for senior commanders.',
    evidence: 'Six Israeli intelligence officers provided testimony to +972 Magazine and Local Call, speaking on condition of anonymity. They described the AI systems, the minimal human oversight, and the policy of striking targets at home with their families. The investigation was corroborated by analysis of strike patterns showing a disproportionate number of residential building attacks during nighttime hours. The IDF did not deny the existence of the systems but disputed the characterization of their use.',
    sources: [
      { label: '+972 Magazine — "Lavender": The AI machine directing Israel\'s bombing', url: 'https://www.972mag.com/lavender-ai-israeli-army-gaza/' },
      { label: 'The Guardian — Israel-Gaza AI database airstrikes investigation', url: 'https://www.theguardian.com/world/2024/apr/03/israel-gaza-ai-database-hamas-airstrikes' },
      { label: '+972 Magazine — "Where\'s Daddy?" tracking system', url: 'https://www.972mag.com/mass-assassination-factory-israel-calculated-bombing-gaza/' },
    ],
    multimedia: [
      { type: 'investigation', label: '+972 Magazine — Full investigation with officer testimony', url: 'https://www.972mag.com/lavender-ai-israeli-army-gaza/' },
    ],
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  // ─── NEW INCIDENT: White Phosphorus ───
  {
    title: 'White Phosphorus Use in Populated Areas',
    date: 'October 2023',
    location: 'Gaza City, Southern Lebanon',
    summary: 'Human Rights Watch verified the use of white phosphorus by Israeli forces over populated areas in Gaza City on October 10-11, 2023, and in southern Lebanon. White phosphorus burns at 800°C, causes severe chemical burns that can penetrate to the bone, and reignites when exposed to oxygen. Its use in populated areas violates international humanitarian law.',
    evidence: 'HRW researchers verified 155mm artillery-delivered white phosphorus munitions through video analysis and munition fragment identification. The organization identified the specific munition type as M825A1 155mm smoke projectiles — U.S.-manufactured. The Washington Post summarized the munition\'s effects and the legal controversy surrounding its use in populated areas. The IDF stated it uses white phosphorus "in accordance with international law" but did not deny its use.',
    sources: [
      { label: 'Human Rights Watch — Israel uses white phosphorus in Gaza, Lebanon', url: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon' },
      { label: 'Washington Post — What is white phosphorus and why is it controversial?', url: 'https://www.washingtonpost.com/world/2023/10/13/white-phosphorus-israel-gaza-lebanon/' },
    ],
    multimedia: [
      { type: 'video', label: 'HRW — Video analysis of white phosphorus airburst', url: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon' },
    ],
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
]

export const ISRAEL_DOSSIER_LOBBYING_DATA: DossierLobbyingRecord[] = [
  {
    organization: 'AIPAC (American Israel Public Affairs Committee)',
    amount: '$100M+',
    cycle: '2024 election cycle',
    recipients: 'Pro-Israel candidates across both parties',
    source: 'OpenSecrets',
    sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/aipac/C00104638/summary/2024',
    note: 'AIPAC launched its first-ever Super PAC in 2022, immediately becoming one of the largest spenders in U.S. politics',
  },
  {
    organization: 'United Democracy Project (AIPAC Super PAC)',
    amount: '$41.7M',
    cycle: '2024 primaries',
    recipients: 'Targeted progressive candidates who criticized Israel',
    source: 'FEC filings / OpenSecrets',
    sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/united-democracy-project/C00822007/summary/2024',
    note: 'Largest spender in 2024 Democratic primaries. Defeated Jamaal Bowman ($14.5M spent) and Cori Bush ($8.5M spent)',
  },
  {
    organization: 'Democratic Majority for Israel',
    amount: '$15M+',
    cycle: '2024 cycle',
    recipients: 'Pro-Israel Democrats in competitive primaries',
    source: 'FEC filings',
    sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/democratic-majority-for-israel/C00764126/summary/2024',
  },
  {
    organization: 'Pro-Israel lobby (total — all organizations)',
    amount: '$180M+',
    cycle: '2024 cycle (total)',
    recipients: 'Both parties, federal candidates',
    source: 'OpenSecrets aggregate analysis',
    sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
    note: 'The pro-Israel lobby was the single largest source of PAC spending in the 2024 federal election cycle',
  },
]

export const ISRAEL_DOSSIER_LEGAL_CASES: DossierLegalCase[] = [
  {
    title: 'South Africa v. Israel — Genocide Convention Case',
    court: 'International Court of Justice (ICJ)',
    date: 'December 29, 2023 — ongoing',
    ruling: 'ICJ ordered provisional measures (Jan 26, 2024): Israel must prevent genocide, ensure humanitarian aid, prevent incitement. Additional order (Mar 28, 2024): Israel must ensure unhindered food aid. The court found it "plausible" that Israel\'s actions could constitute genocide.',
    significance: 'First time the ICJ has ordered provisional measures against Israel under the Genocide Convention. Supported by 50+ countries intervening on South Africa\'s behalf.',
    sourceUrl: 'https://www.icj-cij.org/case/192',
    status: 'ongoing',
  },
  {
    title: 'ICC Arrest Warrants — Netanyahu and Gallant',
    court: 'International Criminal Court (ICC)',
    date: 'November 21, 2024',
    ruling: 'Pre-Trial Chamber I issued arrest warrants for Israeli PM Benjamin Netanyahu and former Defense Minister Yoav Gallant for war crimes and crimes against humanity including: starvation as a method of warfare, murder, persecution, and other inhumane acts.',
    significance: 'First arrest warrants issued for a sitting Western-allied head of state since the ICC\'s establishment. ICC member states (124 countries) are legally obligated to arrest Netanyahu if he enters their territory.',
    sourceUrl: 'https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges',
    status: 'decided',
  },
  {
    title: 'ICJ Advisory Opinion — Legality of the Occupation',
    court: 'International Court of Justice (ICJ)',
    date: 'July 19, 2024',
    ruling: 'The court found Israel\'s continued presence in the Occupied Palestinian Territory is unlawful, that settlements violate Article 49 of the Fourth Geneva Convention, and that Israel\'s policies amount to de facto annexation and apartheid.',
    significance: 'First time the world\'s highest court applied the term "apartheid" to Israeli policies. Called on all states to distinguish between Israel and the occupied territories in their dealings.',
    sourceUrl: 'https://www.icj-cij.org/node/204176',
    status: 'decided',
  },
  {
    title: 'ICJ Advisory Opinion — Separation Wall',
    court: 'International Court of Justice (ICJ)',
    date: 'July 9, 2004',
    ruling: 'The court ruled 14-1 that the construction of the wall in the occupied Palestinian territory is contrary to international law. Israel was obligated to dismantle it and make reparation for damage caused.',
    significance: 'Israel refused to comply. 22 years later, the wall remains, now 712 km long, with 85% built inside the West Bank rather than on the Green Line.',
    sourceUrl: 'https://www.icj-cij.org/case/131',
    status: 'decided',
  },
]

export const ISRAEL_DOSSIER_EXPANDED_STATS: DossierStatCard[] = [
  // ─── MEDIA & INFORMATION ───
  {
    value: '176',
    label: 'Mosques destroyed in Gaza (Oct 2023 — Mar 2026)',
    source: 'Euro-Med Human Rights Monitor',
    sourceUrl: 'https://euromedmonitor.org/en/article/6129',
    category: 'infrastructure',
    lastVerified: '2026-03-24',
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.legal,
  },
  {
    value: '>1,700',
    label: 'Health workers reported killed in Gaza',
    source: 'OCHA Reported Impact Snapshot, 1 Apr. 2026',
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.sourceUrl,
    category: 'infrastructure',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
    details: [
      { title: 'Source boundary', text: 'OCHA attributes this figure to the Gaza Ministry of Health as of 7 October 2025. It is a reported figure and should be cited with attribution.' },
      { title: 'Health system context', text: 'The same OCHA snapshot reports that Gaza health services remain mostly partial or non-functional, with no normal hospital capacity restored.' },
    ],
  },
  {
    value: '320,600+',
    label: 'Housing units estimated damaged in Gaza',
    source: 'OCHA / UNOSAT satellite damage assessment',
    sourceUrl: 'https://www.ochaopt.org/content/humanitarian-situation-report-10-april-2026',
    category: 'infrastructure',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    tier: 'verified',
    details: [
      { title: 'Scale of damage', text: 'OCHA cites UNOSAT satellite imagery analysis estimating more than 320,600 damaged housing units as of 11 October 2025.' },
      { title: 'Assessment status', text: 'Shelter Cluster partners began further damage assessments in December 2025 to quantify repair needs and prioritize response.' },
    ],
  },
  {
    value: '$18.5B',
    label: 'Estimated reconstruction cost for Gaza (as of mid-2024)',
    source: 'World Bank — Gaza Interim Damage Assessment',
    sourceUrl: 'https://www.worldbank.org/en/news/press-release/2024/04/02/joint-world-bank-un-report-assesses-damage-to-gaza-s-infrastructure',
    category: 'infrastructure',
    lastVerified: '2026-03-24',
    tier: 'verified',
    note: 'This estimate was made in April 2024 when destruction was at ~50% of current levels. Updated estimates exceed $40B.',
  },
  // ─── ANTI-BDS LEGISLATION ───
  {
    value: '38',
    label: 'U.S. states with anti-BDS laws or executive orders',
    source: 'Palestine Legal — State-by-state tracker',
    sourceUrl: 'https://palestinelegal.org/righttoboycott',
    category: 'domestic',
    lastVerified: '2026-03-24',
    tier: 'verified',
    details: [
      { title: 'What these laws do', text: 'Anti-BDS (Boycott, Divestment, Sanctions) laws require state contractors to sign pledges not to boycott Israel. Several states have barred individuals, companies, and pension funds from engaging in boycotts of Israel as a condition of doing business with the government.' },
      { title: 'First Amendment concerns', text: 'Federal courts have issued conflicting rulings on constitutionality. The ACLU describes these laws as "unconstitutional" restrictions on political speech. The 8th Circuit upheld Arkansas\'s law; the 5th and 11th Circuits have heard challenges.' },
    ],
  },
  {
    value: '$180M+',
    label: 'Total pro-Israel lobby spending in 2024 U.S. federal elections',
    source: 'OpenSecrets aggregate data',
    sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
    category: 'domestic',
    lastVerified: '2026-03-24',
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.domestic,
    details: [
      { title: 'AIPAC\'s first Super PAC', text: 'In 2022, AIPAC launched the United Democracy Project — its first-ever Super PAC. It immediately became one of the largest spenders in U.S. politics, spending $41.7M in 2024 Democratic primaries alone.' },
      { title: 'Primary defeats', text: 'AIPAC-backed challengers defeated progressive incumbents Jamaal Bowman (NY-16, $14.5M spent) and Cori Bush (MO-1, $8.5M spent) — two vocal critics of U.S. military aid to Israel.' },
    ],
  },
  // ─── COMPARATIVE ───
  {
    value: '83 years',
    label: 'Israeli life expectancy vs. 74 in Palestine (9-year gap)',
    source: 'World Bank Development Indicators',
    sourceUrl: 'https://api.worldbank.org/v2/country/PS;IL/indicator/SP.DYN.LE00.IN?format=json&per_page=200',
    category: 'comparative',
    lastVerified: '2026-03-24',
    tier: 'verified',
  },
  {
    value: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.value,
    label: 'Inflation-adjusted U.S. aid obligations to Israel',
    source: 'Congressional Research Service RL33222',
    sourceUrl: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.sourceUrl,
    category: 'comparative',
    lastVerified: ISRAEL_DOSSIER_LAST_VERIFIED,
    tier: 'verified',
    note: 'CRS estimate for 1946-2024 in constant 2024 dollars',
    details: [
      { title: 'The comparison', text: 'CRS identifies Israel as the largest cumulative recipient of U.S. foreign assistance since World War II and estimates $298B in inflation-adjusted obligations from 1946 through 2024.' },
      { title: 'Budget context', text: 'Comparisons to domestic programs are analytical, not proof that one appropriation directly displaced another. Keep this figure tied to CRS and avoid presenting it as a causal claim about any specific U.S. program.' },
    ],
  },
]

export const ISRAEL_DOSSIER_SOURCE_CATEGORY_META: Record<'all' | DossierSourceCategory, { label: string; description: string }> = {
  all: { label: 'All sources', description: 'Every linked source used by the live dossier.' },
  'public-record': { label: 'Public record', description: 'Government, court, legislative, and official institutional records.' },
  'un-international': { label: 'UN / international', description: 'UN agencies, ICJ, ICC, WHO, UNICEF, OCHA, IPC, and international bodies.' },
  'peer-reviewed': { label: 'Peer reviewed', description: 'Journal articles, academic surveys, and research institutions.' },
  'monitor-ngo': { label: 'Monitor / NGO', description: 'Rights monitors, press-freedom trackers, and specialist documentation groups.' },
  'press-osint': { label: 'Press / OSINT', description: 'Established reporting, visual investigations, and open-source forensic work.' },
  other: { label: 'Other', description: 'Supplemental context that should be checked before publication use.' },
}

export const ISRAEL_DOSSIER_COURSE_PATH: DossierCourseModule[] = [
  {
    id: 'source-file',
    title: 'Build the source file',
    kicker: 'Module 1',
    objective: 'Turn the dossier into a claim-by-claim source file with one row per claim, one source class, one confidence label, and one next verification step.',
    sourceAnchors: [
      { label: 'Congressional Research Service RL33222', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.sourceUrl, category: 'public-record' },
      { label: 'OCHA reported impact snapshot', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.sourceUrl, category: 'un-international' },
      { label: 'Committee to Protect Journalists casualty tracker', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.journalistDeaths.sourceUrl, category: 'monitor-ngo' },
    ],
    workProduct: 'A source ledger with claim text, source URL, custodian, access date, evidence class, confidence label, and publication status.',
    qualityGate: 'No claim moves into prose until the source row states what the source proves and what it does not prove.',
    exercise: 'Take the four public-record figures in the masthead and reduce each to a one-sentence claim with source boundary language.',
    instituteSlug: 'build-israel-dossier-source-file',
    artifact: {
      label: 'Source ledger template',
      description: 'CSV claim ledger with sample CRS, OCHA, UNICEF, CPJ, and ICJ rows plus confidence and publication-status columns.',
      url: '/israel-dossier/templates/source-ledger.csv',
      filename: 'israel-dossier-source-ledger.csv',
      format: 'CSV',
    },
  },
  {
    id: 'aid-ledger',
    title: 'Audit the aid ledger',
    kicker: 'Module 2',
    objective: 'Separate long-run CRS aid obligations, annual MOU funding, supplemental appropriations, and proposed arms sales so dollar figures do not collapse into one unsupported total.',
    sourceAnchors: [
      { label: 'Congressional Research Service RL33222', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.sourceUrl, category: 'public-record' },
      { label: 'H.R.815 Israel Security Supplemental', url: 'https://www.congress.gov/bill/118th-congress/house-bill/815', category: 'public-record' },
      { label: 'DSCA major arms sales notices', url: 'https://www.dsca.mil/press-media/major-arms-sales', category: 'public-record' },
    ],
    workProduct: 'A money-trail table that distinguishes obligations, appropriations, authorizations, sales notices, deliveries, and analysis.',
    qualityGate: 'Every amount must name the record type and time period; comparisons must be labeled as analysis unless the source makes the comparison itself.',
    exercise: 'Trace the $298B CRS figure, the $3.8B annual MOU, and H.R.815 into separate rows before writing any summary sentence.',
    instituteSlug: 'audit-israel-aid-records',
    artifact: {
      label: 'Aid ledger workbook',
      description: 'CSV money-trail table separating obligations, current-dollar figures, MOU baseline funding, supplemental appropriations, and DSCA notices.',
      url: '/israel-dossier/templates/aid-ledger.csv',
      filename: 'israel-dossier-aid-ledger.csv',
      format: 'CSV',
    },
  },
  {
    id: 'humanitarian-figures',
    title: 'Verify humanitarian figures',
    kicker: 'Module 3',
    objective: 'Keep reported casualty figures, survey estimates, institutional verification, and source attribution visibly separate.',
    sourceAnchors: [
      { label: 'OCHA reported impact snapshot', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.gazaFatalities.sourceUrl, category: 'un-international' },
      { label: 'UNICEF State of Palestine update', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.childrenKilled.sourceUrl, category: 'un-international' },
      { label: 'The Lancet Global Health survey', url: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext', category: 'peer-reviewed' },
    ],
    workProduct: 'An OCHA / UNICEF attribution table that names the reporting body, the original source, the date range, and the verification boundary.',
    qualityGate: 'Reported figures must stay attributed; survey estimates must be labeled as estimates; neither can be presented as a court finding.',
    exercise: 'Rewrite one humanitarian paragraph three ways: verified record, reported figure, and analytical context.',
    instituteSlug: 'verify-gaza-humanitarian-figures',
    artifact: {
      label: 'Humanitarian attribution table',
      description: 'CSV attribution matrix for reported figures, estimates, verified samples, original sources, date ranges, and safe wording.',
      url: '/israel-dossier/templates/humanitarian-attribution-table.csv',
      filename: 'israel-dossier-humanitarian-attribution-table.csv',
      format: 'CSV',
    },
  },
  {
    id: 'incident-evidence',
    title: 'Test incident evidence',
    kicker: 'Module 4',
    objective: 'Grade incident records by evidence type: official admission, video, forensic reconstruction, survivor testimony, press investigation, or contested account.',
    sourceAnchors: [
      { label: 'Forensic Architecture - Hind Rajab investigation', url: 'https://forensic-architecture.org/investigation/the-killing-of-hind-rajab', category: 'press-osint' },
      { label: 'World Central Kitchen statement', url: 'https://wck.org/news/gaza-team-update/', category: 'monitor-ngo' },
      { label: 'OHCHR Gaza update report', url: 'https://www.ohchr.org/sites/default/files/documents/countries/opt/20241106-Gaza-Update-Report-OPT.pdf', category: 'un-international' },
    ],
    workProduct: 'An incident matrix with date, location, alleged actor, evidence type, source links, disputed elements, and minimum defensible wording.',
    qualityGate: 'The language must not upgrade allegation into finding unless the cited record supports that level of certainty.',
    exercise: 'Choose one incident card and write the safest possible summary using only source-supported verbs.',
    instituteSlug: 'test-israel-dossier-incident-evidence',
    artifact: {
      label: 'Incident evidence matrix',
      description: 'CSV event matrix for evidence type, source ladder, disputed elements, supported wording, unsafe wording, and next checks.',
      url: '/israel-dossier/templates/incident-evidence-matrix.csv',
      filename: 'israel-dossier-incident-evidence-matrix.csv',
      format: 'CSV',
    },
  },
  {
    id: 'legal-record',
    title: 'Read the legal record',
    kicker: 'Module 5',
    objective: 'Distinguish court orders, advisory opinions, warrants, allegations, pleadings, and commentary before using legal language.',
    sourceAnchors: [
      { label: 'ICJ South Africa v. Israel case docket', url: 'https://www.icj-cij.org/case/192', category: 'un-international' },
      { label: 'ICJ advisory opinion on the occupied Palestinian territory', url: 'https://www.icj-cij.org/node/204176', category: 'un-international' },
      { label: 'ICC Situation in the State of Palestine', url: 'https://www.icc-cpi.int/situations/palestine', category: 'un-international' },
    ],
    workProduct: 'A legal-status brief that states jurisdiction, procedural posture, exact holding or order, and what remains undecided.',
    qualityGate: 'Legal terms such as genocide, apartheid, warrant, ruling, and obligation must match the procedural status of the cited document.',
    exercise: 'Create a four-row legal record: ICJ provisional measures, ICJ advisory opinion, ICC warrants, and unresolved merits questions.',
    instituteSlug: 'read-israel-dossier-legal-records',
    artifact: {
      label: 'Legal-status brief',
      description: 'CSV legal-record brief that separates court, body, document type, procedural posture, safe language, and unsafe language.',
      url: '/israel-dossier/templates/legal-status-brief.csv',
      filename: 'israel-dossier-legal-status-brief.csv',
      format: 'CSV',
    },
  },
  {
    id: 'publishable-briefing',
    title: 'Write the publishable briefing',
    kicker: 'Module 6',
    objective: 'Convert the source file into a reader-facing briefing that preserves confidence labels, dates, access notes, and open questions.',
    sourceAnchors: [
      { label: 'Veritas Israel Dossier', url: 'https://veritasworldwide.com/israel-dossier', category: 'other' },
      { label: 'Veritas source methodology chapter', url: 'https://veritasworldwide.com/chapter/chapter-29', category: 'other' },
      { label: 'Congressional Research Service RL33222', url: ISRAEL_DOSSIER_PUBLIC_RECORDS.aidObligations.sourceUrl, category: 'public-record' },
    ],
    workProduct: 'A 900-word briefing with verified facts, attributed figures, analysis sections, source notes, and unresolved checks.',
    qualityGate: 'A skeptical editor must be able to trace every sentence containing a number, legal conclusion, or incident claim back to a source row.',
    exercise: 'Draft a short briefing from the aid ledger and humanitarian attribution table without using unsupported certainty language.',
    instituteSlug: 'write-israel-dossier-briefings',
    artifact: {
      label: 'Publishable briefing outline',
      description: 'Markdown briefing frame for verified floor, reported figures, aid records, incident evidence, legal posture, and editor QA.',
      url: '/israel-dossier/templates/publishable-briefing-outline.md',
      filename: 'israel-dossier-publishable-briefing-outline.md',
      format: 'Markdown',
    },
  },
]

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

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
  category: DossierCategory
  note?: string
  lastVerified: string
  details?: DossierStatDetail[]
  imageUrl?: string
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
      { type: 'video', label: 'Al Jazeera Fault Lines — Documentary (2025)', url: 'https://www.aljazeera.com/program/fault-lines/2025/10/21/hind-rajab' },
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
      { type: 'investigation', label: 'Al Jazeera — Mapping the three strike locations', url: 'https://www.aljazeera.com/news/2024/4/2/what-is-world-central-kitchen-which-lost-seven-workers-in-an-israeli-strike' },
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
      { type: 'video', label: 'Al Jazeera — Documentary on Nuseirat massacre', url: 'https://www.aljazeera.com/program/investigations/2024/8/14/investigation-nuseirat' },
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

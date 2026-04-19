import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'
import { trackSupportClick } from '../lib/ga4'
import CommunityForum from '../components/CommunityForum'
import DisputeStory from '../components/DisputeStory'
import SharePanel from '../components/SharePanel'
import AdBanner from '../components/AdBanner'
import { TierIcon } from '../components/TierIcons'
import { HISTORICAL_TIMELINE, EXPANDED_INCIDENTS, EXPANDED_STATS, LOBBYING_DATA, LEGAL_CASES, ISRAEL_DOSSIER_CAROUSEL, PINNED_POSTS } from '../data/israelDossierExpanded'
import { CarouselDownloader, PinnedPostDownloader } from '../components/DossierCarousel'
import DossierPDF from '../components/DossierPDF'
import NewsletterSignup from '../components/NewsletterSignup'
import ContentGate from '../components/ContentGate'
import ReadingProgress from '../components/ReadingProgress'
import { buildSubscriptionSuccessPath } from '../lib/subscriptionSuccess'
import { getPreferredImageSrc } from '../lib/imageSources'

/* ═══════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════ */

interface StatCard {
  value: string
  label: string
  source: string
  sourceUrl: string
  category: 'financial' | 'humanitarian' | 'legal' | 'social'
  note?: string
  lastVerified: string          // ISO date
  details?: StatDetail[]        // expandable drill-down
  imageUrl?: string             // contextual photo for the stat
}

interface StatDetail {
  title: string
  text: string
  sourceUrl?: string
}

interface DocumentedIncident {
  title: string
  date: string
  location: string
  summary: string
  evidence: string
  sources: { label: string; url: string }[]
  multimedia: { type: 'video' | 'investigation' | 'photo-essay' | 'document'; label: string; url: string }[]
  tier: 'verified' | 'circumstantial'
  casualties?: { killed: number; injured?: number }
  imageUrl?: string             // contextual photo for the incident
}

interface MoneyTrailNode {
  id: string
  label: string
  amount: string
  type: 'legislation' | 'weapon' | 'delivery' | 'impact'
  date: string
  detail: string
  sourceUrl: string
  children?: string[]
}

interface RecordFinding {
  eyebrow: string
  title: string
  body: string
  icon: string
  sources: { label: string; url: string }[]
}

interface ReaderPath {
  id: string
  label: string
  title: string
  body: string
  icon: string
  stats: string[]
}

interface FeaturedMediaCard {
  title: string
  summary: string
  source: string
  url: string
  type: 'video' | 'investigation' | 'document' | 'photo-essay'
  imageUrl?: string
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY META
   ═══════════════════════════════════════════════════════════ */

const CATEGORY_META = {
  financial: { label: 'U.S. Aid & Military Spending', icon: 'money', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/F-35A_flight_%28cropped%29.jpg/1280px-F-35A_flight_%28cropped%29.jpg', headerCaption: 'F-35A Lightning II — The U.S. has committed over $310 billion in military and economic aid to Israel since 1948' },
  humanitarian: { label: 'Humanitarian Impact', icon: 'warning', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/UNRWA_school_in_Gaza.jpg/1280px-UNRWA_school_in_Gaza.jpg', headerCaption: 'UNRWA school shelter in Gaza — Humanitarian organizations document the ongoing crisis' },
  legal: { label: 'International Law & UN Record', icon: 'scale', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/United_Nations_General_Assembly_Hall_%283%29.jpg/1280px-United_Nations_General_Assembly_Hall_%283%29.jpg', headerCaption: 'UN General Assembly Hall — The U.S. has cast 53+ vetoes shielding Israel from Security Council resolutions' },
  social: { label: 'Domestic Policy & Public Opinion', icon: 'pillar', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/United_States_Capitol_-_west_front.jpg/1280px-United_States_Capitol_-_west_front.jpg', headerCaption: 'U.S. Capitol — Domestic lobbying and anti-BDS legislation shape U.S. policy toward Israel' },
}

const LATEST_DOSSIER_SWEEP = '2026-03-24'

/* ═══════════════════════════════════════════════════════════
   STATISTICS DATA — Every figure linked to primary sources
   ═══════════════════════════════════════════════════════════ */

const STATS: StatCard[] = [
  // ─── FINANCIAL ───
  {
    value: '$310B+',
    label: 'Total U.S. aid to Israel (inflation-adjusted, 1948–2024)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/US_one_hundred_dollar_bill%2C_series_2006.jpg/640px-US_one_hundred_dollar_bill%2C_series_2006.jpg',
    source: 'Congressional Research Service, Report RL33222',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    category: 'financial',
    lastVerified: '2026-03-24',
    details: [
      { title: 'What this means', text: 'Israel is the largest cumulative recipient of U.S. foreign assistance since World War II. The majority is military aid — grants that do not need to be repaid.' },
      { title: 'Recent acceleration', text: 'Since October 2023, an additional $26.4B supplemental package was approved on top of the $3.8B annual baseline — the fastest acceleration of aid since the Camp David Accords.' },
    ],
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/F-35A_flight_%28cropped%29.jpg/640px-F-35A_flight_%28cropped%29.jpg',
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
    value: '75,000+',
    label: 'Palestinians killed in Gaza since October 7, 2023',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg/640px-Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg',
    source: 'Gaza Ministry of Health / Lancet field survey (Jan 2025)',
    sourceUrl: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    note: 'Independent Lancet survey estimated 75,200 violent deaths — 35% higher than MoH count at the time',
    details: [
      { title: 'Independent verification', text: 'A population-representative household survey published in The Lancet Global Health (2025) estimated 75,200 violent deaths and 8,540 excess non-violent deaths between Oct 7, 2023 and Jan 5, 2025. The Gaza MoH figure for this period was 49,090 — 34.7% below the survey estimate.' },
      { title: 'Life-years lost', text: 'Researchers estimated over 3 million life-years lost as of July 2025 — reflecting the disproportionate killing of children and young adults.', sourceUrl: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)02112-9/fulltext' },
      { title: 'Who is being killed', text: 'OHCHR verified that 70% of fatalities in residential buildings were women and children. Airwars independently confirmed 75% correlation between publicly reported victim names and MoH data.' },
    ],
  },
  {
    value: '17,000+',
    label: 'Children killed in Gaza (as of March 2026)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dome_of_the_Rock%2C_Temple_Mount%2C_Jerusalem.jpg/640px-Dome_of_the_Rock%2C_Temple_Mount%2C_Jerusalem.jpg',
    source: 'UNICEF — "Unimaginable Horrors" report',
    sourceUrl: 'https://www.unicef.org/press-releases/unimaginable-horrors-more-50000-children-reportedly-killed-or-injured-gaza-strip',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    note: '50,000+ children killed or injured total. 56,000+ children have lost one or both parents.',
    details: [
      { title: 'Scale', text: 'More children have been killed in Gaza since October 2023 than in all the world\'s conflict zones combined over the previous four years, according to UNICEF.' },
      { title: 'Orphan crisis', text: 'Over 56,000 children have lost one or both parents. UNICEF documented cases of children under 5 being the sole survivors of entire family units.' },
      { title: 'Healthcare collapse', text: 'All pediatric hospitals in northern Gaza have been destroyed or forced to cease operations. Thousands of children requiring surgery have no access to operating theaters.' },
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
    value: '254+',
    label: 'Journalists and media workers killed since October 2023',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Press_photographers_with_cameras.jpg/640px-Press_photographers_with_cameras.jpg',
    source: 'Committee to Protect Journalists (CPJ), March 2026',
    sourceUrl: 'https://cpj.org/2023/10/journalist-casualties-in-the-israel-gaza-conflict/',
    category: 'humanitarian',
    lastVerified: '2026-03-24',
    note: 'More journalists killed than in any conflict since CPJ began tracking in 1992',
    details: [
      { title: '2024 record', text: '2024 was the deadliest year for journalists in CPJ history — 124 killed globally, nearly two-thirds of them Palestinians killed by Israel.', sourceUrl: 'https://cpj.org/special-reports/2024-is-deadliest-year-for-journalists-in-cpj-history-almost-70-percent-killed-by-israel/' },
      { title: '2025 record broken again', text: '2025 matched the record: 126 killed globally, with Israel responsible for 2/3 of all deaths worldwide.', sourceUrl: 'https://cpj.org/special-reports/record-129-press-members-killed-in-2025-israel-responsible-for-2-of-3-of-deaths/' },
      { title: 'Pattern', text: 'CPJ documented cases of journalists killed while wearing press vests, in marked vehicles, or at home with families — suggesting targeting rather than collateral damage.' },
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
      { title: 'Infrastructure destruction', text: 'Over 60% of all housing in Gaza has been damaged or destroyed. UNRWA estimates it would take 80 years to rebuild at pre-war construction rates.' },
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/International_Court_of_Justice.jpg/640px-International_Court_of_Justice.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/United_Nations_General_Assembly_Hall_%283%29.jpg/640px-United_Nations_General_Assembly_Hall_%283%29.jpg',
    source: 'UN Security Council records / Jewish Virtual Library',
    sourceUrl: 'https://jewishvirtuallibrary.org/u-s-vetoes-of-un-security-council-resolutions-critical-to-israel',
    category: 'legal',
    lastVerified: '2026-03-24',
    note: 'More than half of all U.S. vetoes in UNSC history have shielded Israel',
    details: [
      { title: 'What this means', text: 'The United States has used its veto power at the UN Security Council more than 51 times to block resolutions critical of Israel — more than half of all vetoes the U.S. has ever cast. This includes vetoes of ceasefire resolutions during active military operations.' },
      { title: 'Recent vetoes', text: 'Between October 2023 and March 2025, the U.S. vetoed four separate ceasefire resolutions, even as the death toll in Gaza surpassed 40,000.' },
    ],
  }
]
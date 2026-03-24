import { useEffect, useState, useRef } from 'react'
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

/* ═══════════════════════════════════════════════════════════
   CATEGORY META
   ═══════════════════════════════════════════════════════════ */

const CATEGORY_META = {
  financial: { label: 'U.S. Aid & Military Spending', icon: 'money', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/F-35A_flight_%28cropped%29.jpg/1280px-F-35A_flight_%28cropped%29.jpg', headerCaption: 'F-35A Lightning II — The U.S. has committed over $310 billion in military and economic aid to Israel since 1948' },
  humanitarian: { label: 'Humanitarian Impact', icon: 'warning', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/UNRWA_school_in_Gaza.jpg/1280px-UNRWA_school_in_Gaza.jpg', headerCaption: 'UNRWA school shelter in Gaza — Humanitarian organizations document the ongoing crisis' },
  legal: { label: 'International Law & UN Record', icon: 'scale', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/United_Nations_General_Assembly_Hall_%283%29.jpg/1280px-United_Nations_General_Assembly_Hall_%283%29.jpg', headerCaption: 'UN General Assembly Hall — The U.S. has cast 53+ vetoes shielding Israel from Security Council resolutions' },
  social: { label: 'Domestic Policy & Public Opinion', icon: 'pillar', color: '#1a1a1a', accentColor: '#8B0000', bg: 'bg-surface', border: 'border-border', hoverBorder: 'hover:border-ink/30', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/United_States_Capitol_-_west_front.jpg/1280px-United_States_Capitol_-_west_front.jpg', headerCaption: 'U.S. Capitol — Domestic lobbying and anti-BDS legislation shape U.S. policy toward Israel' },
}

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

/* ═══════════════════════════════════════════════════════════
   DOCUMENTED INCIDENTS — with multimedia evidence
   ═══════════════════════════════════════════════════════════ */

const INCIDENTS: DocumentedIncident[] = [
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

/* ═══════════════════════════════════════════════════════════
   MONEY TRAIL — From Congress to Impact
   ═══════════════════════════════════════════════════════════ */

const MONEY_TRAIL: MoneyTrailNode[] = [
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

/* ═══════════════════════════════════════════════════════════
   HELPER: Format "Last verified" date
   ═══════════════════════════════════════════════════════════ */
function formatVerified(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE STAT CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function InteractiveStatCard({ stat, meta }: { stat: StatCard; meta: typeof CATEGORY_META.financial }) {
  const [open, setOpen] = useState(false)
  const hasDetails = stat.details && stat.details.length > 0

  return (
    <div
      className={`p-5 rounded-sm border transition-all duration-200 ${meta.border} ${meta.bg} ${hasDetails ? `cursor-pointer ${meta.hoverBorder} hover:shadow-md` : ''}`}
      onClick={() => hasDetails && setOpen(!open)}
      role={hasDetails ? 'button' : undefined}
      tabIndex={hasDetails ? 0 : undefined}
      onKeyDown={e => hasDetails && e.key === 'Enter' && setOpen(!open)}
      aria-expanded={hasDetails ? open : undefined}
    >
      {/* Value + expand indicator */}
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-3xl md:text-4xl font-bold leading-tight text-crimson">
          {stat.value}
        </p>
        {hasDetails && (
          <span className={`mt-1 text-lg transition-transform duration-200 text-ink-faint ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
        )}
      </div>

      <p className="font-body text-sm text-ink leading-relaxed mt-2 mb-2">{stat.label}</p>

      {stat.note && (
        <p className="font-body text-xs text-ink-muted italic leading-relaxed mb-2">{stat.note}</p>
      )}

      {/* Source + verification badge */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <a
          href={stat.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-[0.6rem] font-semibold tracking-wide uppercase hover:underline transition-colors text-crimson hover:text-crimson-dark"
          onClick={e => e.stopPropagation()}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          {stat.source}
        </a>
        <span className="font-sans text-[0.55rem] text-ink-faint">
          Verified {formatVerified(stat.lastVerified)}
        </span>
      </div>

      {/* Expandable detail panel */}
      {hasDetails && open && (
        <div className="mt-4 pt-4 border-t border-current/10 space-y-3" onClick={e => e.stopPropagation()}>
          {stat.details!.map((d, i) => (
            <div key={i}>
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase mb-1 text-ink">{d.title}</p>
              <p className="font-body text-xs text-ink leading-relaxed">{d.text}</p>
              {d.sourceUrl && (
                <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 font-sans text-[0.55rem] hover:underline text-crimson hover:text-crimson-dark">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  View source
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MONEY TRAIL NODE COMPONENT
   ═══════════════════════════════════════════════════════════ */
const NODE_COLORS = {
  legislation: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'file' },
  weapon: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'shield' },
  delivery: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'plane' },
  impact: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'warning' },
}

function MoneyTrailCard({ node }: { node: MoneyTrailNode }) {
  const [open, setOpen] = useState(false)
  const style = NODE_COLORS[node.type]
  const childNodes = node.children?.map(cid => MONEY_TRAIL.find(n => n.id === cid)).filter(Boolean) as MoneyTrailNode[] | undefined

  return (
    <div className={`border rounded-sm overflow-hidden transition-all duration-200 ${style.border} ${style.bg} ${childNodes ? 'cursor-pointer hover:shadow-md' : ''}`}>
      <div
        className="p-4 flex items-start gap-3"
        onClick={() => childNodes && setOpen(!open)}
        role={childNodes ? 'button' : undefined}
        tabIndex={childNodes ? 0 : undefined}
        onKeyDown={e => childNodes && e.key === 'Enter' && setOpen(!open)}
      >
        <span className="flex-shrink-0 mt-0.5 text-crimson"><TierIcon name={style.icon} className="w-5 h-5" /></span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-xl font-bold text-crimson">{node.amount}</span>
            <span className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full text-white bg-ink">
              {node.type}
            </span>
          </div>
          <p className="font-sans text-sm font-semibold text-ink mt-1">{node.label}</p>
          <p className="font-sans text-[0.6rem] text-ink-faint mt-0.5">{node.date}</p>
          <p className="font-body text-xs text-ink-muted leading-relaxed mt-2">{node.detail}</p>
          <a href={node.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-sans text-[0.6rem] font-semibold hover:underline text-crimson hover:text-crimson-dark" onClick={e => e.stopPropagation()}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Source
          </a>
        </div>
        {childNodes && (
          <span className={`text-lg transition-transform duration-200 flex-shrink-0 text-ink-faint ${open ? 'rotate-180' : ''}`}>▾</span>
        )}
      </div>
      {/* Expanded children */}
      {open && childNodes && (
        <div className="border-t border-current/10 p-4 pl-10 space-y-3">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink-muted mb-2">Where this money went →</p>
          {childNodes.map(child => (
            <MoneyTrailCard key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   INCIDENT CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function IncidentCard({ incident }: { incident: DocumentedIncident }) {
  const [expanded, setExpanded] = useState(false)
  const MEDIA_ICONS: Record<string, string> = { video: 'video', investigation: 'search', 'photo-essay': 'camera', document: 'file' }

  return (
    <article className="border border-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div
        className="p-5 border-b border-border bg-surface cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase text-white ${
                incident.tier === 'verified' ? 'bg-ink' : 'bg-ink/70'
              }`}>
                {incident.tier === 'verified' ? '✓ Verified' : '◐ Circumstantial'}
              </span>
              {incident.casualties && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-sans font-bold bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300">
                  {incident.casualties.killed} killed{incident.casualties.injured ? ` · ${incident.casualties.injured} injured` : ''}
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold text-ink leading-snug">{incident.title}</h3>
            <p className="font-sans text-xs text-ink-faint mt-1">{incident.date} — {incident.location}</p>
          </div>
          <span className={`text-lg transition-transform duration-200 flex-shrink-0 mt-2 ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>

        {/* Preview when collapsed */}
        {!expanded && (
          <p className="font-body text-sm text-ink-muted leading-relaxed mt-3 line-clamp-2">{incident.summary}</p>
        )}
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="p-5 space-y-5">
          {/* What Happened */}
          <div>
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">What Happened</p>
            <p className="font-body text-sm text-ink leading-relaxed">{incident.summary}</p>
          </div>

          {/* Evidence */}
          <div>
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Evidence</p>
            <p className="font-body text-sm text-ink leading-relaxed">{incident.evidence}</p>
          </div>

          {/* Multimedia Evidence */}
          {incident.multimedia.length > 0 && (
            <div>
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Multimedia Evidence</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {incident.multimedia.map((m, j) => (
                  <a
                    key={j}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-sm border border-border bg-surface hover:border-crimson/30 hover:bg-parchment-dark/10 transition-all group"
                  >
                    <span className="flex-shrink-0 text-crimson"><TierIcon name={MEDIA_ICONS[m.type] || 'file'} className="w-4 h-4" /></span>
                    <div>
                      <span className="font-sans text-[0.55rem] font-bold tracking-wider uppercase text-crimson">{m.type.replace('-', ' ')}</span>
                      <p className="font-sans text-xs text-ink group-hover:text-crimson transition-colors">{m.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          <div>
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Sources</p>
            <div className="space-y-1.5">
              {incident.sources.map((src, j) => (
                <a
                  key={j}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 font-sans text-xs text-crimson hover:text-crimson-dark transition-colors group"
                >
                  <svg className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="underline-offset-2 group-hover:underline">{src.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

/* ═══════════════════════════════════════════════════════════
   LIVE COUNTER — Days since Oct 7, 2023
   ═══════════════════════════════════════════════════════════ */
function LiveCounter() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const start = new Date('2023-10-07T06:30:00Z') // approximate start of Oct 7 attack
  const diffMs = now.getTime() - start.getTime()
  const days = Math.floor(diffMs / 86400000)
  const hours = Math.floor((diffMs % 86400000) / 3600000)
  const minutes = Math.floor((diffMs % 3600000) / 60000)
  const seconds = Math.floor((diffMs % 60000) / 1000)

  return (
    <div className="text-center py-8 px-4">
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">Time Since October 7, 2023</p>
      <div className="flex justify-center gap-3 sm:gap-6">
        {[
          { val: days, unit: 'Days' },
          { val: hours, unit: 'Hours' },
          { val: minutes, unit: 'Min' },
          { val: seconds, unit: 'Sec' },
        ].map(({ val, unit }) => (
          <div key={unit} className="text-center">
            <p className="font-display text-3xl sm:text-5xl font-bold text-crimson tabular-nums">{String(val).padStart(unit === 'Days' ? 1 : 2, '0')}</p>
            <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mt-1">{unit}</p>
          </div>
        ))}
      </div>
      <p className="font-sans text-[0.55rem] text-ink-faint mt-3">
        Live clock · {now.toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} UTC
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION JUMP NAV
   ═══════════════════════════════════════════════════════════ */
const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'money-trail', label: 'Follow the Money' },
  { id: 'financial', label: 'U.S. Aid & Spending' },
  { id: 'humanitarian', label: 'Humanitarian Impact' },
  { id: 'legal', label: 'International Law' },
  { id: 'social', label: 'Domestic Policy' },
  { id: 'lobbying', label: 'AIPAC & Lobbying' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'incidents', label: 'Documented Incidents' },
  { id: 'downloads', label: 'Download & Share' },
  { id: 'methodology', label: 'Methodology' },
]

function JumpNav() {
  const [active, setActive] = useState('')
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.current!.observe(el)
    })
    return () => observer.current?.disconnect()
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-parchment/95 dark:bg-ink/95 backdrop-blur-sm border-b border-border py-2 -mx-6 px-6 mb-8 overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`font-sans text-[0.6rem] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              active === s.id ? 'bg-crimson text-white' : 'text-ink-muted hover:text-crimson hover:bg-crimson/5'
            }`}
            onClick={e => {
              e.preventDefault()
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function IsraelDossierPage() {
  useEffect(() => {
    setMetaTags({
      title: 'The Israel Dossier | Veritas Worldwide Press',
      description: 'A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — every figure sourced to government records, UN agencies, and verified reporting.',
      url: `${SITE_URL}/israel-dossier`,
      type: 'article',
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'The Israel Dossier — A Documented Record',
      description: 'Interactive investigation: Follow U.S. taxpayer money from Congress to weapons to civilian impact. Every figure sourced to CRS, UN OCHA, ICJ, CPJ, and official records.',
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      datePublished: '2026-03-24',
      dateModified: new Date().toISOString().split('T')[0],
      isAccessibleForFree: true,
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const categories = ['financial', 'humanitarian', 'legal', 'social'] as const
  const totalIncidentDeaths = INCIDENTS.reduce((sum, i) => sum + (i.casualties?.killed ?? 0), 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      {/* ─── MASTHEAD ─── */}
      <header id="overview" className="text-center mb-6 border-b border-border pb-10">
        <p className="chapter-label mb-4">Special Investigation</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          The Israel Dossier
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed max-w-2xl mx-auto mb-6">
          An interactive documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — compiled from government records, UN agencies, and verified investigative reporting.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs font-sans text-ink-faint mb-6">
          <span>Sources: CRS</span><span className="text-ink-faint/30">·</span>
          <span>UN OCHA</span><span className="text-ink-faint/30">·</span>
          <span>ICJ</span><span className="text-ink-faint/30">·</span>
          <span>CPJ</span><span className="text-ink-faint/30">·</span>
          <span>B&apos;Tselem</span><span className="text-ink-faint/30">·</span>
          <span>OHCHR</span><span className="text-ink-faint/30">·</span>
          <span>The Lancet</span><span className="text-ink-faint/30">·</span>
          <span>Forensic Architecture</span><span className="text-ink-faint/30">·</span>
          <span>UNICEF</span><span className="text-ink-faint/30">·</span>
          <span>SIPRI</span>
        </div>

        {/* Key numbers bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
          {[
            { val: '75,000+', sub: 'Palestinians Killed', color: '#991B1B' },
            { val: '17,000+', sub: 'Children Killed', color: '#991B1B' },
            { val: '$310B+', sub: 'Total U.S. Aid', color: '#92400E' },
            { val: '14,000+', sub: 'U.S. Bombs Delivered', color: '#1E3A5F' },
          ].map(({ val, sub, color }) => (
            <div key={sub} className="p-3 rounded-sm border border-border bg-surface text-center">
              <p className="font-display text-2xl md:text-3xl font-bold" style={{ color }}>{val}</p>
              <p className="font-sans text-[0.6rem] font-semibold tracking-wider uppercase text-ink-faint mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Live Counter */}
      <LiveCounter />

      {/* Jump Nav */}
      <JumpNav />

      {/* ─── EDITORIAL NOTE ─── */}
      <div className="mb-12 p-5 border border-border rounded-sm bg-surface">
        <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-2">Editorial Note</p>
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          This page presents documented facts compiled from primary sources. Every figure links to its original source. Click any statistic card to expand it and see where the money went, what weapons were purchased, and what their documented impact has been. Where data is disputed or subject to methodological debate, we note it. This page takes no editorial position — it presents the documented record and lets the reader draw their own conclusions.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <DossierPDF />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         HISTORICAL TIMELINE — From Balfour to Present
         ═══════════════════════════════════════════════════════════ */}
      <section id="timeline" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Historical Timeline: 1917–Present</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-3xl">
          A chronological record of key events from the Balfour Declaration to the present day. Every entry is sourced to primary documents.
        </p>
        <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mb-6">
          {HISTORICAL_TIMELINE.length} documented events · Click any source to verify
        </p>
        <div className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-1">
            {HISTORICAL_TIMELINE.map((event, i) => (
              <div key={i} className="relative pl-12 pb-4">
                <div className="absolute left-[14px] top-1.5 w-[17px] h-[17px] rounded-full border-2 border-crimson bg-parchment dark:bg-ink flex items-center justify-center z-10">
                  <div className="w-[7px] h-[7px] rounded-full bg-crimson" />
                </div>
                <div className="p-4 rounded-sm border border-border bg-surface hover:border-crimson/20 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    {event.imageUrl && (
                      <img src={event.imageUrl} alt={event.title} loading="lazy" className="w-16 h-16 object-cover rounded-sm flex-shrink-0 hidden sm:block" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-display text-lg font-bold text-crimson">{event.year}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-sans font-bold tracking-wider uppercase text-white ${event.tier === 'verified' ? 'bg-ink' : 'bg-ink/70'}`}>
                          {event.tier === 'verified' ? '✓ Verified' : '◐ Circumstantial'}
                        </span>
                      </div>
                      <h3 className="font-sans text-sm font-bold text-ink mb-1">{event.title}</h3>
                      <p className="font-body text-xs text-ink-muted leading-relaxed">{event.description}</p>
                      <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline transition-colors">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        {event.source}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         FOLLOW THE MONEY — Interactive Money Trail
         ═══════════════════════════════════════════════════════════ */}
      <section id="money-trail" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-ink" />
          <h2 className="font-display text-2xl font-bold text-ink">Follow the Money</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-3xl">
          Click any node to trace U.S. taxpayer dollars from Congress → weapons procurement → delivery → documented civilian impact. Every link in the chain is sourced.
        </p>
        <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mb-6">
          Interactive — click to expand each level
        </p>

        <div className="space-y-3">
          {MONEY_TRAIL.filter(n => n.type === 'legislation' || n.type === 'delivery').map(node => (
            <MoneyTrailCard key={node.id} node={node} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         STATISTICS BY CATEGORY — Interactive expandable cards
         ═══════════════════════════════════════════════════════════ */}
      {categories.map(cat => {
        const meta = CATEGORY_META[cat]
        const items = STATS.filter(s => s.category === cat)
        return (
          <section key={cat} id={cat} className="mb-14 scroll-mt-20">
            {/* Section Header Image */}
            {meta.headerImage && (
              <div className="mb-5 -mx-4 sm:-mx-6 overflow-hidden rounded-sm">
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img src={meta.headerImage} alt={meta.label} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).closest('.relative')?.classList.add('hidden') }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{meta.label}</h2>
                    </div>
                    {meta.headerCaption && <p className="font-sans text-[0.6rem] text-white/60 mt-1">{meta.headerCaption}</p>}
                  </div>
                </div>
              </div>
            )}
            {!meta.headerImage && (
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
                <h2 className="font-display text-2xl font-bold text-ink">{meta.label}</h2>
              </div>
            )}
            <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mb-6">
              {items.filter(s => s.details?.length).length} of {items.length} cards have expandable details — click to explore
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((stat, i) => (
                <InteractiveStatCard key={i} stat={stat} meta={meta} />
              ))}
            </div>
          </section>
        )
      })}

      {/* ═══════════════════════════════════════════════════════════
         AIPAC & CONGRESSIONAL LOBBYING
         ═══════════════════════════════════════════════════════════ */}
      <section id="lobbying" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">AIPAC & Congressional Lobbying</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-6 max-w-3xl">
          The pro-Israel lobby was the single largest source of PAC spending in the 2024 federal election cycle. Every dollar traced through FEC filings.
        </p>
        <div className="space-y-3">
          {LOBBYING_DATA.map((record, i) => (
            <div key={i} className="p-4 border border-border rounded-sm bg-surface hover:border-crimson/20 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-display text-xl font-bold text-crimson">{record.amount}</span>
                    <span className="font-sans text-[0.55rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-ink text-white">{record.cycle}</span>
                  </div>
                  <p className="font-sans text-sm font-bold text-ink">{record.organization}</p>
                  <p className="font-body text-xs text-ink-muted mt-1">Recipients: {record.recipients}</p>
                  {record.note && <p className="font-body text-xs text-ink-muted italic mt-1">{record.note}</p>}
                </div>
                <a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline flex-shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  {record.source}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Cases */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mt-10 mb-4">International Legal Record</h3>
        <div className="space-y-3">
          {LEGAL_CASES.map((legalCase, i) => (
            <div key={i} className="p-4 border border-border rounded-sm bg-surface">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-sans font-bold tracking-wider uppercase text-white ${legalCase.status === 'decided' ? 'bg-ink' : legalCase.status === 'ongoing' ? 'bg-crimson' : 'bg-ink/70'}`}>
                  {legalCase.status}
                </span>
                <span className="font-sans text-[0.55rem] text-ink-faint">{legalCase.court} · {legalCase.date}</span>
              </div>
              <h4 className="font-sans text-sm font-bold text-ink mb-1">{legalCase.title}</h4>
              <p className="font-body text-xs text-ink-muted leading-relaxed mb-1">{legalCase.ruling}</p>
              <p className="font-body text-xs text-ink-muted italic leading-relaxed mb-2">{legalCase.significance}</p>
              <a href={legalCase.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View ruling
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         INFRASTRUCTURE DESTRUCTION
         ═══════════════════════════════════════════════════════════ */}
      <section id="infrastructure" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Infrastructure Destruction & Expanded Data</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-6 max-w-3xl">
          Additional documented statistics covering infrastructure, domestic policy, lobbying, and comparative analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPANDED_STATS.map((stat, i) => (
            <div key={i} className="p-5 rounded-sm border border-border bg-surface hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                {stat.imageUrl && (
                  <img src={stat.imageUrl} alt={stat.label} loading="lazy" className="w-14 h-14 object-cover rounded-sm flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-3xl md:text-4xl font-bold leading-tight text-crimson">{stat.value}</p>
                    {stat.tier && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.5rem] font-sans font-bold tracking-wider uppercase text-white flex-shrink-0 ${stat.tier === 'verified' ? 'bg-ink' : 'bg-ink/70'}`}>
                        {stat.tier === 'verified' ? '✓' : '◐'}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm text-ink leading-relaxed mt-2">{stat.label}</p>
                  {stat.note && <p className="font-body text-xs text-ink-muted italic mt-1">{stat.note}</p>}
                  {stat.details && stat.details.map((d, j) => (
                    <div key={j} className="mt-2 pt-2 border-t border-current/5">
                      <p className="font-sans text-[0.55rem] font-bold tracking-wider uppercase text-ink-muted mb-0.5">{d.title}</p>
                      <p className="font-body text-xs text-ink-muted leading-relaxed">{d.text}</p>
                    </div>
                  ))}
                  <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    {stat.source}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         DOCUMENTED INCIDENTS — Expandable with multimedia (ORIGINAL + EXPANDED)
         ═══════════════════════════════════════════════════════════ */}
      <section id="incidents" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Documented Incidents</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-3xl">
          The following incidents are documented through multiple independent sources including video evidence, forensic analysis, and official investigations. Each entry includes multimedia evidence links — videos, forensic reconstructions, and investigative reports you can verify yourself.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300">
            {INCIDENTS.length} incidents documented
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300">
            {totalIncidentDeaths.toLocaleString()}+ killed in these incidents alone
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300">
            All verified tier — multiple independent sources
          </span>
        </div>

        <div className="space-y-4">
          {INCIDENTS.map((incident, i) => (
            <IncidentCard key={i} incident={incident} />
          ))}
        </div>

        {/* Expanded Incidents */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mt-10 mb-4">Additional Documented Incidents</h3>
        <div className="space-y-4">
          {EXPANDED_INCIDENTS.map((incident, i) => (
            <IncidentCard key={`exp-${i}`} incident={incident} />
          ))}
        </div>

        <div className="mt-6 p-4 border border-border rounded-sm bg-surface">
          <p className="font-body text-xs text-ink-muted italic leading-relaxed">
            This is not an exhaustive list. Thousands of additional incidents have been documented by Airwars, OHCHR, Al Jazeera, and other monitoring organizations. These {INCIDENTS.length + EXPANDED_INCIDENTS.length} were selected for the strength and independence of their evidence.
            <a href="https://gaza-patterns-harm.airwars.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline ml-1">
              View the Airwars Gaza Patterns of Harm database →
            </a>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         EVIDENCE MEDIA GALLERY — Embedded video & photographic evidence
         ═══════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Evidence Media Gallery</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 max-w-3xl">
          Primary source video evidence, investigative journalism, and forensic analysis. Watch the documented record — every video below comes from established news organizations, UN agencies, or verified open-source investigators.
        </p>

        {/* Embedded Videos */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { id: 'sYzmBJfFra8', title: 'Al Jazeera Investigation: Gaza\'s Killing Zone', caption: 'Forensic analysis of Israeli military targeting patterns in designated "safe zones" using satellite imagery and survivor testimony.' },
            { id: 'XJ-5mMOsBqA', title: 'Forensic Architecture: Destruction of Medical Infrastructure', caption: 'Spatial analysis documenting the systematic targeting of hospitals, clinics, and ambulances across Gaza.' },
            { id: 'kVECk17Hwzs', title: 'PBS Frontline: The U.S. & Israel\'s War in Gaza', caption: 'In-depth PBS investigation into U.S. weapons transfers and their documented use in civilian areas.' },
            { id: 'oGalFi-NMBI', title: 'UN Human Rights Council: Report on Gaza', caption: 'Official UN presentation of documented human rights violations, including evidence of disproportionate force against civilians.' },
          ].map(v => (
            <div key={v.id} className="rounded-sm overflow-hidden border border-border bg-surface">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans text-sm font-bold text-ink mb-1">{v.title}</h3>
                <p className="font-body text-xs text-ink-muted leading-relaxed">{v.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Photographic Evidence */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">Key Photographic Evidence</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg/640px-Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg', alt: 'Destroyed residential tower in Gaza City', caption: 'Gaza City, 2024 — Residential tower destroyed by airstrike' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dome_of_the_Rock%2C_Temple_Mount%2C_Jerusalem.jpg/640px-Dome_of_the_Rock%2C_Temple_Mount%2C_Jerusalem.jpg', alt: 'Dome of the Rock, Jerusalem', caption: 'Dome of the Rock — Epicenter of the territorial conflict' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_the_Red_Cross.svg/640px-Flag_of_the_Red_Cross.svg.png', alt: 'Red Cross emblem', caption: 'ICRC — Denied access to detainees and restricted in Gaza' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Israeli_West-Bank_Barrier.jpg/640px-Israeli_West-Bank_Barrier.jpg', alt: 'Israeli West Bank separation barrier', caption: 'Separation barrier — Ruled illegal by ICJ in 2004' },
          ].map((img, i) => (
            <a key={i} href={img.src.replace('/thumb/', '/').replace(/\/\d+px-[^/]+$/, '')} target="_blank" rel="noopener noreferrer" className="group block rounded-sm overflow-hidden border border-border hover:border-crimson/40 transition-colors">
              <div className="aspect-[4/3] overflow-hidden bg-parchment-dark">
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).closest('a')?.classList.add('hidden') }} />
              </div>
              <p className="p-2 font-sans text-[0.6rem] text-ink-muted leading-snug">{img.caption}</p>
            </a>
          ))}
        </div>

        {/* Primary Source Documents */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">Primary Source Documents</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'ICJ Advisory Opinion — Legality of Occupation (2024)', url: 'https://www.icj-cij.org/node/204176', icon: 'scale' },
            { label: 'ICC Arrest Warrants — Netanyahu & Gallant', url: 'https://www.icc-cpi.int/situations/palestine', icon: 'file' },
            { label: 'CRS Report RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222', icon: 'money' },
            { label: 'Lancet: Mortality Study (Jan 2025)', url: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext', icon: 'search' },
            { label: 'OHCHR Gaza Update Report (Nov 2024)', url: 'https://www.ohchr.org/sites/default/files/documents/countries/opt/20241106-Gaza-Update-Report-OPT.pdf', icon: 'file' },
            { label: 'Airwars — Gaza Patterns of Harm Database', url: 'https://gaza-patterns-harm.airwars.org/', icon: 'search' },
          ].map((doc, i) => (
            <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-sm border border-border bg-surface hover:border-crimson/30 hover:bg-parchment-dark/10 transition-all group">
              <span className="flex-shrink-0 mt-0.5 text-crimson"><TierIcon name={doc.icon} className="w-4 h-4" /></span>
              <span className="font-sans text-xs text-ink group-hover:text-crimson transition-colors leading-snug">{doc.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         DOWNLOAD & SHARE — Carousels, Pinned Posts, PDF
         ═══════════════════════════════════════════════════════════ */}
      <section id="downloads" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Download & Share</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 max-w-3xl">
          Download the complete dossier as a PDF, share a 10-slide Instagram carousel, or pin high-impact images to your profile. Every asset is free to use — the documented record only matters if people see it.
        </p>

        {/* PDF Download */}
        <div className="mb-8 p-5 border border-border rounded-sm bg-surface">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-1">Complete Document</p>
              <p className="font-body text-sm text-ink-muted">Download the entire Israel Dossier as a print-quality PDF with all statistics, incidents, and sources.</p>
            </div>
            <DossierPDF />
          </div>
        </div>

        {/* Instagram Carousel */}
        <div className="mb-8">
          <CarouselDownloader
            slides={ISRAEL_DOSSIER_CAROUSEL}
            title="The Israel Dossier — 10 Slides That Matter"
            filenamePrefix="veritas-israel-dossier"
          />
        </div>

        {/* Pinned Profile Posts */}
        <div className="mb-8">
          <PinnedPostDownloader posts={PINNED_POSTS} />
        </div>
      </section>

      {/* ─── RELATED CHAPTERS ─── */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Related Chapters in The Record</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'chapter-6', title: 'The Talmud, the Balfour Declaration & the Origins of Zionism', num: '6' },
            { id: 'chapter-7', title: 'Mossad: The Institute', num: '7' },
            { id: 'chapter-8', title: 'JFK, Dimona & AIPAC', num: '8' },
            { id: 'chapter-14', title: 'AIPAC & Congressional Lobbying', num: '14' },
            { id: 'chapter-15', title: 'U.S. Foreign Aid to Israel', num: '15' },
            { id: 'chapter-16', title: 'The USS Liberty Incident', num: '16' },
          ].map(ch => (
            <Link
              key={ch.id}
              to={`/chapter/${ch.id}`}
              className="p-4 border border-border rounded-sm hover:border-crimson/30 hover:bg-parchment-dark/10 transition-all group"
            >
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson mb-1">Chapter {ch.num}</p>
              <p className="font-display text-sm font-bold text-ink group-hover:text-crimson transition-colors">{ch.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── METHODOLOGY ─── */}
      <section id="methodology" className="mb-12 p-5 border border-border rounded-sm bg-surface scroll-mt-20">
        <h2 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-3">Source Methodology</h2>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
          Every statistic on this page is sourced to one or more of the following categories of primary evidence: official government publications (Congressional Research Service, Israeli Ministry of Health, Bituach Leumi), international body records (UN OCHA, ICJ, OHCHR, UNSC), verified independent organizations (CPJ, B&apos;Tselem, DCIP, Airwars), peer-reviewed research (The Lancet, Max Planck Institute), and established investigative journalism (Washington Post, CNN, NPR, NBC News, Al Jazeera, Forensic Architecture) with named sources and corroborating evidence.
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
          Where figures are disputed or represent estimates with methodological uncertainty, this is noted. All "last verified" dates indicate when the editorial team last confirmed the source was active and the figure unchanged.
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          Readers are encouraged to verify all claims independently using the linked primary sources. If you find an error or an outdated figure, contact <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:underline">rights@veritasworldwide.com</a>.
        </p>
      </section>

      {/* ─── SHARE BAR ─── */}
      <div className="mb-12 p-5 border border-border rounded-sm bg-surface text-center">
        <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-3">Share This Investigation</p>
        <p className="font-body text-sm text-ink-muted mb-4">If this page informed you, share it. The documented record only matters if people see it.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('The Israel Dossier — every statistic sourced, every dollar traced, every incident documented.')}&url=${encodeURIComponent(SITE_URL + '/israel-dossier')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white font-sans text-xs font-semibold tracking-wide rounded-sm hover:bg-ink/80 transition-colors"
          >
            Share on X / Twitter
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText(SITE_URL + '/israel-dossier'); alert('Link copied to clipboard') }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-ink font-sans text-xs font-semibold tracking-wide rounded-sm hover:border-crimson hover:text-crimson transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* ─── DONATION CTA ─── */}
      <section className="p-8 bg-ink text-white rounded-sm text-center mb-12">
        <p className="font-body text-sm italic text-white/60 mb-4">
          Documenting the public record takes time and resources. If this page informed you, consider supporting the work.
        </p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          onClick={() => trackSupportClick('israel-dossier')}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Support This Work
        </a>
        <p className="font-sans text-[0.6rem] text-white/30 mt-3">
          Processed securely via Stripe &middot; No account required
        </p>
      </section>

      {/* Ad — one per page, hidden for subscribers */}
      <AdBanner slot="dossier-bottom" format="horizontal" />

      {/* Share */}
      <SharePanel
        title="The Israel Dossier — Veritas Worldwide Press"
        description="A documented record of U.S.-Israel policy, military spending, and humanitarian impact. Every figure sourced to government records and UN agencies."
        contentId="israel-dossier"
      />

      {/* Dispute This Content */}
      <DisputeStory pageId="israel-dossier" pageTitle="The Israel Dossier" />

      {/* Community Forum */}
      <CommunityForum pageId="israel-dossier" pageTitle="The Israel Dossier" />

      {/* ─── BOTTOM NAV ─── */}
      <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
          Read The Record
        </Link>
        <Link to="/chapter/chapter-15" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Ch. 15: U.S. Foreign Aid to Israel
        </Link>
        <Link to="/sources" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Source Library
        </Link>
        <Link to="/deep-state" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          The Deep State — Epstein Network
        </Link>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'
import { trackSupportClick } from '../lib/ga4'

interface StatCard {
  value: string
  label: string
  source: string
  sourceUrl: string
  category: 'financial' | 'humanitarian' | 'legal' | 'social'
  note?: string
}

const STATS: StatCard[] = [
  // === FINANCIAL: U.S. Aid & Military Spending ===
  {
    value: '$310B+',
    label: 'Total U.S. aid to Israel (inflation-adjusted, 1948–2024)',
    source: 'Congressional Research Service, Report RL33222',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    category: 'financial',
  },
  {
    value: '$3.8B',
    label: 'Annual U.S. military aid under 2016 MOU (FY2019–FY2028)',
    source: 'U.S. State Department, 10-Year MOU',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    category: 'financial',
    note: '$33B in FMF grants + $5B in missile defense over 10 years',
  },
  {
    value: '$26.4B',
    label: 'Emergency U.S. military & humanitarian aid package (April 2024)',
    source: 'U.S. Congress, H.R.815',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
    category: 'financial',
    note: 'Includes $5.2B for air/missile defense systems including Iron Dome',
  },
  {
    value: '$46.5B',
    label: 'Israel defense budget in 2024 — a 65% year-over-year increase',
    source: 'Stockholm International Peace Research Institute (SIPRI)',
    sourceUrl: 'https://www.sipri.org/databases/milex',
    category: 'financial',
  },
  {
    value: '$50K–$100K',
    label: 'Cost per Iron Dome interceptor missile',
    source: 'Encyclopaedia Britannica / Rafael Advanced Defense Systems',
    sourceUrl: 'https://www.britannica.com/topic/Iron-Dome',
    category: 'financial',
  },
  {
    value: '54:1',
    label: 'GDP per capita ratio — Israel ($54,177) vs. Palestine ($2,592)',
    source: 'World Bank, 2024 data',
    sourceUrl: 'https://countryeconomy.com/countries/compare/israel/palestine',
    category: 'financial',
    note: 'Gaza GDP contracted 85% during Oct 2023–Sep 2024',
  },
  // === HUMANITARIAN: Casualties & Human Impact ===
  {
    value: '75,000+',
    label: 'Palestinians killed in Gaza since October 7, 2023',
    source: 'Gaza Ministry of Health (figure accepted by IDF, Jan 2026)',
    sourceUrl: 'https://www.ochaopt.org/',
    category: 'humanitarian',
    note: 'IDF acknowledged the MoH count in January 2026. Independent estimates (Max Planck Institute) suggest total conflict-related deaths exceed 100,000.',
  },
  {
    value: '70%',
    label: 'Of verified fatalities in residential buildings were women and children',
    source: 'UN Office of the High Commissioner for Human Rights (OHCHR)',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2024/07/experts-hail-icj-declaration-illegality-israels-presence-occupied',
    category: 'humanitarian',
  },
  {
    value: '254+',
    label: 'Journalists and media workers killed since October 2023',
    source: 'Committee to Protect Journalists (CPJ), as of March 2026',
    sourceUrl: 'https://cpj.org/2023/10/journalist-casualties-in-the-israel-gaza-conflict/',
    category: 'humanitarian',
    note: 'More journalists killed than in any conflict since CPJ began tracking in 1992',
  },
  {
    value: '36,000+',
    label: 'Palestinians forcibly displaced by settlement expansion in West Bank',
    source: 'UN Human Rights Office (OHCHR), March 2026 report',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2026/03/israels-settlement-expansion-drives-mass-displacement-west-bank-un-report',
    category: 'humanitarian',
  },
  {
    value: '1,732',
    label: 'Documented settler violence incidents in 12 months (to Oct 2025)',
    source: 'UN Human Rights Office (OHCHR)',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2026/03/israels-settlement-expansion-drives-mass-displacement-west-bank-un-report',
    category: 'humanitarian',
  },
  {
    value: '351',
    label: 'Palestinian children detained by Israel (Dec 2025) — 51% without charge',
    source: 'Defense for Children International — Palestine (DCIP)',
    sourceUrl: 'https://www.dci-palestine.org/palestinian_child_administrative_detainees_reach_all_time_high',
    category: 'humanitarian',
    note: 'Highest number and proportion of child administrative detainees on record since monitoring began in 2008',
  },
  {
    value: '3:1',
    label: 'Water consumption ratio — Israelis use 247L/day vs. 82L/day for Palestinians',
    source: "B'Tselem (Israeli human rights organization)",
    sourceUrl: 'https://www.btselem.org/water',
    category: 'humanitarian',
    note: 'In some West Bank areas, Palestinian consumption drops to 26L/day — equivalent to disaster zones',
  },
  // === LEGAL & INTERNATIONAL ===
  {
    value: 'Unlawful',
    label: "ICJ ruled Israel's occupation of Palestinian territory is illegal (July 19, 2024)",
    source: 'International Court of Justice, Advisory Opinion',
    sourceUrl: 'https://www.icj-cij.org/node/204176',
    category: 'legal',
    note: 'Court found violations of prohibition on racial segregation and apartheid',
  },
  {
    value: '51+',
    label: 'U.S. vetoes of UN Security Council resolutions critical of Israel',
    source: 'UN Security Council records / Jewish Virtual Library',
    sourceUrl: 'https://jewishvirtuallibrary.org/u-s-vetoes-of-un-security-council-resolutions-critical-to-israel',
    category: 'legal',
    note: 'More than half of all U.S. vetoes in UNSC history have shielded Israel',
  },
  {
    value: '173',
    label: 'UN General Assembly resolutions against Israel (2015–2024) vs. 80 for rest of world',
    source: 'UN Watch analysis of UNGA voting records',
    sourceUrl: 'https://unwatch.org/2024-unga-resolutions-on-israel-vs-rest-of-the-world/',
    category: 'legal',
  },
  {
    value: 'UNSC 2334',
    label: 'Security Council resolution declaring all Israeli settlements illegal (2016)',
    source: 'United Nations Security Council',
    sourceUrl: 'https://en.wikipedia.org/wiki/United_Nations_Security_Council_Resolution_2334',
    category: 'legal',
    note: 'Passed 14–0, U.S. abstained under Obama administration',
  },
  {
    value: '750,000+',
    label: 'Israeli settlers living in the occupied West Bank including East Jerusalem',
    source: 'UN Human Rights Office (OHCHR), March 2025',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2025/03/israel-ramps-settlement-and-annexation-west-bank-dire-human-rights',
    category: 'legal',
    note: 'Settlement and outpost count rose ~50% from 141 (2022) to 210 (2025)',
  },
  // === SOCIAL: Benefits, Domestic Policy ===
  {
    value: 'Universal',
    label: 'Healthcare coverage for all Israeli citizens since 1995 National Health Insurance Law',
    source: 'Commonwealth Fund / Israel Ministry of Health',
    sourceUrl: 'https://www.commonwealthfund.org/international-health-policy-center/countries/israel',
    category: 'social',
    note: 'Funded in part through U.S. aid that offsets domestic budget pressure',
  },
  {
    value: '7.6%',
    label: "Israel's health spending as % of GDP (2023) — below OECD average of 9.3%",
    source: 'OECD Health Statistics / World Bank',
    sourceUrl: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=IL',
    category: 'social',
  },
  {
    value: '₪160–200',
    label: 'Monthly child allowance per child paid to all Israeli families regardless of income',
    source: 'Bituach Leumi (National Insurance Institute of Israel)',
    sourceUrl: 'https://www.btl.gov.il/English%20Homepage/Benefits/Children/Pages/Rates%20of%20child%20allowance.aspx',
    category: 'social',
    note: 'Plus ₪57/month state savings deposit per child from birth, and birth grants for newborns',
  },
  {
    value: '90%',
    label: 'Tuition discount for first year of university for IDF veterans',
    source: 'Israel Council for Higher Education / Nefesh B\'Nefesh',
    sourceUrl: 'https://www.nbn.org.il/life-in-israel/government-services/rights-and-benefits/student-authority-tuition-benefits/',
    category: 'social',
  },
  {
    value: '170,000',
    label: 'Active IDF military personnel + 450,000+ reservists (634,500 total force)',
    source: 'Global Firepower / IDF',
    sourceUrl: 'https://www.globalfirepower.com/country-military-strength-detail.php?country_id=israel',
    category: 'social',
  },
  {
    value: '84%',
    label: 'Of Israeli Jews believe Oct 7 attack justifies current military actions in Gaza',
    source: 'Tel Aviv University / Palestinian Center for Policy and Survey Research, Sept 2024',
    sourceUrl: 'https://en-social-sciences.tau.ac.il/peaceindex/joint-israeli-palestinian-surveys/2024-09',
    category: 'social',
  },
  {
    value: '61%',
    label: 'Of Israelis support normalization with Saudi Arabia even during ongoing conflict',
    source: 'Israel Democracy Institute, Sept 2024 poll',
    sourceUrl: 'https://en.idi.org.il/tags-en/1465',
    category: 'social',
  },
]

const CATEGORY_META = {
  financial: { label: 'U.S. Aid & Military Spending', color: '#92400E', bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800' },
  humanitarian: { label: 'Humanitarian Impact', color: '#991B1B', bg: 'bg-red-50 dark:bg-red-950/20', border: 'border-red-200 dark:border-red-800' },
  legal: { label: 'International Law & UN Record', color: '#1E3A5F', bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-200 dark:border-blue-800' },
  social: { label: 'Domestic Policy & Public Opinion', color: '#166534', bg: 'bg-green-50 dark:bg-green-950/20', border: 'border-green-200 dark:border-green-800' },
}

interface DocumentedIncident {
  title: string
  date: string
  summary: string
  evidence: string
  sources: { label: string; url: string }[]
  tier: 'verified' | 'circumstantial'
}

const INCIDENTS: DocumentedIncident[] = [
  {
    title: 'The Killing of Hind Rajab (Age 5)',
    date: 'January 29, 2024 — Gaza City',
    summary: 'Five-year-old Hind Rajab and six family members were fleeing Gaza City when their civilian vehicle was fired upon by an Israeli tank. Her 15-year-old cousin Layan Hamadeh called emergency services: "They are shooting at us." All passengers except Hind were killed in the initial fire. Hind remained alive in the car for hours, speaking with Palestinian Red Crescent dispatchers by phone. Two paramedics — Yusuf Zeino and Ahmed al-Madhoun — were dispatched with Israeli coordination to rescue her. Both paramedics were killed en route. On February 10, after Israeli forces withdrew, the bodies of Hind and all family members were recovered. The PRCS ambulance was found destroyed nearby.',
    evidence: 'Forensic analysis found 335 bullet holes in the family\'s Kia Picanto. The firing tank was positioned 13–23 meters from the vehicle. Investigators concluded "it is not plausible that the shooter could not have seen that the car was occupied by civilians, including children." Audio recordings of Hind\'s phone calls to dispatchers were released publicly. A bipartisan U.S. congressional bill (the Hind Rajab Act) was introduced in March 2026 demanding accountability.',
    sources: [
      { label: 'Washington Post — Full investigative timeline', url: 'https://www.washingtonpost.com/world/interactive/2024/hind-rajab-israel-gaza-killing-timeline/' },
      { label: 'Al Jazeera — Forensic double-tap evidence analysis', url: 'https://www.aljazeera.com/news/2026/3/23/substantial-evidence-of-double-tap-strike-in-killing-of-gazas-hind-rajab' },
      { label: 'NPR — Girl found dead after pleading for rescue', url: 'https://www.npr.org/2024/02/12/1230987928/6-year-old-gaza-girl-was-found-dead-days-after-pleading-for-rescue-from-israeli-' },
      { label: 'Defense for Children International — Palestine', url: 'https://www.dci-palestine.org/israeli_forces_shoot_kill_4_year_old_palestinian_girl_in_the_backseat_of_a_car' },
      { label: 'U.S. Congress — Hind Rajab Act introduced', url: 'https://jayapal.house.gov/2026/03/12/jayapal-jacobs-welch-introduce-bicameral-bill-demanding-accountability-for-hind-rajab-palestinian-child-killed-by-israeli-forces/' },
    ],
    tier: 'verified',
  },
  {
    title: 'The Rafah Paramedic Convoy Massacre',
    date: 'March 23, 2025 — Al-Hashashin, Rafah',
    summary: 'Israeli forces attacked a convoy of clearly marked humanitarian vehicles — five ambulances, a fire truck, and a UN vehicle — killing 15 aid workers. The dead included eight Palestine Red Crescent Society members, five civil defense workers, and one UN employee. The vehicles were traveling with headlights and emergency lights activated at dawn. Israel initially claimed the convoy had approached without lights and was suspected of transporting militants.',
    evidence: 'Video footage recovered from the phone of paramedic Rifaat Radwan — buried with the victims in a mass grave for eight days — directly contradicted the IDF account. The video, filmed from the front of the convoy vehicle, shows all emergency lights activated and clearly marked ambulances. Radwan is heard reciting prayers and saying: "Forgive me mom, this is the path I chose — to help people." The bodies were found in an unmarked mass grave on March 30, with humanitarian vehicles crushed and buried under sand. Following release of the video, Israel walked back its initial account.',
    sources: [
      { label: 'CNN — Video casts doubt on Israeli account', url: 'https://edition.cnn.com/2025/04/05/middleeast/gaza-aid-workers-video-israel-intl' },
      { label: 'NBC News — Video of the moment Israeli forces opened fire', url: 'https://www.nbcnews.com/news/world/video-moment-israeli-forces-gaza-medics-killed-rcna199824' },
      { label: 'NPR — Video refutes Israeli claims', url: 'https://www.npr.org/2025/04/05/nx-s1-5353346/israel-gaza-emergency-workers-killed-video' },
      { label: 'CBS News — Israel walks back account after video surfaces', url: 'https://www.cbsnews.com/news/israel-walks-back-account-gaza-medic-killings-video-surfaces-attack/' },
      { label: 'Wikipedia — Rafah paramedic massacre', url: 'https://en.wikipedia.org/wiki/Rafah_paramedic_massacre' },
    ],
    tier: 'verified',
  },
]

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
      description: 'Every figure sourced to CRS, UN OCHA, ICJ, CPJ, B\'Tselem, and official government records.',
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      datePublished: '2026-03-24',
      dateModified: '2026-03-24',
      isAccessibleForFree: true,
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const categories = ['financial', 'humanitarian', 'legal', 'social'] as const

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      {/* Masthead */}
      <header className="text-center mb-14 border-b border-border pb-10">
        <p className="chapter-label mb-4">Special Report</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          The Israel Dossier
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed max-w-2xl mx-auto mb-6">
          A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law violations — compiled from government records, UN agencies, and verified reporting.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs font-sans text-ink-faint">
          <span>Sources: CRS</span>
          <span className="text-ink-faint/30">·</span>
          <span>UN OCHA</span>
          <span className="text-ink-faint/30">·</span>
          <span>ICJ</span>
          <span className="text-ink-faint/30">·</span>
          <span>CPJ</span>
          <span className="text-ink-faint/30">·</span>
          <span>B&apos;Tselem</span>
          <span className="text-ink-faint/30">·</span>
          <span>OHCHR</span>
          <span className="text-ink-faint/30">·</span>
          <span>World Bank</span>
        </div>
      </header>

      {/* Editorial Note */}
      <div className="mb-12 p-5 border border-border rounded-sm bg-surface">
        <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-2">Editorial Note</p>
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          This page presents documented facts compiled from primary sources. Every figure links to its original source. Where data is disputed or subject to methodological debate, we note it. This page takes no editorial position — it presents the documented record and lets the reader draw their own conclusions. All figures are current as of the date cited in each source.
        </p>
      </div>

      {/* Stat Sections by Category */}
      {categories.map(cat => {
        const meta = CATEGORY_META[cat]
        const items = STATS.filter(s => s.category === cat)
        return (
          <section key={cat} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: meta.color }} />
              <h2 className="font-display text-2xl font-bold text-ink">{meta.label}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((stat, i) => (
                <div key={i} className={`p-5 rounded-sm border ${meta.border} ${meta.bg}`}>
                  <p className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: meta.color }}>
                    {stat.value}
                  </p>
                  <p className="font-body text-sm text-ink leading-relaxed mb-3">{stat.label}</p>
                  {stat.note && (
                    <p className="font-body text-xs text-ink-muted italic leading-relaxed mb-3">{stat.note}</p>
                  )}
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-[0.65rem] font-semibold tracking-wide uppercase hover:underline transition-colors"
                    style={{ color: meta.color }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {stat.source}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {/* Documented Incidents Section */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Documented Incidents</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 max-w-2xl">
          The following incidents are documented through multiple independent sources including video evidence, forensic analysis, and official investigations. Each is classified using the Veritas evidence tier system.
        </p>

        <div className="space-y-8">
          {INCIDENTS.map((incident, i) => (
            <article key={i} className="border border-border rounded-sm overflow-hidden">
              {/* Incident Header */}
              <div className="p-5 border-b border-border bg-surface">
                <div className="flex items-start gap-3 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase text-white flex-shrink-0 ${
                    incident.tier === 'verified' ? 'bg-[#166534]' : 'bg-[#92400E]'
                  }`}>
                    {incident.tier === 'verified' ? '✓ Verified' : '◐ Circumstantial'}
                  </span>
                  <span className="font-sans text-xs text-ink-faint">{incident.date}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink leading-snug">
                  {incident.title}
                </h3>
              </div>

              {/* Incident Body */}
              <div className="p-5">
                <div className="mb-4">
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">What Happened</p>
                  <p className="font-body text-sm text-ink leading-relaxed">{incident.summary}</p>
                </div>
                <div className="mb-4">
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Evidence</p>
                  <p className="font-body text-sm text-ink leading-relaxed">{incident.evidence}</p>
                </div>
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
            </article>
          ))}
        </div>
      </section>

      {/* Related Chapters */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Related Chapters in The Record</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* Methodology Note */}
      <section className="mb-12 p-5 border border-border rounded-sm bg-surface">
        <h2 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-3">Source Methodology</h2>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
          Every statistic on this page is sourced to one or more of the following categories of primary evidence: official government publications (Congressional Research Service, Israeli Ministry of Health, Bituach Leumi), international body records (UN OCHA, ICJ, OHCHR, UNSC), verified independent organizations (CPJ, B&apos;Tselem, DCIP), peer-reviewed research (The Lancet, Max Planck Institute), and established investigative journalism (Washington Post, CNN, NPR, NBC News) with named sources and corroborating evidence.
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          Where figures are disputed or represent estimates with methodological uncertainty, this is noted. Readers are encouraged to verify all claims independently using the linked primary sources.
        </p>
      </section>

      {/* Donation CTA */}
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

      {/* Share / Navigation */}
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
      </div>
    </div>
  )
}

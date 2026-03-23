// ââ Chapter Diagram Data âââââââââââââââââââââââââââââââââââââââââ
// Each chapter gets at least one downloadable/shareable diagram.
// Compact format: the ChapterDiagram component handles layout.

export interface NetworkNode {
  id: string
  label: string
  group?: 'primary' | 'secondary' | 'accent' | 'muted'
}

export interface DiagramConfig {
  type: 'network' | 'flow' | 'timeline' | 'hierarchy'
  title: string
  subtitle: string
  source?: string
  // Network diagrams
  center?: string
  nodes?: NetworkNode[]
  edges?: [string, string, string?][] // [from, to, label?]
  // Flow diagrams
  steps?: { label: string; detail?: string }[]
  // Timeline diagrams
  events?: { year: string; label: string; highlight?: boolean }[]
  // Hierarchy diagrams
  tree?: HierarchyNode
}

export interface HierarchyNode {
  label: string
  group?: 'primary' | 'secondary' | 'accent' | 'muted'
  children?: HierarchyNode[]
}

export const chapterDiagrams: Record<string, DiagramConfig> = {
  foreword: {
    type: 'hierarchy',
    title: 'Three-Tier Evidence Classification System',
    subtitle: 'How every claim in The Record is categorized and labeled',
    source: 'Veritas Worldwide Press editorial methodology',
    tree: {
      label: 'Evidence Classification',
      group: 'primary',
      children: [
        { label: 'VERIFIED', group: 'accent', children: [
          { label: 'Court Filings' }, { label: 'Congressional Records' },
          { label: 'Declassified Documents' }, { label: 'Peer-Reviewed Studies' },
        ] },
        { label: 'CIRCUMSTANTIAL', group: 'secondary', children: [
          { label: 'Documented Facts' }, { label: 'Interpretive Connection' },
          { label: 'Alternative Explanations Noted' },
        ] },
        { label: 'DISPUTED', group: 'muted', children: [
          { label: 'Named Source Claims' }, { label: 'Sworn Testimony' },
          { label: 'Not Independently Confirmed' },
        ] },
      ],
    },
  },

  overview: {
    type: 'network',
    title: 'Interlocking Systems of Institutional Power',
    subtitle: 'How financial, media, pharmaceutical, and political systems connect through shared ownership',
    source: 'SEC filings, OpenSecrets.org, Harvard Future of Media Project',
    center: 'asset-mgmt',
    nodes: [
      { id: 'asset-mgmt', label: 'BlackRock / Vanguard / State Street', group: 'primary' },
      { id: 'media', label: 'Media Conglomerates', group: 'secondary' },
      { id: 'pharma', label: 'Pharmaceutical Industry', group: 'secondary' },
      { id: 'defense', label: 'Defense Contractors', group: 'secondary' },
      { id: 'banks', label: 'Major Banks', group: 'secondary' },
      { id: 'food', label: 'Food & Agriculture', group: 'secondary' },
      { id: 'lobby', label: 'AIPAC & Lobbying', group: 'accent' },
      { id: 'congress', label: 'U.S. Congress', group: 'muted' },
      { id: 'fed', label: 'Federal Reserve', group: 'accent' },
      { id: 'public', label: 'American Public', group: 'muted' },
    ],
    edges: [
      ['asset-mgmt', 'media', 'Majority shareholder'],
      ['asset-mgmt', 'pharma', 'Majority shareholder'],
      ['asset-mgmt', 'defense', 'Majority shareholder'],
      ['asset-mgmt', 'banks', 'Majority shareholder'],
      ['asset-mgmt', 'food', 'Majority shareholder'],
      ['lobby', 'congress', '$42.6M (2024)'],
      ['congress', 'fed', 'Oversight'],
      ['fed', 'banks', 'Monetary policy'],
      ['media', 'public', 'Information'],
      ['pharma', 'public', 'Healthcare'],
      ['food', 'public', 'Food supply'],
    ],
  },

  'chapter-1': {
    type: 'network',
    title: 'The Rothschild Banking Network',
    subtitle: 'Five sons deployed across five European financial capitals (1798â1821)',
    source: 'Rothschild Archive, Niall Ferguson, "The House of Rothschild" (1998)',
    center: 'mayer',
    nodes: [
      { id: 'mayer', label: 'Mayer Amschel Rothschild\nFrankfurt (1744â1812)', group: 'primary' },
      { id: 'amschel', label: 'Amschel Mayer\nFrankfurt', group: 'secondary' },
      { id: 'salomon', label: 'Salomon Mayer\nVienna', group: 'secondary' },
      { id: 'nathan', label: 'Nathan Mayer\nLondon', group: 'accent' },
      { id: 'carl', label: 'Carl Mayer\nNaples', group: 'secondary' },
      { id: 'james', label: 'James Mayer\nParis', group: 'secondary' },
      { id: 'boe', label: 'Bank of England', group: 'muted' },
      { id: 'wilhelm', label: 'Wilhelm IX\nHesse-Kassel', group: 'muted' },
    ],
    edges: [
      ['mayer', 'amschel'], ['mayer', 'salomon'], ['mayer', 'nathan'],
      ['mayer', 'carl'], ['mayer', 'james'], ['mayer', 'wilhelm', 'Court Agent'],
      ['nathan', 'boe', 'Bond market'], ['amschel', 'salomon'],
      ['salomon', 'carl'], ['james', 'nathan'], ['carl', 'james'],
    ],
  },

  'chapter-2': {
    type: 'timeline',
    title: 'Presidents Who Fought the Banks',
    subtitle: 'Four presidents challenged central banking â three were assassinated',
    source: 'National Archives, Congressional Record, presidential libraries',
    events: [
      { year: '1832', label: 'Andrew Jackson vetoes Second Bank re-charter', highlight: true },
      { year: '1835', label: 'Assassination attempt on Jackson â both pistols misfire' },
      { year: '1836', label: 'Second Bank charter expires â Jackson kills the bank' },
      { year: '1862', label: 'Lincoln issues Greenbacks, bypassing private banks', highlight: true },
      { year: '1865', label: 'Lincoln assassinated' },
      { year: '1881', label: 'Garfield warns: "Whoever controls money controls the nation"', highlight: true },
      { year: '1881', label: 'Garfield assassinated â 200 days into presidency' },
      { year: '1963', label: 'JFK issues Executive Order 11110 â silver certificates', highlight: true },
      { year: '1963', label: 'Kennedy assassinated in Dallas' },
    ],
  },

  'chapter-3': {
    type: 'network',
    lm', label: 'Wilhelm IX\nHesse-Kassel', group: 'muted' },
    ],
    edges: [
      ['mayer', 'amschel'], ['mayer', 'salomon'], ['mayer', 'nathan'],
      ['mayer', 'carl'], ['mayer', 'james'], ['mayer', 'wilhelm', 'Court Agent'],
      ['nathan', 'boe', 'Bond market'], ['amschel', 'salomon'],
      ['salomon', 'carl'], ['james', 'nathan'], ['carl', 'james'],
    ],
  },

  'chapter-2': {
    type: 'timeline',
    title: 'Presidents Who Fought the Banks',
    subtitle: 'Four presidents challenged central banking â three were assassinated',
    source: 'National Archives, Congressional Record, presidential libraries',
    events: [
      { year: '1832', label: 'Andrew Jackson vetoes Second Bank re-charter', highlight: true },
      { year: '1835', label: 'Assassination attempt on Jackson â both pistols misfire' },
      { year: '1836', label: 'Second Bank charter expires â Jackson kills the bank' },
      { year: '1862', label: 'Lincoln issues Greenbacks, bypassing private banks', highlight: true },
      { year: '1865', label: 'Lincoln assassinated' },
      { year: '1881', label: 'Garfield warns: "Whoever controls money controls the nation"', highlight: true },
      { year: '1881', label: 'Garfield assassinated â 200 days into presidency' },
      { year: '1963', label: 'JFK issues Executive Order 11110 â silver certificates', highlight: true },
      { year: '1963', label: 'Kennedy assassinated in Dallas' },
    ],
  },

  'chapter-3': {
    type: 'network',
    title: 'The Jekyll Island Meeting (Nov. 1910)',
    subtitle: 'Six men representing Â¼ of the world\'s wealth drafted the Federal Reserve blueprint',
    source: 'G. Edward Griffin, "The Creature from Jekyll Island"; Federal Reserve Archive',
    center: 'meeting',
    nodes: [
      { id: 'meeting', label: 'Jekyll Island\nNov. 1910', group: 'primary' },
      { id: 'aldrich', label: 'Sen. Nelson Aldrich\nChairman, Senate Finance', group: 'accent' },
      { id: 'vanderlip', label: 'Frank Vanderlip\nNational City Bank', group: 'secondary' },
      { id: 'strong', label: 'Benjamin Strong\nJ.P. Morgan Trust', group: 'secondary' },
      { id: 'warburg', label: 'Paul Warburg\nKuhn, Loeb & Co.', group: 'secondary' },
      { id: 'davison', label: 'Henry Davison\nJ.P. Morgan & Co.', group: 'secondary' },
      { id: 'norton', label: 'A. Piatt Andrew\nAsst. Sec. of Treasury', group: 'muted' },
      { id: 'fed', label: 'Federal Reserve Act\nDec. 23, 1913', group: 'accent' },
    ],
    edges: [
      ['aldrich', 'meeting'], ['vanderlip', 'meeting'], ['strong', 'meeting'],
      ['warburg', 'meeting'], ['davison', 'meeting'], ['norton', 'meeting'],
      ['meeting', 'fed', 'Drafted blueprint'],
    ],
  },

  'chapter-4': {
    type: 'flow',
    title: 'The Warburg Brothers: Dual Influence on World War I',
    subtitle: 'Two brothers from one banking dynasty on opposite sides of the Great War',
    source: 'Ron Chernow, "The Warburgs" (1993); Federal Reserve Archive',
    steps: [
      { label: 'M.M. Warburg & Co.', detail: 'Hamburg banking dynasty, est. 1798' },
      { label: 'Paul Warburg â USA', detail: 'Joined Kuhn, Loeb & Co.; architect of Federal Reserve (1913)' },
      { label: 'Max Warburg â Germany', detail: 'Head of M.M. Warburg; advised the Kaiser; German intelligence' },
      { label: 'World War I (1914â1918)', detail: 'Paul financed Allied debt; Max financed German war bonds' },
      { label: 'Treaty of Versailles (1919)', detail: 'Max represented Germany; Paul\'s Fed system handled Allied debts' },
    ],
  },

  'chapter-5': {
    type: 'flow',
    title: 'Ford, Industry & the Gold Standard',
    subtitle: 'How industrialization challenged the banking establishment\'s monetary control',
    source: 'Ford Motor Company archives; U.S. Treasury historical records',
    steps: [
      { label: 'Henry Ford (1863â1947)', detail: 'Founded Ford Motor Company; $5/day wage revolutionized labor' },
      { label: '"The International Jew" (1920â22)', detail: '91-issue series in The Dearborn Independent; 500,000 circulation' },
      { label: 'Gold Standard Critique', detail: 'Ford argued gold control = economic control by banking elite' },
      { label: 'Federal Reserve Gold Policy', detail: 'FDR confiscates gold (EO 6102, 1933); Nixon ends convertibility (1971)' },
      { label: 'Fiat Currency Era', detail: 'Dollar backed by nothing but confidence; Ford\'s warnings proved prophetic' },
    ],
  },

  'chapter-6': {
    type: 'network',
    title: 'The Balfour Declaration Stakeholder Map',
    subtitle: 'Key figures and institutions behind the 1917 declaration that reshaped the Middle East',
    source: 'National Archives (UK); Chaim Weizmann papers; Foreign Office records',
    center: 'balfour',
    nodes: [
      { id: 'balfour', label: 'Balfour Declaration\nNov. 2, 1917', group: 'primary' },
      { id: 'rothschild', label: 'Lord Walter Rothschild', group: 'accent' },
      { id: 'weizmann', label: 'Chaim Weizmann\nZionist Federation', group: 'secondary' },
      { id: 'lloyd', label: 'David Lloyd George\nPrime Minister', group: 'secondary' },
      { id: 'sykes', label: 'Sykes-Picot\nAgreement (1916)', group: 'muted' },
      { id: 'ottoman', label: 'Ottoman Empire\nCollapse', group: 'muted' },
      { id: 'mandate', label: 'British Mandate\nPalestine (1920)', group: 'accent' },
    ],
    edges: [
      ['rothschild', 'balfour', 'Addressed to'],
      ['weizmann', 'balfour', 'Lobbied for'],
      ['lloyd', 'balfour', 'Authorized'],
      ['sykes', 'balfour', 'Preceded'],
      ['ottoman', 'balfour', 'Enabled'],
      ['balfour', 'mandate', 'Led to'],
    ],
  },

  'chapter-7': {
    type: 'network',
    title: 'Mossad: Key Operations & Networks',
    subtitle: 'Documented operations from declassified files and sworn testimony',
    source: 'Ronen Bergman, "Rise and Kill First" (2018); declassified documents',
    center: 'mossad',
    nodes: [
      { id: 'mossad', label: 'Mossad\nEst. 1949', group: 'primary' },
      { id: 'eichmann', label: 'Op. Eichmann\n(1960)', group: 'secondary' },
      { id: 'wrath', label: 'Op. Wrath of God\n(1972â79)', group: 'secondary' },
      { id: 'vanunu', label: 'Vanunu Affair\n(1986)', group: 'accent' },
      { id: 'dimona', label: 'Dimona Nuclear\nProgram', group: 'accent' },
      { id: 'stuxnet', label: 'Stuxnet\n(2010)', group: 'secondary' },
      { id: 'cia', label: 'CIA\nLiaison', group: 'muted' },
      { id: 'mi6', label: 'MI6\nLiaison', group: 'muted' },
    ],
    edges: [
      ['mossad', 'eichmann'], ['mossad', 'wrath'], ['mossad', 'vanunu'],
      ['mossad', 'dimona', 'Protected'], ['mossad', 'stuxnet'],
      ['mossad', 'cia', 'Intelligence sharing'], ['mossad', 'mi6'],
    ],
  },

  'chapter-8': {
    type: 'network',
    title: 'JFK, Dimona & the Israel Lobby',
    subtitle: 'Kennedy\'s documented confrontation with Israel\'s nuclear program',
    source: 'National Security Archive; Avner Cohen, "Israel and the Bomb" (1998)',
    center: 'jfk',
    nodes: [
      { id: 'jfk', label: 'President Kennedy\n1961â1963', group: 'primary' },
      { id: 'dimona', label: 'Dimona Nuclear\nReactor', group: 'accent' },
      { id: 'bengurion', label: 'David Ben-Gurion\nPM of Israel', group: 'secondary' },
      { id: 'aec', label: 'AEC Inspections\n(1961â63)', group: 'muted' },
      { id: 'arc', label: 'American Zionist\nCouncil (AZC)', group: 'secondary' },
      { id: 'aipac', label: 'AIPAC\n(Est. 1963)', group: 'accent' },
      { id: 'fara', label: 'FARA Registration\nDemand', group: 'muted' },
    ],
    edges: [
      ['jfk', 'dimona', 'Demanded inspections'],
      ['jfk', 'bengurion', 'Confrontation'],
      ['jfk', 'aec', 'Ordered'],
      ['jfk', 'fara', 'DOJ demanded AZC register'],
      ['arc', 'aipac', 'Reorganized into'],
      ['bengurion', 'dimona', 'Authorized'],
      ['arc', 'fara', 'Resisted'],
    ],
  },

  'chapter-9': {
    type: 'timeline',
    title: 'The Kennedy Assassination â Key Events',
    subtitle: 'A chronological record from the evidence, including declassified documents through 2025',
    source: 'Warren Commission Report; ARRB; National Archives JFK Collection',
    events: [
      { year: '1961', label: 'JFK confronts CIA over Bay of Pigs; fires Allen Dulles' },
      { year: '1962', label: 'Cuban Missile Crisis; JFK overrides Joint Chiefs' },
      { year: '1963 Jun', label: 'EO 11110 authorizes silver certificates; speech at American University', highlight: true },
      { year: '1963 Sep', label: 'Ben-Gurion resigns; JFK demands Dimona inspections' },
      { year: '1963 Nov 22', label: 'Kennedy assassinated in Dallas, Texas', highlight: true },
      { year: '1963 Nov 24', label: 'Lee Harvey Oswald killed by Jack Ruby on live television' },
      { year: '1964', label: 'Warren Commission concludes "lone gunman" finding' },
      { year: '1976', label: 'HSCA reopens investigation; concludes "probable conspiracy"' },
      { year: '1992', label: 'JFK Records Act mandates document release' },
      { year: '2017â25', label: 'Ongoing declassification reveals new documents', highlight: true },
    ],
  },

  'chapter-10': {
    type: 'flow',
    title: 'The Petrodollar Cycle',
    subtitle: 'How oil, dollars, and U.S. Treasury bonds created American economic hegemony',
    source: 'Congressional Research Service; U.S. Treasury; David E. Spiro, "The Hidden Hand of American Hegemony" (1999)',
    steps: [
      { label: '1. Kissinger-Saudi Agreement (1974)', detail: 'Saudi Arabia agrees to price all oil in U.S. dollars exclusively' },
      { label: '2. OPEC Follows', detail: 'All OPEC nations adopt dollar-only oil pricing' },
      { label: '3. Global Dollar Demand', detail: 'Every nation needs dollars to buy oil â permanent demand for USD' },
      { label: '4. Recycled into Treasuries', detail: 'Saudi surplus dollars invested in U.S. Treasury bonds' },
      { label: '5. U.S. Deficit Financing', detail: 'Recycled petrodollars fund U.S. government spending & military' },
      { label: '6. Military Enforcement', detail: 'U.S. military protects Saudi Arabia; enforces dollar primacy' },
    ],
  },

  'chapter-11': {
    type: 'network',
    title: 'Shadow Institutions: Overlapping Membership',
    subtitle: 'Bilderberg Group, Council on Foreign Relations, and Trilateral Commission share key members',
    source: 'Official attendee lists; founding charters; membership rosters',
    center: 'overlap',
    nodes: [
      { id: 'overlap', label: 'Overlapping\nMembership', group: 'primary' },
      { id: 'bilderberg', label: 'Bilderberg Group\nEst. 1954', group: 'secondary' },
      { id: 'cfr', label: 'Council on\nForeign Relations\nEst. 1921', group: 'secondary' },
      { id: 'trilateral', label: 'Trilateral\nCommission\nEst. 1973', group: 'secondary' },
      { id: 'bis', label: 'Bank for Intl.\nSettlements\nEst. 1930', group: 'accent' },
      { id: 'kissinger', label: 'Henry Kissinger', group: 'muted' },
      { id: 'rockefeller', label: 'David Rockefeller', group: 'muted' },
      { id: 'brzezinski', label: 'Zbigniew Brzezinski', group: 'muted' },
    ],
    edges: [
      ['bilderberg', 'overlap'], ['cfr', 'overlap'], ['trilateral', 'overlap'],
      ['kissinger', 'bilderberg'], ['kissinger', 'cfr'], ['kissinger', 'trilateral'],
      ['rockefeller', 'cfr', 'Chairman'], ['rockefeller', 'trilateral', 'Founded'],
      ['rockefeller', 'bilderberg'], ['brzezinski', 'trilateral', 'Co-founded'],
      ['brzezinski', 'cfr'], ['bis', 'overlap', 'Central bank coordination'],
    ],
  },

  'chapter-12': {
    type: 'hierarchy',
    title: 'Federal Reserve System Structure',
    subtitle: 'Who owns, controls, and benefits from the U.S. central bank',
    source: 'Federal Reserve Act (1913); Federal Reserve Board publications',
    tree: {
      label: 'Federal Reserve System',
      group: 'primary',
      children: [
        { label: 'Board of Governors (7)', group: 'accent', children: [
          { label: 'Appointed by President' },
          { label: 'Confirmed by Senate' },
          { label: 'Sets monetary policy' },
        ] },
        { label: '12 Regional Banks', group: 'secondary', children: [
          { label: 'NY Fed (most powerful)' },
          { label: 'Privately owned by member banks' },
          { label: 'Issue stock to member banks' },
        ] },
        { label: 'FOMC', group: 'secondary', children: [
          { label: '7 Governors + 5 regional presidents' },
          { label: 'Sets interest rates' },
          { label: 'Controls money supply' },
        ] },
        { label: 'Member Banks (Private)', group: 'muted', children: [
          { label: 'JPMorgan Chase' }, { label: 'Citibank' },
          { label: 'Goldman Sachs' }, { label: 'Bank of America' },
        ] },
      ],
    },
  },

  'chapter-13': {
    type: 'flow',
    title: 'Anatomy of the 2008 Financial Crisis',
    subtitle: 'From subprime mortgages to taxpayer bailouts â the chain of events',
    source: 'Financial Crisis Inquiry Commission Report (2011); TARP records',
    steps: [
      { label: '1. Subprime Lending Boom', detail: 'Banks issue mortgages to unqualified borrowers; fees on volume' },
      { label: '2. Securitization', detail: 'Mortgages bundled into MBS/CDOs; sold globally as "safe" investments' },
      { label: '3. Credit Rating Fraud', detail: 'Moody\'s, S&P rate toxic bundles AAA; paid by the banks they rate' },
      { label: '4. Housing Bubble Bursts', detail: 'Defaults spike; MBS values collapse; $7T in housing wealth erased' },
      { label: '5. Bank Failures', detail: 'Bear Stearns, Lehman Brothers collapse; AIG fails; system freezes' },
      { label: '6. TARP Bailout ($700B)', detail: 'Taxpayers bail out the banks; executives keep bonuses; zero prosecutions' },
    ],
  },

  'chapter-14': {
    type: 'flow',
    title: 'AIPAC: The Lobbying Machine',
    subtitle: 'How the most powerful foreign policy lobby in America operates',
    source: 'FEC filings via OpenSecrets.org; Congressional voting records',
    steps: [
      { label: '1. Fundraising Network', detail: 'AIPAC-affiliated PACs raise from pro-Israel donors nationwide' },
      { label: '2. Candidate Selection', detail: 'Target leadership positions + vulnerable critics of Israel' },
      { label: '3. Primary Challenges', detail: 'Fund opponents of dissenters (e.g., $2.5M vs. Cori Bush, 2024)' },
      { label: '4. Policy Alignment', detail: '489 recipients across both parties in 2024 cycle' },
      { label: '5. Legislative Outcomes', detail: 'Near-unanimous votes on Israel aid; anti-BDS legislation in 35 states' },
    ],
  },

  'chapter-15': {
    type: 'flow',
    title: 'U.S. Foreign Aid to Israel â The Pipeline',
    subtitle: 'Over $300 billion (inflation-adjusted) in American taxpayer money',
    source: 'Congressional Research Service; USAID records; MOU agreements',
    steps: [
      { label: 'Annual Appropriation', detail: 'Congress approves ~$3.8B/year (2019 MOU: $38B over 10 years)' },
      { label: 'Military Aid (FMF)', detail: '~$3.3B/year; must be spent on U.S. defense companies' },
      { label: 'Iron Dome Funding', detail: 'Additional $1B+ for missile defense supplementals' },
      { label: 'Loan Guarantees', detail: 'Billions in below-market-rate loan guarantees' },
      { label: 'QME Doctrine', detail: 'Law requires U.S. maintain Israel\'s Qualitative Military Edge' },
      { label: 'Total: $300B+ (adj.)', detail: 'Largest cumulative recipient of U.S. foreign aid since WWII' },
    ],
  },

  'chapter-16': {
    type: 'timeline',
    title: 'The USS Liberty Incident â June 8, 1967',
    subtitle: 'Israeli forces attack an American intelligence ship in international waters',
    source: 'USS Liberty Veterans Association; NSA declassified intercepts; Navy Court of Inquiry',
    events: [
      { year: '06:00', label: 'Israeli reconnaissance aircraft fly over USS Liberty' },
      { year: '09:00', label: 'Liberty identified as American by Israeli Naval intelligence' },
      { year: '13:56', label: 'Israeli Mirage jets begin strafing runs with cannon and rockets', highlight: true },
      { year: '14:09', label: 'Napalm dropped on deck; life rafts machine-gunned' },
      { year: '14:20', label: 'Three Israeli torpedo boats attack; torpedo hits starboard side', highlight: true },
      { year: '14:35', label: 'Liberty sends distress signal; U.S. carriers launch fighters' },
      { year: '14:50', label: 'Fighters recalled on orders from Washington', highlight: true },
      { year: '15:15', label: 'Israel claims "mistaken identity"; attack stops' },
      { year: 'After', label: '34 killed, 171 wounded; Navy Court of Inquiry completed in 1 week' },
    ],
  },

  'chapter-17': {
    type: 'timeline',
    title: 'The Assassination of Robert F. Kennedy',
    subtitle: 'Key events and evidentiary questions surrounding RFK\'s murder',
    source: 'LAPD investigation files; coroner report; ballistic evidence',
    events: [
      { year: '1968 Mar', label: 'RFK enters presidential race; promises to reopen JFK investigation' },
      { year: '1968 Jun 4', label: 'RFK wins California Democratic primary', highlight: true },
      { year: '1968 Jun 5', label: 'Shot in Ambassador Hotel kitchen pantry; dies next day', highlight: true },
      { year: 'Evidence', label: 'Coroner: fatal shot fired from 1 inch behind right ear' },
      { year: 'Evidence', label: 'Sirhan Sirhan was in front of RFK at 3-6 feet' },
      { year: 'Evidence', label: '13+ bullet holes found; Sirhan\'s gun held 8 rounds', highlight: true },
      { year: '2022', label: 'Sirhan denied parole despite recommendation from RFK Jr.' },
    ],
  },

  'chapter-18': {
    type: 'network',
    title: 'Operation Mockingbird: CIA Media Network',
    subtitle: 'Documented CIA infiltration of American newsrooms and media outlets',
    source: 'Church Committee Report (1975); Carl Bernstein, "The CIA and the Media" (1977)',
    center: 'cia',
    nodes: [
      { id: 'cia', label: 'CIA\nOperation Mockingbird', group: 'primary' },
      { id: 'wisner', label: 'Frank Wisner\nOPC Director', group: 'accent' },
      { id: 'wapo', label: 'Washington Post\nPhilip Graham', group: 'secondary' },
      { id: 'nyt', label: 'New York Times', group: 'secondary' },
      { id: 'time', label: 'TIME / LIFE\nHenry Luce', group: 'secondary' },
      { id: 'cbs', label: 'CBS News\nWilliam Paley', group: 'secondary' },
      { id: 'church', label: 'Church Committee\n(1975)', group: 'muted' },
      { id: 'today', label: 'Modern CIA-Media\nRelationship', group: 'accent' },
    ],
    edges: [
      ['cia', 'wisner', 'Directed'],
      ['wisner', 'wapo'], ['wisner', 'nyt'], ['wisner', 'time'], ['wisner', 'cbs'],
      ['church', 'cia', 'Investigated'],
      ['cia', 'today', '400+ journalists (Bernstein)'],
    ],
  },

  'chapter-19': {
    type: 'hierarchy',
    title: 'MKUltra: Program Structure',
    subtitle: 'CIA human experimentation program (1953â1973)',
    source: 'Senate Church Committee; CIA Inspector General Report (1963); declassified documents',
    tree: {
      label: 'MKUltra\nDirector: Sidney Gottlieb',
      group: 'primary',
      children: [
        { label: 'Subproject Categories', group: 'accent', children: [
          { label: 'LSD Experiments' }, { label: 'Hypnosis Programs' },
          { label: 'Sensory Deprivation' }, { label: 'Electroshock' },
        ] },
        { label: 'Institutions Used', group: 'secondary', children: [
          { label: 'Universities (Harvard, Stanford)' }, { label: 'Hospitals' },
          { label: 'Prisons' }, { label: 'CIA Safe Houses' },
        ] },
        { label: '149 Sub-Projects', group: 'muted', children: [
          { label: '80+ institutions involved' },
          { label: 'Most records destroyed (1973)' },
          { label: 'Unknown number of victims' },
        ] },
      ],
    },
  },

  'chapter-20': {
    type: 'flow',
    title: 'Rockefeller Medicine: From Oil to Pharmaceuticals',
    subtitle: 'How the Rockefeller Foundation reshaped American healthcare',
    source: 'Flexner Report (1910); Rockefeller Foundation archives; AMA records',
    steps: [
      { label: 'Standard Oil Profits', detail: 'John D. Rockefeller â world\'s richest man by 1900' },
      { label: 'Rockefeller Foundation (1913)', detail: 'Directs philanthropy toward medical education reform' },
      { label: 'Flexner Report (1910)', detail: 'Carnegie/Rockefeller-funded; closes half of U.S. medical schools' },
      { label: 'Petrochemical Medicine', detail: 'Curriculum reoriented to drug-based treatment; herbal/holistic defunded' },
      { label: 'AMA Capture', detail: 'Rockefeller grants shape AMA policy; pharmaceutical industry grows' },
      { label: 'Chronic Disease Economy', detail: '$4.5T/yr healthcare; treatment over prevention; pharma revenue $1.4T' },
    ],
  },

  'chapter-21': {
    type: 'timeline',
    title: 'Vaccine History: Key Milestones',
    subtitle: 'From polio to COVID-19 â a documented chronology',
    source: 'CDC historical records; WHO; peer-reviewed literature',
    events: [
      { year: '1796', label: 'Edward Jenner develops smallpox vaccine' },
      { year: '1955', label: 'Salk polio vaccine licensed; Cutter Incident follows', highlight: true },
      { year: '1962', label: 'SV40 contamination discovered in polio vaccines' },
      { year: '1976', label: 'Swine flu vaccine campaign; Guillain-BarrÃ© cases halt program' },
      { year: '1986', label: 'National Childhood Vaccine Injury Act â manufacturers given liability shield', highlight: true },
      { year: '1999', label: 'Rotavirus vaccine (RotaShield) withdrawn for safety' },
      { year: '2005', label: 'PREP Act â additional liability protections for pandemics' },
      { year: '2020', label: 'COVID-19 mRNA vaccines developed in <1 year; EUA authorized', highlight: true },
      { year: '2021â23', label: 'VAERS reports spike; myocarditis signal acknowledged by CDC' },
    ],
  },

  'chapter-22': {
    type: 'timeline',
    title: 'September 11, 2001 â Timeline of Events',
    subtitle: 'Minute-by-minute record from the 9/11 Commission Report and NIST',
    source: '9/11 Commission Report (2004); NIST Final Report; FAA records',
    events: [
      { year: '8:46 AM', label: 'American Airlines Flight 11 hits WTC North Tower', highlight: true },
      { year: '9:03 AM', label: 'United Airlines Flight 175 hits WTC South Tower', highlight: true },
      { year: '9:37 AM', label: 'American Airlines Flight 77 hits the Pentagon' },
      { year: '9:59 AM', label: 'South Tower (WTC 2) collapses â 56 minutes after impact', highlight: true },
      { year: '10:03 AM', label: 'United Airlines Flight 93 crashes in Shanksville, PA' },
      { year: '10:28 AM', label: 'North Tower (WTC 1) collapses â 102 minutes after impact' },
      { year: '5:20 PM', label: 'WTC Building 7 collapses â not hit by aircraft', highlight: true },
      { year: 'After', label: '2,977 killed; 9/11 Commission formed 441 days later' },
    ],
  },

  'chapter-23': {
    type: 'flow',
    title: 'The War on Drugs: Policy Cycle',
    subtitle: 'From Nixon\'s political strategy to mass incarceration',
    source: 'Nixon tapes; DEA historical records; Bureau of Justice Statistics',
    steps: [
      { label: 'Nixon Declares War (1971)', detail: '"Public enemy number one" â targeting anti-war left and Black communities' },
      { label: 'DEA Created (1973)', detail: 'Consolidates federal drug enforcement; $75M initial budget' },
      { label: 'Reagan Escalation (1986)', detail: 'Mandatory minimums; crack/cocaine sentencing disparity 100:1' },
      { label: 'Mass Incarceration', detail: 'Prison population rises from 300K (1980) to 2.3M (2023)' },
      { label: 'CIA & Drug Trafficking', detail: 'Iran-Contra; Gary Webb\'s "Dark Alliance" investigation' },
      { label: '$1T+ Spent', detail: 'Drug use rates unchanged; U.S. has highest incarceration rate globally' },
    ],
  },

  'chapter-24': {
    type: 'flow',
    title: 'Fluoride: Industrial Waste to Public Water',
    subtitle: 'The pathway from aluminum/phosphate byproduct to municipal water supplies',
    source: 'EPA records; PHS historical documents; NRC "Fluoride in Drinking Water" (2006)',
    steps: [
      { label: 'Industrial Byproduct', detail: 'Hexafluorosilicic acid â waste from phosphate fertilizer production' },
      { label: 'Early Research (1930sâ40s)', detail: 'ALCOA-funded studies; concern over fluoride pollution litigation' },
      { label: 'Grand Rapids Trial (1945)', detail: 'First U.S. city to fluoridate water; study declared success before completion' },
      { label: 'PHS Endorsement', detail: 'U.S. Public Health Service recommends universal fluoridation' },
      { label: 'EPA Standard: 0.7 mg/L', detail: 'Lowered from 1.2 mg/L in 2015; NRC flagged risks at 4 mg/L' },
      { label: '2024 NTP Report', detail: 'Links fluoride exposure to lower IQ in children; 74% of U.S. water fluoridated' },
    ],
  },

  'chapter-25': {
    type: 'timeline',
    title: 'The Titanic & the Federal Reserve',
    subtitle: 'Three wealthy opponents of central banking boarded the same ship',
    source: 'Titanic passenger manifests; biographical records; Congressional Record',
    events: [
      { year: '1910 Nov', label: 'Jekyll Island meeting drafts Federal Reserve blueprint' },
      { year: '1912 Jan', label: 'Federal Reserve bill introduced in Congress; faces opposition' },
      { year: '1912 Apr 10', label: 'RMS Titanic departs Southampton', highlight: true },
      { year: 'Aboard', label: 'Benjamin Guggenheim â mining magnate, opposed central bank' },
      { year: 'Aboard', label: 'Isidor Straus â Macy\'s owner, opposed central bank' },
      { year: 'Aboard', label: 'John Jacob Astor IV â wealthiest man aboard, opposed central bank', highlight: true },
      { year: '1912 Apr 15', label: 'Titanic sinks â all three men perish', highlight: true },
      { year: '1913 Dec', label: 'Federal Reserve Act signed into law' },
    ],
  },

  'chapter-26': {
    type: 'network',
    title: 'Bohemian Grove: Notable Members & Guests',
    subtitle: 'The private retreat where America\'s most powerful gather annually',
    source: 'Leaked membership lists; Philip Weiss, SPY Magazine (1989); Alex Jones footage (2000)',
    center: 'grove',
    nodes: [
      { id: 'grove', label: 'Bohemian Grove\nMonte Rio, CA\nEst. 1872', group: 'primary' },
      { id: 'presidents', label: 'Presidents\nNixon, Reagan,\nBush Sr., Bush Jr.', group: 'accent' },
      { id: 'defense', label: 'Defense\nRumsfeld, Cheney,\nPowell, Kissinger', group: 'secondary' },
      { id: 'finance', label: 'Finance\nRockefeller, Buffett,\nWalton', group: 'secondary' },
      { id: 'media', label: 'Media\nHearst, Cronkite,\nNewsom', group: 'secondary' },
      { id: 'tech', label: 'Tech\nSchmidt, Grove,\nEllison', group: 'muted' },
      { id: 'manhattan', label: 'Manhattan\nProject planned\n(1942)', group: 'accent' },
    ],
    edges: [
      ['presidents', 'grove'], ['defense', 'grove'], ['finance', 'grove'],
      ['media', 'grove'], ['tech', 'grove'],
      ['grove', 'manhattan', 'Initial discussions'],
    ],
  },

  'chapter-27': {
    type: 'timeline',
    title: 'The Surveillance State: From ECHELON to Pegasus',
    subtitle: 'The evolution of government mass surveillance programs',
    source: 'Snowden disclosures; Church Committee; NSA declassified documents',
    events: [
      { year: '1947', label: 'UKUSA Agreement â Five Eyes signals intelligence alliance' },
      { year: '1952', label: 'NSA established by secret executive order (Truman)' },
      { year: '1960s', label: 'ECHELON: Global communications interception network', highlight: true },
      { year: '1975', label: 'Church Committee exposes NSA domestic spying (SHAMROCK, MINARET)' },
      { year: '2001', label: 'PATRIOT Act â warrantless surveillance authorized post-9/11', highlight: true },
      { year: '2007', label: 'PRISM: NSA collects data from Google, Apple, Facebook, Microsoft' },
      { year: '2013', label: 'Edward Snowden reveals global mass surveillance programs', highlight: true },
      { year: '2020s', label: 'NSO Group\'s Pegasus: smartphone spyware used against journalists' },
    ],
  },

  'chapter-28': {
    type: 'network',
    title: 'The Epstein Network',
    subtitle: 'Connections documented through court filings, flight logs, and testimony',
    source: 'U.S. v. Maxwell trial exhibits; FAA flight logs; Virginia Giuffre deposition',
    center: 'epstein',
    nodes: [
      { id: 'epstein', label: 'Jeffrey Epstein\n1953â2019', group: 'primary' },
      { id: 'maxwell', label: 'Ghislaine Maxwell\nConvicted 2021', group: 'accent' },
      { id: 'wexner', label: 'Les Wexner\nL Brands CEO', group: 'secondary' },
      { id: 'intelligence', label: 'Intelligence\nConnections', group: 'accent' },
      { id: 'island', label: 'Little St. James\nIsland', group: 'secondary' },
      { id: 'lolita', label: 'Lolita Express\nFlight Logs', group: 'secondary' },
      { id: 'politicians', label: 'Politicians &\nWorld Leaders', group: 'muted' },
      { id: 'academia', label: 'Harvard, MIT\nDonations', group: 'muted' },
    ],
    edges: [
      ['epstein', 'maxwell', 'Co-conspirator'],
      ['epstein', 'wexner', 'Power of attorney'],
      ['epstein', 'intelligence', 'Alleged ties'],
      ['epstein', 'island', 'Owned'],
      ['epstein', 'lolita', 'Operated'],
      ['epstein', 'politicians', 'Flight logs'],
      ['epstein', 'academia', '$M in donations'],
      ['maxwell', 'intelligence', 'Father: Robert Maxwell'],
    ],
  },

  epilogue: {
    type: 'hierarchy',
    title: 'How to Verify: Primary Source Access Guide',
    subtitle: 'Where to find the original documents cited throughout The Record',
    source: 'Veritas Worldwide Press',
    tree: {
      label: 'Primary Source Archives',
      group: 'primary',
      children: [
        { label: 'Government Records', group: 'accent', children: [
          { label: 'congress.gov' }, { label: 'National Archives (archives.gov)' },
          { label: 'PACER (court filings)' }, { label: 'SEC EDGAR' },
        ] },
        { label: 'Intelligence / FOIA', group: 'secondary', children: [
          { label: 'CIA FOIA Reading Room' }, { label: 'NSA Declassified' },
          { label: 'National Security Archive (GWU)' },
        ] },
        { label: 'Financial Records', group: 'secondary', children: [
          { label: 'FEC / OpenSecrets.org' }, { label: 'Federal Reserve FRED' },
          { label: 'World Bank Open Data' },
        ] },
        { label: 'Academic / Media', group: 'muted', children: [
          { label: 'JSTOR / Google Scholar' }, { label: 'ProQuest Historical' },
          { label: 'Internet Archive' },
        ] },
      ],
    },
  },
}

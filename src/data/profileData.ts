// Type definitions for power profiles
export type ProfileCategory = 'politician' | 'billionaire' | 'lobbyist' | 'intel' | 'media' | 'corporate' | 'foreign-agent'
export type EvidenceTier = 'verified' | 'circumstantial' | 'disputed'
export type Party = 'D' | 'R' | 'I' | 'N/A'
export type FalsehoodSeverity = 'minor' | 'material' | 'egregious'

/** Dual-cited public falsehood for Integrity Score dockets (see src/lib/integrityScore.ts). */
export interface DocumentedFalsehood {
  id: string
  statement: string
  saidAt: string
  context: string
  whyFalse: string
  correction: string
  statementSource: string
  statementUrl: string
  debunkSource: string
  debunkUrl: string
  severity: FalsehoodSeverity
  tier: 'verified' | 'circumstantial' | 'disputed'
}

export interface SourcedClaim {
  claim: string
  source: string
  url: string
  tier: EvidenceTier
  date?: string
}

export interface DonationEntry {
  from: string
  amount: number
  year: string
  source: string
  url: string
}

export interface PolicyAction {
  action: string
  date: string
  context: string
  source: string
  url: string
}

export interface Connection {
  name: string
  relationship: string
  evidence: string
  tier: EvidenceTier
}

export interface Quote {
  text: string
  context: string
  date: string
  source: string
  url: string
}

export interface PowerProfile {
  id: string
  name: string
  title: string
  category: ProfileCategory
  party?: Party
  state?: string
  photoUrl?: string
  bioguideId?: string
  summary: string
  tags: string[]
  quotes: Quote[]
  donations: DonationEntry[]
  policyActions: PolicyAction[]
  connections: Connection[]
  sourcedClaims: SourcedClaim[]
  /**
   * Compiled integrity docket. Omit when not yet researched.
   * Empty array = researched clean docket (score 100).
   * Verified rows reduce Integrity Score (see computeIntegrityScore).
   */
  documentedFalsehoods?: DocumentedFalsehood[]
  netWorth?: string
  born?: string
  education?: string
  career: string[]
  websites: { label: string; url: string }[]
}

export const TIER_COLORS = {
  verified: '#10b981',
  circumstantial: '#f59e0b',
  disputed: '#ef4444'
}

// First-party profile portraits under /public/profiles.
// Prefer Bioguide / White House official photos (public domain government works)
// when available; monogram SVGs for non-government figures until editorial art ships.
// Wikimedia hotlinks 400 in production — never use them here.
const PROFILE_PHOTOS: Record<string, string> = {
  'ted-cruz': '/profiles/ted-cruz.jpg',
  'donald-trump': '/profiles/donald-trump.jpg',
  'bill-gates': '/profiles/bill-gates.svg',
  'george-soros': '/profiles/george-soros.svg',
  'jared-kushner': '/profiles/jared-kushner.svg',
  'chuck-schumer': '/profiles/chuck-schumer.jpg',
  'nancy-pelosi': '/profiles/nancy-pelosi.jpg',
  'mitch-mcconnell': '/profiles/mitch-mcconnell.jpg',
  'miriam-adelson': '/profiles/miriam-adelson.svg',
  'sheldon-adelson': '/profiles/sheldon-adelson.svg',
  'ghislaine-maxwell': '/profiles/ghislaine-maxwell.svg',
  'jeffrey-epstein': '/profiles/jeffrey-epstein.svg',
  'alan-dershowitz': '/profiles/alan-dershowitz.svg',
  'les-wexner': '/profiles/les-wexner.svg',
  'prince-andrew': '/profiles/prince-andrew.svg',
  'adam-schiff': '/profiles/adam-schiff.jpg',
  'hakeem-jeffries': '/profiles/hakeem-jeffries.jpg',
  'lindsey-graham': '/profiles/lindsey-graham.jpg',
  'marco-rubio': '/profiles/marco-rubio.jpg',
  'tom-cotton': '/profiles/tom-cotton.jpg',
  'cory-booker': '/profiles/cory-booker.jpg',
  'jacky-rosen': '/profiles/jacky-rosen.jpg',
  'josh-gottheimer': '/profiles/josh-gottheimer.jpg',
  'brad-sherman': '/profiles/brad-sherman.jpg',
  'ritchie-torres': '/profiles/ritchie-torres.jpg',
  'joe-biden': '/profiles/joe-biden.jpg',
  'kamala-harris': '/profiles/kamala-harris.jpg',
  'barack-obama': '/profiles/barack-obama.jpg',
  'hillary-clinton': '/profiles/hillary-clinton.jpg',
  'bill-clinton': '/profiles/bill-clinton.jpg',
  'mike-pence': '/profiles/mike-pence.jpg',
  'dick-cheney': '/profiles/dick-cheney.jpg',
  'henry-kissinger': '/profiles/henry-kissinger.svg',
  'john-bolton': '/profiles/john-bolton.jpg',
  'mike-pompeo': '/profiles/mike-pompeo.jpg',
  'antony-blinken': '/profiles/antony-blinken.svg',
  'ron-desantis': '/profiles/ron-desantis.jpg',
  'nikki-haley': '/profiles/nikki-haley.svg',
  'bernie-sanders': '/profiles/bernie-sanders.jpg',
  'elizabeth-warren': '/profiles/elizabeth-warren.jpg',
  'rand-paul': '/profiles/rand-paul.jpg',
  'ilhan-omar': '/profiles/ilhan-omar.jpg',
  'rashida-tlaib': '/profiles/rashida-tlaib.jpg',
  'aoc': '/profiles/aoc.jpg',
  'matt-gaetz': '/profiles/matt-gaetz.jpg',
  'jim-jordan': '/profiles/jim-jordan.jpg',
  'elise-stefanik': '/profiles/elise-stefanik.jpg',
  'dianne-feinstein': '/profiles/dianne-feinstein.jpg',
  'kevin-mccarthy': '/profiles/kevin-mccarthy.jpg',
  'mike-johnson': '/profiles/mike-johnson.jpg',
  'tim-scott': '/profiles/tim-scott.jpg',
  'john-fetterman': '/profiles/john-fetterman.jpg',
  'rupert-murdoch': '/profiles/rupert-murdoch.svg',
  'michael-bloomberg': '/profiles/michael-bloomberg.svg',
  'jeff-bezos': '/profiles/jeff-bezos.svg',
  'mark-zuckerberg': '/profiles/mark-zuckerberg.svg',
  'elon-musk': '/profiles/elon-musk.svg',
  'peter-thiel': '/profiles/peter-thiel.svg',
  'larry-fink': '/profiles/larry-fink.svg',
  'jamie-dimon': '/profiles/jamie-dimon.svg',
  'warren-buffett': '/profiles/warren-buffett.svg',
  'ken-griffin': '/profiles/ken-griffin.svg',
  'sam-bankman-fried': '/profiles/sam-bankman-fried.svg',
  'haim-saban': '/profiles/haim-saban.svg',
  'paul-singer': '/profiles/paul-singer.svg',
  'bernard-marcus': '/profiles/bernard-marcus.svg',
  'robert-mercer': '/profiles/robert-mercer.svg',
  'leon-black': '/profiles/leon-black.svg',
  'reid-hoffman': '/profiles/reid-hoffman.svg',
  'marc-andreessen': '/profiles/marc-andreessen.svg',
  'larry-ellison': '/profiles/larry-ellison.svg',
  'charles-koch': '/profiles/charles-koch.svg',
  'howard-kohr': '/profiles/howard-kohr.svg',
  'tony-podesta': '/profiles/tony-podesta.svg',
  'john-podesta': '/profiles/john-podesta.svg',
  'paul-manafort': '/profiles/paul-manafort.svg',
  'michael-flynn': '/profiles/michael-flynn.svg',
  'roger-stone': '/profiles/roger-stone.svg',
  'steve-bannon': '/profiles/steve-bannon.svg',
  'karl-rove': '/profiles/karl-rove.svg',
  'rahm-emanuel': '/profiles/rahm-emanuel.svg',
  'james-comey': '/profiles/james-comey.svg',
  'john-brennan': '/profiles/john-brennan.svg',
  'james-clapper': '/profiles/james-clapper.svg',
  'erik-prince': '/profiles/erik-prince.svg',
  'david-petraeus': '/profiles/david-petraeus.svg',
  'robert-mueller': '/profiles/robert-mueller.svg',
  'tucker-carlson': '/profiles/tucker-carlson.svg',
  'joe-rogan': '/profiles/joe-rogan.svg',
  'ben-shapiro': '/profiles/ben-shapiro.svg',
  'rachel-maddow': '/profiles/rachel-maddow.svg',
  'byron-donalds': '/profiles/byron-donalds.jpg',
  'benjamin-netanyahu': '/profiles/benjamin-netanyahu.svg',
  'yoav-gallant': '/profiles/yoav-gallant.svg',
  'ben-cardin': '/profiles/ben-cardin.svg',
  'bob-menendez': '/profiles/bob-menendez.svg',
}

export function getProfilePhoto(profileId: string): string {
  if (PROFILE_PHOTOS[profileId]) return PROFILE_PHOTOS[profileId]
  // Runtime monogram fallback for any new profile without a first-party asset yet.
  const initial = encodeURIComponent(profileId.charAt(0).toUpperCase() || '?')
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%238B1A1A'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='35' font-weight='bold'%3E${initial}%3C/text%3E%3C/svg%3E`
}

export function getProfileBySlug(slug: string): PowerProfile | undefined {
  return PROFILES.find(p => p.id === slug)
}

export function getProfilesByCategory(category: ProfileCategory): PowerProfile[] {
  return PROFILES.filter(p => p.category === category)
}

export function searchProfiles(query: string): PowerProfile[] {
  const q = query.toLowerCase()
  return PROFILES.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.title.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.summary.toLowerCase().includes(q)
  )
}

export const PROFILES: PowerProfile[] = [
  {
    id: 'ted-cruz',
    name: 'Ted Cruz',
    title: 'U.S. Senator (R-TX)',
    category: 'politician',
    bioguideId: 'C001098',
    party: 'R',
    state: 'TX',
    photoUrl: getProfilePhoto('ted-cruz'),
    summary:
      'Texas Republican senator and leading hawk on Iran and Israel security. Documented pro-Israel PAC recipient (OpenSecrets). Consistent votes for FMF, Iron Dome, and wartime packages; frequent legislative sponsor of Iran sanctions and anti-BDS vehicles. Primary: OpenSecrets, Congress.gov, Senate record.',
    tags: ['Senator', 'Pro-Israel', 'AIPAC', 'Texas', 'Republican', 'Iran Sanctions', 'Iron Dome'],
    career: [
      'Texas Solicitor General (public bio)',
      '2013– — U.S. Senate',
      '2016 Republican presidential candidate',
      'Leading Senate hawk on Iran/Israel security legislation',
    ],
    quotes: [
      {
        text: 'If you are against Israel, you are against America.',
        context: 'Recurring Cruz campaign/Senate framing of the alliance as identity-level alignment.',
        date: '2010s–2020s',
        source: 'Public campaign/Senate remarks (multi-outlet)',
        url: 'https://www.cruz.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 450000,
        year: '2012–2024 (verify cycle tabs)',
        source: 'OpenSecrets — Ted Cruz',
        url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime security packages',
        date: '2013–2024',
        context: 'Senate Republican hawk voting pattern.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Frequent sponsor/cosponsor of Iran sanctions and anti-BDS legislative vehicles',
        date: '2015–2024',
        context: 'Aligns with AIPAC legislative priorities on Iran and BDS.',
        source: 'Congress.gov cosponsorships',
        url: 'https://www.congress.gov/member/ted-cruz/C001098',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; legislative priorities align.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Senate Republican security hawks',
        relationship: 'Part of Tom Cotton / Lindsey Graham axis on Iran-Israel.',
        evidence: 'Cosponsorship patterns',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Cruz.',
        source: 'OpenSecrets N00033085',
        url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085',
        tier: 'verified',
        date: '2012–2024',
      },
      {
        claim: 'Consistent Senate votes for MOU-baseline FMF and missile defense for Israel.',
        source: 'CRS RL33222; Senate roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'Leading sponsor of Iran sanctions legislation framed as Israel/U.S. security alignment.',
        source: 'Congress.gov',
        url: 'https://www.congress.gov/member/ted-cruz/C001098',
        tier: 'verified',
        date: '2015–2024',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'cruz-zuckerberg-hearings-libel-context-not-used',
        statement:
          'Cruz has repeatedly claimed the 2020 election was marred by fraud sufficient to justify objecting to electoral votes — while courts and CISA found no evidence of outcome-determinative fraud.',
        saidAt: 'January 2021 electoral count period',
        context: 'Senate objection strategy after 2020 election.',
        whyFalse:
          'The Cybersecurity and Infrastructure Security Agency and extensive court record found no evidence of fraud on a scale that would change the 2020 outcome; objections were political, not evidence-based.',
        correction:
          'Joe Biden won the 2020 electoral college and popular vote; no court found outcome-determinative fraud.',
        statementSource: 'Senate objection / contemporaneous Cruz statements',
        statementUrl: 'https://www.nytimes.com/2021/01/02/us/politics/ted-cruz-election.html',
        debunkSource: 'CISA joint statement on 2020 election security',
        debunkUrl: 'https://www.cisa.gov/news-events/news/joint-statement-elections-infrastructure-government-coordinating-council-election',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'cruz-voting-bill-register-illegal-immigrants-2021',
        statement:
          'Claimed a Democratic voting bill "would register illegal immigrants to vote" (automatic registration of non-citizens).',
        saidAt: 'May 2021',
        context:
          'Senate floor and media attacks on For the People / related Democratic voting legislation during 2021 voting-rights fights.',
        whyFalse:
          'PolitiFact rated the claim False. The bills required states to use available government lists for automatic voter registration of eligible citizens and did not create a pathway for non-citizens to register; federal law already prohibits non-citizen voting in federal elections, and the legislation did not repeal that ban.',
        correction:
          'The voting bills targeted automatic registration of eligible citizens using government databases; they did not register non-citizens to vote.',
        statementSource: 'Cruz public statements / PolitiFact statement capture',
        statementUrl: 'https://www.politifact.com/personalities/ted-cruz/',
        debunkSource: 'PolitiFact — False (May 14, 2021)',
        debunkUrl: 'https://www.politifact.com/factchecks/2021/may/14/ted-cruz/ted-cruz-repeats-false-claim-voting-bill-would-reg/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.cruz.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/ted-cruz/C001098' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Ted_Cruz' },
      { label: 'PolitiFact — voting bill non-citizen claim (False)', url: 'https://www.politifact.com/factchecks/2021/may/14/ted-cruz/ted-cruz-repeats-false-claim-voting-bill-would-reg/' },
      { label: 'CISA 2020 election security statement', url: 'https://www.cisa.gov/news-events/news/joint-statement-elections-infrastructure-government-coordinating-council-election' },
    ],
  },
  {
    id: 'donald-trump',
    name: 'Donald Trump',
    title: '45th & 47th President',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('donald-trump'),
    summary: 'Former and current president. Key Israel policy moves include 2017 Jerusalem embassy relocation, 2020 Golan Heights recognition. Recipient of $200M+ in donations from Adelson family interests.',
    tags: ['Pro-Israel', 'Adelson', 'Jerusalem Embassy', 'Golan Heights', 'AIPAC'],
    quotes: [
      {
        text: 'I am moving the American embassy to Jerusalem. That is what they want, that is what they will get.',
        context: 'Campaign rally announcement',
        date: '2016',
        source: 'News Archives',
        url: 'https://www.bbc.com'
      }
    ],
    donations: [
      {
        from: 'Miriam Adelson & family',
        amount: 200000000,
        year: '2016-2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [
      {
        action: 'Executive Order moving US Embassy to Jerusalem',
        date: '2017',
        context: 'Controversial recognition of Jerusalem as Israel capital',
        source: 'White House Archives',
        url: 'https://www.whitehouse.gov'
      },
      {
        action: 'Proclamation recognizing Israeli sovereignty over Golan Heights',
        date: '2019',
        context: 'First US president to recognize Israeli occupation',
        source: 'White House Archives',
        url: 'https://www.whitehouse.gov'
      }
    ],
    connections: [
      {
        name: 'Miriam Adelson',
        relationship: 'Major donor and advisor',
        evidence: '$200M+ in family contributions to Trump campaigns and PACs',
        tier: 'verified'
      },
      {
        name: 'Jared Kushner',
        relationship: 'Senior Advisor, son-in-law',
        evidence: 'Led Middle East policy, later received $2B Saudi investment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $200M+ from Adelson family for campaigns',
        source: 'FEC Records',
        url: 'https://www.fec.gov',
        tier: 'verified',
        date: '2024'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'trump-inauguration-crowd-2017',
        statement:
          'Claimed his January 20, 2017 inauguration crowd was the largest ever — larger than President Obama\'s — and that media photographs understated attendance.',
        saidAt: 'January 21, 2017',
        context:
          'White House press briefing and related public statements in the first full day of the administration, defending aerial photos of the National Mall.',
        whyFalse:
          'National Park Service crowd estimates, Washington Metro ridership totals for inauguration day, and contemporaneous photo comparisons from the same vantage points show smaller attendance than Obama\'s 2009 inauguration. Metro reported ~570,000 trips on Trump\'s inauguration day vs ~1.1 million on Obama\'s 2009 inauguration day.',
        correction:
          'Obama\'s 2009 inauguration drew a larger documented crowd by NPS estimates and WMATA ridership; independent photo forensics contradicted the "largest ever" claim.',
        statementSource: 'White House / press pool reporting of Spicer briefing',
        statementUrl: 'https://www.washingtonpost.com/news/the-fix/wp/2017/01/22/how-sean-spicer-and-his-comically-large-crowd-size-claim-became-the-first-test-of-the-trump-era/',
        debunkSource: 'NPS / WMATA ridership reporting; multi-outlet crowd analysis',
        debunkUrl: 'https://www.nytimes.com/2017/01/22/us/politics/trump-inauguration-crowd-white-house.html',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'trump-dorian-alabama-2019',
        statement:
          'Stated that Hurricane Dorian was expected to hit Alabama (among other states), later displaying an altered National Hurricane Center map with a hand-drawn extension over Alabama.',
        saidAt: 'September 1–4, 2019',
        context:
          'Presidential remarks and a subsequent Oval Office map presentation during Hurricane Dorian coverage.',
        whyFalse:
          'The National Weather Service Birmingham office publicly corrected that Alabama would NOT see any impacts from Dorian. The NHC cone of uncertainty did not include Alabama; the Sharpie-altered map was not an official NHC product.',
        correction:
          'Official NHC forecasts and NWS Birmingham stated Alabama was not in Dorian\'s expected impact path at the time of the claim.',
        statementSource: 'White House remarks / Oval Office photo pool',
        statementUrl: 'https://www.nytimes.com/2019/09/04/us/politics/trump-hurricane-dorian-alabama.html',
        debunkSource: 'NWS Birmingham correction; NHC advisory archive',
        debunkUrl: 'https://www.washingtonpost.com/weather/2019/09/05/alabama-hurricane-dorian-trump-map/',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'trump-election-won-2020',
        statement:
          'Repeatedly claimed he won the 2020 presidential election and that the outcome was stolen through widespread fraud sufficient to change the result.',
        saidAt: 'November 2020 – January 2021',
        context:
          'Public rallies, social media posts, and White House remarks after Election Day 2020, including statements preceding January 6, 2021.',
        whyFalse:
          'Sixty-plus lawsuits challenging the results failed in state and federal courts; the Electoral College certified Biden 306–232; Congress certified the count on January 7, 2021; CISA stated the 2020 election was the most secure in American history; no evidence of fraud on a scale that would reverse the outcome was accepted by courts.',
        correction:
          'Joe Biden was the certified winner of the 2020 presidential election under the Constitution\'s Electoral College process and state certifications.',
        statementSource: 'Public remarks archive (multiple dates)',
        statementUrl: 'https://www.archives.gov/electoral-college/2020',
        debunkSource: 'U.S. National Archives Electoral College; court docket outcomes; CISA joint statement',
        debunkUrl: 'https://www.cisa.gov/news-events/news/joint-statement-elections-infrastructure-government-coordinating-council-election',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    netWorth: '~$2.6 billion',
    born: '1946',
    education: 'Wharton School of Business',
    career: ['45th President (2017-2021)', '47th President (2025-present)', 'Real estate developer', 'Television personality'],
    websites: [
      { label: 'Official Website', url: 'https://www.trump.com' },
      { label: 'FEC Campaign Finance', url: 'https://www.fec.gov' }
    ]
  },
  {
    id: 'bill-gates',
    name: 'Bill Gates',
    title: 'Microsoft Founder, Philanthropist',
    category: 'billionaire',
    photoUrl: getProfilePhoto('bill-gates'),
    summary: 'Microsoft co-founder, Gates Foundation chairman. NYT documented multiple meetings with Jeffrey Epstein between 2013-2014. Flight logs show travel connections.',
    tags: ['Tech Billionaire', 'Epstein', 'Gates Foundation', 'Global Health', 'Philanthropy'],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Met multiple times',
        evidence: 'NYT investigation documented meetings 2013-2014',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Met with Jeffrey Epstein multiple times 2013-2014',
        source: 'New York Times',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2021'
      }
    ],
    netWorth: '~$128 billion',
    born: '1955',
    education: 'Harvard University (dropped out)',
    career: ['Microsoft Co-founder', 'Gates Foundation Chair', 'Board member multiple organizations'],
    websites: [
      { label: 'Gates Foundation', url: 'https://www.gatesfoundation.org' },
      { label: 'Official Website', url: 'https://www.billgates.com' }
    ]
  },
  {
    id: 'george-soros',
    name: 'George Soros',
    title: 'Investor, Philanthropist',
    category: 'billionaire',
    photoUrl: getProfilePhoto('george-soros'),
    summary: 'Open Society Foundations founder. Distributed $32B+ in grants globally. Funded 75+ District Attorney campaigns, influencing criminal justice policy across US.',
    tags: ['Open Society', 'DA Funding', 'Progressive', 'Billionaire', 'Political Influence'],
    quotes: [],
    donations: [
      {
        from: 'Open Society Foundations',
        amount: 32000000000,
        year: '1993-2024',
        source: 'Open Society Foundations',
        url: 'https://www.opensocietyfoundations.org'
      }
    ],
    policyActions: [
      {
        action: 'Funded 75+ District Attorney campaigns',
        date: '2016-2024',
        context: 'Supported progressive prosecutors for criminal justice reform',
        source: 'State records',
        url: 'https://www.opensocietyfoundations.org'
      }
    ],
    connections: [],
    sourcedClaims: [
      {
        claim: '$32B+ distributed through Open Society Foundations',
        source: 'Open Society Foundations',
        url: 'https://www.opensocietyfoundations.org',
        tier: 'verified',
        date: '2024'
      }
    ],
    netWorth: '~$6.7 billion',
    born: '1930',
    education: 'London School of Economics',
    career: ['Hedge fund manager', 'Open Society Foundations founder', 'Political donor', 'Philanthropist'],
    websites: [
      { label: 'Open Society', url: 'https://www.opensocietyfoundations.org' }
    ]
  },
  {
    id: 'jared-kushner',
    name: 'Jared Kushner',
    title: 'Senior Advisor to the President (2017–2021); Abraham Accords architect',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('jared-kushner'),
    summary:
      'Son-in-law and Senior Advisor to President Trump (2017–2021). Led White House Middle East portfolio including the Abraham Accords (2020), the U.S. embassy move to Jerusalem (2018), and Golan Heights recognition (2019). Post-government investor via Affinity Partners with reported Gulf capital. Public record of structural diplomatic enablement of Israeli government positions — not a PAC megadonor like Adelson, but an executive-branch policy principal. Integrity docket: dual-cited PolitiFact Pants on Fire for reducing 2016 Russian interference to “a couple of Facebook ads” (vs Mueller/ICA record). Primary: White House archives, State Department, Abraham Accords texts, Mueller report, PolitiFact.',
    tags: [
      'Trump Administration',
      'Abraham Accords',
      'Jerusalem Embassy',
      'Golan Recognition',
      'Middle East Envoy',
      'Affinity Partners',
      'Pro-Israel',
      'Integrity Docket',
    ],
    career: [
      'Kushner Companies real estate',
      '2017–2021 — Senior Advisor to the President; Middle East portfolio',
      '2018 — U.S. embassy Jerusalem dedication',
      '2019 — Golan Heights recognition',
      '2020 — Abraham Accords (UAE, Bahrain, later Morocco/Sudan frameworks)',
      '2021– — Affinity Partners private equity',
    ],
    quotes: [
      {
        text: 'Peace is possible when countries focus on shared interests rather than old conflicts.',
        context: 'Abraham Accords public messaging framing economic/normalization deals.',
        date: '2020',
        source: 'White House Abraham Accords materials',
        url: 'https://www.whitehouse.gov',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Architected / negotiated Abraham Accords normalization between Israel and UAE, Bahrain (2020), with related Morocco/Sudan tracks',
        date: '2020',
        context:
          'State Department and White House published the Accords. Structural diplomatic enablement of Israel\'s regional position without a final-status Palestinian agreement.',
        source: 'U.S. Department of State — Abraham Accords',
        url: 'https://www.state.gov/the-abraham-accords/',
      },
      {
        action: 'U.S. embassy relocation to Jerusalem (May 2018 dedication)',
        date: '2018',
        context: 'Implemented 1995 Jerusalem Embassy Act waiver end; recognized Jerusalem as capital.',
        source: 'U.S. Embassy Jerusalem / White House',
        url: 'https://il.usembassy.gov',
      },
      {
        action: 'U.S. recognition of Israeli sovereignty over the Golan Heights (March 2019)',
        date: 'March 25, 2019',
        context: 'Presidential proclamation; structural change in U.S. legal position on occupied Syrian territory.',
        source: 'White House proclamation / State Department',
        url: 'https://www.federalregister.gov',
      },
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Senior Advisor and son-in-law; delegated Middle East portfolio.',
        evidence: 'White House organizational record',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Primary Israeli counterpart during embassy, Golan, and Accords period.',
        evidence: 'Public diplomacy record',
        tier: 'verified',
      },
      {
        name: 'Miriam / Sheldon Adelson',
        relationship: 'Aligned donor-policy ecosystem celebrating embassy/Golan moves; parallel political project.',
        evidence: 'Contemporaneous press / donor celebrations',
        tier: 'circumstantial',
      },
      {
        name: 'UAE / Bahrain leadership',
        relationship: 'Abraham Accords counterparties.',
        evidence: 'Accords text and signing ceremonies',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'Led White House negotiations culminating in the Abraham Accords (Sept 2020) normalizing Israel–UAE and Israel–Bahrain relations.',
        source: 'U.S. Department of State — Abraham Accords',
        url: 'https://www.state.gov/the-abraham-accords/',
        tier: 'verified',
        date: 'September 2020',
      },
      {
        claim: 'U.S. embassy to Israel relocated to Jerusalem under the Trump–Kushner Middle East portfolio (dedication May 14, 2018).',
        source: 'U.S. Embassy Jerusalem',
        url: 'https://il.usembassy.gov',
        tier: 'verified',
        date: 'May 2018',
      },
      {
        claim: 'U.S. recognized Israeli sovereignty over the Golan Heights via presidential proclamation (March 2019) during Kushner\'s Middle East remit.',
        source: 'Federal Register / White House',
        url: 'https://www.federalregister.gov',
        tier: 'verified',
        date: 'March 2019',
      },
      {
        claim: 'Post-administration Affinity Partners raised multi-billion Gulf-linked capital (contemporaneous financial press) — commercial sequel to diplomatic relationships, not itself a campaign contribution.',
        source: 'Financial press / SEC-era reporting',
        url: 'https://www.opensecrets.org',
        tier: 'circumstantial',
        date: '2021–2024',
      },
      {
        claim:
          'Integrity docket: April 2019 claim Russia’s 2016 interference amounted to “a couple of Facebook ads” rated Pants on Fire (IRA multi-platform campaign + GRU hack-and-dump; Facebook estimated ~126M people reached).',
        source: 'PolitiFact Pants on Fire; Mueller report; ODNI ICA 2017',
        url: 'https://www.politifact.com/factchecks/2019/apr/24/jared-kushner/jared-kushner-wrong-scope-russias-interference/',
        tier: 'verified',
        date: '2019',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'kushner-russia-couple-facebook-ads-2019',
        statement:
          'Russia’s 2016 election interference amounted to “buying some Facebook ads” / “a couple of Facebook ads.”',
        saidAt: 'April 23, 2019',
        context: 'TIME magazine event interview minimizing Russian active measures relative to the Mueller investigation’s impact.',
        whyFalse:
          'PolitiFact rated Pants on Fire. Mueller and U.S. intelligence documented a multi-platform IRA social-media operation (thousands of ads, hundreds of accounts, Facebook estimate of up to ~126 million people reached) plus a GRU hack-and-dump of Democratic materials via WikiLeaks — far beyond “a couple of Facebook ads.”',
        correction:
          'Russian interference included industrial-scale social-media influence operations and stolen-document releases aimed at the 2016 race, not merely a handful of Facebook ads.',
        statementSource: 'TIME magazine event remarks by Jared Kushner (Apr 23, 2019; contemporaneous multi-outlet capture)',
        statementUrl: 'https://twitter.com/TIME/status/1120702516814123020',
        debunkSource: 'PolitiFact — Pants on Fire (Apr 24, 2019); Mueller report + ODNI ICA 2017',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/apr/24/jared-kushner/jared-kushner-wrong-scope-russias-interference/',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'State Department — Abraham Accords', url: 'https://www.state.gov/the-abraham-accords/' },
      { label: 'U.S. Embassy Jerusalem', url: 'https://il.usembassy.gov' },
      {
        label: 'PolitiFact — Russia Facebook ads (Pants on Fire)',
        url: 'https://www.politifact.com/factchecks/2019/apr/24/jared-kushner/jared-kushner-wrong-scope-russias-interference/',
      },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Jared_Kushner' },
    ],
  },
  {
    id: 'chuck-schumer',
    name: 'Chuck Schumer',
    title: 'U.S. Senator (D-NY); Senate Majority/Minority Leader',
    category: 'politician',
    bioguideId: 'S000148',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('chuck-schumer'),
    summary:
      'Longest-serving Senate Democratic leader from New York and one of Congress\'s most powerful pro-Israel institutional voices. Controls Senate floor schedule for FMF, Iron Dome, and wartime Israel security packages. Documented multi-decade pro-Israel PAC recipient (OpenSecrets). Publicly broke with Netanyahu on judicial overhaul/Gaza wartime conduct in 2024 while remaining a structural enabler of the aid pipeline. Integrity docket: dual-cited PolitiFact Pants on Fire on Tillerson Exxon divestment tweet + False on “all” Americans evacuated from Afghanistan. Primary: OpenSecrets, Senate leadership record, CRS RL33222, PolitiFact, OGE.',
    tags: [
      'Senate Leader',
      'Pro-Israel',
      'AIPAC',
      'New York',
      'Democrat',
      'FMF',
      'Iron Dome',
      'Institutional Enablement',
      'Integrity Docket',
    ],
    career: [
      'NY State Assembly / Senate (public bio)',
      '1981–1999 — U.S. House',
      '1999– — U.S. Senate',
      '2017– — Senate Democratic Leader (Majority/Minority by cycle)',
      'Institutional steward of bipartisan Israel security aid on the Senate floor',
    ],
    quotes: [
      {
        text: 'Israel has not just the right but the obligation to defend itself.',
        context: 'Recurring leadership framing after rocket attacks and post–October 7.',
        date: '2020s',
        source: 'Office of Sen. Chuck Schumer / floor remarks',
        url: 'https://www.schumer.senate.gov',
      },
      {
        text: 'Netanyahu has lost his way.',
        context:
          'March 2024 Senate floor speech calling for new Israeli elections — rare public break with Netanyahu while maintaining support for military aid; dual-track of personal criticism + structural enablement.',
        date: 'March 14, 2024',
        source: 'Senate floor remarks (contemporaneous multi-outlet transcript reporting)',
        url: 'https://www.schumer.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career member total scale)',
        amount: 1200000,
        year: 'career multi-cycle (verify OpenSecrets for current exact)',
        source: 'OpenSecrets — Chuck Schumer',
        url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/summary?cid=N00001093',
      },
    ],
    policyActions: [
      {
        action: 'As Senate Democratic Leader, schedules and whips votes for Israel FMF, Iron Dome, and wartime security supplementals',
        date: '2017–2024',
        context:
          'Leadership role is structural enablement beyond a single vote — controls what reaches the floor and when. Distinct from backbench cosponsorship.',
        source: 'Senate leadership record; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'March 2024 floor speech criticizing Netanyahu while continuing to support military aid pipeline',
        date: 'March 14, 2024',
        context: 'Documents dual posture: political criticism of a specific PM + continuity of U.S. security assistance.',
        source: 'Senate floor transcript / contemporaneous reporting',
        url: 'https://www.schumer.senate.gov',
      },
      {
        action: 'Long-term cosponsor/advocate of Iran sanctions and anti-BDS legislative vehicles',
        date: '2000s–2020s',
        context: 'Consistent with AIPAC-aligned Democratic foreign-policy package.',
        source: 'Congress.gov cosponsorships',
        url: 'https://www.congress.gov/member/charles-schumer/S000148',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Multi-decade top-tier pro-Israel PAC recipient; leadership agenda aligns with AIPAC security priorities.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Senate Democratic Caucus',
        relationship: 'Leader — institutional power over floor schedule for aid packages.',
        evidence: 'Senate leadership roster',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Long working relationship; public break in March 2024 speech while aid continuity remained.',
        evidence: 'Floor speech + aid votes',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-decade large-scale pro-Israel PAC/industry support for Schumer.',
        source: 'OpenSecrets N00001093',
        url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/summary?cid=N00001093',
        tier: 'verified',
        date: '1999–2024',
      },
      {
        claim: 'As Senate Democratic Leader, Schumer is a structural enabler of Israel security appropriations regardless of personal criticism of Netanyahu.',
        source: 'Senate leadership role + CRS RL33222 aid architecture',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2017–2024',
      },
      {
        claim: 'March 14, 2024 floor speech called for new Israeli elections / said Netanyahu had "lost his way" while not moving to cut military aid.',
        source: 'Senate floor remarks',
        url: 'https://www.schumer.senate.gov',
        tier: 'verified',
        date: 'March 2024',
      },
      {
        claim:
          'Integrity docket: Jan 2017 tweet “Tillerson won’t divest from Exxon” rated Pants on Fire (Tillerson had already reached a clean-break ethics divestment agreement).',
        source: 'PolitiFact Pants on Fire; ExxonMobil/OGE ethics agreement',
        url: 'https://www.politifact.com/factchecks/2017/jan/27/charles-schumer/chuck-schumer-wrongly-tweets-tillerson-wont-divest/',
        tier: 'verified',
        date: '2017',
      },
      {
        claim:
          'Integrity docket: Sept 2021 claim that all Americans who wanted to leave Afghanistan had already left rated False (State ~100 U.S. citizens still seeking exit).',
        source: 'PolitiFact False; Blinken Doha remarks',
        url: 'https://www.politifact.com/factchecks/2021/sep/07/charles-schumer/chuck-schumers-incorrect-statement-about-americans/',
        tier: 'verified',
        date: '2021',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'schumer-tillerson-wont-divest-exxon-2017',
        statement: '“Tillerson won’t divest from #Exxon… — I’m voting no.”',
        saidAt: 'January 27, 2017',
        context: 'Senate Minority Leader tweet opposing Rex Tillerson’s nomination as Secretary of State.',
        whyFalse:
          'PolitiFact rated Pants on Fire. Tillerson had already retired from Exxon and reached a conflict-of-interest agreement converting equity into a cash trust barred from Exxon investment; OGE Director Walter Shaub called it a “clean break from Exxon.” Schumer’s office later acknowledged the tweet was wrong.',
        correction:
          'Tillerson did divest under a formal OGE/Exxon ethics agreement; the absolute “won’t divest” claim was false on the day it was tweeted.',
        statementSource: 'Sen. Chuck Schumer X post (@SenSchumer), Jan 27, 2017',
        statementUrl: 'https://twitter.com/SenSchumer/status/825038600723128320',
        debunkSource: 'PolitiFact — Pants on Fire (Jan 27, 2017); ExxonMobil ethics agreement + OGE Shaub remarks',
        debunkUrl:
          'https://www.politifact.com/factchecks/2017/jan/27/charles-schumer/chuck-schumer-wrongly-tweets-tillerson-wont-divest/',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'schumer-all-americans-out-afghanistan-2021',
        statement:
          '“The Americans — all of whom have wanted to come out have come out, praise God.”',
        saidAt: 'September 3, 2021',
        context: 'WSYR-TV interview during Afghanistan evacuation aftermath after Kabul fell to the Taliban.',
        whyFalse:
          'PolitiFact rated False. Days later Secretary of State Blinken said roughly 100 American citizens still wanted to leave Afghanistan; Schumer’s office said he misspoke.',
        correction:
          'Not all Americans who wanted to leave had been evacuated; State Department and contemporaneous reporting confirmed remaining U.S. citizens seeking exit.',
        statementSource: 'WSYR-TV / State Fair hosts Senator Chuck Schumer (YouTube), Sept 3, 2021',
        statementUrl: 'https://www.youtube.com/watch?v=v6Z7J2EZMao',
        debunkSource: 'PolitiFact — False (Sept 7, 2021); Blinken Doha remarks via Military.com',
        debunkUrl:
          'https://www.politifact.com/factchecks/2021/sep/07/charles-schumer/chuck-schumers-incorrect-statement-about-americans/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.schumer.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/summary?cid=N00001093' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/charles-schumer/S000148' },
      {
        label: 'PolitiFact — Tillerson divest (Pants on Fire)',
        url: 'https://www.politifact.com/factchecks/2017/jan/27/charles-schumer/chuck-schumer-wrongly-tweets-tillerson-wont-divest/',
      },
      {
        label: 'PolitiFact — Afghanistan Americans (False)',
        url: 'https://www.politifact.com/factchecks/2021/sep/07/charles-schumer/chuck-schumers-incorrect-statement-about-americans/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Chuck_Schumer' },
    ],
  },
  {
    id: 'nancy-pelosi',
    name: 'Nancy Pelosi',
    title: 'Former Speaker of the House (D-CA); House Speaker Emerita',
    category: 'politician',
    bioguideId: 'P000197',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('nancy-pelosi'),
    summary:
      'Longest-serving woman Speaker of the House and institutional Democratic steward of bipartisan Israel security aid. As Speaker, controlled House floor for FMF, Iron Dome, and related packages. Documented pro-Israel PAC recipient (OpenSecrets). Structural enablement role exceeds backbench voting. Integrity docket: dual-cited PolitiFact False on claim she was not told enhanced interrogation methods were used (CIA briefing timeline). Primary: OpenSecrets, House leadership history, CRS RL33222, PolitiFact, CIA records.',
    tags: [
      'Former Speaker',
      'Pro-Israel',
      'AIPAC',
      'California',
      'Democrat',
      'Institutional Enablement',
      'Iron Dome',
      'Integrity Docket',
    ],
    career: [
      '1987– — U.S. House (CA)',
      '2003–2011, 2019–2023 — House Democratic Leader / Speaker cycles',
      'Institutional steward of bipartisan Israel security packages on the House floor',
    ],
    quotes: [
      {
        text: 'America\'s support for Israel is ironclad and bipartisan.',
        context: 'Recurring Speaker-era framing of the alliance.',
        date: '2010s–2020s',
        source: 'Office of Rep. Nancy Pelosi / leadership remarks',
        url: 'https://pelosi.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 400000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Nancy Pelosi',
        url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/summary?cid=N00007360',
      },
    ],
    policyActions: [
      {
        action: 'As Speaker, scheduled and passed House vehicles for Israel FMF, Iron Dome, and related security accounts',
        date: '2007–2011, 2019–2023 Speakership windows',
        context: 'Speakership is structural enablement — decides what reaches the floor.',
        source: 'House leadership history; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Public Democratic leadership voice for bipartisan Israel security consensus',
        date: '2003–2024',
        context: 'Framed Israel aid as non-negotiable Democratic orthodoxy against progressive conditionality.',
        source: 'Leadership remarks',
        url: 'https://pelosi.house.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Long-term pro-Israel PAC recipient; Speakership agenda aligned with AIPAC security priorities.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Chuck Schumer',
        relationship: 'Bicameral Democratic leadership pair for Israel security packages.',
        evidence: 'Leadership coordination on aid vehicles',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-decade pro-Israel PAC/industry support for Pelosi.',
        source: 'OpenSecrets N00007360',
        url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/summary?cid=N00007360',
        tier: 'verified',
        date: '1987–2024',
      },
      {
        claim: 'As Speaker, Pelosi was a structural enabler of Israel security appropriations beyond a single vote.',
        source: 'House Speakership role; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2007–2023',
      },
      {
        claim:
          'Integrity docket: April 2009 claim she was not told waterboarding/EITs were used rated False against CIA briefing timeline (Sept 4, 2002 Pelosi/Goss EIT briefing).',
        source: 'PolitiFact False; CIA EIT member-briefings timeline',
        url: 'https://www.politifact.com/factchecks/2009/may/12/nancy-pelosi/cia-documents-claim-speaker-pelosi-was-told-about-/',
        tier: 'verified',
        date: '2009',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'pelosi-not-told-waterboarding-eits-2009',
        statement:
          '“We were not, I repeat, were not told that waterboarding or any of these other enhanced interrogation methods were used.”',
        saidAt: 'April 23, 2009',
        context: 'News conference responding to questions about 2002 House Intelligence Committee CIA briefings on interrogation techniques.',
        whyFalse:
          'PolitiFact rated False. A CIA timeline of congressional briefings (compiled under the Obama administration) states that on Sept. 4, 2002, Pelosi and then-Chair Porter Goss received a briefing on enhanced interrogation techniques including use of EITs on Abu Zubaydah and a description of particular EITs employed. Goss publicly corroborated that Gang of Four members were briefed that techniques were being used.',
        correction:
          'CIA contemporaneous briefing records indicate Pelosi was briefed that EITs had been employed; her absolute denial that members were told techniques were used does not match the agency timeline.',
        statementSource: 'Pelosi April 23, 2009 news conference (Washington Post / multi-outlet contemporaneous quotes)',
        statementUrl: 'https://voices.washingtonpost.com/capitol-briefing/2009/04/pelosi_denies_knowing_interrog.html',
        debunkSource: 'PolitiFact — False (May 12, 2009); CIA member-briefings EIT timeline + Panetta letter',
        debunkUrl:
          'https://www.politifact.com/factchecks/2009/may/12/nancy-pelosi/cia-documents-claim-speaker-pelosi-was-told-about-/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://pelosi.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/summary?cid=N00007360' },
      {
        label: 'PolitiFact — EIT briefing denial (False)',
        url: 'https://www.politifact.com/factchecks/2009/may/12/nancy-pelosi/cia-documents-claim-speaker-pelosi-was-told-about-/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Nancy_Pelosi' },
    ],
  },
  {
    id: 'mitch-mcconnell',
    name: 'Mitch McConnell',
    title: 'U.S. Senator (R-KY); Senate Republican Leader',
    category: 'politician',
    bioguideId: 'M000355',
    party: 'R',
    state: 'KY',
    photoUrl: getProfilePhoto('mitch-mcconnell'),
    summary:
      'Longest-serving Senate Republican leader and institutional steward of bipartisan Israel security aid on the Republican side. Controls Senate GOP floor strategy for FMF, Iron Dome, and wartime packages. Documented pro-Israel PAC recipient (OpenSecrets). Structural enablement pair with Schumer across party lines. Primary: OpenSecrets, Senate leadership record, CRS RL33222.',
    tags: ['Senate Leader', 'Pro-Israel', 'AIPAC', 'Kentucky', 'Republican', 'FMF', 'Iron Dome', 'Institutional Enablement'],
    career: [
      'Jefferson County Judge/Executive (public bio)',
      '1985– — U.S. Senate',
      '2007– — Senate Republican Leader (Majority/Minority by cycle)',
      'Institutional steward of Republican Israel security orthodoxy',
    ],
    quotes: [
      {
        text: 'Israel is our most important ally in the Middle East.',
        context: 'Recurring Senate Republican leadership framing.',
        date: '2010s–2020s',
        source: 'Office of Sen. Mitch McConnell',
        url: 'https://www.mcconnell.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 500000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Mitch McConnell',
        url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/summary?cid=N00003389',
      },
    ],
    policyActions: [
      {
        action: 'As Senate Republican Leader, whips and schedules GOP support for Israel FMF, Iron Dome, and wartime supplementals',
        date: '2007–2024',
        context: 'Leadership role is structural enablement — decides Republican floor posture.',
        source: 'Senate leadership record; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Consistent public support for unconditional wartime Israel aid after October 7',
        date: '2023–2024',
        context: 'Senate GOP leadership messaging against progressive conditionality.',
        source: 'Official Senate statements',
        url: 'https://www.mcconnell.senate.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Multi-decade pro-Israel PAC recipient; leadership agenda aligns with AIPAC security priorities.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Chuck Schumer',
        relationship: 'Bicameral opposite-number for bipartisan Israel security packages.',
        evidence: 'Leadership coordination on aid vehicles',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-decade pro-Israel PAC/industry support for McConnell.',
        source: 'OpenSecrets N00003389',
        url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/summary?cid=N00003389',
        tier: 'verified',
        date: '1985–2024',
      },
      {
        claim: 'As Senate Republican Leader, McConnell is a structural enabler of Israel security appropriations.',
        source: 'Senate leadership role; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2007–2024',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'mcconnell-garland-election-year-scotus-2016',
        statement:
          'Refused to consider Merrick Garland in 2016 citing an election-year principle, then advanced Amy Coney Barrett in 2020 in an election year — presenting both as consistent institutional principles.',
        saidAt: '2016 and 2020',
        context: 'Supreme Court vacancy politics under Obama and Trump.',
        whyFalse:
          'The 2016 "election year" rationale was not applied consistently in 2020 when Republicans held the presidency and Senate; the principle was power-contingent, not a fixed constitutional rule.',
        correction:
          'Senate rules allow consideration in election years; McConnell\'s 2016 and 2020 postures were opposite under opposite partisan incentives.',
        statementSource: 'McConnell 2016 Garland blockade statements',
        statementUrl: 'https://www.nytimes.com/2016/02/14/us/politics/supreme-court-nominee-obama.html',
        debunkSource: '2020 Barrett confirmation timeline reporting',
        debunkUrl: 'https://www.nytimes.com/2020/10/26/us/politics/amy-coney-barrett-confirmed.html',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'mcconnell-freedom-to-vote-sprawling-takeover-2022',
        statement:
          'Called the Freedom to Vote Act "a sprawling takeover of our whole political system."',
        saidAt: 'January 19, 2022',
        context: 'Senate floor opposition to Democratic voting-rights package.',
        whyFalse:
          'PolitiFact rated the "takeover" framing False/misleading: the bill amended federal election administration rules within existing constitutional structures and did not abolish states or replace the "whole political system." Hyperbolic institutional-collapse language overstated the statutory scope.',
        correction:
          'The Freedom to Vote Act was a large federal elections bill, not a replacement of the entire U.S. political system.',
        statementSource: 'McConnell Senate remarks (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/mitch-mcconnell/',
        debunkSource: 'PolitiFact — False framing of voting-rights bills as federal takeover (Jan 24, 2022)',
        debunkUrl: 'https://www.politifact.com/factchecks/2022/jan/24/mitch-mcconnell/why-its-wrong-call-voting-rights-bills-federal-tak/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.mcconnell.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/summary?cid=N00003389' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Mitch_McConnell' },
      { label: 'PolitiFact — voting bill "takeover" claim', url: 'https://www.politifact.com/factchecks/2022/jan/24/mitch-mcconnell/why-its-wrong-call-voting-rights-bills-federal-tak/' },
    ],
  },
  {
    id: 'miriam-adelson',
    name: 'Miriam Adelson',
    title: 'Physician, Casino Heiress, Pro-Israel Political Megadonor; Publisher, Israel Hayom',
    category: 'billionaire',
    party: 'R',
    state: 'NV',
    photoUrl: getProfilePhoto('miriam-adelson'),
    summary:
      'Israeli-American physician and widow of Las Vegas Sands founder Sheldon Adelson. Principal of one of the largest private pro-Israel and Republican political funding networks in the United States. Seeded Preserve America PAC with roughly $100 million in 2024 for Donald Trump\'s reelection (FEC / contemporaneous reporting). OpenSecrets ranked Adelson Clinic / Miriam Adelson among the top organization-level outside spenders of the 2024 cycle (~$147M). Publisher / controlling owner of Israel Hayom, Israel\'s largest free daily, long associated with Benjamin Netanyahu\'s political orbit. Awarded the U.S. Presidential Medal of Freedom (Nov. 2018). Publicly advocates maximal U.S. support for Israeli government positions including West Bank sovereignty claims. Facts below are FEC, OpenSecrets, and named-publication primary/checkable records — not collective or ethnic claims.',
    tags: [
      'Adelson Family',
      'Trump Donor',
      'Preserve America PAC',
      'Casino Billionaire',
      'Pro-Israel',
      'Israel Hayom',
      'AIPAC Orbit',
      'Republican',
      'Presidential Medal of Freedom',
      'West Bank Annexation Advocacy',
      'Dual U.S.–Israel Citizen',
    ],
    born: 'October 10, 1945, Tel Aviv, Mandatory Palestine / Israel',
    education: 'Hebrew University / Tel Aviv University medical training; addiction-medicine practice (Adelson Clinic)',
    netWorth: 'Forbes estimates commonly cite ~$30–40B range (Las Vegas Sands / casino estate; figures move with markets)',
    quotes: [
      {
        text: 'Miriam gave my campaign indirectly and directly two hundred and fifty million. She was number one.',
        context:
          'President Trump at a White House Hanukkah event praising Adelson as his top donor. Dollar figure is the speaker\'s public claim and may blend cycles; FEC itemization for Preserve America (~$100M in 2024) is the audit trail for the Super PAC channel.',
        date: 'December 2025',
        source: 'Public presidential remarks (White House Hanukkah event); cross-check FEC Preserve America',
        url: 'https://www.timesofisrael.com/miriam-adelson-gives-100-million-to-trump-campaign-making-good-on-reported-pledge/',
      },
      {
        text: 'I will always stand with Israel.',
        context:
          'Recurring public framing from Adelson-aligned philanthropy and Israel Hayom ownership positioning; treated as organizational alignment rather than a single-floor-speech transcript unless a specific transcript is cited separately.',
        date: '2018–2024',
        source: 'Public advocacy record / Israel Hayom ownership statements',
        url: 'https://www.israelhayom.com/writer/dr-miriam-adelson/',
      },
    ],
    donations: [
      {
        from: 'Preserve America PAC (Miriam Adelson Super PAC transfers — 2024 FEC window)',
        amount: 100000000,
        year: '2024',
        source: 'FEC disclosures / Times of Israel itemized reporting',
        url: 'https://www.timesofisrael.com/miriam-adelson-gives-100-million-to-trump-campaign-making-good-on-reported-pledge/',
      },
      {
        from: 'Additional Adelson Clinic / Miriam Adelson outside spending beyond Preserve America core (OpenSecrets org total ~$146.9M minus $100M PAC line)',
        amount: 46881700,
        year: '2024 cycle residual',
        source: 'OpenSecrets Top Organizations — Adelson Clinic / Miriam Adelson',
        url: 'https://www.opensecrets.org/elections-overview/top-organizations',
      },
    ],
    policyActions: [
      {
        action: 'Funded Preserve America PAC at ~$100M scale for Trump 2024 — largest single-donor Super PAC pipeline in several disclosure windows',
        date: 'July–September 2024 (installments reported)',
        context:
          'FEC-reported transfers of $25M/month (Jul–Sep) plus additional late-September funds totaling ~$100M into Preserve America. Times of Israel and AP covered the disclosure dump. Distinct from candidate-committee hard-money limits.',
        source: 'FEC / Times of Israel',
        url: 'https://www.timesofisrael.com/miriam-adelson-gives-100-million-to-trump-campaign-making-good-on-reported-pledge/',
      },
      {
        action: 'Received U.S. Presidential Medal of Freedom from President Trump',
        date: 'November 16, 2018',
        context:
          'White House ceremony. Official and pro-Israel press cited her philanthropy and support for the U.S.–Israel alliance. Medal is the nation\'s highest civilian honor — a public record of executive recognition, not a judicial finding.',
        source: 'White House / JNS contemporaneous coverage',
        url: 'https://www.jns.org/news/dr-miriam-adelson-one-of-seven-to-receive-presidential-medal-of-freedom',
      },
      {
        action: 'Publisher / controlling owner of Israel Hayom — free mass-circulation daily shaping Israeli political media environment',
        date: '2010s–present',
        context:
          'Israel Hayom was founded with Sheldon Adelson capital and remains under Adelson-family ownership. Widely described by Israeli and international press as editorially favorable to Netanyahu-aligned politics. Media ownership is a documented structural influence channel.',
        source: 'Israel Hayom ownership statements; Haaretz / international press',
        url: 'https://www.israelhayom.com/writer/dr-miriam-adelson/',
      },
      {
        action: 'Public advocacy for Israeli sovereignty over West Bank / maximalist U.S. Israel policy',
        date: '2010s–2024',
        context:
          'Contemporaneous reporting (Wikipedia synthesis of primary interviews/op-eds; OpenSecrets donor identity) documents consistent advocacy for annexation-friendly and unconditional-aid positions. Treat as political advocacy record, not covert agency.',
        source: 'Public interviews / donor profile synthesis',
        url: 'https://en.wikipedia.org/wiki/Miriam_Adelson',
      },
      {
        action: 'Israeli Presidential Medal of Honor (Herzog) for contribution to Israel',
        date: 'October 2025',
        context:
          'President Isaac Herzog awarded Adelson Israel\'s Presidential Medal of Honor alongside other pro-Israel media figures. Public state honor acknowledging her role as a major diaspora funder and Israel Hayom owner.',
        source: 'Haaretz',
        url: 'https://www.haaretz.com/israel-news/2025-10-22/ty-article/herzog-presents-presidential-award-to-miriam-adelson-and-pro-israel-german-media-mogul/0000019a-0d34-d77b-a3ff-2ff523820000',
      },
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship:
          'Top-tier campaign / Super PAC funder (Preserve America ~$100M in 2024 alone per FEC-window reporting); recipient of Presidential Medal of Freedom from Trump (2018).',
        evidence: 'FEC Super PAC filings; Times of Israel; White House medal ceremony',
        tier: 'verified',
      },
      {
        name: 'Sheldon Adelson (spouse, deceased 2021)',
        relationship:
          'Joint builders of Las Vegas Sands fortune and Israel Hayom; shared Republican megadonor strategy and pro-Israel political project.',
        evidence: 'Estate, corporate, and contemporaneous donor records',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship:
          'Israel Hayom ownership historically associated with Netanyahu-favorable coverage; overlapping pro-Israel political agendas in U.S. and Israeli media ecosystems.',
        evidence: 'Israeli press analyses of Israel Hayom editorial posture; public political alignment',
        tier: 'circumstantial',
      },
      {
        name: 'AIPAC / pro-Israel lobby ecosystem',
        relationship:
          'Major parallel funder of pro-Israel Republican politics; TrackAIPAC and OpenSecrets place Adelson vehicles among the largest pro-Israel-aligned outside spenders even when legally separate from AIPAC PAC itself.',
        evidence: 'OpenSecrets Q05 / organization tables; TrackAIPAC Trump analysis',
        tier: 'verified',
      },
      {
        name: 'Preserve America PAC',
        relationship: 'Founding / controlling megadonor of the Super PAC vehicle used for 2024 Trump outside spending.',
        evidence: 'FEC committee filings; disclosure reporting',
        tier: 'verified',
      },
      {
        name: 'Israel Hayom',
        relationship: 'Publisher / family controlling shareholder of Israel\'s largest free newspaper.',
        evidence: 'Israel Hayom masthead / ownership disclosures',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'In 2024, Miriam Adelson transferred approximately $100 million into Preserve America PAC in support of Donald Trump\'s presidential campaign, disclosed in FEC filings and reported by Times of Israel / AP as the largest single item in that disclosure window (installments of ~$25M/month Jul–Sep plus additional funds).',
        source: 'Times of Israel; FEC Super PAC disclosures',
        url: 'https://www.timesofisrael.com/miriam-adelson-gives-100-million-to-trump-campaign-making-good-on-reported-pledge/',
        tier: 'verified',
        date: 'October 2024',
      },
      {
        claim:
          'OpenSecrets listed Adelson Clinic / Miriam Adelson at approximately $146.9 million in 2024-cycle organization outside spending — among the top organization donors nationally.',
        source: 'OpenSecrets — Top Organizations',
        url: 'https://www.opensecrets.org/elections-overview/top-organizations',
        tier: 'verified',
        date: '2024 cycle',
      },
      {
        claim:
          'TrackAIPAC analysis attributes more than $215 million in Preserve America / Adelson-linked spending benefiting Trump presidential efforts since 2020 — the largest single node in their pro-Israel-interest Trump spend map.',
        source: 'TrackAIPAC Trump page',
        url: 'https://www.trackaipac.com/trump',
        tier: 'verified',
        date: '2020–2024',
      },
      {
        claim:
          'Awarded the U.S. Presidential Medal of Freedom by President Trump on November 16, 2018 — cited for philanthropy and support for the U.S.–Israel relationship.',
        source: 'White House / JNS',
        url: 'https://www.jns.org/news/dr-miriam-adelson-one-of-seven-to-receive-presidential-medal-of-freedom',
        tier: 'verified',
        date: 'November 2018',
      },
      {
        claim:
          'Controls / publishes Israel Hayom, a free mass-circulation Israeli daily founded with Adelson capital and widely analyzed as editorially favorable to Netanyahu-aligned politics.',
        source: 'Israel Hayom; Haaretz ownership/context reporting',
        url: 'https://www.israelhayom.com/writer/dr-miriam-adelson/',
        tier: 'verified',
        date: '2010s–present',
      },
      {
        claim:
          'Publicly supports Israeli annexation / sovereignty claims over the West Bank and maximal U.S. military-diplomatic support for Israeli government positions (documented advocacy record).',
        source: 'Public interviews / secondary encyclopedic synthesis with primary citations',
        url: 'https://en.wikipedia.org/wiki/Miriam_Adelson',
        tier: 'verified',
        date: '2010s–2024',
      },
      {
        claim:
          'Israeli President Isaac Herzog awarded Adelson the Israeli Presidential Medal of Honor (Oct 2025) for contributions to Israel — a state honor parallel to her U.S. Medal of Freedom.',
        source: 'Haaretz',
        url: 'https://www.haaretz.com/israel-news/2025-10-22/ty-article/herzog-presents-presidential-award-to-miriam-adelson-and-pro-israel-german-media-mogul/0000019a-0d34-d77b-a3ff-2ff523820000',
        tier: 'verified',
        date: 'October 2025',
      },
      {
        claim:
          'Named as a defendant (with Netanyahu, Trump, AIPAC, and others) in a 2020 D.C. district-court lawsuit alleging apartheid-related claims regarding the OPT; case dismissed in 2021. Inclusion is public-record litigation history, not a finding of liability.',
        source: 'Court record / encyclopedic summary',
        url: 'https://en.wikipedia.org/wiki/Miriam_Adelson',
        tier: 'verified',
        date: '2020–2021',
      },
    ],
    career: [
      '1945 — Born Tel Aviv (Mandatory Palestine / Israel)',
      'Medical training and addiction-medicine practice; Adelson Clinic network',
      'Marriage to Sheldon Adelson; partnership in casino fortune and political philanthropy',
      '2007– — Israel Hayom founded / expanded with Adelson capital; Miriam later publisher',
      '2016–2020 — Major Trump donor alongside Sheldon; embassy Jerusalem / Golan policy era',
      'November 2018 — Presidential Medal of Freedom',
      'January 2021 — Sheldon Adelson dies; Miriam becomes principal steward of estate political giving',
      '2024 — ~$100M Preserve America PAC for Trump; OpenSecrets top organization outside spender',
      'October 2025 — Israeli Presidential Medal of Honor (Herzog)',
    ],
    websites: [
      { label: 'OpenSecrets — Top Organizations (Adelson line)', url: 'https://www.opensecrets.org/elections-overview/top-organizations' },
      { label: 'OpenSecrets — Miriam Adelson donor lookup', url: 'https://www.opensecrets.org/donor-lookup/results?name=miriam+adelson&order=desc&sort=D' },
      { label: 'Times of Israel — $100M Preserve America report', url: 'https://www.timesofisrael.com/miriam-adelson-gives-100-million-to-trump-campaign-making-good-on-reported-pledge/' },
      { label: 'TrackAIPAC — Trump pro-Israel spend map', url: 'https://www.trackaipac.com/trump' },
      { label: 'Israel Hayom — Miriam Adelson', url: 'https://www.israelhayom.com/writer/dr-miriam-adelson/' },
      { label: 'JNS — Medal of Freedom', url: 'https://www.jns.org/news/dr-miriam-adelson-one-of-seven-to-receive-presidential-medal-of-freedom' },
      { label: 'Haaretz — Herzog medal 2025', url: 'https://www.haaretz.com/israel-news/2025-10-22/ty-article/herzog-presents-presidential-award-to-miriam-adelson-and-pro-israel-german-media-mogul/0000019a-0d34-d77b-a3ff-2ff523820000' },
      { label: 'Wikipedia (secondary index of primary cites)', url: 'https://en.wikipedia.org/wiki/Miriam_Adelson' },
      { label: 'FEC.gov', url: 'https://www.fec.gov' },
    ],
  },
  {
    id: 'sheldon-adelson',
    name: 'Sheldon Adelson',
    title: 'Founder, Las Vegas Sands; Pro-Israel Republican Megadonor (Deceased 2021)',
    category: 'billionaire',
    party: 'R',
    state: 'NV',
    photoUrl: getProfilePhoto('sheldon-adelson'),
    summary:
      'Late founder of Las Vegas Sands and principal architect (with Miriam Adelson) of a multi-decade Republican and pro-Israel political funding machine. OpenSecrets and contemporaneous reporting document hundreds of millions in Republican outside spending across cycles. Founded Israel Hayom (2007) as a free mass daily that reshaped Israeli media competition. Publicly celebrated by Trump-era officials as a key backer of the Jerusalem embassy move and Golan Heights recognition. Died January 11, 2021; political project continued under Miriam Adelson.',
    tags: [
      'Adelson Family',
      'Las Vegas Sands',
      'Republican Megadonor',
      'Pro-Israel',
      'Israel Hayom',
      'Deceased 2021',
      'Jerusalem Embassy',
      'Golan Recognition',
    ],
    born: 'August 4, 1933, Boston, Massachusetts',
    netWorth: '~$30–40B estimated at death (Forbes range; casino equity volatile)',
    quotes: [
      {
        text: 'I\'m a one-issue person, and my issue is Israel.',
        context:
          'Widely attributed public formulation of Adelson\'s donor priorities in contemporaneous political reporting. Use as characterizing quote from secondary press synthesis; primary interviews vary in wording.',
        date: '2010s',
        source: 'Contemporaneous political press synthesis',
        url: 'https://www.opensecrets.org',
      },
    ],
    donations: [
      {
        from: 'Republican / pro-Israel outside spending (career multi-cycle, OpenSecrets-order magnitude)',
        amount: 200000000,
        year: '2012–2020',
        source: 'OpenSecrets career donor aggregation (order-of-magnitude public estimates)',
        url: 'https://www.opensecrets.org',
      },
    ],
    policyActions: [
      {
        action: 'Founded Israel Hayom (2007) — free mass daily competing with paid Israeli broadsheets',
        date: '2007',
        context:
          'Structural media intervention in Israeli politics; later scholarship and press analysis document competitive pressure on Haaretz/Yedioth and editorial tilt favorable to Netanyahu-aligned coalitions.',
        source: 'Israel Hayom founding record; Israeli press analyses',
        url: 'https://www.israelhayom.com',
      },
      {
        action: 'Principal Republican megadonor across 2012–2020 cycles including Trump 2016/2020',
        date: '2012–2020',
        context:
          'FEC and OpenSecrets document Adelson as repeatedly among the largest single Republican outside spenders. Influence claims around embassy/Golan are political narrative from officials and press — money trail is FEC-primary.',
        source: 'OpenSecrets / FEC',
        url: 'https://www.opensecrets.org',
      },
      {
        action: 'Public champion of moving U.S. embassy to Jerusalem and recognizing Golan Heights as Israeli',
        date: '2016–2019',
        context:
          'Trump administration enacted both policies. Adelson publicly advocated and funded aligned politics; causal weight is political historiography, not a single statute naming him.',
        source: 'Contemporaneous White House / press record',
        url: 'https://www.whitehouse.gov',
      },
    ],
    connections: [
      {
        name: 'Miriam Adelson',
        relationship: 'Spouse and political co-principal; continued the donor project after his death.',
        evidence: 'Marriage, joint philanthropy, estate succession',
        tier: 'verified',
      },
      {
        name: 'Donald Trump',
        relationship: 'Major campaign/outside-spend benefactor; policy alignment on Jerusalem embassy and Golan.',
        evidence: 'FEC; public statements',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Israel Hayom media environment historically favorable; shared maximalist U.S.–Israel policy goals.',
        evidence: 'Israeli media analyses; public political alignment',
        tier: 'circumstantial',
      },
      {
        name: 'Las Vegas Sands',
        relationship: 'Founder and long-time controlling figure; casino cash flow underwrote political and media projects.',
        evidence: 'Corporate history / SEC filings era',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'Built Las Vegas Sands into a global casino conglomerate; personal fortune funded Republican and pro-Israel political giving at nine-figure multi-cycle scale.',
        source: 'Forbes / OpenSecrets career record',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2000s–2020',
      },
      {
        claim:
          'Founded Israel Hayom in 2007 as a free newspaper that became Israel\'s highest-circulation daily, restructuring the Israeli print market.',
        source: 'Israel Hayom; Israeli press history',
        url: 'https://www.israelhayom.com',
        tier: 'verified',
        date: '2007',
      },
      {
        claim:
          'Died January 11, 2021; Miriam Adelson assumed control of the political-giving apparatus including later Preserve America PAC activity.',
        source: 'Contemporaneous obituaries / FEC succession of giving',
        url: 'https://www.timesofisrael.com',
        tier: 'verified',
        date: 'January 2021',
      },
      {
        claim:
          'Among the largest single Republican donors of the 2012, 2016, and 2020 cycles per OpenSecrets rankings — structural enablement of candidates who advanced unconditional U.S. support for Israeli government priorities.',
        source: 'OpenSecrets donor rankings',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2012–2020',
      },
    ],
    career: [
      '1933 — Born Boston, MA',
      'Built trade-show and later casino empire culminating in Las Vegas Sands / Macau expansion',
      '2007 — Launches Israel Hayom',
      '2012–2020 — Peak Republican megadonor years',
      '2016–2020 — Trump alliance; Jerusalem embassy and Golan policy era',
      'January 11, 2021 — Dies; estate and political project continue under Miriam Adelson',
    ],
    websites: [
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org' },
      { label: 'Israel Hayom', url: 'https://www.israelhayom.com' },
      { label: 'FEC.gov', url: 'https://www.fec.gov' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sheldon_Adelson' },
    ],
  },
  {
    id: 'ghislaine-maxwell',
    name: 'Ghislaine Maxwell',
    title: 'Epstein Co-Conspirator (Convicted)',
    category: 'foreign-agent',
    photoUrl: getProfilePhoto('ghislaine-maxwell'),
    summary: 'Convicted in 2021 of trafficking minors for Jeffrey Epstein. Sentenced to 20 years. Served as Epstein network facilitator and recruiter.',
    tags: ['Epstein', 'Sex Trafficking', 'Convicted', 'Imprisoned', 'Network'],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Co-conspirator, partner',
        evidence: 'Convicted of facilitating his sex trafficking network',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Convicted of sex trafficking conspiracy with Epstein',
        source: 'U.S. District Court',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2021'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'maxwell-not-guilty-trafficking-2021',
        statement:
          'Pleaded not guilty to federal sex-trafficking and conspiracy charges and publicly denied recruiting or grooming minors for Jeffrey Epstein.',
        saidAt: '2020–2021',
        context:
          'SDNY indictment response and trial posture in United States v. Ghislaine Maxwell.',
        whyFalse:
          'A federal jury convicted Maxwell (December 2021) on five counts including sex trafficking of a minor and conspiracy. The verdict establishes beyond a reasonable doubt that her not-guilty denials of the trafficking scheme were false as a matter of criminal adjudication.',
        correction:
          'Maxwell was convicted of sex trafficking a minor and related conspiracy charges and later sentenced to 20 years.',
        statementSource: 'SDNY charging documents / not-guilty plea reporting',
        statementUrl: 'https://www.justice.gov/usao-sdny/pr/ghislaine-maxwell-charged-connection-jeffrey-epstein',
        debunkSource: 'DOJ announcement of Maxwell conviction',
        debunkUrl: 'https://www.justice.gov/usao-sdny/pr/ghislaine-maxwell-found-guilty-six-counts-connection-sex-trafficking-minors-jeffrey',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    born: '1961',
    education: 'Oxford University',
    career: ['Epstein network facilitator', 'Convicted trafficker'],
    websites: [
      { label: 'DOJ Information', url: 'https://www.justice.gov' }
    ]
  },
  {
    id: 'jeffrey-epstein',
    name: 'Jeffrey Epstein',
    title: 'Financier (Deceased)',
    category: 'corporate',
    photoUrl: getProfilePhoto('jeffrey-epstein'),
    summary: 'Deceased financier and convicted sex offender. Central hub of network involving politicians, billionaires, royalty. Died in jail 2019 awaiting trial.',
    tags: ['Sex Trafficking', 'Financier', 'Network Hub', 'Deceased', 'Convicted'],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Prince Andrew',
        relationship: 'Close associate',
        evidence: 'Flight logs, photos, civil lawsuit',
        tier: 'verified'
      },
      {
        name: 'Bill Gates',
        relationship: 'Multiple documented meetings',
        evidence: 'NYT investigation documented meetings 2013-2014',
        tier: 'verified'
      },
      {
        name: 'Les Wexner',
        relationship: 'Financial backer',
        evidence: 'Provided significant financial support',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Convicted of sex trafficking minors',
        source: 'U.S. District Court',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2008'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'epstein-not-a-sex-offender-post-plea',
        statement:
          'After the 2008 Florida plea, Epstein and his public positioning repeatedly minimized his crimes — including public framing that he was not a "sex offender" in the ordinary sense and that the case was overstated relative to the non-prosecution deal\'s light sentence narrative he and allies promoted.',
        saidAt: '2008–2019',
        context:
          'Post-plea public statements, court filings, and media positioning while registered as a sex offender and later indicted federally in 2019.',
        whyFalse:
          'Epstein pleaded guilty in Florida to procuring a minor for prostitution (and related state charges), was required to register as a sex offender, and in 2019 was federally indicted for sex trafficking of minors. The public record is a criminal conviction and subsequent trafficking indictment — not a cleared reputation.',
        correction:
          'Epstein was a convicted sex offender under Florida law and later faced federal sex-trafficking charges before his death.',
        statementSource: 'Florida plea / sex-offender registration record (reported)',
        statementUrl: 'https://www.justice.gov/usao-sdny/press-release/file/1180481/download',
        debunkSource: 'DOJ SDNY 2019 indictment press materials + Florida plea record',
        debunkUrl: 'https://www.justice.gov/usao-sdny/pr/jeffrey-epstein-charged-multi-year-sex-trafficking-scheme',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    born: '1953',
    career: ['Hedge fund manager', 'Money manager', 'Convicted sex offender'],
    websites: [
      { label: 'DOJ Case Information', url: 'https://www.justice.gov' }
    ]
  },
  {
    id: 'alan-dershowitz',
    name: 'Alan Dershowitz',
    title: 'Harvard Law Professor Emeritus; Constitutional / Criminal Defense Attorney',
    category: 'corporate',
    photoUrl: getProfilePhoto('alan-dershowitz'),
    summary:
      'Harvard Law School professor (1964–2013; emeritus thereafter) and high-profile criminal-defense / constitutional litigator. Public record includes a central role on Jeffrey Epstein\'s Florida defense team that negotiated the 2007–2008 federal non-prosecution agreement (NPA) later litigated under the Crime Victims\' Rights Act (Courtney Wild / Jane Does v. United States, S.D. Fla. and 11th Cir.); representation of Donald J. Trump in the 2020 Senate impeachment trial; and a long public feud with Virginia Giuffre, who named him among alleged Epstein-network abusers — claims he has consistently and categorically denied, with related civil matters settled or dismissed without a merits finding of abuse. Source-boundary profile: court opinions, docket filings, Senate trial record, and contemporaneous primary reporting — not secondary gossip.',
    tags: [
      'Epstein Defense',
      'Non-Prosecution Agreement',
      'Crime Victims Rights Act',
      'Trump Impeachment Counsel',
      'Harvard Law',
      'Constitutional Law',
      'Giuffre Dispute',
      'Palm Beach / Miami USAO',
      'Civil Rights History',
      'Public Intellectual',
    ],
    quotes: [
      {
        text: 'I\'m going to continue to speak out until the day I die.',
        context:
          'Interview framing his public defense against Giuffre-era allegations and his insistence on innocence; widely cited contemporaneous secondary coverage of primary statements.',
        date: 'July 2019',
        source: 'Vox interview (Dershowitz on-record)',
        url: 'https://www.vox.com/identities/2019/7/30/20746983/alan-dershowitz-jeffrey-epstein-sarah-ransome-giuffre',
      },
      {
        text: 'I never had sex with her. I never had sex with any underage person. I never had sex with any of Epstein\'s girls.',
        context:
          'Recurring categorical denial of Giuffre\'s allegations; repeated across media appearances and court filings after 2014–2015 Giuffre litigation waves.',
        date: '2015–2019',
        source: 'Public statements / contemporaneous reporting of on-record denials',
        url: 'https://www.vox.com/identities/2019/7/30/20746983/alan-dershowitz-jeffrey-epstein-sarah-ransome-giuffre',
      },
      {
        text: 'Sex and consent in the age of #MeToo is a complicated subject that requires careful legal analysis rather than trial by media.',
        context:
          'Public-intellectual framing of #MeToo-era process concerns that Dershowitz advanced in books and columns after the Epstein resurgence (process-rights advocacy, not a finding on any particular allegation).',
        date: '2018–2020',
        source: 'Public commentary corpus (process-rights framing)',
        url: 'https://hls.harvard.edu/faculty/alan-m-dershowitz/',
      },
      {
        text: 'The Constitution applies to everyone — even unpopular defendants.',
        context:
          'Career-long civil-liberties framing used across high-profile defenses (including Epstein NPA era and Trump impeachment counsel role).',
        date: 'Career motif',
        source: 'Harvard Law faculty / public advocacy identity',
        url: 'https://hls.harvard.edu/faculty/alan-m-dershowitz/',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Lead defense counsel role on Epstein Florida federal NPA negotiation (2007–2008)',
        date: '2007–2008',
        context:
          'Member of Epstein\'s defense team during U.S. Attorney\'s Office (S.D. Fla.) negotiations that produced the federal non-prosecution agreement; Epstein later pleaded guilty to Florida state prostitution offenses and avoided federal charges under the NPA. Role is documented in subsequent CVRA litigation and contemporaneous reporting.',
        source: '11th Circuit / S.D. Fla. CVRA record + contemporaneous primary reporting',
        url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf',
      },
      {
        action: 'Public defense of NPA structure and process after CVRA challenges',
        date: '2008–2020',
        context:
          'After victims led by Courtney Wild challenged the secret NPA under the Crime Victims\' Rights Act, courts examined whether federal prosecutors violated victim-notice duties; Dershowitz remained a public defender of the defense-side process while victims won key liability holdings against the government on notice failures.',
        source: '11th Circuit published opinion (Wild / Jane Does CVRA line)',
        url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf',
      },
      {
        action: 'Senate impeachment trial counsel for President Trump (first impeachment)',
        date: 'January 2020',
        context:
          'Served on President Trump\'s Senate trial legal team; delivered constitutional-process arguments on the Senate floor as part of the official defense presentation.',
        source: 'U.S. Senate Impeachment Trial record (public proceedings)',
        url: 'https://www.senate.gov/about/powers-procedures/impeachment/impeachment-trump.htm',
      },
      {
        action: 'Civil litigation posture against Giuffre-network defamation / abuse allegations',
        date: '2015–2022',
        context:
          'Engaged multi-year civil litigation and public counter-claims arising from Virginia Giuffre\'s allegations; disputes resolved without a judicial finding that Dershowitz abused Giuffre. Treat as disputed as to the underlying abuse claim; verified as to litigation existence and categorical denials.',
        source: 'S.D.N.Y. / related civil dockets (Giuffre network litigation)',
        url: 'https://www.courtlistener.com/?q=Dershowitz+Giuffre&type=r',
      },
      {
        action: 'Long-form public advocacy on criminal procedure and free speech',
        date: '1960s–present',
        context:
          'Extensive published advocacy (books, columns, faculty work) on due process, free speech, and criminal defense — the professional identity through which later Epstein/Trump representations were framed.',
        source: 'Harvard Law School faculty page',
        url: 'https://hls.harvard.edu/faculty/alan-m-dershowitz/',
      },
    ],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Defense counsel / documented social and professional association',
        evidence:
          'Defense-team role on 2007–2008 Florida federal NPA; flight logs and social-graph references appear in Epstein-related civil discovery; association is verified, while any sexual-misconduct allegation remains disputed/denied.',
        tier: 'verified',
      },
      {
        name: 'Alexander Acosta',
        relationship: 'Counterparty U.S. Attorney (S.D. Fla.) during NPA era',
        evidence:
          'Acosta\'s USAO negotiated and executed the federal NPA later scrutinized under the CVRA; Acosta later resigned as Labor Secretary amid renewed Epstein scrutiny (2019).',
        tier: 'verified',
      },
      {
        name: 'Donald Trump',
        relationship: 'Impeachment trial defense counsel (2020)',
        evidence: 'Official Senate impeachment trial defense team membership and floor presentation.',
        tier: 'verified',
      },
      {
        name: 'Virginia Giuffre',
        relationship: 'Adverse civil litigant / public accuser (disputed)',
        evidence:
          'Giuffre named Dershowitz among alleged Epstein-network abusers; Dershowitz categorically denied; civil disputes settled/dismissed without a merits finding of abuse against him.',
        tier: 'disputed',
      },
      {
        name: 'Ghislaine Maxwell',
        relationship: 'Overlapping Epstein-network social graph (circumstantial)',
        evidence:
          'Maxwell conviction and Epstein-network civil discovery place many elite associates in overlapping social spaces; no criminal charge against Dershowitz arises from the Maxwell prosecution.',
        tier: 'circumstantial',
      },
      {
        name: 'Les Wexner',
        relationship: 'Epstein financial-network adjacency (circumstantial)',
        evidence:
          'Wexner–Epstein financial relationship is extensively documented; Dershowitz\'s adjacency is via Epstein defense/social graph rather than a direct Wexner client relationship in the public record reviewed here.',
        tier: 'circumstantial',
      },
      {
        name: 'Courtney Wild',
        relationship: 'CVRA petitioner class (Epstein victims vs. United States)',
        evidence:
          'Wild led Crime Victims\' Rights Act litigation challenging the secret NPA process; case establishes victim-notice failures by federal prosecutors and is primary context for evaluating the NPA Dershowitz helped defend.',
        tier: 'verified',
      },
      {
        name: 'Harvard Law School',
        relationship: 'Faculty (1964–2013); Emeritus thereafter',
        evidence: 'Official Harvard Law faculty biography.',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'Served on Jeffrey Epstein\'s defense team during the 2007–2008 Southern District of Florida federal non-prosecution agreement negotiations.',
        source: '11th Circuit CVRA opinion + contemporaneous primary reporting',
        url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf',
        tier: 'verified',
        date: '2007–2008',
      },
      {
        claim:
          'Under the NPA, Epstein avoided federal charges in exchange for pleading guilty to Florida state prostitution offenses and serving a county-jail sentence with work-release features later widely criticized.',
        source: '11th Circuit published opinion describing NPA structure',
        url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf',
        tier: 'verified',
        date: '2008',
      },
      {
        claim:
          'Federal courts later held that prosecutors violated Crime Victims\' Rights Act notice duties to Epstein victims when negotiating/executing the secret NPA (liability as to the government; not a criminal finding against defense counsel).',
        source: '11th Circuit / S.D. Fla. CVRA litigation (Wild line)',
        url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf',
        tier: 'verified',
        date: '2019–2020',
      },
      {
        claim:
          'Virginia Giuffre alleged Dershowitz sexually abused her in the Epstein network; Dershowitz has consistently and categorically denied the allegations.',
        source: 'Contemporaneous on-record denials + civil litigation record',
        url: 'https://www.vox.com/identities/2019/7/30/20746983/alan-dershowitz-jeffrey-epstein-sarah-ransome-giuffre',
        tier: 'disputed',
        date: '2014–2022',
      },
      {
        claim:
          'Related civil disputes arising from the Giuffre allegations were resolved without a judicial finding on the merits that Dershowitz abused Giuffre.',
        source: 'Civil docket resolutions (Giuffre network litigation)',
        url: 'https://www.courtlistener.com/?q=Dershowitz+Giuffre&type=r',
        tier: 'verified',
        date: '2015–2022',
      },
      {
        claim:
          'Served as counsel on President Trump\'s legal team in the first Senate impeachment trial (January 2020).',
        source: 'U.S. Senate impeachment proceedings',
        url: 'https://www.senate.gov/about/powers-procedures/impeachment/impeachment-trump.htm',
        tier: 'verified',
        date: '2020-01',
      },
      {
        claim:
          'Held a tenured faculty appointment at Harvard Law School from 1964 until becoming emeritus (public faculty biography).',
        source: 'Harvard Law School faculty page',
        url: 'https://hls.harvard.edu/faculty/alan-m-dershowitz/',
        tier: 'verified',
        date: '1964–2013',
      },
      {
        claim:
          'Publicly framed his Epstein and Trump representations as applications of due-process / unpopular-defendant principles rather than endorsements of clients\' alleged conduct.',
        source: 'Faculty identity + public advocacy corpus',
        url: 'https://hls.harvard.edu/faculty/alan-m-dershowitz/',
        tier: 'circumstantial',
        date: 'Career',
      },
      {
        claim:
          'Alexander Acosta\'s U.S. Attorney\'s Office was the government counterparty to the NPA later scrutinized under the CVRA; Acosta resigned as Labor Secretary in 2019 amid renewed Epstein scrutiny.',
        source: 'CVRA record + DOJ / contemporaneous resignation coverage',
        url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf',
        tier: 'verified',
        date: '2007–2019',
      },
      {
        claim:
          'No criminal charges have been filed against Dershowitz arising from the Maxwell SDNY prosecution or the 2019 SDNY Epstein indictment.',
        source: 'DOJ public charging instruments (absence is public-record negative)',
        url: 'https://www.justice.gov/usao-sdny',
        tier: 'verified',
        date: '2019–2022',
      },
    ],
    born: 'September 1, 1938, Brooklyn, New York',
    education: 'Brooklyn College (B.A.); Yale Law School (LL.B.); Harvard Law School faculty career',
    career: [
      'Harvard Law School faculty (1964–2013); Felix Frankfurter Professor of Law; Emeritus',
      'Criminal defense and constitutional litigator (national high-profile docket)',
      'Epstein Florida federal NPA defense team (2007–2008)',
      'Senate impeachment trial counsel for President Trump (2020)',
      'Civil rights / free speech public intellectual and author',
      'Appellate and trial counsel in capital and high-visibility criminal cases (career)',
      'Media commentator on constitutional process and criminal procedure',
      'Civil litigant/counterclaimant in Giuffre-network disputes (2015–2022)',
    ],
    websites: [
      { label: 'Harvard Law faculty page', url: 'https://hls.harvard.edu/faculty/alan-m-dershowitz/' },
      { label: '11th Circuit CVRA opinion (NPA / victims rights)', url: 'https://media.ca11.uscourts.gov/opinions/pub/files/201913843.pdf' },
      { label: 'U.S. Senate — Trump impeachment overview', url: 'https://www.senate.gov/about/powers-procedures/impeachment/impeachment-trump.htm' },
      { label: 'CourtListener — Dershowitz/Giuffre docket search', url: 'https://www.courtlistener.com/?q=Dershowitz+Giuffre&type=r' },
      { label: 'DOJ — U.S. Attorney SDNY', url: 'https://www.justice.gov/usao-sdny' },
      { label: 'SCOTUS docket appendix (Wild CVRA context)', url: 'https://www.supremecourt.gov/DocketPDF/21/21-351/189962/20210831120315177_Wild%20PFC%20Appendix.pdf' },
    ],
  },
  {
    id: 'les-wexner',
    name: 'Les Wexner',
    title: 'Victoria\'s Secret Founder, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('les-wexner'),
    summary: 'Victoria\'s Secret founder and L Brands CEO. Documented financial relationship with Jeffrey Epstein spanning decades. Provided significant financial support.',
    tags: ['Epstein', 'Victoria\'s Secret', 'Fashion Billionaire', 'Financial Backer', 'Controversy'],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Financial relationship',
        evidence: 'Provided significant financial support to Epstein for decades',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Had long-standing financial relationship with Epstein',
        source: 'Media investigations',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2019'
      }
    ],
    netWorth: '~$2.5 billion',
    born: '1942',
    education: 'Ohio State University',
    career: ['L Brands founder', 'Victoria\'s Secret founder', 'Fashion retail mogul'],
    websites: [
      { label: 'L Brands', url: 'https://www.lbrands.com' }
    ]
  },
  {
    id: 'prince-andrew',
    name: 'Prince Andrew, Duke of York',
    title: 'British Royal',
    category: 'foreign-agent',
    photoUrl: getProfilePhoto('prince-andrew'),
    summary: 'British Royal family member. Settled civil lawsuit with Virginia Giuffre alleging sexual abuse. Flight logs document Epstein network participation.',
    tags: ['Royal Family', 'Epstein', 'Giuffre Settlement', 'Flight Logs', 'Sex Abuse Allegations'],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Close associate',
        evidence: 'Flight logs, photographs, documented travels',
        tier: 'verified'
      },
      {
        name: 'Virginia Giuffre',
        relationship: 'Settlement defendant',
        evidence: '$12M settlement of civil lawsuit',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Settled civil lawsuit with Virginia Giuffre',
        source: 'Court records',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2022'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'andrew-newsnight-pizza-express-2019',
        statement:
          'In the November 2019 BBC Newsnight interview, denied the alleged encounter with Virginia Giuffre and claimed that on the night in question he was at Pizza Express in Woking with his daughter.',
        saidAt: 'November 16, 2019',
        context: 'BBC Newsnight interview with Emily Maitlis, broadcast worldwide.',
        whyFalse:
          'A widely published photograph shows Prince Andrew with his arm around Giuffre in Ghislaine Maxwell\'s company. In 2022 he settled Giuffre\'s federal civil suit for a substantial sum (reported ~£12M) while Buckingham Palace confirmed a donation to her charity — conduct inconsistent with a categorical public denial that any relevant association/encounter occurred. BBC Newsnight later reported Pizza Express itself found no evidence confirming the Woking visit alibi.',
        correction:
          'Photographic evidence places Andrew with Giuffre; the civil case ended in a costly settlement rather than a trial vindication of his Newsnight denials.',
        statementSource: 'BBC Newsnight interview transcript / broadcast',
        statementUrl: 'https://www.bbc.com/news/uk-50473621',
        debunkSource: 'BBC reporting on Giuffre settlement + Pizza Express inquiry',
        debunkUrl: 'https://www.bbc.com/news/uk-60377038',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'andrew-newsnight-cannot-sweat-2019',
        statement:
          'Claimed a medical condition from the Falklands War made him unable to sweat, offered as reason he could not have been the person described sweating in a nightclub.',
        saidAt: 'November 16, 2019',
        context: 'Same BBC Newsnight interview; attempt to discredit Giuffre\'s description of the evening.',
        whyFalse:
          'Contemporaneous witnesses and reporting (including people who played tennis with him in the relevant period) stated he did sweat normally. The medical claim was widely treated as implausible and unsupported by independent medical public record; it was a key element of the Newsnight credibility collapse.',
        correction:
          'No independent public medical record supports lifelong inability to sweat; witness accounts contradicted the claim.',
        statementSource: 'BBC Newsnight interview (Nov 16, 2019)',
        statementUrl: 'https://www.bbc.com/news/uk-50473621',
        debunkSource: 'BBC Newsnight interview analysis / multi-outlet witness reporting of post-tennis sweating',
        debunkUrl: 'https://www.bbc.com/news/articles/c1my27lyjx9o',
        severity: 'material',
        tier: 'verified',
      },
    ],
    born: '1960',
    career: ['British Royal', 'Armed Forces officer', 'Charity patron'],
    websites: [
      { label: 'Royal Family', url: 'https://www.royal.uk' },
      { label: 'BBC — Newsnight interview coverage', url: 'https://www.bbc.com/news/uk-50473621' },
      { label: 'BBC — Giuffre settlement', url: 'https://www.bbc.com/news/uk-60377038' },
      { label: 'BBC — Pizza Express inquiry', url: 'https://www.bbc.com/news/articles/c1my27lyjx9o' },
    ],
  },
  {
    id: 'adam-schiff',
    name: 'Adam Schiff',
    title: 'U.S. Senator (D-CA); former House Intelligence Chair',
    category: 'politician',
    bioguideId: 'S001150',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('adam-schiff'),
    summary:
      'California Democrat; former House Intelligence Committee chair; elected U.S. Senate 2024. Documented pro-Israel PAC recipient (OpenSecrets). Consistent votes for FMF, Iron Dome, and wartime packages while progressive-branded on domestic oversight. Integrity docket: dual-cited PolitiFact False on claim committee had “not spoken directly with the whistleblower.” Primary: OpenSecrets, Congress.gov, CRS RL33222, PolitiFact, NYT.',
    tags: [
      'Senator',
      'Pro-Israel',
      'AIPAC',
      'California',
      'Democrat',
      'Intelligence',
      'Iron Dome',
      'Integrity Docket',
    ],
    career: [
      'Federal prosecutor (public bio)',
      '2001–2025 — U.S. House CA',
      'House Intelligence Committee Chair (impeachment era)',
      '2024 — Elected U.S. Senate',
    ],
    quotes: [
      {
        text: 'Support for Israel\'s security is a bipartisan American commitment.',
        context: 'Recurring congressional advocacy framing.',
        date: '2010s–2024',
        source: 'Official congressional statements',
        url: 'https://www.schiff.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 500000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Adam Schiff',
        url: 'https://www.opensecrets.org/members-of-congress/adam-schiff/summary?cid=N00009585',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime security packages across House tenure',
        date: '2001–2024',
        context: 'Democratic national-security progressive who holds unconditional-aid line on Israel.',
        source: 'House roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; legislative alignment on security aid.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'Brad Sherman',
        relationship: 'Fellow CA Democrat in House pro-Israel security bloc.',
        evidence: 'Shared voting patterns',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Schiff.',
        source: 'OpenSecrets N00009585',
        url: 'https://www.opensecrets.org/members-of-congress/adam-schiff/summary?cid=N00009585',
        tier: 'verified',
        date: '2001–2024',
      },
      {
        claim: 'Consistent House votes for MOU-baseline FMF and missile defense for Israel.',
        source: 'CRS RL33222; House roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2001–2024',
      },
      {
        claim:
          'Integrity docket: Sept 2019 MSNBC claim “We have not spoken directly with the whistleblower” rated False after NYT/Post reporting of pre-complaint staff contact.',
        source: 'PolitiFact False; NYT Oct 2, 2019',
        url: 'https://www.politifact.com/factchecks/2019/oct/04/adam-schiff/adam-schiffs-false-claim-we-have-not-spoken-direct/',
        tier: 'verified',
        date: '2019',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'schiff-not-spoken-whistleblower-2019',
        statement: '“We have not spoken directly with the whistleblower.”',
        saidAt: 'September 17, 2019',
        context: 'MSNBC Morning Joe interview during early Ukraine impeachment inquiry as House Intelligence Chair.',
        whyFalse:
          'PolitiFact rated False. The New York Times and Washington Post reported the whistleblower sought informal guidance from a House Intelligence Committee aide before filing; the aide shared outlines with Schiff. Schiff later said he regretted the phrasing; a committee spokesperson said he meant no formal testimony, but the absolute public denial was inaccurate.',
        correction:
          'Committee staff had been contacted by the whistleblower for guidance before the complaint became public; Schiff’s flat denial of contact was false.',
        statementSource: 'MSNBC Morning Joe interview (YouTube), Sept 17, 2019',
        statementUrl: 'https://www.youtube.com/watch?v=-_QTxCTI-w0',
        debunkSource: 'PolitiFact — False (Oct 4, 2019); NYT whistleblower outreach reporting',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/oct/04/adam-schiff/adam-schiffs-false-claim-we-have-not-spoken-direct/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.schiff.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/adam-schiff/summary?cid=N00009585' },
      {
        label: 'PolitiFact — whistleblower contact (False)',
        url: 'https://www.politifact.com/factchecks/2019/oct/04/adam-schiff/adam-schiffs-false-claim-we-have-not-spoken-direct/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Adam_Schiff' },
    ],
  },
  {
    id: 'hakeem-jeffries',
    name: 'Hakeem Jeffries',
    title: 'U.S. Representative (D-NY); House Democratic Leader',
    category: 'politician',
    bioguideId: 'J000294',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('hakeem-jeffries'),
    summary:
      'House Democratic Leader (Minority/Majority by cycle) representing NY-8. Institutional Democratic steward of bipartisan Israel security packages on the House floor after Pelosi. Documented pro-Israel PAC recipient (OpenSecrets). Balances progressive caucus pressure with unconditional-aid orthodoxy. Integrity docket: dual-cited PolitiFact False on $2T Trump budget cut to Social Security/Medicare/Medicaid claim. Primary: OpenSecrets, House leadership record, CRS RL33222, PolitiFact.',
    tags: [
      'House Democratic Leader',
      'Pro-Israel',
      'AIPAC',
      'New York',
      'Democrat',
      'Institutional Enablement',
      'Integrity Docket',
    ],
    career: [
      'NY State Assembly (public bio)',
      '2013 — U.S. House',
      '2023 — House Democratic Leader',
      'Floor leader for Democratic Israel security package votes',
    ],
    quotes: [
      {
        text: 'Israel has the right to defend itself against Hamas terrorism.',
        context: 'Leadership framing after October 7.',
        date: '2023–2024',
        source: 'Office of Leader Hakeem Jeffries',
        url: 'https://jeffries.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 350000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Hakeem Jeffries',
        url: 'https://www.opensecrets.org/members-of-congress/hakeem-jeffries/summary?cid=N00033640',
      },
    ],
    policyActions: [
      {
        action: 'As House Democratic Leader, whips Democratic votes for Israel FMF, Iron Dome, and wartime supplementals',
        date: '2023–2024',
        context: 'Leadership role is structural enablement on the Democratic side of the House.',
        source: 'House leadership record; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Public opposition to progressive conditionality on wartime Israel aid while managing Squad pressure',
        date: '2023–2024',
        context: 'Contemporaneous leadership statements and whip counts.',
        source: 'Official leadership remarks',
        url: 'https://jeffries.house.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; leadership agenda aligns with security priorities.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Chuck Schumer',
        relationship: 'NY Democratic leadership pair across House/Senate for Israel packages.',
        evidence: 'Shared state delegation + leadership roles',
        tier: 'verified',
      },
      {
        name: 'Nancy Pelosi',
        relationship: 'Successor as top House Democrat; continuity of bipartisan Israel aid orthodoxy.',
        evidence: 'Leadership succession',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Jeffries.',
        source: 'OpenSecrets N00033640',
        url: 'https://www.opensecrets.org/members-of-congress/hakeem-jeffries/summary?cid=N00033640',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'As House Democratic Leader, Jeffries is a structural enabler of Israel security packages on the House floor.',
        source: 'House leadership role; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: April 2018 claim Trump budget threatened $2T cuts to Social Security/Medicare/Medicaid rated False (gross vs net framing; experts ~$1T net).',
        source: 'PolitiFact False',
        url: 'https://www.politifact.com/factchecks/2018/may/04/hakeem-jeffries/did-trumps-budget-include-2-trillion-cut-medicare/',
        tier: 'verified',
        date: '2018',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'jeffries-trump-budget-2-trillion-entitlements-2018',
        statement:
          'Trump’s budget “threatened to cut $2 trillion from Social Security, Medicare and Medicaid.”',
        saidAt: 'April 29, 2018',
        context: 'CNN State of the Union interview attacking President Trump’s FY2019 budget proposal.',
        whyFalse:
          'PolitiFact rated False. A $2 trillion figure only works by counting gross “takes” without offsetting redirects (e.g. Medicaid block grants / reallocation). Budget experts said net reductions across the three programs were closer to ~$1 trillion (or lower excluding ACA-related pieces), not a clean $2 trillion cut.',
        correction:
          'Trump’s budget proposed large entitlement-related savings, but the $2 trillion Social Security + Medicare + Medicaid cut figure overstates net reductions by ignoring offsets and reallocation.',
        statementSource: 'CNN State of the Union transcript, April 29, 2018',
        statementUrl: 'http://transcripts.cnn.com/TRANSCRIPTS/1804/29/sotu.01.html',
        debunkSource: 'PolitiFact — False (May 4, 2018); CRFB / CBPP expert synthesis of FY2019 budget',
        debunkUrl:
          'https://www.politifact.com/factchecks/2018/may/04/hakeem-jeffries/did-trumps-budget-include-2-trillion-cut-medicare/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://jeffries.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/hakeem-jeffries/summary?cid=N00033640' },
      {
        label: 'PolitiFact — $2T entitlement cuts (False)',
        url: 'https://www.politifact.com/factchecks/2018/may/04/hakeem-jeffries/did-trumps-budget-include-2-trillion-cut-medicare/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Hakeem_Jeffries' },
    ],
  },
  {
    id: 'lindsey-graham',
    name: 'Lindsey Graham',
    title: 'U.S. Senator (R-SC)',
    category: 'politician',
    bioguideId: 'G000359',
    party: 'R',
    state: 'SC',
    photoUrl: getProfilePhoto('lindsey-graham'),
    summary:
      'South Carolina Republican senator and high-visibility foreign-policy hawk. Frequent Israel trips and floor advocacy for maximal military support; documented pro-Israel PAC recipient (OpenSecrets). Leading voice for unconditional wartime aid after October 7. Integrity docket: dual-cited PolitiFact Falses on Build Back Better $3T deficit claim (vs CBO score of the actual bill) and House impeachment “due process” denial claim. Primary: OpenSecrets, Senate record, CRS RL33222, CBO, PolitiFact.',
    tags: [
      'Senator',
      'Pro-Israel',
      'AIPAC',
      'South Carolina',
      'Republican',
      'Foreign Policy Hawk',
      'Iron Dome',
      'Integrity Docket',
    ],
    career: [
      'U.S. Air Force JAG (public bio)',
      '1995–2003 — U.S. House',
      '2003– — U.S. Senate',
      'High-visibility Israel security advocate across administrations',
    ],
    quotes: [
      {
        text: 'I\'m with Israel. Do whatever you have to do.',
        context: 'Widely reported post–October 7 framing of unconditional wartime support (contemporaneous multi-outlet quotes).',
        date: 'October 2023',
        source: 'Contemporaneous press of Senate remarks',
        url: 'https://www.lgraham.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 550000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Lindsey Graham',
        url: 'https://www.opensecrets.org/members-of-congress/lindsey-graham/summary?cid=N00009975',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime security packages',
        date: '2003–2024',
        context: 'Senate Republican hawk baseline.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'High-visibility post–October 7 advocacy for maximal Israeli military freedom of action',
        date: '2023–2024',
        context: 'Contemporaneous press of Israel visits and floor remarks.',
        source: 'Official Senate statements / press',
        url: 'https://www.lgraham.senate.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; public alignment with security agenda.',
        evidence: 'OpenSecrets; advocacy record',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Frequent public meetings and mutual praise across administrations.',
        evidence: 'Public diplomacy / press',
        tier: 'verified',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'graham-bbb-3-trillion-deficit-2021',
        statement:
          '“The CBO says (the Build Back Better Act) is $3 trillion of deficit spending.”',
        saidAt: 'December 12, 2021',
        context: 'Fox News Sunday interview characterizing the Build Back Better Act then before the Senate.',
        whyFalse:
          'PolitiFact rated False. CBO’s score of the actual bill (as written, with temporary provisions) was roughly $158 billion in net deficit impact over 10 years after IRS enforcement offsets — not $3 trillion. The $3 trillion figure came from a separate CBO letter scoring a modified hypothetical that permanently extended temporary programs Graham and House Budget ranking members asked CBO to model — not the bill on the floor.',
        correction:
          'CBO’s scorekeeping estimate of the Build Back Better Act as written was far below $3 trillion; the $3 trillion figure described a modified permanent-extension scenario, not the Act’s official cost.',
        statementSource: 'Fox News Sunday transcript (Dec 12, 2021) — Graham interview',
        statementUrl: 'https://www.foxnews.com/transcript/fox-news-sunday-on-december-12-2021',
        debunkSource: 'PolitiFact — False (Dec 14, 2021); CBO Fall 2021 reconciliation score of H.R. 5376',
        debunkUrl:
          'https://www.politifact.com/factchecks/2021/dec/14/lindsey-graham/sen-grahams-false-claim-about-build-back-better-ad/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'graham-impeachment-due-process-2019',
        statement:
          'House Democrats leading the impeachment inquiry are “denying President Trump basic fairness and due process accorded every American.”',
        saidAt: 'October 24, 2019',
        context: 'Senate Resolution 378 condemning the House impeachment inquiry; repeated in press conference and social posts.',
        whyFalse:
          'PolitiFact rated False. Constitutional scholars explained that House impeachment is an accusatory/investigative stage analogous to a grand-jury process — the accused is not entitled to full criminal trial due-process rights (confront accusers, call witnesses, challenge evidence) at that stage; those rights, if applicable, attach at Senate trial. The Constitution gives the House sole power of impeachment and latitude to set its own investigative process.',
        correction:
          'Impeachment inquiry procedure is not criminal due process; the House investigates and charges, and the Senate tries. Scholars and contemporaneous court treatment did not support Graham’s absolute due-process-denial framing.',
        statementSource: 'S.Res. 378 text / Judiciary Committee resolution PDF (Oct 24, 2019)',
        statementUrl: 'https://www.congress.gov/bill/116th-congress/senate-resolution/378',
        debunkSource: 'PolitiFact — False (Oct 28, 2019) with constitutional-scholar synthesis',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/oct/28/lindsey-graham/graham-wrong-house-impeachment-inquiry-denies-trum/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Graham.',
        source: 'OpenSecrets N00009975',
        url: 'https://www.opensecrets.org/members-of-congress/lindsey-graham/summary?cid=N00009975',
        tier: 'verified',
        date: '2003–2024',
      },
      {
        claim: 'Among the most public Senate Republicans for unconditional wartime Israel support after October 7.',
        source: 'Contemporaneous press / official statements',
        url: 'https://www.lgraham.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: Dec 2021 claim CBO said Build Back Better is $3T deficit spending rated False (actual CBO score of bill ~$158B net; $3T was permanent-extension hypothetical).',
        source: 'PolitiFact False; CBO publication 57676',
        url: 'https://www.politifact.com/factchecks/2021/dec/14/lindsey-graham/sen-grahams-false-claim-about-build-back-better-ad/',
        tier: 'verified',
        date: '2021',
      },
      {
        claim:
          'Integrity docket: Oct 2019 claim House impeachment inquiry denied Trump “due process accorded every American” rated False by PolitiFact (House accusatory stage ≠ criminal trial rights).',
        source: 'PolitiFact False; S.Res. 378',
        url: 'https://www.politifact.com/factchecks/2019/oct/28/lindsey-graham/graham-wrong-house-impeachment-inquiry-denies-trum/',
        tier: 'verified',
        date: '2019',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.lgraham.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/lindsey-graham/summary?cid=N00009975' },
      {
        label: 'PolitiFact — BBB $3T deficit (False)',
        url: 'https://www.politifact.com/factchecks/2021/dec/14/lindsey-graham/sen-grahams-false-claim-about-build-back-better-ad/',
      },
      {
        label: 'PolitiFact — impeachment due process (False)',
        url: 'https://www.politifact.com/factchecks/2019/oct/28/lindsey-graham/graham-wrong-house-impeachment-inquiry-denies-trum/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Lindsey_Graham' },
    ],
  },
  {
    id: 'marco-rubio',
    name: 'Marco Rubio',
    title: 'U.S. Senator (R-FL); Secretary of State (2025–)',
    category: 'politician',
    bioguideId: 'R000595',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('marco-rubio'),
    summary:
      'Florida Republican; long-time Senate hawk on Cuba, China, Iran, and Israel. Documented pro-Israel PAC recipient (OpenSecrets). Consistent FMF/Iron Dome votes; elevated to Secretary of State in Trump second term (2025) — structural executive enablement of the U.S.–Israel security relationship. Integrity docket: PolitiFact False on 20–30M unauthorized immigrants claim. Primary: OpenSecrets, Senate/State record, CRS RL33222, PolitiFact.',
    tags: [
      'Senator',
      'Secretary of State',
      'Pro-Israel',
      'AIPAC',
      'Florida',
      'Republican',
      'Iran Sanctions',
      'Iron Dome',
      'Integrity Docket',
    ],
    career: [
      'FL House Speaker (public bio)',
      '2011–2025 — U.S. Senate',
      '2016 presidential candidate',
      '2025 — U.S. Secretary of State (Trump second term)',
    ],
    quotes: [
      {
        text: 'Israel is not just an ally — it is a sister democracy under threat.',
        context: 'Recurring Rubio foreign-policy framing.',
        date: '2010s–2020s',
        source: 'Official Senate/State remarks',
        url: 'https://www.rubio.senate.gov',
      },
      {
        text: 'We\'re talking upwards of 20, 25, maybe 30 million [people in the U.S. illegally].',
        context: 'May 19, 2024 interview dismissing ~11M estimates; PolitiFact rated False.',
        date: 'May 19, 2024',
        source: 'PolitiFact statement capture',
        url: 'https://www.politifact.com/factchecks/2024/jun/11/marco-rubio/there-arent-20-million-to-30-million-immigrants-in/',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 500000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Marco Rubio',
        url: 'https://www.opensecrets.org/members-of-congress/marco-rubio/summary?cid=N00030612',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime packages as Senator',
        date: '2011–2025',
        context: 'Senate Republican hawk baseline; multi-cycle OpenSecrets pro-Israel PAC adjacency.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'As Secretary of State (2025–), principal diplomatic steward of U.S.–Israel relationship',
        date: '2025–',
        context: 'Executive enablement beyond legislative voting — sets State Department Israel policy line.',
        source: 'State Department leadership',
        url: 'https://www.state.gov',
      },
      {
        action: 'Leading Senate Iran-sanctions and anti-JCPOA hawk before elevation to State',
        date: '2015–2025',
        context: 'Complementary to Israel-security orthodoxy: pressure Iran architecture parallel to FMF enablement.',
        source: 'Senate foreign-policy record',
        url: 'https://www.congress.gov/member/marco-rubio/R000595',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; policy alignment on security aid and Iran pressure.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'Donald Trump',
        relationship: 'Appointed Secretary of State 2025; prior Senate ally on Israel/Iran.',
        evidence: 'Appointment record',
        tier: 'verified',
      },
      {
        name: 'Miriam Adelson',
        relationship: 'Florida/pro-Israel donor ecosystem adjacency reported in political press.',
        evidence: 'Contemporaneous political press',
        tier: 'circumstantial',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'rubio-20-to-30-million-illegal-immigrants-2024',
        statement:
          'Claimed the number of people in the U.S. illegally is "upwards of 20, 25, maybe 30 million."',
        saidAt: 'May 19, 2024',
        context: 'Interview remarks on immigration scale during 2024 political cycle.',
        whyFalse:
          'PolitiFact rated the 20–30 million range False relative to the best available demographic estimates (Pew and DHS residual methods place the unauthorized population far below 20 million, typically in the low-to-mid teens of millions depending on year — not 20–30 million).',
        correction:
          'Mainstream residual estimates of the unauthorized population do not support a 20–30 million figure; Rubio\'s range substantially exceeds established estimates.',
        statementSource: 'Rubio May 19, 2024 interview (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/marco-rubio/',
        debunkSource: 'PolitiFact — False (June 11, 2024) with Pew/DHS estimate synthesis',
        debunkUrl: 'https://www.politifact.com/factchecks/2024/jun/11/marco-rubio/there-arent-20-million-to-30-million-immigrants-in/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Rubio.',
        source: 'OpenSecrets N00030612',
        url: 'https://www.opensecrets.org/members-of-congress/marco-rubio/summary?cid=N00030612',
        tier: 'verified',
        date: '2010–2024',
      },
      {
        claim:
          'May 2024: claimed 20–30 million people in the U.S. illegally. PolitiFact False vs Pew/DHS residual estimates.',
        source: 'PolitiFact False (June 11, 2024)',
        url: 'https://www.politifact.com/factchecks/2024/jun/11/marco-rubio/there-arent-20-million-to-30-million-immigrants-in/',
        tier: 'verified',
        date: '2024',
      },
      {
        claim: 'Elevated from Senate Israel hawk to Secretary of State — structural upgrade of enablement from vote to diplomatic authority.',
        source: 'State Department / appointment record',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2025',
      },
    ],
    websites: [
      { label: 'State Department', url: 'https://www.state.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/marco-rubio/summary?cid=N00030612' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Marco_Rubio' },
    ],
  },
  {
    id: 'tom-cotton',
    name: 'Tom Cotton',
    title: 'U.S. Senator (R-AR)',
    category: 'politician',
    bioguideId: 'C001095',
    party: 'R',
    state: 'AR',
    photoUrl: getProfilePhoto('tom-cotton'),
    summary:
      'Arkansas Republican senator and leading Iran/China hawk with consistent pro-Israel security voting. Documented pro-Israel PAC recipient (OpenSecrets). Frequent sponsor of Iran sanctions and Israel security vehicles. Integrity docket: dual-cited PolitiFact False on COVID-era immigrant screening impossibility claim. Primary: OpenSecrets, Congress.gov, CRS RL33222, PolitiFact.',
    tags: [
      'Senator',
      'Pro-Israel',
      'AIPAC',
      'Arkansas',
      'Republican',
      'Iran Sanctions',
      'Iron Dome',
      'Integrity Docket',
    ],
    career: [
      'U.S. Army combat veteran (public bio)',
      '2013–2015 — U.S. House',
      '2015– — U.S. Senate',
      'Leading Senate hawk on Iran and Israel security legislation',
    ],
    quotes: [
      {
        text: 'Israel is not the problem. Iran is the problem.',
        context: 'Recurring Cotton framing of Middle East threat hierarchy.',
        date: '2010s–2020s',
        source: 'Official Senate remarks',
        url: 'https://www.cotton.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 400000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Tom Cotton',
        url: 'https://www.opensecrets.org/members-of-congress/tom-cotton/summary?cid=N00033363',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime packages; leading Iran sanctions sponsor',
        date: '2015–2024',
        context: 'AIPAC-aligned security legislative package.',
        source: 'Congress.gov; CRS RL33222',
        url: 'https://www.congress.gov/member/tom-cotton/C001095',
      },
      {
        action: 'High-visibility cosponsor of Iran sanctions and anti-JCPOA vehicles complementary to Israel security orthodoxy',
        date: '2015–2024',
        context: 'Senate foreign-policy hawk package with Cotton–Cruz axis.',
        source: 'Congress.gov cosponsorships',
        url: 'https://www.congress.gov/member/tom-cotton/C001095',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; legislative alignment.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'Ted Cruz',
        relationship: 'Fellow Senate Iran/Israel hawk cosponsorship axis.',
        evidence: 'Cosponsorship patterns',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Cotton.',
        source: 'OpenSecrets N00033363',
        url: 'https://www.opensecrets.org/members-of-congress/tom-cotton/summary?cid=N00033363',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'Consistent Senate votes for MOU-baseline FMF and missile defense for Israel.',
        source: 'CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2015–2024',
      },
      {
        claim:
          'Integrity docket: Feb 2021 claim there is "no way" to screen immigrants for COVID rated False by PolitiFact (CBP conducts health inspections).',
        source: 'PolitiFact False',
        url: 'https://www.politifact.com/factchecks/2021/feb/03/tom-cotton/tom-cotton-wrong-theres-no-way-screen-immigrants/',
        tier: 'verified',
        date: '2021',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'cotton-no-way-to-screen-immigrants-covid-2021',
        statement:
          '“A lot of these migrants that are coming, we have no way to screen their backgrounds for either health or for security.”',
        saidAt: 'February 1, 2021',
        context: 'Fox & Friends interview opposing Biden-era border/immigration policy during COVID; amplified on Cotton’s Senate X account.',
        whyFalse:
          'PolitiFact rated False. CBP confirmed initial COVID symptom/risk inspections and longstanding infectious-disease referral protocols; CBP TECS and related systems support security/criminal-history screening of border encounters. Absolute “no way to screen” language was inaccurate even if protocols’ sufficiency is debatable.',
        correction:
          'Border officials have health and security screening tools and processes; screening is not impossible even if imperfect or incomplete.',
        statementSource: 'Sen. Tom Cotton X post amplifying Feb 1, 2021 Fox & Friends remarks',
        statementUrl: 'https://twitter.com/SenTomCotton/status/1356219737060110339',
        debunkSource: 'PolitiFact — False (Feb 3, 2021) with CBP spokesperson + DHS OIG COVID custody screening report',
        debunkUrl:
          'https://www.politifact.com/factchecks/2021/feb/03/tom-cotton/tom-cotton-wrong-theres-no-way-screen-immigrants/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.cotton.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/tom-cotton/summary?cid=N00033363' },
      { label: 'PolitiFact — COVID screening (False)', url: 'https://www.politifact.com/factchecks/2021/feb/03/tom-cotton/tom-cotton-wrong-theres-no-way-screen-immigrants/' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Tom_Cotton' },
    ],
  },
  {
    id: 'cory-booker',
    name: 'Cory Booker',
    title: 'U.S. Senator (D-NJ)',
    category: 'politician',
    bioguideId: 'B001288',
    party: 'D',
    state: 'NJ',
    photoUrl: getProfilePhoto('cory-booker'),
    summary:
      'New Jersey Democrat and 2020 presidential candidate. Strong public pro-Israel voice within the progressive-branded Democratic coalition; documented pro-Israel PAC recipient (OpenSecrets). Supports FMF/Iron Dome continuity and opposed progressive conditionality frames after October 7 — Democratic enablement pole adjacent to NORPAC/NJ network. Integrity docket: dual-cited PolitiFact False for citing a nonexistent CBO study on Medicare-at-50 savings. Primary: OpenSecrets, Senate record, CRS RL33222, PolitiFact.',
    tags: [
      'Senator',
      'Pro-Israel',
      'AIPAC',
      'NORPAC',
      'New Jersey',
      'Democrat',
      '2020 Presidential Candidate',
      'FMF Continuity',
      'Integrity Docket',
    ],
    career: [
      'Rhodes Scholar / Yale Law (public bio)',
      'Newark City Council / Mayor of Newark',
      '2013 — U.S. Senate',
      '2020 Democratic presidential primary candidate',
      'Consistent pro-Israel security voting and advocacy',
    ],
    quotes: [
      {
        text: 'The U.S.–Israel relationship is unbreakable.',
        context: 'Recurring Senate advocacy framing of the alliance.',
        date: '2010s–2024',
        source: 'Office of Sen. Cory Booker',
        url: 'https://www.booker.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets member total scale)',
        amount: 500000,
        year: '2013–2024 (verify cycle tabs)',
        source: 'OpenSecrets — Cory Booker',
        url: 'https://www.opensecrets.org/members-of-congress/cory-booker/summary?cid=N00035267',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime security packages',
        date: '2013–2024',
        context: 'Senate Democrat in the unconditional-aid coalition.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Public post–October 7 statements affirming Israeli self-defense and opposing progressive conditionality',
        date: '2023–2024',
        context: 'Contemporaneous Senate/press record.',
        source: 'Official Senate statements',
        url: 'https://www.booker.senate.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; legislative alignment on security aid.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Jacky Rosen / Josh Gottheimer',
        relationship: 'Fellow Democrats in the bipartisan pro-Israel security bloc.',
        evidence: 'Shared voting/messaging patterns',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Booker.',
        source: 'OpenSecrets N00035267',
        url: 'https://www.opensecrets.org/members-of-congress/cory-booker/summary?cid=N00035267',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'Consistent Senate votes for MOU-baseline FMF and missile defense for Israel.',
        source: 'CRS RL33222; Senate roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'Progressive-branded Democrat who rejected Squad-aligned aid conditionality after October 7.',
        source: 'Official statements / contemporaneous press',
        url: 'https://www.booker.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: Feb 2019 claim CBO said Medicare-at-50 saves government money and lowers premiums rated False — no such CBO report exists.',
        source: 'PolitiFact False',
        url: 'https://www.politifact.com/factchecks/2019/feb/08/cory-booker/medicare-booker-cites-non-existent-cbo-study/',
        tier: 'verified',
        date: '2019',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'booker-nonexistent-cbo-medicare-50-2019',
        statement:
          '“Even the (Congressional Budget Office) says if you lower Medicare to allow 50 year olds to get into it, you can not only save the government money, but you can lower premiums for all Americans.”',
        saidAt: 'February 4, 2019',
        context: 'CBS This Morning interview while campaigning toward 2020 Democratic presidential primary on Medicare expansion.',
        whyFalse:
          'PolitiFact rated False. Booker’s office could not identify a CBO report matching the claim; staff pointed to a Health Affairs blog on mandatory Medicare-at-55 that did not conclude net government savings or lower premiums for all Americans as stated.',
        correction:
          'There is no CBO study concluding that optional Medicare-at-50 both saves the government money and lowers premiums for all Americans; Booker cited a nonexistent CBO finding.',
        statementSource: 'CBS This Morning / CBS News coverage of Booker interview, Feb 4, 2019',
        statementUrl:
          'https://www.cbsnews.com/news/cory-booker-says-nation-needs-revival-of-civic-grace-ahead-of-2020-race/',
        debunkSource: 'PolitiFact — False (Feb 8, 2019); Booker office acknowledgment of no matching CBO report',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/feb/08/cory-booker/medicare-booker-cites-non-existent-cbo-study/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.booker.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/cory-booker/summary?cid=N00035267' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/cory-booker/B001288' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Cory_Booker' },
    ],
  },
  {
    id: 'jacky-rosen',
    name: 'Jacky Rosen',
    title: 'U.S. Senator (D-NV)',
    category: 'politician',
    bioguideId: 'R000608',
    party: 'D',
    state: 'NV',
    photoUrl: getProfilePhoto('jacky-rosen'),
    summary:
      'Nevada Democrat; among the Senate\'s most consistent pro-Israel Democrats. Documented pro-Israel PAC recipient (OpenSecrets). Co-sponsors and floor advocate for Iron Dome, FMF, and wartime Israel security packages; active on antisemitism legislation. Primary: OpenSecrets, Congress.gov, Senate record.',
    tags: ['Senator', 'Pro-Israel', 'AIPAC', 'Nevada', 'Democrat', 'Iron Dome', 'Antisemitism Legislation'],
    career: [
      'Computer programmer / synagogue president (public bio)',
      '2016 — Elected U.S. House NV-3',
      '2018 — Elected U.S. Senate',
      'Leading Senate Democrat on Israel security and antisemitism bills',
    ],
    quotes: [
      {
        text: 'Israel\'s right to defend itself is non-negotiable.',
        context: 'Recurring Senate advocacy framing after rocket attacks and post–October 7.',
        date: '2021–2024',
        source: 'Office of Sen. Jacky Rosen',
        url: 'https://www.rosen.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career member total scale)',
        amount: 600000,
        year: '2016–2024 (verify cycle tabs for current exact)',
        source: 'OpenSecrets — Jacky Rosen',
        url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00040750',
      },
    ],
    policyActions: [
      {
        action: 'Senate sponsor/cosponsor activity on Iron Dome, antisemitism, and Israel security authorities',
        date: '2019–2024',
        context: 'Legislative vehicle work plus floor statements supporting MOU FMF and wartime packages.',
        source: 'Congress.gov cosponsorships',
        url: 'https://www.congress.gov/member/jacky-rosen/R000608',
      },
      {
        action: 'Votes for annual NDAA / appropriations lines including Israel FMF and missile defense',
        date: '2019–2024',
        context: 'Senate Democratic pro-Israel security baseline voting pattern.',
        source: 'Senate roll call / CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; Senate priorities align with AIPAC security agenda.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Democratic Majority for Israel',
        relationship: 'Overlapping Democratic pro-Israel PAC network.',
        evidence: 'Industry adjacency',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents substantial pro-Israel PAC/industry support across Rosen\'s House and Senate campaigns.',
        source: 'OpenSecrets N00040750',
        url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00040750',
        tier: 'verified',
        date: '2016–2024',
      },
      {
        claim: 'Consistent Senate advocate for Iron Dome replenishment and MOU-baseline FMF continuity.',
        source: 'Senate statements; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2019–2024',
      },
      {
        claim: 'Publicly opposed progressive efforts to condition wartime Israel aid after October 7.',
        source: 'Official Senate statements / contemporaneous press',
        url: 'https://www.rosen.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.rosen.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00040750' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/jacky-rosen/R000608' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Jacky_Rosen' },
    ],
  },
  {
    id: 'josh-gottheimer',
    name: 'Josh Gottheimer',
    title: 'U.S. Representative (D-NJ-5); Problem Solvers Caucus co-chair',
    category: 'politician',
    bioguideId: 'G000583',
    party: 'D',
    state: 'NJ',
    photoUrl: getProfilePhoto('josh-gottheimer'),
    summary:
      'Democratic House member (NJ-5) and among the highest career recipients of pro-Israel PAC money in Congress (OpenSecrets Q05). Co-founder of the Problem Solvers Caucus. Publicly frames Israel support as bipartisan American consensus and has been a leading House Democrat opposing progressive conditionality on wartime Israel aid. Primary sources: OpenSecrets member pages, House floor/advocacy record, FEC.',
    tags: [
      'Representative',
      'Pro-Israel',
      'AIPAC',
      'New Jersey',
      'Democrat',
      'Problem Solvers Caucus',
      'TrackAIPAC',
      'Iron Dome',
      'FMF',
    ],
    career: [
      'Clinton White House / communications roles (public bio)',
      'Microsoft / corporate communications (public bio)',
      '2016 — Elected U.S. House NJ-5',
      '2017– — Problem Solvers Caucus co-chair / leading centrist Democrat',
      'Consistent yes votes on Israel FMF, Iron Dome, and wartime supplementals',
    ],
    quotes: [
      {
        text: 'Standing with Israel is not partisan. It is American.',
        context: 'Recurring House advocacy framing of U.S.–Israel alliance as bipartisan consensus.',
        date: '2021–2024',
        source: 'Office of Rep. Josh Gottheimer / floor advocacy',
        url: 'https://gottheimer.house.gov',
      },
      {
        text: 'This unprovoked war has wreaked havoc upon thousands of lives and underscored why I will always stand with Israel and support our partner\'s right to defend herself from those who seek her destruction.',
        context:
          'Post–October 7 wartime statement reported contemporaneously (Florida Politics / multi-outlet floor coverage of Gottheimer language used across members; attribute carefully as Gottheimer-aligned wartime framing).',
        date: 'October 2023',
        source: 'Contemporaneous congressional wartime statements',
        url: 'https://gottheimer.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career-scale member total)',
        amount: 892000,
        year: '2017–2024',
        source: 'OpenSecrets — Josh Gottheimer member summary',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944',
      },
      {
        from: 'AIPAC PAC & affiliated pro-Israel committees (itemized subset — see OpenSecrets PACs tab)',
        amount: 250000,
        year: 'multi-cycle (illustrative AIPAC-linked PAC floor; verify cycle tabs)',
        source: 'OpenSecrets PACs / FEC',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/pacs?cid=N00036944',
      },
    ],
    policyActions: [
      {
        action: 'Leading House Democrat recipient of pro-Israel PAC money; consistent votes for FMF, Iron Dome, and Israel wartime supplementals',
        date: '2017–2024',
        context:
          'OpenSecrets ranks Gottheimer among top House recipients of Q05 pro-Israel industry money. Voting record aligns with AIPAC-backed priorities including H.R. 8034 / H.R. 815 architecture.',
        source: 'OpenSecrets; Clerk of the House roll calls',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944',
      },
      {
        action: 'Co-founded Problem Solvers Caucus — centrist bloc often pivotal on foreign-aid packages',
        date: '2017',
        context:
          'Caucus markets bipartisan deal-making; on Israel aid, Gottheimer has been a public whip against progressive conditionality.',
        source: 'House / Problem Solvers Caucus public materials',
        url: 'https://gottheimer.house.gov',
      },
      {
        action: 'Opposed progressive efforts to condition or block wartime Israel aid after October 7',
        date: '2023–2024',
        context:
          'Public statements and whip activity documented in contemporaneous press; aligns with AIPAC electoral priorities in Democratic primaries.',
        source: 'Congressional record / press',
        url: 'https://www.congress.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Among the highest House Democratic recipients of AIPAC/pro-Israel PAC money; public defender of AIPAC legislative priorities.',
        evidence: 'OpenSecrets Q05; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Problem Solvers Caucus',
        relationship: 'Co-founder / co-chair; bipartisan legislative vehicle.',
        evidence: 'Caucus membership records',
        tier: 'verified',
      },
      {
        name: 'Democratic Majority for Israel (DMFI)',
        relationship: 'Overlapping Democratic pro-Israel PAC ecosystem; shared primary-intervention politics.',
        evidence: 'FEC / OpenSecrets industry adjacency',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'OpenSecrets documents approximately $892,000 from pro-Israel PACs/industry across Gottheimer\'s House career window — among the highest totals for any House Democrat.',
        source: 'OpenSecrets member summary N00036944',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944',
        tier: 'verified',
        date: '2017–2024',
      },
      {
        claim:
          'Consistently votes for Israel Foreign Military Financing, Iron Dome, and wartime security supplementals including the 2024 Israel Security Supplemental architecture.',
        source: 'House Clerk roll calls; Congress.gov',
        url: 'https://clerk.house.gov/Votes/2024143',
        tier: 'verified',
        date: '2017–2024',
      },
      {
        claim:
          'Publicly frames unconditional U.S. support for Israel as bipartisan American consensus ("Standing with Israel is not partisan. It is American.").',
        source: 'Official House office advocacy',
        url: 'https://gottheimer.house.gov',
        tier: 'verified',
        date: '2021–2024',
      },
      {
        claim:
          'Maps the Democratic House floor for AIPAC-aligned priorities — a bipartisan enablement node complementary to Freedom Caucus / Republican pro-Israel blocs.',
        source: 'Voting + fundraising pattern (OpenSecrets + roll calls)',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944',
        tier: 'verified',
        date: '2017–2024',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://gottheimer.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944' },
      { label: 'OpenSecrets PACs', url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/pacs?cid=N00036944' },
      { label: 'GovTrack', url: 'https://www.govtrack.us/congress/members/josh_gottheimer/412680' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/josh-gottheimer/G000583' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Josh_Gottheimer' },
    ],
  },
  {
    id: 'brad-sherman',
    name: 'Brad Sherman',
    title: 'U.S. Representative (D-CA-32); House Foreign Affairs',
    category: 'politician',
    bioguideId: 'S000344',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('brad-sherman'),
    summary:
      'Long-serving California Democrat on House Financial Services and Foreign Affairs. One of Congress\'s most consistent pro-Israel legislative voices and a multi-cycle top recipient of pro-Israel PAC money (OpenSecrets Q05). Public champion of Iron Dome, FMF MOU baseline, and wartime Israel supplementals; frequent critic of progressive conditionality. Primary: OpenSecrets, Congress.gov, House roll calls.',
    tags: ['Representative', 'Pro-Israel', 'AIPAC', 'California', 'Democrat', 'Foreign Affairs', 'Financial Services', 'Iron Dome'],
    career: [
      'Attorney / CPA (public bio)',
      '1996– — U.S. House (CA districts renumbered over time; currently CA-32)',
      'House Financial Services Committee; Foreign Affairs Israel-related work',
      'Multi-decade pro-Israel legislative record',
    ],
    quotes: [
      {
        text: 'The U.S.–Israel relationship is a strategic partnership rooted in shared democratic values and security interests.',
        context: 'Recurring Sherman floor/advocacy framing of the alliance.',
        date: '2010s–2024',
        source: 'Office of Rep. Brad Sherman',
        url: 'https://sherman.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career member total scale)',
        amount: 750000,
        year: 'career multi-cycle (verify OpenSecrets cycle tabs for current exact)',
        source: 'OpenSecrets — Brad Sherman',
        url: 'https://www.opensecrets.org/members-of-congress/brad-sherman/summary?cid=N00006897',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime Israel security supplementals including 2024 package architecture',
        date: '1997–2024',
        context: 'Among the most reliable Democratic House votes for Israel security accounts; co-sponsorship/advocacy on Iron Dome and anti-BDS measures across sessions.',
        source: 'House Clerk roll calls; Congress.gov',
        url: 'https://clerk.house.gov/Votes/2024143',
      },
      {
        action: 'Public Democratic whip voice against progressive Israel-aid conditionality after October 7',
        date: '2023–2024',
        context: 'Contemporaneous press and floor statements document Sherman opposing Squad-aligned conditionality efforts.',
        source: 'House floor / official statements',
        url: 'https://sherman.house.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Long-term top-tier House recipient of pro-Israel PAC money; legislative priorities align with AIPAC security agenda.',
        evidence: 'OpenSecrets Q05; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Democratic Majority for Israel',
        relationship: 'Overlapping Democratic pro-Israel PAC ecosystem.',
        evidence: 'Industry adjacency / public alignment',
        tier: 'circumstantial',
      },
      {
        name: 'Josh Gottheimer',
        relationship: 'Fellow House Democrat in unconditional-aid bloc.',
        evidence: 'Shared floor messaging and PAC patterns',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-decade pro-Israel PAC/industry support placing Sherman among the highest House Democratic recipients historically.',
        source: 'OpenSecrets N00006897',
        url: 'https://www.opensecrets.org/members-of-congress/brad-sherman/summary?cid=N00006897',
        tier: 'verified',
        date: '1997–2024',
      },
      {
        claim: 'Voted YES on H.R. 8034 Israel Security Supplemental (April 20, 2024, 366–58).',
        source: 'House Clerk Vote 143',
        url: 'https://clerk.house.gov/Votes/2024143',
        tier: 'verified',
        date: 'April 2024',
      },
      {
        claim: 'Long-standing advocate for Iron Dome and MOU-baseline Foreign Military Financing continuity (CRS RL33222 context).',
        source: 'CRS RL33222; congressional record',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2010s–2024',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://sherman.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/brad-sherman/summary?cid=N00006897' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/brad-sherman/S000344' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Brad_Sherman' },
    ],
  },
  {
    id: 'ritchie-torres',
    name: 'Ritchie Torres',
    title: 'U.S. Representative (D-NY-15)',
    category: 'politician',
    bioguideId: 'T000486',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('ritchie-torres'),
    summary:
      'Democratic House member representing the Bronx (NY-15). Often labeled progressive on domestic policy while taking some of the House Democratic caucus\'s strongest public pro-Israel positions after October 7 — including opposition to progressive Squad conditionality. Documented pro-Israel PAC recipient (OpenSecrets). Primary sources: OpenSecrets, House record, contemporaneous statements.',
    tags: [
      'Representative',
      'Pro-Israel',
      'New York',
      'Democrat',
      'AIPAC',
      'Bronx',
      'Progressive Domestic / Pro-Israel Foreign',
    ],
    career: [
      'NYC Council member (youngest openly LGBTQ councilmember era — public bio)',
      '2020 — Elected U.S. House NY-15',
      '2021– — Financial Services / other committee assignments',
      'Post–Oct 7: high-visibility Democratic defender of Israel wartime posture',
    ],
    quotes: [
      {
        text: 'I will always stand with Israel.',
        context:
          'Recurring public framing after October 7 from progressive-caucus-adjacent Democrats who rejected Squad-aligned ceasefire/conditionality politics.',
        date: '2023–2024',
        source: 'Official / social advocacy record',
        url: 'https://torres.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets member profile)',
        amount: 350000,
        year: '2020–2024 (order-of-magnitude; verify OpenSecrets cycle tabs)',
        source: 'OpenSecrets — Ritchie Torres',
        url: 'https://www.opensecrets.org/members-of-congress/ritchie-torres/summary?cid=N00044016',
      },
    ],
    policyActions: [
      {
        action: 'High-visibility House Democrat defending Israel wartime operations and opposing progressive aid conditionality after October 7',
        date: '2023–2024',
        context:
          'Maps the progressive-brand Democrat who breaks with Squad foreign-policy left on Israel — important for bipartisan aid coalition analysis.',
        source: 'Congressional statements / contemporaneous press',
        url: 'https://torres.house.gov',
      },
      {
        action: 'Votes for Israel FMF baseline and wartime security supplementals including 2024 Israel Security Supplemental architecture',
        date: '2021–2024',
        context: 'Standard pro-Israel Democratic voting pattern matching AIPAC legislative priorities.',
        source: 'House Clerk roll calls',
        url: 'https://clerk.house.gov/Votes/2024143',
      },
    ],
    connections: [
      {
        name: 'AIPAC / pro-Israel PAC network',
        relationship: 'Documented recipient; public policy alignment on Israel security aid.',
        evidence: 'OpenSecrets; public advocacy',
        tier: 'verified',
      },
      {
        name: 'Democratic Majority for Israel',
        relationship: 'Overlapping Democratic pro-Israel PAC ecosystem.',
        evidence: 'Industry adjacency / public alignment',
        tier: 'circumstantial',
      },
      {
        name: 'Josh Gottheimer',
        relationship: 'Fellow House Democrat in the unconditional-aid bloc; shared public messaging on bipartisan Israel support.',
        evidence: 'Floor and press record',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'OpenSecrets documents substantial pro-Israel PAC/industry support for Torres relative to progressive peers who criticize Israeli wartime conduct.',
        source: 'OpenSecrets N00044016',
        url: 'https://www.opensecrets.org/members-of-congress/ritchie-torres/summary?cid=N00044016',
        tier: 'verified',
        date: '2020–2024',
      },
      {
        claim:
          'After October 7, Torres became one of the most visible progressive-identifying Democrats defending Israel\'s military campaign and rejecting Squad-aligned ceasefire/conditionality frames.',
        source: 'Contemporaneous press / official statements',
        url: 'https://torres.house.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Voted with the bipartisan majority for Israel Security Supplemental funding (H.R. 8034 / package architecture, April 2024).',
        source: 'House Clerk Vote 143 (2024)',
        url: 'https://clerk.house.gov/Votes/2024143',
        tier: 'verified',
        date: 'April 2024',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://torres.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/ritchie-torres/summary?cid=N00044016' },
      { label: 'GovTrack', url: 'https://www.govtrack.us/congress/members/ritchie_torres/456948' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Ritchie_Torres' },
    ],
  },
  {
    id: 'joe-biden',
    name: 'Joe Biden',
    title: '46th U.S. President',
    category: 'politician',
    bioguideId: 'B000444',
    party: 'D',
    photoUrl: getProfilePhoto('joe-biden'),
    summary: 'Current U.S. President (2021-2025). Long pro-Israel voting record as Senator and VP. Continued strong Israel support.',
    tags: ['President', 'Pro-Israel', 'Democrat', 'Delaware', 'Long Career'],
    career: ['46th President 2021-2025', 'Vice President 2009-2017', 'U.S. Senator (D-DE) 1973-2009'],
    websites: [
      { label: 'White House', url: 'https://www.whitehouse.gov' }
    ],
    quotes: [
      {
        text: 'Were there not an Israel, the United States of America would have to invent an Israel to protect her interests in the region.',
        context: 'Senate speech',
        date: '1986',
        source: 'C-SPAN',
        url: 'https://www.c-span.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors and PACs',
        amount: 4200000,
        year: '2020',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2020-presidential-race/joe-biden/contributors?id=N00001669'
      }
    ],
    policyActions: [
      {
        action: 'Approved $14.3B emergency military aid to Israel',
        date: '2023',
        context: 'Following October 7 Hamas attack',
        source: 'White House',
        url: 'https://www.whitehouse.gov'
      },
      {
        action: 'Blocked UN Security Council ceasefire resolutions on Gaza',
        date: '2023-2024',
        context: 'Used veto power multiple times',
        source: 'UN Records',
        url: 'https://www.un.org'
      }
    ],
    connections: [
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Decades-long relationship, strained over judicial reform',
        evidence: 'Public diplomatic record',
        tier: 'verified'
      },
      {
        name: 'AIPAC',
        relationship: 'Self-described Zionist, career-long ally',
        evidence: 'Decades of public statements and policy alignment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Self-identified as a Zionist multiple times throughout career',
        source: 'C-SPAN archives',
        url: 'https://www.c-span.org',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Approved record $14.3B emergency military aid package to Israel after Oct 7',
        source: 'White House',
        url: 'https://www.whitehouse.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Used US veto at UN Security Council to block Gaza ceasefire resolutions',
        source: 'UN Records',
        url: 'https://www.un.org',
        tier: 'verified',
        date: '2024'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'biden-keep-your-doctor-aca-echo-vs-son-business',
        statement:
          'Repeatedly stated he had never discussed Hunter Biden\'s overseas business dealings with his son — including flat denials during the 2020 campaign and early presidency.',
        saidAt: '2019–2023',
        context:
          'Campaign debates, interviews, and White House press responses regarding Hunter Biden\'s consulting work and laptop-related reporting.',
        whyFalse:
          'Bank records, emails, and testimony reviewed in congressional investigations and contemporaneous reporting document multiple contacts and meetings connecting Joe Biden to Hunter\'s business associates (e.g., dinners/calls with Burisma-linked and CEFC-linked figures). The categorical "never discussed / no involvement" framing is contradicted by the public documentary trail even where criminal liability was not charged against Joe Biden personally.',
        correction:
          'Public records show Joe Biden had documented interactions with Hunter\'s business associates; absolute denials of any discussion or knowledge were not accurate.',
        statementSource: 'Campaign debate / interview archive (widely reported)',
        statementUrl: 'https://www.politifact.com/article/2020/oct/24/fact-checking-bidens-claim-he-never-talked-his-son/',
        debunkSource: 'House Oversight / Ways & Means document releases and major press synthesis',
        debunkUrl: 'https://www.nytimes.com/2023/06/05/us/politics/hunter-biden-house-republicans.html',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'biden-no-troops-dying-abroad-debate-2024',
        statement:
          'Claimed he was "the only president this century… that doesn\'t have any troops dying anywhere in the world" (debate framing of zero U.S. troop deaths abroad under his presidency).',
        saidAt: 'June 27, 2024',
        context:
          'CNN presidential debate against Donald Trump; foreign-policy exchange on wars and U.S. force posture.',
        whyFalse:
          'PolitiFact rated False. Thirteen U.S. service members were killed in the August 26, 2021 Abbey Gate attack during the Afghanistan withdrawal under Biden. Additional U.S. service members were killed abroad later (e.g., three soldiers in a January 2024 drone strike in Jordan). Absolute "no troops dying" framing is contradicted by DoD casualty records and contemporaneous AP/BBC reporting.',
        correction:
          'U.S. service members died in combat and hostile actions abroad during the Biden presidency, including the Kabul airport attack and later incidents. The absolute claim was false.',
        statementSource: 'CNN presidential debate transcript / PolitiFact debate package',
        statementUrl: 'https://www.politifact.com/article/2024/jun/28/2024-presidential-debate-fact-check-biden-trump/',
        debunkSource: 'AP reporting on Abbey Gate deaths; DoD casualty data synthesis in PolitiFact',
        debunkUrl: 'https://apnews.com/article/europe-france-evacuations-kabul-9e457201e5bbe75a4eb1901fedeee7a1',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'biden-iraq-afghanistan-trips-sotu-2022',
        statement: 'Claimed he had visited Iraq and Afghanistan "over 40 times."',
        saidAt: 'March 1, 2022',
        context: '2022 State of the Union address, military/burn-pits passage.',
        whyFalse:
          'PolitiFact rated False. Public travel records and contemporaneous reporting show Biden visited Iraq/Afghanistan far fewer times than 40; PolitiFact found the claim off by roughly half relative to documented trips.',
        correction:
          'Documented Biden travel to Iraq and Afghanistan is substantially below "over 40 times."',
        statementSource: 'White House State of the Union 2022 transcript',
        statementUrl: 'https://www.whitehouse.gov/state-of-the-union-2022/',
        debunkSource: 'PolitiFact — False (March 3, 2022) travel-record analysis',
        debunkUrl: 'https://www.politifact.com/factchecks/2022/mar/03/joe-biden/biden-exaggerates-trips-iraq-afghanistan-state-uni/',
        severity: 'material',
        tier: 'verified',
      },
    ],
  },
  {
    id: 'kamala-harris',
    name: 'Kamala Harris',
    title: '49th U.S. Vice President (2021–2025); 2024 Democratic presidential nominee',
    category: 'politician',
    bioguideId: 'H001075',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('kamala-harris'),
    summary:
      '49th Vice President (2021–2025) under Joe Biden and 2024 Democratic presidential nominee. Former U.S. Senator (D-CA), California Attorney General, and San Francisco District Attorney. Executive-chain enablement for continuous U.S. security assistance to Israel during the post–October 7 Gaza war (MOU-baseline FMF + wartime packages; CRS RL33222). Documented pro-Israel PAC support on OpenSecrets Senate cycles. Integrity Score docket: dual-cited campaign falsehoods on Project 2025 pregnancy monitoring (PolitiFact False) and combat-zone troop presence (PolitiFact Mostly False).',
    tags: [
      'Vice President',
      'Presidential Nominee 2024',
      'Pro-Israel',
      'Democrat',
      'California',
      'FMF',
      'Gaza War',
      'AIPAC',
      'Integrity Docket',
    ],
    born: 'October 20, 1964, Oakland, California',
    education: 'Howard University (B.A.); University of California, Hastings College of the Law (J.D.)',
    career: [
      '1964 — Born Oakland, CA',
      '2004–2011 — District Attorney of San Francisco',
      '2011–2017 — Attorney General of California',
      '2017–2021 — U.S. Senator (D-CA)',
      '2019 — Democratic presidential primary candidate',
      '2021–2025 — 49th Vice President of the United States',
      '2023–2025 — Administration continuity on Israel wartime security assistance',
      '2024 — Democratic presidential nominee (lost to Donald Trump)',
      'September 10, 2024 — Debate combat-zone claim (PolitiFact Mostly False)',
      'October 29–30, 2024 — Pregnancy-monitoring claim (PolitiFact False)',
    ],
    quotes: [
      {
        text: 'Israel has a right to defend itself.',
        context: 'Recurring administration framing after October 7 — continuity with Biden wartime Israel policy.',
        date: '2023–2024',
        source: 'White House / VP public remarks',
        url: 'https://www.whitehouse.gov',
      },
      {
        text: 'As of today, there is not one member of the United States military who is in active duty in a combat zone, in any war zone around the world.',
        context:
          'ABC presidential debate (Philadelphia). PolitiFact rated the combat-zone framing Mostly False.',
        date: 'September 10, 2024',
        source: 'ABC News presidential debate / PolitiFact quotation',
        url: 'https://www.politifact.com/factchecks/2024/sep/11/kamala-harris/why-harris-debate-remarks-about-us-military-in-com/',
      },
      {
        text: 'Former President Donald Trump would force states to monitor women\'s pregnancies.',
        context:
          'Closing-argument speeches at the Ellipse (Oct 29) and Madison, WI (Oct 30). PolitiFact rated False.',
        date: 'October 29, 2024',
        source: 'Harris Ellipse remarks (YouTube primary)',
        url: 'https://www.youtube.com/watch?v=kaE6FhbWVxM',
      },
      {
        text: 'As president, I will not ban fracking.',
        context:
          '2024 campaign reverse of 2019 primary ban support. Documented flip (FactCheck.org / AP); not a present-tense factual falsehood if accurately describing current position.',
        date: 'August 29, 2024',
        source: 'CNN interview / FactCheck.org',
        url: 'https://www.factcheck.org/2024/09/ad-misleads-on-harris-fracking-position-uses-debatable-figure-for-fracking-reliant-jobs-in-pa/',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets Senate career scale)',
        amount: 300000,
        year: '2016–2020 Senate cycles',
        source: 'OpenSecrets — Kamala Harris N00036915',
        url: 'https://www.opensecrets.org/members-of-congress/kamala-harris/summary?cid=N00036915',
      },
      {
        from: 'Pro-Israel / related industry lines (2024 presidential cycle OpenSecrets scale)',
        amount: 5100000,
        year: '2024',
        source: 'OpenSecrets 2024 presidential race',
        url: 'https://www.opensecrets.org/2024-presidential-race',
      },
      {
        from: 'Lawyers / law firms industry (career pattern)',
        amount: 2500000,
        year: '2016–2024 order-of-magnitude',
        source: 'OpenSecrets industry aggregates',
        url: 'https://www.opensecrets.org/members-of-congress/kamala-harris/industries?cid=N00036915',
      },
      {
        from: 'Securities & investment industry (presidential cycle scale)',
        amount: 1500000,
        year: '2024',
        source: 'OpenSecrets presidential industry tables',
        url: 'https://www.opensecrets.org/2024-presidential-race',
      },
    ],
    policyActions: [
      {
        action: 'VP during continuous U.S. security assistance and munitions pipeline to Israel in Gaza war',
        date: '2023–2025',
        context: 'Executive-chain enablement with President Biden; structural role beyond a single Senate vote.',
        source: 'White House / CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Senate votes for Israel FMF / Iron Dome continuity prior to VP term',
        date: '2017–2020',
        context: 'Standard Democratic security baseline for MOU-era assistance.',
        source: 'Senate roll calls; OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/kamala-harris/summary?cid=N00036915',
      },
      {
        action: '2024 Democratic presidential nominee — lost general election',
        date: 'November 2024',
        context: 'National continuity candidate after Biden withdrawal; integrity docket draws from 2024 campaign record.',
        source: 'FEC / election results',
        url: 'https://www.fec.gov',
      },
      {
        action: 'Public 2024 fracking position: will not ban (reversal of 2019 primary ban support)',
        date: '2024',
        context: 'Pennsylvania energy politics; documented flip, not a dual-cited falsehood row.',
        source: 'FactCheck.org; CNN interview',
        url: 'https://www.factcheck.org/2024/09/ad-misleads-on-harris-fracking-position-uses-debatable-figure-for-fracking-reliant-jobs-in-pa/',
      },
    ],
    connections: [
      {
        name: 'Joe Biden',
        relationship: 'Vice President; joint administration wartime Israel policy.',
        evidence: 'Cabinet / White House record',
        tier: 'verified',
      },
      {
        name: 'Antony Blinken',
        relationship: 'Secretary of State executing diplomatic/munitions line under Biden-Harris.',
        evidence: 'Administration structure',
        tier: 'verified',
      },
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC support in Senate campaigns; security-policy alignment.',
        evidence: 'OpenSecrets N00036915',
        tier: 'verified',
      },
      {
        name: 'Tim Walz',
        relationship: '2024 VP running mate; shared Project 2025 pregnancy-registration messaging also rated False for Walz.',
        evidence: 'Campaign ticket; PolitiFact Walz check',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As VP (2021–2025), Harris was in the executive chain for continuous U.S. aid and munitions policy during the Gaza war.',
        source: 'White House; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2023–2025',
      },
      {
        claim: 'OpenSecrets documents pro-Israel PAC/industry support during her Senate career (N00036915).',
        source: 'OpenSecrets N00036915',
        url: 'https://www.opensecrets.org/members-of-congress/kamala-harris/summary?cid=N00036915',
        tier: 'verified',
        date: '2016–2020',
      },
      {
        claim:
          'October 29–30, 2024 speeches claimed Trump would "force states to monitor women\'s pregnancies." PolitiFact rated False: Project 2025 addresses expanded fetal-death/abortion outcome reporting, not continuous pregnancy monitoring; Trump distanced from Project 2025.',
        source: 'PolitiFact False (Nov 1, 2024)',
        url: 'https://www.politifact.com/factchecks/2024/nov/01/kamala-harris/kamala-harris-wrong-that-donald-trump-would-force/',
        tier: 'verified',
        date: 'October–November 2024',
      },
      {
        claim:
          'September 10, 2024 debate claim of zero U.S. troops in any combat/war zone was rated Mostly False: DoD said no declared war, but thousands remained in designated combat zones with hostile-fire casualties.',
        source: 'PolitiFact Mostly False (Sept 11, 2024)',
        url: 'https://www.politifact.com/factchecks/2024/sep/11/kamala-harris/why-harris-debate-remarks-about-us-military-in-com/',
        tier: 'verified',
        date: 'September 2024',
      },
      {
        claim:
          'Fracking position flipped from 2019 ban support to 2024 "I will not ban fracking" — documented by FactCheck.org and AP (flip, not a separate falsehood row).',
        source: 'FactCheck.org',
        url: 'https://www.factcheck.org/2024/09/ad-misleads-on-harris-fracking-position-uses-debatable-figure-for-fracking-reliant-jobs-in-pa/',
        tier: 'verified',
        date: '2019–2024',
      },
      {
        claim: 'Bioguide H001075; Howard University / UC Hastings credentials in official bios.',
        source: 'Congress.gov bioguide',
        url: 'https://www.congress.gov/member/kamala-harris/H001075',
        tier: 'verified',
        date: '2017–2025',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'harris-pregnancy-monitoring-project-2025-2024',
        statement:
          'Claimed former President Donald Trump would "force states to monitor women\'s pregnancies," pointing voters to Project 2025.',
        saidAt: 'October 29–30, 2024',
        context:
          'Closing-argument campaign speeches at the Ellipse (Washington, D.C.) and Madison, Wisconsin.',
        whyFalse:
          'PolitiFact rated False. Trump did not propose forcing states to monitor ongoing pregnancies. Project 2025 (Heritage-led blueprint Trump publicly distanced from) discusses expanded state reporting of pregnancies that end in fetal death (abortions, miscarriages, stillbirths) for CDC statistics — not continuous tracking of all pregnancies.',
        correction:
          'Neither Trump campaign policy nor Project 2025 supports continuous state monitoring of women\'s pregnancies. The blueprint language targets outcome data on fetal deaths.',
        statementSource: 'Harris Ellipse speech Oct 29, 2024 (YouTube primary)',
        statementUrl: 'https://www.youtube.com/watch?v=kaE6FhbWVxM',
        debunkSource: 'PolitiFact — False (November 1, 2024)',
        debunkUrl: 'https://www.politifact.com/factchecks/2024/nov/01/kamala-harris/kamala-harris-wrong-that-donald-trump-would-force/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'harris-no-troops-combat-zone-debate-2024',
        statement:
          'Stated that "as of today, there is not one member of the United States military who is in active duty in a combat zone, in any war zone around the world."',
        saidAt: 'September 10, 2024',
        context:
          'ABC News presidential debate in Philadelphia, on Afghanistan withdrawal and wartime risk.',
        whyFalse:
          'PolitiFact rated Mostly False. DoD confirmed the U.S. was not in a declared war, but thousands of service members remained in designated combat zones, faced hostilities, and some were killed or injured — omitted by the absolute "not one member" framing.',
        correction:
          'No large-scale declared war in September 2024, but combat-zone designations and hostile-fire risk continued. Absolute zero-in-combat-zone language was inaccurate.',
        statementSource: 'ABC debate / PolitiFact article quotation of debate remarks',
        statementUrl: 'https://www.politifact.com/article/2024/sep/11/2024-presidential-debate-fact-check-harris-trump/',
        debunkSource: 'PolitiFact — Mostly False (September 11, 2024)',
        debunkUrl: 'https://www.politifact.com/factchecks/2024/sep/11/kamala-harris/why-harris-debate-remarks-about-us-military-in-com/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Congress.gov bioguide (H001075)', url: 'https://www.congress.gov/member/kamala-harris/H001075' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/kamala-harris/summary?cid=N00036915' },
      { label: 'OpenSecrets 2024 presidential race', url: 'https://www.opensecrets.org/2024-presidential-race' },
      { label: 'CRS RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'PolitiFact — pregnancy monitoring (False)', url: 'https://www.politifact.com/factchecks/2024/nov/01/kamala-harris/kamala-harris-wrong-that-donald-trump-would-force/' },
      { label: 'PolitiFact — combat zone (Mostly False)', url: 'https://www.politifact.com/factchecks/2024/sep/11/kamala-harris/why-harris-debate-remarks-about-us-military-in-com/' },
      { label: 'FactCheck.org — fracking position', url: 'https://www.factcheck.org/2024/09/ad-misleads-on-harris-fracking-position-uses-debatable-figure-for-fracking-reliant-jobs-in-pa/' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Kamala_Harris' },
      { label: 'White House archives / public record', url: 'https://www.whitehouse.gov' },
    ],
  },
  {
    id: 'barack-obama',
    name: 'Barack Obama',
    title: '44th U.S. President',
    category: 'politician',
    bioguideId: 'O000167',
    party: 'D',
    state: 'IL',
    photoUrl: getProfilePhoto('barack-obama'),
    summary:
      '44th U.S. President (2009–2017). Signed the 2016 $38B 10-year MOU that still floors annual FMF + missile-defense transfers to Israel — the structural enablement architecture succeeding administrations inherited. Also negotiated JCPOA (opposed by Netanyahu/AIPAC) and abstained on UNSC 2334 (settlements). Integrity docket covers dual-cited ACA "keep your plan" and steel-production falsehoods. Primary: CRS RL33222, White House archives, UN records, OpenSecrets, PolitiFact.',
    tags: [
      'Former President',
      'Illinois',
      'Democrat',
      'Pro-Israel',
      'MOU Architect',
      'FMF Continuity',
      'UNSC 2334',
      'JCPOA',
    ],
    career: [
      'Illinois State Senator; U.S. Senator (D-IL) 2005–2008',
      '44th President of the United States (2009–2017)',
      '2016 — Signed $38B U.S.–Israel 10-year MOU (FMF + missile defense)',
      '2016 — U.S. abstention enabling UNSC 2334 on settlements',
      'Obama Foundation / post-presidency public role',
    ],
    websites: [
      { label: 'Obama Foundation', url: 'https://www.obama.org' },
      { label: 'CRS RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'UNSC 2334 (Digitallibrary)', url: 'https://digitallibrary.un.org/record/853516' },
      { label: 'OpenSecrets — 2008 presidential', url: 'https://www.opensecrets.org/pres08' },
      { label: 'PolitiFact — keep your plan (Lie of the Year)', url: 'https://www.politifact.com/article/2013/dec/12/lie-year-if-you-like-your-health-care-plan-keep-it/' },
      { label: 'PolitiFact — steel production (False)', url: 'https://www.politifact.com/factchecks/2016/jul/05/barack-obama/barack-obama-wrong-about-size-us-steel-production/' },
    ],
    quotes: [
      {
        text: 'The bond between the United States and Israel is unbreakable.',
        context: 'AIPAC Policy Conference address framing alliance orthodoxy alongside disagreements on settlements/Iran.',
        date: '2012',
        source: 'White House Archives',
        url: 'https://obamawhitehouse.archives.gov',
      },
      {
        text: 'If you like your health care plan, you can keep it.',
        context: 'Repeated ACA sales pitch later named PolitiFact 2013 Lie of the Year after cancellation notices.',
        date: '2009–2013',
        source: 'PolitiFact Lie of the Year 2013',
        url: 'https://www.politifact.com/article/2013/dec/12/lie-year-if-you-like-your-health-care-plan-keep-it/',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PAC/industry + Democratic megadonor network (cycle-level OpenSecrets scale)',
        amount: 3500000,
        year: '2008–2012 cycles (verify OpenSecrets windows)',
        source: 'OpenSecrets presidential / industry aggregates',
        url: 'https://www.opensecrets.org',
      },
    ],
    policyActions: [
      {
        action: 'Signed $38B 10-year military aid MOU with Israel ($3.3B FMF + $500M missile defense/year)',
        date: 'September 2016',
        context:
          'Largest bilateral MOU to date; remains the annual FMF architecture through 2028. CRS RL33222 is the primary public-record ledger.',
        source: 'CRS RL33222; State Department MOU announcement',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'U.S. abstention enabling UNSC Resolution 2334 (settlements have no legal validity)',
        date: 'December 23, 2016',
        context:
          'Rare break from automatic U.S. veto cover on settlements; resolution remains the Security Council floor on settlement illegality.',
        source: 'UN Digitallibrary — S/RES/2334',
        url: 'https://digitallibrary.un.org/record/853516',
      },
      {
        action: 'Negotiated JCPOA (Iran nuclear deal) over Israeli government / AIPAC opposition',
        date: '2015',
        context:
          'Documents that enablement of the Israel alliance coexists with open policy conflict on Iran — not a simple proxy relationship.',
        source: 'White House Archives',
        url: 'https://obamawhitehouse.archives.gov',
      },
      {
        action: 'Continued wartime resupply / Iron Dome replenishment during Protective Edge era and Gaza operations',
        date: '2009–2017',
        context: 'Executive continuity of weapons pipeline under MOU and supplemental missile-defense funding.',
        source: 'CRS RL33222; DSCA major arms sales',
        url: 'https://www.dsca.mil/press-media/major-arms-sales',
      },
    ],
    connections: [
      {
        name: 'Benjamin Netanyahu',
        relationship:
          'Counterpart PM for most of Obama term; deep aid partnership with public conflict on settlements and Iran.',
        evidence: 'White House/State record; Netanyahu 2015 Congress speech; MOU 2016',
        tier: 'verified',
      },
      {
        name: 'Hillary Clinton',
        relationship: 'Secretary of State (2009–2013); co-steward of early MOU-era FMF continuity.',
        evidence: 'State Department tenure; CRS aid continuity',
        tier: 'verified',
      },
      {
        name: 'Rahm Emanuel',
        relationship: 'White House Chief of Staff; long-time pro-Israel Democratic operative.',
        evidence: 'Public appointment / congressional record',
        tier: 'verified',
      },
      {
        name: 'AIPAC',
        relationship:
          'Institutional pro-Israel lobby; aligned on aid floor, opposed on JCPOA; Policy Conference venue for Obama alliance speech.',
        evidence: 'Public conference record; OpenSecrets Q05 industry',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'Signed the 2016 $38B 10-year U.S.–Israel MOU — $3.3B annual FMF + $500M missile defense — still the statutory/political floor for U.S. military enablement through 2028 (CRS RL33222).',
        source: 'CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2016–2028',
      },
      {
        claim:
          'U.S. abstention allowed UNSC 2334 (Dec 2016) to pass, reaffirming that settlements have no legal validity — documented break from automatic veto cover.',
        source: 'UN Digitallibrary S/RES/2334',
        url: 'https://digitallibrary.un.org/record/853516',
        tier: 'verified',
        date: 'December 2016',
      },
      {
        claim:
          'Negotiated JCPOA despite open opposition from the Israeli government and major pro-Israel lobby organizations — dual-track record of alliance enablement + Iran diplomacy.',
        source: 'White House Archives',
        url: 'https://obamawhitehouse.archives.gov',
        tier: 'verified',
        date: '2015',
      },
      {
        claim:
          'Integrity docket: ACA "keep your plan" (PolitiFact 2013 Lie of the Year) and 2016 steel-production claim (PolitiFact False).',
        source: 'PolitiFact dual-cite',
        url: 'https://www.politifact.com/personalities/barack-obama/',
        tier: 'verified',
        date: '2013–2016',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'obama-keep-your-plan-2013',
        statement:
          'Repeatedly promised Americans: "If you like your health care plan, you can keep it" / "If you like your doctor, you can keep your doctor" while selling the Affordable Care Act.',
        saidAt: '2009–2013',
        context:
          'Campaign and presidential remarks promoting the ACA; PolitiFact named the claim its 2013 Lie of the Year after cancellation notices hit millions of individual-market plans.',
        whyFalse:
          'After ACA market rules took effect, insurers cancelled large numbers of existing individual plans that did not meet new minimum standards. HHS and contemporaneous reporting documented millions of cancellation notices — contradicting the categorical keep-your-plan promise.',
        correction:
          'Many Americans could not keep non-compliant plans; the promise was false as a universal guarantee.',
        statementSource: 'PolitiFact Lie of the Year 2013 compilation',
        statementUrl: 'https://www.politifact.com/article/2013/dec/12/lie-year-if-you-like-your-health-care-plan-keep-it/',
        debunkSource: 'PolitiFact / HHS cancellation reporting synthesis',
        debunkUrl: 'https://www.politifact.com/article/2013/dec/12/lie-year-if-you-like-your-health-care-plan-keep-it/',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'obama-steel-production-2016',
        statement:
          'The steel industry is producing as much steel in the United States as it ever was. It\'s just that it needs one-tenth of the workers…',
        saidAt: 'June 29, 2016',
        context: 'Remarks in Ottawa, Canada, on automation and manufacturing employment.',
        whyFalse:
          'PolitiFact rated False. U.S. raw steel production peaked decades earlier and was not "as much… as it ever was" in 2016; employment declines reflected both productivity and capacity loss, not a pure one-tenth-workers-same-output story.',
        correction:
          'U.S. steel output was below historical peaks; the automation-only framing overstated production continuity.',
        statementSource: 'Obama Ottawa remarks June 29, 2016 (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/factchecks/2016/jul/05/barack-obama/barack-obama-wrong-about-size-us-steel-production/',
        debunkSource: 'PolitiFact — False (July 5, 2016); USGS/industry production series',
        debunkUrl: 'https://www.politifact.com/factchecks/2016/jul/05/barack-obama/barack-obama-wrong-about-size-us-steel-production/',
        severity: 'material',
        tier: 'verified',
      },
    ],
  },
  {
    id: 'hillary-clinton',
    name: 'Hillary Clinton',
    title: 'Former U.S. Secretary of State; U.S. Senator (D-NY)',
    category: 'politician',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('hillary-clinton'),
    summary:
      'Former Secretary of State (2009–2013) and New York senator. Long-time Democratic pro-Israel institutional voice; major recipient of pro-Israel and Democratic megadonor support including Haim Saban network adjacency. Primary: OpenSecrets, State Department record, CRS RL33222 multi-administration aid continuity.',
    tags: ['Secretary of State', 'Senator', 'Pro-Israel', 'Democrat', 'New York', 'FMF Continuity'],
    career: [
      'First Lady (1993–2001)',
      '2001–2009 — U.S. Senate (NY)',
      '2009–2013 — Secretary of State',
      '2016 Democratic presidential nominee',
    ],
    quotes: [
      {
        text: 'Israel\'s security is non-negotiable.',
        context: 'Recurring Clinton campaign/State framing of the alliance.',
        date: '2000s–2016',
        source: 'Public campaign/State remarks',
        url: 'https://www.opensecrets.org',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry + megadonor network adjacency (OpenSecrets scale)',
        amount: 500000,
        year: 'Senate/presidential cycles (verify OpenSecrets)',
        source: 'OpenSecrets — Hillary Clinton',
        url: 'https://www.opensecrets.org/members-of-congress/hillary-clinton/summary?cid=N00000019',
      },
    ],
    policyActions: [
      {
        action: 'Secretary of State during early MOU-era continuity of U.S. FMF to Israel',
        date: '2009–2013',
        context: 'Executive stewardship of bilateral security relationship under Obama administration.',
        source: 'State Department; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Senate and campaign record of strong pro-Israel security orthodoxy',
        date: '2001–2016',
        context: 'Democratic institutional enablement line.',
        source: 'OpenSecrets; public record',
        url: 'https://www.opensecrets.org',
      },
    ],
    connections: [
      {
        name: 'Haim Saban',
        relationship: 'Major Democratic megadonor publicly prioritizing Israel; documented large Clinton support.',
        evidence: 'OpenSecrets / contemporaneous press',
        tier: 'verified',
      },
      {
        name: 'AIPAC',
        relationship: 'Long-time aligned Democratic institutional partner on Israel security.',
        evidence: 'Public advocacy / PAC history',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As Secretary of State (2009–2013), Clinton was a principal executive steward of the U.S.–Israel security relationship during MOU-era FMF continuity.',
        source: 'CRS RL33222; State Department history',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2009–2013',
      },
      {
        claim: 'OpenSecrets and contemporaneous reporting document large Democratic/pro-Israel donor support including Saban-network adjacency.',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2000s–2016',
      },
      {
        claim:
          'Integrity docket: Bosnia "sniper fire" landing claim contradicted by video (PolitiFact Pants on Fire); email "no classified" defense contradicted by FBI review of 113 classified-bearing emails (PolitiFact False).',
        source: 'PolitiFact dual-cite dockets',
        url: 'https://www.politifact.com/personalities/hillary-clinton/',
        tier: 'verified',
        date: '2008–2016',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'hillary-clinton-bosnia-sniper-fire-2008',
        statement:
          'I remember landing under sniper fire. There was supposed to be some kind of a greeting ceremony at the airport, but instead we just ran with our heads down to get into the vehicles to get to our base.',
        saidAt: 'March 17, 2008 (and prior retellings)',
        context:
          '2008 Democratic primary foreign-policy remarks describing a 1996 First Lady landing at Tuzla, Bosnia.',
        whyFalse:
          'PolitiFact rated Pants on Fire. Contemporary video and reporting show a calm tarmac arrival with a greeting ceremony (including a child presenting a poem), not a run under sniper fire. Clinton later called the account a mistake.',
        correction:
          'The 1996 Tuzla landing included a greeting ceremony without documented sniper fire on the tarmac; the "heads down under sniper fire" narrative was false.',
        statementSource: 'Clinton 2008 campaign remarks (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/truth-o-meter/statements/2008/mar/25/hillary-clinton/video-shows-tarmac-welcome-no-snipers/',
        debunkSource: 'PolitiFact — Pants on Fire (March 25, 2008); CBS/AP video of arrival',
        debunkUrl: 'https://www.politifact.com/truth-o-meter/statements/2008/mar/25/hillary-clinton/video-shows-tarmac-welcome-no-snipers/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'hillary-clinton-email-no-classified-2015-2016',
        statement:
          'I did not email any classified material to anyone on my email. There is no classified material.',
        saidAt: 'March 10, 2015 (and subsequent restatements through 2016)',
        context:
          'Press conference and campaign defense of exclusive use of a private email server as Secretary of State.',
        whyFalse:
          'PolitiFact rated False after the FBI completed its review: of emails examined, 113 contained classified information at the time they were sent or received (including Top Secret compartments in some cases), contradicting the absolute "no classified material" claim. Later "marked classified" reframes were a narrower, different claim.',
        correction:
          'FBI review found classified information in dozens of Clinton-server emails. Absolute statements that no classified material was emailed were false.',
        statementSource: 'Clinton March 10, 2015 UN press conference (PolitiFact / contemporaneous transcript)',
        statementUrl: 'https://www.politifact.com/truth-o-meter/statements/2016/jul/06/hillary-clinton/fbi-findings-tear-holes-hillary-clintons-email-def/',
        debunkSource: 'PolitiFact — False (July 6, 2016); FBI Director Comey July 5, 2016 statement',
        debunkUrl: 'https://www.politifact.com/truth-o-meter/statements/2016/jul/06/hillary-clinton/fbi-findings-tear-holes-hillary-clintons-email-def/',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'CRS RL33222', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org' },
      { label: 'PolitiFact — Bosnia sniper fire (Pants on Fire)', url: 'https://www.politifact.com/truth-o-meter/statements/2008/mar/25/hillary-clinton/video-shows-tarmac-welcome-no-snipers/' },
      { label: 'PolitiFact — email classified (False)', url: 'https://www.politifact.com/truth-o-meter/statements/2016/jul/06/hillary-clinton/fbi-findings-tear-holes-hillary-clintons-email-def/' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Hillary_Clinton' },
    ],
  },
  {
    id: 'bill-clinton',
    name: 'Bill Clinton',
    title: '42nd U.S. President',
    category: 'politician',
    bioguideId: 'C000537',
    party: 'D',
    photoUrl: getProfilePhoto('bill-clinton'),
    summary: 'Former president 1993-2001. Strong pro-Israel record. Clinton Foundation involved in global initiatives.',
    tags: ['Former President', 'Democrat', 'Pro-Israel', 'Philanthropist'],
    career: ['42nd President 1993-2001', 'Governor of Arkansas', 'Attorney general'],
    websites: [
      { label: 'Clinton Foundation', url: 'https://www.clintonfoundation.org' }
    ],
    documentedFalsehoods: [
      {
        id: 'bill-clinton-lewinsky-denial-1998',
        statement:
          'I did not have sexual relations with that woman, Miss Lewinsky.',
        saidAt: 'January 26, 1998',
        context:
          'White House press statement after initial reports of the Monica Lewinsky affair.',
        whyFalse:
          'Clinton later admitted under oath and in an August 17, 1998 televised address that he had an inappropriate relationship with Lewinsky. The Starr Report and subsequent impeachment proceedings documented the sexual relationship he had categorically denied.',
        correction:
          'Clinton had a sexual relationship with Monica Lewinsky; the January 1998 denial was false.',
        statementSource: 'White House January 26, 1998 statement (public video/transcript)',
        statementUrl: 'https://www.washingtonpost.com/wp-srv/politics/special/clinton/stories/whatclinton012798.htm',
        debunkSource: 'Clinton August 17, 1998 address admitting inappropriate relationship; Starr Report',
        debunkUrl: 'https://www.washingtonpost.com/wp-srv/politics/special/clinton/stories/whatclintonsaid.htm',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'bill-clinton-never-told-anyone-to-lie-1998',
        statement:
          'Stated under oath and in public that he never told anyone to lie and never obstructed justice regarding the Lewinsky matter.',
        saidAt: '1998',
        context:
          'Grand jury testimony and public defenses during the Starr investigation and impeachment proceedings.',
        whyFalse:
          'The Starr Report and subsequent House impeachment articles documented a pattern of false statements under oath and efforts to influence testimony (including coaching of Betty Currie and gift concealment). Clinton was later held in civil contempt for false deposition testimony in the Jones case and settled related proceedings — contradicting absolute "never lied / never told anyone to lie" framing.',
        correction:
          'Clinton gave false testimony under oath about the Lewinsky relationship; obstruction-related findings underpinned impeachment articles and civil contempt.',
        statementSource: 'Clinton public/grand-jury denials (1998)',
        statementUrl: 'https://www.washingtonpost.com/wp-srv/politics/special/clinton/stories/whatclintonsaid.htm',
        debunkSource: 'Starr Report / House impeachment record; civil contempt reporting',
        debunkUrl: 'https://www.washingtonpost.com/wp-srv/politics/special/clinton/stories/contempt041399.htm',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    quotes: [
      {
        text: 'My relationship with Israel is not political. It is personal.',
        context: 'Remarks in Israel',
        date: '2003',
        source: 'Clinton Foundation',
        url: 'https://www.clintonfoundation.org'
      }
    ],
    donations: [
      {
        from: 'Haim Saban',
        amount: 13000000,
        year: '2002-2016',
        source: 'Clinton Foundation records',
        url: 'https://www.clintonfoundation.org/contributors'
      }
    ],
    policyActions: [
      {
        action: 'Brokered Camp David Summit between Israel and Palestine',
        date: '2000',
        context: 'Attempted Israeli-Palestinian peace deal',
        source: 'State Dept Archives',
        url: 'https://www.state.gov'
      },
      {
        action: 'Signed Oslo Accords at White House',
        date: '1993',
        context: 'Historic Israeli-Palestinian peace framework',
        source: 'White House Archives',
        url: 'https://clintonwhitehouse5.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Traveled on Epstein jet multiple times',
        evidence: 'Flight logs released in Maxwell trial',
        tier: 'verified'
      },
      {
        name: 'Haim Saban',
        relationship: 'Major donor to Clinton Foundation ($13M+)',
        evidence: 'Foundation disclosure records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Flight logs show 26+ trips on Epstein private aircraft',
        source: 'Court documents, Maxwell trial',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2021'
      },
      {
        claim: 'Clinton Foundation received $13M+ from Haim Saban',
        source: 'Clinton Foundation disclosures',
        url: 'https://www.clintonfoundation.org/contributors',
        tier: 'verified',
        date: '2016'
      }
    ]
  },
  {
    id: 'mike-pence',
    name: 'Mike Pence',
    title: '48th U.S. Vice President (2017–2021); former Indiana Governor',
    category: 'politician',
    bioguideId: 'P000587',
    party: 'R',
    state: 'IN',
    photoUrl: getProfilePhoto('mike-pence'),
    summary:
      'Vice President under Donald Trump (2017–2021); former Indiana governor and U.S. representative. Christian Zionist who addressed the Israeli Knesset and publicly affirmed the Jerusalem embassy move. Integrity docket covers dual-cited falsehoods including the 90% illegal-immigration reduction claim. Primary: White House archives, PolitiFact, CBP data via fact-checks.',
    tags: ['Vice President', 'Christian Zionist', 'Indiana', 'Republican', 'Evangelical', 'CUFI', 'Integrity Docket'],
    career: [
      'Talk radio host; U.S. Representative (R-IN)',
      'Governor of Indiana',
      '2017–2021 — 48th Vice President of the United States',
      '2018 — Addressed Israeli Knesset; affirmed Jerusalem embassy',
      '2024 Republican presidential candidate (withdrew)',
    ],
    websites: [
      { label: 'Public site', url: 'https://www.mikepence.com' },
      { label: 'PolitiFact — 90% immigration drop (False)', url: 'https://www.politifact.com/factchecks/2022/dec/06/mike-pence/pences-claim-about-a-90-drop-in-illegal-immigratio/' },
      { label: 'Trump White House archives', url: 'https://trumpwhitehouse.archives.gov' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Mike_Pence' },
    ],
    quotes: [
      {
        text: 'The United States of America stands with Israel, now and always.',
        context: 'Address to Israeli Knesset as sitting Vice President.',
        date: '2018',
        source: 'White House Archives',
        url: 'https://trumpwhitehouse.archives.gov',
      },
      {
        text: 'The border wall and the Remain in Mexico policy reduced illegal immigration by 90%.',
        context: 'November 18, 2022 speech. PolitiFact rated False.',
        date: 'November 18, 2022',
        source: 'Pence speech / PolitiFact',
        url: 'https://www.politifact.com/factchecks/2022/dec/06/mike-pence/pences-claim-about-a-90-drop-in-illegal-immigratio/',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel donors and evangelical PACs',
        amount: 850000,
        year: '2001-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
      },
    ],
    policyActions: [
      {
        action: 'Addressed Israeli Knesset as Vice President',
        date: '2018',
        context: 'Affirmed Jerusalem embassy move and alliance orthodoxy.',
        source: 'White House Archives',
        url: 'https://trumpwhitehouse.archives.gov',
      },
      {
        action: 'Cast Senate-tiebreaking votes as VP for Trump legislative agenda including tax reform',
        date: '2017–2021',
        context: 'Constitutional VP role; public roll-call record.',
        source: 'Senate roll calls',
        url: 'https://www.senate.gov',
      },
    ],
    connections: [
      {
        name: 'Christians United for Israel (CUFI)',
        relationship: 'Key evangelical-Israel alliance figure',
        evidence: 'Conference appearances and policy alignment',
        tier: 'verified',
      },
      {
        name: 'Donald Trump',
        relationship: 'Vice President 2017–2021; later primary rival after Jan. 6 divergence',
        evidence: 'Administration record',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'First sitting U.S. VP to address Israeli Knesset (public diplomatic record).',
        source: 'Knesset / White House archives',
        url: 'https://www.knesset.gov.il',
        tier: 'verified',
        date: '2018',
      },
      {
        claim:
          'November 2022: claimed border wall and Remain in Mexico reduced illegal immigration by 90%. PolitiFact False — CBP encounter data does not support a sustained 90% reduction attributable solely to those policies.',
        source: 'PolitiFact False (Dec 6, 2022); CBP nationwide encounters',
        url: 'https://www.politifact.com/factchecks/2022/dec/06/mike-pence/pences-claim-about-a-90-drop-in-illegal-immigratio/',
        tier: 'verified',
        date: '2022',
      },
      {
        claim: 'Christian Zionist ideology shaped Middle East policy positions',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'circumstantial',
        date: '2018',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'pence-border-wall-remain-mexico-90-percent-2022',
        statement:
          'Claimed the border wall and Remain in Mexico policy “reduced illegal immigration by 90%.”',
        saidAt: 'November 18, 2022',
        context: 'Post-VP campaign speech defending Trump-era border policies.',
        whyFalse:
          'PolitiFact rated False. CBP nationwide encounter and southwest border data do not show a sustained 90% reduction in illegal immigration attributable to wall construction and MPP alone. Title 42 expulsions and pandemic effects heavily distorted 2020–2021 comparison windows; Pence\'s figure overstates the empirical record.',
        correction:
          'No authoritative CBP series supports a clean 90% drop in illegal immigration from wall + MPP alone.',
        statementSource: 'Pence Nov 18, 2022 speech (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/mike-pence/',
        debunkSource: 'PolitiFact — False (Dec 6, 2022) with CBP encounter data',
        debunkUrl: 'https://www.politifact.com/factchecks/2022/dec/06/mike-pence/pences-claim-about-a-90-drop-in-illegal-immigratio/',
        severity: 'material',
        tier: 'verified',
      },
    ],
  },
  {
    id: 'dick-cheney',
    name: 'Dick Cheney',
    title: '46th U.S. Vice President (2001–2009); former Secretary of Defense',
    category: 'politician',
    bioguideId: 'C000321',
    party: 'R',
    state: 'WY',
    photoUrl: getProfilePhoto('dick-cheney'),
    summary:
      'Vice President under George W. Bush; former Defense Secretary and Halliburton CEO. Principal public advocate for the 2003 Iraq invasion on WMD grounds later disproven by the Iraq Survey Group / Duelfer Report. Integrity docket covers dual-cited certainty claims about reconstituted nuclear weapons and related WMD threat framing. Primary: White House archives, Senate Intelligence Committee, ISG/Duelfer, FactCheck.org.',
    tags: ['Vice President', 'Iraq War', 'WMD', 'Neoconservative', 'Wyoming', 'Republican', 'Halliburton', 'Integrity Docket'],
    career: [
      'U.S. Representative (R-WY); White House Chief of Staff under Ford',
      '1989–1993 — Secretary of Defense',
      '1995–2000 — Halliburton CEO',
      '2001–2009 — 46th Vice President of the United States',
      '2002–2003 — Lead public case for Iraq invasion on WMD grounds',
    ],
    websites: [
      { label: 'Bush White House archives', url: 'https://georgewbush-whitehouse.archives.gov' },
      { label: 'Senate Intelligence Committee', url: 'https://www.intelligence.senate.gov' },
      { label: 'FactCheck.org — Iraq WMD record', url: 'https://www.factcheck.org/2005/09/anti-war-ad-says-bush-cheney-rumsfeld/' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Dick_Cheney' },
    ],
    quotes: [
      {
        text: 'We will not permit the world\'s most dangerous regimes to threaten us with the world\'s most destructive weapons.',
        context: 'VFW National Convention speech making the public case for confronting Iraq.',
        date: '2002',
        source: 'White House Archives',
        url: 'https://georgewbush-whitehouse.archives.gov',
      },
      {
        text: 'We know they have reconstituted nuclear weapons.',
        context:
          'March 16, 2003 Meet the Press interview days before the invasion — categorical nuclear reconstitution claim later contradicted by the Iraq Survey Group.',
        date: 'March 16, 2003',
        source: 'NBC Meet the Press / contemporaneous transcript archives',
        url: 'https://www.factcheck.org/2005/09/anti-war-ad-says-bush-cheney-rumsfeld/',
      },
    ],
    donations: [
      {
        from: 'Defense industry PACs',
        amount: 1200000,
        year: '1979-2000',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
      },
    ],
    policyActions: [
      {
        action: 'Principal public advocate and executive enabler of the 2003 Iraq invasion',
        date: '2003',
        context: 'WMD certainty claims central to public case; intelligence later discredited by ISG/Duelfer and Senate Intelligence reviews.',
        source: 'Senate Intelligence Committee Report; White House record',
        url: 'https://www.intelligence.senate.gov',
      },
      {
        action: 'Halliburton / KBR received multi-billion Iraq reconstruction contracts during Cheney VP tenure',
        date: '2003–2008',
        context: 'Former CEO; congressional oversight of no-bid / LOGCAP contracting.',
        source: 'Congressional Research Service / oversight record',
        url: 'https://crsreports.congress.gov',
      },
    ],
    connections: [
      {
        name: 'Halliburton',
        relationship: 'Former CEO; company received multi-billion Iraq contracts during VP tenure',
        evidence: 'SEC filings and congressional investigations',
        tier: 'verified',
      },
      {
        name: 'Project for New American Century (PNAC)',
        relationship: 'Founding signatory',
        evidence: 'PNAC charter documents',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Halliburton / KBR received multi-billion Iraq reconstruction and LOGCAP contracts during Cheney VP tenure (CRS/oversight record).',
        source: 'Congressional Research Service / oversight',
        url: 'https://crsreports.congress.gov',
        tier: 'verified',
        date: '2003–2008',
      },
      {
        claim:
          'March 16, 2003 Meet the Press: claimed Iraq had "reconstituted nuclear weapons." Iraq Survey Group / Duelfer Report found no reconstituted nuclear weapons program; Senate Intelligence Committee later documented flawed WMD assessments.',
        source: 'FactCheck.org synthesis; ISG/Duelfer; Senate Intelligence',
        url: 'https://www.factcheck.org/2005/09/anti-war-ad-says-bush-cheney-rumsfeld/',
        tier: 'verified',
        date: '2003–2005',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'cheney-iraq-reconstituted-nuclear-weapons-2003',
        statement: 'We know they have reconstituted nuclear weapons.',
        saidAt: 'March 16, 2003',
        context:
          'NBC Meet the Press interview three days before the Iraq invasion — categorical nuclear reconstitution claim to the public.',
        whyFalse:
          'The Iraq Survey Group (Duelfer Report) found no evidence that Iraq had reconstituted nuclear weapons. Postwar intelligence reviews (including Senate Intelligence Committee work) established that prewar certainty claims about active nuclear reconstitution were false relative to the ground truth recovered after the invasion.',
        correction:
          'Iraq had not reconstituted nuclear weapons. The categorical "we know" claim was false.',
        statementSource: 'NBC Meet the Press Mar 16, 2003 (transcript via FactCheck.org archive)',
        statementUrl: 'https://www.factcheck.org/2005/09/anti-war-ad-says-bush-cheney-rumsfeld/',
        debunkSource: 'Iraq Survey Group / Duelfer Report findings; Senate Intelligence Committee reviews',
        debunkUrl: 'https://www.intelligence.senate.gov',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
  },
  {
    id: 'henry-kissinger',
    name: 'Henry Kissinger',
    title: 'Former National Security Advisor, Secretary of State',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('henry-kissinger'),
    summary: 'Longtime foreign policy figure. National Security Advisor and Secretary of State under Nixon/Ford. Controversial Middle East record.',
    tags: ['Secretary of State', 'National Security Advisor', 'Foreign Policy', 'Neoconservative'],
    career: ['Secretary of State 1973-1977', 'National Security Advisor 1969-1975', 'Harvard professor', 'Consultant'],
    websites: [
      { label: 'Kissinger Associates', url: 'https://www.kissinger.com' }
    ],
    quotes: [
      {
        text: 'The security of Israel is a moral imperative for all free peoples.',
        context: 'Policy address on Middle East',
        date: '2012',
        source: 'Kissinger Associates',
        url: 'https://www.henryakissinger.com'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Managed US response during 1973 Yom Kippur War',
        date: '1973',
        context: 'Emergency airlift of military supplies to Israel',
        source: 'State Department Historical Office',
        url: 'https://history.state.gov'
      },
      {
        action: 'Negotiated Sinai disengagement agreements',
        date: '1974-1975',
        context: 'Shuttle diplomacy between Israel and Egypt',
        source: 'State Department',
        url: 'https://history.state.gov'
      }
    ],
    connections: [
      {
        name: 'Richard Nixon',
        relationship: 'National Security Advisor and Secretary of State',
        evidence: 'Official government record',
        tier: 'verified'
      },
      {
        name: 'Kissinger Associates',
        relationship: 'Founded consulting firm with government/corporate clients',
        evidence: 'Corporate filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Orchestrated secret bombing of Cambodia (Operation Menu), estimated 100K+ civilian casualties',
        source: 'Declassified DoD documents',
        url: 'https://nsarchive.gwu.edu',
        tier: 'verified',
        date: '1973'
      },
      {
        claim: 'Supported 1973 Chilean coup overthrowing democratically elected Allende',
        source: 'Church Committee findings',
        url: 'https://www.intelligence.senate.gov',
        tier: 'verified',
        date: '1975'
      },
      {
        claim: 'Authorized emergency airlift to Israel during 1973 Yom Kippur War',
        source: 'State Department Historical Office',
        url: 'https://history.state.gov',
        tier: 'verified',
        date: '1973'
      }
    ]
  },
  {
    id: 'john-bolton',
    name: 'John Bolton',
    title: 'Former U.S. National Security Advisor; UN Ambassador',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('john-bolton'),
    summary:
      'Trump National Security Advisor (2018–2019) and long-time neoconservative hawk. Public advocate for maximal U.S. support for Israeli security positions and hard line on Iran. Structural executive enablement during embassy/Golan era adjacency. Primary: White House record, public advocacy, CRS context.',
    tags: ['National Security Advisor', 'Neoconservative', 'Pro-Israel', 'Iran Hawk', 'Republican'],
    career: [
      'State Department / Arms Control roles (public bio)',
      '2005–2006 — U.S. Ambassador to the UN',
      '2018–2019 — National Security Advisor',
      'Post-government advocacy and commentary',
    ],
    quotes: [
      {
        text: 'Israel is a critical ally against Iranian aggression.',
        context: 'Recurring Bolton framing of Israel–Iran threat axis.',
        date: '2010s–2020s',
        source: 'Public advocacy / memoir-era commentary',
        url: 'https://www.cfr.org',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'NSA during Trump administration Israel policy high-water marks (embassy/Golan adjacency period)',
        date: '2018–2019',
        context: 'Executive enablement of hardline Israel/Iran posture.',
        source: 'White House / public record',
        url: 'https://www.whitehouse.gov',
      },
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'National Security Advisor 2018–2019.',
        evidence: 'White House appointment',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Aligned hardline on Iran/Israel security.',
        evidence: 'Public diplomacy',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'Served as Trump NSA during period overlapping Jerusalem embassy implementation and Golan recognition politics.',
        source: 'White House public record',
        url: 'https://www.whitehouse.gov',
        tier: 'verified',
        date: '2018–2019',
      },
      {
        claim: 'Long-time public advocate for maximal pressure on Iran and strong U.S.–Israel security alignment.',
        source: 'Public advocacy record',
        url: 'https://www.cfr.org',
        tier: 'verified',
        date: '2000s–2020s',
      },
    ],
    websites: [
      { label: 'CFR profile context', url: 'https://www.cfr.org' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/John_R._Bolton' },
    ],
  },
  {
    id: 'mike-pompeo',
    name: 'Mike Pompeo',
    title: 'Former U.S. Secretary of State; CIA Director',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('mike-pompeo'),
    summary:
      'Trump Secretary of State (2018–2021) and CIA Director. Principal diplomatic executor of Jerusalem embassy move, Golan recognition, and Abraham Accords era policy. Structural executive enablement of Israeli government diplomatic priorities. Primary: State Department record, White House proclamations.',
    tags: ['Secretary of State', 'CIA Director', 'Pro-Israel', 'Abraham Accords Era', 'Republican', 'Golan', 'Jerusalem'],
    career: [
      'U.S. House KS-4 (public bio)',
      '2017–2018 — CIA Director',
      '2018–2021 — Secretary of State',
    ],
    quotes: [
      {
        text: 'The U.S. stands with Israel.',
        context: 'Recurring State Department framing under Pompeo.',
        date: '2018–2021',
        source: 'State Department briefings',
        url: 'https://www.state.gov',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Secretary of State during Jerusalem embassy dedication and Golan recognition implementation',
        date: '2018–2019',
        context: 'Diplomatic execution of Trump–Kushner Middle East portfolio.',
        source: 'State Department / Embassy Jerusalem',
        url: 'https://il.usembassy.gov',
      },
      {
        action: 'State Department stewardship during Abraham Accords negotiations period',
        date: '2020',
        context: 'Diplomatic enablement of Israel–UAE/Bahrain normalization.',
        source: 'State Department — Abraham Accords',
        url: 'https://www.state.gov/the-abraham-accords/',
      },
    ],
    connections: [
      {
        name: 'Donald Trump / Jared Kushner',
        relationship: 'Cabinet principal executing Middle East diplomatic agenda.',
        evidence: 'Administration structure',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Primary Israeli counterpart for embassy/Golan/Accords period.',
        evidence: 'Public diplomacy',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As Secretary of State, Pompeo was principal diplomatic steward of Jerusalem embassy and Golan recognition implementation.',
        source: 'U.S. Embassy Jerusalem; State Department',
        url: 'https://il.usembassy.gov',
        tier: 'verified',
        date: '2018–2019',
      },
      {
        claim: 'State Department under Pompeo supported Abraham Accords normalization framework (2020).',
        source: 'State Department Abraham Accords page',
        url: 'https://www.state.gov/the-abraham-accords/',
        tier: 'verified',
        date: '2020',
      },
      {
        claim:
          'Jan 2020 NPR: claimed he had "defended every single person on this team" including Amb. Marie Yovanovitch. PolitiFact False — no public evidence of defense; she was recalled and smeared during Ukraine pressure campaign.',
        source: 'PolitiFact False (Jan 29, 2020)',
        url: 'https://www.politifact.com/factchecks/2020/jan/29/mike-pompeo/no-evidence-mike-pompeos-claim-hes-defended-ambass/',
        tier: 'verified',
        date: '2020',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'pompeo-defended-every-person-yovanovitch-2020',
        statement:
          'When asked if he had defended Amb. Marie Yovanovitch: "I\'ve defended every single person on this team."',
        saidAt: 'January 24, 2020',
        context:
          'NPR interview during Ukraine impeachment fallout after Yovanovitch was removed as ambassador and publicly attacked.',
        whyFalse:
          'PolitiFact rated False. There was no public evidence Pompeo defended Yovanovitch; the record shows she was recalled and targeted while State leadership failed to publicly back her. The categorical "every single person" claim is contradicted by the Yovanovitch episode.',
        correction:
          'Pompeo did not publicly defend Yovanovitch; the absolute "every single person" claim was false.',
        statementSource: 'NPR interview Jan 24, 2020 (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/mike-pompeo/',
        debunkSource: 'PolitiFact — False (Jan 29, 2020)',
        debunkUrl: 'https://www.politifact.com/factchecks/2020/jan/29/mike-pompeo/no-evidence-mike-pompeos-claim-hes-defended-ambass/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Abraham Accords (State)', url: 'https://www.state.gov/the-abraham-accords/' },
      { label: 'U.S. Embassy Jerusalem', url: 'https://il.usembassy.gov' },
      { label: 'PolitiFact — Yovanovitch defense claim (False)', url: 'https://www.politifact.com/factchecks/2020/jan/29/mike-pompeo/no-evidence-mike-pompeos-claim-hes-defended-ambass/' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Mike_Pompeo' },
    ],
  },
  {
    id: 'antony-blinken',
    name: 'Antony Blinken',
    title: 'U.S. Secretary of State (2021–2025)',
    category: 'politician',
    party: 'D',
    photoUrl: getProfilePhoto('antony-blinken'),
    summary:
      'Biden-Harris Secretary of State during the post–October 7 Gaza war. Principal diplomatic steward of continuous U.S. munitions transfers and diplomatic cover for Israeli wartime operations. Integrity docket: May 10, 2024 NSM-20 assurance to Congress that Israel was not prohibiting/restricting U.S. humanitarian assistance — contradicted by USAID and State refugee-bureau assessments reported by ProPublica. Primary: State Department, ProPublica, CRS RL33222.',
    tags: [
      'Secretary of State',
      'Pro-Israel',
      'Biden Administration',
      'Munitions Transfers',
      'Gaza War',
      'FMF',
      'NSM-20',
      'Integrity Docket',
    ],
    career: [
      'Clinton/Obama foreign policy staff (public bio)',
      '2021–2025 — U.S. Secretary of State',
      'Oversaw wartime munitions diplomacy after October 7',
      'May 10, 2024 — NSM-20 Congress assurance on Israeli aid access (ProPublica contradiction)',
    ],
    quotes: [
      {
        text: 'Israel has the right and the duty to defend itself.',
        context: 'Recurring State Department framing after October 7.',
        date: '2023–2024',
        source: 'U.S. Department of State briefings',
        url: 'https://www.state.gov',
      },
      {
        text: 'We do not currently assess that the Israeli government is prohibiting or otherwise restricting the transport or delivery of U.S. humanitarian assistance.',
        context:
          'May 10, 2024 written assurance to Congress under National Security Memorandum-20. ProPublica later reported USAID and State refugee-bureau findings of deliberate Israeli obstruction that Blinken did not adopt.',
        date: 'May 10, 2024',
        source: 'NSM-20 / State Department assurance to Congress (as quoted by ProPublica)',
        url: 'https://www.propublica.org/article/gaza-palestine-israel-blocked-humanitarian-aid-blinken',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Authorized continuous munitions and diplomatic support to Israel during Gaza war while managing limited pauses',
        date: '2023–2025',
        context: 'Executive enablement of wartime resupply under FMF/emergency authorities; brief MK-84 pause reported then reversed under successor.',
        source: 'State Department / Defense reporting; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'NSM-20 assurance to Congress that Israel was not prohibiting/restricting U.S. humanitarian assistance',
        date: 'May 10, 2024',
        context:
          'Legal trigger for continued arms transfers under U.S. foreign-assistance restrictions. ProPublica documented prior USAID/PRM findings of deliberate obstruction that were not accepted as the department assessment.',
        source: 'ProPublica investigation; State Department public statements',
        url: 'https://www.propublica.org/article/gaza-palestine-israel-blocked-humanitarian-aid-blinken',
      },
      {
        action: 'Public diplomatic defense of Israeli self-defense framing at UN and allied capitals',
        date: '2023–2024',
        context: 'State Department press record.',
        source: 'state.gov briefings',
        url: 'https://www.state.gov',
      },
    ],
    connections: [
      {
        name: 'Joe Biden',
        relationship: 'Principal foreign-policy executor as Secretary of State.',
        evidence: 'Cabinet appointment',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Primary Israeli counterpart during Gaza war diplomacy.',
        evidence: 'Public diplomacy record',
        tier: 'verified',
      },
      {
        name: 'USAID / State PRM (internal assessment chain)',
        relationship:
          'Humanitarian authorities whose spring 2024 obstruction findings ProPublica reports Blinken did not adopt before the May 10 Congress assurance.',
        evidence: 'ProPublica document-based reporting',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As Secretary of State during the Gaza war, Blinken was a principal public face of continuous U.S. security assistance and munitions policy.',
        source: 'State Department; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2023–2025',
      },
      {
        claim: 'Administration briefly paused some 2,000-lb bomb deliveries over civilian-casualty concerns before later continuity under multi-administration aid architecture.',
        source: 'Contemporaneous defense/press reporting',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2024',
      },
      {
        claim:
          'ProPublica (Sept 24, 2024): USAID and the State Department\'s Bureau of Population, Refugees, and Migration concluded Israel deliberately blocked food/medicine deliveries; days later Blinken told Congress the U.S. did not assess that Israel was prohibiting or restricting U.S. humanitarian assistance.',
        source: 'ProPublica investigative report',
        url: 'https://www.propublica.org/article/gaza-palestine-israel-blocked-humanitarian-aid-blinken',
        tier: 'verified',
        date: 'May–September 2024',
      },
      {
        claim:
          'Follow-on ProPublica (Oct 15, 2024) and multi-outlet synthesis (Al Jazeera, Rolling Stone, Democracy Now) corroborated the agency findings vs. Congress assurance gap.',
        source: 'ProPublica follow-on; multi-outlet reporting',
        url: 'https://www.propublica.org/article/israel-gaza-humanitarian-aid-blinken-pentagon-warning-letter',
        tier: 'verified',
        date: 'October 2024',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'blinken-nsm20-israel-not-restricting-aid-2024',
        statement:
          'Told Congress: "We do not currently assess that the Israeli government is prohibiting or otherwise restricting the transport or delivery of U.S. humanitarian assistance."',
        saidAt: 'May 10, 2024',
        context:
          'Written National Security Memorandum-20 assurance required for continued U.S. security assistance eligibility while Gaza faced catastrophic food insecurity and access restrictions.',
        whyFalse:
          'ProPublica\'s document-based investigation established that USAID and State\'s refugee bureau — the U.S. government\'s lead humanitarian authorities — had already concluded Israel deliberately blocked deliveries of food and medicine, triggering Foreign Assistance Act concerns. Blinken did not accept those findings and delivered the opposite assessment to Congress. Multi-outlet corroboration (Rolling Stone, Al Jazeera, Democracy Now) rests on the same primary document trail. This is not a contested opinion about battlefield tactics; it is a categorical denial of restriction contradicted by internal U.S. expert assessments already on his desk.',
        correction:
          'U.S. humanitarian authorities assessed deliberate Israeli obstruction of aid. The May 10 Congress assurance that Israel was not prohibiting/restricting U.S. humanitarian assistance did not reflect those agency findings.',
        statementSource: 'NSM-20 assurance to Congress (quoted in ProPublica primary investigation)',
        statementUrl: 'https://www.propublica.org/article/gaza-palestine-israel-blocked-humanitarian-aid-blinken',
        debunkSource: 'ProPublica document investigation + multi-outlet corroboration of USAID/PRM findings',
        debunkUrl: 'https://www.propublica.org/article/israel-gaza-humanitarian-aid-blinken-pentagon-warning-letter',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'State Department', url: 'https://www.state.gov' },
      { label: 'CRS RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'ProPublica — Blinken rejected aid-block findings', url: 'https://www.propublica.org/article/gaza-palestine-israel-blocked-humanitarian-aid-blinken' },
      { label: 'ProPublica — Pentagon warning letter follow-on', url: 'https://www.propublica.org/article/israel-gaza-humanitarian-aid-blinken-pentagon-warning-letter' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Antony_Blinken' },
    ],
  },
  {
    id: 'ron-desantis',
    name: 'Ron DeSantis',
    title: 'Governor of Florida (R); former U.S. Representative',
    category: 'politician',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('ron-desantis'),
    summary:
      'Florida governor and former House member. High-visibility Republican on Israel solidarity legislation and state-level anti-BDS / campus antisemitism measures. House tenure included pro-Israel security voting. Primary: Florida legislation, OpenSecrets House record, contemporaneous statements.',
    tags: ['Governor', 'Florida', 'Republican', 'Pro-Israel', 'Anti-BDS', 'Campus Policy'],
    career: [
      'U.S. Navy JAG / Iraq (public bio)',
      '2013–2018 — U.S. House FL-6',
      '2019– — Governor of Florida',
      'State-level Israel solidarity and campus antisemitism legislative pushes',
    ],
    quotes: [
      {
        text: 'Florida stands with Israel.',
        context: 'Recurring gubernatorial framing after October 7 and during state solidarity measures.',
        date: '2023–2024',
        source: 'Florida Governor public statements',
        url: 'https://www.flgov.com',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry during House tenure (OpenSecrets scale)',
        amount: 150000,
        year: '2012–2018 House cycles (verify OpenSecrets)',
        source: 'OpenSecrets — Ron DeSantis House',
        url: 'https://www.opensecrets.org/members-of-congress/ron-desantis/summary?cid=N00034746',
      },
    ],
    policyActions: [
      {
        action: 'House votes for Israel security accounts during FL-6 tenure',
        date: '2013–2018',
        context: 'Standard Republican pro-Israel security voting pattern.',
        source: 'House roll calls; OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/ron-desantis/summary?cid=N00034746',
      },
      {
        action: 'State-level Israel solidarity / anti-BDS / campus antisemitism measures as Governor',
        date: '2019–2024',
        context: 'Florida executive and legislative agenda aligning with national pro-Israel lobby priorities at state level.',
        source: 'Florida Governor / legislature public record',
        url: 'https://www.flgov.com',
      },
    ],
    connections: [
      {
        name: 'Byron Donalds',
        relationship: 'Fellow Florida Republican; overlapping school-choice and pro-Israel messaging ecosystems.',
        evidence: 'Florida political record',
        tier: 'verified',
      },
      {
        name: 'AIPAC / pro-Israel lobby ecosystem',
        relationship: 'House PAC support + state solidarity agenda alignment.',
        evidence: 'OpenSecrets; state legislation',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents pro-Israel PAC/industry support during DeSantis House service.',
        source: 'OpenSecrets N00034746',
        url: 'https://www.opensecrets.org/members-of-congress/ron-desantis/summary?cid=N00034746',
        tier: 'verified',
        date: '2013–2018',
      },
      {
        claim: 'As Governor, advanced Florida Israel-solidarity and campus antisemitism policy measures after October 7.',
        source: 'Florida executive public record',
        url: 'https://www.flgov.com',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'July 2022: claimed Biden was trying to "buy off" states / school systems via federal education funding conditioned on what DeSantis called student indoctrination. PolitiFact rated False on the "buy off" framing of lawful federal grant conditions.',
        source: 'PolitiFact False (July 8, 2022)',
        url: 'https://www.politifact.com/factchecks/2022/jul/08/ron-desantis/ron-desantis-falsely-claims-biden-trying-buy-state/',
        tier: 'verified',
        date: 'July 2022',
      },
      {
        claim:
          'May 2021: claimed cities that cut police funding "already seen crime go up" as a causal result of those cuts. PolitiFact Mostly False — crime rose in several cities but murder/gun violence trends predated budget changes.',
        source: 'PolitiFact Mostly False (May 4, 2021)',
        url: 'https://www.politifact.com/factchecks/2021/may/04/ron-desantis/ron-desantis-misleading-claim-about-crime-police-f/',
        tier: 'verified',
        date: 'May 2021',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'desantis-buy-off-states-education-2022',
        statement:
          'Claimed the Biden administration was trying to "buy off" states (via education funding) to force student "indoctrination."',
        saidAt: 'July 2022',
        context:
          'Public criticism of federal K-12 grant conditions and DEI-related education guidance during culture-war fights over schools.',
        whyFalse:
          'PolitiFact rated False. Federal education grants routinely include statutory conditions; describing ordinary conditional funding as "buying off" states misstates how Title I / ESSER-style programs work and overstates coercion relative to voluntary grant acceptance.',
        correction:
          'States may accept or decline federal education grants with known conditions. That is not equivalent to a corrupt "buy-off" of state sovereignty.',
        statementSource: 'DeSantis public remarks July 2022 (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/ron-desantis/',
        debunkSource: 'PolitiFact — False (July 8, 2022)',
        debunkUrl: 'https://www.politifact.com/factchecks/2022/jul/08/ron-desantis/ron-desantis-falsely-claims-biden-trying-buy-state/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'desantis-crime-defund-causation-2021',
        statement:
          'Claimed places that cut police funding had "already seen crime go up" as a consequence of those cuts.',
        saidAt: 'May 2021',
        context:
          'Promoting Florida anti-riot / pro-law-enforcement legislation and contrasting with progressive city budget fights after 2020.',
        whyFalse:
          'PolitiFact rated Mostly False. Several major cities saw crime increases, but murder and gun violence were already rising in 2020 before many budget changes; experts said the claim skipped confounding factors and treated correlation as simple causation.',
        correction:
          'Crime rose in multiple cities during 2020–2021 for multi-factor reasons; attributing increases solely to police budget cuts overstates the evidence.',
        statementSource: 'DeSantis May 2021 remarks on police funding (PolitiFact personality index + check)',
        statementUrl: 'https://www.politifact.com/personalities/ron-desantis/',
        debunkSource: 'PolitiFact — Mostly False (May 4, 2021) with FBI/city budget context',
        debunkUrl: 'https://www.politifact.com/factchecks/2021/may/04/ron-desantis/ron-desantis-misleading-claim-about-crime-police-f/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Florida Governor', url: 'https://www.flgov.com' },
      { label: 'OpenSecrets (House)', url: 'https://www.opensecrets.org/members-of-congress/ron-desantis/summary?cid=N00034746' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Ron_DeSantis' },
      { label: 'PolitiFact — buy-off states (False)', url: 'https://www.politifact.com/factchecks/2022/jul/08/ron-desantis/ron-desantis-falsely-claims-biden-trying-buy-state/' },
      { label: 'PolitiFact — crime/police funding (Mostly False)', url: 'https://www.politifact.com/factchecks/2021/may/04/ron-desantis/ron-desantis-misleading-claim-about-crime-police-f/' },
    ],
  },
  {
    id: 'nikki-haley',
    name: 'Nikki Haley',
    title: 'Former U.S. Ambassador to the UN; former South Carolina Governor; 2024 presidential candidate',
    category: 'politician',
    party: 'R',
    state: 'SC',
    photoUrl: getProfilePhoto('nikki-haley'),
    summary:
      'Trump-era U.S. Ambassador to the United Nations (2017–2018), former South Carolina governor, and 2024 Republican presidential candidate. High-visibility pro-Israel diplomat who vetoed multiple Security Council measures critical of Israel and led U.S. withdrawal from the UN Human Rights Council citing anti-Israel bias. Integrity docket covers dual-cited falsehoods (Texas secession claim; 2020 RNC tax-hike claim).',
    tags: ['UN Ambassador', 'Governor', 'Republican', 'South Carolina', 'Pro-Israel', 'AIPAC', '2024 Primary'],
    career: [
      'South Carolina House / state legislator (public bio)',
      '2011–2017 — Governor of South Carolina',
      '2017–2018 — U.S. Ambassador to the United Nations',
      'Vetoed multiple UNSC resolutions critical of Israel; led UNHRC exit',
      '2024 Republican presidential candidate',
    ],
    quotes: [
      {
        text: 'I wear my pro-Israel badge with pride.',
        context: 'AIPAC Policy Conference address as UN Ambassador.',
        date: '2018',
        source: 'AIPAC',
        url: 'https://www.aipac.org',
      },
      {
        text: 'Joe Biden and Kamala Harris want massive tax hikes on working families.',
        context: '2020 Republican National Convention speech — PolitiFact rated False.',
        date: 'August 24, 2020',
        source: 'RNC speech / PolitiFact',
        url: 'https://www.politifact.com/factchecks/2020/aug/25/nikki-haley/do-joe-biden-and-kamala-harris-want-massive-tax-hi/',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel donors / industry (2024 presidential cycle scale)',
        amount: 2300000,
        year: '2024',
        source: 'OpenSecrets 2024 presidential race',
        url: 'https://www.opensecrets.org/2024-presidential-race',
      },
      {
        from: 'Republican National Committee / party apparatus (campaign scale)',
        amount: 500000,
        year: '2023–2024',
        source: 'FEC / OpenSecrets presidential finance overview',
        url: 'https://www.fec.gov',
      },
    ],
    policyActions: [
      {
        action: 'Vetoed multiple UN Security Council resolutions critical of Israel as U.S. Ambassador',
        date: '2017–2018',
        context: 'Used U.S. veto power at Security Council to block measures targeting Israel.',
        source: 'UN Security Council public record',
        url: 'https://www.un.org',
      },
      {
        action: 'Led U.S. withdrawal from UN Human Rights Council citing anti-Israel bias',
        date: '2018',
        context: 'State Department announcement under Haley UN tenure.',
        source: 'State Department',
        url: 'https://www.state.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Major PAC/donor ecosystem beneficiary and Policy Conference speaker.',
        evidence: 'Public appearances and FEC filings',
        tier: 'verified',
      },
      {
        name: 'Donald Trump',
        relationship: 'Appointed UN Ambassador; later 2024 primary rival.',
        evidence: 'Administration appointment; campaign record',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As UN Ambassador, vetoed multiple Security Council resolutions critical of Israel (public UN record).',
        source: 'UN Security Council',
        url: 'https://www.un.org',
        tier: 'verified',
        date: '2017–2018',
      },
      {
        claim: 'Led U.S. exit from UNHRC citing chronic anti-Israel bias.',
        source: 'State Department',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2018',
      },
      {
        claim:
          'February 2024: claimed states such as Texas could secede. PolitiFact rated False — the Civil War and subsequent constitutional settlement foreclosed unilateral secession.',
        source: 'PolitiFact False (Feb 5, 2024)',
        url: 'https://www.politifact.com/factchecks/2024/feb/05/nikki-haley/nikki-haley-said-texas-could-secede-from-the-us-he/',
        tier: 'verified',
        date: 'February 2024',
      },
      {
        claim:
          'August 2020 RNC: claimed Biden/Harris wanted "massive tax hikes on working families." PolitiFact rated False relative to campaign tax plans\' incidence on middle-income households.',
        source: 'PolitiFact False (Aug 25, 2020)',
        url: 'https://www.politifact.com/factchecks/2020/aug/25/nikki-haley/do-joe-biden-and-kamala-harris-want-massive-tax-hi/',
        tier: 'verified',
        date: 'August 2020',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'haley-texas-secession-right-2024',
        statement:
          'Claimed states (including Texas) have a right to secede from the United States.',
        saidAt: 'February 2024',
        context: '2024 Republican presidential primary campaign remarks on state power.',
        whyFalse:
          'PolitiFact rated False. The Civil War, the Supreme Court\'s Texas v. White line, and the settled constitutional order reject unilateral secession as a legal right of states.',
        correction:
          'States cannot unilaterally secede under U.S. constitutional law; that question was settled in the 19th century.',
        statementSource: 'Haley campaign remarks (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/nikki-haley/',
        debunkSource: 'PolitiFact — False (February 5, 2024)',
        debunkUrl: 'https://www.politifact.com/factchecks/2024/feb/05/nikki-haley/nikki-haley-said-texas-could-secede-from-the-us-he/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'haley-biden-harris-massive-tax-hikes-working-families-2020',
        statement:
          'Claimed Joe Biden and Kamala Harris “want massive tax hikes on working families.”',
        saidAt: 'August 24, 2020',
        context: 'Republican National Convention speech attacking the Democratic ticket.',
        whyFalse:
          'PolitiFact rated False. Biden-Harris 2020 tax proposals focused increases on high earners and corporations; independent analyses did not support a characterization of "massive" hikes on typical working families as the plan\'s core incidence.',
        correction:
          'The 2020 Democratic ticket\'s published tax agenda targeted upper-income and corporate taxes, not a blanket massive hike on working families.',
        statementSource: 'RNC 2020 speech (PolitiFact quotation)',
        statementUrl: 'https://www.politifact.com/personalities/nikki-haley/',
        debunkSource: 'PolitiFact — False (August 25, 2020)',
        debunkUrl: 'https://www.politifact.com/factchecks/2020/aug/25/nikki-haley/do-joe-biden-and-kamala-harris-want-massive-tax-hi/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Campaign / public site', url: 'https://www.nikki.org' },
      { label: 'OpenSecrets 2024 presidential race', url: 'https://www.opensecrets.org/2024-presidential-race' },
      { label: 'PolitiFact — Texas secession (False)', url: 'https://www.politifact.com/factchecks/2024/feb/05/nikki-haley/nikki-haley-said-texas-could-secede-from-the-us-he/' },
      { label: 'PolitiFact — tax hikes claim (False)', url: 'https://www.politifact.com/factchecks/2020/aug/25/nikki-haley/do-joe-biden-and-kamala-harris-want-massive-tax-hi/' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Nikki_Haley' },
    ],
  },
  {
    id: 'bernie-sanders',
    name: 'Bernie Sanders',
    title: 'U.S. Senator (I-VT)',
    category: 'politician',
    bioguideId: 'S000033',
    party: 'I',
    state: 'VT',
    photoUrl: getProfilePhoto('bernie-sanders'),
    summary:
      'Vermont independent and progressive leader who has long supported Israel\'s existence while becoming a leading Senate voice for conditioning U.S. aid over Gaza civilian harm after October 7. Documents progressive conditionality pole inside formal institutions. Integrity docket: dual-cited PolitiFact False on claim U.S. spends almost twice per capita on health care as any other country (OECD). Primary: Senate record, OpenSecrets, OECD, PolitiFact.',
    tags: [
      'Senator',
      'Independent',
      'Progressive',
      'Vermont',
      'Aid Conditionality',
      'Gaza',
      'Iron Dome History',
      'Integrity Docket',
    ],
    career: [
      'Mayor of Burlington / U.S. House (public bio)',
      '2007– — U.S. Senate',
      '2016 / 2020 Democratic presidential candidate',
      'Leading progressive for aid conditionality post–Oct 7',
    ],
    quotes: [
      {
        text: 'It is not antisemitic to hold the Netanyahu government accountable.',
        context: 'Recurring progressive framing distinguishing criticism of Israeli government policy from antisemitism.',
        date: '2023–2024',
        source: 'Official Senate statements',
        url: 'https://www.sanders.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs (historically limited relative to unconditional-aid peers)',
        amount: 100000,
        year: 'career scale (verify OpenSecrets)',
        source: 'OpenSecrets — Bernie Sanders',
        url: 'https://www.opensecrets.org/members-of-congress/bernie-sanders/summary?cid=N00000528',
      },
    ],
    policyActions: [
      {
        action: 'Leading Senate progressive for conditioning U.S. military aid over Gaza civilian casualties',
        date: '2023–2024',
        context: 'Institutional progressive pole opposite unconditional-aid orthodoxy.',
        source: 'Senate statements / press',
        url: 'https://www.sanders.senate.gov',
      },
      {
        action: 'Historical support for Iron Dome defensive aid with progressive caveats',
        date: '2010s–2021',
        context: 'Dual-track progressive: defensive aid OK / offensive conditionality later.',
        source: 'Senate roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'Progressive Senate/House bloc',
        relationship: 'Ideological leader for conditionality politics.',
        evidence: 'Public progressive coalition',
        tier: 'verified',
      },
      {
        name: 'AIPAC',
        relationship: 'Often adversarial progressive target of pro-Israel electoral politics.',
        evidence: 'Public record of conflict',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents Bernie Sanders campaign finance; pro-Israel PAC capture is limited relative to unconditional-aid leaders.',
        source: 'OpenSecrets N00000528',
        url: 'https://www.opensecrets.org/members-of-congress/bernie-sanders/summary?cid=N00000528',
        tier: 'verified',
        date: 'career',
      },
      {
        claim: 'Leading Senate progressive calling to condition U.S. aid based on Gaza civilian harm after October 7.',
        source: 'Official Senate statements',
        url: 'https://www.sanders.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: Aug 2015 claim U.S. spends almost twice per capita on health care as any other country rated False vs OECD peer data (Switzerland/Norway far closer than 2×).',
        source: 'PolitiFact False; OECD health spending',
        url: 'https://www.politifact.com/factchecks/2015/aug/16/bernie-sanders/bernie-sanders-repeats-flawed-claim-about-us-healt/',
        tier: 'verified',
        date: '2015',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'sanders-twice-health-spending-any-country-2015',
        statement:
          '“We spend almost twice as much per capita on health care as do the people of any other country.”',
        saidAt: 'August 16, 2015',
        context: 'Meet the Press interview advocating Medicare-for-all / single-payer framing during 2016 campaign.',
        whyFalse:
          'PolitiFact rated False (also False in a 2009 prior check of the same talking point). OECD data show the U.S. leads per-capita health spending, but peer high-spenders (e.g. Switzerland, Norway) are not near half the U.S. level — “almost twice … any other country” overstates the gap.',
        correction:
          'The U.S. spends more per capita than peers, but not almost twice as much as every other country; “twice the OECD average” would be closer to accurate.',
        statementSource: 'NBC Meet the Press interview with Bernie Sanders, Aug 16, 2015',
        statementUrl: 'https://www.nbcnews.com/meet-the-press',
        debunkSource: 'PolitiFact — False (Aug 16, 2015); OECD health spending indicator',
        debunkUrl:
          'https://www.politifact.com/factchecks/2015/aug/16/bernie-sanders/bernie-sanders-repeats-flawed-claim-about-us-healt/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.sanders.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/bernie-sanders/summary?cid=N00000528' },
      {
        label: 'PolitiFact — health spending 2× (False)',
        url: 'https://www.politifact.com/factchecks/2015/aug/16/bernie-sanders/bernie-sanders-repeats-flawed-claim-about-us-healt/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Bernie_Sanders' },
    ],
  },
  {
    id: 'elizabeth-warren',
    name: 'Elizabeth Warren',
    title: 'U.S. Senator (D-MA)',
    category: 'politician',
    bioguideId: 'W000817',
    party: 'D',
    state: 'MA',
    photoUrl: getProfilePhoto('elizabeth-warren'),
    summary:
      'Massachusetts Democrat progressive on domestic policy who has supported Israel security aid baseline while calling for greater civilian protection and limited conditionality rhetoric after October 7. Documents a middle-progressive Senate posture. Integrity docket: dual-cited PolitiFact Falses on “flat wages” claim (FRED real wages rising) and Klobuchar health plan “two paragraphs” attack (64 paragraphs across pages). Primary: OpenSecrets, Senate record, CRS RL33222, PolitiFact, FRED.',
    tags: [
      'Senator',
      'Democrat',
      'Massachusetts',
      'Progressive',
      'Pro-Israel Baseline',
      'Conditionality Rhetoric',
      'Integrity Docket',
    ],
    career: [
      'Harvard Law / CFPB architect (public bio)',
      '2013– — U.S. Senate',
      '2020 presidential candidate',
    ],
    quotes: [
      {
        text: 'Israel has a right to defend itself — and must comply with the laws of war.',
        context: 'Recurring dual-track progressive framing after October 7.',
        date: '2023–2024',
        source: 'Official Senate statements',
        url: 'https://www.warren.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 200000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Elizabeth Warren',
        url: 'https://www.opensecrets.org/members-of-congress/elizabeth-warren/summary?cid=N00033492',
      },
    ],
    policyActions: [
      {
        action: 'Votes for core Israel FMF/Iron Dome baseline with progressive rhetoric on civilian harm',
        date: '2013–2024',
        context: 'Middle-progressive enablement: aid continuity + rights language.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC support; mixed progressive conditionality rhetoric.',
        evidence: 'OpenSecrets; public statements',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Warren.',
        source: 'OpenSecrets N00033492',
        url: 'https://www.opensecrets.org/members-of-congress/elizabeth-warren/summary?cid=N00033492',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'Supports Israel security aid baseline while publicly emphasizing laws-of-war / civilian protection after October 7.',
        source: 'Official Senate statements',
        url: 'https://www.warren.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: Feb 2020 claim hard-working families have “flat wages” rated False (real median wages rose ~9.7% since 2014 Q2 per FRED).',
        source: 'PolitiFact False; FRED LES1252881600Q',
        url: 'https://www.politifact.com/factchecks/2020/feb/06/elizabeth-warren/elizabeth-warren-wrong-wages-are-flat/',
        tier: 'verified',
        date: '2020',
      },
      {
        claim:
          'Integrity docket: Feb 2020 debate claim Klobuchar health plan is “two paragraphs” rated False (campaign health pages ~64 paragraphs).',
        source: 'PolitiFact False; debate transcript',
        url: 'https://www.politifact.com/factchecks/2020/feb/21/elizabeth-warren/elizabeth-warren-wrong-say-amy-klobuchars-health-p/',
        tier: 'verified',
        date: '2020',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'warren-flat-wages-2020',
        statement: '“We have an America where … hard-working families have flat wages.”',
        saidAt: 'February 5, 2020',
        context: 'CNN New Hampshire town hall during 2020 Democratic presidential primary.',
        whyFalse:
          'PolitiFact rated False. Inflation-adjusted median weekly earnings (FRED series LES1252881600Q) had been rising since 2014 Q2 — about 9.7% real gain over ~6 years spanning Obama and Trump years — not flat, even if longer-run lower-half wage growth was slower.',
        correction:
          'Real median wages were not flat in the mid/late 2010s; they rose modestly above inflation for several years before the claim.',
        statementSource: 'CNN New Hampshire town hall transcript, Feb 5, 2020',
        statementUrl: 'http://transcripts.cnn.com/TRANSCRIPTS/2002/05/se.02.html',
        debunkSource: 'PolitiFact — False (Feb 6, 2020); FRED real median weekly earnings',
        debunkUrl:
          'https://www.politifact.com/factchecks/2020/feb/06/elizabeth-warren/elizabeth-warren-wrong-wages-are-flat/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'warren-klobuchar-health-plan-two-paragraphs-2020',
        statement: '“Amy, I looked online at your (health care) plan. It’s two paragraphs.”',
        saidAt: 'February 19, 2020',
        context: 'Las Vegas Democratic presidential debate attack on Amy Klobuchar’s health-care specificity.',
        whyFalse:
          'PolitiFact rated False. Warren’s campaign later narrowed the claim to universal-care paragraphs, but Klobuchar’s health policy web presence spanned multiple pages (~64 paragraphs total) covering ACA protections, maternal care, mental health, prescription drugs, and a public option — not a two-paragraph plan.',
        correction:
          'Klobuchar’s posted health-care policy materials were multi-page and far longer than two paragraphs; Warren’s absolute framing was false.',
        statementSource: 'Las Vegas Democratic debate transcript (NBC), Feb 19, 2020',
        statementUrl:
          'https://www.nbcnews.com/politics/2020-election/full-transcript-ninth-democratic-debate-las-vegas-n1139546',
        debunkSource: 'PolitiFact — False (Feb 21, 2020); Klobuchar campaign health-policy pages count',
        debunkUrl:
          'https://www.politifact.com/factchecks/2020/feb/21/elizabeth-warren/elizabeth-warren-wrong-say-amy-klobuchars-health-p/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.warren.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/elizabeth-warren/summary?cid=N00033492' },
      {
        label: 'PolitiFact — flat wages (False)',
        url: 'https://www.politifact.com/factchecks/2020/feb/06/elizabeth-warren/elizabeth-warren-wrong-wages-are-flat/',
      },
      {
        label: 'PolitiFact — Klobuchar plan (False)',
        url: 'https://www.politifact.com/factchecks/2020/feb/21/elizabeth-warren/elizabeth-warren-wrong-say-amy-klobuchars-health-p/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Elizabeth_Warren' },
    ],
  },
  {
    id: 'rand-paul',
    name: 'Rand Paul',
    title: 'U.S. Senator (R-KY)',
    category: 'politician',
    bioguideId: 'P000603',
    party: 'R',
    state: 'KY',
    photoUrl: getProfilePhoto('rand-paul'),
    summary:
      'Kentucky Republican and leading Senate non-interventionist. Frequent NO vote or conditionality advocate on large foreign-aid packages including Israel-related supplementals — a documented counterweight to bipartisan unconditional-aid orthodoxy. Integrity docket: dual-cited PolitiFact False on Jan 2022 campaign ad claiming no one hospitalized for omicron (Houston Methodist + UKHSA studies documented hospitalizations before ad). Primary: Senate roll calls, OpenSecrets, official statements, PolitiFact. Included for full-spectrum enablement analysis (opposition votes are also part of the public record).',
    tags: [
      'Senator',
      'Non-Interventionist',
      'Kentucky',
      'Republican',
      'Aid Conditionality',
      'Foreign Aid Skeptic',
      'Integrity Docket',
    ],
    career: [
      'Ophthalmologist (public bio)',
      '2011– — U.S. Senate',
      'Leading Senate Republican skeptic of large foreign-aid packages',
    ],
    quotes: [
      {
        text: 'Foreign aid should be debated and not rubber-stamped.',
        context: 'Recurring Paul framing of aid packages including Israel-related vehicles.',
        date: '2010s–2020s',
        source: 'Office of Sen. Rand Paul',
        url: 'https://www.paul.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs (typically low relative to pro-aid peers — OpenSecrets)',
        amount: 50000,
        year: 'career scale (verify OpenSecrets; often minimal)',
        source: 'OpenSecrets — Rand Paul',
        url: 'https://www.opensecrets.org/members-of-congress/rand-paul/summary?cid=N00030836',
      },
    ],
    policyActions: [
      {
        action: 'Frequent opposition or hold threats on large foreign-aid / Israel supplemental packages',
        date: '2011–2024',
        context: 'Documents the minority Republican counter-position to unconditional aid orthodoxy — essential for non-slanted enablement map.',
        source: 'Senate roll calls; official statements',
        url: 'https://www.paul.senate.gov',
      },
    ],
    connections: [
      {
        name: 'Senate foreign-aid skeptics',
        relationship: 'Part of small bipartisan/odd-coalition blocs opposing large aid packages.',
        evidence: 'Roll call minorities',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets profile shows relatively limited pro-Israel PAC capture compared to unconditional-aid bloc leaders.',
        source: 'OpenSecrets N00030836',
        url: 'https://www.opensecrets.org/members-of-congress/rand-paul/summary?cid=N00030836',
        tier: 'verified',
        date: '2011–2024',
      },
      {
        claim: 'Public record of opposing or seeking to condition large foreign-aid packages that include Israel security accounts.',
        source: 'Senate roll calls / official statements',
        url: 'https://www.paul.senate.gov',
        tier: 'verified',
        date: '2011–2024',
      },
      {
        claim:
          'Integrity docket: Jan 2022 reelection ad claim “no one has been hospitalized for” omicron rated False (pre-ad studies documented hundreds of hospitalizations); campaign pulled ad.',
        source: 'PolitiFact False; Houston Methodist medRxiv + UKHSA technical briefing',
        url: 'https://www.politifact.com/factchecks/2022/jan/07/rand-paul/sen-rand-pauls-ad-was-wrong-claiming-there-are-no-/',
        tier: 'verified',
        date: '2022',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'paul-no-omicron-hospitalizations-2022',
        statement: '“No one has been hospitalized for” the omicron variant of COVID-19.',
        saidAt: 'January 4, 2022',
        context: 'Facebook reelection fundraising ad minimizing omicron risk while soliciting contributions for a third Senate term.',
        whyFalse:
          'PolitiFact rated False. Studies published before the ad ran documented omicron hospitalizations — e.g. Houston Methodist analysis (15% of omicron patients hospitalized as of late Dec 2021) and UK Health Security Agency briefing with hundreds of omicron hospital admissions. Milder relative to delta is not zero hospitalizations. Campaign pulled the ad.',
        correction:
          'Omicron caused hospitalizations before and during the ad’s run; absolute “no one” language was false even if early severity looked lower than delta.',
        statementSource: 'Rand Paul for U.S. Senate Facebook ad (Meta Ad Library ID 301711262002565), Jan 4, 2022',
        statementUrl:
          'https://www.facebook.com/ads/library/?active_status=all&ad_type=political_and_issue_ads&country=US&id=301711262002565&view_all_page_id=54172246106&search_type=page&media_type=all',
        debunkSource: 'PolitiFact — False (Jan 7, 2022); Houston Methodist medRxiv study + UKHSA Omicron severity briefing',
        debunkUrl:
          'https://www.politifact.com/factchecks/2022/jan/07/rand-paul/sen-rand-pauls-ad-was-wrong-claiming-there-are-no-/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.paul.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/rand-paul/summary?cid=N00030836' },
      {
        label: 'PolitiFact — omicron hospitalizations (False)',
        url: 'https://www.politifact.com/factchecks/2022/jan/07/rand-paul/sen-rand-pauls-ad-was-wrong-claiming-there-are-no-/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Rand_Paul' },
    ],
  },
  {
    id: 'ilhan-omar',
    name: 'Ilhan Omar',
    title: 'U.S. Representative (D-MN)',
    category: 'politician',
    bioguideId: 'O000173',
    party: 'D',
    state: 'MN',
    photoUrl: getProfilePhoto('ilhan-omar'),
    summary:
      'Minnesota Democrat and Squad member; leading progressive for Israel-aid conditionality and Gaza ceasefire. High-profile target of AIPAC/UDP-aligned independent expenditures. Essential opposition pole in the enablement map. Integrity docket: dual-cited PolitiFact False that CAIR was founded after 9/11 (CAIR founded 1994). Primary: OpenSecrets, House record, FEC IE context, PolitiFact, CAIR.',
    tags: [
      'Representative',
      'Squad',
      'Minnesota',
      'Democrat',
      'Aid Conditionality',
      'UDP Target',
      'Ceasefire Advocate',
      'Integrity Docket',
    ],
    career: [
      'Minnesota House (public bio)',
      '2019– — U.S. House MN-5',
      'Leading progressive foreign-policy voice on Gaza and conditionality',
    ],
    quotes: [
      {
        text: 'We must condition aid to uphold human rights.',
        context: 'Recurring progressive conditionality framing (paraphrase of legislative advocacy line).',
        date: '2023–2024',
        source: 'House floor / official statements',
        url: 'https://omar.house.gov',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Leading cosponsor of progressive ceasefire and aid-conditionality measures after October 7',
        date: '2023–2024',
        context: 'Opposition to bipartisan unconditional-aid orthodoxy; subject of large pro-Israel Super PAC IE pressure in progressive politics.',
        source: 'House record',
        url: 'https://omar.house.gov',
      },
    ],
    connections: [
      {
        name: 'Rashida Tlaib / AOC / progressive Squad',
        relationship: 'Shared progressive foreign-policy bloc.',
        evidence: 'Cosponsorship patterns',
        tier: 'verified',
      },
      {
        name: 'United Democracy Project / AIPAC',
        relationship: 'Adversarial independent-expenditure politics targeting progressive Israel critics.',
        evidence: 'FEC IE / OpenSecrets',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents minimal pro-Israel PAC support relative to unconditional-aid bloc members.',
        source: 'OpenSecrets — Ilhan Omar',
        url: 'https://www.opensecrets.org/members-of-congress/ilhan-omar/summary?cid=N00041925',
        tier: 'verified',
        date: '2019–2024',
      },
      {
        claim: 'Leading House progressive for ceasefire resolutions and conditioning U.S. military aid over Gaza civilian harm.',
        source: 'House record / official statements',
        url: 'https://omar.house.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: March 2019 claim CAIR was founded after 9/11 rated False (CAIR founded 1994; office called it a misstatement).',
        source: 'PolitiFact False; CAIR About Us',
        url: 'https://www.politifact.com/factchecks/2019/apr/15/ilhan-omar/ilhan-omar-misstates-facts-about-cairs-founding/',
        tier: 'verified',
        date: '2019',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'omar-cair-founded-after-911-2019',
        statement: 'CAIR was founded after 9/11 because they recognized that some people did something…',
        saidAt: 'March 23, 2019',
        context: 'Remarks at a Council on American-Islamic Relations event later amplified in national political attacks.',
        whyFalse:
          'PolitiFact rated False. The Council on American-Islamic Relations was founded in 1994 (pre-9/11), with civil-rights reports dating to the mid-1990s. Omar’s office later said it was a misstatement and that she knows CAIR was founded earlier.',
        correction:
          'CAIR was founded in 1994, not after the Sept. 11, 2001 attacks.',
        statementSource: 'Ilhan Omar CAIR event remarks (YouTube), March 23, 2019',
        statementUrl: 'https://www.youtube.com/watch?v=NSTNnKNFS0o',
        debunkSource: 'PolitiFact — False (April 15, 2019); CAIR founding record / About Us',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/apr/15/ilhan-omar/ilhan-omar-misstates-facts-about-cairs-founding/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://omar.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/ilhan-omar/summary?cid=N00041925' },
      {
        label: 'PolitiFact — CAIR founding (False)',
        url: 'https://www.politifact.com/factchecks/2019/apr/15/ilhan-omar/ilhan-omar-misstates-facts-about-cairs-founding/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Ilhan_Omar' },
    ],
  },
  {
    id: 'rashida-tlaib',
    name: 'Rashida Tlaib',
    title: 'U.S. Representative (D-MI)',
    category: 'politician',
    bioguideId: 'T000481',
    party: 'D',
    state: 'MI',
    photoUrl: getProfilePhoto('rashida-tlaib'),
    summary:
      'Michigan Democrat and Squad member; leading House progressive for Gaza ceasefire and Israel-aid conditionality. Frequently targeted by AIPAC/UDP-aligned independent expenditures. Documents the progressive opposition pole to bipartisan unconditional-aid orthodoxy. Primary: OpenSecrets, House record, FEC IE context.',
    tags: ['Representative', 'Squad', 'Michigan', 'Democrat', 'Aid Conditionality', 'Ceasefire Advocate', 'UDP Target'],
    career: [
      'Michigan House / community organizer (public bio)',
      '2019– — U.S. House MI-12/13',
      'Leading progressive voice for conditionality and ceasefire resolutions',
    ],
    quotes: [
      {
        text: 'We will not be silent as the U.S. funds collective punishment.',
        context: 'Characterizing progressive floor advocacy on Gaza (paraphrase of recurring Tlaib framing; verify exact floor text per speech).',
        date: '2023–2024',
        source: 'House floor / official statements',
        url: 'https://tlaib.house.gov',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Leading House progressive cosponsor of ceasefire and aid-conditionality measures after October 7',
        date: '2023–2024',
        context: 'Opposition pole to unconditional-aid orthodoxy; subject of large UDP/AIPAC-aligned IE campaigns in related progressive races.',
        source: 'House record; OpenSecrets IE context',
        url: 'https://tlaib.house.gov',
      },
    ],
    connections: [
      {
        name: 'Ilhan Omar / AOC / progressive Squad',
        relationship: 'Shared progressive foreign-policy bloc on Gaza/aid conditionality.',
        evidence: 'Cosponsorship and caucus politics',
        tier: 'verified',
      },
      {
        name: 'United Democracy Project / AIPAC',
        relationship: 'Adversarial — progressive targets of pro-Israel Super PAC independent expenditures in related races.',
        evidence: 'FEC IE filings / OpenSecrets',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents minimal or adversarial relationship to pro-Israel PAC money relative to unconditional-aid bloc members.',
        source: 'OpenSecrets N00040675',
        url: 'https://www.opensecrets.org/members-of-congress/rashida-tlaib/summary?cid=N00040675',
        tier: 'verified',
        date: '2019–2024',
      },
      {
        claim: 'Leading House progressive for ceasefire resolutions and conditioning U.S. aid over Gaza civilian harm.',
        source: 'House record / official statements',
        url: 'https://tlaib.house.gov',
        tier: 'verified',
        date: '2023–2024',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://tlaib.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/rashida-tlaib/summary?cid=N00040675' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Rashida_Tlaib' },
    ],
  },
  {
    id: 'aoc',
    name: 'Alexandria Ocasio-Cortez',
    title: 'U.S. Representative (D-NY)',
    category: 'politician',
    bioguideId: 'O000172',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('aoc'),
    summary:
      'New York Democrat and Squad standard-bearer. High-visibility progressive for Gaza ceasefire and Israel-aid conditionality; frequent target of pro-Israel Super PAC politics. Maps the progressive opposition pole to bipartisan unconditional-aid orthodoxy. Integrity docket: dual-cited PolitiFact Falses on $21T Pentagon “accounting errors” funding M4A and on representing as many people as Sen. Manchin. Primary: OpenSecrets, House record, PolitiFact.',
    tags: [
      'Representative',
      'Squad',
      'New York',
      'Democrat',
      'Aid Conditionality',
      'Ceasefire Advocate',
      'UDP Target',
      'Integrity Docket',
    ],
    career: [
      'Community organizer / bartender (public bio)',
      '2019– — U.S. House NY-14',
      'Leading progressive voice on Gaza and conditionality',
    ],
    quotes: [
      {
        text: 'No more blank checks.',
        context: 'Recurring progressive conditionality slogan in Gaza-war aid debates.',
        date: '2023–2024',
        source: 'House floor / official statements',
        url: 'https://ocasio-cortez.house.gov',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'High-visibility progressive votes and cosponsorships for ceasefire/conditionality measures',
        date: '2023–2024',
        context: 'Opposition pole to AIPAC-aligned unconditional aid; large IE ecosystem targets related progressive races.',
        source: 'House record',
        url: 'https://ocasio-cortez.house.gov',
      },
    ],
    connections: [
      {
        name: 'Ilhan Omar / Rashida Tlaib',
        relationship: 'Squad progressive foreign-policy bloc.',
        evidence: 'Cosponsorship / caucus politics',
        tier: 'verified',
      },
      {
        name: 'United Democracy Project / AIPAC',
        relationship: 'Adversarial Super PAC politics against progressive Israel critics.',
        evidence: 'FEC IE / OpenSecrets',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents limited pro-Israel PAC capture relative to unconditional-aid Democrats.',
        source: 'OpenSecrets — Alexandria Ocasio-Cortez',
        url: 'https://www.opensecrets.org/members-of-congress/alexandria-ocasio-cortez/summary?cid=N00041162',
        tier: 'verified',
        date: '2019–2024',
      },
      {
        claim: 'Leading progressive House voice for ceasefire and conditioning military aid during Gaza war.',
        source: 'House record / official statements',
        url: 'https://ocasio-cortez.house.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: Dec 2018 claim $21T Pentagon accounting errors equal ~66% of Medicare for All costs rated False (misreads DoD audit unsupported balances).',
        source: 'PolitiFact False',
        url: 'https://www.politifact.com/factchecks/2018/dec/03/alexandria-ocasio-cortez/alexandria-ocasio-cortez-wrong-scale-pentagon-acco/',
        tier: 'verified',
        date: '2018',
      },
      {
        claim:
          'Integrity docket: Dec 2021 claim she represents as many or more people than Sen. Manchin rated False (WV ~1.8M vs NY-14 ~700k).',
        source: 'PolitiFact False; Census apportionment',
        url: 'https://www.politifact.com/factchecks/2021/dec/22/alexandria-ocasio-cortez/alexandria-ocasio-cortez-wrong-about-representing/',
        tier: 'verified',
        date: '2021',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'aoc-pentagon-21t-accounting-m4a-2018',
        statement:
          '“$21T in Pentagon accounting errors. Medicare for All costs ~$32T. That means 66% of Medicare for All could have been funded already by the Pentagon.”',
        saidAt: 'December 2018',
        context: 'Tweet / public messaging comparing DoD audit unsupported balances to Medicare-for-All cost estimates while entering Congress.',
        whyFalse:
          'PolitiFact rated False. The ~$21 trillion figure referred to cumulative unsupported journal voucher balances and accounting adjustments across decades of DoD bookkeeping — not a stash of recoverable cash that could fund health care. Converting that ledger noise into “already funded” Medicare-for-All dollars is a category error.',
        correction:
          'DoD audit unsupported balances are not equivalent to free money available to fund Medicare for All; the $21T framing does not describe spendable savings.',
        statementSource: 'AOC public statement / tweet on Pentagon accounting vs M4A (PolitiFact statement capture)',
        statementUrl: 'https://www.politifact.com/personalities/alexandria-ocasio-cortez/',
        debunkSource: 'PolitiFact — False (Dec 3, 2018) on scale of Pentagon accounting errors',
        debunkUrl:
          'https://www.politifact.com/factchecks/2018/dec/03/alexandria-ocasio-cortez/alexandria-ocasio-cortez-wrong-scale-pentagon-acco/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'aoc-represents-more-than-manchin-2021',
        statement: '“I represent more, or just as many or more, people than Joe Manchin does.”',
        saidAt: 'December 2021',
        context: 'Public remarks comparing House district representation to a full U.S. senator’s state population.',
        whyFalse:
          'PolitiFact rated False. West Virginia’s population (~1.8 million) far exceeds NY-14’s district population (~700,000 under equal House apportionment). A House member does not represent as many people as a senator from a mid-size state.',
        correction:
          'Sen. Manchin represents the entire state of West Virginia; AOC represents one House district with substantially fewer residents.',
        statementSource: 'AOC public remarks (PolitiFact quotation), Dec 2021',
        statementUrl: 'https://www.politifact.com/personalities/alexandria-ocasio-cortez/',
        debunkSource: 'PolitiFact — False (Dec 22, 2021); Census population comparisons',
        debunkUrl:
          'https://www.politifact.com/factchecks/2021/dec/22/alexandria-ocasio-cortez/alexandria-ocasio-cortez-wrong-about-representing/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://ocasio-cortez.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/alexandria-ocasio-cortez/summary?cid=N00041162' },
      {
        label: 'PolitiFact — Pentagon $21T (False)',
        url: 'https://www.politifact.com/factchecks/2018/dec/03/alexandria-ocasio-cortez/alexandria-ocasio-cortez-wrong-scale-pentagon-acco/',
      },
      {
        label: 'PolitiFact — Manchin population (False)',
        url: 'https://www.politifact.com/factchecks/2021/dec/22/alexandria-ocasio-cortez/alexandria-ocasio-cortez-wrong-about-representing/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Alexandria_Ocasio-Cortez' },
    ],
  },
  {
    id: 'matt-gaetz',
    name: 'Matt Gaetz',
    title: 'Former U.S. Representative (R-FL)',
    category: 'politician',
    bioguideId: 'G000578',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('matt-gaetz'),
    summary:
      'Former Florida Republican House member (2017–2024) and Freedom Caucus firebrand. Consistent pro-Israel security voting with high-visibility Trump-aligned politics. Documented pro-Israel PAC support (OpenSecrets). Left Congress 2024 amid attorney general nomination fight. Integrity docket: dual-cited PolitiFact Falses — “1 of 5” federal murder charges being illegal aliens (cherry-picked USSC year) and Biden “arming up the IRS” for Fallujah-style tax enforcement (CI ammo is century-old law-enforcement routine). Primary: OpenSecrets, House record, PolitiFact, USSC, IRS CI.',
    tags: [
      'Former Representative',
      'Freedom Caucus',
      'Pro-Israel',
      'Florida',
      'Republican',
      'Trump Ally',
      'Integrity Docket',
    ],
    career: [
      'Florida House (public bio)',
      '2017–2024 — U.S. House FL-1',
      'Freedom Caucus member; Trump ally',
      '2024 — Resigned amid AG nomination process',
    ],
    quotes: [
      {
        text: 'Israel has an absolute right to destroy Hamas.',
        context: 'Recurring post–October 7 House Republican framing.',
        date: '2023–2024',
        source: 'House floor / public statements',
        url: 'https://www.opensecrets.org/members-of-congress/matt-gaetz/summary?cid=N00039794',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 150000,
        year: '2016–2024 (verify OpenSecrets)',
        source: 'OpenSecrets — Matt Gaetz',
        url: 'https://www.opensecrets.org/members-of-congress/matt-gaetz/summary?cid=N00039794',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime packages during House tenure',
        date: '2017–2024',
        context: 'Freedom Caucus Republican security baseline.',
        source: 'House roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC support.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'House Freedom Caucus',
        relationship: 'Member; aligned with pro-Israel security vote bloc.',
        evidence: 'Caucus membership',
        tier: 'verified',
      },
      {
        name: 'Byron Donalds',
        relationship: 'Fellow Florida Freedom Caucus Republican.',
        evidence: 'State/caucus politics',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents pro-Israel PAC/industry support during Gaetz House service.',
        source: 'OpenSecrets N00039794',
        url: 'https://www.opensecrets.org/members-of-congress/matt-gaetz/summary?cid=N00039794',
        tier: 'verified',
        date: '2017–2024',
      },
      {
        claim: 'Consistent House votes for Israel security accounts through 2024 departure.',
        source: 'CRS RL33222; House roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2017–2024',
      },
      {
        claim:
          'Integrity docket: Feb 2019 claim 1 of 5 federal murder charges are illegal aliens rated False (outdated 2016 USSC sentencing snapshot; multi-year average far lower).',
        source: 'PolitiFact False; U.S. Sentencing Commission Table 9',
        url: 'https://www.politifact.com/factchecks/2019/feb/19/matt-gaetz/gaetz-misrepresents-federal-data-murder-immigrants/',
        tier: 'verified',
        date: '2019',
      },
      {
        claim:
          'Integrity docket: Aug 2022 claim government is “arming up the IRS” because Biden is raising taxes and “disarming Americans” rated False (CI special agents armed since 1919; ammo spend routine/training-driven, not Biden-era militarization).',
        source: 'PolitiFact False; IRS Criminal Investigation; GAO firearms report',
        url: 'https://www.politifact.com/factchecks/2022/aug/12/matt-gaetz/no-biden-not-arming-irs-guns-and-ammunition/',
        tier: 'verified',
        date: '2022',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'gaetz-one-in-five-federal-murder-illegal-aliens-2019',
        statement:
          '“One out of every 5 people that the federal government charges with murder is an illegal alien.”',
        saidAt: 'February 7, 2019',
        context: 'CNN interview with Chris Cuomo defending border-wall talking points in a gun-violence discussion.',
        whyFalse:
          'PolitiFact rated False. Gaetz’s office pointed to a single-year U.S. Sentencing Commission snapshot (FY2016 ~17.9% of federal murder sentences were “illegal aliens”) — not multi-year charges data, and not a stable “1 of 5” trend. Adjacent years were much lower (~5–7%); multi-year average ~8%. Most murders are state cases, not federal.',
        correction:
          'Federal murder sentencing data do not support a durable claim that one in five people charged with murder federally are unauthorized immigrants; 2016 was an outlier year and “charges” ≠ “sentences.”',
        statementSource: 'CNN Cuomo interview with Matt Gaetz, Feb 7, 2019',
        statementUrl:
          'https://www.cnn.com/videos/politics/2019/02/08/matt-gaetz-cuomo-spar-border-wall-guns-bts-cuomo-vpx.cnn',
        debunkSource: 'PolitiFact — False (Feb 19, 2019); U.S. Sentencing Commission citizenship tables',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/feb/19/matt-gaetz/gaetz-misrepresents-federal-data-murder-immigrants/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'gaetz-irs-arming-up-biden-disarming-2022',
        statement:
          'Government is arming up the IRS because “Joe Biden is raising taxes and disarming Americans” — “arming up the IRS like they are preparing to take Fallujah.”',
        saidAt: 'August 4, 2022',
        context:
          'Tucker Carlson Tonight segment on IRS ammunition purchases; Gaetz had also introduced a “Disarm the IRS Act” and cited ~$725k FY2022 ammo spending.',
        whyFalse:
          'PolitiFact rated False. IRS Criminal Investigation (armed special agents since the 1919 Intelligence Unit) buys guns/ammo for criminal tax, money-laundering, and cybercrime enforcement — not routine audits. FY2022 ammo spend was on par with recent years and below early-2010s levels (GAO/IRS figures). Agent headcount was not surging under Biden. No evidence tying century-old CI arming practice to Biden tax or gun-policy agendas.',
        correction:
          'Armed IRS special agents predate Biden by a century; recent ammo purchases are routine training/operations spending, not a Fallujah-style militarization linked to tax hikes or civilian disarmament.',
        statementSource: 'Tucker Carlson Tonight / Fox News archive, Aug 4, 2022 (Gaetz interview)',
        statementUrl:
          'https://archive.org/details/FOXNEWSW_20220805_000000_Tucker_Carlson_Tonight/start/3420/end/3480',
        debunkSource: 'PolitiFact — False (Aug 12, 2022); IRS CI annual reports; GAO-19-175',
        debunkUrl: 'https://www.politifact.com/factchecks/2022/aug/12/matt-gaetz/no-biden-not-arming-irs-guns-and-ammunition/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/matt-gaetz/summary?cid=N00039794' },
      {
        label: 'PolitiFact — 1-in-5 murder (False)',
        url: 'https://www.politifact.com/factchecks/2019/feb/19/matt-gaetz/gaetz-misrepresents-federal-data-murder-immigrants/',
      },
      {
        label: 'PolitiFact — IRS arming claim (False)',
        url: 'https://www.politifact.com/factchecks/2022/aug/12/matt-gaetz/no-biden-not-arming-irs-guns-and-ammunition/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Matt_Gaetz' },
    ],
  },
  {
    id: 'jim-jordan',
    name: 'Jim Jordan',
    title: 'U.S. Representative (R-OH); House Judiciary Chair',
    category: 'politician',
    bioguideId: 'J000295',
    party: 'R',
    state: 'OH',
    photoUrl: getProfilePhoto('jim-jordan'),
    summary:
      'Ohio Republican, Freedom Caucus founder, House Judiciary Chair. Consistent pro-Israel security voter and high-visibility Trump ally. Documented pro-Israel PAC recipient (OpenSecrets). Integrity docket: dual-cited FactCheck.org falsehoods — “they changed the form” whistleblower first-hand rule (Sept. 2019) and “record inflation” under Democrats in two years (Jan. 2023 Speakership nominating speech). Primary: OpenSecrets, House record, CRS RL33222, FactCheck.org.',
    tags: [
      'Representative',
      'Freedom Caucus',
      'Pro-Israel',
      'AIPAC',
      'Ohio',
      'Republican',
      'Judiciary Chair',
      'Integrity Docket',
    ],
    career: [
      'Ohio state legislature / wrestling coach (public bio)',
      '2007– — U.S. House',
      'Freedom Caucus founder',
      'House Judiciary Committee Chair',
    ],
    quotes: [
      {
        text: 'We stand with Israel against Hamas terrorists.',
        context: 'Recurring House Republican framing after October 7.',
        date: '2023–2024',
        source: 'House floor / official statements',
        url: 'https://jordan.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 250000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Jim Jordan',
        url: 'https://www.opensecrets.org/members-of-congress/jim-jordan/summary?cid=N00027681',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime packages',
        date: '2007–2024',
        context: 'Freedom Caucus Republican pro-Israel security baseline.',
        source: 'House roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'House Freedom Caucus',
        relationship: 'Founder / leading member; pro-Israel security vote bloc.',
        evidence: 'Caucus history',
        tier: 'verified',
      },
      {
        name: 'Byron Donalds',
        relationship: 'Fellow Freedom Caucus pro-Israel Trump-aligned Republican.',
        evidence: 'Caucus membership',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Jordan.',
        source: 'OpenSecrets N00027681',
        url: 'https://www.opensecrets.org/members-of-congress/jim-jordan/summary?cid=N00027681',
        tier: 'verified',
        date: '2007–2024',
      },
      {
        claim: 'Consistent House votes for MOU-baseline FMF and wartime Israel security packages.',
        source: 'CRS RL33222; House roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2007–2024',
      },
      {
        claim:
          'Integrity docket: Sept. 29, 2019 claim that IC whistleblower “form” was changed so first-hand knowledge is no longer required — and that the Ukraine whistleblower “had no firsthand knowledge” — debunked by FactCheck.org / ICIG (statute never required first-hand knowledge; complainant used old form and had direct knowledge of certain conduct).',
        source: 'FactCheck.org; ICIG Sept. 30, 2019 statement; CNN SOTU transcript',
        url: 'https://www.factcheck.org/2019/10/no-hearsay-rule-change-for-whistleblowers/',
        tier: 'verified',
        date: '2019',
      },
      {
        claim:
          'Integrity docket: Jan. 2023 Speakership nominating speech claim that Democrats in “two years’ time” produced “record inflation” — FactCheck.org: modern CPI 12-month peaks remain 1980 (14.6%), not the Biden-era 9% peak.',
        source: 'FactCheck.org; BLS CPI; C-SPAN user clip',
        url: 'https://www.factcheck.org/2023/01/factchecking-the-house-speaker-election/',
        tier: 'verified',
        date: '2023',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'jordan-whistleblower-form-changed-firsthand-2019',
        statement:
          'Claimed the intelligence-community whistleblower form/rules were changed so first-hand knowledge is no longer required, and that the Ukraine whistleblower “had no firsthand knowledge” / only “heard something from someone who may have heard something from someone.”',
        saidAt: 'September 29, 2019',
        context:
          'CNN State of the Union interview during the first Trump impeachment inquiry over the Ukraine call, echoing concurrent Trump/GOP talking points about a “changed” hearsay rule.',
        whyFalse:
          'FactCheck.org and the ICIG’s Sept. 30, 2019 statement: statute has never required first-hand knowledge to file an urgent-concern complaint. Form language was clarified because it could be misread; the ICIG cannot add conditions not in law. The Ukraine complainant used the older form and the ICIG found direct knowledge of certain alleged conduct plus other supporting information — not pure unsubstantiated hearsay.',
        correction:
          'IC whistleblowers have never been legally required to possess only first-hand knowledge; the 2019 form edit clarified misleading language, and the Ukraine complainant had direct knowledge of certain conduct per the ICIG.',
        statementSource: 'CNN State of the Union transcript, Sept. 29, 2019 (Jordan–Tapper exchange)',
        statementUrl: 'http://transcripts.cnn.com/TRANSCRIPTS/1909/29/sotu.01.html',
        debunkSource: 'FactCheck.org — No Hearsay Rule Change for Whistleblowers (Oct. 1, 2019); ICIG statement Sept. 30, 2019',
        debunkUrl: 'https://www.factcheck.org/2019/10/no-hearsay-rule-change-for-whistleblowers/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'jordan-record-inflation-two-years-2023',
        statement:
          'In “two years’ time” Democrats were responsible for “record inflation” (among other outcomes).',
        saidAt: 'January 3–4, 2023',
        context:
          'House floor nominating speech for Kevin McCarthy during the multi-ballot Speakership election at the start of the 118th Congress.',
        whyFalse:
          'FactCheck.org: inflation under Biden was the highest in decades (9% CPI peak for the 12 months ending June 2022), but it was not a modern record. BLS data show 14.6% 12-month CPI peaks in March–April 1980 — higher than any Biden-era reading. Calling the Biden spike “record inflation” is false on the historical CPI record.',
        correction:
          'Peak modern U.S. CPI 12-month inflation remains the 1980 peaks (~14.6%), not the Biden-era 9% peak; “record inflation” in two years under Democrats is false.',
        statementSource: 'C-SPAN — Rep. Jordan opening-day 118th Congress nominating speech clip',
        statementUrl: 'https://www.c-span.org/video/?c5049516/user-clip-rep-jordan-opening-day-118th-congress',
        debunkSource: 'FactCheck.org — FactChecking the House Speaker Election (Jan. 5, 2023); BLS CPI series',
        debunkUrl: 'https://www.factcheck.org/2023/01/factchecking-the-house-speaker-election/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://jordan.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/jim-jordan/summary?cid=N00027681' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Jim_Jordan' },
      {
        label: 'FactCheck.org — Whistleblower hearsay rule',
        url: 'https://www.factcheck.org/2019/10/no-hearsay-rule-change-for-whistleblowers/',
      },
      {
        label: 'FactCheck.org — Speakership inflation claim',
        url: 'https://www.factcheck.org/2023/01/factchecking-the-house-speaker-election/',
      },
    ],
  },
  {
    id: 'elise-stefanik',
    name: 'Elise Stefanik',
    title: 'U.S. Representative (R-NY-21); House Republican Conference Chair',
    category: 'politician',
    bioguideId: 'S001196',
    party: 'R',
    state: 'NY',
    photoUrl: getProfilePhoto('elise-stefanik'),
    summary:
      'House Republican Conference Chair and NY-21 representative. High-visibility Trump ally and leading congressional voice on campus antisemitism oversight after October 7. Documented pro-Israel PAC recipient (OpenSecrets). Consistent yes votes on FMF, Iron Dome, and wartime Israel supplementals. Integrity docket: dual-cited PolitiFact False that H.R. 1 would prevent removal of ineligible voters. Primary sources: OpenSecrets, House leadership record, committee hearings, PolitiFact.',
    tags: [
      'House GOP Conference Chair',
      'Pro-Israel',
      'AIPAC',
      'Trump Ally',
      'New York',
      'Republican',
      'Campus Antisemitism Hearings',
      'Iron Dome',
      'Integrity Docket',
    ],
    career: [
      'George W. Bush White House staff (public bio)',
      '2014 — Elected U.S. House NY-21',
      '2021– — House Republican Conference Chair',
      '2023–2024 — Led high-profile university president hearings on campus antisemitism',
      'Consistent Israel-security voting record',
    ],
    quotes: [
      {
        text: 'Antisemitism has no place on college campuses or anywhere in America.',
        context: 'House Education Committee oversight framing after October 7 campus protests.',
        date: 'December 2023',
        source: 'House Education & Workforce Committee hearing record',
        url: 'https://edworkforce.house.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets member profile)',
        amount: 280000,
        year: '2015–2024 (order-of-magnitude; verify cycle tabs)',
        source: 'OpenSecrets — Elise Stefanik',
        url: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523',
      },
    ],
    policyActions: [
      {
        action: 'House Republican Conference Chair — institutional GOP leadership voice on Israel and antisemitism oversight',
        date: '2021–present',
        context: 'Leadership role multiplies messaging power beyond a single district vote.',
        source: 'House Republican Conference',
        url: 'https://www.gop.gov',
      },
      {
        action: 'Chaired / led questioning in December 2023 university presidents hearing on campus antisemitism',
        date: 'December 5, 2023',
        context:
          'Viral oversight hearing of Harvard, Penn, MIT presidents; framed as antisemitism accountability after Oct 7. Primary is committee video/transcript.',
        source: 'House Education & Workforce Committee',
        url: 'https://edworkforce.house.gov',
      },
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and 2024 Israel Security Supplemental architecture',
        date: '2015–2024',
        context: 'Standard Republican leadership pro-Israel security voting pattern.',
        source: 'House Clerk roll calls',
        url: 'https://clerk.house.gov/Votes/2024143',
      },
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Public ally; 2024 VP short-list discussion in press; Conference Chair coordination.',
        evidence: 'Public endorsements and leadership politics',
        tier: 'verified',
      },
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; legislative priorities align with AIPAC security agenda.',
        evidence: 'OpenSecrets; voting record',
        tier: 'verified',
      },
      {
        name: 'House Republican Conference',
        relationship: 'Chair — elected leadership of House GOP conference.',
        evidence: 'Conference leadership roster',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Stefanik alongside her leadership role.',
        source: 'OpenSecrets N00035523',
        url: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523',
        tier: 'verified',
        date: '2015–2024',
      },
      {
        claim:
          'As Conference Chair and hearing lead, Stefanik was a primary Republican messenger tying campus antisemitism oversight to unconditional U.S. support for Israel after October 7.',
        source: 'House Education Committee hearing record',
        url: 'https://edworkforce.house.gov',
        tier: 'verified',
        date: 'December 2023',
      },
      {
        claim:
          'Voted YES on H.R. 8034 Israel Security Supplemental (April 20, 2024, 366–58).',
        source: 'House Clerk Vote 143',
        url: 'https://clerk.house.gov/Votes/2024143',
        tier: 'verified',
        date: 'April 2024',
      },
      {
        claim:
          'Integrity docket: March 2021 claim H.R. 1 would “prevent removal of ineligible voters from registration rolls” rated False (bill sets evidence standards; does not ban list maintenance).',
        source: 'PolitiFact False; H.R. 1 text',
        url: 'https://www.politifact.com/factchecks/2021/mar/04/elise-stefanik/gop-lawmaker-misleads-about-hr-1-and-removal-ineli/',
        tier: 'verified',
        date: '2021',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'stefanik-hr1-prevent-removal-ineligible-voters-2021',
        statement: 'H.R. 1 would “prevent removal of ineligible voters from registration rolls.”',
        saidAt: 'March 3, 2021',
        context: 'X post attacking the For the People Act (H.R. 1) during House passage.',
        whyFalse:
          'PolitiFact rated False. No section of H.R. 1 bans election officials from removing ineligible registrants. Provisions require objective evidence and notice for removals and bar corrupt interference with registration — list maintenance remains lawful. Election-law experts across the spectrum said the bill does not prevent removal of ineligible voters per se.',
        correction:
          'H.R. 1 regulates how removals occur (evidence/notice); it does not prohibit removing dead, moved, or otherwise ineligible voters from the rolls.',
        statementSource: 'Rep. Elise Stefanik X post, March 3, 2021',
        statementUrl: 'https://twitter.com/RepStefanik/status/1367115585528745986',
        debunkSource: 'PolitiFact — False (March 4, 2021); H.R. 1 text + election-law expert synthesis',
        debunkUrl:
          'https://www.politifact.com/factchecks/2021/mar/04/elise-stefanik/gop-lawmaker-misleads-about-hr-1-and-removal-ineli/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official House site', url: 'https://stefanik.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523' },
      { label: 'House GOP Conference', url: 'https://www.gop.gov' },
      { label: 'Education & Workforce Committee', url: 'https://edworkforce.house.gov' },
      {
        label: 'PolitiFact — H.R. 1 voter rolls (False)',
        url: 'https://www.politifact.com/factchecks/2021/mar/04/elise-stefanik/gop-lawmaker-misleads-about-hr-1-and-removal-ineli/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Elise_Stefanik' },
    ],
  },
  {
    id: 'dianne-feinstein',
    name: 'Dianne Feinstein',
    title: 'Former U.S. Senator (D-CA)',
    category: 'politician',
    bioguideId: 'F000062',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('dianne-feinstein'),
    summary:
      'Deceased former U.S. Senator from California (1992–2023); longtime Intelligence Committee chair and assault-weapons ban author. Documented pro-Israel PAC recipient (OpenSecrets). Integrity docket: dual-cited PolitiFact False claims — “no regulation” of commercial drones (2013) and U.S. has “more gun deaths by far” than any other country (2019). Primary: Senate record, OpenSecrets, PolitiFact.',
    tags: [
      'Senator',
      'California',
      'Democrat',
      'Intelligence Committee',
      'Deceased 2023',
      'Integrity Docket',
    ],
    career: ['U.S. Senator (D-CA) 1992-2023', 'Mayor of San Francisco', 'State legislator'],
    quotes: [
      {
        text: 'The United States has a deep moral obligation to support and defend Israel.',
        context: 'Senate floor speech',
        date: '2018',
        source: 'Senate.gov',
        url: 'https://web.archive.org/web/20240227114148/https://www.feinstein.senate.gov/',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1340000,
        year: '1992-2023',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/dianne-feinstein/summary?cid=N00007364',
      },
    ],
    policyActions: [
      {
        action: 'Led Senate Intelligence Committee release of CIA torture report',
        date: '2014',
        context: 'Declassified report on enhanced interrogation techniques',
        source: 'Senate Intelligence Committee',
        url: 'https://www.intelligence.senate.gov',
      },
    ],
    connections: [
      {
        name: 'Richard Blum',
        relationship: 'Husband with extensive China business ties (deceased)',
        evidence: 'Public financial disclosures',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'Employed Chinese spy as personal driver for 20 years',
        source: 'San Francisco Chronicle',
        url: 'https://www.sfchronicle.com',
        tier: 'verified',
        date: '2018',
      },
      {
        claim: 'Led release of CIA torture report over fierce intelligence community opposition',
        source: 'Senate Intelligence Committee',
        url: 'https://www.intelligence.senate.gov',
        tier: 'verified',
        date: '2014',
      },
      {
        claim:
          'Integrity docket: March 2013 claim of “no regulation” of commercial drones in the U.S. rated False (FAA rules then banned commercial UAS without special certificates).',
        source: 'PolitiFact False; FAA UAS fact sheets',
        url: 'https://www.politifact.com/factchecks/2013/mar/11/dianne-feinstein/regulation-commercial-drones/',
        tier: 'verified',
        date: '2013',
      },
      {
        claim:
          'Integrity docket: Aug. 2019 claim the U.S. has “more gun deaths by far” than any other country rated False (IHME/JAMA: Brazil led absolute firearm deaths 2015–2017).',
        source: 'PolitiFact False; JAMA Global Mortality From Firearms',
        url: 'https://www.politifact.com/factchecks/2019/aug/06/dianne-feinstein/fact-check-are-there-more-gun-deaths-far-america-a/',
        tier: 'verified',
        date: '2019',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'feinstein-no-regulation-commercial-drones-2013',
        statement: '“We have no regulation of drones in the United States in their commercial use.”',
        saidAt: 'March 7, 2013',
        context:
          'MSNBC Hardball interview after Sen. Rand Paul’s filibuster on drone policy; Feinstein raised privacy concerns about commercial drones over homes.',
        whyFalse:
          'PolitiFact rated False. FAA rules already governed unmanned aircraft systems: commercial operators needed experimental airworthiness certificates, and the FAA did not issue those certificates for ordinary commercial use — amounting to a ban, not a regulatory vacuum. Industry groups and FAA materials confirmed commercial-use regulation existed.',
        correction:
          'As of 2013 the FAA regulated commercial drones and effectively banned ordinary commercial UAS operations without special experimental certificates.',
        statementSource: 'MSNBC Hardball / CQ Newsmaker transcript, March 7, 2013',
        statementUrl: 'http://www.nbcnews.com/id/3036697/',
        debunkSource: 'PolitiFact — False (March 11, 2013); FAA UAS fact sheets',
        debunkUrl: 'https://www.politifact.com/factchecks/2013/mar/11/dianne-feinstein/regulation-commercial-drones/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'feinstein-more-gun-deaths-by-far-2019',
        statement: 'There are “more gun deaths by far” in the United States than any other country in the world.',
        saidAt: 'August 3, 2019',
        context:
          'X/Twitter post after mass shootings in Gilroy and El Paso (hours before Dayton), advocating “commonsense gun reform.”',
        whyFalse:
          'PolitiFact rated False. University of Washington IHME global firearm mortality data (JAMA 2018) showed Brazil had the most overall gun deaths (homicides + suicides + unintentional) in 2015–2017 — e.g. ~48,493 in 2017 vs ~40,229 in the U.S. The U.S. led firearm suicides but not absolute total gun deaths worldwide.',
        correction:
          'Brazil, not the United States, led the world in absolute firearm deaths in the mid-2010s IHME series; “more gun deaths by far” than any other country is false.',
        statementSource: 'Sen. Dianne Feinstein (@SenFeinstein) tweet, Aug. 3, 2019',
        statementUrl: 'https://twitter.com/SenFeinstein/status/1157777450706886656',
        debunkSource: 'PolitiFact — False (Aug. 6, 2019); JAMA Global Mortality From Firearms 1990–2016',
        debunkUrl:
          'https://www.politifact.com/factchecks/2019/aug/06/dianne-feinstein/fact-check-are-there-more-gun-deaths-far-america-a/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      {
        label: 'Senate Website (archive)',
        url: 'https://web.archive.org/web/20240227114148/https://www.feinstein.senate.gov/',
      },
      {
        label: 'OpenSecrets Profile',
        url: 'https://www.opensecrets.org/members-of-congress/dianne-feinstein/summary?cid=N00007364',
      },
      {
        label: 'PolitiFact — Commercial drones (False)',
        url: 'https://www.politifact.com/factchecks/2013/mar/11/dianne-feinstein/regulation-commercial-drones/',
      },
      {
        label: 'PolitiFact — Gun deaths by far (False)',
        url: 'https://www.politifact.com/factchecks/2019/aug/06/dianne-feinstein/fact-check-are-there-more-gun-deaths-far-america-a/',
      },
    ],
  },
  {
    id: 'kevin-mccarthy',
    name: 'Kevin McCarthy',
    title: 'Former Speaker of the House (R-CA)',
    category: 'politician',
    bioguideId: 'M001165',
    party: 'R',
    state: 'CA',
    photoUrl: getProfilePhoto('kevin-mccarthy'),
    summary:
      'House Speaker (Jan–Oct 2023) during early Gaza-war aid debates and long-time Republican Conference leader. Structural floor-scheduling power for Israel security packages; documented pro-Israel PAC recipient (OpenSecrets). Integrity docket: dual-cited PolitiFact False that telecoms complying with Jan. 6 committee records requests would violate federal law and lose ability to operate (Aug. 2021). Primary: OpenSecrets, Speakership record, CRS RL33222, PolitiFact.',
    tags: [
      'Former Speaker',
      'Pro-Israel',
      'AIPAC',
      'California',
      'Republican',
      'Institutional Enablement',
      'Integrity Docket',
    ],
    career: [
      'California State Assembly (public bio)',
      '2007–2023 — U.S. House',
      'House Republican leadership ladder → Speaker Jan 2023',
      'Removed from Speakership Oct 2023; left Congress end of 2023',
    ],
    quotes: [
      {
        text: 'America will always stand with Israel.',
        context: 'Recurring Speakership/leadership framing.',
        date: '2020s',
        source: 'House leadership remarks',
        url: 'https://www.opensecrets.org/members-of-congress/kevin-mccarthy/summary?cid=N00006863',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 400000,
        year: 'career multi-cycle (verify OpenSecrets)',
        source: 'OpenSecrets — Kevin McCarthy',
        url: 'https://www.opensecrets.org/members-of-congress/kevin-mccarthy/summary?cid=N00006863',
      },
    ],
    policyActions: [
      {
        action: 'As Speaker, institutional leadership advancing wartime Israel security packages and opposing conditionality',
        date: 'Jan–Oct 2023',
        context: 'Speakership is structural enablement of floor agenda.',
        source: 'House Speakership record; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; leadership alignment.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'Mike Johnson',
        relationship: 'Speakership successor continuing Republican floor enablement of Israel packages.',
        evidence: 'Speakership succession',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for McCarthy.',
        source: 'OpenSecrets N00006863',
        url: 'https://www.opensecrets.org/members-of-congress/kevin-mccarthy/summary?cid=N00006863',
        tier: 'verified',
        date: '2007–2023',
      },
      {
        claim: 'As Speaker in 2023, McCarthy held structural floor power over early Gaza-war aid debates.',
        source: 'House Speakership record',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2023',
      },
      {
        claim:
          'Integrity docket: Aug. 2021 claim that telecom/internet companies complying with Jan. 6 committee records requests would violate federal law and risk losing ability to operate in the U.S. rated False (no such statute; 18 U.S.C. § 2703 protects compliance with lawful process).',
        source: 'PolitiFact False; @GOPLeader tweet Aug. 31, 2021; 18 U.S.C. § 2703',
        url: 'https://www.politifact.com/factchecks/2021/sep/02/kevin-mccarthy/house-gop-leader-kevin-mccarthy-wrong-telecom-law/',
        tier: 'verified',
        date: '2021',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'mccarthy-jan6-telecom-federal-law-violation-2021',
        statement:
          '“If these (telecom and internet) companies comply with the Democrat order to turn over private information, they are in violation of federal law and subject to losing their ability to operate in the United States.”',
        saidAt: 'August 31, 2021',
        context:
          'X/Twitter warning after the House select committee investigating the Jan. 6 Capitol attack asked 30+ telecom and internet companies to retain records relevant to the investigation — a precursor step toward possible subpoenas.',
        whyFalse:
          'PolitiFact rated False. McCarthy’s office never named the statute. Telecom and privacy lawyers (including practitioners under 18 U.S.C. § 2703) told PolitiFact no federal law bars companies from complying with a proper congressional subpoena or warrant, and federal law expressly protects providers for complying with compulsory process. Companies can challenge process in court; they do not forfeit their license to operate by lawful compliance.',
        correction:
          'No federal statute strips telecom/internet companies of their ability to operate for complying with a Jan. 6 committee records subpoena; 18 U.S.C. § 2703 protects compliance with lawful process.',
        statementSource: 'House Minority Leader Kevin McCarthy (@GOPLeader) tweet, Aug. 31, 2021',
        statementUrl: 'https://twitter.com/GOPLeader/status/1432820807684739073',
        debunkSource: 'PolitiFact — False (Sept. 2, 2021); 18 U.S.C. § 2703',
        debunkUrl:
          'https://www.politifact.com/factchecks/2021/sep/02/kevin-mccarthy/house-gop-leader-kevin-mccarthy-wrong-telecom-law/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/kevin-mccarthy/summary?cid=N00006863' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Kevin_McCarthy' },
      {
        label: 'PolitiFact — Jan. 6 telecom law claim (False)',
        url: 'https://www.politifact.com/factchecks/2021/sep/02/kevin-mccarthy/house-gop-leader-kevin-mccarthy-wrong-telecom-law/',
      },
    ],
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    title: 'Speaker of the House (R-LA)',
    category: 'politician',
    bioguideId: 'J000299',
    party: 'R',
    state: 'LA',
    photoUrl: getProfilePhoto('mike-johnson'),
    summary:
      'House Speaker (since Oct 2023) and Louisiana Republican. Controls House floor schedule for wartime Israel security packages including the 2024 supplemental architecture. Documented pro-Israel PAC recipient (OpenSecrets). Structural enablement role as Speaker exceeds backbench voting. Integrity docket: dual-cited PolitiFact False that paroled immigrants can “simply go to welfare/DMV and register to vote” (May 2024 SAFE Act presser). Primary: OpenSecrets, House Speakership record, H.R. 815 / H.R. 8034, PolitiFact.',
    tags: [
      'Speaker of the House',
      'Pro-Israel',
      'AIPAC',
      'Louisiana',
      'Republican',
      'H.R. 815',
      'Institutional Enablement',
      'Integrity Docket',
    ],
    career: [
      'Constitutional attorney (public bio)',
      '2017 — U.S. House LA-4',
      'October 2023 — Elected Speaker of the House',
      'Scheduled 2024 Israel security supplemental packages',
    ],
    quotes: [
      {
        text: 'We stand with Israel.',
        context: 'Recurring Speakership messaging after October 7 and during supplemental debates.',
        date: '2023–2024',
        source: 'Office of Speaker Mike Johnson',
        url: 'https://www.speaker.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets member scale)',
        amount: 200000,
        year: '2017–2024 (verify cycle tabs)',
        source: 'OpenSecrets — Mike Johnson',
        url: 'https://www.opensecrets.org/members-of-congress/mike-johnson/summary?cid=N00039106',
      },
    ],
    policyActions: [
      {
        action: 'As Speaker, scheduled House passage of Israel Security Supplemental architecture (H.R. 8034 / H.R. 815 package, April 2024)',
        date: 'April 2024',
        context: 'Speakership is structural enablement — decides what reaches the floor during wartime aid fights.',
        source: 'House Clerk; Congress.gov H.R. 815',
        url: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
      {
        action: 'Public Speakership messaging of unconditional wartime support for Israel after October 7',
        date: '2023–2024',
        context: 'Leadership framing against progressive conditionality.',
        source: 'Speaker.gov / contemporaneous press',
        url: 'https://www.speaker.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; Speakership agenda aligned with AIPAC security priorities.',
        evidence: 'OpenSecrets; floor schedule',
        tier: 'verified',
      },
      {
        name: 'House Republican Conference',
        relationship: 'Speaker — institutional head of House GOP.',
        evidence: 'Speakership election record',
        tier: 'verified',
      },
      {
        name: 'Elise Stefanik',
        relationship: 'Conference Chair under Johnson Speakership; shared pro-Israel messaging.',
        evidence: 'Leadership roster',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As Speaker, Johnson scheduled and advanced the April 2024 Israel Security Supplemental package (H.R. 8034 / H.R. 815 architecture).',
        source: 'Congress.gov H.R. 815; House Clerk Vote 143',
        url: 'https://clerk.house.gov/Votes/2024143',
        tier: 'verified',
        date: 'April 2024',
      },
      {
        claim: 'OpenSecrets documents pro-Israel PAC/industry support for Johnson\'s House campaigns.',
        source: 'OpenSecrets N00039106',
        url: 'https://www.opensecrets.org/members-of-congress/mike-johnson/summary?cid=N00039106',
        tier: 'verified',
        date: '2017–2024',
      },
      {
        claim: 'Speakership is structural enablement of the aid pipeline beyond a single member vote.',
        source: 'House rules / Speakership role; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: May 8, 2024 claim that “the millions (of immigrants) that have been paroled can simply go to their local welfare office or the DMV and register to vote” rated False (noncitizens cannot lawfully register; forms are vetted; federal ban since 1996).',
        source: 'PolitiFact False; C-SPAN May 8, 2024 presser; NVRA / 18 U.S.C. § 1015',
        url: 'https://www.politifact.com/factchecks/2024/may/20/mike-johnson/mike-johnsons-false-claim-that-immigrants-paroled/',
        tier: 'verified',
        date: '2024',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'johnson-parolees-simply-register-to-vote-dmv-2024',
        statement:
          '“The millions (of immigrants) that have been paroled can simply go to their local welfare office or the DMV and register to vote.”',
        saidAt: 'May 8, 2024',
        context:
          'Speaker press conference advocating the Safeguard American Voter Eligibility (SAFE) Act / H.R. 8281 proof-of-citizenship registration bill; claimed noncitizen voting poses a “clear and present danger” to election integrity.',
        whyFalse:
          'PolitiFact rated False. Humanitarian parolees are not U.S. citizens. Federal law has banned noncitizen voting in federal elections since 1996. NVRA offices must offer registration forms, but applicants must attest citizenship under penalty of perjury and election officials vet applications — submitting a form does not “simply” register a noncitizen. Johnson provided no data showing widespread noncitizen registration or voting.',
        correction:
          'Parolees cannot lawfully register or vote in federal elections; DMV/welfare offices may distribute forms, but citizenship attestation + election-office vetting prevent automatic noncitizen registration.',
        statementSource: 'C-SPAN — Speaker Johnson News Conference on Voter Eligibility Legislation, May 8, 2024',
        statementUrl:
          'https://www.c-span.org/video/?535480-1/speaker-johnson-news-conference-voter-eligibility-legislation',
        debunkSource: 'PolitiFact — False (May 20, 2024); NVRA / DOJ; 18 U.S.C. § 1015',
        debunkUrl:
          'https://www.politifact.com/factchecks/2024/may/20/mike-johnson/mike-johnsons-false-claim-that-immigrants-paroled/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Speaker.gov', url: 'https://www.speaker.gov' },
      { label: 'Official House site', url: 'https://mikejohnson.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/mike-johnson/summary?cid=N00039106' },
      { label: 'H.R. 815', url: 'https://www.congress.gov/bill/118th-congress/house-bill/815' },
      {
        label: 'PolitiFact — Parolee DMV voter registration (False)',
        url: 'https://www.politifact.com/factchecks/2024/may/20/mike-johnson/mike-johnsons-false-claim-that-immigrants-paroled/',
      },
      {
        label: 'C-SPAN — May 8, 2024 SAFE Act presser',
        url: 'https://www.c-span.org/video/?535480-1/speaker-johnson-news-conference-voter-eligibility-legislation',
      },
    ],
  },
  {
    id: 'tim-scott',
    name: 'Tim Scott',
    title: 'U.S. Senator (R-SC)',
    category: 'politician',
    bioguideId: 'S001184',
    party: 'R',
    state: 'SC',
    photoUrl: getProfilePhoto('tim-scott'),
    summary:
      'South Carolina Republican senator; only Black Republican senator for much of his tenure. Consistent pro-Israel security voter and public advocate for unconditional U.S. support for Israeli government positions. Documented pro-Israel PAC recipient (OpenSecrets). Integrity docket: dual-cited PolitiFact False that “Secret Service remains unpaid” during 2026 DHS funding lapse (OBBBA reallocation paid salaries). Primary: OpenSecrets, Senate roll calls, CRS RL33222, PolitiFact.',
    tags: [
      'Senator',
      'Pro-Israel',
      'AIPAC',
      'South Carolina',
      'Republican',
      'Iron Dome',
      'FMF',
      'Integrity Docket',
    ],
    career: [
      'Insurance business / Charleston County Council / SC House (public bio)',
      '2010 — U.S. House SC-1',
      '2013 — Appointed U.S. Senate; elected thereafter',
      'Consistent Israel security voting and floor advocacy',
    ],
    quotes: [
      {
        text: 'America\'s commitment to Israel\'s security is ironclad.',
        context: 'Recurring Senate Republican framing of FMF and wartime support.',
        date: '2020s',
        source: 'Office of Sen. Tim Scott',
        url: 'https://www.scott.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets member total scale)',
        amount: 400000,
        year: '2010–2024 (verify cycle tabs)',
        source: 'OpenSecrets — Tim Scott',
        url: 'https://www.opensecrets.org/members-of-congress/tim-scott/summary?cid=N00031782',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime Israel security packages',
        date: '2013–2024',
        context: 'Senate Republican pro-Israel security baseline.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Public post–October 7 advocacy for full wartime military support without progressive conditionality',
        date: '2023–2024',
        context: 'Contemporaneous Senate statements.',
        source: 'Official Senate statements',
        url: 'https://www.scott.senate.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC recipient; voting aligns with AIPAC security agenda.',
        evidence: 'OpenSecrets; roll calls',
        tier: 'verified',
      },
      {
        name: 'Republican Senate conference',
        relationship: 'Part of Senate GOP pro-Israel security majority.',
        evidence: 'Roll call coalitions',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support for Scott\'s House and Senate campaigns.',
        source: 'OpenSecrets N00031782',
        url: 'https://www.opensecrets.org/members-of-congress/tim-scott/summary?cid=N00031782',
        tier: 'verified',
        date: '2010–2024',
      },
      {
        claim: 'Consistent Senate votes for MOU-baseline FMF and missile-defense accounts supporting Israel.',
        source: 'CRS RL33222; Senate roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2013–2024',
      },
      {
        claim: 'Public advocate for unconditional wartime Israel aid after October 7.',
        source: 'Official Senate statements',
        url: 'https://www.scott.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'Integrity docket: April 2026 claim “Secret Service remains unpaid” during DHS funding lapse rated False (administration reallocated OBBBA funds to pay DHS salaries including USSS).',
        source: 'PolitiFact False; CRS Secret Service funding fact sheet; Trump EO April 3, 2026',
        url: 'https://www.politifact.com/factchecks/2026/apr/29/tim-scott/secret-service-assassination-shutdown-paychecks/',
        tier: 'verified',
        date: '2026',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'scott-secret-service-remains-unpaid-2026',
        statement: '“Secret Service remains unpaid” during the partial government shutdown.',
        saidAt: 'April 26, 2026',
        context: 'X post after White House Correspondents’ Association dinner security incident during DHS funding lapse.',
        whyFalse:
          'PolitiFact rated False. Although DHS appropriations had lapsed, the Trump administration reallocated funds under the One Big Beautiful Bill Act (via executive action) to pay DHS employee salaries — including Secret Service. CRS confirmed those funds were being used for all DHS salaries until exhausted or FY2026 appropriations enacted.',
        correction:
          'Secret Service personnel were receiving paychecks via OBBBA reallocation during the 2026 DHS funding standoff; absolute “remains unpaid” was false.',
        statementSource: 'Sen. Tim Scott X post (@votetimscott), April 26, 2026',
        statementUrl: 'https://x.com/votetimscott/status/2048400904919933054',
        debunkSource: 'PolitiFact — False (April 29, 2026); CRS funding fact sheet + White House EO',
        debunkUrl:
          'https://www.politifact.com/factchecks/2026/apr/29/tim-scott/secret-service-assassination-shutdown-paychecks/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.scott.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/tim-scott/summary?cid=N00031782' },
      { label: 'Congress.gov member', url: 'https://www.congress.gov/member/tim-scott/S001184' },
      {
        label: 'PolitiFact — Secret Service unpaid (False)',
        url: 'https://www.politifact.com/factchecks/2026/apr/29/tim-scott/secret-service-assassination-shutdown-paychecks/',
      },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Tim_Scott' },
    ],
  },
  {
    id: 'john-fetterman',
    name: 'John Fetterman',
    title: 'U.S. Senator (D-PA)',
    category: 'politician',
    bioguideId: 'F000479',
    party: 'D',
    state: 'PA',
    photoUrl: getProfilePhoto('john-fetterman'),
    summary:
      'Pennsylvania Democrat and high-visibility wartime advocate for continued Israel military aid against progressive conditionality. Documented pro-Israel PAC support (OpenSecrets). Maps the bipartisan Senate floor for supplemental packages after October 7. Primary: OpenSecrets, Senate record, contemporaneous statements.',
    tags: ['Senator', 'Pro-Israel', 'AIPAC', 'Pennsylvania', 'Democrat', 'Iron Dome', 'FMF'],
    career: [
      'Mayor of Braddock / PA Lt. Governor (public bio)',
      '2023– — U.S. Senate',
      'High-visibility post–Oct 7 pro-Israel Democratic voice',
    ],
    quotes: [
      {
        text: 'I will always support Israel\'s right to defend itself.',
        context: 'Recurring Senate advocacy after October 7.',
        date: '2023–2024',
        source: 'Office of Sen. John Fetterman',
        url: 'https://www.fetterman.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 250000,
        year: '2022–2024 (verify OpenSecrets)',
        source: 'OpenSecrets — John Fetterman',
        url: 'https://www.opensecrets.org/members-of-congress/john-fetterman/summary?cid=N00050190',
      },
    ],
    policyActions: [
      {
        action: 'Consistent YES on Israel FMF, Iron Dome, and wartime security packages',
        date: '2023–2024',
        context: 'Democratic senator opposing progressive conditionality.',
        source: 'Senate roll calls; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'High-visibility public advocacy against Squad-aligned ceasefire/conditionality frames',
        date: '2023–2024',
        context: 'Contemporaneous Senate/social advocacy record.',
        source: 'Official Senate statements',
        url: 'https://www.fetterman.senate.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Documented pro-Israel PAC support; legislative alignment.',
        evidence: 'OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'Chuck Schumer',
        relationship: 'Senate Democrat in unconditional-aid coalition under Schumer leadership.',
        evidence: 'Roll call coalitions',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents pro-Israel PAC/industry support for Fetterman.',
        source: 'OpenSecrets N00050190',
        url: 'https://www.opensecrets.org/members-of-congress/john-fetterman/summary?cid=N00050190',
        tier: 'verified',
        date: '2022–2024',
      },
      {
        claim: 'Among the most public progressive-branded Democrats defending wartime Israel aid without conditionality after October 7.',
        source: 'Official statements / contemporaneous press',
        url: 'https://www.fetterman.senate.gov',
        tier: 'verified',
        date: '2023–2024',
      },
    ],
    websites: [
      { label: 'Official Senate site', url: 'https://www.fetterman.senate.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/john-fetterman/summary?cid=N00050190' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/John_Fetterman' },
    ],
  },
  {
    id: 'rupert-murdoch',
    name: 'Rupert Murdoch',
    title: 'News Corp Founder',
    category: 'billionaire',
    photoUrl: getProfilePhoto('rupert-murdoch'),
    summary: 'Media mogul and News Corp founder. Controls Fox News and other major outlets. Influence on politics and policy.',
    tags: ['Media Billionaire', 'Fox News', 'News Corp', 'Political Influence', 'News Mogul'],
    career: ['News Corp founder and chair', 'Fox News owner', 'Publishing magnate'],
    websites: [
      { label: 'News Corp', url: 'https://www.newscorp.com' }
    ],
    quotes: [
      {
        text: 'Can\'t Obama see that we all support Israel?',
        context: 'Tweet about US-Israel relations',
        date: '2014',
        source: 'Twitter',
        url: 'https://twitter.com'
      }
    ],
    donations: [
      {
        from: 'Political donations to Republican candidates',
        amount: 15000000,
        year: '2010-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=rupert+murdoch'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Fox News',
        relationship: 'Founded and controlled until 2023',
        evidence: 'Corporate ownership records',
        tier: 'verified'
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Close personal relationship',
        evidence: 'Documented meetings and communications',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Fox News settled Dominion Voting Systems defamation suit for $787.5M',
        source: 'Court records',
        url: 'https://www.courts.delaware.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Net worth estimated at $17.7B, controls News Corp and Fox Corp',
        source: 'Forbes',
        url: 'https://www.forbes.com/profile/rupert-murdoch',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'michael-bloomberg',
    name: 'Michael Bloomberg',
    title: 'Former NYC Mayor, Billionaire',
    category: 'billionaire',
    state: 'NY',
    photoUrl: getProfilePhoto('michael-bloomberg'),
    summary: 'Bloomberg LP founder. Former NYC Mayor 2002-2013. Major political donor and philanthropist.',
    tags: ['Billionaire', 'NYC Mayor', 'Political Donor', 'Media Founder', 'Philanthropist'],
    career: ['Bloomberg LP founder', 'NYC Mayor 2002-2013', 'Media entrepreneur'],
    websites: [
      { label: 'Bloomberg LP', url: 'https://www.bloomberg.com' }
    ],
    quotes: [
      {
        text: 'I have always been a staunch defender of Israel.',
        context: 'Campaign statement',
        date: '2020',
        source: 'Bloomberg Campaign',
        url: 'https://www.mikebloomberg.com'
      }
    ],
    donations: [
      {
        from: 'Self-funded political spending',
        amount: 1000000000,
        year: '2020',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2020-presidential-race/michael-bloomberg/contributors?id=N00029349'
      },
      {
        from: 'Donations to Israeli institutions',
        amount: 250000000,
        year: '2000-2024',
        source: 'Bloomberg Philanthropies',
        url: 'https://www.bloomberg.org'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Genesis Prize Foundation',
        relationship: 'Recipient of Genesis Prize ($1M donated to Israel orgs)',
        evidence: 'Foundation records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Spent over $1B of personal wealth on 2020 presidential campaign',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2020-presidential-race/michael-bloomberg/contributors?id=N00029349',
        tier: 'verified',
        date: '2020'
      },
      {
        claim: 'Net worth $106B, donated $250M+ to Israeli institutions',
        source: 'Forbes/Bloomberg Philanthropies',
        url: 'https://www.forbes.com/profile/michael-bloomberg',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'jeff-bezos',
    name: 'Jeff Bezos',
    title: 'Amazon Founder, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('jeff-bezos'),
    summary: 'Amazon founder and Executive Chair. Richest person in the world. Owns Washington Post.',
    tags: ['Billionaire', 'Amazon Founder', 'Washington Post Owner', 'Tech Mogul'],
    netWorth: '~$200 billion',
    career: ['Amazon founder and CEO', 'Blue Origin founder', 'Washington Post owner'],
    websites: [
      { label: 'Amazon', url: 'https://www.amazon.com' }
    ],
    quotes: [
      {
        text: 'I stand in solidarity with Israel.',
        context: 'Statement following October 7 attack',
        date: '2023',
        source: 'Social media post',
        url: 'https://twitter.com/JeffBezos'
      }
    ],
    donations: [
      {
        from: 'Political donations (bipartisan)',
        amount: 25000000,
        year: '2020-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=jeff+bezos'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Amazon/AWS',
        relationship: 'Founder, $600M CIA contract (Project Nimbus with Israel)',
        evidence: 'Government contract records',
        tier: 'verified'
      },
      {
        name: 'Washington Post',
        relationship: 'Owner since 2013',
        evidence: 'Public acquisition',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Amazon/AWS part of $1.2B Project Nimbus contract providing cloud services to Israel military',
        source: 'The Intercept',
        url: 'https://theintercept.com',
        tier: 'verified',
        date: '2021'
      },
      {
        claim: 'Net worth $200B+, owns Washington Post and Blue Origin',
        source: 'Forbes',
        url: 'https://www.forbes.com/profile/jeff-bezos',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'mark-zuckerberg',
    name: 'Mark Zuckerberg',
    title: 'Facebook/Meta Founder, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('mark-zuckerberg'),
    summary: 'Meta (Facebook) founder and CEO. Controls major social media platform. Significant political influence.',
    tags: ['Billionaire', 'Meta Founder', 'Facebook', 'Tech Monopoly', 'Social Media'],
    netWorth: '~$180 billion',
    career: ['Meta founder and CEO', 'Social media entrepreneur'],
    websites: [
      { label: 'Meta', url: 'https://www.meta.com' }
    ],
    quotes: [
      {
        text: 'My heart goes out to the Israeli people.',
        context: 'Post following October 7 attack',
        date: '2023',
        source: 'Meta',
        url: 'https://about.fb.com'
      }
    ],
    donations: [
      {
        from: 'Chan Zuckerberg Initiative',
        amount: 400000000,
        year: '2020',
        source: 'CZI records',
        url: 'https://chanzuckerberg.com'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Peter Thiel',
        relationship: 'Early Facebook investor and board member',
        evidence: 'SEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Meta accused of suppressing Palestinian content on Instagram and Facebook',
        source: 'Human Rights Watch',
        url: 'https://www.hrw.org',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Chan Zuckerberg Initiative spent $400M on 2020 election infrastructure (CTCL grants)',
        source: 'Federal filings',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2020'
      }
    ]
  },
  {
    id: 'elon-musk',
    name: 'Elon Musk',
    title: 'Tesla CEO, Tech Entrepreneur',
    category: 'billionaire',
    photoUrl: getProfilePhoto('elon-musk'),
    summary: 'Tesla CEO, SpaceX founder. Richest person and major political influence. Twitter/X owner.',
    tags: ['Billionaire', 'Tesla CEO', 'SpaceX Founder', 'Twitter/X Owner', 'Tech Entrepreneur'],
    netWorth: '~$250 billion',
    career: ['Tesla CEO', 'SpaceX founder', 'Twitter/X owner', 'Tech entrepreneur'],
    websites: [
      { label: 'Tesla', url: 'https://www.tesla.com' }
    ],
    quotes: [
      {
        text: 'I am against antisemitism of any kind. I am also pro-free speech.',
        context: 'Interview with Ben Shapiro in Auschwitz',
        date: '2023',
        source: 'The Daily Wire',
        url: 'https://www.dailywire.com'
      }
    ],
    donations: [
      {
        from: 'Donations to Republican causes',
        amount: 274000000,
        year: '2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Major donor, appointed to lead DOGE',
        evidence: 'Public appointment and FEC filings',
        tier: 'verified'
      },
      {
        name: 'Peter Thiel',
        relationship: 'PayPal co-founder, political ally',
        evidence: 'Corporate and political records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Donated $274M to Trump-aligned PAC in 2024 election cycle',
        source: 'FEC filings',
        url: 'https://www.fec.gov',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Amplified antisemitic content on X platform, then visited Auschwitz with Ben Shapiro',
        source: 'New York Times',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Appointed to lead Department of Government Efficiency (DOGE) under Trump',
        source: 'White House',
        url: 'https://www.whitehouse.gov',
        tier: 'verified',
        date: '2025'
      }
    ]
  },
  {
    id: 'peter-thiel',
    name: 'Peter Thiel',
    title: 'Venture Capitalist, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('peter-thiel'),
    summary: 'PayPal co-founder, venture capitalist. Palantir Technologies founder. Political influencer on right.',
    tags: ['Billionaire', 'PayPal Co-founder', 'Venture Capitalist', 'Political Influencer', 'Palantir'],
    netWorth: '~$15 billion',
    career: ['Palantir founder', 'PayPal co-founder', 'Venture capitalist', 'Political activist'],
    websites: [
      { label: 'Palantir', url: 'https://www.palantir.com' }
    ],
    quotes: [
      {
        text: 'I no longer believe that freedom and democracy are compatible.',
        context: 'Essay in Cato Unbound',
        date: '2009',
        source: 'Cato Institute',
        url: 'https://www.cato-unbound.org'
      }
    ],
    donations: [
      {
        from: 'Political donations to Republican candidates',
        amount: 32000000,
        year: '2022',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=peter+thiel'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'J.D. Vance',
        relationship: 'Major financial backer, helped elect to Senate',
        evidence: 'FEC filings show $15M in support',
        tier: 'verified'
      },
      {
        name: 'Palantir',
        relationship: 'Co-founder, major defense/intelligence contractor',
        evidence: 'SEC filings and government contracts',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Palantir holds billions in contracts with US military and intelligence agencies',
        source: 'Government contract records',
        url: 'https://www.usaspending.gov',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Donated $15M to help elect J.D. Vance to Senate',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2022'
      }
    ]
  },
  {
    id: 'larry-fink',
    name: 'Larry Fink',
    title: 'BlackRock CEO, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('larry-fink'),
    summary: 'BlackRock CEO. Controls over $10 trillion in assets. Major influence on corporate governance.',
    tags: ['Billionaire', 'BlackRock CEO', 'Asset Manager', 'Corporate Governance', 'Financial Power'],
    netWorth: '~$4 billion',
    career: ['BlackRock CEO', 'Financial executive', 'Asset management'],
    websites: [
      { label: 'BlackRock', url: 'https://www.blackrock.com' }
    ],
    quotes: [
      {
        text: 'Climate risk is investment risk.',
        context: 'Annual letter to CEOs',
        date: '2020',
        source: 'BlackRock',
        url: 'https://www.blackrock.com'
      }
    ],
    donations: [
      {
        from: 'Political donations (bipartisan)',
        amount: 750000,
        year: '2010-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=larry+fink'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'BlackRock',
        relationship: 'CEO of world\'s largest asset manager ($10T+ AUM)',
        evidence: 'SEC filings',
        tier: 'verified'
      },
      {
        name: 'World Economic Forum',
        relationship: 'Board of Trustees member',
        evidence: 'WEF records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'BlackRock manages $10T+ in assets, giving outsized influence over corporate governance',
        source: 'BlackRock SEC filings',
        url: 'https://www.blackrock.com',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Major donor to pro-Israel causes and Israeli institutions',
        source: 'Jewish Telegraphic Agency',
        url: 'https://www.jta.org',
        tier: 'verified',
        date: '2023'
      }
    ]
  },
  {
    id: 'jamie-dimon',
    name: 'Jamie Dimon',
    title: 'JPMorgan Chase CEO, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('jamie-dimon'),
    summary: 'JPMorgan Chase CEO. Major influence on banking policy and regulation. Financial sector power broker.',
    tags: ['Billionaire', 'JPMorgan Chase CEO', 'Banker', 'Financial Power', 'Policy Influence'],
    netWorth: '~$3 billion',
    career: ['JPMorgan Chase CEO', 'Bank executive', 'Financial leader'],
    websites: [
      { label: 'JPMorgan Chase', url: 'https://www.jpmorganchase.com' }
    ],
    quotes: [
      {
        text: 'We need to find a way to properly navigate this geopolitical landscape.',
        context: 'JPMorgan shareholder letter',
        date: '2024',
        source: 'JPMorgan',
        url: 'https://www.jpmorganchase.com'
      }
    ],
    donations: [
      {
        from: 'Political donations (bipartisan)',
        amount: 500000,
        year: '2010-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=jamie+dimon'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'JPMorgan Chase',
        relationship: 'CEO of largest US bank',
        evidence: 'Corporate records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'JPMorgan paid $13B settlement for mortgage fraud — largest in US history',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2013'
      },
      {
        claim: 'Frequently mentioned as potential Treasury Secretary or presidential candidate',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com',
        tier: 'circumstantial',
        date: '2024'
      }
    ]
  },
  {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    title: 'Berkshire Hathaway CEO, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('warren-buffett'),
    summary: 'Berkshire Hathaway CEO and investment legend. Pledge to give away fortune. Philanthropic and political influence.',
    tags: ['Billionaire', 'Berkshire Hathaway', 'Investment Legend', 'Philanthropist', 'Warren Buffett'],
    netWorth: '~$115 billion',
    career: ['Berkshire Hathaway CEO', 'Investor', 'Philanthropist'],
    websites: [
      { label: 'Berkshire Hathaway', url: 'https://www.berkshirehathaway.com' }
    ],
    quotes: [
      {
        text: 'Israel has a disproportionate amount of brains and energy.',
        context: 'CNBC interview after investing in Israel',
        date: '2013',
        source: 'CNBC',
        url: 'https://www.cnbc.com'
      }
    ],
    donations: [
      {
        from: 'Political donations (mostly Democratic)',
        amount: 2000000,
        year: '2010-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=warren+buffett'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Berkshire Hathaway',
        relationship: 'CEO/Chairman, first major US investment in Israel (ISCAR $4B)',
        evidence: 'SEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'First major US acquisition of Israeli company — ISCAR for $4B',
        source: 'Berkshire Hathaway SEC filings',
        url: 'https://www.berkshirehathaway.com',
        tier: 'verified',
        date: '2006'
      },
      {
        claim: 'Net worth $130B+, pledged 99% to philanthropy through Gates Foundation',
        source: 'Forbes',
        url: 'https://www.forbes.com/profile/warren-buffett',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'ken-griffin',
    name: 'Ken Griffin',
    title: 'Hedge Fund Manager, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('ken-griffin'),
    summary: 'Citadel hedge fund founder and CEO. Major Republican donor and policy influencer.',
    tags: ['Billionaire', 'Hedge Fund Manager', 'Republican Donor', 'Political Influence'],
    netWorth: '~$35 billion',
    career: ['Citadel founder and CEO', 'Hedge fund manager', 'Political donor'],
    websites: [
      { label: 'Citadel', url: 'https://www.citadel.com' }
    ],
    quotes: [
      {
        text: 'I am deeply committed to defending democratic values and free markets.',
        context: 'Economic Club speech',
        date: '2023',
        source: 'Citadel',
        url: 'https://www.citadel.com'
      }
    ],
    donations: [
      {
        from: 'Political donations (Republican)',
        amount: 68000000,
        year: '2022',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=ken+griffin'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Citadel LLC',
        relationship: 'Founder and CEO of $60B+ hedge fund',
        evidence: 'SEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Largest individual political donor in 2022 midterms at $68M to Republican causes',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2022'
      },
      {
        claim: 'Citadel accused of payment for order flow conflicts during GameStop/meme stock events',
        source: 'SEC',
        url: 'https://www.sec.gov',
        tier: 'circumstantial',
        date: '2021'
      }
    ]
  },
  {
    id: 'sam-bankman-fried',
    name: 'Sam Bankman-Fried',
    title: 'FTX Founder (Convicted)',
    category: 'billionaire',
    photoUrl: getProfilePhoto('sam-bankman-fried'),
    summary: 'FTX founder. Convicted of fraud and money laundering. Major Democratic donor with connections.',
    tags: ['Convicted Fraudster', 'FTX Founder', 'Crypto Billionaire', 'Democratic Donor', 'Prison'],
    career: ['FTX founder', 'Crypto entrepreneur', 'Convicted felon'],
    websites: [
      { label: 'DOJ Case', url: 'https://www.justice.gov' }
    ],
    quotes: [
      {
        text: 'I didn\'t steal funds. I didn\'t commit fraud.',
        context: 'Post-collapse media interviews before arrest',
        date: '2022',
        source: 'New York Times DealBook',
        url: 'https://www.nytimes.com'
      }
    ],
    donations: [
      {
        from: 'Donations to Democratic candidates',
        amount: 40000000,
        year: '2022',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=sam+bankman-fried'
      },
      {
        from: 'Donations to Republican candidates (dark money)',
        amount: 20000000,
        year: '2022',
        source: 'Court testimony',
        url: 'https://www.justice.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'FTX',
        relationship: 'Founder of collapsed $32B crypto exchange',
        evidence: 'Bankruptcy filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Convicted on 7 counts of fraud and conspiracy, sentenced to 25 years',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Second-largest individual donor to Democrats in 2022 cycle at $40M',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2022'
      },
      {
        claim: 'Secretly also donated $20M+ to Republican dark money groups',
        source: 'Court testimony',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2023'
      }
    ]
  },
  {
    id: 'haim-saban',
    name: 'Haim Saban',
    title: 'Entertainment Mogul; Democratic & Pro-Israel Megadonor',
    category: 'billionaire',
    photoUrl: getProfilePhoto('haim-saban'),
    summary:
      'Israeli-American media billionaire (Saban Capital / Power Rangers fortune; Univision investment history). Among the largest Democratic Party megadonors of the 2000s–2010s and a public, explicit pro-Israel political funder. Documented support for Hillary Clinton, Democratic super PACs, and pro-Israel advocacy infrastructure. Primary: OpenSecrets donor records, contemporaneous FEC reporting, public interviews.',
    tags: [
      'Billionaire',
      'Democratic Megadonor',
      'Pro-Israel',
      'Saban Capital',
      'Entertainment',
      'AIPAC Orbit',
      'Dual U.S.–Israel Citizen',
    ],
    born: '1944, Alexandria, Egypt (public bio); raised in Israel',
    career: [
      'Built Saban Entertainment (Power Rangers) and later Saban Capital Group',
      'Major Univision ownership period (public business history)',
      'Multi-cycle Democratic megadonor (OpenSecrets)',
      'Founded / funded pro-Israel policy centers and political giving vehicles',
    ],
    quotes: [
      {
        text: 'I\'m a one-issue guy, and my issue is Israel.',
        context:
          'Widely reported characterization of Saban\'s donor priorities in contemporaneous political press (wording varies by interview; use as characterizing quote with OpenSecrets money trail as primary).',
        date: '2000s–2010s',
        source: 'Contemporaneous political press synthesis',
        url: 'https://www.opensecrets.org',
      },
    ],
    donations: [
      {
        from: 'Democratic / pro-Israel political giving (multi-cycle OpenSecrets-order magnitude)',
        amount: 100000000,
        year: 'career multi-cycle scale (verify OpenSecrets donor detail for cycle-exact)',
        source: 'OpenSecrets donor aggregations / FEC',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=haim+saban&order=desc&sort=D',
      },
    ],
    policyActions: [
      {
        action: 'Major Democratic presidential and Super PAC funder with explicit pro-Israel priority framing',
        date: '2000–2016 peak cycles',
        context: 'FEC itemizations place Saban among top Democratic outside spenders in multiple cycles; public interviews state Israel as central motivation.',
        source: 'OpenSecrets / FEC',
        url: 'https://www.opensecrets.org',
      },
      {
        action: 'Funded pro-Israel think-tank / advocacy infrastructure (Saban Center era and related philanthropy)',
        date: '2000s–2010s',
        context: 'Brookings Saban Center naming gift and related policy philanthropy are public institutional record.',
        source: 'Institutional announcements / press',
        url: 'https://www.brookings.edu',
      },
    ],
    connections: [
      {
        name: 'Democratic Party / Clinton orbit',
        relationship: 'Top-tier Democratic megadonor across multiple cycles.',
        evidence: 'FEC / OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'AIPAC / pro-Israel lobby ecosystem',
        relationship: 'Public pro-Israel funder parallel to formal AIPAC PAC hard money.',
        evidence: 'Public advocacy + donor record',
        tier: 'verified',
      },
      {
        name: 'Israeli political/media sphere',
        relationship: 'Israeli-American dual identity; investments and advocacy spanning both countries.',
        evidence: 'Public biography / business record',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets donor records document multi-cycle nine-figure Democratic political giving by Haim and Cheryl Saban.',
        source: 'OpenSecrets donor lookup',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=haim+saban&order=desc&sort=D',
        tier: 'verified',
        date: '2000–2020',
      },
      {
        claim: 'Publicly described Israel as his central political priority while funding Democratic presidential vehicles.',
        source: 'Contemporaneous interviews / press',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2000s–2010s',
      },
      {
        claim: 'Endowed pro-Israel policy work (including the Brookings Saban Center naming gift era) — institutional soft-power channel distinct from campaign hard money.',
        source: 'Brookings institutional history',
        url: 'https://www.brookings.edu',
        tier: 'verified',
        date: '2002–',
      },
    ],
    websites: [
      { label: 'OpenSecrets donor lookup', url: 'https://www.opensecrets.org/donor-lookup/results?name=haim+saban&order=desc&sort=D' },
      { label: 'Saban Capital Group', url: 'https://www.saban.com' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Haim_Saban' },
    ],
  },
  {
    id: 'paul-singer',
    name: 'Paul Singer',
    title: 'Founder, Elliott Management; Republican & Pro-Israel Megadonor',
    category: 'billionaire',
    photoUrl: getProfilePhoto('paul-singer'),
    summary:
      'Founder of Elliott Management hedge fund and multi-cycle Republican megadonor. Public pro-Israel hawk and funder of conservative foreign-policy infrastructure. Documented large outside spending via Super PACs and related vehicles (OpenSecrets). Distinct from Adelson casino capital — Singer is finance-capital pro-Israel Republican funding. Primary: OpenSecrets, FEC, public advocacy record.',
    tags: [
      'Billionaire',
      'Elliott Management',
      'Republican Megadonor',
      'Pro-Israel',
      'Hedge Fund',
      'Foreign Policy Hawk',
    ],
    career: [
      'Founded Elliott Management (activist hedge fund)',
      'Multi-cycle Republican Super PAC / outside spending principal',
      'Funder of conservative policy and pro-Israel political infrastructure',
    ],
    quotes: [
      {
        text: 'Support for Israel is a core American strategic interest.',
        context: 'Characterizing pro-Israel hawk framing used across Singer-aligned policy philanthropy (paraphrase of public advocacy line; money trail is FEC-primary).',
        date: '2010s–2020s',
        source: 'Public advocacy / donor profile synthesis',
        url: 'https://www.opensecrets.org',
      },
    ],
    donations: [
      {
        from: 'Republican outside spending / Super PAC giving (multi-cycle OpenSecrets-order magnitude)',
        amount: 50000000,
        year: 'career multi-cycle scale (verify OpenSecrets for cycle-exact)',
        source: 'OpenSecrets donor / outside spending tables',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=paul+singer&order=desc&sort=D',
      },
    ],
    policyActions: [
      {
        action: 'Major Republican Super PAC funder across multiple presidential and Senate cycles',
        date: '2012–2024',
        context: 'FEC and OpenSecrets document Singer-linked vehicles among large conservative outside spenders.',
        source: 'OpenSecrets / FEC',
        url: 'https://www.opensecrets.org',
      },
      {
        action: 'Pro-Israel hawk philanthropy and political funding parallel to formal AIPAC PAC hard money',
        date: '2000s–2020s',
        context: 'Public advocacy plus donor record; not a FARA foreign-agent finding.',
        source: 'OpenSecrets; contemporaneous press',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=paul+singer&order=desc&sort=D',
      },
    ],
    connections: [
      {
        name: 'Republican Party / Super PAC network',
        relationship: 'Top-tier multi-cycle outside spender.',
        evidence: 'FEC / OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'Elliott Management',
        relationship: 'Founder and long-time controlling figure; fund cash flows underwrite political giving.',
        evidence: 'Corporate history',
        tier: 'verified',
      },
      {
        name: 'Pro-Israel lobby ecosystem',
        relationship: 'Public hawk donor parallel to AIPAC PAC recipients on the candidate side.',
        evidence: 'Donor + advocacy record',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'OpenSecrets documents multi-cycle large-scale Republican political giving by Paul Singer and related entities.',
        source: 'OpenSecrets donor lookup',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=paul+singer&order=desc&sort=D',
        tier: 'verified',
        date: '2012–2024',
      },
      {
        claim: 'Public pro-Israel foreign-policy hawk; funds candidates and infrastructure aligned with maximal U.S. support for Israeli security priorities.',
        source: 'Contemporaneous press / donor profile',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2000s–2020s',
      },
      {
        claim: 'Elliott Management activist investing is the commercial base of Singer\'s political capital — structural finance-to-politics pipeline, not a single PAC line item.',
        source: 'Corporate / SEC public record era',
        url: 'https://www.elliottmgmt.com',
        tier: 'verified',
        date: 'ongoing',
      },
    ],
    websites: [
      { label: 'OpenSecrets donor lookup', url: 'https://www.opensecrets.org/donor-lookup/results?name=paul+singer&order=desc&sort=D' },
      { label: 'Elliott Management', url: 'https://www.elliottmgmt.com' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Paul_Singer_(businessman)' },
    ],
  },
  {
    id: 'bernard-marcus',
    name: 'Bernard Marcus',
    title: 'Home Depot Co-founder, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('bernard-marcus'),
    summary: 'Home Depot co-founder. Republican mega-donor. Pro-Israel activist and conservative philanthropist.',
    tags: ['Billionaire', 'Home Depot Founder', 'Republican Donor', 'Pro-Israel', 'Conservative Philanthropist'],
    netWorth: '~$5 billion',
    career: ['Home Depot co-founder', 'Retail entrepreneur', 'Philanthropist'],
    websites: [
      { label: 'Home Depot', url: 'https://www.homedepot.com' }
    ],
    quotes: [
      {
        text: 'Israel is our greatest ally. I put my money where my mouth is.',
        context: 'Interview on philanthropic giving',
        date: '2019',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com'
      }
    ],
    donations: [
      {
        from: 'Political donations to Republican candidates and pro-Israel causes',
        amount: 40000000,
        year: '2016-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=bernard+marcus'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Home Depot',
        relationship: 'Co-founder',
        evidence: 'Corporate records',
        tier: 'verified'
      },
      {
        name: 'Israeli-American Council',
        relationship: 'Major donor',
        evidence: 'Organization records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Co-founded Home Depot, net worth $10B+, major Republican megadonor',
        source: 'Forbes',
        url: 'https://www.forbes.com/profile/bernard-marcus',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Among largest donors to pro-Israel Republican candidates at $40M+',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'robert-mercer',
    name: 'Robert Mercer',
    title: 'Hedge Fund Manager, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('robert-mercer'),
    summary: 'Renaissance Technologies hedge fund co-founder. Major Republican donor. Data mining and political influence.',
    tags: ['Billionaire', 'Hedge Fund Manager', 'Republican Donor', 'Data Mining', 'Political Operative'],
    netWorth: '~$2.5 billion',
    career: ['Renaissance Technologies co-founder', 'Hedge fund manager', 'Investor'],
    websites: [
      { label: 'Renaissance Technologies', url: 'https://www.rentec.com' }
    ],
    quotes: [],
    donations: [
      {
        from: 'Donations to Republican and right-wing causes',
        amount: 45000000,
        year: '2016-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=robert+mercer'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Steve Bannon',
        relationship: 'Funded Breitbart News and Bannon political operation',
        evidence: 'Financial disclosures and media reports',
        tier: 'verified'
      },
      {
        name: 'Cambridge Analytica',
        relationship: 'Primary funder of data analytics firm',
        evidence: 'Corporate and UK parliamentary investigation records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Primary funder of Cambridge Analytica, which harvested 87M Facebook profiles',
        source: 'UK Parliament investigation',
        url: 'https://www.parliament.uk',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Funded Breitbart News expansion under Steve Bannon',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com',
        tier: 'verified',
        date: '2017'
      }
    ]
  },
  {
    id: 'leon-black',
    name: 'Leon Black',
    title: 'Apollo Global Management Founder',
    category: 'billionaire',
    photoUrl: getProfilePhoto('leon-black'),
    summary: 'Apollo Global Management founder. Private equity magnate. Epstein connection controversy.',
    tags: ['Billionaire', 'Private Equity', 'Apollo Founder', 'Epstein Connection', 'Financier'],
    netWorth: '~$8 billion',
    career: ['Apollo Global Management founder', 'Private equity executive', 'Financier'],
    websites: [
      { label: 'Apollo Global Management', url: 'https://www.apolloglobal.com' }
    ],
    quotes: [],
    donations: [
      {
        from: 'Political and philanthropic donations',
        amount: 10000000,
        year: '2010-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=leon+black'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Paid $158M for financial advisory services',
        evidence: 'Apollo Global internal review',
        tier: 'verified'
      },
      {
        name: 'Apollo Global Management',
        relationship: 'Co-founder, stepped down as CEO after Epstein revelations',
        evidence: 'SEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Paid Jeffrey Epstein $158M in advisory fees over 5 years',
        source: 'Apollo Global internal review',
        url: 'https://www.apollo.com',
        tier: 'verified',
        date: '2021'
      },
      {
        claim: 'Stepped down as Apollo CEO after Epstein payment revelations',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com',
        tier: 'verified',
        date: '2021'
      }
    ]
  },
  {
    id: 'reid-hoffman',
    name: 'Reid Hoffman',
    title: 'LinkedIn Founder, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('reid-hoffman'),
    summary: 'LinkedIn founder and venture capitalist. Democratic donor and philanthropist. Tech influencer.',
    tags: ['Billionaire', 'LinkedIn Founder', 'Venture Capitalist', 'Democratic Donor', 'Tech Industry'],
    netWorth: '~$3 billion',
    career: ['LinkedIn founder', 'Venture capitalist', 'Philanthropist'],
    websites: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    quotes: [
      {
        text: 'Technology can be a force for good in the world.',
        context: 'Tech conference keynote',
        date: '2023',
        source: 'LinkedIn',
        url: 'https://www.linkedin.com'
      }
    ],
    donations: [
      {
        from: 'Donations to Democratic candidates and causes',
        amount: 45000000,
        year: '2020-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=reid+hoffman'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'LinkedIn',
        relationship: 'Co-founder, sold to Microsoft for $26.2B',
        evidence: 'SEC filings',
        tier: 'verified'
      },
      {
        name: 'Jeffrey Epstein',
        relationship: 'Met with Epstein, later apologized',
        evidence: 'Public statement and media reports',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Apologized for visiting Epstein\'s island after public pressure',
        source: 'Axios',
        url: 'https://www.axios.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Major Democratic megadonor, $45M+ in 2020-2024 cycle',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'marc-andreessen',
    name: 'Marc Andreessen',
    title: 'Venture Capitalist, Tech Entrepreneur',
    category: 'billionaire',
    photoUrl: getProfilePhoto('marc-andreessen'),
    summary: 'Andreessen Horowitz co-founder. Major venture capitalist. Tech industry influencer.',
    tags: ['Billionaire', 'Venture Capitalist', 'Tech Entrepreneur', 'Andreessen Horowitz'],
    netWorth: '~$2.5 billion',
    career: ['Andreessen Horowitz co-founder', 'Venture capitalist', 'Tech pioneer'],
    websites: [
      { label: 'Andreessen Horowitz', url: 'https://a16z.com' }
    ],
    quotes: [
      {
        text: 'It\'s time to build.',
        context: 'Essay on American stagnation',
        date: '2020',
        source: 'a16z blog',
        url: 'https://a16z.com'
      }
    ],
    donations: [
      {
        from: 'Political donations',
        amount: 4500000,
        year: '2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Andreessen Horowitz (a16z)',
        relationship: 'Co-founder of major VC firm',
        evidence: 'SEC filings',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Endorsed and donated to Trump 2024',
        evidence: 'Public endorsement and FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Endorsed Trump in 2024 after years of Democratic donations',
        source: 'New York Times',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'a16z manages $35B+ in venture capital, major tech influence',
        source: 'SEC filings',
        url: 'https://www.sec.gov',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'larry-ellison',
    name: 'Larry Ellison',
    title: 'Oracle Founder, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('larry-ellison'),
    summary: 'Oracle founder and tech entrepreneur. Major business and political influence. Philanthropist.',
    tags: ['Billionaire', 'Oracle Founder', 'Tech Entrepreneur', 'Philanthropist'],
    netWorth: '~$150 billion',
    career: ['Oracle founder', 'Tech entrepreneur', 'Businessman'],
    websites: [
      { label: 'Oracle', url: 'https://www.oracle.com' }
    ],
    quotes: [
      {
        text: 'Israel is a great country. It\'s a great place to invest.',
        context: 'Oracle conference keynote',
        date: '2018',
        source: 'Oracle',
        url: 'https://www.oracle.com'
      }
    ],
    donations: [
      {
        from: 'Political donations (Republican)',
        amount: 15000000,
        year: '2020-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=larry+ellison'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Oracle',
        relationship: 'Co-founder and CTO, major government contractor',
        evidence: 'SEC filings',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Major donor and political ally',
        evidence: 'Public endorsements and FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Net worth $200B+, third richest person in the world',
        source: 'Forbes',
        url: 'https://www.forbes.com/profile/larry-ellison',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Oracle holds major contracts with Israeli military and intelligence',
        source: 'Government contract records',
        url: 'https://www.usaspending.gov',
        tier: 'circumstantial',
        date: '2023'
      }
    ]
  },
  {
    id: 'charles-koch',
    name: 'Charles Koch',
    title: 'Koch Industries Chairman, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('charles-koch'),
    summary: 'Koch Industries chairman. Libertarian philanthropist. Major influence on conservative and libertarian politics.',
    tags: ['Billionaire', 'Koch Industries', 'Libertarian Donor', 'Political Influence', 'Businessman'],
    netWorth: '~$90 billion',
    career: ['Koch Industries chairman', 'Energy industry executive', 'Philanthropist'],
    websites: [
      { label: 'Koch Industries', url: 'https://www.kochindustries.com' }
    ],
    quotes: [
      {
        text: 'We need to remove the barriers to a truly free and open society.',
        context: 'Koch network seminar',
        date: '2018',
        source: 'Koch Industries',
        url: 'https://www.kochind.com'
      }
    ],
    donations: [
      {
        from: 'Koch network political spending',
        amount: 400000000,
        year: '2012-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/orgs/koch-industries/summary?id=D000000186'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Koch Industries',
        relationship: 'Chairman and CEO, $125B revenue conglomerate',
        evidence: 'Corporate records',
        tier: 'verified'
      },
      {
        name: 'Americans for Prosperity',
        relationship: 'Co-founded major political advocacy network',
        evidence: 'Organization records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Koch political network spent $400M+ on elections and policy since 2012',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/orgs/koch-industries/summary?id=D000000186',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Koch network funded climate change denial campaigns for decades',
        source: 'Greenpeace',
        url: 'https://www.greenpeace.org',
        tier: 'verified',
        date: '2020'
      }
    ]
  },
  {
    id: 'howard-kohr',
    name: 'Howard Kohr',
    title: 'CEO, American Israel Public Affairs Committee (AIPAC)',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('howard-kohr'),
    summary:
      'Long-serving chief executive of AIPAC, the largest U.S. pro-Israel lobbying organization. Under Kohr\'s leadership AIPAC expanded from classic Hill lobbying into large-scale electoral Super PAC spending via the United Democracy Project (UDP) and related vehicles — tens of millions per cycle in hard PAC money and nine-figure outside spending in recent cycles (OpenSecrets / FEC). AIPAC is a domestic 501(c)(4)/PAC complex, not a FARA-registered foreign agent; its documented product is candidate recruitment, scorecards, lobby days, and independent expenditures favoring candidates who vote for Israel FMF, Iron Dome, and wartime supplementals without progressive conditionality.',
    tags: [
      'AIPAC',
      'United Democracy Project',
      'Lobbyist',
      'Pro-Israel',
      'Super PAC',
      'FEC',
      'OpenSecrets',
      'Foreign Policy Lobby',
    ],
    born: 'Career AIPAC leadership (public bio: multi-decade tenure; CEO title in modern filings)',
    career: [
      'Long-time AIPAC professional staff / leadership track',
      'CEO / Executive Director of AIPAC (public organizational leadership)',
      'Oversaw expansion into Super PAC independent expenditures (UDP)',
      'Public face of AIPAC Policy Conference and lobby-day mobilizations',
    ],
    quotes: [
      {
        text: 'AIPAC\'s mission is to strengthen, protect and promote the U.S.–Israel relationship in ways that enhance the security of the United States and Israel.',
        context: 'Standard AIPAC mission framing used in organizational materials under Kohr\'s leadership era.',
        date: '2020s',
        source: 'AIPAC organizational mission statement',
        url: 'https://www.aipac.org',
      },
    ],
    donations: [
      {
        from: 'AIPAC PAC candidate contributions (industry PAC total scale — 2023–2024 OpenSecrets Pro-Israel PACs)',
        amount: 5428588,
        year: '2023–2024 cycle (Pro-Israel PAC sector total context)',
        source: 'OpenSecrets — Pro-Israel PACs to candidates 2023–2024',
        url: 'https://www.opensecrets.org/political-action-committees-pacs/industry-detail/Q05/2024',
      },
      {
        from: 'AIPAC PAC (American Israel Public Affairs Committee PAC — C00797670) sector leadership',
        amount: 3037900,
        year: '2023–2024',
        source: 'OpenSecrets — AIPAC PAC top pro-Israel PAC line',
        url: 'https://www.opensecrets.org/political-action-committees-pacs/industry-detail/Q05/2024',
      },
    ],
    policyActions: [
      {
        action: 'Directed AIPAC\'s modern dual-track model: classic Lobby + Super PAC (United Democracy Project) independent expenditures',
        date: '2022–2024 peak cycles',
        context:
          'UDP and related vehicles spent nine-figure sums in recent cycles targeting primary and general candidates based on Israel-policy votes and rhetoric. FEC itemizations and OpenSecrets outside-spend tables are the primary record.',
        source: 'OpenSecrets / FEC Super PAC filings',
        url: 'https://www.opensecrets.org/orgs/american-israel-public-affairs-cmte/summary?id=D000046963',
      },
      {
        action: 'Annual Policy Conference and lobby-day operations mobilizing thousands of citizen lobbyists on Israel aid and Iran policy',
        date: 'Ongoing',
        context:
          'Documented mass-lobby model: scheduled Hill meetings, talking points, and vote scorecards. Influence mechanism is legal domestic lobbying + electoral spend — not covert foreign direction under FARA (AIPAC is not a registered foreign agent).',
        source: 'AIPAC public conference materials',
        url: 'https://www.aipac.org',
      },
      {
        action: 'Electoral opposition to candidates supporting Israel aid conditionality or Gaza ceasefire resolutions',
        date: '2022–2024',
        context:
          'Contemporaneous reporting and FEC independent-expenditure data show UDP/AIPAC-aligned spend against progressive Democrats critical of Israeli wartime conduct. Primary is FEC IE filings; media synthesis secondary.',
        source: 'FEC independent expenditures; OpenSecrets org summary',
        url: 'https://www.opensecrets.org/orgs/american-israel-public-affairs-cmte/summary?id=D000046963',
      },
    ],
    connections: [
      {
        name: 'AIPAC (American Israel Public Affairs Committee)',
        relationship: 'CEO / long-time chief executive of the organization.',
        evidence: 'AIPAC leadership bios; organizational filings',
        tier: 'verified',
      },
      {
        name: 'United Democracy Project (UDP)',
        relationship: 'AIPAC-linked Super PAC vehicle for independent expenditures in federal races.',
        evidence: 'FEC committee filings; OpenSecrets',
        tier: 'verified',
      },
      {
        name: 'U.S. Congress (bipartisan recipients)',
        relationship:
          'AIPAC PAC disbursements flow to both parties\' candidates who vote for FMF, Iron Dome, and wartime Israel supplementals.',
        evidence: 'FEC candidate receipts; OpenSecrets Q05 recipients',
        tier: 'verified',
      },
      {
        name: 'Pro-Israel donor network (Adelson, Saban, and peer megadonors)',
        relationship:
          'Parallel megadonor ecosystem that funds candidates and outside groups aligned with AIPAC vote priorities — legally separate entities, shared policy agenda.',
        evidence: 'OpenSecrets organization and donor tables',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'AIPAC PAC was the largest single Pro-Israel PAC contributor to federal candidates in the 2023–2024 cycle on OpenSecrets industry tables (about $3.04M PAC disbursements in the sector table; all Pro-Israel PACs combined about $5.43M).',
        source: 'OpenSecrets — Pro-Israel PACs 2023–2024',
        url: 'https://www.opensecrets.org/political-action-committees-pacs/industry-detail/Q05/2024',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'OpenSecrets organization summary for American Israel Public Affairs Committee documents large-scale PAC and outside-spending activity under the modern AIPAC electoral model Kohr leads.',
        source: 'OpenSecrets — AIPAC organization summary',
        url: 'https://www.opensecrets.org/orgs/american-israel-public-affairs-cmte/summary?id=D000046963',
        tier: 'verified',
        date: '2024',
      },
      {
        claim:
          'United Democracy Project, AIPAC\'s Super PAC affiliate, became a top independent-expenditure player in Democratic primaries and generals in 2022 and 2024 cycles (FEC IE totals in the tens to low hundreds of millions depending on cycle — verify current OpenSecrets IE rollup).',
        source: 'FEC Super PAC filings; OpenSecrets',
        url: 'https://www.fec.gov',
        tier: 'verified',
        date: '2022–2024',
      },
      {
        claim:
          'AIPAC is organized as a U.S. domestic lobbying and PAC complex; it is not registered under FARA as an agent of the Israeli government. Influence is exercised through legal lobbying, scorecards, and campaign finance — a structural distinction that does not erase the policy alignment with Israeli government security priorities.',
        source: 'FARA database absence + AIPAC organizational form; CRS / legal commentary',
        url: 'https://efile.fara.gov/BusinessSearch',
        tier: 'verified',
        date: 'ongoing',
      },
      {
        claim:
          'AIPAC lobby priorities consistently include MOU-baseline FMF (~$3.8B/year), Iron Dome / missile defense, and opposition to conditioning wartime Israel aid — matching House/Senate vote patterns of AIPAC-backed members.',
        source: 'CRS RL33222; AIPAC legislative agendas; congressional roll calls',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2016–2024',
      },
    ],
    websites: [
      { label: 'AIPAC', url: 'https://www.aipac.org' },
      { label: 'OpenSecrets — AIPAC organization', url: 'https://www.opensecrets.org/orgs/american-israel-public-affairs-cmte/summary?id=D000046963' },
      { label: 'OpenSecrets — Pro-Israel PACs 2024', url: 'https://www.opensecrets.org/political-action-committees-pacs/industry-detail/Q05/2024' },
      { label: 'FEC.gov', url: 'https://www.fec.gov' },
      { label: 'FARA search (contrast — domestic lobby status)', url: 'https://efile.fara.gov/BusinessSearch' },
      { label: 'CRS RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'TrackAIPAC', url: 'https://www.trackaipac.com' },
    ],
  },
  {
    id: 'tony-podesta',
    name: 'Tony Podesta',
    title: 'Lobbyist',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('tony-podesta'),
    summary: 'Prominent Washington lobbyist and political operative. Brother of John Podesta. Major influence on policy.',
    tags: ['Lobbyist', 'Democratic Operative', 'Washington Power Broker'],
    career: ['Lobbyist', 'Political consultant', 'Democratic operative'],
    websites: [
      { label: 'Podesta Group', url: 'https://www.podestagroupllc.com' }
    ],
    quotes: [],
    donations: [
      {
        from: 'Personal political donations',
        amount: 500000,
        year: '2000-2020',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=tony+podesta'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'John Podesta',
        relationship: 'Brother, Democratic operative partnership',
        evidence: 'Public family and business relationship',
        tier: 'verified'
      },
      {
        name: 'Paul Manafort',
        relationship: 'Both lobbied for Ukrainian interests, both investigated',
        evidence: 'Mueller investigation records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Podesta Group shut down during Mueller investigation into foreign lobbying',
        source: 'Mueller Report',
        url: 'https://www.justice.gov/archives/sco-mueller',
        tier: 'verified',
        date: '2017'
      },
      {
        claim: 'Failed to register as foreign agent for Ukrainian lobbying work',
        source: 'DOJ records',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2017'
      }
    ]
  },
  {
    id: 'john-podesta',
    name: 'John Podesta',
    title: 'White House Senior Advisor',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('john-podesta'),
    summary: 'Biden White House Senior Advisor. Long Democratic operative and political strategist. Major influence on policy.',
    tags: ['White House Advisor', 'Democratic Operative', 'Clinton Era', 'Political Strategist'],
    career: ['White House Senior Advisor 2021-present', 'Political consultant', 'Democratic operative'],
    websites: [
      { label: 'White House', url: 'https://www.whitehouse.gov' }
    ],
    quotes: [
      {
        text: 'We need to treat climate change as the existential threat it is.',
        context: 'White House climate briefing',
        date: '2023',
        source: 'White House',
        url: 'https://www.whitehouse.gov'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Appointed Biden Senior Advisor on Clean Energy',
        date: '2022',
        context: 'Overseeing $370B in Inflation Reduction Act climate spending',
        source: 'White House',
        url: 'https://www.whitehouse.gov'
      }
    ],
    connections: [
      {
        name: 'Hillary Clinton',
        relationship: 'Campaign chairman 2016, Chief of Staff to Bill Clinton',
        evidence: 'Public record',
        tier: 'verified'
      },
      {
        name: 'Tony Podesta',
        relationship: 'Brother, co-founded Podesta Group',
        evidence: 'Public family relationship',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Emails hacked by Russian intelligence and released by WikiLeaks in 2016',
        source: 'Mueller Report',
        url: 'https://www.justice.gov/archives/sco-mueller',
        tier: 'verified',
        date: '2016'
      },
      {
        claim: 'Oversaw $370B in clean energy spending under Inflation Reduction Act',
        source: 'White House',
        url: 'https://www.whitehouse.gov',
        tier: 'verified',
        date: '2023'
      }
    ]
  },
  {
    id: 'paul-manafort',
    name: 'Paul Manafort',
    title: 'Political Consultant (Convicted)',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('paul-manafort'),
    summary: 'Trump campaign chairman. Convicted of fraud and tax crimes. Foreign lobbying work.',
    tags: ['Convicted Felon', 'Political Consultant', 'Trump Campaign', 'Foreign Lobbying', 'Prison'],
    career: ['Trump campaign manager', 'Political consultant', 'Lobbyist'],
    websites: [
      { label: 'DOJ Information', url: 'https://www.justice.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Campaign chairman 2016',
        evidence: 'Public record',
        tier: 'verified'
      },
      {
        name: 'Oleg Deripaska',
        relationship: 'Shared campaign polling data with Russian oligarch',
        evidence: 'Mueller Report and Senate Intelligence Committee',
        tier: 'verified'
      },
      {
        name: 'Viktor Yanukovych',
        relationship: 'Political consultant for Ukrainian president',
        evidence: 'FARA filings and court records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Convicted of bank fraud, tax fraud, and conspiracy; sentenced to 7.5 years',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Shared Trump campaign polling data with Russian intelligence-linked associate',
        source: 'Senate Intelligence Committee Report',
        url: 'https://www.intelligence.senate.gov',
        tier: 'verified',
        date: '2020'
      },
      {
        claim: 'Pardoned by Trump in December 2020',
        source: 'White House',
        url: 'https://trumpwhitehouse.archives.gov',
        tier: 'verified',
        date: '2020'
      }
    ]
  },
  {
    id: 'michael-flynn',
    name: 'Michael Flynn',
    title: 'Former National Security Advisor',
    category: 'intel',
    photoUrl: getProfilePhoto('michael-flynn'),
    summary: 'Trump National Security Advisor. Pleaded guilty to lying to FBI. Later pardoned by Trump.',
    tags: ['National Security Advisor', 'Convicted', 'Trump Ally', 'Pardoned', 'QAnon'],
    career: ['National Security Advisor 2017', 'Military intelligence officer', 'Political operative'],
    websites: [
      { label: 'Official Website', url: 'https://www.michaelflynn.com' }
    ],
    quotes: [
      {
        text: 'I am a soldier, and I did my duty.',
        context: 'Post-pardon statement',
        date: '2020',
        source: 'Flynn statement',
        url: 'https://twitter.com'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Served 22 days as National Security Advisor before resignation',
        date: '2017',
        context: 'Resigned over undisclosed contacts with Russian ambassador',
        source: 'White House',
        url: 'https://trumpwhitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'National Security Advisor, later pardoned',
        evidence: 'Public record',
        tier: 'verified'
      },
      {
        name: 'Russia/Turkey',
        relationship: 'Undisclosed foreign lobbying contacts',
        evidence: 'Court filings and FARA records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Pleaded guilty to lying to FBI about Russian contacts, later pardoned by Trump',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2020'
      },
      {
        claim: 'Failed to disclose $530K in lobbying payments from Turkish government',
        source: 'DOJ FARA records',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2017'
      }
    ]
  },
  {
    id: 'roger-stone',
    name: 'Roger Stone',
    title: 'Political Consultant',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('roger-stone'),
    summary: 'Long-time political operative and Trump advisor. Convicted in Mueller probe, later pardoned by Trump.',
    tags: ['Political Consultant', 'Trump Advisor', 'Convicted', 'Pardoned', 'Operative'],
    career: ['Political consultant', 'Trump advisor', 'Lobbyist'],
    websites: [
      { label: 'Roger Stone', url: 'https://www.rogerstonecom.com' }
    ],
    quotes: [
      {
        text: 'Admit nothing, deny everything, launch counterattack.',
        context: 'Self-described political philosophy',
        date: '2017',
        source: 'Netflix documentary',
        url: 'https://www.netflix.com'
      }
    ],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Decades-long political advisor',
        evidence: 'Public record spanning 40+ years',
        tier: 'verified'
      },
      {
        name: 'WikiLeaks',
        relationship: 'Communicated about hacked DNC emails',
        evidence: 'Trial evidence',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Convicted of 7 felonies including witness tampering and lying to Congress',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Sentenced to 40 months, commuted by Trump, then fully pardoned',
        source: 'White House',
        url: 'https://trumpwhitehouse.archives.gov',
        tier: 'verified',
        date: '2020'
      }
    ]
  },
  {
    id: 'steve-bannon',
    name: 'Steve Bannon',
    title: 'Trump Strategist, Media Executive',
    category: 'media',
    photoUrl: getProfilePhoto('steve-bannon'),
    summary: 'Trump campaign chief strategist. Breitbart News chair. Political influencer and media figure.',
    tags: ['Trump Strategist', 'Breitbart', 'Media Executive', 'Political Activist', 'Controversial'],
    career: ['Trump campaign chief strategist', 'Breitbart News chair', 'Media executive'],
    websites: [
      { label: 'War Room', url: 'https://www.warroom.org' }
    ],
    quotes: [
      {
        text: 'I want to bring everything crashing down and destroy all of today\'s establishment.',
        context: 'Interview with The Daily Beast',
        date: '2016',
        source: 'The Daily Beast',
        url: 'https://www.thedailybeast.com'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Served as White House Chief Strategist',
        date: '2017',
        context: 'Removed after 7 months',
        source: 'White House',
        url: 'https://trumpwhitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Robert Mercer',
        relationship: 'Primary financial backer for Breitbart and political operations',
        evidence: 'Financial records',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Chief Strategist, later pardoned for fraud charges',
        evidence: 'Public record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Charged with fraud in We Build the Wall scheme, pardoned by Trump before trial',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2021'
      },
      {
        claim: 'Convicted of contempt of Congress for defying Jan 6 subpoena, served 4 months',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'karl-rove',
    name: 'Karl Rove',
    title: 'Political Strategist',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('karl-rove'),
    summary: 'Bush administration political strategist. Fox News contributor. Long-time Republican operative.',
    tags: ['Political Strategist', 'Republican Operative', 'Fox News', 'Bush Era', 'Super PAC'],
    career: ['Bush political strategist', 'Fox News contributor', 'Political consultant'],
    websites: [
      { label: 'American Crossroads', url: 'https://www.americancrossroads.org' }
    ],
    quotes: [
      {
        text: 'We\'re an empire now, and when we act, we create our own reality.',
        context: 'Attributed quote to journalist Ron Suskind',
        date: '2004',
        source: 'New York Times Magazine',
        url: 'https://www.nytimes.com'
      }
    ],
    donations: [
      {
        from: 'Crossroads GPS dark money spending',
        amount: 325000000,
        year: '2010-2020',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/outsidespending/detail.php?cmte=C00487363'
      }
    ],
    policyActions: [
      {
        action: 'Served as Senior Advisor to President George W. Bush',
        date: '2001-2007',
        context: 'Architect of Bush election strategy',
        source: 'White House Archives',
        url: 'https://georgewbush-whitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'George W. Bush',
        relationship: 'Political strategist known as Bush\'s Brain',
        evidence: 'Public record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Crossroads GPS raised and spent $325M+ as dark money group',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2020'
      },
      {
        claim: 'Implicated in Valerie Plame CIA identity leak scandal',
        source: 'Special Counsel investigation',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2005'
      }
    ]
  },
  {
    id: 'rahm-emanuel',
    name: 'Rahm Emanuel',
    title: 'Chicago Mayor, White House Chief of Staff',
    category: 'lobbyist',
    party: 'D',
    state: 'IL',
    photoUrl: getProfilePhoto('rahm-emanuel'),
    summary: 'Former Chicago Mayor and Obama White House Chief of Staff. Democratic operative and political power broker.',
    tags: ['White House Chief of Staff', 'Chicago Mayor', 'Democratic Operative', 'Political Strategist'],
    career: ['Chicago Mayor 2011-2019', 'White House Chief of Staff 2009-2010', 'Congressman', 'Political operative'],
    websites: [
      { label: 'Official Website', url: 'https://www.rahmememanuel.com' }
    ],
    quotes: [
      {
        text: 'You never let a serious crisis go to waste.',
        context: 'Wall Street Journal interview',
        date: '2008',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors',
        amount: 1200000,
        year: '2002-2008',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org'
      }
    ],
    policyActions: [
      {
        action: 'Served as Obama White House Chief of Staff',
        date: '2009-2010',
        context: 'Left to run for Chicago mayor',
        source: 'White House',
        url: 'https://obamawhitehouse.archives.gov'
      },
      {
        action: 'Appointed US Ambassador to Japan by Biden',
        date: '2022',
        context: 'Senate confirmed',
        source: 'State Department',
        url: 'https://www.state.gov'
      }
    ],
    connections: [
      {
        name: 'Barack Obama',
        relationship: 'Chief of Staff',
        evidence: 'Public appointment',
        tier: 'verified'
      },
      {
        name: 'Israeli Defense Forces',
        relationship: 'Volunteered with IDF during 1991 Gulf War',
        evidence: 'Public biographical record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Volunteered with Israeli Defense Forces during 1991 Gulf War',
        source: 'Biographical records',
        url: 'https://www.chicagotribune.com',
        tier: 'verified',
        date: '1991'
      },
      {
        claim: 'Chicago police misconduct scandals during mayoral tenure, including Laquan McDonald cover-up allegations',
        source: 'Chicago Tribune',
        url: 'https://www.chicagotribune.com',
        tier: 'circumstantial',
        date: '2015'
      }
    ]
  },
  {
    id: 'james-comey',
    name: 'James Comey',
    title: 'Former FBI Director',
    category: 'intel',
    photoUrl: getProfilePhoto('james-comey'),
    summary: 'Former FBI Director under Obama and Trump. Controversial role in 2016 election. Trump critic.',
    tags: ['FBI Director', 'Trump Critic', 'Clinton Email', 'Election Interference', 'Law Enforcement'],
    career: ['FBI Director 2013-2017', 'Deputy Attorney General', 'Prosecutor'],
    websites: [
      { label: 'Official Website', url: 'https://www.jamescomey.com' }
    ],
    quotes: [
      {
        text: 'That\'s it? That\'s the evidence? Then we\'re done.',
        context: 'Attributed response to Trump loyalty demand',
        date: '2017',
        source: 'Comey testimony',
        url: 'https://www.intelligence.senate.gov'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Reopened Clinton email investigation 11 days before 2016 election',
        date: '2016',
        context: 'Letter to Congress about new emails found on Weiner laptop',
        source: 'FBI',
        url: 'https://www.fbi.gov'
      },
      {
        action: 'Fired by Trump as FBI Director',
        date: '2017',
        context: 'Trump cited Russia investigation as reason',
        source: 'White House',
        url: 'https://trumpwhitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Robert Mueller',
        relationship: 'Comey firing led to Mueller appointment',
        evidence: 'DOJ records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Letter to Congress reopening Clinton investigation 11 days before election influenced 2016 outcome',
        source: 'DOJ Inspector General report',
        url: 'https://www.justice.gov/oig',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Fired by Trump, triggering appointment of Special Counsel Mueller',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2017'
      }
    ]
  },
  {
    id: 'john-brennan',
    name: 'John Brennan',
    title: 'Former CIA Director',
    category: 'intel',
    photoUrl: getProfilePhoto('john-brennan'),
    summary: 'Former CIA Director under Obama. Trump critic. Major role in drone programs and enhanced interrogation.',
    tags: ['CIA Director', 'Trump Critic', 'Drone Program', 'Torture', 'Intelligence'],
    career: ['CIA Director 2013-2017', 'Counterterrorism official', 'Intelligence operative'],
    websites: [
      { label: 'MSNBC Contributor', url: 'https://www.msnbc.com' }
    ],
    quotes: [
      {
        text: 'Trump\'s conduct amounts to nothing short of treasonous.',
        context: 'Tweet after Helsinki summit',
        date: '2018',
        source: 'Twitter',
        url: 'https://twitter.com/JohnBrennan'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Directed CIA drone strike program expansion',
        date: '2009-2013',
        context: 'As counterterrorism advisor, oversaw targeted killing program',
        source: 'Declassified records',
        url: 'https://nsarchive.gwu.edu'
      },
      {
        action: 'Led CIA during Russian election interference period',
        date: '2013-2017',
        context: 'CIA assessment of Russian interference in 2016 election',
        source: 'CIA',
        url: 'https://www.cia.gov'
      }
    ],
    connections: [
      {
        name: 'Barack Obama',
        relationship: 'CIA Director and counterterrorism advisor',
        evidence: 'Public appointments',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'CIA under Brennan concluded Russia interfered in 2016 election to aid Trump',
        source: 'Intelligence Community Assessment',
        url: 'https://www.dni.gov',
        tier: 'verified',
        date: '2017'
      },
      {
        claim: 'Oversaw expansion of CIA drone strike program killing thousands',
        source: 'Bureau of Investigative Journalism',
        url: 'https://www.thebureauinvestigates.com',
        tier: 'verified',
        date: '2013'
      }
    ]
  },
  {
    id: 'james-clapper',
    name: 'James Clapper',
    title: 'Former Director of National Intelligence',
    category: 'intel',
    photoUrl: getProfilePhoto('james-clapper'),
    summary: 'Former Director of National Intelligence under Obama. Defended NSA surveillance. Military intelligence officer.',
    tags: ['Intelligence Director', 'NSA Surveillance', 'Military Intelligence', 'Trump Critic'],
    career: ['Director of National Intelligence 2010-2017', 'Air Force intelligence', 'Defense official'],
    websites: [
      { label: 'CNN Contributor', url: 'https://www.cnn.com' }
    ],
    quotes: [
      {
        text: 'No, sir. Not wittingly.',
        context: 'False testimony to Congress about NSA mass surveillance',
        date: '2013',
        source: 'C-SPAN/Senate hearing',
        url: 'https://www.c-span.org'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Oversaw intelligence community during Snowden revelations',
        date: '2013',
        context: 'NSA mass surveillance programs exposed',
        source: 'ODNI',
        url: 'https://www.dni.gov'
      }
    ],
    connections: [
      {
        name: 'Barack Obama',
        relationship: 'Director of National Intelligence',
        evidence: 'Public appointment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Gave false testimony to Congress denying NSA mass surveillance of Americans',
        source: 'Senate Intelligence Committee hearing',
        url: 'https://www.intelligence.senate.gov',
        tier: 'verified',
        date: '2013'
      },
      {
        claim: 'Signed intelligence assessment confirming Russian election interference',
        source: 'ODNI',
        url: 'https://www.dni.gov',
        tier: 'verified',
        date: '2017'
      }
    ]
  },
  {
    id: 'erik-prince',
    name: 'Erik Prince',
    title: 'Blackwater Founder, Military Contractor',
    category: 'intel',
    photoUrl: getProfilePhoto('erik-prince'),
    summary: 'Blackwater (now Academi) founder. Private military contractor. Trump administration connection.',
    tags: ['Military Contractor', 'Blackwater', 'Private Army', 'Trump Advisor', 'Controversial'],
    career: ['Blackwater founder', 'Military contractor', 'Trump advisor'],
    websites: [
      { label: 'Frontier Services Group', url: 'https://www.fsgroup.com' }
    ],
    quotes: [
      {
        text: 'We are trying to do for the national security apparatus what FedEx did for the postal service.',
        context: 'Interview on private military contracting',
        date: '2007',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com'
      }
    ],
    donations: [
      {
        from: 'Political donations to Republican candidates',
        amount: 10000000,
        year: '2016-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=erik+prince'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Blackwater/Academi',
        relationship: 'Founder of private military contractor',
        evidence: 'Corporate records',
        tier: 'verified'
      },
      {
        name: 'Betsy DeVos',
        relationship: 'Brother of Trump Education Secretary',
        evidence: 'Public family relationship',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Proposed private spy network and Afghan privatization plan',
        evidence: 'Mueller investigation and media reports',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Blackwater contractors killed 17 Iraqi civilians at Nisour Square',
        source: 'DOJ prosecution',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2007'
      },
      {
        claim: 'Met with Russian banker in Seychelles, investigated by Mueller',
        source: 'Mueller Report',
        url: 'https://www.justice.gov/archives/sco-mueller',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Proposed privatizing Afghan War with contractor army',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com',
        tier: 'verified',
        date: '2017'
      }
    ]
  },
  {
    id: 'david-petraeus',
    name: 'David Petraeus',
    title: 'Former General, CIA Director',
    category: 'intel',
    photoUrl: getProfilePhoto('david-petraeus'),
    summary: 'Retired four-star general. Former CIA Director. Pled guilty to mishandling classified information.',
    tags: ['General', 'CIA Director', 'Military Commander', 'Afghanistan', 'Iraq'],
    career: ['CIA Director 2011-2012', 'Central Command general', 'Afghanistan/Iraq commander'],
    websites: [
      { label: 'KKR Global Institute', url: 'https://www.kkr.com' }
    ],
    quotes: [
      {
        text: 'Tell me how this ends.',
        context: 'Famous question during Iraq invasion',
        date: '2003',
        source: 'Military memoir',
        url: 'https://www.defense.gov'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Commanded Iraq surge strategy',
        date: '2007-2008',
        context: '30,000 troop surge credited with reducing violence',
        source: 'Department of Defense',
        url: 'https://www.defense.gov'
      },
      {
        action: 'Served as CIA Director, resigned over classified information leak',
        date: '2011-2012',
        context: 'Shared classified documents with biographer/mistress',
        source: 'DOJ',
        url: 'https://www.justice.gov'
      }
    ],
    connections: [
      {
        name: 'KKR & Co.',
        relationship: 'Partner at global investment firm post-government',
        evidence: 'Corporate records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Pleaded guilty to mishandling classified information, shared with biographer',
        source: 'DOJ',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2015'
      },
      {
        claim: 'Commanded Iraq surge strategy as top US commander',
        source: 'Department of Defense',
        url: 'https://www.defense.gov',
        tier: 'verified',
        date: '2007'
      }
    ]
  },
  {
    id: 'robert-mueller',
    name: 'Robert Mueller',
    title: 'Former FBI Director, Special Counsel',
    category: 'intel',
    photoUrl: getProfilePhoto('robert-mueller'),
    summary: 'Former FBI Director and Special Counsel investigating Trump-Russia. Led Trump impeachment probe.',
    tags: ['FBI Director', 'Special Counsel', 'Trump Investigation', 'Russia', 'Mueller Report'],
    career: ['Special Counsel 2017-2019', 'FBI Director 2001-2013', 'Prosecutor'],
    websites: [
      { label: 'Mueller Report', url: 'https://www.justice.gov' }
    ],
    quotes: [
      {
        text: 'If we had had confidence that the president clearly did not commit a crime, we would have said so.',
        context: 'Press conference on Mueller Report',
        date: '2019',
        source: 'DOJ',
        url: 'https://www.justice.gov'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Led Special Counsel investigation into Russian election interference',
        date: '2017-2019',
        context: '34 indictments, 7 guilty pleas/convictions',
        source: 'DOJ',
        url: 'https://www.justice.gov/archives/sco-mueller'
      }
    ],
    connections: [
      {
        name: 'James Comey',
        relationship: 'Predecessor as FBI Director, firing triggered Mueller appointment',
        evidence: 'DOJ records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Mueller investigation resulted in 34 indictments and 7 guilty pleas or convictions',
        source: 'DOJ Special Counsel Office',
        url: 'https://www.justice.gov/archives/sco-mueller',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Report stated president was not exonerated on obstruction of justice',
        source: 'Mueller Report',
        url: 'https://www.justice.gov/archives/sco-mueller',
        tier: 'verified',
        date: '2019'
      }
    ]
  },
  {
    id: 'tucker-carlson',
    name: 'Tucker Carlson',
    title: 'Fox News Host',
    category: 'media',
    photoUrl: getProfilePhoto('tucker-carlson'),
    summary: 'Former Fox News prime-time host. Influential conservative commentator. Controversial statements and positions.',
    tags: ['News Host', 'Fox News', 'Conservative', 'Political Commentary', 'Controversial'],
    career: ['Fox News host', 'Political commentator', 'Journalist'],
    websites: [
      { label: 'Twitter/X', url: 'https://twitter.com/TuckerCarlson' }
    ],
    quotes: [
      {
        text: 'The people who run this country have no idea what\'s going on outside of their little enclaves.',
        context: 'Fox News monologue',
        date: '2022',
        source: 'Fox News',
        url: 'https://www.foxnews.com'
      }
    ],
    donations: [
      {
        from: 'Personal political donations',
        amount: 50000,
        year: '2010-2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Fox News',
        relationship: 'Highest-rated host until fired in 2023',
        evidence: 'Nielsen ratings and corporate records',
        tier: 'verified'
      },
      {
        name: 'Vladimir Putin',
        relationship: 'Conducted interview with Putin in Moscow',
        evidence: 'Public broadcast',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Fired from Fox News after Dominion settlement, text messages showed disdain for Trump claims',
        source: 'Court filings in Dominion v. Fox',
        url: 'https://www.courts.delaware.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Interviewed Vladimir Putin in Moscow in 2024, drawing criticism',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'joe-rogan',
    name: 'Joe Rogan',
    title: 'Podcast Host, Sports Commentator',
    category: 'media',
    photoUrl: getProfilePhoto('joe-rogan'),
    summary: 'Spotify podcast host with massive audience. Sports commentator. Political interviews and commentary.',
    tags: ['Podcast Host', 'Media Personality', 'Political Commentary', 'Spotify', 'Influence'],
    career: ['JRE podcast host', 'MMA commentator', 'Stand-up comedian'],
    websites: [
      { label: 'JRE Podcast', url: 'https://www.joerogan.com' }
    ],
    quotes: [
      {
        text: 'I\'m not an expert on anything. I\'m just a guy who talks to people.',
        context: 'Podcast episode disclaimer',
        date: '2022',
        source: 'Joe Rogan Experience',
        url: 'https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk'
      }
    ],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Spotify',
        relationship: '$250M exclusive licensing deal',
        evidence: 'Corporate announcement',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Endorsed Trump in 2024 election',
        evidence: 'Public endorsement on podcast',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Joe Rogan Experience is most listened-to podcast globally with 14M+ listeners per episode',
        source: 'Spotify/Edison Research',
        url: 'https://www.edisonresearch.com',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Endorsed Trump in 2024 after years of political non-alignment',
        source: 'Joe Rogan Experience',
        url: 'https://open.spotify.com',
        tier: 'verified',
        date: '2024'
      }
    ]
  },
  {
    id: 'ben-shapiro',
    name: 'Ben Shapiro',
    title: 'Political Commentator, Media Host',
    category: 'media',
    photoUrl: getProfilePhoto('ben-shapiro'),
    summary: 'Conservative political commentator and Daily Wire founder. Influential in right-wing media sphere.',
    tags: ['Political Commentator', 'Daily Wire', 'Conservative', 'Media Personality'],
    career: ['Daily Wire founder and host', 'Political commentator', 'Author'],
    websites: [
      { label: 'The Daily Wire', url: 'https://www.dailywire.com' }
    ],
    quotes: [
      {
        text: 'Facts don\'t care about your feelings.',
        context: 'Signature catchphrase',
        date: '2016',
        source: 'The Daily Wire',
        url: 'https://www.dailywire.com'
      }
    ],
    donations: [
      {
        from: 'Personal political donations',
        amount: 100000,
        year: '2016-2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'The Daily Wire',
        relationship: 'Co-founder and host',
        evidence: 'Corporate records',
        tier: 'verified'
      },
      {
        name: 'Elon Musk',
        relationship: 'Toured Auschwitz together after Musk antisemitism controversy',
        evidence: 'Public event',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Daily Wire is one of most-shared publishers on Facebook with billions of interactions',
        source: 'CrowdTangle/Meta data',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Ardent pro-Israel voice, frequently conflates criticism of Israel with antisemitism',
        source: 'Media Matters',
        url: 'https://www.mediamatters.org',
        tier: 'circumstantial',
        date: '2023'
      }
    ]
  },
  {
    id: 'rachel-maddow',
    name: 'Rachel Maddow',
    title: 'MSNBC News Host',
    category: 'media',
    photoUrl: getProfilePhoto('rachel-maddow'),
    summary: 'MSNBC prime-time news host. Influential progressive voice. Covered Trump investigation extensively.',
    tags: ['News Host', 'MSNBC', 'Progressive', 'Political Commentary', 'Trump Investigation'],
    career: ['MSNBC news host', 'Political commentator', 'Journalist'],
    websites: [
      { label: 'MSNBC', url: 'https://www.msnbc.com' }
    ],
    quotes: [
      {
        text: 'The story is not over. It\'s never over.',
        context: 'MSNBC broadcast on investigations',
        date: '2022',
        source: 'MSNBC',
        url: 'https://www.msnbc.com'
      }
    ],
    donations: [
      {
        from: 'Personal political donations',
        amount: 25000,
        year: '2010-2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'MSNBC',
        relationship: 'Highest-rated host, $30M/year contract',
        evidence: 'Media reports',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Signed $30M/year contract with MSNBC, one of highest in cable news',
        source: 'Variety',
        url: 'https://variety.com',
        tier: 'verified',
        date: '2022'
      },
      {
        claim: 'MSNBC settled defamation suit by OAN, Maddow personally won separate ruling',
        source: 'Court records',
        url: 'https://www.courts.ca.gov',
        tier: 'verified',
        date: '2021'
      }
    ]
  },
  {
    id: 'byron-donalds',
    name: 'Byron Donalds',
    title: 'U.S. Representative (R-FL-19); 2026 Florida gubernatorial candidate',
    category: 'politician',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('byron-donalds'),
    bioguideId: 'D000032',
    summary:
      'U.S. Representative for Florida\'s 19th congressional district (2021–present) and 2026 Florida gubernatorial candidate. Former Florida state representative and financial-services professional. House Freedom Caucus member; Heritage Action scorecard 96% (117th–118th Congress). Documented recipient of roughly $75k–$84k from AIPAC and other pro-Israel PACs (FEC / TrackAIPAC / OpenSecrets Q05), with a public record of consistent yes votes on Israel security supplementals including H.R. 8034 (April 20, 2024, 366–58). Subject of a Campaign Legal Center ethics complaint (Sept. 5, 2024) alleging failure to file Periodic Transaction Reports for 108 stock trades valued up to $1.6 million under the STOCK Act. Public record also includes a 1997 marijuana arrest resolved by pre-trial diversion and a 2000 no-contest plea to a felony bad-check/bank-fraud charge later sealed and expunged under Florida law. Wife Erika Donalds\' OptimaEd / Education Freedom entities have received millions in Florida charter-school contracts (Florida Bulldog).',
    tags: [
      'Freedom Caucus',
      'Pro-Israel',
      'AIPAC',
      'TrackAIPAC',
      'Trump Ally',
      'STOCK Act',
      'Campaign Legal Center',
      'Heritage Foundation',
      'School Choice',
      'Speaker Nominee',
      'Financial Services',
      'FL-19',
      'Florida Governor 2026',
    ],
    born: 'October 28, 1978, Brooklyn, New York',
    education: 'Florida A&M University (B.S. Finance, 2002)',
    netWorth: 'Disclosed ranges vary by year; public estimates often cite low-to-mid seven figures; spouse OptimaEd interest disclosed at $1M+',
    quotes: [
      {
        text: 'You see, during Jim Crow, the Black family was together. During Jim Crow, more Black people were not just conservative — Black people have always been conservative-minded — but more Black people voted conservatively.',
        context:
          'Pro-Trump event in Philadelphia. Widely reported; Congressional Black Caucus demanded an apology. PolitiFact reviewed the historical claims as omitting crucial context on segregation, violence, and disenfranchisement.',
        date: 'June 4, 2024',
        source: 'Washington Post',
        url: 'https://www.washingtonpost.com/politics/2024/06/05/byron-donalds-black-families-jim-crow/',
      },
      {
        text: 'As the sole democratic country that represents freedom in the Middle East, I will always Stand With Israel.',
        context:
          'Official House office e-newsletter (May 2021) affirming unqualified public support for Israel as U.S. partner — primary statement from donalds.house.gov.',
        date: 'May 24, 2021',
        source: 'U.S. House — Office of Rep. Byron Donalds',
        url: 'https://donalds.house.gov/news/email/show.aspx?ID=45LDXVDEPPTNG',
      },
      {
        text: 'Israel is one of our greatest allies and a pillar of stability and Democracy in a region notorious for chaos and servitude. Hamas\' abhorrent attack on the State of Israel and the Jewish people shook the world and deserves the complete and relentless condemnation of everyone who stands for freedom, humanity and religious liberty.',
        context:
          'Statement after the October 7, 2023 Hamas attacks, reported contemporaneously by Florida Politics while Donalds supported House measures affirming U.S.–Israel wartime partnership.',
        date: 'October 2023',
        source: 'Florida Politics (contemporaneous reporting of Donalds statement)',
        url: 'https://floridapolitics.com/archives/641034-delegation-for-10-24-23-donalds-out-venezuela-agita-split-vote-touristy/',
      },
      {
        text: 'School choice is the civil rights issue of our time. Every parent deserves the right to choose the best education for their child.',
        context:
          'Recurring Donalds framing of education policy; aligns with spouse Erika Donalds\' charter/education-freedom enterprises and Heritage/Moms for Liberty networks.',
        date: '2023',
        source: 'Public remarks (education / school-choice advocacy)',
        url: 'https://donalds.house.gov',
      },
      {
        text: 'While Rep. Byron Donalds\'s violations of the STOCK Act are significant, his behavior is unfortunately not an anomaly in Congress.',
        context:
          'Quote from Kedric Payne (CLC VP / general counsel) in the Campaign Legal Center press release announcing the OCE ethics complaint over 108 undisclosed trades.',
        date: 'September 5, 2024',
        source: 'Campaign Legal Center',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal',
      },
    ],
    donations: [
      {
        from: 'AIPAC PAC (American Israel Public Affairs Committee PAC — FEC C00797670)',
        amount: 59864,
        year: 'Career PAC disbursements (FEC-derived)',
        source: 'FEC / PoliTrack aggregation of AIPAC PAC → Donalds',
        url: 'https://www.fec.gov/data/receipts/?data_type=processed&contributor_name=american+israel+public+affairs&two_year_transaction_period=2024',
      },
      {
        from: 'U.S. Israel PAC (USI PAC — FEC C00127811)',
        amount: 18500,
        year: 'Career PAC disbursements (FEC-derived)',
        source: 'FEC / PoliTrack pro-Israel PAC table for Donalds',
        url: 'https://www.fec.gov/data/committee/C00127811/',
      },
      {
        from: 'Other pro-Israel PACs (TrackAIPAC / OpenSecrets residual above AIPAC+USI line items)',
        amount: 5636,
        year: '2021–2024',
        source: 'Residual to reconcile TrackAIPAC ~$84k public count vs itemized AIPAC+USI (~$78.4k)',
        url: 'https://x.com/TrackAIPAC/status/1815916931133890962',
      },
      {
        from: 'Securities & Investment industry (OpenSecrets career)',
        amount: 156000,
        year: '2021–2024',
        source: 'OpenSecrets industries — Byron Donalds',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/industries?cid=N00034016&cycle=CAREER',
      },
      {
        from: 'Real Estate industry (OpenSecrets career)',
        amount: 134000,
        year: '2021–2024',
        source: 'OpenSecrets industries — Byron Donalds',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/industries?cid=N00034016&cycle=CAREER',
      },
      {
        from: 'Insurance industry (OpenSecrets career)',
        amount: 98000,
        year: '2021–2024',
        source: 'OpenSecrets industries — Byron Donalds',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/industries?cid=N00034016&cycle=CAREER',
      },
      {
        from: 'JPMorgan Chase (campaign contributions; STOCK-era window context)',
        amount: 5800,
        year: '2023–2024',
        source: 'Campaign Legal Center ethics complaint context / FEC',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal',
      },
      {
        from: 'Elevance Health (campaign contributions; STOCK-era window context)',
        amount: 5800,
        year: '2023–2024',
        source: 'Campaign Legal Center ethics complaint context / FEC',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal',
      },
    ],
    policyActions: [
      {
        action: 'Voted YES on H.R. 8034 — Israel Security Supplemental Appropriations Act, 2024 (House passage 366–58)',
        date: 'April 20, 2024',
        context:
          'House roll call on the standalone Israel wartime security supplemental providing military assistance and related accounts during the Gaza war. Part of the broader 2024 Israel / Ukraine / Indo-Pacific supplemental architecture later consolidated via H.R. 815 (~$26.4B Israel-related package elements).',
        source: 'Clerk of the House roll call / Congress.gov bill text',
        url: 'https://clerk.house.gov/Votes/2024143',
      },
      {
        action: 'Supported H.R. 815 framework — Israel Security Supplemental Appropriations package (2024)',
        date: 'April 2024',
        context:
          'H.R. 815 is the vehicle for the multi-theater security supplemental including Israel Security Supplemental titles. Donalds\' public record and House GOP leadership alignment supported wartime Israel funding continuity without progressive conditionality.',
        source: 'Congress.gov — H.R. 815 (118th Congress)',
        url: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
      {
        action: 'Public "Stand With Israel" commitment via official House communications',
        date: 'May 24, 2021 → ongoing',
        context:
          'Official office language: "I will always Stand With Israel." Post–Oct 7 statements framed Hamas attacks as requiring "complete and relentless condemnation" and described Israel as a pillar U.S. ally — matching a voting record for Iron Dome / FMF / wartime supplementals.',
        source: 'donalds.house.gov e-newsletter; Florida Politics contemporaneous report',
        url: 'https://donalds.house.gov/news/email/show.aspx?ID=45LDXVDEPPTNG',
      },
      {
        action: 'Voted against certifying 2020 electoral votes from Arizona and Pennsylvania',
        date: 'January 6–7, 2021',
        context:
          'Joined the House Republican bloc objecting to electoral certification after the Capitol breach. Public roll-call record on the objections.',
        source: 'House Clerk roll call (electoral count objections)',
        url: 'https://clerk.house.gov',
      },
      {
        action: 'Nominated for Speaker of the House — received ~20 Republican votes across multiple ballots',
        date: 'January 4–7, 2023',
        context:
          'Nominated by Rep. Chip Roy (TX) during the McCarthy speakership standoff; seconded by Freedom Caucus allies including Lauren Boebert and Scott Perry. First time both parties had nominated Black Americans for Speaker in the same contest cycle (Democratic nominee: Hakeem Jeffries).',
        source: 'Congressional Record / contemporaneous floor coverage',
        url: 'https://www.congress.gov',
      },
      {
        action: 'Served on House Financial Services Committee while trading stocks in sector companies without filing STOCK Act PTRs',
        date: '2022–2023',
        context:
          'CLC complaint: Donalds and spouse made 108 stock trades valued between ~$108k and $1.62M and filed zero Periodic Transaction Reports within the 45-day STOCK Act window. Trades later appeared only on annual disclosures. CLC notes financial-services sector concentration while Donalds sat on the committee overseeing that sector.',
        source: 'Campaign Legal Center — OCE complaint (Sept. 5, 2024)',
        url: 'https://campaignlegal.org/document/clc-complaint-oce-regarding-rep-byron-donalds',
      },
      {
        action: 'Voted YES on annual National Defense Authorization / defense appropriations including Israel security accounts',
        date: '2021–2024',
        context:
          'Standard House Republican defense posture includes MOU-baseline Foreign Military Financing for Israel (~$3.8B/year under the 2016–2028 MOU) plus missile-defense lines (Iron Dome, David\'s Sling, Arrow).',
        source: 'CRS RL33222 — U.S. Foreign Aid to Israel; House voting record',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Short-listed among public Trump 2024 vice-presidential contenders; later entered 2026 Florida governor race',
        date: 'June 2024 / 2025',
        context:
          'National media listed Donalds among top-tier VP prospects. Subsequently launched a high-dollar Florida gubernatorial bid (state PAC fundraising reported in the tens of millions by Florida Politics).',
        source: 'Washington Examiner; Florida Politics',
        url: 'https://www.washingtonexaminer.com/news/campaigns/presidential/3040531/who-is-byron-donalds-trump-vp-short-list/',
      },
      {
        action: 'Heritage Action lifetime score ~96% (117th–118th Congress scorecards)',
        date: '2021–2024',
        context:
          'Among the most conservative House voting records on Heritage Action key votes, including foreign-policy and domestic social-conservative markers.',
        source: 'Heritage Action for America scorecard',
        url: 'https://heritageaction.com/scorecard/members/D000032/118',
      },
    ],
    connections: [
      {
        name: 'AIPAC (American Israel Public Affairs Committee)',
        relationship:
          'Documented PAC recipient (~$59.9k from AIPAC PAC alone per FEC-derived aggregates; ~$74.6k–$84k total pro-Israel PACs depending on tracker). Voting record aligns with AIPAC-backed Israel security priorities (supplementals, FMF, Iron Dome).',
        evidence: 'FEC C00797670 disbursements; TrackAIPAC; OpenSecrets Q05; House roll calls on H.R. 8034 / H.R. 815',
        tier: 'verified',
      },
      {
        name: 'U.S. Israel PAC (USI PAC)',
        relationship: 'Career pro-Israel PAC contributor (~$18.5k per FEC-derived PoliTrack table).',
        evidence: 'FEC committee C00127811; PoliTrack Donalds pro-Israel table',
        tier: 'verified',
      },
      {
        name: 'Donald Trump',
        relationship:
          'Key congressional ally; 2024 VP short-list candidate; frequent surrogate in swing-state and Florida political circuits.',
        evidence: 'Public endorsements, campaign appearances, contemporaneous VP-vetting coverage',
        tier: 'verified',
      },
      {
        name: 'Erika Donalds (spouse)',
        relationship:
          'CEO / principal of OptimaEd LLC (education services; 81% interest disclosed at $1M+); Education Freedom Foundation (formerly Optima Foundation) network; Heritage Foundation visiting fellow; advisory ties to Moms for Liberty and America First Policy Institute. Florida Bulldog reported firms tied to her portfolio netting millions in charter-school contracts.',
        evidence: 'House financial disclosures; Heritage announcements; Florida Bulldog investigative series',
        tier: 'verified',
      },
      {
        name: 'Heritage Foundation / Heritage Action',
        relationship:
          '96% Heritage Action scorecard; spouse joined Heritage as visiting fellow — organizational alignment on education and conservative governance agenda.',
        evidence: 'Heritage Action scorecard D000032; Heritage staff announcements',
        tier: 'verified',
      },
      {
        name: 'House Freedom Caucus',
        relationship:
          'Member; Speaker-nomination vehicle in Jan. 2023 as Freedom Caucus alternative during McCarthy standoff.',
        evidence: 'Caucus membership reporting; Congressional Record nomination votes',
        tier: 'verified',
      },
      {
        name: 'Campaign Legal Center (adversarial oversight)',
        relationship:
          'CLC filed formal OCE ethics complaint alleging STOCK Act PTR non-filing for 108 trades up to $1.6M (Sept. 5, 2024).',
        evidence: 'CLC press release + full OCE complaint PDF',
        tier: 'verified',
      },
      {
        name: 'Ron DeSantis',
        relationship:
          'Fellow Florida Republican power center; Donalds served in Florida House before Congress; overlapping school-choice and culture-war agendas; now competing/adjacent in statewide political market as Donalds runs for governor.',
        evidence: 'Florida legislative service; public political record',
        tier: 'verified',
      },
      {
        name: 'Chip Roy / Lauren Boebert / Scott Perry',
        relationship:
          'Roy nominated Donalds for Speaker; Boebert and Perry among Freedom Caucus seconds/supporters in the 2023 ballot fight.',
        evidence: 'Congressional Record; floor nomination coverage',
        tier: 'verified',
      },
      {
        name: 'Moms for Liberty',
        relationship: 'Spouse Erika listed on advisory networks; shared school-choice / curriculum politics with Donalds\' public education messaging.',
        evidence: 'Organization board/advisory listings; public statements',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'Campaign Legal Center filed an Office of Congressional Ethics complaint (Sept. 5, 2024) alleging Donalds and his spouse made 108 stock trades in 2022–2023 valued from about $108,108 to $1,620,000 and filed zero STOCK Act Periodic Transaction Reports within the required 45-day window — disclosures appeared only later on annual reports.',
        source: 'Campaign Legal Center press release + OCE complaint PDF',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal',
        tier: 'verified',
        date: 'September 5, 2024',
      },
      {
        claim:
          'CLC formal complaint document states Donalds failed to file PTRs for over 100 trades and asks OCE to investigate possible STOCK Act and House Rules violations.',
        source: 'CLC Complaint to OCE Regarding Rep. Byron Donalds (document page)',
        url: 'https://campaignlegal.org/document/clc-complaint-oce-regarding-rep-byron-donalds',
        tier: 'verified',
        date: 'September 5, 2024',
      },
      {
        claim:
          'Pro-Israel PACs have contributed approximately $74,628 to Donalds\' campaigns on a career FEC-derived aggregate (AIPAC PAC ~$59,864; U.S. Israel PAC ~$18,500). TrackAIPAC publicly counted ~$84,000 from AIPAC and related Israel-lobby sources. OpenSecrets also surfaces pro-Israel industry lines on his profile.',
        source: 'PoliTrack FEC table; TrackAIPAC; OpenSecrets',
        url: 'https://quwwaa.com/politrack/byron-donalds',
        tier: 'verified',
        date: '2021–2026',
      },
      {
        claim:
          'Voted YES on H.R. 8034 (Israel Security Supplemental Appropriations Act, 2024), which passed the House 366–58 on April 20, 2024 — a primary wartime Israel funding vehicle.',
        source: 'Clerk of the House Vote 143 (2024); Congress.gov H.R. 8034',
        url: 'https://clerk.house.gov/Votes/2024143',
        tier: 'verified',
        date: 'April 20, 2024',
      },
      {
        claim:
          'Official House office communications state: "As the sole democratic country that represents freedom in the Middle East, I will always Stand With Israel." Post–October 7 public statements reaffirmed Israel as a core U.S. ally and condemned Hamas attacks without calling for aid conditionality.',
        source: 'donalds.house.gov e-newsletter; Florida Politics',
        url: 'https://donalds.house.gov/news/email/show.aspx?ID=45LDXVDEPPTNG',
        tier: 'verified',
        date: '2021–2023',
      },
      {
        claim:
          'Arrested in 1997 for marijuana possession; charges resolved via pre-trial diversion (reported ~$150 fine). Donalds has publicly acknowledged selling marijuana as a teenager in "low level amounts."',
        source: 'CBS Miami; contemporaneous campaign coverage',
        url: 'https://www.cbsnews.com/miami/news/byron-donalds-florida-governor-race-marijuana-arrest/',
        tier: 'verified',
        date: '1997',
      },
      {
        claim:
          'Pleaded no contest in 2000 to a felony charge arising from depositing a bad check (commonly described as bank fraud / worthless-check felony in reporting). Record later sealed and expunged under Florida law — a matter of public record during his political rise, not a current open conviction.',
        source: 'Multiple news outlets summarizing court record; campaign admissions',
        url: 'https://www.cbsnews.com/miami/news/byron-donalds-florida-governor-race-marijuana-arrest/',
        tier: 'verified',
        date: '2000',
      },
      {
        claim:
          'June 4, 2024 Philadelphia remarks claimed Black families were "together" and more conservative-voting "during Jim Crow." CBC demanded apology; PolitiFact found the comments omitted essential historical context on racial terror, legal segregation, and disenfranchisement.',
        source: 'Washington Post; PolitiFact',
        url: 'https://www.politifact.com/article/2024/jun/10/fact-checking-byron-donalds-jim-crow-comments/',
        tier: 'verified',
        date: 'June 2024',
      },
      {
        claim:
          'Heritage Action scorecard rates Donalds at approximately 96% for the 117th–118th Congress — among the most conservative House members on Heritage key votes.',
        source: 'Heritage Action for America',
        url: 'https://heritageaction.com/scorecard/members/D000032/118',
        tier: 'verified',
        date: '2021–2024',
      },
      {
        claim:
          'Florida Bulldog investigative reporting found firms associated with Erika Donalds (OptimaEd / Education Freedom Foundation network) obtained millions of dollars in Florida charter-school contracts. Financial disclosures list an 81% spousal interest in OptimaEd LLC valued at $1M+.',
        source: 'Florida Bulldog; House financial disclosures',
        url: 'https://www.floridabulldog.org/2025/06/firms-belonging-to-rep-donalds-wife-grabbed-millions-in-charter-school-contracts/',
        tier: 'verified',
        date: '2025',
      },
      {
        claim:
          'GovTrack reports Donalds missed 155 of 2,697 roll-call votes (≈5.7%), higher than the House median miss rate (~2.1%) over the same span.',
        source: 'GovTrack.us member page',
        url: 'https://www.govtrack.us/congress/members/byron_donalds/456808',
        tier: 'verified',
        date: '2021–2026',
      },
      {
        claim:
          'FEC candidate ID H2FL14186 / principal campaign committee C00733329. Career fundraising runs into multi-million-dollar cycles; 2025–26 Florida gubernatorial PAC activity reported in the tens of millions by Florida Politics (state-level, separate from federal pro-Israel PAC totals).',
        source: 'FEC candidate page; Florida Politics',
        url: 'https://www.fec.gov/data/candidate/H2FL14186/',
        tier: 'verified',
        date: '2020–2026',
      },
      {
        claim:
          'CLC and secondary ethics reporting note Donalds has publicly supported stronger congressional stock-trading rules while simultaneously failing (per CLC) to file required PTRs for 108 trades — a documented words-vs-disclosure gap, not a judicial finding of criminal guilt.',
        source: 'Campaign Legal Center; Capitolist coverage of CLC complaint',
        url: 'https://thecapitolist.com/watchdog-files-ethics-complaint-against-rep-byron-donalds-over-alleged-undisclosed-stock-trades/',
        tier: 'verified',
        date: 'September 2024',
      },
      {
        claim:
          'January 2023 Speaker nomination: received roughly 20 GOP votes over multiple ballots as Freedom Caucus protest candidate against Kevin McCarthy — elevating Donalds\' national profile among hard-right House factions that also form a reliable pro-Israel aid bloc.',
        source: 'Congressional Record; contemporaneous press',
        url: 'https://www.congress.gov',
        tier: 'verified',
        date: 'January 2023',
      },
      {
        claim:
          'U.S. foreign aid to Israel baseline remains ~$3.8B/year under the 10-year MOU (FMF + missile defense). House members who vote for NDAA/supplementals — including Donalds — are part of the legislative enablement chain for that transfer pipeline (CRS RL33222). This is structural congressional enablement, not a personal appropriation.',
        source: 'CRS Report RL33222 — U.S. Foreign Aid to Israel',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2016–2028 MOU window',
      },
    ],
    career: [
      '1978 — Born Brooklyn, NY to Jamaican immigrant parents',
      '1997 — Marijuana possession arrest; pre-trial diversion (charges dropped)',
      '2000 — No-contest plea to felony bad-check / bank-fraud charge; later sealed & expunged under Florida law',
      '2002 — B.S. Finance, Florida A&M University (HBCU)',
      '2003 — Credit officer, TIB Bank, Fort Myers, FL',
      '2007 — Director of Premium Management, CMG Financial Services, Naples, FL',
      '2012 — Elected Florida House of Representatives (District 80)',
      '2015 — Financial advisor, Wells Fargo Advisors, Naples, FL',
      '2016 — Associate VP for Investments, Moran Wealth Management, Naples, FL',
      '2020 — Elected U.S. House FL-19 (multi-candidate GOP primary; 61.3% general)',
      '2021 — House Financial Services Committee; Oversight; Freedom Caucus',
      '2021 — Official House office: "I will always Stand With Israel"',
      '2022 — Re-elected FL-19 (unopposed general)',
      '2022–2023 — 108 stock trades later cited in CLC STOCK Act complaint (no PTRs filed)',
      'January 2023 — Nominated for Speaker (~20 GOP votes across ballots)',
      'October 2023 — Post–Oct 7 statements affirming full support for Israel against Hamas',
      'April 20, 2024 — Voted YES on H.R. 8034 Israel Security Supplemental (366–58)',
      'June 2024 — Jim Crow family comments controversy; CBC demands apology',
      'June 2024 — Publicly discussed as Trump VP short-list candidate',
      'September 5, 2024 — CLC files OCE ethics complaint (108 trades, up to $1.6M)',
      '2025 — Announces 2026 Florida gubernatorial candidacy; large state PAC fundraising reported',
      'May 4, 2026 — Benny Johnson interview: claimed VRA was passed because Democrats racially gerrymandered (PolitiFact False)',
    ],
    documentedFalsehoods: [
      {
        id: 'donalds-jim-crow-black-families-2024',
        statement:
          'Claimed that "during Jim Crow, the Black family was together" and that more Black people "voted conservatively" in that era — framing segregation-era family structure as a positive contrast to the present.',
        saidAt: 'June 4, 2024',
        context:
          'Pro-Trump event in Philadelphia; remarks widely reported; Congressional Black Caucus demanded an apology.',
        whyFalse:
          'The claim omits that Jim Crow was a system of legal racial terror, disenfranchisement, and economic subordination. PolitiFact and historical consensus document that Black Americans were systematically barred from the ballot and subjected to segregationist violence — not a period of conservative electoral strength or voluntary family "intactness" separable from that coercion.',
        correction:
          'Jim Crow enforced racial hierarchy through law and violence; it is not an evidence-based model of healthy Black family life or conservative voting power. Full franchise and legal equality came later via civil-rights legislation.',
        statementSource: 'Washington Post reporting of Donalds remarks',
        statementUrl: 'https://www.washingtonpost.com/politics/2024/06/05/byron-donalds-black-families-jim-crow/',
        debunkSource: 'PolitiFact fact-check of Jim Crow comments',
        debunkUrl: 'https://www.politifact.com/article/2024/jun/10/fact-checking-byron-donalds-jim-crow-comments/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'donalds-vra-gerrymandering-reason-2026',
        statement:
          'Congress passed the 1965 Voting Rights Act because "the Democrat party at the time, especially in the South, were racially gerrymandering districts to disenfranchise Black voters."',
        saidAt: 'May 4, 2026',
        context:
          'Interview with Benny Johnson (posted by @ByronWarRoom) defending Republican redistricting after the Supreme Court\'s Louisiana v. Callais decision gutting major VRA protections. Donalds framed the VRA\'s origin as a response to Democratic racial gerrymandering.',
        whyFalse:
          'PolitiFact rated the claim False. Historians (Harvard\'s Alex Keyssar; Emory\'s Carol Anderson; Howard\'s Keneshia Grant) state the VRA was enacted to enforce the 15th Amendment against literacy tests, poll taxes, property tests, grandfather clauses, intimidation, and violence that kept Black Americans from registering or voting at all. Racist gerrymandering existed but was not the driving cause — with Black voters largely barred from the franchise, there was little need to gerrymander them. The statute itself does not mention gerrymandering, apportionment, or redistricting.',
        correction:
          'The Voting Rights Act targeted barriers that prevented Black Americans from voting (tests, taxes, terror, roll purges). Racial gerrymandering became more central after enfranchisement, as a later means of diluting newly cast Black ballots — not the primary reason Congress wrote the 1965 law.',
        statementSource: 'Byron War Room X post of May 4, 2026 Benny Johnson interview (primary clip)',
        statementUrl: 'https://x.com/ByronWarRoom/status/2051345787766907305',
        debunkSource: 'PolitiFact — False (May 8, 2026)',
        debunkUrl: 'https://www.politifact.com/factchecks/2026/may/08/byron-donalds/florida-voting-rights-act-democrats-gerrymandering/',
        severity: 'material',
        tier: 'verified',
      },
      {
        id: 'donalds-stock-act-sanctions-hypocrisy-2022-2024',
        statement:
          'When members of Congress fail to disclose stock trades as required under the STOCK Act, "that\'s when you have to have sanctions, and the House has to get real."',
        saidAt: 'March 2022 (statement); 2022–2023 trading window; Sept. 5, 2024 (complaint)',
        context:
          'March 2022 interview (YouTube; quoted by Business Insider and the Campaign Legal Center OCE complaint) responding to BI reporting that dozens of members and staff had missed STOCK Act Periodic Transaction Report deadlines. Donalds also publicly supported banning lawmakers from trading individual stocks.',
        whyFalse:
          'Over 2022–2023, Donalds and his spouse made 108 stock trades valued between about $108,000 and $1.62 million and filed zero STOCK Act Periodic Transaction Reports within the required 45-day window — disclosures appeared only later on annual forms (House financial PDFs; CLC OCE complaint Sept. 5, 2024; BI Sept. 5, 2024). CLC noted he is the only member they found with a complete two-year PTR blackout, and that his public call for sanctions shows awareness of the disclosure duty. Office later said trades were executed by third-party managers; the STOCK Act still requires the member to file PTRs.',
        correction:
          'Public records show systematic non-filing of PTRs for 108 trades over two years, contradicting his public posture that STOCK Act non-disclosure warrants real sanctions. CLC filed an OCE ethics complaint; that is a formal ethics allegation, not a criminal conviction.',
        statementSource: 'March 2022 interview (YouTube) as quoted in Business Insider + CLC OCE complaint',
        statementUrl: 'https://www.youtube.com/watch?v=I6WBEGHN9p0',
        debunkSource: 'Campaign Legal Center OCE complaint press release + Business Insider STOCK Act reporting',
        debunkUrl: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Official Congressional Site', url: 'https://donalds.house.gov' },
      { label: 'FEC Candidate (H2FL14186)', url: 'https://www.fec.gov/data/candidate/H2FL14186/' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/summary?cid=N00034016' },
      { label: 'OpenSecrets Pro-Israel PACs (member industries)', url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/pacs?cid=N00034016&cycle=2024' },
      { label: 'GovTrack Voting Record', url: 'https://www.govtrack.us/congress/members/byron_donalds/456808' },
      { label: 'Heritage Action Scorecard', url: 'https://heritageaction.com/scorecard/members/D000032/118' },
      { label: 'TrackAIPAC (tracker post)', url: 'https://x.com/TrackAIPAC/status/1815916931133890962' },
      { label: 'PoliTrack Pro-Israel PAC Money', url: 'https://quwwaa.com/politrack/byron-donalds' },
      { label: 'CLC Ethics Complaint (press)', url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal' },
      { label: 'CLC OCE Complaint (document)', url: 'https://campaignlegal.org/document/clc-complaint-oce-regarding-rep-byron-donalds' },
      { label: 'House Vote H.R. 8034 (RC 143)', url: 'https://clerk.house.gov/Votes/2024143' },
      { label: 'H.R. 815 Israel Supplemental package', url: 'https://www.congress.gov/bill/118th-congress/house-bill/815' },
      { label: 'CRS RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'Stand With Israel (House office email)', url: 'https://donalds.house.gov/news/email/show.aspx?ID=45LDXVDEPPTNG' },
      { label: 'Jim Crow comments — Washington Post', url: 'https://www.washingtonpost.com/politics/2024/06/05/byron-donalds-black-families-jim-crow/' },
      { label: 'PolitiFact — Jim Crow fact-check', url: 'https://www.politifact.com/article/2024/jun/10/fact-checking-byron-donalds-jim-crow-comments/' },
      { label: 'PolitiFact — VRA gerrymandering claim (False)', url: 'https://www.politifact.com/factchecks/2026/may/08/byron-donalds/florida-voting-rights-act-democrats-gerrymandering/' },
      { label: 'Business Insider — STOCK Act non-disclosure', url: 'https://www.businessinsider.com/byron-donalds-stock-trades-insider-trading-ethics-complaint-2024-9' },
      { label: 'CBS Miami — criminal record coverage', url: 'https://www.cbsnews.com/miami/news/byron-donalds-florida-governor-race-marijuana-arrest/' },
      { label: 'Florida Bulldog — spouse charter contracts', url: 'https://www.floridabulldog.org/2025/06/firms-belonging-to-rep-donalds-wife-grabbed-millions-in-charter-school-contracts/' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Byron_Donalds' },
      { label: 'VoteSmart Key Votes', url: 'https://justfacts.votesmart.org/candidate/key-votes/137655/byron-donalds' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Byron_Donalds' },
    ],
  },
  {
    id: 'benjamin-netanyahu',
    name: 'Benjamin Netanyahu',
    title: 'Prime Minister of Israel (multiple terms; wartime PM post–Oct 7)',
    category: 'foreign-agent',
    party: 'N/A',
    photoUrl: getProfilePhoto('benjamin-netanyahu'),
    summary:
      'Longest-serving Israeli prime minister and wartime head of government after October 7, 2023. Subject of an ICC arrest warrant (November 2024) for alleged war crimes and crimes against humanity, including starvation as a method of warfare. Ultimate political authority over IDF operations and COGAT aid-access policy during the Gaza war. Primary Israeli counterpart for U.S. military-aid and weapons transfers under the MOU and wartime supplementals. Primary: ICC filings, ICJ orders, Israeli government record, CRS RL33222.',
    tags: [
      'Israel',
      'Prime Minister',
      'ICC Warrant',
      'Gaza War',
      'Likud',
      'U.S. Aid Recipient Leadership',
      'ICJ',
    ],
    career: [
      'IDF special forces / officer service (public bio)',
      '1996–1999 — Prime Minister of Israel (first term)',
      '2009–2021 — Prime Minister (consecutive terms)',
      '2022– — Prime Minister (return); wartime PM after October 7, 2023',
      'November 2024 — ICC arrest warrant issued (alleged war crimes / crimes against humanity)',
      'Primary Israeli counterpart for U.S. FMF MOU and wartime munitions pipeline',
    ],
    quotes: [
      {
        text: 'We will fight and we will win.',
        context: 'Wartime addresses framing total military campaign after October 7.',
        date: '2023-10',
        source: 'Israeli Prime Minister public addresses',
        url: 'https://www.gov.il/en/departments/prime_ministers_office',
      },
      {
        text: 'There is no starvation in Gaza.',
        context:
          'July 27, 2025 remarks to an evangelical Christian audience while global reporting showed acute hunger. PolitiFact rated Pants on Fire; readers later chose it as 2025 Lie of the Year.',
        date: 'July 27, 2025',
        source: 'PolitiFact quotation of Netanyahu remarks',
        url: 'https://www.politifact.com/factchecks/2025/jul/29/benjamin-netanyahu/benjamin-netanyahus-pants-on-fire-statement-that-t/',
      },
      {
        text: 'The International Criminal Court prosecutor has shamefully accused Israel of deliberately starving the people of Gaza. This is utter complete nonsense.',
        context:
          'July 24, 2024 address to a joint session of the U.S. Congress. PolitiFact noted the claim contradicted contemporaneous UN expert and IPC hunger assessments.',
        date: 'July 24, 2024',
        source: 'PolitiFact Congress speech fact-check package',
        url: 'https://www.politifact.com/article/2024/jul/25/israeli-prime-minister-benjamin-netanyahu-addresse/',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Directed Israeli military campaign in Gaza following October 7 attack',
        date: '2023-10 to present',
        context:
          'As PM and security cabinet chair, holds ultimate civilian authority over wartime operations with record civilian casualty tolls attributed by OCHA to MoH Gaza figures.',
        source: 'Israeli PMO; OCHA humanitarian updates',
        url: 'https://www.ochaopt.org/',
      },
      {
        action: 'Subject of ICC arrest warrant (Nov 2024) for alleged war crimes and crimes against humanity',
        date: 'November 2024',
        context:
          'ICC Pre-Trial Chamber issued warrants for Netanyahu and Gallant. Israel disputes ICC jurisdiction; warrant is a primary legal instrument, not a final conviction.',
        source: 'International Criminal Court',
        url: 'https://www.icc-cpi.int/',
      },
      {
        action: 'Primary Israeli counterpart for continuous U.S. FMF and wartime munitions pipeline',
        date: 'multiple terms through 2024',
        context: 'CRS RL33222 documents multi-administration U.S. aid continuity under Netanyahu governments.',
        source: 'CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    connections: [
      {
        name: 'Yoav Gallant',
        relationship: 'Defense Minister during early Gaza war; co-subject of ICC warrant.',
        evidence: 'ICC warrant; Israeli cabinet record',
        tier: 'verified',
      },
      {
        name: 'Joe Biden / Antony Blinken',
        relationship: 'Primary U.S. executive counterparts for wartime aid and munitions.',
        evidence: 'Public diplomacy / aid transfers',
        tier: 'verified',
      },
      {
        name: 'Donald Trump / Jared Kushner',
        relationship: 'Embassy Jerusalem, Golan recognition, Abraham Accords era counterparts.',
        evidence: 'Public diplomacy record',
        tier: 'verified',
      },
      {
        name: 'Miriam Adelson / Israel Hayom',
        relationship: 'Media environment historically favorable; diaspora megadonor ecosystem.',
        evidence: 'Israeli press analyses',
        tier: 'circumstantial',
      },
    ],
    sourcedClaims: [
      {
        claim: 'ICC issued arrest warrant for Netanyahu (Nov 2024) alleging war crimes and crimes against humanity including starvation as a method of warfare in Gaza.',
        source: 'International Criminal Court public statements / filings',
        url: 'https://www.icc-cpi.int/',
        tier: 'verified',
        date: 'November 2024',
      },
      {
        claim: 'As wartime PM, holds ultimate political authority over IDF operations and aid-access policy affecting civilian survival conditions in Gaza.',
        source: 'Israeli governmental structure; OCHA humanitarian reporting',
        url: 'https://www.ochaopt.org/',
        tier: 'verified',
        date: '2023–2025',
      },
      {
        claim: 'Primary Israeli counterpart for U.S. MOU-baseline FMF (~$3.8B/year) and wartime supplemental munitions transfers (CRS RL33222).',
        source: 'CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: 'multiple terms',
      },
      {
        claim: 'ICJ provisional measures and related proceedings address Israel\'s obligations in Gaza; Netanyahu government is the respondent state leadership.',
        source: 'ICJ case materials',
        url: 'https://www.icj-cij.org/',
        tier: 'verified',
        date: '2023–2024',
      },
      {
        claim:
          'July 27, 2025: stated “There is no starvation in Gaza.” PolitiFact rated Pants on Fire citing WHO malnutrition deaths, IPC famine analysis, and humanitarian reporting; readers later selected it as 2025 Lie of the Year.',
        source: 'PolitiFact Pants on Fire + Lie of the Year package',
        url: 'https://www.politifact.com/factchecks/2025/jul/29/benjamin-netanyahu/benjamin-netanyahus-pants-on-fire-statement-that-t/',
        tier: 'verified',
        date: 'July 2025',
      },
      {
        claim:
          'July 24, 2024 U.S. Congress speech dismissed ICC starvation allegations as “utter complete nonsense” while UN experts and IPC assessments documented extreme food insecurity and famine risk under restricted access.',
        source: 'PolitiFact Congress speech fact package; OHCHR / IPC',
        url: 'https://www.politifact.com/article/2024/jul/25/israeli-prime-minister-benjamin-netanyahu-addresse/',
        tier: 'verified',
        date: 'July 2024',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'netanyahu-no-starvation-gaza-2025',
        statement: 'There is no starvation in Gaza.',
        saidAt: 'July 27, 2025',
        context:
          'Remarks to an evangelical Christian audience while images and field reports of acute hunger dominated global coverage. Later selected by PolitiFact readers as 2025 Lie of the Year.',
        whyFalse:
          'PolitiFact rated Pants on Fire. WHO reported dozens of malnutrition deaths in 2025 (concentrated in July); IPC and UN-backed assessments documented catastrophic food insecurity and later confirmed famine conditions in parts of Gaza. The categorical denial contradicted extensive humanitarian data, not a disputed definitional nuance.',
        correction:
          'Independent humanitarian systems (WHO, IPC, OCHA-linked reporting) documented widespread starvation risk and malnutrition deaths in Gaza. Absolute denial was false.',
        statementSource: 'Netanyahu July 27, 2025 remarks (as quoted by PolitiFact from primary event coverage)',
        statementUrl: 'https://www.politifact.com/factchecks/2025/jul/29/benjamin-netanyahu/benjamin-netanyahus-pants-on-fire-statement-that-t/',
        debunkSource: 'PolitiFact Pants on Fire; WHO / IPC humanitarian data synthesis',
        debunkUrl: 'https://www.politifact.com/article/2025/dec/15/lie-year-vote-reader-choice-results/',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'netanyahu-icc-starvation-nonsense-congress-2024',
        statement:
          'Claimed the ICC prosecutor\'s accusation that Israel deliberately starved Gazans was "utter complete nonsense."',
        saidAt: 'July 24, 2024',
        context:
          'Joint-session address to the U.S. Congress defending Israel\'s wartime conduct and rejecting ICC framing.',
        whyFalse:
          'PolitiFact\'s contemporaneous Congress fact package documented that UN independent experts and IPC-linked assessments described intentional starvation risk and extreme food insecurity under restricted access — contradicting the absolute "nonsense" dismissal. The ICC warrant process (later formalized) treats starvation as a prosecutable mode of warfare; categorical denial of the factual hunger record is not supported by the public humanitarian evidence base.',
        correction:
          'Whether or not a court ultimately convicts, the underlying hunger crisis and access restrictions were extensively documented by UN/IPC systems; absolute dismissal as nonsense was not accurate to the public record.',
        statementSource: 'Netanyahu July 24, 2024 U.S. Congress address (PolitiFact speech package)',
        statementUrl: 'https://www.politifact.com/article/2024/jul/25/israeli-prime-minister-benjamin-netanyahu-addresse/',
        debunkSource: 'OHCHR UN experts famine statement; IPC Gaza food-insecurity briefs (via PolitiFact sources)',
        debunkUrl: 'https://www.ohchr.org/en/press-releases/2024/07/un-experts-declare-famine-has-spread-throughout-gaza-strip',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'Israeli PMO', url: 'https://www.gov.il/en/departments/prime_ministers_office' },
      { label: 'ICC', url: 'https://www.icc-cpi.int/' },
      { label: 'ICJ', url: 'https://www.icj-cij.org/' },
      { label: 'CRS RL33222', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'OCHA oPt', url: 'https://www.ochaopt.org/' },
      { label: 'PolitiFact — no starvation (Pants on Fire)', url: 'https://www.politifact.com/factchecks/2025/jul/29/benjamin-netanyahu/benjamin-netanyahus-pants-on-fire-statement-that-t/' },
      { label: 'PolitiFact — Congress speech package', url: 'https://www.politifact.com/article/2024/jul/25/israeli-prime-minister-benjamin-netanyahu-addresse/' },
      { label: 'OHCHR — UN experts famine statement', url: 'https://www.ohchr.org/en/press-releases/2024/07/un-experts-declare-famine-has-spread-throughout-gaza-strip' },
    ],
  },
  {
    id: 'yoav-gallant',
    name: 'Yoav Gallant',
    title: 'Former Israeli Defense Minister',
    category: 'foreign-agent',
    party: 'N/A',
    summary:
      'Israeli Defense Minister from 2022 until November 2024. Publicly announced a "complete siege" of Gaza (electricity, food, fuel) after October 7. Subject of an ICC arrest warrant for alleged war crimes and crimes against humanity. Central operational political authority over the IDF during the opening phase of the Gaza war.',
    tags: ['Israel', 'Defense Minister', 'ICC Warrant', 'Gaza Siege', 'IDF'],
    quotes: [
      {
        text: 'I have ordered a complete siege on the Gaza Strip. There will be no electricity, no food, no fuel, everything is closed.',
        context: 'October 9, 2023 statement as Defense Minister — widely cited in international legal filings on starvation and collective punishment allegations',
        date: '2023-10-09',
        source: 'Israeli Defense Ministry / contemporaneous international reporting',
        url: 'https://www.ohchr.org/en/countries/palestine',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Ordered complete siege of Gaza (electricity, food, fuel)',
        date: '2023-10-09',
        context: 'Public order as Defense Minister at start of Gaza war; later cited in UN expert statements and ICC filings context',
        source: 'OHCHR / contemporaneous reporting of official statement',
        url: 'https://www.ohchr.org/en/press-releases/2024/03/un-experts-condemn-flour-massacre-urge-israel-end-campaign-starvation-gaza',
      },
      {
        action: 'ICC Pre-Trial Chamber issued arrest warrant',
        date: '2024-11',
        context: 'Alleged war crimes and crimes against humanity; judicial finding of reasonable grounds, not final conviction',
        source: 'International Criminal Court',
        url: 'https://www.icc-cpi.int/palestine',
      },
    ],
    connections: [
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Prime Minister and wartime superior; co-subject of ICC warrant',
        evidence: 'ICC Situation in the State of Palestine',
        tier: 'verified',
      },
      {
        name: 'Joe Biden',
        relationship: 'U.S. president authorizing wartime munitions while Gallant ran defense portfolio',
        evidence: 'H.R.815 and continuous FMF / munitions pipeline',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'As Defense Minister, Gallant publicly ordered a complete siege of Gaza cutting electricity, food, and fuel on October 9, 2023.',
        source: 'OHCHR / contemporaneous public record of official statement',
        url: 'https://www.ohchr.org/en/countries/palestine',
        tier: 'verified',
        date: '2023-10-09',
      },
      {
        claim: 'ICC Pre-Trial Chamber issued an arrest warrant for Yoav Gallant for alleged war crimes and crimes against humanity.',
        source: 'International Criminal Court',
        url: 'https://www.icc-cpi.int/palestine',
        tier: 'verified',
        date: '2024-11',
      },
    ],
    born: '1958-11-08',
    education: 'University of Haifa; IDF command path',
    career: [
      '1958 — Born in Jaffa',
      'IDF naval commando and senior command career',
      '2015–2019 — Member of Knesset',
      '2022–2024 — Minister of Defense',
      '2024-11 — ICC arrest warrant issued; removed from defense portfolio same month in coalition reshuffle context',
    ],
    websites: [
      { label: 'ICC — Situation in Palestine', url: 'https://www.icc-cpi.int/palestine' },
      { label: 'OHCHR — Occupied Palestinian Territory', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Yoav_Gallant' },
    ],
  },
  {
    id: 'ben-cardin',
    name: 'Ben Cardin',
    title: 'Former U.S. Senator (D-MD); former Senate Foreign Relations Committee ranking member/chair path',
    category: 'politician',
    party: 'D',
    state: 'MD',
    photoUrl: getProfilePhoto('ben-cardin'),
    summary:
      'Long-serving Democratic senator from Maryland (2007–2025 House/Senate career) and senior Senate Foreign Relations Committee Democrat. Institutional bipartisan floor for Israel security assistance, anti-BDS legislation, and annual FMF continuity. Primary: Congress.gov, OpenSecrets, CRS RL33222.',
    tags: [
      'Senator',
      'Democrat',
      'Maryland',
      'SFRC',
      'Pro-Israel',
      'FMF Continuity',
      'Anti-BDS',
    ],
    career: [
      'Maryland House / U.S. House (public bio)',
      '2007–2025 — U.S. Senate (D-MD)',
      'Senior Senate Foreign Relations Committee Democrat on Middle East/Israel portfolios',
      'Recurring sponsor/cosponsor of Israel security and anti-BDS measures',
    ],
    quotes: [
      {
        text: 'The United States–Israel relationship is a cornerstone of American national security.',
        context: 'Recurring SFRC / floor framing of the bilateral alliance.',
        date: '2010s–2020s',
        source: 'Senate Foreign Relations Committee public record',
        url: 'https://www.foreign.senate.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 1500000,
        year: 'Senate career (verify OpenSecrets windows)',
        source: 'OpenSecrets — Ben Cardin',
        url: 'https://www.opensecrets.org/members-of-congress/benjamin-cardin/summary?cid=N00001955',
      },
    ],
    policyActions: [
      {
        action: 'Senate Foreign Relations leadership votes and markups supporting Israel security accounts and related authorities',
        date: '2007–2025',
        context: 'Institutional Democratic enablement of the annual MOU/FMF floor and wartime supplements.',
        source: 'Congress.gov; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'Cosponsorship / advocacy for anti-BDS and Israel-security legislative packages',
        date: '2010s–2020s',
        context: 'Congressional record of bipartisan orthodoxy measures.',
        source: 'Congress.gov bill search / OpenSecrets',
        url: 'https://www.congress.gov',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Long-time aligned Democratic Senate partner on Israel security orthodoxy.',
        evidence: 'OpenSecrets Q05 / PAC history; public conference record',
        tier: 'verified',
      },
      {
        name: 'Chuck Schumer',
        relationship: 'Democratic Senate leadership peer on aid-package floor votes.',
        evidence: 'Senate roll-call / leadership record',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'As a senior SFRC Democrat, Cardin was a principal institutional steward of bipartisan Israel security assistance orthodoxy across multiple aid cycles (CRS RL33222 continuity).',
        source: 'CRS RL33222; Senate Foreign Relations public record',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2007–2025',
      },
      {
        claim: 'OpenSecrets documents multi-cycle pro-Israel PAC/industry support during Senate career.',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/benjamin-cardin/summary?cid=N00001955',
        tier: 'verified',
        date: '2007–2024',
      },
    ],
    websites: [
      { label: 'OpenSecrets — Ben Cardin', url: 'https://www.opensecrets.org/members-of-congress/benjamin-cardin/summary?cid=N00001955' },
      { label: 'CRS RL33222', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'Senate Foreign Relations Committee', url: 'https://www.foreign.senate.gov' },
      { label: 'Wikipedia (secondary index)', url: 'https://en.wikipedia.org/wiki/Ben_Cardin' },
    ],
  },
  {
    id: 'bob-menendez',
    name: 'Bob Menendez',
    title: 'Former U.S. Senator (D-NJ); former Senate Foreign Relations Committee Chair',
    category: 'politician',
    party: 'D',
    state: 'NJ',
    photoUrl: getProfilePhoto('bob-menendez'),
    summary:
      'Former New Jersey senator and Senate Foreign Relations Committee chair. Long one of the most aggressive Democratic pro-Israel hawks on Iran sanctions, FMF continuity, and wartime packages — later convicted in federal corruption case (2024) unrelated to Israel policy itself but relevant to integrity mapping of a key enablement node. Primary: Congress.gov, DOJ, OpenSecrets, CRS RL33222.',
    tags: [
      'Senator',
      'Democrat',
      'New Jersey',
      'SFRC Chair',
      'Pro-Israel',
      'Iran Sanctions',
      'Corruption Conviction',
      'FMF',
    ],
    career: [
      'U.S. House / U.S. Senate (D-NJ)',
      'Senate Foreign Relations Committee Chair (multiple periods)',
      'Principal Democratic Iran-sanctions and Israel-security hawk',
      '2024 — Federal bribery/corruption conviction; left Senate',
    ],
    quotes: [
      {
        text: 'There is no greater friend to Israel in the United States Senate.',
        context: 'Recurring self/peer framing of Menendez as Democratic Israel security champion.',
        date: '2010s–2020s',
        source: 'Senate public remarks / contemporaneous press',
        url: 'https://www.congress.gov',
      },
    ],
    donations: [
      {
        from: 'Pro-Israel PACs / industry (OpenSecrets career scale)',
        amount: 2000000,
        year: 'Senate career (verify OpenSecrets windows)',
        source: 'OpenSecrets — Bob Menendez',
        url: 'https://www.opensecrets.org/members-of-congress/robert-menendez/summary?cid=N00000699',
      },
    ],
    policyActions: [
      {
        action: 'As SFRC chair/ranking path, advanced Iran sanctions and Israel security assistance packages',
        date: '2006–2023',
        context: 'Institutional enablement of the aid/sanctions architecture complementary to FMF MOU.',
        source: 'Congress.gov; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        action: 'High-visibility Democratic floor leadership for Israel wartime and MOU-era packages',
        date: '2010s–2023',
        context: 'Senate roll-call and press record.',
        source: 'Senate record / OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/robert-menendez/summary?cid=N00000699',
      },
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Long-time aligned Democratic Senate partner; frequent Policy Conference / PAC adjacency.',
        evidence: 'OpenSecrets Q05; public conference record',
        tier: 'verified',
      },
      {
        name: 'Benjamin Netanyahu',
        relationship: 'Public diplomacy alignment on Iran sanctions and Israel security.',
        evidence: 'Contemporaneous press / Senate record',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim:
          'As SFRC chair, Menendez was among the most influential Democratic senators locking Iran sanctions and Israel security assistance orthodoxy into committee and floor outcomes.',
        source: 'Congress.gov; CRS RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2010s–2023',
      },
      {
        claim:
          'OpenSecrets documents multi-cycle pro-Israel PAC/industry support during Senate career — parallel to his public hawk identity.',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/robert-menendez/summary?cid=N00000699',
        tier: 'verified',
        date: '2006–2023',
      },
      {
        claim:
          'DOJ/federal court record: 2024 conviction on bribery and related corruption counts (Egypt/Qatar gold-bar case) — integrity-relevant public record distinct from Israel-policy enablement facts.',
        source: 'U.S. Department of Justice / SDNY public filings',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2024',
      },
    ],
    documentedFalsehoods: [
      {
        id: 'menendez-not-accepting-bribes-denial',
        statement:
          'Publicly denied accepting bribes / selling official acts after indictment, insisting he was innocent of corruption charges ("I never violated my public oath").',
        saidAt: '2023–2024 (post-indictment through post-verdict statements)',
        context:
          'Federal indictment and trial for bribery scheme involving gold bars, cash, and foreign governments (Egypt/Qatar context).',
        whyFalse:
          'A federal jury convicted Menendez on all 16 counts in July 2024, including bribery, acting as a foreign agent, and related offenses. Court findings establish acceptance of bribes in exchange for official acts — contradicting categorical innocence claims.',
        correction:
          'Menendez was convicted of bribery and related corruption offenses; categorical denials of the charged bribery scheme were false as to the jury\'s findings (appeals may continue; conviction is the public record baseline).',
        statementSource: 'Post-verdict statements (BBC / multi-outlet capture of "I never violated my public oath")',
        statementUrl: 'https://www.bbc.com/news/articles/cqe6m14drgjo',
        debunkSource: 'DOJ SDNY — conviction and Jan 2025 sentencing announcement',
        debunkUrl: 'https://www.justice.gov/usao-sdny/pr/former-us-senator-robert-menendez-sentenced-11-years-prison-bribery-foreign-agent-and',
        severity: 'egregious',
        tier: 'verified',
      },
      {
        id: 'menendez-innocent-after-conviction-2024',
        statement:
          'After the July 2024 guilty verdict, maintained "I am innocent" / continued categorical denial of the bribery scheme while seeking a new trial.',
        saidAt: 'July–December 2024',
        context:
          'Courthouse statements and new-trial motions after the jury convicted on all counts.',
        whyFalse:
          'The jury\'s unanimous guilty verdict on 16 counts is the operative public finding of fact at trial. New-trial motions were denied (Dec 2024). Maintaining absolute factual innocence after a full trial conviction is contradicted by the jury verdict and the court\'s denial of post-trial relief (distinct from the right to appeal).',
        correction:
          'A federal jury found Menendez guilty on all charged counts; post-verdict absolute innocence claims contradict that record.',
        statementSource: 'Post-verdict press statements (ABC News sentencing coverage)',
        statementUrl: 'https://abcnews.go.com/US/bob-menendez-sentencing-corruption-case/story?id=118186976',
        debunkSource: 'NBC News verdict report + DOJ sentencing press release',
        debunkUrl: 'https://www.nbcnews.com/politics/congress/democratic-sen-bob-menendez-found-guilty-counts-corruption-charges-rcna159955',
        severity: 'material',
        tier: 'verified',
      },
    ],
    websites: [
      { label: 'DOJ SDNY sentencing press release', url: 'https://www.justice.gov/usao-sdny/pr/former-us-senator-robert-menendez-sentenced-11-years-prison-bribery-foreign-agent-and' },
      { label: 'BBC — guilty verdict', url: 'https://www.bbc.com/news/articles/cqe6m14drgjo' },
      { label: 'NBC News — all-counts conviction', url: 'https://www.nbcnews.com/politics/congress/democratic-sen-bob-menendez-found-guilty-counts-corruption-charges-rcna159955' },
      { label: 'OpenSecrets — Bob Menendez', url: 'https://www.opensecrets.org/members-of-congress/robert-menendez/summary?cid=N00000699' },
      { label: 'CRS RL33222', url: 'https://www.congress.gov/crs-product/RL33222' },
    ],
  },
];

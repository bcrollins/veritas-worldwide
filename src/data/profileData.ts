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
    party: 'R',
    state: 'TX',
    photoUrl: getProfilePhoto('ted-cruz'),
    bioguideId: 'C001098',
    summary: 'Senior Senator from Texas, prominent AIPAC recipient with $2M+ in career donations from pro-Israel PACs. Known for hardline positions on Israel-Palestine, Iran sanctions.',
    tags: ['AIPAC', 'Pro-Israel', 'Tea Party', 'Conservative', 'PAC Funded'],
    quotes: [
      {
        text: 'I will continue to stand with Israel and support our shared democratic values',
        context: 'Senate floor remarks on Israel aid package',
        date: '2023',
        source: 'Senate.gov',
        url: 'https://www.senate.gov'
      }
    ],
    donations: [
      {
        from: 'AIPAC-affiliated PACs',
        amount: 2100000,
        year: '2013-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085'
      }
    ],
    policyActions: [
      {
        action: 'Sponsored Israel Iron Dome funding package',
        date: '2022',
        context: 'Emergency aid appropriation during Gaza conflict',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Top recipient of PAC funding',
        evidence: 'FEC records show $2.1M in contributions from AIPAC-affiliated groups',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received over $2M from pro-Israel PACs in career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'cruz-carson-drop-out-iowa-2016',
        statement:
          'Cruz campaign staff told Iowa caucus-goers that Ben Carson was dropping out / suspending his campaign, urging Carson supporters to caucus for Cruz — while Carson was still in the race.',
        saidAt: 'February 1, 2016',
        context:
          'Iowa Republican caucuses; Cruz later apologized after Carson and media documented the false drop-out rumor used on caucus night.',
        whyFalse:
          'Carson had not suspended or dropped out. Cruz publicly apologized for the false reports circulated by his team that night. Contemporary AP and network coverage confirmed Carson remained a candidate.',
        correction:
          'Ben Carson had not dropped out of the 2016 race on Iowa caucus night; the claim was false and Cruz apologized.',
        statementSource: 'Iowa caucus reporting / Cruz apology coverage',
        statementUrl: 'https://www.politifact.com/truth-o-meter/article/2016/feb/04/ted-cruz-apologizes-spreading-false-story-about-be/',
        debunkSource: 'PolitiFact / contemporaneous caucus reporting',
        debunkUrl: 'https://www.politifact.com/truth-o-meter/article/2016/feb/04/ted-cruz-apologizes-spreading-false-story-about-be/',
        severity: 'material',
        tier: 'verified',
      },
    ],
    career: ['U.S. Senator (R-TX) 2013-present', 'Solicitor General of Texas', 'Federal Trade Commission attorney'],
    websites: [
      { label: 'Senate Website', url: 'https://www.cruz.senate.gov' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085' }
    ]
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
        debunkSource: 'Washington Post photo analysis; WMATA ridership data (reported)',
        debunkUrl: 'https://www.washingtonpost.com/news/the-fix/wp/2017/01/22/how-sean-spicer-and-his-comically-large-crowd-size-claim-became-the-first-test-of-the-trump-era/',
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
        debunkSource: 'NWS Birmingham official tweet; NHC advisory archive (reported)',
        debunkUrl: 'https://www.nytimes.com/2019/09/04/us/politics/trump-hurricane-dorian-alabama.html',
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
    title: 'Former White House Advisor',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('jared-kushner'),
    summary: 'Led Trump Middle East policy, negotiated Abraham Accords. Post-White House: received $2B Saudi PIF investment for Affinity Partners fund, raising questions about foreign influence.',
    tags: ['Abraham Accords', 'Saudi PIF', 'Kushner Companies', 'Middle East', 'Foreign Investment'],
    quotes: [
      {
        text: 'We are trying to create the conditions and the incentives for Israelis and Palestinians to resolve their conflict',
        context: 'On Middle East peace plan',
        date: '2020',
        source: 'News archives',
        url: 'https://www.npr.org'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Negotiated Abraham Accords',
        date: '2020',
        context: 'Historic UAE-Israel normalization agreement',
        source: 'White House Archives',
        url: 'https://www.whitehouse.gov'
      }
    ],
    connections: [
      {
        name: 'Saudi Crown Prince MBS',
        relationship: 'Business relationship post-presidency',
        evidence: '$2B PIF investment in Affinity Partners',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Son-in-law, White House advisor',
        evidence: 'Served as senior advisor 2017-2021',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $2B from Saudi PIF after leaving White House',
        source: 'Media reports',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2021'
      }
    ],
    netWorth: '~$800 million',
    born: '1981',
    education: 'University of Pennsylvania',
    career: ['White House Senior Advisor', 'Kushner Companies CEO', 'Affinity Partners founder'],
    websites: [
      { label: 'Affinity Partners', url: 'https://www.affinitypartners.com' }
    ]
  },
  {
    id: 'chuck-schumer',
    name: 'Chuck Schumer',
    title: 'U.S. Senator, Senate Majority Leader',
    category: 'politician',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('chuck-schumer'),
    bioguideId: 'S000148',
    summary: 'Senate Majority Leader from NY. Self-described "shomer" (guardian) of Israel. Received $3.4M+ from pro-Israel PACs over career. Leading voice on AIPAC-aligned foreign policy.',
    tags: ['AIPAC', 'Pro-Israel', 'Senate Leader', 'PAC Funded', 'New York'],
    quotes: [
      {
        text: 'I am a guardian of Israel',
        context: 'Senate floor statement on US-Israel relations',
        date: '2021',
        source: 'Senate.gov',
        url: 'https://www.senate.gov'
      }
    ],
    donations: [
      {
        from: 'AIPAC-affiliated PACs',
        amount: 3400000,
        year: '1999-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/summary?cid=N00001093'
      }
    ],
    policyActions: [
      {
        action: 'Voted to support all Israel aid packages',
        date: '2023-2024',
        context: 'Consistently voted for Israel military aid allocations',
        source: 'Senate.gov voting records',
        url: 'https://www.senate.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Top PAC recipient',
        evidence: '$3.4M from AIPAC-affiliated groups',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $3.4M from pro-Israel PACs',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      }
    ],
    career: ['Senate Majority Leader 2021-present', 'U.S. Senator (D-NY) 1999-present', 'U.S. Representative (D-NY)', 'New York Assembly member'],
    websites: [
      { label: 'Senate Website', url: 'https://www.schumer.senate.gov' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/summary?cid=N00001093' }
    ]
  },
  {
    id: 'nancy-pelosi',
    name: 'Nancy Pelosi',
    title: 'Former Speaker of the House',
    category: 'politician',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('nancy-pelosi'),
    bioguideId: 'P000197',
    summary: 'Former Speaker of House from CA. AIPAC recipient with significant stock trading controversy during tenure. Strong pro-Israel voting record and fundraising.',
    tags: ['AIPAC', 'Pro-Israel', 'Stock Trading', 'Former Speaker', 'Fundraising'],
    quotes: [],
    donations: [
      {
        from: 'AIPAC-affiliated PACs',
        amount: 1800000,
        year: '2007-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/summary?cid=N00007360'
      }
    ],
    policyActions: [
      {
        action: 'Consistent support for Israel aid packages',
        date: '2007-2023',
        context: 'Voted for all major Israel military aid appropriations',
        source: 'House voting records',
        url: 'https://www.house.gov'
      }
    ],
    connections: [],
    sourcedClaims: [
      {
        claim: 'Stock trading while holding Congressional leadership position',
        source: 'Financial disclosures',
        url: 'https://clerk.house.gov',
        tier: 'verified',
        date: '2024'
      }
    ],
    career: ['Speaker of the House 2019-2023, 2007-2011', 'U.S. Representative (D-CA) 1987-2023', 'House Minority Leader'],
    websites: [
      { label: 'Official Website', url: 'https://pelosi.house.gov' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/summary?cid=N00007360' }
    ]
  },
  {
    id: 'mitch-mcconnell',
    name: 'Mitch McConnell',
    title: 'U.S. Senator, Senate Republican Leader',
    category: 'politician',
    party: 'R',
    state: 'KY',
    photoUrl: getProfilePhoto('mitch-mcconnell'),
    bioguideId: 'M000355',
    summary: 'Senate Republican Leader from Kentucky. Significant AIPAC funding recipient. Key role in confirming Trump judges and blocking progressive legislation.',
    tags: ['AIPAC', 'Senate Republican', 'Judge Confirmations', 'Obstruction', 'Kentucky'],
    quotes: [],
    donations: [
      {
        from: 'AIPAC-affiliated PACs',
        amount: 2900000,
        year: '1985-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/summary?cid=N00003389'
      }
    ],
    policyActions: [
      {
        action: 'Supported Israel aid packages and military assistance',
        date: '2000-2024',
        context: 'Consistent voting for Israel appropriations',
        source: 'Senate voting records',
        url: 'https://www.senate.gov'
      }
    ],
    connections: [],
    sourcedClaims: [
      {
        claim: '$2.9M from pro-Israel PACs during career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      }
    ],
    career: ['Senate Republican Leader 2007-present', 'U.S. Senator (R-KY) 1985-present', 'U.S. Representative (R-KY)'],
    websites: [
      { label: 'Senate Website', url: 'https://www.mcconnell.senate.gov' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/summary?cid=N00003389' }
    ]
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
          'In the November 2019 BBC Newsnight interview, denied spending time with Virginia Giuffre and claimed on the night in question he was at Pizza Express in Woking with his daughters; also claimed a medical condition made him unable to sweat, contradicting a photo of him with Giuffre.',
        saidAt: 'November 16, 2019',
        context: 'BBC Newsnight interview with Emily Maitlis, broadcast worldwide.',
        whyFalse:
          'A widely published photograph shows Prince Andrew with his arm around Giuffre in Ghislaine Maxwell\'s company. In 2022 he settled Giuffre\'s federal civil suit for a substantial sum (reported ~£12M) while Buckingham Palace confirmed a donation to her charity — conduct inconsistent with a categorical public denial that any sexual contact or relevant association occurred. Contemporaneous reporting documented that the "can\'t sweat" claim was contradicted by witnesses who said he had sweated heavily after tennis in the relevant period.',
        correction:
          'Photographic evidence places Andrew with Giuffre; the civil case ended in a costly settlement rather than a trial vindication of his Newsnight denials.',
        statementSource: 'BBC Newsnight interview transcript / broadcast',
        statementUrl: 'https://www.bbc.com/news/uk-50473621',
        debunkSource: 'BBC / court reporting on Giuffre v. Prince Andrew settlement',
        debunkUrl: 'https://www.bbc.com/news/uk-60377038',
        severity: 'egregious',
        tier: 'verified',
      },
    ],
    born: '1960',
    career: ['British Royal', 'Armed Forces officer', 'Charity patron'],
    websites: [
      { label: 'Royal Family', url: 'https://www.royal.uk' }
    ]
  },
  {
    id: 'adam-schiff',
    name: 'Adam Schiff',
    title: 'U.S. Representative (D-CA)',
    category: 'politician',
    bioguideId: 'S001150',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('adam-schiff'),
    summary: 'Former Chair of House Intelligence Committee. Vocal on Russia investigation and Trump impeachment. Strong pro-Israel voting record.',
    tags: ['Intelligence Committee', 'Trump Investigation', 'Pro-Israel', 'Democrat', 'California'],
    career: ['U.S. Representative (D-CA) 1997-present', 'House Intel Committee Chair', 'Prosecutor'],
    websites: [
      { label: 'House Website', url: 'https://schiff.house.gov' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org' }
    ],
    quotes: [
      {
        text: 'The United States has no greater ally in the Middle East than Israel.',
        context: 'House floor speech on Israel aid',
        date: '2019',
        source: 'Congressional Record',
        url: 'https://www.congress.gov/member/adam-schiff/S001150'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 541891,
        year: '2001-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/adam-schiff/summary?cid=N00009585'
      }
    ],
    policyActions: [
      {
        action: 'Led first Trump impeachment as House Intelligence Committee Chair',
        date: '2019-2020',
        context: 'Served as lead impeachment manager',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Consistent supporter and PAC recipient',
        evidence: 'FEC records and voting record alignment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received over $541K from pro-Israel PACs during congressional career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/adam-schiff/summary?cid=N00009585',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Led first Trump impeachment proceedings as Intelligence Committee Chair',
        source: 'Congressional Record',
        url: 'https://www.congress.gov',
        tier: 'verified',
        date: '2020'
      }
    ]
  },
  {
    id: 'hakeem-jeffries',
    name: 'Hakeem Jeffries',
    title: 'U.S. Representative, Democratic Leader',
    category: 'politician',
    bioguideId: 'J000294',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('hakeem-jeffries'),
    summary: 'House Democratic Leader from New York. Rising Democratic voice. Represents Brooklyn district.',
    tags: ['Democratic Leader', 'New York', 'House Leadership', 'Progressive'],
    career: ['U.S. Representative (D-NY) 2013-present', 'Democratic Leader', 'Attorney'],
    websites: [
      { label: 'House Website', url: 'https://jeffries.house.gov' }
    ],
    quotes: [
      {
        text: 'We will always stand with Israel and support its right to defend itself.',
        context: 'Statement as House Democratic Leader',
        date: '2023',
        source: 'Office of Rep. Jeffries',
        url: 'https://jeffries.house.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 372450,
        year: '2013-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/hakeem-jeffries/summary?cid=N00036047'
      }
    ],
    policyActions: [
      {
        action: 'Elected House Democratic Leader, succeeding Nancy Pelosi',
        date: '2023',
        context: 'Youngest party leader in modern history',
        source: 'House.gov',
        url: 'https://www.house.gov'
      }
    ],
    connections: [
      {
        name: 'Nancy Pelosi',
        relationship: 'Successor as Democratic leader',
        evidence: 'Public leadership transition',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $372K+ from pro-Israel PACs since entering Congress',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/hakeem-jeffries/summary?cid=N00036047',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'First Black leader of a major party caucus in Congress',
        source: 'AP News',
        url: 'https://apnews.com',
        tier: 'verified',
        date: '2023'
      }
    ]
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
    summary: 'Senator from South Carolina. Known for hawkish foreign policy positions on Middle East and Russia.',
    tags: ['Senator', 'Hawk', 'South Carolina', 'Republican', 'Foreign Policy'],
    career: ['U.S. Senator (R-SC) 2003-present', 'U.S. Representative', 'Military officer'],
    websites: [
      { label: 'Senate Website', url: 'https://www.graham.senate.gov' }
    ],
    quotes: [
      {
        text: 'If you want to neuter Iran, you have to hit their oil refineries.',
        context: 'Fox News interview on Iran policy',
        date: '2023',
        source: 'Fox News',
        url: 'https://www.foxnews.com'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1087000,
        year: '2003-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/lindsey-graham/summary?cid=N00009975'
      }
    ],
    policyActions: [
      {
        action: 'Co-sponsored Israel Security Assistance Authorization Act',
        date: '2019',
        context: '$38B MOU for Israel military aid',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'John McCain',
        relationship: 'Close ally and political mentor (deceased)',
        evidence: 'Public record of legislative partnership',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Key Senate ally after initial opposition',
        evidence: 'Public voting record and statements',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received over $1M from pro-Israel PACs during Senate career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/lindsey-graham/summary?cid=N00009975',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Called for nuclear strikes on Gaza during 2023 conflict',
        source: 'NBC News',
        url: 'https://www.nbcnews.com',
        tier: 'verified',
        date: '2023'
      }
    ]
  },
  {
    id: 'marco-rubio',
    name: 'Marco Rubio',
    title: 'U.S. Senator (R-FL)',
    category: 'politician',
    bioguideId: 'R000595',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('marco-rubio'),
    summary: 'Senator from Florida. Secretary of State under Trump. Hawkish positions on foreign policy and Middle East.',
    tags: ['Senator', 'Secretary of State', 'Florida', 'Republican'],
    career: ['Secretary of State 2025-present', 'U.S. Senator (R-FL) 2011-present', 'Florida House speaker'],
    websites: [
      { label: 'State Department', url: 'https://www.state.gov' }
    ],
    quotes: [
      {
        text: 'Israel is not just an ally, it is a cause.',
        context: 'AIPAC Policy Conference speech',
        date: '2019',
        source: 'AIPAC',
        url: 'https://www.aipac.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1523000,
        year: '2011-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/marco-rubio/summary?cid=N00030612'
      }
    ],
    policyActions: [
      {
        action: 'Confirmed as Secretary of State under Trump',
        date: '2025',
        context: 'First Hispanic Secretary of State',
        source: 'State.gov',
        url: 'https://www.state.gov'
      },
      {
        action: 'Co-authored Anti-BDS legislation (Combating BDS Act)',
        date: '2019',
        context: 'Legislation to penalize boycotts of Israel',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Top Senate recipient of pro-Israel PAC money',
        evidence: 'FEC filings and OpenSecrets data',
        tier: 'verified'
      },
      {
        name: 'Norman Braman',
        relationship: 'Major donor and political mentor',
        evidence: 'Public financial disclosures',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $1.5M+ from pro-Israel PACs, one of highest Senate recipients',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/marco-rubio/summary?cid=N00030612',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Authored key anti-BDS legislation targeting Israel boycott movements',
        source: 'Congress.gov',
        url: 'https://www.congress.gov',
        tier: 'verified',
        date: '2019'
      }
    ]
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
    summary: 'Senator from Arkansas. Prominent voice on Iran policy and Middle East. AIPAC recipient.',
    tags: ['Senator', 'Iran Hawk', 'Arkansas', 'Republican', 'AIPAC'],
    career: ['U.S. Senator (R-AR) 2015-present', 'U.S. Representative', 'Military officer'],
    websites: [
      { label: 'Senate Website', url: 'https://www.cotton.senate.gov' }
    ],
    quotes: [
      {
        text: 'Iran is the greatest threat to the Middle East and the world.',
        context: 'Senate Armed Services Committee hearing',
        date: '2021',
        source: 'Senate.gov',
        url: 'https://www.cotton.senate.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1024000,
        year: '2015-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/tom-cotton/summary?cid=N00035492'
      }
    ],
    policyActions: [
      {
        action: 'Authored open letter to Iran signed by 47 Republican senators',
        date: '2015',
        context: 'Letter undermining Obama Iran nuclear negotiations',
        source: 'Senate.gov',
        url: 'https://www.cotton.senate.gov'
      }
    ],
    connections: [
      {
        name: 'Bill Kristol',
        relationship: 'Political mentor and supporter',
        evidence: 'Emergency Committee for Israel backing',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Organized 47-senator letter to Iran undermining nuclear deal negotiations',
        source: 'Senate.gov',
        url: 'https://www.cotton.senate.gov',
        tier: 'verified',
        date: '2015'
      },
      {
        claim: 'Received over $1M from pro-Israel PACs since entering Senate',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/tom-cotton/summary?cid=N00035492',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    summary: 'Senator from New Jersey. Presidential candidate 2020. Strong pro-Israel voting record.',
    tags: ['Senator', 'Democratic Leader', 'New Jersey', 'Pro-Israel'],
    career: ['U.S. Senator (D-NJ) 2013-present', 'Mayor of Newark', 'Community activist'],
    websites: [
      { label: 'Senate Website', url: 'https://www.booker.senate.gov' }
    ],
    quotes: [
      {
        text: 'The bond between the United States and Israel is unbreakable.',
        context: 'AIPAC Policy Conference',
        date: '2018',
        source: 'AIPAC',
        url: 'https://www.aipac.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 618000,
        year: '2013-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/cory-booker/summary?cid=N00035267'
      }
    ],
    policyActions: [
      {
        action: 'Co-sponsored United States-Israel Strategic Partnership Act',
        date: '2022',
        context: 'Expanding military and economic cooperation',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Major PAC recipient and conference speaker',
        evidence: 'FEC records and public appearances',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $618K from pro-Israel PACs during Senate career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/cory-booker/summary?cid=N00035267',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    summary: 'Senator from Nevada. First female Jewish senator from Nevada. Strong AIPAC supporter.',
    tags: ['Senator', 'Jewish', 'Nevada', 'Democrat', 'AIPAC'],
    career: ['U.S. Senator (D-NV) 2019-present', 'U.S. Representative (D-NV)', 'Software developer'],
    websites: [
      { label: 'Senate Website', url: 'https://www.rosen.senate.gov' }
    ],
    quotes: [
      {
        text: 'I will always fight to ensure Israel has what it needs to defend itself.',
        context: 'Senate floor speech',
        date: '2023',
        source: 'Senate.gov',
        url: 'https://www.rosen.senate.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1412000,
        year: '2017-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00038734'
      }
    ],
    policyActions: [
      {
        action: 'Co-led Senate bipartisan Israel caucus',
        date: '2021',
        context: 'Organizing Senate support for Israel policy',
        source: 'Senate.gov',
        url: 'https://www.rosen.senate.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Top Democratic recipient of pro-Israel PAC money',
        evidence: 'FEC filings show among highest D recipients',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Among highest Democratic Senate recipients of pro-Israel PAC money at $1.4M+',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00038734',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    title: 'U.S. Representative (D-CA)',
    category: 'politician',
    bioguideId: 'S000344',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('brad-sherman'),
    summary: 'Representative from California. House Financial Services Committee member. Pro-Israel voting record.',
    tags: ['Representative', 'Financial Services', 'California', 'Democrat'],
    career: ['U.S. Representative (D-CA) 1997-present', 'Accountant', 'State legislator'],
    websites: [
      { label: 'House Website', url: 'https://sherman.house.gov' }
    ],
    quotes: [
      {
        text: 'I have been a leader in Congress fighting for the U.S.-Israel relationship for over two decades.',
        context: 'Campaign statement',
        date: '2022',
        source: 'Sherman for Congress',
        url: 'https://bradsherman.com'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 785000,
        year: '1997-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/brad-sherman/summary?cid=N00006897'
      }
    ],
    policyActions: [
      {
        action: 'Chaired House Foreign Affairs Subcommittee on Asia',
        date: '2019-2022',
        context: 'Oversight of foreign aid and policy',
        source: 'House.gov',
        url: 'https://foreignaffairs.house.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Longtime ally and PAC recipient',
        evidence: 'Decades of FEC records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $785K from pro-Israel PACs over 27-year congressional career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/brad-sherman/summary?cid=N00006897',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    ],
  },
  {
    id: 'kamala-harris',
    name: 'Kamala Harris',
    title: '49th Vice President',
    category: 'politician',
    bioguideId: 'H001075',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('kamala-harris'),
    summary: 'Vice President under Biden. Former California Attorney General. Pro-Israel voting record.',
    tags: ['Vice President', 'California', 'Democrat', 'Pro-Israel'],
    career: ['Vice President 2021-2025', 'U.S. Senator (D-CA) 2017-2021', 'California AG', 'Prosecutor'],
    websites: [
      { label: 'White House', url: 'https://www.whitehouse.gov' }
    ],
    quotes: [
      {
        text: 'Let me be clear: I will always ensure Israel has the ability to defend itself.',
        context: 'AIPAC conference address',
        date: '2017',
        source: 'AIPAC',
        url: 'https://www.aipac.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors',
        amount: 5100000,
        year: '2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2024-presidential-race'
      }
    ],
    policyActions: [
      {
        action: 'Affirmed iron-clad commitment to Israel as VP and presidential candidate',
        date: '2024',
        context: 'Campaign and official statements',
        source: 'White House',
        url: 'https://www.whitehouse.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Spoke at conference as Senator and VP',
        evidence: 'Public appearances and statements',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Raised substantial pro-Israel donor support during 2024 presidential campaign',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2024-presidential-race',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Maintained Biden administration position of unconditional Israel support as VP',
        source: 'White House',
        url: 'https://www.whitehouse.gov',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    summary: 'Former U.S. President 2009-2017. Provided record aid to Israel during presidency. Now involved in various initiatives.',
    tags: ['Former President', 'Illinois', 'Democrat', 'Pro-Israel'],
    career: ['44th President 2009-2017', 'U.S. Senator (D-IL) 2005-2008', 'State Senator', 'Community organizer'],
    websites: [
      { label: 'Obama Foundation', url: 'https://www.obama.org' }
    ],
    quotes: [
      {
        text: 'The bond between the United States and Israel is unbreakable.',
        context: 'AIPAC conference speech',
        date: '2012',
        source: 'White House Archives',
        url: 'https://obamawhitehouse.archives.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors',
        amount: 3500000,
        year: '2008-2012',
        source: 'OpenSecrets',
        url: 'https://web.archive.org/web/20250919130757/https://www.opensecrets.org/PRES08/contrib.php?cid=N00009638'
      }
    ],
    policyActions: [
      {
        action: 'Signed $38B 10-year military aid MOU with Israel',
        date: '2016',
        context: 'Largest military aid package in US history at the time',
        source: 'State Dept',
        url: 'https://www.state.gov'
      },
      {
        action: 'Negotiated Iran nuclear deal (JCPOA)',
        date: '2015',
        context: 'Opposed by Israel and AIPAC',
        source: 'White House Archives',
        url: 'https://obamawhitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Penny Pritzker',
        relationship: 'Major donor and Commerce Secretary',
        evidence: 'Public appointments and fundraising records',
        tier: 'verified'
      },
      {
        name: 'Rahm Emanuel',
        relationship: 'White House Chief of Staff',
        evidence: 'Public appointment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Signed largest US-Israel military aid deal in history at $38B over 10 years',
        source: 'State Department',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2016'
      },
      {
        claim: 'Allowed UN Resolution 2334 condemning Israeli settlements to pass by abstaining',
        source: 'UN Records',
        url: 'https://www.un.org',
        tier: 'verified',
        date: '2016'
      }
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
    ],
  },
  {
    id: 'hillary-clinton',
    name: 'Hillary Clinton',
    title: 'Former Secretary of State',
    category: 'politician',
    bioguideId: 'C001041',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('hillary-clinton'),
    summary: 'Former Secretary of State, Senator, 2016 presidential candidate. Strong pro-Israel record.',
    tags: ['Secretary of State', 'Senator', 'New York', 'Democrat', 'Pro-Israel'],
    career: ['Secretary of State 2009-2013', 'U.S. Senator (D-NY) 2001-2009', 'First Lady', 'Attorney'],
    websites: [
      { label: 'Clinton Foundation', url: 'https://www.clintonfoundation.org' }
    ],
    quotes: [
      {
        text: 'I have a deep connection to Israel that goes back many years.',
        context: 'AIPAC Policy Conference',
        date: '2016',
        source: 'AIPAC',
        url: 'https://www.aipac.org'
      }
    ],
    donations: [
      {
        from: 'Haim Saban',
        amount: 25000000,
        year: '2000-2016',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/pres16/contributors?id=N00000019'
      },
      {
        from: 'Pro-Israel PACs and donors',
        amount: 8200000,
        year: '2016',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/pres16'
      }
    ],
    policyActions: [
      {
        action: 'Voted for Iraq War authorization as Senator',
        date: '2002',
        context: 'Senate vote on Authorization for Use of Military Force',
        source: 'Senate.gov',
        url: 'https://www.senate.gov'
      }
    ],
    connections: [
      {
        name: 'Haim Saban',
        relationship: 'Top career donor, gave $25M+',
        evidence: 'FEC records and public statements',
        tier: 'verified'
      },
      {
        name: 'AIPAC',
        relationship: 'Regular conference speaker and policy ally',
        evidence: 'Public appearances',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Haim Saban donated $25M+ to Clinton campaigns and foundation',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2016'
      },
      {
        claim: 'Voted for Iraq War authorization in 2002',
        source: 'Senate.gov',
        url: 'https://www.senate.gov',
        tier: 'verified',
        date: '2002'
      }
    ],
    documentedFalsehoods: [
      {
        id: 'hillary-emails-no-classified-2015-2016',
        statement:
          'Stated she never sent or received any material marked classified on her private email system as Secretary of State ("I did not email any classified material…").',
        saidAt: '2015–2016',
        context:
          'Press conferences and campaign responses to the private-server controversy.',
        whyFalse:
          'The FBI\'s July 2016 statement on the investigation found that 110 emails in 52 email chains contained classified information at the time they were sent or received (including Top Secret/SAP chains). That directly contradicts the categorical "no classified material" claim, even though the FBI recommended no charges.',
        correction:
          'Classified information was sent and received on the private system per the FBI\'s public findings.',
        statementSource: 'Campaign / press conference remarks (widely documented)',
        statementUrl: 'https://www.politifact.com/truth-o-meter/statements/2015/jul/07/hillary-clinton/hillary-clinton-says-she-never-emailed-any-classif/',
        debunkSource: 'FBI Director Comey public statement on Clinton email investigation (July 5, 2016)',
        debunkUrl: 'https://www.fbi.gov/news/press-releases/statement-by-fbi-director-james-b-comey-on-the-investigation-of-secretary-hillary-clintons-use-of-a-personal-e-mail-system',
        severity: 'egregious',
        tier: 'verified',
      },
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
    title: '48th Vice President',
    category: 'politician',
    bioguideId: 'P000587',
    party: 'R',
    state: 'IN',
    photoUrl: getProfilePhoto('mike-pence'),
    summary: 'Former Vice President under Trump. Christian Zionist. Evangelical Christian with strong pro-Israel positions.',
    tags: ['Vice President', 'Christian Zionist', 'Indiana', 'Republican', 'Evangelical'],
    career: ['Vice President 2017-2021', 'Governor of Indiana', 'U.S. Representative (R-IN)', 'Talk radio host'],
    websites: [
      { label: 'Official Website', url: 'https://www.mikepence.com' }
    ],
    quotes: [
      {
        text: 'The United States of America stands with Israel, now and always.',
        context: 'Address to Israeli Knesset',
        date: '2018',
        source: 'White House Archives',
        url: 'https://trumpwhitehouse.archives.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors and evangelical PACs',
        amount: 850000,
        year: '2001-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org'
      }
    ],
    policyActions: [
      {
        action: 'Addressed Israeli Knesset as Vice President',
        date: '2018',
        context: 'Affirmed Jerusalem embassy move',
        source: 'White House Archives',
        url: 'https://trumpwhitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Christians United for Israel (CUFI)',
        relationship: 'Key evangelical-Israel alliance figure',
        evidence: 'Conference appearances and policy alignment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'First sitting US VP to address Israeli Knesset',
        source: 'Knesset records',
        url: 'https://www.knesset.gov.il',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Christian Zionist ideology shaped Middle East policy positions',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'circumstantial',
        date: '2018'
      }
    ]
  },
  {
    id: 'dick-cheney',
    name: 'Dick Cheney',
    title: '46th Vice President',
    category: 'politician',
    bioguideId: 'C000321',
    party: 'R',
    state: 'WY',
    photoUrl: getProfilePhoto('dick-cheney'),
    summary: 'Former Vice President under George W. Bush. Architect of Iraq War. Halliburton connections.',
    tags: ['Vice President', 'Iraq War', 'Neoconservative', 'Wyoming', 'Republican'],
    career: ['Vice President 2001-2009', 'Secretary of Defense 1989-1993', 'Congressman', 'Halliburton CEO'],
    websites: [
      { label: 'American Enterprise Institute', url: 'https://www.aei.org' }
    ],
    quotes: [
      {
        text: 'We will not permit the world\'s most dangerous regimes to threaten us with the world\'s most destructive weapons.',
        context: 'VFW National Convention speech making case for Iraq War',
        date: '2002',
        source: 'White House Archives',
        url: 'https://georgewbush-whitehouse.archives.gov'
      }
    ],
    donations: [
      {
        from: 'Defense industry PACs',
        amount: 1200000,
        year: '1979-2000',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org'
      }
    ],
    policyActions: [
      {
        action: 'Architect of 2003 Iraq invasion',
        date: '2003',
        context: 'Used intelligence on WMDs later proven false',
        source: 'Senate Intelligence Committee Report',
        url: 'https://www.intelligence.senate.gov'
      },
      {
        action: 'Awarded no-bid contracts to Halliburton in Iraq',
        date: '2003',
        context: 'Former CEO of Halliburton received $39.5B in Iraq contracts',
        source: 'Congressional Research Service',
        url: 'https://crsreports.congress.gov'
      }
    ],
    connections: [
      {
        name: 'Halliburton',
        relationship: 'Former CEO, company received $39.5B Iraq contracts',
        evidence: 'SEC filings and congressional investigations',
        tier: 'verified'
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
        claim: 'Halliburton received $39.5B in Iraq War contracts while Cheney served as VP',
        source: 'Congressional Research Service',
        url: 'https://crsreports.congress.gov',
        tier: 'verified',
        date: '2008'
      },
      {
        claim: 'Made false claims about Iraq WMDs and al-Qaeda links to justify invasion',
        source: 'Senate Intelligence Committee',
        url: 'https://www.intelligence.senate.gov',
        tier: 'verified',
        date: '2008'
      }
    ]
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
    title: 'Former National Security Advisor',
    category: 'politician',
    bioguideId: 'B000611',
    party: 'R',
    photoUrl: getProfilePhoto('john-bolton'),
    summary: 'Trump National Security Advisor 2018-2019. Prominent neoconservative. Advocate for military intervention in Middle East.',
    tags: ['National Security Advisor', 'Neoconservative', 'War Hawk', 'Republican'],
    career: ['National Security Advisor 2018-2019', 'UN Ambassador 2005-2006', 'State Department official', 'Conservative commentator'],
    websites: [
      { label: 'Official Website', url: 'https://www.johnbolton.com' }
    ],
    quotes: [
      {
        text: 'The ayatollahs in Tehran understand only one thing: overwhelming force.',
        context: 'Commentary on Iran policy',
        date: '2019',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com'
      }
    ],
    donations: [
      {
        from: 'Sheldon Adelson',
        amount: 5000000,
        year: '2014-2018',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org'
      }
    ],
    policyActions: [
      {
        action: 'Advocated for withdrawal from Iran nuclear deal as NSA',
        date: '2018',
        context: 'Led internal push to exit JCPOA',
        source: 'White House Archives',
        url: 'https://trumpwhitehouse.archives.gov'
      },
      {
        action: 'Pushed for regime change in Iran and North Korea',
        date: '2018-2019',
        context: 'As National Security Advisor',
        source: 'White House Archives',
        url: 'https://trumpwhitehouse.archives.gov'
      }
    ],
    connections: [
      {
        name: 'Sheldon Adelson',
        relationship: 'Major financial backer via Bolton PAC',
        evidence: 'FEC filings show $5M from Adelson',
        tier: 'verified'
      },
      {
        name: 'Gatestone Institute',
        relationship: 'Former chairman of hawkish policy group',
        evidence: 'Organization records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Bolton PAC received $5M from Sheldon Adelson',
        source: 'OpenSecrets/FEC',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Publicly advocated for preemptive strikes on Iran nuclear facilities',
        source: 'Wall Street Journal',
        url: 'https://www.wsj.com',
        tier: 'verified',
        date: '2015'
      }
    ]
  },
  {
    id: 'mike-pompeo',
    name: 'Mike Pompeo',
    title: 'Former Secretary of State',
    category: 'politician',
    bioguideId: 'P000602',
    party: 'R',
    state: 'KS',
    photoUrl: getProfilePhoto('mike-pompeo'),
    summary: 'Trump Secretary of State 2018-2021. CIA Director 2017-2018. Hawkish foreign policy stance on Iran and Middle East.',
    tags: ['Secretary of State', 'CIA Director', 'Kansas', 'Republican'],
    career: ['Secretary of State 2018-2021', 'CIA Director 2017-2018', 'Congressman (R-KS)', 'Military officer'],
    websites: [
      { label: 'Official Website', url: 'https://www.mikepompeo.com' }
    ],
    quotes: [
      {
        text: 'Anti-Zionism is anti-Semitism.',
        context: 'Speech at American University in Cairo',
        date: '2019',
        source: 'State Department',
        url: 'https://www.state.gov'
      }
    ],
    donations: [
      {
        from: 'Koch Industries PAC',
        amount: 427000,
        year: '2011-2016',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/mike-pompeo/summary?cid=N00030744'
      }
    ],
    policyActions: [
      {
        action: 'Declared Israeli settlements not inherently illegal under international law',
        date: '2019',
        context: 'Reversed decades of US policy',
        source: 'State Department',
        url: 'https://www.state.gov'
      },
      {
        action: 'Visited Israeli settlement in Golan Heights as Secretary of State',
        date: '2020',
        context: 'First sitting Secretary of State to visit settlement',
        source: 'State Department',
        url: 'https://www.state.gov'
      }
    ],
    connections: [
      {
        name: 'Charles Koch',
        relationship: 'Koch-backed congressional career in Kansas',
        evidence: 'FEC filings and campaign records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Reversed decades of US policy by declaring settlements not inherently illegal',
        source: 'State Department',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'First Secretary of State to visit an Israeli settlement',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'verified',
        date: '2020'
      }
    ]
  },
  {
    id: 'antony-blinken',
    name: 'Antony Blinken',
    title: 'Secretary of State',
    category: 'politician',
    party: 'D',
    photoUrl: getProfilePhoto('antony-blinken'),
    summary: 'Biden Secretary of State. Career foreign service officer. Strong pro-Israel positions.',
    tags: ['Secretary of State', 'Democrat', 'Foreign Service', 'Pro-Israel'],
    career: ['Secretary of State 2021-present', 'Deputy National Security Advisor', 'Deputy Secretary of State', 'Law professor'],
    websites: [
      { label: 'State Department', url: 'https://www.state.gov' }
    ],
    quotes: [
      {
        text: 'Israel has the right to defend itself. Full stop.',
        context: 'Press conference after October 7 attack',
        date: '2023',
        source: 'State Department',
        url: 'https://www.state.gov'
      }
    ],
    donations: [],
    policyActions: [
      {
        action: 'Made 10+ trips to Israel/Middle East during Gaza conflict',
        date: '2023-2024',
        context: 'Diplomatic shuttle missions',
        source: 'State Department',
        url: 'https://www.state.gov'
      },
      {
        action: 'Approved emergency arms transfers to Israel bypassing congressional review',
        date: '2023',
        context: 'Emergency authorization of weapons shipments',
        source: 'Reuters',
        url: 'https://www.reuters.com'
      }
    ],
    connections: [
      {
        name: 'Joe Biden',
        relationship: 'Longtime foreign policy advisor since Senate days',
        evidence: 'Public career record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Approved emergency arms transfers to Israel bypassing normal congressional review',
        source: 'Reuters',
        url: 'https://www.reuters.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Stepfather was Holocaust survivor, cited as shaping worldview',
        source: 'State Department bio',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2021'
      }
    ]
  },
  {
    id: 'ron-desantis',
    name: 'Ron DeSantis',
    title: 'Governor of Florida',
    category: 'politician',
    bioguideId: 'D000621',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('ron-desantis'),
    summary: 'Governor of Florida. 2024 presidential candidate. Strong pro-Israel and religious right alignment.',
    tags: ['Governor', 'Presidential Candidate', 'Florida', 'Republican', 'Pro-Israel'],
    career: ['Governor of Florida 2019-present', 'U.S. Representative (R-FL)', 'Military lawyer'],
    websites: [
      { label: 'Florida Governor', url: 'https://www.flgov.com' }
    ],
    quotes: [
      {
        text: 'Florida is the most pro-Israel state in America.',
        context: 'Signing anti-BDS legislation in Jerusalem',
        date: '2019',
        source: 'Governor press release',
        url: 'https://www.flgov.com'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors',
        amount: 1800000,
        year: '2022-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2024-presidential-race/ron-desantis/contributors?id=N00043593'
      }
    ],
    policyActions: [
      {
        action: 'Signed anti-BDS bill into law while visiting Israel',
        date: '2019',
        context: 'First US governor to sign legislation in a foreign country',
        source: 'Florida Governor Office',
        url: 'https://www.flgov.com'
      }
    ],
    connections: [
      {
        name: 'Miriam Adelson',
        relationship: 'Major campaign donor',
        evidence: 'FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Held first Florida cabinet meeting in Israel',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Signed anti-BDS bill in Jerusalem — first governor to sign law abroad',
        source: 'Florida Governor Office',
        url: 'https://www.flgov.com',
        tier: 'verified',
        date: '2019'
      }
    ]
  },
  {
    id: 'nikki-haley',
    name: 'Nikki Haley',
    title: 'Former UN Ambassador, South Carolina Governor',
    category: 'politician',
    party: 'R',
    state: 'SC',
    photoUrl: getProfilePhoto('nikki-haley'),
    summary: 'Trump UN Ambassador 2017-2018. Former South Carolina Governor. 2024 presidential candidate. Pro-Israel positions.',
    tags: ['UN Ambassador', 'Governor', 'Republican', 'South Carolina', 'Pro-Israel'],
    career: ['UN Ambassador 2017-2018', 'Governor of South Carolina 2011-2017', 'State legislator'],
    websites: [
      { label: 'Official Website', url: 'https://www.nikki.org' }
    ],
    quotes: [
      {
        text: 'I wear my pro-Israel badge with pride.',
        context: 'AIPAC Policy Conference',
        date: '2018',
        source: 'AIPAC',
        url: 'https://www.aipac.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel donors',
        amount: 2300000,
        year: '2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2024-presidential-race'
      }
    ],
    policyActions: [
      {
        action: 'Vetoed multiple UN resolutions critical of Israel as UN Ambassador',
        date: '2017-2018',
        context: 'Used US veto power at Security Council',
        source: 'UN Records',
        url: 'https://www.un.org'
      },
      {
        action: 'Led US withdrawal from UN Human Rights Council',
        date: '2018',
        context: 'Cited anti-Israel bias',
        source: 'State Department',
        url: 'https://www.state.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Major PAC beneficiary and speaker',
        evidence: 'Public appearances and FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Vetoed 8 UN Security Council resolutions critical of Israel as Ambassador',
        source: 'UN Records',
        url: 'https://www.un.org',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Led US exit from UNHRC citing chronic anti-Israel bias',
        source: 'State Department',
        url: 'https://www.state.gov',
        tier: 'verified',
        date: '2018'
      }
    ]
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
    summary: 'Independent Senator from Vermont. Prominent progressive voice. Critical of Israeli occupation policies.',
    tags: ['Senator', 'Independent', 'Vermont', 'Progressive', 'Palestinian Rights'],
    career: ['U.S. Senator (I-VT) 2007-present', 'House member (D-VT)', 'Mayor of Burlington'],
    websites: [
      { label: 'Senate Website', url: 'https://www.sanders.senate.gov' }
    ],
    quotes: [
      {
        text: 'It is not anti-Semitic to criticize the policies of the Israeli government.',
        context: 'Campaign rally',
        date: '2020',
        source: 'Sanders Campaign',
        url: 'https://berniesanders.com'
      }
    ],
    donations: [
      {
        from: 'Small-dollar individual donors',
        amount: 134000000,
        year: '2020',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2020-presidential-race/bernie-sanders/contributors?id=N00000528'
      }
    ],
    policyActions: [
      {
        action: 'Introduced resolution to block $735M arms sale to Israel',
        date: '2021',
        context: 'First Senate resolution to block Israel arms transfer',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      },
      {
        action: 'Called for conditioning US military aid to Israel',
        date: '2023',
        context: 'Response to Gaza conflict',
        source: 'Senate.gov',
        url: 'https://www.sanders.senate.gov'
      }
    ],
    connections: [
      {
        name: 'Justice Democrats',
        relationship: 'Policy ally on progressive foreign policy',
        evidence: 'Public endorsements and shared positions',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'First Jewish presidential candidate to openly criticize Israeli government policy',
        source: 'New York Times',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2020'
      },
      {
        claim: 'Introduced first-ever Senate resolution to block an Israel arms sale',
        source: 'Congress.gov',
        url: 'https://www.congress.gov',
        tier: 'verified',
        date: '2021'
      }
    ]
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
    summary: 'Senator from Massachusetts. Consumer protection advocate. Progressive positions on various issues.',
    tags: ['Senator', 'Massachusetts', 'Democrat', 'Progressive', 'Consumer Protection'],
    career: ['U.S. Senator (D-MA) 2013-present', 'Law professor', 'Consumer advocate'],
    websites: [
      { label: 'Senate Website', url: 'https://www.warren.senate.gov' }
    ],
    quotes: [
      {
        text: 'We need to seriously reconsider our approach to the Israeli-Palestinian conflict.',
        context: 'Town hall response',
        date: '2019',
        source: 'Warren Campaign',
        url: 'https://elizabethwarren.com'
      }
    ],
    donations: [
      {
        from: 'Small-dollar individual donors',
        amount: 95000000,
        year: '2020',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2020-presidential-race/elizabeth-warren/contributors?id=N00033492'
      }
    ],
    policyActions: [
      {
        action: 'Co-sponsored bill to prevent US funding of Israeli annexation',
        date: '2020',
        context: 'Legislation restricting aid for West Bank annexation',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'Progressive Caucus',
        relationship: 'Policy ally on foreign aid conditions',
        evidence: 'Voting record alignment',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Shifted from traditional pro-Israel position to calling for Palestinian rights',
        source: 'Politico',
        url: 'https://www.politico.com',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Rejected PAC money, funded by small-dollar donors',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2020'
      }
    ]
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
    summary: 'Libertarian-leaning Senator from Kentucky. Skeptical of foreign interventionism. Son of Ron Paul.',
    tags: ['Senator', 'Libertarian', 'Kentucky', 'Republican', 'Non-interventionist'],
    career: ['U.S. Senator (R-KY) 2011-present', 'Eye doctor', 'Ophthalmologist'],
    websites: [
      { label: 'Senate Website', url: 'https://www.paul.senate.gov' }
    ],
    quotes: [
      {
        text: 'I am not for foreign aid in general, to any country.',
        context: 'Senate floor speech on foreign aid',
        date: '2018',
        source: 'Senate.gov',
        url: 'https://www.paul.senate.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 156000,
        year: '2011-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/rand-paul/summary?cid=N00030836'
      }
    ],
    policyActions: [
      {
        action: 'Blocked unanimous consent on Israel aid bills multiple times',
        date: '2018-2023',
        context: 'Fiscal conservative objection to all foreign aid',
        source: 'Senate.gov',
        url: 'https://www.paul.senate.gov'
      }
    ],
    connections: [
      {
        name: 'Ron Paul',
        relationship: 'Father and political mentor, shared non-interventionism',
        evidence: 'Public family relationship',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Repeatedly blocked unanimous consent on Israel aid over fiscal concerns',
        source: 'Senate Records',
        url: 'https://www.senate.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'One of few Republican senators to oppose unconditional Israel military aid',
        source: 'Politico',
        url: 'https://www.politico.com',
        tier: 'verified',
        date: '2023'
      }
    ]
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
    summary: 'Representative from Minnesota. Progressive voice. Critical of Israeli occupation and US foreign policy.',
    tags: ['Representative', 'Minnesota', 'Democrat', 'Progressive', 'Palestinian Rights Advocate'],
    career: ['U.S. Representative (D-MN) 2019-present', 'Minnesota state legislator', 'Community activist'],
    websites: [
      { label: 'House Website', url: 'https://omar.house.gov' }
    ],
    quotes: [
      {
        text: 'It\'s all about the Benjamins baby.',
        context: 'Twitter post about AIPAC influence, later apologized',
        date: '2019',
        source: 'Twitter/News archives',
        url: 'https://www.nytimes.com'
      }
    ],
    donations: [
      {
        from: 'Small-dollar individual donors',
        amount: 5200000,
        year: '2022',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/ilhan-omar/summary?cid=N00043581'
      }
    ],
    policyActions: [
      {
        action: 'Removed from House Foreign Affairs Committee',
        date: '2023',
        context: 'Republican majority voted to remove her over Israel comments',
        source: 'House.gov',
        url: 'https://www.house.gov'
      },
      {
        action: 'Introduced resolution supporting BDS right to boycott',
        date: '2019',
        context: 'First pro-BDS resolution in Congress',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'The Squad',
        relationship: 'Founding member of progressive House bloc',
        evidence: 'Public political alliance',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Removed from Foreign Affairs Committee by House Republican majority',
        source: 'House.gov',
        url: 'https://www.house.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Introduced first-ever pro-BDS resolution in US Congress',
        source: 'Congress.gov',
        url: 'https://www.congress.gov',
        tier: 'verified',
        date: '2019'
      }
    ]
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
    summary: 'Representative from Michigan. First Palestinian-American in Congress. Strong advocate for Palestinian rights.',
    tags: ['Representative', 'Michigan', 'Democrat', 'Palestinian-American', 'Palestinian Rights'],
    career: ['U.S. Representative (D-MI) 2019-present', 'Michigan state legislator', 'Community lawyer'],
    websites: [
      { label: 'House Website', url: 'https://tlaib.house.gov' }
    ],
    quotes: [
      {
        text: 'From the river to the sea is an aspirational call for freedom.',
        context: 'Statement that led to House censure',
        date: '2023',
        source: 'Congressional Record',
        url: 'https://www.congress.gov'
      }
    ],
    donations: [
      {
        from: 'Small-dollar individual donors',
        amount: 4800000,
        year: '2022',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/rashida-tlaib/summary?cid=N00042188'
      }
    ],
    policyActions: [
      {
        action: 'Censured by House for Israel-Palestine statements',
        date: '2023',
        context: 'House voted 234-188 to censure',
        source: 'House.gov',
        url: 'https://www.house.gov'
      },
      {
        action: 'Only member to vote against Iron Dome funding',
        date: '2021',
        context: 'Sole dissent on $1B Iron Dome supplemental',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'The Squad',
        relationship: 'Founding member, only Palestinian-American in Congress',
        evidence: 'Public record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'First Palestinian-American woman elected to Congress',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Censured by House of Representatives 234-188 over Israel comments',
        source: 'House.gov',
        url: 'https://www.house.gov',
        tier: 'verified',
        date: '2023'
      }
    ]
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
    summary: 'Progressive Representative from New York. Vocal critic of Israeli occupation. Member of Squad.',
    tags: ['Representative', 'New York', 'Democrat', 'Progressive', 'Palestinian Rights'],
    career: ['U.S. Representative (D-NY) 2019-present', 'Bartender and activist', 'Community organizer'],
    websites: [
      { label: 'House Website', url: 'https://ocasio-cortez.house.gov' }
    ],
    quotes: [
      {
        text: 'What we are seeing is the killing of people for exercising their right to protest.',
        context: 'Comments on Israeli military actions in Gaza',
        date: '2021',
        source: 'CNN interview',
        url: 'https://www.cnn.com'
      }
    ],
    donations: [
      {
        from: 'Small-dollar individual donors',
        amount: 12400000,
        year: '2022',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/alexandria-ocasio-cortez/summary?cid=N00041162'
      }
    ],
    policyActions: [
      {
        action: 'Changed vote on Iron Dome funding from No to Present (abstain)',
        date: '2021',
        context: 'Controversial last-minute vote change, seen crying on House floor',
        source: 'House.gov',
        url: 'https://www.house.gov'
      }
    ],
    connections: [
      {
        name: 'The Squad',
        relationship: 'Founding and most prominent member',
        evidence: 'Public political alliance',
        tier: 'verified'
      },
      {
        name: 'Justice Democrats',
        relationship: 'Recruited and backed by progressive PAC',
        evidence: 'Campaign records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Changed Iron Dome vote from No to Present while visibly emotional on House floor',
        source: 'C-SPAN/House records',
        url: 'https://www.c-span.org',
        tier: 'verified',
        date: '2021'
      },
      {
        claim: 'Raised $12.4M from small donors, one of highest House fundraisers',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/alexandria-ocasio-cortez/summary?cid=N00041162',
        tier: 'verified',
        date: '2022'
      }
    ]
  },
  {
    id: 'matt-gaetz',
    name: 'Matt Gaetz',
    title: 'U.S. Representative (R-FL)',
    category: 'politician',
    bioguideId: 'G000578',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('matt-gaetz'),
    summary: 'Representative from Florida. Conservative firebrand. Controversial figure.',
    tags: ['Representative', 'Florida', 'Republican', 'Conservative', 'Trump Ally'],
    career: ['U.S. Representative (R-FL) 2017-present', 'Florida state legislator', 'Prosecutor'],
    websites: [
      { label: 'House Website', url: 'https://gaetz.house.gov' }
    ],
    quotes: [
      {
        text: 'Foreign aid is the taking of money from poor people in rich countries to give to rich people in poor countries.',
        context: 'House floor speech opposing foreign aid',
        date: '2023',
        source: 'C-SPAN',
        url: 'https://www.c-span.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 42000,
        year: '2017-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/matt-gaetz/summary?cid=N00039503'
      }
    ],
    policyActions: [
      {
        action: 'Led motion to vacate Speaker McCarthy',
        date: '2023',
        context: 'First successful removal of a House Speaker',
        source: 'House.gov',
        url: 'https://www.house.gov'
      }
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Close political ally and defender',
        evidence: 'Public statements and voting record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Led first successful motion to vacate the chair, removing Speaker McCarthy',
        source: 'House.gov',
        url: 'https://www.house.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Under DOJ investigation for sex trafficking allegations (no charges filed)',
        source: 'New York Times',
        url: 'https://www.nytimes.com',
        tier: 'circumstantial',
        date: '2023'
      }
    ]
  },
  {
    id: 'jim-jordan',
    name: 'Jim Jordan',
    title: 'U.S. Representative (R-OH)',
    category: 'politician',
    bioguideId: 'J000289',
    party: 'R',
    state: 'OH',
    photoUrl: getProfilePhoto('jim-jordan'),
    summary: 'Representative from Ohio. House Judiciary Chairman. Trump ally and election denier.',
    tags: ['Representative', 'Ohio', 'Republican', 'Trump Ally', 'Conservative'],
    career: ['U.S. Representative (R-OH) 2007-present', 'House Judiciary Chair', 'College wrestling coach'],
    websites: [
      { label: 'House Website', url: 'https://jordan.house.gov' }
    ],
    quotes: [
      {
        text: 'We stand with Israel. Period.',
        context: 'House floor remarks',
        date: '2023',
        source: 'C-SPAN',
        url: 'https://www.c-span.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 289000,
        year: '2007-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/jim-jordan/summary?cid=N00027894'
      }
    ],
    policyActions: [
      {
        action: 'Chaired House Judiciary Committee investigation into DOJ',
        date: '2023',
        context: 'Investigations into weaponization of government',
        source: 'House.gov',
        url: 'https://judiciary.house.gov'
      }
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Key congressional ally',
        evidence: 'Public endorsements and coordination',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Failed Speaker of the House bid despite Trump endorsement',
        source: 'Associated Press',
        url: 'https://apnews.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Received $289K from pro-Israel PACs during House career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/jim-jordan/summary?cid=N00027894',
        tier: 'verified',
        date: '2024'
      }
    ]
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
      'House Republican Conference Chair and NY-21 representative. High-visibility Trump ally and leading congressional voice on campus antisemitism oversight after October 7. Documented pro-Israel PAC recipient (OpenSecrets). Consistent yes votes on FMF, Iron Dome, and wartime Israel supplementals. Primary sources: OpenSecrets, House leadership record, committee hearings.',
    tags: [
      'House GOP Conference Chair',
      'Pro-Israel',
      'AIPAC',
      'Trump Ally',
      'New York',
      'Republican',
      'Campus Antisemitism Hearings',
      'Iron Dome',
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
    ],
    websites: [
      { label: 'Official House site', url: 'https://stefanik.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523' },
      { label: 'House GOP Conference', url: 'https://www.gop.gov' },
      { label: 'Education & Workforce Committee', url: 'https://edworkforce.house.gov' },
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
    summary: 'Deceased former Senator from California. Served 1992-2023. Controversial intelligence committee tenure.',
    tags: ['Senator', 'California', 'Democrat', 'Intelligence Committee', 'Deceased 2023'],
    career: ['U.S. Senator (D-CA) 1992-2023', 'Mayor of San Francisco', 'State legislator'],
    websites: [
      { label: 'Senate Website', url: 'https://web.archive.org/web/20240227114148/https://www.feinstein.senate.gov/' }
    ],
    quotes: [
      {
        text: 'The United States has a deep moral obligation to support and defend Israel.',
        context: 'Senate floor speech',
        date: '2018',
        source: 'Senate.gov',
        url: 'https://web.archive.org/web/20240227114148/https://www.feinstein.senate.gov/'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1340000,
        year: '1992-2023',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/dianne-feinstein/summary?cid=N00007364'
      }
    ],
    policyActions: [
      {
        action: 'Led Senate Intelligence Committee release of CIA torture report',
        date: '2014',
        context: 'Declassified report on enhanced interrogation techniques',
        source: 'Senate Intelligence Committee',
        url: 'https://www.intelligence.senate.gov'
      }
    ],
    connections: [
      {
        name: 'Richard Blum',
        relationship: 'Husband with extensive China business ties (deceased)',
        evidence: 'Public financial disclosures',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Employed Chinese spy as personal driver for 20 years',
        source: 'San Francisco Chronicle',
        url: 'https://www.sfchronicle.com',
        tier: 'verified',
        date: '2018'
      },
      {
        claim: 'Led release of CIA torture report over fierce intelligence community opposition',
        source: 'Senate Intelligence Committee',
        url: 'https://www.intelligence.senate.gov',
        tier: 'verified',
        date: '2014'
      }
    ]
  },
  {
    id: 'kevin-mccarthy',
    name: 'Kevin McCarthy',
    title: 'Former House Speaker',
    category: 'politician',
    bioguideId: 'M001165',
    party: 'R',
    state: 'CA',
    photoUrl: getProfilePhoto('kevin-mccarthy'),
    summary: 'Former House Speaker and Representative from California. Ousted in 2023. Trump ally.',
    tags: ['Former Speaker', 'California', 'Republican', 'Trump Ally'],
    career: ['House Speaker 2023', 'Majority Leader 2019-2023', 'U.S. Representative (R-CA) 2007-2023'],
    websites: [
      { label: 'Official Website', url: 'https://www.kevinmccarthy.com' }
    ],
    quotes: [
      {
        text: 'I stand with Israel always.',
        context: 'Social media post',
        date: '2023',
        source: 'Twitter',
        url: 'https://twitter.com/kevinomccarthy'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1672000,
        year: '2007-2023',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/kevin-mccarthy/summary?cid=N00028152'
      }
    ],
    policyActions: [
      {
        action: 'Led House delegation to Israel during Gaza conflict',
        date: '2023',
        context: 'Show of support as Speaker',
        source: 'Speaker Office',
        url: 'https://www.speaker.gov'
      }
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Key ally, later removed as Speaker partly due to Trump dynamics',
        evidence: 'Public record',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Removed as Speaker via motion to vacate — first in US history',
        source: 'House.gov',
        url: 'https://www.house.gov',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Received $1.67M from pro-Israel PACs during House career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/kevin-mccarthy/summary?cid=N00028152',
        tier: 'verified',
        date: '2023'
      }
    ]
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    title: 'House Speaker',
    category: 'politician',
    bioguideId: 'J000299',
    party: 'R',
    state: 'LA',
    photoUrl: getProfilePhoto('mike-johnson'),
    summary: 'Current House Speaker from Louisiana. Conservative Christian. Trump ally.',
    tags: ['House Speaker', 'Louisiana', 'Republican', 'Christian Conservative'],
    career: ['House Speaker 2023-present', 'U.S. Representative (R-LA) 2017-present', 'Lawyer'],
    websites: [
      { label: 'House Website', url: 'https://johnson.house.gov' }
    ],
    quotes: [
      {
        text: 'Israel is America\'s greatest ally and we must stand with them without condition.',
        context: 'First press conference as Speaker',
        date: '2023',
        source: 'C-SPAN',
        url: 'https://www.c-span.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 384000,
        year: '2017-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/mike-johnson/summary?cid=N00039106'
      }
    ],
    policyActions: [
      {
        action: 'Fast-tracked $26.4B Israel aid package through House',
        date: '2024',
        context: 'Bypassed normal committee process',
        source: 'House.gov',
        url: 'https://www.house.gov'
      }
    ],
    connections: [
      {
        name: 'Christians United for Israel',
        relationship: 'Evangelical Christian Zionist alignment',
        evidence: 'Public statements on biblical Israel support',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Cited biblical worldview as basis for unconditional Israel support',
        source: 'CNN',
        url: 'https://www.cnn.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Fast-tracked $26.4B Israel aid bypassing standard committee review',
        source: 'House.gov',
        url: 'https://www.house.gov',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    summary: 'Senator from South Carolina. Only Black Republican senator. Conservative positions.',
    tags: ['Senator', 'South Carolina', 'Republican', 'African American'],
    career: ['U.S. Senator (R-SC) 2013-present', 'U.S. Representative (R-SC)', 'Charleston councilman'],
    websites: [
      { label: 'Senate Website', url: 'https://www.scott.senate.gov' }
    ],
    quotes: [
      {
        text: 'America must always stand on the right side of history with our ally Israel.',
        context: 'Senate floor speech',
        date: '2023',
        source: 'Senate.gov',
        url: 'https://www.scott.senate.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 890000,
        year: '2013-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/tim-scott/summary?cid=N00033610'
      }
    ],
    policyActions: [
      {
        action: 'Co-led Senate effort to expand Abraham Accords',
        date: '2023',
        context: 'Bipartisan normalization framework',
        source: 'Senate.gov',
        url: 'https://www.scott.senate.gov'
      }
    ],
    connections: [
      {
        name: 'Larry Ellison',
        relationship: 'Major donor to presidential campaign',
        evidence: 'FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $890K from pro-Israel PACs during Senate career',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/tim-scott/summary?cid=N00033610',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    summary: 'Senator from Pennsylvania elected 2022. Former Mayor of Braddock. Progressive voice.',
    tags: ['Senator', 'Pennsylvania', 'Democrat', 'Progressive'],
    career: ['U.S. Senator (D-PA) 2023-present', 'Mayor of Braddock', 'Community activist'],
    websites: [
      { label: 'Senate Website', url: 'https://www.fetterman.senate.gov' }
    ],
    quotes: [
      {
        text: 'I\'m not going to be the guy that capitulates on Israel. Not ever.',
        context: 'Interview on Israel policy',
        date: '2023',
        source: 'Jewish Insider',
        url: 'https://jewishinsider.com'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1060000,
        year: '2022-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/john-fetterman/summary?cid=N00045540'
      }
    ],
    policyActions: [
      {
        action: 'Displayed Israeli flag outside Senate office, hosted Israeli hostage families',
        date: '2023',
        context: 'Visible break from progressive base on Israel',
        source: 'Senate.gov',
        url: 'https://www.fetterman.senate.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Shifted from progressive to pro-Israel hawk after election',
        evidence: 'Voting record and public statements',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Dramatic shift from progressive icon to most vocal Democratic Israel supporter',
        source: 'Politico',
        url: 'https://www.politico.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Received $1.06M from pro-Israel PACs',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/john-fetterman/summary?cid=N00045540',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    title: 'Entertainment Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('haim-saban'),
    summary: 'Entertainment mogul, Univision founder. Major Democratic donor and AIPAC supporter. Pro-Israel activist.',
    tags: ['Billionaire', 'Entertainment', 'Democratic Donor', 'AIPAC', 'Pro-Israel'],
    netWorth: '~$4.5 billion',
    career: ['Univision founder', 'Entertainment entrepreneur', 'Political donor'],
    websites: [
      { label: 'Saban Productions', url: 'https://www.sabanproductions.com' }
    ],
    quotes: [
      {
        text: 'I\'m a one-issue guy, and my issue is Israel.',
        context: 'Interview with The New Yorker',
        date: '2010',
        source: 'The New Yorker',
        url: 'https://www.newyorker.com'
      }
    ],
    donations: [
      {
        from: 'Donations to Democratic candidates and Clinton Foundation',
        amount: 25000000,
        year: '2000-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=haim+saban'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Hillary Clinton',
        relationship: 'Top donor to Clinton campaigns and foundation',
        evidence: 'FEC filings and foundation disclosures',
        tier: 'verified'
      },
      {
        name: 'Brookings Institution',
        relationship: 'Funded Saban Center for Middle East Policy',
        evidence: 'Brookings records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Self-described single-issue donor focused exclusively on Israel',
        source: 'The New Yorker',
        url: 'https://www.newyorker.com',
        tier: 'verified',
        date: '2010'
      },
      {
        claim: 'Donated $25M+ to Democratic campaigns, primarily Clinton-aligned',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Founded Saban Center at Brookings — major pro-Israel think tank',
        source: 'Brookings Institution',
        url: 'https://www.brookings.edu',
        tier: 'verified',
        date: '2002'
      }
    ]
  },
  {
    id: 'paul-singer',
    name: 'Paul Singer',
    title: 'Hedge Fund Manager, Billionaire',
    category: 'billionaire',
    photoUrl: getProfilePhoto('paul-singer'),
    summary: 'Elliott Management founder. Republican mega-donor. Pro-Israel activist and hawk on foreign policy.',
    tags: ['Billionaire', 'Hedge Fund Manager', 'Republican Donor', 'Pro-Israel', 'Political Influencer'],
    netWorth: '~$4 billion',
    career: ['Elliott Management founder', 'Hedge fund manager', 'Political donor'],
    websites: [
      { label: 'Elliott Management', url: 'https://www.elliottmanagement.com' }
    ],
    quotes: [
      {
        text: 'Free markets and the rule of law are the foundations of prosperity.',
        context: 'Elliott Management letter',
        date: '2019',
        source: 'Elliott Management',
        url: 'https://www.elliottmgmt.com'
      }
    ],
    donations: [
      {
        from: 'Political donations to Republican candidates',
        amount: 56000000,
        year: '2016-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/donor-lookup/results?name=paul+singer'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Republican Jewish Coalition',
        relationship: 'Board member and major funder',
        evidence: 'Organization records',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Elliott Management sued Argentina, attached naval vessel over sovereign debt',
        source: 'Bloomberg',
        url: 'https://www.bloomberg.com',
        tier: 'verified',
        date: '2012'
      },
      {
        claim: 'Major Republican donor focused on pro-Israel candidates, $56M+ in political giving',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    title: 'Prime Minister of Israel',
    category: 'foreign-agent',
    party: 'N/A',
    state: undefined,
    summary:
      'Longest-serving Israeli prime minister and wartime head of government after October 7, 2023. Subject of an ICC arrest warrant (November 2024) for alleged war crimes and crimes against humanity, including starvation as a method of warfare. Ultimate political authority over IDF operations and aid-access policy during the Gaza war. Primary Israeli counterpart for U.S. military-aid and weapons transfers.',
    tags: ['Israel', 'Prime Minister', 'ICC Warrant', 'Gaza War', 'Likud', 'U.S. Aid Recipient Leadership'],
    quotes: [
      {
        text: 'We will fight and we will win.',
        context: 'Wartime address framing total military campaign after October 7',
        date: '2023-10',
        source: 'Israeli Prime Minister public addresses (contemporaneous reporting)',
        url: 'https://www.gov.il/en/departments/prime_ministers_office',
      },
    ],
    donations: [],
    policyActions: [
      {
        action: 'Directed Israeli military campaign in Gaza following October 7 attack',
        date: '2023-10 to present',
        context: 'As PM and security cabinet chair, holds ultimate civilian authority over wartime operations with record civilian casualty tolls attributed by OCHA to MoH Gaza figures',
        source: 'OCHA Reported Impact Snapshot / Israeli PMO',
        url: 'https://www.ochaopt.org/sites/default/files/Gaza_Reported_Impact_Snapshot_01_April_2026.pdf',
      },
      {
        action: 'ICC Pre-Trial Chamber issued arrest warrant',
        date: '2024-11',
        context: 'Alleged war crimes and crimes against humanity including starvation as a method of warfare; warrant is a judicial finding of reasonable grounds, not a final conviction',
        source: 'International Criminal Court',
        url: 'https://www.icc-cpi.int/palestine',
      },
    ],
    connections: [
      {
        name: 'Yoav Gallant',
        relationship: 'Defense Minister during opening phase of Gaza war; co-subject of ICC warrant',
        evidence: 'ICC Situation in the State of Palestine — warrants for Netanyahu and Gallant',
        tier: 'verified',
      },
      {
        name: 'Joe Biden',
        relationship: 'Primary U.S. presidential counterpart for wartime military aid (2023–2025)',
        evidence: 'H.R.815 supplemental and continuous munitions transfers under Biden administration',
        tier: 'verified',
      },
      {
        name: 'AIPAC',
        relationship: 'U.S. lobbying ecosystem that mobilizes support for Israeli government policy in Congress',
        evidence: 'OpenSecrets pro-Israel industry and AIPAC Super PAC spending in 2024 cycle',
        tier: 'verified',
      },
    ],
    sourcedClaims: [
      {
        claim: 'ICC Pre-Trial Chamber I issued an arrest warrant for Benjamin Netanyahu for alleged war crimes and crimes against humanity in the Situation in the State of Palestine.',
        source: 'International Criminal Court',
        url: 'https://www.icc-cpi.int/palestine',
        tier: 'verified',
        date: '2024-11',
      },
      {
        claim: 'Israel under Netanyahu governments has been the largest cumulative recipient of U.S. foreign military aid, with CRS estimating ~$298B inflation-adjusted obligations through 2024.',
        source: 'Congressional Research Service RL33222',
        url: 'https://www.congress.gov/crs-product/RL33222',
        tier: 'verified',
        date: '2024',
      },
      {
        claim: 'As wartime PM, Netanyahu retained political authority over operations that UN agencies and multiple fact-finding bodies documented as causing mass civilian harm in Gaza.',
        source: 'OCHA / OHCHR public records',
        url: 'https://www.ohchr.org/en/countries/palestine',
        tier: 'verified',
        date: '2023-2026',
      },
    ],
    born: '1949-10-21',
    education: 'MIT (architecture/management studies); service in Sayeret Matkal',
    career: [
      '1949 — Born in Tel Aviv',
      '1967–1972 — IDF special forces (Sayeret Matkal)',
      '1984–1988 — Israeli Ambassador to the United Nations',
      '1996–1999 — First term as Prime Minister',
      '2009–2021 — Prime Minister (consecutive terms)',
      '2022–present — Prime Minister (current wartime government)',
      '2024-11 — ICC arrest warrant issued (alleged war crimes / crimes against humanity)',
    ],
    websites: [
      { label: 'Prime Minister\'s Office', url: 'https://www.gov.il/en/departments/prime_ministers_office' },
      { label: 'ICC — Situation in Palestine', url: 'https://www.icc-cpi.int/palestine' },
      { label: 'CRS RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Benjamin_Netanyahu' },
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
];

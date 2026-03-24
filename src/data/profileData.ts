// Type definitions for power profiles
export type ProfileCategory = 'politician' | 'billionaire' | 'lobbyist' | 'intel' | 'media' | 'corporate' | 'foreign-agent'
export type EvidenceTier = 'verified' | 'circumstantial' | 'disputed'
export type Party = 'D' | 'R' | 'I' | 'N/A'

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

export function getProfilePhoto(profileId: string): string {
  const baseUrl = '/images/profiles'
  return `${baseUrl}/${profileId}.jpg`
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
        url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/C001098'
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
    career: ['U.S. Senator (R-TX) 2013-present', 'Solicitor General of Texas', 'Federal Trade Commission attorney'],
    websites: [
      { label: 'Senate Website', url: 'https://www.cruz.senate.gov' },
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/ted-cruz/C001098' }
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
        url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/S000148'
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
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/chuck-schumer/S000148' }
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
        url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/P000197'
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
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/P000197' }
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
        url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/M000355'
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
      { label: 'OpenSecrets', url: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/M000355' }
    ]
  },
  {
    id: 'miriam-adelson',
    name: 'Miriam Adelson',
    title: 'Casino Billionaire, Political Donor',
    category: 'billionaire',
    photoUrl: getProfilePhoto('miriam-adelson'),
    summary: 'Widow of Sheldon Adelson, casino billionaire. Donated $100M+ to Trump 2024 campaign. Major pro-Israel donor funding conservative and Republican candidates.',
    tags: ['Adelson Family', 'Trump Donor', 'Casino Billionaire', 'Pro-Israel', 'Conservative'],
    quotes: [],
    donations: [
      {
        from: 'Personal contributions',
        amount: 100000000,
        year: '2024',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Major campaign donor',
        evidence: '$100M+ contributed to 2024 campaign and PACs',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Donated $100M+ to Trump 2024 campaign',
        source: 'FEC records',
        url: 'https://www.fec.gov',
        tier: 'verified',
        date: '2024'
      }
    ],
    netWorth: '~$38 billion',
    born: '1948',
    career: ['Casino operator', 'Political donor', 'Philanthropy'],
    websites: [
      { label: 'FEC Records', url: 'https://www.fec.gov' }
    ]
  },
  {
    id: 'sheldon-adelson',
    name: 'Sheldon Adelson',
    title: 'Casino Billionaire (Deceased)',
    category: 'billionaire',
    photoUrl: getProfilePhoto('sheldon-adelson'),
    summary: 'Deceased casino mogul. Donated $200M+ to Republican candidates and pro-Israel causes. Major influence on Middle East policy through campaign funding.',
    tags: ['Adelson Family', 'Casino Billionaire', 'Republican Donor', 'Pro-Israel', 'Deceased 2021'],
    quotes: [],
    donations: [
      {
        from: 'Personal contributions',
        amount: 200000000,
        year: '2012-2021',
        source: 'FEC',
        url: 'https://www.fec.gov'
      }
    ],
    policyActions: [],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Major donor',
        evidence: 'Significant contributions to Trump campaigns',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Donated $200M+ to Republican campaigns and causes',
        source: 'FEC records',
        url: 'https://www.fec.gov',
        tier: 'verified',
        date: '2021'
      }
    ],
    netWorth: '~$40 billion (at death)',
    born: '1933',
    career: ['Casino operator', 'Political donor'],
    websites: [
      { label: 'FEC Records', url: 'https://www.fec.gov' }
    ]
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
    born: '1953',
    career: ['Hedge fund manager', 'Money manager', 'Convicted sex offender'],
    websites: [
      { label: 'DOJ Case Information', url: 'https://www.justice.gov' }
    ]
  },
  {
    id: 'alan-dershowitz',
    name: 'Alan Dershowitz',
    title: 'Harvard Law Professor, Defense Attorney',
    category: 'corporate',
    photoUrl: getProfilePhoto('alan-dershowitz'),
    summary: 'Prominent attorney and Harvard professor. Defended Epstein and represented him in legal matters. Later defended Trump in impeachment trials.',
    tags: ['Epstein Defense', 'Trump Lawyer', 'Harvard Professor', 'Controversial', 'Civil Rights'],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'Jeffrey Epstein',
        relationship: 'Defense attorney and associate',
        evidence: 'Represented Epstein in multiple legal matters',
        tier: 'verified'
      },
      {
        name: 'Donald Trump',
        relationship: 'Defense lawyer',
        evidence: 'Represented in first impeachment trial',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Represented Jeffrey Epstein in legal matters',
        source: 'Court records',
        url: 'https://www.justice.gov',
        tier: 'verified',
        date: '2008'
      }
    ],
    born: '1938',
    education: 'Harvard Law School',
    career: ['Harvard Law Professor', 'Defense attorney', 'Constitutional law expert', 'Political commentator'],
    websites: [
      { label: 'Harvard Law Profile', url: 'https://hls.harvard.edu' }
    ]
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
    born: '1960',
    career: ['British Royal', 'Armed Forces officer', 'Charity patron'],
    websites: [
      { label: 'Royal Family', url: 'https://www.royalFamily.gov.uk' }
    ]
  },
  {
    id: 'adam-schiff',
    name: 'Adam Schiff',
    title: 'U.S. Representative (D-CA)',
    category: 'politician',
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'hakeem-jeffries',
    name: 'Hakeem Jeffries',
    title: 'U.S. Representative, Democratic Leader',
    category: 'politician',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('hakeem-jeffries'),
    summary: 'House Democratic Leader from New York. Rising Democratic voice. Represents Brooklyn district.',
    tags: ['Democratic Leader', 'New York', 'House Leadership', 'Progressive'],
    career: ['U.S. Representative (D-NY) 2013-present', 'Democratic Leader', 'Attorney'],
    websites: [
      { label: 'House Website', url: 'https://jeffries.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'lindsey-graham',
    name: 'Lindsey Graham',
    title: 'U.S. Senator (R-SC)',
    category: 'politician',
    party: 'R',
    state: 'SC',
    photoUrl: getProfilePhoto('lindsey-graham'),
    summary: 'Senator from South Carolina. Known for hawkish foreign policy positions on Middle East and Russia.',
    tags: ['Senator', 'Hawk', 'South Carolina', 'Republican', 'Foreign Policy'],
    career: ['U.S. Senator (R-SC) 2003-present', 'U.S. Representative', 'Military officer'],
    websites: [
      { label: 'Senate Website', url: 'https://www.graham.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'marco-rubio',
    name: 'Marco Rubio',
    title: 'U.S. Senator (R-FL)',
    category: 'politician',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('marco-rubio'),
    summary: 'Senator from Florida. Secretary of State under Trump. Hawkish positions on foreign policy and Middle East.',
    tags: ['Senator', 'Secretary of State', 'Florida', 'Republican'],
    career: ['Secretary of State 2025-present', 'U.S. Senator (R-FL) 2011-present', 'Florida House speaker'],
    websites: [
      { label: 'State Department', url: 'https://www.state.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'tom-cotton',
    name: 'Tom Cotton',
    title: 'U.S. Senator (R-AR)',
    category: 'politician',
    party: 'R',
    state: 'AR',
    photoUrl: getProfilePhoto('tom-cotton'),
    summary: 'Senator from Arkansas. Prominent voice on Iran policy and Middle East. AIPAC recipient.',
    tags: ['Senator', 'Iran Hawk', 'Arkansas', 'Republican', 'AIPAC'],
    career: ['U.S. Senator (R-AR) 2015-present', 'U.S. Representative', 'Military officer'],
    websites: [
      { label: 'Senate Website', url: 'https://www.cotton.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'cory-booker',
    name: 'Cory Booker',
    title: 'U.S. Senator (D-NJ)',
    category: 'politician',
    party: 'D',
    state: 'NJ',
    photoUrl: getProfilePhoto('cory-booker'),
    summary: 'Senator from New Jersey. Presidential candidate 2020. Strong pro-Israel voting record.',
    tags: ['Senator', 'Democratic Leader', 'New Jersey', 'Pro-Israel'],
    career: ['U.S. Senator (D-NJ) 2013-present', 'Mayor of Newark', 'Community activist'],
    websites: [
      { label: 'Senate Website', url: 'https://www.booker.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'jacky-rosen',
    name: 'Jacky Rosen',
    title: 'U.S. Senator (D-NV)',
    category: 'politician',
    party: 'D',
    state: 'NV',
    photoUrl: getProfilePhoto('jacky-rosen'),
    summary: 'Senator from Nevada. First female Jewish senator from Nevada. Strong AIPAC supporter.',
    tags: ['Senator', 'Jewish', 'Nevada', 'Democrat', 'AIPAC'],
    career: ['U.S. Senator (D-NV) 2019-present', 'U.S. Representative (D-NV)', 'Software developer'],
    websites: [
      { label: 'Senate Website', url: 'https://www.rosen.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'josh-gottheimer',
    name: 'Josh Gottheimer',
    title: 'U.S. Representative (D-NJ)',
    category: 'politician',
    party: 'D',
    state: 'NJ',
    photoUrl: getProfilePhoto('josh-gottheimer'),
    summary: 'Representative from New Jersey. Prominent AIPAC supporter and pro-Israel advocate.',
    tags: ['Representative', 'Pro-Israel', 'New Jersey', 'Democrat', 'AIPAC'],
    career: ['U.S. Representative (D-NJ) 2017-present', 'Political analyst', 'Clinton administration official'],
    websites: [
      { label: 'House Website', url: 'https://gottheimer.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'brad-sherman',
    name: 'Brad Sherman',
    title: 'U.S. Representative (D-CA)',
    category: 'politician',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('brad-sherman'),
    summary: 'Representative from California. House Financial Services Committee member. Pro-Israel voting record.',
    tags: ['Representative', 'Financial Services', 'California', 'Democrat'],
    career: ['U.S. Representative (D-CA) 1997-present', 'Accountant', 'State legislator'],
    websites: [
      { label: 'House Website', url: 'https://sherman.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'ritchie-torres',
    name: 'Ritchie Torres',
    title: 'U.S. Representative (D-NY)',
    category: 'politician',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('ritchie-torres'),
    summary: 'Representative from New York. Young progressive voice. Strong pro-Israel positions.',
    tags: ['Representative', 'Progressive', 'New York', 'Democrat', 'Pro-Israel'],
    career: ['U.S. Representative (D-NY) 2020-present', 'NYC Council member', 'Community activist'],
    websites: [
      { label: 'House Website', url: 'https://torres.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'joe-biden',
    name: 'Joe Biden',
    title: '46th U.S. President',
    category: 'politician',
    party: 'D',
    photoUrl: getProfilePhoto('joe-biden'),
    summary: 'Current U.S. President (2021-2025). Long pro-Israel voting record as Senator and VP. Continued strong Israel support.',
    tags: ['President', 'Pro-Israel', 'Democrat', 'Delaware', 'Long Career'],
    career: ['46th President 2021-2025', 'Vice President 2009-2017', 'U.S. Senator (D-DE) 1973-2009'],
    websites: [
      { label: 'White House', url: 'https://www.whitehouse.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'kamala-harris',
    name: 'Kamala Harris',
    title: '49th Vice President',
    category: 'politician',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('kamala-harris'),
    summary: 'Vice President under Biden. Former California Attorney General. Pro-Israel voting record.',
    tags: ['Vice President', 'California', 'Democrat', 'Pro-Israel'],
    career: ['Vice President 2021-2025', 'U.S. Senator (D-CA) 2017-2021', 'California AG', 'Prosecutor'],
    websites: [
      { label: 'White House', url: 'https://www.whitehouse.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'barack-obama',
    name: 'Barack Obama',
    title: '44th U.S. President',
    category: 'politician',
    party: 'D',
    state: 'IL',
    photoUrl: getProfilePhoto('barack-obama'),
    summary: 'Former U.S. President 2009-2017. Provided record aid to Israel during presidency. Now involved in various initiatives.',
    tags: ['Former President', 'Illinois', 'Democrat', 'Pro-Israel'],
    career: ['44th President 2009-2017', 'U.S. Senator (D-IL) 2005-2008', 'State Senator', 'Community organizer'],
    websites: [
      { label: 'Obama Foundation', url: 'https://www.obama.org' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'hillary-clinton',
    name: 'Hillary Clinton',
    title: 'Former Secretary of State',
    category: 'politician',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('hillary-clinton'),
    summary: 'Former Secretary of State, Senator, 2016 presidential candidate. Strong pro-Israel record.',
    tags: ['Secretary of State', 'Senator', 'New York', 'Democrat', 'Pro-Israel'],
    career: ['Secretary of State 2009-2013', 'U.S. Senator (D-NY) 2001-2009', 'First Lady', 'Attorney'],
    websites: [
      { label: 'Clinton Foundation', url: 'https://www.clintonfoundation.org' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'bill-clinton',
    name: 'Bill Clinton',
    title: '42nd U.S. President',
    category: 'politician',
    party: 'D',
    photoUrl: getProfilePhoto('bill-clinton'),
    summary: 'Former president 1993-2001. Strong pro-Israel record. Clinton Foundation involved in global initiatives.',
    tags: ['Former President', 'Democrat', 'Pro-Israel', 'Philanthropist'],
    career: ['42nd President 1993-2001', 'Governor of Arkansas', 'Attorney general'],
    websites: [
      { label: 'Clinton Foundation', url: 'https://www.clintonfoundation.org' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'mike-pence',
    name: 'Mike Pence',
    title: '48th Vice President',
    category: 'politician',
    party: 'R',
    state: 'IN',
    photoUrl: getProfilePhoto('mike-pence'),
    summary: 'Former Vice President under Trump. Christian Zionist. Evangelical Christian with strong pro-Israel positions.',
    tags: ['Vice President', 'Christian Zionist', 'Indiana', 'Republican', 'Evangelical'],
    career: ['Vice President 2017-2021', 'Governor of Indiana', 'U.S. Representative (R-IN)', 'Talk radio host'],
    websites: [
      { label: 'Official Website', url: 'https://www.mikepence.com' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'dick-cheney',
    name: 'Dick Cheney',
    title: '46th Vice President',
    category: 'politician',
    party: 'R',
    state: 'WY',
    photoUrl: getProfilePhoto('dick-cheney'),
    summary: 'Former Vice President under George W. Bush. Architect of Iraq War. Halliburton connections.',
    tags: ['Vice President', 'Iraq War', 'Neoconservative', 'Wyoming', 'Republican'],
    career: ['Vice President 2001-2009', 'Secretary of Defense 1989-1993', 'Congressman', 'Halliburton CEO'],
    websites: [
      { label: 'American Enterprise Institute', url: 'https://www.aei.org' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'john-bolton',
    name: 'John Bolton',
    title: 'Former National Security Advisor',
    category: 'politician',
    party: 'R',
    photoUrl: getProfilePhoto('john-bolton'),
    summary: 'Trump National Security Advisor 2018-2019. Prominent neoconservative. Advocate for military intervention in Middle East.',
    tags: ['National Security Advisor', 'Neoconservative', 'War Hawk', 'Republican'],
    career: ['National Security Advisor 2018-2019', 'UN Ambassador 2005-2006', 'State Department official', 'Conservative commentator'],
    websites: [
      { label: 'Official Website', url: 'https://www.johnbolton.com' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'mike-pompeo',
    name: 'Mike Pompeo',
    title: 'Former Secretary of State',
    category: 'politician',
    party: 'R',
    state: 'KS',
    photoUrl: getProfilePhoto('mike-pompeo'),
    summary: 'Trump Secretary of State 2018-2021. CIA Director 2017-2018. Hawkish foreign policy stance on Iran and Middle East.',
    tags: ['Secretary of State', 'CIA Director', 'Kansas', 'Republican'],
    career: ['Secretary of State 2018-2021', 'CIA Director 2017-2018', 'Congressman (R-KS)', 'Military officer'],
    websites: [
      { label: 'Official Website', url: 'https://www.mikepompeo.com' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'ron-desantis',
    name: 'Ron DeSantis',
    title: 'Governor of Florida',
    category: 'politician',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('ron-desantis'),
    summary: 'Governor of Florida. 2024 presidential candidate. Strong pro-Israel and religious right alignment.',
    tags: ['Governor', 'Presidential Candidate', 'Florida', 'Republican', 'Pro-Israel'],
    career: ['Governor of Florida 2019-present', 'U.S. Representative (R-FL)', 'Military lawyer'],
    websites: [
      { label: 'Florida Governor', url: 'https://www.flgov.com' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'bernie-sanders',
    name: 'Bernie Sanders',
    title: 'U.S. Senator (I-VT)',
    category: 'politician',
    party: 'I',
    state: 'VT',
    photoUrl: getProfilePhoto('bernie-sanders'),
    summary: 'Independent Senator from Vermont. Prominent progressive voice. Critical of Israeli occupation policies.',
    tags: ['Senator', 'Independent', 'Vermont', 'Progressive', 'Palestinian Rights'],
    career: ['U.S. Senator (I-VT) 2007-present', 'House member (D-VT)', 'Mayor of Burlington'],
    websites: [
      { label: 'Senate Website', url: 'https://www.sanders.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'elizabeth-warren',
    name: 'Elizabeth Warren',
    title: 'U.S. Senator (D-MA)',
    category: 'politician',
    party: 'D',
    state: 'MA',
    photoUrl: getProfilePhoto('elizabeth-warren'),
    summary: 'Senator from Massachusetts. Consumer protection advocate. Progressive positions on various issues.',
    tags: ['Senator', 'Massachusetts', 'Democrat', 'Progressive', 'Consumer Protection'],
    career: ['U.S. Senator (D-MA) 2013-present', 'Law professor', 'Consumer advocate'],
    websites: [
      { label: 'Senate Website', url: 'https://www.warren.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'rand-paul',
    name: 'Rand Paul',
    title: 'U.S. Senator (R-KY)',
    category: 'politician',
    party: 'R',
    state: 'KY',
    photoUrl: getProfilePhoto('rand-paul'),
    summary: 'Libertarian-leaning Senator from Kentucky. Skeptical of foreign interventionism. Son of Ron Paul.',
    tags: ['Senator', 'Libertarian', 'Kentucky', 'Republican', 'Non-interventionist'],
    career: ['U.S. Senator (R-KY) 2011-present', 'Eye doctor', 'Ophthalmologist'],
    websites: [
      { label: 'Senate Website', url: 'https://www.paul.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'ilhan-omar',
    name: 'Ilhan Omar',
    title: 'U.S. Representative (D-MN)',
    category: 'politician',
    party: 'D',
    state: 'MN',
    photoUrl: getProfilePhoto('ilhan-omar'),
    summary: 'Representative from Minnesota. Progressive voice. Critical of Israeli occupation and US foreign policy.',
    tags: ['Representative', 'Minnesota', 'Democrat', 'Progressive', 'Palestinian Rights Advocate'],
    career: ['U.S. Representative (D-MN) 2019-present', 'Minnesota state legislator', 'Community activist'],
    websites: [
      { label: 'House Website', url: 'https://omar.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'rashida-tlaib',
    name: 'Rashida Tlaib',
    title: 'U.S. Representative (D-MI)',
    category: 'politician',
    party: 'D',
    state: 'MI',
    photoUrl: getProfilePhoto('rashida-tlaib'),
    summary: 'Representative from Michigan. First Palestinian-American in Congress. Strong advocate for Palestinian rights.',
    tags: ['Representative', 'Michigan', 'Democrat', 'Palestinian-American', 'Palestinian Rights'],
    career: ['U.S. Representative (D-MI) 2019-present', 'Michigan state legislator', 'Community lawyer'],
    websites: [
      { label: 'House Website', url: 'https://tlaib.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'aoc',
    name: 'Alexandria Ocasio-Cortez',
    title: 'U.S. Representative (D-NY)',
    category: 'politician',
    party: 'D',
    state: 'NY',
    photoUrl: getProfilePhoto('aoc'),
    summary: 'Progressive Representative from New York. Vocal critic of Israeli occupation. Member of Squad.',
    tags: ['Representative', 'New York', 'Democrat', 'Progressive', 'Palestinian Rights'],
    career: ['U.S. Representative (D-NY) 2019-present', 'Bartender and activist', 'Community organizer'],
    websites: [
      { label: 'House Website', url: 'https://ocasio-cortez.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'matt-gaetz',
    name: 'Matt Gaetz',
    title: 'U.S. Representative (R-FL)',
    category: 'politician',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('matt-gaetz'),
    summary: 'Representative from Florida. Conservative firebrand. Controversial figure.',
    tags: ['Representative', 'Florida', 'Republican', 'Conservative', 'Trump Ally'],
    career: ['U.S. Representative (R-FL) 2017-present', 'Florida state legislator', 'Prosecutor'],
    websites: [
      { label: 'House Website', url: 'https://gaetz.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'jim-jordan',
    name: 'Jim Jordan',
    title: 'U.S. Representative (R-OH)',
    category: 'politician',
    party: 'R',
    state: 'OH',
    photoUrl: getProfilePhoto('jim-jordan'),
    summary: 'Representative from Ohio. House Judiciary Chairman. Trump ally and election denier.',
    tags: ['Representative', 'Ohio', 'Republican', 'Trump Ally', 'Conservative'],
    career: ['U.S. Representative (R-OH) 2007-present', 'House Judiciary Chair', 'College wrestling coach'],
    websites: [
      { label: 'House Website', url: 'https://jordan.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'elise-stefanik',
    name: 'Elise Stefanik',
    title: 'U.S. Representative (R-NY)',
    category: 'politician',
    party: 'R',
    state: 'NY',
    photoUrl: getProfilePhoto('elise-stefanik'),
    summary: 'Representative from New York. House Republican Conference Chair. Trump supporter and AIPAC recipient.',
    tags: ['Representative', 'New York', 'Republican', 'House Leadership', 'AIPAC'],
    career: ['U.S. Representative (R-NY) 2015-present', 'Republican Conference Chair', 'Defense consultant'],
    websites: [
      { label: 'House Website', url: 'https://stefanik.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'dianne-feinstein',
    name: 'Dianne Feinstein',
    title: 'Former U.S. Senator (D-CA)',
    category: 'politician',
    party: 'D',
    state: 'CA',
    photoUrl: getProfilePhoto('dianne-feinstein'),
    summary: 'Deceased former Senator from California. Served 1992-2023. Controversial intelligence committee tenure.',
    tags: ['Senator', 'California', 'Democrat', 'Intelligence Committee', 'Deceased 2023'],
    career: ['U.S. Senator (D-CA) 1992-2023', 'Mayor of San Francisco', 'State legislator'],
    websites: [
      { label: 'Senate Website', url: 'https://www.feinstein.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'kevin-mccarthy',
    name: 'Kevin McCarthy',
    title: 'Former House Speaker',
    category: 'politician',
    party: 'R',
    state: 'CA',
    photoUrl: getProfilePhoto('kevin-mccarthy'),
    summary: 'Former House Speaker and Representative from California. Ousted in 2023. Trump ally.',
    tags: ['Former Speaker', 'California', 'Republican', 'Trump Ally'],
    career: ['House Speaker 2023', 'Majority Leader 2019-2023', 'U.S. Representative (R-CA) 2007-2023'],
    websites: [
      { label: 'Official Website', url: 'https://www.kevinmccarthy.com' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    title: 'House Speaker',
    category: 'politician',
    party: 'R',
    state: 'LA',
    photoUrl: getProfilePhoto('mike-johnson'),
    summary: 'Current House Speaker from Louisiana. Conservative Christian. Trump ally.',
    tags: ['House Speaker', 'Louisiana', 'Republican', 'Christian Conservative'],
    career: ['House Speaker 2023-present', 'U.S. Representative (R-LA) 2017-present', 'Lawyer'],
    websites: [
      { label: 'House Website', url: 'https://johnson.house.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'tim-scott',
    name: 'Tim Scott',
    title: 'U.S. Senator (R-SC)',
    category: 'politician',
    party: 'R',
    state: 'SC',
    photoUrl: getProfilePhoto('tim-scott'),
    summary: 'Senator from South Carolina. Only Black Republican senator. Conservative positions.',
    tags: ['Senator', 'South Carolina', 'Republican', 'African American'],
    career: ['U.S. Senator (R-SC) 2013-present', 'U.S. Representative (R-SC)', 'Charleston councilman'],
    websites: [
      { label: 'Senate Website', url: 'https://www.scott.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'john-fetterman',
    name: 'John Fetterman',
    title: 'U.S. Senator (D-PA)',
    category: 'politician',
    party: 'D',
    state: 'PA',
    photoUrl: getProfilePhoto('john-fetterman'),
    summary: 'Senator from Pennsylvania elected 2022. Former Mayor of Braddock. Progressive voice.',
    tags: ['Senator', 'Pennsylvania', 'Democrat', 'Progressive'],
    career: ['U.S. Senator (D-PA) 2023-present', 'Mayor of Braddock', 'Community activist'],
    websites: [
      { label: 'Senate Website', url: 'https://www.fetterman.senate.gov' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  },
  {
    id: 'howard-kohr',
    name: 'Howard Kohr',
    title: 'AIPAC Executive Director',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('howard-kohr'),
    summary: 'AIPAC Executive Director. Leads major pro-Israel lobbying organization. Significant influence on US foreign policy.',
    tags: ['AIPAC', 'Lobbyist', 'Pro-Israel', 'Political Influencer'],
    career: ['AIPAC Executive Director', 'Lobbyist', 'Policy advocate'],
    websites: [
      { label: 'AIPAC', url: 'https://www.aipac.org' }
    ],
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
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
    quotes: [],
    donations: [],
    policyActions: [],
    connections: [],
    sourcedClaims: []
  }
];

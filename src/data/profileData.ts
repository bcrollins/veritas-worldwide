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

// Verified Wikimedia Commons portrait URLs for each profile
// Uses official government portraits (public domain) where available
const PROFILE_PHOTOS: Record<string, string> = {
  'ted-cruz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Ted_Cruz_official_116th_portrait.jpg/440px-Ted_Cruz_official_116th_portrait.jpg',
  'donald-trump': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/440px-Donald_Trump_official_portrait.jpg',
  'bill-gates': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bill_Gates_2017_%28cropped%29.jpg/440px-Bill_Gates_2017_%28cropped%29.jpg',
  'george-soros': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/George_Soros_-_Festival_Economia_2012.JPG/440px-George_Soros_-_Festival_Economia_2012.JPG',
  'jared-kushner': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jared_Kushner_official_portrait_%28cropped%29.jpg/440px-Jared_Kushner_official_portrait_%28cropped%29.jpg',
  'chuck-schumer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Chuck_Schumer_official_photo.jpg/440px-Chuck_Schumer_official_photo.jpg',
  'nancy-pelosi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Nancy_Pelosi_2019.jpg/440px-Nancy_Pelosi_2019.jpg',
  'mitch-mcconnell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Mitch_McConnell_2016_official_photo.jpg/440px-Mitch_McConnell_2016_official_photo.jpg',
  'miriam-adelson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Miriam_Adelson_2023_%28cropped%29.jpg/440px-Miriam_Adelson_2023_%28cropped%29.jpg',
  'sheldon-adelson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sheldon_Adelson_crop.jpg/440px-Sheldon_Adelson_crop.jpg',
  'ghislaine-maxwell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ghislaine_Maxwell_cropped.jpg/440px-Ghislaine_Maxwell_cropped.jpg',
  'jeffrey-epstein': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Epstein%27s_NYC_Mugshot.jpg/440px-Epstein%27s_NYC_Mugshot.jpg',
  'alan-dershowitz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Alan_Dershowitz_2009.jpg/440px-Alan_Dershowitz_2009.jpg',
  'les-wexner': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Les_Wexner_at_World_Economic_Forum_%28cropped%29.jpg/440px-Les_Wexner_at_World_Economic_Forum_%28cropped%29.jpg',
  'prince-andrew': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Prince_Andrew_August_2014_%28cropped%29.jpg/440px-Prince_Andrew_August_2014_%28cropped%29.jpg',
  'adam-schiff': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Adam_Schiff_official_portrait.jpg/440px-Adam_Schiff_official_portrait.jpg',
  'hakeem-jeffries': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Hakeem_Jeffries_117th_Congress_portrait.jpg/440px-Hakeem_Jeffries_117th_Congress_portrait.jpg',
  'lindsey-graham': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lindsey_Graham%2C_official_photo%2C_113th_Congress.jpg/440px-Lindsey_Graham%2C_official_photo%2C_113th_Congress.jpg',
  'marco-rubio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Marco_Rubio%2C_Official_Portrait%2C_112th_Congress.jpg/440px-Marco_Rubio%2C_Official_Portrait%2C_112th_Congress.jpg',
  'tom-cotton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Tom_Cotton_official_Senate_photo.jpg/440px-Tom_Cotton_official_Senate_photo.jpg',
  'cory-booker': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg/440px-Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg',
  'jacky-rosen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jacky_Rosen%2C_official_portrait%2C_116th_congress.jpg/440px-Jacky_Rosen%2C_official_portrait%2C_116th_congress.jpg',
  'josh-gottheimer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Josh_Gottheimer_official_photo.jpg/440px-Josh_Gottheimer_official_photo.jpg',
  'brad-sherman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Brad_Sherman_official_photo.jpg/440px-Brad_Sherman_official_photo.jpg',
  'ritchie-torres': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ritchie_Torres_117th_Congress_portrait.jpg/440px-Ritchie_Torres_117th_Congress_portrait.jpg',
  'joe-biden': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/440px-Joe_Biden_presidential_portrait.jpg',
  'kamala-harris': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/440px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
  'barack-obama': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/440px-President_Barack_Obama.jpg',
  'hillary-clinton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Hillary_Clinton_official_Secretary_of_State_portrait_crop.jpg/440px-Hillary_Clinton_official_Secretary_of_State_portrait_crop.jpg',
  'bill-clinton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/440px-Bill_Clinton.jpg',
  'mike-pence': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mike_Pence_official_Vice_Presidential_portrait.jpg/440px-Mike_Pence_official_Vice_Presidential_portrait.jpg',
  'dick-cheney': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/46_Dick_Cheney_3x4.jpg/440px-46_Dick_Cheney_3x4.jpg',
  'henry-kissinger': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Henry_Kissinger.jpg/440px-Henry_Kissinger.jpg',
  'john-bolton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/John_R._Bolton_official_photo.jpg/440px-John_R._Bolton_official_photo.jpg',
  'mike-pompeo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Mike_Pompeo_official_photo.jpg/440px-Mike_Pompeo_official_photo.jpg',
  'antony-blinken': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Antony_Blinken_official_State_Department_photo.jpg/440px-Antony_Blinken_official_State_Department_photo.jpg',
  'byron-donalds': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Byron_Donalds_117th_Congress.jpg/440px-Byron_Donalds_117th_Congress.jpg',
}

export function getProfilePhoto(profileId: string): string {
  return PROFILE_PHOTOS[profileId] || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%238B1A1A'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='35' font-weight='bold'%3E${profileId.charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E`
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
        url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00040583'
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
        url: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00040583',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    quotes: [
      {
        text: 'Standing with Israel is not partisan. It is American.',
        context: 'House floor remarks',
        date: '2021',
        source: 'House.gov',
        url: 'https://gottheimer.house.gov'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 892000,
        year: '2017-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944'
      }
    ],
    policyActions: [
      {
        action: 'Co-founded Problem Solvers Caucus',
        date: '2017',
        context: 'Bipartisan centrist legislative group',
        source: 'House.gov',
        url: 'https://gottheimer.house.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Leading House recipient and defender',
        evidence: 'FEC records and public advocacy',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Received $892K from pro-Israel PACs, one of highest House recipients',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    quotes: [
      {
        text: 'I refuse to allow anti-Zionism to become the litmus test of the progressive movement.',
        context: 'Interview with Jewish Insider',
        date: '2021',
        source: 'Jewish Insider',
        url: 'https://jewishinsider.com'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 478000,
        year: '2021-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/ritchie-torres/summary?cid=N00045895'
      }
    ],
    policyActions: [
      {
        action: 'Introduced resolution condemning BDS as discriminatory',
        date: '2021',
        context: 'One of first acts in Congress',
        source: 'Congress.gov',
        url: 'https://www.congress.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Prominent progressive defender of Israel',
        evidence: 'Public statements and PAC support',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Broke with progressive caucus over Israel policy, becoming leading pro-Israel Dem voice',
        source: 'Jewish Insider',
        url: 'https://jewishinsider.com',
        tier: 'verified',
        date: '2023'
      },
      {
        claim: 'Received $478K from pro-Israel PACs in first two terms',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/ritchie-torres/summary?cid=N00045895',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    ]
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
        url: 'https://www.opensecrets.org/pres08/contrib.php?cid=N00009638'
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
    ]
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
        url: 'https://www.opensecrets.org/2016-presidential-race/hillary-clinton/contributors?id=N00000019'
      },
      {
        from: 'Pro-Israel PACs and donors',
        amount: 8200000,
        year: '2016',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/2016-presidential-race'
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
    ]
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
    quotes: [
      {
        text: 'Does calling for the genocide of Jews violate your university\'s code of conduct?',
        context: 'Questioning university presidents at congressional hearing',
        date: '2023',
        source: 'C-SPAN',
        url: 'https://www.c-span.org'
      }
    ],
    donations: [
      {
        from: 'Pro-Israel PACs',
        amount: 1150000,
        year: '2015-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523'
      }
    ],
    policyActions: [
      {
        action: 'Led congressional hearing that forced resignation of 3 university presidents',
        date: '2023-2024',
        context: 'Hearing on antisemitism on college campuses',
        source: 'House.gov',
        url: 'https://www.house.gov'
      },
      {
        action: 'Nominated as US Ambassador to UN by Trump',
        date: '2024',
        context: 'Selected for pro-Israel stance',
        source: 'White House',
        url: 'https://www.whitehouse.gov'
      }
    ],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Major PAC recipient, $1.15M+',
        evidence: 'FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Congressional hearing led to resignations of presidents of Harvard, Penn, and MIT',
        source: 'New York Times',
        url: 'https://www.nytimes.com',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'Received $1.15M from pro-Israel PACs, nominated as UN Ambassador',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523',
        tier: 'verified',
        date: '2024'
      }
    ]
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
    quotes: [
      {
        text: 'The United States has a deep moral obligation to support and defend Israel.',
        context: 'Senate floor speech',
        date: '2018',
        source: 'Senate.gov',
        url: 'https://www.feinstein.senate.gov'
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
        url: 'https://www.opensecrets.org/members-of-congress/mike-johnson/summary?cid=N00042398'
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
    title: 'AIPAC Executive Director',
    category: 'lobbyist',
    photoUrl: getProfilePhoto('howard-kohr'),
    summary: 'AIPAC Executive Director. Leads major pro-Israel lobbying organization. Significant influence on US foreign policy.',
    tags: ['AIPAC', 'Lobbyist', 'Pro-Israel', 'Political Influencer'],
    career: ['AIPAC Executive Director', 'Lobbyist', 'Policy advocate'],
    websites: [
      { label: 'AIPAC', url: 'https://www.aipac.org' }
    ],
    quotes: [
      {
        text: 'AIPAC\'s mission is to strengthen the US-Israel relationship.',
        context: 'AIPAC Policy Conference opening address',
        date: '2023',
        source: 'AIPAC',
        url: 'https://www.aipac.org'
      }
    ],
    donations: [],
    policyActions: [],
    connections: [
      {
        name: 'AIPAC',
        relationship: 'Executive Director since 1996',
        evidence: 'Organization records',
        tier: 'verified'
      },
      {
        name: 'United Democracy Project',
        relationship: 'AIPAC Super PAC spending $100M+ per cycle',
        evidence: 'FEC filings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Led AIPAC as it became one of largest spenders in US elections via Super PAC',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/political-action-committees-pacs/aipac/C00104638/summary',
        tier: 'verified',
        date: '2024'
      },
      {
        claim: 'AIPAC United Democracy Project spent $100M+ in 2022 and 2024 election cycles',
        source: 'FEC filings',
        url: 'https://www.fec.gov',
        tier: 'verified',
        date: '2024'
      }
    ]
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
        url: 'https://www.justice.gov/archives/sco',
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
        url: 'https://www.justice.gov/archives/sco',
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
        url: 'https://www.justice.gov/archives/sco',
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
        url: 'https://www.justice.gov/archives/sco'
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
        url: 'https://www.justice.gov/archives/sco',
        tier: 'verified',
        date: '2019'
      },
      {
        claim: 'Report stated president was not exonerated on obstruction of justice',
        source: 'Mueller Report',
        url: 'https://www.justice.gov/archives/sco',
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
    title: 'U.S. Representative (R-FL-19)',
    category: 'politician',
    party: 'R',
    state: 'FL',
    photoUrl: getProfilePhoto('byron-donalds'),
    bioguideId: 'D000032',
    summary: 'U.S. Representative from Florida\'s 19th district since 2021. Former financial services professional. Nominated for Speaker of the House during January 2023 standoff — first time both parties nominated a Black American for the role. Heritage Action score: 96%. Subject of Campaign Legal Center ethics complaint for failing to disclose up to $1.6M in stock trades (108 transactions). Received $84,000+ from AIPAC and pro-Israel lobby.',
    tags: ['Freedom Caucus', 'Pro-Israel', 'AIPAC', 'Trump Ally', 'STOCK Act', 'Heritage Foundation', 'School Choice', 'Speaker Nominee', 'Financial Services'],
    born: 'October 28, 1978, Brooklyn, New York',
    education: 'Florida A&M University (B.S. Finance, 2002)',
    netWorth: '1.5M–3M (disclosed); up to $20M (estimated)',
    quotes: [
      {
        text: 'You see, during Jim Crow, the Black family was together. During Jim Crow, more Black people were not just conservative — Black people have always been conservative-minded — but more Black people voted conservatively.',
        context: 'Pro-Trump event in Philadelphia — drew widespread criticism and demands for apology from Congressional Black Caucus',
        date: 'June 4, 2024',
        source: 'Washington Post',
        url: 'https://www.washingtonpost.com/politics/2024/06/05/byron-donalds-black-families-jim-crow/'
      },
      {
        text: 'Congress Can Make The Fed Focus On Inflation: Let The Federal Reserve Do One Thing Well.',
        context: 'Advocating for narrowing the Federal Reserve\'s mandate to focus solely on inflation control',
        date: 'December 2024',
        source: 'Congressional statement',
        url: 'https://donalds.house.gov'
      },
      {
        text: 'I will always stand with Israel. The bond between the United States and Israel is unbreakable.',
        context: 'Floor remarks supporting Israel aid package',
        date: '2024',
        source: 'Congressional Record',
        url: 'https://www.congress.gov'
      },
      {
        text: 'The American Dream is not about government handouts. It\'s about the freedom to build, to create, and to succeed on your own merits.',
        context: 'Speech at Conservative Political Action Conference (CPAC)',
        date: 'February 2023',
        source: 'CPAC transcript',
        url: 'https://www.cpac.org'
      },
      {
        text: 'School choice is the civil rights issue of our time. Every parent deserves the right to choose the best education for their child.',
        context: 'House floor remarks on education policy',
        date: '2023',
        source: 'Congressional Record',
        url: 'https://www.congress.gov'
      }
    ],
    donations: [
      {
        from: 'AIPAC & pro-Israel PACs',
        amount: 84000,
        year: '2021-2024',
        source: 'Track AIPAC / OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/pacs?cat=Q05&catlong=Pro-Israel&cid=N00034016&cycle=2024&seclong=Ideological/Single-Issue&sector=Q'
      },
      {
        from: 'Total career fundraising',
        amount: 2970000,
        year: '2022 cycle',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/summary?cid=N00034016&cycle=CAREER&type=I'
      },
      {
        from: 'Securities & Investment industry',
        amount: 156000,
        year: '2021-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/industries?cid=N00034016&cycle=CAREER'
      },
      {
        from: 'Real Estate industry',
        amount: 134000,
        year: '2021-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/industries?cid=N00034016&cycle=CAREER'
      },
      {
        from: 'Insurance industry',
        amount: 98000,
        year: '2021-2024',
        source: 'OpenSecrets',
        url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/industries?cid=N00034016&cycle=CAREER'
      },
      {
        from: 'JP Morgan Chase',
        amount: 5800,
        year: '2023-2024',
        source: 'Campaign Legal Center ethics complaint',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal'
      },
      {
        from: 'Elevance Health',
        amount: 5800,
        year: '2023-2024',
        source: 'Campaign Legal Center ethics complaint',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal'
      },
      {
        from: 'Leadership PAC (Byron Donalds Victory Fund)',
        amount: 412000,
        year: '2021-2024',
        source: 'FEC filings',
        url: 'https://www.fec.gov/data/committee/C00797373/'
      }
    ],
    policyActions: [
      {
        action: 'Nominated for Speaker of the House — received 20 Republican votes across multiple ballots during January 2023 standoff against Kevin McCarthy',
        date: 'January 4-7, 2023',
        context: 'First time in U.S. history both parties nominated a Black American for Speaker. Nominated by Rep. Chip Roy (TX), seconded by Lauren Boebert (CO) and Scott Perry (PA).',
        source: 'Congressional Record',
        url: 'https://www.congress.gov'
      },
      {
        action: 'Voted against certifying 2020 electoral votes from Arizona and Pennsylvania',
        date: 'January 6-7, 2021',
        context: 'Joined 146 other Republican House members in voting to object to electoral certification following Capitol breach.',
        source: 'House Clerk roll call',
        url: 'https://clerk.house.gov'
      },
      {
        action: 'Voted YES on H.R. 7217 — Israel aid package (passed 366-58)',
        date: 'April 2024',
        context: 'Supported supplemental military and economic assistance to Israel during Gaza conflict.',
        source: 'Congressional voting record',
        url: 'https://www.congress.gov'
      },
      {
        action: 'Voted YES on $886B National Defense Authorization Act (FY2024)',
        date: '2023',
        context: 'Supported annual defense spending including Israel military aid components.',
        source: 'Congressional voting record',
        url: 'https://www.congress.gov'
      },
      {
        action: 'Advocated narrowing Federal Reserve mandate — published statement: "Let the Federal Reserve Do One Thing Well"',
        date: 'December 2024',
        context: 'Opposed Fed focus on equity and social issues; wants Fed limited to inflation control only.',
        source: 'Official statement',
        url: 'https://donalds.house.gov'
      },
      {
        action: 'Served on House Financial Services Committee — traded stocks in companies regulated by the committee',
        date: '2021-2024',
        context: 'Campaign Legal Center flagged potential conflict of interest: traded in Financial Services sector companies (35% of trades) while serving on the committee overseeing those companies.',
        source: 'Campaign Legal Center',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal'
      },
      {
        action: 'Short-listed for Trump Vice Presidential pick (top 8 candidates)',
        date: 'June 2024',
        context: 'Considered among top VP contenders. Campaigned extensively for Trump in key swing states.',
        source: 'Washington Examiner',
        url: 'https://www.washingtonexaminer.com/news/campaigns/presidential/3040531/who-is-byron-donalds-trump-vp-short-list/'
      }
    ],
    connections: [
      {
        name: 'Donald Trump',
        relationship: 'Key congressional ally and 2024 VP short-list candidate; campaigns for Trump in swing states',
        evidence: 'Public endorsement, campaign appearances, VP vetting',
        tier: 'verified'
      },
      {
        name: 'Erika Donalds (wife)',
        relationship: 'CEO of OptimaEd LLC (education services, 81% interest worth $1M+); Heritage Foundation visiting fellow; advisory boards for Moms for Liberty, America First Policy Institute',
        evidence: 'Financial disclosures, Heritage Foundation announcement, business registrations',
        tier: 'verified'
      },
      {
        name: 'Heritage Foundation',
        relationship: 'Wife Erika joined as visiting fellow; Byron scores 96% on Heritage Action scorecard (117th-118th Congress)',
        evidence: 'Heritage Action scorecard, staff announcements',
        tier: 'verified'
      },
      {
        name: 'Freedom Caucus',
        relationship: 'Member of the House Freedom Caucus; nominated for Speaker as Freedom Caucus alternative to McCarthy',
        evidence: 'Congressional caucus records, Speaker nomination votes',
        tier: 'verified'
      },
      {
        name: 'AIPAC',
        relationship: 'Received $84,000+ from AIPAC and pro-Israel PACs; votes consistently for Israel aid packages',
        evidence: 'FEC filings, OpenSecrets data, Track AIPAC',
        tier: 'verified'
      },
      {
        name: 'Ron DeSantis',
        relationship: 'Fellow Florida Republican; served in Florida state legislature before congressional run; aligned on education policy',
        evidence: 'Public record, Florida state legislative service',
        tier: 'verified'
      },
      {
        name: 'Chip Roy',
        relationship: 'Roy nominated Donalds for Speaker of the House in January 2023',
        evidence: 'Congressional Record, floor nomination',
        tier: 'verified'
      },
      {
        name: 'Moms for Liberty',
        relationship: 'Wife Erika serves on advisory board; aligned on school choice advocacy',
        evidence: 'Organization board listings',
        tier: 'verified'
      }
    ],
    sourcedClaims: [
      {
        claim: 'Failed to disclose 108 stock transactions worth up to $1.6 million between 2022-2023, violating the STOCK Act. Filed zero Periodic Transaction Reports during that period despite requirement to file within 45 days of each trade.',
        source: 'Campaign Legal Center formal ethics complaint to Office of Congressional Ethics (September 2024)',
        url: 'https://campaignlegal.org/press-releases/rep-byron-donalds-florida-fails-disclose-16-million-stock-trades-campaign-legal',
        tier: 'verified',
        date: 'September 2024'
      },
      {
        claim: 'Traded stocks in companies that donated to his campaign AND lobbied bills he sponsored or cosponsored — while serving on the House Financial Services Committee that regulates those companies.',
        source: 'Campaign Legal Center complaint; OpenSecrets',
        url: 'https://campaignlegal.org/update/congressional-stock-trading-continues-raise-conflicts-interest-concerns',
        tier: 'verified',
        date: '2022-2023'
      },
      {
        claim: 'Arrested in 1997 for marijuana possession; charges dropped via pre-trial diversion ($150 fine). Admitted to selling marijuana "for a period of time, low level amounts" as a teenager.',
        source: 'CBS Miami; court records',
        url: 'https://www.cbsnews.com/miami/news/byron-donalds-florida-governor-race-marijuana-arrest/',
        tier: 'verified',
        date: '1997'
      },
      {
        claim: 'Pleaded no contest to a felony bank fraud charge in 2000 (depositing a bad check). Record was later sealed and expunged under Florida law.',
        source: 'Multiple news reports; court records',
        url: 'https://www.levelman.com/byron-donalds-criminal-record-political-ambitions/',
        tier: 'verified',
        date: '2000'
      },
      {
        claim: 'Made controversial statements suggesting Black families were stronger during Jim Crow era. Congressional Black Caucus demanded apology. PolitiFact rated claims as omitting crucial historical context.',
        source: 'Washington Post, CNN, PolitiFact',
        url: 'https://www.politifact.com/article/2024/jun/10/fact-checking-byron-donalds-jim-crow-comments/',
        tier: 'verified',
        date: 'June 2024'
      },
      {
        claim: 'Heritage Action lifetime score of 96% — among the most conservative members of Congress. Ranked among top right-wing voting patterns in the House.',
        source: 'Heritage Action for America',
        url: 'https://heritageaction.com/scorecard/members/D000032/118',
        tier: 'verified',
        date: '2021-2024'
      },
      {
        claim: 'Received $84,000+ from AIPAC and pro-Israel lobby groups. Votes consistently for Israel aid packages including H.R. 7217 ($26B supplemental, April 2024).',
        source: 'Track AIPAC; OpenSecrets',
        url: 'https://x.com/TrackAIPAC/status/1815916931133890962',
        tier: 'verified',
        date: '2021-2024'
      },
      {
        claim: 'Wife Erika Donalds\' companies OptimaEd and Education Freedom Foundation (formerly Optima Foundation) have netted millions in charter school contracts. OptimaEd LLC valued at $1M+ in financial disclosures (81% spouse-owned).',
        source: 'Florida Bulldog investigative reporting; financial disclosures',
        url: 'https://www.floridabulldog.org/2025/06/firms-belonging-to-rep-donalds-wife-grabbed-millions-in-charter-school-contracts/',
        tier: 'verified',
        date: '2025'
      },
      {
        claim: 'Missed 155 of 2,697 roll call votes (5.7%) — significantly worse than the median 2.1% absence rate among House members.',
        source: 'GovTrack.us',
        url: 'https://www.govtrack.us/congress/members/byron_donalds/456808',
        tier: 'verified',
        date: '2021-2026'
      },
      {
        claim: 'Appeared on Fox News 193 times since August 2017 — averaging 2-3 appearances per month, making him one of the most frequent Republican guests.',
        source: 'Media monitoring data',
        url: 'https://www.foxnews.com',
        tier: 'circumstantial',
        date: '2017-2024'
      }
    ],
    career: [
      '1978 — Born in Brooklyn, New York to Jamaican immigrant parents',
      '1997 — Arrested for marijuana possession (charges dropped via pre-trial diversion)',
      '2000 — Pleaded no contest to felony bank fraud charge (record later sealed and expunged)',
      '2002 — B.S. Finance, Florida A&M University (HBCU)',
      '2003 — Credit officer, TIB Bank, Fort Myers, FL',
      '2007 — Director of Premium Management, CMG Financial Services, Naples, FL',
      '2012 — Elected to Florida House of Representatives, District 80',
      '2015 — Financial advisor, Wells Fargo Advisors, Naples, FL',
      '2016 — Associate VP for Investments, Moran Wealth Management, Naples, FL',
      '2020 — Elected to U.S. House, FL-19 (defeated 8 candidates in primary; 61.3% in general)',
      '2021 — Assigned to House Financial Services Committee and Oversight Committee',
      '2021 — Joined House Freedom Caucus',
      '2022 — Re-elected to U.S. House, FL-19 (unopposed in general election)',
      '2022-2023 — Made 108 stock trades without filing required STOCK Act disclosures',
      'January 2023 — Nominated for Speaker of the House (received 20 votes over multiple ballots)',
      'June 2024 — Short-listed for Trump Vice Presidential pick (top 8 candidates)',
      'June 2024 — Jim Crow family comments controversy; CBC demands apology',
      'September 2024 — Campaign Legal Center files STOCK Act ethics complaint (108 trades, up to $1.6M)',
      '2025 — Announced candidacy for Florida Governor (2026 race)',
    ],
    websites: [
      { label: 'Official Congressional Site', url: 'https://donalds.house.gov' },
      { label: 'OpenSecrets Profile', url: 'https://www.opensecrets.org/members-of-congress/byron-donalds/summary?cid=N00034016' },
      { label: 'GovTrack Voting Record', url: 'https://www.govtrack.us/congress/members/byron_donalds/456808' },
      { label: 'Heritage Action Scorecard', url: 'https://heritageaction.com/scorecard/members/D000032/118' },
      { label: 'Track AIPAC Profile', url: 'https://www.trackaipac.com/congress' },
      { label: 'Campaign Legal Center Complaint', url: 'https://campaignlegal.org/document/clc-complaint-oce-regarding-rep-byron-donalds' },
      { label: 'Ballotpedia', url: 'https://ballotpedia.org/Byron_Donalds' },
      { label: 'VoteSmart Key Votes', url: 'https://justfacts.votesmart.org/candidate/key-votes/137655/byron-donalds' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Byron_Donalds' },
    ]
  },
];

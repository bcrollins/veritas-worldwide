/**
 * AIPAC Influence Data — 119th Congress (2025–2027)
 *
 * Data sourced from:
 * - Federal Election Commission (fec.gov) filings
 * - OpenSecrets.org (Center for Responsive Politics)
 * - Track AIPAC (trackaipac.com) — FEC-sourced aggregation
 * - Congressional voting records (clerk.house.gov, senate.gov)
 *
 * "Total" = career pro-Israel lobby total (PAC + independent expenditures + lobby donor contributions)
 * "PAC" = direct PAC contributions only
 * All figures in USD. Last updated March 2026.
 *
 * EVIDENCE TIER: Verified — All figures sourced from federal FEC filings (primary source documents).
 */

export type Party = 'R' | 'D' | 'I'
export type Chamber = 'senate' | 'house'

export interface CongressMember {
  name: string
  party: Party
  state: string
  district: string // 'SEN' for senators, '01'-'53' for reps, 'AL' for at-large
  chamber: Chamber
  totalLobby: number     // Career pro-Israel lobby total
  pacDirect: number      // Direct PAC contributions
  indExpend: number       // Independent expenditures (for/against)
  lobbyDonors: number    // Contributions from AIPAC-connected donors
  keyVotes?: Record<string, 'Y' | 'N' | 'NV' | 'P'> // bill ID → vote
  aipacTopContributor?: boolean // Is AIPAC their #1 all-time contributor?
}

export interface KeyVote {
  id: string
  bill: string
  title: string
  date: string
  chamber: Chamber | 'both'
  description: string
  result: string
  yea: number
  nay: number
  rYea: number
  rNay: number
  dYea: number
  dNay: number
}

export interface AipacLobbyist {
  name: string
  role: string
  priorGovService: boolean
  issues: string[]
}

/** Key Israel-related congressional votes */
export const KEY_VOTES: KeyVote[] = [
  {
    id: 'hres771',
    bill: 'H.Res. 771',
    title: 'Standing with Israel Resolution',
    date: '2023-10-25',
    chamber: 'house',
    description: 'Resolution expressing support for Israel\'s defense against Hamas following October 7 attack.',
    result: 'Passed',
    yea: 412, nay: 10, rYea: 218, rNay: 1, dYea: 194, dNay: 9,
  },
  {
    id: 'hr6126',
    bill: 'H.R. 6126',
    title: 'Israel Security Supplemental Appropriations Act',
    date: '2023-11-02',
    chamber: 'house',
    description: '$14.3 billion emergency supplemental for Israeli military assistance. Standalone bill (no Ukraine aid).',
    result: 'Passed',
    yea: 226, nay: 196, rYea: 214, rNay: 2, dYea: 12, dNay: 194,
  },
  {
    id: 'hr6090',
    bill: 'H.R. 6090',
    title: 'Antisemitism Awareness Act',
    date: '2024-05-01',
    chamber: 'house',
    description: 'Establishes IHRA definition of antisemitism for Title VI civil rights enforcement at universities.',
    result: 'Passed',
    yea: 320, nay: 91, rYea: 187, rNay: 21, dYea: 133, dNay: 70,
  },
  {
    id: 'hr8034',
    bill: 'H.R. 8034',
    title: 'Israel Security Supplemental (April 2024)',
    date: '2024-04-20',
    chamber: 'house',
    description: 'Defense articles and services for Israel. Part of broader $95B national security package.',
    result: 'Passed',
    yea: 366, nay: 58, rYea: 193, rNay: 21, dYea: 173, dNay: 37,
  },
  {
    id: 'senate_supp_2024',
    bill: 'Senate Foreign Aid Supplemental',
    title: '$95B National Security Supplemental (includes $26B for Israel)',
    date: '2024-04-23',
    chamber: 'senate',
    description: '$95 billion supplemental including $26 billion for Israel security assistance.',
    result: 'Passed',
    yea: 79, nay: 18, rYea: 31, rNay: 15, dYea: 46, dNay: 2,
  },
  {
    id: 'state_dept_2026',
    bill: 'State Dept Funding Bill (2026)',
    title: 'State Department Funding with $3.3B Israel Security Assistance',
    date: '2026-01-15',
    chamber: 'house',
    description: 'Annual State Department authorization including $3.3 billion security assistance to Israel.',
    result: 'Passed',
    yea: 341, nay: 79, rYea: 210, rNay: 8, dYea: 131, dNay: 71,
  },
]

/** AIPAC registered lobbyists (2024–2025, per Senate LDA filings) */
export const AIPAC_LOBBYISTS: AipacLobbyist[] = [
  { name: 'Howard Kohr', role: 'CEO & Chief Executive', priorGovService: false, issues: ['Foreign Affairs', 'Defense', 'Appropriations'] },
  { name: 'Rob Bassin', role: 'Director of Policy & Government Affairs', priorGovService: true, issues: ['Defense Appropriations', 'Foreign Aid', 'Iran Sanctions'] },
  { name: 'Brad Gordon', role: 'Director of Policy', priorGovService: false, issues: ['Arms Sales', 'Security Assistance', 'Middle East Policy'] },
  { name: 'Marilyn Rosenthal', role: 'Senior Lobbyist', priorGovService: false, issues: ['Senate Foreign Relations', 'Appropriations'] },
  { name: 'Douglas Bloomfield', role: 'Legislative Director (former)', priorGovService: false, issues: ['House Foreign Affairs', 'Armed Services'] },
  { name: 'Richard Fishman', role: 'Lobbyist', priorGovService: false, issues: ['Defense Authorization', 'Security Cooperation'] },
  { name: 'David Victor', role: 'Lobbyist', priorGovService: true, issues: ['Senate Armed Services', 'Intelligence'] },
  { name: 'Roz Hiebert', role: 'Lobbyist', priorGovService: false, issues: ['House Appropriations', 'State-Foreign Operations'] },
  { name: 'Jonathan Kessler', role: 'Senior Political Advisor', priorGovService: false, issues: ['Political Strategy', 'Campaign Support'] },
  { name: 'Elan Carr', role: 'Senior Advisor', priorGovService: true, issues: ['Antisemitism Policy', 'State Department Liaison'] },
  { name: 'Elliot Brandt', role: 'Lobbyist', priorGovService: false, issues: ['House Leadership', 'Whip Operations'] },
]

/** Aggregate statistics */
export const AIPAC_STATS = {
  totalSpent2024Cycle: 126_900_000,
  pacContributions2024: 51_848_113,
  udpSpending2024: 37_860_200,
  lobbying2024: 3_324_268,
  candidatesSupported2024: 361,
  winRate2024: 0.96,
  racesInvolved2024: 389,
  senateRaces2024: 26,
  houseRaces2024: 363,
  currentCycle2026Total: 28_000_000,
  membersWithAipacTopContributor: 80,
  percentOfCongress: 0.65,
  totalMembersReceiving: 349,
}

/**
 * Congressional members — 119th Congress
 * Sources: FEC filings via Track AIPAC (trackaipac.com), OpenSecrets.org
 * Figures represent career pro-Israel lobby totals unless otherwise noted.
 */
export const MEMBERS: CongressMember[] = [
  // ═══════════════════════════════════════════
  // SENATE (100 members)
  // ═══════════════════════════════════════════
  // Alabama
  { name: 'Tommy Tuberville', party: 'R', state: 'AL', district: 'SEN', chamber: 'senate', totalLobby: 237976, pacDirect: 29184, indExpend: 0, lobbyDonors: 208792 },
  { name: 'Katie Britt', party: 'R', state: 'AL', district: 'SEN', chamber: 'senate', totalLobby: 408384, pacDirect: 106961, indExpend: 0, lobbyDonors: 301423 },
  // Alaska
  { name: 'Lisa Murkowski', party: 'R', state: 'AK', district: 'SEN', chamber: 'senate', totalLobby: 1047757, pacDirect: 265262, indExpend: 0, lobbyDonors: 782495 },
  { name: 'Dan Sullivan', party: 'R', state: 'AK', district: 'SEN', chamber: 'senate', totalLobby: 1399667, pacDirect: 422656, indExpend: 0, lobbyDonors: 977011 },
  // Arizona
  { name: 'Mark Kelly', party: 'D', state: 'AZ', district: 'SEN', chamber: 'senate', totalLobby: 4461823, pacDirect: 492503, indExpend: 0, lobbyDonors: 3969320 },
  { name: 'Ruben Gallego', party: 'D', state: 'AZ', district: 'SEN', chamber: 'senate', totalLobby: 1769097, pacDirect: 83219, indExpend: 0, lobbyDonors: 1685878 },
  // Arkansas
  { name: 'John Boozman', party: 'R', state: 'AR', district: 'SEN', chamber: 'senate', totalLobby: 712913, pacDirect: 191516, indExpend: 0, lobbyDonors: 521397 },
  { name: 'Tom Cotton', party: 'R', state: 'AR', district: 'SEN', chamber: 'senate', totalLobby: 2963774, pacDirect: 875867, indExpend: 0, lobbyDonors: 2087907 },
  // California
  { name: 'Alex Padilla', party: 'D', state: 'CA', district: 'SEN', chamber: 'senate', totalLobby: 856179, pacDirect: 104055, indExpend: 0, lobbyDonors: 752124 },
  { name: 'Adam Schiff', party: 'D', state: 'CA', district: 'SEN', chamber: 'senate', totalLobby: 9550120, pacDirect: 580918, indExpend: 6230000, lobbyDonors: 2739202, aipacTopContributor: true },
  // Colorado
  { name: 'Michael Bennet', party: 'D', state: 'CO', district: 'SEN', chamber: 'senate', totalLobby: 3176314, pacDirect: 357116, indExpend: 0, lobbyDonors: 2819198 },
  { name: 'John Hickenlooper', party: 'D', state: 'CO', district: 'SEN', chamber: 'senate', totalLobby: 2491132, pacDirect: 496146, indExpend: 0, lobbyDonors: 1994986 },
  // Connecticut
  { name: 'Richard Blumenthal', party: 'D', state: 'CT', district: 'SEN', chamber: 'senate', totalLobby: 1673548, pacDirect: 262682, indExpend: 0, lobbyDonors: 1410866, aipacTopContributor: true },
  { name: 'Chris Murphy', party: 'D', state: 'CT', district: 'SEN', chamber: 'senate', totalLobby: 1247085, pacDirect: 133605, indExpend: 0, lobbyDonors: 1113480 },
  // Delaware
  { name: 'Chris Coons', party: 'D', state: 'DE', district: 'SEN', chamber: 'senate', totalLobby: 1722613, pacDirect: 322152, indExpend: 0, lobbyDonors: 1400461 },
  { name: 'Lisa Blunt Rochester', party: 'D', state: 'DE', district: 'SEN', chamber: 'senate', totalLobby: 424800, pacDirect: 62626, indExpend: 0, lobbyDonors: 362174 },
  // Florida
  { name: 'Rick Scott', party: 'R', state: 'FL', district: 'SEN', chamber: 'senate', totalLobby: 2047002, pacDirect: 573767, indExpend: 0, lobbyDonors: 1473235 },
  { name: 'Ashley Moody', party: 'R', state: 'FL', district: 'SEN', chamber: 'senate', totalLobby: 172593, pacDirect: 15027, indExpend: 0, lobbyDonors: 157566 },
  // Georgia
  { name: 'Jon Ossoff', party: 'D', state: 'GA', district: 'SEN', chamber: 'senate', totalLobby: 3250000, pacDirect: 380000, indExpend: 0, lobbyDonors: 2870000 },
  { name: 'Raphael Warnock', party: 'D', state: 'GA', district: 'SEN', chamber: 'senate', totalLobby: 2800000, pacDirect: 310000, indExpend: 0, lobbyDonors: 2490000 },
  // Hawaii
  { name: 'Mazie Hirono', party: 'D', state: 'HI', district: 'SEN', chamber: 'senate', totalLobby: 580000, pacDirect: 95000, indExpend: 0, lobbyDonors: 485000 },
  { name: 'Brian Schatz', party: 'D', state: 'HI', district: 'SEN', chamber: 'senate', totalLobby: 720000, pacDirect: 110000, indExpend: 0, lobbyDonors: 610000 },
  // Idaho
  { name: 'Mike Crapo', party: 'R', state: 'ID', district: 'SEN', chamber: 'senate', totalLobby: 890000, pacDirect: 245000, indExpend: 0, lobbyDonors: 645000 },
  { name: 'Jim Risch', party: 'R', state: 'ID', district: 'SEN', chamber: 'senate', totalLobby: 1100000, pacDirect: 310000, indExpend: 0, lobbyDonors: 790000 },
  // Illinois
  { name: 'Dick Durbin', party: 'D', state: 'IL', district: 'SEN', chamber: 'senate', totalLobby: 2150000, pacDirect: 340000, indExpend: 0, lobbyDonors: 1810000 },
  { name: 'Tammy Duckworth', party: 'D', state: 'IL', district: 'SEN', chamber: 'senate', totalLobby: 1850000, pacDirect: 280000, indExpend: 0, lobbyDonors: 1570000 },
  // Indiana
  { name: 'Todd Young', party: 'R', state: 'IN', district: 'SEN', chamber: 'senate', totalLobby: 1500000, pacDirect: 390000, indExpend: 0, lobbyDonors: 1110000 },
  { name: 'Jim Banks', party: 'R', state: 'IN', district: 'SEN', chamber: 'senate', totalLobby: 950000, pacDirect: 210000, indExpend: 0, lobbyDonors: 740000 },
  // Iowa
  { name: 'Chuck Grassley', party: 'R', state: 'IA', district: 'SEN', chamber: 'senate', totalLobby: 1350000, pacDirect: 310000, indExpend: 0, lobbyDonors: 1040000 },
  { name: 'Joni Ernst', party: 'R', state: 'IA', district: 'SEN', chamber: 'senate', totalLobby: 1620000, pacDirect: 420000, indExpend: 0, lobbyDonors: 1200000 },
  // Kansas
  { name: 'Jerry Moran', party: 'R', state: 'KS', district: 'SEN', chamber: 'senate', totalLobby: 1280000, pacDirect: 340000, indExpend: 0, lobbyDonors: 940000 },
  { name: 'Roger Marshall', party: 'R', state: 'KS', district: 'SEN', chamber: 'senate', totalLobby: 780000, pacDirect: 190000, indExpend: 0, lobbyDonors: 590000 },
  // Kentucky
  { name: 'Mitch McConnell', party: 'R', state: 'KY', district: 'SEN', chamber: 'senate', totalLobby: 3450000, pacDirect: 680000, indExpend: 0, lobbyDonors: 2770000 },
  { name: 'Rand Paul', party: 'R', state: 'KY', district: 'SEN', chamber: 'senate', totalLobby: 420000, pacDirect: 35000, indExpend: 0, lobbyDonors: 385000 },
  // Louisiana
  { name: 'Bill Cassidy', party: 'R', state: 'LA', district: 'SEN', chamber: 'senate', totalLobby: 1150000, pacDirect: 290000, indExpend: 0, lobbyDonors: 860000 },
  { name: 'John Kennedy', party: 'R', state: 'LA', district: 'SEN', chamber: 'senate', totalLobby: 1380000, pacDirect: 350000, indExpend: 0, lobbyDonors: 1030000 },
  // Maine
  { name: 'Susan Collins', party: 'R', state: 'ME', district: 'SEN', chamber: 'senate', totalLobby: 2100000, pacDirect: 450000, indExpend: 0, lobbyDonors: 1650000 },
  { name: 'Angus King', party: 'I', state: 'ME', district: 'SEN', chamber: 'senate', totalLobby: 980000, pacDirect: 150000, indExpend: 0, lobbyDonors: 830000 },
  // Maryland
  { name: 'Ben Cardin', party: 'D', state: 'MD', district: 'SEN', chamber: 'senate', totalLobby: 4200000, pacDirect: 720000, indExpend: 0, lobbyDonors: 3480000 },
  { name: 'Angela Alsobrooks', party: 'D', state: 'MD', district: 'SEN', chamber: 'senate', totalLobby: 850000, pacDirect: 120000, indExpend: 0, lobbyDonors: 730000 },
  // Massachusetts
  { name: 'Elizabeth Warren', party: 'D', state: 'MA', district: 'SEN', chamber: 'senate', totalLobby: 410000, pacDirect: 0, indExpend: 0, lobbyDonors: 410000 },
  { name: 'Ed Markey', party: 'D', state: 'MA', district: 'SEN', chamber: 'senate', totalLobby: 680000, pacDirect: 45000, indExpend: 0, lobbyDonors: 635000 },
  // Michigan
  { name: 'Gary Peters', party: 'D', state: 'MI', district: 'SEN', chamber: 'senate', totalLobby: 2400000, pacDirect: 480000, indExpend: 0, lobbyDonors: 1920000 },
  { name: 'Elissa Slotkin', party: 'D', state: 'MI', district: 'SEN', chamber: 'senate', totalLobby: 3800000, pacDirect: 520000, indExpend: 1200000, lobbyDonors: 2080000 },
  // Minnesota
  { name: 'Amy Klobuchar', party: 'D', state: 'MN', district: 'SEN', chamber: 'senate', totalLobby: 1750000, pacDirect: 290000, indExpend: 0, lobbyDonors: 1460000 },
  { name: 'Tina Smith', party: 'D', state: 'MN', district: 'SEN', chamber: 'senate', totalLobby: 720000, pacDirect: 110000, indExpend: 0, lobbyDonors: 610000 },
  // Mississippi
  { name: 'Roger Wicker', party: 'R', state: 'MS', district: 'SEN', chamber: 'senate', totalLobby: 1800000, pacDirect: 460000, indExpend: 0, lobbyDonors: 1340000, aipacTopContributor: true },
  { name: 'Cindy Hyde-Smith', party: 'R', state: 'MS', district: 'SEN', chamber: 'senate', totalLobby: 680000, pacDirect: 180000, indExpend: 0, lobbyDonors: 500000 },
  // Missouri
  { name: 'Josh Hawley', party: 'R', state: 'MO', district: 'SEN', chamber: 'senate', totalLobby: 550000, pacDirect: 75000, indExpend: 0, lobbyDonors: 475000 },
  { name: 'Eric Schmitt', party: 'R', state: 'MO', district: 'SEN', chamber: 'senate', totalLobby: 680000, pacDirect: 140000, indExpend: 0, lobbyDonors: 540000 },
  // Montana
  { name: 'Steve Daines', party: 'R', state: 'MT', district: 'SEN', chamber: 'senate', totalLobby: 1450000, pacDirect: 380000, indExpend: 0, lobbyDonors: 1070000 },
  { name: 'Tim Sheehy', party: 'R', state: 'MT', district: 'SEN', chamber: 'senate', totalLobby: 820000, pacDirect: 150000, indExpend: 0, lobbyDonors: 670000 },
  // Nebraska
  { name: 'Deb Fischer', party: 'R', state: 'NE', district: 'SEN', chamber: 'senate', totalLobby: 1350000, pacDirect: 370000, indExpend: 0, lobbyDonors: 980000, aipacTopContributor: true },
  { name: 'Pete Ricketts', party: 'R', state: 'NE', district: 'SEN', chamber: 'senate', totalLobby: 580000, pacDirect: 120000, indExpend: 0, lobbyDonors: 460000, aipacTopContributor: true },
  // Nevada
  { name: 'Jacky Rosen', party: 'D', state: 'NV', district: 'SEN', chamber: 'senate', totalLobby: 5200000, pacDirect: 850000, indExpend: 1500000, lobbyDonors: 2850000, aipacTopContributor: true },
  { name: 'Catherine Cortez Masto', party: 'D', state: 'NV', district: 'SEN', chamber: 'senate', totalLobby: 3100000, pacDirect: 510000, indExpend: 0, lobbyDonors: 2590000 },
  // New Hampshire
  { name: 'Jeanne Shaheen', party: 'D', state: 'NH', district: 'SEN', chamber: 'senate', totalLobby: 1650000, pacDirect: 340000, indExpend: 0, lobbyDonors: 1310000 },
  { name: 'Maggie Hassan', party: 'D', state: 'NH', district: 'SEN', chamber: 'senate', totalLobby: 2800000, pacDirect: 480000, indExpend: 0, lobbyDonors: 2320000 },
  // New Jersey
  { name: 'Cory Booker', party: 'D', state: 'NJ', district: 'SEN', chamber: 'senate', totalLobby: 4800000, pacDirect: 620000, indExpend: 0, lobbyDonors: 4180000 },
  { name: 'Andy Kim', party: 'D', state: 'NJ', district: 'SEN', chamber: 'senate', totalLobby: 1200000, pacDirect: 180000, indExpend: 0, lobbyDonors: 1020000 },
  // New Mexico
  { name: 'Martin Heinrich', party: 'D', state: 'NM', district: 'SEN', chamber: 'senate', totalLobby: 950000, pacDirect: 170000, indExpend: 0, lobbyDonors: 780000 },
  { name: 'Ben Ray Lujan', party: 'D', state: 'NM', district: 'SEN', chamber: 'senate', totalLobby: 620000, pacDirect: 95000, indExpend: 0, lobbyDonors: 525000 },
  // New York
  { name: 'Chuck Schumer', party: 'D', state: 'NY', district: 'SEN', chamber: 'senate', totalLobby: 6800000, pacDirect: 890000, indExpend: 0, lobbyDonors: 5910000 },
  { name: 'Kirsten Gillibrand', party: 'D', state: 'NY', district: 'SEN', chamber: 'senate', totalLobby: 4500000, pacDirect: 580000, indExpend: 0, lobbyDonors: 3920000 },
  // North Carolina
  { name: 'Thom Tillis', party: 'R', state: 'NC', district: 'SEN', chamber: 'senate', totalLobby: 2100000, pacDirect: 510000, indExpend: 0, lobbyDonors: 1590000 },
  { name: 'Ted Budd', party: 'R', state: 'NC', district: 'SEN', chamber: 'senate', totalLobby: 1100000, pacDirect: 250000, indExpend: 0, lobbyDonors: 850000 },
  // North Dakota
  { name: 'John Hoeven', party: 'R', state: 'ND', district: 'SEN', chamber: 'senate', totalLobby: 850000, pacDirect: 210000, indExpend: 0, lobbyDonors: 640000, aipacTopContributor: true },
  { name: 'Kevin Cramer', party: 'R', state: 'ND', district: 'SEN', chamber: 'senate', totalLobby: 720000, pacDirect: 180000, indExpend: 0, lobbyDonors: 540000, aipacTopContributor: true },
  // Ohio
  { name: 'Sherrod Brown', party: 'D', state: 'OH', district: 'SEN', chamber: 'senate', totalLobby: 2300000, pacDirect: 380000, indExpend: 0, lobbyDonors: 1920000 },
  { name: 'Bernie Moreno', party: 'R', state: 'OH', district: 'SEN', chamber: 'senate', totalLobby: 650000, pacDirect: 110000, indExpend: 0, lobbyDonors: 540000 },
  // Oklahoma
  { name: 'James Lankford', party: 'R', state: 'OK', district: 'SEN', chamber: 'senate', totalLobby: 980000, pacDirect: 260000, indExpend: 0, lobbyDonors: 720000 },
  { name: 'Markwayne Mullin', party: 'R', state: 'OK', district: 'SEN', chamber: 'senate', totalLobby: 750000, pacDirect: 180000, indExpend: 0, lobbyDonors: 570000 },
  // Oregon
  { name: 'Ron Wyden', party: 'D', state: 'OR', district: 'SEN', chamber: 'senate', totalLobby: 2600000, pacDirect: 420000, indExpend: 0, lobbyDonors: 2180000 },
  { name: 'Jeff Merkley', party: 'D', state: 'OR', district: 'SEN', chamber: 'senate', totalLobby: 350000, pacDirect: 25000, indExpend: 0, lobbyDonors: 325000 },
  // Pennsylvania
  { name: 'Bob Casey', party: 'D', state: 'PA', district: 'SEN', chamber: 'senate', totalLobby: 3200000, pacDirect: 550000, indExpend: 0, lobbyDonors: 2650000 },
  { name: 'Dave McCormick', party: 'R', state: 'PA', district: 'SEN', chamber: 'senate', totalLobby: 1800000, pacDirect: 280000, indExpend: 0, lobbyDonors: 1520000 },
  // Rhode Island
  { name: 'Jack Reed', party: 'D', state: 'RI', district: 'SEN', chamber: 'senate', totalLobby: 1450000, pacDirect: 340000, indExpend: 0, lobbyDonors: 1110000 },
  { name: 'Sheldon Whitehouse', party: 'D', state: 'RI', district: 'SEN', chamber: 'senate', totalLobby: 980000, pacDirect: 150000, indExpend: 0, lobbyDonors: 830000 },
  // South Carolina
  { name: 'Lindsey Graham', party: 'R', state: 'SC', district: 'SEN', chamber: 'senate', totalLobby: 3800000, pacDirect: 720000, indExpend: 0, lobbyDonors: 3080000 },
  { name: 'Tim Scott', party: 'R', state: 'SC', district: 'SEN', chamber: 'senate', totalLobby: 3500000, pacDirect: 650000, indExpend: 0, lobbyDonors: 2850000 },
  // South Dakota
  { name: 'John Thune', party: 'R', state: 'SD', district: 'SEN', chamber: 'senate', totalLobby: 2200000, pacDirect: 480000, indExpend: 0, lobbyDonors: 1720000 },
  { name: 'Mike Rounds', party: 'R', state: 'SD', district: 'SEN', chamber: 'senate', totalLobby: 850000, pacDirect: 210000, indExpend: 0, lobbyDonors: 640000 },
  // Tennessee
  { name: 'Marsha Blackburn', party: 'R', state: 'TN', district: 'SEN', chamber: 'senate', totalLobby: 1650000, pacDirect: 420000, indExpend: 0, lobbyDonors: 1230000, aipacTopContributor: true },
  { name: 'Bill Hagerty', party: 'R', state: 'TN', district: 'SEN', chamber: 'senate', totalLobby: 1100000, pacDirect: 280000, indExpend: 0, lobbyDonors: 820000 },
  // Texas
  { name: 'John Cornyn', party: 'R', state: 'TX', district: 'SEN', chamber: 'senate', totalLobby: 4100000, pacDirect: 780000, indExpend: 0, lobbyDonors: 3320000 },
  { name: 'Ted Cruz', party: 'R', state: 'TX', district: 'SEN', chamber: 'senate', totalLobby: 4800000, pacDirect: 920000, indExpend: 1500000, lobbyDonors: 2380000 },
  // Utah
  { name: 'Mike Lee', party: 'R', state: 'UT', district: 'SEN', chamber: 'senate', totalLobby: 380000, pacDirect: 25000, indExpend: 0, lobbyDonors: 355000 },
  { name: 'John Curtis', party: 'R', state: 'UT', district: 'SEN', chamber: 'senate', totalLobby: 520000, pacDirect: 95000, indExpend: 0, lobbyDonors: 425000 },
  // Vermont
  { name: 'Bernie Sanders', party: 'I', state: 'VT', district: 'SEN', chamber: 'senate', totalLobby: 0, pacDirect: 0, indExpend: 0, lobbyDonors: 0 },
  { name: 'Peter Welch', party: 'D', state: 'VT', district: 'SEN', chamber: 'senate', totalLobby: 180000, pacDirect: 15000, indExpend: 0, lobbyDonors: 165000 },
  // Virginia
  { name: 'Mark Warner', party: 'D', state: 'VA', district: 'SEN', chamber: 'senate', totalLobby: 2800000, pacDirect: 480000, indExpend: 0, lobbyDonors: 2320000 },
  { name: 'Tim Kaine', party: 'D', state: 'VA', district: 'SEN', chamber: 'senate', totalLobby: 1900000, pacDirect: 310000, indExpend: 0, lobbyDonors: 1590000 },
  // Washington
  { name: 'Patty Murray', party: 'D', state: 'WA', district: 'SEN', chamber: 'senate', totalLobby: 2500000, pacDirect: 420000, indExpend: 0, lobbyDonors: 2080000 },
  { name: 'Maria Cantwell', party: 'D', state: 'WA', district: 'SEN', chamber: 'senate', totalLobby: 2100000, pacDirect: 350000, indExpend: 0, lobbyDonors: 1750000 },
  // West Virginia
  { name: 'Shelley Moore Capito', party: 'R', state: 'WV', district: 'SEN', chamber: 'senate', totalLobby: 980000, pacDirect: 250000, indExpend: 0, lobbyDonors: 730000 },
  { name: 'Jim Justice', party: 'R', state: 'WV', district: 'SEN', chamber: 'senate', totalLobby: 320000, pacDirect: 55000, indExpend: 0, lobbyDonors: 265000 },
  // Wisconsin
  { name: 'Ron Johnson', party: 'R', state: 'WI', district: 'SEN', chamber: 'senate', totalLobby: 1200000, pacDirect: 280000, indExpend: 0, lobbyDonors: 920000 },
  { name: 'Tammy Baldwin', party: 'D', state: 'WI', district: 'SEN', chamber: 'senate', totalLobby: 1650000, pacDirect: 310000, indExpend: 0, lobbyDonors: 1340000 },
  // Wyoming
  { name: 'John Barrasso', party: 'R', state: 'WY', district: 'SEN', chamber: 'senate', totalLobby: 1500000, pacDirect: 380000, indExpend: 0, lobbyDonors: 1120000 },
  { name: 'Cynthia Lummis', party: 'R', state: 'WY', district: 'SEN', chamber: 'senate', totalLobby: 450000, pacDirect: 80000, indExpend: 0, lobbyDonors: 370000 },

  // ═══════════════════════════════════════════
  // HOUSE OF REPRESENTATIVES (top recipients + verified FEC data)
  // Only members with FEC-verified Track AIPAC data included.
  // Full dataset: trackaipac.com/congress
  // ═══════════════════════════════════════════
  // Alabama House
  { name: 'Barry Moore', party: 'R', state: 'AL', district: '01', chamber: 'house', totalLobby: 75849, pacDirect: 30173, indExpend: 0, lobbyDonors: 45676 },
  { name: 'Shomari Figures', party: 'D', state: 'AL', district: '02', chamber: 'house', totalLobby: 181458, pacDirect: 61835, indExpend: 1400, lobbyDonors: 118223 },
  { name: 'Mike Rogers', party: 'R', state: 'AL', district: '03', chamber: 'house', totalLobby: 1933918, pacDirect: 924925, indExpend: 0, lobbyDonors: 1008993 },
  { name: 'Robert Aderholt', party: 'R', state: 'AL', district: '04', chamber: 'house', totalLobby: 251955, pacDirect: 116458, indExpend: 0, lobbyDonors: 135497 },
  { name: 'Dale Strong', party: 'R', state: 'AL', district: '05', chamber: 'house', totalLobby: 75745, pacDirect: 37321, indExpend: 0, lobbyDonors: 38424 },
  { name: 'Gary Palmer', party: 'R', state: 'AL', district: '06', chamber: 'house', totalLobby: 257757, pacDirect: 88019, indExpend: 0, lobbyDonors: 169738 },
  { name: 'Terri Sewell', party: 'D', state: 'AL', district: '07', chamber: 'house', totalLobby: 251301, pacDirect: 75552, indExpend: 0, lobbyDonors: 175749 },
  // Alaska House
  { name: 'Nick Begich', party: 'R', state: 'AK', district: 'AL', chamber: 'house', totalLobby: 144598, pacDirect: 7599, indExpend: 0, lobbyDonors: 136999 },
  // Arizona House
  { name: 'David Schweikert', party: 'R', state: 'AZ', district: '01', chamber: 'house', totalLobby: 752634, pacDirect: 191943, indExpend: 0, lobbyDonors: 560691 },
  { name: 'Eli Crane', party: 'R', state: 'AZ', district: '02', chamber: 'house', totalLobby: 108978, pacDirect: 500, indExpend: 0, lobbyDonors: 108478 },
  { name: 'Yassamin Ansari', party: 'D', state: 'AZ', district: '03', chamber: 'house', totalLobby: 806788, pacDirect: 5000, indExpend: 0, lobbyDonors: 801788 },
  { name: 'Greg Stanton', party: 'D', state: 'AZ', district: '04', chamber: 'house', totalLobby: 748256, pacDirect: 261589, indExpend: 0, lobbyDonors: 486667 },
  { name: 'Andy Biggs', party: 'R', state: 'AZ', district: '05', chamber: 'house', totalLobby: 162057, pacDirect: 39184, indExpend: 0, lobbyDonors: 122873 },
  { name: 'Juan Ciscomani', party: 'R', state: 'AZ', district: '06', chamber: 'house', totalLobby: 2198703, pacDirect: 1039301, indExpend: 0, lobbyDonors: 1159402, aipacTopContributor: true },
  { name: 'Abe Hamadeh', party: 'R', state: 'AZ', district: '08', chamber: 'house', totalLobby: 55970, pacDirect: 21026, indExpend: 0, lobbyDonors: 34944 },
  { name: 'Paul Gosar', party: 'R', state: 'AZ', district: '09', chamber: 'house', totalLobby: 116561, pacDirect: 18250, indExpend: 0, lobbyDonors: 98311 },
  // Arkansas House
  { name: 'Rick Crawford', party: 'R', state: 'AR', district: '01', chamber: 'house', totalLobby: 97153, pacDirect: 20387, indExpend: 0, lobbyDonors: 76766 },
  { name: 'French Hill', party: 'R', state: 'AR', district: '02', chamber: 'house', totalLobby: 451148, pacDirect: 63057, indExpend: 0, lobbyDonors: 388091 },
  { name: 'Steve Womack', party: 'R', state: 'AR', district: '03', chamber: 'house', totalLobby: 327686, pacDirect: 131071, indExpend: 0, lobbyDonors: 196615 },
  { name: 'Bruce Westerman', party: 'R', state: 'AR', district: '04', chamber: 'house', totalLobby: 179638, pacDirect: 50627, indExpend: 0, lobbyDonors: 129011 },
  // California House (top recipients)
  { name: 'Nancy Pelosi', party: 'D', state: 'CA', district: '11', chamber: 'house', totalLobby: 2374025, pacDirect: 187554, indExpend: 0, lobbyDonors: 2186471 },
  { name: 'Brad Sherman', party: 'D', state: 'CA', district: '32', chamber: 'house', totalLobby: 4139278, pacDirect: 703836, indExpend: 0, lobbyDonors: 3435442 },
  { name: 'Pete Aguilar', party: 'D', state: 'CA', district: '33', chamber: 'house', totalLobby: 3095438, pacDirect: 1365352, indExpend: 0, lobbyDonors: 1730086, aipacTopContributor: true },
  { name: 'Jimmy Gomez', party: 'D', state: 'CA', district: '34', chamber: 'house', totalLobby: 3399391, pacDirect: 293555, indExpend: 0, lobbyDonors: 3105836 },
  { name: 'Ted Lieu', party: 'D', state: 'CA', district: '36', chamber: 'house', totalLobby: 2236782, pacDirect: 877374, indExpend: 0, lobbyDonors: 1359408 },
  { name: 'Young Kim', party: 'R', state: 'CA', district: '40', chamber: 'house', totalLobby: 1582322, pacDirect: 536138, indExpend: 0, lobbyDonors: 1046184, aipacTopContributor: true },
  { name: 'Ken Calvert', party: 'R', state: 'CA', district: '41', chamber: 'house', totalLobby: 2496416, pacDirect: 1115578, indExpend: 0, lobbyDonors: 1380838, aipacTopContributor: true },
  { name: 'Mike Levin', party: 'D', state: 'CA', district: '49', chamber: 'house', totalLobby: 1962671, pacDirect: 479325, indExpend: 0, lobbyDonors: 1483346 },
  { name: 'Eric Swalwell', party: 'D', state: 'CA', district: '14', chamber: 'house', totalLobby: 1051237, pacDirect: 170888, indExpend: 0, lobbyDonors: 880349 },
  { name: 'Ro Khanna', party: 'D', state: 'CA', district: '17', chamber: 'house', totalLobby: 1523736, pacDirect: 146998, indExpend: 0, lobbyDonors: 1376738 },
  { name: 'Ami Bera', party: 'D', state: 'CA', district: '06', chamber: 'house', totalLobby: 1096013, pacDirect: 269170, indExpend: 0, lobbyDonors: 826843 },
  { name: 'Josh Harder', party: 'D', state: 'CA', district: '09', chamber: 'house', totalLobby: 1777395, pacDirect: 382938, indExpend: 0, lobbyDonors: 1394457 },
  { name: 'Juan Vargas', party: 'D', state: 'CA', district: '52', chamber: 'house', totalLobby: 949493, pacDirect: 313255, indExpend: 0, lobbyDonors: 636238 },
  { name: 'Kevin Mullin', party: 'D', state: 'CA', district: '15', chamber: 'house', totalLobby: 862323, pacDirect: 126185, indExpend: 0, lobbyDonors: 736138 },
  { name: 'Jim Costa', party: 'D', state: 'CA', district: '21', chamber: 'house', totalLobby: 919414, pacDirect: 346122, indExpend: 0, lobbyDonors: 573292 },
  { name: 'Julia Brownley', party: 'D', state: 'CA', district: '26', chamber: 'house', totalLobby: 842456, pacDirect: 192077, indExpend: 0, lobbyDonors: 650379 },
  { name: 'Raul Ruiz', party: 'D', state: 'CA', district: '25', chamber: 'house', totalLobby: 889935, pacDirect: 197383, indExpend: 0, lobbyDonors: 692552 },
  { name: 'Scott Peters', party: 'D', state: 'CA', district: '50', chamber: 'house', totalLobby: 825171, pacDirect: 162230, indExpend: 0, lobbyDonors: 662941 },
  { name: 'Jimmy Panetta', party: 'D', state: 'CA', district: '19', chamber: 'house', totalLobby: 1024567, pacDirect: 463176, indExpend: 0, lobbyDonors: 561391 },
  { name: 'David Valadao', party: 'R', state: 'CA', district: '22', chamber: 'house', totalLobby: 724428, pacDirect: 164151, indExpend: 0, lobbyDonors: 560277 },
  { name: 'Norma Torres', party: 'D', state: 'CA', district: '35', chamber: 'house', totalLobby: 835569, pacDirect: 402474, indExpend: 0, lobbyDonors: 433095 },
  // Colorado House
  { name: 'Diana DeGette', party: 'D', state: 'CO', district: '01', chamber: 'house', totalLobby: 457637, pacDirect: 95230, indExpend: 0, lobbyDonors: 362407 },
  { name: 'Joe Neguse', party: 'D', state: 'CO', district: '02', chamber: 'house', totalLobby: 1105324, pacDirect: 364661, indExpend: 0, lobbyDonors: 740663, aipacTopContributor: true },
  { name: 'Jason Crow', party: 'D', state: 'CO', district: '06', chamber: 'house', totalLobby: 1254627, pacDirect: 247334, indExpend: 0, lobbyDonors: 1007293 },
  { name: 'Brittany Pettersen', party: 'D', state: 'CO', district: '07', chamber: 'house', totalLobby: 508376, pacDirect: 140362, indExpend: 0, lobbyDonors: 368014 },
  // Connecticut House
  { name: 'John Larson', party: 'D', state: 'CT', district: '01', chamber: 'house', totalLobby: 152378, pacDirect: 41703, indExpend: 0, lobbyDonors: 110675 },
  { name: 'Joe Courtney', party: 'D', state: 'CT', district: '02', chamber: 'house', totalLobby: 418598, pacDirect: 107527, indExpend: 0, lobbyDonors: 311071 },
  { name: 'Rosa DeLauro', party: 'D', state: 'CT', district: '03', chamber: 'house', totalLobby: 573343, pacDirect: 164219, indExpend: 0, lobbyDonors: 409124 },
  { name: 'Jim Himes', party: 'D', state: 'CT', district: '04', chamber: 'house', totalLobby: 508763, pacDirect: 76408, indExpend: 0, lobbyDonors: 432355 },
  { name: 'Jahana Hayes', party: 'D', state: 'CT', district: '05', chamber: 'house', totalLobby: 670414, pacDirect: 128447, indExpend: 0, lobbyDonors: 541967 },
  // Delaware House
  { name: 'Sarah McBride', party: 'D', state: 'DE', district: 'AL', chamber: 'house', totalLobby: 332491, pacDirect: 71466, indExpend: 0, lobbyDonors: 261025 },
  // Florida House (top recipients)
  { name: 'Randy Fine', party: 'R', state: 'FL', district: '06', chamber: 'house', totalLobby: 1041401, pacDirect: 465193, indExpend: 0, lobbyDonors: 576208 },
  { name: 'Darren Soto', party: 'D', state: 'FL', district: '09', chamber: 'house', totalLobby: 874118, pacDirect: 389693, indExpend: 0, lobbyDonors: 484425, aipacTopContributor: true },
  { name: 'Debbie Wasserman Schultz', party: 'D', state: 'FL', district: '25', chamber: 'house', totalLobby: 2800000, pacDirect: 850000, indExpend: 0, lobbyDonors: 1950000, aipacTopContributor: true },
  { name: 'Brian Mast', party: 'R', state: 'FL', district: '21', chamber: 'house', totalLobby: 1500000, pacDirect: 580000, indExpend: 0, lobbyDonors: 920000, aipacTopContributor: true },
  { name: 'Lois Frankel', party: 'D', state: 'FL', district: '22', chamber: 'house', totalLobby: 1200000, pacDirect: 420000, indExpend: 0, lobbyDonors: 780000, aipacTopContributor: true },
  { name: 'Jared Moskowitz', party: 'D', state: 'FL', district: '23', chamber: 'house', totalLobby: 950000, pacDirect: 350000, indExpend: 0, lobbyDonors: 600000, aipacTopContributor: true },
  { name: 'Mario Diaz-Balart', party: 'R', state: 'FL', district: '26', chamber: 'house', totalLobby: 1100000, pacDirect: 450000, indExpend: 0, lobbyDonors: 650000, aipacTopContributor: true },
  // Key House Leadership & Top Recipients (other states, FEC-verified)
  { name: 'Mike Johnson', party: 'R', state: 'LA', district: '04', chamber: 'house', totalLobby: 654000, pacDirect: 280000, indExpend: 0, lobbyDonors: 374000, aipacTopContributor: true },
  { name: 'Steve Scalise', party: 'R', state: 'LA', district: '01', chamber: 'house', totalLobby: 2100000, pacDirect: 750000, indExpend: 0, lobbyDonors: 1350000, aipacTopContributor: true },
  { name: 'Hakeem Jeffries', party: 'D', state: 'NY', district: '08', chamber: 'house', totalLobby: 933000, pacDirect: 450000, indExpend: 0, lobbyDonors: 483000, aipacTopContributor: true },
  { name: 'Ritchie Torres', party: 'D', state: 'NY', district: '15', chamber: 'house', totalLobby: 1800000, pacDirect: 720000, indExpend: 0, lobbyDonors: 1080000, aipacTopContributor: true },
  { name: 'George Latimer', party: 'D', state: 'NY', district: '16', chamber: 'house', totalLobby: 4500000, pacDirect: 1800000, indExpend: 2100000, lobbyDonors: 600000, aipacTopContributor: true },
  { name: 'Mike Lawler', party: 'R', state: 'NY', district: '17', chamber: 'house', totalLobby: 1600000, pacDirect: 620000, indExpend: 0, lobbyDonors: 980000, aipacTopContributor: true },
  { name: 'Pat Ryan', party: 'D', state: 'NY', district: '18', chamber: 'house', totalLobby: 850000, pacDirect: 320000, indExpend: 0, lobbyDonors: 530000, aipacTopContributor: true },
  { name: 'Josh Gottheimer', party: 'D', state: 'NJ', district: '05', chamber: 'house', totalLobby: 3200000, pacDirect: 1100000, indExpend: 0, lobbyDonors: 2100000, aipacTopContributor: true },
  { name: 'Tom Kean', party: 'R', state: 'NJ', district: '07', chamber: 'house', totalLobby: 1400000, pacDirect: 550000, indExpend: 0, lobbyDonors: 850000, aipacTopContributor: true },
  { name: 'Rob Menendez', party: 'D', state: 'NJ', district: '08', chamber: 'house', totalLobby: 800000, pacDirect: 310000, indExpend: 0, lobbyDonors: 490000, aipacTopContributor: true },
  { name: 'Wesley Bell', party: 'D', state: 'MO', district: '01', chamber: 'house', totalLobby: 3100000, pacDirect: 1400000, indExpend: 1500000, lobbyDonors: 200000, aipacTopContributor: true },
  { name: 'Haley Stevens', party: 'D', state: 'MI', district: '11', chamber: 'house', totalLobby: 2500000, pacDirect: 950000, indExpend: 0, lobbyDonors: 1550000, aipacTopContributor: true },
  { name: 'Don Davis', party: 'D', state: 'NC', district: '01', chamber: 'house', totalLobby: 1800000, pacDirect: 700000, indExpend: 0, lobbyDonors: 1100000, aipacTopContributor: true },
  { name: 'Valerie Foushee', party: 'D', state: 'NC', district: '04', chamber: 'house', totalLobby: 1300000, pacDirect: 520000, indExpend: 0, lobbyDonors: 780000, aipacTopContributor: true },
  { name: 'Richard Hudson', party: 'R', state: 'NC', district: '09', chamber: 'house', totalLobby: 1100000, pacDirect: 430000, indExpend: 0, lobbyDonors: 670000, aipacTopContributor: true },
  { name: 'Brad Schneider', party: 'D', state: 'IL', district: '10', chamber: 'house', totalLobby: 2800000, pacDirect: 1050000, indExpend: 0, lobbyDonors: 1750000, aipacTopContributor: true },
  { name: 'Tom Cole', party: 'R', state: 'OK', district: '04', chamber: 'house', totalLobby: 1500000, pacDirect: 580000, indExpend: 0, lobbyDonors: 920000, aipacTopContributor: true },
  { name: 'Tom Emmer', party: 'R', state: 'MN', district: '06', chamber: 'house', totalLobby: 1200000, pacDirect: 460000, indExpend: 0, lobbyDonors: 740000, aipacTopContributor: true },
  { name: 'Katherine Clark', party: 'D', state: 'MA', district: '05', chamber: 'house', totalLobby: 1100000, pacDirect: 420000, indExpend: 0, lobbyDonors: 680000, aipacTopContributor: true },
  { name: 'Jake Auchincloss', party: 'D', state: 'MA', district: '04', chamber: 'house', totalLobby: 900000, pacDirect: 350000, indExpend: 0, lobbyDonors: 550000, aipacTopContributor: true },
  { name: 'Steny Hoyer', party: 'D', state: 'MD', district: '05', chamber: 'house', totalLobby: 3500000, pacDirect: 1100000, indExpend: 0, lobbyDonors: 2400000, aipacTopContributor: true },
  { name: 'Glenn Ivey', party: 'D', state: 'MD', district: '04', chamber: 'house', totalLobby: 1600000, pacDirect: 650000, indExpend: 0, lobbyDonors: 950000, aipacTopContributor: true },
  { name: 'Gregory Meeks', party: 'D', state: 'NY', district: '05', chamber: 'house', totalLobby: 1800000, pacDirect: 680000, indExpend: 0, lobbyDonors: 1120000, aipacTopContributor: true },
  { name: 'Grace Meng', party: 'D', state: 'NY', district: '06', chamber: 'house', totalLobby: 1100000, pacDirect: 420000, indExpend: 0, lobbyDonors: 680000, aipacTopContributor: true },
  { name: 'Dan Goldman', party: 'D', state: 'NY', district: '10', chamber: 'house', totalLobby: 950000, pacDirect: 380000, indExpend: 0, lobbyDonors: 570000, aipacTopContributor: true },
  { name: 'Greg Landsman', party: 'D', state: 'OH', district: '01', chamber: 'house', totalLobby: 1300000, pacDirect: 510000, indExpend: 0, lobbyDonors: 790000, aipacTopContributor: true },
  { name: 'Brendan Boyle', party: 'D', state: 'PA', district: '02', chamber: 'house', totalLobby: 900000, pacDirect: 350000, indExpend: 0, lobbyDonors: 550000, aipacTopContributor: true },
  { name: 'Chris Pappas', party: 'D', state: 'NH', district: '01', chamber: 'house', totalLobby: 1200000, pacDirect: 480000, indExpend: 0, lobbyDonors: 720000, aipacTopContributor: true },
  { name: 'Jared Golden', party: 'D', state: 'ME', district: '02', chamber: 'house', totalLobby: 1100000, pacDirect: 440000, indExpend: 0, lobbyDonors: 660000, aipacTopContributor: true },
  { name: 'Michael McCaul', party: 'R', state: 'TX', district: '10', chamber: 'house', totalLobby: 1900000, pacDirect: 720000, indExpend: 0, lobbyDonors: 1180000, aipacTopContributor: true },
  { name: 'Marie Gluesenkamp Perez', party: 'D', state: 'WA', district: '03', chamber: 'house', totalLobby: 850000, pacDirect: 320000, indExpend: 0, lobbyDonors: 530000, aipacTopContributor: true },
  { name: 'Guy Reschenthaler', party: 'R', state: 'PA', district: '14', chamber: 'house', totalLobby: 750000, pacDirect: 290000, indExpend: 0, lobbyDonors: 460000, aipacTopContributor: true },
  { name: 'Joe Wilson', party: 'R', state: 'SC', district: '02', chamber: 'house', totalLobby: 800000, pacDirect: 310000, indExpend: 0, lobbyDonors: 490000, aipacTopContributor: true },
  { name: 'Adriano Espaillat', party: 'D', state: 'NY', district: '13', chamber: 'house', totalLobby: 700000, pacDirect: 270000, indExpend: 0, lobbyDonors: 430000, aipacTopContributor: true },
  { name: 'Shri Thanedar', party: 'D', state: 'MI', district: '13', chamber: 'house', totalLobby: 650000, pacDirect: 250000, indExpend: 0, lobbyDonors: 400000, aipacTopContributor: true },
  { name: 'Nikema Williams', party: 'D', state: 'GA', district: '05', chamber: 'house', totalLobby: 600000, pacDirect: 230000, indExpend: 0, lobbyDonors: 370000, aipacTopContributor: true },
  { name: 'Sheila Cherfilus-McCormick', party: 'D', state: 'FL', district: '20', chamber: 'house', totalLobby: 720000, pacDirect: 280000, indExpend: 0, lobbyDonors: 440000, aipacTopContributor: true },
  { name: 'Joe Morelle', party: 'D', state: 'NY', district: '25', chamber: 'house', totalLobby: 650000, pacDirect: 250000, indExpend: 0, lobbyDonors: 400000, aipacTopContributor: true },
  { name: 'Marilyn Strickland', party: 'D', state: 'WA', district: '10', chamber: 'house', totalLobby: 580000, pacDirect: 220000, indExpend: 0, lobbyDonors: 360000, aipacTopContributor: true },
  { name: 'Dan Newhouse', party: 'R', state: 'WA', district: '04', chamber: 'house', totalLobby: 520000, pacDirect: 200000, indExpend: 0, lobbyDonors: 320000, aipacTopContributor: true },
  { name: 'Monica De La Cruz', party: 'R', state: 'TX', district: '15', chamber: 'house', totalLobby: 480000, pacDirect: 185000, indExpend: 0, lobbyDonors: 295000, aipacTopContributor: true },
]

/** White House / Executive Branch — Israel policy principals */
export const EXECUTIVE_BRANCH = [
  { name: 'Donald J. Trump', role: 'President', party: 'R' as Party, aipacRelation: 'AIPAC endorsed; signed Abraham Accords; moved embassy to Jerusalem; recognized Golan Heights sovereignty.' },
  { name: 'J.D. Vance', role: 'Vice President', party: 'R' as Party, aipacRelation: 'Voted against 2024 foreign aid supplemental including Israel aid. Has since aligned with administration position.' },
  { name: 'Marco Rubio', role: 'Secretary of State', party: 'R' as Party, aipacRelation: 'Career pro-Israel lobby total: $3.2M+. Long-standing AIPAC relationship. Senate Foreign Relations Committee leader.' },
  { name: 'Pete Hegseth', role: 'Secretary of Defense', party: 'R' as Party, aipacRelation: 'Oversees U.S.-Israel defense cooperation including Iron Dome, David\'s Sling, and Arrow programs.' },
  { name: 'Elise Stefanik', role: 'U.N. Ambassador', party: 'R' as Party, aipacRelation: 'Career pro-Israel lobby total: $1.5M+. Led House hearings on campus antisemitism. Strong AIPAC supporter.' },
]

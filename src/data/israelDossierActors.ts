/**
 * Israel Dossier — Actor enablement graph
 *
 * Links political / lobbying / executive actors to timeline eras, documented
 * incidents, and money-trail nodes. Every enablement claim must be checkable
 * through public funding, voting, executive action, or court records.
 *
 * Profile IDs must exist in profileData.ts (or be added in the same ship).
 */

export interface DossierFundingLink {
  label: string
  amount?: string
  sourceUrl: string
  note?: string
}

export interface DossierActorEnablement {
  profileId: string
  name: string
  role: string
  category: 'us-executive' | 'us-congress' | 'us-donor-lobby' | 'israeli-leadership' | 'legal-actor'
  enablementSummary: string
  relatedTimelineYears: string[]
  relatedIncidentIds: string[]
  relatedMoneyNodeIds: string[]
  fundingLinks: DossierFundingLink[]
  tier: 'verified' | 'circumstantial'
}

export const ISRAEL_DOSSIER_ACTORS: DossierActorEnablement[] = [
  {
    profileId: 'joe-biden',
    name: 'Joe Biden',
    role: 'U.S. President (2021–2025); long-time Senate foreign-policy power broker',
    category: 'us-executive',
    enablementSummary:
      'Approved the $26.4B Israel Security Supplemental (H.R.815), maintained the $3.8B/year MOU baseline, and authorized continuous munitions transfers during the post–October 7 Gaza war while briefly pausing some MK-84 deliveries over civilian-casualty concerns.',
    relatedTimelineYears: ['2014', '2016', '2023', '2024'],
    relatedIncidentIds: [
      'cast-lead-2008-09',
      'protective-edge-2014-children',
      'great-march-return-2018',
      'jabalia-refugee-camp',
      'al-mawasi-safe-zone',
    ],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'fmf-weapons', 'mk84-use', 'jdam-use'],
    fundingLinks: [
      {
        label: 'H.R.815 — Israel Security Supplemental Appropriations Act, 2024',
        amount: '$26.4B',
        sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
      {
        label: 'CRS RL33222 — U.S. Foreign Aid to Israel',
        amount: '$298B inflation-adjusted through 2024',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'donald-trump',
    name: 'Donald Trump',
    role: 'U.S. President (2017–2021; 2025–)',
    category: 'us-executive',
    enablementSummary:
      'Released the Biden-era hold on 1,800 MK-84 2,000-pound bombs in January 2025; previously recognized Jerusalem as capital, moved the U.S. embassy, and recognized Israeli sovereignty over the Golan Heights — structural diplomatic enablement of occupation policy.',
    relatedTimelineYears: ['2017', '2018', '2019', '2025'],
    relatedIncidentIds: ['great-march-return-2018', 'al-mawasi-safe-zone'],
    relatedMoneyNodeIds: ['trump-release', 'mk84-use', 'annual-mou'],
    fundingLinks: [
      {
        label: 'Trump administration release of MK-84 bombs (reporting)',
        amount: '~$360M package context',
        sourceUrl: 'https://www.armyrecognition.com/news/army-news/2025/breaking-news-us-greenlights-mk-84-bombs-for-israel-despite-us-president-donald-trumps-military-sales-pause',
      },
      {
        label: 'CRS RL33222 — multi-administration aid continuity',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'antony-blinken',
    name: 'Antony Blinken',
    role: 'U.S. Secretary of State (2021–2025)',
    category: 'us-executive',
    enablementSummary:
      'As chief diplomat, oversaw State Department arms-transfer determinations and public justifications for continued U.S. military support during the Gaza war while stating humanitarian concerns — the dual track of weapons continuity plus diplomatic cover.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'fmf-weapons', 'jdam-use'],
    fundingLinks: [
      {
        label: 'DSCA major arms sales notices',
        sourceUrl: 'https://www.dsca.mil/press-media/major-arms-sales',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'chuck-schumer',
    name: 'Chuck Schumer',
    role: 'U.S. Senate Majority / Minority Leader',
    category: 'us-congress',
    enablementSummary:
      'Floor leadership role in advancing Israel aid packages and defending unconditional military assistance; major AIPAC-aligned fundraising recipient whose votes track supplemental and baseline FMF flows.',
    relatedTimelineYears: ['2016', '2024'],
    relatedIncidentIds: ['protective-edge-2014-children'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Schumer / pro-Israel PAC flows',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/charles-schumer/summary?cid=N00001093',
      },
      {
        label: 'H.R.815 roll-call context (Senate passage 79-18)',
        amount: '$26.4B',
        sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'mitch-mcconnell',
    name: 'Mitch McConnell',
    role: 'U.S. Senate Republican Leader',
    category: 'us-congress',
    enablementSummary:
      'Key Republican Senate vote and messaging driver for Israel aid supplementals and opposition to conditions on military assistance.',
    relatedTimelineYears: ['2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — McConnell profile',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/mitch-mcconnell/summary?cid=N00003389',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'mike-johnson',
    name: 'Mike Johnson',
    role: 'Speaker of the U.S. House',
    category: 'us-congress',
    enablementSummary:
      'House leadership role in advancing Israel security supplementals and framing U.S. military aid as non-negotiable during the Gaza war.',
    relatedTimelineYears: ['2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815'],
    fundingLinks: [
      {
        label: 'H.R.815 — House passage 366-58',
        amount: '$26.4B',
        sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'miriam-adelson',
    name: 'Miriam Adelson',
    role: 'Mega-donor; Adelson Family Foundation / Republican megadonor',
    category: 'us-donor-lobby',
    enablementSummary:
      'Among the largest individual political donors supporting strongly pro-Israel Republican candidates and policy agendas; financial enablement of electoral outcomes that lock in unconditional aid orthodoxy.',
    relatedTimelineYears: ['2016', '2020', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Adelson family / related PAC activity',
        sourceUrl: 'https://www.opensecrets.org/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'benjamin-netanyahu',
    name: 'Benjamin Netanyahu',
    role: 'Prime Minister of Israel (multiple terms; current wartime PM)',
    category: 'israeli-leadership',
    enablementSummary:
      'Sitting head of government during the post–October 7 Gaza campaign. Subject of ICC arrest warrant (Nov 2024) for alleged war crimes and crimes against humanity including starvation as a method of warfare. Ultimate political authority over IDF operations and COGAT aid policy.',
    relatedTimelineYears: ['1996', '2009', '2014', '2023', '2024'],
    relatedIncidentIds: [
      'cast-lead-2008-09',
      'protective-edge-2014-children',
      'oct7-hamas-attack-2023',
      'jabalia-refugee-camp',
      'starvation-aid-blockade',
    ],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'mk84-use', 'artillery-use'],
    fundingLinks: [
      {
        label: 'ICC — arrest warrant decision (Netanyahu / Gallant)',
        sourceUrl: 'https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges',
      },
      {
        label: 'CRS RL33222 — U.S. aid received under Netanyahu governments',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'yoav-gallant',
    name: 'Yoav Gallant',
    role: 'Israeli Defense Minister (2022–2024)',
    category: 'israeli-leadership',
    enablementSummary:
      'Defense Minister during the opening phase of the Gaza war. Subject of ICC arrest warrant for alleged war crimes and crimes against humanity. Publicly announced a "complete siege" of Gaza (electricity, food, fuel) in October 2023 — language cited in international legal filings.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [
      'oct7-hamas-attack-2023',
      'starvation-aid-blockade',
      'jabalia-refugee-camp',
      'al-shifa-hospital',
    ],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use', 'fmf-weapons'],
    fundingLinks: [
      {
        label: 'ICC — Situation in the State of Palestine',
        sourceUrl: 'https://www.icc-cpi.int/palestine',
      },
      {
        label: 'OHCHR — Gaza updates and siege documentation',
        sourceUrl: 'https://www.ohchr.org/sites/default/files/documents/countries/opt/20241106-Gaza-Update-Report-OPT.pdf',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'barack-obama',
    name: 'Barack Obama',
    role: 'U.S. President (2009–2017)',
    category: 'us-executive',
    enablementSummary:
      'Signed the record $38B 10-year MOU (2016) that set the modern $3.8B/year baseline. Continuity of FMF during Cast Lead aftermath and Protective Edge established the institutional floor still operating today.',
    relatedTimelineYears: ['2009', '2014', '2016'],
    relatedIncidentIds: ['cast-lead-2008-09', 'protective-edge-2014-children', 'mavi-marmara-2010'],
    relatedMoneyNodeIds: ['annual-mou', 'iron-dome', 'fmf-weapons'],
    fundingLinks: [
      {
        label: 'State Department — 2016 MOU fact sheet',
        amount: '$38B / 10 years',
        sourceUrl: 'https://2009-2017.state.gov/r/pa/prs/ps/2016/09/261987.htm',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'lindsey-graham',
    name: 'Lindsey Graham',
    role: 'U.S. Senator (R-SC)',
    category: 'us-congress',
    enablementSummary:
      'Leading Senate voice for maximal military aid and against conditions; frequent public statements framing any pause in weapons as strategic betrayal.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Graham / pro-Israel contributions',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/lindsey-graham/summary?cid=N00009975',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'ted-cruz',
    name: 'Ted Cruz',
    role: 'U.S. Senator (R-TX)',
    category: 'us-congress',
    enablementSummary:
      'Consistent legislative and rhetorical support for unconditional Israel aid and sanctions frameworks targeting critics of Israeli policy.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Cruz profile',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'hillary-clinton',
    name: 'Hillary Clinton',
    role: 'Former Secretary of State; former U.S. Senator (D-NY)',
    category: 'us-executive',
    enablementSummary:
      'As Secretary of State and senator, a durable institutional advocate for the U.S.–Israel military and diplomatic partnership during multiple Gaza escalations and aid cycles; continuum of executive-branch enablement before the 2016 MOU peak.',
    relatedTimelineYears: ['2008–2009', '2012', '2014'],
    relatedIncidentIds: ['cast-lead-2008-09', 'pillar-of-defense-2012', 'protective-edge-2014-children'],
    relatedMoneyNodeIds: ['annual-mou', 'iron-dome'],
    fundingLinks: [
      {
        label: 'State Department historical Israel policy archive',
        sourceUrl: 'https://2009-2017.state.gov/',
      },
      {
        label: 'CRS RL33222 — multi-administration aid continuity',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'nikki-haley',
    name: 'Nikki Haley',
    role: 'Former U.S. Ambassador to the United Nations',
    category: 'us-executive',
    enablementSummary:
      'As UN Ambassador, led U.S. diplomatic defense of Israel at the Security Council and General Assembly — including veto and walkout diplomacy that insulated Israeli operations from multilateral constraints during her tenure.',
    relatedTimelineYears: ['2017', '2018', '2019'],
    relatedIncidentIds: ['great-march-return-2018'],
    relatedMoneyNodeIds: ['annual-mou'],
    fundingLinks: [
      {
        label: 'U.S. Mission to the UN — historical statements archive',
        sourceUrl: 'https://usun.usmission.gov/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'hakeem-jeffries',
    name: 'Hakeem Jeffries',
    role: 'House Democratic Leader',
    category: 'us-congress',
    enablementSummary:
      'House Democratic leadership role during the post–October 7 aid votes; helped maintain bipartisan floor majorities for Israel security supplementals while managing caucus splits over conditions.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'annual-mou'],
    fundingLinks: [
      {
        label: 'H.R.815 legislative record',
        amount: '$26.4B',
        sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
      {
        label: 'OpenSecrets — Jeffries profile',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/hakeem-jeffries/summary?cid=N00033640',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'bernie-sanders',
    name: 'Bernie Sanders',
    role: 'U.S. Senator (I-VT)',
    category: 'us-congress',
    enablementSummary:
      'Among the most visible Senate critics of unconditional wartime aid; repeatedly proposed conditioning or pausing munitions over civilian casualties. Mapped here as a counter-enablement actor so the graph is not one-directional.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'mk84-use'],
    fundingLinks: [
      {
        label: 'Congressional record / aid conditionality proposals (public statements + votes)',
        sourceUrl: 'https://www.congress.gov/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'rashida-tlaib',
    name: 'Rashida Tlaib',
    role: 'U.S. Representative (D-MI)',
    category: 'us-congress',
    enablementSummary:
      'Consistent House opponent of Israel military aid packages and advocate for ceasefire / accountability measures; included as a counter-enablement node documenting the congressional minority against the aid floor.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815'],
    fundingLinks: [
      {
        label: 'Congress.gov — member voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/rashida-tlaib/T000481',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'ilhan-omar',
    name: 'Ilhan Omar',
    role: 'U.S. Representative (D-MN)',
    category: 'us-congress',
    enablementSummary:
      'House progressive critic of Israel aid and U.S. diplomatic cover; mapped as counter-enablement for the same reason as Tlaib and Sanders — the graph must show opposition as well as sponsorship.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815'],
    fundingLinks: [
      {
        label: 'Congress.gov — member voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/ilhan-omar/O000173',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'howard-kohr',
    name: 'Howard Kohr',
    role: 'CEO, American Israel Public Affairs Committee (AIPAC)',
    category: 'us-donor-lobby',
    enablementSummary:
      'Leads AIPAC, the largest pro-Israel lobbying organization by electoral spend. AIPAC and affiliated PACs spent record sums in the 2024 cycle targeting members who supported conditioning aid or ceasefire measures — structural enablement via campaign finance and Hill lobbying, not direct weapons transfer.',
    relatedTimelineYears: ['2016', '2024'],
    relatedIncidentIds: ['protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'pro-israel-lobby-2024'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Pro-Israel industry / AIPAC-related flows',
        amount: '$180M+ cycle context (industry aggregate)',
        sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
      },
      {
        label: 'AIPAC — public lobbying and PAC disclosures (FEC)',
        sourceUrl: 'https://www.fec.gov/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'haim-saban',
    name: 'Haim Saban',
    role: 'Media executive; major Democratic donor and pro-Israel philanthropist',
    category: 'us-donor-lobby',
    enablementSummary:
      'Long-running megadonor to Democratic campaigns and pro-Israel causes; public record of large contributions and explicit advocacy for robust U.S. military and diplomatic support for Israel across multiple administrations.',
    relatedTimelineYears: ['2008', '2012', '2016', '2020', '2024'],
    relatedIncidentIds: ['cast-lead-2008-09', 'protective-edge-2014-children'],
    relatedMoneyNodeIds: ['annual-mou', 'hr815', 'pro-israel-lobby-2024'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Saban donor profile / soft-money history',
        sourceUrl: 'https://www.opensecrets.org/',
      },
      {
        label: 'FEC individual contribution search (public filings)',
        sourceUrl: 'https://www.fec.gov/data/receipts/individual-contributions/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'kamala-harris',
    name: 'Kamala Harris',
    role: 'U.S. Vice President (2021–2025); 2024 Democratic presidential nominee',
    category: 'us-executive',
    enablementSummary:
      'As VP in the Biden administration during the post–October 7 Gaza war, part of the executive chain that maintained MOU baseline aid and the H.R.815 supplemental while publicly urging humanitarian restraint — dual-track weapons continuity plus diplomatic messaging.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: ['jabalia-refugee-camp', 'al-mawasi-safe-zone'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'fmf-weapons'],
    fundingLinks: [
      {
        label: 'H.R.815 — Israel Security Supplemental (administration-backed)',
        amount: '$26.4B',
        sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
      {
        label: 'CRS RL33222 — U.S. Foreign Aid to Israel',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'marco-rubio',
    name: 'Marco Rubio',
    role: 'U.S. Senator (R-FL); Secretary of State (2025–)',
    category: 'us-congress',
    enablementSummary:
      'Consistent Senate sponsor and floor advocate for unconditional Israel military assistance, Iron Dome funding, and post–October 7 supplemental packages; later State Department role places him inside executive arms-transfer architecture.',
    relatedTimelineYears: ['2014', '2021', '2023', '2024', '2025'],
    relatedIncidentIds: ['protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Rubio / pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/marco-rubio/summary?cid=N00030612',
      },
      {
        label: 'Congress.gov — Rubio cosponsorships and votes',
        sourceUrl: 'https://www.congress.gov/member/marco-rubio/R000595',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'mike-pompeo',
    name: 'Mike Pompeo',
    role: 'U.S. Secretary of State (2018–2021); CIA Director (2017–2018)',
    category: 'us-executive',
    enablementSummary:
      'As Secretary of State under Trump, oversaw the Golan recognition, embassy move follow-through, and continuous FMF/missile-defense transfers; public champion of maximal diplomatic and military support for Israeli government positions.',
    relatedTimelineYears: ['2017', '2018', '2019', '2020'],
    relatedIncidentIds: ['great-march-return-2018'],
    relatedMoneyNodeIds: ['annual-mou', 'iron-dome', 'fmf-weapons'],
    fundingLinks: [
      {
        label: 'CRS RL33222 — multi-administration aid continuity',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
      {
        label: 'State Department / FRUS-style public statements archive (Trump era)',
        sourceUrl: 'https://2017-2021.state.gov/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'josh-gottheimer',
    name: 'Josh Gottheimer',
    role: 'U.S. Representative (D-NJ); Democratic Majority for Israel co-founder network',
    category: 'us-congress',
    enablementSummary:
      'House Democrat closely aligned with pro-Israel PACs and Democratic Majority for Israel; consistent floor advocate for unconditional wartime aid and opponent of progressive conditionality efforts during the Gaza war.',
    relatedTimelineYears: ['2021', '2023', '2024'],
    relatedIncidentIds: ['guardian-of-the-walls-2021', 'protective-edge-2014-children'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'pro-israel-lobby-2024'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Gottheimer pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/josh-gottheimer/summary?cid=N00036944',
      },
      {
        label: 'OpenSecrets — Democratic Majority for Israel PAC',
        sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/democratic-majority-for-israel/C00764126/summary/2024',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'tom-cotton',
    name: 'Tom Cotton',
    role: 'U.S. Senator (R-AR)',
    category: 'us-congress',
    enablementSummary:
      'Senate Republican hard-liner on Israel aid and Iran policy; consistent votes for supplemental packages, Iron Dome funding, and maximal executive latitude on munitions transfers.',
    relatedTimelineYears: ['2014', '2021', '2023', '2024'],
    relatedIncidentIds: ['protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Cotton / pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/tom-cotton/summary?cid=N00033363',
      },
      {
        label: 'Congress.gov — Cotton voting and cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/tom-cotton/C001095',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'aoc',
    name: 'Alexandria Ocasio-Cortez',
    role: 'U.S. Representative (D-NY)',
    category: 'us-congress',
    enablementSummary:
      'High-profile House progressive opponent of unconditional Israel military aid and advocate for ceasefire / conditionality; mapped as counter-enablement so the graph documents congressional opposition as well as sponsorship.',
    relatedTimelineYears: ['2021', '2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815'],
    fundingLinks: [
      {
        label: 'Congress.gov — member voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/alexandria-ocasio-cortez/O000172',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'john-bolton',
    name: 'John Bolton',
    role: 'U.S. National Security Advisor (2018–2019); UN Ambassador (2005–2006)',
    category: 'us-executive',
    enablementSummary:
      'Long-running national-security hard-liner advocating maximal U.S. military and diplomatic support for Israeli government positions, including during Gaza operations and broader Middle East force posture.',
    relatedTimelineYears: ['2005', '2006', '2018', '2019'],
    relatedIncidentIds: ['summer-rains-2006', 'cast-lead-2008-09'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    fundingLinks: [
      {
        label: 'CRS RL33222 — multi-administration aid continuity',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'sheldon-adelson',
    name: 'Sheldon Adelson',
    role: 'Late casino magnate; major Republican megadonor and pro-Israel philanthropist (d. 2021)',
    category: 'us-donor-lobby',
    enablementSummary:
      'With Miriam Adelson, among the largest single-family sources of pro-Israel political money in U.S. history. Funded Republican campaigns, pro-Israel advocacy, and settlement-adjacent philanthropy; mapped as a historical donor-lobby enablement node with public FEC and OpenSecrets floors.',
    relatedTimelineYears: ['2012', '2016', '2020'],
    relatedIncidentIds: ['protective-edge-2014-children', 'great-march-return-2018'],
    relatedMoneyNodeIds: ['pro-israel-lobby-2024', 'annual-mou', 'hr815'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Adelson donor history / soft money',
        sourceUrl: 'https://www.opensecrets.org/',
      },
      {
        label: 'FEC individual contribution search (public filings)',
        sourceUrl: 'https://www.fec.gov/data/receipts/individual-contributions/',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'nancy-pelosi',
    name: 'Nancy Pelosi',
    role: 'Former Speaker of the U.S. House; long-time Democratic leadership',
    category: 'us-congress',
    enablementSummary:
      'House Democratic leadership during multiple Israel aid packages and wartime supplementals; institutional floor leadership enabling bipartisan aid continuity even when progressive members sought conditionality.',
    relatedTimelineYears: ['2008', '2014', '2021', '2023', '2024'],
    relatedIncidentIds: ['cast-lead-2008-09', 'protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'iron-dome'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Pelosi pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/nancy-pelosi/summary?cid=N00007360',
      },
      {
        label: 'H.R.815 context — House leadership role in wartime aid',
        amount: '$26.4B',
        sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'elizabeth-warren',
    name: 'Elizabeth Warren',
    role: 'U.S. Senator (D-MA)',
    category: 'us-congress',
    enablementSummary:
      'Senate progressive who publicly supported conditioning military aid over civilian casualties while remaining inside the Democratic caucus that advanced wartime packages; mapped as mixed/counter-enablement documenting the conditionality debate.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'mk84-use'],
    fundingLinks: [
      {
        label: 'Congress.gov — Warren voting and statements context',
        sourceUrl: 'https://www.congress.gov/member/elizabeth-warren/W000817',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'cory-booker',
    name: 'Cory Booker',
    role: 'U.S. Senator (D-NJ)',
    category: 'us-congress',
    enablementSummary:
      'Senate Democrat with long-standing pro-Israel record and support for Iron Dome and wartime supplemental packages; frequent floor and caucus voice for robust bilateral military assistance.',
    relatedTimelineYears: ['2014', '2021', '2023', '2024'],
    relatedIncidentIds: ['protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Booker pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/cory-booker/summary?cid=N00035267',
      },
      {
        label: 'Congress.gov — Booker voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/cory-booker/B001288',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'adam-schiff',
    name: 'Adam Schiff',
    role: 'U.S. Senator (D-CA); former House Intelligence Committee chair',
    category: 'us-congress',
    enablementSummary:
      'Long-serving California Democrat and consistent floor advocate for Israel military aid, Iron Dome funding, and wartime packages; high-visibility voice against conditioning aid during the Gaza war period.',
    relatedTimelineYears: ['2014', '2021', '2023', '2024', '2025'],
    relatedIncidentIds: ['protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou', 'pro-israel-lobby-2024'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Schiff pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/adam-schiff/summary?cid=N00009585',
      },
      {
        label: 'Congress.gov — Schiff voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/adam-schiff/S001150',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'elise-stefanik',
    name: 'Elise Stefanik',
    role: 'U.S. Representative (R-NY); House Republican Conference Chair',
    category: 'us-congress',
    enablementSummary:
      'House Republican leadership voice for unconditional wartime aid, Iron Dome replenishment, and maximal executive latitude on munitions transfers; high-visibility floor and media advocate against aid conditionality during the Gaza war.',
    relatedTimelineYears: ['2023', '2024', '2025'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou', 'pro-israel-lobby-2024'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Stefanik pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/elise-stefanik/summary?cid=N00035523',
      },
      {
        label: 'Congress.gov — Stefanik voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/elise-stefanik/S001196',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'ritchie-torres',
    name: 'Ritchie Torres',
    role: 'U.S. Representative (D-NY)',
    category: 'us-congress',
    enablementSummary:
      'House Democrat and high-profile defender of Israel military aid packages during the Gaza war; frequent floor and media advocate against progressive conditionality proposals and for supplemental FMF/Iron Dome funding.',
    relatedTimelineYears: ['2021', '2023', '2024'],
    relatedIncidentIds: ['guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou', 'pro-israel-lobby-2024'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Torres pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/ritchie-torres/summary?cid=N00044704',
      },
      {
        label: 'Congress.gov — Torres voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/ritchie-torres/T000486',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'jacky-rosen',
    name: 'Jacky Rosen',
    role: 'U.S. Senator (D-NV)',
    category: 'us-congress',
    enablementSummary:
      'Senate Democrat with consistent votes for Iron Dome, MOU-baseline FMF, and wartime supplementals; caucus voice for robust bilateral military assistance across multiple Gaza escalations.',
    relatedTimelineYears: ['2018', '2021', '2023', '2024'],
    relatedIncidentIds: ['great-march-return-2018', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Rosen pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/jacky-rosen/summary?cid=N00040750',
      },
      {
        label: 'Congress.gov — Rosen voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/jacky-rosen/R000608',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'brad-sherman',
    name: 'Brad Sherman',
    role: 'U.S. Representative (D-CA)',
    category: 'us-congress',
    enablementSummary:
      'Long-serving House Democrat on foreign-affairs committees and consistent sponsor/advocate of Israel military aid, loan guarantees, and wartime packages; maps the durable bipartisan House floor for FMF continuity.',
    relatedTimelineYears: ['2008', '2014', '2021', '2023', '2024'],
    relatedIncidentIds: ['cast-lead-2008-09', 'protective-edge-2014-children'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'iron-dome'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Sherman pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/brad-sherman/summary?cid=N00006897',
      },
      {
        label: 'Congress.gov — Sherman voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/brad-sherman/S000344',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'tim-scott',
    name: 'Tim Scott',
    role: 'U.S. Senator (R-SC)',
    category: 'us-congress',
    enablementSummary:
      'Senate Republican and consistent vote for Iron Dome, MOU-baseline FMF, and wartime Israel security supplementals; public advocate for maximal U.S. military support across multiple Gaza escalations.',
    relatedTimelineYears: ['2014', '2021', '2023', '2024'],
    relatedIncidentIds: ['protective-edge-2014-children', 'guardian-of-the-walls-2021'],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Scott pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/tim-scott/summary?cid=N00031782',
      },
      {
        label: 'Congress.gov — Scott voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/tim-scott/S001184',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'mike-pence',
    name: 'Mike Pence',
    role: 'U.S. Vice President (2017–2021); former Indiana governor',
    category: 'us-executive',
    enablementSummary:
      'As VP under Trump, part of the executive chain for embassy move, Golan recognition, and continuous FMF/missile-defense transfers; public champion of unconditional U.S. support for Israeli government positions.',
    relatedTimelineYears: ['2017', '2018', '2019', '2020'],
    relatedIncidentIds: ['great-march-return-2018'],
    relatedMoneyNodeIds: ['annual-mou', 'iron-dome', 'fmf-weapons'],
    fundingLinks: [
      {
        label: 'CRS RL33222 — multi-administration aid continuity',
        sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
      },
    ],
    tier: 'verified',
  },
  {
    profileId: 'john-fetterman',
    name: 'John Fetterman',
    role: 'U.S. Senator (D-PA)',
    category: 'us-congress',
    enablementSummary:
      'Senate Democrat and high-visibility wartime advocate for continued Israel military aid and against progressive conditionality efforts during the Gaza war; maps the bipartisan Senate floor for supplemental packages.',
    relatedTimelineYears: ['2023', '2024'],
    relatedIncidentIds: [],
    relatedMoneyNodeIds: ['hr815', 'iron-dome', 'annual-mou'],
    fundingLinks: [
      {
        label: 'OpenSecrets — Fetterman pro-Israel PAC summary',
        sourceUrl: 'https://www.opensecrets.org/members-of-congress/john-fetterman/summary?cid=N00050190',
      },
      {
        label: 'Congress.gov — Fetterman voting / cosponsorships',
        sourceUrl: 'https://www.congress.gov/member/john-fetterman/F000479',
      },
    ],
    tier: 'verified',
  },
]

export function getDossierActorByProfileId(profileId: string): DossierActorEnablement | undefined {
  return ISRAEL_DOSSIER_ACTORS.find((actor) => actor.profileId === profileId)
}

export function getDossierActorsForIncident(incidentId: string): DossierActorEnablement[] {
  return ISRAEL_DOSSIER_ACTORS.filter((actor) => actor.relatedIncidentIds.includes(incidentId))
}

export function getDossierActorsForMoneyNode(nodeId: string): DossierActorEnablement[] {
  return ISRAEL_DOSSIER_ACTORS.filter((actor) => actor.relatedMoneyNodeIds.includes(nodeId))
}

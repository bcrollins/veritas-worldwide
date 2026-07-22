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

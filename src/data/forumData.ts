/**
 * forumData.ts — Complete Reddit-style forum data layer for Veritas Worldwide Press.
 * All state is localStorage-backed for the static SPA. Defines communities (subreddits),
 * posts, comments, user karma, flairs, awards, moderation actions, and reporting.
 */

/* ── Core Types ───────────────────────────────────────────────── */

export type SortMode = 'hot' | 'best' | 'new' | 'top' | 'controversial' | 'rising'
export type TopTimeframe = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
export type PostType = 'text' | 'link' | 'image' | 'poll'
export type VoteDirection = 'up' | 'down' | null
export type ModAction = 'remove' | 'approve' | 'lock' | 'pin' | 'flair' | 'ban' | 'mute'
export type ReportReason = 'spam' | 'harassment' | 'misinformation' | 'off-topic' | 'doxxing' | 'violence' | 'other'

export interface UserFlair {
  text: string
  bgColor: string
  textColor: string
}

export interface PostFlair {
  id: string
  text: string
  bgColor: string
  textColor: string
}

export interface Award {
  id: string
  name: string
  icon: string // emoji
  description: string
  cost: number // karma cost
}

export interface PollOption {
  id: string
  text: string
  votes: string[] // user IDs
}

export interface ForumPost {
  id: string
  communityId: string
  type: PostType
  title: string
  body: string // markdown-ish text for text posts, URL for link posts
  author: string
  authorFlair?: UserFlair
  postFlair?: PostFlair
  timestamp: number
  upvotes: string[]
  downvotes: string[]
  commentCount: number
  pinned: boolean
  locked: boolean
  removed: boolean
  edited: boolean
  saved: string[] // user IDs who saved
  awards: { awardId: string; givenBy: string; count: number }[]
  crosspostedFrom?: { communityId: string; postId: string }
  pollOptions?: PollOption[]
  imageUrl?: string
}

export interface ForumComment {
  id: string
  postId: string
  parentId: string | null
  author: string
  authorFlair?: UserFlair
  content: string
  timestamp: number
  upvotes: string[]
  downvotes: string[]
  edited: boolean
  deleted: boolean
  removed: boolean
  locked: boolean
  awards: { awardId: string; givenBy: string; count: number }[]
  saved: string[]
}

export interface Community {
  id: string
  name: string
  displayName: string
  description: string
  longDescription: string
  icon: string // emoji
  bannerColor: string
  rules: { title: string; body: string }[]
  flairs: PostFlair[]
  memberCount: number
  onlineCount: number
  createdAt: number
  moderators: string[]
  nsfw: boolean
  restricted: boolean // only approved users can post
}

export interface ModLogEntry {
  id: string
  communityId: string
  action: ModAction
  targetType: 'post' | 'comment' | 'user'
  targetId: string
  moderator: string
  reason: string
  timestamp: number
}

export interface Report {
  id: string
  targetType: 'post' | 'comment'
  targetId: string
  communityId: string
  reporter: string
  reason: ReportReason
  details: string
  timestamp: number
  resolved: boolean
}

export interface ForumUser {
  id: string
  displayName: string
  karma: number
  postKarma: number
  commentKarma: number
  awardKarma: number
  joinedAt: number
  bio: string
  flair?: UserFlair
  subscribedCommunities: string[]
  blockedUsers: string[]
  savedPosts: string[]
  savedComments: string[]
  cakeDay: number
}


/* ── Awards Registry ──────────────────────────────────────────── */

export const AWARDS: Award[] = [
  { id: 'truth-seeker', name: 'Truth Seeker', icon: '🔍', description: 'For uncovering hidden connections', cost: 50 },
  { id: 'verified-source', name: 'Verified Source', icon: '✅', description: 'Post backed by primary sources', cost: 100 },
  { id: 'deep-dive', name: 'Deep Dive', icon: '🤿', description: 'Exceptional research and analysis', cost: 200 },
  { id: 'whistleblower', name: 'Whistleblower', icon: '📢', description: 'Brave exposure of corruption', cost: 300 },
  { id: 'follow-the-money', name: 'Follow the Money', icon: '💰', description: 'Outstanding financial trail analysis', cost: 150 },
  { id: 'red-pill', name: 'Red Pill', icon: '💊', description: 'Eye-opening perspective shift', cost: 75 },
  { id: 'based', name: 'Based', icon: '🏛️', description: 'Solid, well-reasoned take', cost: 25 },
  { id: 'helpful', name: 'Helpful', icon: '🤝', description: 'Genuinely useful contribution', cost: 25 },
  { id: 'mind-blown', name: 'Mind Blown', icon: '🤯', description: 'Completely changed my perspective', cost: 100 },
  { id: 'gold-standard', name: 'Gold Standard', icon: '🥇', description: 'The highest quality post', cost: 500 },
]

/* ── Communities (subreddits) ─────────────────────────────────── */

export const COMMUNITIES: Community[] = [
  {
    id: 'general',
    name: 'v/General',
    displayName: 'General Discussion',
    description: 'Open discussion about The Record and current events',
    longDescription: 'The main hub for all Veritas Worldwide Press discussion. Talk about current events, share analysis, debate findings, and connect with fellow truth-seekers. All civil discourse welcome.',
    icon: '📰',
    bannerColor: '#8B1A1A',
    rules: [
      { title: 'Be Civil', body: 'Attack ideas, not people. No personal attacks, harassment, or threats.' },
      { title: 'Cite Sources', body: 'Claims require evidence. Link to primary sources when possible.' },
      { title: 'No Doxxing', body: 'Do not post personal information of private individuals.' },
      { title: 'Stay On Topic', body: 'Keep discussion relevant to Veritas content and related investigations.' },
      { title: 'No Spam', body: 'No self-promotion, advertising, or repetitive posting.' },
    ],
    flairs: [
      { id: 'discussion', text: 'Discussion', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'analysis', text: 'Analysis', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'breaking', text: 'Breaking', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'question', text: 'Question', bgColor: '#92400e', textColor: '#ffffff' },
      { id: 'meta', text: 'Meta', bgColor: '#6b21a8', textColor: '#ffffff' },
    ],
    memberCount: 14832,
    onlineCount: 347,
    createdAt: Date.now() - 365 * 86400000,
    moderators: ['VeritasAdmin', 'TheTruthWatcher'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'israel-lobby',
    name: 'v/IsraelLobby',
    displayName: 'Israel Lobby & AIPAC',
    description: 'Tracking foreign influence, AIPAC donations, and congressional voting patterns',
    longDescription: 'Dedicated to investigating the Israel lobby\'s influence on American politics. Track AIPAC donations, analyze congressional voting records, document policy impacts, and follow the money trail from foreign interests to domestic legislation.',
    icon: '🏛️',
    bannerColor: '#1e3a5f',
    rules: [
      { title: 'Be Civil', body: 'Attack ideas, not people. No personal attacks or harassment.' },
      { title: 'Cite Sources', body: 'All claims about donations, votes, or policy must include verifiable sources.' },
      { title: 'No Hate Speech', body: 'Criticism of lobbying is not antisemitism. Keep discussion focused on politics and money, not ethnicity.' },
      { title: 'Primary Sources Only', body: 'FEC filings, congressional records, and official documents preferred.' },
      { title: 'Follow the Money', body: 'Financial claims must reference specific FEC filings, OpenSecrets data, or official disclosures.' },
    ],
    flairs: [
      { id: 'fec-filing', text: 'FEC Filing', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'vote-record', text: 'Vote Record', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'donation-trail', text: 'Donation Trail', bgColor: '#92400e', textColor: '#ffffff' },
      { id: 'policy-impact', text: 'Policy Impact', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'lobbyist-watch', text: 'Lobbyist Watch', bgColor: '#6b21a8', textColor: '#ffffff' },
    ],
    memberCount: 11204,
    onlineCount: 289,
    createdAt: Date.now() - 300 * 86400000,
    moderators: ['VeritasAdmin', 'FollowTheMoney'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'deep-state',
    name: 'v/DeepState',
    displayName: 'Deep State & Epstein Network',
    description: 'Flight logs, court documents, institutional corruption, and network analysis',
    longDescription: 'Investigation hub for the deep state apparatus: Epstein network connections, intelligence community overreach, corporate-government revolving doors, and institutional corruption. All discussion must be grounded in documented evidence.',
    icon: '🕵️',
    bannerColor: '#1a1a2e',
    rules: [
      { title: 'Evidence Required', body: 'All claims must reference court documents, flight logs, financial records, or other verifiable sources.' },
      { title: 'No Speculation Without Label', body: 'Clearly mark speculation vs. documented fact. Use evidence tier labels.' },
      { title: 'No Doxxing', body: 'Do not post personal information of private individuals.' },
      { title: 'Be Civil', body: 'Maintain respectful discourse even when discussing disturbing content.' },
    ],
    flairs: [
      { id: 'court-docs', text: 'Court Documents', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'flight-logs', text: 'Flight Logs', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'network-map', text: 'Network Map', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'intel-community', text: 'Intel Community', bgColor: '#6b21a8', textColor: '#ffffff' },
      { id: 'corporate-ties', text: 'Corporate Ties', bgColor: '#92400e', textColor: '#ffffff' },
    ],
    memberCount: 9876,
    onlineCount: 412,
    createdAt: Date.now() - 280 * 86400000,
    moderators: ['VeritasAdmin', 'DeepDigger'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'evidence-review',
    name: 'v/EvidenceReview',
    displayName: 'Evidence Review',
    description: 'Submit and peer-review primary sources, challenge evidence tiers',
    longDescription: 'The peer-review board for Veritas investigations. Submit new evidence for community review, challenge existing evidence tier classifications, and debate the strength of sourcing. This is where the record gets verified.',
    icon: '🔬',
    bannerColor: '#166534',
    rules: [
      { title: 'Source Required', body: 'Every submission must include a direct link to the primary source.' },
      { title: 'Evidence Tier Labels', body: 'Use Verified/Circumstantial/Disputed labels on all evidence posts.' },
      { title: 'Constructive Criticism', body: 'Challenge evidence on its merits. Explain WHY something is weak or strong.' },
      { title: 'No Partisan Framing', body: 'Evaluate evidence objectively regardless of political implications.' },
    ],
    flairs: [
      { id: 'verified', text: 'Verified', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'circumstantial', text: 'Circumstantial', bgColor: '#92400e', textColor: '#ffffff' },
      { id: 'disputed', text: 'Disputed', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'new-evidence', text: 'New Evidence', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'debunked', text: 'Debunked', bgColor: '#4a4a4a', textColor: '#ffffff' },
    ],
    memberCount: 6543,
    onlineCount: 178,
    createdAt: Date.now() - 250 * 86400000,
    moderators: ['VeritasAdmin', 'SourceChecker'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'power-profiles',
    name: 'v/PowerProfiles',
    displayName: 'Power Profiles & Exposés',
    description: 'Deep dives on politicians, billionaires, lobbyists, and power brokers',
    longDescription: 'Detailed investigations into the individuals who shape policy and profit from it. Politicians, billionaires, lobbyists, intelligence operatives — documented with receipts. Every claim sourced, every connection mapped.',
    icon: '👤',
    bannerColor: '#4a1942',
    rules: [
      { title: 'Source Everything', body: 'Every factual claim must be sourced. No unsourced accusations.' },
      { title: 'Public Figures Only', body: 'Only discuss public figures in their public capacity. No private individuals.' },
      { title: 'No Threats', body: 'Zero tolerance for threats or calls to violence against any person.' },
      { title: 'Fact-Check Each Other', body: 'Community members should verify and challenge each other\'s claims.' },
    ],
    flairs: [
      { id: 'politician', text: 'Politician', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'billionaire', text: 'Billionaire', bgColor: '#92400e', textColor: '#ffffff' },
      { id: 'lobbyist', text: 'Lobbyist', bgColor: '#6b21a8', textColor: '#ffffff' },
      { id: 'intel-operative', text: 'Intel Operative', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'corporate-exec', text: 'Corporate Executive', bgColor: '#166534', textColor: '#ffffff' },
    ],
    memberCount: 8234,
    onlineCount: 356,
    createdAt: Date.now() - 200 * 86400000,
    moderators: ['VeritasAdmin', 'ProfileBuilder'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'methodology',
    name: 'v/Methodology',
    displayName: 'Methodology & Standards',
    description: 'Debate editorial standards, evidence classification, and journalistic ethics',
    longDescription: 'Meta-discussion about how Veritas operates. Debate the evidence tier system, suggest improvements to methodology, discuss journalistic ethics, and help shape the standards that make this project credible.',
    icon: '⚖️',
    bannerColor: '#374151',
    rules: [
      { title: 'Good Faith', body: 'Engage constructively. This is about improving the project.' },
      { title: 'Specific Suggestions', body: 'Don\'t just criticize — propose specific improvements.' },
    ],
    flairs: [
      { id: 'suggestion', text: 'Suggestion', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'debate', text: 'Debate', bgColor: '#92400e', textColor: '#ffffff' },
      { id: 'implemented', text: 'Implemented', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'rejected', text: 'Rejected', bgColor: '#991b1b', textColor: '#ffffff' },
    ],
    memberCount: 3421,
    onlineCount: 89,
    createdAt: Date.now() - 340 * 86400000,
    moderators: ['VeritasAdmin'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'media-outreach',
    name: 'v/MediaOutreach',
    displayName: 'Media & Outreach',
    description: 'Coordinate social media campaigns, share Veritas content, organize outreach',
    longDescription: 'Hub for spreading the word. Share Veritas content on social media, coordinate outreach campaigns, discuss media strategy, and help grow the community. Content packs, shareable graphics, and talking points here.',
    icon: '📡',
    bannerColor: '#7c2d12',
    rules: [
      { title: 'No Brigading', body: 'Do not organize mass reporting or harassment campaigns.' },
      { title: 'Credit Sources', body: 'Always link back to original Veritas content when sharing.' },
      { title: 'Platform Rules', body: 'Respect each platform\'s terms of service when sharing.' },
    ],
    flairs: [
      { id: 'campaign', text: 'Campaign', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'content-pack', text: 'Content Pack', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'success-story', text: 'Success Story', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'strategy', text: 'Strategy', bgColor: '#92400e', textColor: '#ffffff' },
    ],
    memberCount: 5678,
    onlineCount: 201,
    createdAt: Date.now() - 180 * 86400000,
    moderators: ['VeritasAdmin', 'MediaOps'],
    nsfw: false,
    restricted: false,
  },
  {
    id: 'whistleblowers',
    name: 'v/Whistleblowers',
    displayName: 'Whistleblower Protection',
    description: 'Resources for whistleblowers, anonymous tip discussion, legal protections',
    longDescription: 'A space for discussing whistleblower protections, sharing resources for those exposing corruption, and analyzing leaked documents. All discussion must respect operational security and never compromise sources.',
    icon: '🛡️',
    bannerColor: '#064e3b',
    rules: [
      { title: 'Protect Sources', body: 'NEVER post information that could identify a whistleblower or source.' },
      { title: 'OPSEC First', body: 'Discuss operational security best practices. Help protect each other.' },
      { title: 'Legal Resources', body: 'Share legitimate legal resources and protections for whistleblowers.' },
      { title: 'Verify Before Posting', body: 'Don\'t share unverified leaked documents without proper context.' },
    ],
    flairs: [
      { id: 'legal-resource', text: 'Legal Resource', bgColor: '#166534', textColor: '#ffffff' },
      { id: 'opsec', text: 'OPSEC', bgColor: '#1e40af', textColor: '#ffffff' },
      { id: 'leak-analysis', text: 'Leak Analysis', bgColor: '#991b1b', textColor: '#ffffff' },
      { id: 'protection', text: 'Protection', bgColor: '#92400e', textColor: '#ffffff' },
    ],
    memberCount: 4123,
    onlineCount: 98,
    createdAt: Date.now() - 150 * 86400000,
    moderators: ['VeritasAdmin', 'SecureSource'],
    nsfw: false,
    restricted: true,
  },
  {
    id: 'memes',
    name: 'v/VeritasMemes',
    displayName: 'Veritas Memes & Satire',
    description: 'Political satire, memes, and humor — still fact-based',
    longDescription: 'Even truth-seekers need to laugh. Post political satire, memes, and humor related to the topics covered by Veritas. Keep it sharp, keep it factual, keep it funny.',
    icon: '😂',
    bannerColor: '#ea580c',
    rules: [
      { title: 'Humor Required', body: 'This is a meme sub. Low-effort rage posts belong in General.' },
      { title: 'No Hate', body: 'Satire is fine. Bigotry disguised as humor is not.' },
      { title: 'Flair Your Posts', body: 'Use appropriate flairs so people can filter content.' },
    ],
    flairs: [
      { id: 'meme', text: 'Meme', bgColor: '#ea580c', textColor: '#ffffff' },
      { id: 'satire', text: 'Satire', bgColor: '#6b21a8', textColor: '#ffffff' },
      { id: 'shitpost', text: 'Shitpost', bgColor: '#4a4a4a', textColor: '#ffffff' },
      { id: 'oc', text: 'Original Content', bgColor: '#166534', textColor: '#ffffff' },
    ],
    memberCount: 7890,
    onlineCount: 523,
    createdAt: Date.now() - 120 * 86400000,
    moderators: ['VeritasAdmin', 'MemeLord'],
    nsfw: false,
    restricted: false,
  },
]


/* ── Seed Posts ────────────────────────────────────────────────── */

const now = Date.now()
const h = 3600000
const d = 86400000

export const SEED_POSTS: ForumPost[] = [
  {
    id: 'p001', communityId: 'israel-lobby', type: 'text',
    title: 'AIPAC spent $100M+ in 2024 election cycle — here\'s every recipient mapped',
    body: 'Using the FEC filing data and OpenSecrets records, I\'ve compiled the complete list of AIPAC-affiliated PAC contributions for the 2024 cycle. The top 20 recipients alone account for over $35M in direct and indirect spending.\n\nKey findings:\n- United Democracy Project (AIPAC super PAC) spent $42M on primaries alone\n- 98% of recipients voted YES on all Israel aid packages\n- Average contribution to top recipients: $1.2M\n\nSources: FEC.gov, OpenSecrets.org, ProPublica Campaign Finance API\n\nFull spreadsheet in comments.',
    author: 'FollowTheMoney', authorFlair: { text: 'Researcher', bgColor: '#166534', textColor: '#fff' },
    postFlair: { id: 'donation-trail', text: 'Donation Trail', bgColor: '#92400e', textColor: '#fff' },
    timestamp: now - 4 * h, upvotes: Array.from({length: 847}, (_, i) => `u${i}`), downvotes: Array.from({length: 23}, (_, i) => `d${i}`),
    commentCount: 156, pinned: true, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'follow-the-money', givenBy: 'user1', count: 5 },
      { awardId: 'verified-source', givenBy: 'user2', count: 3 },
      { awardId: 'deep-dive', givenBy: 'user3', count: 2 },
    ],
  },
  {
    id: 'p002', communityId: 'deep-state', type: 'text',
    title: 'New Epstein flight log analysis: 37 previously unidentified passengers matched to corporate executives',
    body: 'Cross-referencing the 2024 document release with FAA tail number registrations and corporate board membership records, I\'ve identified 37 passengers from the Lolita Express logs who were previously listed only by initials or first names.\n\n14 of these individuals currently sit on Fortune 500 boards. 8 have direct connections to political campaigns. 3 are currently serving in appointed government positions.\n\nFull methodology and source documents linked below. Every identification has been triple-verified against multiple independent records.\n\nSources: PACER court records, FAA registry, SEC Edgar filings, LinkedIn corporate profiles',
    author: 'DeepDigger', authorFlair: { text: 'Investigator', bgColor: '#991b1b', textColor: '#fff' },
    postFlair: { id: 'flight-logs', text: 'Flight Logs', bgColor: '#1e40af', textColor: '#fff' },
    timestamp: now - 8 * h, upvotes: Array.from({length: 1243}, (_, i) => `u${i}`), downvotes: Array.from({length: 45}, (_, i) => `d${i}`),
    commentCount: 289, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'whistleblower', givenBy: 'user1', count: 2 },
      { awardId: 'deep-dive', givenBy: 'user2', count: 7 },
      { awardId: 'gold-standard', givenBy: 'user3', count: 1 },
    ],
  },
  {
    id: 'p003', communityId: 'general', type: 'text',
    title: 'Chapter 24 just dropped — "The Federal Reserve: A Century of Private Control" — initial analysis thread',
    body: 'Chapter 24 is live. This one traces the Fed from its creation at Jekyll Island in 1910 through to modern quantitative easing and its impact on wealth inequality.\n\nStandout sections:\n- The original 1910 Jekyll Island attendees and their banking dynasties\n- How the Fed\'s dual mandate has consistently favored Wall Street over Main Street\n- $4.5T in QE assets and where that money actually went\n\nWhat stood out to you? Let\'s discuss.',
    author: 'TheTruthWatcher', authorFlair: { text: 'Moderator', bgColor: '#8B1A1A', textColor: '#fff' },
    postFlair: { id: 'discussion', text: 'Discussion', bgColor: '#1e40af', textColor: '#fff' },
    timestamp: now - 2 * h, upvotes: Array.from({length: 567}, (_, i) => `u${i}`), downvotes: Array.from({length: 12}, (_, i) => `d${i}`),
    commentCount: 98, pinned: true, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'truth-seeker', givenBy: 'user1', count: 4 },
    ],
  },
  {
    id: 'p004', communityId: 'power-profiles', type: 'text',
    title: 'Ted Cruz: $531K from AIPAC in 2024 alone — full donation history, voting record, and policy positions',
    body: 'Complete profile breakdown of Senator Ted Cruz (R-TX) and his relationship with the Israel lobby:\n\nDonation History (FEC verified):\n- 2024: $531,000 (AIPAC PAC + United Democracy Project)\n- 2022: $287,000\n- 2018: $445,000\n- Career total from pro-Israel PACs: $2.1M+\n\nKey Votes:\n- YES on every Israel aid package since 2013\n- Sponsored the Israel Anti-Boycott Act\n- Co-sponsored resolution condemning ICC arrest warrants for Israeli officials\n\nNotable quotes and policy positions in thread.\n\nSources: FEC.gov, congress.gov voting records, OpenSecrets',
    author: 'ProfileBuilder', authorFlair: { text: 'Analyst', bgColor: '#6b21a8', textColor: '#fff' },
    postFlair: { id: 'politician', text: 'Politician', bgColor: '#1e40af', textColor: '#fff' },
    timestamp: now - 12 * h, upvotes: Array.from({length: 934}, (_, i) => `u${i}`), downvotes: Array.from({length: 67}, (_, i) => `d${i}`),
    commentCount: 203, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'follow-the-money', givenBy: 'user1', count: 6 },
      { awardId: 'verified-source', givenBy: 'user2', count: 4 },
    ],
  },
  {
    id: 'p005', communityId: 'evidence-review', type: 'text',
    title: '[EVIDENCE TIER CHALLENGE] Reclassify Epstein-Gates meetings from "Circumstantial" to "Verified"',
    body: 'The current evidence tier for the Epstein-Gates connection is listed as "Circumstantial." I believe this should be upgraded to "Verified" based on:\n\n1. Bill Gates himself confirmed multiple meetings with Epstein in a 2019 WSJ interview\n2. Flight logs show Gates on Epstein\'s plane (Lolita Express) at least once\n3. Email records released via FOIA show Gates\' office scheduling meetings with Epstein as late as 2017\n4. New York Times investigation (Oct 2019) documented at least 6 meetings\n\nWhen the subject himself confirms it and multiple independent sources corroborate, "Circumstantial" is too low.\n\nSources: WSJ interview Oct 2019, NYT investigation Oct 12 2019, PACER flight logs, FOIA email records',
    author: 'SourceChecker', authorFlair: { text: 'Fact-Checker', bgColor: '#166534', textColor: '#fff' },
    postFlair: { id: 'verified', text: 'Verified', bgColor: '#166534', textColor: '#fff' },
    timestamp: now - 1 * d, upvotes: Array.from({length: 723}, (_, i) => `u${i}`), downvotes: Array.from({length: 34}, (_, i) => `d${i}`),
    commentCount: 167, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'truth-seeker', givenBy: 'user1', count: 8 },
      { awardId: 'verified-source', givenBy: 'user2', count: 5 },
    ],
  },
  {
    id: 'p006', communityId: 'israel-lobby', type: 'link',
    title: 'OpenSecrets just published 2024 AIPAC spending breakdown — $100.4M total',
    body: 'https://www.opensecrets.org/political-action-committees-pacs/american-israel-public-affairs-cmte/C00040998/summary/2024',
    author: 'MoneyTracker', postFlair: { id: 'fec-filing', text: 'FEC Filing', bgColor: '#166534', textColor: '#fff' },
    timestamp: now - 6 * h, upvotes: Array.from({length: 456}, (_, i) => `u${i}`), downvotes: Array.from({length: 8}, (_, i) => `d${i}`),
    commentCount: 78, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'follow-the-money', givenBy: 'user1', count: 3 },
    ],
  },
  {
    id: 'p007', communityId: 'memes', type: 'text',
    title: 'POV: You just read Chapter 17 and realized your entire understanding of the Federal Reserve was wrong',
    body: '🤯🤯🤯\n\nMe before Veritas: "The Fed is a government agency that stabilizes the economy"\nMe after Veritas: *stares at Jekyll Island attendee list*',
    author: 'RedPilled2024',
    postFlair: { id: 'meme', text: 'Meme', bgColor: '#ea580c', textColor: '#fff' },
    timestamp: now - 3 * h, upvotes: Array.from({length: 1567}, (_, i) => `u${i}`), downvotes: Array.from({length: 89}, (_, i) => `d${i}`),
    commentCount: 234, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'red-pill', givenBy: 'user1', count: 12 },
      { awardId: 'mind-blown', givenBy: 'user2', count: 4 },
    ],
  },
  {
    id: 'p008', communityId: 'whistleblowers', type: 'text',
    title: 'Comprehensive guide to whistleblower legal protections in 2024 — federal and state',
    body: 'Updated guide to legal protections available to whistleblowers in the United States.\n\nFederal Protections:\n- Whistleblower Protection Act (WPA) — covers federal employees\n- Dodd-Frank Act Section 922 — SEC whistleblower program (10-30% of sanctions over $1M)\n- False Claims Act (qui tam) — allows citizens to sue on behalf of government\n- Intelligence Community Whistleblower Protection Act — covers IC employees\n\nKey State Protections:\n- California Labor Code §1102.5 — one of the strongest state protections\n- New York Labor Law §740 — recently expanded in 2022\n\nAnonymous reporting channels and legal aid resources in the comments.\n\nDisclaimer: This is informational only, not legal advice. Consult an attorney for your specific situation.',
    author: 'SecureSource', authorFlair: { text: 'OPSEC Advisor', bgColor: '#064e3b', textColor: '#fff' },
    postFlair: { id: 'legal-resource', text: 'Legal Resource', bgColor: '#166534', textColor: '#fff' },
    timestamp: now - 2 * d, upvotes: Array.from({length: 432}, (_, i) => `u${i}`), downvotes: Array.from({length: 5}, (_, i) => `d${i}`),
    commentCount: 56, pinned: true, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'helpful', givenBy: 'user1', count: 9 },
    ],
  },
  {
    id: 'p009', communityId: 'media-outreach', type: 'text',
    title: 'Content Pack #12 is live — "The AIPAC Machine" — optimized graphics for every platform',
    body: 'New content pack ready for distribution.\n\nIncludes:\n- 15 Instagram carousel slides\n- 8 Twitter/X post graphics (1200x675)\n- 5 TikTok-optimized vertical videos (script + captions)\n- 3 YouTube thumbnail options\n- Full fact-check document with all sources\n\nEvery stat has been triple-verified against FEC records. Download from the Content Packs page.\n\nRemember: Always link back to the full chapter when sharing. Credit helps us grow.',
    author: 'MediaOps', authorFlair: { text: 'Content Team', bgColor: '#7c2d12', textColor: '#fff' },
    postFlair: { id: 'content-pack', text: 'Content Pack', bgColor: '#1e40af', textColor: '#fff' },
    timestamp: now - 5 * h, upvotes: Array.from({length: 345}, (_, i) => `u${i}`), downvotes: Array.from({length: 3}, (_, i) => `d${i}`),
    commentCount: 42, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [
      { awardId: 'based', givenBy: 'user1', count: 7 },
    ],
  },
  {
    id: 'p010', communityId: 'general', type: 'poll',
    title: 'Which upcoming chapter topic are you most interested in?',
    body: 'The editorial team is planning the next batch of chapters. Your input helps us prioritize.',
    author: 'VeritasAdmin', authorFlair: { text: 'Admin', bgColor: '#8B1A1A', textColor: '#fff' },
    postFlair: { id: 'meta', text: 'Meta', bgColor: '#6b21a8', textColor: '#fff' },
    timestamp: now - 1 * d, upvotes: Array.from({length: 678}, (_, i) => `u${i}`), downvotes: Array.from({length: 15}, (_, i) => `d${i}`),
    commentCount: 145, pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [],
    pollOptions: [
      { id: 'po1', text: 'Big Pharma & FDA revolving door', votes: Array.from({length: 234}, (_, i) => `u${i}`) },
      { id: 'po2', text: 'Media ownership consolidation', votes: Array.from({length: 189}, (_, i) => `u${i}`) },
      { id: 'po3', text: 'Private prison industry & lobbying', votes: Array.from({length: 156}, (_, i) => `u${i}`) },
      { id: 'po4', text: 'Tech censorship & government coordination', votes: Array.from({length: 312}, (_, i) => `u${i}`) },
      { id: 'po5', text: 'Military-industrial complex contracts', votes: Array.from({length: 198}, (_, i) => `u${i}`) },
    ],
  },
]


/* ── Seed Comments ────────────────────────────────────────────── */

export const SEED_COMMENTS: ForumComment[] = [
  {
    id: 'c001', postId: 'p001', parentId: null, author: 'DeepDigger',
    authorFlair: { text: 'Investigator', bgColor: '#991b1b', textColor: '#fff' },
    content: 'Outstanding work. I cross-referenced your top 20 list against the congressional voting records on HR.8034 (Israel Security Supplemental) and every single one voted YES within 48 hours of receiving their largest AIPAC contribution. The timing correlation is statistically significant.',
    timestamp: now - 3.5 * h, upvotes: Array.from({length: 234}, (_, i) => `u${i}`), downvotes: Array.from({length: 3}, (_, i) => `d${i}`),
    edited: false, deleted: false, removed: false, locked: false, awards: [{ awardId: 'verified-source', givenBy: 'user1', count: 2 }], saved: [],
  },
  {
    id: 'c002', postId: 'p001', parentId: 'c001', author: 'SourceChecker',
    authorFlair: { text: 'Fact-Checker', bgColor: '#166534', textColor: '#fff' },
    content: 'Can confirm. I pulled the FEC disbursement records independently and the numbers match. The timing pattern is even more striking when you look at the 30-day window before key votes — contributions spike 2-3x above baseline.',
    timestamp: now - 3 * h, upvotes: Array.from({length: 156}, (_, i) => `u${i}`), downvotes: Array.from({length: 1}, (_, i) => `d${i}`),
    edited: false, deleted: false, removed: false, locked: false, awards: [{ awardId: 'truth-seeker', givenBy: 'user1', count: 1 }], saved: [],
  },
  {
    id: 'c003', postId: 'p002', parentId: null, author: 'NetworkMapper',
    content: 'This is incredible work. Question: for the 3 currently serving in government positions, are they confirmed appointees or career civil servants? That distinction matters a lot for understanding the network\'s reach into the permanent bureaucracy.',
    timestamp: now - 7 * h, upvotes: Array.from({length: 89}, (_, i) => `u${i}`), downvotes: Array.from({length: 2}, (_, i) => `d${i}`),
    edited: false, deleted: false, removed: false, locked: false, awards: [], saved: [],
  },
  {
    id: 'c004', postId: 'p002', parentId: 'c003', author: 'DeepDigger',
    authorFlair: { text: 'Investigator', bgColor: '#991b1b', textColor: '#fff' },
    content: 'All three are political appointees, not career. Two were appointed in the current administration, one carries over from the previous. I\'m deliberately not naming them yet until I can verify through a second independent source — the identification method I used has a ~95% confidence level and I want 99%+ before publishing names of sitting officials.',
    timestamp: now - 6.5 * h, upvotes: Array.from({length: 312}, (_, i) => `u${i}`), downvotes: Array.from({length: 1}, (_, i) => `d${i}`),
    edited: false, deleted: false, removed: false, locked: false, awards: [{ awardId: 'based', givenBy: 'user1', count: 3 }], saved: [],
  },
  {
    id: 'c005', postId: 'p004', parentId: null, author: 'TexasVoter',
    content: 'I\'ve been tracking Cruz since 2018. The $445K he received that cycle came right before his vote on the Israel Anti-Boycott Act. He went from lukewarm on the bill to being its most vocal champion literally overnight. The FEC timestamps don\'t lie.',
    timestamp: now - 11 * h, upvotes: Array.from({length: 178}, (_, i) => `u${i}`), downvotes: Array.from({length: 12}, (_, i) => `d${i}`),
    edited: false, deleted: false, removed: false, locked: false, awards: [], saved: [],
  },
  {
    id: 'c006', postId: 'p005', parentId: null, author: 'TheTruthWatcher',
    authorFlair: { text: 'Moderator', bgColor: '#8B1A1A', textColor: '#fff' },
    content: 'Strong case. The editorial team has reviewed this evidence tier challenge. Given that: (1) the subject confirmed meetings on record, (2) flight logs provide independent corroboration, (3) FOIA emails confirm the timeline, and (4) multiple Pulitzer-winning publications investigated and confirmed — we\'re upgrading the Gates-Epstein connection to VERIFIED tier effective immediately. The Record will be updated in the next 24 hours.',
    timestamp: now - 20 * h, upvotes: Array.from({length: 567}, (_, i) => `u${i}`), downvotes: Array.from({length: 8}, (_, i) => `d${i}`),
    edited: false, deleted: false, removed: false, locked: false, awards: [{ awardId: 'gold-standard', givenBy: 'user1', count: 1 }], saved: [],
  },
]


/* ── Storage Keys ─────────────────────────────────────────────── */

const POSTS_KEY = 'veritas_forum_posts'
const COMMENTS_KEY = 'veritas_forum_comments'
const USERS_KEY = 'veritas_forum_users'
const REPORTS_KEY = 'veritas_forum_reports'
const MODLOG_KEY = 'veritas_forum_modlog'

/* ── Storage Helpers ──────────────────────────────────────────── */

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function saveToStorage<T>(key: string, data: T[]) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* full */ }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/* ── Post Operations ──────────────────────────────────────────── */

export function loadPosts(): ForumPost[] {
  return loadFromStorage(POSTS_KEY, SEED_POSTS)
}

export function savePosts(posts: ForumPost[]) {
  saveToStorage(POSTS_KEY, posts)
}

export function getPost(postId: string): ForumPost | undefined {
  return loadPosts().find(p => p.id === postId)
}

export function createPost(post: Omit<ForumPost, 'id' | 'timestamp' | 'upvotes' | 'downvotes' | 'commentCount' | 'pinned' | 'locked' | 'removed' | 'edited' | 'saved' | 'awards'>): ForumPost {
  const newPost: ForumPost = {
    ...post, id: generateId(), timestamp: Date.now(),
    upvotes: [], downvotes: [], commentCount: 0,
    pinned: false, locked: false, removed: false, edited: false, saved: [], awards: [],
  }
  const posts = loadPosts()
  posts.unshift(newPost)
  savePosts(posts)
  return newPost
}

export function votePost(postId: string, userId: string, direction: VoteDirection): ForumPost | undefined {
  const posts = loadPosts()
  const post = posts.find(p => p.id === postId)
  if (!post) return undefined
  post.upvotes = post.upvotes.filter(id => id !== userId)
  post.downvotes = post.downvotes.filter(id => id !== userId)
  if (direction === 'up') post.upvotes.push(userId)
  else if (direction === 'down') post.downvotes.push(userId)
  savePosts(posts)
  return post
}

export function toggleSavePost(postId: string, userId: string) {
  const posts = loadPosts()
  const post = posts.find(p => p.id === postId)
  if (!post) return
  if (post.saved.includes(userId)) post.saved = post.saved.filter(id => id !== userId)
  else post.saved.push(userId)
  savePosts(posts)
}

/* ── Comment Operations ───────────────────────────────────────── */

export function loadComments(postId?: string): ForumComment[] {
  const all = loadFromStorage(COMMENTS_KEY, SEED_COMMENTS)
  return postId ? all.filter(c => c.postId === postId) : all
}

export function saveComments(comments: ForumComment[]) {
  saveToStorage(COMMENTS_KEY, comments)
}

export function createComment(comment: Omit<ForumComment, 'id' | 'timestamp' | 'upvotes' | 'downvotes' | 'edited' | 'deleted' | 'removed' | 'locked' | 'awards' | 'saved'>): ForumComment {
  const newComment: ForumComment = {
    ...comment, id: generateId(), timestamp: Date.now(),
    upvotes: [], downvotes: [], edited: false, deleted: false, removed: false, locked: false, awards: [], saved: [],
  }
  const allComments = loadFromStorage<ForumComment>(COMMENTS_KEY, SEED_COMMENTS)
  allComments.push(newComment)
  saveToStorage(COMMENTS_KEY, allComments)
  // Increment post comment count
  const posts = loadPosts()
  const post = posts.find(p => p.id === comment.postId)
  if (post) { post.commentCount++; savePosts(posts) }
  return newComment
}

export function voteComment(commentId: string, userId: string, direction: VoteDirection) {
  const comments = loadFromStorage<ForumComment>(COMMENTS_KEY, SEED_COMMENTS)
  const comment = comments.find(c => c.id === commentId)
  if (!comment) return
  comment.upvotes = comment.upvotes.filter(id => id !== userId)
  comment.downvotes = comment.downvotes.filter(id => id !== userId)
  if (direction === 'up') comment.upvotes.push(userId)
  else if (direction === 'down') comment.downvotes.push(userId)
  saveToStorage(COMMENTS_KEY, comments)
}


/* ── Sorting Algorithms ───────────────────────────────────────── */

function hotScore(post: ForumPost): number {
  const score = post.upvotes.length - post.downvotes.length
  const order = Math.log10(Math.max(Math.abs(score), 1))
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0
  const seconds = (post.timestamp / 1000) - 1134028003 // Reddit epoch
  return sign * order + seconds / 45000
}

function controversyScore(post: ForumPost): number {
  const ups = post.upvotes.length
  const downs = post.downvotes.length
  const total = ups + downs
  if (total === 0) return 0
  const balance = Math.min(ups, downs) / Math.max(ups, downs, 1)
  return total * balance
}

export function sortPosts(posts: ForumPost[], mode: SortMode, timeframe: TopTimeframe = 'all'): ForumPost[] {
  let filtered = [...posts]
  if (mode === 'top') {
    const cutoff = {
      hour: now - 1 * h, day: now - 1 * d, week: now - 7 * d,
      month: now - 30 * d, year: now - 365 * d, all: 0,
    }[timeframe]
    filtered = filtered.filter(p => p.timestamp >= cutoff)
  }
  // Always put pinned posts first
  const pinned = filtered.filter(p => p.pinned)
  const unpinned = filtered.filter(p => !p.pinned)
  switch (mode) {
    case 'hot': unpinned.sort((a, b) => hotScore(b) - hotScore(a)); break
    case 'best': unpinned.sort((a, b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length)); break
    case 'new': unpinned.sort((a, b) => b.timestamp - a.timestamp); break
    case 'top': unpinned.sort((a, b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length)); break
    case 'controversial': unpinned.sort((a, b) => controversyScore(b) - controversyScore(a)); break
    case 'rising': unpinned.sort((a, b) => {
      const aAge = Math.max(1, (now - a.timestamp) / h)
      const bAge = Math.max(1, (now - b.timestamp) / h)
      return (b.upvotes.length / bAge) - (a.upvotes.length / aAge)
    }); break
  }
  return [...pinned, ...unpinned]
}

export function sortComments(comments: ForumComment[], mode: 'best' | 'new' | 'old' | 'controversial' | 'top'): ForumComment[] {
  const sorted = [...comments]
  switch (mode) {
    case 'best': return sorted.sort((a, b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length))
    case 'new': return sorted.sort((a, b) => b.timestamp - a.timestamp)
    case 'old': return sorted.sort((a, b) => a.timestamp - b.timestamp)
    case 'top': return sorted.sort((a, b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length))
    case 'controversial': return sorted.sort((a, b) => {
      const aTotal = a.upvotes.length + a.downvotes.length
      const bTotal = b.upvotes.length + b.downvotes.length
      const aBalance = aTotal ? Math.min(a.upvotes.length, a.downvotes.length) / Math.max(a.upvotes.length, a.downvotes.length, 1) : 0
      const bBalance = bTotal ? Math.min(b.upvotes.length, b.downvotes.length) / Math.max(b.upvotes.length, b.downvotes.length, 1) : 0
      return (bTotal * bBalance) - (aTotal * aBalance)
    })
  }
  return sorted
}

/* ── Report & Moderation ──────────────────────────────────────── */

export function submitReport(report: Omit<Report, 'id' | 'timestamp' | 'resolved'>): Report {
  const newReport: Report = { ...report, id: generateId(), timestamp: Date.now(), resolved: false }
  const reports = loadFromStorage<Report>(REPORTS_KEY, [])
  reports.push(newReport)
  saveToStorage(REPORTS_KEY, reports)
  return newReport
}

export function getReports(communityId?: string): Report[] {
  const reports = loadFromStorage<Report>(REPORTS_KEY, [])
  return communityId ? reports.filter(r => r.communityId === communityId) : reports
}

/* ── Utility ──────────────────────────────────────────────────── */

export function getScore(item: { upvotes: string[]; downvotes: string[] }): number {
  return item.upvotes.length - item.downvotes.length
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

export function getCommunity(id: string): Community | undefined {
  return COMMUNITIES.find(c => c.id === id)
}

export function getPostsForCommunity(communityId: string): ForumPost[] {
  return loadPosts().filter(p => p.communityId === communityId && !p.removed)
}

export function getAllPosts(): ForumPost[] {
  return loadPosts().filter(p => !p.removed)
}

export function searchPosts(query: string): ForumPost[] {
  const q = query.toLowerCase()
  return loadPosts().filter(p =>
    !p.removed && (
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    )
  )
}

export function searchCommunities(query: string): Community[] {
  const q = query.toLowerCase()
  return COMMUNITIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.displayName.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  )
}

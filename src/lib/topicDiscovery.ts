import { PROFILES, type PowerProfile, type ProfileCategory } from '../data/profileData'
import type { TopicHub } from '../data/topicHubs'

export interface TopicProfileMatch {
  profile: PowerProfile
  score: number
  matchedTerms: string[]
}

export interface TopicProfileStats {
  profileCount: number
  claimCount: number
  connectionCount: number
  donationCount: number
  donationVolume: number
  categoryBreakdown: Record<ProfileCategory, number>
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function buildProfileText(profile: PowerProfile) {
  return normalize(
    [
      profile.name,
      profile.title,
      profile.summary,
      profile.tags.join(' '),
      profile.career.join(' '),
      profile.connections.map((connection) => `${connection.name} ${connection.relationship} ${connection.evidence}`).join(' '),
      profile.sourcedClaims.map((claim) => `${claim.claim} ${claim.source}`).join(' '),
      profile.policyActions.map((action) => `${action.action} ${action.context}`).join(' '),
      profile.websites.map((website) => website.label).join(' '),
      profile.state || '',
      profile.party || '',
    ].join(' ')
  )
}

function buildProfileTagText(profile: PowerProfile) {
  return normalize(profile.tags.join(' '))
}

function getTopicTerms(topic: TopicHub) {
  return Array.from(
    new Set([topic.name, ...topic.aliases, ...topic.keywords].map(normalize).filter(Boolean))
  )
}

function compareMatches(a: TopicProfileMatch, b: TopicProfileMatch) {
  if (b.score !== a.score) return b.score - a.score
  if (b.profile.sourcedClaims.length !== a.profile.sourcedClaims.length) {
    return b.profile.sourcedClaims.length - a.profile.sourcedClaims.length
  }
  if (b.profile.connections.length !== a.profile.connections.length) {
    return b.profile.connections.length - a.profile.connections.length
  }
  return a.profile.name.localeCompare(b.profile.name)
}

export function getTopicProfileMatches(topic: TopicHub, profiles: PowerProfile[] = PROFILES): TopicProfileMatch[] {
  const terms = getTopicTerms(topic)

  return profiles
    .map((profile) => {
      const haystack = buildProfileText(profile)
      const tagText = buildProfileTagText(profile)
      let score = 0
      const matchedTerms = new Set<string>()

      for (const term of terms) {
        if (!term) continue
        let matched = false

        if (tagText.includes(term)) {
          score += 7
          matched = true
        }

        if (normalize(profile.name).includes(term) || normalize(profile.title).includes(term)) {
          score += 5
          matched = true
        }

        if (normalize(profile.summary).includes(term)) {
          score += 4
          matched = true
        }

        if (!matched && haystack.includes(term)) {
          score += 2
          matched = true
        }

        if (matched) {
          matchedTerms.add(term)
        }
      }

      return {
        profile,
        score,
        matchedTerms: Array.from(matchedTerms),
      }
    })
    .filter((match) => match.score > 0)
    .sort(compareMatches)
}

export function getProfilesForTopic(topic: TopicHub, limit?: number) {
  const matches = getTopicProfileMatches(topic)
  return typeof limit === 'number' ? matches.slice(0, limit).map((match) => match.profile) : matches.map((match) => match.profile)
}

export function getTopicProfileStats(topic: TopicHub): TopicProfileStats {
  const profiles = getProfilesForTopic(topic)

  return profiles.reduce<TopicProfileStats>(
    (stats, profile) => {
      stats.profileCount += 1
      stats.claimCount += profile.sourcedClaims.length
      stats.connectionCount += profile.connections.length
      stats.donationCount += profile.donations.length
      stats.donationVolume += profile.donations.reduce((sum, donation) => sum + donation.amount, 0)
      stats.categoryBreakdown[profile.category] += 1
      return stats
    },
    {
      profileCount: 0,
      claimCount: 0,
      connectionCount: 0,
      donationCount: 0,
      donationVolume: 0,
      categoryBreakdown: {
        politician: 0,
        billionaire: 0,
        lobbyist: 0,
        intel: 0,
        media: 0,
        corporate: 0,
        'foreign-agent': 0,
      },
    }
  )
}

export function formatCompactDollars(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`
  return `$${amount.toLocaleString()}`
}

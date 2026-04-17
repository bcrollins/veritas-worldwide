import { allArticles, type Article } from '../data/articles'
import { chapterMeta, type ChapterMetadata } from '../data/chapterMeta'
import type { PowerProfile } from '../data/profileData'
import { topicHubs, type TopicHub } from '../data/topicHubs'

interface MatchResult<T> {
  item: T
  score: number
  matchedTerms: string[]
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function uniqueTerms(values: string[]) {
  return Array.from(new Set(values.map(normalize).filter((value) => value.length >= 3)))
}

function buildProfileTerms(profile: PowerProfile) {
  return uniqueTerms([
    profile.name,
    profile.title,
    profile.summary,
    ...(profile.tags || []),
    ...(profile.connections || []).map((connection) => connection.name),
    ...(profile.connections || []).map((connection) => connection.relationship),
    ...(profile.policyActions || []).map((action) => action.action),
    ...(profile.policyActions || []).map((action) => action.context),
    ...(profile.sourcedClaims || []).map((claim) => claim.claim),
    ...(profile.websites || []).map((website) => website.label),
    profile.state || '',
    profile.party || '',
  ])
}

function scoreMatch(haystack: string, terms: string[]) {
  let score = 0
  const matchedTerms = new Set<string>()

  for (const term of terms) {
    if (!term || !haystack.includes(term)) continue

    matchedTerms.add(term)

    if (term.split(' ').length >= 3) {
      score += 6
    } else if (term.split(' ').length === 2) {
      score += 4
    } else {
      score += 2
    }
  }

  return {
    score,
    matchedTerms: Array.from(matchedTerms),
  }
}

function compareMatches<T>(a: MatchResult<T>, b: MatchResult<T>) {
  if (b.score !== a.score) return b.score - a.score
  return b.matchedTerms.length - a.matchedTerms.length
}

export function getTopicsForProfile(profile: PowerProfile, limit = 3) {
  const profileTerms = buildProfileTerms(profile)

  return topicHubs
    .map((topic) => {
      const haystack = normalize(
        [topic.name, topic.headline, topic.description, ...topic.aliases, ...topic.keywords].join(' ')
      )
      const { score, matchedTerms } = scoreMatch(haystack, profileTerms)

      return {
        item: topic,
        score,
        matchedTerms,
      }
    })
    .filter((match) => match.score > 0)
    .sort(compareMatches)
    .slice(0, limit)
    .map((match) => ({
      topic: match.item,
      matchedTerms: match.matchedTerms.slice(0, 3),
    }))
}

export function getArticlesForProfile(profile: PowerProfile, limit = 3) {
  const profileTerms = buildProfileTerms(profile)

  return allArticles
    .map((article) => {
      const haystack = normalize(
        [article.title, article.subtitle, article.category, ...article.tags, ...article.sources.map((source) => source.publisher)].join(' ')
      )
      const { score, matchedTerms } = scoreMatch(haystack, profileTerms)

      return {
        item: article,
        score,
        matchedTerms,
      }
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => {
      const base = compareMatches(a, b)
      if (base !== 0) return base
      return b.item.sources.length - a.item.sources.length
    })
    .slice(0, limit)
    .map((match) => ({
      article: match.item,
      matchedTerms: match.matchedTerms.slice(0, 3),
    }))
}

export function getChaptersForProfile(profile: PowerProfile, limit = 3) {
  const profileTerms = buildProfileTerms(profile)

  return chapterMeta
    .map((chapter) => {
      const haystack = normalize([chapter.number, chapter.title, chapter.subtitle, ...chapter.keywords].join(' '))
      const { score, matchedTerms } = scoreMatch(haystack, profileTerms)

      return {
        item: chapter,
        score,
        matchedTerms,
      }
    })
    .filter((match) => match.score > 0)
    .sort(compareMatches)
    .slice(0, limit)
    .map((match) => ({
      chapter: match.item,
      matchedTerms: match.matchedTerms.slice(0, 3),
    }))
}

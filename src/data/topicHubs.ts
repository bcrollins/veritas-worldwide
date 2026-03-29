import topicHubData from './topicHubs.json'
import { allArticles } from './articles'
import { chapterMeta } from './chapterMeta'

export interface TopicHubFaq {
  question: string
  answer: string
}

export interface TopicHub {
  slug: string
  name: string
  eyebrow: string
  headline: string
  description: string
  metaDescription: string
  aliases: string[]
  keywords: string[]
  featuredChapterIds: string[]
  featuredArticleSlugs: string[]
  faq: TopicHubFaq[]
  subscribeHeading: string
  subscribeSubtext: string
}

export const topicHubs = topicHubData as TopicHub[]

const topicHubBySlug = new Map(topicHubs.map((topic) => [topic.slug, topic]))

const aliasToTopicSlug = new Map<string, string>()

for (const topic of topicHubs) {
  const terms = new Set([topic.name, ...topic.aliases, ...topic.keywords])
  for (const term of terms) {
    aliasToTopicSlug.set(normalizeTopicTerm(term), topic.slug)
  }
}

function normalizeTopicTerm(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function getTopicHubBySlug(slug: string): TopicHub | undefined {
  return topicHubBySlug.get(slug)
}

export function getTopicHubByKeyword(term: string): TopicHub | undefined {
  const normalized = normalizeTopicTerm(term)
  const exactMatch = aliasToTopicSlug.get(normalized)
  if (exactMatch) {
    return topicHubBySlug.get(exactMatch)
  }

  for (const [alias, slug] of aliasToTopicSlug.entries()) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return topicHubBySlug.get(slug)
    }
  }

  return undefined
}

export function getTopicHrefForTerm(term: string): string {
  const topic = getTopicHubByKeyword(term)
  return topic ? `/topics/${topic.slug}` : `/search?q=${encodeURIComponent(term)}`
}

export function getTopicChapters(topic: TopicHub) {
  return topic.featuredChapterIds
    .map((chapterId) => chapterMeta.find((chapter) => chapter.id === chapterId))
    .filter((chapter): chapter is NonNullable<typeof chapter> => Boolean(chapter))
}

export function getTopicArticles(topic: TopicHub) {
  return topic.featuredArticleSlugs
    .map((slug) => allArticles.find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
}

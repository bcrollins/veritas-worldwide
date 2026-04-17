import { allArticles, CATEGORY_META, type Article, type ArticleCategory, type ArticleSource } from '../data/articles'
import { chapterMeta } from '../data/chapterMeta'

export interface NewsDeskStats {
  totalArticles: number
  totalSources: number
  totalRelatedChapters: number
  uniqueTags: number
  averageReadingTime: number
}

export interface NewsCategorySummary {
  category: ArticleCategory
  label: string
  articleCount: number
  sourceCount: number
  relatedChapterCount: number
  averageReadingTime: number
  leadArticle: Article | null
  topTags: string[]
}

export interface NewsChapterCorridor {
  chapterId: string
  chapterNumber: string
  chapterTitle: string
  articleCount: number
  sourceCount: number
  averageReadingTime: number
  articles: Article[]
}

export interface NewsSourceBreakdown {
  primary: number
  government: number
  journalism: number
  academic: number
}

function roundAverage(total: number, count: number) {
  return count === 0 ? 0 : Math.round(total / count)
}

export function formatCompactCount(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toLocaleString()
}

export function getNewsDeskStats(items: Article[] = allArticles): NewsDeskStats {
  const totalSources = items.reduce((sum, article) => sum + article.sources.length, 0)
  const uniqueRelatedChapters = new Set(items.flatMap((article) => article.relatedChapters))
  const uniqueTags = new Set(items.flatMap((article) => article.tags.map((tag) => tag.toLowerCase())))
  const totalReadingTime = items.reduce((sum, article) => sum + article.readingTime, 0)

  return {
    totalArticles: items.length,
    totalSources,
    totalRelatedChapters: uniqueRelatedChapters.size,
    uniqueTags: uniqueTags.size,
    averageReadingTime: roundAverage(totalReadingTime, items.length),
  }
}

export function getTopNewsTags(limit = 8, items: Article[] = allArticles) {
  const counts = new Map<string, number>()

  for (const article of items) {
    for (const tag of article.tags) {
      const normalized = tag.trim()
      if (!normalized) continue
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]
      return a[0].localeCompare(b[0])
    })
    .slice(0, limit)
    .map(([tag]) => tag)
}

export function getSourceTypeBreakdown(items: Article[] = allArticles): NewsSourceBreakdown {
  return items.reduce<NewsSourceBreakdown>(
    (breakdown, article) => {
      for (const source of article.sources) {
        breakdown[source.type] += 1
      }
      return breakdown
    },
    {
      primary: 0,
      government: 0,
      journalism: 0,
      academic: 0,
    }
  )
}

export function getNewsCategorySummaries(items: Article[] = allArticles): NewsCategorySummary[] {
  const categories = Object.keys(CATEGORY_META) as ArticleCategory[]

  return categories.map((category) => {
    const categoryArticles = items.filter((article) => article.category === category)
    const sourceCount = categoryArticles.reduce((sum, article) => sum + article.sources.length, 0)
    const relatedChapterCount = new Set(categoryArticles.flatMap((article) => article.relatedChapters)).size
    const totalReadingTime = categoryArticles.reduce((sum, article) => sum + article.readingTime, 0)

    return {
      category,
      label: CATEGORY_META[category].label,
      articleCount: categoryArticles.length,
      sourceCount,
      relatedChapterCount,
      averageReadingTime: roundAverage(totalReadingTime, categoryArticles.length),
      leadArticle: categoryArticles[0] ?? null,
      topTags: getTopNewsTags(4, categoryArticles),
    }
  })
}

export function getNewsChapterCorridors(limit = 4, items: Article[] = allArticles): NewsChapterCorridor[] {
  const corridorMap = new Map<
    string,
    {
      articleCount: number
      sourceCount: number
      totalReadingTime: number
      articles: Article[]
    }
  >()

  for (const article of items) {
    for (const chapterId of new Set(article.relatedChapters)) {
      const current = corridorMap.get(chapterId) ?? {
        articleCount: 0,
        sourceCount: 0,
        totalReadingTime: 0,
        articles: [],
      }

      current.articleCount += 1
      current.sourceCount += article.sources.length
      current.totalReadingTime += article.readingTime
      current.articles.push(article)

      corridorMap.set(chapterId, current)
    }
  }

  return Array.from(corridorMap.entries())
    .map(([chapterId, stats]) => {
      const chapter = chapterMeta.find((entry) => entry.id === chapterId)
      if (!chapter) return null

      return {
        chapterId,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        articleCount: stats.articleCount,
        sourceCount: stats.sourceCount,
        averageReadingTime: roundAverage(stats.totalReadingTime, stats.articleCount),
        articles: stats.articles.slice(0, 3),
      }
    })
    .filter((corridor): corridor is NewsChapterCorridor => Boolean(corridor))
    .sort((a, b) => {
      if (b.articleCount !== a.articleCount) return b.articleCount - a.articleCount
      if (b.sourceCount !== a.sourceCount) return b.sourceCount - a.sourceCount
      return a.chapterNumber.localeCompare(b.chapterNumber)
    })
    .slice(0, limit)
}

export function getArticleSourceBreakdown(article: Article) {
  return article.sources.reduce<Record<ArticleSource['type'], number>>(
    (breakdown, source) => {
      breakdown[source.type] += 1
      return breakdown
    },
    {
      primary: 0,
      government: 0,
      journalism: 0,
      academic: 0,
    }
  )
}

import { allArticles, type Article } from '../data/articles'
import { chapterMeta, type ChapterMetadata } from '../data/chapterMeta'

export interface ReaderOverviewStats {
  sectionCount: number
  datedSectionCount: number
  illustratedSectionCount: number
  keywordCount: number
  relatedArticleCount: number
}

export interface ReadingPath {
  id: string
  eyebrow: string
  title: string
  description: string
  chapterIds: string[]
  chapters: ChapterMetadata[]
  relatedArticleCount: number
  keywordSpine: string[]
}

const READING_PATH_DEFINITIONS = [
  {
    id: 'money-banking',
    eyebrow: 'Money and banking',
    title: 'Start with the architecture of financial power',
    description:
      'A fast path through the central-bank, reserve-currency, and financial-crisis chapters that frame the rest of the archive.',
    chapterIds: ['overview', 'chapter-1', 'chapter-2', 'chapter-3', 'chapter-10', 'chapter-12', 'chapter-13', 'chapter-25'],
  },
  {
    id: 'intel-secrecy',
    eyebrow: 'Intelligence and secrecy',
    title: 'Trace the covert-state thread',
    description:
      'A dossier-style route through the intelligence, assassination, media-influence, and surveillance chapters.',
    chapterIds: ['chapter-7', 'chapter-9', 'chapter-17', 'chapter-18', 'chapter-19', 'chapter-27', 'chapter-28'],
  },
  {
    id: 'lobbying-foreign-policy',
    eyebrow: 'Lobbying and foreign policy',
    title: 'Follow the lobbying and war-power record',
    description:
      'A focused path through the Israel, lobbying, aid, Liberty, and congressional influence material.',
    chapterIds: ['chapter-6', 'chapter-8', 'chapter-14', 'chapter-15', 'chapter-16'],
  },
  {
    id: 'health-social-control',
    eyebrow: 'Health and social control',
    title: 'Read the medical and social-control corridor',
    description:
      'An entry point into the medicine, vaccine, drugs, fluoride, and chronic-disease sections of the archive.',
    chapterIds: ['chapter-20', 'chapter-21', 'chapter-23', 'chapter-24'],
  },
]

export function getReaderOverviewStats(): ReaderOverviewStats {
  const keywordCount = new Set(chapterMeta.flatMap((chapter) => chapter.keywords.map((keyword) => keyword.toLowerCase())))

  return {
    sectionCount: chapterMeta.length,
    datedSectionCount: chapterMeta.filter((chapter) => chapter.dateRange && chapter.dateRange !== 'Explainer').length,
    illustratedSectionCount: chapterMeta.filter((chapter) => Boolean(chapter.heroImage)).length,
    keywordCount: keywordCount.size,
    relatedArticleCount: allArticles.length,
  }
}

export function getRelatedArticlesForChapter(chapterId: string, limit = 3): Article[] {
  return allArticles.filter((article) => article.relatedChapters.includes(chapterId)).slice(0, limit)
}

export function getReadingPaths(): ReadingPath[] {
  return READING_PATH_DEFINITIONS.map((definition) => {
    const chapters = definition.chapterIds
      .map((chapterId) => chapterMeta.find((chapter) => chapter.id === chapterId))
      .filter((chapter): chapter is ChapterMetadata => Boolean(chapter))
    const relatedArticles = allArticles.filter((article) =>
      article.relatedChapters.some((chapterId) => definition.chapterIds.includes(chapterId))
    )
    const keywordSpine = Array.from(
      new Set(chapters.flatMap((chapter) => chapter.keywords.map((keyword) => keyword.toLowerCase())))
    ).slice(0, 6)

    return {
      ...definition,
      chapters,
      relatedArticleCount: relatedArticles.length,
      keywordSpine,
    }
  })
}

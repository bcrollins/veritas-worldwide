import { chapterMeta } from './chapterMeta'
import type {
  Chapter,
  ContentBlock,
  EvidenceBox,
  ImageData,
  Quote,
  Source,
  StatCard,
  TableData,
  TimelineEvent,
} from './chapterTypes'

import chapter1 from './chapters/chapter-1'
import chapter10 from './chapters/chapter-10'
import chapter11 from './chapters/chapter-11'
import chapter12 from './chapters/chapter-12'
import chapter13 from './chapters/chapter-13'
import chapter14 from './chapters/chapter-14'
import chapter15 from './chapters/chapter-15'
import chapter16 from './chapters/chapter-16'
import chapter17 from './chapters/chapter-17'
import chapter18 from './chapters/chapter-18'
import chapter19 from './chapters/chapter-19'
import chapter2 from './chapters/chapter-2'
import chapter20 from './chapters/chapter-20'
import chapter21 from './chapters/chapter-21'
import chapter22 from './chapters/chapter-22'
import chapter23 from './chapters/chapter-23'
import chapter24 from './chapters/chapter-24'
import chapter25 from './chapters/chapter-25'
import chapter26 from './chapters/chapter-26'
import chapter27 from './chapters/chapter-27'
import chapter28 from './chapters/chapter-28'
import chapter3 from './chapters/chapter-3'
import chapter4 from './chapters/chapter-4'
import chapter5 from './chapters/chapter-5'
import chapter6 from './chapters/chapter-6'
import chapter7 from './chapters/chapter-7'
import chapter8 from './chapters/chapter-8'
import chapter9 from './chapters/chapter-9'
import epilogue from './chapters/epilogue'
import foreword from './chapters/foreword'
import overview from './chapters/overview'

export type {
  Chapter,
  ContentBlock,
  EvidenceBox,
  ImageData,
  Quote,
  Source,
  StatCard,
  TableData,
  TimelineEvent,
}

export { chapterMeta } from './chapterMeta'

const chapterMap: Record<string, Chapter> = {
  foreword,
  overview,
  'chapter-1': chapter1,
  'chapter-2': chapter2,
  'chapter-3': chapter3,
  'chapter-4': chapter4,
  'chapter-5': chapter5,
  'chapter-6': chapter6,
  'chapter-7': chapter7,
  'chapter-8': chapter8,
  'chapter-9': chapter9,
  'chapter-10': chapter10,
  'chapter-11': chapter11,
  'chapter-12': chapter12,
  'chapter-13': chapter13,
  'chapter-14': chapter14,
  'chapter-15': chapter15,
  'chapter-16': chapter16,
  'chapter-17': chapter17,
  'chapter-18': chapter18,
  'chapter-19': chapter19,
  'chapter-20': chapter20,
  'chapter-21': chapter21,
  'chapter-22': chapter22,
  'chapter-23': chapter23,
  'chapter-24': chapter24,
  'chapter-25': chapter25,
  'chapter-26': chapter26,
  'chapter-27': chapter27,
  'chapter-28': chapter28,
  epilogue,
}

// Keep this file as the stable bootstrap/search entrypoint while sourcing
// chapter bodies from the runtime modules used by generation and delivery.
export const chapters: Chapter[] = chapterMeta.map(({ id }) => {
  const chapter = chapterMap[id]

  if (!chapter) {
    throw new Error(`[chapters] Missing runtime chapter module for ${id}`)
  }

  return chapter
})

export function searchChapters(query: string): Chapter[] {
  if (!query.trim()) return []

  const terms = query.toLowerCase().split(/\s+/)

  return chapters
    .filter((chapter) => {
      const searchable = [
        chapter.title,
        chapter.subtitle,
        chapter.dateRange,
        ...chapter.keywords,
        ...chapter.content.map(
          (block) => block.text || block.quote?.text || block.evidence?.text || ''
        ),
        ...chapter.sources.map((source) => source.text),
      ]
        .join(' ')
        .toLowerCase()

      return terms.every((term) => searchable.includes(term))
    })
    .sort((left, right) => {
      const leftMatches = terms.filter((term) =>
        left.keywords.join(' ').toLowerCase().includes(term)
      ).length
      const rightMatches = terms.filter((term) =>
        right.keywords.join(' ').toLowerCase().includes(term)
      ).length

      return rightMatches - leftMatches
    })
}

export default chapters

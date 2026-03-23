import type { Chapter } from '../data/chapters'

export function estimateReadingTime(chapter: Chapter): number {
  let wordCount = 0
  for (const block of chapter.content) {
    const text = block.text || block.quote?.text || block.evidence?.text || ''
    wordCount += text.split(/\s+/).filter(Boolean).length
  }
  return Math.max(1, Math.ceil(wordCount / 238))
}

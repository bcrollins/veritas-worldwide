import type { Chapter, EvidenceCounts, LoadedChapter } from '../data/chapterTypes'

function emptyEvidenceCounts(): EvidenceCounts {
  return {
    verified: 0,
    circumstantial: 0,
    disputed: 0,
  }
}

function normalizeEvidenceCounts(counts?: Partial<EvidenceCounts> | null): EvidenceCounts {
  return {
    verified: typeof counts?.verified === 'number' ? counts.verified : 0,
    circumstantial: typeof counts?.circumstantial === 'number' ? counts.circumstantial : 0,
    disputed: typeof counts?.disputed === 'number' ? counts.disputed : 0,
  }
}

export function getEvidenceCounts(
  chapter: Pick<Chapter | LoadedChapter, 'content' | 'evidenceCounts'> | null | undefined,
): EvidenceCounts {
  if (!chapter) return emptyEvidenceCounts()
  if (chapter.evidenceCounts) return normalizeEvidenceCounts(chapter.evidenceCounts)

  const counts = emptyEvidenceCounts()

  for (const block of chapter.content) {
    if (block.type === 'evidence' && block.evidence) {
      counts[block.evidence.tier] += 1
    }
  }

  return counts
}

export function hasInterpretiveEvidence(counts: EvidenceCounts) {
  return counts.circumstantial > 0 || counts.disputed > 0
}

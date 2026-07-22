/**
 * Print-quality drop cap paragraph.
 *
 * Uses an explicit floated letter span rather than CSS `::first-letter`,
 * which is unreliable with variable article font sizes, Tailwind utilities,
 * and certain web fonts (letter overlaps following lines).
 */
import type { CSSProperties } from 'react'

interface DropCapParagraphProps {
  text: string
  className?: string
  style?: CSSProperties
  /** Optional test id for Playwright / visual gates */
  'data-testid'?: string
}

function splitDropCap(text: string): { letter: string; rest: string } {
  const trimmed = text.replace(/^\s+/, '')
  if (!trimmed) return { letter: '', rest: '' }

  // Preserve leading open-quotes with the drop letter for classic typography.
  const openQuotes = new Set(['"', "'", '\u201C', '\u2018', '\u00AB', '\u201E'])
  let i = 0
  let open = ''
  if (openQuotes.has(trimmed[0])) {
    open = trimmed[0]
    i = 1
  }
  if (i >= trimmed.length) return { letter: open || trimmed[0], rest: trimmed.slice(1) }
  const letter = open + trimmed[i]
  return { letter, rest: trimmed.slice(i + 1) }
}

export default function DropCapParagraph({
  text,
  className = '',
  style,
  'data-testid': testId,
}: DropCapParagraphProps) {
  const { letter, rest } = splitDropCap(text)

  if (!letter) {
    return (
      <p className={`drop-cap-paragraph article-body mb-6 ${className}`.trim()} style={style} data-testid={testId}>
        {text}
      </p>
    )
  }

  return (
    <p
      className={`drop-cap-paragraph article-body mb-6 ${className}`.trim()}
      style={style}
      data-testid={testId}
    >
      <span className="drop-cap-letter" data-drop-cap-letter>
        {letter}
      </span>
      {rest}
    </p>
  )
}

export { splitDropCap }

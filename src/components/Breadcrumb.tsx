import { Link } from 'react-router-dom'
import type { Chapter } from '../data/chapterTypes'

export default function Breadcrumb({ chapter }: { chapter: Chapter }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 no-print">
      <ol className="flex items-center gap-1.5 font-sans text-xs text-ink-faint">
        <li>
          <Link to="/" className="inline-flex min-h-[44px] items-center hover:text-crimson transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2">The Record</Link>
        </li>
        <li aria-hidden="true" className="text-ink-faint/50">/</li>
        <li>
          <span className="text-ink-muted font-medium truncate max-w-[200px] inline-block align-bottom">{chapter.title}</span>
        </li>
      </ol>
    </nav>
  )
}

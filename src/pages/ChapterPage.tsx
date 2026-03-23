import { useParams, Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import type { ContentBlock, Chapter } from '../data/chapters'

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'dropcap':
      return (
        <p className="article-body drop-cap mb-6">
          {block.text}
        </p>
      )

    case 'text':
      return (
        <p className="article-body mb-6">
          {block.text}
        </p>
      )

    case 'heading':
      return (
        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mt-12 mb-4">
          {block.text}
        </h2>
      )

    case 'subheading':
      return (
        <h3 className="font-display text-xl md:text-2xl font-bold text-ink mt-8 mb-3">
          {block.text}
        </h3>
      )

    case 'quote':
      if (!block.quote) return null
      return (
        <blockquote className="pullquote">
          &ldquo;{block.quote.text}&rdquo;
          <div className="pullquote-attribution">
            &mdash; {block.quote.attribution}
            {block.quote.note && (
              <span className="block font-normal text-ink-faint mt-1">{block.quote.note}</span>
            )}
          </div>
        </blockquote>
      )

    case 'evidence':
      if (!block.evidence) return null
      const tierClass = `evidence-${block.evidence.tier}`
      const tierColors: Record<string, string> = {
        verified: 'text-verified',
        circumstantial: 'text-circumstantial',
        disputed: 'text-disputed',
      }
      return (
        <div className={tierClass}>
          <p className={`evidence-label ${tierColors[block.evidence.tier] || ''}`}>
            {block.evidence.label}
          </p>
          <p className="font-body text-sm leading-relaxed text-ink-light">
            {block.evidence.text}
          </p>
        </div>
      )

    case 'stats':
      if (!block.stats) return null
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
          {block.stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      )

    case 'table':
      if (!block.table) return null
      return (
        <div className="overflow-x-auto my-8">
          {block.table.caption && (
            <p className="font-sans text-xs font-bold tracking-[0.08em] uppercase text-ink-muted mb-3">
              {block.table.caption}
            </p>
          )}
          <table className="data-table">
            <thead>
              <tr>
                {block.table.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'timeline':
      if (!block.timeline) return null
      return (
        <div className="my-8">
          {block.timeline.map((event, i) => (
            <div key={i} className="timeline-item">
              <span className="timeline-year">{event.year}</span>
              <p className="font-body text-sm text-ink-light leading-relaxed">{event.text}</p>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

function ChapterNav({ current }: { current: Chapter }) {
  const idx = chapters.findIndex(c => c.id === current.id)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  return (
    <div className="border-t border-border mt-16 pt-8">
      <div className="grid md:grid-cols-2 gap-6">
        {prev && (
          <Link to={`/chapter/${prev.id}`} className="group p-4 border border-border rounded-sm hover:border-crimson transition-colors">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1">&larr; Previous</p>
            <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors">{prev.title}</p>
            <p className="font-sans text-xs text-ink-muted mt-1">{prev.number}</p>
          </Link>
        )}
        {next && (
          <Link to={`/chapter/${next.id}`} className="group p-4 border border-border rounded-sm hover:border-crimson transition-colors md:text-right md:ml-auto">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1">Next &rarr;</p>
            <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors">{next.title}</p>
            <p className="font-sans text-xs text-ink-muted mt-1">{next.number}</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>()
  const chapter = chapters.find(ch => ch.id === id)

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-ink mb-4">Chapter Not Found</h1>
        <p className="font-body text-lg text-ink-muted mb-8">The chapter you're looking for doesn't exist.</p>
        <Link to="/" className="font-sans text-sm font-semibold text-crimson hover:text-crimson-dark">
          &larr; Return to The Record
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Chapter Header */}
      <header className="mb-12 border-b border-border pb-10">
        <p className="chapter-label mb-4">{chapter.number}</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          {chapter.title}
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed mb-6">
          {chapter.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-sans text-xs text-ink-faint">By {chapter.author}</span>
          <span className="font-sans text-xs text-ink-faint">{chapter.publishDate}</span>
          {chapter.dateRange && (
            <span className="font-sans text-xs font-semibold text-crimson px-2 py-1 bg-crimson/5 rounded-sm">
              {chapter.dateRange}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="mb-12">
        {chapter.content.map((block, idx) => (
          <ContentBlockRenderer key={idx} block={block} />
        ))}
      </div>

      {/* Sources */}
      {chapter.sources.length > 0 && (
        <section className="border-t border-border pt-8 mb-12">
          <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6">
            Sources &amp; References
          </h3>
          <ol className="space-y-3">
            {chapter.sources.map(source => (
              <li key={source.id} className="font-sans text-sm text-ink-muted leading-relaxed flex gap-3">
                <span className="font-bold text-crimson shrink-0">[{source.id}]</span>
                <span>
                  {source.text}
                  {source.url && (
                    <>
                      {' '}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-crimson hover:text-crimson-dark underline underline-offset-2"
                      >
                        View Source &rarr;
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Keywords */}
      {chapter.keywords.length > 0 && (
        <section className="border-t border-border pt-8 mb-12">
          <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
            Topics &amp; Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {chapter.keywords.map(kw => (
              <Link
                key={kw}
                to={`/search?q=${encodeURIComponent(kw)}`}
                className="font-sans text-xs px-3 py-1.5 bg-parchment-dark text-ink-muted rounded-sm hover:text-crimson hover:bg-crimson/5 transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Cross-Links */}
      {chapter.crossLinks.length > 0 && (
        <section className="border-t border-border pt-8 mb-8">
          <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
            Related Chapters
          </h3>
          <div className="grid gap-3">
            {chapter.crossLinks.map(link => (
              <Link
                key={link.chapterId}
                to={`/chapter/${link.chapterId}`}
                className="group flex items-center gap-3 p-3 border border-border rounded-sm hover:border-crimson transition-colors"
              >
                <span className="font-sans text-crimson font-bold text-sm">&rarr;</span>
                <span className="font-sans text-sm text-ink group-hover:text-crimson transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Chapter Navigation */}
      <ChapterNav current={chapter} />
    </article>
  )
}

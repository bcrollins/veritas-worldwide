import { useState, useRef, useEffect } from 'react'
import type { Chapter } from '../data/chapterTypes'

type Format = 'apa' | 'mla' | 'chicago' | 'bibtex'

function generateCitation(chapter: Chapter, format: Format): string {
  const author = 'Veritas Press'
  const authorFull = 'Veritas Press'
  const year = '2026'
  const title = chapter.title
  const pubTitle = 'The Record — A Documentary History of Power, Money, and the Institutions That Shaped the Modern World'
  const publisher = 'Veritas Press'
  const url = `https://veritasworldwide.com/chapter/${chapter.id}`
  const accessed = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const chapterNum = chapter.number

  switch (format) {
    case 'apa':
      return `${author} (${year}). ${title}. In ${pubTitle} (${chapterNum}). ${publisher}. ${url}`
    case 'mla':
      return `Veritas Press. "${title}." ${pubTitle}, ${publisher}, ${year}, ${url}. Accessed ${accessed}.`
    case 'chicago':
      return `Veritas Press. "${title}." In ${pubTitle}. ${publisher}, ${year}. ${url}.`
    case 'bibtex':
      return `@incollection{rollins${year}${chapter.id.replace(/[^a-z0-9]/g, '')},
  author    = {${authorFull}},
  title     = {${title}},
  booktitle = {${pubTitle}},
  publisher = {${publisher}},
  year      = {${year}},
  chapter   = {${chapterNum}},
  url       = {${url}}
}`
    default:
      return ''
  }
}

const FORMAT_LABELS: Record<Format, string> = {
  apa: 'APA 7th',
  mla: 'MLA 9th',
  chicago: 'Chicago 17th',
  bibtex: 'BibTeX',
}

export default function CitationGenerator({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState<Format>('apa')
  const [copied, setCopied] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  const citation = generateCitation(chapter, format)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  return (
    <div ref={panelRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
        Cite
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface border border-border rounded-sm shadow-xl z-50 p-4">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">
            Cite This Chapter
          </p>

          {/* Format selector */}
          <div className="flex gap-1 mb-3" role="radiogroup" aria-label="Citation format">
            {(Object.keys(FORMAT_LABELS) as Format[]).map(f => (
              <button
                key={f}
                onClick={() => { setFormat(f); setCopied(false) }}
                className={`font-sans text-[0.6rem] font-semibold tracking-[0.08em] uppercase px-2.5 py-1.5 rounded-sm transition-colors ${
                  format === f
                    ? 'bg-crimson text-white'
                    : 'bg-parchment-dark text-ink-muted hover:text-ink'
                }`}
                role="radio"
                aria-checked={format === f}
              >
                {FORMAT_LABELS[f]}
              </button>
            ))}
          </div>

          {/* Citation text */}
          <div className={`p-3 rounded-sm text-sm leading-relaxed border ${
            format === 'bibtex'
              ? 'font-mono text-xs bg-ink text-parchment border-border-dark whitespace-pre'
              : 'font-body bg-parchment border-border'
          }`}>
            {citation}
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`mt-3 w-full font-sans text-xs font-semibold tracking-[0.08em] uppercase py-2.5 rounded-sm transition-all ${
              copied
                ? 'bg-verified text-white'
                : 'bg-crimson text-white hover:bg-crimson-dark'
            }`}
          >
            {copied ? '✓ Copied to Clipboard' : 'Copy Citation'}
          </button>
        </div>
      )}
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCHOLARLY_TIERS, type ScholarlyEvidenceTier } from '../data/evidenceTiers'

type CorpusHit = {
  kind: 'roc' | 'israel'
  id: string
  title: string
  tier?: string
  href: string
  snippet: string
}

/**
 * Client-side cross-corpus search over ROC + Israel machine corpora.
 * Lazy-loads JSON only when the researcher expands the panel.
 */
export default function CorpusSearchPanel({ seedQuery = '' }: { seedQuery?: string }) {
  const [open, setOpen] = useState(Boolean(seedQuery.trim()))
  const [q, setQ] = useState(seedQuery)
  const [kindFilter, setKindFilter] = useState<'all' | 'roc' | 'israel'>('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rocClaims, setRocClaims] = useState<
    Array<{ id: string; claim: string; tier: string; file?: string }>
  >([])
  const [israelIncidents, setIsraelIncidents] = useState<
    Array<{ id: string; title: string; summary?: string; tier?: string; date?: string }>
  >([])

  useEffect(() => {
    if (!open) return
    if (rocClaims.length && israelIncidents.length) return
    let cancelled = false
    setLoading(true)
    setError('')
    Promise.all([
      fetch('/record-of-jesus-christ/corpus.json').then((r) => {
        if (!r.ok) throw new Error(`ROC corpus HTTP ${r.status}`)
        return r.json()
      }),
      fetch('/israel-dossier/corpus.json').then((r) => {
        if (!r.ok) throw new Error(`Israel corpus HTTP ${r.status}`)
        return r.json()
      }),
    ])
      .then(([roc, israel]) => {
        if (cancelled) return
        setRocClaims(Array.isArray(roc?.claims) ? roc.claims : [])
        setIsraelIncidents(Array.isArray(israel?.incidents) ? israel.incidents : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load corpora')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [open, rocClaims.length, israelIncidents.length])

  useEffect(() => {
    if (seedQuery.trim()) {
      setQ(seedQuery)
      setOpen(true)
    }
  }, [seedQuery])

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (needle.length < 2) return [] as CorpusHit[]
    const out: CorpusHit[] = []
    if (kindFilter !== 'israel') for (const c of rocClaims) {
      const blob = `${c.id} ${c.claim} ${c.tier}`.toLowerCase()
      if (!blob.includes(needle)) continue
      out.push({
        kind: 'roc',
        id: c.id,
        title: c.claim,
        tier: c.tier,
        href: `/record-of-jesus-christ#${c.id}`,
        snippet: c.claim.slice(0, 180),
      })
      if (out.length >= 40) break
    }
    if (kindFilter !== 'roc' && out.length < 40) {
      for (const inc of israelIncidents) {
        const blob = `${inc.id} ${inc.title} ${inc.summary || ''} ${inc.tier || ''}`.toLowerCase()
        if (!blob.includes(needle)) continue
        out.push({
          kind: 'israel',
          id: inc.id,
          title: inc.title,
          tier: inc.tier,
          href: `/israel-dossier?incident=${encodeURIComponent(inc.id)}`,
          snippet: (inc.summary || inc.title).slice(0, 180),
        })
        if (out.filter((h) => h.kind === 'israel').length >= 20) break
      }
    }
    return out.slice(0, 40)
  }, [q, kindFilter, rocClaims, israelIncidents])

  return (
    <section
      className="mt-10 rounded-sm border border-border bg-surface p-5 sm:p-6"
      aria-labelledby="corpus-search-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.16em] text-crimson">
            Evidence corpora
          </p>
          <h2 id="corpus-search-heading" className="mt-1 font-display text-xl font-bold text-ink">
            Search ROC + Israel machine indexes
          </h2>
          <p className="mt-2 font-body text-sm text-ink-muted max-w-2xl leading-relaxed">
            Client-side only over public corpus.json files. Queries are not stored as researcher identity.
            Attribution: Veritas Worldwide.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-[44px] items-center rounded-sm border border-border px-4 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson hover:text-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2"
          aria-expanded={open}
        >
          {open ? 'Hide' : 'Open corpora search'}
        </button>
      </div>

      {open && (
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink-faint">
              Query (min 2 characters)
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2"
              placeholder="e.g. Pilate, hostages, Dead Sea Scrolls, white phosphorus"
              autoComplete="off"
              data-testid="corpus-search-input"
            />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter corpus type">
            {([
              { id: 'all' as const, label: 'All corpora' },
              { id: 'roc' as const, label: 'ROC only' },
              { id: 'israel' as const, label: 'Israel only' },
            ]).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setKindFilter(opt.id)}
                aria-pressed={kindFilter === opt.id}
                className={`inline-flex min-h-[44px] items-center rounded-sm border px-3 font-sans text-xs font-semibold ${
                  kindFilter === opt.id
                    ? 'border-crimson bg-crimson/5 text-crimson'
                    : 'border-border text-ink-muted hover:border-crimson'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          </label>
          {loading && <p className="font-body text-sm text-ink-muted">Loading corpora…</p>}
          {error && (
            <p className="font-body text-sm text-crimson" role="alert">
              {error}
            </p>
          )}
          {!loading && !error && q.trim().length >= 2 && (
            <p className="font-sans text-xs text-ink-faint" role="status">
              {hits.length} hit{hits.length === 1 ? '' : 's'}
            </p>
          )}
          <ul className="space-y-2">
            {hits.map((h) => (
              <li key={`${h.kind}-${h.id}`} className="rounded-sm border border-border bg-parchment/40 px-3 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex min-h-[28px] items-center rounded-sm border border-border px-2 font-sans text-[0.6rem] font-bold uppercase tracking-wider text-ink-muted">
                    {h.kind === 'roc' ? 'ROC claim' : 'Israel incident'}
                  </span>
                  {h.tier && (
                    <span className="font-sans text-[0.6rem] uppercase tracking-wider text-ink-faint">
                      {SCHOLARLY_TIERS[h.tier as ScholarlyEvidenceTier]?.shortLabel || h.tier}
                    </span>
                  )}
                </div>
                <Link to={h.href} className="mt-1 block font-display text-base font-bold text-ink hover:text-crimson">
                  {h.title}
                </Link>
                <p className="mt-1 font-body text-sm text-ink-muted leading-relaxed">{h.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

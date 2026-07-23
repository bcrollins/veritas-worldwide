import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'

const tools = [
  {
    to: '/researcher/timeline',
    title: 'Personal Timeline Builder',
    blurb:
      'Local-only chronology with scholarly evidence tiers and free tags. Never uploaded to Veritas servers. Pin claims and incidents from ROC and Israel Dossier.',
    privacy: 'localStorage only · noindex',
  },
  {
    to: '/search',
    title: 'Search + evidence corpora',
    blurb:
      'Chapter search plus client-side ROC claim and Israel incident corpus search (loads public JSON only).',
    privacy: 'public · search noindex policy',
  },
  {
    to: '/sources',
    title: 'Sources library',
    blurb: 'Browsable primary-source library for The Record with evidence-tier filters and one-tap primary-source open.',
    privacy: 'public · no account required',
  },
  {
    to: '/methodology',
    title: 'Methodology',
    blurb: 'Five-tier source hierarchy, Volume I three-tier labels, and seven-tier scholarly scale.',
    privacy: 'public',
  },
  {
    to: '/evidence-taxonomy.json',
    title: 'Evidence taxonomy (JSON)',
    blurb: 'Machine-readable scholarly + legacy tier definitions for external research tools.',
    privacy: 'public · entity publisher',
    external: true,
  },
  {
    to: '/record-of-jesus-christ',
    title: 'Record of Jesus Christ',
    blurb: 'Tier-labeled claim corpus with proofVsConcept filters, JSON/CSV/PDF export. Attribution: Veritas Worldwide only.',
    privacy: 'public corpus',
  },
  {
    to: '/record-of-jesus-christ/corpus.json',
    title: 'ROC machine corpus',
    blurb: 'JSON claim index with evidence tiers for retrieval systems.',
    privacy: 'public · entity publisher',
    external: true,
  },
  {
    to: '/israel-dossier',
    title: 'Israel Dossier',
    blurb:
      'Dual-sided multi-source incident workbench including visual-investigation rows, actors, money trail, and exportable corpus.',
    privacy: 'public corpus',
  },
  {
    to: '/israel-dossier/corpus.json',
    title: 'Israel machine corpus',
    blurb: 'JSON incidents, timeline, actors, and money-trail nodes for offline audit.',
    privacy: 'public · entity publisher',
    external: true,
  },
  {
    to: '/israel-dossier/briefing',
    title: 'Israel public briefing',
    blurb: 'Source-boundary briefing with open questions, confidence limits, and archive pins.',
    privacy: 'public',
  },
  {
    to: '/timeline',
    title: 'Public archive timeline',
    blurb: 'Publication chronology for The Record (not personal / not Integrity Score).',
    privacy: 'public',
  },
  {
    to: '/volume-ii',
    title: 'Volume II track (scaffold)',
    blurb: 'Multi-volume scaffold pointing at ROC and Bible history. noindex until full catalog ships.',
    privacy: 'noindex scaffold',
  },
  {
    to: '/bookmarks',
    title: 'Bookmarks',
    blurb: 'Local reader bookmarks with keyword filter and JSON export.',
    privacy: 'local · noindex',
  },
  {
    to: '/privacy',
    title: 'Privacy policy',
    blurb: 'How Veritas handles analytics, accounts, and researcher local tools.',
    privacy: 'public',
  },
]

type LiveCounts = {
  rocClaims: number | null
  israelIncidents: number | null
  loading: boolean
  error: string
}

export default function ResearcherHubPage() {
  const [counts, setCounts] = useState<LiveCounts>({
    rocClaims: null,
    israelIncidents: null,
    loading: true,
    error: '',
  })

  useEffect(() => {
    setMetaTags({
      title: `Researcher Tools | ${SITE_NAME}`,
      description:
        'Local and public research tools for The Record: personal timeline, sources, methodology, and machine corpora. Entity attribution only.',
      url: `${SITE_URL}/researcher`,
      robots: 'index, follow',
    })
    return () => clearMetaTags()
  }, [])

  useEffect(() => {
    let cancelled = false
    setCounts((c) => ({ ...c, loading: true, error: '' }))
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
        const rocClaims =
          typeof roc?.claimCount === 'number'
            ? roc.claimCount
            : Array.isArray(roc?.claims)
              ? roc.claims.length
              : null
        const israelIncidents =
          typeof israel?.counts?.incidents === 'number'
            ? israel.counts.incidents
            : Array.isArray(israel?.incidents)
              ? israel.incidents.length
              : null
        setCounts({ rocClaims, israelIncidents, loading: false, error: '' })
      })
      .catch((err) => {
        if (!cancelled) {
          setCounts((c) => ({
            ...c,
            loading: false,
            error: err?.message || 'Could not load live corpus counts',
          }))
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-crimson">
        Veritas Worldwide · researcher tools
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Researcher hub</h1>
      <p className="mt-3 font-body text-sm text-ink-muted leading-relaxed">
        Evidence integrity tools for independent verification. Personal builders stay on this device;
        public corpora are published by Veritas Worldwide only — no personal author byline.
      </p>

      <div
        className="mt-6 grid grid-cols-2 gap-3 rounded-sm border border-border bg-surface p-4"
        data-testid="researcher-live-corpus-counts"
        aria-live="polite"
      >
        <div>
          <p className="font-mono text-2xl font-bold text-ink">
            {counts.loading ? '…' : counts.rocClaims ?? '—'}
          </p>
          <p className="font-sans text-[0.65rem] uppercase tracking-wider text-ink-faint">
            ROC claims (live corpus)
          </p>
        </div>
        <div>
          <p className="font-mono text-2xl font-bold text-ink">
            {counts.loading ? '…' : counts.israelIncidents ?? '—'}
          </p>
          <p className="font-sans text-[0.65rem] uppercase tracking-wider text-ink-faint">
            Israel incidents (live corpus)
          </p>
        </div>
        {counts.error ? (
          <p className="col-span-2 font-body text-xs text-crimson" role="alert">
            {counts.error}
          </p>
        ) : (
          <p className="col-span-2 font-body text-xs text-ink-faint">
            Counts fetched client-side from public corpus.json — entity publisher only.
          </p>
        )}
      </div>

      <ul className="mt-8 space-y-3">
        {tools.map((tool) => (
          <li key={tool.to} className="rounded-sm border border-border bg-surface p-4">
            {tool.external ? (
              <a href={tool.to} className="font-display text-lg font-bold text-ink hover:text-crimson">
                {tool.title}
              </a>
            ) : (
              <Link to={tool.to} className="font-display text-lg font-bold text-ink hover:text-crimson">
                {tool.title}
              </Link>
            )}
            <p className="mt-1 font-body text-sm text-ink-muted leading-relaxed">{tool.blurb}</p>
            <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-wider text-ink-faint">
              {tool.privacy}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-body text-xs text-ink-faint leading-relaxed">
        Corrections and rights: rights@veritasworldwide.com · Privacy: privacy@veritasworldwide.com
      </p>
    </div>
  )
}

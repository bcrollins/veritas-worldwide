import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'
import RelatedHubs from '../components/RelatedHubs'
import ResearchHubChips from '../components/ResearchHubChips'
import {
  SCHOLARLY_TIER_ORDER,
  SCHOLARLY_TIERS,
  type ScholarlyEvidenceTier,
} from '../data/evidenceTiers'
import {
  loadPersonalTimelineEvents,
  savePersonalTimelineEvents,
  buildPersonalTimelineExport,
  parsePersonalTimelineImport,
} from '../lib/personalTimelineStorage'

type TimelineEvent = import('../lib/personalTimelineStorage').PersonalTimelineEvent

function loadEvents(): TimelineEvent[] {
  return loadPersonalTimelineEvents()
}

function saveEvents(events: TimelineEvent[]) {
  savePersonalTimelineEvents(events)
}

function parseTags(input: string): string[] {
  return input
    .split(/[,;]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 24)
}

export default function PersonalTimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [evidenceTier, setEvidenceTier] = useState<ScholarlyEvidenceTier | ''>('')
  const [tagsInput, setTagsInput] = useState('')
  const [filterTier, setFilterTier] = useState<ScholarlyEvidenceTier | 'all'>('all')
  const [filterTag, setFilterTag] = useState('')
  const [importError, setImportError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEvents(loadEvents())
    setMetaTags({
      title: `Personal Timeline Builder | ${SITE_NAME}`,
      description:
        'Local-only researcher timeline builder with evidence-tier tags. Events stay in this browser — never uploaded to Veritas servers.',
      url: `${SITE_URL}/researcher/timeline`,
      robots: 'noindex, nofollow',
    })
    return () => clearMetaTags()
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const ev of events) {
      for (const t of ev.tags || []) set.add(t)
    }
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [events])

  const sorted = useMemo(() => {
    let list = [...events]
    if (filterTier !== 'all') {
      list = list.filter((ev) => ev.evidenceTier === filterTier)
    }
    if (filterTag.trim()) {
      const needle = filterTag.trim().toLowerCase()
      list = list.filter((ev) => (ev.tags || []).some((t) => t.toLowerCase() === needle))
    }
    return list.sort(
      (a, b) => String(a.date).localeCompare(String(b.date)) || a.title.localeCompare(b.title),
    )
  }, [events, filterTier, filterTag])

  const onAdd = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const next: TimelineEvent = {
      id: `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      date: date || new Date().toISOString().slice(0, 10),
      title: title.trim(),
      notes: notes.trim(),
      sourceUrl: sourceUrl.trim(),
      createdAt: new Date().toISOString(),
      evidenceTier: evidenceTier || '',
      tags: parseTags(tagsInput),
      corpusRef: null,
    }
    const updated = [next, ...events]
    setEvents(updated)
    saveEvents(updated)
    setTitle('')
    setNotes('')
    setSourceUrl('')
    setEvidenceTier('')
    setTagsInput('')
  }

  const onRemove = (id: string) => {
    const updated = events.filter((ev) => ev.id !== id)
    setEvents(updated)
    saveEvents(updated)
  }

  const onExport = () => {
    const payload = buildPersonalTimelineExport(events)
    const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'veritas-personal-timeline.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setImportError('')
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      const incoming = parsePersonalTimelineImport(parsed)
      const byId = new Map<string, TimelineEvent>()
      for (const ev of events) byId.set(ev.id, ev)
      for (const ev of incoming) byId.set(ev.id, ev)
      const merged = [...byId.values()]
      setEvents(merged)
      saveEvents(merged)
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Could not parse JSON file.')
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const onClear = () => {
    if (!confirm('Clear all local timeline events on this device?')) return
    setEvents([])
    saveEvents([])
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-5">
        <ResearchHubChips excludePath="/researcher" />
        <RelatedHubs
          testId="personal-timeline-related-hubs"
          className="mt-3"
          tone="parchment"
          ariaLabel="Primary hubs from Personal Timeline"
        />
      </div>
      <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-crimson">
        Researcher tool · local only
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Personal Timeline Builder</h1>
      <p className="mt-3 font-body text-sm text-ink-muted leading-relaxed">
        Build a private chronology for your own research notes. Tag events with scholarly evidence tiers
        and free-form tags. Events are stored in this browser only (localStorage) and are never sent to
        Veritas servers. Export or import JSON for offline work.
      </p>
      <p className="mt-2 font-body text-xs text-ink-faint">
        Not an Integrity Score surface. For public archive timelines see{' '}
        <Link to="/timeline" className="text-crimson hover:underline">
          /timeline
        </Link>
        . Researcher tools hub:{' '}
        <Link to="/researcher" className="text-crimson hover:underline">
          /researcher
        </Link>
        .
      </p>

      <form onSubmit={onAdd} className="mt-8 space-y-3 rounded-sm border border-border bg-surface p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="font-sans text-xs text-ink-muted">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm"
            />
          </label>
          <label className="block">
            <span className="font-sans text-xs text-ink-muted">Evidence tier (optional)</span>
            <select
              value={evidenceTier}
              onChange={(e) => setEvidenceTier(e.target.value as ScholarlyEvidenceTier | '')}
              className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm"
            >
              <option value="">— none —</option>
              {SCHOLARLY_TIER_ORDER.map((id) => (
                <option key={id} value={id}>
                  {SCHOLARLY_TIERS[id].label}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="font-sans text-xs text-ink-muted">Title</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm"
              placeholder="Event title"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="font-sans text-xs text-ink-muted">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full min-h-[88px] border border-border bg-parchment px-3 py-2 font-body text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="font-sans text-xs text-ink-muted">Tags (comma-separated, optional)</span>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm"
              placeholder="hostages, primary-source, west-bank"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="font-sans text-xs text-ink-muted">Source URL (optional)</span>
            <input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm"
              placeholder="https://"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="submit"
            className="inline-flex min-h-[44px] items-center rounded-sm bg-crimson px-4 font-sans text-xs font-bold uppercase tracking-wider text-white"
          >
            Add event
          </button>
          <button
            type="button"
            onClick={onExport}
            disabled={events.length === 0}
            className="inline-flex min-h-[44px] items-center rounded-sm border border-border px-4 font-sans text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-40"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex min-h-[44px] items-center rounded-sm border border-border px-4 font-sans text-xs font-bold uppercase tracking-wider text-ink"
          >
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={onImportFile}
          />
          <button
            type="button"
            onClick={onClear}
            disabled={events.length === 0}
            className="inline-flex min-h-[44px] items-center rounded-sm border border-border px-4 font-sans text-xs font-bold uppercase tracking-wider text-ink-muted disabled:opacity-40"
          >
            Clear local
          </button>
        </div>
        {importError && (
          <p className="font-body text-xs text-crimson" role="alert">
            {importError}
          </p>
        )}
      </form>

      <div className="mt-6 flex flex-wrap gap-3 rounded-sm border border-border bg-parchment/50 p-4">
        <label className="block min-w-[10rem] flex-1">
          <span className="font-sans text-xs text-ink-muted">Filter by tier</span>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value as ScholarlyEvidenceTier | 'all')}
            className="mt-1 w-full min-h-[44px] border border-border bg-surface px-3 font-body text-sm"
          >
            <option value="all">All tiers</option>
            {SCHOLARLY_TIER_ORDER.map((id) => (
              <option key={id} value={id}>
                {SCHOLARLY_TIERS[id].label}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-[10rem] flex-1">
          <span className="font-sans text-xs text-ink-muted">Filter by tag</span>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="mt-1 w-full min-h-[44px] border border-border bg-surface px-3 font-body text-sm"
          >
            <option value="">All tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="mt-10">
        <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
          Events ({sorted.length}
          {sorted.length !== events.length ? ` of ${events.length}` : ''})
        </h2>
        {sorted.length === 0 ? (
          <p className="mt-4 font-body text-sm text-ink-muted">
            {events.length === 0 ? 'No local events yet.' : 'No events match the current filters.'}
          </p>
        ) : (
          <ol className="mt-4 space-y-3">
            {sorted.map((ev) => (
              <li key={ev.id} className="rounded-sm border border-border bg-parchment/40 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.65rem] text-crimson">{ev.date}</p>
                    <p className="font-display text-base font-bold text-ink">{ev.title}</p>
                    {ev.evidenceTier ? (
                      <p className="mt-1 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                        {SCHOLARLY_TIERS[ev.evidenceTier].label}
                      </p>
                    ) : null}
                    {ev.tags && ev.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {ev.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex min-h-[28px] items-center rounded-sm border border-border bg-surface px-2 font-sans text-[0.65rem] text-ink-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {ev.notes && <p className="mt-1 font-body text-sm text-ink-muted">{ev.notes}</p>}
                    {ev.corpusRef && (
                      <p className="mt-1 font-mono text-[0.65rem] text-ink-faint">
                        corpus:{ev.corpusRef.kind}/{ev.corpusRef.id}
                      </p>
                    )}
                    {ev.sourceUrl && (
                      <a
                        href={ev.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex min-h-[44px] items-center text-sm text-crimson hover:underline"
                      >
                        Source →
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(ev.id)}
                    className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] uppercase text-ink-faint hover:text-crimson"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

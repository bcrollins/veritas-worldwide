import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'

type TimelineEvent = {
  id: string
  date: string
  title: string
  notes: string
  sourceUrl: string
  createdAt: string
}

const STORAGE_KEY = 'veritas_personal_timeline_v1'

function loadEvents(): TimelineEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveEvents(events: TimelineEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export default function PersonalTimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')

  useEffect(() => {
    setEvents(loadEvents())
    setMetaTags({
      title: `Personal Timeline Builder | ${SITE_NAME}`,
      description:
        'Local-only researcher timeline builder. Events stay in this browser — never uploaded to Veritas servers.',
      url: `${SITE_URL}/researcher/timeline`,
      robots: 'noindex, nofollow',
    })
    return () => clearMetaTags()
  }, [])

  const sorted = useMemo(
    () =>
      [...events].sort((a, b) => String(a.date).localeCompare(String(b.date)) || a.title.localeCompare(b.title)),
    [events],
  )

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
    }
    const updated = [next, ...events]
    setEvents(updated)
    saveEvents(updated)
    setTitle('')
    setNotes('')
    setSourceUrl('')
  }

  const onRemove = (id: string) => {
    const updated = events.filter((ev) => ev.id !== id)
    setEvents(updated)
    saveEvents(updated)
  }

  const onExport = () => {
    const blob = new Blob([`${JSON.stringify({ exportedAt: new Date().toISOString(), events: sorted }, null, 2)}\n`], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'veritas-personal-timeline.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onClear = () => {
    if (!confirm('Clear all local timeline events on this device?')) return
    setEvents([])
    saveEvents([])
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-crimson">
        Researcher tool · local only
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Personal Timeline Builder</h1>
      <p className="mt-3 font-body text-sm text-ink-muted leading-relaxed">
        Build a private chronology for your own research notes. Events are stored in this browser only
        (localStorage) and are never sent to Veritas servers. Export JSON for offline work.
      </p>
      <p className="mt-2 font-body text-xs text-ink-faint">
        Not an Integrity Score surface. For public archive timelines see{' '}
        <Link to="/timeline" className="text-crimson hover:underline">
          /timeline
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
            onClick={onClear}
            disabled={events.length === 0}
            className="inline-flex min-h-[44px] items-center rounded-sm border border-border px-4 font-sans text-xs font-bold uppercase tracking-wider text-ink-muted disabled:opacity-40"
          >
            Clear local
          </button>
        </div>
      </form>

      <section className="mt-10">
        <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
          Events ({sorted.length})
        </h2>
        {sorted.length === 0 ? (
          <p className="mt-4 font-body text-sm text-ink-muted">No local events yet.</p>
        ) : (
          <ol className="mt-4 space-y-3">
            {sorted.map((ev) => (
              <li key={ev.id} className="rounded-sm border border-border bg-parchment/40 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.65rem] text-crimson">{ev.date}</p>
                    <p className="font-display text-base font-bold text-ink">{ev.title}</p>
                    {ev.notes && <p className="mt-1 font-body text-sm text-ink-muted">{ev.notes}</p>}
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

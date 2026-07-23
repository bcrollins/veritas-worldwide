/**
 * Local-only personal timeline storage.
 * Never uploaded to Veritas servers. Entity-only product surface.
 */
import type { ScholarlyEvidenceTier } from '../data/evidenceTiers'

export const PERSONAL_TIMELINE_STORAGE_KEY = 'veritas_personal_timeline_v1'
export const PERSONAL_TIMELINE_SCHEMA_VERSION = 2

export type PersonalTimelineCorpusRef = {
  kind: 'roc' | 'israel' | 'chapter' | 'other'
  id: string
}

export type PersonalTimelineEvent = {
  id: string
  date: string
  title: string
  notes: string
  sourceUrl: string
  createdAt: string
  evidenceTier?: ScholarlyEvidenceTier | ''
  tags?: string[]
  corpusRef?: PersonalTimelineCorpusRef | null
}

function normalizeEvent(raw: unknown): PersonalTimelineEvent | null {
  if (!raw || typeof raw !== 'object') return null
  const e = raw as Partial<PersonalTimelineEvent>
  if (typeof e.id !== 'string' || typeof e.title !== 'string') return null
  const tags = Array.isArray(e.tags)
    ? e.tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0).map((t) => t.trim())
    : []
  let corpusRef: PersonalTimelineCorpusRef | null = null
  if (e.corpusRef && typeof e.corpusRef === 'object') {
    const kind = (e.corpusRef as PersonalTimelineCorpusRef).kind
    const id = (e.corpusRef as PersonalTimelineCorpusRef).id
    if (
      (kind === 'roc' || kind === 'israel' || kind === 'chapter' || kind === 'other') &&
      typeof id === 'string' &&
      id.trim()
    ) {
      corpusRef = { kind, id: id.trim() }
    }
  }
  return {
    id: e.id,
    date: typeof e.date === 'string' ? e.date : new Date().toISOString().slice(0, 10),
    title: e.title,
    notes: typeof e.notes === 'string' ? e.notes : '',
    sourceUrl: typeof e.sourceUrl === 'string' ? e.sourceUrl : '',
    createdAt: typeof e.createdAt === 'string' ? e.createdAt : new Date().toISOString(),
    evidenceTier: (e.evidenceTier as ScholarlyEvidenceTier | '') || '',
    tags,
    corpusRef,
  }
}

export function loadPersonalTimelineEvents(): PersonalTimelineEvent[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(PERSONAL_TIMELINE_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.events) ? parsed.events : []
    return list.map(normalizeEvent).filter(Boolean) as PersonalTimelineEvent[]
  } catch {
    return []
  }
}

export function savePersonalTimelineEvents(events: PersonalTimelineEvent[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PERSONAL_TIMELINE_STORAGE_KEY, JSON.stringify(events))
}

/** Entity-only export watermark — never personal operator identity. */
export const PERSONAL_TIMELINE_EXPORT_WATERMARK =
  'Local researcher export. Not a Veritas server dataset. Attribution for public corpora: Veritas Worldwide only. Operator identity is never attached.'

export type PersonalTimelineExportPayload = {
  schemaVersion: number
  exportedAt: string
  publisher: 'Veritas Worldwide'
  publisherNote: string
  localOnly: true
  events: PersonalTimelineEvent[]
}

export function buildPersonalTimelineExport(
  events: PersonalTimelineEvent[],
): PersonalTimelineExportPayload {
  const sorted = [...events].sort(
    (a, b) => String(a.date).localeCompare(String(b.date)) || a.title.localeCompare(b.title),
  )
  return {
    schemaVersion: PERSONAL_TIMELINE_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    publisher: 'Veritas Worldwide',
    publisherNote: PERSONAL_TIMELINE_EXPORT_WATERMARK,
    localOnly: true,
    events: sorted,
  }
}

/** Validate + normalize import JSON. Throws Error with user-safe message. */
export function parsePersonalTimelineImport(raw: unknown): PersonalTimelineEvent[] {
  if (raw == null) throw new Error('Empty import payload.')
  if (typeof raw !== 'object') throw new Error('JSON must be an object or array.')
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as { events?: unknown }).events)
      ? ((raw as { events: unknown[] }).events as unknown[])
      : null
  if (!list) throw new Error('JSON must be an array of events or { events: [] }.')
  if (list.length > 5000) throw new Error('Import exceeds 5000 events (local safety cap).')
  const incoming = list.map(normalizeEvent).filter(Boolean) as PersonalTimelineEvent[]
  if (!incoming.length) throw new Error('No valid events found in file.')
  return incoming
}

export function addPersonalTimelineEvent(
  partial: Omit<PersonalTimelineEvent, 'id' | 'createdAt'> & { id?: string },
): PersonalTimelineEvent {
  const next: PersonalTimelineEvent = {
    id:
      partial.id ||
      `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    date: partial.date || new Date().toISOString().slice(0, 10),
    title: partial.title.trim(),
    notes: (partial.notes || '').trim(),
    sourceUrl: (partial.sourceUrl || '').trim(),
    createdAt: new Date().toISOString(),
    evidenceTier: partial.evidenceTier || '',
    tags: partial.tags || [],
    corpusRef: partial.corpusRef ?? null,
  }
  const existing = loadPersonalTimelineEvents()
  // Dedupe by corpusRef when present
  const withoutDup = next.corpusRef
    ? existing.filter(
        (e) =>
          !(
            e.corpusRef &&
            e.corpusRef.kind === next.corpusRef!.kind &&
            e.corpusRef.id === next.corpusRef!.id
          ),
      )
    : existing
  savePersonalTimelineEvents([next, ...withoutDup])
  return next
}

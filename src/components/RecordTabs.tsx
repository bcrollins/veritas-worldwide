/**
 * RecordTabs — Left sidebar tab navigation for The Record page.
 * Tabs: Chapters | Israel Dossier | Deep State | Timeline | Content Packs & Brand Kit
 * Collapsible on desktop, horizontal bottom tabs on mobile.
 */
import { useState, type ReactNode } from 'react'

export type RecordTab = 'chapters' | 'israel' | 'deepstate' | 'timeline' | 'content'

interface TabDef {
  id: RecordTab
  label: string
  shortLabel: string
  icon: ReactNode
}

const TABS: TabDef[] = [
  {
    id: 'chapters',
    label: 'Chapters',
    shortLabel: 'Chapters',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  },
  {
    id: 'israel',
    label: 'Israel Dossier',
    shortLabel: 'Israel',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  },
  {
    id: 'deepstate',
    label: 'Deep State',
    shortLabel: 'Deep State',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    id: 'timeline',
    label: 'Timeline',
    shortLabel: 'Timeline',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    id: 'content',
    label: 'Content Packs & Brand Kit',
    shortLabel: 'Media Kit',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  },
]

interface Props {
  activeTab: RecordTab
  onTabChange: (tab: RecordTab) => void
}

export default function RecordTabs({ activeTab, onTabChange }: Props) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* ── Desktop: Left Sidebar ──────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col shrink-0 sticky top-[7.5rem] self-start transition-all duration-300 ${
          collapsed ? 'w-14' : 'w-52'
        }`}
        aria-label="Record sections"
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 mb-1 text-ink-faint hover:text-ink transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <svg className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Tab buttons */}
        <nav className="flex flex-col gap-0.5">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-crimson/8 text-crimson font-semibold border-l-2 border-crimson'
                    : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50 border-l-2 border-transparent'
                }`}
                aria-current={isActive ? 'true' : undefined}
                title={tab.label}
              >
                <span className={`shrink-0 ${isActive ? 'text-crimson' : 'text-ink-faint group-hover:text-ink-muted'}`}>
                  {tab.icon}
                </span>
                {!collapsed && (
                  <span className="font-sans text-xs tracking-[0.05em] uppercase truncate">
                    {tab.label}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Decorative rule */}
        {!collapsed && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="font-sans text-[0.55rem] text-ink-faint tracking-[0.1em] uppercase px-3">
              5 Sections &middot; The Record
            </p>
          </div>
        )}
      </aside>

      {/* ── Mobile: Bottom horizontal tabs ─────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-parchment/95 backdrop-blur-md border-t border-border shadow-lg"
        aria-label="Record sections"
      >
        <div className="flex items-stretch">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${
                  isActive
                    ? 'text-crimson bg-crimson/5 border-t-2 border-crimson'
                    : 'text-ink-faint hover:text-ink border-t-2 border-transparent'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="shrink-0">{tab.icon}</span>
                <span className="font-sans text-[0.5rem] font-semibold tracking-[0.05em] uppercase">
                  {tab.shortLabel}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

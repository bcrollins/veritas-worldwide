import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useI18n, LANGUAGES, LANG_CODES, type LangCode } from '../lib/i18n'
import {
  GOOGLE_TRANSLATE_LANGS,
  RTL_GT_CODES,
  loadGoogleTranslate,
  translatePage,
  resetTranslation,
  getStoredGTLang,
  injectGTStyles,
  type GoogleLang,
} from '../lib/googleTranslate'

/* ── Tabs ─────────────────────────────────────────────────────── */
type Tab = 'manual' | 'translate'

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('manual')
  const [search, setSearch] = useState('')
  const [gtLang, setGtLang] = useState<string | null>(null)
  const [gtReady, setGtReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Initialize Google Translate on mount (lazy)
  useEffect(() => {
    const stored = getStoredGTLang()
    if (stored) {
      setGtLang(stored)
      setTab('translate')
    }
    injectGTStyles()

    if (!stored) return

    let cancelled = false
    loadGoogleTranslate()
      .then(() => {
        if (!cancelled) setGtReady(true)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!open || tab !== 'translate' || gtReady) return

    let cancelled = false
    loadGoogleTranslate()
      .then(() => {
        if (!cancelled) setGtReady(true)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [open, tab, gtReady])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  // Focus search when switching to translate tab
  useEffect(() => {
    if (open && tab === 'translate') {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [open, tab])

  // Filter Google Translate languages by search
  const filteredGTLangs = useMemo(() => {
    if (!search.trim()) return GOOGLE_TRANSLATE_LANGS
    const q = search.toLowerCase()
    return GOOGLE_TRANSLATE_LANGS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
    )
  }, [search])

  const handleManualLang = useCallback((code: LangCode) => {
    setLang(code)
    // Reset Google Translate if active
    if (gtLang) {
      resetTranslation()
      setGtLang(null)
    }
    setOpen(false)
    setSearch('')
  }, [setLang, gtLang])

  const handleGTLang = useCallback(async (gl: GoogleLang) => {
    if (!gtReady) {
      try {
        await loadGoogleTranslate()
        setGtReady(true)
      } catch {
        return
      }
    }
    translatePage(gl.code)
    setGtLang(gl.code)
    // Set RTL if needed
    if (RTL_GT_CODES.has(gl.code)) {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
    setOpen(false)
    setSearch('')
  }, [gtReady])

  const handleResetGT = useCallback(() => {
    resetTranslation()
    setGtLang(null)
    document.documentElement.dir = 'ltr'
    setOpen(false)
    setSearch('')
  }, [])

  const current = LANGUAGES[lang]
  const activeGTLang = gtLang ? GOOGLE_TRANSLATE_LANGS.find((l) => l.code === gtLang) : null
  const displayLabel = activeGTLang ? activeGTLang.code.split('-')[0].toUpperCase() : lang.toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 min-w-[44px] min-h-[44px] text-ink-muted hover:text-ink transition-colors"
        aria-label={t('lang.select')}
        aria-expanded={open}
        title={activeGTLang ? `${activeGTLang.native} (Google Translate)` : `${current.native} (${current.name})`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
        <span className="hidden sm:inline font-sans text-[0.6rem] font-semibold tracking-wider uppercase">
          {displayLabel}
        </span>
        {activeGTLang && (
          <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" title="Google Translate active" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-72 max-h-[28rem] bg-white dark:bg-ink border border-border rounded-sm shadow-lg z-50 flex flex-col">
          {/* Tab bar */}
          <div className="flex border-b border-border shrink-0">
            <button
              onClick={() => { setTab('manual'); setSearch('') }}
              className={`flex-1 py-2 px-3 font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase transition-colors ${
                tab === 'manual'
                  ? 'text-crimson border-b-2 border-crimson'
                  : 'text-ink-faint hover:text-ink-muted'
              }`}
            >
              {t('lang.select')} (34)
            </button>
            <button
              onClick={() => { setTab('translate'); setSearch('') }}
              className={`flex-1 py-2 px-3 font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase transition-colors ${
                tab === 'translate'
                  ? 'text-crimson border-b-2 border-crimson'
                  : 'text-ink-faint hover:text-ink-muted'
              }`}
            >
              Translate (130+)
            </button>
          </div>

          {/* Google Translate active indicator */}
          {activeGTLang && tab === 'translate' && (
            <div className="px-3 py-2 bg-crimson/5 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                <span className="font-sans text-[0.65rem] text-crimson font-semibold">
                  {activeGTLang.native}
                </span>
              </div>
              <button
                onClick={handleResetGT}
                className="font-sans text-[0.55rem] font-bold tracking-wider uppercase text-ink-faint hover:text-crimson transition-colors"
              >
                Reset
              </button>
            </div>
          )}

          {/* Search (translate tab only) */}
          {tab === 'translate' && (
            <div className="p-2 border-b border-border shrink-0">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages..."
                className="w-full px-2.5 py-1.5 font-sans text-xs bg-parchment-dark dark:bg-ink-dark border border-border rounded-sm focus:outline-none focus:border-crimson/40 placeholder:text-ink-faint"
              />
            </div>
          )}

          {/* Language list */}
          <div className="overflow-y-auto flex-1">
            {tab === 'manual' ? (
              <div className="py-1">
                {LANG_CODES.map((code) => {
                  const meta = LANGUAGES[code]
                  const isActive = code === lang && !gtLang
                  return (
                    <button
                      key={code}
                      onClick={() => handleManualLang(code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-parchment-dark dark:hover:bg-ink-dark transition-colors ${
                        isActive ? 'bg-crimson/5 text-crimson' : 'text-ink dark:text-parchment'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-semibold uppercase w-5">{code}</span>
                        <span className="font-sans text-sm">{meta.native}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-[0.6rem] text-ink-faint">{meta.name}</span>
                        {isActive && (
                          <svg className="w-3.5 h-3.5 text-crimson" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="py-1">
                {/* Show original English option */}
                <button
                  onClick={handleResetGT}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-parchment-dark dark:hover:bg-ink-dark transition-colors ${
                    !gtLang ? 'bg-crimson/5 text-crimson' : 'text-ink dark:text-parchment'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs font-semibold uppercase w-8">EN</span>
                    <span className="font-sans text-sm">English</span>
                  </div>
                  <span className="font-sans text-[0.55rem] text-ink-faint uppercase tracking-wider">Original</span>
                </button>

                {filteredGTLangs.filter(l => l.code !== 'en').map((gl) => {
                  const isActive = gtLang === gl.code
                  return (
                    <button
                      key={gl.code}
                      onClick={() => handleGTLang(gl)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-parchment-dark dark:hover:bg-ink-dark transition-colors ${
                        isActive ? 'bg-crimson/5 text-crimson' : 'text-ink dark:text-parchment'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-sans text-xs font-semibold uppercase w-8 shrink-0">{gl.code}</span>
                        <span className="font-sans text-sm truncate">{gl.native}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-sans text-[0.6rem] text-ink-faint">{gl.name}</span>
                        {isActive && (
                          <svg className="w-3.5 h-3.5 text-crimson" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}

                {filteredGTLangs.filter(l => l.code !== 'en').length === 0 && (
                  <div className="px-3 py-4 text-center">
                    <p className="font-sans text-xs text-ink-faint">No languages match "{search}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer attribution */}
          <div className="px-3 py-1.5 border-t border-border bg-parchment-dark/50 dark:bg-ink-dark/50 shrink-0">
            {tab === 'manual' ? (
              <p className="font-sans text-[0.5rem] text-ink-faint text-center tracking-wide">
                Hand-translated UI • Switch to Translate tab for 130+ languages
              </p>
            ) : (
              <p className="font-sans text-[0.5rem] text-ink-faint text-center tracking-wide">
                Powered by Google Translate • Machine translation
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

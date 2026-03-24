import { useState, useRef, useEffect } from 'react'
import { useI18n, LANGUAGES, LANG_CODES, type LangCode } from '../lib/i18n'

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  const current = LANGUAGES[lang]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 min-w-[44px] min-h-[44px] text-ink-muted hover:text-ink transition-colors"
        aria-label={t('lang.select')}
        aria-expanded={open}
        title={`${current.native} (${current.name})`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
        <span className="hidden sm:inline font-sans text-[0.6rem] font-semibold tracking-wider uppercase">{lang}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 max-h-80 overflow-y-auto bg-white border border-border rounded-sm shadow-lg z-50">
          <div className="p-2 border-b border-border">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.15em] uppercase text-ink-faint">{t('lang.select')}</p>
          </div>
          <div className="py-1">
            {LANG_CODES.map(code => {
              const meta = LANGUAGES[code]
              const isActive = code === lang
              return (
                <button
                  key={code}
                  onClick={() => { setLang(code); setOpen(false) }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-parchment-dark transition-colors ${isActive ? 'bg-crimson/5 text-crimson' : 'text-ink'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs font-semibold uppercase w-5">{code}</span>
                    <span className="font-sans text-sm">{meta.native}</span>
                  </div>
                  {isActive && (
                    <svg className="w-3.5 h-3.5 text-crimson" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

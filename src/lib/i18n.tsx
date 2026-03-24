import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, t as translate, type LangCode, type TranslationKey } from './translations'

/* ── Language metadata ────────────────────────────────────────── */
export const LANGUAGES: Record<LangCode, { name: string; native: string }> = {
  en: { name: 'English', native: 'English' },
  es: { name: 'Spanish', native: 'Español' },
  fr: { name: 'French', native: 'Français' },
  de: { name: 'German', native: 'Deutsch' },
  pt: { name: 'Portuguese', native: 'Português' },
  it: { name: 'Italian', native: 'Italiano' },
  nl: { name: 'Dutch', native: 'Nederlands' },
  ru: { name: 'Russian', native: 'Русский' },
  uk: { name: 'Ukrainian', native: 'Українська' },
  pl: { name: 'Polish', native: 'Polski' },
  ar: { name: 'Arabic', native: 'العربية' },
  he: { name: 'Hebrew', native: 'עברית' },
  zh: { name: 'Chinese', native: '中文' },
  ja: { name: 'Japanese', native: '日本語' },
  ko: { name: 'Korean', native: '한국어' },
  hi: { name: 'Hindi', native: 'हिन्दी' },
  tr: { name: 'Turkish', native: 'Türkçe' },
  sv: { name: 'Swedish', native: 'Svenska' },
  id: { name: 'Indonesian', native: 'Bahasa Indonesia' },
  th: { name: 'Thai', native: 'ไทย' },
  vi: { name: 'Vietnamese', native: 'Tiếng Việt' },
  ro: { name: 'Romanian', native: 'Română' },
  el: { name: 'Greek', native: 'Ελληνικά' },
  cs: { name: 'Czech', native: 'Čeština' },
  da: { name: 'Danish', native: 'Dansk' },
  fi: { name: 'Finnish', native: 'Suomi' },
  no: { name: 'Norwegian', native: 'Norsk' },
  hu: { name: 'Hungarian', native: 'Magyar' },
  ms: { name: 'Malay', native: 'Bahasa Melayu' },
  tl: { name: 'Filipino', native: 'Filipino' },
  sw: { name: 'Swahili', native: 'Kiswahili' },
  fa: { name: 'Persian', native: 'فارسی' },
  bn: { name: 'Bengali', native: 'বাংলা' },
  ur: { name: 'Urdu', native: 'اردو' },
}

export const RTL_LANGS: LangCode[] = ['ar', 'he', 'fa', 'ur']
export const LANG_CODES = Object.keys(LANGUAGES) as LangCode[]

const STORAGE_KEY = 'veritas_lang'

/* ── Auto-detect browser/region locale ────────────────────────── */
function detectLocale(): LangCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in LANGUAGES) return stored as LangCode
  } catch {}
  const candidates = [...(navigator.languages || []), navigator.language]
  for (const raw of candidates) {
    if (!raw) continue
    const code = raw.split('-')[0].toLowerCase()
    if (code in LANGUAGES) return code as LangCode
  }
  return 'en'
}

/* ── Context ──────────────────────────────────────────────────── */
interface I18nContextValue {
  lang: LangCode
  setLang: (code: LangCode) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
  isRTL: false,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectLocale)

  const setLang = useCallback((code: LangCode) => {
    setLangState(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch {}
  }, [])

  const tFn = useCallback((key: string, vars?: Record<string, string | number>) => {
    return translate(lang, key, vars)
  }, [lang])

  const isRTL = RTL_LANGS.includes(lang)

  // Set document direction and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [lang, isRTL])

  return (
    <I18nContext.Provider value={{ lang, setLang, t: tFn, isRTL }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export { type TranslationKey, type LangCode }

/**
 * Google Translate Integration for Veritas Press
 * 
 * Provides programmatic control over Google Translate's client-side
 * translation engine. Supports 130+ languages without API keys.
 * 
 * Architecture:
 * - Manual i18n (34 langs) handles UI chrome (nav, buttons, labels)
 * - Google Translate handles full page content translation
 * - Both systems coexist: manual i18n sets the base, GT overlays content
 */

/* ── All Google Translate supported languages ─────────────────── */
export interface GoogleLang {
  code: string
  name: string
  native: string
}

export const GOOGLE_TRANSLATE_LANGS: GoogleLang[] = [
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan' },
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'ca', name: 'Catalan', native: 'Català' },
  { code: 'ceb', name: 'Cebuano', native: 'Cebuano' },
  { code: 'ny', name: 'Chichewa', native: 'Chichewa' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文' },
  { code: 'co', name: 'Corsican', native: 'Corsu' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'fy', name: 'Frisian', native: 'Frysk' },
  { code: 'gl', name: 'Galician', native: 'Galego' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl Ayisyen' },
  { code: 'ha', name: 'Hausa', native: 'Hausa' },
  { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'hmn', name: 'Hmong', native: 'Hmoob' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska' },
  { code: 'ig', name: 'Igbo', native: 'Igbo' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'jv', name: 'Javanese', native: 'Basa Jawa' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'ku', name: 'Kurdish', native: 'Kurdî' },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча' },
  { code: 'lo', name: 'Lao', native: 'ລາວ' },
  { code: 'la', name: 'Latin', native: 'Latina' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mt', name: 'Maltese', native: 'Malti' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол' },
  { code: 'my', name: 'Myanmar', native: 'မြန်မာ' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ps', name: 'Pashto', native: 'پښتو' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'sm', name: 'Samoan', native: 'Gagana Samoa' },
  { code: 'gd', name: 'Scots Gaelic', native: 'Gàidhlig' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'st', name: 'Sesotho', native: 'Sesotho' },
  { code: 'sn', name: 'Shona', native: 'ChiShona' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'so', name: 'Somali', native: 'Soomaali' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'tt', name: 'Tatar', native: 'Татар' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmen' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'ug', name: 'Uyghur', native: 'ئۇيغۇرچە' },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbek' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'xh', name: 'Xhosa', native: 'IsiXhosa' },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'zu', name: 'Zulu', native: 'IsiZulu' },
  { code: 'tl', name: 'Filipino', native: 'Filipino' },
]

export const RTL_GT_CODES = new Set(['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ug', 'yi'])

const GT_STORAGE_KEY = 'veritas_gt_lang'
const GT_SCRIPT_URL = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'

let scriptLoaded = false
let initPromiseResolve: (() => void) | null = null

/**
 * Load the Google Translate Element script and initialize the hidden widget.
 * Called once on first use; subsequent calls are no-ops.
 */
export function loadGoogleTranslate(): Promise<void> {
  if (scriptLoaded) return Promise.resolve()

  return new Promise<void>((resolve) => {
    initPromiseResolve = resolve

    // Create hidden container for Google Translate widget
    let container = document.getElementById('google_translate_element')
    if (!container) {
      container = document.createElement('div')
      container.id = 'google_translate_element'
      container.style.display = 'none'
      document.body.appendChild(container)
    }

    // Define the callback Google Translate calls after loading
    ;(window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      )
      scriptLoaded = true
      if (initPromiseResolve) initPromiseResolve()
    }

    // Inject the script
    const script = document.createElement('script')
    script.src = GT_SCRIPT_URL
    script.async = true
    document.head.appendChild(script)
  })
}

/**
 * Programmatically trigger Google Translate to translate the page
 * to the specified language code.
 */
export function translatePage(langCode: string): void {
  // Google Translate stores the current language in a cookie named 'googtrans'
  // Format: /en/<target_lang>
  const value = langCode === 'en' ? '' : `/en/${langCode}`

  // Set the cookie (Google Translate reads this)
  document.cookie = `googtrans=${value};path=/`
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`

  // Store user preference
  try {
    if (langCode === 'en') {
      localStorage.removeItem(GT_STORAGE_KEY)
    } else {
      localStorage.setItem(GT_STORAGE_KEY, langCode)
    }
  } catch {}

  // If the Google Translate widget select exists, change its value
  const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
  if (selectEl) {
    selectEl.value = langCode === 'en' ? '' : langCode
    selectEl.dispatchEvent(new Event('change'))
  } else {
    // Widget not ready yet — reload with cookie set
    window.location.reload()
  }
}

/**
 * Reset page to original English content
 */
export function resetTranslation(): void {
  translatePage('en')

  // Also try to restore via the Google Translate banner
  const frame = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement | null
  if (frame) {
    const closeBtn = frame.contentDocument?.querySelector('.goog-close-link') as HTMLElement | null
    closeBtn?.click()
  }
}

/**
 * Get the currently active Google Translate language from storage
 */
export function getStoredGTLang(): string | null {
  try {
    return localStorage.getItem(GT_STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Inject CSS to hide the Google Translate banner/toolbar and
 * prevent the page from being pushed down by the iframe bar.
 */
export function injectGTStyles(): void {
  const id = 'veritas-gt-styles'
  if (document.getElementById(id)) return

  const style = document.createElement('style')
  style.id = id
  style.textContent = `
    /* Hide the Google Translate top banner */
    .goog-te-banner-frame { display: none !important; }
    body { top: 0 !important; }

    /* Hide the default Google Translate widget */
    #google_translate_element { display: none !important; }

    /* Fix Google Translate injected styles that break layout */
    .skiptranslate { display: none !important; }
    body { top: 0 !important; position: static !important; }

    /* Prevent FOUC on translated text */
    .goog-text-highlight { background: none !important; box-shadow: none !important; }
  `
  document.head.appendChild(style)
}

import { Link } from 'react-router-dom'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  tone?: 'light' | 'dark'
}

export default function MarketingConsentField({ checked, onChange, tone = 'light' }: Props) {
  const textClass = tone === 'dark' ? 'text-white/70' : 'text-ink-muted'
  const linkClass = tone === 'dark' ? 'text-white hover:text-crimson-light' : 'text-crimson hover:text-crimson-dark'
  const checkboxClass = tone === 'dark'
    ? 'border-white/35 bg-white/10'
    : 'border-border bg-surface'

  return (
    <label className="flex items-start gap-2.5 mt-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={`mt-0.5 h-4 w-4 shrink-0 rounded-sm border ${checkboxClass} text-crimson focus:ring-2 focus:ring-crimson/30`}
      />
      <span className={`font-sans text-[0.65rem] leading-relaxed ${textClass}`}>
        I agree to receive email updates from Veritas Press and understand I can unsubscribe at any time. See the{' '}
        <Link to="/privacy" className={`underline underline-offset-2 transition-colors ${linkClass}`}>
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  )
}

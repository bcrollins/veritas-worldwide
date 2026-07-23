import { Link } from 'react-router-dom'

type Props = {
  assetLabel?: string
  className?: string
}

/**
 * Rights packaging near download/export surfaces — CC BY-NC-SA 4.0, entity attribution.
 */
export default function LicenseCard({ assetLabel = 'This export', className = '' }: Props) {
  return (
    <div
      className={`rounded-sm border border-border bg-parchment/50 px-4 py-3 ${className}`}
      role="note"
      aria-label="License and attribution"
    >
      <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
        License
      </p>
      <p className="mt-1 font-body text-sm text-ink-muted leading-relaxed">
        {assetLabel} is published by <strong className="text-ink">Veritas Worldwide</strong> under{' '}
        <strong className="text-ink">CC BY-NC-SA 4.0</strong> (non-commercial share-alike). Attribute the
        publisher entity — not a personal author. Commercial reuse requires written permission.
      </p>
      <p className="mt-2 font-body text-xs text-ink-faint">
        <Link to="/terms" className="text-crimson hover:underline">
          Terms
        </Link>
        {' · '}
        <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:underline">
          rights@veritasworldwide.com
        </a>
      </p>
    </div>
  )
}

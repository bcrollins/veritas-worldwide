type Props = {
  /** Page path or title for the mailto subject (entity-only; no personal names). */
  pageLabel?: string
  className?: string
}

/**
 * Standardized corrections path — entity mailbox only.
 */
export default function CorrectionsCTA({ pageLabel = 'Veritas page', className = '' }: Props) {
  const subject = encodeURIComponent(`Correction: ${pageLabel}`)
  const body = encodeURIComponent(
    [
      'Page:',
      typeof window !== 'undefined' ? window.location.href : '',
      '',
      'Claim or passage:',
      '',
      'Suggested correction + primary source URL:',
      '',
      '—',
      'Sent via Veritas corrections CTA. Publisher: Veritas Worldwide.',
    ].join('\n'),
  )
  const href = `mailto:corrections@veritasworldwide.com?subject=${subject}&body=${body}`

  return (
    <p className={`font-body text-sm text-ink-muted leading-relaxed ${className}`}>
      Found an error?{' '}
      <a
        href={href}
        className="inline-flex min-h-[44px] items-center font-sans font-semibold text-crimson hover:underline"
      >
        Email corrections@veritasworldwide.com
      </a>
      {' '}
      with the page URL, the claim, and a primary source. Rights:{' '}
      <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:underline">
        rights@veritasworldwide.com
      </a>
      .
    </p>
  )
}

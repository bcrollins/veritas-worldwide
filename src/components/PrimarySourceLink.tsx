import type { AnchorHTMLAttributes, ReactNode } from 'react'

export type PrimarySourceLinkProps = {
  href?: string | null
  /** Preferred when hosts block automated probes or live links rot. */
  archiveHref?: string | null
  title?: string
  children?: ReactNode
  className?: string
  showArchiveBadge?: boolean
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className' | 'title'>

/**
 * One-tap primary-source open with archive-first preference.
 * Always opens in a new tab with rel=noopener noreferrer.
 */
export default function PrimarySourceLink({
  href,
  archiveHref,
  title,
  children,
  className = 'inline-flex min-h-[44px] items-center text-crimson hover:underline',
  showArchiveBadge = true,
  ...rest
}: PrimarySourceLinkProps) {
  const primary = (archiveHref || href || '').trim()
  const secondary = archiveHref && href && archiveHref !== href ? href.trim() : ''

  if (!primary) {
    return (
      <span className="font-body text-sm text-ink-faint" title={title}>
        {children || 'Source unavailable'}
      </span>
    )
  }

  const label = title || (typeof children === 'string' ? children : 'Primary source')
  const usingArchive = Boolean(archiveHref && primary === archiveHref)

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <a
        href={primary}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        title={label}
        aria-label={usingArchive ? `${label} (archive copy)` : label}
        {...rest}
      >
        {children || label}
        {usingArchive && showArchiveBadge ? (
          <span className="ml-1 font-sans text-[0.6rem] font-bold uppercase tracking-wider text-ink-faint">
            archive
          </span>
        ) : null}
      </a>
      {secondary ? (
        <a
          href={secondary}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] uppercase tracking-wider text-ink-muted hover:text-crimson"
          aria-label={`${label} (live host)`}
        >
          live →
        </a>
      ) : null}
    </span>
  )
}

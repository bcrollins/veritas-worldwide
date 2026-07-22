import React from 'react'

interface VeritasLogoProps {
  variant?: 'icon' | 'full'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showWordmark?: boolean
}

const SIZES = {
  xs: { icon: 32, full: 160 },
  sm: { icon: 44, full: 240 },
  md: { icon: 64, full: 360 },
  lg: { icon: 160, full: 480 },
  xl: { icon: 256, full: 600 },
} as const

/**
 * Veritas Worldwide Logo v2
 * Publisher seal: serif V inside concentric crimson rings.
 * Clean institutional mark — documentary archive aesthetic.
 */
export default function VeritasLogo({
  variant = 'icon',
  size = 'md',
  className = '',
  showWordmark = false,
}: VeritasLogoProps) {
  const w = SIZES[size][variant]
  const uid = React.useId().replace(/:/g, '')

  if (variant === 'icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={w}
        height={w}
        className={className}
        role="img"
        aria-label="Veritas Worldwide emblem"
      >
        <rect width="512" height="512" rx="48" className="fill-parchment" />
        <circle
          cx="256"
          cy="256"
          r="210"
          fill="none"
          stroke="currentColor"
          className="text-crimson"
          strokeWidth="10"
        />
        <circle
          cx="256"
          cy="256"
          r="192"
          fill="none"
          stroke="currentColor"
          className="text-crimson"
          strokeWidth="3"
          opacity="0.85"
        />
        <circle
          cx="256"
          cy="256"
          r="178"
          fill="none"
          stroke="currentColor"
          className="text-crimson"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <path
          d="M118 128 L156 128 C160 128 163 130 165 134 L250 348 L256 364 L262 348 L347 134 C349 130 352 128 356 128 L394 128 C399 128 402 131 400 136 L270 402 C266 412 256 418 256 418 C256 418 246 412 242 402 L112 136 C110 131 113 128 118 128 Z"
          className="fill-ink"
        />
        <rect x="108" y="122" width="68" height="8" rx="1.5" className="fill-ink" />
        <rect x="336" y="122" width="68" height="8" rx="1.5" className="fill-ink" />
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 700"
      width={w}
      className={className}
      role="img"
      aria-label="Veritas Worldwide"
    >
      <rect width="600" height="700" className="fill-parchment" />
      <g transform="translate(150,70)">
        <circle
          cx="150"
          cy="150"
          r="130"
          fill="none"
          stroke="currentColor"
          className="text-crimson"
          strokeWidth="8"
        />
        <circle
          cx="150"
          cy="150"
          r="116"
          fill="none"
          stroke="currentColor"
          className="text-crimson"
          strokeWidth="2.5"
          opacity="0.85"
        />
        <path
          d="M58 68 L88 68 C91 68 94 70 95 73 L145 220 L150 234 L155 220 L205 73 C206 70 209 68 212 68 L242 68 C246 68 249 71 247 75 L162 252 C159 260 150 266 150 266 C150 266 141 260 138 252 L53 75 C51 71 54 68 58 68 Z"
          className="fill-ink"
        />
        <rect x="52" y="62" width="50" height="7" rx="1" className="fill-ink" />
        <rect x="198" y="62" width="50" height="7" rx="1" className="fill-ink" />
      </g>
      {showWordmark && (
        <>
          <text
            x="300"
            y="480"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="52"
            fontWeight="700"
            letterSpacing="12"
            className="fill-ink"
          >
            VERITAS
          </text>
          <line
            x1="180"
            y1="510"
            x2="420"
            y2="510"
            stroke="currentColor"
            className="text-crimson"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="545"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontSize="15"
            fontWeight="500"
            letterSpacing="6"
            fill="#666666"
          >
            WORLDWIDE PRESS
          </text>
          <text
            x="300"
            y="590"
            textAnchor="middle"
            fontFamily="'Source Serif 4', Georgia, serif"
            fontSize="12"
            fontStyle="italic"
            letterSpacing="3"
            fill="#999999"
          >
            THE DOCUMENTARY RECORD
          </text>
        </>
      )}
      {/* uid reserved for future gradient defs without collisions */}
      <defs>
        <clipPath id={`vl-${uid}`}>
          <rect width="600" height="700" />
        </clipPath>
      </defs>
    </svg>
  )
}

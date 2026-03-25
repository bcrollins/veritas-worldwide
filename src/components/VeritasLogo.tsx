import React from 'react'

interface VeritasLogoProps {
  variant?: 'icon' | 'full'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showWordmark?: boolean
}

const SIZES = {
  xs: { icon: 24, full: 120 },
  sm: { icon: 32, full: 200 },
  md: { icon: 48, full: 300 },
  lg: { icon: 128, full: 400 },
  xl: { icon: 200, full: 500 },
} as const

/**
 * Veritas Worldwide Press Logo
 * V for Vendetta–inspired emblem with subtle allusions:
 * - Circled V (publisher's seal)
 * - Shadow figure at ~5.5% opacity
 * - Ghost mask traces at ~3.5% opacity
 * - Quill nib at V base
 * - Serif terminals
 */
export default function VeritasLogo({
  variant = 'icon',
  size = 'md',
  className = '',
  showWordmark = false,
}: VeritasLogoProps) {  const w = SIZES[size][variant]

  if (variant === 'icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={w}
        height={w}
        className={className}
        role="img"
        aria-label="Veritas Worldwide Press emblem"
      >
        <defs>
          <filter id="vl-sb" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          <filter id="vl-glow">
            <feGaussianBlur stdDeviation="1.5" result="glow"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="vl-cg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A52A2A"/>
            <stop offset="50%" stopColor="#8B1A1A"/>
            <stop offset="100%" stopColor="#6B1010"/>
          </linearGradient>
          <linearGradient id="vl-rg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B1A1A"/>
            <stop offset="100%" stopColor="#6B1010"/>
          </linearGradient>
        </defs>        {/* Background */}
        <rect width="512" height="512" rx="64" className="fill-parchment" />
        {/* Outer circle — vendetta seal */}
        <circle cx="256" cy="256" r="220" fill="none" stroke="url(#vl-rg)" strokeWidth="5" opacity="0.9"/>
        <circle cx="256" cy="256" r="207" fill="none" stroke="#8B1A1A" strokeWidth="0.75" opacity="0.4"/>
        {/* Shadow figure — ghosted cloaked silhouette */}
        <g opacity="0.055" filter="url(#vl-sb)">
          <ellipse cx="256" cy="120" rx="30" ry="35" fill="#1A1A1A"/>
          <path d="M256 155 C215 155 185 180 175 220 L165 295 C165 315 185 335 215 345 L240 350 L256 355 L272 350 L297 345 C327 335 347 315 347 295 L337 220 C327 180 297 155 256 155Z" fill="#1A1A1A"/>
          <path d="M175 220 L155 310 L195 350 L215 345 L185 280Z" fill="#1A1A1A"/>
          <path d="M337 220 L357 310 L317 350 L297 345 L327 280Z" fill="#1A1A1A"/>
        </g>
        {/* The V — bold, angular, serifed */}
        <g filter="url(#vl-glow)">
          <path d="M112 100 L130 100 C133 100 135 101 136 103 L253 370 L256 378 L259 370 L376 103 C377 101 379 100 382 100 L400 100 C403 100 404 101.5 403 104 L264 398 C261 405 256 412 256 412 C256 412 251 405 248 398 L109 104 C108 101.5 109 100 112 100Z" fill="url(#vl-cg)"/>
          <rect x="102" y="95" width="85" height="4.5" rx="1.5" fill="#8B1A1A"/>
          <rect x="325" y="95" width="85" height="4.5" rx="1.5" fill="#8B1A1A"/>
        </g>
        {/* Quill nib */}
        <g opacity="0.65">
          <path d="M256 412 L252 428 L256 448 L260 428 Z" fill="#8B1A1A"/>
        </g>
        {/* Ghost mask features */}
        <g opacity="0.035">
          <path d="M215 205 Q230 190 248 197" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M264 197 Q282 190 297 205" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M228 255 Q256 275 284 255" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      </svg>
    )
  }
  // Full logo with wordmark
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 700"
      width={w}
      className={className}
      role="img"
      aria-label="Veritas Worldwide Press"
    >
      <defs>
        <filter id="vlf-sb" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="vlf-glow">
          <feGaussianBlur stdDeviation="2" result="glow"/>
          <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="vlf-cg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A52A2A"/>
          <stop offset="50%" stopColor="#8B1A1A"/>
          <stop offset="100%" stopColor="#6B1010"/>
        </linearGradient>
        <linearGradient id="vlf-rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B1A1A"/>
          <stop offset="100%" stopColor="#6B1010"/>
        </linearGradient>
      </defs>      <rect width="600" height="700" className="fill-parchment"/>
      <circle cx="300" cy="280" r="200" fill="none" stroke="url(#vlf-rg)" strokeWidth="4" opacity="0.9"/>
      <circle cx="300" cy="280" r="188" fill="none" stroke="#8B1A1A" strokeWidth="0.75" opacity="0.5"/>
      {/* Shadow figure */}
      <g opacity="0.06" filter="url(#vlf-sb)">
        <ellipse cx="300" cy="155" rx="28" ry="32" fill="#1A1A1A"/>
        <path d="M300 187 C260 187 230 210 220 250 L210 320 C210 340 230 360 260 370 L280 375 L300 380 L320 375 L340 370 C370 360 390 340 390 320 L380 250 C370 210 340 187 300 187Z" fill="#1A1A1A"/>
        <path d="M220 250 L200 340 L240 380 L260 370 L230 310Z" fill="#1A1A1A"/>
        <path d="M380 250 L400 340 L360 380 L340 370 L370 310Z" fill="#1A1A1A"/>
      </g>
      {/* The V */}
      <g filter="url(#vlf-glow)">
        <path d="M168 140 L185 140 L190 140 C192 140 194 141 195 143 L297 395 L300 402 L303 395 L405 143 C406 141 408 140 410 140 L415 140 L432 140 C435 140 436 141 435 144 L308 420 C305 427 300 435 300 435 C300 435 295 427 292 420 L165 144 C164 141 165 140 168 140Z" fill="url(#vlf-cg)"/>
        <rect x="158" y="135" width="82" height="4" rx="1" fill="#8B1A1A"/>
        <rect x="158" y="141" width="82" height="1.5" rx="0.5" fill="#6B1010" opacity="0.5"/>
        <rect x="360" y="135" width="82" height="4" rx="1" fill="#8B1A1A"/>
        <rect x="360" y="141" width="82" height="1.5" rx="0.5" fill="#6B1010" opacity="0.5"/>
      </g>
      {/* Quill nib */}
      <g opacity="0.7">
        <path d="M300 435 L296 450 L300 470 L304 450 Z" fill="#8B1A1A"/>
        <line x1="300" y1="470" x2="300" y2="478" stroke="#8B1A1A" strokeWidth="1" opacity="0.5"/>
      </g>
      {/* Ghost mask */}
      <g opacity="0.04">
        <path d="M255 230 Q270 215 290 222" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M310 222 Q330 215 345 230" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M270 280 Q300 300 330 280" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      {/* Typography */}
      {showWordmark && (
        <>
          <text x="300" y="545" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="52" fontWeight="700" letterSpacing="12" className="fill-ink">VERITAS</text>
          <line x1="170" y1="560" x2="430" y2="560" stroke="#8B1A1A" strokeWidth="1" opacity="0.6"/>
          <text x="300" y="590" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="16" fontWeight="400" letterSpacing="6" fill="#666666">WORLDWIDE PRESS</text>
          <text x="300" y="630" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fontStyle="italic" letterSpacing="3" fill="#999999">THE DOCUMENTARY RECORD</text>
        </>
      )}
      {/* Corner brackets */}
      <g opacity="0.15" stroke="#8B1A1A" strokeWidth="1" fill="none">
        <path d="M20 20 L50 20 M20 20 L20 50"/>
        <path d="M580 20 L550 20 M580 20 L580 50"/>
        <path d="M20 680 L50 680 M20 680 L20 650"/>
        <path d="M580 680 L550 680 M580 680 L580 650"/>
      </g>
    </svg>
  )
}
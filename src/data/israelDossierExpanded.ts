import { ISRAEL_DOSSIER_CANON_CAROUSEL_SLIDES } from './israelDossierCanon'

export type {
  DossierStatCard as StatCard,
  DossierStatDetail as StatDetail,
  DossierDocumentedIncident as DocumentedIncident,
  DossierTimelineEvent as TimelineEvent,
  DossierLobbyingRecord as LobbyingRecord,
  DossierLegalCase as LegalCase,
} from './israelDossierCanon'

export {
  ISRAEL_DOSSIER_HISTORICAL_TIMELINE as HISTORICAL_TIMELINE,
  ISRAEL_DOSSIER_EXPANDED_INCIDENTS as EXPANDED_INCIDENTS,
  ISRAEL_DOSSIER_LOBBYING_DATA as LOBBYING_DATA,
  ISRAEL_DOSSIER_LEGAL_CASES as LEGAL_CASES,
  ISRAEL_DOSSIER_EXPANDED_STATS as EXPANDED_STATS,
} from './israelDossierCanon'
/**
 * ISRAEL DOSSIER — EXPANDED COMPATIBILITY EXPORTS
 * Canonical dossier records live in israelDossierCanon.ts.
 * This module preserves the historical import surface for page and asset code.
 */

// ═══════════════════════════════════════════════════════════
// INSTAGRAM CAROUSEL SLIDE DATA — 10 slides for viral content
// ═══════════════════════════════════════════════════════════

export interface CarouselSlide {
  headline: string
  stat?: string
  body: string
  source: string
  sourceUrl: string
  bgStyle: 'dark' | 'crimson' | 'light' | 'stat'
  imageUrl?: string
}

export const ISRAEL_DOSSIER_CAROUSEL: CarouselSlide[] = [
  {
    headline: 'The Israel Dossier',
    body: 'Every dollar traced. Every statistic sourced. Every incident documented.\n\nSwipe through the public record, then inspect the sources yourself.',
    source: 'Veritas Worldwide',
    sourceUrl: 'https://veritasworldwide.com/israel-dossier',
    bgStyle: 'dark',
  },
  ...ISRAEL_DOSSIER_CANON_CAROUSEL_SLIDES,
  {
    headline: 'Follow the Money',
    body: 'Congress approved $26.4B in emergency aid → Pentagon purchased 14,000+ MK-84 2,000-pound bombs → Bombs documented in strikes on refugee camps, safe zones, and hospitals.\n\nEvery link in the chain is sourced.',
    source: 'H.R.815 / DSCA / Responsible Statecraft',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
    bgStyle: 'light',
  },
  {
    headline: 'The World\'s Courts Have Ruled',
    stat: 'UNLAWFUL',
    body: 'ICJ: Israel\'s continued presence in the occupied Palestinian territory is unlawful. ICC: arrest warrants issued for Netanyahu and Gallant.\n\nRead the court records, not the slogans.',
    source: 'ICJ / ICC official records',
    sourceUrl: 'https://www.icj-cij.org/node/204176',
    bgStyle: 'stat',
  },
  {
    headline: '$180M+ Lobby Spending Record',
    stat: '$180M+',
    body: 'The pro-Israel lobby spent $180M+ in the 2024 election cycle. The record is documented through FEC filings and OpenSecrets aggregation.',
    source: 'OpenSecrets / FEC filings',
    sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
    bgStyle: 'crimson',
  },
  {
    headline: 'AI-Assisted Targeting Claims',
    body: 'Israeli intelligence sources described "Lavender" and "Where\'s Daddy?" to +972 Magazine and The Guardian. The dossier labels those claims by source and confidence level.',
    source: '+972 Magazine (six IDF intelligence officers)',
    sourceUrl: 'https://www.972mag.com/lavender-ai-israeli-army-gaza/',
    bgStyle: 'dark',
  },
  {
    headline: 'Infrastructure Losses',
    body: 'Education, housing, health, water, and food systems are tracked through UN agencies, satellite assessments, and humanitarian updates.\n\nThe source class matters as much as the number.',
    source: 'UNESCO / UNOSAT / IPC',
    sourceUrl: 'https://www.unesco.org/en/gaza/education',
    bgStyle: 'light',
  },
  {
    headline: 'Read the Full Dossier',
    body: 'Every statistic linked. Every source class labeled. Reported figures, estimates, court records, and analysis are kept separate.\n\nveritasworldwide.com/israel-dossier',
    source: 'Veritas Worldwide',
    sourceUrl: 'https://veritasworldwide.com/israel-dossier',
    bgStyle: 'crimson',
  },
]

// ═══════════════════════════════════════════════════════════
// PINNED POST IMAGE DATA
// ═══════════════════════════════════════════════════════════

export interface PinnedPostData {
  id: string
  title: string
  subtitle: string
  stat: string
  statLabel: string
  cta: string
  url: string
  bgStyle: 'dark-crimson' | 'parchment' | 'full-crimson'
}

export const PINNED_POSTS: PinnedPostData[] = [
  {
    id: 'pinned-dossier',
    title: 'THE ISRAEL DOSSIER',
    subtitle: 'Every dollar traced. Every casualty figure sourced. Every source linked.',
    stat: '$298B',
    statLabel: 'inflation-adjusted U.S. aid obligations.',
    cta: 'READ THE EVIDENCE',
    url: 'veritasworldwide.com/israel-dossier',
    bgStyle: 'dark-crimson',
  },
  {
    id: 'pinned-record',
    title: 'THE RECORD',
    subtitle: '32 archive parts. 500+ primary sources. 240 years of documented history.',
    stat: '100%',
    statLabel: 'free reader account access',
    cta: 'READ THE RECORD',
    url: 'veritasworldwide.com',
    bgStyle: 'parchment',
  },
  {
    id: 'pinned-mission',
    title: 'WE DON\'T TELL YOU WHAT TO THINK',
    subtitle: 'Primary sources only. Government documents. Court filings. Congressional records.',
    stat: '500+',
    statLabel: 'sources cited',
    cta: 'VERIFY IT YOURSELF',
    url: 'veritasworldwide.com/sources',
    bgStyle: 'full-crimson',
  },
]

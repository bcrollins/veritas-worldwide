'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { PowerProfile, PROFILES, searchProfiles, getProfilePhoto } from '../data/profileData'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { formatCompactDollars, getTopicProfileStats } from '../lib/topicDiscovery'
import { topicHubs } from '../data/topicHubs'

type SortOption = 'name-asc' | 'donations-desc' | 'claims-desc' | 'connections-desc'
type CategoryFilter = 'all' | 'politician' | 'billionaire' | 'lobbyist' | 'intel' | 'media' | 'corporate' | 'foreign-agent'

interface ProfileCardProps {
  profile: PowerProfile
}

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All Profiles',
  politician: 'Politicians',
  billionaire: 'Billionaires',
  lobbyist: 'Lobbyists',
  intel: 'Intelligence',
  media: 'Media',
  corporate: 'Corporate',
  'foreign-agent': 'Foreign Agents',
}

const CATEGORY_DESCRIPTIONS: Record<Exclude<CategoryFilter, 'all'>, string> = {
  politician: 'Officeholders, candidates, and legislators tied to the record.',
  billionaire: 'Capital-heavy actors shaping media, politics, and policy incentives.',
  lobbyist: 'Operatives, intermediaries, and influence specialists around Washington.',
  intel: 'Intelligence, national-security, and covert-power figures.',
  media: 'Narrative amplifiers and institutional media operators.',
  corporate: 'Executives and financial power centers shaping state and market behavior.',
  'foreign-agent': 'Actors whose documented roles intersect with foreign-state influence.',
}

const QUERY_SUGGESTIONS = ['AIPAC', 'Federal Reserve', 'CIA', 'Epstein', 'Wall Street', 'Big Tech']

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const categoryColors: Record<string, string> = {
    politician: '#1E40AF',
    billionaire: '#7C3AED',
    lobbyist: '#DC2626',
    intel: '#16A34A',
    media: '#EA580C',
    corporate: '#8B1A1A',
    'foreign-agent': '#6B7280',
  }

  const bgColor = categoryColors[profile.category] || '#8B1A1A'

  return (
    <Link
      to={`/profile/${profile.id}`}
      className="bg-parchment border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-2" style={{ backgroundColor: bgColor }} />

      <div className="p-4">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-parchment-dark flex items-center justify-center overflow-hidden">
          <img
            src={getProfilePhoto(profile.id)}
            alt={profile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src =
                'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%238B1A1A%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-size=%2230%22 font-weight=%22bold%22%3E' +
                profile.name
                  .split(' ')
                  .map((name: string) => name[0])
                  .join('') +
                '%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>

        <h3 className="font-display text-lg text-ink text-center mb-1">{profile.name}</h3>
        <p className="text-sm text-ink-muted text-center mb-3 font-body">{profile.title}</p>

        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <span className="inline-block px-2 py-1 bg-crimson text-white rounded text-xs font-body">
            {profile.category.replace('-', ' ')}
          </span>
          {profile.party && (
            <span className="inline-block px-2 py-1 bg-parchment-dark text-ink rounded text-xs font-body border border-border">
              {profile.party}
            </span>
          )}
        </div>

        <p className="text-xs font-body text-ink-muted text-center line-clamp-3 mb-3">
          {profile.summary}
        </p>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center text-xs font-sans">
          <div>
            <p className="text-crimson font-display font-bold">{profile.donations?.length || 0}</p>
            <p className="text-ink-faint">Donations</p>
          </div>
          <div>
            <p className="text-crimson font-display font-bold">{profile.sourcedClaims?.length || 0}</p>
            <p className="text-ink-faint">Claims</p>
          </div>
          <div>
            <p className="text-crimson font-display font-bold">{profile.connections?.length || 0}</p>
            <p className="text-ink-faint">Connections</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ProfilesIndexPage(): React.ReactNode {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'claims-desc')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    (searchParams.get('category') as CategoryFilter) || 'all'
  )

  const categories: CategoryFilter[] = [
    'all',
    'politician',
    'billionaire',
    'lobbyist',
    'intel',
    'media',
    'corporate',
    'foreign-agent',
  ]

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      all: PROFILES.length,
      politician: PROFILES.filter((profile) => profile.category === 'politician').length,
      billionaire: PROFILES.filter((profile) => profile.category === 'billionaire').length,
      lobbyist: PROFILES.filter((profile) => profile.category === 'lobbyist').length,
      intel: PROFILES.filter((profile) => profile.category === 'intel').length,
      media: PROFILES.filter((profile) => profile.category === 'media').length,
      corporate: PROFILES.filter((profile) => profile.category === 'corporate').length,
      'foreign-agent': PROFILES.filter((profile) => profile.category === 'foreign-agent').length,
    }
    return counts
  }, [])

  const overallStats = useMemo(
    () =>
      PROFILES.reduce(
        (summary, profile) => {
          summary.claims += profile.sourcedClaims.length
          summary.connections += profile.connections.length
          summary.donationVolume += profile.donations.reduce((sum, donation) => sum + donation.amount, 0)
          return summary
        },
        { claims: 0, connections: 0, donationVolume: 0 }
      ),
    []
  )

  const filteredProfiles = useMemo(() => {
    let results = searchProfiles(searchQuery)

    if (activeCategory !== 'all') {
      results = results.filter((profile) => profile.category === activeCategory)
    }

    switch (sortBy) {
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'donations-desc':
        results.sort(
          (a, b) =>
            b.donations.reduce((sum, donation) => sum + donation.amount, 0) -
            a.donations.reduce((sum, donation) => sum + donation.amount, 0)
        )
        break
      case 'claims-desc':
        results.sort((a, b) => b.sourcedClaims.length - a.sourcedClaims.length)
        break
      case 'connections-desc':
        results.sort((a, b) => b.connections.length - a.connections.length)
        break
    }

    return results
  }, [searchQuery, activeCategory, sortBy])

  const featuredProfiles = useMemo(() => [...PROFILES].sort((a, b) => b.sourcedClaims.length - a.sourcedClaims.length).slice(0, 4), [])

  const categorySnapshots = useMemo(
    () =>
      categories
        .filter((category): category is Exclude<CategoryFilter, 'all'> => category !== 'all')
        .map((category) => {
          const profiles = PROFILES.filter((profile) => profile.category === category)
          const claims = profiles.reduce((sum, profile) => sum + profile.sourcedClaims.length, 0)
          const donationVolume = profiles.reduce(
            (sum, profile) => sum + profile.donations.reduce((donationSum, donation) => donationSum + donation.amount, 0),
            0
          )
          const leadProfile = [...profiles].sort((a, b) => b.sourcedClaims.length - a.sourcedClaims.length)[0]

          return {
            category,
            count: profiles.length,
            claims,
            donationVolume,
            leadProfile,
          }
        }),
    [categories]
  )

  const beatSnapshots = useMemo(
    () =>
      topicHubs
        .map((topic) => ({
          topic,
          stats: getTopicProfileStats(topic),
        }))
        .filter((snapshot) => snapshot.stats.profileCount > 0)
        .sort((a, b) => b.stats.claimCount - a.stats.claimCount)
        .slice(0, 4),
    []
  )

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (sortBy !== 'claims-desc') params.set('sort', sortBy)
    if (activeCategory !== 'all') params.set('category', activeCategory)
    setSearchParams(params)
  }, [searchQuery, sortBy, activeCategory, setSearchParams])

  useEffect(() => {
    setMetaTags({
      title: `Power Profiles | ${SITE_NAME}`,
      description:
        'Browse comprehensive profiles of influential figures, politicians, financiers, lobbyists, intelligence actors, and other power brokers.',
      url: `${SITE_URL}/profiles`,
    })

    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Power Profiles',
        description: `Sourced profiles of ${PROFILES.length}+ politicians, billionaires, lobbyists, and power brokers. Every claim cited to public filings, congressional records, court documents, and verified journalism.`,
        url: `${SITE_URL}/profiles`,
        numberOfItems: PROFILES.length,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Power Profiles', item: `${SITE_URL}/profiles` },
        ],
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">
              Home
            </Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Power Profiles</span>
          </div>
        </div>
      </div>

      <section className="border-b border-border bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            Power Profiles
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight max-w-4xl">
            The people layer behind the record.
          </h1>
          <p className="font-body text-lg text-ink-muted leading-relaxed max-w-3xl mt-5">
            Veritas profiles are built to show who sits inside each corridor of power, what is documented
            about them, and where the evidence trail is strongest. This is the quickest way to move from a
            name to a network, then into the chapters, topic hubs, and source trail around that figure.
          </p>

          <div className="grid gap-4 mt-10 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-3xl font-bold text-ink">{PROFILES.length}</p>
              <p className="mt-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Profiles
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-3xl font-bold text-ink">{overallStats.claims}</p>
              <p className="mt-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Sourced claims
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-3xl font-bold text-ink">{overallStats.connections}</p>
              <p className="mt-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Connections logged
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-3xl font-bold text-ink">{formatCompactDollars(overallStats.donationVolume)}</p>
              <p className="mt-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Donation volume tracked
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Coverage Sectors
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categorySnapshots.map((snapshot) => (
            <button
              key={snapshot.category}
              type="button"
              onClick={() => setActiveCategory(snapshot.category)}
              className="text-left rounded-[28px] border border-border bg-surface p-6 transition-colors hover:border-crimson/35 hover:bg-parchment-dark/30"
            >
              <p className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.18em] text-crimson">
                {CATEGORY_LABELS[snapshot.category]}
              </p>
              <p className="mt-3 font-display text-3xl font-bold text-ink">{snapshot.count}</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                {CATEGORY_DESCRIPTIONS[snapshot.category]}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div>
                  <p className="font-display text-xl font-bold text-ink">{snapshot.claims}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Claims</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-ink">{formatCompactDollars(snapshot.donationVolume)}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Donations</p>
                </div>
              </div>
              {snapshot.leadProfile && (
                <p className="mt-4 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">
                  Lead profile: <span className="text-ink">{snapshot.leadProfile.name}</span>
                </p>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Most-Documented Figures
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-[28px] border border-border bg-surface p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.18em] text-crimson">
                Research Corridors
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink">
                Topic hubs with the deepest profile coverage
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                These topics currently connect the largest clusters of people, claims, and documented relationships
                in the profile layer.
              </p>
            </div>
            <Link
              to="/topics"
              className="inline-flex items-center rounded-full border border-border px-5 py-3 font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-ink hover:border-crimson hover:text-crimson transition-colors"
            >
              Browse Topic Hubs
            </Link>
          </div>
          <div className="grid gap-4 mt-6 md:grid-cols-2 xl:grid-cols-4">
            {beatSnapshots.map((snapshot) => (
              <Link
                key={snapshot.topic.slug}
                to={`/topics/${snapshot.topic.slug}`}
                className="rounded-2xl bg-parchment p-4 hover:bg-parchment-dark/60 transition-colors"
              >
                <p className="font-sans text-[0.56rem] font-bold uppercase tracking-[0.16em] text-crimson">
                  {snapshot.topic.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{snapshot.topic.name}</h3>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <p className="font-display text-xl font-bold text-ink">{snapshot.stats.profileCount}</p>
                    <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Profiles</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-ink">{snapshot.stats.claimCount}</p>
                    <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Claims</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Search The Profile Layer
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search profiles by name, institution, beat, or tag..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex-1 px-4 py-3 border border-border rounded bg-parchment text-ink font-body placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-crimson"
          />

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="px-4 py-3 border border-border rounded bg-parchment text-ink font-body focus:outline-none focus:ring-2 focus:ring-crimson"
          >
            <option value="claims-desc">Sort: Most Claims</option>
            <option value="connections-desc">Sort: Most Connections</option>
            <option value="donations-desc">Sort: Donations (High→Low)</option>
            <option value="name-asc">Sort: A-Z</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {QUERY_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setSearchQuery(suggestion)}
              className="inline-flex items-center rounded-full border border-border px-3 py-1.5 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ink-muted hover:border-crimson hover:text-crimson transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded text-sm font-body whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-crimson text-white'
                    : 'bg-parchment-dark text-ink border border-border hover:border-crimson'
                }`}
              >
                {CATEGORY_LABELS[category]}
                <span className="ml-2 font-display text-xs">({categoryCounts[category]})</span>
              </button>
            ))}
          </div>
        </div>

        {filteredProfiles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-ink-muted font-body mb-4">No profiles found matching your criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
                setSortBy('claims-desc')
              }}
              className="text-crimson hover:underline font-body"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-ink-muted font-body">
          Sources: All information compiled from publicly available records, news archives, financial disclosures,
          court documents, government databases, and verified reporting.
        </p>
      </div>
    </div>
  )
}

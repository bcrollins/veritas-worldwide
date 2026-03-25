'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  PowerProfile,
  PROFILES,
  searchProfiles,
  getProfilePhoto,
} from '../data/profileData';
import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  SITE_URL,
  SITE_NAME,
} from '../lib/seo';

type SortOption = 'name-asc' | 'donations-desc' | 'claims-desc' | 'connections-desc';
type CategoryFilter = 'all' | 'politician' | 'billionaire' | 'lobbyist' | 'intel' | 'media' | 'corporate' | 'foreign-agent';

interface ProfileCardProps {
  profile: PowerProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const categoryColors: Record<string, string> = {
    politician: '#1E40AF',
    billionaire: '#7C3AED',
    lobbyist: '#DC2626',
    intel: '#16A34A',
    media: '#EA580C',
    corporate: '#8B1A1A',
    'foreign-agent': '#6B7280',
  };

  const bgColor = categoryColors[profile.category] || '#8B1A1A';

  return (
    <Link
      to={`/profile/${profile.id}`}
      className="bg-parchment border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Category stripe */}
      <div className="h-2" style={{ backgroundColor: bgColor }}></div>

      <div className="p-4">
        {/* Photo or initials */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-parchment-dark flex items-center justify-center overflow-hidden">
          <img
            src={getProfilePhoto(profile.id)}
            alt={profile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%238B1A1A%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-size=%2230%22 font-weight=%22bold%22%3E' +
                profile.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('') +
                '%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Name */}
        <h3 className="font-display text-lg text-ink text-center mb-1">{profile.name}</h3>
        <p className="text-sm text-ink-muted text-center mb-3 font-body">{profile.title}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <span className="inline-block px-2 py-1 bg-crimson text-white rounded text-xs font-body">
            {profile.category}
          </span>
          {profile.party && (
            <span className="inline-block px-2 py-1 bg-parchment-dark text-ink rounded text-xs font-body border border-border">
              {profile.party}
            </span>
          )}
        </div>

        {/* Summary - 2 lines */}
        <p className="text-xs font-body text-ink-muted text-center line-clamp-2 mb-3">
          {profile.summary}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center text-xs font-sans">
          <div>
            <p className="text-crimson font-display font-bold">
              {profile.donations?.length || 0}
            </p>
            <p className="text-ink-faint">Donations</p>
          </div>
          <div>
            <p className="text-crimson font-display font-bold">
              {profile.sourcedClaims?.length || 0}
            </p>
            <p className="text-ink-faint">Claims</p>
          </div>
          <div>
            <p className="text-crimson font-display font-bold">
              {profile.connections?.length || 0}
            </p>
            <p className="text-ink-faint">Connections</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default function ProfilesIndexPage(): React.ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'name-asc'
  );
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    (searchParams.get('category') as CategoryFilter) || 'all'
  );

  const categories: CategoryFilter[] = [
    'all',
    'politician',
    'billionaire',
    'lobbyist',
    'intel',
    'media',
    'corporate',
    'foreign-agent',
  ];

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      all: PROFILES.length,
      politician: PROFILES.filter((p) => p.category === 'politician').length,
      billionaire: PROFILES.filter((p) => p.category === 'billionaire').length,
      lobbyist: PROFILES.filter((p) => p.category === 'lobbyist').length,
      intel: PROFILES.filter((p) => p.category === 'intel').length,
      media: PROFILES.filter((p) => p.category === 'media').length,
      corporate: PROFILES.filter((p) => p.category === 'corporate').length,
      'foreign-agent': PROFILES.filter((p) => p.category === 'foreign-agent').length,
    };
    return counts;
  }, []);

  // Filter and sort profiles
  const filteredProfiles = useMemo(() => {
    let results = searchProfiles(searchQuery);

    if (activeCategory !== 'all') {
      results = results.filter((p) => p.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'donations-desc':
        results.sort(
          (a, b) =>
            (b.donations?.reduce((sum, d) => sum + d.amount, 0) || 0) -
            (a.donations?.reduce((sum, d) => sum + d.amount, 0) || 0)
        );
        break;
      case 'claims-desc':
        results.sort((a, b) => (b.sourcedClaims?.length || 0) - (a.sourcedClaims?.length || 0));
        break;
      case 'connections-desc':
        results.sort((a, b) => (b.connections?.length || 0) - (a.connections?.length || 0));
        break;
    }

    return results;
  }, [searchQuery, activeCategory, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (sortBy !== 'name-asc') params.set('sort', sortBy);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    setSearchParams(params);
  }, [searchQuery, sortBy, activeCategory, setSearchParams]);

  // Set SEO tags
  useEffect(() => {
    setMetaTags({
      title: `Power Profiles | ${SITE_NAME}`,
      description: 'Browse comprehensive profiles of influential figures, politicians, and power brokers.',
      url: `${SITE_URL}/profiles`,
    });

    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Power Profiles',
        description: `Sourced profiles of ${PROFILES.length}+ politicians, billionaires, lobbyists, and power brokers. Every claim cited to FEC filings, congressional records, court documents, and verified journalism.`,
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
    ]);

    return () => {
      clearMetaTags();
      removeJsonLd();
    };
  }, []);
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-5xl text-ink mb-2">Power Profiles</h1>
        <p className="text-ink-muted font-body">
          {filteredProfiles.length} {filteredProfiles.length === 1 ? 'profile' : 'profiles'}
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-border rounded bg-parchment text-ink font-body placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-crimson"
        />

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-2 border border-border rounded bg-parchment text-ink font-body focus:outline-none focus:ring-2 focus:ring-crimson"
        >
          <option value="name-asc">Sort: A-Z</option>
          <option value="donations-desc">Sort: Donations (High→Low)</option>
          <option value="claims-desc">Sort: Most Claims</option>
          <option value="connections-desc">Sort: Most Connections</option>
        </select>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded text-sm font-body whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-crimson text-white'
                  : 'bg-parchment-dark text-ink border border-border hover:border-crimson'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              <span className="ml-2 font-display text-xs">({categoryCounts[category]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
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
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setSortBy('name-asc');
            }}
            className="text-crimson hover:underline font-body"
          >
            Clear filters
          </button>
        </div>
      )}
      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-ink-muted font-body">
          Sources: All information compiled from publicly available records, news archives, financial disclosures, and verified databases.
        </p>
      </div>
    </div>
  );
}
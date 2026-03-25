'use client';

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  PowerProfile,
  EvidenceTier,
  TIER_COLORS,
  PROFILES,
  getProfileBySlug,
  getProfilePhoto,
  searchProfiles,
} from '../data/profileData';
import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  SITE_URL,
  SITE_NAME,
} from '../lib/seo';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-parchment-dark hover:bg-parchment-dark/80 transition-colors"
      >
        <h3 className="font-display text-lg text-crimson">{title}</h3>
        <span className="text-ink">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="px-6 py-4">{children}</div>}
    </div>
  );
};

interface TierBadgeProps {
  tier: EvidenceTier;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const color = TIER_COLORS[tier] || '#8B1A1A';
  return (
    <span
      className="inline-block px-3 py-1 rounded text-white text-sm font-body"
      style={{ backgroundColor: color }}
    >
      {tier}
    </span>
  );
};
export default function ProfilePage(): React.ReactNode {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<PowerProfile | null>(null);
  const [relatedProfiles, setRelatedProfiles] = useState<PowerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Profile not found');
      setLoading(false);
      return;
    }

    const foundProfile = getProfileBySlug(slug);
    if (!foundProfile) {
      setError(`Profile "${slug}" not found`);
      setLoading(false);
      return;
    }

    setProfile(foundProfile);

    // Get related profiles (same category, excluding current)
    const related = searchProfiles('').filter(
      (p) => p.category === foundProfile.category && p.id !== foundProfile.id
    );
    setRelatedProfiles(related.slice(0, 4));

    // Set SEO tags
    setMetaTags({
      title: `${foundProfile.name} | ${SITE_NAME}`,
      description: foundProfile.summary,
      url: `${SITE_URL}/profile/${foundProfile.id}`,
    });

    // Set JSON-LD schema — enriched Person markup for 91 profile pages
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: foundProfile.name,
        url: `${SITE_URL}/profile/${foundProfile.id}`,
        description: foundProfile.summary,
        ...(foundProfile.title && { jobTitle: foundProfile.title }),
        ...(foundProfile.category && { knowsAbout: foundProfile.category }),
        image: getProfilePhoto(foundProfile.id),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Power Profiles', item: `${SITE_URL}/profiles` },
          { '@type': 'ListItem', position: 3, name: foundProfile.name, item: `${SITE_URL}/profile/${foundProfile.id}` },
        ],
      },
    ]);

    setLoading(false);

    return () => {
      clearMetaTags();
      removeJsonLd();
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-ink-muted">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-crimson font-display text-xl">{error || 'Profile not found'}</p>
        <Link to="/profiles" className="text-crimson hover:underline mt-4 inline-block">
          ← Back to Profiles
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-muted mb-8 font-body">
        <Link to="/" className="text-crimson hover:underline">
          Home
        </Link>
        {' > '}
        <Link to="/profiles" className="text-crimson hover:underline">
          Profiles
        </Link>
        {' > '}
        <span className="text-ink">{profile.name}</span>
      </nav>

      {/* Two-column layout */}
      <div className="flex flex-col xl:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="flex-1">
          {/* Hero Card */}
          <div className="bg-parchment border border-border rounded-lg overflow-hidden mb-8">
            {/* Category stripe */}
            <div
              className="h-2"
              style={{
                backgroundColor:
                  profile.category === 'politician'
                    ? '#1E40AF'
                    : profile.category === 'billionaire'
                      ? '#7C3AED'
                      : '#8B1A1A',
              }}
            ></div>

            <div className="p-8">
              {/* Photo or Initials */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-parchment-dark flex items-center justify-center overflow-hidden">
                <img
                  src={getProfilePhoto(profile.id)}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%238B1A1A%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-size=%2240%22 font-weight=%22bold%22%3E' +
                      profile.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('') +
                      '%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Name and Title */}
              <h1 className="font-display text-4xl text-ink text-center mb-2">{profile.name}</h1>
              <p className="text-ink-muted text-center mb-6 font-body">{profile.title}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                <span className="px-3 py-1 bg-crimson text-white rounded text-sm font-body">
                  {profile.category}
                </span>
                {profile.party && (
                  <span className="px-3 py-1 bg-parchment-dark text-ink rounded text-sm font-body border border-border">
                    {profile.party}
                  </span>
                )}
              </div>

              {/* Summary */}
              <p className="text-ink font-body text-center mb-6 leading-relaxed">{profile.summary}</p>

              {/* Tags */}
              {profile.tags && profile.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.tags.map((tag: string) => (
                    <span key={tag} className="text-xs text-ink-muted font-sans">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Sourced Claims Section */}
          {profile.sourcedClaims && profile.sourcedClaims.length > 0 && (
            <Section title="Sourced Claims" defaultOpen={true}>
              <div className="space-y-4">
                {profile.sourcedClaims.map((claim, idx) => (
                  <div key={idx} className="border-l-4 border-crimson pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-ink font-body flex-1">{claim.claim}</p>
                      {claim.tier && <TierBadge tier={claim.tier} />}
                    </div>
                    {claim.source && (
                      <p className="text-sm text-ink-muted font-sans">{claim.source}</p>
                    )}
                    {claim.date && (
                      <p className="text-xs text-ink-faint font-sans mt-1">{claim.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Donation History Section */}
          {profile.donations && profile.donations.length > 0 && (
            <Section title="Donation History" defaultOpen={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-ink">Year</th>
                      <th className="text-left py-2 text-ink">Recipient</th>
                      <th className="text-right py-2 text-ink">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.donations.map((donation, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-parchment-dark">
                        <td className="py-2 text-ink-muted">{donation.year}</td>
                        <td className="py-2 text-ink">{donation.from}</td>
                        <td className="py-2 text-right text-crimson font-display">
                          ${donation.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {/* Notable Quotes Section */}
          {profile.quotes && profile.quotes.length > 0 && (
            <Section title="Notable Quotes" defaultOpen={false}>
              <div className="space-y-4">
                {profile.quotes.map((quote, idx) => (
                  <blockquote key={idx} className="border-l-4 border-crimson pl-4 italic text-ink font-body">
                    "{quote.text}"
                    {quote.source && <p className="text-ink-muted text-sm mt-2">— {quote.source}</p>}
                  </blockquote>
                ))}
              </div>
            </Section>
          )}
          {/* Policy Actions Section */}
          {profile.policyActions && profile.policyActions.length > 0 && (
            <Section title="Policy Actions" defaultOpen={false}>
              <div className="space-y-4">
                {profile.policyActions.map((action, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-2 bg-crimson rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-ink font-body font-semibold">{action.action}</p>
                      {action.date && <p className="text-sm text-ink-muted font-sans">{action.date}</p>}
                      {action.context && (
                        <p className="text-ink-muted font-body text-sm mt-1">{action.context}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Network Connections Section */}
          {profile.connections && profile.connections.length > 0 && (
            <Section title="Network Connections" defaultOpen={false}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.connections.map((connection, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-parchment-dark rounded border border-border hover:border-crimson transition-colors"
                  >
                    <p className="font-display text-sm text-crimson">{connection.name}</p>
                    <p className="text-xs text-ink-muted font-body">{connection.relationship}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* RIGHT COLUMN - Sidebar */}
        <div className="xl:w-80 space-y-6">
          {/* Quick Facts */}
          <div className="bg-parchment border border-border rounded-lg p-6">
            <h3 className="font-display text-lg text-crimson mb-4">Quick Facts</h3>
            <div className="space-y-3 text-sm font-body">
              {profile.born && (
                <div>
                  <p className="text-ink-muted">Born</p>
                  <p className="text-ink">{profile.born}</p>
                </div>
              )}
              {profile.education && (
                <div>
                  <p className="text-ink-muted">Education</p>
                  <p className="text-ink">{profile.education}</p>
                </div>
              )}
              {profile.netWorth && (
                <div>
                  <p className="text-ink-muted">Net Worth</p>
                  <p className="text-ink font-display">${profile.netWorth.toLocaleString()}</p>
                </div>
              )}
              {profile.state && (
                <div>
                  <p className="text-ink-muted">State</p>
                  <p className="text-ink">{profile.state}</p>
                </div>
              )}
            </div>
          </div>

          {/* Career Timeline */}
          {profile.career && profile.career.length > 0 && (
            <div className="bg-parchment border border-border rounded-lg p-6">
              <h3 className="font-display text-lg text-crimson mb-4">Career Timeline</h3>
              <div className="space-y-3">
                {profile.career.map((entry, idx) => (
                  <div key={idx} className="text-sm font-body flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-crimson mt-1.5 flex-shrink-0" />
                    <p className="text-ink leading-relaxed">{entry}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* External Links */}
          {profile.websites && profile.websites.length > 0 && (
            <div className="bg-parchment border border-border rounded-lg p-6">
              <h3 className="font-display text-lg text-crimson mb-4">External Links</h3>
              <div className="space-y-2">
                {profile.websites.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-crimson hover:underline font-body truncate"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Tier Legend */}
          <div className="bg-parchment border border-border rounded-lg p-6">
            <h3 className="font-display text-lg text-crimson mb-4">Evidence Tiers</h3>
            <div className="space-y-2 text-xs font-body">
              {Object.entries(TIER_COLORS).map(([tier, color]) => (
                <div key={tier} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="text-ink">{tier}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Profiles */}
          {relatedProfiles.length > 0 && (
            <div className="bg-parchment border border-border rounded-lg p-6">
              <h3 className="font-display text-lg text-crimson mb-4">Related Profiles</h3>
              <div className="space-y-2">
                {relatedProfiles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/profile/${related.id}`}
                    className="block p-2 rounded hover:bg-parchment-dark transition-colors"
                  >
                    <p className="text-sm font-body text-crimson hover:underline">
                      {related.name}
                    </p>
                    <p className="text-xs text-ink-muted">{related.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-parchment-dark border border-border rounded-lg p-6 text-xs font-body text-ink-muted">
            <p>
              All information presented on this site is compiled from publicly available sources.
              We strive for accuracy but do not guarantee complete or current information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
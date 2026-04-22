'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
import { trackShare, trackProfileView } from '../lib/ga4';
import SharePanel from '../components/SharePanel';
import { DONATE_URL } from '../lib/constants';
import { scoreProfileViewed } from '../lib/leadScoring';

/* ── Constants ──────────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, { gradient: string; badge: string; text: string }> = {
  politician: { gradient: 'from-[#1E40AF] to-[#8B1A1A]', badge: 'bg-[#1E40AF]', text: '#1E40AF' },
  billionaire: { gradient: 'from-[#7C3AED] to-[#B8860B]', badge: 'bg-[#7C3AED]', text: '#7C3AED' },
  lobbyist: { gradient: 'from-[#DC2626] to-[#8B1A1A]', badge: 'bg-[#DC2626]', text: '#DC2626' },
  intel: { gradient: 'from-[#16A34A] to-[#1A1A1A]', badge: 'bg-[#16A34A]', text: '#16A34A' },
  media: { gradient: 'from-[#EA580C] to-[#8B1A1A]', badge: 'bg-[#EA580C]', text: '#EA580C' },
  corporate: { gradient: 'from-[#8B1A1A] to-[#1A1A1A]', badge: 'bg-[#8B1A1A]', text: '#8B1A1A' },
  'foreign-agent': { gradient: 'from-[#6B7280] to-[#1A1A1A]', badge: 'bg-[#6B7280]', text: '#6B7280' },
};

const PARTY_COLORS: Record<string, string> = {
  R: '#DC2626',
  D: '#2563EB',
  I: '#7C3AED',
  'N/A': '#6B7280',
};

const SECTION_IDS = ['overview', 'claims', 'donations', 'quotes', 'policy', 'connections'] as const;
type SectionId = typeof SECTION_IDS[number];

const SECTION_LABELS: Record<SectionId, string> = {
  overview: 'Overview',
  claims: 'Sourced Claims',
  donations: 'Donations',
  quotes: 'Quotes',
  policy: 'Policy Actions',
  connections: 'Connections',
};

function getProfileInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .slice(0, 3)
    .toUpperCase() || '?';
}

function getProfileInitialsImage(name: string): string {
  const initials = getProfileInitials(name);
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#8B1A1A"/><text x="50" y="56" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="34" font-weight="700">${initials}</text></svg>`)}`;
}

/* ── Utility: Animated Counter ──────────────────────────────── */
function useAnimatedCounter(end: number, duration = 1200): number {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setValue(end); hasAnimated.current = true; return; }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return;
      hasAnimated.current = true;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return value;
}

function StatCounter({ end, label, prefix = '', suffix = '' }: {
  end: number; label: string; prefix?: string; suffix?: string;
}) {
  const value = useAnimatedCounter(end);
  const ref = useRef<HTMLDivElement>(null);
  // Attach ref for IntersectionObserver — reuse hook logic
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl md:text-4xl font-bold text-crimson" aria-label={`${prefix}${end.toLocaleString()}${suffix}`}>
        {prefix}{value.toLocaleString()}{suffix}
      </p>
      <p className="font-sans text-xs text-ink-muted uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

/* ── Sub-component: Evidence Tier Badge ─────────────────────── */
const TierBadge: React.FC<{ tier: EvidenceTier }> = ({ tier }) => {
  const colors: Record<EvidenceTier, { bg: string; text: string; border: string; label: string }> = {
    verified: { bg: 'bg-[#F0FDF4]', text: 'text-[#166534]', border: 'border-[#166534]/20', label: 'Verified — Primary source documents' },
    circumstantial: { bg: 'bg-[#FFFBEB]', text: 'text-[#92400E]', border: 'border-[#92400E]/20', label: 'Circumstantial — Facts verified, connection interpreted' },
    disputed: { bg: 'bg-[#FEF2F2]', text: 'text-[#991B1B]', border: 'border-[#991B1B]/20', label: 'Disputed — Claimed but not independently confirmed' },
  };
  const c = colors[tier] || colors.verified;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold font-sans uppercase tracking-wider border ${c.bg} ${c.text} ${c.border}`}
      title={c.label}
      aria-label={c.label}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TIER_COLORS[tier] }} aria-hidden="true" />
      {tier}
    </span>
  );
};

/* ── Sub-component: Evidence Donut Chart ────────────────────── */
function EvidenceDonut({ claims }: { claims: { tier: EvidenceTier }[] }) {
  const counts = useMemo(() => {
    const c = { verified: 0, circumstantial: 0, disputed: 0 };
    claims.forEach(cl => { if (cl.tier in c) c[cl.tier as keyof typeof c]++; });
    return c;
  }, [claims]);

  const total = counts.verified + counts.circumstantial + counts.disputed;
  if (total === 0) return null;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { tier: 'verified' as EvidenceTier, count: counts.verified, color: '#166534' },
    { tier: 'circumstantial' as EvidenceTier, count: counts.circumstantial, color: '#92400E' },
    { tier: 'disputed' as EvidenceTier, count: counts.disputed, color: '#991B1B' },
  ].filter(s => s.count > 0);

  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0" aria-label={`Evidence breakdown: ${counts.verified} verified, ${counts.circumstantial} circumstantial, ${counts.disputed} disputed`}>
        {segments.map((seg) => {
          const pct = seg.count / total;
          const dashLen = pct * circumference;
          const dashOff = offset;
          offset += dashLen;
          return (
            <circle
              key={seg.tier}
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${dashLen} ${circumference - dashLen}`}
              strokeDashoffset={-dashOff}
              className="transition-all duration-700"
            />
          );
        })}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="font-display text-xl font-bold fill-ink">{total}</text>
      </svg>
      <div className="space-y-2">
        {segments.map(seg => (
          <div key={seg.tier} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} aria-hidden="true" />
            <span className="font-sans text-xs text-ink capitalize">{seg.tier}</span>
            <span className="font-display text-sm font-bold text-ink">{seg.count}</span>
            <span className="font-sans text-xs text-ink-faint">({Math.round((seg.count / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sub-component: Section Header ──────────────────────────── */
function SectionHeader({ id, title, count, children }: {
  id: string; title: string; count?: number; children?: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 pt-10 first:pt-0">
      <div className="flex items-center justify-between mb-6 border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
          {count !== undefined && count > 0 && (
            <span className="font-sans text-xs font-bold bg-crimson/10 text-crimson px-2.5 py-1 rounded-full">{count}</span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Sub-component: Source Link with Favicon ────────────────── */
function SourceLink({ url, label }: { url: string; label: string }) {
  let domain = '';
  try { domain = new URL(url).hostname.replace('www.', ''); } catch { domain = url; }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-crimson hover:text-crimson-dark hover:underline font-sans transition-colors"
      title={`View source: ${domain}`}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
        alt=""
        className="w-3.5 h-3.5 rounded-sm"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      {label || domain}
      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

/* ── Sub-component: Claim Card (Expandable) ─────────────────── */
function ClaimCard({ claim, index }: { claim: { claim: string; source: string; url: string; tier: EvidenceTier; date?: string }; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const tierBgColors: Record<EvidenceTier, string> = {
    verified: 'border-l-[#166534] bg-[#F0FDF4]/50',
    circumstantial: 'border-l-[#92400E] bg-[#FFFBEB]/50',
    disputed: 'border-l-[#991B1B] bg-[#FEF2F2]/50',
  };

  const handleShare = () => {
    const text = `${claim.claim} — Source: ${claim.source}`;
    const url = typeof window !== 'undefined' ? `${window.location.href}#claims` : '';
    if (navigator.share) {
      navigator.share({ title: 'Veritas Worldwide — Sourced Claim', text, url }).catch(() => {});
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&via=VeritasWorldwide`, '_blank');
    }
    trackShare('claim_share', `claim-${index}`);
  };

  return (
    <div className={`border-l-4 rounded-r-lg p-4 md:p-5 transition-all ${tierBgColors[claim.tier] || ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <TierBadge tier={claim.tier} />
            {claim.date && <span className="font-sans text-xs text-ink-faint">{claim.date}</span>}
          </div>
          <p className={`font-body text-sm text-ink leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
            {claim.claim}
          </p>
          {claim.claim.length > 200 && (
            <button onClick={() => setExpanded(!expanded)} className="font-sans text-xs text-crimson hover:underline mt-1">
              {expanded ? 'Show less' : 'Read full claim'}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <SourceLink url={claim.url} label={claim.source} />
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-ink-faint hover:text-crimson transition-colors rounded"
          aria-label="Share this claim"
          title="Share this evidence"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}

/* ── Sub-component: Donation Table (Sortable) ───────────────── */
function DonationTable({ donations }: { donations: PowerProfile['donations'] }) {
  const [sortField, setSortField] = useState<'year' | 'amount' | 'from'>('amount');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = useMemo(() => {
    return [...donations].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'amount') cmp = a.amount - b.amount;
      else if (sortField === 'year') cmp = a.year.localeCompare(b.year);
      else cmp = a.from.localeCompare(b.from);
      return sortDir === 'desc' ? -cmp : cmp;
    });
  }, [donations, sortField, sortDir]);

  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => (
    <svg className={`w-3 h-3 inline ml-1 transition-transform ${sortField === field ? 'text-crimson' : 'text-ink-faint'} ${sortField === field && sortDir === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body" data-testid="donation-table">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-3 px-2 cursor-pointer hover:text-crimson select-none" onClick={() => toggleSort('from')}>
              Source <SortIcon field="from" />
            </th>
            <th className="text-left py-3 px-2 cursor-pointer hover:text-crimson select-none" onClick={() => toggleSort('year')}>
              Period <SortIcon field="year" />
            </th>
            <th className="text-right py-3 px-2 cursor-pointer hover:text-crimson select-none" onClick={() => toggleSort('amount')}>
              Amount <SortIcon field="amount" />
            </th>
            <th className="text-right py-3 px-2 hidden sm:table-cell">Source</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((d, idx) => (
            <tr key={idx} className="border-b border-border/50 hover:bg-parchment-dark/50 transition-colors">
              <td className="py-3 px-2 text-ink">{d.from}</td>
              <td className="py-3 px-2 text-ink-muted">{d.year}</td>
              <td className="py-3 px-2 text-right font-display font-bold text-crimson">
                ${d.amount.toLocaleString()}
              </td>
              <td className="py-3 px-2 text-right hidden sm:table-cell">
                <SourceLink url={d.url} label={d.source} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-border bg-parchment-dark/30">
            <td className="py-3 px-2 font-semibold text-ink" colSpan={2}>Total Documented</td>
            <td className="py-3 px-2 text-right font-display text-lg font-bold text-crimson">
              ${total.toLocaleString()}
            </td>
            <td className="py-3 px-2 hidden sm:table-cell"></td>
          </tr>
        </tfoot>
      </table>
      {/* Donation Bar Visualization */}
      <div className="mt-6 space-y-2">
        <p className="font-sans text-xs text-ink-faint uppercase tracking-wider mb-3">Funding Sources by Amount</p>
        {sorted.filter(d => d.amount > 0).slice(0, 8).map((d, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="font-sans text-xs text-ink-muted w-36 truncate flex-shrink-0">{d.from}</span>
            <div className="flex-1 h-5 bg-parchment-dark rounded-sm overflow-hidden">
              <div
                className="h-full bg-crimson/70 rounded-sm transition-all duration-700"
                style={{ width: `${Math.max((d.amount / (sorted[0]?.amount || 1)) * 100, 2)}%` }}
              />
            </div>
            <span className="font-display text-xs font-bold text-ink w-24 text-right">${d.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sub-component: Interactive Career Timeline ─────────────── */
function CareerTimeline({ career }: { career: string[] }) {
  if (!career || career.length === 0) return null;
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" aria-hidden="true" />
      <div className="space-y-4">
        {career.map((entry, idx) => (
          <div key={idx} className="relative flex items-start gap-3 group">
            {/* Dot */}
            <div className={`absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-crimson flex-shrink-0 transition-colors ${idx === 0 ? 'bg-crimson' : 'bg-parchment group-hover:bg-crimson/30'}`}>
              {idx === 0 && (
                <span className="absolute inset-0 rounded-full bg-crimson animate-ping opacity-20" />
              )}
            </div>
            <p className="font-body text-sm text-ink leading-relaxed pl-2">{entry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sub-component: Sticky Section Nav ──────────────────────── */
function SectionNav({ activeSection, sections, onNav }: {
  activeSection: SectionId;
  sections: { id: SectionId; count: number }[];
  onNav: (id: SectionId) => void;
}) {
  return (
    <nav className="sticky top-[64px] z-30 bg-parchment/95 dark:bg-ink/95 backdrop-blur-sm border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 no-print" aria-label="Profile sections">
      <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => onNav(sec.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-sm font-sans text-xs font-semibold tracking-wide whitespace-nowrap transition-colors min-h-[44px] ${
              activeSection === sec.id
                ? 'bg-crimson text-white'
                : 'text-ink-muted hover:text-crimson hover:bg-crimson/5'
            }`}
            aria-current={activeSection === sec.id ? 'true' : undefined}
          >
            {SECTION_LABELS[sec.id]}
            {sec.count > 0 && (
              <span className={`text-[0.6rem] px-1.5 py-0.5 rounded-full ${
                activeSection === sec.id ? 'bg-white/20' : 'bg-parchment-dark'
              }`}>{sec.count}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── Sub-component: Connection Card ─────────────────────────── */
function ConnectionCard({ conn, allProfiles }: { conn: PowerProfile['connections'][number]; allProfiles: PowerProfile[] }) {
  const linkedProfile = allProfiles.find(p => p.name.toLowerCase() === conn.name.toLowerCase());
  const className = `block p-4 bg-parchment border border-border rounded-lg ${linkedProfile ? 'hover:border-crimson hover:shadow-md' : ''} transition-all group`;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-display text-sm font-bold text-crimson group-hover:text-crimson-dark transition-colors">{conn.name}</p>
        <TierBadge tier={conn.tier} />
      </div>
      <p className="text-xs text-ink font-body mb-1">{conn.relationship}</p>
      {conn.evidence && (
        <p className="text-xs text-ink-muted font-body leading-relaxed">{conn.evidence}</p>
      )}
      {linkedProfile && (
        <p className="text-xs text-crimson font-sans mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          View full profile →
        </p>
      )}
    </>
  );

  if (linkedProfile) {
    return <Link to={`/profile/${linkedProfile.id}`} className={className}>{inner}</Link>;
  }
  return <div className={className}>{inner}</div>;
}

/* ── Reading Time Calculator ────────────────────────────────── */
function calculateReadingTime(profile: PowerProfile): number {
  const allText = [
    profile.summary,
    ...profile.sourcedClaims.map(c => c.claim + ' ' + c.source),
    ...profile.quotes.map(q => q.text + ' ' + q.context),
    ...profile.policyActions.map(a => a.action + ' ' + a.context),
    ...profile.connections.map(c => c.relationship + ' ' + c.evidence),
    ...profile.donations.map(d => d.from + ' ' + d.source),
    ...profile.career,
  ].join(' ');
  const words = allText.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — Gold Standard Profile Page
   ═══════════════════════════════════════════════════════════════ */
export default function ProfilePage(): React.ReactNode {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<PowerProfile | null>(null);
  const [relatedProfiles, setRelatedProfiles] = useState<PowerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [tierFilter, setTierFilter] = useState<EvidenceTier | 'all'>('all');

  // ── Data Loading ─────────────────────────────────────────────
  useEffect(() => {
    if (!slug) { setError('Profile not found'); setLoading(false); return; }
    const foundProfile = getProfileBySlug(slug);
    if (!foundProfile) { setError(`Profile "${slug}" not found`); setLoading(false); return; }

    setProfile(foundProfile);
    const related = searchProfiles('').filter(
      (p) => p.category === foundProfile.category && p.id !== foundProfile.id
    );
    setRelatedProfiles(related.slice(0, 6));

    // SEO
    setMetaTags({
      title: `${foundProfile.name} — Power Profile | ${SITE_NAME}`,
      description: foundProfile.summary,
      url: `${SITE_URL}/profile/${foundProfile.id}`,
    });

    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: foundProfile.name,
        url: `${SITE_URL}/profile/${foundProfile.id}`,
        description: foundProfile.summary,
        ...(foundProfile.title && { jobTitle: foundProfile.title }),
        ...(foundProfile.category && { knowsAbout: foundProfile.category }),
        ...(foundProfile.born && { birthDate: foundProfile.born }),
        ...(foundProfile.education && { alumniOf: foundProfile.education }),
        image: getProfilePhoto(foundProfile.id),
        sameAs: foundProfile.websites?.map(w => w.url) || [],
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

    // Lead scoring + GA4
    try { scoreProfileViewed(foundProfile.id); } catch {}
    trackProfileView(foundProfile.id, foundProfile.category);

    setLoading(false);
    window.scrollTo(0, 0);
    return () => { clearMetaTags(); removeJsonLd(); };
  }, [slug]);

  // ── Scroll-based active section tracking ─────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (SECTION_IDS.includes(id)) setActiveSection(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [profile]);

  // ── Navigation handler ───────────────────────────────────────
  const handleNav = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  // ── Filtered claims ──────────────────────────────────────────
  const filteredClaims = useMemo(() => {
    if (!profile) return [];
    if (tierFilter === 'all') return profile.sourcedClaims;
    return profile.sourcedClaims.filter(c => c.tier === tierFilter);
  }, [profile, tierFilter]);

  // ── Computed stats ───────────────────────────────────────────
  const stats = useMemo(() => {
    if (!profile) return { totalDonations: 0, claimCount: 0, connectionCount: 0, sourceCount: 0, readingTime: 0 };
    return {
      totalDonations: profile.donations.reduce((s, d) => s + d.amount, 0),
      claimCount: profile.sourcedClaims.length,
      connectionCount: profile.connections.length,
      sourceCount: new Set([
        ...profile.sourcedClaims.map(c => c.source),
        ...profile.donations.map(d => d.source),
        ...profile.policyActions.map(a => a.source),
      ]).size,
      readingTime: calculateReadingTime(profile),
    };
  }, [profile]);

  // ── Section config for nav ───────────────────────────────────
  const sections = useMemo(() => {
    if (!profile) return [];
    return SECTION_IDS.map(id => ({
      id,
      count: id === 'overview' ? 0
        : id === 'claims' ? profile.sourcedClaims.length
        : id === 'donations' ? profile.donations.length
        : id === 'quotes' ? profile.quotes.length
        : id === 'policy' ? profile.policyActions.length
        : id === 'connections' ? profile.connections.length
        : 0,
    })).filter(s => s.id === 'overview' || s.count > 0);
  }, [profile]);

  // ── Loading State ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
          <div className="h-4 bg-parchment-dark rounded w-48" />
          <div className="flex gap-6">
            <div className="w-32 h-32 bg-parchment-dark rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-3 pt-4">
              <div className="h-8 bg-parchment-dark rounded w-64" />
              <div className="h-4 bg-parchment-dark rounded w-48" />
              <div className="h-4 bg-parchment-dark rounded w-full" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-parchment-dark rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  // ── Error State ──────────────────────────────────────────────
  if (error || !profile) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto">
          <p className="font-display text-5xl text-crimson mb-4">404</p>
          <p className="font-display text-xl text-ink mb-2">{error || 'Profile not found'}</p>
          <p className="font-body text-sm text-ink-muted mb-6">The profile you're looking for doesn't exist or has been moved.</p>
          <Link to="/profiles" className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white font-sans text-sm font-semibold rounded-sm hover:bg-crimson-dark transition-colors">
            ← Browse All Profiles
          </Link>
        </div>
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[profile.category] || CATEGORY_COLORS.politician;

  return (
    <article className="w-full max-w-[1920px] mx-auto" data-testid="profile-page">
      {/* ── Section Bar / Breadcrumb ──────────────────────────── */}
      <div className="border-b border-border bg-surface no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-2 text-[0.6rem] font-sans font-bold tracking-[0.15em] uppercase" aria-label="Breadcrumb">
            <Link to="/" className="text-ink-faint hover:text-crimson transition-colors">The Record</Link>
            <span className="text-ink-faint">/</span>
            <Link to="/profiles" className="text-ink-faint hover:text-crimson transition-colors">Profiles</Link>
            <span className="text-ink-faint">/</span>
            <Link to={`/profiles?category=${profile.category}`} className="text-ink-faint hover:text-crimson transition-colors capitalize">{profile.category.replace('-', ' ')}</Link>
            <span className="text-ink-faint">/</span>
            <span className="text-crimson">{profile.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Cinematic Hero Section ────────────────────────────── */}
      <div className={`relative bg-gradient-to-r ${catStyle.gradient} overflow-hidden`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\' fill=\'%23ffffff\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Portrait */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl bg-white/10">
                <img
                  src={getProfilePhoto(profile.id)}
                  alt={`Official portrait of ${profile.name}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%238B1A1A'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='36' font-weight='bold'%3E${profile.name.split(' ').map(n => n[0]).join('')}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
              {/* Party indicator dot */}
              {profile.party && (
                <div
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-3 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  style={{ backgroundColor: PARTY_COLORS[profile.party] || '#6B7280' }}
                  title={`Party: ${profile.party === 'R' ? 'Republican' : profile.party === 'D' ? 'Democrat' : profile.party === 'I' ? 'Independent' : profile.party}`}
                >
                  {profile.party}
                </div>
              )}
            </div>

            {/* Name, title, meta */}
            <div className="text-center md:text-left flex-1 min-w-0">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                {profile.name}
              </h1>
              <p className="font-body text-lg md:text-xl text-white/80 italic mb-4">{profile.title}</p>

              {/* Badge row */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-sm text-xs font-sans font-semibold uppercase tracking-wider border border-white/10">
                  {profile.category.replace('-', ' ')}
                </span>
                {profile.state && (
                  <span className="px-3 py-1 bg-white/10 text-white/90 rounded-sm text-xs font-sans border border-white/10">
                    {profile.state}
                  </span>
                )}
                <span className="px-3 py-1 bg-white/10 text-white/90 rounded-sm text-xs font-sans border border-white/10">
                  {stats.readingTime} min read
                </span>
                <span className="px-3 py-1 bg-white/10 text-white/90 rounded-sm text-xs font-sans border border-white/10">
                  {stats.sourceCount} sources
                </span>
              </div>

              {/* Tags */}
              {profile.tags && profile.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                  {profile.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/search?q=${encodeURIComponent(tag)}`}
                      className="text-xs text-white/60 hover:text-white font-sans transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Counters Row ─────────────────────────────────── */}
      <div className="border-b border-border bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter end={stats.claimCount} label="Sourced Claims" />
            <StatCounter end={stats.totalDonations} label="Documented Funding" prefix="$" />
            <StatCounter end={stats.connectionCount} label="Network Connections" />
            <StatCounter end={profile.policyActions.length} label="Policy Actions" />
          </div>
        </div>
      </div>

      {/* ── Sticky Section Navigation ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionNav activeSection={activeSection} sections={sections} onNav={handleNav} />
      </div>

      {/* ── Main Content Area ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* ── LEFT COLUMN — Primary Content ─────────────────── */}
          <div className="max-w-none min-w-0">

            {/* ── OVERVIEW SECTION ────────────────────────────── */}
            <SectionHeader id="overview" title="Overview" />
            <div className="space-y-8 mb-10">
              {/* Summary */}
              <div className="bg-parchment border border-border rounded-lg p-6 md:p-8">
                <p className="font-body text-base md:text-lg text-ink leading-relaxed">{profile.summary}</p>
              </div>

              {/* Evidence Tier Breakdown */}
              {profile.sourcedClaims.length > 0 && (
                <div>
                  <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ink-faint mb-4">Evidence Breakdown</h3>
                  <EvidenceDonut claims={profile.sourcedClaims} />
                </div>
              )}
            </div>

            {/* ── SOURCED CLAIMS SECTION ──────────────────────── */}
            {profile.sourcedClaims.length > 0 && (
              <>
                <SectionHeader id="claims" title="Sourced Claims" count={profile.sourcedClaims.length}>
                  {/* Tier filter toggles */}
                  <div className="flex items-center gap-1.5">
                    {(['all', 'verified', 'circumstantial', 'disputed'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTierFilter(t)}
                        className={`px-2.5 py-1 rounded-sm text-xs font-sans font-semibold transition-colors min-h-[36px] ${
                          tierFilter === t
                            ? t === 'all' ? 'bg-obsidian text-white' : `text-white`
                            : 'text-ink-muted hover:text-ink bg-parchment-dark'
                        }`}
                        style={tierFilter === t && t !== 'all' ? { backgroundColor: TIER_COLORS[t] } : undefined}
                      >
                        {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </SectionHeader>
                <div className="space-y-4 mb-10">
                  {filteredClaims.map((claim, idx) => (
                    <ClaimCard key={idx} claim={claim} index={idx} />
                  ))}
                  {filteredClaims.length === 0 && tierFilter !== 'all' && (
                    <p className="text-sm text-ink-muted font-body py-4">No {tierFilter} claims found. <button onClick={() => setTierFilter('all')} className="text-crimson hover:underline">Show all claims</button></p>
                  )}
                </div>
              </>
            )}

            {/* ── DONATIONS SECTION ──────────────────────────── */}
            {profile.donations.length > 0 && (
              <>
                <SectionHeader id="donations" title="Donation History" count={profile.donations.length} />
                <div className="mb-10">
                  <DonationTable donations={profile.donations} />
                </div>
              </>
            )}

            {/* ── QUOTES SECTION ──────────────────────────────── */}
            {profile.quotes.length > 0 && (
              <>
                <SectionHeader id="quotes" title="Notable Quotes" count={profile.quotes.length} />
                <div className="space-y-6 mb-10">
                  {profile.quotes.map((quote, idx) => (
                    <blockquote key={idx} className="relative bg-parchment border border-border rounded-lg p-6 md:p-8">
                      {/* Large quotation mark */}
                      <span className="absolute top-4 left-4 font-display text-6xl text-crimson/10 leading-none select-none" aria-hidden="true">"</span>
                      <div className="relative">
                        <p className="font-body text-base md:text-lg text-ink italic leading-relaxed pl-6">
                          "{quote.text}"
                        </p>
                        <div className="mt-4 pl-6 flex flex-col sm:flex-row sm:items-center gap-2">
                          {quote.context && <p className="font-sans text-xs text-ink-muted">{quote.context}</p>}
                          <div className="flex items-center gap-3">
                            {quote.date && <span className="font-sans text-xs text-ink-faint">{quote.date}</span>}
                            {quote.url && <SourceLink url={quote.url} label={quote.source} />}
                          </div>
                        </div>
                      </div>
                    </blockquote>
                  ))}
                </div>
              </>
            )}

            {/* ── POLICY ACTIONS SECTION ──────────────────────── */}
            {profile.policyActions.length > 0 && (
              <>
                <SectionHeader id="policy" title="Policy Actions" count={profile.policyActions.length} />
                <div className="relative pl-6 mb-10">
                  {/* Timeline line */}
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" aria-hidden="true" />
                  <div className="space-y-6">
                    {profile.policyActions.map((action, idx) => (
                      <div key={idx} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-4 top-2 w-3 h-3 rounded-full bg-crimson border-2 border-parchment" />
                        <div className="bg-parchment border border-border rounded-lg p-5 ml-2">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <p className="font-body text-sm font-semibold text-ink flex-1">{action.action}</p>
                            {action.date && (
                              <span className="font-sans text-xs text-ink-faint whitespace-nowrap flex-shrink-0">{action.date}</span>
                            )}
                          </div>
                          {action.context && (
                            <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">{action.context}</p>
                          )}
                          <SourceLink url={action.url} label={action.source} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── CONNECTIONS SECTION ─────────────────────────── */}
            {profile.connections.length > 0 && (
              <>
                <SectionHeader id="connections" title="Network Connections" count={profile.connections.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {profile.connections.map((conn, idx) => (
                    <ConnectionCard key={idx} conn={conn} allProfiles={PROFILES} />
                  ))}
                </div>
              </>
            )}

            {/* ── SHARE CTA ──────────────────────────────────── */}
            <SharePanel
              url={`${SITE_URL}/profile/${profile.id}`}
              title={`${profile.name} — Power Profile | ${SITE_NAME}`}
              description={profile.summary}
              contentId={`profile-${profile.id}`}
            />

            {/* ── CONTEXTUAL DONATION CTA ─────────────────────── */}
            <div className="border-t border-b border-border my-10 py-8 text-center">
              <p className="font-body text-base text-ink-muted leading-relaxed max-w-lg mx-auto mb-4">
                This research is free because the documentary record belongs to everyone.
                If you value independent, source-verified journalism, any contribution helps us continue.
              </p>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase hover:bg-crimson-dark transition-colors"
                data-testid="profile-donate-cta"
              >
                Support This Research
              </a>
              <p className="font-sans text-xs text-ink-faint mt-3">
                $5 keeps the archive online for a month. $25 funds document acquisition.
              </p>
            </div>

            {/* ── Related Profiles ─────────────────────────────── */}
            {relatedProfiles.length > 0 && (
              <div className="mt-10">
                <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ink-faint mb-6 pb-2 border-b border-border">
                  Related Profiles in {profile.category.replace('-', ' ')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedProfiles.map((rp) => (
                    <Link
                      key={rp.id}
                      to={`/profile/${rp.id}`}
                      className="group bg-parchment border border-border rounded-lg p-4 hover:border-crimson hover:shadow-md transition-all text-center"
                    >
                      <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden bg-parchment-dark">
                        <img
                          src={getProfilePhoto(rp.id)}
                          alt={rp.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.src = getProfileInitialsImage(rp.name);
                          }}
                        />
                      </div>
                      <p className="font-display text-sm font-bold text-ink group-hover:text-crimson transition-colors">{rp.name}</p>
                      <p className="font-sans text-xs text-ink-muted mt-0.5">{rp.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN — Sticky Sidebar ─────────────────── */}
          <aside className="hidden lg:block" aria-label="Profile details">
            <div className="sticky top-24 space-y-6">

              {/* Quick Facts */}
              <div className="bg-parchment border border-border rounded-lg p-6">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Quick Facts
                </h3>
                <dl className="space-y-3 text-sm font-body">
                  {profile.born && (
                    <div>
                      <dt className="text-ink-muted text-xs">Born</dt>
                      <dd className="text-ink">{profile.born}</dd>
                    </div>
                  )}
                  {profile.education && (
                    <div>
                      <dt className="text-ink-muted text-xs">Education</dt>
                      <dd className="text-ink">{profile.education}</dd>
                    </div>
                  )}
                  {profile.netWorth && (
                    <div>
                      <dt className="text-ink-muted text-xs">Net Worth</dt>
                      <dd className="text-ink font-display font-bold">{profile.netWorth}</dd>
                    </div>
                  )}
                  {profile.state && (
                    <div>
                      <dt className="text-ink-muted text-xs">State / District</dt>
                      <dd className="text-ink">{profile.state}</dd>
                    </div>
                  )}
                  {profile.bioguideId && (
                    <div>
                      <dt className="text-ink-muted text-xs">Bioguide ID</dt>
                      <dd className="text-ink font-mono text-xs">{profile.bioguideId}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Career Timeline */}
              {profile.career && profile.career.length > 0 && (
                <div className="bg-parchment border border-border rounded-lg p-6">
                  <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                    Career Timeline
                  </h3>
                  <CareerTimeline career={profile.career} />
                </div>
              )}

              {/* External Links */}
              {profile.websites && profile.websites.length > 0 && (
                <div className="bg-parchment border border-border rounded-lg p-6">
                  <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                    External Sources
                  </h3>
                  <div className="space-y-2.5">
                    {profile.websites.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-crimson hover:text-crimson-dark hover:underline font-body transition-colors py-1"
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=16`}
                          alt=""
                          className="w-4 h-4 rounded-sm flex-shrink-0"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <span className="truncate">{link.label}</span>
                        <svg className="w-3 h-3 opacity-40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Tier Legend */}
              <div className="bg-parchment border border-border rounded-lg p-6">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Evidence Standards
                </h3>
                <div className="space-y-3 text-xs font-body">
                  <div className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0 mt-0.5" style={{ backgroundColor: '#166534' }} />
                    <div>
                      <p className="font-semibold text-ink">Verified</p>
                      <p className="text-ink-muted">Primary source documents — court filings, congressional records, government archives</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0 mt-0.5" style={{ backgroundColor: '#92400E' }} />
                    <div>
                      <p className="font-semibold text-ink">Circumstantial</p>
                      <p className="text-ink-muted">Facts documented, connection is interpretation. Alternatives noted.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0 mt-0.5" style={{ backgroundColor: '#991B1B' }} />
                    <div>
                      <p className="font-semibold text-ink">Disputed</p>
                      <p className="text-ink-muted">Claimed by named source but not independently confirmed.</p>
                    </div>
                  </div>
                </div>
                <Link to="/methodology" className="block mt-4 pt-3 border-t border-border text-xs text-crimson hover:underline font-sans">
                  Read our full methodology →
                </Link>
              </div>

              {/* Disclaimer */}
              <div className="bg-parchment-dark border border-border rounded-lg p-5 text-xs font-body text-ink-muted leading-relaxed">
                <p className="mb-2 font-semibold text-ink-muted">Editorial Independence</p>
                <p>All information is compiled from publicly available sources. No editorial influence was accepted. We strive for accuracy but do not guarantee complete or current information.</p>
                <a href="mailto:corrections@veritasworldwide.com" className="text-crimson hover:underline mt-2 inline-block">Report an error →</a>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

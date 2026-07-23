import { useState, useEffect } from 'react'

interface SocialAccount {
  platform: string
  handle: string
  url: string
  status: 'live' | 'setup' | 'not_created'
  followers: number
  notes: string
}

const DEFAULT_ACCOUNTS: SocialAccount[] = [
  { platform: 'X (Twitter)', handle: '@VeritasWorldwide', url: 'https://x.com/VeritasWorldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'Instagram', handle: '@veritasworldwidepress', url: 'https://instagram.com/veritasworldwidepress', status: 'not_created', followers: 0, notes: '⚠️ @veritasworldwide TAKEN by unrelated account. Use @veritasworldwidepress' },
  { platform: 'Threads', handle: '@veritasworldwidepress', url: 'https://threads.net/@veritasworldwidepress', status: 'not_created', followers: 0, notes: 'Tied to Instagram handle — use @veritasworldwidepress' },
  { platform: 'LinkedIn', handle: 'Veritas Worldwide', url: 'https://linkedin.com/company/veritas-worldwide-press', status: 'not_created', followers: 0, notes: 'Company Page' },
  { platform: 'Facebook Page', handle: 'Veritas Worldwide', url: 'https://facebook.com/VeritasWorldwidePress', status: 'not_created', followers: 0, notes: '' },
  { platform: 'YouTube', handle: '@VeritasWorldwide', url: 'https://youtube.com/@VeritasWorldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'TikTok', handle: '@veritasworldwidepress', url: 'https://tiktok.com/@veritasworldwidepress', status: 'not_created', followers: 0, notes: '⚠️ @veritasworldwide TAKEN by unrelated account (6 followers). Use @veritasworldwidepress' },
  { platform: 'Pinterest', handle: 'veritasworldwide', url: 'https://pinterest.com/veritasworldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'Reddit', handle: 'r/VeritasWorldwide', url: 'https://reddit.com/r/VeritasWorldwide', status: 'not_created', followers: 0, notes: 'Subreddit' },
  { platform: 'Discord', handle: 'Veritas Worldwide', url: '', status: 'not_created', followers: 0, notes: 'Community Server' },
  { platform: 'Bluesky', handle: '@veritasworldwide.bsky.social', url: 'https://bsky.app', status: 'not_created', followers: 0, notes: 'Open network; set handle on create' },
  { platform: 'Substack', handle: 'veritasworldwide', url: 'https://veritasworldwide.substack.com', status: 'not_created', followers: 0, notes: 'Newsletter mirror' },
]

const STANDARD_BIO = {
  short: 'Primary Sources. Public Record. Your Conclusions.',
  medium: 'A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. 32 archive parts. 600+ primary sources. Full archive public.',
  long: 'Veritas Worldwide publishes The Record — a 32-part documentary investigation into central banking, intelligence agencies, lobbying, media consolidation, and the institutions that shaped the modern world. Every claim is classified by evidence tier: Verified, Circumstantial, or Disputed. 600+ primary sources. Full archive public. Read the evidence. Draw your own conclusions.',
  link: 'https://veritasworldwide.com',
  hashtags: '#VeritasWorldwide #TheRecord #PrimarySources #Truth #DocumentaryRecord',
}

/** Live brand-kit asset paths (served from veritasworldwide.com) */
const BRAND_ASSETS = {
  profile: '/brand-kit/04-social/social-profile-400.png',
  profileSvg: '/brand-kit/04-social/social-profile.svg',
  mark512: '/brand-kit/01-logos/logo-mark-512.png',
  appIcon: '/brand-kit/02-icons/app-icon-512.png',
  bannerX: '/brand-kit/04-social/social-banner-x.svg',
  bannerXPng: '/brand-kit/04-social/social-banner-x.png',
  bannerIgStory: '/brand-kit/04-social/story-1080x1920.svg',
  bannerLinkedIn: '/brand-kit/04-social/social-banner-linkedin.svg',
  bannerFacebook: '/brand-kit/04-social/social-banner-facebook.svg',
  bannerYouTube: '/brand-kit/04-social/social-banner-youtube.svg',
  highlightChapters: '/brand-kit/04-social/highlight-chapters.png',
  highlightSources: '/brand-kit/04-social/highlight-sources.png',
  highlightRecord: '/brand-kit/04-social/highlight-record.png',
  ytThumb: '/brand-kit/04-social/youtube-thumbnail.svg',
  linkedInArticle: '/brand-kit/04-social/linkedin-article-header.svg',
  igCarousel1: '/brand-kit/04-social/ig-carousel-1.svg',
  xPostCard: '/brand-kit/04-social/x-post-card.svg',
  podcastCover: '/brand-kit/04-social/podcast-cover.png',
  newsletterHeader: '/brand-kit/04-social/newsletter-header.svg',
  evidenceVerified: '/brand-kit/04-social/evidence-tier-verified.svg',
  evidenceCircumstantial: '/brand-kit/04-social/evidence-tier-circumstantial.svg',
  evidenceDisputed: '/brand-kit/04-social/evidence-tier-disputed.svg',
  quoteCard: '/brand-kit/04-social/quote-card.svg',
  threadsPost: '/brand-kit/04-social/threads-post.svg',
  blueskyBanner: '/brand-kit/04-social/bluesky-banner.svg',
  discordInvite: '/brand-kit/04-social/discord-invite.svg',
  citationCard: '/brand-kit/04-social/citation-card.svg',
  pinterestPin: '/brand-kit/04-social/pinterest-pin.svg',
  tiktokCover: '/brand-kit/04-social/tiktok-cover.svg',
  redditBanner: '/brand-kit/04-social/reddit-banner.svg',
  reelsSafeZone: '/brand-kit/04-social/reels-safe-zone.svg',
  correctionNotice: '/brand-kit/09-templates/correction-notice.html',
  pressContact: '/brand-kit/07-docs/PRESS-CONTACT.md',
  pressVcard: '/brand-kit/09-templates/press-contact.vcf',
  socialLaunch: '/brand-kit/07-docs/SOCIAL-LAUNCH.md',
  og: '/og-image.png',
  zip: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip',
  matrix: '/brand-kit/04-social/SOCIAL-ASSET-MATRIX.md',
  hashtags: '/brand-kit/07-docs/HASHTAGS.md',
}

const PLATFORM_SETUP: Record<string, string[]> = {
  'X (Twitter)': [
    'Create account at x.com/signup',
    'Set handle to @VeritasWorldwide',
    `Upload profile: ${BRAND_ASSETS.profile} (or ${BRAND_ASSETS.profileSvg})`,
    `Upload banner 1500×500: ${BRAND_ASSETS.bannerX} / ${BRAND_ASSETS.bannerXPng}`,
    `Post cards: ${BRAND_ASSETS.xPostCard} · ${BRAND_ASSETS.quoteCard}`,
    `Evidence-tier cards (product): ${BRAND_ASSETS.evidenceVerified}, ${BRAND_ASSETS.evidenceCircumstantial}, ${BRAND_ASSETS.evidenceDisputed}`,
    'Set bio (medium) + website https://veritasworldwide.com',
    'Pin introductory tweet with /og-image.png card',
    `Queue 10+ posts; hashtags from ${BRAND_ASSETS.hashtags}`,
  ],
  'Instagram': [
    'Create/convert to Professional Account',
    'Set handle to @veritasworldwidepress (⚠️ @veritasworldwide taken)',
    `Upload profile 320–400px: ${BRAND_ASSETS.profile}`,
    'Set bio (short) + link',
    `Highlight covers: ${BRAND_ASSETS.highlightChapters}, ${BRAND_ASSETS.highlightSources}, ${BRAND_ASSETS.highlightRecord}`,
    `Story template: ${BRAND_ASSETS.bannerIgStory}`,
    `Reels safe zone: ${BRAND_ASSETS.reelsSafeZone}`,
    `Carousel slides: ${BRAND_ASSETS.igCarousel1} (+ -2.svg, -3.svg)`,
    `Evidence-tier feed posts: verified / circumstantial / disputed series`,
    'Post 9-grid launch content; full kit ZIP in admin Brand Kit',
  ],
  'Threads': [
    'Download Threads app · login with Instagram',
    'Set bio (short)',
    `Threads post card: ${BRAND_ASSETS.threadsPost}`,
    `Share quote + evidence cards: ${BRAND_ASSETS.quoteCard}`,
    'Post 5+ introduction threads',
  ],
  'LinkedIn': [
    'Create Company Page: Veritas Worldwide Press',
    `Upload logo: ${BRAND_ASSETS.mark512}`,
    `Upload banner 1584×396: ${BRAND_ASSETS.bannerLinkedIn}`,
    `Article header 1128×191: ${BRAND_ASSETS.linkedInArticle}`,
    'Set description (long bio) + website URL',
    'Publish 3+ articles; invite connections',
  ],
  'Facebook Page': [
    'Create Page (News/Media category)',
    `Profile: ${BRAND_ASSETS.profile} · Cover: ${BRAND_ASSETS.bannerFacebook}`,
    'Set About (long bio) + website + social links',
    'Create pinned post with The Record link',
  ],
  'YouTube': [
    'Create channel at studio.youtube.com',
    'Set handle to @VeritasWorldwide',
    `Profile: ${BRAND_ASSETS.appIcon} · Banner: ${BRAND_ASSETS.bannerYouTube}`,
    `Thumbnail template: ${BRAND_ASSETS.ytThumb}`,
    'Set channel description (long bio)',
    'Upload intro/trailer; playlists by topic',
  ],
  'TikTok': [
    'Create account · handle @veritasworldwidepress',
    `Upload profile: ${BRAND_ASSETS.profile}`,
    `Cover / series art 1080×1920: ${BRAND_ASSETS.tiktokCover}`,
    'Set bio (short) + link',
    'Post 3+ intro videos',
  ],
  'Pinterest': [
    'Create Business account · username veritasworldwide',
    `Profile: ${BRAND_ASSETS.profile}`,
    'Set bio (medium); boards by chapter topic',
    `Pin template 1000×1500: ${BRAND_ASSETS.pinterestPin}`,
    `Also pin from OG / story: ${BRAND_ASSETS.og}`,
  ],
  'Reddit': [
    'Create subreddit r/VeritasWorldwide',
    'Set community description (long bio)',
    `Banner 1920×384: ${BRAND_ASSETS.redditBanner}`,
    'Add rules (civil discourse, sources required)',
    'Create wiki with reading guide',
    `Use evidence-tier flair art: ${BRAND_ASSETS.evidenceVerified}`,
    'Post 5+ discussion threads',
  ],
  'Discord': [
    'Create server: Veritas Worldwide',
    'Channels: #welcome, #general, #chapter-discussion, #source-submissions, #evidence-review',
    'Roles: Reader, Contributor, Moderator',
    `Invite splash: ${BRAND_ASSETS.discordInvite}`,
    'Welcome message + rules',
    'Create invite link',
  ],
  'Bluesky': [
    'Create account at bsky.app',
    `Upload profile: ${BRAND_ASSETS.profile}`,
    `Upload banner 1500×500: ${BRAND_ASSETS.blueskyBanner}`,
    'Set bio (medium) + website https://veritasworldwide.com',
    `Post citation cards: ${BRAND_ASSETS.citationCard}`,
  ],
  'Substack': [
    'Create publication · subdomain veritasworldwide',
    `Logo: ${BRAND_ASSETS.mark512}`,
    `Newsletter header: ${BRAND_ASSETS.newsletterHeader}`,
    `Podcast cover if audio: ${BRAND_ASSETS.podcastCover}`,
    'Set about (long bio); publish 3+ posts',
    'Import email list from HubSpot',
  ],
}

const STATUS_COLORS = {
  live: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'LIVE' },
  setup: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', label: 'SETUP' },
  not_created: { bg: 'bg-white/5', text: 'text-white/30', dot: 'bg-white/20', label: 'NOT CREATED' },
}

const STORAGE_KEY = 'veritas_social_accounts'

function loadAccounts(): SocialAccount[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return DEFAULT_ACCOUNTS
}

function saveAccounts(accounts: SocialAccount[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

export default function AdminSocialHub() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(loadAccounts)
  const [activeTab, setActiveTab] = useState<'accounts' | 'bios' | 'checklist'>('accounts')
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [copied, setCopied] = useState('')

  useEffect(() => { saveAccounts(accounts) }, [accounts])

  const updateAccount = (idx: number, updates: Partial<SocialAccount>) => {
    setAccounts(prev => prev.map((a, i) => i === idx ? { ...a, ...updates } : a))
  }

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const liveCount = accounts.filter(a => a.status === 'live').length
  const setupCount = accounts.filter(a => a.status === 'setup').length
  const totalFollowers = accounts.reduce((sum, a) => sum + a.followers, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-lg border border-crimson/20 bg-crimson/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-crimson">Brand assets ready</p>
          <p className="mt-1 font-sans text-xs text-white/50">
            Profile, banners, evidence-tier cards, podcast cover, and OG assets ship from Brand Kit v2.6. Use exact paths in setup checklists.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/admin/brand-kit"
            className="inline-flex min-h-[44px] items-center rounded bg-crimson px-4 py-2 font-sans text-xs font-semibold text-white hover:bg-crimson-light"
          >
            Open Brand Kit
          </a>
          <a
            href={BRAND_ASSETS.zip}
            download
            className="inline-flex min-h-[44px] items-center rounded border border-white/10 px-4 py-2 font-sans text-xs text-white/70 hover:border-crimson/40 hover:text-white"
          >
            Download ZIP
          </a>
          <a
            href={BRAND_ASSETS.matrix}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded border border-white/10 px-4 py-2 font-sans text-xs text-white/70 hover:border-crimson/40 hover:text-white"
          >
            Asset matrix →
          </a>
          <a
            href={BRAND_ASSETS.socialLaunch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded border border-white/10 px-4 py-2 font-sans text-xs text-white/70 hover:border-crimson/40 hover:text-white"
          >
            Launch checklist →
          </a>
        </div>
      </div>

      {/* Quick asset strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {[
          { label: 'Profile', href: BRAND_ASSETS.profile },
          { label: 'X Banner', href: BRAND_ASSETS.bannerX },
          { label: 'X Post Card', href: BRAND_ASSETS.xPostCard },
          { label: 'LinkedIn', href: BRAND_ASSETS.bannerLinkedIn },
          { label: 'YouTube', href: BRAND_ASSETS.bannerYouTube },
          { label: 'IG Story', href: BRAND_ASSETS.bannerIgStory },
          { label: 'Quote Card', href: BRAND_ASSETS.quoteCard },
          { label: 'Evidence ✓', href: BRAND_ASSETS.evidenceVerified },
          { label: 'Podcast', href: BRAND_ASSETS.podcastCover },
          { label: 'Newsletter', href: BRAND_ASSETS.newsletterHeader },
          { label: 'Threads', href: BRAND_ASSETS.threadsPost },
          { label: 'Bluesky', href: BRAND_ASSETS.blueskyBanner },
          { label: 'Discord', href: BRAND_ASSETS.discordInvite },
          { label: 'Citation', href: BRAND_ASSETS.citationCard },
          { label: 'Pinterest', href: BRAND_ASSETS.pinterestPin },
          { label: 'TikTok', href: BRAND_ASSETS.tiktokCover },
          { label: 'Reddit', href: BRAND_ASSETS.redditBanner },
          { label: 'Reels Zone', href: BRAND_ASSETS.reelsSafeZone },
          { label: 'OG Card', href: BRAND_ASSETS.og },
        ].map(a => (
          <a
            key={a.href}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.03] hover:border-crimson/40"
          >
            <div className="flex h-16 items-center justify-center bg-black/40 p-2">
              <img src={a.href} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
            <p className="px-2 py-1.5 font-sans text-[10px] text-white/50">{a.label}</p>
          </a>
        ))}
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/30">Platforms</p>
          <p className="font-sans text-2xl font-bold text-white mt-1">{accounts.length}</p>
        </div>
        <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/10">
          <p className="font-sans text-[10px] tracking-widest uppercase text-emerald-400/60">Live</p>
          <p className="font-sans text-2xl font-bold text-emerald-400 mt-1">{liveCount}</p>
        </div>
        <div className="bg-amber-500/5 rounded-lg p-4 border border-amber-500/10">
          <p className="font-sans text-[10px] tracking-widest uppercase text-amber-400/60">In Setup</p>
          <p className="font-sans text-2xl font-bold text-amber-400 mt-1">{setupCount}</p>
        </div>
        <div className="bg-crimson/5 rounded-lg p-4 border border-crimson/10">
          <p className="font-sans text-[10px] tracking-widest uppercase text-crimson/60">Total Followers</p>
          <p className="font-sans text-2xl font-bold text-crimson-light mt-1">{totalFollowers.toLocaleString()}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-white/5 pb-0">
        {(['accounts', 'bios', 'checklist'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`inline-flex min-h-[44px] items-center px-4 py-2.5 font-sans text-xs tracking-wide capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'text-white border-crimson'
                : 'text-white/30 border-transparent hover:text-white/60'
            }`}
          >
            {tab === 'accounts' ? 'Account Tracker' : tab === 'bios' ? 'Standard Bios' : 'Setup Checklists'}
          </button>
        ))}
      </div>

      {/* Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="space-y-3">
          {accounts.map((account, idx) => {
            const status = STATUS_COLORS[account.status]
            const isEditing = editingIdx === idx
            return (
              <div key={account.platform} className={`${status.bg} rounded-lg border border-white/5 p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                    <div>
                      <p className="font-sans text-sm font-semibold text-white">{account.platform}</p>
                      <p className="font-sans text-xs text-white/40">{account.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-sans text-[10px] tracking-widest font-bold ${status.text}`}>{status.label}</span>
                    {account.url && (
                      <a href={account.url} target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] text-crimson/60 hover:text-crimson transition-colors">
                        Open &rarr;
                      </a>
                    )}
                    <button
                      onClick={() => setEditingIdx(isEditing ? null : idx)}
                      className="font-sans text-[10px] text-white/20 hover:text-white/60 transition-colors"
                    >
                      {isEditing ? 'Close' : 'Edit'}
                    </button>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="font-sans text-[10px] text-white/30 block mb-1">Handle</label>
                      <input
                        type="text" value={account.handle}
                        onChange={e => updateAccount(idx, { handle: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white font-sans focus:outline-none focus:border-crimson/50"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] text-white/30 block mb-1">URL</label>
                      <input
                        type="text" value={account.url}
                        onChange={e => updateAccount(idx, { url: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white font-sans focus:outline-none focus:border-crimson/50"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] text-white/30 block mb-1">Followers</label>
                      <input
                        type="number" value={account.followers}
                        onChange={e => updateAccount(idx, { followers: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white font-sans focus:outline-none focus:border-crimson/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-sans text-[10px] text-white/30 block mb-1">Notes</label>
                      <input
                        type="text" value={account.notes}
                        onChange={e => updateAccount(idx, { notes: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white font-sans focus:outline-none focus:border-crimson/50"
                        placeholder="Login email, notes, etc."
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] text-white/30 block mb-1">Status</label>
                      <select
                        value={account.status}
                        onChange={e => updateAccount(idx, { status: e.target.value as SocialAccount['status'] })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white font-sans focus:outline-none focus:border-crimson/50"
                      >
                        <option value="not_created">Not Created</option>
                        <option value="setup">In Setup</option>
                        <option value="live">Live</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Bios Tab */}
      {activeTab === 'bios' && (
        <div className="space-y-4">
          {Object.entries(STANDARD_BIO).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-lg border border-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans text-[10px] tracking-widest uppercase text-white/40 font-bold">{key} {key !== 'link' && key !== 'hashtags' ? 'bio' : ''}</p>
                <button
                  onClick={() => copyText(value, key)}
                  className={`font-sans text-[10px] px-2 py-1 rounded transition-colors ${
                    copied === key ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/30 hover:text-white/60'
                  }`}
                >
                  {copied === key ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="font-body text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{value}</p>
              <p className="font-sans text-[10px] text-white/20 mt-2">{value.length} characters</p>
            </div>
          ))}
          <div className="bg-crimson/5 rounded-lg border border-crimson/10 p-4">
            <p className="font-sans text-[10px] tracking-widest uppercase text-crimson/60 font-bold mb-2">Platform Character Limits</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { p: 'X', max: 160 },
                { p: 'Instagram', max: 150 },
                { p: 'Threads', max: 500 },
                { p: 'LinkedIn', max: 2000 },
                { p: 'Facebook', max: 255 },
                { p: 'YouTube', max: 1000 },
                { p: 'TikTok', max: 80 },
                { p: 'Pinterest', max: 500 },
              ].map(({ p, max }) => (
                <div key={p} className="bg-white/5 rounded px-3 py-2">
                  <p className="font-sans text-xs text-white/50">{p}</p>
                  <p className="font-sans text-[10px] text-white/20">{max} chars</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Checklist Tab */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          {accounts.map((account) => {
            const steps = PLATFORM_SETUP[account.platform]
            if (!steps) return null
            const status = STATUS_COLORS[account.status]
            return (
              <details key={account.platform} className="bg-white/5 rounded-lg border border-white/5 group" open={account.status !== 'live'}>
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                    <span className="font-sans text-sm font-semibold text-white">{account.platform}</span>
                    <span className={`font-sans text-[10px] tracking-widest font-bold ${status.text}`}>{status.label}</span>
                  </div>
                  <span className="font-sans text-[10px] text-white/20 group-open:hidden">{steps.length} steps</span>
                </summary>
                <div className="px-4 pb-4 space-y-2">
                  {steps.map((step, i) => (
                    <label key={i} className="flex items-start gap-3 py-1.5 border-b border-white/5 last:border-0 cursor-pointer group/step">
                      <input type="checkbox" className="mt-0.5 accent-crimson" />
                      <span className="font-sans text-xs text-white/50 group-hover/step:text-white/70 transition-colors">{step}</span>
                    </label>
                  ))}
                </div>
              </details>
            )
          })}
        </div>
      )}
    </div>
  )
}

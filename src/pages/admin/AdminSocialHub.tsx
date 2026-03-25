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
  { platform: 'Instagram', handle: '@veritasworldwide', url: 'https://instagram.com/veritasworldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'Threads', handle: '@veritasworldwide', url: 'https://threads.net/@veritasworldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'LinkedIn', handle: 'Veritas Worldwide Press', url: 'https://linkedin.com/company/veritas-worldwide-press', status: 'not_created', followers: 0, notes: 'Company Page' },
  { platform: 'Facebook Page', handle: 'Veritas Worldwide Press', url: 'https://facebook.com/VeritasWorldwidePress', status: 'not_created', followers: 0, notes: '' },
  { platform: 'YouTube', handle: '@VeritasWorldwide', url: 'https://youtube.com/@VeritasWorldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'TikTok', handle: '@veritasworldwide', url: 'https://tiktok.com/@veritasworldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'Pinterest', handle: 'veritasworldwide', url: 'https://pinterest.com/veritasworldwide', status: 'not_created', followers: 0, notes: '' },
  { platform: 'Reddit', handle: 'r/VeritasWorldwide', url: 'https://reddit.com/r/VeritasWorldwide', status: 'not_created', followers: 0, notes: 'Subreddit' },
  { platform: 'Discord', handle: 'Veritas Worldwide', url: '', status: 'not_created', followers: 0, notes: 'Community Server' },
  { platform: 'Substack', handle: 'veritasworldwide', url: 'https://veritasworldwide.substack.com', status: 'not_created', followers: 0, notes: 'Newsletter mirror' },
]

const STANDARD_BIO = {
  short: 'Primary Sources. Public Record. Your Conclusions.',
  medium: 'A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. 31 chapters. 600+ primary sources. Free & open access.',
  long: 'Veritas Worldwide Press publishes The Record — a 31-chapter documentary investigation into central banking, intelligence agencies, lobbying, media consolidation, and the institutions that shaped the modern world. Every claim is classified by evidence tier: Verified, Circumstantial, or Disputed. 600+ primary sources. Free and open access. Read the evidence. Draw your own conclusions.',
  link: 'https://veritasworldwide.com',
  hashtags: '#VeritasWorldwide #TheRecord #PrimarySources #Truth #DocumentaryRecord',
}

const PLATFORM_SETUP: Record<string, string[]> = {
  'X (Twitter)': ['Create account at x.com/signup', 'Set handle to @VeritasWorldwide', 'Upload profile image (V logo)', 'Upload banner (1500x500)', 'Set bio (medium)', 'Add website link', 'Pin introductory tweet', 'Queue 10+ tweets via TweetDeck'],
  'Instagram': ['Create/convert to Professional Account', 'Set handle to @veritasworldwide', 'Upload profile image (V logo 320x320)', 'Set bio (short) + link', 'Create 3 Highlight covers', 'Post 9-grid launch content', 'Set up Linktree or link-in-bio'],
  'Threads': ['Download Threads app', 'Login with Instagram account', 'Set bio (short)', 'Post 5+ introduction threads', 'Follow relevant accounts'],
  'LinkedIn': ['Create Company Page', 'Set name: Veritas Worldwide Press', 'Upload logo + banner', 'Set description (long bio)', 'Add website URL', 'Publish 3+ articles', 'Invite connections'],
  'Facebook Page': ['Create Page (News/Media category)', 'Set name: Veritas Worldwide Press', 'Upload profile + cover photo', 'Set About section (long bio)', 'Add website + social links', 'Create pinned post', 'Invite friends to follow'],
  'YouTube': ['Create channel at studio.youtube.com', 'Set handle to @VeritasWorldwide', 'Upload profile + banner art', 'Set channel description (long bio)', 'Upload intro/trailer video', 'Create playlists by topic'],
  'TikTok': ['Create account at tiktok.com/signup', 'Set handle to @veritasworldwide', 'Upload profile image', 'Set bio (short) + link', 'Post 3+ intro videos', 'Research trending sounds'],
  'Pinterest': ['Create Business account', 'Set username to veritasworldwide', 'Upload profile image', 'Set bio (medium)', 'Create 10+ boards by chapter topic', 'Pin 5+ infographics per board'],
  'Reddit': ['Create subreddit r/VeritasWorldwide', 'Set community description (long bio)', 'Add rules (civil discourse, sources required)', 'Create wiki with reading guide', 'Post 5+ discussion threads', 'Enable post flair by chapter'],
  'Discord': ['Create server: Veritas Worldwide', 'Set up channels: #welcome, #general, #chapter-discussion, #source-submissions, #evidence-review', 'Create roles: Reader, Contributor, Moderator', 'Set up welcome message + rules', 'Create invite link', 'Post in 5+ channels'],
  'Substack': ['Create publication at substack.com', 'Set subdomain: veritasworldwide', 'Upload logo + cover', 'Set about (long bio)', 'Publish 3+ posts', 'Import email list from HubSpot'],
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
            className={`px-4 py-2.5 font-sans text-xs tracking-wide capitalize transition-colors border-b-2 -mb-px ${
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

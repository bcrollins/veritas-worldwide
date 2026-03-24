/**
 * AipacDiagram — Interactive visualization of AIPAC influence across
 * the U.S. House, Senate, and White House.
 *
 * Features:
 * - Hemicycle (semicircle) seating charts for House and Senate
 * - Color-coded by party, sized by AIPAC contribution level
 * - Click/hover member detail cards
 * - Search, filter by chamber/party/contribution range
 * - Key votes section
 * - AIPAC lobbyist directory
 * - Sources footer with FEC citations
 */
import { useState, useMemo, useCallback } from 'react'
import {
  MEMBERS, KEY_VOTES, AIPAC_LOBBYISTS, AIPAC_STATS, EXECUTIVE_BRANCH,
  type CongressMember, type Chamber, type Party,
} from '../data/aipacData'

/* ── Helpers ──────────────────────────────────────── */
const fmt = (n: number) => n >= 1_000_000
  ? `$${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000
  ? `$${(n / 1_000).toFixed(0)}K`
  : `$${n.toLocaleString()}`

const fmtFull = (n: number) => `$${n.toLocaleString()}`

const partyColor: Record<Party, string> = { R: '#DC2626', D: '#2563EB', I: '#7C3AED' }
const partyLabel: Record<Party, string> = { R: 'Republican', D: 'Democrat', I: 'Independent' }
const partyBg: Record<Party, string> = { R: 'bg-red-50', D: 'bg-blue-50', I: 'bg-purple-50' }

/* ── Contribution tier for visual sizing ──────────── */
function contribTier(total: number): 'mega' | 'high' | 'mid' | 'low' | 'minimal' {
  if (total >= 3_000_000) return 'mega'
  if (total >= 1_000_000) return 'high'
  if (total >= 500_000) return 'mid'
  if (total >= 100_000) return 'low'
  return 'minimal'
}

const tierSize: Record<string, string> = {
  mega: 'w-4 h-4 md:w-5 md:h-5',
  high: 'w-3.5 h-3.5 md:w-4 md:h-4',
  mid: 'w-3 h-3 md:w-3.5 md:h-3.5',
  low: 'w-2.5 h-2.5 md:w-3 md:h-3',
  minimal: 'w-2 h-2 md:w-2.5 md:h-2.5',
}

const tierOpacity: Record<string, string> = {
  mega: 'opacity-100',
  high: 'opacity-90',
  mid: 'opacity-75',
  low: 'opacity-60',
  minimal: 'opacity-45',
}

/* ── Member Dot (single seat in hemicycle) ────────── */
function MemberDot({ member, onClick, isSelected }: {
  member: CongressMember
  onClick: (m: CongressMember) => void
  isSelected: boolean
}) {
  const tier = contribTier(member.totalLobby)
  return (
    <button
      onClick={() => onClick(member)}
      className={`rounded-full transition-all duration-200 cursor-pointer hover:scale-150 hover:z-10 relative
        ${tierSize[tier]} ${tierOpacity[tier]}
        ${isSelected ? 'ring-2 ring-ink scale-150 z-20' : ''}
        ${member.aipacTopContributor ? 'ring-1 ring-yellow-400' : ''}
      `}
      style={{ backgroundColor: partyColor[member.party] }}
      title={`${member.name} (${member.party}-${member.state}) — ${fmt(member.totalLobby)}`}
      aria-label={`${member.name}, ${partyLabel[member.party]}, ${member.state}${member.district !== 'SEN' ? `-${member.district}` : ''}: ${fmtFull(member.totalLobby)} total pro-Israel lobby funds`}
    />
  )
}

/* ── Member Detail Card ──────────────────────────── */
function MemberCard({ member, onClose }: { member: CongressMember; onClose: () => void }) {
  return (
    <div className="bg-surface border border-border rounded-sm shadow-lg p-5 max-w-md w-full animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: partyColor[member.party] }}
            />
            <h4 className="font-display text-lg font-bold text-ink">{member.name}</h4>
          </div>
          <p className="font-sans text-xs text-ink-muted">
            {partyLabel[member.party]} &middot; {member.state}
            {member.district === 'SEN' ? ' (Senate)' : member.district === 'AL' ? ' (At-Large)' : `-${member.district}`}
          </p>
          {member.aipacTopContributor && (
            <span className="inline-flex items-center gap-1 mt-1.5 font-sans text-[0.6rem] font-bold tracking-[0.08em] uppercase text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-sm">
              <span aria-hidden="true">★</span> AIPAC = #1 All-Time Contributor
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-ink-faint hover:text-ink transition-colors p-1"
          aria-label="Close detail card"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contribution breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-parchment-dark rounded-sm p-3">
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1">Total Pro-Israel Lobby</p>
          <p className="font-display text-xl font-bold text-crimson">{fmtFull(member.totalLobby)}</p>
        </div>
        <div className="bg-parchment-dark rounded-sm p-3">
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1">Direct PAC</p>
          <p className="font-display text-xl font-bold text-ink">{fmtFull(member.pacDirect)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2">
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-0.5">Independent Expenditures</p>
          <p className="font-sans text-sm font-semibold text-ink">{fmtFull(member.indExpend)}</p>
        </div>
        <div className="p-2">
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-0.5">Lobby-Connected Donors</p>
          <p className="font-sans text-sm font-semibold text-ink">{fmtFull(member.lobbyDonors)}</p>
        </div>
      </div>

      {/* Contribution bar */}
      <div className="mb-4">
        <div className="flex h-2.5 rounded-sm overflow-hidden bg-parchment-dark">
          {member.pacDirect > 0 && (
            <div
              className="bg-crimson"
              style={{ width: `${(member.pacDirect / member.totalLobby) * 100}%` }}
              title={`PAC: ${fmtFull(member.pacDirect)}`}
            />
          )}
          {member.indExpend > 0 && (
            <div
              className="bg-yellow-500"
              style={{ width: `${(member.indExpend / member.totalLobby) * 100}%` }}
              title={`IE: ${fmtFull(member.indExpend)}`}
            />
          )}
          {member.lobbyDonors > 0 && (
            <div
              className="bg-ink/30"
              style={{ width: `${(member.lobbyDonors / member.totalLobby) * 100}%` }}
              title={`Donors: ${fmtFull(member.lobbyDonors)}`}
            />
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 font-sans text-[0.55rem] text-ink-faint"><span className="w-2 h-2 bg-crimson rounded-sm" /> PAC</span>
          <span className="flex items-center gap-1 font-sans text-[0.55rem] text-ink-faint"><span className="w-2 h-2 bg-yellow-500 rounded-sm" /> Ind. Exp.</span>
          <span className="flex items-center gap-1 font-sans text-[0.55rem] text-ink-faint"><span className="w-2 h-2 bg-ink/30 rounded-sm" /> Donors</span>
        </div>
      </div>

      <p className="font-sans text-[0.55rem] text-ink-faint">
        Source: FEC filings via Track AIPAC &middot; Career totals
      </p>
    </div>
  )
}

/* ── Hemicycle Layout (semicircle seating chart) ──── */
function Hemicycle({ members, title, seatCount, selected, onSelect }: {
  members: CongressMember[]
  title: string
  seatCount: number
  selected: CongressMember | null
  onSelect: (m: CongressMember) => void
}) {
  // Sort: highest contributors in front (center), lowest in back
  const sorted = [...members].sort((a, b) => b.totalLobby - a.totalLobby)
  const totalContrib = members.reduce((s, m) => s + m.totalLobby, 0)
  const rCount = members.filter(m => m.party === 'R').length
  const dCount = members.filter(m => m.party === 'D').length
  const iCount = members.filter(m => m.party === 'I').length

  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="font-display text-xl md:text-2xl font-bold text-ink">{title}</h3>
        <div className="flex-1 h-[1px] bg-border" />
        <span className="font-sans text-xs text-ink-faint">{members.length} of {seatCount} seats</span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-surface border border-border rounded-sm p-3 text-center">
          <p className="font-display text-lg font-bold text-crimson">{fmt(totalContrib)}</p>
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mt-0.5">Total Lobby Funds</p>
        </div>
        <div className="bg-surface border border-border rounded-sm p-3 text-center">
          <p className="font-display text-lg font-bold text-ink">{fmt(totalContrib / (members.length || 1))}</p>
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mt-0.5">Avg. per Member</p>
        </div>
        <div className="bg-surface border border-border rounded-sm p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="font-sans text-sm font-bold text-red-600">{rCount}R</span>
            <span className="font-sans text-sm font-bold text-blue-600">{dCount}D</span>
            {iCount > 0 && <span className="font-sans text-sm font-bold text-purple-600">{iCount}I</span>}
          </div>
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mt-0.5">Party Breakdown</p>
        </div>
        <div className="bg-surface border border-border rounded-sm p-3 text-center">
          <p className="font-display text-lg font-bold text-yellow-700">{members.filter(m => m.aipacTopContributor).length}</p>
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-ink-faint mt-0.5">AIPAC = #1 Donor</p>
        </div>
      </div>

      {/* Hemicycle visualization */}
      <div className="relative bg-surface border border-border rounded-sm p-4 md:p-6 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-1 md:gap-1.5" role="group" aria-label={`${title} seating chart`}>
          {sorted.map((m, i) => (
            <MemberDot
              key={`${m.state}-${m.district}-${i}`}
              member={m}
              onClick={onSelect}
              isSelected={selected?.name === m.name && selected?.state === m.state}
            />
          ))}
        </div>
        {/* Podium */}
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-1 bg-ink/20 rounded-full" />
        </div>
      </div>

      {/* Size legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 px-1">
        <span className="font-sans text-[0.55rem] text-ink-faint font-bold tracking-[0.1em] uppercase">Dot size = contribution level:</span>
        {(['mega', 'high', 'mid', 'low', 'minimal'] as const).map(t => (
          <span key={t} className="flex items-center gap-1.5 font-sans text-[0.55rem] text-ink-faint">
            <span className={`${tierSize[t]} rounded-full bg-ink/40 inline-block`} />
            {t === 'mega' ? '$3M+' : t === 'high' ? '$1M+' : t === 'mid' ? '$500K+' : t === 'low' ? '$100K+' : '<$100K'}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ── Main Component ──────────────────────────────── */
export default function AipacDiagram() {
  const [selected, setSelected] = useState<CongressMember | null>(null)
  const [search, setSearch] = useState('')
  const [chamberFilter, setChamberFilter] = useState<'all' | Chamber>('all')
  const [partyFilter, setPartyFilter] = useState<'all' | Party>('all')
  const [sortBy, setSortBy] = useState<'total' | 'pac' | 'name'>('total')
  const [showVotes, setShowVotes] = useState(false)
  const [showLobbyists, setShowLobbyists] = useState(false)

  const filtered = useMemo(() => {
    let result = MEMBERS
    if (chamberFilter !== 'all') result = result.filter(m => m.chamber === chamberFilter)
    if (partyFilter !== 'all') result = result.filter(m => m.party === partyFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) ||
        `${m.state}-${m.district}`.toLowerCase().includes(q)
      )
    }
    return result
  }, [chamberFilter, partyFilter, search])

  const senators = useMemo(() => filtered.filter(m => m.chamber === 'senate'), [filtered])
  const reps = useMemo(() => filtered.filter(m => m.chamber === 'house'), [filtered])

  const topRecipients = useMemo(() =>
    [...MEMBERS].sort((a, b) => b.totalLobby - a.totalLobby).slice(0, 20)
  , [])

  const handleSelect = useCallback((m: CongressMember) => {
    setSelected(prev => prev?.name === m.name && prev?.state === m.state ? null : m)
  }, [])

  return (
    <div className="py-8">
      {/* ── Header ───────────────────────────────────── */}
      <header className="mb-10">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-2">
          Interactive Investigation
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight mb-3">
          AIPAC&rsquo;s Reach Across the U.S. Government
        </h2>
        <p className="font-body text-base text-ink-muted max-w-3xl">
          A comprehensive map of pro-Israel lobby spending across the House, Senate, and Executive Branch.
          Every dot represents a member of Congress. Size indicates contribution level. Click any dot for the full breakdown.
        </p>
        <div className="evidence-verified mt-4" role="note" aria-label="Verified — Primary Source Documentation">
          <p className="evidence-label text-verified">
            <span aria-hidden="true" className="mr-1.5">✓</span>
            Verified — Federal Election Commission Filings
          </p>
          <p className="font-body text-sm leading-relaxed text-ink-light">
            All contribution figures sourced from official FEC filings, aggregated by Track AIPAC and OpenSecrets.org.
            Career totals include PAC contributions, independent expenditures, and donations from AIPAC-connected donors.
          </p>
        </div>
      </header>

      {/* ── Aggregate Stats Bar ──────────────────────── */}
      <div className="bg-ink rounded-sm p-5 md:p-6 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-crimson-light">${(AIPAC_STATS.totalSpent2024Cycle / 1_000_000).toFixed(1)}M</p>
          <p className="font-sans text-[0.55rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Total 2024 Cycle Spending</p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-crimson-light">{AIPAC_STATS.totalMembersReceiving}</p>
          <p className="font-sans text-[0.55rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Members Funded (65%)</p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-crimson-light">{(AIPAC_STATS.winRate2024 * 100).toFixed(0)}%</p>
          <p className="font-sans text-[0.55rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Win Rate (2024)</p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-crimson-light">{AIPAC_STATS.membersWithAipacTopContributor}</p>
          <p className="font-sans text-[0.55rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">AIPAC = #1 Donor</p>
        </div>
      </div>

      {/* ── Search & Filters ─────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-surface border border-border rounded-sm">
        <div className="flex-1 min-w-[200px]">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, state, or district…"
            className="w-full px-3 py-2 font-sans text-sm bg-parchment border border-border rounded-sm focus:border-crimson focus:outline-none transition-colors"
          />
        </div>
        <select
          value={chamberFilter}
          onChange={e => setChamberFilter(e.target.value as 'all' | Chamber)}
          className="px-3 py-2 font-sans text-xs bg-parchment border border-border rounded-sm focus:border-crimson focus:outline-none"
        >
          <option value="all">All Chambers</option>
          <option value="senate">Senate</option>
          <option value="house">House</option>
        </select>
        <select
          value={partyFilter}
          onChange={e => setPartyFilter(e.target.value as 'all' | Party)}
          className="px-3 py-2 font-sans text-xs bg-parchment border border-border rounded-sm focus:border-crimson focus:outline-none"
        >
          <option value="all">All Parties</option>
          <option value="R">Republican</option>
          <option value="D">Democrat</option>
          <option value="I">Independent</option>
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'total' | 'pac' | 'name')}
          className="px-3 py-2 font-sans text-xs bg-parchment border border-border rounded-sm focus:border-crimson focus:outline-none"
        >
          <option value="total">Sort: Total Lobby</option>
          <option value="pac">Sort: PAC Direct</option>
          <option value="name">Sort: Name</option>
        </select>
        <span className="font-sans text-xs text-ink-faint">
          {filtered.length} members
        </span>
      </div>

      {/* ── Selected Member Card ─────────────────────── */}
      {selected && (
        <div className="mb-8 flex justify-center">
          <MemberCard member={selected} onClose={() => setSelected(null)} />
        </div>
      )}

      {/* ── Senate Hemicycle ──────────────────────────── */}
      {(chamberFilter === 'all' || chamberFilter === 'senate') && senators.length > 0 && (
        <Hemicycle
          members={senators}
          title="United States Senate"
          seatCount={100}
          selected={selected}
          onSelect={handleSelect}
        />
      )}

      {/* ── House Hemicycle ──────────────────────────── */}
      {(chamberFilter === 'all' || chamberFilter === 'house') && reps.length > 0 && (
        <Hemicycle
          members={reps}
          title="United States House of Representatives"
          seatCount={435}
          selected={selected}
          onSelect={handleSelect}
        />
      )}

      {/* ── Executive Branch ─────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">The White House</h3>
          <div className="flex-1 h-[1px] bg-border" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {EXECUTIVE_BRANCH.map(exec => (
            <div key={exec.name} className={`p-4 border border-border rounded-sm ${partyBg[exec.party]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: partyColor[exec.party] }} />
                <h4 className="font-display text-base font-bold text-ink">{exec.name}</h4>
              </div>
              <p className="font-sans text-xs font-semibold text-ink-muted mb-2">{exec.role}</p>
              <p className="font-body text-xs text-ink-muted leading-relaxed">{exec.aipacRelation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top 20 Recipients Table ──────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">Top 20 Recipients</h3>
          <div className="flex-1 h-[1px] bg-border" />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Member</th>
                <th className="text-left">Party</th>
                <th className="text-left">State</th>
                <th className="text-left">Chamber</th>
                <th className="text-right">Total Lobby</th>
                <th className="text-right">PAC Direct</th>
                <th className="text-right">Ind. Exp.</th>
              </tr>
            </thead>
            <tbody>
              {topRecipients.map((m, i) => (
                <tr
                  key={`${m.name}-${m.state}`}
                  className="cursor-pointer hover:bg-parchment-dark transition-colors"
                  onClick={() => handleSelect(m)}
                >
                  <td className="font-mono text-xs text-ink-faint">{i + 1}</td>
                  <td className="font-sans text-sm font-semibold text-ink">
                    {m.name}
                    {m.aipacTopContributor && <span className="ml-1 text-yellow-600" title="AIPAC is #1 all-time contributor">★</span>}
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: partyColor[m.party] }} />
                      <span className="font-sans text-xs">{m.party}</span>
                    </span>
                  </td>
                  <td className="font-sans text-xs">{m.state}{m.district !== 'SEN' && m.district !== 'AL' ? `-${m.district}` : ''}</td>
                  <td className="font-sans text-xs capitalize">{m.chamber}</td>
                  <td className="text-right font-mono text-sm font-semibold text-crimson">{fmt(m.totalLobby)}</td>
                  <td className="text-right font-mono text-xs text-ink-muted">{fmt(m.pacDirect)}</td>
                  <td className="text-right font-mono text-xs text-ink-muted">{fmt(m.indExpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Key Votes (collapsible) ──────────────────── */}
      <section className="mb-12">
        <button
          onClick={() => setShowVotes(!showVotes)}
          className="flex items-center gap-4 mb-4 w-full text-left group"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-crimson transition-colors">
            Key Israel-Related Votes
          </h3>
          <div className="flex-1 h-[1px] bg-border" />
          <svg className={`w-5 h-5 text-ink-faint transition-transform ${showVotes ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showVotes && (
          <div className="space-y-4 animate-fade-in">
            {KEY_VOTES.map(vote => (
              <div key={vote.id} className="p-4 border border-border rounded-sm">
                <div className="flex flex-wrap items-start gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-crimson bg-crimson/5 px-2 py-1 rounded-sm">{vote.bill}</span>
                  <span className="font-sans text-xs text-ink-faint">{vote.date}</span>
                  <span className="font-sans text-xs font-semibold text-verified bg-verified-bg px-2 py-0.5 rounded-sm">{vote.result}</span>
                </div>
                <h4 className="font-display text-base font-bold text-ink mb-1">{vote.title}</h4>
                <p className="font-body text-sm text-ink-muted mb-3">{vote.description}</p>
                <div className="flex flex-wrap gap-4">
                  <span className="font-sans text-xs"><strong className="text-verified">{vote.yea}</strong> Yea &middot; <strong className="text-disputed">{vote.nay}</strong> Nay</span>
                  <span className="font-sans text-xs text-red-600">R: {vote.rYea}Y / {vote.rNay}N</span>
                  <span className="font-sans text-xs text-blue-600">D: {vote.dYea}Y / {vote.dNay}N</span>
                </div>
                {/* Vote bar */}
                <div className="flex h-2 rounded-sm overflow-hidden mt-2 bg-parchment-dark">
                  <div className="bg-verified" style={{ width: `${(vote.yea / (vote.yea + vote.nay)) * 100}%` }} />
                  <div className="bg-disputed" style={{ width: `${(vote.nay / (vote.yea + vote.nay)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── AIPAC Lobbyists (collapsible) ─────────────── */}
      <section className="mb-12">
        <button
          onClick={() => setShowLobbyists(!showLobbyists)}
          className="flex items-center gap-4 mb-4 w-full text-left group"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-crimson transition-colors">
            AIPAC Registered Lobbyists
          </h3>
          <div className="flex-1 h-[1px] bg-border" />
          <span className="font-sans text-xs text-ink-faint mr-2">{AIPAC_LOBBYISTS.length} registered</span>
          <svg className={`w-5 h-5 text-ink-faint transition-transform ${showLobbyists ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showLobbyists && (
          <div className="animate-fade-in">
            <p className="font-body text-sm text-ink-muted mb-4">
              AIPAC had {AIPAC_LOBBYISTS.length} registered lobbyists in 2024, {AIPAC_LOBBYISTS.filter(l => l.priorGovService).length} of whom have prior government service.
              AIPAC spent ${(AIPAC_STATS.lobbying2024 / 1_000_000).toFixed(1)}M on lobbying in 2024.
              Unlike many lobby organizations, AIPAC does not publicly assign individual lobbyists to specific members of Congress.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {AIPAC_LOBBYISTS.map(lobbyist => (
                <div key={lobbyist.name} className="p-4 border border-border rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-parchment-dark flex items-center justify-center shrink-0">
                      <span className="font-display text-sm font-bold text-ink-muted">
                        {lobbyist.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-ink">{lobbyist.name}</h4>
                      <p className="font-sans text-[0.6rem] text-ink-muted">{lobbyist.role}</p>
                    </div>
                  </div>
                  {lobbyist.priorGovService && (
                    <span className="inline-block font-sans text-[0.55rem] font-bold tracking-[0.08em] uppercase text-circumstantial bg-circumstantial-bg border border-circumstantial-border px-2 py-0.5 rounded-sm mb-2">
                      Prior Gov. Service
                    </span>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {lobbyist.issues.map(issue => (
                      <span key={issue} className="font-sans text-[0.55rem] px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Full Member List (sorted) ────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">All Tracked Members</h3>
          <div className="flex-1 h-[1px] bg-border" />
          <span className="font-sans text-xs text-ink-faint">{filtered.length} members</span>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-border rounded-sm">
          <table className="data-table w-full">
            <thead className="sticky top-0 bg-surface z-10">
              <tr>
                <th className="text-left cursor-pointer hover:text-crimson" onClick={() => setSortBy('name')}>Name {sortBy === 'name' && '↓'}</th>
                <th className="text-left">Party</th>
                <th className="text-left">State</th>
                <th className="text-left">Chamber</th>
                <th className="text-right cursor-pointer hover:text-crimson" onClick={() => setSortBy('total')}>Total {sortBy === 'total' && '↓'}</th>
                <th className="text-right cursor-pointer hover:text-crimson" onClick={() => setSortBy('pac')}>PAC {sortBy === 'pac' && '↓'}</th>
              </tr>
            </thead>
            <tbody>
              {[...filtered].sort((a, b) =>
                sortBy === 'total' ? b.totalLobby - a.totalLobby :
                sortBy === 'pac' ? b.pacDirect - a.pacDirect :
                a.name.localeCompare(b.name)
              ).map(m => (
                <tr
                  key={`${m.name}-${m.state}-${m.district}`}
                  className="cursor-pointer hover:bg-parchment-dark transition-colors"
                  onClick={() => handleSelect(m)}
                >
                  <td className="font-sans text-sm text-ink">
                    {m.name}
                    {m.aipacTopContributor && <span className="ml-1 text-yellow-600">★</span>}
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: partyColor[m.party] }} />
                      <span className="font-sans text-xs">{m.party}</span>
                    </span>
                  </td>
                  <td className="font-sans text-xs">{m.state}{m.district !== 'SEN' && m.district !== 'AL' ? `-${m.district}` : ''}</td>
                  <td className="font-sans text-xs capitalize">{m.chamber}</td>
                  <td className="text-right font-mono text-xs text-crimson">{fmt(m.totalLobby)}</td>
                  <td className="text-right font-mono text-xs text-ink-muted">{fmt(m.pacDirect)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Sources & Methodology ─────────────────── */}
      <section className="border-t border-border pt-8 mt-8">
        <h3 className="font-display text-lg text-ink mb-3">Sources &amp; Methodology</h3>
        <div className="space-y-2 font-sans text-xs text-ink-muted leading-relaxed">
          <p>
            Contribution data sourced from <strong>Federal Election Commission (FEC)</strong> filings
            and aggregated via{' '}
            <a href="https://trackaipac.com" target="_blank" rel="noopener noreferrer" className="underline text-crimson hover:text-crimson-dark">
              Track AIPAC
            </a>{' '}
            and{' '}
            <a href="https://www.opensecrets.org" target="_blank" rel="noopener noreferrer" className="underline text-crimson hover:text-crimson-dark">
              OpenSecrets / Center for Responsive Politics
            </a>.
          </p>
          <p>
            Figures represent <strong>career totals</strong> of AIPAC PAC direct contributions,
            independent expenditures (IE), and bundled individual donations from AIPAC-affiliated donors.
            Data current through the 2024 election cycle.
          </p>
          <p>
            Vote records sourced from official congressional roll-call databases
            (<a href="https://clerk.house.gov" target="_blank" rel="noopener noreferrer" className="underline text-crimson hover:text-crimson-dark">clerk.house.gov</a>,{' '}
            <a href="https://www.senate.gov" target="_blank" rel="noopener noreferrer" className="underline text-crimson hover:text-crimson-dark">senate.gov</a>).
            Lobbyist registrations from{' '}
            <a href="https://lda.senate.gov" target="_blank" rel="noopener noreferrer" className="underline text-crimson hover:text-crimson-dark">
              Senate Lobbying Disclosure Act database
            </a>.
          </p>
        </div>
      </section>
    </div>
  )
}

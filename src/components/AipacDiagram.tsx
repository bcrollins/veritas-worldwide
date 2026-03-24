/**
 * AipacDiagram — Interactive AIPAC Congressional Influence Map
 *
 * True hemicycle (semicircle) seating for House + Senate.
 * Democrats left, Republicans right, Independents center — matching
 * actual chamber seating. Each seat shows the member's name.
 * Click → full popup: photo, donation history, correlated votes,
 * assigned AIPAC lobbyist, contact info, district.
 */
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  MEMBERS, KEY_VOTES, AIPAC_LOBBYISTS, AIPAC_STATS, EXECUTIVE_BRANCH,
  MEMBER_ENRICHMENT, getMemberPhotoUrl, getEnrichment,
  type CongressMember, type Chamber, type Party, type DonationRecord,
} from '../data/aipacData'

/* ── Helpers ──────────────────────────────────────── */
const fmt = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K`
  : `$${n.toLocaleString()}`
const fmtFull = (n: number) => `$${n.toLocaleString()}`

const partyColor: Record<Party, string> = { R: '#DC2626', D: '#2563EB', I: '#7C3AED' }
const partyLabel: Record<Party, string> = { R: 'Republican', D: 'Democrat', I: 'Independent' }

function contribTier(total: number): 'mega' | 'high' | 'mid' | 'low' | 'minimal' {
  if (total >= 3_000_000) return 'mega'
  if (total >= 1_000_000) return 'high'
  if (total >= 500_000) return 'mid'
  if (total >= 100_000) return 'low'
  return 'minimal'
}
const tierRadius: Record<string, number> = { mega: 8, high: 6.5, mid: 5.5, low: 4.5, minimal: 3.5 }

/* ── SVG Hemicycle — True semicircle seating chart ── */
interface SeatPos { x: number; y: number; member: CongressMember }

function computeHemicycleSeats(
  members: CongressMember[],
  width: number,
  height: number,
): SeatPos[] {
  // Sort: Dems on left (angle 180→90), Independents center, GOP on right (angle 90→0)
  const dems = members.filter(m => m.party === 'D').sort((a, b) => b.totalLobby - a.totalLobby)
  const indeps = members.filter(m => m.party === 'I').sort((a, b) => b.totalLobby - a.totalLobby)
  const gop = members.filter(m => m.party === 'R').sort((a, b) => b.totalLobby - a.totalLobby)
  const ordered = [...dems, ...indeps, ...gop]

  const total = ordered.length
  if (total === 0) return []

  // Calculate rows — fill from inner arc outward
  const cx = width / 2
  const cy = height - 20
  const minR = Math.min(width, height) * 0.25
  const maxR = Math.min(width, height) * 0.85
  const rowGap = 22
  const numRows = Math.max(2, Math.ceil(total / 25))
  const seats: SeatPos[] = []
  let placed = 0

  for (let row = 0; row < numRows && placed < total; row++) {
    const r = minR + (row / (numRows - 1 || 1)) * (maxR - minR)
    const seatsInRow = Math.min(
      Math.ceil((total - placed) / (numRows - row)),
      Math.floor((Math.PI * r) / 18) // min 18px spacing between seats
    )
    for (let s = 0; s < seatsInRow && placed < total; s++) {
      // Angle from π (left) to 0 (right)
      const angle = Math.PI - (s / (seatsInRow - 1 || 1)) * Math.PI
      seats.push({
        x: cx + r * Math.cos(angle),
        y: cy - r * Math.sin(angle),
        member: ordered[placed],
      })
      placed++
    }
  }
  return seats
}

/* ── Member Popup — Full detail modal ────────────── */
function MemberPopup({ member, onClose }: { member: CongressMember; onClose: () => void }) {
  const enriched = getEnrichment(member)
  const photoUrl = getMemberPhotoUrl(enriched.bioguideId)
  const donations = enriched.donations || []
  const contact = enriched.contact
  const lobbyist = enriched.assignedLobbyist
  const popupRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 100)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4">
      <div
        ref={popupRef}
        className="bg-surface border border-border rounded-sm shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-label={`${member.name} AIPAC profile`}
      >
        {/* Header with photo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-start gap-4">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`Official portrait of ${member.name}`}
                className="w-20 h-24 object-cover rounded-sm border border-border shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ) : (
              <div className="w-20 h-24 bg-parchment-dark rounded-sm border border-border flex items-center justify-center shrink-0">
                <span className="font-display text-2xl text-ink-faint">{member.name.charAt(0)}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: partyColor[member.party] }} />
                <h3 className="font-display text-xl font-bold text-ink truncate">{member.name}</h3>
              </div>
              <p className="font-sans text-sm text-ink-muted">
                {partyLabel[member.party]} &middot; {member.state}
                {member.district === 'SEN' ? ' (Senate)' : member.district === 'AL' ? ' (At-Large)' : `, District ${member.district}`}
              </p>
              {enriched.electedYear && (
                <p className="font-sans text-xs text-ink-faint mt-1">
                  Elected {enriched.electedYear}{enriched.nextElection ? ` · Next election ${enriched.nextElection}` : ''}
                </p>
              )}
              {member.aipacTopContributor && (
                <span className="inline-flex items-center gap-1 mt-1.5 font-sans text-[0.6rem] font-bold tracking-[0.08em] uppercase text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-sm">
                  ★ AIPAC = #1 All-Time Contributor
                </span>
              )}
            </div>
            <button onClick={onClose} className="text-ink-faint hover:text-ink transition-colors p-1 shrink-0" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contribution totals */}
        <div className="p-5 border-b border-border">
          <h4 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">AIPAC Contributions — Career Total</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-parchment-dark rounded-sm p-3">
              <p className="font-display text-xl font-bold text-crimson">{fmtFull(member.totalLobby)}</p>
              <p className="font-sans text-[0.55rem] text-ink-faint mt-0.5">Total Pro-Israel Lobby</p>
            </div>
            <div className="bg-parchment-dark rounded-sm p-3">
              <p className="font-display text-xl font-bold text-ink">{fmtFull(member.pacDirect)}</p>
              <p className="font-sans text-[0.55rem] text-ink-faint mt-0.5">Direct PAC</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-2">
              <p className="font-sans text-sm font-semibold text-ink">{fmtFull(member.indExpend)}</p>
              <p className="font-sans text-[0.55rem] text-ink-faint">Independent Expenditures</p>
            </div>
            <div className="p-2">
              <p className="font-sans text-sm font-semibold text-ink">{fmtFull(member.lobbyDonors)}</p>
              <p className="font-sans text-[0.55rem] text-ink-faint">Lobby-Connected Donors</p>
            </div>
          </div>
          {/* Contribution bar */}
          <div className="flex h-2.5 rounded-sm overflow-hidden bg-parchment-dark">
            {member.pacDirect > 0 && <div className="bg-crimson" style={{ width: `${(member.pacDirect / member.totalLobby) * 100}%` }} />}
            {member.indExpend > 0 && <div className="bg-yellow-500" style={{ width: `${(member.indExpend / member.totalLobby) * 100}%` }} />}
            {member.lobbyDonors > 0 && <div className="bg-ink/30" style={{ width: `${(member.lobbyDonors / member.totalLobby) * 100}%` }} />}
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 font-sans text-[0.5rem] text-ink-faint"><span className="w-2 h-2 bg-crimson rounded-sm" /> PAC</span>
            <span className="flex items-center gap-1 font-sans text-[0.5rem] text-ink-faint"><span className="w-2 h-2 bg-yellow-500 rounded-sm" /> Ind. Exp.</span>
            <span className="flex items-center gap-1 font-sans text-[0.5rem] text-ink-faint"><span className="w-2 h-2 bg-ink/30 rounded-sm" /> Donors</span>
          </div>
        </div>

        {/* Donation History — itemized */}
        {donations.length > 0 && (
          <div className="p-5 border-b border-border">
            <h4 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">
              Donation History ({donations.length} records)
            </h4>
            <div className="space-y-2">
              {donations.sort((a, b) => b.date.localeCompare(a.date)).map((d, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                  <div className="shrink-0 mt-0.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      d.type === 'pac' ? 'bg-crimson' : d.type === 'ie' ? 'bg-yellow-500' : 'bg-ink/30'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-sm font-bold text-crimson">{fmtFull(d.amount)}</span>
                      <span className="font-mono text-[0.6rem] text-ink-faint shrink-0">{d.date}</span>
                    </div>
                    <p className="font-sans text-xs text-ink-muted mt-0.5">{d.description || d.type.toUpperCase()}</p>
                    <span className="font-sans text-[0.55rem] text-ink-faint">{d.cycle} cycle · {
                      d.type === 'pac' ? 'PAC Direct' : d.type === 'ie' ? 'Independent Expenditure' : 'Bundled Donors'
                    }</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voting Record — correlated with donations */}
        {member.keyVotes && Object.keys(member.keyVotes).length > 0 && (
          <div className="p-5 border-b border-border">
            <h4 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">
              Voting Record — Israel-Related Bills
            </h4>
            <div className="space-y-2">
              {KEY_VOTES.filter(v => member.keyVotes?.[v.id]).map(v => {
                const vote = member.keyVotes![v.id]
                return (
                  <div key={v.id} className="flex items-center justify-between gap-2 py-1.5 border-b border-border/50 last:border-0">
                    <div className="min-w-0">
                      <p className="font-sans text-xs font-semibold text-ink truncate">{v.bill}</p>
                      <p className="font-sans text-[0.55rem] text-ink-faint truncate">{v.title}</p>
                    </div>
                    <span className={`shrink-0 font-mono text-xs font-bold px-2 py-0.5 rounded-sm ${
                      vote === 'Y' ? 'bg-green-50 text-green-700 border border-green-200' :
                      vote === 'N' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}>
                      {vote === 'Y' ? 'YEA' : vote === 'N' ? 'NAY' : vote === 'NV' ? 'NO VOTE' : 'PRESENT'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Assigned AIPAC Lobbyist */}
        {lobbyist && (
          <div className="p-5 border-b border-border">
            <h4 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">
              Assigned AIPAC Lobbyist
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-parchment-dark rounded-full flex items-center justify-center border border-border">
                <span className="font-display text-sm text-ink-faint">{lobbyist.charAt(0)}</span>
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{lobbyist}</p>
                {AIPAC_LOBBYISTS.find(l => l.name === lobbyist) && (
                  <p className="font-sans text-xs text-ink-faint">
                    {AIPAC_LOBBYISTS.find(l => l.name === lobbyist)!.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Info & Representation */}
        <div className="p-5">
          <h4 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">
            Contact &amp; Representation
          </h4>
          <div className="space-y-1.5 font-sans text-xs text-ink-muted">
            <p><strong className="text-ink">Represents:</strong> {member.state}{member.district === 'SEN' ? ' (U.S. Senate)' : member.district === 'AL' ? ' (At-Large)' : `, Congressional District ${member.district}`}</p>
            {contact?.office && <p><strong className="text-ink">Office:</strong> {contact.office}</p>}
            {contact?.phone && <p><strong className="text-ink">Phone:</strong> <a href={`tel:${contact.phone}`} className="text-crimson hover:underline">{contact.phone}</a></p>}
            {contact?.website && (
              <p><strong className="text-ink">Website:</strong>{' '}
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline">
                  {contact.website.replace('https://', '')}
                </a>
              </p>
            )}
          </div>
          <p className="font-sans text-[0.5rem] text-ink-faint mt-4">
            Source: FEC filings via Track AIPAC &middot; Career totals through 2024 cycle
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Hemicycle SVG Component ─────────────────────── */
function HemicycleSVG({ members, title, seatCount, selected, onSelect }: {
  members: CongressMember[]
  title: string
  seatCount: number
  selected: CongressMember | null
  onSelect: (m: CongressMember) => void
}) {
  const svgWidth = 900
  const svgHeight = 500
  const seats = useMemo(() => computeHemicycleSeats(members, svgWidth, svgHeight), [members])
  const totalContrib = members.reduce((s, m) => s + m.totalLobby, 0)
  const rCount = members.filter(m => m.party === 'R').length
  const dCount = members.filter(m => m.party === 'D').length
  const iCount = members.filter(m => m.party === 'I').length
  const [hovered, setHovered] = useState<string | null>(null)

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

      {/* SVG Hemicycle */}
      <div className="relative bg-surface border border-border rounded-sm overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[600px]"
          role="img"
          aria-label={`${title} hemicycle seating chart`}
        >
          {/* Party labels */}
          <text x="60" y="30" className="fill-blue-600" fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif">DEMOCRAT</text>
          <text x={svgWidth - 130} y="30" className="fill-red-600" fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif">REPUBLICAN</text>
          {iCount > 0 && (
            <text x={svgWidth / 2} y="30" textAnchor="middle" className="fill-purple-600" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">IND</text>
          )}

          {/* Podium */}
          <rect x={svgWidth / 2 - 30} y={svgHeight - 18} width="60" height="6" rx="3" fill="#1A1A1A" opacity="0.15" />

          {/* Seats */}
          {seats.map((seat, i) => {
            const tier = contribTier(seat.member.totalLobby)
            const r = tierRadius[tier]
            const isSelected = selected?.name === seat.member.name && selected?.state === seat.member.state
            const isHovered = hovered === `${seat.member.name}-${seat.member.state}-${i}`
            const lastName = seat.member.name.split(' ').pop() || seat.member.name

            return (
              <g
                key={`${seat.member.state}-${seat.member.district}-${i}`}
                className="cursor-pointer"
                onClick={() => onSelect(seat.member)}
                onMouseEnter={() => setHovered(`${seat.member.name}-${seat.member.state}-${i}`)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Seat circle */}
                <circle
                  cx={seat.x}
                  cy={seat.y}
                  r={isSelected ? r + 3 : isHovered ? r + 1.5 : r}
                  fill={partyColor[seat.member.party]}
                  opacity={isSelected ? 1 : isHovered ? 0.95 : tier === 'minimal' ? 0.5 : tier === 'low' ? 0.65 : 0.85}
                  stroke={isSelected ? '#1A1A1A' : seat.member.aipacTopContributor ? '#EAB308' : 'none'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />
                {/* Name label */}
                <text
                  x={seat.x}
                  y={seat.y + r + 10}
                  textAnchor="middle"
                  fontSize={tier === 'mega' || tier === 'high' ? '7' : '5.5'}
                  fontFamily="Inter, sans-serif"
                  fontWeight={tier === 'mega' ? '700' : '500'}
                  fill="#1A1A1A"
                  opacity={isHovered || isSelected ? 1 : 0.7}
                >
                  {lastName}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Size legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 px-1">
        <span className="font-sans text-[0.55rem] text-ink-faint font-bold tracking-[0.1em] uppercase">Dot size = contribution:</span>
        {(['mega', 'high', 'mid', 'low', 'minimal'] as const).map(t => (
          <span key={t} className="flex items-center gap-1.5 font-sans text-[0.55rem] text-ink-faint">
            <svg width={tierRadius[t] * 2 + 2} height={tierRadius[t] * 2 + 2}>
              <circle cx={tierRadius[t] + 1} cy={tierRadius[t] + 1} r={tierRadius[t]} fill="#1A1A1A" opacity="0.4" />
            </svg>
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
  const [showAllMembers, setShowAllMembers] = useState(false)

  const handleSelect = useCallback((m: CongressMember) => setSelected(m), [])
  const handleClose = useCallback(() => setSelected(null), [])

  const filtered = useMemo(() => {
    let list = [...MEMBERS]
    if (chamberFilter !== 'all') list = list.filter(m => m.chamber === chamberFilter)
    if (partyFilter !== 'all') list = list.filter(m => m.party === partyFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q)
      )
    }
    return list
  }, [chamberFilter, partyFilter, search])

  const senators = useMemo(() => filtered.filter(m => m.chamber === 'senate'), [filtered])
  const houseMembers = useMemo(() => filtered.filter(m => m.chamber === 'house'), [filtered])

  return (
    /* Full-width layout — uses max-w-7xl instead of default 5xl for data-dense content */
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Popup modal */}
      {selected && <MemberPopup member={selected} onClose={handleClose} />}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F0FDF4] border border-[#166534]/20">
            <span className="w-2 h-2 rounded-full bg-[#166534]" />
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#166534]">
              Verified — FEC Filings
            </span>
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
          AIPAC Congressional Influence Map
        </h2>
        <p className="font-body text-base text-ink-muted max-w-3xl">
          Every dollar traced to federal FEC filings. Click any seat to see their complete AIPAC
          contribution history, voting record on Israel-related bills, assigned lobbyist, and contact information.
        </p>
      </div>

      {/* Aggregate stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 bg-ink text-white rounded-sm p-4">
        <div className="text-center">
          <p className="font-display text-xl md:text-2xl font-bold">{fmt(AIPAC_STATS.totalSpent2024Cycle)}</p>
          <p className="font-sans text-[0.55rem] tracking-[0.1em] uppercase text-white/60 mt-0.5">2024 Cycle Total</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xl md:text-2xl font-bold">{(AIPAC_STATS.winRate2024 * 100).toFixed(0)}%</p>
          <p className="font-sans text-[0.55rem] tracking-[0.1em] uppercase text-white/60 mt-0.5">Win Rate</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xl md:text-2xl font-bold">{AIPAC_STATS.candidatesSupported2024}</p>
          <p className="font-sans text-[0.55rem] tracking-[0.1em] uppercase text-white/60 mt-0.5">Candidates Backed</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xl md:text-2xl font-bold">{AIPAC_STATS.totalMembersReceiving}</p>
          <p className="font-sans text-[0.55rem] tracking-[0.1em] uppercase text-white/60 mt-0.5">Members Receiving</p>
        </div>
      </div>

      {/* Search & Filter controls — full width row */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-parchment-dark rounded-sm border border-border">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or state..."
          className="flex-1 min-w-[200px] px-3 py-2 bg-surface border border-border rounded-sm font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-crimson"
        />
        <select
          value={chamberFilter}
          onChange={e => setChamberFilter(e.target.value as 'all' | Chamber)}
          className="px-3 py-2 bg-surface border border-border rounded-sm font-sans text-xs text-ink"
        >
          <option value="all">All Chambers</option>
          <option value="senate">Senate</option>
          <option value="house">House</option>
        </select>
        <select
          value={partyFilter}
          onChange={e => setPartyFilter(e.target.value as 'all' | Party)}
          className="px-3 py-2 bg-surface border border-border rounded-sm font-sans text-xs text-ink"
        >
          <option value="all">All Parties</option>
          <option value="D">Democrat</option>
          <option value="R">Republican</option>
          <option value="I">Independent</option>
        </select>
      </div>

      {/* Two-column layout on wide screens: Senate + House side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
        {/* Senate Hemicycle */}
        {senators.length > 0 && (
          <HemicycleSVG
            members={senators}
            title="United States Senate"
            seatCount={100}
            selected={selected}
            onSelect={handleSelect}
          />
        )}
        {/* House Hemicycle */}
        {houseMembers.length > 0 && (
          <HemicycleSVG
            members={houseMembers}
            title="United States House of Representatives"
            seatCount={435}
            selected={selected}
            onSelect={handleSelect}
          />
        )}
      </div>

      {/* Executive Branch */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">Executive Branch</h3>
          <div className="flex-1 h-[1px] bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {EXECUTIVE_BRANCH.map(e => (
            <div key={e.name} className="bg-surface border border-border rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: partyColor[e.party] }} />
                <h4 className="font-display text-sm font-bold text-ink">{e.name}</h4>
              </div>
              <p className="font-sans text-xs font-semibold text-crimson mb-1.5">{e.role}</p>
              <p className="font-sans text-[0.65rem] text-ink-muted leading-relaxed">{e.aipacRelation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top 20 Recipients — full width table */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">Top 20 Recipients</h3>
          <div className="flex-1 h-[1px] bg-border" />
        </div>
        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink text-white">
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase">#</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase">Member</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase">Party</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase">State</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase">Chamber</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-right">Total</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-right">PAC</th>
                <th className="px-4 py-2.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-right">IE</th>
              </tr>
            </thead>
            <tbody>
              {[...MEMBERS].sort((a, b) => b.totalLobby - a.totalLobby).slice(0, 20).map((m, i) => (
                <tr
                  key={`top-${m.name}-${m.state}`}
                  className="cursor-pointer hover:bg-parchment-dark transition-colors border-b border-border/50"
                  onClick={() => handleSelect(m)}
                >
                  <td className="px-4 py-2 font-mono text-xs text-ink-faint">{i + 1}</td>
                  <td className="px-4 py-2 font-sans text-sm font-semibold text-ink">
                    {m.name}
                    {m.aipacTopContributor && <span className="ml-1 text-yellow-600">★</span>}
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: partyColor[m.party] }} />
                      <span className="font-sans text-xs">{partyLabel[m.party]}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2 font-sans text-xs">{m.state}{m.district !== 'SEN' && m.district !== 'AL' ? `-${m.district}` : ''}</td>
                  <td className="px-4 py-2 font-sans text-xs capitalize">{m.chamber}</td>
                  <td className="px-4 py-2 text-right font-mono text-sm font-bold text-crimson">{fmt(m.totalLobby)}</td>
                  <td className="px-4 py-2 text-right font-mono text-xs text-ink-muted">{fmt(m.pacDirect)}</td>
                  <td className="px-4 py-2 text-right font-mono text-xs text-ink-muted">{fmt(m.indExpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Votes — collapsible */}
      <section className="mb-12">
        <button
          onClick={() => setShowVotes(!showVotes)}
          className="flex items-center gap-4 w-full mb-4"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">Key Israel-Related Votes</h3>
          <div className="flex-1 h-[1px] bg-border" />
          <span className="font-sans text-xs text-crimson">{showVotes ? '▲ Collapse' : '▼ Expand'}</span>
        </button>
        {showVotes && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {KEY_VOTES.map(v => (
              <div key={v.id} className="bg-surface border border-border rounded-sm p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-sans text-xs font-bold text-ink">{v.bill}</p>
                    <p className="font-sans text-sm font-semibold text-ink mt-0.5">{v.title}</p>
                  </div>
                  <span className="shrink-0 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-green-700 bg-green-50 px-2 py-0.5 rounded-sm border border-green-200">
                    {v.result}
                  </span>
                </div>
                <p className="font-sans text-xs text-ink-muted mb-3">{v.description}</p>
                <div className="flex h-3 rounded-sm overflow-hidden bg-parchment-dark mb-2">
                  <div className="bg-green-600" style={{ width: `${(v.yea / (v.yea + v.nay)) * 100}%` }} />
                  <div className="bg-red-600" style={{ width: `${(v.nay / (v.yea + v.nay)) * 100}%` }} />
                </div>
                <div className="flex items-center justify-between font-sans text-[0.55rem] text-ink-faint">
                  <span>Yea: {v.yea} (R:{v.rYea} D:{v.dYea})</span>
                  <span>Nay: {v.nay} (R:{v.rNay} D:{v.dNay})</span>
                </div>
                <p className="font-mono text-[0.55rem] text-ink-faint mt-1">{v.date} · {v.chamber === 'both' ? 'Both Chambers' : v.chamber === 'senate' ? 'Senate' : 'House'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AIPAC Lobbyists — collapsible */}
      <section className="mb-12">
        <button
          onClick={() => setShowLobbyists(!showLobbyists)}
          className="flex items-center gap-4 w-full mb-4"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">AIPAC Registered Lobbyists</h3>
          <div className="flex-1 h-[1px] bg-border" />
          <span className="font-sans text-xs text-crimson">{showLobbyists ? '▲ Collapse' : '▼ Expand'}</span>
        </button>
        {showLobbyists && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AIPAC_LOBBYISTS.map(l => (
              <div key={l.name} className="bg-surface border border-border rounded-sm p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-parchment-dark rounded-full flex items-center justify-center border border-border">
                    <span className="font-display text-sm text-ink-faint">{l.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">{l.name}</p>
                    <p className="font-sans text-[0.6rem] text-ink-muted">{l.role}</p>
                  </div>
                </div>
                {l.priorGovService && (
                  <span className="inline-block font-sans text-[0.55rem] font-bold tracking-[0.08em] uppercase text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm mb-2">
                    Former Gov. Service
                  </span>
                )}
                <div className="flex flex-wrap gap-1">
                  {l.issues.map(iss => (
                    <span key={iss} className="font-sans text-[0.5rem] text-ink-faint bg-parchment-dark px-1.5 py-0.5 rounded-sm">{iss}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Tracked Members — collapsible sortable table */}
      <section className="mb-12">
        <button
          onClick={() => setShowAllMembers(!showAllMembers)}
          className="flex items-center gap-4 w-full mb-4"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink">All Tracked Members ({filtered.length})</h3>
          <div className="flex-1 h-[1px] bg-border" />
          <span className="font-sans text-xs text-crimson">{showAllMembers ? '▲ Collapse' : '▼ Expand'}</span>
        </button>
        {showAllMembers && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[0.6rem] text-ink-faint">Sort by:</span>
              {(['total', 'pac', 'name'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`font-sans text-[0.6rem] px-2 py-1 rounded-sm border transition-colors ${
                    sortBy === s ? 'bg-crimson text-white border-crimson' : 'border-border text-ink-muted hover:border-ink'
                  }`}
                >
                  {s === 'total' ? 'Total' : s === 'pac' ? 'PAC Direct' : 'Name'}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto border border-border rounded-sm max-h-[500px] overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-ink text-white z-10">
                  <tr>
                    <th className="px-3 py-2 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase">Name</th>
                    <th className="px-3 py-2 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase">Party</th>
                    <th className="px-3 py-2 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase">State</th>
                    <th className="px-3 py-2 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase">Chamber</th>
                    <th className="px-3 py-2 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-right">Total</th>
                    <th className="px-3 py-2 font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase text-right">PAC</th>
                  </tr>
                </thead>
                <tbody>
                  {[...filtered].sort((a, b) =>
                    sortBy === 'total' ? b.totalLobby - a.totalLobby :
                    sortBy === 'pac' ? b.pacDirect - a.pacDirect :
                    a.name.localeCompare(b.name)
                  ).map(m => (
                    <tr
                      key={`all-${m.name}-${m.state}-${m.district}`}
                      className="cursor-pointer hover:bg-parchment-dark transition-colors border-b border-border/30"
                      onClick={() => handleSelect(m)}
                    >
                      <td className="px-3 py-1.5 font-sans text-sm text-ink">
                        {m.name}
                        {m.aipacTopContributor && <span className="ml-1 text-yellow-600">★</span>}
                      </td>
                      <td className="px-3 py-1.5">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: partyColor[m.party] }} />
                          <span className="font-sans text-xs">{m.party}</span>
                        </span>
                      </td>
                      <td className="px-3 py-1.5 font-sans text-xs">{m.state}{m.district !== 'SEN' && m.district !== 'AL' ? `-${m.district}` : ''}</td>
                      <td className="px-3 py-1.5 font-sans text-xs capitalize">{m.chamber}</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs text-crimson">{fmt(m.totalLobby)}</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs text-ink-muted">{fmt(m.pacDirect)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Sources & Methodology */}
      <section className="border-t border-border pt-8">
        <h3 className="font-display text-lg text-ink mb-3">Sources &amp; Methodology</h3>
        <div className="space-y-2 font-sans text-xs text-ink-muted leading-relaxed max-w-3xl">
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

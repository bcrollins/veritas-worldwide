/**
 * Professional SVG diagrams for Veritas Press
 * Clean, publication-quality data visualizations
 */

export function MediaOwnershipDiagram() {
  return (
    <figure className="my-10 max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-sm border border-border bg-surface p-6">
        <svg viewBox="0 0 700 520" className="w-full h-auto" role="img" aria-label="Diagram showing how three asset managers — Vanguard, BlackRock, and State Street — are top shareholders in all six major media corporations">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#8B1A1A" />
            </marker>
          </defs>
          {/* Title */}
          <text x="350" y="30" textAnchor="middle" className="font-sans" style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--color-ink)', letterSpacing: '0.1em' }}>MEDIA OWNERSHIP STRUCTURE</text>
          <text x="350" y="48" textAnchor="middle" className="font-sans" style={{ fontSize: '10px', fill: 'var(--color-ink-faint)', letterSpacing: '0.05em' }}>THREE ASSET MANAGERS → SIX CORPORATIONS → 90% OF AMERICAN MEDIA</text>

          {/* Top tier: Asset Managers */}
          {[
            { x: 150, label: 'VANGUARD', sub: '$9.3T AUM' },
            { x: 350, label: 'BLACKROCK', sub: '$12.5T AUM' },
            { x: 550, label: 'STATE STREET', sub: '$4.1T AUM' },
          ].map((am) => (
            <g key={am.label}>
              <rect x={am.x - 70} y={70} width={140} height={50} rx={3} fill="#1A1A1A" />
              <text x={am.x} y={92} textAnchor="middle" style={{ fontSize: '10px', fontWeight: 700, fill: '#FFFFFF', letterSpacing: '0.08em' }}>{am.label}</text>
              <text x={am.x} y={108} textAnchor="middle" style={{ fontSize: '9px', fill: '#A52A2A' }}>{am.sub}</text>
            </g>
          ))}
          {/* Connection lines from asset managers to media corps */}
          {[150, 350, 550].map((fromX) =>
            [70, 187, 304, 420, 537, 654].map((toX) => (
              <line key={`${fromX}-${toX}`} x1={fromX} y1={120} x2={toX} y2={165} stroke="#8B1A1A" strokeWidth={0.8} opacity={0.3} />
            ))
          )}

          {/* Middle tier: Media Corporations */}
          {[
            { x: 70, label: 'COMCAST', sub: 'NBC, MSNBC, Universal' },
            { x: 187, label: 'DISNEY', sub: 'ABC, ESPN, Marvel' },
            { x: 304, label: 'WARNER', sub: 'CNN, HBO, TNT' },
            { x: 420, label: 'PARAMOUNT', sub: 'CBS, MTV, Nick' },
            { x: 537, label: 'SONY', sub: 'Sony Pictures' },
            { x: 654, label: 'AMAZON', sub: 'MGM, Prime, WaPo' },
          ].map((mc) => (
            <g key={mc.label}>
              <rect x={mc.x - 50} y={165} width={100} height={45} rx={3} fill="#FAF8F5" stroke="#E5E7EB" strokeWidth={1} />
              <text x={mc.x} y={184} textAnchor="middle" style={{ fontSize: '8px', fontWeight: 700, fill: 'var(--color-ink)', letterSpacing: '0.06em' }}>{mc.label}</text>
              <text x={mc.x} y={199} textAnchor="middle" style={{ fontSize: '7px', fill: 'var(--color-ink-muted)' }}>{mc.sub}</text>
            </g>
          ))}
          {/* Arrow to output */}
          <line x1="350" y1="210" x2="350" y2="250" stroke="#8B1A1A" strokeWidth={1.5} markerEnd="url(#arrow)" />

          {/* Bottom: Output */}
          <rect x={200} y={255} width={300} height={40} rx={3} fill="#8B1A1A" />
          <text x={350} y={280} textAnchor="middle" style={{ fontSize: '10px', fontWeight: 700, fill: '#FFFFFF', letterSpacing: '0.1em' }}>90% OF AMERICAN MEDIA OUTPUT</text>

          {/* Footer note */}
          <text x="350" y="320" textAnchor="middle" style={{ fontSize: '8px', fill: 'var(--color-ink-faint)', fontStyle: 'italic' }}>Source: SEC filings, Harvard Future of Media Project, 2021–2025</text>
        </svg>
      </div>
      <figcaption className="mt-3 px-1">
        <p className="font-sans text-sm text-ink-muted leading-relaxed">Media ownership consolidation: Three institutional asset managers hold significant stakes in all six corporations that control approximately 90% of American media.</p>
        <p className="font-sans text-xs text-ink-faint mt-1">Diagram based on SEC filings and the Harvard Future of Media Project research</p>
      </figcaption>
    </figure>
  )
}

export function FederalReserveStructureDiagram() {
  return (
    <figure className="my-10 max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-sm border border-border bg-surface p-6">
        <svg viewBox="0 0 650 440" className="w-full h-auto" role="img" aria-label="Diagram showing the structure of the Federal Reserve System — a hybrid public-private institution">
          {/* Title */}
          <text x="325" y="28" textAnchor="middle" className="font-sans" style={{ fontSize: '13px', fontWeight: 700, fill: 'var(--color-ink)', letterSpacing: '0.1em' }}>FEDERAL RESERVE SYSTEM STRUCTURE</text>
          <text x="325" y="46" textAnchor="middle" className="font-sans" style={{ fontSize: '9px', fill: 'var(--color-ink-faint)', letterSpacing: '0.05em' }}>A HYBRID PUBLIC-PRIVATE INSTITUTION — ESTABLISHED 1913</text>

          {/* Board of Governors - "Public" */}
          <rect x={175} y={65} width={300} height={55} rx={4} fill="#166534" opacity={0.1} stroke="#166534" strokeWidth={1.5} />
          <text x={325} y={85} textAnchor="middle" style={{ fontSize: '9px', fontWeight: 700, fill: '#166534', letterSpacing: '0.08em' }}>BOARD OF GOVERNORS</text>
          <text x={325} y={100} textAnchor="middle" style={{ fontSize: '8px', fill: '#166534' }}>7 members appointed by President, confirmed by Senate</text>
          <text x={325} y={112} textAnchor="middle" style={{ fontSize: '7px', fill: 'var(--color-ink-muted)', fontStyle: 'italic' }}>Government entity — but independent of executive control</text>
          {/* Arrow down */}
          <line x1="325" y1="120" x2="325" y2="150" stroke="var(--color-ink)" strokeWidth={1} strokeDasharray="4,3" />

          {/* 12 Regional Banks - "Private" */}
          <rect x={75} y={155} width={500} height={55} rx={4} fill="#92400E" opacity={0.08} stroke="#92400E" strokeWidth={1.5} />
          <text x={325} y={175} textAnchor="middle" style={{ fontSize: '9px', fontWeight: 700, fill: '#92400E', letterSpacing: '0.08em' }}>12 REGIONAL FEDERAL RESERVE BANKS</text>
          <text x={325} y={190} textAnchor="middle" style={{ fontSize: '8px', fill: '#92400E' }}>Privately owned by member commercial banks</text>
          <text x={325} y={202} textAnchor="middle" style={{ fontSize: '7px', fill: 'var(--color-ink-muted)', fontStyle: 'italic' }}>Not government agencies — issue stock to member banks, pay dividends</text>

          {/* Arrow down */}
          <line x1="325" y1="210" x2="325" y2="240" stroke="var(--color-ink)" strokeWidth={1} strokeDasharray="4,3" />

          {/* Member Banks */}
          <rect x={125} y={245} width={400} height={45} rx={4} fill="var(--color-ink)" opacity={0.05} stroke="var(--color-ink)" strokeWidth={1} />
          <text x={325} y={265} textAnchor="middle" style={{ fontSize: '9px', fontWeight: 700, fill: 'var(--color-ink)', letterSpacing: '0.08em' }}>MEMBER COMMERCIAL BANKS</text>
          <text x={325} y={280} textAnchor="middle" style={{ fontSize: '8px', fill: 'var(--color-ink-muted)' }}>JPMorgan Chase · Citibank · Goldman Sachs · Bank of America · Wells Fargo</text>
          {/* Key powers sidebar */}
          <rect x={30} y={310} width={280} height={110} rx={4} fill="#FAF8F5" stroke="#E5E7EB" strokeWidth={1} />
          <text x={170} y={330} textAnchor="middle" style={{ fontSize: '8px', fontWeight: 700, fill: '#8B1A1A', letterSpacing: '0.08em' }}>KEY POWERS</text>
          <text x={45} y={348} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Sets interest rates (Federal Funds Rate)</text>
          <text x={45} y={363} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Creates money through open market operations</text>
          <text x={45} y={378} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Regulates member banks</text>
          <text x={45} y={393} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Lender of last resort</text>
          <text x={45} y={408} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Never been independently audited</text>

          {/* Key fact sidebar */}
          <rect x={340} y={310} width={280} height={110} rx={4} fill="#991B1B" opacity={0.05} stroke="#991B1B" strokeWidth={1} />
          <text x={480} y={330} textAnchor="middle" style={{ fontSize: '8px', fontWeight: 700, fill: '#991B1B', letterSpacing: '0.08em' }}>KEY FACTS</text>
          <text x={355} y={348} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Created by the Federal Reserve Act of 1913</text>
          <text x={355} y={363} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Not a government agency, not fully private</text>
          <text x={355} y={378} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Dollar has lost 97% of value since 1913</text>
          <text x={355} y={393} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Profits returned to U.S. Treasury (after expenses)</text>
          <text x={355} y={408} style={{ fontSize: '8px', fill: 'var(--color-ink-light)' }}>• Chairman testifies to Congress, not controlled by it</text>

          {/* Source */}
          <text x="325" y="438" textAnchor="middle" style={{ fontSize: '7px', fill: 'var(--color-ink-faint)', fontStyle: 'italic' }}>Source: Federal Reserve Act (12 USC §221), Federal Reserve Board publications, Congressional Research Service</text>
        </svg>
      </div>
      <figcaption className="mt-3 px-1">
        <p className="font-sans text-sm text-ink-muted leading-relaxed">The Federal Reserve is neither fully federal nor a reserve. It is a hybrid institution where a government-appointed board oversees twelve privately owned regional banks.</p>
        <p className="font-sans text-xs text-ink-faint mt-1">Structure based on the Federal Reserve Act of 1913 and Federal Reserve Board publications</p>
      </figcaption>
    </figure>
  )
}

export function AssetManagerDiagram() {
  const sectors = [
    { label: 'TECH', companies: 'Apple · Microsoft · Google · Meta · Amazon', y: 80 },
    { label: 'FINANCE', companies: 'JPMorgan · Goldman · Citi · BofA', y: 140 },
    { label: 'PHARMA', companies: 'Pfizer · J&J · Merck · AbbVie', y: 200 },
    { label: 'MEDIA', companies: 'Comcast · Disney · Warner · Paramount', y: 260 },
    { label: 'DEFENSE', companies: 'Lockheed · Raytheon · Boeing · Northrop', y: 320 },
    { label: 'ENERGY', companies: 'ExxonMobil · Chevron · ConocoPhillips', y: 380 },
  ]
  return (
    <figure className="my-10 max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-sm border border-border bg-surface p-6">
        <svg viewBox="0 0 650 430" className="w-full h-auto" role="img" aria-label="Diagram showing how BlackRock, Vanguard, and State Street are top shareholders across every major sector of the American economy">
          <text x="325" y="25" textAnchor="middle" style={{ fontSize: '13px', fontWeight: 700, fill: 'var(--color-ink)', letterSpacing: '0.1em' }}>CROSS-SECTOR INSTITUTIONAL OWNERSHIP</text>
          <text x="325" y="43" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--color-ink-faint)', letterSpacing: '0.05em' }}>THE SAME THREE FIRMS ARE TOP SHAREHOLDERS IN EVERY MAJOR INDUSTRY</text>

          {/* Central column: The three firms */}
          <rect x={235} y={58} width={180} height={20} rx={2} fill="#1A1A1A" />
          <text x={325} y={72} textAnchor="middle" style={{ fontSize: '8px', fontWeight: 700, fill: '#A52A2A', letterSpacing: '0.06em' }}>BLACKROCK · VANGUARD · STATE STREET</text>

          {/* Sectors */}
          {sectors.map((s) => (
            <g key={s.label}>
              <line x1={325} y1={s.y - 12} x2={325} y2={s.y} stroke="#8B1A1A" strokeWidth={1} opacity={0.4} />
              <rect x={100} y={s.y} width={450} height={38} rx={3} fill="#FAF8F5" stroke="#E5E7EB" strokeWidth={1} />
              <rect x={100} y={s.y} width={90} height={38} rx={3} fill="#8B1A1A" opacity={0.08} />
              <text x={145} y={s.y + 23} textAnchor="middle" style={{ fontSize: '8px', fontWeight: 700, fill: '#8B1A1A', letterSpacing: '0.06em' }}>{s.label}</text>
              <text x={340} y={s.y + 23} textAnchor="middle" style={{ fontSize: '8px', fill: 'var(--color-ink-muted)' }}>{s.companies}</text>
            </g>
          ))}
          <text x="325" y="425" textAnchor="middle" style={{ fontSize: '7px', fill: 'var(--color-ink-faint)', fontStyle: 'italic' }}>Source: SEC 13F filings, Bloomberg, 2024–2025</text>
        </svg>
      </div>
      <figcaption className="mt-3 px-1">
        <p className="font-sans text-sm text-ink-muted leading-relaxed">BlackRock, Vanguard, and State Street — managing $25.9 trillion combined — appear as top shareholders in virtually every publicly traded corporation across every major sector of the American economy.</p>
      </figcaption>
    </figure>
  )
}
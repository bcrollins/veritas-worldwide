import { useState } from 'react'

// RollinsX Technologies "Customer chooses what to pay" payment link
// Stripe Dashboard → Payment Links → Veritas Worldwide Press donation
const DONATE_URL = 'https://buy.stripe.com/7sY00jd9F5Qkb857qfasg05'

const DONATION_TIERS = [
  { amount: 5, label: '$5' },
  { amount: 10, label: '$10' },
  { amount: 25, label: '$25' },
  { amount: 50, label: '$50' },
  { amount: 100, label: '$100' },
]

const DEFAULT_AMOUNT = 10

export default function DonationBanner() {
  const [selected, setSelected] = useState<number | 'custom'>(DEFAULT_AMOUNT)
  const [customAmount, setCustomAmount] = useState('')

  const handleCustomInput = (value: string) => {
    // Allow only digits and a single decimal point
    const cleaned = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
    setCustomAmount(cleaned)
  }

  const getDonateLabel = () => {
    if (selected === 'custom') {
      const amt = parseFloat(customAmount)
      if (!amt || amt <= 0) return 'Donate'
      return `Donate $${amt % 1 === 0 ? amt : amt.toFixed(2)}`
    }
    const tier = DONATION_TIERS.find(t => t.amount === selected)
    return `Donate ${tier?.label || '$10'}`
  }

  return (
    <section className="bg-ink text-white py-12 my-16 no-print">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
          From the Publisher
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          This Work Exists Because of Readers Like You
        </h2>
        <p className="font-body text-base text-white/60 leading-relaxed max-w-xl mx-auto mb-3">
          The Record has no advertisers, no sponsors, and no paywalls. Every chapter, every primary source,
          every document is free — and always will be.
        </p>
        <p className="font-body text-base text-white/60 leading-relaxed max-w-xl mx-auto mb-8">
          But independent research takes hundreds of hours. Verifying sources, obtaining documents, and maintaining
          this publication is a labor of commitment. If even one chapter made you think differently about the
          historical record, please consider a small contribution. It directly funds the next volume.
        </p>

        {/* Amount Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {DONATION_TIERS.map(tier => (
            <button
              key={tier.amount}
              onClick={() => setSelected(tier.amount)}
              className={`px-5 py-2.5 rounded-sm font-sans text-sm font-semibold tracking-[0.05em] transition-colors ${
                selected === tier.amount
                  ? 'bg-crimson text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tier.label}
            </button>
          ))}
          <button
            onClick={() => setSelected('custom')}
            className={`px-5 py-2.5 rounded-sm font-sans text-sm font-semibold tracking-[0.05em] transition-colors ${
              selected === 'custom'
                ? 'bg-crimson text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            Custom
          </button>
        </div>

        {/* Custom Amount Input */}
        {selected === 'custom' && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="font-sans text-lg text-white/80">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={customAmount}
              onChange={e => handleCustomInput(e.target.value)}
              placeholder="Enter amount"
              className="w-36 px-4 py-2.5 bg-white/10 border border-white/20 rounded-sm font-sans text-sm text-white placeholder-white/40 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson text-center"
              autoFocus
            />
          </div>
        )}

        {/* Donate Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {getDonateLabel()}
          </a>
        </div>
        <p className="font-sans text-[0.65rem] text-white/30 mt-6">
          Donations are processed securely through Stripe. No account required.
        </p>
      </div>
    </section>
  )
}

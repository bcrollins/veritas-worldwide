import { useState } from 'react'

const DONATION_TIERS = [
  { amount: 5, label: '$5', url: 'https://buy.stripe.com/14A7sK3F03lbbsHaJX2go02' },
  { amount: 10, label: '$10', url: 'https://buy.stripe.com/6oU9AS6Rc9JzfIX8BP2go00' },
  { amount: 25, label: '$25', url: 'https://buy.stripe.com/8x29AS4J408Z40f5pD2go03' },
  { amount: 50, label: '$50', url: 'https://buy.stripe.com/28EdR82AWg7XaoDdW92go04' },
  { amount: 100, label: '$100', url: 'https://buy.stripe.com/14AfZg2AW2h71S73hv2go05' },
]

// "Customer chooses what to pay" payment link — create in Stripe Dashboard:
// Payment Links → New → "Customers choose what to pay" → set suggested $10, min $1
const CUSTOM_AMOUNT_URL = 'https://buy.stripe.com/6oU9AS6Rc9JzfIX8BP2go00'

const DEFAULT_AMOUNT = 10

export default function DonationBanner() {
  const [selected, setSelected] = useState<number | 'custom'>(DEFAULT_AMOUNT)
  const [customAmount, setCustomAmount] = useState('')

  const handleCustomInput = (value: string) => {
    // Allow only digits and a single decimal point
    const cleaned = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
    setCustomAmount(cleaned)
  }

  const getDonateUrl = () => {
    if (selected === 'custom') {
      // Find closest tier or use custom amount link
      const amt = parseFloat(customAmount)
      if (!amt || amt <= 0) return CUSTOM_AMOUNT_URL
      const match = DONATION_TIERS.find(t => t.amount === amt)
      if (match) return match.url
      return CUSTOM_AMOUNT_URL
    }
    const tier = DONATION_TIERS.find(t => t.amount === selected)
    return tier?.url || DONATION_TIERS[1].url
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
          Support Independent Research
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          Help Us Keep The Record Free
        </h2>
        <p className="font-body text-base text-white/60 leading-relaxed max-w-xl mx-auto mb-8">
          We believe this information belongs to everyone. Every source, every document, every chapter
          of The Record is free and always will be. But research takes time, verification takes resources,
          and publishing takes commitment. If this work has value to you, any contribution — however small —
          helps our team continue mapping and publishing the documentary record.
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
            href={getDonateUrl()}
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

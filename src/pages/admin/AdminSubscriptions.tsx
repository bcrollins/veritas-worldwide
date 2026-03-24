import { useState, useEffect } from 'react'

interface SubscriptionInfo {
  email: string
  plan: string
  active: boolean
  startDate: string
}

const STRIPE_PRODUCTS = [
  { id: 'prod_UCp3RXB5YpqcV2', name: 'Correspondent', price: '$5/mo' },
  { id: 'prod_UCp3hB3kHjRSCY', name: 'Investigator', price: '$15/mo' },
  { id: 'prod_UCp3ZjRcMMKWMz', name: 'Founding Circle', price: '$50/mo' },
  { id: 'prod_UCp4JGDyh3hvUK', name: 'Support (Donation)', price: 'Variable' },
]

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionInfo[]>([])

  useEffect(() => {
    // Aggregate subscription data from all users
    try {
      const users = JSON.parse(localStorage.getItem('veritas_users') || '[]')
      const subs: SubscriptionInfo[] = []
      users.forEach((u: any) => {
        if (u.subscription) {
          subs.push({
            email: u.email,
            plan: u.subscription.plan || 'Unknown',
            active: u.subscription.active || false,
            startDate: u.subscription.startDate || u.createdAt,
          })
        }
      })
      // Also check the main subscription key
      const mainSub = localStorage.getItem('veritas_subscription')
      if (mainSub) {
        const parsed = JSON.parse(mainSub)
        if (parsed && !subs.find(s => s.email === parsed.email)) {
          subs.push({
            email: parsed.email || 'Unknown',
            plan: parsed.plan || 'Subscriber',
            active: parsed.active || false,
            startDate: parsed.startDate || new Date().toISOString(),
          })
        }
      }
      setSubscriptions(subs)
    } catch { /* ignore */ }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-white">Subscriptions</h1>
        <p className="font-sans text-xs text-white/30 mt-1">Manage membership tiers and subscriber data</p>
      </div>

      {/* Stripe Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STRIPE_PRODUCTS.map(product => (
          <div key={product.id} className="bg-white/5 border border-white/5 rounded-lg p-4">
            <p className="font-sans text-xs font-bold tracking-widest uppercase text-crimson">{product.name}</p>
            <p className="font-serif text-xl font-bold text-white mt-1">{product.price}</p>
            <p className="font-mono text-[9px] text-white/20 mt-2 truncate">{product.id}</p>
          </div>
        ))}
      </div>

      {/* Subscribers Table */}
      <div className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Active Subscribers</h3>
          <a
            href="https://dashboard.stripe.com/subscriptions"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-wide text-crimson hover:text-crimson-light"
          >
            Full Data in Stripe →
          </a>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Email</th>
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Plan</th>
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Status</th>
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subscriptions.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-12 text-center font-sans text-xs text-white/20">
                No subscriptions recorded locally. Check Stripe dashboard for payment data.
              </td></tr>
            ) : subscriptions.map((sub, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-5 py-3 font-mono text-xs text-white/60">{sub.email}</td>
                <td className="px-5 py-3 font-sans text-xs text-white/60">{sub.plan}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded font-sans text-[10px] font-bold tracking-wide ${
                    sub.active ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'
                  }`}>
                    {sub.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-3 font-sans text-xs text-white/30">{new Date(sub.startDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-crimson/5 border border-crimson/10 rounded-lg p-5">
        <p className="font-sans text-xs text-crimson/60 leading-relaxed">
          <strong className="text-crimson">Note:</strong> This is a localStorage-backed MVP. For full subscription management with payment history, refunds, and invoice generation, use the{' '}
          <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="text-crimson underline hover:no-underline">Stripe Dashboard</a>.
          All payment processing flows through Stripe Payment Links — no sensitive financial data is stored locally.
        </p>
      </div>
    </div>
  )
}

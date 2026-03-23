export default function DonationBanner() {
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://buy.stripe.com/test_placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Make a Donation
          </a>
        </div>
        <p className="font-sans text-[0.65rem] text-white/30 mt-6">
          Donations are processed securely through Stripe. No account required.
        </p>
      </div>
    </section>
  )
}

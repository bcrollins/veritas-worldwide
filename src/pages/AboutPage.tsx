import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'
import { trackSupportClick } from '../lib/ga4'

export default function AboutPage() {
  useEffect(() => {
    setMetaTags({
      title: 'About | Veritas Worldwide Press',
      description: 'About Veritas Worldwide Press — our mission, editorial standards, funding model, and the author behind The Record.',
      url: `${SITE_URL}/about`,
    })
    return () => { clearMetaTags() }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-12 border-b border-border pb-10">
        <p className="chapter-label mb-4">About</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Veritas Worldwide Press
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          Primary Sources. Public Record. Your Conclusions.
        </p>
      </header>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Mission</h2>
        <p className="article-body mb-4">
          Veritas Worldwide Press exists for one purpose: to make primary source documents accessible to the public in a format that is readable, rigorously sourced, and free of editorial bias.
        </p>
        <p className="article-body mb-4">
          The Record is a 31-chapter documentary history compiled from court filings, congressional records, declassified intelligence documents, academic studies, SEC filings, executive orders, and verified investigative journalism. Every factual claim is sourced. Every source is publicly accessible. Every evidence classification is transparent.
        </p>
        <p className="article-body">
          We do not tell the reader what to think. We present the documented record and let the evidence speak for itself. Where the evidence is strong, we say so. Where it is incomplete or contested, we say that too.
        </p>
      </section>

      {/* Author */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Author</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1">
            <p className="font-display text-xl font-bold text-ink mb-2">Brandon Rollins</p>
            <p className="font-sans text-xs font-semibold tracking-[0.08em] uppercase text-crimson mb-3">
              Founder &amp; Editor &middot; Veritas Worldwide Press
            </p>
            <p className="article-body mb-4">
              Brandon Rollins is a First Officer at Frontier Airlines, flying the Airbus A320/A321 fleet. He holds an Airline Transport Pilot certificate and graduated from Embry-Riddle Aeronautical University with a degree in Aeronautical Science.
            </p>
            <p className="article-body mb-4">
              The Record began as a personal research project — an attempt to organize and verify the primary source documents that underlie some of the most consequential events in modern history. After years of compilation and cross-referencing, the project evolved into a full publication.
            </p>
            <p className="article-body">
              Brandon also builds automation workflows and full-stack applications. The Veritas Worldwide platform is built with React, TypeScript, and Tailwind CSS, and is open source.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Editorial Standards</h2>
        <p className="article-body mb-6">
          Every chapter of The Record adheres to the same editorial framework:
        </p>
        <div className="space-y-4 mb-6">
          <div className="p-4 border border-verified-border bg-verified-bg rounded-sm">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-verified mb-1">✓ Verified</p>
            <p className="font-body text-sm text-ink-light leading-relaxed">Claims supported by primary source documents — court filings, congressional records, executive orders, peer-reviewed studies. Source cited and publicly accessible.</p>
          </div>
          <div className="p-4 border border-circumstantial-border bg-circumstantial-bg rounded-sm">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-circumstantial mb-1">◐ Circumstantial</p>
            <p className="font-body text-sm text-ink-light leading-relaxed">Individual facts are documented and verifiable. The connection drawn between them is an interpretation. Alternative explanations noted.</p>
          </div>
          <div className="p-4 border border-disputed-border bg-disputed-bg rounded-sm">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-disputed mb-1">⚠ Disputed</p>
            <p className="font-body text-sm text-ink-light leading-relaxed">Claimed by a named source or in sworn testimony but not independently confirmed. Included as part of the historical record. Clearly labeled.</p>
          </div>
        </div>
        <p className="article-body">
          Counter-arguments are always presented fairly. The reader is encouraged to verify any claim independently. Every source cited in this publication is publicly accessible.
        </p>
      </section>

      {/* Funding */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Funding &amp; Independence</h2>
        <p className="article-body mb-4">
          Veritas Worldwide Press is independently funded. We accept no advertising, no sponsored content, and no institutional grants. The publication is funded entirely through voluntary reader donations.
        </p>
        <p className="article-body mb-4">
          All content is free and open access. Creating an account is free. We believe the public record belongs to everyone.
        </p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          onClick={() => trackSupportClick('about')}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Support This Work
        </a>
        <p className="font-sans text-[0.6rem] text-ink-faint mt-3">
          Processed securely via Stripe &middot; No account required
        </p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Contact</h2>
        <p className="article-body mb-4">
          For corrections, source verification requests, or press inquiries:
        </p>
        <a href="mailto:contact@veritasworldwide.com" className="font-sans text-sm text-crimson hover:text-crimson-dark transition-colors">
          contact@veritasworldwide.com
        </a>
      </section>

      {/* Navigation */}
      <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
          Read The Record
        </Link>
        <Link to="/methodology" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Our Methodology
        </Link>
        <Link to="/sources" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Source Library
        </Link>
      </div>
    </div>
  )
}

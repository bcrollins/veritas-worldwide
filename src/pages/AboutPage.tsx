import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'
import { trackSupportClick } from '../lib/ga4'

export default function AboutPage() {
  useEffect(() => {
    setMetaTags({
      title: 'About Us | Veritas Worldwide Press',
      description: 'Five independent journalists. No corporate backing. No party affiliation. Meet the team behind The Record — and why every subscription keeps this work alive.',
      url: `${SITE_URL}/about`,
    })
    return () => { clearMetaTags() }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="chapter-label mb-4">About Us</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          We Are Not a Media Company.
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          We are five people who read the documents everyone else skipped — and decided someone should write them down.
        </p>
      </header>

      {/* ── Origin Story ──────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">How This Started</h2>
        <p className="article-body mb-4">
          Veritas Worldwide Press did not begin in a newsroom. It began in a stack of FOIA documents that did not match the story the evening news was telling. It began in a courtroom archive that contradicted a textbook. It began in the gap between what the public record says and what the public was told.
        </p>
        <p className="article-body mb-4">
          One of us started pulling threads. Then another. Then three more. We found each other the way most people find the truth — by accident, by stubbornness, and by refusing to stop reading when the documents got uncomfortable.
        </p>
        <p className="article-body mb-4">
          We are not affiliated with any political party, media conglomerate, think tank, or government. We are not funded by foundations, corporations, or PACs. We are five independent writers, researchers, and analysts spread across three continents, connected by one conviction: the public has the right to read its own history — unfiltered, unsanitized, and sourced to the original record.
        </p>
        <p className="article-body">
          This is not a side project. This is our life's work. And every word of it is free.
        </p>
      </section>

      {/* ── The Team ──────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">The Editorial Staff</h2>
        <p className="font-body text-sm text-ink-muted italic mb-8">We publish under initials and operational identifiers. Not because we have something to hide — but because the moment this becomes about us, it stops being about the evidence.</p>

        <div className="space-y-10">

          {/* Writer 1 — The Founder / Lead Editor */}
          <div className="border-l-2 border-crimson pl-6">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-crimson mb-1">Lead Editor &amp; Founder — B.R.</p>
            <p className="article-body mb-3">
              A commercial airline pilot by profession, trained in systems thinking and risk analysis at one of the country's top aeronautical universities. Spent years in a cockpit watching the world from 38,000 feet — and spent every layover reading the documents no one on cable news ever mentioned.
            </p>
            <p className="article-body mb-3">
              The Record started as a personal research project — a binder of printouts, highlighted PDFs, and handwritten timelines taped to a hotel wall. It was never supposed to be a publication. But when the binder became a bookshelf, and the bookshelf became a library, and the library became something that needed to exist in the world, B.R. built the platform from scratch and started publishing.
            </p>
            <p className="article-body">
              B.R. compiled and edited every chapter of The Record, designed the evidence classification system, and built the technical infrastructure that delivers it to you. This is what happens when someone who is trained to never skip a checklist decides to read the fine print on seventy years of American history.
            </p>
          </div>

          {/* Writer 2 — The Archivist */}
          <div className="border-l-2 border-ink/20 pl-6">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-1">Senior Researcher — M.K.</p>
            <p className="article-body mb-3">
              A former government archivist from a European capital who spent a decade cataloging declassified intelligence files — the kind that arrived on her desk with half the paragraphs blacked out and the other half rewriting the version of events she had been taught in school.
            </p>
            <p className="article-body mb-3">
              M.K. left her post after realizing that the documents she was filing would never be read by the people who needed to see them most. She now cross-references primary sources for The Record from a small apartment in a city she prefers not to name, working through government archives, parliamentary records, and international court filings in four languages.
            </p>
            <p className="article-body">
              If a source in The Record is cited as "verified," M.K. is the reason you can trust that classification. She has read every document we cite. In many cases, she found them first.
            </p>
          </div>

          {/* Writer 3 — The Financial Analyst */}
          <div className="border-l-2 border-ink/20 pl-6">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-1">Financial &amp; Economic Analysis — D.W.</p>
            <p className="article-body mb-3">
              A former quantitative analyst who left a career on Wall Street after the 2008 financial crisis — not because the system broke, but because he finally understood how it was built to break.
            </p>
            <p className="article-body mb-3">
              D.W. spent fifteen years modeling financial instruments for institutions that profited from the very structures The Record now documents. He traces the money — from the Federal Reserve chapters to the foreign aid calculations, from central banking origins to the petrodollar architecture. When we say "follow the money," D.W. has already followed it, mapped it, and cited the SEC filing.
            </p>
            <p className="article-body">
              He works from somewhere in the American South. He does not miss Wall Street.
            </p>
          </div>

          {/* Writer 4 — The OSINT Specialist */}
          <div className="border-l-2 border-ink/20 pl-6">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-1">Open Source Intelligence &amp; Digital Forensics — R.A.</p>
            <p className="article-body mb-3">
              A cybersecurity professional and open-source intelligence specialist based in the Asia-Pacific region who builds the data visualizations, interactive investigations, and digital forensics that power pages like the Israel Dossier and The Deep State network map.
            </p>
            <p className="article-body mb-3">
              R.A. came to this work through the Snowden disclosures. What started as professional curiosity about surveillance architecture became a years-long investigation into the institutions that built it. R.A. does not accept that "national security" is an acceptable reason to hide a public record from the public.
            </p>
            <p className="article-body">
              Every interactive element, every data pipeline, every connection mapped on this site exists because R.A. believes that if you can see the pattern clearly enough, you do not need anyone to explain it to you.
            </p>
          </div>

          {/* Writer 5 — The Historian */}
          <div className="border-l-2 border-ink/20 pl-6">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-1">Historical Research &amp; Narrative — S.L.</p>
            <p className="article-body mb-3">
              A historian with a doctorate from a research university in Latin America, specializing in twentieth-century intelligence operations, covert action, and the intersection of state power and private capital.
            </p>
            <p className="article-body mb-3">
              S.L. spent years in academic publishing, writing papers that were read by twelve people and cited by three. She joined this project because she wanted her research to reach the people it was actually about — the public, the taxpayers, the citizens whose history was being written without their knowledge or consent.
            </p>
            <p className="article-body">
              S.L. writes the narrative that connects the evidence. She is the reason The Record reads like a story and not a database. She believes that the most dangerous thing you can do to a powerful institution is to describe it accurately.
            </p>
          </div>

        </div>
      </section>

      {/* ── Why Subscriptions Matter ──────────────────────────── */}
      <section className="mb-16 bg-ink text-white rounded-sm p-8 md:p-10">
        <h2 className="font-display text-2xl font-bold text-white mb-4">Why Your Subscription Is Our Lifeline</h2>
        <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
          We need to be honest with you. We do not have the resources of the New York Times. We do not have a billionaire owner. We do not have a corporate parent company subsidizing our server costs while we publish investigations that make powerful people uncomfortable.
        </p>
        <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
          What we have is this: five people, three continents, a shared conviction, and whatever our readers decide this work is worth.
        </p>
        <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
          Every dollar from every subscription and every donation goes directly to keeping this publication alive. Server infrastructure. Legal review of sensitive chapters before publication. FOIA request fees. The rare physical archive visit that a digital scan cannot replace. The time it takes to read nine hundred pages of declassified testimony so we can tell you what matters in nine paragraphs.
        </p>
        <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
          The content will always be free. We made that promise and we will keep it. But free to read does not mean free to produce. The investigations you see on this site — the Israel Dossier, The Deep State, the twenty-eight chapters of The Record — each one represents thousands of hours of research, writing, fact-checking, and source verification.
        </p>
        <p className="font-body text-sm text-white/70 leading-relaxed mb-6">
          If this work matters to you — if you believe that someone should be reading these documents and writing them down in plain language for the rest of us — then a subscription is how you make sure we can keep doing it. We are grateful for every single one.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/membership"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-crimson text-white font-sans text-xs font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          >
            Become a Member
          </Link>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white/80 font-sans text-xs font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-white/10 transition-colors"
            onClick={() => trackSupportClick('about')}
          >
            Make a One-Time Donation
          </a>
        </div>
        <p className="font-sans text-[0.55rem] text-white/30 mt-4">
          All payments processed securely through Stripe. Cancel anytime. All content remains free regardless.
        </p>
      </section>

      {/* ── Editorial Standards (condensed) ────────────────────── */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Editorial Standards</h2>
        <p className="article-body mb-6">
          Every chapter of The Record is classified under a three-tier evidence system. We do not editorialize. We do not speculate. Where the evidence is conclusive, we say so. Where it is incomplete, contested, or denied, we say that too. The reader always knows exactly what they are looking at.
        </p>
        <div className="space-y-4 mb-6">
          <div className="p-4 border border-verified-border bg-verified-bg rounded-sm">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-verified mb-1">
              <svg className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>Verified
            </p>
            <p className="font-body text-sm text-ink-light leading-relaxed">Supported by primary source documents — court filings, congressional records, executive orders, peer-reviewed studies. Source cited and publicly accessible.</p>
          </div>
          <div className="p-4 border border-circumstantial-border bg-circumstantial-bg rounded-sm">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-circumstantial mb-1">◐ Circumstantial</p>
            <p className="font-body text-sm text-ink-light leading-relaxed">Individual facts are documented and verifiable. The connection drawn between them is an interpretation. Alternative explanations are always noted.</p>
          </div>
          <div className="p-4 border border-disputed-border bg-disputed-bg rounded-sm">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-disputed mb-1">
              <svg className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>Disputed
            </p>
            <p className="font-body text-sm text-ink-light leading-relaxed">Claimed by a named source or in sworn testimony but not independently confirmed. Included as part of the historical record. Clearly labeled.</p>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Contact</h2>
        <p className="article-body mb-2">
          For corrections, source verification requests, tips, or press inquiries:
        </p>
        <a href="mailto:rights@veritasworldwide.com" className="font-sans text-sm text-crimson hover:text-crimson-dark transition-colors font-semibold">
          rights@veritasworldwide.com
        </a>
        <p className="font-body text-xs text-ink-faint mt-3 leading-relaxed">
          We read every message. If you have a document we should see, we want to see it. If we got something wrong, we want to know. The record is only as good as the evidence behind it.
        </p>
      </section>

      {/* ── Bottom Nav ────────────────────────────────────────── */}
      <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
          Read The Record
        </Link>
        <Link to="/membership" className="font-sans text-sm font-semibold px-6 py-3 border border-crimson text-crimson rounded-sm hover:bg-crimson hover:text-white transition-colors text-center">
          Become a Member
        </Link>
        <Link to="/methodology" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Our Methodology
        </Link>
      </div>
    </div>
  )
}

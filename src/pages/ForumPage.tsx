/**
 * ForumPage — Community discussion forum (Reddit-style).
 * Wraps CommunityForum with page-level SEO and layout.
 */
import { useEffect } from 'react'
import CommunityForum from '../components/CommunityForum'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'

export default function ForumPage() {
  useEffect(() => {
    setMetaTags({
      title: `Community Forum | ${SITE_NAME}`,
      description: 'Discuss the evidence, debate the findings, and connect with researchers investigating power, money, and institutional corruption.',
      url: `${SITE_URL}/forum`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'DiscussionForumPosting',
      'name': `Community Forum — ${SITE_NAME}`,
      'url': `${SITE_URL}/forum`,
      'description': 'Community discussion forum for Veritas Worldwide Press readers and researchers.',
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Forum Header */}
      <div className="py-10 border-b border-border text-center">
        <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-crimson mb-2">
          Community
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink mb-3">
          Forum
        </h1>
        <p className="font-body text-base md:text-lg italic text-ink-muted max-w-2xl mx-auto">
          Discuss the evidence. Debate the findings. Connect with fellow researchers.
        </p>
      </div>

      {/* Forum Topics */}
      <div className="py-8">
        <div className="grid gap-6">
          {[
            { id: 'general', title: 'General Discussion', desc: 'Open discussion about The Record and current events' },
            { id: 'israel-dossier', title: 'Israel Dossier', desc: 'Discussion of the Israel investigation, aid figures, and policy implications' },
            { id: 'deep-state', title: 'Deep State / Epstein Network', desc: 'Flight logs, court documents, network connections' },
            { id: 'evidence', title: 'Evidence Review', desc: 'Submit and discuss primary sources, challenge evidence tiers' },
            { id: 'methodology', title: 'Methodology & Standards', desc: 'Debate editorial standards and evidence classification' },
            { id: 'media', title: 'Media & Outreach', desc: 'Share Veritas content, coordinate social media efforts' },
          ].map(topic => (
            <ForumTopic key={topic.id} id={topic.id} title={topic.title} desc={topic.desc} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ForumTopic({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <section className="border border-border rounded-sm overflow-hidden">
      <div className="bg-ink px-6 py-4">
        <h2 className="font-sans text-sm font-bold tracking-[0.1em] uppercase text-white">{title}</h2>
        <p className="font-body text-xs text-white/50 mt-1">{desc}</p>
      </div>
      <div className="p-6">
        <CommunityForum pageId={id} pageTitle={title} />
      </div>
    </section>
  )
}

import type { InstituteTopic } from '../../data/instituteCatalog'
import { buildSubscriptionSuccessPath } from '../../lib/subscriptionSuccess'
import NewsletterSignup from '../NewsletterSignup'

interface InstituteSignupPanelProps {
  topic: InstituteTopic
  surface: 'course' | 'guide'
}

export default function InstituteSignupPanel({ topic, surface }: InstituteSignupPanelProps) {
  const isCourse = surface === 'course'
  const successPath = buildSubscriptionSuccessPath({
    source: isCourse ? 'institute_course' : 'institute_guide',
    topic: topic.slug,
    interest: topic.skill,
    returnTo: isCourse ? `/institute/courses/${topic.slug}` : `/institute/guides/${topic.slug}`,
  })

  const heading = isCourse
    ? `Keep the ${topic.trackMeta.shortLabel.toLowerCase()} path within reach.`
    : `Keep ${topic.skill.toLowerCase()} moving after this guide.`
  const subtext = isCourse
    ? `Subscribe for new practical paths in ${topic.trackMeta.shortLabel}. After signup, we route you back to this course, the companion guide, and the field manual without losing the thread.`
    : `Subscribe for new practical paths in ${topic.trackMeta.shortLabel}. After signup, we route you back to this guide, the companion course, and the field manual without losing the thread.`

  return (
    <section className="institute-panel px-6 py-6">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <div>
          <p className="institute-eyebrow">
            {isCourse ? 'Keep This Course Close' : 'Keep This Path Close'}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
            {subtext}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="institute-pill">{topic.trackMeta.shortLabel}</span>
            <span className="institute-pill">{topic.difficulty}</span>
            <span className="institute-pill">{topic.timeToFirstResult}</span>
          </div>
        </div>

        <NewsletterSignup
          source={isCourse ? 'institute_course' : 'institute_guide'}
          contentInterest={topic.skill}
          heading="Get new practical paths in this lane."
          subtext="We publish source-backed field-manual updates, companion paths, and practical skill routes without hype or generic life-hack noise."
          successPath={successPath}
        />
      </div>
    </section>
  )
}

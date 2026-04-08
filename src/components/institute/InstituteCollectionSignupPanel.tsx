import { buildSubscriptionSuccessPath } from '../../lib/subscriptionSuccess'
import NewsletterSignup from '../NewsletterSignup'

interface InstituteCollectionSignupPanelProps {
  surface: 'catalog' | 'book'
  fieldManualCount: number
  practicalCourseCount: number
  trackCount: number
}

export default function InstituteCollectionSignupPanel({
  surface,
  fieldManualCount,
  practicalCourseCount,
  trackCount,
}: InstituteCollectionSignupPanelProps) {
  const isBook = surface === 'book'
  const source = isBook ? 'institute_book' : 'institute_catalog'
  const successPath = buildSubscriptionSuccessPath({
    source,
    interest: isBook ? 'Field Manual' : 'Veritas Institute',
    returnTo: isBook ? '/institute/book' : '/institute',
  })

  const eyebrow = isBook ? 'Keep The Manual Close' : 'Keep The Institute Close'
  const heading = isBook
    ? 'Subscribe for field-manual updates and practical skill paths.'
    : 'Subscribe for new practical paths and field-manual updates.'
  const subtext = isBook
    ? 'After signup, we route you back to the field manual, then into the institute catalog and methodology without losing the thread.'
    : 'After signup, we route you back to the institute catalog, then into the field manual and methodology without losing the thread.'
  const pills = isBook
    ? [`${fieldManualCount} answers`, `${practicalCourseCount} course paths`, 'Print-first']
    : [`${fieldManualCount} answers`, `${practicalCourseCount} course paths`, `${trackCount} tracks`]

  return (
    <section className="institute-panel px-6 py-6">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <div>
          <p className="institute-eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
            {subtext}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <span key={pill} className="institute-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <NewsletterSignup
          source={source}
          contentInterest={isBook ? 'Field Manual' : 'Veritas Institute'}
          heading="Get field-manual updates and new practical paths."
          subtext="We publish source-backed field-manual updates, course launches, and practical household skill routes without hype or generic life-hack noise."
          successPath={successPath}
        />
      </div>
    </section>
  )
}

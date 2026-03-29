import type { SubscriptionSource } from './hubspot'

interface SubscriptionSuccessOptions {
  source: SubscriptionSource
  topic?: string
  article?: string
  interest?: string
  returnTo?: string
}

export function buildSubscriptionSuccessPath(options: SubscriptionSuccessOptions): string {
  const params = new URLSearchParams({
    source: options.source,
  })

  if (options.topic) params.set('topic', options.topic)
  if (options.article) params.set('article', options.article)
  if (options.interest) params.set('interest', options.interest)
  if (options.returnTo) params.set('returnTo', options.returnTo)

  return `/subscribe/success?${params.toString()}`
}

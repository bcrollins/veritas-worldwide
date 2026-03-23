/**
 * SEO utilities for managing document head meta tags and JSON-LD structured data.
 * Handles per-page Open Graph tags, Twitter Cards, and Article schema markup.
 */

const SITE_NAME = 'Veritas Worldwide Press'
const SITE_URL = 'https://veritasworldwide.com'
const DEFAULT_DESCRIPTION = 'The Record — A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. Published by Veritas Worldwide Press.'

interface SEOConfig {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

/**
 * Sets Open Graph and Twitter Card meta tags in the document head.
 * Creates tags if they don't exist, updates them if they do.
 */
export function setMetaTags(config: SEOConfig): void {
  const { title, description, url, type = 'website', publishedTime, author, section, tags } = config

  document.title = title

  const metas: Record<string, string> = {
    'description': description,
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary',
    'twitter:title': title,
    'twitter:description': description,
  }

  if (type === 'article') {
    if (publishedTime) metas['article:published_time'] = publishedTime
    if (author) metas['article:author'] = author
    if (section) metas['article:section'] = section
    if (tags) {
      tags.forEach((tag, i) => {
        metas[`article:tag:${i}`] = tag
      })
    }
  }

  for (const [key, value] of Object.entries(metas)) {
    // article:tag:N → use property, skip numeric suffix for actual attribute
    const isOg = key.startsWith('og:') || key.startsWith('article:')
    const attrName = isOg ? 'property' : 'name'
    // Normalize the key for article:tag:N
    const attrValue = key.replace(/:\d+$/, '')

    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null

    // For article:tag, we may have multiple — handle by clearing and re-adding
    if (key.startsWith('article:tag:')) {
      if (key === 'article:tag:0') {
        // Remove all existing article:tag metas
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove())
      }
      el = null // Force creation
    }

    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attrName, attrValue)
      document.head.appendChild(el)
    }
    el.setAttribute('content', value)
  }
}

/**
 * Removes dynamic meta tags added by setMetaTags (OG, Twitter, article).
 */
export function clearMetaTags(): void {
  document.title = `The Record | ${SITE_NAME}`

  const selectors = [
    'meta[property^="og:"]',
    'meta[property^="article:"]',
    'meta[name^="twitter:"]',
  ]
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      // Preserve the base OG tags from index.html
      const prop = el.getAttribute('property') || el.getAttribute('name') || ''
      if (prop === 'og:title' || prop === 'og:description' || prop === 'og:type' || prop === 'og:url') {
        // Reset to defaults
        const defaults: Record<string, string> = {
          'og:title': `The Record | ${SITE_NAME}`,
          'og:description': DEFAULT_DESCRIPTION,
          'og:type': 'website',
          'og:url': SITE_URL,
        }
        if (defaults[prop]) {
          el.setAttribute('content', defaults[prop])
        }
      } else {
        el.remove()
      }
    })
  })

  // Reset description
  const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (descEl) descEl.setAttribute('content', DEFAULT_DESCRIPTION)
}

/**
 * Injects JSON-LD structured data into the document head.
 * Removes any existing JSON-LD script first.
 */
export function setJsonLd(data: Record<string, unknown>): void {
  removeJsonLd()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'veritas-jsonld'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * Removes JSON-LD script from document head.
 */
export function removeJsonLd(): void {
  const existing = document.getElementById('veritas-jsonld')
  if (existing) existing.remove()
}

/**
 * Generates Article schema JSON-LD for a chapter.
 */
export function chapterJsonLd(chapter: {
  id: string
  title: string
  subtitle: string
  author: string
  publishDate: string
  dateRange?: string
  keywords: string[]
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': chapter.title,
    'description': chapter.subtitle,
    'author': {
      '@type': 'Person',
      'name': chapter.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
    },
    'datePublished': '2026-03-01',
    'dateModified': '2026-03-01',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/chapter/${chapter.id}`,
    },
    'keywords': chapter.keywords.join(', '),
    'isAccessibleForFree': true,
    'isPartOf': {
      '@type': 'PublicationVolume',
      'name': 'The Record — Volume I',
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
      },
    },
  }
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION }

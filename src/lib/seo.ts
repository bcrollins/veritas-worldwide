/**
 * SEO utilities for managing document head meta tags and JSON-LD structured data.
 * Handles per-page Open Graph tags, Twitter Cards, and Article schema markup.
 */

const SITE_NAME = 'Veritas Press'
const SITE_URL = 'https://veritasworldwide.com'
const DEFAULT_DESCRIPTION = 'The Record — A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. Published by Veritas Press.'
const OG_IMAGE = `${SITE_URL}/og-image.png`
const TWITTER_HANDLE = '@VeritasWorldwide'

interface SEOConfig {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
  image?: string
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
  const { title, description, url, type = 'website', image, publishedTime, author, section, tags } = config
  const ogImage = image || OG_IMAGE

  document.title = title

  const metas: Record<string, string> = {
    'description': description,
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'og:image': ogImage,
    'og:image:width': '1200',
    'og:image:height': '630',
    'twitter:card': 'summary_large_image',
    'twitter:site': TWITTER_HANDLE,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogImage,
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

  // Set canonical link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)

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
      if (prop === 'og:title' || prop === 'og:description' || prop === 'og:type' || prop === 'og:url' || prop === 'og:image' || prop === 'og:site_name') {
        // Reset to defaults
        const defaults: Record<string, string> = {
          'og:title': `The Record | ${SITE_NAME}`,
          'og:description': DEFAULT_DESCRIPTION,
          'og:type': 'website',
          'og:url': SITE_URL,
          'og:image': OG_IMAGE,
          'og:site_name': SITE_NAME,
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

  // Reset canonical
  const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (canonical) canonical.setAttribute('href', SITE_URL)
}

/**
 * Injects JSON-LD structured data into the document head.
 * Removes any existing JSON-LD script first.
 */
export function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
  removeJsonLd()
  const items = Array.isArray(data) ? data : [data]
  items.forEach((item, i) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.className = 'veritas-jsonld'
    script.id = `veritas-jsonld-${i}`
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

/**
 * Removes JSON-LD script from document head.
 */
export function removeJsonLd(): void {
  document.querySelectorAll('.veritas-jsonld').forEach(el => el.remove())
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
  image?: string
}): Record<string, unknown>[] {
  const chapterImage = chapter.image || OG_IMAGE
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': chapter.title,
      'description': chapter.subtitle,
      'author': {
        '@type': 'Organization',
        'name': 'Veritas Press',
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': OG_IMAGE,
        },
      },
      'image': chapterImage,
      'datePublished': '2026-03-01',
      'dateModified': '2026-03-23',
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'The Record',
          'item': SITE_URL,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': chapter.title,
          'item': `${SITE_URL}/chapter/${chapter.id}`,
        },
      ],
    },
  ]
}

/**
 * Generates WebSite schema JSON-LD with SearchAction for sitelinks.
 */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_NAME,
    'alternateName': 'The Record',
    'url': SITE_URL,
    'description': DEFAULT_DESCRIPTION,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION }

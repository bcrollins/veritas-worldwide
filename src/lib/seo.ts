/**
 * SEO utilities for managing document head meta tags and JSON-LD structured data.
 * Handles per-page Open Graph tags, Twitter Cards, and Article schema markup.
 */

const SITE_NAME = 'Veritas Worldwide'
const SITE_URL = 'https://veritasworldwide.com'
const DEFAULT_DESCRIPTION = 'The Record — A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. Published by Veritas Worldwide.'
const OG_IMAGE = `${SITE_URL}/og-image.png`
/** Square publisher mark for Organization / NewsMediaOrganization schema (not the wide OG card). */
const LOGO_IMAGE = `${SITE_URL}/brand-kit/01-logos/logo-mark-512.png`
const TWITTER_HANDLE = '@VeritasWorldwide'
/** Google typically displays ~50–60 chars of title; keep headroom for SERP truncation. */
const META_TITLE_MAX = 60
/** Meta descriptions perform best around 150–160 characters in SERP snippets. */
const META_DESCRIPTION_MAX = 160

interface SEOConfig {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
  image?: string
  /** Accessible description of the OG/Twitter image (Search Central image SEO). */
  imageAlt?: string
  publishedTime?: string
  /** ISO-ish date for article:modified_time (freshness signal for news/docs). */
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  /** Optional robots directive (e.g. noindex,nofollow for thank-you pages). */
  robots?: string
}

/**
 * Clamp a title for SERP display without mid-word cuts when possible.
 * Google Search Central: unique, concise, descriptive titles.
 */
export function clampMetaTitle(title: string, max = META_TITLE_MAX): string {
  const t = title.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  return `${(sp > 40 ? cut.slice(0, sp) : cut).trimEnd()}…`
}

/**
 * Clamp a meta description for SERP snippet eligibility (~150–160 chars).
 */
export function clampMetaDescription(description: string, max = META_DESCRIPTION_MAX): string {
  const d = description.replace(/\s+/g, ' ').trim()
  if (d.length <= max) return d
  const cut = d.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  return `${(sp > 100 ? cut.slice(0, sp) : cut).trimEnd()}…`
}

function normalizePublicationDate(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return new Date().toISOString().slice(0, 10)

  const direct = new Date(trimmed)
  if (!Number.isNaN(direct.getTime())) {
    return direct.toISOString().slice(0, 10)
  }

  const monthYear = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYear) {
    const parsed = new Date(`${monthYear[1]} 1, ${monthYear[2]} UTC`)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10)
    }
  }

  const yearOnly = trimmed.match(/^(\d{4})$/)
  if (yearOnly) {
    return `${yearOnly[1]}-01-01`
  }

  return new Date().toISOString().slice(0, 10)
}

/**
 * Sets Open Graph and Twitter Card meta tags in the document head.
 * Creates tags if they don't exist, updates them if they do.
 */
export function setMetaTags(config: SEOConfig): void {
  const { url, type = 'website', image, publishedTime, modifiedTime, author, section, tags, robots } = config
  // Keep document.title full for browser tabs; clamp only SERP/social fields.
  const title = config.title.replace(/\s+/g, ' ').trim()
  const description = clampMetaDescription(config.description)
  const ogTitle = clampMetaTitle(title, 70) // OG allows slightly longer than SERP title
  const ogImage = image || OG_IMAGE
  // Accessible alt for social previews (Search Central: describe the image).
  const ogImageAlt =
    config.imageAlt?.replace(/\s+/g, ' ').trim() ||
    `${ogTitle} — ${SITE_NAME}`

  // Absolute HTTPS self-referential canonical only (Search Central: consolidate duplicates).
  const absoluteUrl = url.startsWith('http')
    ? url
    : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`

  document.title = title

  const metas: Record<string, string> = {
    'description': description,
    // Google Discover / rich results: allow large previews unless page opts out via robots.
    'robots': robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'og:title': ogTitle,
    'og:description': description,
    'og:url': absoluteUrl,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'og:locale': 'en_US',
    'og:image': ogImage,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': ogImageAlt,
    'twitter:card': 'summary_large_image',
    'twitter:site': TWITTER_HANDLE,
    'twitter:title': ogTitle,
    'twitter:description': description,
    'twitter:image': ogImage,
    'twitter:image:alt': ogImageAlt,
  }

  if (type === 'article') {
    if (publishedTime) metas['article:published_time'] = normalizePublicationDate(publishedTime)
    if (modifiedTime || publishedTime) {
      metas['article:modified_time'] = normalizePublicationDate(modifiedTime || publishedTime || '')
    }
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
  canonical.setAttribute('href', absoluteUrl)

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
 * Includes speakable for voice-search / Google Assistant eligibility on headlines.
 */
export function chapterJsonLd(chapter: {
  id: string
  title: string
  subtitle: string
  author: string
  publishDate: string
  dateModified?: string
  dateRange?: string
  keywords: string[]
  image?: string
}): Record<string, unknown>[] {
  const chapterImage = chapter.image || OG_IMAGE
  const publishedDate = normalizePublicationDate(chapter.publishDate)
  const modifiedDate = normalizePublicationDate(chapter.dateModified || chapter.publishDate)
  const pageUrl = `${SITE_URL}/chapter/${chapter.id}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': chapter.title,
      'description': chapter.subtitle,
      'author': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': LOGO_IMAGE,
          'width': 512,
          'height': 512,
        },
      },
      'image': chapterImage,
      'datePublished': publishedDate,
      'dateModified': modifiedDate,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      'keywords': chapter.keywords.join(', '),
      'isAccessibleForFree': true,
      'inLanguage': 'en-US',
      // Voice / speakable: headline + lede (CSS selectors match ChapterPage DOM conventions)
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.chapter-subtitle', '[data-speakable="lede"]'],
      },
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
          'item': pageUrl,
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
    'inLanguage': 'en-US',
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

/**
 * Organization entity for E-E-A-T / knowledge-panel eligibility.
 * Google Search Central: provide identity + sameAs social/profile URLs.
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    // NewsMediaOrganization strengthens journalism E-E-A-T for YMYL-adjacent political coverage.
    '@type': ['Organization', 'NewsMediaOrganization'],
    'name': SITE_NAME,
    'alternateName': 'The Record',
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': LOGO_IMAGE,
      'width': 512,
      'height': 512,
    },
    'image': OG_IMAGE,
    'description':
      'Independent investigative journalism built on primary sources. The Record documents 240+ years of institutional power with public archives.',
    'foundingDate': '2025',
    'publishingPrinciples': `${SITE_URL}/methodology`,
    'correctionsPolicy': `${SITE_URL}/methodology`,
    'ethicsPolicy': `${SITE_URL}/methodology`,
    'sameAs': [
      'https://x.com/VeritasWorldwide',
      'https://www.reddit.com/r/VeritasWorldwide',
      'https://github.com/bcrollins/veritas-worldwide',
    ],
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'email': 'rights@veritasworldwide.com',
        'contactType': 'editorial',
        'availableLanguage': 'English',
      },
      {
        '@type': 'ContactPoint',
        'email': 'corrections@veritasworldwide.com',
        'contactType': 'corrections',
        'availableLanguage': 'English',
      },
    ],
  }
}

/**
 * FAQPage JSON-LD for methodology / trust Q&A surfaces (rich-result eligible).
 */
export function faqJsonLd(
  questions: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map((q) => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList helper for non-chapter routes.
 */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': item.url,
    })),
  }
}

/**
 * HowTo schema for Institute practical guides (rich-result eligible).
 * Google Search Central: HowTo requires name, step[]; supply optional.
 */
export function howToJsonLd(config: {
  name: string
  description: string
  url: string
  steps: { name: string; text: string; url?: string }[]
  supplies?: string[]
  totalTime?: string
  image?: string
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: config.name,
    description: config.description,
    url: config.url,
    image: config.image || OG_IMAGE,
    step: config.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  }
  if (config.supplies?.length) {
    schema.supply = config.supplies.map((s) => ({
      '@type': 'HowToSupply',
      name: s,
    }))
  }
  if (config.totalTime) {
    schema.totalTime = config.totalTime
  }
  return schema
}

/**
 * Person schema for power profiles (knowledge-panel adjacent entity signals).
 */
export function personJsonLd(config: {
  name: string
  description: string
  url: string
  image?: string
  jobTitle?: string
  sameAs?: string[]
  worksFor?: string
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.name,
    description: clampMetaDescription(config.description, 300),
    url: config.url,
    image: config.image || OG_IMAGE,
  }
  if (config.jobTitle) schema.jobTitle = config.jobTitle
  if (config.sameAs?.length) schema.sameAs = config.sameAs
  if (config.worksFor) {
    schema.worksFor = {
      '@type': 'Organization',
      name: config.worksFor,
    }
  }
  return schema
}

/**
 * NewsMediaOrganization for media kit / press surfaces (E-E-A-T publisher identity).
 */
export function newsMediaOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: SITE_NAME,
    alternateName: 'The Record',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_IMAGE,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://x.com/VeritasWorldwide',
      'https://www.reddit.com/r/VeritasWorldwide',
      'https://github.com/bcrollins/veritas-worldwide',
    ],
    ethicsPolicy: `${SITE_URL}/methodology`,
    masthead: `${SITE_URL}/about`,
    correctionsPolicy: `${SITE_URL}/methodology`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'rights@veritasworldwide.com',
      contactType: 'editorial',
      availableLanguage: 'English',
    },
  }
}

/**
 * ItemList helper for hub pages (profiles index, topics, institute tracks).
 */
export function itemListJsonLd(config: {
  name: string
  description?: string
  url: string
  items: { name: string; url: string }[]
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.name,
    description: config.description,
    url: config.url,
    numberOfItems: config.items.length,
    itemListElement: config.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

export {
  SITE_NAME,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
  LOGO_IMAGE,
  META_TITLE_MAX,
  META_DESCRIPTION_MAX,
}

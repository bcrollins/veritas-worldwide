#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const MANIFEST_PATH = path.join(DIST_DIR, 'prerender-manifest.json')

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function logStep(message) {
  console.log(`[verify:structured-data] ${message}`)
}

function routeType(route) {
  if (route === '/institute') return 'catalog'
  if (route === '/institute/book') return 'book'
  if (route === '/institute/methodology') return 'methodology'
  if (route.startsWith('/institute/courses/')) return 'course'
  if (route.startsWith('/institute/guides/')) return 'guide'
  return 'other'
}

function loadHtmlForRoute(manifest, route) {
  const relativePath = manifest[route]
  assert(relativePath, `Missing prerender manifest entry for ${route}`)
  const filePath = path.join(DIST_DIR, relativePath)
  assert(fs.existsSync(filePath), `Missing prerendered HTML for ${route}: ${filePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)
  return match?.[1] || null
}

function extractJsonLdEntries(html) {
  const matches = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
  return matches.map((match) => JSON.parse(match[1]))
}

function includesType(entries, type) {
  return entries.some((entry) => {
    const entryType = entry?.['@type']
    return Array.isArray(entryType) ? entryType.includes(type) : entryType === type
  })
}

function getEntry(entries, type) {
  return entries.find((entry) => {
    const entryType = entry?.['@type']
    return Array.isArray(entryType) ? entryType.includes(type) : entryType === type
  })
}

function verifyRoute(route, html, entries) {
  const issues = []
  const canonical = extractCanonical(html)
  const expectedCanonical = `https://veritasworldwide.com${route}`

  if (canonical !== expectedCanonical) {
    issues.push(`canonical mismatch: expected ${expectedCanonical}, received ${canonical || 'missing'}`)
  }

  if (entries.length === 0) {
    issues.push('missing JSON-LD scripts')
    return issues
  }

  switch (routeType(route)) {
    case 'catalog': {
      if (!includesType(entries, 'CollectionPage')) issues.push('missing CollectionPage')
      if (!includesType(entries, 'ItemList')) issues.push('missing ItemList')
      break
    }
    case 'book': {
      if (!includesType(entries, 'Book')) issues.push('missing Book')
      if (!includesType(entries, 'ItemList')) issues.push('missing ItemList')
      break
    }
    case 'methodology': {
      if (!includesType(entries, 'AboutPage')) issues.push('missing AboutPage')
      break
    }
    case 'course': {
      if (!includesType(entries, 'LearningResource')) issues.push('missing LearningResource')
      if (!includesType(entries, 'ItemList')) issues.push('missing ItemList')
      if (!includesType(entries, 'BreadcrumbList')) issues.push('missing BreadcrumbList')
      if (!includesType(entries, 'FAQPage')) issues.push('missing FAQPage')

      const learningResource = getEntry(entries, 'LearningResource')
      if (learningResource?.url !== expectedCanonical) {
        issues.push(`LearningResource.url mismatch: expected ${expectedCanonical}, received ${learningResource?.url || 'missing'}`)
      }

      const itemList = getEntry(entries, 'ItemList')
      if (!Array.isArray(itemList?.itemListElement) || itemList.itemListElement.length === 0) {
        issues.push('ItemList.itemListElement is empty')
      }

      const faq = getEntry(entries, 'FAQPage')
      if (!Array.isArray(faq?.mainEntity) || faq.mainEntity.length === 0) {
        issues.push('FAQPage.mainEntity is empty')
      }
      break
    }
    case 'guide': {
      if (!includesType(entries, 'Article')) issues.push('missing Article')
      if (!includesType(entries, 'HowTo')) issues.push('missing HowTo')
      if (!includesType(entries, 'BreadcrumbList')) issues.push('missing BreadcrumbList')
      if (!includesType(entries, 'FAQPage')) issues.push('missing FAQPage')

      const article = getEntry(entries, 'Article')
      if (article?.url !== expectedCanonical) {
        issues.push(`Article.url mismatch: expected ${expectedCanonical}, received ${article?.url || 'missing'}`)
      }

      const howTo = getEntry(entries, 'HowTo')
      if (howTo?.url !== expectedCanonical) {
        issues.push(`HowTo.url mismatch: expected ${expectedCanonical}, received ${howTo?.url || 'missing'}`)
      }
      if (!Array.isArray(howTo?.step) || howTo.step.length === 0) {
        issues.push('HowTo.step is empty')
      }
      if (!Array.isArray(howTo?.supply) || howTo.supply.length === 0) {
        issues.push('HowTo.supply is empty')
      }

      const faq = getEntry(entries, 'FAQPage')
      if (!Array.isArray(faq?.mainEntity) || faq.mainEntity.length === 0) {
        issues.push('FAQPage.mainEntity is empty')
      }
      break
    }
    default:
      break
  }

  return issues
}

function main() {
  assert(fs.existsSync(MANIFEST_PATH), 'Missing dist/prerender-manifest.json. Run `npm run build` before verifying structured data.')

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
  const instituteRoutes = Object.keys(manifest).filter((route) => route.startsWith('/institute'))
  assert(instituteRoutes.length > 0, 'No /institute routes found in prerender manifest.')

  const failures = []

  for (const route of instituteRoutes) {
    const html = loadHtmlForRoute(manifest, route)
    const entries = extractJsonLdEntries(html)
    const issues = verifyRoute(route, html, entries)

    if (issues.length > 0) {
      failures.push({ route, issues })
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`[verify:structured-data] ${failure.route}`)
      for (const issue of failure.issues) {
        console.error(`  - ${issue}`)
      }
    }
    process.exit(1)
  }

  const courseCount = instituteRoutes.filter((route) => routeType(route) === 'course').length
  const guideCount = instituteRoutes.filter((route) => routeType(route) === 'guide').length
  logStep(`PASS — verified ${instituteRoutes.length} institute prerender routes (${courseCount} courses, ${guideCount} guides)`)
}

try {
  main()
} catch (error) {
  console.error(`[verify:structured-data] FAIL — ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
}

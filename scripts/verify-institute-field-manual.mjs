#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT_DIR = process.cwd()
const catalogPath = path.join(ROOT_DIR, 'src/data/instituteCatalog.ts')
const pagePath = path.join(ROOT_DIR, 'src/pages/InstituteBookPage.tsx')
const pdfBuilderPath = path.join(ROOT_DIR, 'src/lib/instituteFieldManualPdf.ts')
const pdfButtonPath = path.join(ROOT_DIR, 'src/components/institute/InstituteBookPDF.tsx')
const prerenderPath = path.join(ROOT_DIR, 'scripts/prerender.mjs')

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function log(message) {
  console.log(`[verify:institute-manual] ${message}`)
}

function read(filePath) {
  assert(fs.existsSync(filePath), `Missing file: ${filePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

function unique(items) {
  return new Set(items).size === items.length
}

async function main() {
  const catalog = await import(pathToFileURL(catalogPath).href)
  const {
    getInstituteTopicBySlug,
    instituteFieldManualEntries,
    institutePracticalTopics,
    instituteResearchSources,
  } = catalog

  assert(Array.isArray(instituteFieldManualEntries), 'instituteFieldManualEntries must be an array')
  assert(instituteFieldManualEntries.length >= 25, `Expected at least 25 field-manual entries, found ${instituteFieldManualEntries.length}`)
  assert(institutePracticalTopics.length >= 50, `Expected at least 50 practical course paths, found ${institutePracticalTopics.length}`)
  assert(unique(instituteFieldManualEntries.map((entry) => entry.id)), 'Field-manual entry IDs must be unique')

  const urgencies = new Set(instituteFieldManualEntries.map((entry) => entry.urgency))
  for (const required of ['Immediate', 'High', 'Moderate']) {
    assert(urgencies.has(required), `Missing ${required} urgency coverage`)
  }

  for (const entry of instituteFieldManualEntries) {
    assert(entry.id && /^[a-z0-9-]+$/.test(entry.id), `Invalid entry id: ${entry.id}`)
    assert(entry.category && entry.title && entry.summary, `Missing title/category/summary for ${entry.id}`)
    assert(entry.whenToUse && entry.timeWindow && entry.decisionRule && entry.quickAnswer, `Missing retrieval fields for ${entry.id}`)
    assert(Array.isArray(entry.gear) && entry.gear.length >= 3, `Expected at least 3 gear items for ${entry.id}`)
    assert(Array.isArray(entry.doNow) && entry.doNow.length >= 3, `Expected at least 3 do-now items for ${entry.id}`)
    assert(Array.isArray(entry.avoid) && entry.avoid.length >= 3, `Expected at least 3 avoid items for ${entry.id}`)
    assert(Array.isArray(entry.escalateIf) && entry.escalateIf.length >= 3, `Expected at least 3 escalation gates for ${entry.id}`)
    assert(Array.isArray(entry.sourceAnchors) && entry.sourceAnchors.length >= 2, `Expected source anchors for ${entry.id}`)

    if (entry.relatedTopicSlug) {
      assert(getInstituteTopicBySlug(entry.relatedTopicSlug), `Entry ${entry.id} points to missing related topic ${entry.relatedTopicSlug}`)
    }
  }

  assert(instituteResearchSources.length >= 10, `Expected expanded research sources, found ${instituteResearchSources.length}`)
  for (const source of instituteResearchSources) {
    assert(source.label && source.note, `Research source missing label or note: ${JSON.stringify(source)}`)
    assert(/^https:\/\//.test(source.url), `Research source must use https: ${source.url}`)
  }

  const pageSource = read(pagePath)
  const pdfBuilderSource = read(pdfBuilderPath)
  const pdfButtonSource = read(pdfButtonPath)
  const prerenderSource = read(prerenderPath)

  for (const token of ['entry.decisionRule', 'entry.timeWindow', 'entry.gear', 'entry.escalateIf']) {
    assert(pageSource.includes(token), `InstituteBookPage does not render ${token}`)
    assert(pdfBuilderSource.includes(token), `instituteFieldManualPdf does not export ${token}`)
  }

  for (const token of ['doc.setProperties', 'drawCallout', 'drawFlow', 'Quick reference by category']) {
    assert(pdfBuilderSource.includes(token), `instituteFieldManualPdf missing production feature: ${token}`)
  }

  assert(pdfButtonSource.includes('buildInstituteFieldManualPdf'), 'InstituteBookPDF button must use the shared PDF builder')

  for (const token of ['parseInstituteFieldManualEntries', 'Field manual emergency entries', 'instituteFieldManualEntries.map', 'renderInstituteBookPage(institutePracticalTopics, instituteResearchSources, instituteFieldManualEntries)']) {
    assert(prerenderSource.includes(token), `prerender.mjs missing enhanced manual path: ${token}`)
  }

  log(`PASS — ${instituteFieldManualEntries.length} field entries, ${institutePracticalTopics.length} practical paths, ${instituteResearchSources.length} research sources`)
}

main().catch((error) => {
  console.error(`[verify:institute-manual] FAIL — ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})

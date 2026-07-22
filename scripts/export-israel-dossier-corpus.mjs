#!/usr/bin/env node
/**
 * Export machine-readable Israel Dossier corpus (incidents, timeline, actors, money trail).
 * Uses the same TS emit approach as export-chapter-data.mjs.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const repoRoot = process.cwd()
const tempRoot = path.join(repoRoot, 'generated', '.israel-dossier-temp')
const outDir = path.join(repoRoot, 'public', 'israel-dossier')
const distDir = path.join(repoRoot, 'dist', 'israel-dossier')
const entryFile = path.join(repoRoot, 'src', 'data', 'israelDossierExpanded.ts')
const actorsFile = path.join(repoRoot, 'src', 'data', 'israelDossierActors.ts')
const historyFile = path.join(repoRoot, 'src', 'data', 'israelDossierHistoryPack.ts')
const canonFile = path.join(repoRoot, 'src', 'data', 'israelDossierCanon.ts')

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function getTempModulePath(filePath) {
  const relativePath = path.relative(repoRoot, filePath)
  return path.join(tempRoot, relativePath).replace(/\.(ts|tsx)$/, '.js')
}

function rewriteRelativeImportSpecifiers(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const rewritten = source.replace(
    /((?:import|export)\s[\s\S]*?\sfrom\s*['"]|import\(\s*['"])(\.\.?\/[^'")]+)(['"]\s*\)?)/g,
    (match, prefix, specifier, suffix) => {
      if (path.extname(specifier)) return match
      return `${prefix}${specifier}.js${suffix}`
    },
  )
  if (rewritten !== source) fs.writeFileSync(filePath, rewritten, 'utf8')
}

function emitTsModuleGraph(entryFilePath) {
  const program = ts.createProgram([entryFilePath], {
    module: ts.ModuleKind.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2020,
    rootDir: repoRoot,
    outDir: tempRoot,
    rewriteRelativeImportExtensions: true,
    esModuleInterop: false,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
  })

  const { diagnostics, emitSkipped } = program.emit()
  if (emitSkipped) {
    const messages = diagnostics.map((diagnostic) =>
      typeof diagnostic.messageText === 'string'
        ? diagnostic.messageText
        : diagnostic.messageText.messageText,
    )
    throw new Error(`Failed to emit TS module graph for ${entryFilePath}: ${messages.join(' | ')}`)
  }

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue
    if (!sourceFile.fileName.startsWith(repoRoot)) continue
    if (!/\.(ts|tsx)$/.test(sourceFile.fileName)) continue
    const emittedPath = getTempModulePath(sourceFile.fileName)
    if (fs.existsSync(emittedPath)) rewriteRelativeImportSpecifiers(emittedPath)
  }
}

async function importTsModule(filePath) {
  emitTsModuleGraph(filePath)
  const tempPath = getTempModulePath(filePath)
  return import(`${pathToFileURL(tempPath).href}?v=${Date.now()}-${Math.random()}`)
}

function dedupeIncidents(incidents) {
  const seen = new Set()
  const out = []
  for (const incident of incidents) {
    const key = `${incident.date}|${incident.location}`.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(incident)
  }
  return out
}

async function main() {
  ensureDir(tempRoot)
  const [canon, expanded, actorsMod, history] = await Promise.all([
    importTsModule(canonFile),
    importTsModule(entryFile),
    importTsModule(actorsFile),
    importTsModule(historyFile),
  ])

  const incidents = dedupeIncidents([
    ...canon.ISRAEL_DOSSIER_CORE_INCIDENTS,
    ...expanded.EXPANDED_INCIDENTS,
  ]).sort((a, b) => {
    const ya = Number((String(a.date).match(/(\d{4})/) || [])[1] || 9999)
    const yb = Number((String(b.date).match(/(\d{4})/) || [])[1] || 9999)
    return ya - yb
  })

  function yearToEra(date) {
    const y = Number((String(date).match(/(\d{4})/) || [])[1] || 0)
    if (y <= 1949) return 'mandate-1948'
    if (y <= 1967) return '1948-1967'
    if (y <= 2005) return 'occupation-1967-2005'
    if (y < 2023) return 'blockade-2007-2023'
    return 'post-oct7'
  }

  const incidentsByEra = {}
  for (const incident of incidents) {
    const era = yearToEra(incident.date)
    incidentsByEra[era] = (incidentsByEra[era] || 0) + 1
  }

  const actorsByCategory = {}
  for (const actor of actorsMod.ISRAEL_DOSSIER_ACTORS) {
    actorsByCategory[actor.category] = (actorsByCategory[actor.category] || 0) + 1
  }

  const corpus = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    lastVerified: canon.ISRAEL_DOSSIER_LAST_VERIFIED,
    disclaimer:
      'High-evidence sample with labeled tiers. Not an exhaustive ledger of all war crimes or civilian harm since 1948. Prefer primary sources linked on each row.',
    counts: {
      incidents: incidents.length,
      timelineEvents: expanded.HISTORICAL_TIMELINE.length,
      actors: actorsMod.ISRAEL_DOSSIER_ACTORS.length,
      moneyTrailNodes: canon.ISRAEL_DOSSIER_MONEY_TRAIL.length,
      historicalWarCrimesPack: history.ISRAEL_DOSSIER_HISTORICAL_WAR_CRIMES.length,
      legalCases: (canon.ISRAEL_DOSSIER_LEGAL_CASES || []).length,
      lobbyingRecords: (canon.ISRAEL_DOSSIER_LOBBYING_DATA || []).length,
      incidentsByEra,
      actorsByCategory,
    },
    publicRecords: canon.ISRAEL_DOSSIER_LATEST_PUBLIC_RECORDS,
    moneyTrail: canon.ISRAEL_DOSSIER_MONEY_TRAIL,
    actors: actorsMod.ISRAEL_DOSSIER_ACTORS,
    timeline: expanded.HISTORICAL_TIMELINE,
    incidents,
    legalCases: canon.ISRAEL_DOSSIER_LEGAL_CASES || [],
    lobbying: canon.ISRAEL_DOSSIER_LOBBYING_DATA || [],
    eraMeta: history.ISRAEL_DOSSIER_ERA_META,
  }

  ensureDir(outDir)
  const outPath = path.join(outDir, 'corpus.json')
  fs.writeFileSync(outPath, `${JSON.stringify(corpus, null, 2)}\n`, 'utf8')
  if (fs.existsSync(path.join(repoRoot, 'dist'))) {
    ensureDir(distDir)
    fs.writeFileSync(path.join(distDir, 'corpus.json'), `${JSON.stringify(corpus, null, 2)}\n`, 'utf8')
  }

  console.log(
    `[export-israel-dossier-corpus] wrote ${outPath} · incidents=${corpus.counts.incidents} timeline=${corpus.counts.timelineEvents} actors=${corpus.counts.actors}`,
  )
}

main().catch((error) => {
  console.error('[export-israel-dossier-corpus] FAIL', error)
  process.exit(1)
})

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { collectUrls } from './collect.ts'
import { fetchPreview, type Preview } from './fetch-preview.ts'

const ROOT = process.cwd()
const CACHE = join(ROOT, 'src/components/link-preview/lib/link-previews.json')

type Cache = Record<string, Preview>

async function updatePreviews() {
  const cached = readCache()
  const entries: [string, Preview | null][] = []
  for (const url of collectUrls(ROOT))
    entries.push([url, await previewFor(cached, url)])
  const next = Object.fromEntries(entries.filter(([, preview]) => preview))
  writeFileSync(CACHE, `${JSON.stringify(next, null, 2)}\n`)
  console.log(`link-previews.json: ${Object.keys(next).length} link(s)`)
}

async function previewFor(cached: Cache, url: string) {
  return cached[url] ?? fetchPreview(ROOT, url)
}

function readCache(): Cache {
  if (!existsSync(CACHE)) return {}
  return JSON.parse(readFileSync(CACHE, 'utf8')) as Cache
}

await updatePreviews()

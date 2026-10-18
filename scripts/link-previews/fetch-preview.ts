import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { iconCandidates, pageTitle } from './html.ts'

const TIMEOUT_MS = 8000
const ICON_DIR = 'public/link-icons'
const HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,image/*;q=0.9,*/*;q=0.8',
}
const IMAGE_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/svg+xml': 'svg',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export interface Preview {
  title: string
  host: string
  icon: string | null
}

export async function fetchPreview(root: string, url: string) {
  const host = new URL(url).host.replace(/^www\./, '')
  const page = await get(url)
  if (!page) return warn(url)
  const html = await page.text()
  const icon = await saveIcon(root, host, iconSources(html, page.url, host))
  return { title: pageTitle(html) ?? host, host, icon } satisfies Preview
}

function iconSources(html: string, base: string, host: string) {
  return [
    ...iconCandidates(html, base),
    new URL('/favicon.ico', base).href,
    `https://www.google.com/s2/favicons?domain=${host}&sz=128`,
  ]
}

async function saveIcon(root: string, host: string, sources: string[]) {
  for (const source of sources) {
    const saved = await download(root, host, source)
    if (saved) return saved
  }
  return null
}

async function download(root: string, host: string, source: string) {
  const image = await getImage(source)
  if (!image) return null
  const file = `${host}.${image.extension}`
  mkdirSync(join(root, ICON_DIR), { recursive: true })
  writeFileSync(join(root, ICON_DIR, file), await image.response.bytes())
  return `/link-icons/${file}`
}

async function getImage(source: string) {
  const response = await get(source)
  return response ? withExtension(response) : null
}

function withExtension(response: Response) {
  const extension = IMAGE_TYPES[contentType(response)]
  return extension ? { response, extension } : null
}

function contentType(response: Response) {
  return (response.headers.get('content-type') ?? '').split(';')[0].trim()
}

async function get(url: string) {
  try {
    const response = await fetch(url, {
      headers: HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    return response.ok ? response : null
  } catch {
    return null
  }
}

function warn(url: string) {
  console.warn(`link-previews: could not fetch ${url}; using its host`)
  return null
}

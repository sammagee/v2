import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SCANNED = /\.(tsx|mdx)$/
const LINK_PATTERNS = [
  /href="(https?:\/\/[^"]+)"/g,
  /\]\((https?:\/\/[^)\s]+)\)/g,
]
const OWN_HOSTS = new Set(['sammagee.me', 'www.sammagee.me'])

export function collectUrls(root: string) {
  const urls = filesUnder(join(root, 'src')).flatMap(linksIn)
  return [...new Set(urls)].filter(isExternal).toSorted()
}

function filesUnder(dir: string): string[] {
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .flatMap((path) =>
      statSync(path).isDirectory() ? filesUnder(path) : [path]
    )
    .filter((path) => SCANNED.test(path))
}

function linksIn(path: string) {
  const text = readFileSync(path, 'utf8')
  return LINK_PATTERNS.flatMap((pattern) =>
    [...text.matchAll(pattern)].map((match) => match[1])
  )
}

function isExternal(url: string) {
  return !OWN_HOSTS.has(new URL(url).host)
}

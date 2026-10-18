const TITLE_PATTERNS = [
  /<title[^>]*>([^<]+)<\/title>/i,
  /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:title["']/i,
]
const ICON_RELS = ['apple-touch-icon', 'icon', 'shortcut icon']
const LINK_TAG = /<link\b[^>]*>/gi
const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  '#39': "'",
  nbsp: ' ',
}

export function pageTitle(html: string) {
  const title = TITLE_PATTERNS.map((pattern) => pattern.exec(html)?.[1]).find(
    Boolean
  )
  return title ? decodeEntities(title).replace(/\s+/g, ' ').trim() : null
}

export function iconCandidates(html: string, base: string) {
  const links = [...html.matchAll(LINK_TAG)].map((match) => match[0])
  return ICON_RELS.flatMap((rel) =>
    links.filter((tag) => relOf(tag) === rel).map((tag) => hrefOf(tag))
  )
    .filter((href): href is string => Boolean(href))
    .map((href) => new URL(decodeEntities(href), base).href)
}

function relOf(tag: string) {
  return /\brel=["']([^"']+)["']/i.exec(tag)?.[1].toLowerCase().trim()
}

function hrefOf(tag: string) {
  return /\bhref=["']([^"']+)["']/i.exec(tag)?.[1]
}

function decodeEntities(text: string) {
  return text.replace(
    /&(#?\w+);/g,
    (entity, name: string) => ENTITIES[name] ?? fromCodePoint(name) ?? entity
  )
}

function fromCodePoint(name: string) {
  const code = /^#x?([0-9a-f]+)$/i.exec(name)
  if (!code) return undefined
  return String.fromCodePoint(parseInt(code[1], name[1] === 'x' ? 16 : 10))
}

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { listPosts, type PostMeta } from '../../src/lib/posts.ts'
import { postPath, SITE_ORIGIN, SITE_URL } from '../../src/lib/site.ts'

const OUTPUT = join(process.cwd(), 'public', 'sitemap.xml')
const HOME_LASTMOD = '2026-10-18'

interface Entry {
  loc: string
  lastmod: string
}

function writeSitemap() {
  const posts = listPosts().filter((post) => !post.draft)
  const entries = [homeEntry(posts), ...posts.map(postEntry)]
  writeFileSync(OUTPUT, sitemapXml(entries))
  console.log(`sitemap.xml: ${entries.length} URL(s)`)
}

function homeEntry(posts: PostMeta[]): Entry {
  const dates = [HOME_LASTMOD, ...posts.map(lastModified)]
  return { loc: SITE_URL, lastmod: dates.toSorted().at(-1) }
}

function postEntry(post: PostMeta): Entry {
  return {
    loc: `${SITE_ORIGIN}${postPath(post.slug)}`,
    lastmod: lastModified(post),
  }
}

function lastModified(post: PostMeta) {
  return post.updated ?? post.date
}

function sitemapXml(entries: Entry[]) {
  const urls = entries.map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

writeSitemap()

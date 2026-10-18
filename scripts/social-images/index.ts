import { join } from 'node:path'

import { chromium } from 'playwright'

import { loadAssets } from './assets.ts'
import { avatarHtml, cardHtml } from './templates.ts'

const ROOT = process.cwd()
const OUTPUT_DIR = join(ROOT, 'public/images/social')
const ASSETS = loadAssets(ROOT)
const TARGETS = [
  { file: 'card.png', width: 1200, height: 630, html: cardHtml(ASSETS) },
  { file: 'avatar.png', width: 512, height: 512, html: avatarHtml(ASSETS) },
]

async function render() {
  const browser = await chromium.launch()
  for (const target of TARGETS) {
    const page = await browser.newPage({
      viewport: { width: target.width, height: target.height },
    })
    await page.setContent(target.html, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: join(OUTPUT_DIR, target.file) })
    console.log(`wrote public/images/social/${target.file}`)
  }
  await browser.close()
}

await render()

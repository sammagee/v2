import { readFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

export interface Assets {
  avatar: string
  vanta: string
}

export function loadAssets(root: string): Assets {
  return {
    avatar: dataUri(join(root, 'public/images/favicon.png')),
    vanta: dataUri(join(root, 'public/images/logos/round/vanta.png')),
  }
}

function dataUri(path: string) {
  const data = readFileSync(path).toString('base64')
  return `data:${MIME_TYPES[extname(path)]};base64,${data}`
}

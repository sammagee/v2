import { readdirSync, statSync } from 'node:fs'
import { join, sep } from 'node:path'

const SOURCE_EXTENSIONS = /\.(ts|tsx)$/
const SKIPPED = /\.d\.ts$/

export function listFiles(root: string, dir: string): string[] {
  return readdirSync(join(root, dir))
    .map((name) => join(dir, name))
    .flatMap((path) =>
      statSync(join(root, path)).isDirectory()
        ? listFiles(root, path)
        : [toPosix(path)]
    )
}

export function listDirectories(root: string, dir: string): string[] {
  return readdirSync(join(root, dir))
    .map((name) => join(dir, name))
    .filter((path) => statSync(join(root, path)).isDirectory())
    .map(toPosix)
}

export function isSource(path: string) {
  return SOURCE_EXTENSIONS.test(path) && !SKIPPED.test(path)
}

function toPosix(path: string) {
  return path.split(sep).join('/')
}

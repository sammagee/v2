import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { parseSync } from 'oxc-parser'

import type { SourceFile } from './types.ts'

export function parseFile(root: string, path: string): SourceFile {
  const source = readFileSync(join(root, path), 'utf8')
  const result = parseSync(path, source)
  const lineAt = lineLookup(source)
  const imports = result.module.staticImports.map((entry) => ({
    specifier: entry.moduleRequest.value,
    line: lineAt(entry.start),
  }))
  return { path, program: result.program, imports, lineAt }
}

function lineLookup(source: string) {
  const starts = [0]
  for (let index = 0; index < source.length; index++)
    if (source[index] === '\n') starts.push(index + 1)
  return (offset: number) =>
    starts.findLastIndex((start) => start <= offset) + 1
}

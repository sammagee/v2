import { isSource, listDirectories, listFiles } from './files.ts'
import { checkHooks } from './hooks.ts'
import { checkImports } from './imports.ts'
import { checkLayout } from './layout.ts'
import { checkOrder } from './order.ts'
import { parseFile } from './parse.ts'
import { checkPosts } from './posts.ts'
import type { Issue } from './types.ts'

const ROOT = process.cwd()
const ORDERED_DIRS = ['src', 'scripts']

function run(): Issue[] {
  const paths = listFiles(ROOT, 'src')
  const directories = listDirectories(ROOT, 'src/components')
  const postDirectories = listDirectories(ROOT, 'src/posts')
  const files = ORDERED_DIRS.flatMap((dir) => listFiles(ROOT, dir))
    .filter(isSource)
    .map((path) => parseFile(ROOT, path))
  return [
    ...checkLayout(paths.filter(isSource), directories),
    ...checkPosts(paths, postDirectories),
    ...files.flatMap((file) => [...checkOrder(file), ...checkHooks(file)]),
    ...checkImports(ROOT, files),
  ]
}

function report(issues: Issue[]) {
  issues
    .toSorted((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
    .forEach(({ file, line, message }) =>
      console.error(`${file}:${line}  ${message}`)
    )
  if (!issues.length) return 0
  console.error(`\n${issues.length} structure issue(s). See AGENTS.md.`)
  return 1
}

process.exitCode = report(run())

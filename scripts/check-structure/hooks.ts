import { declaredIds, exportedDeclaration } from './declarations.ts'
import type { Issue, SourceFile } from './types.ts'

const HOOK_NAME = /^use[A-Z0-9]/
const HOOK_HOMES = ['/hooks/', 'src/hooks/']

export function checkHooks(file: SourceFile): Issue[] {
  if (HOOK_HOMES.some((home) => file.path.includes(home))) return []
  return file.program.body
    .flatMap((node) => declaredIds(exportedDeclaration(node)))
    .filter((id) => HOOK_NAME.test(id.name ?? ''))
    .map(({ name, start }) => ({
      file: file.path,
      line: file.lineAt(start),
      message: `hook ${name} belongs in a hooks/ folder (src/hooks if shared)`,
    }))
}

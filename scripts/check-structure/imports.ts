import { existsSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'

import { postFolder } from './posts.ts'
import type { Issue, SourceFile } from './types.ts'

const ALIAS = '@/'
const COMPONENTS = 'src/components/'
const SHARED = ['src/lib/', 'src/hooks/']
const RESOLVE_SUFFIXES = ['', '.ts', '.tsx', '/index.ts', '/index.tsx']
const OWNERSHIP_MESSAGES = [
  () => 'shared module is unused; delete it',
  (owner: string) =>
    owner.startsWith(COMPONENTS)
      ? `only ${owner} uses this; colocate it in that component's lib/ or hooks/`
      : null,
  () => null,
]

interface Edge {
  from: SourceFile
  line: number
  target: string
}

export function checkImports(root: string, files: SourceFile[]): Issue[] {
  const edges = files.flatMap((file) => edgesOf(root, file))
  return [
    ...edges.flatMap(encapsulationIssues),
    ...edges.flatMap(postImportIssues),
    ...files.flatMap((file) => ownershipIssues(file, edges)),
  ]
}

function edgesOf(root: string, file: SourceFile): Edge[] {
  return file.imports.flatMap(({ specifier, line }) => {
    const target = resolve(root, file.path, specifier)
    return target ? [{ from: file, line, target }] : []
  })
}

function resolve(root: string, from: string, specifier: string) {
  const base = basePath(from, specifier)
  if (!base) return null
  const path = normalize(base)
  const suffix = RESOLVE_SUFFIXES.find((ending) => isFile(root, path + ending))
  return suffix === undefined ? null : path + suffix
}

function basePath(from: string, specifier: string) {
  return specifier.startsWith(ALIAS)
    ? join('src', specifier.slice(ALIAS.length))
    : specifier.startsWith('.') && join(dirname(from), specifier)
}

function isFile(root: string, path: string) {
  return /\.(ts|tsx)$/.test(path) && existsSync(join(root, path))
}

function componentFolder(path: string) {
  const [folder, ...rest] = path.slice(COMPONENTS.length).split('/')
  return path.startsWith(COMPONENTS) && rest.length ? folder : null
}

function encapsulationIssues(edge: Edge): Issue[] {
  const folder = privateFolder(edge)
  return folder ? [privateImportIssue(edge, folder)] : []
}

function privateFolder(edge: Edge) {
  const folder = componentFolder(edge.target)
  const crossesIn = [
    folder,
    edge.target !== `${COMPONENTS}${folder}/index.tsx`,
    componentFolder(edge.from.path) !== folder,
  ].every(Boolean)
  return crossesIn ? folder : null
}

function privateImportIssue(edge: Edge, folder: string): Issue {
  return {
    file: edge.from.path,
    line: edge.line,
    message: `import @/components/${folder} through its index.tsx; ${edge.target} is private to it`,
  }
}

function postImportIssues(edge: Edge): Issue[] {
  const folder = postFolder(edge.target)
  return folder && postFolder(edge.from.path) !== folder
    ? [
        {
          file: edge.from.path,
          line: edge.line,
          message: `${edge.target} belongs to ${folder}; only that post may import it`,
        },
      ]
    : []
}

function ownerOf(path: string) {
  const folder = componentFolder(path)
  return folder ? `${COMPONENTS}${folder}` : path
}

function ownershipIssues(file: SourceFile, edges: Edge[]): Issue[] {
  if (!SHARED.some((dir) => file.path.startsWith(dir))) return []
  const owners = new Set(
    edges
      .filter((edge) => edge.target === file.path)
      .map((edge) => ownerOf(edge.from.path))
  )
  const [only] = owners
  const message = OWNERSHIP_MESSAGES[Math.min(owners.size, 2)](only)
  return message ? [{ file: file.path, line: 1, message }] : []
}

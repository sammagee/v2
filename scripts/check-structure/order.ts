import { declaredIds, exportedDeclaration } from './declarations.ts'
import type { Issue, SourceFile } from './types.ts'

const TIERS = ['import', 'constant', 'type', 'function', 'statement'] as const
const TIER_LABELS: Record<Tier, string> = {
  import: 'imports',
  constant: 'constants',
  type: 'types',
  function: 'functions',
  statement: 'other statements',
}
const TIER_BY_TYPE: Record<string, Tier> = {
  ImportDeclaration: 'import',
  ExportAllDeclaration: 'import',
  TSImportEqualsDeclaration: 'import',
  TSTypeAliasDeclaration: 'type',
  TSInterfaceDeclaration: 'type',
  TSEnumDeclaration: 'type',
  TSModuleDeclaration: 'type',
  FunctionDeclaration: 'function',
  TSDeclareFunction: 'function',
  ClassDeclaration: 'function',
}
const TIER_RESOLVERS: Record<string, (declaration) => Tier> = {
  ...Object.fromEntries(
    Object.entries(TIER_BY_TYPE).map(([type, tier]) => [type, () => tier])
  ),
  VariableDeclaration: variableTier,
}
const FUNCTION_EXPRESSIONS = new Set([
  'ArrowFunctionExpression',
  'FunctionExpression',
])
const WRAPPER_EXPRESSIONS = new Set([
  'TSAsExpression',
  'TSSatisfiesExpression',
  'ParenthesizedExpression',
])

type Tier = (typeof TIERS)[number]

interface Entry {
  tier: Tier
  line: number
  names: string[]
  exported: boolean
  isDefault: boolean
}

export function checkOrder(file: SourceFile): Issue[] {
  const entries = file.program.body.map((node) => toEntry(file, node))
  return [...tierIssues(file.path, entries), ...mainExportIssues(file, entries)]
}

function toEntry(file: SourceFile, node): Entry {
  const declaration = exportedDeclaration(node)
  return {
    tier: tierOf(node, declaration),
    line: file.lineAt(node.start),
    names: namesOf(declaration),
    exported: declaration !== node,
    isDefault: node.type === 'ExportDefaultDeclaration',
  }
}

function tierOf(node, declaration): Tier {
  if (isImportLike(node)) return 'import'
  return (TIER_RESOLVERS[declaration.type] ?? statementTier)(declaration)
}

function isImportLike(node) {
  return Boolean(node.directive || node.source)
}

function variableTier(declaration): Tier {
  return isFunctionVariable(declaration) ? 'function' : 'constant'
}

function statementTier(): Tier {
  return 'statement'
}

function isFunctionVariable(declaration) {
  return declaration.declarations.every((declarator) =>
    FUNCTION_EXPRESSIONS.has(unwrap(declarator.init)?.type)
  )
}

function unwrap(expression) {
  return WRAPPER_EXPRESSIONS.has(expression?.type)
    ? unwrap(expression.expression)
    : expression
}

function namesOf(declaration): string[] {
  return declaredIds(declaration).map((id) => id.name)
}

function tierIssues(path: string, entries: Entry[]): Issue[] {
  return entries.flatMap((entry, index) => {
    const later = entries
      .slice(0, index)
      .find((previous) => rank(previous) > rank(entry))
    return later ? [misordered(path, entry, later)] : []
  })
}

function rank(entry: Entry) {
  return TIERS.indexOf(entry.tier)
}

function misordered(path: string, entry: Entry, before: Entry): Issue {
  return {
    file: path,
    line: entry.line,
    message: `${TIER_LABELS[entry.tier]} must come before ${TIER_LABELS[before.tier]} (line ${before.line}); order is imports, constants, types, functions`,
  }
}

function mainExportIssues(file: SourceFile, entries: Entry[]): Issue[] {
  const functions = entries.filter((entry) => entry.tier === 'function')
  const main = mainExport(file.path, functions)
  return !main || functions[0] === main
    ? []
    : [mainExportIssue(file.path, main, functions[0])]
}

function mainExportIssue(path: string, main: Entry, first: Entry): Issue {
  return {
    file: path,
    line: main.line,
    message: `main export ${main.names[0] ?? 'default'} must be the first function (line ${first.line})`,
  }
}

function mainExport(path: string, functions: Entry[]) {
  const expected = expectedNames(path)
  return (
    functions.find((entry) => entry.isDefault) ??
    functions.find(
      (entry) =>
        entry.exported && entry.names.some((name) => expected.has(name))
    ) ??
    functions.find((entry) => entry.exported)
  )
}

function expectedNames(path: string) {
  const segments = path.replace(/\.(ts|tsx)$/, '').split('/')
  const base = segments.at(-1) === 'index' ? segments.at(-2) : segments.at(-1)
  const camel = base.replace(/-([a-z0-9])/g, (_, letter) =>
    letter.toUpperCase()
  )
  return new Set([camel, camel[0].toUpperCase() + camel.slice(1)])
}

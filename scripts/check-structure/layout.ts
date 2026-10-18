import type { Issue } from './types.ts'

const COMPONENTS = 'src/components/'
const COMPONENT_HOMES = ['src/components/', 'src/pages/', 'src/posts/']
const ENTRY = 'index.tsx'
const KEBAB_FILE = /^[a-z0-9]+(-[a-z0-9]+)*\.(ts|tsx)$/
const HOOK_FILE = /^use(-[a-z0-9]+)+\.ts$/
const LIB_FILE = /^[a-z0-9]+(-[a-z0-9]+)*\.ts$/
const SHARED_RULES: Record<string, Rule> = {
  'src/lib/': { pattern: LIB_FILE, hint: 'kebab-case .ts files' },
  'src/hooks/': { pattern: HOOK_FILE, hint: 'use-*.ts files' },
}
const FOLDER_RULES: Record<string, Rule> = {
  hooks: { pattern: HOOK_FILE, hint: 'use-*.ts files' },
  lib: { pattern: LIB_FILE, hint: 'kebab-case .ts files' },
}
const SEGMENT_CHECKS: Record<
  number,
  (path: string, segments: string[]) => Issue[]
> = {
  1: (path, [name]) => componentFileIssues(path, name),
  2: (path, [, name]) => componentFileIssues(path, name),
  3: (path, [, folder, name]) => helperIssues(path, folder, name),
}
const FOLDER_CHECKS: FolderCheck[] = [
  {
    fails: (dir) => dir.endsWith('/ui'),
    message: 'no ui/ folder; shadcn installs into src/components',
  },
  {
    fails: (dir, files) => !files.includes(`${dir}/${ENTRY}`),
    message: `component folders need an ${ENTRY} entry`,
  },
  {
    fails: (_, files) => files.length < 2,
    message: 'single-file components live at src/components/<name>.tsx',
  },
]

interface Rule {
  pattern: RegExp
  hint: string
}

interface FolderCheck {
  fails: (dir: string, files: string[]) => boolean
  message: string
}

export function checkLayout(paths: string[], directories: string[]): Issue[] {
  return [
    ...paths.flatMap(componentHomeIssues),
    ...paths.flatMap(sharedIssues),
    ...paths.flatMap(componentIssues),
    ...directories.flatMap((dir) => folderIssues(dir, paths)),
  ]
}

function issue(file: string, message: string): Issue {
  return { file, line: 1, message }
}

function componentHomeIssues(path: string) {
  const misplaced =
    path.endsWith('.tsx') &&
    !COMPONENT_HOMES.some((home) => path.startsWith(home))
  return misplaced
    ? [issue(path, 'React components must live in src/components')]
    : []
}

function sharedIssues(path: string) {
  const home = Object.keys(SHARED_RULES).find((dir) => path.startsWith(dir))
  return home
    ? ruleIssues(path, path.slice(home.length), SHARED_RULES[home])
    : []
}

function ruleIssues(path: string, name: string, rule: Rule) {
  return rule.pattern.test(name)
    ? []
    : [issue(path, `only ${rule.hint} belong here, with no subfolders`)]
}

function componentIssues(path: string) {
  if (!path.startsWith(COMPONENTS)) return []
  const segments = path.slice(COMPONENTS.length).split('/')
  const check = SEGMENT_CHECKS[segments.length] ?? tooDeep
  return check(path, segments)
}

function tooDeep(path: string) {
  return [
    issue(path, 'component folders hold only hooks/ and lib/, one level deep'),
  ]
}

function componentFileIssues(path: string, name: string) {
  return name.endsWith('.tsx') && KEBAB_FILE.test(name)
    ? []
    : [
        issue(
          path,
          'component files are kebab-case .tsx; put hooks in hooks/ and helpers in lib/'
        ),
      ]
}

function helperIssues(path: string, folder: string, name: string) {
  const rule = FOLDER_RULES[folder]
  return rule
    ? ruleIssues(path, name, rule)
    : [issue(path, `"${folder}/" is not allowed; use hooks/ or lib/`)]
}

function folderIssues(dir: string, paths: string[]) {
  const files = paths.filter((path) => path.startsWith(`${dir}/`))
  return FOLDER_CHECKS.filter((check) => check.fails(dir, files)).map((check) =>
    issue(dir, check.message)
  )
}

import type { Issue } from './types.ts'

const POSTS = 'src/posts/'
const POST_FILE = 'post.mdx'
const POST_ENTRY =
  /^src\/posts\/[a-z0-9]+(-[a-z0-9]+)*\/(post\.mdx|[a-z0-9]+(-[a-z0-9]+)*\.tsx?)$/

export function checkPosts(paths: string[], directories: string[]): Issue[] {
  return [
    ...paths.flatMap(postFileIssues),
    ...directories.flatMap((dir) => postFolderIssues(dir, paths)),
  ]
}

export function isPostFile(path: string) {
  return path.startsWith(POSTS)
}

export function postFolder(path: string) {
  return isPostFile(path) ? path.split('/').slice(0, 3).join('/') : null
}

function issue(file: string, message: string): Issue {
  return { file, line: 1, message }
}

function postFileIssues(path: string): Issue[] {
  if (!isPostFile(path)) return strayMdxIssues(path)
  return POST_ENTRY.test(path)
    ? []
    : [
        issue(
          path,
          `posts are src/posts/<kebab-slug>/${POST_FILE} plus kebab-case .ts/.tsx files beside it, with no subfolders`
        ),
      ]
}

function strayMdxIssues(path: string) {
  return path.endsWith('.mdx')
    ? [issue(path, `MDX lives only in src/posts/<slug>/${POST_FILE}`)]
    : []
}

function postFolderIssues(dir: string, paths: string[]) {
  return paths.includes(`${dir}/${POST_FILE}`)
    ? []
    : [issue(dir, `post folders need a ${POST_FILE}`)]
}

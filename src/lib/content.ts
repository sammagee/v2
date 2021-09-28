import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'

export enum Content {
  Education = 'education',
  Positions = 'positions',
  Posts = 'posts',
  Projects = 'projects',
  Skills = 'skills',
}

interface ProcessDataOptions {
  type: Content
  slug: string
  withDescription?: boolean
}

export const processData = async ({
  type,
  slug,
  withDescription = false,
}: ProcessDataOptions) => {
  const fullPath = path.join(getPath(type), `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  if (withDescription) {
    const processedDescription = await remark()
      .use(html)
      .process(matterResult.data.description)

    return { matterResult, processedContent, processedDescription }
  }

  return { matterResult, processedContent }
}

export const getPath = (type: Content) =>
  path.join(process.cwd(), `content/${type}`)

export const getAllSlugs = (type: Content) => {
  const fileNames = fs.readdirSync(getPath(type))

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export * from './education'
export * from './positions'
export * from './posts'
export * from './projects'
export * from './skills'

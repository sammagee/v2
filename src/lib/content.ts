import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const AVG_WPM = 200;

const getPath = (type: string) => path.join(process.cwd(), `content/${type}`)

const parseData = async(type: string, slug: string) => {
  const fullPath = path.join(getPath(type), `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const processedDescription = await remark()
    .use(html)
    .process(matterResult.data.description)
  const matterData = {
    positions: matterResult.data as Position,
    posts: matterResult.data as Post,
    projects: matterResult.data as Project,
  }[type]
  const contentLength = processedContent.toString().split(' ').length
  const readTime = `${Math.ceil(contentLength / AVG_WPM)} min read`

  return {
    contentHtml: processedContent.toString(),
    descriptionHtml: processedDescription.toString(),
    readTime,
    ...matterData,
  }
}

export const getSortedData = async(type: string) => {
  const fileNames = fs.readdirSync(getPath(type))
  const allData = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const content = await parseData(type, slug)

    return { slug, ...content }
  }))

  return allData.filter(item => !item.draft).sort((a, b) => {
    if (a.date < b.date) return 1
    else return -1
  })
}

export const getAllSlugs = (type: string) => {
  const fileNames = fs.readdirSync(getPath(type))

  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      }
    }
  })
}

export const getData = async(type, slug) => ({ ...(await parseData(type, slug)) })

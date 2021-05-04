import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

function getPath(type: string) {
  return path.join(process.cwd(), `content/${type}`)
}

async function parseData(type: string, id: string) {
  const fullPath = path.join(getPath(type), `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const processedDescription = await remark()
    .use(html)
    .process(matterResult.data.description)

  return {
    contentHtml: processedContent.toString(),
    descriptionHtml: processedDescription.toString(),
    ...(matterResult.data as { date: string, description: string, link: string, git: string, title: string, tags: string }),
    image: `/images/${type}/${matterResult.data.image}`,
  }
}

export async function getSortedData(type: string) {
  const fileNames = fs.readdirSync(getPath(type))
  const allData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const content = await parseData(type, id)

    return { id, ...content }
  }))

  return allData.sort((a, b) => {
    if (a.date < b.date) return 1
    else return -1
  })
}

export function getAllIds(type: string) {
  const fileNames = fs.readdirSync(getPath(type))

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      }
    }
  })
}

export async function getData(type, id) {
  const content = await parseData(type, id)

  return { ...content }
}

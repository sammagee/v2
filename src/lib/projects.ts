import fs from 'fs'
import { Content, getPath, processData } from './content'

export const getProject = async (slug: string) => {
  const { matterResult, processedContent, processedDescription } =
    await processData({ type: Content.Projects, slug, withDescription: true })
  const matterData = <Project>matterResult.data

  return {
    contentHtml: processedContent.toString(),
    descriptionHtml: processedDescription.toString(),
    ...matterData,
  }
}

export const getProjects = async () => {
  const fileNames = fs.readdirSync(getPath(Content.Projects))
  const allData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const content = await getProject(slug)

      return { slug, ...content }
    })
  )

  return allData
    .filter((item) => !item.draft)
    .sort((a, b) => {
      if (a.date < b.date) return 1
      else return -1
    })
}

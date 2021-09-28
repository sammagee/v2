import fs from 'fs'
import { Content, getPath, processData } from './content'

export const getPosition = async (slug: string) => {
  const { matterResult, processedContent, processedDescription } =
    await processData({ type: Content.Positions, slug, withDescription: true })
  const matterData = <Position>matterResult.data

  return {
    contentHtml: processedContent.toString(),
    descriptionHtml: processedDescription.toString(),
    ...matterData,
  }
}

export const getPositions = async () => {
  const fileNames = fs.readdirSync(getPath(Content.Positions))
  const allData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const content = await getPosition(slug)

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

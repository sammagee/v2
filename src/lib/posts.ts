import fs from 'fs'
import { Content, getPath, processData } from './content'

export const AVG_WPM = 200

export const getPost = async (slug: string) => {
  const { matterResult, processedContent, processedDescription } =
    await processData({ type: Content.Posts, slug, withDescription: true })
  const matterData = matterResult.data as Post
  const contentLength = processedContent.toString().split(' ').length
  const readTime = `${Math.ceil(contentLength / AVG_WPM)} min read`

  return {
    contentHtml: processedContent.toString(),
    descriptionHtml: processedDescription.toString(),
    readTime,
    ...matterData,
  }
}

export const getPosts = async () => {
  const fileNames = fs.readdirSync(getPath(Content.Posts))
  const allData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const content = await getPost(slug)

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

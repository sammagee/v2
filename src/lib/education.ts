import fs from 'fs'
import { Content, getPath, processData } from './content'

export const getSchool = async (slug: string) => {
  const { matterResult } = await processData({ type: Content.Education, slug })

  return matterResult.data as School
}

export const getSchools = async () => {
  const fileNames = fs.readdirSync(getPath(Content.Education))
  const allData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const content = await getSchool(slug)

      return { slug, ...content }
    })
  )

  return allData.sort((a, b) => {
    if (a.endDate < b.endDate) return 1
    else return -1
  })
}

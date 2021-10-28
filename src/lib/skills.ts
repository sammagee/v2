import { Content, processData } from './content'

export const getSkills = async () => {
  const { matterResult } = await processData({
    type: Content.Skills,
    slug: 'skills',
    withDescription: true,
  })

  return matterResult.data as Skills
}

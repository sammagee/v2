import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const positionsDir = path.join(process.cwd(), 'content/positions')

export const getPositions = (): Position[] =>
  fs
    .readdirSync(positionsDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const { data } = matter(
        fs.readFileSync(path.join(positionsDir, fileName), 'utf8')
      )

      return { slug: fileName.replace(/\.md$/, ''), ...data } as Position
    })
    .filter((position) => !position.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

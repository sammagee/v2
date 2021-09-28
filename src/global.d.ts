type Position = {
  company: string
  companyLink: string
  companyLogo: string
  title: string
  date: string
  draft?: boolean
  endDate: string
  featured: boolean
  location: string
  duties: string[]
}

type Post = {
  author: string
  contentHtml: string
  date: string
  description: string
  draft?: boolean
  number: number
  readTime: string
  slug: string
  tags: string
  title: string
}

type Project = {
  contentHtml: string
  date: string
  description: string
  descriptionHtml: string
  draft?: boolean
  featured: boolean
  git: string
  image: string
  link: string
  points?: string[]
  slug: string
  tags: string
  title: string
}

type School = {
  name: string
  endDate: string
  location: string
  points: string[]
}

type Skills = Record<string, string[]>

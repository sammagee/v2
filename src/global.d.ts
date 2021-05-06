type Position = {
  company: string
  companyLink: string
  companyLogo: string
  title: string
  date: string
  draft?: boolean
  endDate: string
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
  link: string
  slug: string
  tags: string
  title: string
}

type Position = {
  company: string
  companyLink: string
  title: string
  date: string
  endDate: string
  location: string
  duties: string[]
}

type Post = {
  author: string
  contentHtml: string
  date: string
  description: string
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
  featured: boolean
  git: string
  link: string
  slug: string
  tags: string
  title: string
}

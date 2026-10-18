import { createContext } from 'react'

export const PostLinksContext = createContext<Record<string, PostSummary>>({})

export interface PostSummary {
  title: string
  subtitle: string | null
}

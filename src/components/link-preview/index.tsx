import Link from 'next/link'
import type { ComponentProps } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

import { ExternalCard } from './external-card'
import { linkPreview } from './lib/previews'
import { PostCard } from './post-card'

const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }
const CARD = 'max-w-80 px-3.5 py-1.5'

type AnchorProps = ComponentProps<'a'> & { href: string }

export function ExternalLink({ href, children, ...props }: AnchorProps) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger render={<a href={href} {...NEW_TAB} {...props} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent className={CARD}>
        <ExternalCard preview={linkPreview(href)} />
      </TooltipContent>
    </Tooltip>
  )
}

export function PostLink({
  href,
  title,
  subtitle,
  children,
  ...props
}: AnchorProps & { title: string; subtitle: string | null }) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger render={<Link href={href} {...props} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent className={CARD}>
        <PostCard title={title} subtitle={subtitle} />
      </TooltipContent>
    </Tooltip>
  )
}

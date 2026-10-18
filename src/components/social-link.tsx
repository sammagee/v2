import type { ReactNode } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const opensInNewTab = (href: string) => !href.startsWith('mailto:')

const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }

export function SocialLink({
  href,
  hint,
  children,
}: {
  href: string
  hint: string
  children: ReactNode
}) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger
        render={<a href={href} {...(opensInNewTab(href) ? NEW_TAB : {})} />}
      >
        {children}
        <span className="sr-only"> ({hint})</span>
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  )
}

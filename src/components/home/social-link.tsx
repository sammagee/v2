import type { ReactNode } from 'react'

import { ExternalLink } from '@/components/link-preview'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

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
  const label = (
    <>
      {children}
      <span className="sr-only"> ({hint})</span>
    </>
  )
  if (href.startsWith('https://'))
    return <ExternalLink href={href}>{label}</ExternalLink>
  return <HintLink href={href} hint={hint} label={label} />
}

function HintLink({
  href,
  hint,
  label,
}: {
  href: string
  hint: string
  label: ReactNode
}) {
  return (
    <Tooltip trackCursorAxis="both">
      <TooltipTrigger
        render={<a href={href} {...(opensInNewTab(href) ? NEW_TAB : {})} />}
      >
        {label}
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  )
}

function opensInNewTab(href: string) {
  return !href.startsWith('mailto:')
}

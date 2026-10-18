import Link from 'next/link'
import type { ComponentProps } from 'react'

import { useMdxContent } from './hooks/use-mdx-content'

const COMPONENTS = { a: MdxLink, h1: 'h2' } as const
const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }
const IN_PAGE_OR_SITE = /^[/#]/

export function MdxContent({ code }: { code: string }) {
  return useMdxContent(code, COMPONENTS)
}

function MdxLink({ href = '', children, ...props }: ComponentProps<'a'>) {
  const Anchor = href.startsWith('/') ? Link : 'a'
  return (
    <Anchor href={href} {...newTabProps(href)} {...props}>
      {children}
    </Anchor>
  )
}

function newTabProps(href: string) {
  return IN_PAGE_OR_SITE.test(href) ? {} : NEW_TAB
}

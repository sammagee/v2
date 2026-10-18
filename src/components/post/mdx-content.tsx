import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ComponentProps } from 'react'

import { SITE_ORIGIN } from '@/lib/site'
import { cn } from '@/lib/utils'

import { useMdxContent } from './hooks/use-mdx-content'

const COMPONENTS = { a: MdxLink, h1: 'h2' } as const
const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }
const IN_PAGE_OR_SITE = /^[/#]/
const ABSOLUTE_HTTP = /^https?:\/\//i
const OWN_HOSTS = new Set([new URL(SITE_ORIGIN).host, 'www.sammagee.me'])
const EXTERNAL = {
  className: 'external-link',
  icon: <ArrowUpRight aria-hidden="true" />,
}
const NOT_EXTERNAL = { className: undefined, icon: null }

export function MdxContent({ code }: { code: string }) {
  return useMdxContent(code, COMPONENTS)
}

function MdxLink({ href = '', ...props }: ComponentProps<'a'>) {
  return href.startsWith('/') ? (
    <Link href={href} {...props} />
  ) : (
    <PlainLink href={href} {...props} />
  )
}

function PlainLink({
  href,
  children,
  className,
  ...props
}: ComponentProps<'a'> & { href: string }) {
  const decor = decorFor(href)
  return (
    <a
      href={href}
      {...newTabProps(href)}
      {...props}
      className={cn(decor.className, className)}
    >
      {children}
      {decor.icon}
    </a>
  )
}

function decorFor(href: string) {
  return isExternal(href) ? EXTERNAL : NOT_EXTERNAL
}

function newTabProps(href: string) {
  return IN_PAGE_OR_SITE.test(href) ? {} : NEW_TAB
}

function isExternal(href: string) {
  return ABSOLUTE_HTTP.test(href) && !OWN_HOSTS.has(new URL(href).host)
}

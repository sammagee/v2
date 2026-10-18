import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useContext, type ComponentProps } from 'react'

import { ExternalLink, PostLink } from '@/components/link-preview'
import { SITE_ORIGIN } from '@/lib/site'
import { cn } from '@/lib/utils'

import { useMdxContent } from './hooks/use-mdx-content'
import { PostLinksContext } from './lib/post-links'

const COMPONENTS = { a: MdxLink, h1: 'h2' } as const
const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }
const IN_PAGE = /^#/
const ABSOLUTE_HTTP = /^https?:\/\//i
const OWN_HOSTS = new Set([new URL(SITE_ORIGIN).host, 'www.sammagee.me'])

type LinkProps = ComponentProps<'a'> & { href: string }

export function MdxContent({ code }: { code: string }) {
  return useMdxContent(code, COMPONENTS)
}

function MdxLink({ href = '', ...props }: ComponentProps<'a'>) {
  return href.startsWith('/') ? (
    <SiteLink href={href} {...props} />
  ) : (
    <OffsiteLink href={href} {...props} />
  )
}

function OffsiteLink({ href, children, ...props }: LinkProps) {
  if (isExternal(href))
    return (
      <OutboundLink href={href} {...props}>
        {children}
      </OutboundLink>
    )
  return (
    <a href={href} {...newTabProps(href)} {...props}>
      {children}
    </a>
  )
}

function SiteLink({ href, ...props }: LinkProps) {
  const post = useContext(PostLinksContext)[href]
  if (!post) return <Link href={href} {...props} />
  return (
    <PostLink
      href={href}
      title={post.title}
      subtitle={post.subtitle}
      {...props}
    />
  )
}

function OutboundLink({ href, children, className, ...props }: LinkProps) {
  return (
    <ExternalLink
      href={href}
      {...props}
      className={cn('external-link', className)}
    >
      {children}
      <ArrowUpRight aria-hidden="true" />
    </ExternalLink>
  )
}

function newTabProps(href: string) {
  return IN_PAGE.test(href) ? {} : NEW_TAB
}

function isExternal(href: string) {
  return ABSOLUTE_HTTP.test(href) && !OWN_HOSTS.has(new URL(href).host)
}

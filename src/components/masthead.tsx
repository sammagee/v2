import Link from 'next/link'

export function Masthead({
  title,
  subtitle,
  href,
  heading: Heading = 'h1',
}: {
  title: string
  subtitle: string | null
  href?: string
  heading?: 'h1' | 'p'
}) {
  return (
    <div className="flex flex-col items-start">
      <Heading className="font-medium">
        <TitleText title={title} href={href} />
      </Heading>
      {subtitle && (
        <span className="leading-none font-medium text-gray-1100">
          {subtitle}
        </span>
      )}
    </div>
  )
}

function TitleText({ title, href }: { title: string; href?: string }) {
  if (!href) return title
  return (
    <Link href={href} className="inline-block no-underline">
      {title}
    </Link>
  )
}

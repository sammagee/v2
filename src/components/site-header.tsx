import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="mb-21 flex flex-col items-start md:mb-14">
      <Link href="/" className="inline-block font-medium no-underline">
        Sam Magee
      </Link>
      <span className="leading-none font-medium text-gray-1100">
        Senior Software Engineer
      </span>
    </header>
  )
}

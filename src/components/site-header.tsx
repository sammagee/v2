import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="mb-21 flex flex-col items-start md:mb-14">
      <h1 className="font-medium">
        <Link href="/" className="inline-block no-underline">
          Sam Magee
        </Link>
      </h1>
      <span className="leading-none font-medium text-gray-1100">
        Senior Software Engineer
      </span>
    </header>
  )
}

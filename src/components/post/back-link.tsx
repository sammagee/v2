import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BackLink() {
  return (
    <Link
      href="/"
      className="group absolute bottom-full mb-10 inline-flex items-baseline gap-[0.3em] text-gray-1000 no-underline transition-colors duration-150 hover:text-gray-1200 focus-visible:text-gray-1200"
    >
      <ArrowLeft aria-hidden="true" className="size-[1em] self-center" />
      <span>
        <span className="link-dotted">Back</span>
      </span>
    </Link>
  )
}

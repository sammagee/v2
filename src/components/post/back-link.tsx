import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BackLink() {
  return (
    <Link
      href="/"
      className="absolute bottom-full mb-6 -ml-[1.3em] inline-flex items-center gap-[0.3em] text-gray-1000 no-underline focus-visible:text-gray-1200"
    >
      <ArrowLeft aria-hidden="true" className="size-[1em]" />
      Back
    </Link>
  )
}

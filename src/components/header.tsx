import clsx from 'clsx'
import Link from 'next/link'
import useScrollDirection from '../hooks/useScrollDirection'
import AnchorButton from './anchor-button'
import Button from './button'
import Image from './image'
import MobileNav from './mobile-nav'

const HEADER_HEIGHT = 96

export default function Header() {
  const [scrollPos, direction] = useScrollDirection()

  const scrollToContent = () => {
    const contentEl = document.getElementById('content')
    contentEl.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={clsx(
        'fixed z-20 top-0 flex items-center justify-between w-full pl-7 pr-12 h-24 bg-transparent bg-dots transform transition ease-in-out duration-500',
        direction.isUp &&
          scrollPos > HEADER_HEIGHT &&
          'shadow-xl translate-y-0 backdrop-filter backdrop-blur backdrop-brightness-100',
        direction.isDown &&
          scrollPos > HEADER_HEIGHT &&
          'shadow-xl -translate-y-full backdrop-filter backdrop-blur backdrop-brightness-100'
      )}
      role="banner"
    >
      <span className="absolute left-0 z-20 inline-flex transition duration-200 ease-in-out origin-left transform -translate-x-full bg-gray-900 rounded-lg focus-within:translate-x-8">
        <Button onClick={scrollToContent}>Scroll to Content</Button>
      </span>

      <AnchorButton className="p-3 group" href="/" intent="secondary" icon>
        <div className="relative w-12 h-12 transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:-rotate-3">
          <Image
            className="relative pointer-events-none select-none"
            containerClassName={(isLoaded) =>
              clsx(
                'w-full transition-opacity duration-250 ease-in',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )
            }
            src="/images/me.png"
            alt="me"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </AnchorButton>

      <nav className="items-center hidden space-x-6 sm:flex">
        <Link href="/#work">
          <a className="font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500">
            <span className="font-mono opacity-25 text-brand-500">01.</span>{' '}
            Work
          </a>
        </Link>

        <Link href="/#words">
          <a className="font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500">
            <span className="font-mono opacity-25 text-brand-500">02.</span>{' '}
            Words
          </a>
        </Link>

        <Link href="/#where">
          <a className="font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500">
            <span className="font-mono opacity-25 text-brand-500">03.</span>{' '}
            Where
          </a>
        </Link>
      </nav>

      <MobileNav />
    </header>
  )
}

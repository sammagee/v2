import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx';
import useScrollDirection from '../hooks/useScrollDirection'
import MobileNav from './mobile-nav';

const HEADER_HEIGHT = 96;

export default function Header({ home = false }) {
  const [scrollPos, direction] = useScrollDirection()

  return (
    <header
      className={clsx(
        'fixed z-20 top-0 flex items-center justify-between w-full pl-7 pr-12 h-24 bg-gray-900 transform transition ease-in-out duration-500',
        direction.isUp && scrollPos > HEADER_HEIGHT && 'shadow-xl translate-y-0 bg-opacity-75 backdrop-filter backdrop-blur',
        direction.isDown && scrollPos > HEADER_HEIGHT && 'shadow-xl -translate-y-full bg-opacity-75 backdrop-filter backdrop-blur',
      )}
      role="banner"
    >
      <span className="absolute left-0 z-20 inline-flex transition duration-200 ease-in-out origin-left transform -translate-x-full bg-gray-900 rounded-lg focus-within:translate-x-8">
        <a href="#content" className="inline-flex items-center justify-center h-12 px-5 font-semibold transition-colors duration-200 ease-in-out border-2 rounded-lg hover:bg-brand-400 focus:bg-brand-400 hover:bg-opacity-10 focus:bg-opacity-10 hover:scale-105 border-brand-400 text-brand-400 active:scale-100 focus:outline-none focus:border-dashed">
          Scroll to Content
        </a>
      </span>

      <Link href="/">
        <a className="relative flex items-center flex-shrink-0 p-3 space-x-3 transition-colors duration-200 ease-in-out border-2 border-transparent border-dashed rounded-full focus:bg-gray-500 focus:bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-10 focus:outline-none focus:border-brand-500 focus:border-2 group">
          <div className="relative w-12 h-12 transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:-rotate-3">
            <Image
              className="pointer-events-none select-none"
              src="/images/me.png"
              alt="me"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </a>
      </Link>

      <nav className="items-center hidden space-x-6 sm:flex">
        <Link href="/#work">
          <a className="font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus:border-brand-500">
            <span className="font-mono opacity-25 text-brand-500">01.</span>{' '}
            Work
          </a>
        </Link>

        <Link href="/#words">
          <a className="font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus:border-brand-500">
            <span className="font-mono opacity-25 text-brand-500">02.</span>{' '}
            Words
          </a>
        </Link>

        <Link href="/#where">
          <a className="font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus:border-brand-500">
            <span className="font-mono opacity-25 text-brand-500">03.</span>{' '}
            Where
          </a>
        </Link>
      </nav>

      <MobileNav />
    </header>
  )
}

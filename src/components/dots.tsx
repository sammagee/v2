import clsx from 'clsx'
import Image from './image'

export default function Dots() {
  return (
    <Image
      alt="Logo Dots"
      aria-hidden="true"
      className="relative w-full pointer-events-none select-none"
      containerClassName={(isLoaded) =>
        clsx(
          'absolute z-0 -right-32 -top-20 w-[32rem] -bottom-20 transition-opacity duration-1000 ease-in',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )
      }
      layout="fill"
      objectFit="contain"
      src="/images/dots.svg"
    />
  )
}

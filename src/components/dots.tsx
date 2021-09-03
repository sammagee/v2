import clsx from 'clsx'
import Image from './image'

export default function Dots() {
  return (
    <Image
      className="pointer-events-none select-none transform w-full scale-x-[-1]"
      containerClassName={isLoaded => clsx('absolute z-0 -right-32 -top-20 w-[32rem] -bottom-20 transition-opacity duration-1000 ease-in', isLoaded ? 'opacity-100' : 'opacity-0')}
      layout="fill"
      objectFit="contain"
      src="/images/dots.svg"
    />
  )
}

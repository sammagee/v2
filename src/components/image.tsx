import { Transition } from '@headlessui/react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { Fragment, useState } from 'react'

interface IImageProps {
  containerClassName?: ((isLoaded: boolean) => string) | string
  showLoadingIndicator?: boolean
}

type ImageProps = IImageProps & NextImageProps

export default function Image({
  containerClassName,
  showLoadingIndicator,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div>
      <div
        className={
          typeof containerClassName === 'function'
            ? containerClassName(isLoaded)
            : containerClassName
        }
      >
        <NextImage
          onLoad={(event) =>
            (event.target as HTMLImageElement).src.indexOf(
              'data:image/gif;base64'
            ) < 0 && setIsLoaded(true)
          }
          {...props}
        />
      </div>

      {showLoadingIndicator && (
        <Transition
          as={Fragment}
          show={!isLoaded}
          enter="transition-opacity duration-500 ease-in"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <svg
            className="absolute flex-shrink-0 w-5 h-5 text-brand-100 animate-spin bottom-3 right-3"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </Transition>
      )}
    </div>
  )
}

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import AnchorButton from './anchor-button'
import Button from './button'
import Image from './image'
import Tooltip from './tooltip'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const initialFocusRef = useRef(null)

  function close() {
    setIsOpen(false)
  }

  return (
    <div className="relative sm:hidden">
      <Button
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="relative flex items-center justify-center -mr-3 select-none w-14 h-14"
        intent="secondary"
        onClick={() => setIsOpen(true)}
        icon
      >
        <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
          <span
            className={clsx(
              'h-0.5 w-6 block rounded-full transition-transform transform duration-200 ease-in-out bg-current',
              isOpen ? 'translate-y-px rotate-45' : 'rotate-0 -translate-y-1'
            )}
          />

          <span
            className={clsx(
              'h-0.5 w-6 block rounded-full transition-transform transform duration-200 ease-in-out bg-current',
              isOpen ? '-translate-y-px -rotate-45' : 'rotate-0 translate-y-1'
            )}
          />
        </div>
      </Button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="sm:hidden"
          static
          open={isOpen}
          onClose={() => setIsOpen(false)}
          initialFocus={initialFocusRef}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-20 w-screen h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur">
              <AnchorButton
                className="absolute z-50 top-2.5 left-7 p-3 group"
                href="/"
                intent="secondary"
                icon
              >
                <div className="relative object-contain transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:-rotate-3">
                  <Image
                    className="relative object-contain pointer-events-none select-none"
                    containerClassName={(isLoaded) =>
                      clsx(
                        'relative w-12 h-12 transition-opacity duration-250 ease-in',
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      )
                    }
                    src="/images/me.png"
                    alt="me"
                    sizes="48px"
                    fill
                  />
                </div>
              </AnchorButton>
            </Dialog.Overlay>
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 translate-x-full"
            enterTo="transform opacity-100 translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 translate-x-0"
            leaveTo="transform opacity-0 translate-x-full"
          >
            <div className="shadow-xl pb-safe-bottom z-20 fixed inset-y-0 right-0 w-full max-w-[calc(100vw-8.5rem)] h-full origin-right bg-transparent backdrop-filter backdrop-blur backdrop-brightness-100 bg-dots">
              <div className="flex flex-col h-full overflow-hidden outline-none">
                <div className="flex items-center justify-between w-full px-6 py-5 xs:px-12">
                  <Dialog.Title className="text-2xl font-semibold text-white">
                    Menu
                  </Dialog.Title>

                  <Button
                    aria-label="Close menu"
                    className="relative flex items-center justify-center -mr-3 select-none w-14 h-14"
                    intent="secondary"
                    onClick={() => setIsOpen(false)}
                    ref={initialFocusRef}
                    icon
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
                      <span
                        className={clsx(
                          'h-0.5 w-6 block rounded-full transition-transform transform duration-200 ease-in-out bg-current',
                          isOpen
                            ? 'translate-y-px rotate-45'
                            : 'rotate-0 -translate-y-1'
                        )}
                      />

                      <span
                        className={clsx(
                          'h-0.5 w-6 block rounded-full transition-transform transform duration-200 ease-in-out bg-current',
                          isOpen
                            ? '-translate-y-px -rotate-45'
                            : 'rotate-0 translate-y-1'
                        )}
                      />
                    </div>
                  </Button>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto">
                  <div className="flex flex-col items-center justify-center flex-1 px-6 space-y-6 xs:px-12">
                    <Link
                      href="/#work"
                      className="text-4xl font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500"
                      onClick={close}
                    >
                      <span className="font-mono opacity-25 text-brand-500">
                        01.
                      </span>{' '}
                      Work
                    </Link>

                    <Link
                      href="/#words"
                      className="text-4xl font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500"
                      onClick={close}
                    >
                      <span className="font-mono opacity-25 text-brand-500">
                        02.
                      </span>{' '}
                      Words
                    </Link>

                    <Link
                      href="/#where"
                      className="text-4xl font-semibold text-white border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500"
                      onClick={close}
                    >
                      <span className="font-mono opacity-25 text-brand-500">
                        03.
                      </span>{' '}
                      Where
                    </Link>
                  </div>

                  <div className="h-[2px] mx-6 xs:mx-12 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />

                  <div className="flex flex-col items-center px-6 py-6 space-y-6 xs:py-8 xs:px-12">
                    <div className="flex items-center space-x-2">
                      <Tooltip
                        content={
                          <span className="flex items-center space-x-2">
                            <span>@sammagee</span>
                            <svg
                              className="w-3 h-3 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </span>
                        }
                        placement="top"
                      >
                        <AnchorButton
                          href="https://github.com/sammagee"
                          rel="noopener noreferrer"
                          target="_blank"
                          icon
                        >
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </AnchorButton>
                      </Tooltip>

                      <Tooltip
                        content={
                          <span className="flex items-center space-x-2">
                            <span>@sammagee</span>
                            <svg
                              className="w-3 h-3 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </span>
                        }
                        placement="top"
                      >
                        <AnchorButton
                          href="https://twitter.com/sammagee"
                          rel="noopener noreferrer"
                          target="_blank"
                          icon
                        >
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        </AnchorButton>
                      </Tooltip>

                      <Tooltip
                        content={
                          <span className="flex items-center space-x-2">
                            <span>@sammagee</span>
                            <svg
                              className="w-3 h-3 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </span>
                        }
                        placement="top"
                      >
                        <AnchorButton
                          href="https://linkedin.com/in/sammagee"
                          rel="noopener noreferrer"
                          target="_blank"
                          icon
                        >
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </AnchorButton>
                      </Tooltip>
                    </div>

                    <Tooltip
                      content={
                        <span className="flex items-center space-x-2">
                          <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      }
                      placement="top"
                    >
                      <AnchorButton
                        className="w-full"
                        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                      >
                        <span>Let's Talk</span>

                        <svg
                          className="w-4 h-4 transform rotate-90 text-brand-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </AnchorButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}

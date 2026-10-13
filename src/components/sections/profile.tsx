import NextImage from 'next/image'
import AnchorButton from '../anchor-button'
import SocialLinks from '../social-links'
import Squiggle from '../squiggle'

export default function Profile() {
  return (
    <section aria-labelledby="profile-heading">
      <p className="font-mono text-lg font-semibold text-brand-500">
        Hey, I&apos;m
      </p>
      <h1
        id="profile-heading"
        className="flex items-center gap-3 mt-2 text-5xl font-bold text-white lg:text-6xl"
      >
        <span>Sam Magee</span>
        <span className="relative inline-block overflow-hidden rounded-full shrink-0 size-[1em] bg-gray-800">
          <NextImage
            src="/images/me.png"
            alt=""
            className="object-contain"
            sizes="64px"
            fill
            priority
          />
        </span>
      </h1>
      <p className="mt-3 text-2xl font-medium lg:text-3xl">
        <span className="text-gray-500">I design and build software that </span>
        <span className="text-brand-400">makes complex work feel simple</span>
      </p>

      <p className="max-w-xl mt-6 text-lg text-gray-200">
        I&apos;m a Senior Software Engineer at Vanta, building the future of
        trust and compliance software.
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-8">
        <AnchorButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          <span>Let&apos;s Talk</span>
          <svg
            className="w-4 h-4 rotate-90 text-brand-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </AnchorButton>

        <SocialLinks />
      </div>

      <div className="mt-10 -mx-6 xs:-mx-12 md:mx-0">
        <Squiggle className="max-md:max-w-none" />
      </div>
    </section>
  )
}

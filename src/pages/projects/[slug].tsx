import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'
import AnchorButton from '../../components/anchor-button'
import Button from '../../components/button'
import Date from '../../components/date'
import Image from '../../components/image'
import Layout from '../../components/layout'
import Tooltip from '../../components/tooltip'
import { Content, getAllSlugs, getProject } from '../../lib/content'

interface IProjectProps {
  project: Project
}

export default function Project({ project }: IProjectProps) {
  const copy = () =>
    (typeof window !== 'undefined' ||
      typeof navigator.clipboard !== 'undefined') &&
    navigator.clipboard.writeText(window.location.href)

  return (
    <Layout>
      <Head>
        <title>{project.title} &ndash; Sam Magee</title>

        <meta name="title" content={project.title} />
        <meta name="description" content={project.description} />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://sammagee.me/projects/${project.slug}`}
        />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta
          property="og:image"
          content="https://sammagee.me/images/social/social-square.jpg"
        />

        <meta property="twitter:card" content="summary" />
        <meta
          property="twitter:url"
          content={`https://sammagee.me/images/projects/${project.slug}`}
        />
        <meta property="twitter:title" content={project.title} />
        <meta property="twitter:description" content={project.description} />
        <meta
          property="twitter:image"
          content="https://sammagee.me/images/social/social-square.jpg"
        />
      </Head>

      <div
        id="content"
        role="main"
        aria-label="Main content"
        className="mt-48 mb-32 md:mt-56"
      >
        <article className="w-full px-12 mx-auto prose prose-lg sm:pl-32 lg:pl-0">
          <Link
            href="/#work"
            className="inline-flex items-center space-x-2 !text-gray-400 !no-underline focus:outline-none border-2 border-transparent border-dashed focus-visible:border-brand-500 -ml-0.5"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>

            <span>Back</span>
          </Link>

          <header className="mt-6">
            <div className="transform scale-105">
              <div className="relative flex w-full overflow-hidden transition-transform duration-200 ease-in-out rounded-lg group hover:scale-105">
                <Image
                  alt={project.title}
                  className="w-full leading-[7rem] rounded-lg shadow-lg object-cover select-none filter grayscale group-hover:filter-none"
                  containerClassName={(isLoaded) =>
                    clsx(
                      'flex w-full transition-opacity duration-500 ease-in',
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    )
                  }
                  height={1080}
                  src={`/images/projects/${project.image}`}
                  width={1920}
                  showLoadingIndicator
                />

                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black/25" />
              </div>
            </div>

            <h1 className="!mt-12 !mb-0">{project.title}</h1>

            <div className="flex items-end justify-between mt-3">
              <div className="flex-1">
                <p className="!mt-3 !mb-0 text-base font-medium text-gray-500">
                  <Date
                    ariaLabel="Release date: "
                    dateFormat="d LLLL yyyy"
                    dateString={project.date}
                  />
                </p>

                <p
                  aria-label="Languages/Frameworks used:"
                  className="!my-0 font-mono text-sm text-gray-500"
                >
                  {project.tags}
                </p>
              </div>

              <div className="flex items-center flex-shrink-0 space-x-2">
                {project.git && (
                  <Tooltip
                    content={
                      <span className="flex items-center space-x-2">
                        <span>{project.git}</span>
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
                    placement="left"
                  >
                    <AnchorButton
                      className="-mb-1.5"
                      href={`https://${project.git}`}
                      intent="secondary"
                      rel="noopener noreferrer"
                      target="_blank"
                      icon
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>

                      <span className="sr-only">View Code</span>
                    </AnchorButton>
                  </Tooltip>
                )}

                {project.link && (
                  <Tooltip
                    content={
                      <span className="flex items-center space-x-2">
                        <span>{project.link}</span>
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
                    placement="left"
                  >
                    <AnchorButton
                      className="-mb-1.5"
                      href={`https://${project.link}`}
                      intent="secondary"
                      rel="noopener noreferrer"
                      target="_blank"
                      icon
                    >
                      <svg
                        className="w-6 h-6"
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

                      <span className="sr-only">View Project</span>
                    </AnchorButton>
                  </Tooltip>
                )}

                <Tooltip
                  content={
                    <span className="flex items-center space-x-2">
                      <span>Copy link to clipboard</span>
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                  }
                  placement="left"
                >
                  <Button
                    className="-mb-1.5"
                    intent="secondary"
                    onClick={copy}
                    icon
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </header>

          <div className="px-6 py-4 mt-6 bg-transparent rounded-lg shadow-lg backdrop-brightness-100 backdrop-filter bg-dark-dots backdrop-blur">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-400 bg-opacity-10 text-brand-400">
              TL;DR
            </span>

            <div>{project.description}</div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllSlugs(Content.Projects)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const project = await getProject(params.slug)

  return {
    props: {
      project,
    },
  }
}

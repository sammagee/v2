import clsx from 'clsx'
import Link from 'next/link'
import AnchorButton from '../anchor-button'
import Image from '../image'
import Tooltip from '../tooltip'

interface IWorkProps {
  projects: Project[]
}

export default function Work({ projects }: IWorkProps) {
  const getFeaturedProjects = (projects) =>
    projects.filter((project) => project.featured)
  const getUnfeaturedProjects = (projects) =>
    projects.filter((project) => !project.featured)

  return (
    <section id="work" className="relative w-full py-32 overflow-x-hidden">
      <div className="absolute inset-x-0 w-full h-32 transform top-8 bg-gray-1000 skew-y-1"></div>
      <div className="absolute inset-x-0 w-full h-32 transform bottom-8 bg-gray-1000 skew-y-1"></div>

      <div className="py-32 -my-8 sm:pl-20 xl:pl-0 bg-gray-1000">
        <div className="relative w-full px-12 mx-auto lg:max-w-5xl xl:max-w-6xl">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-white">Work</h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">
                These are some of my favorite projects I've worked on.
              </p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />
          </div>

          <div className="py-10">
            <h3 className="font-mono text-lg font-semibold text-brand-500">
              Featured
            </h3>

            <div className="mt-3 space-y-16">
              {getFeaturedProjects(projects).map((project, index) => (
                <article
                  className={clsx(
                    'flex flex-col md:flex-row md:items-start',
                    index % 2 !== 0 && 'md:flex-row-reverse'
                  )}
                  key={index}
                >
                  <div className="relative flex w-full overflow-hidden transition-transform duration-200 ease-in-out rounded-lg md:w-2/3 group hover:scale-105">
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

                  <div
                    className={clsx(
                      '-mt-6 w-full md:w-2/5 md:mt-6 p-6 bg-transparent backdrop-brightness-100 backdrop-filter bg-dots backdrop-blur rounded-lg shadow-xl overflow-hidden',
                      index % 2 === 0 ? 'ml-3 md:-ml-6' : '-ml-3 md:-mr-6'
                    )}
                  >
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-3xl font-bold text-white">
                          <Link
                            href={`/projects/${project.slug}`}
                            key={project.slug}
                            className="-ml-0.5 border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500"
                          >
                            {project.title}
                          </Link>
                        </h4>

                        {(project.git || project.link) && (
                          <div className="flex items-center">
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
                                  href={`https://${project.git}`}
                                  intent="secondary"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  icon
                                >
                                  <svg
                                    className="w-5 h-5"
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
                                  href={`https://${project.link}`}
                                  intent="secondary"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  icon
                                >
                                  <svg
                                    className="w-5 h-5"
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
                          </div>
                        )}
                      </div>

                      <div
                        className="text-lg text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: project.descriptionHtml,
                        }}
                      />
                      <p className="font-mono text-sm text-gray-500">
                        {project.tags}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-mono text-lg font-semibold text-brand-500">
                Other
              </h3>

              <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2 lg:gap-8 lg:grid-cols-4">
                {getUnfeaturedProjects(projects).map((project, index) => (
                  <article key={index}>
                    <div className="relative overflow-hidden transition-transform duration-200 ease-in-out rounded-lg group hover:scale-105">
                      <div className="flex">
                        <Image
                          alt={project.title}
                          className="w-full rounded-lg shadow-lg opacity-50 select-none filter grayscale"
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

                        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent backdrop-filter backdrop-blur-sm to-black/25" />
                        <div className="absolute inset-0 bg-transparent rounded-lg opacity-25 bg-brand-dots backdrop-brightness-100" />
                      </div>

                      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-4 overflow-hidden md:space-y-2">
                        <h4 className="text-xl font-bold text-white">
                          <Link
                            href={`/projects/${project.slug}`}
                            key={project.slug}
                            className="-ml-0.5 border-2 border-transparent border-dashed focus:outline-none focus-visible:border-brand-500"
                          >
                            {project.title}
                          </Link>
                        </h4>

                        <p className="text-sm text-brand-200 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="relative flex items-center space-x-2">
                          <p className="flex-1 mt-2 font-mono text-xs text-brand-400 line-clamp-1 md:mt-0">
                            {project.tags}
                          </p>

                          {(project.git || project.link) && (
                            <div className="absolute right-0 z-10 flex items-center p-1 transition duration-300 ease-in-out origin-bottom-right transform scale-75 rounded-full shadow-sm opacity-0 bg-brand-400 bg-opacity-10 backdrop-filter backdrop-blur group-hover:opacity-100 group-hover:scale-100 focus-within:scale-100 focus-within:opacity-100">
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
                                    href={`https://${project.git}`}
                                    rel="noopener"
                                    target="_blank"
                                    icon
                                  >
                                    <svg
                                      className="w-3 h-3"
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
                                    href={`https://${project.link}`}
                                    rel="noopener"
                                    target="_blank"
                                    icon
                                  >
                                    <svg
                                      className="w-3 h-3"
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

                                    <span className="sr-only">
                                      View Project
                                    </span>
                                  </AnchorButton>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

                <Tooltip
                  content={
                    <span className="flex items-center space-x-2">
                      <span>sam@magee.one</span>
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
                  <a
                    className="flex items-center justify-center px-5 py-10 font-mono text-sm font-semibold tracking-wide text-gray-500 uppercase transition duration-200 ease-in-out transform border-2 border-gray-800 border-dashed rounded-lg hover:bg-gray-500 focus-visible:bg-gray-500 focus-visible:bg-opacity-10 hover:bg-opacity-10 hover:scale-105 active:scale-100 focus:outline-none focus-visible:border-dashed"
                    href="mailto:sam@magee.one"
                  >
                    Your project here
                  </a>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="mt-20 font-mono font-black opacity-25 text-8xl text-brand-500">
            01.
          </div>
        </div>
      </div>
    </section>
  )
}

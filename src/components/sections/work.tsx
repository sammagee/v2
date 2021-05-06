import clsx from 'clsx'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'
import Tooltip from '../tooltip'

interface IWorkProps {
  projects: Project[]
}

export default function Work({ projects }: IWorkProps) {
  const getFeaturedProjects = projects => projects.filter(project => project.featured)
  const getUnfeaturedProjects = projects => projects.filter(project => !project.featured)

  return (
    <section id="work" className="relative w-full py-32 overflow-x-hidden">
      <div className="absolute inset-x-0 w-full h-32 transform top-8 bg-gray-1000 skew-y-1"></div>
      <div className="absolute inset-x-0 w-full h-32 transform bottom-8 bg-gray-1000 skew-y-1"></div>

      <div className="py-32 -my-8 bg-gray-1000">
        <div className="relative w-full max-w-6xl px-12 mx-auto">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-white">
                Work
              </h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">These are some of my favorite projects I've worked on.</p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />
          </div>

          <div className="py-10">
            <h3 className="font-mono text-lg font-semibold text-brand-500">Featured</h3>

            <div className="mt-3 space-y-16">
              {getFeaturedProjects(projects).map((project, index) => (
                <article
                  className={clsx(
                    'flex items-start',
                    index % 2 !== 0 && 'flex-row-reverse',
                  )}
                  key={index}
                >
                  <Tilt
                    className="relative flex w-2/3 overflow-hidden rounded-lg group"
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    glareEnable={true}
                    glareMaxOpacity={0.05}
                  >
                    <Image
                      className="w-full leading-[7rem] rounded-lg shadow-lg select-none filter grayscale group-hover:filter-none"
                      src={`/images/projects/${project.image}`}
                      alt={project.title}
                      width={1920}
                      height={1080}
                    />

                    <div className="absolute inset-0 transition-opacity duration-200 ease-in-out bg-opacity-25 border-t rounded-lg bg-brand-500 border-brand-100 border-opacity-5 group-hover:opacity-0" />
                  </Tilt>

                  <Tilt
                    className={clsx(
                      'w-2/5 mt-6 p-6 bg-gray-900 bg-opacity-80 backdrop-filter border-t border-white border-opacity-5 backdrop-blur rounded-lg shadow-xl overflow-hidden',
                      index % 2 === 0 ? '-ml-6' : '-mr-6',
                    )}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    glareEnable={true}
                    glareMaxOpacity={0.05}
                  >
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-3xl font-bold text-white">
                          {project.title}
                        </h4>

                        {(project.git || project.link) && (
                          <div className="flex items-center">
                            {project.git && (
                              <Tooltip
                                content={
                                  <span className="flex items-center space-x-2">
                                    <span>{project.git}</span>
                                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </span>
                                }
                                placement="left"
                              >
                                <a href={`//${project.git}`} className="flex items-center p-2 text-gray-600 transition-colors duration-200 ease-in-out border-2 border-transparent border-dashed rounded-full focus:bg-gray-500 focus:bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-10 focus:outline-none focus:border-brand-500 hover:text-gray-400 focus:text-gray-400" target="_blank" rel="noopener noreferrer">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  </svg>

                                  <span className="sr-only">View Code</span>
                                </a>
                              </Tooltip>
                            )}

                            {project.link && (
                              <Tooltip
                                content={
                                  <span className="flex items-center space-x-2">
                                    <span>{project.link}</span>
                                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </span>
                                }
                                placement="left"
                              >
                                <a href={`//${project.link}`} className="flex items-center p-2 text-gray-600 transition-colors duration-200 ease-in-out border-2 border-transparent border-dashed rounded-full focus:bg-gray-500 focus:bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-10 focus:outline-none focus:border-brand-500 hover:text-gray-400 focus:text-gray-400" target="_blank" rel="noopener noreferrer">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>

                                  <span className="sr-only">View Project</span>
                                </a>
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-lg text-gray-400" dangerouslySetInnerHTML={{ __html: project.descriptionHtml }} />
                      <p className="font-mono text-sm text-gray-500">{project.tags}</p>
                    </div>
                  </Tilt>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-mono text-lg font-semibold text-brand-500">Other</h3>

              <div className="grid grid-cols-4 gap-8 mt-3">
                {getUnfeaturedProjects(projects).map((project, index) => (
                  <article key={index}>
                    <Tilt
                      className="overflow-hidden rounded-lg group"
                      tiltMaxAngleX={15}
                      tiltMaxAngleY={15}
                      glareEnable={true}
                      glareMaxOpacity={0.1}
                    >
                      <div className="flex">
                        <Image
                          className="w-full leading-[7rem] rounded-lg shadow-lg select-none filter grayscale opacity-50"
                          src={`/images/projects/${project.image}`}
                          alt={project.title}
                          width={1920}
                          height={1080}
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg" />
                        <div className="absolute inset-0 bg-opacity-25 border-t rounded-lg backdrop-filter backdrop-blur-sm bg-brand-500 border-brand-100 border-opacity-5" />
                      </div>

                      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-4 space-y-2 overflow-hidden">
                        <h4 className="text-xl font-bold text-white">
                          {project.title}
                        </h4>

                        <p className="text-sm text-brand-200 line-clamp-2">{project.description}</p>

                        <div className="relative flex items-center space-x-2">
                          <p className="flex-1 font-mono text-xs text-brand-400 line-clamp-1">{project.tags}</p>

                          {(project.git || project.link) && (
                            <div className="absolute right-0 z-10 flex items-center p-1 transition duration-300 ease-in-out origin-bottom-right transform scale-75 rounded-full shadow-sm opacity-0 bg-brand-400 bg-opacity-10 backdrop-filter backdrop-blur group-hover:opacity-100 group-hover:scale-100 focus-within:scale-100 focus-within:opacity-100">
                              {project.git && (
                                <Tooltip
                                  content={
                                    <span className="flex items-center space-x-2">
                                      <span>{project.git}</span>
                                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </span>
                                  }
                                  placement="left"
                                >
                                  <a href={`//${project.git}`} className="inline-flex items-center p-2 transition-colors duration-200 ease-in-out border-2 border-transparent border-dashed rounded-full text-brand-400 focus:bg-brand-400 focus:bg-opacity-10 hover:bg-brand-400 hover:bg-opacity-10 focus:outline-none focus:border-brand-500 hover:text-brand-300 focus:text-brand-300" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>

                                    <span className="sr-only">View Code</span>
                                  </a>
                                </Tooltip>
                              )}

                              {project.link && (
                                <Tooltip
                                  content={
                                    <span className="flex items-center space-x-2">
                                      <span>{project.link}</span>
                                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </span>
                                  }
                                  placement="left"
                                >
                                  <a href={`//${project.link}`} className="inline-flex items-center p-2 transition-colors duration-200 ease-in-out border-2 border-transparent border-dashed rounded-full text-brand-400 focus:bg-brand-400 focus:bg-opacity-10 hover:bg-brand-400 hover:bg-opacity-10 focus:outline-none focus:border-brand-500 hover:text-brand-300 focus:text-brand-300" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>

                                    <span className="sr-only">View Project</span>
                                  </a>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Tilt>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 font-mono font-black opacity-25 text-8xl text-brand-500">01.</div>
        </div>
      </div>
    </section>
  )
}

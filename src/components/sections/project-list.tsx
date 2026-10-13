import Image from '../image'
import clsx from 'clsx'

interface IProjectListProps {
  projects: Project[]
}

const toUrl = (value: string) =>
  value.startsWith('http') ? value : `https://${value}`

export default function ProjectList({ projects }: IProjectListProps) {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-28">
      <h2
        id="work-heading"
        className="font-mono text-lg font-semibold text-brand-500"
      >
        Work
      </h2>

      <ul className="grid gap-6 mt-4">
        {projects.map((project) => {
          const tags = project.tags
            ? project.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
            : []
          const primaryUrl = project.link
            ? toUrl(project.link)
            : project.git
              ? toUrl(project.git)
              : null

          return (
            <li key={project.slug}>
              <article className="relative overflow-hidden transition duration-200 ease-in-out border-2 border-gray-800 border-dashed rounded-lg shadow-xl group bg-dots backdrop-filter backdrop-blur-sm focus-within:border-brand-500 hover:border-gray-700">
                {project.image && (
                  <Image
                    alt=""
                    className="object-cover object-top w-full h-full transition-transform duration-500 ease-in-out select-none group-hover:scale-105"
                    containerClassName={(isLoaded) =>
                      clsx(
                        'relative aspect-video overflow-hidden transition-opacity duration-500 ease-in',
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      )
                    }
                    src={`/images/projects/${project.image}`}
                    sizes="(min-width: 1024px) 600px, (min-width: 768px) 55vw, 100vw"
                    fill
                  />
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {primaryUrl ? (
                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-transparent border-dashed -ml-0.5 hover:text-brand-200 focus:outline-hidden focus-visible:border-brand-500"
                      >
                        {project.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  {project.description && (
                    <p className="mt-2 text-gray-400">{project.description}</p>
                  )}

                  {tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-4" aria-label="Tags">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-3 py-1 font-mono text-xs font-semibold rounded-full bg-brand-400/10 text-brand-400"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(project.link || project.git) && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm font-semibold">
                      {project.link && (
                        <a
                          href={toUrl(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-400 hover:text-brand-300 border-2 border-transparent border-dashed -ml-0.5 focus:outline-hidden focus-visible:border-brand-500"
                        >
                          Visit site
                          <span className="sr-only">
                            {' '}
                            for {project.title} (opens in a new tab)
                          </span>{' '}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.git && (
                        <a
                          href={toUrl(project.git)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-200 border-2 border-transparent border-dashed -ml-0.5 focus:outline-hidden focus-visible:border-brand-500"
                        >
                          Source
                          <span className="sr-only">
                            {' '}
                            for {project.title} on GitHub (opens in a new tab)
                          </span>{' '}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

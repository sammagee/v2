interface IProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: IProjectsProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">
        Projects
      </h2>

      {projects.map((project) => (
        <div key={project.title}>
          <strong className="flex items-center">
            {project.title}{' '}
            {(project.link || project.git) && (
              <span className="space-x-5 font-mono text-xs text-gray-500 print:space-x-2 print:text-2xs">
                &nbsp;//&nbsp;
                {project.link && (
                  <a
                    className="relative inline-block"
                    href={`https://${project.link}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="hidden print:inline">{project.link}</span>

                    <div className="print:hidden">
                      <span className="relative z-10">View</span>

                      <svg
                        className="absolute -top-0.5 w-3 h-3 text-gray-300 dark:text-gray-700 -right-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </a>
                )}
                {project.git && (
                  <a
                    className="relative inline-block"
                    href={`https://${project.git}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="hidden print:inline">{project.git}</span>

                    <div className="print:hidden">
                      <span className="relative z-10">Repo</span>

                      <svg
                        className="absolute -top-0.5 w-3 h-3 text-gray-300 dark:text-gray-700 -right-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </a>
                )}
              </span>
            )}
          </strong>

          <ul className="ml-4 text-xs list-disc marker:text-gray-500">
            {project.points?.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

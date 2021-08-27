import Head from 'next/head'
import Tooltip from '../components/tooltip'

export default function Resume() {
  return (
    <>
      <Head>
        <title>Résumé &ndash; Sam Magee</title>
      </Head>

      <div className="bg-white w-[8.5in] h-[11in] mx-auto my-16 print:m-0 shadow-xl print:shadow-none p-[0.5in] text-gray-900 text-sm">
        <h1 className="text-3xl font-bold text-brand-500">Sam Magee</h1>
        <h2 className="text-xl font-semibold text-brand-700">Full Stack Developer + Designer</h2>
        <nav className="flex mt-2 space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>

            <a href="mailto:sam@magee.one?subject=Résumé Inquiry" className="text-gray-700" rel="noopener" target="_blank">
              sam@magee.one
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>

            <Tooltip
              content={
                <span className="flex items-center space-x-2">
                  <span>Request Information</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              }
              placement="right"
            >
              <a href="mailto:sam@magee.one?subject=Résumé Inquiry" className="text-gray-700 filter blur-sm" rel="noopener" target="_blank">
                (555) 555-5555
              </a>
            </Tooltip>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>

            <Tooltip
              content={
                <span className="flex items-center space-x-2">
                  <span>Request Information</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              }
              placement="right"
            >
              <a href="mailto:sam@magee.one?subject=Résumé Inquiry" className="text-gray-700 filter blur-sm" rel="noopener" target="_blank">
                555 Hidden Ave., Blocked, CA, 55555
              </a>
            </Tooltip>
          </div>
        </nav>

        <hr className="my-6 border border-gray-100" />

        <div className="grid grid-cols-3 gap-8">
          <aside className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Education</h2>

              <div>
                <strong className="flex items-center font-semibold">Vanderbilt University</strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">Expected 2023&nbsp;<span className="text-gray-500 text-3xs">// Nashville, TN</span></p>
                <p className="text-xs">Master of Science in Computer Science</p>
              </div>

              <div>
                <strong className="font-semibold">Central College</strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">May 2020&nbsp;<span className="text-gray-500 text-3xs">// Pella, IA</span></p>
                <p className="text-xs">Bachelor of Arts in Computer Science</p>
                <p className="text-xs">Minor in French</p>
                <p className="text-xs">Cum Laude</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Skills</h2>

              <div>
                <strong className="font-semibold">Coding Languages:</strong>
                <p className="text-xs">
                  JavaScript/TypeScript, Swift,
                  Kotlin, Java, Hack/PHP, Python, Ruby,
                  Elixir, Erlang, Visual Basic, C++,
                  Rust, and C#
                </p>
              </div>

              <div>
                <strong className="font-semibold">Frameworks/Libraries:</strong>
                <p className="text-xs">
                  React, Vue, Svelte, Angular,
                  Tailwind CSS, React Native,
                  Next.js, Laravel, Django, Node.js,
                  .NET, Swift UI, Jetpack Compose,
                  jQuery, WebAssembly, and WordPress
                </p>
              </div>

              <div>
                <strong className="font-semibold">Databases:</strong>
                <p className="text-xs">
                  PostgreSQL, MySQL, SQL Server,
                  NoSQL (Cassandra, MongoDB),
                  and Redis
                </p>
              </div>

              <div>
                <strong className="font-semibold">Design:</strong>
                <p className="text-xs">
                  Illustrator, Photoshop, Sketch, Figma
                </p>
              </div>

              <div>
                <strong className="font-semibold">Miscellaneous:</strong>
                <p className="text-xs">
                  BDD, DDD, TDD, GIT, Adobe
                  Creative Suite, and Microsoft
                  Office Suite
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Links</h2>

              <div className="mt-3">
                <strong className="font-semibold">Portfolio:</strong>
                <p><a className="font-mono font-medium underline text-brand-500 text-xs" href="//sammagee.me" rel="noopener" target="_blank">sammagee.me</a></p>
              </div>
              <div>
                <strong className="font-semibold">GitHub:</strong>
                <p><a className="font-mono font-medium underline text-brand-500 text-xs" href="//github.com/sammagee" rel="noopener" target="_blank">@sammagee</a></p>
              </div>
              <div>
                <strong className="font-semibold">LinkedIn:</strong>
                <p><a className="font-mono font-medium underline text-brand-500 text-xs" href="//linkedin.com/in/sammagee" rel="noopener" target="_blank">@sammagee</a></p>
              </div>
            </div>
          </aside>

          <section className="col-span-2 space-y-8">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Experience</h2>

              <div>
                <strong className="flex items-center font-semibold">Software Engineer II&nbsp;<span className="text-xs text-gray-500">@ Principal Financial Group</span></strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">August 2021 – Present&nbsp;<span className="text-gray-500 text-3xs">// Des Moines, IA</span></p>
                <ul className="ml-4 text-xs list-disc">
                  <li>Develop enterprise-grade programs for automation of tasks</li>
                  <li>Build scheduled reports programmatically to be sent to business partners</li>
                  <li>Work closely with other teammates to build and test programs</li>
                  <li>Document purposes for new code extensively</li>
                  <li>Integrate existing programs with various AWS cloud technologies</li>
                </ul>
              </div>

              <div>
                <strong className="flex items-center font-semibold">Full Stack Developer I&nbsp;<span className="text-xs text-gray-500">@ IMT Insurance</span></strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">June 2020 – August 2021&nbsp;<span className="text-gray-500 text-3xs">// WDM, IA</span></p>
                <ul className="ml-4 text-xs list-disc">
                  <li>Developed new dynamic software for the replacement of an existing, legacy system</li>
                  <li>Worked with management and coworkers to ensure the quality of code and create new features and fix existing bugs</li>
                  <li>Wrote tests to ensure all features work as intended</li>
                  <li>Built an entire microservice from scratch to store, view, and update policy-related files while training an incoming developer</li>
                </ul>
              </div>

              <div>
                <strong className="flex items-center font-semibold">Software Developer&nbsp;<span className="text-xs text-gray-500">@ Lean Technologies</span></strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">May 2018 – May 2020&nbsp;<span className="text-gray-500 text-3xs">// Pella, IA</span></p>
                <ul className="ml-4 text-xs list-disc">
                  <li>Built software that directly impacted thousands of workers in many manufacturing companies</li>
                  <li>Took part in building out a new software development cycle and deployment process to meet the growing needs of the business</li>
                  <li>Led a redesign/re-theming project for the main product</li>
                  <li>Completed tasks according to deadlines with sturdy production quality</li>
                  <li>Added infrastructure for localization to Spanish language</li>
                </ul>
              </div>

              <div>
                <strong className="flex items-center font-semibold">Web Developer&nbsp;<span className="text-xs text-gray-500">@ Central College</span></strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">August 2018 – May 2020&nbsp;<span className="text-gray-500 text-3xs">// Pella, IA</span></p>
                <ul className="ml-4 text-xs list-disc">
                  <li>Built the website to apply for admission to the college</li>
                  <li>Began by converting old code in the student and employee intranet to newer, more maintainable code</li>
                  <li>Evolved to creating new web applications for the college, including a visual browser for the Facilities Management department</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Projects</h2>

              <div>
                <strong className="flex items-center font-semibold">Py <span className="font-mono text-xs text-gray-500">&nbsp;//&nbsp;<a className="font-medium underline text-brand-500" href="//py.krafted.dev?try" rel="noopener" target="_blank">View</a>&nbsp;<a className="font-medium underline text-brand-500" href="//github.com/krafted/py" rel="noopener" target="_blank">GitHub</a></span></strong>
                <ul className="ml-4 text-xs list-disc">
                  <li>Social Python editor playground in the browser</li>
                  <li>User can create, view, share, and annotate Python snippets</li>
                  <li>Can be used in multiple contexts; one popular area being learning environments</li>
                </ul>
              </div>

              <div>
                <strong className="flex items-center font-semibold">Recover <span className="font-mono text-xs text-gray-500">&nbsp;//&nbsp;<a className="font-medium underline text-brand-500" href="//recover.krafted.dev" rel="noopener" target="_blank">View</a>&nbsp;<a className="font-medium underline text-brand-500" href="//github.com/sammagee/recover" rel="noopener" target="_blank">GitHub</a></span></strong>
                <ul className="ml-4 text-xs list-disc">
                  <li>Privacy-focused solution for retrieving messages from an iOS backup</li>
                  <li>Allows the user to view messages in the browser and/or download them as a PDF</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

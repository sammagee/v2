import Head from 'next/head'

export default function Resume() {
  return (
    <>
      <Head>
        <title>Résumé &ndash; Sam Magee</title>
      </Head>

      <div className="bg-white w-[8.5in] h-[11in] mx-auto my-16 print:m-0 shadow-xl p-[0.5in] text-gray-900 text-sm">
        <h1 className="mt-3 text-3xl font-bold text-brand-500">Sam Magee</h1>
        <h2 className="text-xl font-semibold text-brand-700">Full Stack Developer + Designer</h2>
        <nav className="flex mt-2 space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>

            <span className="text-gray-700 filter blur-sm">hidden@email.com</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>

            <span className="text-gray-700 filter blur-sm">(555) 555-5555</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>

            <span className="text-gray-700 filter blur-sm">555 Hidden Ave., Blocked, CA, 55555</span>
          </div>
        </nav>

        <hr className="my-6 border border-gray-100" />

        <div className="grid grid-cols-3 gap-8">
          <aside className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Education</h2>

              <div>
                <strong className="flex items-center font-semibold">Vanderbilt University</strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">Starting May 2021&nbsp;<span className="text-gray-500 text-3xs">// Nashville, TN</span></p>
                <p className="text-xs">Master of Science in Computer Science</p>
              </div>

              <div>
                <strong className="font-semibold">Central College</strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">May 2020&nbsp;<span className="text-gray-500 text-3xs">// Pella, IA</span></p>
                <p className="text-xs">Bachelor of Arts in Computer Science</p>
                <p className="text-xs">Minor in French</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Skills</h2>

              <div>
                <strong className="font-semibold">Coding Languages:</strong>
                <p className="text-xs">
                  JavaScript(ES6), TypeScript, Swift,
                  Kotlin, Java, PHP, Python, Ruby,
                  Elixir, Erlang, Visual Basic, C++,
                  Rust, and C#
                </p>
              </div>

              <div>
                <strong className="font-semibold">Frameworks/Libraries:</strong>
                <p className="text-xs">
                  React, Vue, Svelte, Angular,
                  Tailwind CSS, React Native,
                  Next.js, Laravel, Django, Swift UI,
                  Jetpack Compose, jQuery,
                  WebAssembly, and WordPress
                </p>
              </div>

              <div>
                <strong className="font-semibold">Databases:</strong>
                <p className="text-xs">
                  PostgreSQL, MySQL, SQL Server,
                  MongoDB, and Redis
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
                <p><a className="font-mono font-medium underline text-brand-500" href="//sammagee.me" rel="noopener" target="_blank">sammagee.me</a></p>
              </div>
              <div>
                <strong className="font-semibold">GitHub:</strong>
                <p><a className="font-mono font-medium underline text-brand-500" href="//github.com/sammagee" rel="noopener" target="_blank">@sammagee</a></p>
              </div>
              <div>
                <strong className="font-semibold">LinkedIn:</strong>
                <p><a className="font-mono font-medium underline text-brand-500" href="//linkedin.com/in/sammagee" rel="noopener" target="_blank">@sammagee</a></p>
              </div>
            </div>
          </aside>

          <section className="col-span-2 space-y-8">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Experience</h2>

              <div>
                <strong className="flex items-center font-semibold">Full Stack Developer&nbsp;<span className="text-xs text-gray-500">@ IMT Insurance</span></strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">June 2020 – Present&nbsp;<span className="text-gray-500 text-3xs">// WDM, IA</span></p>
                <ul className="ml-4 text-xs list-disc">
                  <li>Develop greenfield software for the replacement of an existing, legacy system</li>
                  <li>Work with management and coworkers to ensure the quality of code and create new features and fix existing bugs</li>
                  <li>Write tests to ensure all features work as intended</li>
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
                  <li>Built the website to apply for admission to the college<span className="font-mono text-xs text-gray-500">&nbsp;//&nbsp;<a className="font-medium underline text-brand-500" href="//apply.central.edu/application/newfreshman/" target="_blank" rel="noopener">View</a></span></li>
                  <li>Converted old code in the student and employee intranet to newer, more maintainable code</li>
                  <li>Created new web applications for the college, including a visual browser for the Facilities Management department</li>
                </ul>
              </div>

              <div>
                <strong className="flex items-center font-semibold">Software Engineering Consultant&nbsp;<span className="text-xs text-gray-500">@ Krafted</span></strong>
                <p className="-mt-0.5 flex items-center font-mono text-2xs">2010 – Present&nbsp;<span className="text-gray-500 text-3xs">// Waukee, IA</span></p>
                <ul className="ml-4 text-xs list-disc">
                  <li>Started as a hobby, expanded to a small business working on projects for various local businesses</li>
                  <li>Required great attention to detail, ability to meet deadlines, and critical thinking</li>
                  <li>Completed professional work for companies like Iowa Northern Railway, including a building a training and qualifications database from scratch and consulted for a real-time job tracking utility</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">Projects</h2>

              <div>
                <strong className="flex items-center font-semibold">Py <span className="font-mono text-xs text-gray-500">&nbsp;//&nbsp;<a className="font-medium underline text-brand-500" href="//py.krafted.dev?try" rel="noopener" target="_blank">View</a>&nbsp;<a className="font-medium underline text-brand-500" href="//github.com/krafted/py" rel="noopener" target="_blank">GitHub</a></span></strong>
                <ul className="ml-4 text-xs list-disc">
                  <li>Python editor playground built with Laravel and Vue</li>
                  <li>User can create, share, and review Python code, all in the browser</li>
                </ul>
              </div>

              <div>
                <strong className="flex items-center font-semibold">Recover <span className="font-mono text-xs text-gray-500">&nbsp;//&nbsp;<a className="font-medium underline text-brand-500" href="//recover.krafted.dev" rel="noopener" target="_blank">View</a>&nbsp;<a className="font-medium underline text-brand-500" href="//github.com/sammagee/recover" rel="noopener" target="_blank">GitHub</a></span></strong>
                <ul className="ml-4 text-xs list-disc">
                  <li>Solution for retrieving messages from an iOS backup</li>
                  <li>User can either view the messages in the browser in an elegant UI, or download them as a PDF</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

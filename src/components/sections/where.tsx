import clsx from 'clsx'
import Date from '../date'

interface IWhereProps {
  positions: Position[]
}

export default function Where({ positions }: IWhereProps) {
  return (
    <section id="where" className="relative w-full pt-32 overflow-x-hidden">
      <div className="absolute inset-x-0 w-full h-32 transform top-8 bg-gray-1000 -skew-y-1"></div>

      <div className="pt-32 -mt-8 sm:pl-20 pb-44 xl:pl-0 bg-gray-1000">
        <div className="relative w-full px-12 mx-auto lg:max-w-5xl xl:max-w-6xl">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-white">
                Where
              </h2>
              <p className="mt-2 text-lg font-semibold text-gray-500">These are the places I've worked.</p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />

            <a
              className="inline-flex items-center justify-center h-12 px-5 mb-2 space-x-3 font-semibold transition duration-200 ease-in-out origin-bottom transform border-2 rounded-lg hover:bg-brand-400 focus:bg-brand-400 focus:bg-opacity-10 hover:bg-opacity-10 hover:scale-105 border-brand-400 text-brand-400 active:scale-100 focus:outline-none focus:border-dashed"
              href="/resume"
              rel="noopener"
              target="_blank"
            >
              <span>Résumé</span>

              <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </a>
          </div>

          <div className="grid py-10 lg:grid-cols-2">
            {positions.map((position, index) => (
              <article
                className={clsx(
                  'py-8 lg:px-8 border-gray-800 border-opacity-75 border-dashed',
                  index % 2 === 0 && 'lg:pl-0',
                  index % 2 !== 0 && 'lg:border-l',
                  index !== 0 && 'border-t',
                  index === 0 && 'pt-0',
                  index === 1 && 'border-t lg:border-t-0 lg:pt-0',
                  (index === positions.length - 1 || index === positions.length - 2) && '!md:pb-0',
                )}
                key={index}
              >
                <div className="flex items-start space-x-3 sm:items-center">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-brand-400 bg-opacity-10">
                    <svg
                      className="w-6 h-6 text-brand-400"
                      fill="currentColor"
                      dangerouslySetInnerHTML={{ __html: position.companyLogo }}
                      viewBox="0 0 96 96"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {position.title}&nbsp;

                      <a className="text-gray-400 focus:outline-none border-2 border-transparent -ml-0.5 focus:border-brand-500 border-dashed" href={`//${position.companyLink}`}>
                        @ {position.company}
                      </a>
                    </h3>

                    <div className="flex flex-wrap sm:space-x-2 items-center !my-0 text-base font-medium text-gray-500">
                      <p>
                        <Date dateFormat="LLLL yyyy" dateString={position.date} />
                        &nbsp;&ndash;&nbsp;
                        {position.endDate !== 'Present'
                          ? <Date dateFormat="LLLL yyyy" dateString={position.endDate} />
                          : 'Present'
                        }
                      </p>

                      {index === 0 && <span className="px-3 py-1 mt-2 text-xs font-semibold rounded-full sm:mt-0 text-brand-400 bg-brand-400 bg-opacity-10">Most Recent</span>}
                    </div>
                  </div>
                </div>

                <ul className="mt-3">
                  {position.duties.map((duty, index) => (
                    <li className="flex items-start space-x-2" key={index}>
                      <svg className="flex-shrink-0 w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>

                      <p className="leading-relaxed text-gray-200">{duty}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-20 font-mono font-black opacity-25 text-8xl text-brand-500">03.</div>
        </div>
      </div>
    </section>
  )
}

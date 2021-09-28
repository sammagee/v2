import Tilt from 'react-parallax-tilt'
import { useMedia } from 'react-use'
import AnchorButton from '../anchor-button'
import Date from '../date'

interface IWhereProps {
  positions: Position[]
}

export default function Where({ positions }: IWhereProps) {
  const isLg = useMedia('(min-width: 768px)')

  return (
    <section id="where" className="relative w-full pt-32 overflow-x-hidden">
      <div className="absolute inset-x-0 w-full h-32 transform top-8 bg-gray-1000 -skew-y-1"></div>

      <div className="pt-32 -mt-8 sm:pl-20 pb-44 xl:pl-0 bg-gray-1000">
        <div className="relative w-full px-12 mx-auto lg:max-w-5xl xl:max-w-6xl">
          <div className="flex items-end space-x-3">
            <div>
              <h2 className="text-5xl font-bold text-white">Where</h2>

              <p className="mt-2 text-lg font-semibold text-gray-500">
                These are the places I've worked.
              </p>
            </div>

            <div className="h-[2px] flex-1 mb-2 border-gray-500 border border-dashed opacity-25 rounded-full" />

            <AnchorButton
              className="mb-2"
              href="/resume"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Résumé</span>

              <svg
                className="w-4 h-4 text-brand-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </AnchorButton>
          </div>

          <div className="py-10">
            <div className="grid bg-gray-900 border-t border-white divide-y divide-white rounded-lg shadow-lg divide-opacity-5 bg-opacity-80 divide-dashed lg:divide-y-0 lg:shadow-none lg:rounded-none lg:border-0 lg:gap-6 lg:bg-transparent lg:grid-cols-2 border-opacity-5">
              {positions.map((position, index) => (
                <article key={index}>
                  <Tilt
                    className="p-6 lg:bg-gray-900 lg:bg-opacity-80 lg:backdrop-filter lg:rounded-lg lg:border-t lg:border-white lg:border-opacity-5 lg:shadow-lg lg:overflow-hidden"
                    tiltEnable={isLg}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    glareEnable={isLg}
                    glareMaxOpacity={0.05}
                  >
                    <div className="relative z-10 flex items-start space-x-3 sm:items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-brand-400 bg-opacity-10">
                        <svg
                          className="w-6 h-6 text-brand-400"
                          fill="currentColor"
                          dangerouslySetInnerHTML={{
                            __html: position.companyLogo,
                          }}
                          viewBox="0 0 96 96"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {position.title}&nbsp;
                          <a
                            className="text-gray-400 focus:outline-none border-2 border-transparent -ml-0.5 focus:border-brand-500 border-dashed"
                            href={`//${position.companyLink}`}
                          >
                            @ {position.company}
                          </a>
                        </h3>

                        <div className="flex flex-col sm:flex-row flex-wrap sm:space-x-2 items-start sm:items-center !my-0 text-base font-medium text-gray-500">
                          <p>
                            <Date
                              dateFormat="LLLL yyyy"
                              dateString={position.date}
                            />
                            &nbsp;&ndash;&nbsp;
                            {position.endDate !== 'Present' ? (
                              <Date
                                dateFormat="LLLL yyyy"
                                dateString={position.endDate}
                              />
                            ) : (
                              'Present'
                            )}
                          </p>

                          {index === 0 && (
                            <span className="px-3 py-1 mt-2 text-xs font-semibold rounded-full sm:mt-0 text-brand-400 bg-brand-400 bg-opacity-10">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 font-mono font-black opacity-25 text-8xl text-brand-500">
            03.
          </div>
        </div>
      </div>
    </section>
  )
}

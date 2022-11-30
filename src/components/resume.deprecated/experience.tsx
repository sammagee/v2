import DateFormat from '../date'

interface IExperienceProps {
  positions: Position[]
}

export default function Experience({ positions }: IExperienceProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">
        Experience
      </h2>

      {positions.map((position, index) => (
        <div key={index}>
          <header>
            <strong className="flex items-center font-semibold">
              {position.title}&nbsp;
              <span className="text-xs text-gray-500">
                @ {position.company}
              </span>
            </strong>

            <p className="-mt-0.5 flex items-center font-mono text-2xs">
              <DateFormat dateFormat="LLLL yyyy" dateString={position.date} />
              &nbsp;&ndash;&nbsp;
              {position.endDate !== 'Present' ? (
                <DateFormat
                  dateFormat="LLLL yyyy"
                  dateString={position.endDate}
                />
              ) : (
                'Present'
              )}
              &nbsp;
              <span className="text-gray-500 text-3xs">
                // {position.location}
              </span>
              {index === 0 && (
                <span className="px-1.5 -mt-0.5 ml-2 font-sans font-semibold rounded-full text-3xs text-brand-400 bg-brand-400 bg-opacity-10">
                  Current
                </span>
              )}
            </p>
          </header>

          <ul className="ml-4 text-xs list-disc marker:text-gray-500">
            {position.duties.map((duty) => (
              <li key={duty}>{duty}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

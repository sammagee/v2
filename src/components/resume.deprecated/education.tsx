import { isBefore, parseISO } from 'date-fns'
import DateFormat from '../date'

interface IEducationProps {
  schools: School[]
}

export default function Education({ schools }: IEducationProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">
        Education
      </h2>

      {schools.map((school) => {
        const beforeGradDate = isBefore(new Date(), parseISO(school.endDate))

        return (
          <div key={school.name}>
            <strong className="flex items-center font-semibold">
              {school.name}
            </strong>
            <p className="flex items-center -mt-0 font-mono 5 text-2xs">
              {beforeGradDate && <span>Expected&nbsp;</span>}
              <DateFormat
                ariaLabel="Graduation date: "
                dateFormat="LLL yyyy"
                dateString={school.endDate}
              />
              &nbsp;
              <span className="text-gray-500 text-3xs">
                // {school.location}
              </span>
            </p>
            <ul className="ml-4 text-xs list-disc marker:text-gray-500">
              {school.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}

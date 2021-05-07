import { parseISO, format } from 'date-fns'

interface IDateProps {
  ariaLabel?: string
  className?: string
  dateFormat?: string
  dateString: string
}

export default function Date({ ariaLabel, className, dateFormat = 'LLLL yyyy', dateString }: IDateProps) {
  const date = parseISO(dateString)
  const formattedDate = format(date, dateFormat)

  return <time aria-label={ariaLabel + formattedDate} className={className} dateTime={dateString}>{formattedDate}</time>
}

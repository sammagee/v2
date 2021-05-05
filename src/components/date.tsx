import { parseISO, format } from 'date-fns'

interface IDateProps {
  className?: string
  dateFormat?: string
  dateString: string
}

export default function Date({ className, dateFormat = 'LLLL yyyy', dateString }: IDateProps) {
  const date = parseISO(dateString)

  return <time className={className} dateTime={dateString}>{format(date, dateFormat)}</time>
}

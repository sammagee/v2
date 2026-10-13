import Tippy from '@tippyjs/react'
import { format, parseISO } from 'date-fns'
import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import 'tippy.js/animations/shift-away.css'

interface ICompanyPinsProps {
  positions: Position[]
}

const toUrl = (value: string) =>
  value.startsWith('http') ? value : `https://${value}`

const formatDate = (value: string) =>
  /^present$/i.test(value) ? 'Present' : format(parseISO(value), 'MMM yyyy')

function Pin({ position }: { position: Position }) {
  const [open, setOpen] = useState(false)
  const lastPointer = useRef<string>('mouse')
  const href = position.companyLink ? toUrl(position.companyLink) : undefined
  const dates = `${formatDate(position.date)} – ${
    position.endDate ? formatDate(position.endDate) : 'Present'
  }`
  const label = [position.company, position.title, dates]
    .filter(Boolean)
    .join(', ')

  const card = (
    <span className="block text-left">
      <span className="block font-semibold text-white">{position.company}</span>
      {position.title && (
        <span className="block font-normal text-gray-300">
          {position.title}
        </span>
      )}
      <span className="block mt-0.5 font-mono text-xs font-normal text-brand-400">
        {dates}
      </span>
    </span>
  )

  const className =
    'group relative block size-14 sm:size-16 rounded-full p-1 bg-gray-200 shadow-[0_6px_14px_-4px_rgba(0,0,0,0.7),0_2px_3px_rgba(0,0,0,0.4)] transition duration-200 ease-out hover:-translate-y-1 hover:-rotate-6 focus-visible:-translate-y-1 focus-visible:-rotate-6 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

  const face = (
    <span
      aria-hidden="true"
      className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-radial-[at_30%_25%] from-gray-700 via-gray-800 to-gray-1000 text-brand-400 shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.6)]"
    >
      {position.companyLogo ? (
        <svg
          className="relative z-10 size-3/5 drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]"
          fill="currentColor"
          viewBox="0 0 96 96"
          dangerouslySetInnerHTML={{ __html: position.companyLogo }}
        />
      ) : (
        <span className="relative z-10 text-lg font-bold">
          {position.company.charAt(0)}
        </span>
      )}
      {/* glossy sheen */}
      <span className="absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-linear-to-b from-white/35 to-white/0" />
      <span className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-linear-120 from-transparent via-white/15 to-transparent group-hover:opacity-100" />
    </span>
  )

  const onPointerDown = (event: PointerEvent) => {
    lastPointer.current = event.pointerType
  }
  // On touch, the first tap opens the card; a second tap follows the link.
  const onClick = (event: MouseEvent) => {
    if (lastPointer.current === 'touch' && !open) {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <li>
      <Tippy
        content={card}
        visible={open}
        onClickOutside={() => setOpen(false)}
        placement="top"
        animation="shift-away"
        interactive={false}
        appendTo={() => document.body}
        aria={{ content: null, expanded: false }}
      >
        <span
          className="block"
          onPointerEnter={(event) =>
            event.pointerType === 'mouse' && setOpen(true)
          }
          onPointerLeave={(event) =>
            event.pointerType === 'mouse' && setOpen(false)
          }
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className={className}
              onPointerDown={onPointerDown}
              onClick={onClick}
            >
              {face}
            </a>
          ) : (
            <button
              type="button"
              aria-label={label}
              className={className}
              onPointerDown={onPointerDown}
              onClick={() => setOpen((value) => !value)}
            >
              {face}
            </button>
          )}
        </span>
      </Tippy>
    </li>
  )
}

export default function CompanyPins({ positions }: ICompanyPinsProps) {
  const sorted = [...positions].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <section aria-labelledby="pins-heading" className="mt-10">
      <h2 id="pins-heading" className="sr-only">
        Where I&apos;ve worked
      </h2>
      <ul className="flex flex-wrap gap-4 sm:gap-5">
        {sorted.map((position) => (
          <Pin key={position.company} position={position} />
        ))}
      </ul>
    </section>
  )
}

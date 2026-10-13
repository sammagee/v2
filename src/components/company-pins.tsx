import Tippy from '@tippyjs/react'
import { format, parseISO } from 'date-fns'
import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import 'tippy.js/animations/shift-away.css'

interface ICompanyPinsProps {
  positions: Position[]
}

// Width / height of each logo's tight viewBox in public/images/logos.
const LOGO_ASPECT: Record<string, number> = {
  central: 1.8,
  imt: 0.915,
  krafted: 1.102,
  leantech: 0.981,
  marqeta: 1.632,
  principal: 0.823,
  uber: 2.767,
  vanta: 3.634,
}

// Every pin gets roughly the same visual area (≈ a 46px square).
const PIN_SIDE = 46
const MAX_WIDTH = 96

const toUrl = (value: string) =>
  value.startsWith('http') ? value : `https://${value}`

const formatDate = (value: string) =>
  /^present$/i.test(value) ? 'Present' : format(parseISO(value), 'MMM yyyy')

function pinSize(aspect: number) {
  let height = PIN_SIDE / Math.sqrt(aspect)
  let width = height * aspect
  if (width > MAX_WIDTH) {
    width = MAX_WIDTH
    height = width / aspect
  }
  return { width: Math.round(width), height: Math.round(height) }
}

function Pin({ position }: { position: Position }) {
  const [open, setOpen] = useState(false)
  const lastPointer = useRef<string>('mouse')
  // Whether the card was already open when this tap began (a tap also
  // focuses the link, which opens the card before the click lands).
  const openAtPointerDown = useRef(false)
  const href = position.companyLink ? toUrl(position.companyLink) : undefined
  const dates = `${formatDate(position.date)} – ${
    position.endDate ? formatDate(position.endDate) : 'Present'
  }`
  const label = [position.company, position.title, dates]
    .filter(Boolean)
    .join(', ')

  const logo =
    position.slug && LOGO_ASPECT[position.slug] ? position.slug : null
  const src = logo ? `/images/logos/${logo}.svg` : null
  const { width, height } = pinSize(logo ? LOGO_ASPECT[logo] : 1)

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
    'group relative inline-flex items-center justify-center p-2 rounded-lg transition duration-200 ease-out hover:-translate-y-1 hover:-rotate-3 focus-visible:-translate-y-1 focus-visible:-rotate-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500'

  const face = src ? (
    <span
      aria-hidden="true"
      className="relative block sticker"
      style={{ width, height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        className="block w-full h-full"
      />
      {/* Glossy sheen, masked to the logo's own silhouette */}
      <span
        className="absolute inset-0 transition-opacity duration-300 opacity-80 bg-linear-135 from-white/60 via-white/0 via-45% to-white/25 group-hover:opacity-100"
        style={{
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </span>
  ) : (
    <span aria-hidden="true" className="text-2xl font-bold text-white sticker">
      {position.company.charAt(0)}
    </span>
  )

  const onPointerDown = (event: PointerEvent) => {
    lastPointer.current = event.pointerType
    openAtPointerDown.current = open
  }
  // On touch, the first tap opens the card; a second tap follows the link.
  const onClick = (event: MouseEvent) => {
    if (lastPointer.current === 'touch' && !openAtPointerDown.current) {
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
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-4 sm:gap-x-5">
        {sorted.map((position) => (
          <Pin key={position.company} position={position} />
        ))}
      </ul>
    </section>
  )
}

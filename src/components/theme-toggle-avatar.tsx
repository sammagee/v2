import { useTheme } from '@/lib/theme'

/**
 * The header memoji doubles as the light/dark switch. Follows the system
 * theme until clicked; the choice is then kept in localStorage.
 */
export function ThemeToggleAvatar() {
  const { theme, toggle } = useTheme()
  const label =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    // -my-0.5 keeps the row at the text block's 40px height so the name stays
    // put vertically. The memoji (alpha bbox 130x166 of 196px, centered) is
    // sized so the head fills ~76% of the circle with 4.5px above and 6px
    // below, i.e. optically centered.
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === 'dark'}
      className="relative -my-0.5 block size-11 shrink-0 cursor-pointer touch-manipulation overflow-hidden rounded-full bg-[linear-gradient(160deg,var(--avatar-from)_0%,var(--avatar-to)_100%)] ring-2 ring-gray-100 transition-transform duration-150 ease-out select-none [-webkit-tap-highlight-color:transparent] hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/favicon.png"
        alt=""
        width={44}
        height={44}
        draggable={false}
        className="pointer-events-none absolute top-[1.5px] left-[2.25px] block size-[39.5px] max-w-none"
      />
    </button>
  )
}

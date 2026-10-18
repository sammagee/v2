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
    // Same treatment as the company logos: the ring is the button's own
    // background (2px padding, white / #2a2a28), the gradient + memoji sit in
    // one inner circle that is the single clip, and the small shadow is a
    // drop-shadow filter on the ring circle. So there's one anti-aliased edge
    // between art and ring and one between ring and page, no seams.
    // The art keeps its 2.75rem (44px at 16px) size; the ring sits outside
    // it and the negative margins cancel it in layout (plus 0.125rem
    // vertically), so the row stays at the text block's 2.5rem height and
    // the name stays put.
    // The memoji (alpha bbox 130x166 of 196px, centered) is placed in
    // percent of the circle (1.5px / 2.25px / 39.5px of 44px) so the head
    // fills ~76% of it with a bit more room below than above, i.e. optically
    // centered at any root size.
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === 'dark'}
      className="-mx-[2px] -my-[calc(0.125rem+2px)] block shrink-0 cursor-pointer touch-manipulation rounded-full bg-(--logo-ring) p-[2px] drop-shadow-[0_1px_1px_var(--logo-shadow)] transition-transform duration-150 ease-out select-none [-webkit-tap-highlight-color:transparent] hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
    >
      <span className="relative block size-11 overflow-hidden rounded-full bg-[linear-gradient(160deg,var(--avatar-from)_0%,var(--avatar-to)_100%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/favicon.png"
          alt=""
          width={44}
          height={44}
          draggable={false}
          className="pointer-events-none absolute top-[3.409%] left-[5.114%] block size-[89.773%] max-w-none"
        />
      </span>
    </button>
  )
}

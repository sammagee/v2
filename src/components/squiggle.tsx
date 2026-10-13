import clsx from 'clsx'

interface ISquiggleProps {
  className?: string
}

export default function Squiggle({ className }: ISquiggleProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={clsx(
        'block h-4 w-full max-w-xs text-brand-500 sm:h-5',
        className
      )}
      viewBox="0 0 240 20"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M2 10 Q 12 2 22 10 T 42 10 T 62 10 T 82 10 T 102 10 T 122 10 T 142 10 T 162 10 T 182 10 T 202 10 T 222 10 T 238 10"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

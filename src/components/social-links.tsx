import AnchorButton from './anchor-button'

const LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/sammagee',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/sammagee',
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m14.248 10.658 8.048-9.354h-1.907L13.4 9.426l-5.58-8.122H1.382l8.44 12.282-8.44 9.81H3.29l7.38-8.578 5.893 8.577H23zm-2.612 3.036-.855-1.223L3.978 2.74h2.929l5.49 7.854.855 1.223 7.137 10.21H17.46z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/sammagee',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function SocialLinks() {
  return (
    <ul className="flex items-center gap-2" aria-label="Social links">
      {LINKS.map((link) => (
        <li key={link.name}>
          <AnchorButton
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            icon
          >
            {link.icon}
            <span className="sr-only">{link.name} (opens in a new tab)</span>
          </AnchorButton>
        </li>
      ))}
    </ul>
  )
}

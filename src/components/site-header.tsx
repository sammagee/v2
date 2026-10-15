import { useState } from 'react'

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#record', label: 'Record' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#work', label: 'Work' },
  { href: '/resume.pdf', label: 'Résumé' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
    window.setTimeout(() => {
      const paint = (window as Window & { __paintHeader?: () => void }).__paintHeader
      paint?.()
    }, 0)
  }

  return (
    <header
      className="site-header"
      data-header
      data-menu={open ? 'open' : 'closed'}
      id="top"
    >
      <a className="skip" href="#content">
        Skip to content
      </a>

      <a className="wordmark" href="/" onClick={close}>
        Sam Magee
      </a>

      <nav
        id="sections"
        className={open ? 'site-nav is-open' : 'site-nav'}
        aria-label="Sections"
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={close}
            {...(link.href.endsWith('.pdf')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a className="button" href="/#contact" onClick={close}>
        Email Sam
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="sections"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
    </header>
  )
}

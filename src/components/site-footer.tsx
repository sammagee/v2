const EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'sam@magee.one'

export default function SiteFooter() {
  return (
    <footer className="site-footer" data-chapter="ink">
      <div className="footer-name-clip">
        <p className="footer-name">Sam Magee</p>
      </div>

      <div className="footer-grid">
        <div className="footer-places">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href="https://github.com/sammagee" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sammagee" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
        </div>

        <div className="footer-meta">
          <a href="/#about">About</a>
          <a href="/#record">Record</a>
          <a href="/#skills">Skills</a>
          <a href="/#work">Work</a>
          <a href="/#contact">Contact</a>
          <a href="https://x.com/sammagee" rel="noopener noreferrer">
            X
          </a>
        </div>
      </div>

      <p className="credits">
        Postcard of Pella, Iowa by Steve Shook, CC BY 2.0. Nashville capitol by George N.
        Barnard, CC0. Both via Wikimedia Commons.
      </p>

      <div className="footer-end">
        <p>© {new Date().getFullYear()} Sam Magee</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  )
}

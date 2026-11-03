import { navigationItems } from '../../data/navigation.js'
import wordmark from '../../assets/wordmark.svg'
import './site-footer.css'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="footer-wordmark" href="#home" aria-label="Marcos and Florencia — back to top">
          <img src={wordmark} alt="Marcos and Florencia" width="599" height="221" loading="lazy" decoding="async" />
        </a>

        <nav className="footer-navigation" aria-label="Footer navigation">
          {navigationItems.map(({ id, label, href, external }) => <a key={id} href={href}
            target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{label}</a>)}
        </nav>
      </div>

      <div className="footer-meta">
        <p>© {new Date().getFullYear()} Marcos &amp; Florencia</p>
      </div>
    </footer>
  )
}

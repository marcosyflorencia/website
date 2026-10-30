import NewsletterForm from '../forms/NewsletterForm.jsx'
import { navigationItems } from '../../data/navigation.js'
import wordmark from '../../assets/wordmark.svg'
import './site-footer.css'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-wordmark" href="#home" aria-label="Marcos and Florencia — back to top">
            <img src={wordmark} alt="Marcos and Florencia" width="623" height="167" />
          </a>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          {navigationItems.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div className="footer-newsletter">
          <div className="footer-newsletter-copy">
            <h2>Stay in step with us</h2>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-meta">
        <p>© {new Date().getFullYear()} Marcos &amp; Florencia</p>
        <a href="mailto:marcosyflorenciatango@gmail.com">marcosyflorenciatango@gmail.com</a>
      </div>
    </footer>
  )
}

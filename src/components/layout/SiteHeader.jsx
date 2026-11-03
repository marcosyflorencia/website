import { useEffect, useState } from 'react'
import SocialLinks from './SocialLinks.jsx'
import Button from '../ui/Button.jsx'
import useActiveSection from '../../hooks/useActiveSection.js'
import { mobileNavigationMedia } from '../../utils/responsive.js'
import { navigationItems, navigationSectionIds } from '../../data/navigation.js'
import { siteCopy } from '../../content/siteCopy.js'
import logo from '../../assets/logo.svg'

function MenuIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor" aria-hidden="true"><path d="M3,18V16H21v2H3Zm0-5V11H21v2H3ZM3,8V6H21V8H3Z" /></svg>
}

function CloseIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor" aria-hidden="true"><path d="M6.4,19L5,17.6L10.6,12L5,6.4L6.4,5L12,10.6L17.6,5L19,6.4L13.4,12L19,17.6L17.6,19L12,13.4L6.4,19Z" /></svg>
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { headerRef, activeSection, showOverlay } = useActiveSection(navigationSectionIds)

  useEffect(() => {
    const mobileNavigation = window.matchMedia(mobileNavigationMedia)
    const closeOnDesktop = event => { if (!event.matches) setMenuOpen(false) }
    const closeOnEscape = event => { if (event.key === 'Escape') setMenuOpen(false) }

    mobileNavigation.addEventListener('change', closeOnDesktop)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      mobileNavigation.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])

  return (
    <header ref={headerRef} className="header" data-overlay={showOverlay || menuOpen} data-menu-open={menuOpen}>
      <a className="brand" href="#home" aria-label="Marcos and Florencia home">
        <img src={logo} alt="" width="69" height="43" />
      </a>
      <nav id="site-navigation" className="site-navigation" aria-label="Main navigation" data-open={menuOpen}>
        {navigationItems.map(({ id, label, href, external }) => <a key={id} href={href} onClick={() => setMenuOpen(false)} aria-current={!external && activeSection === id ? 'location' : undefined}
          target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
            {label}
          </a>)}
        <div className="mobile-menu-actions">
          <Button href="#contact" onClick={() => setMenuOpen(false)}>Send Inquiry</Button>
          <Button href={siteCopy.socialLinks.booking} variant="secondary" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Book Private class</Button>
        </div>
      </nav>
      <SocialLinks />
      <Button
        className="menu-toggle"
        variant="unstyled"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-controls="site-navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </Button>
    </header>
  )
}

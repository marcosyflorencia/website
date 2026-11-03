import facebook from '../../assets/social/facebook.svg'
import instagram from '../../assets/social/instagram.svg'
import whatsapp from '../../assets/social/whatsapp.svg'
import { siteCopy } from '../../content/siteCopy.js'
import './social-links.css'

const socialPlatforms = [
  { key: 'facebook', name: 'Facebook', icon: facebook },
  { key: 'instagram', name: 'Instagram', icon: instagram },
  { key: 'whatsapp', name: 'WhatsApp', icon: whatsapp },
]

export default function SocialLinks() {
  return <div className="social-links" role="group" aria-label="Social media">
    {socialPlatforms.map(({ key, name, icon }) => ({ key, name, icon, href: siteCopy.socialLinks?.[key] }))
      .filter(({ href }) => href)
      .map(({ key, name, icon, href }) => <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={`Visit ${name}`} title={`Visit ${name}`}>
        <img src={icon} alt="" width="20" height="20" />
      </a>)}
  </div>
}

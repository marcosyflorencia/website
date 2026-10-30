import facebook from '../../assets/social/facebook.svg'
import instagram from '../../assets/social/instagram.svg'
import whatsapp from '../../assets/social/whatsapp.svg'
import './social-links.css'

const socialLinks = [
  { name: 'Facebook', icon: facebook, href: '#contact' },
  { name: 'Instagram', icon: instagram, href: '#contact' },
  { name: 'WhatsApp', icon: whatsapp, href: '#contact' },
]

export default function SocialLinks() {
  return <div className="social-links" role="group" aria-label="Social media">
    {socialLinks.map(({ name, icon, href }) => <a key={name} href={href} aria-label={`${name} — contact placeholder`} title={`${name} — profile link coming soon`}>
      <img src={icon} alt="" width="20" height="20" />
    </a>)}
  </div>
}

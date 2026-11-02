import facebook from '../../assets/social/facebook.svg'
import instagram from '../../assets/social/instagram.svg'
import whatsapp from '../../assets/social/whatsapp.svg'
import './social-links.css'

const socialLinks = [
  { name: 'Facebook', icon: facebook, href: 'https://www.facebook.com/marcospereirayflorenciaborgnia' },
  { name: 'Instagram', icon: instagram, href: 'https://www.instagram.com/marcosyflorencia/' },
  { name: 'WhatsApp', icon: whatsapp, href: 'https://chat.whatsapp.com/KAd90y3bu9jKkgmBwB6TrW?mode=gi_t' },
]

export default function SocialLinks() {
  return <div className="social-links" role="group" aria-label="Social media">
    {socialLinks.map(({ name, icon, href }) => <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Visit ${name}`} title={`Visit ${name}`}>
      <img src={icon} alt="" width="20" height="20" />
    </a>)}
  </div>
}

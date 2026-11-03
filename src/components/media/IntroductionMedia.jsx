import { resolveMediaUrl } from '../../utils/mediaUrl.js'

function embedSource(media, inline) {
  if (media.kind === 'youtube') {
    const settings = inline
      ? 'playsinline=1&rel=0'
      : `autoplay=1&mute=1&loop=1&playlist=${media.id}&controls=0&playsinline=1&rel=0`
    return `${media.src}?${settings}`
  }

  const settings = inline
    ? 'title=0&byline=0&portrait=0'
    : 'autoplay=1&muted=1&loop=1&background=1'
  return `${media.src}?${settings}`
}

export default function IntroductionMedia({ url, inline = false }) {
  const media = resolveMediaUrl(url)
  if (media.kind === 'empty') return null

  const className = `about-media about-media--${media.kind}${inline ? ' about-inline-media' : ''}`

  if (media.kind === 'video') {
    return <span className={className}>
      <video src={media.src} autoPlay={!inline} muted={!inline} loop={!inline} controls={inline} playsInline preload="metadata" tabIndex={inline ? undefined : -1} />
    </span>
  }

  if (media.kind === 'youtube' || media.kind === 'vimeo') {
    return <span className={className}>
      <iframe src={embedSource(media, inline)} title="Introduction video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen={inline} loading="lazy" tabIndex={inline ? 0 : -1} />
    </span>
  }

  return <span className={className}>
    <img src={media.src} alt="" loading="lazy" decoding="async" />
  </span>
}

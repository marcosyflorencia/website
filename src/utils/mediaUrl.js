const DIRECT_VIDEO_PATTERN = /\.(mp4|webm|ogv|ogg|mov|m4v)(?:$|[?#])/i

function parseUrl(value) {
  try {
    return new URL(value, 'https://local.invalid')
  } catch {
    return null
  }
}

function validYouTubeId(value) {
  return /^[a-zA-Z0-9_-]{6,}$/.test(value || '') ? value : null
}

export function resolveMediaUrl(value) {
  const src = String(value || '').trim()
  if (!src) return { kind: 'empty', src: '' }

  const url = parseUrl(src)
  const host = url?.hostname.replace(/^www\./, '')

  if (host === 'youtu.be') {
    const id = validYouTubeId(url.pathname.split('/').filter(Boolean)[0])
    if (id) return { kind: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}`, id }
  }

  const isYouTube = host === 'youtube.com' || host?.endsWith('.youtube.com')
    || host === 'youtube-nocookie.com' || host?.endsWith('.youtube-nocookie.com')
  if (isYouTube) {
    const pathParts = url.pathname.split('/').filter(Boolean)
    const pathId = ['embed', 'shorts', 'live'].includes(pathParts[0]) ? pathParts[1] : null
    const id = validYouTubeId(url.searchParams.get('v') || pathId)
    if (id) return { kind: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}`, id }
  }

  if (host === 'vimeo.com' || host?.endsWith('.vimeo.com')) {
    const id = url.pathname.split('/').filter(Boolean).find(part => /^\d+$/.test(part))
    if (id) return { kind: 'vimeo', src: `https://player.vimeo.com/video/${id}`, id }
  }

  if (DIRECT_VIDEO_PATTERN.test(src)) return { kind: 'video', src }
  return { kind: 'image', src }
}

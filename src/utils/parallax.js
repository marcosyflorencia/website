const clamp = value => Math.min(1, Math.max(0, value))

export function getSectionParallaxOffset(element, viewportHeight) {
  if (!element) return 0
  const rect = element.getBoundingClientRect()
  const progress = clamp((viewportHeight - rect.top) / Math.max(1, viewportHeight + rect.height))
  const travel = Math.min(64, viewportHeight * 0.06)
  return travel * (0.5 - progress)
}

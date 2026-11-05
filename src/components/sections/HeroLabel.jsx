import './hero-label.css'

const labels = [
  'ARGENTINE TANGO ARTISTS',
  'NYC-BASED TEACHERS',
  'AWARD-WINNING PERFORMERS',
]

export default function HeroLabel() {
  return (
    <div className="eyebrow hero-label">
      <span className="hero-label-accessible">{labels.join('. ')}.</span>
      <div className="hero-label-window" aria-hidden="true">
        {labels.map((label, index) => (
          <span
            className="hero-label-phrase"
            key={label}
            style={{ '--hero-label-delay': `${index * 4}s` }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

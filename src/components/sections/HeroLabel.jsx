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
        <div className="hero-label-track">
          {[...labels, labels[0]].map((label, index) => <span key={index}>{label}</span>)}
        </div>
      </div>
    </div>
  )
}

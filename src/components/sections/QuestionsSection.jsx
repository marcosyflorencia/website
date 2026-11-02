import Accordion from '../ui/Accordion.jsx'
import { siteCopy } from '../../content/siteCopy.js'
import './questions.css'

const FAQ_TITLE = 'Q&A'

export default function QuestionsSection() {
  return <section className="questions" id="questions" tabIndex={-1} aria-labelledby="questions-title">
    <div className="questions-inner">
      <h2 id="questions-title">{FAQ_TITLE}</h2>
      <Accordion items={siteCopy.faq} />
    </div>
  </section>
}

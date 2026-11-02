import Accordion from '../ui/Accordion.jsx'
import { siteCopy } from '../../content/siteCopy.ts'
import './questions.css'

const questions = siteCopy.faq.items.map(item => ({
  ...item,
  answer: typeof item.answer === 'string' ? <p>{item.answer}</p> : <>
    <p>{item.answer.introduction}</p>
    <ul>
      {item.answer.styles.map(style => <li key={style.name}><strong>{style.name}</strong> {style.description}</li>)}
    </ul>
    <p>{item.answer.conclusion}</p>
  </>,
}))

export default function QuestionsSection() {
  return <section className="questions" id="questions" tabIndex={-1} aria-labelledby="questions-title">
    <div className="questions-inner">
      <h2 id="questions-title">{siteCopy.faq.title}</h2>
      <Accordion items={questions} />
    </div>
  </section>
}

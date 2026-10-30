import Accordion from '../ui/Accordion.jsx'
import './questions.css'

const questions = [
  {
    id: 'styles',
    question: 'What tango styles are there?',
    answer: <>
      <p>Argentine tango has several approaches, with plenty of overlap between them:</p>
      <ul>
        <li><strong>Tango salón:</strong> Social tango danced at milongas, emphasizing connection, musicality, and moving comfortably around a shared dance floor.</li>
        <li><strong>Milonguero style:</strong> Usually danced in a close embrace with compact movements, especially suited to a crowded floor.</li>
        <li><strong>Tango nuevo:</strong> An exploratory approach that plays with movement, space, and changes in the embrace.</li>
        <li><strong>Stage tango:</strong> Choreographed for an audience, often featuring dramatic movements, lifts, and theatrical expression.</li>
      </ul>
      <p>You may also hear about vals and milonga. These are related musical and dance forms enjoyed alongside tango: vals has a lilting three-beat rhythm, while milonga often has a brisk, playful feel.</p>
    </>,
  },
  { id: 'beginners', question: 'Can I join if I have never danced tango?', answer: <p>Details about beginner lessons and getting started will be added here soon.</p> },
  { id: 'partner', question: 'Do I need to bring a partner?', answer: <p>Partner requirements for private lessons and group classes will be added here soon.</p> },
  { id: 'wear', question: 'What should I wear to class?', answer: <p>Clothing and footwear guidance will be added here soon.</p> },
  { id: 'booking', question: 'How do I book a lesson or an event?', answer: <p>Booking steps, availability, and inquiry details will be added here soon.</p> },
]

export default function QuestionsSection() {
  return <section className="questions" id="questions" tabIndex={-1} aria-labelledby="questions-title">
    <div className="questions-inner">
      <h2 id="questions-title">Q&amp;A</h2>
      <Accordion items={questions} />
    </div>
  </section>
}

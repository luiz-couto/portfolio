import ReactMarkdown from 'react-markdown'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import contact from '../content/pages/contact.json'
import './Contact.css'

function Contact() {
  return (
    <section className="contact">
      <Reveal>
        <h1 className="contact-headline">{contact.headline}</h1>
      </Reveal>

      <Reveal delay={150}>
        <div className="contact-body">
          <ReactMarkdown>{contact.body}</ReactMarkdown>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <SocialLinks
          labels={{
            github: 'Check my GitHub!',
            linkedin: 'Connect on LinkedIn',
            email: 'Send me an email',
          }}
        />
      </Reveal>
    </section>
  )
}

export default Contact

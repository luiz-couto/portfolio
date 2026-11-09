import ReactMarkdown from 'react-markdown'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import contactEn from '../content/pages/contact.json'
import contactPt from '../content/pages/contact.pt-BR.json'
import { pickLocalized, useLanguage, useT } from '../i18n/LanguageContext'
import './Contact.css'

function Contact() {
  const { lang } = useLanguage()
  const t = useT()
  const contact = pickLocalized(lang, contactEn, contactPt)

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
            github: t.socials.githubContact,
            linkedin: t.socials.linkedinContact,
            email: t.socials.email,
          }}
        />
      </Reveal>
    </section>
  )
}

export default Contact

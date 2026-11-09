import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import aboutEn from '../content/pages/about.json'
import aboutPt from '../content/pages/about.pt-BR.json'
import profile from '../content/profile.json'
import profilePicUrl from '../content/files/profile-luiz.png'
import { pickLocalized, useLanguage } from '../i18n/LanguageContext'
import './About.css'

function About() {
  const { lang } = useLanguage()
  const about = pickLocalized(lang, aboutEn, aboutPt)

  return (
    <section className="about">
      <div className="about-text">
        <Reveal>
          <h1 className="about-headline">{about.headline}</h1>
        </Reveal>
        <Reveal delay={150}>
          <div className="about-paragraphs">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="about-side">
        <Reveal delay={100}>
          <img className="about-photo" src={profilePicUrl} alt={profile.name} />
        </Reveal>
        <Reveal delay={250}>
          <div className="about-socials">
            <SocialLinks />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About

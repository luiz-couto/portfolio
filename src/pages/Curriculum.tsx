import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'
import SectionNav from '../components/SectionNav'
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '../components/icons'
import cvEn from '../content/pages/curriculum.json'
import cvPt from '../content/pages/curriculum.pt-BR.json'
import cvPdfUrl from '../content/files/curriculum-luiz-couto.pdf?url'
import profilePicUrl from '../content/files/profile-luiz.png'
import { pickLocalized, useLanguage, useT } from '../i18n/LanguageContext'
import './Curriculum.css'

const ACCENT_COUNT = 6

const CONTACT_ICONS: Record<string, ReactNode> = {
  email: <MailIcon className="contact-icon" />,
  linkedin: <LinkedInIcon className="contact-icon" />,
  github: <GitHubIcon className="contact-icon" />,
}

function Curriculum() {
  const { lang } = useLanguage()
  const t = useT()
  const cv = pickLocalized(lang, cvEn, cvPt)

  const sections = [
    { id: 'profile', label: t.curriculum.profile },
    { id: 'skills', label: t.curriculum.skills },
    { id: 'experience', label: t.curriculum.experience },
    { id: 'education', label: t.curriculum.education },
    { id: 'languages', label: t.curriculum.languages },
  ]

  return (
    <section className="curriculum">
      <SectionNav sections={sections} />

      <header className="curriculum-header">
        <h1>{cv.title}</h1>
        <a className="curriculum-download" href={cvPdfUrl} download>
          <DownloadIcon className="download-icon" />
          {t.curriculum.downloadPdf}
        </a>
      </header>

      <Reveal>
        <div className="curriculum-hero" id="profile">
          <img
            className="curriculum-photo"
            src={profilePicUrl}
            alt={cv.profile.name}
          />
          <div className="curriculum-hero-info">
            <h2 className="curriculum-hero-name">{cv.profile.name}</h2>
            <span className="curriculum-hero-headline">
              {cv.profile.headline}
            </span>
            <ul className="curriculum-contacts">
              {cv.profile.contacts.map((contact) => (
                <li key={contact.kind}>
                  <a
                    href={contact.url}
                    target={contact.kind === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                  >
                    {CONTACT_ICONS[contact.kind]}
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="curriculum-summary">{cv.summary}</p>
      </Reveal>

      <h2 id="skills">🛠️ {t.curriculum.skills}</h2>
      <div className="curriculum-skills">
        {cv.skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 80}>
            <div className={`skill-card accent-${index % ACCENT_COUNT}`}>
              <h3>
                <span className="skill-icon" aria-hidden="true">
                  {group.icon}
                </span>
                {group.category}
              </h3>
              <ul className="curriculum-tags">
                {group.items.map((item) => (
                  <li className="curriculum-tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <h2 id="experience">💼 {t.curriculum.experience}</h2>
      <div className="timeline">
        {cv.experience.map((job, index) => (
          <Reveal
            key={job.company + job.period}
            className={`timeline-item accent-${index % ACCENT_COUNT}`}
          >
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
              <span className="timeline-period">{job.period}</span>
              <h3>
                {job.role} · {job.company}
              </h3>
              <span className="timeline-location">{job.location}</span>
              <p>{job.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <h2 id="education">🎓 {t.curriculum.education}</h2>
      <div className="timeline">
        {cv.education.map((item, index) => (
          <Reveal
            key={item.degree}
            className={`timeline-item accent-${(index + 3) % ACCENT_COUNT}`}
          >
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
              <span className="timeline-period">{item.period}</span>
              <h3>{item.degree}</h3>
              <span className="timeline-location">
                {item.institution} — {item.location}
              </span>
              <p>{item.description}</p>
              {'thesis' in item && (
                <p>
                  <strong>{t.curriculum.thesis}:</strong> {item.thesis}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <h2 id="languages">🗣️ {t.curriculum.languages}</h2>
      <Reveal>
        <ul className="curriculum-tags curriculum-languages">
          {cv.languages.map((lang, index) => (
            <li
              className={`curriculum-tag accent-${index % ACCENT_COUNT}`}
              key={lang.language}
            >
              {lang.language} · {lang.level}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

export default Curriculum

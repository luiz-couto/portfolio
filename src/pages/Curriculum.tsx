import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'
import SectionNav from '../components/SectionNav'
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '../components/icons'
import cv from '../content/pages/curriculum.json'
import cvPdfUrl from '../content/files/curriculum-luiz-couto.pdf?url'
import profilePicUrl from '../content/files/profile-luiz.png'
import './Curriculum.css'

const ACCENT_COUNT = 6

const CONTACT_ICONS: Record<string, ReactNode> = {
  email: <MailIcon className="contact-icon" />,
  linkedin: <LinkedInIcon className="contact-icon" />,
  github: <GitHubIcon className="contact-icon" />,
}

const SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
]

function Curriculum() {
  return (
    <section className="curriculum">
      <SectionNav sections={SECTIONS} />

      <header className="curriculum-header">
        <h1>{cv.title}</h1>
        <a className="curriculum-download" href={cvPdfUrl} download>
          <DownloadIcon className="download-icon" />
          Download PDF
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

      <h2 id="skills">🛠️ Skills</h2>
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

      <h2 id="experience">💼 Experience</h2>
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

      <h2 id="education">🎓 Education</h2>
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
                  <strong>Thesis:</strong> {item.thesis}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <h2 id="languages">🗣️ Languages</h2>
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

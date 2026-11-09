import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useT } from '../i18n/LanguageContext'
import type { ProjectMeta } from '../lib/projects'
import './ProjectCarousel.css'

export const AUTO_ADVANCE_MS = 4000

function ProjectCarousel({ projects }: { projects: ProjectMeta[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useT()

  useEffect(() => {
    if (projects.length < 2) return
    const timer = setInterval(
      () => setActiveIndex((current) => (current + 1) % projects.length),
      AUTO_ADVANCE_MS,
    )
    // activeIndex in the deps restarts the countdown after any slide
    // change, so a manual dot click gets the full interval too.
    return () => clearInterval(timer)
  }, [projects.length, activeIndex])

  if (projects.length === 0) return null

  return (
    <section className="carousel" aria-label="Featured projects">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className={
            index === activeIndex
              ? 'carousel-slide carousel-slide-active'
              : 'carousel-slide'
          }
          aria-hidden={index !== activeIndex}
        >
          <img
            className="carousel-image"
            src={project.coverUrl}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="carousel-overlay">
            <h2 className="carousel-title">{project.title}</h2>
            <p className="carousel-summary">{project.summary}</p>
            <Link
              className="carousel-cta"
              to={`/projects/${project.slug}`}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              {t.projects.seeDetails}
            </Link>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className={
              index === activeIndex
                ? 'carousel-dot carousel-dot-active'
                : 'carousel-dot'
            }
            aria-label={`Show ${project.title}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectCarousel

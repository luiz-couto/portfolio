import { Link } from 'react-router'
import ProjectCarousel from '../components/ProjectCarousel'
import Reveal from '../components/Reveal'
import { useLanguage, useT } from '../i18n/LanguageContext'
import { getProjects } from '../lib/projects'
import './Projects.css'

function Projects() {
  const { lang } = useLanguage()
  const t = useT()
  const projects = getProjects(lang)
  const featured = projects.filter((project) => project.featured)

  return (
    <section className="projects">
      <h1>{t.projects.title}</h1>

      <Reveal>
        <ProjectCarousel projects={featured} />
      </Reveal>

      <Reveal delay={150}>
        <h2>{t.projects.allProjects}</h2>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <Link className="project-card" to={`/projects/${project.slug}`}>
              <img
                className="project-card-image"
                src={project.coverUrl}
                alt=""
                loading="lazy"
              />
              <div className="project-card-body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Projects

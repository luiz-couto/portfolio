import { Link } from 'react-router'
import ProjectCarousel from '../components/ProjectCarousel'
import Reveal from '../components/Reveal'
import { getProjects } from '../lib/projects'
import './Projects.css'

function Projects() {
  const projects = getProjects()
  const featured = projects.filter((project) => project.featured)

  return (
    <section className="projects">
      <h1>Projects</h1>

      <ProjectCarousel projects={featured} />

      <h2>All projects</h2>
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

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useParams } from 'react-router'
import CoverMedia from '../components/CoverMedia'
import { getProject, getProjectContent, resolveProjectAsset } from '../lib/projects'
import './ProjectDetail.css'

const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i

function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  const content = slug ? getProjectContent(slug) : undefined

  if (!project || !slug) {
    return (
      <section className="project-detail">
        <Link className="project-back" to="/projects">
          ← All projects
        </Link>
        <h1>Project not found</h1>
      </section>
    )
  }

  return (
    <article className="project-detail">
      <Link className="project-back" to="/projects">
        ← All projects
      </Link>

      <h1 className="project-title">{project.title}</h1>
      <p className="project-subtitle">{project.summary}</p>

      <CoverMedia className="project-cover" project={project} />

      {content && (
        <div className="project-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Markdown images pointing at video files become players,
              // everything else resolves to the bundled asset URL.
              img: ({ src, alt }) => {
                const resolved = resolveProjectAsset(slug, String(src ?? ''))
                if (VIDEO_EXTENSIONS.test(String(src ?? ''))) {
                  return (
                    <video className="project-media" src={resolved} controls />
                  )
                }
                return (
                  <img className="project-media" src={resolved} alt={alt ?? ''} />
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </article>
  )
}

export default ProjectDetail

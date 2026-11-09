import type { ProjectMeta } from '../lib/projects'

interface CoverMediaProps {
  project: ProjectMeta
  className?: string
}

/**
 * Detail-page hero media: the project's hero video (muted loop) when
 * one exists, otherwise its cover image.
 */
function CoverMedia({ project, className }: CoverMediaProps) {
  if (project.heroVideoUrl) {
    return (
      <video
        className={className}
        src={project.heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        controls
      />
    )
  }
  return <img className={className} src={project.coverUrl} alt="" />
}

export default CoverMedia

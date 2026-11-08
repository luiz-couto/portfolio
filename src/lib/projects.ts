export interface ProjectMeta {
  slug: string
  title: string
  summary: string
  featured: boolean
  order: number
  /** Cover image — used in the carousel, cards and as detail fallback. */
  coverUrl: string
  /** Optional hero video — replaces the cover on the detail page only. */
  heroVideoUrl?: string
}

type ProjectJson = Omit<ProjectMeta, 'slug' | 'coverUrl' | 'heroVideoUrl'>

// Every folder under src/content/projects/ with an index.json is a
// project — adding a folder is all it takes for it to show up.
const metaModules = import.meta.glob('../content/projects/*/index.json', {
  eager: true,
  import: 'default',
}) as Record<string, ProjectJson>

const coverModules = import.meta.glob(
  '../content/projects/*/cover.{svg,png,jpg,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const heroVideoModules = import.meta.glob(
  '../content/projects/*/hero.{mp4,webm}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const contentModules = import.meta.glob('../content/projects/*/content.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

// Every image/video inside a project folder, so markdown can reference
// them with relative paths like ./screenshot.png.
const assetModules = import.meta.glob(
  '../content/projects/*/*.{svg,png,jpg,jpeg,webp,gif,mp4,webm}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

export function getProjects(): ProjectMeta[] {
  return Object.entries(metaModules)
    .map(([path, meta]) => {
      const slug = path.split('/').at(-2)!
      const coverPath = Object.keys(coverModules).find((cover) =>
        cover.includes(`/${slug}/cover.`),
      )
      const heroPath = Object.keys(heroVideoModules).find((hero) =>
        hero.includes(`/${slug}/hero.`),
      )
      return {
        slug,
        coverUrl: coverPath ? coverModules[coverPath] : '',
        heroVideoUrl: heroPath ? heroVideoModules[heroPath] : undefined,
        ...meta,
      }
    })
    .sort((a, b) => a.order - b.order)
}

export function getProject(slug: string): ProjectMeta | undefined {
  return getProjects().find((project) => project.slug === slug)
}

export function getProjectContent(slug: string): string | undefined {
  return contentModules[`../content/projects/${slug}/content.md`]
}

/** Resolve a markdown-relative path (./file.png) to its bundled URL. */
export function resolveProjectAsset(slug: string, src: string): string {
  const file = src.replace(/^\.\//, '')
  return assetModules[`../content/projects/${slug}/${file}`] ?? src
}

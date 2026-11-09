import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'
import { AUTO_ADVANCE_MS } from './components/ProjectCarousel'

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('switches the site to PT-BR and back via the sidebar toggle', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'PT' }))
    expect(screen.getByRole('link', { name: 'Projetos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Currículo' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Sou o Luiz/ }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
  })

  it('renders the About page by default', () => {
    renderApp()
    expect(
      screen.getByRole('heading', { name: /I'm Luiz/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Follow on GitHub/ }),
    ).toHaveAttribute('href', 'https://github.com/luiz-couto')
    expect(
      screen.getByRole('link', { name: /Send me an email/ }),
    ).toHaveAttribute('href', 'mailto:luizcouto@dcc.ufmg.br')
  })

  it('shows all menu items in the sidebar', () => {
    renderApp()
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const label of ['About', 'Curriculum', 'Projects', 'Contact']) {
      expect(nav).toHaveTextContent(label)
    }
  })

  it('navigates to a page when a menu item is clicked', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: 'Projects' }))

    expect(
      screen.getByRole('heading', { name: 'Projects' }),
    ).toBeInTheDocument()
  })

  it('opens the mobile menu and closes it after navigating', async () => {
    const user = userEvent.setup()
    renderApp()
    const toggle = screen.getByRole('button', { name: 'Toggle menu' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('link', { name: 'Projects' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('marks the current page as active in the menu', () => {
    renderApp('/curriculum')
    const link = screen.getByRole('link', { name: 'Curriculum' })
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  it('renders the curriculum with a PDF download button', () => {
    renderApp('/curriculum')

    expect(
      screen.getByRole('heading', { name: 'Curriculum' }),
    ).toBeInTheDocument()
    for (const section of ['Skills', 'Experience', 'Education', 'Languages']) {
      expect(
        screen.getByRole('heading', { name: new RegExp(section) }),
      ).toBeInTheDocument()
    }

    const download = screen.getByRole('link', { name: /Download PDF/ })
    expect(download).toHaveAttribute('download')
    expect(download).toHaveAttribute('href', expect.stringContaining('.pdf'))

    expect(
      screen.getByRole('img', { name: 'Luiz Felipe Couto Gontijo' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /luizcouto@dcc\.ufmg\.br/ }),
    ).toHaveAttribute('href', 'mailto:luizcouto@dcc.ufmg.br')
  })

  it('shows a section navigation with anchors to each curriculum section', () => {
    renderApp('/curriculum')
    const nav = screen.getByRole('navigation', { name: 'Page sections' })

    for (const section of [
      'Profile',
      'Skills',
      'Experience',
      'Education',
      'Languages',
    ]) {
      const link = screen.getByRole('link', { name: section })
      expect(nav).toContainElement(link)
      expect(link).toHaveAttribute('href', `#${section.toLowerCase()}`)
    }
  })

  it('renders the contact page with body links and socials', () => {
    renderApp('/contact')

    expect(
      screen.getByRole('heading', { name: /get in touch/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'luizcouto@dcc.ufmg.br' }),
    ).toHaveAttribute('href', 'mailto:luizcouto@dcc.ufmg.br')
    expect(
      screen.getByRole('link', { name: /Check my GitHub!/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Connect on LinkedIn/ }),
    ).toBeInTheDocument()
  })

  it('shows the projects carousel and the all-projects grid', () => {
    renderApp('/projects')

    const carousel = screen.getByRole('region', { name: 'Featured projects' })
    expect(carousel).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /^Show / }).length,
    ).toBeGreaterThanOrEqual(2)

    expect(
      screen.getByRole('heading', { name: 'All projects' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Graphics Engine from Scratch/ }),
    ).toHaveAttribute('href', '/projects/graphics-engine')
  })

  it('switches the active slide when a carousel dot is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/projects')

    const dots = screen.getAllByRole('button', { name: /^Show / })
    expect(dots[0]).toHaveAttribute('aria-current', 'true')

    await user.click(dots[1])
    expect(dots[1]).toHaveAttribute('aria-current', 'true')
    expect(dots[0]).toHaveAttribute('aria-current', 'false')
  })

  it('auto-advances the carousel after the interval', () => {
    vi.useFakeTimers()
    try {
      renderApp('/projects')
      const dots = screen.getAllByRole('button', { name: /^Show / })
      expect(dots[0]).toHaveAttribute('aria-current', 'true')

      act(() => {
        vi.advanceTimersByTime(AUTO_ADVANCE_MS)
      })
      expect(dots[1]).toHaveAttribute('aria-current', 'true')
    } finally {
      vi.useRealTimers()
    }
  })

  it('renders a project detail page with markdown content', () => {
    renderApp('/projects/graphics-engine')

    expect(
      screen.getByRole('heading', { name: 'Graphics Engine from Scratch' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /All projects/ })).toHaveAttribute(
      'href',
      '/projects',
    )
    // From content.md
    expect(
      screen.getByRole('heading', { name: 'What I learned' }),
    ).toBeInTheDocument()
  })

  it('shows a not-found message for an unknown project', () => {
    renderApp('/projects/does-not-exist')
    expect(
      screen.getByRole('heading', { name: 'Project not found' }),
    ).toBeInTheDocument()
  })

  it('selects a section dot on click even without scrolling', async () => {
    const user = userEvent.setup()
    renderApp('/curriculum')

    const education = screen.getByRole('link', { name: 'Education' })
    expect(education.className).not.toContain('section-nav-dot-active')

    await user.click(education)
    expect(education.className).toContain('section-nav-dot-active')

    const profile = screen.getByRole('link', { name: 'Profile' })
    await user.click(profile)
    expect(profile.className).toContain('section-nav-dot-active')
    expect(education.className).not.toContain('section-nav-dot-active')
  })
})

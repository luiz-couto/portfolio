import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renders the About page by default', () => {
    renderApp()
    expect(
      screen.getByRole('heading', { name: 'Hello World!' }),
    ).toBeInTheDocument()
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

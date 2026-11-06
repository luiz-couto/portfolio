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
})

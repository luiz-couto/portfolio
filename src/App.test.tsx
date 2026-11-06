import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the greeting', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Hello World!' }),
    ).toBeInTheDocument()
  })
})

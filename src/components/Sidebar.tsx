import { useState } from 'react'
import { NavLink } from 'react-router'
import profile from '../content/profile.json'
import { GitHubIcon, LinkedInIcon } from './icons'
import './Sidebar.css'

const menuItems = [
  { to: '/', label: 'About' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <>
      <header className="sidebar-topbar">
        <button
          className="sidebar-menu-button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <span className="sidebar-name">{profile.name}</span>
      </header>

      {isOpen && <div className="sidebar-backdrop" onClick={close} />}

      <aside className={isOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <div className="sidebar-profile">
          <img
            className="sidebar-avatar"
            src={profile.avatarUrl}
            alt={profile.name}
          />
          <span className="sidebar-name">{profile.name}</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={close}
              className={({ isActive }) =>
                isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a
            className="sidebar-link sidebar-social-link"
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className="sidebar-social-icon" />
            GitHub
          </a>
          <a
            className="sidebar-link sidebar-social-link"
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="sidebar-social-icon" />
            LinkedIn
          </a>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

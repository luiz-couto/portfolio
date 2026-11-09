import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import profile from '../content/profile.json'
import './SocialLinks.css'

type SocialKey = 'github' | 'linkedin' | 'email'

const DEFAULT_LABELS: Record<SocialKey, string> = {
  github: 'Follow on GitHub',
  linkedin: 'Follow on LinkedIn',
  email: 'Send me an email',
}

const SOCIALS: { key: SocialKey; url: string; icon: React.ReactNode }[] = [
  {
    key: 'github',
    url: profile.links.github,
    icon: <GitHubIcon className="social-links-icon" />,
  },
  {
    key: 'linkedin',
    url: profile.links.linkedin,
    icon: <LinkedInIcon className="social-links-icon" />,
  },
  {
    key: 'email',
    url: profile.links.email,
    icon: <MailIcon className="social-links-icon" />,
  },
]

function SocialLinks({ labels }: { labels?: Partial<Record<SocialKey, string>> }) {
  return (
    <ul className="social-links">
      {SOCIALS.map((social) => (
        <li key={social.key}>
          <a
            href={social.url}
            target={social.url.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
          >
            {social.icon}
            {labels?.[social.key] ?? DEFAULT_LABELS[social.key]}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks

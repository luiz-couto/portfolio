import { useEffect, useRef, useState } from 'react'
import './SectionNav.css'

export interface SectionLink {
  id: string
  label: string
}

function SectionNav({ sections }: { sections: SectionLink[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)
  // While locked (right after a click), scroll events must not override
  // the clicked selection — the click always wins.
  const isLocked = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleClick = (id: string) => {
    setActiveId(id)
    isLocked.current = true
    clearTimeout(lockTimer.current)
    // Safety release in case the click causes no scrolling at all.
    lockTimer.current = setTimeout(() => {
      isLocked.current = false
    }, 1000)
  }

  useEffect(() => {
    const updateActive = () => {
      if (isLocked.current) {
        // Smooth scrolling after a click: keep the lock alive until
        // the scroll settles, then resume tracking on the next scroll.
        clearTimeout(lockTimer.current)
        lockTimer.current = setTimeout(() => {
          isLocked.current = false
        }, 150)
        return
      }

      // The page bottom can be reached before the last section's top
      // crosses the threshold, so pin the last section there.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveId(sections[sections.length - 1]?.id)
        return
      }

      // Current section: the last one whose top sits above the
      // upper third of the viewport.
      const threshold = window.innerHeight * 0.35
      let current = sections[0]?.id
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= threshold) {
          current = section.id
        }
      }
      setActiveId(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
      clearTimeout(lockTimer.current)
    }
  }, [sections])

  return (
    <nav className="section-nav" aria-label="Page sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={() => handleClick(section.id)}
          className={
            activeId === section.id
              ? 'section-nav-dot section-nav-dot-active'
              : 'section-nav-dot'
          }
        >
          <span className="section-nav-label">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default SectionNav

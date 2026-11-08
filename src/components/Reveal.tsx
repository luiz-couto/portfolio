import { useEffect, useRef, useState, type ReactNode } from 'react'
import './Reveal.css'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // jsdom and very old browsers: show content immediately.
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className ?? ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal

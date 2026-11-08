import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Resets the scroll position on route changes. Keyed on pathname only,
 * so in-page anchor (#hash) navigation is unaffected.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop

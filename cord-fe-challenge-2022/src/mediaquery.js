import { useEffect, useState } from 'react'

export const WIDTH_MD = '650px'
export const WIDTH_LG = '1200px'

export const useMediaQuery = minWidth => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    throw new Error('useMediaQuery is not supported')
  }

  const mediaQuery = window.matchMedia(`(min-width: ${minWidth})`)
  const [match, setMatch] = useState(!!mediaQuery.matches)

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches)
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [])

  return match
}

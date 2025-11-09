import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevent SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    const handleChange = () => setMatches(getMatches(query))
    
    const matchMedia = window.matchMedia(query)
    
    // Initial check
    handleChange()
    
    // Listen for changes
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }
    
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  return matches
}
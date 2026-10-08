import { useEffect, useRef, useState } from 'react'

export function useLocalStorage(key, initialValue, delay = 300) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch (e) {
      console.warn('useLocalStorage read error:', e)
      return initialValue
    }
  })

  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.warn('useLocalStorage write error:', e)
      }
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [key, value, delay])

  return [value, setValue]
}
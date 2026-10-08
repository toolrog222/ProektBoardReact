import { useEffect, useState } from 'react'

function parsePath(pathname) {
  const parts = pathname.split('/').filter(Boolean)

  if (parts.length === 0) return { name: 'boards' }
  if (parts[0] === 'boards' && parts.length === 1) return { name: 'boards' }
  if (parts[0] === 'boards' && parts.length === 2) {
    return { name: 'board', id: decodeURIComponent(parts[1]) }
  }
  return { name: 'notFound' }
}

export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to) => {
    if (to === window.location.pathname) return
    window.history.pushState({}, '', to)
    setPath(window.location.pathname)
  }

  return { route: parsePath(path), navigate }
}
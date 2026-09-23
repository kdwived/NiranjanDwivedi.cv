/**
 * Finds out whether a real logo file exists in public/logos/ for a slug.
 * Results are cached module-wide so each slug is probed once per session.
 */
import { logoCandidates } from './brand'

const cache = new Map<string, Promise<string | null>>()
const urlCache = new Map<string, Promise<boolean>>()

/** True once we know an image actually exists at `url`. Cached per session. */
export function probeUrl(url: string): Promise<boolean> {
  const hit = urlCache.get(url)
  if (hit) return hit
  const task = new Promise<boolean>((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
  urlCache.set(url, task)
  return task
}

/** Resolves a public/ path against the deploy base. */
export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\//, '')}`
}

export function probeLogo(slug: string): Promise<string | null> {
  const hit = cache.get(slug)
  if (hit) return hit

  const task = new Promise<string | null>((resolve) => {
    if (typeof window === 'undefined') return resolve(null)
    const urls = logoCandidates(slug)
    let i = 0
    const tryNext = () => {
      if (i >= urls.length) return resolve(null)
      const url = urls[i++]
      const img = new Image()
      img.onload = () => resolve(url)
      img.onerror = tryNext
      img.src = url
    }
    tryNext()
  })

  cache.set(slug, task)
  return task
}

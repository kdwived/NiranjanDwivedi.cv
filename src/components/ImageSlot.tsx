import { useEffect, useState } from 'react'
import { probeUrl, publicUrl } from '../lib/logoProbe'

/**
 * An image that isn't there yet.
 *
 * Renders the real file the moment it exists at `public/<dir>/<file>`, and until
 * then shows a placeholder naming the exact path to drop it into — so the layout
 * is already sized for the real image and nothing has to be re-built later.
 */
export default function ImageSlot({
  dir,
  file,
  label,
  className = '',
  imgClassName = '',
  onClick,
  hint = true,
}: {
  dir: string
  file: string
  label: string
  className?: string
  imgClassName?: string
  onClick?: () => void
  hint?: boolean
}) {
  const url = publicUrl(`${dir}/${file}`)
  const [found, setFound] = useState<boolean | null>(null)

  useEffect(() => {
    let alive = true
    probeUrl(url).then((ok) => alive && setFound(ok))
    return () => {
      alive = false
    }
  }, [url])

  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      onClick={onClick}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] ${
        onClick ? 'cursor-zoom-in' : ''
      } ${className}`}
    >
      {found ? (
        <img
          src={url}
          alt={label}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${imgClassName}`}
        />
      ) : (
        <span className="flex h-full w-full flex-col items-center justify-center gap-2 px-3 py-6 text-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="3"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.4"
            />
            <circle cx="8.6" cy="9.4" r="1.7" fill="rgba(34,211,238,0.65)" />
            <path
              d="M4.5 17.5 9.4 12.8l3.4 3 2.6-2.3 4.1 4"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-medium text-white/50">{label}</span>
          {hint && (
            <span className="font-mono text-[9px] leading-relaxed text-white/25">
              public/{dir}/{file}
            </span>
          )}
        </span>
      )}

      {found && onClick && (
        <span className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="chip">View</span>
        </span>
      )}
    </Wrapper>
  )
}

/** Simple full-screen viewer used by certificates and project galleries. */
export function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string | null
  caption?: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={caption ?? ''} className="max-h-[80vh] rounded-2xl object-contain" />
        {caption && <figcaption className="mt-4 text-center text-sm text-white/50">{caption}</figcaption>}
      </figure>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 font-mono text-xs tracking-widest text-white/60 hover:text-white"
      >
        CLOSE
      </button>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { brand, type BrandDef } from '../lib/brand'
import { probeLogo } from '../lib/logoProbe'

type Props = {
  /** any label — "Google Ads", "Bajaj Finance", "React.js" */
  name: string
  size?: number
  /** draw the tile background + border */
  tile?: boolean
  className?: string
  title?: string
}

/**
 * Renders, in order of preference:
 *   public/logos/<slug>.svg|png|webp  →  official simple-icons mark  →  monogram
 */
export default function BrandIcon({ name, size = 28, tile = true, className = '', title }: Props) {
  const def = brand(name)
  const url = useLogoFile(def.slug)

  const box = {
    width: size,
    height: size,
    borderRadius: Math.max(6, size * 0.26),
  }

  const inner = url ? (
    <img
      src={url}
      alt={def.label}
      loading="lazy"
      style={{ width: size * 0.62, height: size * 0.62, objectFit: 'contain' }}
    />
  ) : def.path ? (
    <svg
      viewBox="0 0 24 24"
      width={size * 0.56}
      height={size * 0.56}
      fill={def.color}
      aria-hidden
      style={{ filter: `drop-shadow(0 0 6px ${def.color}55)` }}
    >
      <path d={def.path} />
    </svg>
  ) : (
    <span
      style={{
        color: def.color,
        fontSize: Math.max(9, size * 0.32),
        fontWeight: 700,
        letterSpacing: '0.02em',
      }}
    >
      {def.initials}
    </span>
  )

  if (!tile) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} title={title ?? def.label}>
        {inner}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-white/10 bg-white/[0.04] ${className}`}
      style={{ ...box, boxShadow: `inset 0 0 18px -8px ${def.color}` }}
      title={title ?? def.label}
    >
      {inner}
    </span>
  )
}

export function useLogoFile(slug: string) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    probeLogo(slug).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [slug])
  return url
}

export function brandOf(name: string): BrandDef {
  return brand(name)
}

/** Horizontal row of logos, used under headings and inside cards. */
export function BrandRow({
  names,
  size = 26,
  max,
  className = '',
}: {
  names: readonly string[]
  size?: number
  max?: number
  className?: string
}) {
  const shown = max ? names.slice(0, max) : names
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {shown.map((n) => (
        <BrandIcon key={n} name={n} size={size} />
      ))}
      {max && names.length > max && (
        <span className="font-mono text-[10px] text-white/30">+{names.length - max}</span>
      )}
    </div>
  )
}

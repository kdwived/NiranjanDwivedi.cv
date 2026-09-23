import * as THREE from 'three'

const cache = new Map<string, THREE.CanvasTexture>()

/**
 * Renders a text label into a canvas texture so it can be used on a sprite.
 * No external font files, no troika dependency — works fully offline.
 */
export function labelTexture(
  text: string,
  opts: { color?: string; size?: number; weight?: number; letterSpacing?: number } = {},
) {
  const { color = '#ffffff', size = 56, weight = 600, letterSpacing = 2 } = opts
  const key = `${text}|${color}|${size}|${weight}|${letterSpacing}`
  const hit = cache.get(key)
  if (hit) return hit

  const pad = 24
  const font = `${weight} ${size}px Inter, system-ui, sans-serif`

  const measure = document.createElement('canvas').getContext('2d')!
  measure.font = font
  const width = Math.ceil(measure.measureText(text).width + letterSpacing * text.length) + pad * 2
  const height = Math.ceil(size * 1.6)

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(2, width)
  canvas.height = Math.max(2, height)

  const ctx = canvas.getContext('2d')!
  ctx.font = font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = 18

  let x = pad
  const y = height / 2
  for (const ch of text) {
    ctx.fillText(ch, x, y)
    x += ctx.measureText(ch).width + letterSpacing
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 4
  texture.needsUpdate = true
  cache.set(key, texture)
  return texture
}

/** Aspect ratio (w/h) of a cached label, for sizing the sprite correctly. */
export function labelAspect(texture: THREE.CanvasTexture) {
  const img = texture.image as HTMLCanvasElement
  return img.width / img.height
}

let glow: THREE.CanvasTexture | null = null

/** Soft radial gradient used for additive glow sprites. */
export function glowTexture() {
  if (glow) return glow
  const s = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = s
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)')
  g.addColorStop(0.6, 'rgba(255,255,255,0.09)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  glow = new THREE.CanvasTexture(canvas)
  return glow
}

const panelCache = new Map<string, THREE.CanvasTexture>()

/** A project "card" rendered to a texture so it can float in 3D space. */
export function panelTexture(opts: {
  n: string
  kind: string
  title: string
  accent: string
  tags: string[]
}) {
  const key = `${opts.n}|${opts.title}|${opts.accent}`
  const hit = panelCache.get(key)
  if (hit) return hit

  const W = 768
  const H = 480
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, 'rgba(14,17,26,0.96)')
  bg.addColorStop(1, 'rgba(6,8,13,0.96)')
  ctx.fillStyle = bg
  roundRect(ctx, 6, 6, W - 12, H - 12, 26)
  ctx.fill()

  ctx.strokeStyle = opts.accent
  ctx.globalAlpha = 0.55
  ctx.lineWidth = 3
  roundRect(ctx, 6, 6, W - 12, H - 12, 26)
  ctx.stroke()
  ctx.globalAlpha = 1

  // accent bar
  ctx.fillStyle = opts.accent
  ctx.globalAlpha = 0.9
  roundRect(ctx, 48, 60, 70, 6, 3)
  ctx.fill()
  ctx.globalAlpha = 1

  ctx.fillStyle = opts.accent
  ctx.font = '500 22px Inter, system-ui, sans-serif'
  ctx.fillText(opts.kind, 48, 118)

  ctx.fillStyle = 'rgba(255,255,255,0.28)'
  ctx.font = '700 92px Inter, system-ui, sans-serif'
  ctx.fillText(opts.n, W - 150, 120)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 40px Inter, system-ui, sans-serif'
  wrapText(ctx, opts.title, 48, 196, W - 110, 50)

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '400 22px Inter, system-ui, sans-serif'
  let tx = 48
  const ty = H - 62
  for (const tag of opts.tags.slice(0, 4)) {
    const w = ctx.measureText(tag).width + 34
    if (tx + w > W - 48) break
    ctx.strokeStyle = 'rgba(255,255,255,0.16)'
    ctx.lineWidth = 1.5
    roundRect(ctx, tx, ty - 26, w, 40, 20)
    ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.fillText(tag, tx + 17, ty)
    tx += w + 12
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  panelCache.set(key, tex)
  return tex
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ')
  let line = ''
  let cursorY = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY)
      line = word
      cursorY += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, cursorY)
}

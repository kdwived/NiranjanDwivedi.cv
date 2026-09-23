/**
 * Turns a brand into a texture that can float in the 3D scene.
 * Same three-layer preference as the DOM icon: uploaded file → official mark →
 * monogram. Everything is drawn to a canvas, so there are no assets to host.
 */
import * as THREE from 'three'
import type { BrandDef } from './brand'
import { probeLogo } from './logoProbe'

const S = 256

const tileCache = new Map<string, THREE.CanvasTexture>()
const fileCache = new Map<string, Promise<THREE.CanvasTexture | null>>()

function newCanvas() {
  const c = document.createElement('canvas')
  c.width = c.height = S
  return c
}

function drawTile(ctx: CanvasRenderingContext2D, color: string) {
  ctx.clearRect(0, 0, S, S)

  const grad = ctx.createLinearGradient(0, 0, S, S)
  grad.addColorStop(0, 'rgba(18,22,34,0.94)')
  grad.addColorStop(1, 'rgba(8,10,17,0.94)')
  ctx.fillStyle = grad
  round(ctx, 8, 8, S - 16, S - 16, 46)
  ctx.fill()

  ctx.strokeStyle = color
  ctx.globalAlpha = 0.5
  ctx.lineWidth = 3
  round(ctx, 8, 8, S - 16, S - 16, 46)
  ctx.stroke()
  ctx.globalAlpha = 1
}

/** Synchronous tile: official mark if there is one, otherwise the monogram. */
export function brandTileTexture(def: BrandDef) {
  const hit = tileCache.get(def.slug)
  if (hit) return hit

  const canvas = newCanvas()
  const ctx = canvas.getContext('2d')!
  drawTile(ctx, def.color)

  if (def.path) {
    const box = S * 0.5
    const off = (S - box) / 2
    ctx.save()
    ctx.translate(off, off)
    ctx.scale(box / 24, box / 24)
    ctx.fillStyle = def.color
    ctx.shadowColor = def.color
    ctx.shadowBlur = 14
    ctx.fill(new Path2D(def.path))
    ctx.restore()
  } else {
    ctx.fillStyle = def.color
    ctx.font = `700 ${def.initials && def.initials.length > 2 ? 66 : 86}px Inter, system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = def.color
    ctx.shadowBlur = 18
    ctx.fillText(def.initials ?? '?', S / 2, S / 2 + 4)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  tileCache.set(def.slug, tex)
  return tex
}

/** Async: an uploaded logo composited onto the same tile, or null if none. */
export function brandFileTexture(def: BrandDef) {
  const hit = fileCache.get(def.slug)
  if (hit) return hit

  const task = probeLogo(def.slug).then((url) => {
    if (!url) return null
    return new Promise<THREE.CanvasTexture | null>((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = newCanvas()
        const ctx = canvas.getContext('2d')!
        drawTile(ctx, def.color)
        const box = S * 0.56
        const scale = Math.min(box / img.width, box / img.height)
        const w = img.width * scale
        const h = img.height * scale
        ctx.drawImage(img, (S - w) / 2, (S - h) / 2, w, h)
        const tex = new THREE.CanvasTexture(canvas)
        tex.anisotropy = 4
        resolve(tex)
      }
      img.onerror = () => resolve(null)
      img.src = url
    })
  })

  fileCache.set(def.slug, task)
  return task
}

function round(
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

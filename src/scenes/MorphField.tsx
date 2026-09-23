import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../lib/scroll'
import { glowTexture } from '../lib/labelTexture'

/**
 * One particle system that re-forms itself as you scroll.
 *
 * Each section owns a target shape; the field blends continuously between the
 * current shape and the next one using the same scroll progress that drives the
 * camera, so the particles are always mid-way between "where you were" and
 * "where you're going".
 *
 * Shapes, in order:
 *   0 hero          sphere shell — the core
 *   1 about         the ॐ mark — where he's from
 *   2 capabilities  six clusters — the modules
 *   3 engine        a funnel — traffic narrowing into conversion
 *   4 skills        a lattice sphere — the stack
 *   5 experience    a descending helix — the career
 *   6 projects      four slabs — the cards
 *   7 education     two pillars under an arc — the degrees
 *   8 contact       an arrow pointing at the lead form
 */

const SHAPE_COLORS = [
  '#7dd3fc',
  '#22d3ee',
  '#a78bfa',
  '#38bdf8',
  '#c4b5fd',
  '#e879f9',
  '#5eead4',
  '#fbbf24',
  '#22d3ee',
]

export const SHAPE_COUNT = SHAPE_COLORS.length

/* ------------------------------------------------------------------ */
/*  Shape builders — each returns a Float32Array of xyz triples         */
/* ------------------------------------------------------------------ */

type Build = (n: number) => Float32Array

const rand = (a: number, b: number) => a + Math.random() * (b - a)

const sphereShell: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = rand(7.4, 9.4)
    a[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.78
    a[i * 3 + 2] = r * Math.cos(phi)
  }
  return a
}

const sixClusters: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const k = i % 6
    const col = k % 3
    const row = Math.floor(k / 3)
    const cx = (col - 1) * 5.6
    const cy = row === 0 ? 3.1 : -3.3
    // hollow rectangle outlines rather than blobs — reads as "modules"
    const w = 2.1
    const h = 1.35
    const edge = Math.random()
    let x: number, y: number
    if (edge < 0.5) {
      x = rand(-w, w)
      y = edge < 0.25 ? -h : h
    } else {
      x = edge < 0.75 ? -w : w
      y = rand(-h, h)
    }
    a[i * 3] = cx + x
    a[i * 3 + 1] = cy + y
    a[i * 3 + 2] = rand(-1.2, 1.2)
  }
  return a
}

const funnel: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const t = Math.pow(Math.random(), 0.65) // denser at the wide end
    const y = 5.6 - t * 11.5
    const r = 7.4 * (1 - t) + 0.5
    const theta = Math.random() * Math.PI * 2
    a[i * 3] = Math.cos(theta) * r
    a[i * 3 + 1] = y
    a[i * 3 + 2] = Math.sin(theta) * r * 0.75
  }
  return a
}

const latticeSphere: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    const radius = 6.8 + (i % 3) * 0.42
    a[i * 3] = Math.cos(theta) * r * radius
    a[i * 3 + 1] = y * radius * 0.9
    a[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return a
}

const helix: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const t = i / n
    const strand = i % 2 ? 0 : Math.PI
    const angle = t * Math.PI * 6 + strand
    const r = 4.6 + Math.sin(t * Math.PI) * 0.9
    a[i * 3] = Math.cos(angle) * r
    a[i * 3 + 1] = 6.4 - t * 12.8
    a[i * 3 + 2] = Math.sin(angle) * r * 0.75
  }
  return a
}

const slabs: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const k = i % 4
    const angle = (k - 1.5) * 0.55
    const cx = Math.sin(angle) * 6.4
    const cz = -Math.cos(angle) * 4.6 + 3.6
    const cy = k % 2 ? -1.9 : 1.9
    const w = 2.9
    const h = 1.85
    const edge = Math.random()
    let x: number, y: number
    if (edge < 0.5) {
      x = rand(-w, w)
      y = edge < 0.25 ? -h : h
    } else {
      x = edge < 0.75 ? -w : w
      y = rand(-h, h)
    }
    a[i * 3] = cx + x * Math.cos(angle)
    a[i * 3 + 1] = cy + y
    a[i * 3 + 2] = cz + x * -Math.sin(angle)
  }
  return a
}

const pillarsAndArc: Build = (n) => {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const mode = i % 3
    if (mode === 2) {
      // arc of certificates overhead
      const t = Math.random()
      const angle = Math.PI * (0.12 + t * 0.76)
      const r = 8.6
      a[i * 3] = Math.cos(angle) * r
      a[i * 3 + 1] = 1.6 + Math.sin(angle) * 5.2
      a[i * 3 + 2] = rand(-2, 2)
    } else {
      const side = mode === 0 ? -4.6 : 4.6
      const theta = Math.random() * Math.PI * 2
      const r = 1.9
      a[i * 3] = side + Math.cos(theta) * r
      a[i * 3 + 1] = rand(-5.4, 2.6)
      a[i * 3 + 2] = Math.sin(theta) * r
    }
  }
  return a
}

/** Samples the opaque pixels of a drawn glyph into 3D points. */
function glyphShape(draw: (ctx: CanvasRenderingContext2D, s: number) => void, world = 11): Build {
  return (n) => {
    const a = new Float32Array(n * 3)
    const S = 220
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = S
    const ctx = canvas.getContext('2d')!
    draw(ctx, S)
    const data = ctx.getImageData(0, 0, S, S).data

    const pts: number[] = []
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        if (data[(y * S + x) * 4 + 3] > 120) pts.push(x, y)
      }
    }

    const count = pts.length / 2
    for (let i = 0; i < n; i++) {
      if (count === 0) break
      // walk the contour evenly rather than picking at random — random
      // sampling clumps, and a clumped outline reads as a blob
      const k = Math.floor(((i + 0.5) / n) * count) * 2
      const px = pts[k] + rand(-0.6, 0.6)
      const py = pts[k + 1] + rand(-0.6, 0.6)
      a[i * 3] = (px / S - 0.5) * world
      a[i * 3 + 1] = -(py / S - 0.5) * world
      a[i * 3 + 2] = rand(-0.45, 0.45)
    }
    return a
  }
}

/**
 * ॐ — drawn as text so it is always the real character.
 * Devanagari is loaded as a webfont, so the field rebuilds once fonts settle
 * (see `fontsReady` below); until then this falls back to whatever is present.
 */
const omGlyph = glyphShape((ctx, S) => {
  ctx.clearRect(0, 0, S, S)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // A light weight filled: the glyph's own strokes are then thin enough that
  // the particles sit along them like a drawn line. Stroking instead would
  // give two parallel contours that merge into a blob at this size.
  ctx.font = `400 ${S * 0.82}px "Noto Sans Devanagari", "Nirmala UI", system-ui, serif`
  ctx.fillStyle = '#fff'
  ctx.fillText('ॐ', S * 0.5, S * 0.52)
}, 12.5)

/** A left-pointing arrow — the field aims straight at the contact form. */
const leadArrow = glyphShape((ctx, S) => {
  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle = '#fff'
  ctx.strokeStyle = '#fff'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // shaft
  ctx.lineWidth = S * 0.075
  ctx.beginPath()
  ctx.moveTo(S * 0.86, S * 0.5)
  ctx.lineTo(S * 0.3, S * 0.5)
  ctx.stroke()

  // head
  ctx.lineWidth = S * 0.07
  ctx.beginPath()
  ctx.moveTo(S * 0.46, S * 0.28)
  ctx.lineTo(S * 0.24, S * 0.5)
  ctx.lineTo(S * 0.46, S * 0.72)
  ctx.stroke()

  // the form it points at
  ctx.lineWidth = S * 0.035
  ctx.strokeRect(S * 0.04, S * 0.3, S * 0.14, S * 0.4)
}, 11)

const BUILDERS: Build[] = [
  sphereShell,
  omGlyph,
  sixClusters,
  funnel,
  latticeSphere,
  helix,
  slabs,
  pillarsAndArc,
  leadArrow,
]

/* ------------------------------------------------------------------ */
/*  The component                                                      */
/* ------------------------------------------------------------------ */

export default function MorphField({
  quality = 1,
  bias = 0,
  camOffset = 17,
  scale = 1,
}: {
  quality?: number
  bias?: number
  camOffset?: number
  scale?: number
}) {
  const count = Math.max(700, Math.round(2400 * quality))
  const points = useRef<THREE.Points>(null)
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.PointsMaterial>(null)
  const { camera } = useThree()

  // Devanagari arrives as a webfont; rebuild once it has, so the ॐ shape is
  // sampled from the real glyph rather than a missing-character box.
  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    if (!fonts) return
    let alive = true
    fonts.ready.then(() => alive && setFontsReady(true))
    return () => {
      alive = false
    }
  }, [])

  const shapes = useMemo(() => BUILDERS.map((b) => b(count)), [count, fontsReady])
  const colors = useMemo(() => SHAPE_COLORS.map((c) => new THREE.Color(c)), [])

  const positions = useMemo(() => Float32Array.from(shapes[0]), [shapes])
  const seeds = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) s[i] = Math.random() * Math.PI * 2
    return s
  }, [count])

  const tmpColor = useMemo(() => new THREE.Color(), [])
  const sprite = useMemo(() => glowTexture(), [])

  useFrame((state) => {
    if (!points.current || !group.current) return

    // Follow the camera so the field is always the ambient layer of "this" zone.
    // sized and centred on the same readable strip the zones use, so the
    // ambient field and the zone content always agree with each other
    group.current.position.set(bias + 0.3 * scale, 0, camera.position.z - camOffset)
    group.current.scale.setScalar(scale * 0.78)

    const zp = scrollState.eased * (SHAPE_COUNT - 1)
    const i = Math.min(SHAPE_COUNT - 2, Math.floor(zp))
    const raw = Math.min(1, Math.max(0, zp - i))
    const t = raw * raw * (3 - 2 * raw) // smoothstep

    const from = shapes[i]
    const to = shapes[i + 1]
    const attr = points.current.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const time = state.clock.elapsedTime

    for (let p = 0; p < count; p++) {
      const k = p * 3
      const wob = Math.sin(time * 0.55 + seeds[p]) * 0.09
      arr[k] = from[k] + (to[k] - from[k]) * t + wob
      arr[k + 1] = from[k + 1] + (to[k + 1] - from[k + 1]) * t + wob * 0.7
      arr[k + 2] = from[k + 2] + (to[k + 2] - from[k + 2]) * t
    }
    attr.needsUpdate = true

    group.current.rotation.y = Math.sin(time * 0.05) * 0.14

    if (material.current) {
      tmpColor.copy(colors[i]).lerp(colors[i + 1], t)
      material.current.color.copy(tmpColor)
      // particles tighten up as a shape locks in, and loosen mid-transition
      const settle = 1 - Math.sin(t * Math.PI) * 0.45
      material.current.size = 0.11 * settle + 0.05
      material.current.opacity = 0.4 + settle * 0.22
    }
  })

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material}
          map={sprite}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  )
}

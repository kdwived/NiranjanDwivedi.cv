import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture } from '../lib/labelTexture'

/**
 * Everything in this world is drawn with particles.
 *
 * No wireframes, no tubes, no solid rings — a shape is a set of points sampled
 * along its edges or its path, spaced evenly so it reads as a bead-chain rather
 * than a line, and always drifting a little so it feels alive.
 *
 * The samplers below turn any geometry or curve into that point set; the
 * components render it and give it motion.
 */

/* ================================================================== */
/*  Samplers                                                           */
/* ================================================================== */

const jitter = (amount: number) => (Math.random() - 0.5) * 2 * amount

/** Evenly spaced points along the edges of any geometry. */
export function sampleEdges(geometry: THREE.BufferGeometry, count: number, spread = 0.05) {
  const edges = new THREE.EdgesGeometry(geometry, 1)
  const p = edges.attributes.position.array as ArrayLike<number>
  const segments = p.length / 6

  const lengths = new Float32Array(segments)
  let total = 0
  for (let s = 0; s < segments; s++) {
    const i = s * 6
    const dx = p[i + 3] - p[i]
    const dy = p[i + 4] - p[i + 1]
    const dz = p[i + 5] - p[i + 2]
    const len = Math.hypot(dx, dy, dz)
    lengths[s] = len
    total += len
  }

  const out = new Float32Array(count * 3)
  let seg = 0
  let walked = 0
  for (let k = 0; k < count; k++) {
    const target = ((k + 0.5) / count) * total
    while (seg < segments - 1 && walked + lengths[seg] < target) {
      walked += lengths[seg]
      seg++
    }
    const t = lengths[seg] > 0 ? (target - walked) / lengths[seg] : 0
    const i = seg * 6
    out[k * 3] = p[i] + (p[i + 3] - p[i]) * t + jitter(spread)
    out[k * 3 + 1] = p[i + 1] + (p[i + 4] - p[i + 1]) * t + jitter(spread)
    out[k * 3 + 2] = p[i + 2] + (p[i + 5] - p[i + 2]) * t + jitter(spread)
  }

  edges.dispose()
  return out
}

/** Evenly spaced points along a path through the given control points. */
export function sampleCurve(
  controls: THREE.Vector3[],
  count: number,
  spread = 0.06,
  closed = false,
) {
  const curve = new THREE.CatmullRomCurve3(controls, closed)
  const out = new Float32Array(count * 3)
  const v = new THREE.Vector3()
  for (let k = 0; k < count; k++) {
    curve.getPointAt(k / (count - 1 || 1), v)
    out[k * 3] = v.x + jitter(spread)
    out[k * 3 + 1] = v.y + jitter(spread)
    out[k * 3 + 2] = v.z + jitter(spread)
  }
  return out
}

/** Evenly spaced points around a circle in the XY plane. */
export function sampleRing(radius: number, count: number, spread = 0.05) {
  const out = new Float32Array(count * 3)
  for (let k = 0; k < count; k++) {
    const a = (k / count) * Math.PI * 2
    const r = radius + jitter(spread * 2)
    out[k * 3] = Math.cos(a) * r
    out[k * 3 + 1] = Math.sin(a) * r
    out[k * 3 + 2] = jitter(spread)
  }
  return out
}

/** A soft ball of points — used wherever a solid node used to sit. */
export function sampleCluster(radius: number, count: number) {
  const out = new Float32Array(count * 3)
  for (let k = 0; k < count; k++) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = radius * Math.cbrt(Math.random())
    out[k * 3] = r * Math.sin(phi) * Math.cos(theta)
    out[k * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    out[k * 3 + 2] = r * Math.cos(phi)
  }
  return out
}

/** Points on a flat lattice — the particle version of a floor grid. */
export function sampleLattice(size: number, divisions: number, spread = 0.25) {
  const step = size / divisions
  const out: number[] = []
  for (let i = 0; i <= divisions; i++) {
    for (let j = 0; j <= divisions; j++) {
      out.push(
        -size / 2 + i * step + jitter(spread),
        jitter(spread * 0.5),
        -size / 2 + j * step + jitter(spread),
      )
    }
  }
  return new Float32Array(out)
}

/* ================================================================== */
/*  Renderers                                                          */
/* ================================================================== */

type BaseProps = {
  positions: Float32Array
  color?: string
  size?: number
  opacity?: number
  /** gentle breathing so nothing ever looks frozen */
  pulse?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

/** The one place particles actually get drawn. */
export function ParticleShape({
  positions,
  color = '#22d3ee',
  size = 0.19,
  opacity = 0.95,
  pulse = 0.16,
  position,
  rotation,
}: BaseProps) {
  const sprite = useMemo(() => glowTexture(), [])
  const material = useRef<THREE.PointsMaterial>(null)
  const seed = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!material.current || pulse <= 0) return
    const t = state.clock.elapsedTime
    material.current.opacity = opacity * (1 - pulse + pulse * (0.5 + 0.5 * Math.sin(t * 0.9 + seed)))
  })

  return (
    <points position={position} rotation={rotation}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        map={sprite}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}

/** A ring of particles that slowly turns. Replaces every torus in the scene. */
export function ParticleRing({
  radius,
  count = 150,
  color = '#22d3ee',
  size = 0.17,
  opacity = 0.9,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  spin = 0.12,
  spread = 0.05,
}: {
  radius: number
  count?: number
  color?: string
  size?: number
  opacity?: number
  rotation?: [number, number, number]
  position?: [number, number, number]
  spin?: number
  spread?: number
}) {
  const positions = useMemo(() => sampleRing(radius, count, spread), [radius, count, spread])
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.z += Math.min(delta, 0.1) * spin
    // a slow breath in and out, so the ring never looks like a drawn circle
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.5 + radius) * 0.015
    group.current.scale.setScalar(s)
  })

  return (
    <group position={position} rotation={rotation}>
      <group ref={group}>
        <ParticleShape positions={positions} color={color} size={size} opacity={opacity} />
      </group>
    </group>
  )
}

/**
 * Particles strung along a path, with a bright pulse travelling down it.
 * Replaces the solid tubes that used to connect the pipeline and the timeline.
 */
export function ParticleFlow({
  controls,
  count = 260,
  color = '#22d3ee',
  head = '#ffffff',
  size = 0.19,
  speed = 0.16,
  spread = 0.07,
  pulses = 2,
}: {
  controls: THREE.Vector3[]
  count?: number
  color?: string
  head?: string
  size?: number
  speed?: number
  spread?: number
  pulses?: number
}) {
  const sprite = useMemo(() => glowTexture(), [])
  const positions = useMemo(() => sampleCurve(controls, count, spread), [controls, count, spread])

  const base = useMemo(() => new THREE.Color(color), [color])
  const bright = useMemo(() => new THREE.Color(head), [head])
  const colors = useMemo(() => {
    const c = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      c[i * 3] = base.r
      c[i * 3 + 1] = base.g
      c[i * 3 + 2] = base.b
    }
    return c
  }, [count, base])

  const points = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!points.current) return
    const attr = points.current.geometry.getAttribute('color') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const t = state.clock.elapsedTime * speed
    const width = count * 0.07

    for (let i = 0; i < count; i++) {
      let glow = 0
      for (let p = 0; p < pulses; p++) {
        const headPos = (((t + p / pulses) % 1) * count) | 0
        const d = Math.abs(i - headPos)
        glow = Math.max(glow, Math.exp(-(d * d) / (2 * width * width)))
      }
      arr[i * 3] = base.r + (bright.r - base.r) * glow
      arr[i * 3 + 1] = base.g + (bright.g - base.g) * glow
      arr[i * 3 + 2] = base.b + (bright.b - base.b) * glow
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        vertexColors
        size={size}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}

/** The particle version of a wireframe — samples the edges of any geometry. */
export function ParticleEdges({
  geometry,
  count = 400,
  color = '#22d3ee',
  size = 0.16,
  opacity = 0.85,
  spread = 0.05,
}: {
  geometry: THREE.BufferGeometry
  count?: number
  color?: string
  size?: number
  opacity?: number
  spread?: number
}) {
  const positions = useMemo(
    () => sampleEdges(geometry, count, spread),
    [geometry, count, spread],
  )
  return <ParticleShape positions={positions} color={color} size={size} opacity={opacity} />
}

/** A soft ball of particles where a solid node used to be. */
export function ParticleNode({
  position = [0, 0, 0],
  radius = 0.34,
  count = 70,
  color = '#22d3ee',
  size = 0.21,
}: {
  position?: [number, number, number]
  radius?: number
  count?: number
  color?: string
  size?: number
}) {
  const positions = useMemo(() => sampleCluster(radius, count), [radius, count])
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.scale.setScalar(1 + Math.sin(t * 1.6 + position[1]) * 0.12)
    group.current.rotation.y = t * 0.25
  })

  return (
    <group position={position} ref={group}>
      <ParticleShape positions={positions} color={color} size={size} opacity={1} pulse={0.1} />
    </group>
  )
}

/** A rectangle outline in particles — the frame for a card in 3D. */
export function ParticleFrame({
  width,
  height,
  count = 220,
  color = '#22d3ee',
  size = 0.16,
  opacity = 0.9,
}: {
  width: number
  height: number
  count?: number
  color?: string
  size?: number
  opacity?: number
}) {
  const positions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height)
    const out = sampleEdges(geo, count, 0.035)
    geo.dispose()
    return out
  }, [width, height, count])

  return <ParticleShape positions={positions} color={color} size={size} opacity={opacity} />
}

/** Sparse particle lattice standing in for the old floor / ceiling grid. */
export function ParticleLattice({
  size = 300,
  divisions = 26,
  color = '#2a3a63',
  position = [0, 0, 0],
  pointSize = 0.16,
  opacity = 0.5,
}: {
  size?: number
  divisions?: number
  color?: string
  position?: [number, number, number]
  pointSize?: number
  opacity?: number
}) {
  const positions = useMemo(() => sampleLattice(size, divisions), [size, divisions])
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.25) * 0.4
  })

  return (
    <group ref={group} position={position}>
      <ParticleShape
        positions={positions}
        color={color}
        size={pointSize}
        opacity={opacity}
        pulse={0.25}
      />
    </group>
  )
}

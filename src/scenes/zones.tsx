import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Bob, Glow, Label, Spin } from './primitives'
import { useScrollIndex } from '../hooks/useScrollIndex'
import { damp, focusState } from '../lib/scroll'
import {
  ParticleEdges,
  ParticleFlow,
  ParticleFrame,
  ParticleNode,
  ParticleRing,
  ParticleShape,
  sampleCluster,
} from './particles'
import BrandPlane from './BrandPlane'
import {
  capabilities,
  certificates,
  education,
  experience,
  growthFlow,
  projects,
  toolkit,
} from '../data/portfolio'

/* ------------------------------------------------------------------ *
 *  LAYOUT BUDGET
 *
 *  On a wide screen the text column occupies the left two-thirds, so the
 *  world only ever gets a tall, narrow strip on the right — roughly ten
 *  units across and thirteen tall in this scene's units.
 *
 *  Every zone below is therefore composed as a VERTICAL column inside that
 *  strip. Nothing may leave the box, and nothing may overlap anything else:
 *  rows are spaced by more than their own height, and labels are anchored to
 *  the element they name so they can't drift as the text gets longer.
 * ------------------------------------------------------------------ */

const BOX = { x: [-4.6, 5.2], y: [-6.2, 6.2] } as const
/** the middle of the readable strip — every zone centres on this */
const CX = (BOX.x[0] + BOX.x[1]) / 2

const CYAN = '#22d3ee'
const VIOLET = '#8b5cf6'
const MAGENTA = '#e879f9'

/** One ramp for the whole scene, so every accent belongs to the same theme. */
const RAMP = [new THREE.Color(CYAN), new THREE.Color(VIOLET), new THREE.Color(MAGENTA)]
function themeColor(t: number) {
  const x = Math.min(1, Math.max(0, t)) * (RAMP.length - 1)
  const i = Math.min(RAMP.length - 2, Math.floor(x))
  return `#${RAMP[i].clone().lerp(RAMP[i + 1], x - i).getHexString()}`
}

export type ZoneProps = { quality: number }

/** particle budgets scale down on phones */
const q = (n: number, quality: number) => Math.max(20, Math.round(n * quality))

/* ================================================================== */
/*  01 — HERO : a shell that frames the portrait                       */
/* ================================================================== */

export function HeroZone({ quality }: ZoneProps) {
  // deliberately centred on the portrait card rather than the strip
  const OFFSET: [number, number, number] = [-1.6, 0, -1]

  const outer = useMemo(() => new THREE.IcosahedronGeometry(7.8, 0), [])
  const mid = useMemo(() => new THREE.IcosahedronGeometry(5.6, 0), [])
  const core = useMemo(() => new THREE.IcosahedronGeometry(3.0, 0), [])

  return (
    <group position={OFFSET}>
      <Spin y={0.1} x={0.03}>
        <ParticleEdges geometry={outer} count={q(880, quality)} color={CYAN} size={0.22} opacity={0.95} />
      </Spin>
      <Spin y={-0.08} z={0.04}>
        <ParticleEdges geometry={mid} count={q(580, quality)} color={VIOLET} size={0.24} opacity={1} />
      </Spin>
      <Spin y={0.16}>
        <ParticleEdges geometry={core} count={q(400, quality)} color={MAGENTA} size={0.26} opacity={1} />
      </Spin>

      <ParticleNode radius={1.4} count={q(80, quality)} color="#ffffff" size={0.2} />

      <ParticleRing
        radius={8.2}
        count={q(190, quality)}
        color={CYAN}
        rotation={[Math.PI / 2.2, 0, 0]}
        spin={0.16}
        size={0.2}
        opacity={0.95}
      />
      <ParticleRing
        radius={9.4}
        count={q(170, quality)}
        color={MAGENTA}
        rotation={[0.35, 0.4, Math.PI / 3]}
        spin={-0.11}
        size={0.17}
        opacity={0.8}
      />

      <Glow scale={22} color={VIOLET} opacity={0.2} />
    </group>
  )
}

/* ================================================================== */
/*  02 — ABOUT : three disciplines orbiting one centre                 */
/* ================================================================== */

export function AboutZone(_: ZoneProps) {
  // Deliberately empty. The particle field forms the ॐ here, and anything
  // orbiting around it — rings, drifting clusters — only crowded the mark.
  return (
    <group position={[CX, 0, 0]}>
      <Glow scale={20} color={CYAN} opacity={0.12} />
    </group>
  )
}

/* ================================================================== */
/*  03 — CAPABILITIES : the tools on two orbits                        */
/* ================================================================== */

export function CapabilitiesZone({ quality }: ZoneProps) {
  const rings = useMemo(() => {
    const seen = new Set<string>()
    const list: { name: string; owner: string }[] = []
    for (const c of capabilities) {
      for (const t of c.tools) {
        if (seen.has(t)) continue
        seen.add(t)
        list.push({ name: t, owner: c.n })
      }
    }
    const half = Math.ceil(list.length / 2)
    return [
      { items: list.slice(0, half), radius: 4.5, y: 2.4, dir: 1, color: CYAN },
      { items: list.slice(half), radius: 3.4, y: -2.6, dir: -1, color: MAGENTA },
    ]
  }, [])

  return (
    <group position={[CX, 0, 0]}>
      {rings.map((ring, r) => (
        <group key={r} position={[0, ring.y, 0]}>
          <ParticleRing
            radius={ring.radius}
            count={q(110, quality)}
            color={ring.color}
            rotation={[Math.PI / 2, 0, 0]}
            spin={0.14 * ring.dir}
            size={0.155}
            opacity={0.85}
          />
          <ToolOrbit items={ring.items} radius={ring.radius} dir={ring.dir} />
        </group>
      ))}

      {/* the spine that ties the two orbits together */}
      <ParticleFlow
        controls={[new THREE.Vector3(0, 2.4, 0), new THREE.Vector3(0, -2.6, 0)]}
        count={q(70, quality)}
        color={VIOLET}
        head="#ffffff"
        size={0.16}
        speed={0.22}
        pulses={1}
        spread={0.05}
      />
      <ParticleNode radius={0.75} count={q(40, quality)} color={VIOLET} size={0.18} />
      <Glow scale={18} color={VIOLET} opacity={0.13} />
    </group>
  )
}

/**
 * Free-spinning ring of tool logos that, the moment you hover a capability
 * card, turns to bring that card's own tools round to the front and holds
 * them there until you move away.
 */
function ToolOrbit({
  items,
  radius,
  dir,
}: {
  items: { name: string; owner: string }[]
  radius: number
  dir: number
}) {
  const group = useRef<THREE.Group>(null)
  const spun = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return
    const dt = Math.min(delta, 0.1)

    const focused =
      focusState.zone === 'capabilities'
        ? items.findIndex((it) => it.owner === focusState.key)
        : -1

    if (focused >= 0) {
      // park the focused logo at the front of the orbit
      const a = (focused / items.length) * Math.PI * 2
      const want = -a + Math.PI / 2
      let diff = want - spun.current
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      spun.current = damp(spun.current, spun.current + diff, 5, dt)
    } else {
      spun.current += dt * 0.11 * dir
    }
    group.current.rotation.y = spun.current
  })

  return (
    <group ref={group}>
      {items.map((it, i) => {
        const a = (i / items.length) * Math.PI * 2
        return (
          <BrandPlane
            key={it.name}
            name={it.name}
            position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}
            size={1.15}
            glow={0.18}
            focusZone="capabilities"
            focusKey={it.owner}
          />
        )
      })}
    </group>
  )
}

/* ================================================================== */
/*  04 — GROWTH ENGINE : six stages down one path                      */
/* ================================================================== */

export function EngineZone({ quality }: ZoneProps) {
  // a gentle S down the middle of the strip; every stage keeps its own row
  const NODE_X = -2.2
  const ROW = 1.62

  const points = useMemo(
    () =>
      growthFlow.map(
        (_, i) =>
          new THREE.Vector3(
            NODE_X + Math.sin(i * 0.85) * 0.55,
            4.1 - i * ROW,
            Math.cos(i * 0.7) * 0.9,
          ),
      ),
    [],
  )

  return (
    <group position={[CX, 0, 0]}>
      <ParticleFlow
        controls={points}
        count={q(260, quality)}
        color={CYAN}
        head="#ffffff"
        size={0.17}
        pulses={2}
      />

      {points.map((p, i) => {
        const color = themeColor(i / (growthFlow.length - 1))
        return (
          <group key={growthFlow[i]} position={[p.x, p.y, p.z]}>
            <ParticleNode radius={0.46} count={q(44, quality)} color={color} size={0.25} />
            <ParticleRing
              radius={0.82}
              count={q(40, quality)}
              color={color}
              rotation={[Math.PI / 2.4, 0, 0]}
              spin={0.3}
              size={0.14}
              opacity={0.9}
            />
            {/* number sits left of the node, name sits right of it — both
                anchored, so a long name can never wander off on its own */}
            <Label
              text={`0${i + 1}`}
              position={[-1.15, 0.02, 0]}
              anchor="right"
              color="#ffffff"
              height={0.34}
              size={44}
              weight={500}
              opacity={0.45}
            />
            <Label
              text={growthFlow[i]}
              position={[1.05, 0.02, 0]}
              anchor="left"
              color={color}
              height={0.46}
              size={56}
              weight={700}
            />
          </group>
        )
      })}

      <Glow scale={20} color={CYAN} opacity={0.11} />
    </group>
  )
}

/* ================================================================== */
/*  05 — SKILLS : the toolkit inside a particle shell                  */
/* ================================================================== */

export function SkillsZone({ quality }: ZoneProps) {
  const R = 4.7
  const shell = useMemo(() => new THREE.IcosahedronGeometry(R, 0), [])

  const nodes = useMemo(() => {
    const n = toolkit.length
    return toolkit.map((name, i) => {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = Math.PI * (3 - Math.sqrt(5)) * i
      return {
        name,
        pos: [Math.cos(theta) * r * R, y * R * 1.05, Math.sin(theta) * r * R] as [
          number,
          number,
          number,
        ],
      }
    })
  }, [R])

  return (
    <group position={[CX, 0, 0]}>
      <Spin y={0.07} x={0.012}>
        <ParticleEdges geometry={shell} count={q(620, quality)} color={VIOLET} size={0.15} opacity={0.5} />
        {nodes.map((nd) => (
          <BrandPlane key={nd.name} name={nd.name} position={nd.pos} size={1.25} glow={0.2} />
        ))}
      </Spin>

      <ParticleNode radius={0.95} count={q(60, quality)} color={CYAN} size={0.19} />
      <Glow scale={16} color={VIOLET} opacity={0.16} />
    </group>
  )
}

/* ================================================================== */
/*  06 — EXPERIENCE : one row per role, logo left, name right          */
/* ================================================================== */

export function ExperienceZone({ quality }: ZoneProps) {
  const ROW = 1.2
  const TOP = 4.35
  const LOGO_X = -2.4
  // section 5 is Experience — this follows which card you are reading
  const active = useScrollIndex(experience.length, 5)

  const points = useMemo(
    () =>
      experience.map((_, i) => {
        const a = i * 0.82
        return new THREE.Vector3(LOGO_X + Math.sin(a) * 0.7, TOP - i * ROW, Math.cos(a) * 1.1)
      }),
    [],
  )

  return (
    <group position={[CX, 0, 0]}>
      <ParticleFlow
        controls={points}
        count={q(300, quality)}
        color={VIOLET}
        head={CYAN}
        size={0.15}
        speed={0.1}
        pulses={2}
      />

      {points.map((p, i) => {
        const job = experience[i]
        const on = i === active
        const color = on ? CYAN : themeColor(0.35 + (i / experience.length) * 0.6)
        return (
          <group key={job.n} position={[p.x, p.y, p.z]}>
            <ParticleNode
              radius={on ? 0.62 : 0.5}
              count={q(on ? 40 : 26, quality)}
              color={color}
              size={on ? 0.19 : 0.14}
            />
            <BrandPlane
              name={job.company}
              size={0.95}
              glow={on ? 0.28 : 0.12}
              highlight={on ? 1 : 0}
            />
            {/* a marker that only the row you are reading gets */}
            {on && (
              <ParticleRing
                radius={1.1}
                count={q(52, quality)}
                color={CYAN}
                rotation={[Math.PI / 2.3, 0, 0]}
                spin={0.5}
                size={0.13}
                opacity={0.9}
              />
            )}
            <Label
              text={job.company}
              position={[0.85, 0.15, 0]}
              anchor="left"
              color="#ffffff"
              height={on ? 0.36 : 0.3}
              size={46}
              weight={600}
              opacity={on ? 1 : 0.55}
            />
            <Label
              text={job.period}
              position={[0.85, on ? -0.24 : -0.19, 0]}
              anchor="left"
              color={color}
              height={0.22}
              size={40}
              weight={500}
              opacity={on ? 0.95 : 0.45}
            />
          </group>
        )
      })}

      <Glow scale={20} color={VIOLET} opacity={0.13} />
    </group>
  )
}

/* ================================================================== */
/*  07 — PROJECTS : four cards stacked, never touching                 */
/* ================================================================== */

export function ProjectsZone({ quality }: ZoneProps) {
  const W = 3.5
  const H = 2.0
  const COL = 1.95 // half the horizontal pitch
  const ROW = 1.35 // half the vertical pitch — both > half the frame, so no overlap
  // section 6 is Projects — the frame for the card you are reading lights up
  const active = useScrollIndex(projects.length, 6)

  return (
    <group position={[CX, 0, 0]}>
      {projects.map((project, i) => {
        // same reading order as the HTML grid: 01 02 on top, 03 04 below
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = col === 0 ? -COL : COL
        const y = row === 0 ? ROW + H / 2 : -(ROW + H / 2)
        const on = i === active
        const color = on ? CYAN : themeColor(i / (projects.length - 1))
        return (
          <group key={project.n}>
            {/* tie-line from the left-hand column back towards the cards */}
            {col === 0 && (
              <ParticleFlow
                controls={[
                  new THREE.Vector3(x - W / 2 - 0.2, y, 0),
                  new THREE.Vector3(x - W / 2 - 2.4, y + 0.1, 0.3),
                ]}
                count={q(on ? 40 : 26, quality)}
                color={color}
                head="#ffffff"
                size={on ? 0.15 : 0.1}
                speed={on ? 0.5 : 0.16}
                pulses={1}
                spread={0.04}
              />
            )}

            <Bob amplitude={0.11} speed={0.5} offset={i * 1.3} rotate={0.01}>
              <group position={[x, y, col === 0 ? 0 : -0.4]} rotation={[0, col === 0 ? 0.09 : -0.09, 0]}>
                <ParticleFrame
                  width={W}
                  height={H}
                  count={q(on ? 240 : 175, quality)}
                  color={color}
                  size={on ? 0.17 : 0.13}
                  opacity={on ? 1 : 0.6}
                />
                <BrandPlane
                  name={project.tags[0]}
                  position={[-W / 2 + 0.5, H / 2 - 0.48, 0.05]}
                  size={0.6}
                  glow={on ? 0.22 : 0.09}
                  highlight={on ? 1 : 0}
                />
                <Label
                  text={project.n}
                  position={[W / 2 - 0.22, H / 2 - 0.48, 0.05]}
                  anchor="right"
                  color={color}
                  height={0.4}
                  size={64}
                  weight={700}
                  opacity={on ? 0.95 : 0.45}
                />
                <Label
                  text={project.category}
                  position={[-W / 2 + 0.24, -0.18, 0.05]}
                  anchor="left"
                  color="#ffffff"
                  height={0.25}
                  size={48}
                  weight={600}
                  opacity={on ? 1 : 0.45}
                />
                <Label
                  text={project.kind}
                  position={[-W / 2 + 0.24, -0.62, 0.05]}
                  anchor="left"
                  color={color}
                  height={0.17}
                  size={40}
                  weight={500}
                  opacity={on ? 0.9 : 0.35}
                />
                <Glow scale={6} color={color} opacity={on ? 0.18 : 0.07} position={[0, 0, -0.5]} />
              </group>
            </Bob>
          </group>
        )
      })}
    </group>
  )
}

/* ================================================================== */
/*  08 — EDUCATION : two pillars, credentials arcing above them        */
/* ================================================================== */

export function EducationZone({ quality }: ZoneProps) {
  const pillar = useMemo(() => new THREE.CylinderGeometry(0.95, 1.2, 4.6, 6, 1, true), [])
  const shown = certificates.slice(0, Math.max(6, Math.round(certificates.length * quality)))

  return (
    <group position={[CX, 0, 0]}>
      {education.map((e, i) => {
        const color = i === 0 ? CYAN : MAGENTA
        const x = i === 0 ? -2.5 : 2.5
        return (
          <group key={e.n} position={[x, -2.9, 0]}>
            <ParticleEdges
              geometry={pillar}
              count={q(340, quality)}
              color={color}
              size={0.17}
              opacity={0.95}
            />
            <BrandPlane name={e.institute} position={[0, 0.3, 0]} size={1.15} glow={0.2} />
            <ParticleRing
              radius={1.55}
              count={q(80, quality)}
              color={color}
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, 2.5, 0]}
              spin={i === 0 ? 0.3 : -0.3}
              size={0.13}
              opacity={0.75}
            />
            <Label
              text={i === 0 ? 'Bachelor’s' : 'BCA'}
              position={[0, 3.3, 0]}
              color="#ffffff"
              height={0.36}
              size={50}
              weight={600}
            />
            <Label
              text={e.year}
              position={[0, 2.86, 0]}
              color={color}
              height={0.24}
              size={40}
              weight={500}
              opacity={0.9}
            />
          </group>
        )
      })}

      {/* a fixed fan of credentials above the pillars — it bobs but never
          orbits, so nothing can swing out of the readable strip */}
      {shown.map((c, i) => {
        const a = Math.PI * (0.88 - (i / (shown.length - 1)) * 0.76)
        return (
          <Bob key={`${c.title}-${i}`} amplitude={0.16} speed={0.5} offset={i * 0.8} rotate={0}>
            <BrandPlane
              name={c.issuer}
              position={[Math.cos(a) * 4.0, 2.5 + Math.sin(a) * 2.5, -0.4]}
              size={0.85}
              glow={0.16}
            />
          </Bob>
        )
      })}

      <Glow scale={20} color={MAGENTA} opacity={0.1} />
    </group>
  )
}

/* ================================================================== */
/*  09 — CONTACT : kept clear so the field can form the link mark      */
/* ================================================================== */

export function ContactZone({ quality }: ZoneProps) {
  const marker = useMemo(() => sampleCluster(0.36, 34), [])

  return (
    <group position={[CX, 0, 0]}>
      <group position={[0, -4.4, 0]}>
        <ParticleShape positions={marker} color={CYAN} size={0.18} opacity={0.9} />
      </group>

      <ParticleRing
        radius={4.7}
        count={q(180, quality)}
        color={MAGENTA}
        rotation={[Math.PI / 2.1, 0, 0]}
        spin={0.3}
        size={0.13}
        opacity={0.6}
      />
      <ParticleRing
        radius={5.8}
        count={q(210, quality)}
        color={VIOLET}
        rotation={[Math.PI / 2.6, 0, Math.PI / 5]}
        spin={-0.22}
        size={0.115}
        opacity={0.5}
      />

      <Glow scale={20} color={CYAN} opacity={0.15} />
    </group>
  )
}

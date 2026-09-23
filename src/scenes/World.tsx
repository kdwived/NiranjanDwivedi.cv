import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { damp, scrollState } from '../lib/scroll'
import { glowTexture } from '../lib/labelTexture'
import MorphField from './MorphField'
import { ParticleLattice } from './particles'
import {
  AboutZone,
  CapabilitiesZone,
  ContactZone,
  EducationZone,
  EngineZone,
  ExperienceZone,
  HeroZone,
  ProjectsZone,
  SkillsZone,
} from './zones'

/** Distance between zone centres along -Z. */
export const SPACING = 44
/** How far in front of a zone the camera sits. */
export const CAM_OFFSET = 17

const ZONES = [
  HeroZone,
  AboutZone,
  CapabilitiesZone,
  EngineZone,
  SkillsZone,
  ExperienceZone,
  ProjectsZone,
  EducationZone,
  ContactZone,
]

export const ZONE_COUNT = ZONES.length

/* ------------------------------------------------------------------ */
/*  Camera rig — scroll drives Z, pointer adds parallax                 */
/* ------------------------------------------------------------------ */

function CameraRig() {
  const { camera } = useThree()
  const look = useRef(new THREE.Vector3(0, 0, -CAM_OFFSET))
  const px = useRef(0)
  const py = useRef(0)

  useFrame((_, delta) => {
    // Clamped generously so a slow frame still makes real progress — otherwise
    // the camera lags a long way behind the scroll on low-powered devices.
    const dt = Math.min(delta, 0.12)
    scrollState.eased = damp(scrollState.eased, scrollState.target, 4, dt)
    if (Math.abs(scrollState.target - scrollState.eased) < 0.0006) {
      scrollState.eased = scrollState.target
    }
    const p = scrollState.eased

    px.current = damp(px.current, scrollState.pointerX, 2.5, dt)
    py.current = damp(py.current, scrollState.pointerY, 2.5, dt)

    const travel = (ZONE_COUNT - 1) * SPACING
    const z = CAM_OFFSET - p * travel
    const swayX = Math.sin(p * Math.PI * 3.2) * 2
    const swayY = Math.sin(p * Math.PI * 2.1) * 1.3

    camera.position.set(swayX + px.current * 1.6, swayY + 0.6 - py.current * 1.1, z)

    look.current.set(swayX * 0.28 + px.current * 0.5, swayY * 0.25, z - CAM_OFFSET)
    camera.lookAt(look.current)
    camera.rotation.z = Math.sin(p * Math.PI * 2.6) * 0.045
  })

  return null
}

/* ------------------------------------------------------------------ */
/*  Only render a zone while the camera is anywhere near it             */
/* ------------------------------------------------------------------ */

function ZoneSlot({
  z,
  bias,
  scale,
  children,
}: {
  z: number
  bias: number
  scale: number
  children: ReactNode
}) {
  const group = useRef<THREE.Group>(null)
  const { camera } = useThree()
  useFrame(() => {
    if (!group.current) return
    group.current.visible = Math.abs(camera.position.z - z) < SPACING * 1.6
  })
  return (
    <group ref={group} position={[bias, 0, z]} scale={scale}>
      {children}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Corridor starfield                                                  */
/* ------------------------------------------------------------------ */

function Starfield({ quality }: { quality: number }) {
  const travel = (ZONE_COUNT - 1) * SPACING
  const count = Math.round(900 * quality)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 130
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80
      arr[i * 3 + 2] = 30 - Math.random() * (travel + 80)
    }
    return arr
  }, [count, travel])

  const sprite = useMemo(() => glowTexture(), [])
  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color="#7f97c4"
        size={0.22}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  The world                                                           */
/* ------------------------------------------------------------------ */

export default function World({
  quality = 1,
  bias = 7,
  scale = 1,
}: {
  quality?: number
  /** Pushes the whole world right of screen centre, clear of the text column. */
  bias?: number
  /** Shrinks the world on narrow screens so each shape fits the frame. */
  scale?: number
}) {
  const travel = (ZONE_COUNT - 1) * SPACING

  return (
    <>
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 34, 118]} />

      <CameraRig />

      <Starfield quality={quality} />
      <MorphField quality={quality} bias={bias} camOffset={CAM_OFFSET} scale={scale} />

      {/* the floor and ceiling are particle lattices, not drawn grids */}
      <ParticleLattice
        size={340}
        divisions={Math.round(34 * Math.max(0.5, quality))}
        color="#2f4372"
        position={[0, -15, -travel / 2]}
        pointSize={0.34}
        opacity={0.4}
      />
      <ParticleLattice
        size={340}
        divisions={Math.round(30 * Math.max(0.5, quality))}
        color="#3a2f72"
        position={[0, 19, -travel / 2]}
        pointSize={0.3}
        opacity={0.3}
      />

      {ZONES.map((Zone, i) => (
        <ZoneSlot key={i} z={-i * SPACING} bias={bias} scale={scale}>
          <Zone quality={quality} />
        </ZoneSlot>
      ))}
    </>
  )
}

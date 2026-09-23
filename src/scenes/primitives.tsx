import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture, labelAspect, labelTexture } from '../lib/labelTexture'

/* ------------------------------------------------------------------ */
/*  Text label rendered as a canvas-textured sprite (no font files)     */
/* ------------------------------------------------------------------ */

type LabelProps = {
  text: string
  position?: [number, number, number]
  color?: string
  height?: number
  size?: number
  weight?: number
  opacity?: number
  /**
   * Where `position` sits relative to the text. Anchoring left or right is what
   * keeps a label pinned to the thing it names instead of drifting away from it
   * as the text gets longer.
   */
  anchor?: 'center' | 'left' | 'right'
}

export function Label({
  text,
  position = [0, 0, 0],
  color = '#ffffff',
  height = 0.6,
  size = 56,
  weight = 600,
  opacity = 1,
  anchor = 'center',
}: LabelProps) {
  const map = useMemo(() => labelTexture(text, { color, size, weight }), [text, color, size, weight])
  const aspect = labelAspect(map)
  const width = height * aspect
  // the texture carries a little padding either side — discount it so the ink,
  // not the canvas, lines up with the anchor point
  const inset = height * 0.27
  const shift = anchor === 'left' ? width / 2 - inset : anchor === 'right' ? -width / 2 + inset : 0
  const placed: [number, number, number] = [position[0] + shift, position[1], position[2]]

  return (
    <sprite position={placed} scale={[width, height, 1]}>
      <spriteMaterial
        map={map}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  )
}

/* ------------------------------------------------------------------ */
/*  Additive glow blob                                                  */
/* ------------------------------------------------------------------ */

export function Glow({
  position = [0, 0, 0],
  scale = 6,
  color = '#22d3ee',
  opacity = 0.35,
}: {
  position?: [number, number, number]
  scale?: number
  color?: string
  opacity?: number
}) {
  const map = useMemo(() => glowTexture(), [])
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={map}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  )
}

/* ------------------------------------------------------------------ */
/*  Gentle floating wrapper (cheap replacement for drei <Float/>)       */
/* ------------------------------------------------------------------ */

export function Bob({
  children,
  amplitude = 0.25,
  speed = 1,
  offset = 0,
  rotate = 0.06,
}: {
  children: React.ReactNode
  amplitude?: number
  speed?: number
  offset?: number
  rotate?: number
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = Math.sin(t) * amplitude
    ref.current.rotation.z = Math.sin(t * 0.6) * rotate
    ref.current.rotation.x = Math.cos(t * 0.45) * rotate * 0.6
  })
  return <group ref={ref}>{children}</group>
}

/* ------------------------------------------------------------------ */
/*  Slowly spinning wrapper                                             */
/* ------------------------------------------------------------------ */

export function Spin({
  children,
  x = 0,
  y = 0.15,
  z = 0,
}: {
  children: React.ReactNode
  x?: number
  y?: number
  z?: number
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * x
    ref.current.rotation.y += dt * y
    ref.current.rotation.z += dt * z
  })
  return <group ref={ref}>{children}</group>
}

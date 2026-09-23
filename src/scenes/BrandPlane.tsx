import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { brand } from '../lib/brand'
import { brandFileTexture, brandTileTexture } from '../lib/brandTexture'
import { damp, focusState } from '../lib/scroll'
import { Glow } from './primitives'

export function useBrandTexture(name: string) {
  const def = useMemo(() => brand(name), [name])
  const [tex, setTex] = useState<THREE.Texture>(() => brandTileTexture(def))

  useEffect(() => {
    let alive = true
    setTex(brandTileTexture(def))
    brandFileTexture(def).then((t) => {
      if (alive && t) setTex(t)
    })
    return () => {
      alive = false
    }
  }, [def])

  return { def, tex }
}

/**
 * A logo tile floating in the scene.
 *
 * `focusZone` / `focusKey` wire it to the text column: hovering a card in the
 * HTML sets the focus, and every tile that doesn't belong to that card steps
 * back while the ones that do come forward. `highlight` does the same thing
 * from scroll position rather than from the pointer.
 */
export default function BrandPlane({
  name,
  position = [0, 0, 0],
  size = 1,
  glow = 0.22,
  opacity = 1,
  focusZone,
  focusKey,
  highlight,
}: {
  name: string
  position?: [number, number, number]
  size?: number
  glow?: number
  opacity?: number
  focusZone?: string
  focusKey?: string
  /** 0 → resting, 1 → this is the one being read right now */
  highlight?: number
}) {
  const { def, tex } = useBrandTexture(name)
  const sprite = useRef<THREE.Sprite>(null)
  const material = useRef<THREE.SpriteMaterial>(null)
  const level = useRef(1)

  useFrame((_, delta) => {
    if (!sprite.current || !material.current) return
    const dt = Math.min(delta, 0.1)

    let target = 1
    if (focusZone && focusState.zone === focusZone) {
      target = focusState.key === focusKey ? 1.45 : 0.28
    } else if (highlight !== undefined) {
      target = 0.55 + highlight * 0.75
    }

    level.current = damp(level.current, target, 8, dt)
    const scale = size * (0.85 + level.current * 0.18)
    sprite.current.scale.set(scale, scale, 1)
    material.current.opacity = opacity * Math.min(1, level.current * 0.9 + 0.12)
  })

  return (
    <group position={position}>
      <sprite ref={sprite} scale={[size, size, 1]}>
        <spriteMaterial
          ref={material}
          map={tex}
          transparent
          opacity={opacity}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
      {glow > 0 && <Glow scale={size * 3.2} color={def.color} opacity={glow} />}
    </group>
  )
}

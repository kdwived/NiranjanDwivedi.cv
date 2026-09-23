import { useEffect, useRef, useState } from 'react'
import { scrollState } from '../lib/scroll'

/**
 * Which item of a list you are currently reading, derived from how far you are
 * through the section. Only re-renders when the answer actually changes, so the
 * 3D scene can follow the text column without costing a render per frame.
 */
export function useScrollIndex(count: number, sectionIndex: number) {
  const [index, setIndex] = useState(0)
  const last = useRef(0)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      if (scrollState.section === sectionIndex) {
        const i = Math.min(count - 1, Math.max(0, Math.floor(scrollState.sectionProgress * count)))
        if (i !== last.current) {
          last.current = i
          setIndex(i)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [count, sectionIndex])

  return index
}

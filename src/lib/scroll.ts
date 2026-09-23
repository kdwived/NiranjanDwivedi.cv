/**
 * A tiny global scroll store.
 *
 * The 3D world reads `scrollState` inside useFrame (no React re-renders),
 * while React components subscribe only when the active section changes.
 *
 * Sections can be any height: progress is measured per-section, so the
 * camera always sits in the 3D zone that matches what you are reading.
 */

export const scrollState = {
  /** continuous zone progress, 0 → 1 across all zones */
  target: 0,
  /** eased progress the camera actually follows */
  eased: 0,
  /** raw document scroll, 0 → 1 (used by the progress bar) */
  doc: 0,
  /** index of the section currently in view */
  section: 0,
  /** 0 → 1 progress THROUGH the current section, so the 3D can follow the
      particular card you are reading, not just the section you are in */
  sectionProgress: 0,
  /** normalised pointer position, -1 → 1 */
  pointerX: 0,
  pointerY: 0,
}

type Listener = (section: number) => void
const listeners = new Set<Listener>()
let sectionEls: HTMLElement[] = []

export function registerSections(els: HTMLElement[]) {
  sectionEls = els.filter(Boolean)
}

export function onSectionChange(fn: Listener) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function emit(section: number) {
  if (section === scrollState.section) return
  scrollState.section = section
  listeners.forEach((fn) => fn(section))
}

let started = false

export function startScrollTracking(zoneCount: number) {
  if (started || typeof window === 'undefined') return () => {}
  started = true

  const readScroll = () => {
    const maxDoc = document.documentElement.scrollHeight - window.innerHeight
    scrollState.doc = maxDoc > 0 ? clamp01(window.scrollY / maxDoc) : 0

    let zoneProgress = scrollState.doc * (zoneCount - 1)

    if (sectionEls.length > 1) {
      const y = window.scrollY
      const last = sectionEls.length - 1
      for (let i = last; i >= 0; i--) {
        const el = sectionEls[i]
        const top = el.offsetTop
        if (y >= top || i === 0) {
          // The final section has no successor to hand over to, so its
          // progress is measured against the scrollable remainder.
          const h =
            i === last
              ? Math.max(1, el.offsetHeight - window.innerHeight)
              : Math.max(1, el.offsetHeight)
          zoneProgress = Math.min(last, i + clamp01((y - top) / h))
          scrollState.sectionProgress = clamp01(
            (y + window.innerHeight * 0.35 - top) / Math.max(1, el.offsetHeight),
          )
          break
        }
      }
    }

    scrollState.target = clamp01(zoneProgress / Math.max(1, zoneCount - 1))
    // Bias the label change past the midpoint so the nav follows what you read.
    emit(Math.min(zoneCount - 1, Math.floor(zoneProgress + 0.4)))
  }

  const readPointer = (e: PointerEvent) => {
    scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1
    scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1
  }

  readScroll()
  window.addEventListener('scroll', readScroll, { passive: true })
  window.addEventListener('resize', readScroll)
  window.addEventListener('pointermove', readPointer, { passive: true })

  return () => {
    started = false
    window.removeEventListener('scroll', readScroll)
    window.removeEventListener('resize', readScroll)
    window.removeEventListener('pointermove', readPointer)
  }
}

/* ------------------------------------------------------------------ */
/*  Front ↔ back focus                                                  */
/* ------------------------------------------------------------------ */

/**
 * Set by the HTML when you hover a card, read by the 3D scene every frame.
 * It is how a capability card in the text column can light up its own tools
 * out in the particle field.
 */
export const focusState = {
  zone: '' as string,
  key: '' as string,
}

export function setFocus(zone: string, key: string) {
  focusState.zone = zone
  focusState.key = key
}

export function clearFocus(zone: string) {
  if (focusState.zone === zone) {
    focusState.zone = ''
    focusState.key = ''
  }
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

/** Frame-rate independent exponential smoothing. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}

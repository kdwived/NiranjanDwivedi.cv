import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import World, { ZONE_COUNT } from './scenes/World'
import { DotRail, Loader, ProgressBar, ScrollHint, TopBar } from './components/Chrome'
import { registerSections, startScrollTracking } from './lib/scroll'
import { usePrefersReducedMotion, useViewportWidth } from './hooks/useActiveSection'

import Hero from './sections/Hero'
import About from './sections/About'
import Capabilities from './sections/Capabilities'
import Engine from './sections/Engine'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  const width = useViewportWidth()
  const reducedMotion = usePrefersReducedMotion()

  // Fewer particles on small / low-power devices.
  const quality = width < 768 ? 0.6 : 1
  // How far right of centre the world sits, so it clears the text column.
  const bias = width < 900 ? 0 : width < 1200 ? 5 : 8.5
  // Narrow screens see a much smaller slice of the world, so shrink it to fit.
  const scale = width < 640 ? 0.46 : width < 900 ? 0.6 : width < 1200 ? 0.85 : 1

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    registerSections(els)
    const stop = startScrollTracking(ZONE_COUNT)
    const onResize = () =>
      registerSections(Array.from(document.querySelectorAll<HTMLElement>('[data-section]')))
    window.addEventListener('resize', onResize)
    return () => {
      stop()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) setReady(true)
  }, [reducedMotion])

  return (
    <>
      <Loader done={ready} />
      <ProgressBar />
      <TopBar />
      <DotRail />
      <ScrollHint />

      {reducedMotion ? (
        <div className="world-canvas bg-[radial-gradient(120%_80%_at_20%_10%,#101a33_0%,#05060a_60%)]" />
      ) : (
        <div className="world-canvas">
          <Canvas
            gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
            dpr={[1, 1.75]}
            camera={{ fov: 55, near: 0.1, far: 500, position: [0, 0, 17] }}
            onCreated={() => setTimeout(() => setReady(true), 350)}
          >
            <Suspense fallback={null}>
              <World quality={quality} bias={bias} scale={scale} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="scrim" aria-hidden />

      <main className="overlay">
        <Hero />
        <About />
        <Capabilities />
        <Engine />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, sections } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollState } from '../lib/scroll'

const brandLogo = `${import.meta.env.BASE_URL || '/'}logos/logo.png`

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---------------------------------- top bar --------------------------------- */

export function TopBar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="glass flex h-11 w-11 items-center justify-center rounded-xl font-mono text-xs font-bold tracking-widest text-white"
            aria-label="Back to top"
          >
            <img src={brandLogo} alt={profile.name} className="h-7 w-7 object-contain" />
          </button>

          <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active === i ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white/80'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="glass flex h-11 w-11 items-center justify-center rounded-xl lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-white/80" />
              <span className="block h-px w-4 bg-white/80" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 font-mono text-xs tracking-widest text-white/60"
            >
              CLOSE
            </button>
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setOpen(false)
                  setTimeout(() => scrollToSection(s.id), 60)
                }}
                className="py-2 text-2xl font-semibold text-white/70 transition-colors hover:text-white"
              >
                <span className="mr-3 font-mono text-xs text-cyan/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------ side dot rail ------------------------------ */

export function DotRail() {
  const active = useActiveSection()
  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollToSection(s.id)}
          aria-label={s.label}
          className="group relative flex h-4 w-4 items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === i ? 'h-2.5 w-2.5 bg-cyan' : 'h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60'
            }`}
          />
          <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-white/10 bg-ink/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
    </div>
  )
}

/* ------------------------------ progress bar ------------------------------- */

export function ProgressBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    let raf = 0
    const loop = () => {
      setW(scrollState.doc)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-cyan via-violet to-magenta"
        style={{ width: `${w * 100}%` }}
      />
    </div>
  )
}

/* ------------------------------- scroll hint ------------------------------- */

export function ScrollHint() {
  const active = useActiveSection()
  return (
    <AnimatePresence>
      {active === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed bottom-7 left-1/2 z-40 -translate-x-1/2 text-center"
        >
          <div className="mx-auto mb-2 h-9 w-5 rounded-full border border-white/20">
            <motion.span
              className="mx-auto mt-1.5 block h-1.5 w-1 rounded-full bg-cyan"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll to travel
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* --------------------------------- loader ---------------------------------- */

export function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative flex h-24 w-24 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-cyan/40"
              animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.6, 0.15, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img src={brandLogo} alt={profile.name} className="h-14 w-14 object-contain" />
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Building the world
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

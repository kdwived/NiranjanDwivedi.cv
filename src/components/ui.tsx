import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/* Section shell — every overlay section uses this so spacing stays consistent */
export function Section({
  id,
  children,
  className = '',
  wide = false,
}: {
  id: string
  children: ReactNode
  className?: string
  /** span the full grid instead of hugging the left column */
  wide?: boolean
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={`relative flex min-h-screen w-full items-center px-5 py-24 sm:px-8 lg:px-16 ${className}`}
    >
      {/* Content sits left of centre on wide screens so the 3D world stays visible */}
      <div className={`w-full ${wide ? 'max-w-6xl' : 'max-w-4xl'}`}>{children}</div>
    </section>
  )
}

/* Fade + rise on enter */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-cyan/70" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

export function Card({
  children,
  className = '',
  accent,
}: {
  children: ReactNode
  className?: string
  accent?: string
}) {
  return (
    <div
      className={`glass group relative overflow-hidden p-6 transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {accent && (
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: accent }}
        />
      )}
      {children}
    </div>
  )
}

export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="chip"
      style={color ? { borderColor: `${color}44`, color: `${color}dd` } : undefined}
    >
      {children}
    </span>
  )
}

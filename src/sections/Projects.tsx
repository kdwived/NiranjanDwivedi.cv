import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eyebrow, Reveal, Section, Tag } from '../components/ui'
import { BrandRow } from '../components/BrandIcon'
import ImageSlot, { Lightbox } from '../components/ImageSlot'
import { publicUrl } from '../lib/logoProbe'
import { projectDNA, projects, type Project } from '../data/portfolio'

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const [zoom, setZoom] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <Section id="projects">
      <Reveal>
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="section-title">
          Things I've <span className="grad-text">Built.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/50">
          Real-world systems built around marketing, technology, automation and measurable growth.
          Open any card for the full breakdown.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.07}>
            <button
              onClick={() => setOpen(p)}
              className="glass group relative block h-full w-full overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <span
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                style={{ background: p.accent }}
              />

              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: p.accent }}
                >
                  {p.kind}
                </span>
                <span className="font-mono text-3xl font-bold text-white/10">{p.n}</span>
              </div>

              <h3 className="mt-4 text-xl font-semibold leading-snug text-white">{p.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/35">{p.category}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/45">{p.body}</p>

              <BrandRow names={p.tags} size={28} max={5} className="mt-5" />

              <span className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/45 transition-colors group-hover:text-white">
                View case study
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10">
          <p className="eyebrow mb-4">Project DNA — what these projects solve</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectDNA.map((d) => (
              <div key={d.title} className="glass p-5">
                <h4 className="text-sm font-semibold text-white">{d.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/40">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ------------------------------------------------------- detail view */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex items-start justify-center overflow-y-auto bg-ink/92 p-4 backdrop-blur-lg sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.article
              className="glass my-auto w-full max-w-3xl p-6 sm:p-9"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: open.accent }}
                  >
                    {open.kind}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {open.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/35">
                    {open.category}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/60 transition-colors hover:text-white"
                >
                  CLOSE
                </button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/60">{open.body}</p>

              <div className="mt-7">
                <p className="eyebrow mb-3">What it does</p>
                <ul className="space-y-2.5">
                  {open.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-white/55">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: open.accent }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p className="eyebrow mb-3">Screens</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {open.images.map((file, i) => (
                    <ImageSlot
                      key={file}
                      dir="projects"
                      file={file}
                      label={`Screenshot ${i + 1}`}
                      className="aspect-[16/10]"
                      onClick={() => setZoom(publicUrl(`projects/${file}`))}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="eyebrow mb-3">Built with</p>
                <BrandRow names={open.tags} size={32} />
                <div className="mt-4 flex flex-wrap gap-2">
                  {open.tags.map((t) => (
                    <Tag key={t} color={open.accent}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>

              {open.link && (
                <a
                  href={open.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Open live project →
                </a>
              )}
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox src={zoom} onClose={() => setZoom(null)} />
    </Section>
  )
}

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Eyebrow, Reveal, Section, Tag } from '../components/ui'
import BrandIcon from '../components/BrandIcon'
import ImageSlot, { Lightbox } from '../components/ImageSlot'
import { publicUrl } from '../lib/logoProbe'
import { certificates, education, learningAreas, schooling } from '../data/portfolio'

export default function Education() {
  const years = useMemo(() => {
    const set = Array.from(new Set(certificates.map((c) => c.year)))
    set.sort((a, b) => (a === '—' ? 1 : b === '—' ? -1 : Number(b) - Number(a)))
    return ['All', ...set]
  }, [])

  const [year, setYear] = useState('All')
  const [zoom, setZoom] = useState<{ src: string; caption: string } | null>(null)

  const shown = year === 'All' ? certificates : certificates.filter((c) => c.year === year)

  return (
    <Section id="education">
      <Reveal>
        <Eyebrow>Education &amp; certifications</Eyebrow>
        <h2 className="section-title">
          Academic <span className="grad-text">Foundation.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/50">
          Business knowledge meets computer applications — two complementary perspectives:
          understanding what a business needs, and understanding the technology that answers it.
        </p>
      </Reveal>

      {/* ------------------------------------------------------ degree rail */}
      <div className="relative mt-12 pl-6 sm:pl-10">
        <span className="absolute left-0 top-3 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan via-violet to-transparent sm:left-3" />

        {education.map((e, i) => {
          const accent = i === 0 ? '#22d3ee' : '#8b5cf6'
          return (
            <Reveal key={e.n} delay={i * 0.08}>
              <article className="relative pb-8">
                <span
                  className="absolute -left-6 top-4 h-2.5 w-2.5 rounded-full ring-4 ring-ink sm:-left-[2.55rem]"
                  style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
                />
                <Card accent={accent}>
                  <div className="flex flex-wrap items-start gap-5">
                    <BrandIcon name={e.institute} size={56} />
                    <div className="min-w-[220px] flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                          {e.n}
                        </span>
                        <span className="chip">Completed</span>
                        <span
                          className="ml-auto font-mono text-[11px]"
                          style={{ color: accent }}
                        >
                          {e.year}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-white">{e.degree}</h3>
                      <p className="mt-1 text-sm text-white/55">{e.institute}</p>
                      <p className="text-xs text-white/35">
                        {e.sub} • {e.place}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/45">{e.body}</p>
                    </div>
                  </div>
                </Card>
              </article>
            </Reveal>
          )
        })}

        <Reveal delay={0.16}>
          <div className="grid gap-3 sm:grid-cols-2">
            {schooling.map((s) => (
              <div key={s.name} className="glass flex items-center gap-3 px-4 py-3.5">
                <BrandIcon name={s.name} size={36} />
                <span className="text-sm text-white/70">{s.name}</span>
                <span className="chip ml-auto">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ------------------------------------------------- what I studied */}
      <Reveal delay={0.2}>
        <div className="mt-12">
          <p className="eyebrow mb-4">Core learning areas</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {learningAreas.map((a, i) => (
              <div
                key={a}
                className="glass flex items-center gap-3 px-4 py-3 text-xs text-white/60"
              >
                <span className="font-mono text-[10px] text-cyan/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {a}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------------------------------------------------- credentials */}
      <Reveal delay={0.24}>
        <div className="mt-14">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Proof of learning</p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {certificates.length} credentials, {years.length - 1} years.
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-widest transition-colors ${
                    year === y
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                  }`}
                >
                  {y === '—' ? 'OTHER' : y.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <motion.div
                layout
                key={`${c.title}-${c.date}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="glass group flex flex-col overflow-hidden"
              >
                <ImageSlot
                  dir="certificates"
                  file={c.image}
                  label="Add certificate scan"
                  hint={false}
                  className="!rounded-none !border-0 aspect-[4/3] border-b !border-b-white/10"
                  onClick={() =>
                    setZoom({ src: publicUrl(`certificates/${c.image}`), caption: c.title })
                  }
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet/80">
                      {c.category}
                    </span>
                    <span className="font-mono text-[11px] text-white/30">{c.year}</span>
                  </div>

                  <div className="mt-3 flex items-start gap-3">
                    <BrandIcon name={c.issuer} size={34} />
                    <div>
                      <h4 className="text-sm font-semibold leading-snug text-white">{c.title}</h4>
                      <p className="mt-0.5 text-xs text-white/45">{c.issuer}</p>
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-xs leading-relaxed text-white/35">{c.body}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.slice(0, 3).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { v: String(certificates.length), l: 'Total certificates' },
              { v: '4', l: 'Learning years' },
              { v: 'Verified', l: 'Credentials' },
            ].map((s) => (
              <div key={s.l} className="glass px-5 py-4">
                <div className="text-xl font-bold text-white">{s.v}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Lightbox src={zoom?.src ?? null} caption={zoom?.caption} onClose={() => setZoom(null)} />
    </Section>
  )
}
